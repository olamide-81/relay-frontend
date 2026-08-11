'use client'

import { Link } from '@/i18n/navigation'
import { formatReportDate, type DataReport } from '@/data/reports'
import './report-paper.css'

type Props = {
  report: DataReport
  /** Month Year label style like the sample */
  dateStyle?: 'monthYear' | 'full'
}

/**
 * Research-paper card — visual mock, date, title. Shared by landing + /reports.
 */
export default function ReportPaperCard({ report, dateStyle = 'monthYear' }: Props) {
  const date =
    dateStyle === 'monthYear'
      ? formatMonthYear(report.publishedAt)
      : formatReportDate(report.publishedAt)

  return (
    <Link href={`/reports/${report.slug}`} className="rp-card">
      <div className="rp-visual" aria-hidden>
        <ReportVisual slug={report.slug} category={report.category} />
      </div>
      <time className="rp-date" dateTime={report.publishedAt}>
        {date}
      </time>
      <h3 className="rp-title">{report.title}</h3>
    </Link>
  )
}

function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
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
          <span style={{ height: '58%' }} />
          <span className="is-lead" style={{ height: '86%' }} />
          <span style={{ height: '70%' }} />
          <span className="is-lead" style={{ height: '94%' }} />
          <span style={{ height: '76%' }} />
        </div>
      </div>
    )
  }

  if (kind === 'line') {
    return (
      <div className="rp-mock rp-mock--line">
        <div className="rp-mock-label">Fee trend</div>
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rpFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(140,120,255,0.45)" />
              <stop offset="100%" stopColor="rgba(140,120,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0 70 C30 68, 45 40, 70 48 C95 56, 110 28, 140 34 C165 38, 180 22, 200 18 L200 90 L0 90 Z"
            fill="url(#rpFill)"
          />
          <path
            d="M0 70 C30 68, 45 40, 70 48 C95 56, 110 28, 140 34 C165 38, 180 22, 200 18"
            fill="none"
            stroke="rgba(180,170,255,0.9)"
            strokeWidth="2"
          />
        </svg>
      </div>
    )
  }

  if (kind === 'flow') {
    return (
      <div className="rp-mock rp-mock--flow">
        <div className="rp-mock-label">Path to live</div>
        <div className="rp-flow">
          <span>API</span>
          <i />
          <span>Review</span>
          <i />
          <span className="is-on">Prod</span>
        </div>
        <div className="rp-flow-meta">
          <em style={{ width: '40%' }} />
          <em style={{ width: '55%' }} />
          <em style={{ width: '28%' }} />
        </div>
      </div>
    )
  }

  if (kind === 'map') {
    return (
      <div className="rp-mock rp-mock--map">
        <div className="rp-mock-label">Rail mix</div>
        <div className="rp-map">
          <span className="a" />
          <span className="b" />
          <span className="c" />
        </div>
        <div className="rp-legend">
          <i className="a" />
          <i className="b" />
          <i className="c" />
        </div>
      </div>
    )
  }

  return (
    <div className="rp-mock rp-mock--split">
      <div className="rp-mock-label">Cost split</div>
      <div className="rp-split">
        <div>
          <strong>68%</strong>
          <span>FX spread</span>
          <i style={{ width: '68%' }} />
        </div>
        <div>
          <strong>19%</strong>
          <span>Platform</span>
          <i style={{ width: '19%' }} />
        </div>
        <div>
          <strong>13%</strong>
          <span>Rail</span>
          <i style={{ width: '13%' }} />
        </div>
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
  return 'split'
}
