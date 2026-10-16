import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { isPageVisible } from './lib/site-pages'

const intl = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  // Pages switched off in config/site-pages.json answer 404 without being deleted.
  if (!isPageVisible(req.nextUrl.pathname)) {
    const locale = req.nextUrl.pathname.split('/')[1] || routing.defaultLocale
    return NextResponse.rewrite(new URL(`/${locale}/__hidden`, req.url), { status: 404 })
  }
  return intl(req)
}

export const config = {
  // Must be a static string for Next.js. Keep in sync with i18n/routing locales.
  matcher: ['/', '/(en|fr|es|zh|ja|ko|id)/:path*'],
}
