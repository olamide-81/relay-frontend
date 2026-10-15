import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

/** Titles and descriptions for the redesigned marketing pages (copy from the designs). */
export const PAGE_META: Record<string, { title: string; description: string; noIndex?: boolean }> = {
  '/': {
    title: 'Relay — Every financial Provider. One directory.',
    description:
      'Relay maps 1,600 infrastructure partners across 140 countries so fintech teams can find, compare and partner in days, not quarters.',
  },
  '/product': {
    title: 'Product',
    description:
      'Search the market, compare real commercials, rank options with your team and open conversations, without leaving Relay.',
  },
  '/directory': {
    title: 'Directory',
    description: 'Search 1,600 Providers across Collections, Payouts, FX, Cards, KYC and Banks. Verified every week.',
  },
  '/intelligence': {
    title: 'Intelligence',
    description:
      'Pricing changes, launches, licences and benchmarks across every Provider in Relay, refreshed daily and filtered to what you watch.',
  },
  '/customers': {
    title: 'Customers',
    description: 'Teams that move money choose partners with Relay.',
  },
  '/pricing': {
    title: 'Pricing',
    description: 'Start free. Scale with your stack. Plans for founders, startups and enterprise teams.',
  },
  '/contact': {
    title: 'Contact',
    description:
      "Tell us what you're building and the markets you need. We'll reply within one business day.",
  },
  '/about': {
    title: 'About',
    description: 'Financial infrastructure is the most important market nobody could see. Relay is changing that.',
  },
  '/careers': {
    title: 'Careers',
    description:
      "Map the world's financial infrastructure with us. A small, senior team across London, New York and Singapore.",
  },
  '/changelog': { title: 'Changelog', description: "What's new in Relay." },
  '/security': { title: 'Security', description: 'Built for teams that answer to regulators.' },
  '/developers': {
    title: 'Developers',
    description:
      'Query 1,600 Providers, their licences, coverage and pricing from your own tools. Subscribe to webhooks when anything changes.',
  },
  '/for-providers': {
    title: 'For Providers',
    description:
      'Claim your free profile, keep your data accurate and receive qualified requests. Placement is never for sale.',
  },
  '/privacy': { title: 'Privacy policy', description: 'How Relay by Gratebridge collects and uses data.' },
  '/terms': { title: 'Terms of service', description: 'The terms that govern your use of Relay.' },
  '/cookies': { title: 'Cookie policy', description: 'How Relay uses cookies and how to manage them.' },
  '/signin': { title: 'Log in', description: 'Log in to Relay.', noIndex: true },
  '/signup': {
    title: 'Sign up',
    description: 'Create your Relay workspace. Free forever for small teams. No card required.',
    noIndex: true,
  },
}

export const CATEGORY_META: Record<string, { label: string; tag: string }> = {
  collections: { label: 'Collections', tag: 'Money in.' },
  payouts: { label: 'Payouts', tag: 'Money out.' },
  fx: { label: 'FX', tag: 'Every currency.' },
  cards: { label: 'Cards', tag: 'Spend anywhere.' },
  kyc: { label: 'KYC', tag: 'Know who you serve.' },
  bank: { label: 'Banks', tag: 'The regulated core.' },
}

export function pageMetadata(locale: string, path: string): Metadata {
  const m = PAGE_META[path]
  return buildMetadata({
    locale,
    path,
    title: path === '/' ? m.title : `${m.title} | Relay`,
    description: m.description,
    noIndex: m.noIndex,
  })
}
