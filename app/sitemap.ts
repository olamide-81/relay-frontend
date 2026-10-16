import type { MetadataRoute } from 'next'
import { getAllReportSlugs } from '@/data/reports'
import { routing } from '@/i18n/routing'
import { languageAlternates, localizedPath } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { CATEGORY_META } from '@/lib/dc/meta'

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
  ['/signup', 0.5, 'monthly'],
  ['/privacy', 0.3, 'monthly'],
  ['/terms', 0.3, 'monthly'],
  ['/cookies', 0.3, 'monthly'],
]

/** Research pages are translated, so they keep every locale with hreflang. */
const TRANSLATED = ['/reports', '/methodology'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = SITE_PAGES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${localizedPath(routing.defaultLocale, path || '/')}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const translated = [...TRANSLATED, ...getAllReportSlugs().map((slug) => `/reports/${slug}`)]
  for (const locale of routing.locales) {
    for (const path of translated) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path.startsWith('/reports/') ? 0.8 : 0.7,
        alternates: { languages: languageAlternates(path) },
      })
    }
  }
  return entries
}
