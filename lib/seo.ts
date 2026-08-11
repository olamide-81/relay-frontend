import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { OG_LOCALE, SITE_NAME, SITE_TWITTER, SITE_URL } from '@/lib/site'

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/** Locale-prefixed path, e.g. `/en/reports`. */
export function localizedPath(locale: string, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}

export function languageAlternates(path = '/') {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, path))
  }
  languages['x-default'] = absoluteUrl(
    localizedPath(routing.defaultLocale, path),
  )
  return languages
}

type BuildMetadataInput = {
  locale: string
  title: string
  description: string
  path?: string
  image?: {
    url: string
    width?: number
    height?: number
    alt?: string
  }
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noIndex?: boolean
}

export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  image,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  titleTemplate = false,
}: BuildMetadataInput & { titleTemplate?: boolean }): Metadata {
  const url = absoluteUrl(localizedPath(locale, path))
  const ogImage = image ?? {
    url: absoluteUrl('/og-image.png'),
    width: 1768,
    height: 931,
    alt: `${SITE_NAME} — fintech infrastructure data and research`,
  }

  const ogLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? l)

  return {
    metadataBase: new URL(SITE_URL),
    title: titleTemplate
      ? {
          default: title,
          template: `%s | ${SITE_NAME}`,
        }
      : {
          absolute: title,
        },
    description,
    keywords: keywords.length ? keywords : undefined,
    applicationName: SITE_NAME,
    authors: authors?.map((name) => ({ name })) ?? [
      { name: SITE_NAME, url: SITE_URL },
    ],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'Finance',
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale: ogLocales,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage.url.startsWith('http')
            ? ogImage.url
            : absoluteUrl(ogImage.url),
          width: ogImage.width ?? 1200,
          height: ogImage.height ?? 630,
          alt: ogImage.alt ?? title,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: authors ?? [SITE_NAME],
            section: 'Research',
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title,
      description,
      images: [
        ogImage.url.startsWith('http') ? ogImage.url : absoluteUrl(ogImage.url),
      ],
    },
    other: {
      'geo.region': 'US',
      'geo.placename': 'Global',
    },
  }
}
