'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { formatReportDate, type DataReport } from '@/data/reports'
import './report-paper.css'

type Props = {
  report: DataReport
  dateStyle?: 'monthYear' | 'full'
}

/**
 * Research-paper card — hero visual / date / title.
 */
export default function ReportPaperCard({ report, dateStyle = 'monthYear' }: Props) {
  const locale = useLocale()
  const date =
    dateStyle === 'monthYear'
      ? formatMonthYear(report.publishedAt, locale)
      : formatReportDate(report.publishedAt, locale)

  return (
    <Link href={`/reports/${report.slug}`} className="rp-card">
      <div className="rp-visual" aria-hidden>
        {report.heroImage ? (
          <Image
            src={report.heroImage.src}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 33vw"
            className="rp-visual-img"
          />
        ) : (
          <ReportVisual slug={report.slug} category={report.category} />
        )}
      </div>
      <time className="rp-date" dateTime={report.publishedAt}>
        {date}
      </time>
      <h3 className="rp-title">{report.title}</h3>
    </Link>
  )
}

function formatMonthYear(iso: string, locale: string) {
  const tag = locale === 'en' ? 'en-US' : locale
  return new Date(iso).toLocaleDateString(tag, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function ReportVisual({ slug, category }: { slug: string; category: string }) {
  const kind = visualKind(slug, category)

  if (kind === 'bars') {
    return (
      <div className="rp-mock rp-mock--bars">
        <div className="rp-mock-label">All-in cost</div>
        <div className="rp-bars">
          <span style={{ height: '42%' }} />
          <span style={{ height: '68%' }} />
          <span style={{ height: '54%' }} />
          <span style={{ height: '86%' }} />
          <span style={{ height: '60%' }} />
        </div>
      </div>
    )
  }

  if (kind === 'line') {
    return (
      <div className="rp-mock rp-mock--line">
        <div className="rp-mock-label">Trend</div>
        <svg viewBox="0 0 120 56" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 44 C18 40 28 18 48 22 C68 26 78 40 96 28 C108 20 116 14 120 10"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.6"
          />
        </svg>
      </div>
    )
  }

  if (kind === 'flow') {
    return (
      <div className="rp-mock rp-mock--flow">
        <div className="rp-mock-label">Pipeline</div>
        <div className="rp-flow">
          <span />
          <i />
          <span />
          <i />
          <span className="is-on" />
        </div>
      </div>
    )
  }

  return (
    <div className="rp-mock rp-mock--map">
      <div className="rp-mock-label">Market map</div>
      <div className="rp-map">
        <b />
        <b />
        <b />
      </div>
    </div>
  )
}

function visualKind(slug: string, category: string) {
  if (slug.includes('fx') || category === 'Corridors') return 'bars'
  if (slug.includes('payout') || category === 'Benchmarks') return 'line'
  if (slug.includes('kyc') || category === 'Vendors') return 'flow'
  if (slug.includes('mexico') || slug.includes('rail') || category === 'Market maps')
    return 'map'
  return 'line'
}
