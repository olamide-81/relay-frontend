/**
 * Maps the design files' cross-links (`Relay%20Pricing.dc.html?x#y`) to the
 * app's real routes. Every ported page, link and iframe goes through here.
 */

/** Marketing + auth pages → route (without locale). */
const SITE: Record<string, string> = {
  'Relay Landing': '/',
  'Relay Product': '/product',
  'Relay Directory Page': '/directory',
  'Relay Intelligence Page': '/intelligence',
  'Relay Customers': '/customers',
  'Relay Pricing': '/pricing',
  'Relay Contact': '/contact',
  'Relay About': '/about',
  'Relay Careers': '/careers',
  'Relay Changelog': '/changelog',
  'Relay Security': '/security',
  'Relay Developers': '/developers',
  'Relay For Providers': '/for-providers',
  'Relay Login': '/signin',
  'Relay Sign Up': '/signup',
  'Relay Dashboard': '/dashboard',
  // Not a design file: the existing password-reset flow.
  'Relay Forgot Password': '/forgot-password',
}

/** Dashboard screens that are also standalone design files. */
export const APP_SCREENS: Record<string, string> = {
  'Relay Overview': 'overview',
  'Relay Inbox': 'inbox',
  'Relay Directory': 'directory',
  'Relay Providers': 'providers',
  'Relay Compare': 'compare',
  'Relay Shortlists': 'shortlists',
  'Relay Requests': 'requests',
  'Relay Intelligence': 'intelligence',
  'Relay Profile': 'profile',
  'Relay Settings': 'settings',
  'Relay Provider': 'provider',
}

type Parsed = { name: string; query: string; hash: string }

function parse(raw: string): Parsed | null {
  let s = raw
  try {
    s = decodeURIComponent(raw)
  } catch {}
  const m = /^(?:\.\/)?([^?#]+?)\.dc\.html(\?[^#]*)?(#.*)?$/.exec(s)
  if (!m) return null
  return { name: m[1], query: m[2] ?? '', hash: m[3] ?? '' }
}

function param(query: string, key: string) {
  return new URLSearchParams(query).get(key)
}

/** Href for an anchor or a navigation. Non-design URLs pass through. */
export function dcHref(raw: string, locale: string): string {
  const p = parse(raw)
  if (!p) return raw
  const base = `/${locale}`
  if (p.name === 'Relay Category') {
    return `${base}/categories/${param(p.query, 'kind') ?? 'collections'}${p.hash}`
  }
  if (p.name === 'Relay Legal') {
    return `${base}/${param(p.query, 'doc') ?? 'privacy'}${p.hash}`
  }
  if (p.name in SITE) {
    const path = SITE[p.name]
    return `${base}${path === '/' ? '' : path}${p.query}${p.hash}`
  }
  if (p.name in APP_SCREENS) {
    return `${base}/dashboard/${APP_SCREENS[p.name]}${p.query}${p.hash}`
  }
  return raw
}

/** Src for the scaled product shots: renders a screen standalone, no auth. */
export function dcFrameSrc(raw: string, locale: string): string {
  const p = parse(raw)
  if (!p) return raw
  if (p.name === 'Relay Dashboard') return `/${locale}/preview/dashboard${p.query}`
  if (p.name in APP_SCREENS) return `/${locale}/preview/${APP_SCREENS[p.name]}${p.query}`
  return dcHref(raw, locale)
}

/** Design-relative asset paths → public files. */
export function dcAsset(raw: string): string {
  if (raw.startsWith('assets/')) return '/relay/' + raw.slice('assets/'.length)
  return raw
}
