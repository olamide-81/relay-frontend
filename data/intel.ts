import { markets } from './markets'
import {
  formatReportDate,
  getDataReports,
  getReport,
  type DataReport,
  type ReportMetric,
} from './reports'

export type IntelKind = 'RESEARCH' | 'REGULATION' | 'PRICING' | 'LICENSING' | 'MARKET'

export type IntelArticle = {
  id: string
  kind: IntelKind
  title: string
  summary: string
  href: string
  date: string
  market: string
  source: string
  readMinutes?: number
  heroStat?: ReportMetric
  kicker?: string
  featured?: boolean
}

export type IntelPoint = {
  id: string
  value: string
  label: string
  delta?: string
  tone?: ReportMetric['tone']
  source: string
}

function classifyKind(source: string, title: string): IntelKind {
  const hay = `${source} ${title}`.toLowerCase()
  if (hay.includes('research') || hay.includes('report')) return 'RESEARCH'
  if (
    hay.includes('policy') ||
    hay.includes('fca') ||
    hay.includes('cbn') ||
    hay.includes('mas') ||
    hay.includes('rbi') ||
    hay.includes('npci') ||
    hay.includes('cbk') ||
    hay.includes('open banking')
  ) {
    return 'REGULATION'
  }
  if (hay.includes('fee') || hay.includes('pricing') || hay.includes('commercial') || hay.includes('mdr')) {
    return 'PRICING'
  }
  if (hay.includes('licence') || hay.includes('license') || hay.includes('baas') || hay.includes('onboarding')) {
    return 'LICENSING'
  }
  return 'MARKET'
}

function fromReport(report: DataReport): IntelArticle {
  return {
    id: report.slug,
    kind: 'RESEARCH',
    title: report.title,
    summary: report.dek || report.excerpt,
    href: `/dashboard/intelligence/${report.slug}`,
    date: report.publishedAt,
    market: report.market,
    source: report.kicker || 'Relay Research',
    readMinutes: report.readMinutes,
    heroStat: report.heroStat,
    kicker: report.kicker || report.category,
  }
}

export function getIntelArticles(locale?: string): IntelArticle[] {
  const reports = getDataReports(locale)
    .map(fromReport)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  if (reports[0]) reports[0].featured = true

  const desk: IntelArticle[] = markets.flatMap((market) =>
    market.news.map((item) => ({
      id: `desk:${market.id}:${item.date}`,
      kind: classifyKind(item.source, item.title),
      title: item.title,
      summary: item.summary,
      href: `/dashboard/markets/${market.id}`,
      date: item.date,
      market: market.name,
      source: item.source,
    }))
  )

  return [...reports, ...desk].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedArticle(locale?: string): IntelArticle | undefined {
  return getIntelArticles(locale).find((item) => item.featured) ?? getIntelArticles(locale)[0]
}

export function getIntelPoints(locale?: string): IntelPoint[] {
  const seen = new Set<string>()
  const points: IntelPoint[] = []
  for (const report of getDataReports(locale)) {
    const pack = [report.heroStat, ...report.metrics]
    for (const metric of pack) {
      const id = `${metric.label}:${metric.value}`
      if (seen.has(id)) continue
      seen.add(id)
      points.push({
        id,
        value: metric.value,
        label: metric.label,
        delta: metric.delta,
        tone: metric.tone,
        source: report.market,
      })
    }
  }
  return points
}

export function barHeights(points: IntelPoint[], count = 12): number[] {
  const nums = points.map((p) => {
    const match = p.value.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/)
    return match ? Number(match[1]) : 12
  })
  const max = Math.max(...nums, 1)
  const base = nums.length
    ? nums.map((n) => 28 + Math.round((n / max) * 72))
    : [36, 44, 32, 58, 48, 70, 52, 64]
  const out: number[] = []
  for (let i = 0; i < count; i += 1) out.push(base[i % base.length] ?? 40)
  return out
}

export function getIntelBrief(slug: string, locale?: string): DataReport | undefined {
  return getReport(slug, locale)
}

export function formatIntelDate(iso: string, locale?: string) {
  return formatReportDate(iso, locale)
}
