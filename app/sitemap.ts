import type { MetadataRoute } from 'next'
import { getAllReportSlugs } from '@/data/reports'
import { routing } from '@/i18n/routing'
import { languageAlternates, localizedPath } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

/** Public, indexable routes only — auth flows stay out of the sitemap. */
const STATIC_PATHS = [
  '',
  '/reports',
  '/about',
  '/methodology',
  '/privacy',
  '/terms',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const reportSlugs = getAllReportSlugs()
  const now = new Date()

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      const isHome = path === ''
      const isResearch = path === '/reports'
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path || '/')}`,
        lastModified: now,
        changeFrequency: isHome || isResearch ? 'weekly' : 'monthly',
        priority: isHome ? 1 : isResearch ? 0.95 : 0.7,
        alternates: {
          languages: languageAlternates(path || '/'),
        },
      })
    }

    for (const slug of reportSlugs) {
      const path = `/reports/${slug}`
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.98,
        alternates: {
          languages: languageAlternates(path),
        },
      })
    }
  }

  return entries
}
