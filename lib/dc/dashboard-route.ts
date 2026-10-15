/**
 * Dashboard routing: the ported shell keeps `page` + `params` in state (as in
 * the design); these helpers mirror that state into /dashboard/<page>?<params>.
 */

export type DashRoute = { page: string; params: Record<string, unknown> }

export const DASH_PAGES = [
  'overview', 'inbox', 'compare', 'directory', 'providers', 'shortlists',
  'requests', 'intelligence', 'profile', 'settings', 'provider',
] as const

/** Routes from the previous dashboard, kept working. */
const ALIASES: Record<string, DashRoute> = {
  intros: { page: 'requests', params: {} },
  markets: { page: 'intelligence', params: {} },
  plans: { page: 'settings', params: { section: 'billing' } },
  billing: { page: 'settings', params: { section: 'billing' } },
  subscription: { page: 'settings', params: { section: 'billing' } },
}

const ARRAY_KEYS = new Set(['ids'])

export function routeFromUrl(slug: string[] | undefined, search: URLSearchParams): DashRoute {
  const [first, second] = slug ?? []
  if (!first) return { page: 'overview', params: {} }
  if (ALIASES[first]) return ALIASES[first]
  // Old /dashboard/providers/<id> links open the Provider page.
  if (first === 'providers' && second) return { page: 'provider', params: { id: second, from: 'directory' } }
  const page = (DASH_PAGES as readonly string[]).includes(first) ? first : 'overview'
  const params: Record<string, unknown> = {}
  search.forEach((v, k) => {
    if (k === 'plan') return
    if (ARRAY_KEYS.has(k)) params[k] = v ? v.split(',') : []
    else if (v === 'true' || v === 'false') params[k] = v === 'true'
    else params[k] = v
  })
  return { page, params }
}

export function urlFromRoute(locale: string, page: string, params: Record<string, unknown> = {}) {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v == null || v === '') continue
    q.set(k, Array.isArray(v) ? v.join(',') : String(v))
  }
  const path = page === 'overview' ? `/${locale}/dashboard` : `/${locale}/dashboard/${page}`
  const qs = q.toString()
  return qs ? `${path}?${qs}` : path
}
