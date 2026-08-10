/**
 * Harmonic.ai design-token extractor (Playwright)
 * Visits the live site and dumps colors, typography, CSS vars, spacing,
 * breakpoints, fonts, structure, transitions, and animation signals.
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'design-tokens/harmonic')
const SCREENSHOTS = path.join(OUT, 'screenshots')
const FONTS = path.join(OUT, 'fonts')
const SECTIONS = path.join(OUT, 'sections')

const URL = 'https://harmonic.ai/'
const BREAKPOINTS = [375, 768, 1024, 1440, 1920]

for (const d of [OUT, SCREENSHOTS, FONTS, SECTIONS]) {
  fs.mkdirSync(d, { recursive: true })
}

function rgbToHex(rgb) {
  if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null
  const m = rgb.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?/)
  if (!m) return rgb
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  if (a === 0) return null
  const hex =
    '#' +
    [m[1], m[2], m[3]]
      .map((v) => Math.round(parseFloat(v)).toString(16).padStart(2, '0'))
      .join('')
  return a < 1 ? { hex, rgba: rgb, alpha: a } : hex
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))]
}

async function downloadFont(page, fontUrl, destDir) {
  try {
    const abs = fontUrl.startsWith('http') ? fontUrl : new URL(fontUrl, URL).href
    const res = await page.request.get(abs)
    if (!res.ok()) return null
    const buf = await res.body()
    const name = path.basename(new URL(abs).pathname).split('?')[0] || `font-${Date.now()}`
    const file = path.join(destDir, name)
    fs.writeFileSync(file, buf)
    return { url: abs, file: path.relative(ROOT, file), bytes: buf.length }
  } catch (e) {
    return { url: fontUrl, error: String(e.message || e) }
  }
}

async function main() {
  console.log('Launching Chromium…')
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  // Collect network font files
  const fontUrls = new Set()
  page.on('response', async (res) => {
    const u = res.url()
    const ct = (res.headers()['content-type'] || '').toLowerCase()
    if (
      /\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) ||
      ct.includes('font') ||
      ct.includes('woff')
    ) {
      fontUrls.add(u)
    }
  })

  console.log('Navigating to', URL)
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(2000)

  // Dismiss cookie banners if present
  try {
    const cookieBtn = page.locator(
      'button:has-text("Accept"), button:has-text("Agree"), button:has-text("Got it"), [aria-label*="Accept"]'
    )
    if (await cookieBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await cookieBtn.first().click()
      await page.waitForTimeout(500)
    }
  } catch {}

  // ─── CSS custom properties ───────────────────────────────────────────
  console.log('Extracting :root CSS variables…')
  const cssVariables = await page.evaluate(() => {
    const vars = {}
    const sheets = [...document.styleSheets]
    for (const sheet of sheets) {
      let rules
      try {
        rules = [...sheet.cssRules]
      } catch {
        continue // cross-origin
      }
      for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          const sel = rule.selectorText || ''
          if (sel.includes(':root') || sel === 'html' || sel === 'body') {
            for (const name of rule.style) {
              if (name.startsWith('--')) {
                vars[name] = rule.style.getPropertyValue(name).trim()
              }
            }
          }
        }
        // also catch @property / nested
        if (rule.cssText && rule.cssText.includes('--')) {
          const matches = rule.cssText.matchAll(/--[\w-]+\s*:\s*[^;]+/g)
          for (const m of matches) {
            const [k, ...rest] = m[0].split(':')
            const key = k.trim()
            if (!vars[key]) vars[key] = rest.join(':').trim()
          }
        }
      }
    }
    // Also read computed :root
    const rootStyles = getComputedStyle(document.documentElement)
    for (let i = 0; i < rootStyles.length; i++) {
      const name = rootStyles[i]
      if (name.startsWith('--') && !vars[name]) {
        vars[name] = rootStyles.getPropertyValue(name).trim()
      }
    }
    return vars
  })

  // ─── @font-face rules ────────────────────────────────────────────────
  console.log('Extracting @font-face rules…')
  const fontFaces = await page.evaluate(() => {
    const faces = []
    for (const sheet of document.styleSheets) {
      let rules
      try {
        rules = [...sheet.cssRules]
      } catch {
        continue
      }
      for (const rule of rules) {
        if (rule.type === CSSRule.FONT_FACE_RULE) {
          const src = rule.style.getPropertyValue('src')
          const urls = [...src.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1])
          faces.push({
            family: rule.style.getPropertyValue('font-family').replace(/['"]/g, ''),
            weight: rule.style.getPropertyValue('font-weight'),
            style: rule.style.getPropertyValue('font-style'),
            display: rule.style.getPropertyValue('font-display'),
            stretch: rule.style.getPropertyValue('font-stretch'),
            src,
            urls,
          })
        }
      }
    }
    return faces
  })

  // ─── Palette + typography + spacing from computed styles ─────────────
  console.log('Walking DOM for computed styles…')
  const computed = await page.evaluate(() => {
    const colors = { color: new Set(), backgroundColor: new Set(), borderColor: new Set() }
    const typography = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      body: [],
      nav: [],
      button: [],
      a: [],
      p: [],
      span: [],
    }
    const spacing = {
      sections: [],
      flexGaps: [],
      gridGaps: [],
      containers: [],
    }
    const transitions = new Set()
    const transforms = new Set()
    const animations = new Set()

    const pickType = (el, cs) => ({
      tag: el.tagName.toLowerCase(),
      className: (el.className && String(el.className).slice?.(0, 120)) || '',
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      color: cs.color,
    })

    const all = document.querySelectorAll('*')
    for (const el of all) {
      const cs = getComputedStyle(el)
      colors.color.add(cs.color)
      colors.backgroundColor.add(cs.backgroundColor)
      colors.borderColor.add(cs.borderTopColor)
      colors.borderColor.add(cs.borderRightColor)
      colors.borderColor.add(cs.borderBottomColor)
      colors.borderColor.add(cs.borderLeftColor)

      if (cs.transition && cs.transition !== 'all 0s ease 0s') transitions.add(cs.transition)
      if (cs.transform && cs.transform !== 'none') transforms.add(cs.transform)
      if (cs.animation && cs.animation !== 'none') animations.add(cs.animation)

      const tag = el.tagName.toLowerCase()
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a', 'p'].includes(tag)) {
        if (typography[tag].length < 8) typography[tag].push(pickType(el, cs))
      }
      if (tag === 'body' && typography.body.length < 1) typography.body.push(pickType(el, cs))
      if (tag === 'nav' || el.closest('nav') || /nav/i.test(el.className || '')) {
        if (tag === 'a' && typography.nav.length < 8) typography.nav.push(pickType(el, cs))
      }

      // Section spacing
      if (tag === 'section' || /section|hero|footer|header/i.test(el.className || '') || tag === 'footer' || tag === 'header') {
        const rect = el.getBoundingClientRect()
        if (rect.height > 40) {
          spacing.sections.push({
            tag,
            className: String(el.className || '').slice(0, 160),
            id: el.id || null,
            padding: {
              top: cs.paddingTop,
              right: cs.paddingRight,
              bottom: cs.paddingBottom,
              left: cs.paddingLeft,
            },
            margin: {
              top: cs.marginTop,
              right: cs.marginRight,
              bottom: cs.marginBottom,
              left: cs.marginLeft,
            },
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            maxWidth: cs.maxWidth,
            display: cs.display,
            position: cs.position,
            gap: cs.gap,
            rowGap: cs.rowGap,
            columnGap: cs.columnGap,
          })
        }
      }

      if (cs.display.includes('flex') && cs.gap !== 'normal' && cs.gap !== '0px') {
        spacing.flexGaps.push({
          tag,
          className: String(el.className || '').slice(0, 100),
          gap: cs.gap,
          rowGap: cs.rowGap,
          columnGap: cs.columnGap,
          justifyContent: cs.justifyContent,
          alignItems: cs.alignItems,
          flexDirection: cs.flexDirection,
        })
      }
      if (cs.display.includes('grid')) {
        spacing.gridGaps.push({
          tag,
          className: String(el.className || '').slice(0, 100),
          gap: cs.gap,
          rowGap: cs.rowGap,
          columnGap: cs.columnGap,
          gridTemplateColumns: cs.gridTemplateColumns,
          gridTemplateRows: cs.gridTemplateRows,
        })
      }

      const mw = cs.maxWidth
      if (mw && mw !== 'none' && parseFloat(mw) > 400) {
        spacing.containers.push({
          tag,
          className: String(el.className || '').slice(0, 100),
          maxWidth: mw,
          width: cs.width,
          marginLeft: cs.marginLeft,
          marginRight: cs.marginRight,
          paddingLeft: cs.paddingLeft,
          paddingRight: cs.paddingRight,
        })
      }
    }

    // Deduplicate spacing samples
    const dedupeKey = (o) => JSON.stringify(o)
    const dedupe = (arr, limit = 40) => {
      const seen = new Set()
      const out = []
      for (const item of arr) {
        const k = dedupeKey(item)
        if (!seen.has(k)) {
          seen.add(k)
          out.push(item)
          if (out.length >= limit) break
        }
      }
      return out
    }

    return {
      colors: {
        color: [...colors.color],
        backgroundColor: [...colors.backgroundColor],
        borderColor: [...colors.borderColor],
      },
      typography,
      spacing: {
        sections: dedupe(spacing.sections, 60),
        flexGaps: dedupe(spacing.flexGaps, 40),
        gridGaps: dedupe(spacing.gridGaps, 40),
        containers: dedupe(spacing.containers, 30),
      },
      transitions: [...transitions].slice(0, 80),
      transforms: [...transforms].slice(0, 40),
      animations: [...animations].slice(0, 40),
    }
  })

  // Normalize palette to hex
  const toHexEntry = (v) => {
    const parsed = rgbToHex(v)
    if (!parsed) return null
    if (typeof parsed === 'object') return `${parsed.hex}@${parsed.alpha}`
    return parsed
  }
  const palette = {
    color: uniq(computed.colors.color.map(toHexEntry)),
    backgroundColor: uniq(computed.colors.backgroundColor.map(toHexEntry)),
    borderColor: uniq(computed.colors.borderColor.map(toHexEntry)),
    raw: computed.colors,
  }

  // ─── DOM structure ───────────────────────────────────────────────────
  console.log('Capturing DOM structure…')
  const structure = await page.evaluate(() => {
    const summarize = (el, depth = 0) => {
      if (!el || depth > 4) return null
      const cs = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      if (rect.height < 8 && depth > 0) return null
      const kids = [...el.children]
        .map((c) => summarize(c, depth + 1))
        .filter(Boolean)
        .slice(0, 20)
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || undefined,
        className: String(el.className || '')
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 8)
          .join(' '),
        role: el.getAttribute('role') || undefined,
        display: cs.display,
        position: cs.position,
        sticky: cs.position === 'sticky' || cs.position === 'fixed',
        flex: cs.display.includes('flex')
          ? { direction: cs.flexDirection, gap: cs.gap, justify: cs.justifyContent, align: cs.alignItems }
          : undefined,
        grid: cs.display.includes('grid')
          ? { cols: cs.gridTemplateColumns, gap: cs.gap }
          : undefined,
        size: { w: Math.round(rect.width), h: Math.round(rect.height) },
        children: kids.length ? kids : undefined,
      }
    }

    const sections = [...document.querySelectorAll('header, nav, main, section, footer, [class*="hero"], [class*="section"]')]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.height > 50
      })
      .slice(0, 40)
      .map((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        const text = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 200)
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: String(el.className || '').slice(0, 200),
          display: cs.display,
          position: cs.position,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          backgroundColor: cs.backgroundColor,
          size: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + window.scrollY) },
          textPreview: text,
          childCount: el.children.length,
        }
      })

    // Component candidates
    const buttons = [...document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [role="button"]')]
      .slice(0, 30)
      .map((el) => {
        const cs = getComputedStyle(el)
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || '').trim().slice(0, 60),
          className: String(el.className || '').slice(0, 120),
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          borderRadius: cs.borderRadius,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          border: cs.border,
          transition: cs.transition,
          textTransform: cs.textTransform,
          letterSpacing: cs.letterSpacing,
        }
      })

    return {
      title: document.title,
      tree: summarize(document.body, 0),
      sections,
      buttons,
    }
  })

  // ─── Hover / transition sampling on buttons ──────────────────────────
  console.log('Sampling button hover states…')
  const buttonHovers = []
  const btnLocators = page.locator('button, a[class*="btn"], a[class*="button"], [role="button"]')
  const btnCount = Math.min(await btnLocators.count(), 12)
  for (let i = 0; i < btnCount; i++) {
    const btn = btnLocators.nth(i)
    try {
      if (!(await btn.isVisible())) continue
      const before = await btn.evaluate((el) => {
        const cs = getComputedStyle(el)
        return {
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          transform: cs.transform,
          boxShadow: cs.boxShadow,
          opacity: cs.opacity,
          transition: cs.transition,
          borderColor: cs.borderColor,
        }
      })
      await btn.hover({ timeout: 2000 })
      await page.waitForTimeout(350)
      const after = await btn.evaluate((el) => {
        const cs = getComputedStyle(el)
        return {
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          transform: cs.transform,
          boxShadow: cs.boxShadow,
          opacity: cs.opacity,
          transition: cs.transition,
          borderColor: cs.borderColor,
        }
      })
      const text = await btn.innerText().catch(() => '')
      buttonHovers.push({ text: text.trim().slice(0, 60), before, after })
    } catch {
      // skip
    }
  }
  // Reset hover
  await page.mouse.move(0, 0)

  // ─── Animation / library detection ───────────────────────────────────
  console.log('Detecting animation libraries…')
  const animationIntel = await page.evaluate(() => {
    const scripts = [...document.scripts].map((s) => s.src).filter(Boolean)
    const inlineHints = []
    const bundleHints = {
      gsap: false,
      framerMotion: false,
      aos: false,
      lottie: false,
      anime: false,
      scrollTrigger: false,
      lenis: false,
      locoScroll: false,
    }
    for (const src of scripts) {
      const l = src.toLowerCase()
      if (l.includes('gsap') || l.includes('ScrollTrigger'.toLowerCase())) bundleHints.gsap = true
      if (l.includes('framer')) bundleHints.framerMotion = true
      if (l.includes('aos')) bundleHints.aos = true
      if (l.includes('lottie')) bundleHints.lottie = true
      if (l.includes('anime')) bundleHints.anime = true
      if (l.includes('lenis')) bundleHints.lenis = true
      if (l.includes('locomotive')) bundleHints.locoScroll = true
    }
    // Global checks
    const g = typeof window !== 'undefined' ? window : {}
    return {
      scripts: scripts.slice(0, 80),
      globals: {
        gsap: !!g.gsap,
        ScrollTrigger: !!g.ScrollTrigger,
        AOS: !!g.AOS,
        anime: !!g.anime,
        Lenis: !!g.Lenis,
        __NEXT_DATA__: !!g.__NEXT_DATA__,
      },
      bundleHints,
      intersectionObserversLikely: !!g.IntersectionObserver,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      keyframes: (() => {
        const names = []
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.type === CSSRule.KEYFRAMES_RULE) names.push(rule.name)
            }
          } catch {}
        }
        return names
      })(),
    }
  })

  // Scroll-driven animation sampling
  console.log('Sampling scroll animations…')
  const scrollSamples = []
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const steps = 8
  for (let i = 0; i <= steps; i++) {
    const y = Math.floor((totalHeight * i) / steps)
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(400)
    const sample = await page.evaluate((scrollY) => {
      const els = [...document.querySelectorAll('*')].filter((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return (
          r.top < window.innerHeight &&
          r.bottom > 0 &&
          r.height > 40 &&
          (cs.opacity !== '1' ||
            (cs.transform && cs.transform !== 'none') ||
            cs.position === 'sticky' ||
            cs.position === 'fixed')
        )
      })
      return {
        scrollY,
        stickyFixed: els
          .filter((el) => {
            const p = getComputedStyle(el).position
            return p === 'sticky' || p === 'fixed'
          })
          .slice(0, 10)
          .map((el) => ({
            tag: el.tagName.toLowerCase(),
            className: String(el.className || '').slice(0, 80),
            position: getComputedStyle(el).position,
            top: getComputedStyle(el).top,
          })),
        fadedOrTransformed: els
          .filter((el) => {
            const cs = getComputedStyle(el)
            return cs.opacity !== '1' || (cs.transform && cs.transform !== 'none')
          })
          .slice(0, 15)
          .map((el) => {
            const cs = getComputedStyle(el)
            return {
              tag: el.tagName.toLowerCase(),
              className: String(el.className || '').slice(0, 80),
              opacity: cs.opacity,
              transform: cs.transform,
              transition: cs.transition,
              animation: cs.animation,
            }
          }),
      }
    }, y)
    scrollSamples.push(sample)
    await page.screenshot({
      path: path.join(SECTIONS, `scroll-${String(i).padStart(2, '0')}-y${y}.png`),
      fullPage: false,
    })
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  // ─── Section screenshots (full page + clip by section) ───────────────
  console.log('Screenshotting sections…')
  await page.screenshot({ path: path.join(SCREENSHOTS, 'full-1440.png'), fullPage: true })

  const sectionBoxes = await page.evaluate(() => {
    return [...document.querySelectorAll('header, nav, main, section, footer')]
      .map((el, idx) => {
        const r = el.getBoundingClientRect()
        return {
          idx,
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: String(el.className || '')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 4)
            .join('_'),
          x: Math.max(0, Math.round(r.left)),
          y: Math.max(0, Math.round(r.top + window.scrollY)),
          width: Math.round(r.width),
          height: Math.round(Math.min(r.height, 4000)),
        }
      })
      .filter((s) => s.height > 60 && s.width > 100)
  })

  for (const s of sectionBoxes.slice(0, 25)) {
    const name = `section-${String(s.idx).padStart(2, '0')}-${s.tag}-${s.id || s.className || 'anon'}`.replace(
      /[^a-zA-Z0-9_-]/g,
      '_'
    )
    try {
      await page.screenshot({
        path: path.join(SECTIONS, `${name}.png`),
        clip: {
          x: s.x,
          y: s.y,
          width: Math.min(s.width, 1440),
          height: Math.min(s.height, 2000),
        },
      })
    } catch (e) {
      // clip may fail if out of bounds
    }
  }

  // ─── Breakpoint screenshots + layout metrics ─────────────────────────
  console.log('Capturing breakpoints…')
  const breakpointData = {}
  for (const w of BREAKPOINTS) {
    await page.setViewportSize({ width: w, height: Math.round(w * 0.7) })
    await page.waitForTimeout(800)
    const metrics = await page.evaluate(() => {
      const body = getComputedStyle(document.body)
      const containers = [...document.querySelectorAll('*')]
        .map((el) => {
          const cs = getComputedStyle(el)
          const mw = cs.maxWidth
          if (!mw || mw === 'none') return null
          const n = parseFloat(mw)
          if (!(n > 400)) return null
          return { maxWidth: mw, className: String(el.className || '').slice(0, 80) }
        })
        .filter(Boolean)
        .slice(0, 15)
      const nav = document.querySelector('header, nav, [class*="nav"]')
      const navCs = nav ? getComputedStyle(nav) : null
      return {
        scrollHeight: document.documentElement.scrollHeight,
        bodyFontSize: body.fontSize,
        bodyPadding: `${body.paddingTop} ${body.paddingRight} ${body.paddingBottom} ${body.paddingLeft}`,
        containers,
        nav: navCs
          ? {
              height: navCs.height,
              position: navCs.position,
              display: navCs.display,
              padding: `${navCs.paddingTop} ${navCs.paddingRight} ${navCs.paddingBottom} ${navCs.paddingLeft}`,
            }
          : null,
      }
    })
    const shotPath = path.join(SCREENSHOTS, `bp-${w}.png`)
    await page.screenshot({ path: shotPath, fullPage: true })
    breakpointData[w] = { ...metrics, screenshot: path.relative(ROOT, shotPath) }
    console.log(`  ${w}px → scrollHeight=${metrics.scrollHeight}`)
  }

  // Reset viewport
  await page.setViewportSize({ width: 1440, height: 900 })

  // ─── Download fonts ──────────────────────────────────────────────────
  console.log('Downloading fonts…')
  const downloadedFonts = []
  const allFontUrls = new Set([...fontUrls])
  for (const face of fontFaces) {
    for (const u of face.urls || []) allFontUrls.add(u)
  }
  for (const u of allFontUrls) {
    if (u.startsWith('data:')) continue
    const result = await downloadFont(page, u, FONTS)
    if (result) downloadedFonts.push(result)
  }

  // Identify Google / Adobe fonts
  const fontProviders = {
    googleFonts: [...allFontUrls].filter((u) => /fonts\.googleapis|fonts\.gstatic/i.test(u)),
    adobeFonts: [...allFontUrls].filter((u) => /use\.typekit\.net|adobe/i.test(u)),
    other: [...allFontUrls].filter(
      (u) => !/fonts\.googleapis|fonts\.gstatic|typekit|adobe/i.test(u) && !u.startsWith('data:')
    ),
  }

  // ─── Page HTML snapshot (structure only, truncated) ──────────────────
  const htmlSnippet = await page.evaluate(() => {
    const clone = document.documentElement.cloneNode(true)
    // strip scripts
    clone.querySelectorAll('script, noscript, style').forEach((n) => n.remove())
    return clone.outerHTML.slice(0, 200000)
  })
  fs.writeFileSync(path.join(OUT, 'page-structure.html'), htmlSnippet)

  // ─── Assemble design-tokens.json ─────────────────────────────────────
  const tokens = {
    source: URL,
    extractedAt: new Date().toISOString(),
    viewportDefault: { width: 1440, height: 900 },
    meta: {
      title: structure.title,
    },
    cssVariables,
    palette,
    typography: computed.typography,
    spacing: computed.spacing,
    fontFaces,
    fonts: {
      downloaded: downloadedFonts,
      providers: fontProviders,
      networkUrls: [...allFontUrls],
    },
    structure: {
      sections: structure.sections,
      buttons: structure.buttons,
      tree: structure.tree,
    },
    interactions: {
      transitions: computed.transitions,
      transforms: computed.transforms,
      cssAnimations: computed.animations,
      buttonHovers,
    },
    animationIntel: {
      ...animationIntel,
      scrollSamples,
    },
    breakpoints: breakpointData,
    notes: [
      'Colors include alpha-suffixed hex where alpha < 1 (e.g. #000000@0.5).',
      'Section screenshots saved under design-tokens/harmonic/sections/.',
      'Breakpoint full-page screenshots under design-tokens/harmonic/screenshots/.',
      'Do not copy Harmonic marketing copy verbatim when rebuilding.',
    ],
  }

  const tokensPath = path.join(ROOT, 'design-tokens.json')
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
  // also mirror under design-tokens/harmonic
  fs.writeFileSync(path.join(OUT, 'design-tokens.json'), JSON.stringify(tokens, null, 2))

  console.log('\nDone.')
  console.log('Wrote', tokensPath)
  console.log('Palette colors:', palette.color.length)
  console.log('BG colors:', palette.backgroundColor.length)
  console.log('CSS vars:', Object.keys(cssVariables).length)
  console.log('Font faces:', fontFaces.length)
  console.log('Fonts downloaded:', downloadedFonts.length)
  console.log('Sections:', structure.sections.length)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
