import { readFileSync } from 'node:fs'
import { LandingRuntime } from '@/components/LandingRuntime'

const redesignPath =
  '/Users/olamide/Library/Application Support/Claude/local-agent-mode-sessions/9b4581a3-bb51-46a0-a4ea-9674fc9a2bec/deb2eeea-2d43-4e49-8ba0-5aed707acffc/local_e6b3ce03-5978-459c-bfaf-8efd95bf6bb7/outputs/relay-redesign.html'

function withProviderLogos(html: string) {
  const domainByProvider: Record<string, string> = {
    'Smile Identity': 'smileidentity.com',
    'Mono': 'mono.co',
    'Belvo': 'belvo.com',
    'Currencycloud': 'currencycloud.com',
    'Pawapay': 'pawapay.io',
    'TrueLayer': 'truelayer.com',
    'Flutterwave': 'flutterwave.com',
    'Paystack': 'paystack.com',
    'Youverify': 'youverify.co',
    'dLocal': 'dlocal.com',
    'Koywe': 'koywe.com',
    'Nium': 'nium.com',
    'ComplyAdvantage': 'complyadvantage.com',
    'Onfido': 'onfido.com',
    'Sumsub': 'sumsub.com',
  }

  let out = html
  for (const [name, domain] of Object.entries(domainByProvider)) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(
      `<div class="preview-avatar[^"]*">[^<]*<\\/div>(\\s*<div class="preview-info">\\s*<div class="preview-name">${escaped}<\\/div>)`,
      'g',
    )
    out = out.replace(
      regex,
      `<div class="preview-avatar"><img src="https://logo.clearbit.com/${domain}?size=80" alt="${name} logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null; this.parentElement.textContent='${name
        .split(' ')
        .map((x) => x[0])
        .join('')
        .slice(0, 2)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.color='#fff'; this.parentElement.style.fontFamily='var(--font-mono)'; this.parentElement.style.fontSize='12px'; this.parentElement.style.background='#07070A';" /></div>$1`,
    )
  }

  return out
}

function withCircularFlagCdn(html: string) {
  return html
    .replaceAll('<span class="region-flag">🇳🇬</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/ng.png" alt="Nigeria flag" /></span>')
    .replaceAll('<span class="region-flag">🇰🇪</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/ke.png" alt="Kenya flag" /></span>')
    .replaceAll('<span class="region-flag">🇬🇭</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/gh.png" alt="Ghana flag" /></span>')
    .replaceAll('<span class="region-flag">🇿🇦</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/za.png" alt="South Africa flag" /></span>')
    .replaceAll('<span class="region-flag">🇧🇷</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/br.png" alt="Brazil flag" /></span>')
    .replaceAll('<span class="region-flag">🇲🇽</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/mx.png" alt="Mexico flag" /></span>')
    .replaceAll('<span class="region-flag">🇨🇴</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/co.png" alt="Colombia flag" /></span>')
    .replaceAll('<span class="region-flag">🇨🇱</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/cl.png" alt="Chile flag" /></span>')
    .replaceAll('<span class="region-flag">🇬🇧</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/gb.png" alt="United Kingdom flag" /></span>')
    .replaceAll('<span class="region-flag">🇩🇪</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/de.png" alt="Germany flag" /></span>')
    .replaceAll('<span class="region-flag">🇫🇷</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/fr.png" alt="France flag" /></span>')
    .replaceAll('<span class="region-flag">🇳🇱</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/nl.png" alt="Netherlands flag" /></span>')
    .replaceAll('<span class="region-flag">🇺🇸</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/us.png" alt="United States flag" /></span>')
    .replaceAll('<span class="region-flag">🇸🇬</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/sg.png" alt="Singapore flag" /></span>')
    .replaceAll('<span class="region-flag">🇮🇳</span>', '<span class="region-flag"><img src="https://flagcdn.com/w40/in.png" alt="India flag" /></span>')
    .replaceAll(
      '</style>',
      `
  .region-flag { overflow: hidden; border-radius: 999px; width: 28px; height: 28px; padding: 0; }
  .region-flag img { width: 100%; height: 100%; object-fit: cover; object-position: center; display:block; }
  .preview-avatar img { width: 100%; height: 100%; object-fit: contain; object-position: center; }
</style>`,
    )
}

function applyRequestedContentChanges(html: string) {
  return html
    .replaceAll('relay-logo-light.png', '/relaylight.png')
    .replace('href="#" class="btn btn-ghost">Sign in</a>', 'href="/signin" class="btn btn-ghost">Sign in</a>')
    .replaceAll('href="#cta" class="btn btn-primary">Get early access <span class="arrow">→</span></a>', 'href="#cta" class="btn btn-primary">Get early access <span class="arrow">→</span></a>')
    .replace('href="#cta" class="unlock">Unlock full directory <span style="margin-left:2px">→</span></a>', 'href="#cta" class="unlock">Unlock full directory <span style="margin-left:2px">→</span></a>')
    .replace('href="#cta" class="btn btn-secondary">Start browsing</a>', 'href="#cta" class="btn btn-secondary">Start browsing</a>')
    .replace('href="#cta" class="btn btn-primary">Get full access <span class="arrow">→</span></a>', 'href="#cta" class="btn btn-primary">Get full access <span class="arrow">→</span></a>')
    .replace('Relay is built by GrateBridge Labs, a small team of former fintech builders from Lagos, London, and Mexico City.', 'Relay is built by GrateBridge Labs, a Nigerian and US based team of fintech builders.')
    .replace('<p class="founder-sig"><b>The GrateBridge Labs team</b> <span>· Lagos · London · Mexico City</span></p>', '<p class="founder-sig"><b>The GrateBridge Labs team</b> <span>· Nigeria · United States</span></p>')
    .replace('<li><a href="#">API access</a></li>', '<li><a href="/blog">Blog</a></li>')
    .replace('<li><a href="#">About</a></li>', '')
    .replace('<li><a href="#">GrateBridge</a></li>', '<li><a href="https://gratebridge.com" target="_blank" rel="noreferrer">GrateBridge</a></li>')
    .replace('<li><a href="#">Blog</a></li>', '<li><a href="/blog">Blog</a></li>')
    .replace('<li><a href="#">Contact</a></li>', '<li><a href="/contact">Contact</a></li>')
    .replace('<li><a href="#">Privacy</a></li>', '<li><a href="/privacy">Privacy</a></li>')
    .replace('<li><a href="#">Terms</a></li>', '<li><a href="/terms">Terms</a></li>')
    .replace('<li><a href="#">Security</a></li>', '<li><a href="/security">Security</a></li>')
    .replace('<p>Notes from fintech teams on the Relay waitlist.</p>', '<p>Notes from fintech teams on the Relay waitlist.</p><p style="margin-top:10px"><a href="/blog" style="color:var(--blue);font-weight:500">Read more on our blog →</a></p>')
}

export default function Page() {
  const rawHtml = readFileSync(redesignPath, 'utf8')
  const processed = withCircularFlagCdn(withProviderLogos(applyRequestedContentChanges(rawHtml)))

  const styleMatch = processed.match(/<style>([\s\S]*?)<\/style>/i)
  const bodyMatch = processed.match(/<body>([\s\S]*?)<\/body>/i)

  const css = styleMatch ? styleMatch[1] : ''
  const bodyHtml = bodyMatch ? bodyMatch[1] : processed

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <LandingRuntime />
    </>
  )
}
