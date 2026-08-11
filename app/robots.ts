import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*/forgot-password',
          '/*/reset-password',
          '/*/signin',
          '/*/signup',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/*/reports', '/*/reports/*', '/*/about', '/*/methodology'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/*/reports', '/*/reports/*'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
