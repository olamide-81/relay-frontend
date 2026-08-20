import { asiaPacificReport } from './asia-pacific-report'
import { asiaPacificReportEs } from './asia-pacific-report.es'
import { asiaPacificReportFr } from './asia-pacific-report.fr'
import { asiaPacificReportId } from './asia-pacific-report.id'
import { asiaPacificReportJa } from './asia-pacific-report.ja'
import { asiaPacificReportKo } from './asia-pacific-report.ko'
import { asiaPacificReportZh } from './asia-pacific-report.zh'
import { fintech35TrillionReport } from './fintech-35-trillion-report'
import { fintech35TrillionReportEs } from './fintech-35-trillion-report.es'
import { fintech35TrillionReportFr } from './fintech-35-trillion-report.fr'
import { fintech35TrillionReportId } from './fintech-35-trillion-report.id'
import { fintech35TrillionReportJa } from './fintech-35-trillion-report.ja'
import { fintech35TrillionReportKo } from './fintech-35-trillion-report.ko'
import { fintech35TrillionReportZh } from './fintech-35-trillion-report.zh'
import type { Locale } from '@/i18n/routing'
import { localeTags, routing } from '@/i18n/routing'

export type ReportMetric = {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'down' | 'flat' | 'alert'
}

export type ReportFinding = {
  title: string
  body: string
  dataSupport?: string
  whyItMatters?: string
  /** Large figure — primary scan path for the finding */
  stat?: {
    value: string
    label: string
    compare?: string
  }
  /** Optional side-by-side comparisons under the primary figure */
  compareStats?: { value: string; label: string }[]
}

export type ReportChartBar = {
  label: string
  value: number
  display: string
}

export type ReportImage = {
  src: string
  alt: string
  caption?: string
  /** Portrait mid-report figures sit narrower; landscape fills the column. */
  layout?: 'portrait' | 'landscape'
}

export type ReportSection = {
  heading: string
  body: string
  /** Optional secondary paragraphs for long-form reading */
  paragraphs?: string[]
  chartTitle?: string
  caption?: string
  bars?: ReportChartBar[]
  table?: {
    columns: string[]
    rows: string[][]
  }
  image?: ReportImage
  pullQuote?: string
  bullets?: string[]
}

export type ProviderLead = {
  /** Market segment */
  metric: string
  /** Who currently clears or controls it */
  leader: string
  /** Position label — Leading / Gaining / Holding / Losing share */
  value: string
  note?: string
  /** Concrete signal readers can verify */
  signal?: string
  tone?: 'up' | 'down' | 'flat' | 'alert'
}

export type DataReport = {
  slug: string
  title: string
  excerpt: string
  category: string
  market: string
  publishedAt: string
  updatedAt?: string
  readMinutes: number
  heroStat: ReportMetric
  metrics: ReportMetric[]
  overview: string
  background?: string
  findings: ReportFinding[]
  sections: ReportSection[]
  marketContext?: string[]
  providerLandscape?: ProviderLead[]
  implications: string[]
  methodology: string
  sources: string[]
  discoverMarket?: string
  /** Flagship presentation */
  heroImage?: ReportImage
  dek?: string
  kicker?: string
  keyTakeaways?: string[]
  closing?: string
  cta?: {
    title: string
    lede: string
    label: string
    href: string
  }
  /** Shorter title for <title>, OG, and SERP (keep H1 as full title). */
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
}

export const REPORT_CATEGORIES = [
  'Market maps',
  'Benchmarks',
  'Corridors',
  'Vendors',
  'Licensing',
  'Reliability',
] as const

/**
 * Relay Research — flagship report catalogue (English source).
 * Prefer getDataReports(locale) / getReport(slug, locale) for UI.
 */
export const dataReports: DataReport[] = [
  fintech35TrillionReport,
  asiaPacificReport,
]

const reportsByLocale: Record<Locale, DataReport[]> = {
  en: dataReports,
  fr: [fintech35TrillionReportFr, asiaPacificReportFr],
  es: [fintech35TrillionReportEs, asiaPacificReportEs],
  zh: [fintech35TrillionReportZh, asiaPacificReportZh],
  ja: [fintech35TrillionReportJa, asiaPacificReportJa],
  ko: [fintech35TrillionReportKo, asiaPacificReportKo],
  id: [fintech35TrillionReportId, asiaPacificReportId],
}

function resolveLocale(locale?: string): Locale {
  if (locale && routing.locales.includes(locale as Locale)) {
    return locale as Locale
  }
  return routing.defaultLocale
}

export function getDataReports(locale?: string): DataReport[] {
  return reportsByLocale[resolveLocale(locale)]
}

export function getReport(
  slug: string,
  locale?: string,
): DataReport | undefined {
  return getDataReports(locale).find((r) => r.slug === slug)
}

export function getAllReportSlugs(): string[] {
  return dataReports.map((r) => r.slug)
}

export function getReportCategories(locale?: string): string[] {
  const present = new Set(getDataReports(locale).map((r) => r.category))
  const ordered = REPORT_CATEGORIES.filter((c) => present.has(c))
  const extras = [...present].filter(
    (c) => !REPORT_CATEGORIES.includes(c as (typeof REPORT_CATEGORIES)[number]),
  )
  return [...ordered, ...extras]
}

export function formatReportDate(iso: string, locale?: string): string {
  const loc = resolveLocale(locale)
  return new Date(iso).toLocaleDateString(localeTags[loc], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
