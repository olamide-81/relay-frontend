import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/** The signed-in app, design previews and auth flows stay out of search. */
const PRIVATE = ['/api/', '/*/dashboard', '/*/preview/', '/*/auth/', '/*/forgot-password', '/*/reset-password', '/*/signin']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: ['GPTBot', 'Google-Extended', 'anthropic-ai', 'ClaudeBot', 'PerplexityBot'], allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
