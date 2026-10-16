import config from '@/config/site-pages.json'
import { routing } from '@/i18n/routing'

/**
 * Page visibility switches. Defaults come from config/site-pages.json; the live
 * values are managed in the admin panel (Content › Pages) and applied with setPages().
 */
const PAGES: Record<string, boolean> = { ...(config.pages as Record<string, boolean>) }

export function setPages(pages: Record<string, boolean> | null | undefined) {
  if (!pages) return
  for (const k of Object.keys(PAGES)) delete PAGES[k]
  Object.assign(PAGES, config.pages, pages)
}

const LOCALE_RE = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`)

/** Path without language prefix, query or hash: "/en/careers?x" → "/careers". */
export function pagePath(pathOrHref: string): string {
  const path = pathOrHref.split(/[?#]/)[0].replace(LOCALE_RE, '') || '/'
  return path.length > 1 ? path.replace(/\/$/, '') : path
}

/** False when the page, or a section that contains it, is switched off. */
export function isPageVisible(pathOrHref: string): boolean {
  const path = pagePath(pathOrHref)
  for (const [key, on] of Object.entries(PAGES)) {
    if (on) continue
    if (path === key || (key !== '/' && path.startsWith(key + '/'))) return false
  }
  return true
}

/** Internal hrefs that point at a hidden page (external links are always shown). */
export function isHiddenHref(href: string | undefined | null): boolean {
  if (!href || !href.startsWith('/')) return false
  return !isPageVisible(href)
}
