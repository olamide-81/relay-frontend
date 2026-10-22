import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

/**
 * Search and social metadata for the redesigned pages. Copy follows the
 * designs; titles stay under ~60 characters and descriptions ~155 so search
 * results don't truncate them.
 */
type PageMeta = { title: string; description: string; keywords?: string[]; noIndex?: boolean; breadcrumb?: string }

export const SITE_TITLE = 'Relay — Every financial Provider. One directory.'
export const SITE_DESCRIPTION =
  'Find, compare and partner with financial Providers across North America, Europe, Asia, LATAM, Africa and beyond.'

export const SITE_KEYWORDS = [
  'fintech provider directory',
  'financial infrastructure providers',
  'payment service providers',
  'sponsor banks',
  'banking as a service',
  'KYC providers',
  'FX providers',
  'card issuing providers',
  'payout providers',
  'collections providers',
  'compare payment providers',
  'Relay by Gratebridge',
]

export const PAGE_META: Record<string, PageMeta> = {
  '/': { title: SITE_TITLE, description: SITE_DESCRIPTION, keywords: SITE_KEYWORDS },
  '/product': {
    title: 'Product — Search, compare and partner with Providers',
    description:
      'One workspace for choosing financial partners: search Providers across every region we cover, compare real commercials, rank options with your team and request intros.',
    breadcrumb: 'Product',
  },
  '/directory': {
    title: 'Directory — Fintech Providers across every region, verified weekly',
    description:
      'Search Collections, Payouts, FX, Cards, KYC and Banking Providers by rail, licence, region and price. Every profile is verified every week.',
    keywords: ['fintech provider directory', 'payment providers list', 'sponsor bank directory', 'KYC vendor directory'],
    breadcrumb: 'Directory',
  },
  '/intelligence': {
    title: 'Intelligence — Pricing, launches and licence watch',
    description:
      'Pricing changes, launches, licences and FX benchmarks across every Provider in Relay, refreshed daily and filtered to what you watch.',
    breadcrumb: 'Intelligence',
  },
  '/customers': {
    title: 'Customers — Teams that move money choose Relay',
    description:
      'How founders, startups and enterprise teams use Relay to find sponsor banks, cut payout costs and run Provider procurement.',
    breadcrumb: 'Customers',
  },
  '/pricing': {
    title: 'Pricing — Start free, upgrade when you scale',
    description:
      'Free for small teams, Pro at €49 per seat a month, and Enterprise for procurement at scale. No card required to start.',
    breadcrumb: 'Pricing',
  },
  '/contact': {
    title: 'Contact sales — Talk to the team behind Relay',
    description:
      "Tell us what you're building and the markets you need. We'll reply within one business day.",
    breadcrumb: 'Contact',
  },
  '/about': {
    title: 'About — Making financial infrastructure visible',
    description:
      'Every fintech is built on partners. Relay maps the banks, payment and identity Providers behind them so choosing one takes days, not quarters.',
    breadcrumb: 'About',
  },
  '/careers': {
    title: "Careers — Map the world's financial infrastructure",
    description:
      'Join a small, senior team across London, New York and Singapore. Remote-friendly across European and American time zones.',
    breadcrumb: 'Careers',
  },
  '/changelog': {
    title: "Changelog — What's new in Relay",
    description: 'New features, improvements and fixes in Relay — the redesigned directory, waitlist invitations, Relay Research reports and multi-region coverage.',
    breadcrumb: 'Changelog',
  },
  '/security': {
    title: 'Security — Built for teams that answer to regulators',
    description: 'SOC 2 Type II, GDPR, SSO and audit logs. How Relay protects your workspace and data, plus live system status.',
    breadcrumb: 'Security',
  },
  '/developers': {
    title: 'Developers — The Provider graph, as an API',
    description:
      'Query Providers across every region we cover, their licences, coverage and pricing from your own tools, and subscribe to webhooks when anything changes.',
    breadcrumb: 'Developers',
  },
  '/for-providers': {
    title: 'For Providers — Be found by teams ready to sign',
    description:
      'Claim your free Relay profile, keep your data accurate and receive qualified requests. Placement is never for sale.',
    breadcrumb: 'For Providers',
  },
  '/privacy': { title: 'Privacy policy', description: 'How Relay by Gratebridge collects, uses and protects your data.', breadcrumb: 'Privacy policy' },
  '/terms': { title: 'Terms of service', description: 'The terms that govern your use of Relay by Gratebridge.', breadcrumb: 'Terms of service' },
  '/cookies': { title: 'Cookie policy', description: 'Which cookies Relay uses and how to change your preferences.', breadcrumb: 'Cookie policy' },
  '/signin': { title: 'Log in', description: 'Log in to your Relay workspace.', noIndex: true },
  '/signup': {
    title: 'Sign up — Create your Relay workspace',
    description: 'Create a free Relay workspace. Free forever for small teams. No card required.',
  },
  '/waitlist': {
    title: 'Join the waitlist',
    description:
      'Relay is opening to teams in waves. Join the waitlist for early access to Providers across North America, Europe, Asia, LATAM, Africa and beyond.',
  },
  '/forgot-password': { title: 'Reset your password', description: 'Reset your Relay password.', noIndex: true },
  '/reset-password': { title: 'Choose a new password', description: 'Choose a new Relay password.', noIndex: true },
}

export const CATEGORY_META: Record<string, { label: string; tag: string; title: string; description: string }> = {
  collections: {
    label: 'Collections',
    tag: 'Money in.',
    title: 'Collections Providers — Compare across every region',
    description:
      'Compare Collections Providers for acceptance, invoicing and receivables on SEPA, ACH and cards, with pricing, licences and multi-region coverage.',
  },
  payouts: {
    label: 'Payouts',
    tag: 'Money out.',
    title: 'Payout Providers — Compare across every region',
    description:
      'Compare Payout Providers for paying suppliers, sellers and contractors in local currency, with pricing, settlement times and multi-region coverage.',
  },
  fx: {
    label: 'FX',
    tag: 'Every currency.',
    title: 'FX Providers — Compare on real spreads',
    description:
      'Compare FX Providers on spreads, forwards and rate locks across major currencies, with licences and multi-region coverage for each.',
  },
  cards: {
    label: 'Cards',
    tag: 'Spend anywhere.',
    title: 'Card issuing Providers — Compare across every region',
    description:
      'Compare card issuing Providers for virtual and physical Visa and Mastercard programmes, with spend controls, pricing and go-live times.',
  },
  kyc: {
    label: 'KYC',
    tag: 'Know who you serve.',
    title: 'KYC Providers — Compare identity platforms',
    description:
      'Compare KYC and KYB Providers for document checks, biometrics and sanctions screening across North America, Europe, Asia, LATAM, Africa and beyond.',
  },
  bank: {
    label: 'Banks',
    tag: 'The regulated core.',
    title: 'Sponsor & partner banks — Compare for fintech',
    description:
      'Compare sponsor, partner and safeguarding banks for regulated fintech programmes, with licences, virtual IBANs and onboarding times.',
  },
}

export function categoryMetadata(locale: string, kind: string): Metadata {
  const c = CATEGORY_META[kind]
  return buildMetadata({
    locale,
    englishOnly: true,
    path: `/categories/${kind}`,
    title: `${c.title} | Relay`,
    description: c.description,
    keywords: [`${c.label} providers`, `compare ${c.label.toLowerCase()} providers`, ...SITE_KEYWORDS.slice(0, 3)],
  })
}

export function pageMetadata(locale: string, path: string): Metadata {
  const m = PAGE_META[path]
  return buildMetadata({
    locale,
    path,
    englishOnly: true,
    title: path === '/' ? m.title : `${m.title} | Relay`,
    description: m.description,
    keywords: m.keywords,
    noIndex: m.noIndex,
  })
}

/** Home › Page breadcrumb trail for structured data. */
export function breadcrumbFor(path: string): { name: string; path: string }[] | null {
  const m = PAGE_META[path]
  if (!m?.breadcrumb) return null
  return [
    { name: 'Relay', path: '/' },
    { name: m.breadcrumb, path },
  ]
}
