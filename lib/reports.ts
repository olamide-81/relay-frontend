import config from '@/config/reports.json'
import { formatReportDate, getReport, type DataReport } from '@/data/reports'
import type { RelatedReport } from '@/components/relay-app/ReportArticle'
import IMAGE_SIZES from '@/lib/report-image-sizes.json'

/** Report visibility and list copy from config/reports.json, joined with the report content. */
export type ReportVisibility = 'public' | 'private' | 'hidden'
type ReportConfig = { slug: string; visibility: ReportVisibility; kind: string; cardTitle?: string; cardSummary?: string }

export type ReportEntry = {
  slug: string
  visibility: ReportVisibility
  kind: string
  cardTitle: string
  cardSummary: string
  /** Short label for lists ("Market map"). */
  type: string
  /** Scope used by the Intelligence filters (Global / Europe / Asia-Pacific / Americas …). */
  scope: string
  /** "August 2026" */
  date: string
  report: DataReport
}

/** Defaults from config/reports.json; replaced in place by the admin-managed list (lib/site-content). */
const CONFIG = [...config.reports] as ReportConfig[]

export function setReportConfig(rows: ReportConfig[] | null | undefined) {
  if (!Array.isArray(rows)) return
  CONFIG.splice(0, CONFIG.length, ...rows)
}

const TYPE_LABEL: Record<string, string> = {
  'Market maps': 'Market map',
  Benchmarks: 'Benchmark',
  Corridors: 'Corridor',
  Vendors: 'Vendors',
  Licensing: 'Licensing',
  Reliability: 'Reliability',
}

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** Reports allowed in a context: the website shows public ones, the signed-in app public + private. */
export function getReportEntries(where: 'site' | 'app', locale = 'en'): ReportEntry[] {
  const allowed: ReportVisibility[] = where === 'site' ? ['public'] : ['public', 'private']
  return CONFIG.filter((c) => allowed.includes(c.visibility)).flatMap((c) => {
    const report = getReport(c.slug, locale) ?? getReport(c.slug, 'en')
    if (!report) return []
    return [
      {
        slug: c.slug,
        visibility: c.visibility,
        kind: c.kind || 'all',
        cardTitle: c.cardTitle || report.title,
        cardSummary: c.cardSummary || report.excerpt,
        type: TYPE_LABEL[report.category] ?? report.category,
        scope: report.market,
        date: monthYear(report.publishedAt),
        report,
      },
    ]
  })
}

export function getReportEntry(slug: string, where: 'site' | 'app', locale = 'en'): ReportEntry | undefined {
  return getReportEntries(where, locale).find((r) => r.slug === slug)
}

/** Category accent and glow tint per App Icon kind (from the dashboard design). */
export const KIND_ACCENT: Record<string, { accent: string; rgb: string }> = {
  collections: { accent: '#6fe3b4', rgb: '111,227,180' },
  payouts: { accent: '#d6ee4e', rgb: '214,238,78' },
  fx: { accent: '#8fb8ff', rgb: '143,184,255' },
  cards: { accent: '#b9a3ff', rgb: '185,163,255' },
  kyc: { accent: '#ffab7a', rgb: '255,171,122' },
  bank: { accent: '#ff8fb1', rgb: '255,143,177' },
  all: { accent: '#8a8f98', rgb: '201,207,219' },
}

/** Pixel sizes of report images (lib/report-image-sizes.json) so pages reserve space and don't shift. */
export function reportImageSizes(r: DataReport): Record<string, { width: number; height: number }> {
  const all = IMAGE_SIZES as Record<string, { width: number; height: number }>
  const srcs = [r.heroImage?.src, ...r.sections.map((s) => s.image?.src)].filter(Boolean) as string[]
  return Object.fromEntries(srcs.filter((s) => all[s]).map((s) => [s, all[s]]))
}

/** Props for <ReportArticle> (minus labels/navigation). */
export function reportView(entry: ReportEntry, where: 'site' | 'app', locale: string, hrefFor?: (slug: string) => string) {
  const r = entry.report
  const tone = KIND_ACCENT[entry.kind] ?? KIND_ACCENT.all
  const related: RelatedReport[] = getReportEntries(where, locale)
    .filter((x) => x.slug !== entry.slug)
    .slice(0, 3)
    .map((x) => ({ slug: x.slug, href: hrefFor?.(x.slug), kind: x.kind, type: x.type, scope: x.scope, title: x.cardTitle }))
  return {
    report: r,
    kind: entry.kind,
    type: entry.type,
    accent: tone.accent,
    rgb: tone.rgb,
    publishedLabel: formatReportDate(r.publishedAt, locale),
    updatedLabel: r.updatedAt && r.updatedAt !== r.publishedAt ? formatReportDate(r.updatedAt, locale) : undefined,
    imageSizes: reportImageSizes(r),
    related,
  }
}
