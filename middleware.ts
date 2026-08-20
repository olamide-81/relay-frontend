import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Must be a static string for Next.js. Keep in sync with i18n/routing locales.
  matcher: ['/', '/(en|fr|es|zh|ja|ko|id)/:path*'],
}
