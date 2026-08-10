/**
 * Deep metric pass: hero, nav, logos, quote, scout, footer at 1440.
 * Also dismisses cookie banner and captures cleaner screenshots.
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'design-tokens/harmonic')

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('https://harmonic.ai/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1500)

  // Accept cookies to clear overlay
  try {
    const accept = page.locator('a.fs-cc-banner_button.w-button, a:has-text("Accept")').first()
    if (await accept.isVisible({ timeout: 3000 })) {
      await accept.click()
      await page.waitForTimeout(500)
    }
  } catch {}

  const deep = await page.evaluate(() => {
    const styleOf = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        sel,
        tag: el.tagName.toLowerCase(),
        className: String(el.className || '').slice(0, 160),
        text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120),
        display: cs.display,
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
        width: Math.round(r.width),
        height: Math.round(r.height),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage?.slice(0, 300),
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        borderRadius: cs.borderRadius,
        border: cs.border,
        gap: cs.gap,
        maxWidth: cs.maxWidth,
        boxShadow: cs.boxShadow,
        backdropFilter: cs.backdropFilter,
        transition: cs.transition,
        textAlign: cs.textAlign,
        gridTemplateColumns: cs.gridTemplateColumns,
        flexDirection: cs.flexDirection,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
      }
    }

    const sels = [
      '.main-navbar',
      '.navbar-in-dark',
      '.nav-menu',
      '.nav-link',
      '.button-secondary-3',
      '.nav-button-primary',
      '.brand',
      '.hero-section',
      '.hero-and-logos',
      '.hm-hero-content-wrap',
      'h1',
      '.hero-form-content',
      '.hero-email-submit-form',
      'input[type="email"]',
      '.new-logos-container',
      '.hm-logo-customers-container',
      '.hm-big-quote-section',
      '.soulutions_section_what-header',
      '.hm-scout-section',
      '.scout-bg-section',
      '.sections-wrap-2',
      '.hm-act',
      '.section-articles',
      '.footer-section-new',
      '.section.center.footer',
    ]

    const map = {}
    for (const s of sels) map[s] = styleOf(s)

    // All h1/h2/h3 unique size samples
    const headings = ['h1', 'h2', 'h3', 'h4'].flatMap((tag) =>
      [...document.querySelectorAll(tag)].slice(0, 6).map((el) => {
        const cs = getComputedStyle(el)
        return {
          tag,
          text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80),
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          maxWidth: cs.maxWidth,
          textAlign: cs.textAlign,
        }
      })
    )

    // Logo cards
    const logoCard = document.querySelector(
      '.hm-logo-customers-container [class*="logo"], .hm-logo-customers-container > *, .new-logos-container [class*="card"]'
    )
    const logoGrid = document.querySelector('.hm-logo-customers-container')
    let logoGridInfo = null
    if (logoGrid) {
      const cs = getComputedStyle(logoGrid)
      const kids = [...logoGrid.children].slice(0, 3).map((c) => {
        const k = getComputedStyle(c)
        return {
          className: String(c.className || '').slice(0, 80),
          display: k.display,
          gap: k.gap,
          gridTemplateColumns: k.gridTemplateColumns,
          padding: `${k.paddingTop} ${k.paddingRight} ${k.paddingBottom} ${k.paddingLeft}`,
          backgroundColor: k.backgroundColor,
          borderRadius: k.borderRadius,
          width: Math.round(c.getBoundingClientRect().width),
          height: Math.round(c.getBoundingClientRect().height),
        }
      })
      logoGridInfo = {
        display: cs.display,
        gap: cs.gap,
        gridTemplateColumns: cs.gridTemplateColumns,
        maxWidth: cs.maxWidth,
        children: kids,
        childCount: logoGrid.children.length,
      }
    }

    // Gradient / bg detection on scout
    const scoutBgs = [...document.querySelectorAll('.scout-bg-section, .hm-bg-gradient-purple, [class*="gradient"]')]
      .slice(0, 8)
      .map((el) => {
        const cs = getComputedStyle(el)
        return {
          className: String(el.className || '').slice(0, 100),
          backgroundColor: cs.backgroundColor,
          backgroundImage: cs.backgroundImage?.slice(0, 500),
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        }
      })

    // Media queries from stylesheets (limited)
    const mq = []
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            mq.push(rule.conditionText || rule.media?.mediaText)
          }
        }
      } catch {}
    }

    return { map, headings, logoGridInfo, scoutBgs, mediaQueries: [...new Set(mq)].slice(0, 60) }
  })

  // Hover primary CTA inside main nav (skip floating off-screen variant)
  const demoBtn = page.locator('.main-navbar a.nav-button-primary, .main-navbar a:has-text("Book a demo")').first()
  let hoverDemo = null
  try {
    if (await demoBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      const before = await demoBtn.evaluate((el) => {
        const cs = getComputedStyle(el)
        return { bg: cs.backgroundColor, color: cs.color, transform: cs.transform, transition: cs.transition, opacity: cs.opacity }
      })
      await demoBtn.hover({ force: true, timeout: 5000 })
      await page.waitForTimeout(300)
      const after = await demoBtn.evaluate((el) => {
        const cs = getComputedStyle(el)
        return { bg: cs.backgroundColor, color: cs.color, transform: cs.transform, transition: cs.transition, opacity: cs.opacity }
      })
      hoverDemo = { before, after }
      await page.mouse.move(0, 0)
    }
  } catch (e) {
    hoverDemo = { error: String(e.message || e) }
  }

  // Capture cleaner hero + mid sections
  await page.screenshot({ path: path.join(OUT, 'screenshots/hero-clean-1440.png'), fullPage: false })
  await page.evaluate(() => window.scrollTo(0, 900))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'screenshots/logos-1440.png'), fullPage: false })
  await page.evaluate(() => window.scrollTo(0, 1800))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'screenshots/quote-1440.png'), fullPage: false })
  await page.evaluate(() => window.scrollTo(0, 2800))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'screenshots/scout-1440.png'), fullPage: false })
  await page.evaluate(() => window.scrollTo(0, 8500))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'screenshots/features-1440.png'), fullPage: false })
  await page.evaluate(() => window.scrollTo(0, 12000))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'screenshots/footer-cta-1440.png'), fullPage: false })

  // Scroll animation: opacity of quote heading as it enters
  const scrollAnim = []
  for (const y of [1400, 1600, 1800, 2000, 2200]) {
    await page.evaluate((sy) => window.scrollTo(0, sy), y)
    await page.waitForTimeout(250)
    const sample = await page.evaluate(() => {
      const el = document.querySelector('.hm-big-quote-section h2, .soulutions_section_what-header h2, .hm-big-quote-section *')
      if (!el) return null
      const cs = getComputedStyle(el)
      return { opacity: cs.opacity, transform: cs.transform, transition: cs.transition, y: window.scrollY }
    })
    scrollAnim.push(sample)
  }

  const payload = { deep, hoverDemo, scrollAnim, extractedAt: new Date().toISOString() }
  fs.writeFileSync(path.join(OUT, 'deep-metrics.json'), JSON.stringify(payload, null, 2))

  // Merge into design-tokens.json
  const tokensPath = path.join(ROOT, 'design-tokens.json')
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))
  tokens.deepMetrics = payload
  // Update font download status if files exist
  const fontDir = path.join(OUT, 'fonts')
  if (fs.existsSync(fontDir)) {
    tokens.fonts.localFiles = fs.readdirSync(fontDir).map((f) => ({
      file: `design-tokens/harmonic/fonts/${f}`,
      bytes: fs.statSync(path.join(fontDir, f)).size,
    }))
  }
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
  fs.writeFileSync(path.join(OUT, 'design-tokens.json'), JSON.stringify(tokens, null, 2))

  console.log('Wrote deep-metrics.json')
  console.log('H1:', JSON.stringify(deep.map['h1'], null, 2))
  console.log('Nav:', JSON.stringify(deep.map['.main-navbar'], null, 2))
  console.log('Hero form:', JSON.stringify(deep.map['.hero-form-content'], null, 2))
  console.log('Logo grid:', JSON.stringify(deep.logoGridInfo, null, 2))
  console.log('Hover demo:', JSON.stringify(hoverDemo, null, 2))
  console.log('Media queries sample:', deep.mediaQueries.slice(0, 20))

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
