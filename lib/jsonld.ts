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
    name: 'Relay by Gratebridge',
    alternateName: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/relay/relay-icon.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/og-image.png'),
    email: SITE_SUPPORT_EMAIL,
    description:
      'Relay is the directory of financial infrastructure Providers: 1,600 collections, payouts, FX, cards, KYC and banking partners across 140 countries, with tools to compare them and request introductions.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1021 E Lincolnway Suite #7415',
      addressLocality: 'Cheyenne',
      addressRegion: 'WY',
      postalCode: '82001',
      addressCountry: 'US',
    },
    parentOrganization: { '@type': 'Organization', name: SITE_LEGAL_NAME },
    areaServed: 'Worldwide',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE_SUPPORT_EMAIL,
        url: absoluteUrl('/en/contact'),
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE_SUPPORT_EMAIL,
        availableLanguage: ['English'],
      },
    ],
    knowsAbout: [
      'Payment service providers',
      'Sponsor banks',
      'Banking as a service',
      'KYC and identity verification',
      'FX and cross-border payments',
      'Card issuing',
      'Payouts',
      'Collections and acquiring',
      'Fintech licensing',
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
    alternateName: 'Relay by Gratebridge',
    description: 'Every financial Provider. One directory. Find, compare and partner with 1,600 Providers across 140 countries.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

/** The product itself, with its public plans (Relay Pricing design). */
export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app`,
    name: 'Relay',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Fintech infrastructure directory',
    operatingSystem: 'Web',
    url: absoluteUrl('/en'),
    image: absoluteUrl('/og-image.png'),
    description:
      'Search 1,600 financial infrastructure Providers by rail, licence, region and price, compare them side by side, build shortlists with your team and request introductions.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', url: absoluteUrl('/en/pricing') },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '49',
        priceCurrency: 'EUR',
        url: absoluteUrl('/en/pricing'),
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '49', priceCurrency: 'EUR', unitText: 'per seat per month' },
      },
    ],
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

/** Article markup for a Relay Research report page (news/article rich results). */
export function reportArticleJsonLd(input: {
  locale: string
  path: string
  headline: string
  description: string
  images: string[]
  datePublished: string
  dateModified?: string
  keywords: string[]
  section: string
  wordCount: number
}) {
  const url = absoluteUrl(input.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    // Google shows at most 110 characters of a headline.
    headline: input.headline.length > 110 ? input.headline.slice(0, 107).trimEnd() + '…' : input.headline,
    description: input.description,
    image: input.images.map((i) => absoluteUrl(i)),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Organization', name: 'Relay Research', url: absoluteUrl('/en/intelligence') },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isAccessibleForFree: true,
    inLanguage: input.locale,
    articleSection: input.section,
    keywords: input.keywords.join(', '),
    wordCount: input.wordCount,
  }
}
