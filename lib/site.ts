/** Canonical production origin for Relay. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
    : 'https://relay.gratebridge.com')

export const SITE_NAME = 'Relay'
export const SITE_LEGAL_NAME = 'GrateBridge Labs'
export const SITE_SUPPORT_EMAIL = 'support@relay.gratebridge.com'
export const SITE_TWITTER = '@gratebridgelabs'

export const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  id: 'id_ID',
}

/** Markets we explicitly optimize discovery for. */
export const SEO_REGIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'European Union',
  'Africa',
  'Latin America',
  'Middle East',
  'Asia Pacific',
  'China',
  'Japan',
  'South Korea',
  'India',
  'Southeast Asia',
  'Indonesia',
] as const
