import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { languageAlternates, localizedPath } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { CATEGORY_META } from '@/lib/dc/meta'
import { isPageVisible } from '@/lib/site-pages'
import { getReportEntries } from '@/lib/reports'
import { syncSiteContent } from '@/lib/site-content.server'
import { SIGNUP_OPEN } from '@/lib/launch'

/** Redesigned pages are English-only: one URL each, under /en. */
const SITE_PAGES: [path: string, priority: number, freq: 'weekly' | 'monthly'][] = [
  ['', 1, 'weekly'],
  ['/product', 0.9, 'monthly'],
  ['/directory', 0.9, 'weekly'],
  ['/pricing', 0.9, 'monthly'],
  ...Object.keys(CATEGORY_META).map((k): [string, number, 'weekly'] => [`/categories/${k}`, 0.85, 'weekly']),
  ['/intelligence', 0.8, 'weekly'],
  ['/customers', 0.7, 'monthly'],
  ['/for-providers', 0.7, 'monthly'],
  ['/developers', 0.7, 'monthly'],
  ['/security', 0.6, 'monthly'],
  ['/changelog', 0.6, 'weekly'],
  ['/about', 0.6, 'monthly'],
  ['/careers', 0.5, 'monthly'],
  ['/contact', 0.5, 'monthly'],
  [SIGNUP_OPEN ? '/signup' : '/waitlist', 0.5, 'monthly'],
  ['/privacy', 0.3, 'monthly'],
  ['/terms', 0.3, 'monthly'],
  ['/cookies', 0.3, 'monthly'],
]

/** Research pages are translated, so they keep every locale with hreflang. */
const TRANSLATED = ['/methodology'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await syncSiteContent()
  const now = new Date()
  const entries: MetadataRoute.Sitemap = SITE_PAGES.filter(([path]) => isPageVisible(path || '/')).map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${localizedPath(routing.defaultLocale, path || '/')}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Public reports only (config/reports.json).
  const reportEntries = isPageVisible('/reports') ? getReportEntries('site') : []
  const reports = reportEntries.map((r) => `/reports/${r.slug}`)
  const modified = Object.fromEntries(
    reportEntries.map((r) => [`/reports/${r.slug}`, new Date(r.report.updatedAt ?? r.report.publishedAt)]),
  )
  const translated = [...TRANSLATED, ...reports].filter((p) => isPageVisible(p))
  for (const locale of routing.locales) {
    for (const path of translated) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        lastModified: modified[path] ?? now,
        changeFrequency: 'weekly',
        priority: path.startsWith('/reports/') ? 0.8 : 0.7,
        alternates: { languages: languageAlternates(path) },
      })
    }
  }
  return entries
}
