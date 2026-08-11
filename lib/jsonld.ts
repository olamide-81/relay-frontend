import { absoluteUrl } from '@/lib/seo'
import {
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_SUPPORT_EMAIL,
  SITE_URL,
} from '@/lib/site'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/og-image.png'),
    email: SITE_SUPPORT_EMAIL,
    description:
      'Relay is the data directory and research layer for fintech infrastructure — providers, payment rails, and market intelligence across the Americas, Europe, Africa, and global corridors.',
    foundingDate: '2024',
    areaServed: [
      { '@type': 'Place', name: 'United States' },
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'Africa' },
      { '@type': 'Place', name: 'Latin America' },
      { '@type': 'Place', name: 'Middle East' },
      { '@type': 'Place', name: 'Asia-Pacific' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE_SUPPORT_EMAIL,
        url: 'https://calendly.com/gratebridgelabs/30min',
        areaServed: ['US', 'CA', 'GB', 'EU', 'AF', 'LATAM', 'ME'],
        availableLanguage: ['English', 'French', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE_SUPPORT_EMAIL,
        availableLanguage: ['English', 'French', 'Spanish'],
      },
    ],
    sameAs: [
      'https://calendly.com/gratebridgelabs/30min',
    ],
    knowsAbout: [
      'Fintech infrastructure',
      'Payment rails',
      'Cross-border payments',
      'Digital wallets',
      'Instant payments',
      'KYC providers',
      'FX corridors',
      'Remittances',
      'Stablecoins',
      'Emerging market fintech',
    ],
  }
}

export function websiteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: absoluteUrl(`/${locale}`),
    name: SITE_NAME,
    description:
      'Data directory and research on fintech infrastructure providers, payment rails, and market intelligence worldwide.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
    potentialAction: {
      '@type': 'ReadAction',
      target: [
        absoluteUrl(`/${locale}`),
        absoluteUrl(`/${locale}/reports`),
        absoluteUrl(`/${locale}/about`),
      ],
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(
        item.path.startsWith(`/${locale}`)
          ? item.path
          : `/${locale}${item.path === '/' ? '' : item.path}`,
      ),
    })),
  }
}

type ArticleInput = {
  locale: string
  title: string
  description: string
  path: string
  image?: string
  datePublished: string
  dateModified?: string
  keywords?: string[]
  wordCount?: number
}

export function researchArticleJsonLd({
  locale,
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  keywords = [],
}: ArticleInput) {
  const url = absoluteUrl(path.startsWith('/') ? path : `/${path}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    image: image ? [absoluteUrl(image)] : [absoluteUrl('/og-image.png')],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isAccessibleForFree: true,
    inLanguage: locale,
    articleSection: 'Fintech Research',
    keywords: keywords.join(', '),
    about: [
      { '@type': 'Thing', name: 'Fintech' },
      { '@type': 'Thing', name: 'Global payments' },
      { '@type': 'Thing', name: 'Digital wallets' },
      { '@type': 'Thing', name: 'Instant payments' },
      { '@type': 'Thing', name: 'Cross-border remittances' },
    ],
  }
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function researchIndexJsonLd(
  locale: string,
  reports: {
    title: string
    description: string
    slug: string
    datePublished: string
  }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/${locale}/reports#collection`,
    name: 'Relay Research — Fintech research papers',
    description:
      'Market maps and infrastructure research on global payments, digital wallets, remittances, and fintech rails across the US, Europe, Africa, and emerging markets.',
    url: absoluteUrl(`/${locale}/reports`),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: reports.length,
      itemListElement: reports.map((report, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/${locale}/reports/${report.slug}`),
        name: report.title,
        item: {
          '@type': 'Article',
          headline: report.title,
          description: report.description,
          datePublished: report.datePublished,
          url: absoluteUrl(`/${locale}/reports/${report.slug}`),
        },
      })),
    },
  }
}
