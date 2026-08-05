/**
 * Side-by-side screenshot + pixel-diff verification of clone vs Harmonic.
 * Requires: local Next server running (default http://localhost:3000/en)
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'design-tokens/harmonic/diffs')
const BREAKPOINTS = [375, 768, 1024, 1440, 1920]
const ORIGINAL = 'https://harmonic.ai/'
const CLONE = process.env.CLONE_URL || 'http://localhost:3000/en'

fs.mkdirSync(OUT, { recursive: true })

async function shot(page, url, file, fullPage = true) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1200)
  try {
    const accept = page.locator('a:has-text("Accept"), button:has-text("Accept")').first()
    if (await accept.isVisible({ timeout: 1500 }).catch(() => false)) {
      await accept.click()
      await page.waitForTimeout(400)
    }
  } catch {}
  await page.screenshot({ path: file, fullPage })
}

function diffPng(aPath, bPath, outPath) {
  const img1 = PNG.sync.read(fs.readFileSync(aPath))
  const img2 = PNG.sync.read(fs.readFileSync(bPath))
  const width = Math.min(img1.width, img2.width)
  const height = Math.min(img1.height, img2.height)
  // Crop both to common size by re-encoding region — simple approach: compare top-left common area
  const crop = (img) => {
    const out = new PNG({ width, height })
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const si = (y * img.width + x) << 2
        const di = (y * width + x) << 2
        out.data[di] = img.data[si]
        out.data[di + 1] = img.data[si + 1]
        out.data[di + 2] = img.data[si + 2]
        out.data[di + 3] = img.data[si + 3]
      }
    }
    return out
  }
  const a = crop(img1)
  const b = crop(img2)
  const diff = new PNG({ width, height })
  const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: 0.15,
    includeAA: false,
  })
  fs.writeFileSync(outPath, PNG.sync.write(diff))
  const total = width * height
  return {
    mismatched,
    total,
    percent: +((mismatched / total) * 100).toFixed(2),
    width,
    height,
    note:
      img1.width !== img2.width || img1.height !== img2.height
        ? `Cropped to common ${width}x${height} (orig ${img1.width}x${img1.height}, clone ${img2.width}x${img2.height})`
        : null,
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const report = {
    comparedAt: new Date().toISOString(),
    original: ORIGINAL,
    clone: CLONE,
    breakpoints: {},
    caveats: [
      'Content/copy intentionally differs (Relay branding vs Harmonic marketing).',
      'Pixel diff measures layout/visual chrome, not identical pixels of logos/copy.',
      'PP Neue Montreal is proprietary — local copies used only for visual parity in this clone.',
      'Webflow IX2/Lottie scroll choreography partially unreplicated (no GSAP globals detected).',
      'Purple aurora behind Scout uses CSS radial gradient approximation; exact WebGL/canvas layers not found in CSS.',
      'Customer story imagery and product UI mockups are placeholders, not Harmonic assets.',
      'Cookie banner and auth-gated surfaces excluded.',
    ],
  }

  for (const w of BREAKPOINTS) {
    const page = await browser.newPage({ viewport: { width: w, height: Math.round(w * 0.65) } })
    const origPath = path.join(OUT, `orig-${w}.png`)
    const clonePath = path.join(OUT, `clone-${w}.png`)
    const diffPath = path.join(OUT, `diff-${w}.png`)
    console.log(`Capturing ${w}px…`)
    await shot(page, ORIGINAL, origPath)
    await shot(page, CLONE, clonePath)
    const result = diffPng(origPath, clonePath, diffPath)
    report.breakpoints[w] = result
    console.log(`  mismatch ${result.percent}% (${result.mismatched}/${result.total})`, result.note || '')
    await page.close()
  }

  fs.writeFileSync(path.join(OUT, 'diff-report.json'), JSON.stringify(report, null, 2))
  console.log('\nWrote', path.join(OUT, 'diff-report.json'))
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
