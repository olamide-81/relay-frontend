import { chromium } from 'playwright'

const base = 'http://localhost:3001'
const browser = await chromium.launch()
const pages = ['signin', 'signup', 'forgot-password']

for (const route of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })
  const res = await page.goto(`${base}/${route}`, { waitUntil: 'networkidle' })
  console.log(route, res?.status())
  await page.waitForTimeout(600)
  await page.screenshot({ path: `/tmp/auth-${route}.png` })
  await page.close()
}

// mobile signin
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
await m.goto(`${base}/signin`, { waitUntil: 'networkidle' })
await m.waitForTimeout(500)
await m.screenshot({ path: `/tmp/auth-signin-mobile.png` })
await m.close()

await browser.close()
console.log('done')
