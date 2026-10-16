import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { isPageVisible, setPages } from './lib/site-pages'
import { apiBaseUrl } from './lib/api/config'
import { SIGNUP_OPEN } from './lib/launch'

const intl = createMiddleware(routing)

/** Page switches from the admin panel, refreshed at most once a minute per instance. */
let pagesAt = 0
let pagesLoading: Promise<void> | null = null
function refreshPages() {
  if (Date.now() - pagesAt < 60_000) return Promise.resolve()
  pagesLoading ??= fetch(`${apiBaseUrl}/api/site/content/pages`, { signal: AbortSignal.timeout(1500) })
    .then((r) => (r.ok ? r.json() : null))
    .then((v: { pages?: Record<string, boolean> } | null) => setPages(v?.pages))
    .catch(() => {})
    .finally(() => {
      pagesAt = Date.now()
      pagesLoading = null
    })
  return pagesLoading
}

export default async function middleware(req: NextRequest) {
  // Links from emails and Paystack carry no locale (/dashboard/…); next-intl redirects them to /en/…
  const first = req.nextUrl.pathname.split('/')[1]
  if (first && !(routing.locales as readonly string[]).includes(first)) return intl(req)
  // Pre-launch: sign up is closed, so /signup goes to the waitlist (invite links still open it).
  const [, locale, page] = req.nextUrl.pathname.split('/')
  if (!SIGNUP_OPEN && page === 'signup' && !req.nextUrl.searchParams.has('invite')) {
    return NextResponse.redirect(new URL(`/${locale}/waitlist${req.nextUrl.search}`, req.url), 307)
  }
  await refreshPages()
  // Pages switched off in the admin (defaults: config/site-pages.json) answer 404 without being deleted.
  if (!isPageVisible(req.nextUrl.pathname)) {
    const locale = req.nextUrl.pathname.split('/')[1] || routing.defaultLocale
    return NextResponse.rewrite(new URL(`/${locale}/__hidden`, req.url), { status: 404 })
  }
  return intl(req)
}

export const config = {
  // Must be a static string for Next.js. Keep in sync with i18n/routing locales.
  matcher: ['/', '/(en|fr|es|zh|ja|ko|id)/:path*', '/((?!api|_next|_vercel|og|.*\\..*).*)'],
}
