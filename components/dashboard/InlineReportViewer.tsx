'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import {
  formatReportDate,
  getDataReports,
  type DataReport,
} from '@/data/reports'
import { Button } from '@/components/dashboard/ui/Button'

export function InlineReportViewer() {
  const locale = useLocale()
  const reports = getDataReports(locale)
  const [active, setActive] = useState<DataReport | null>(reports[0] ?? null)

  return (
    <div className="report-viewer">
      <ul className="report-list">
        {reports.map((report) => (
          <li key={report.slug}>
            <button
              type="button"
              className={`report-list-item ${active?.slug === report.slug ? 'report-list-item--active' : ''}`}
              onClick={() => setActive(report)}
            >
              <span className="report-list-cat">{report.category}</span>
              <span className="report-list-title">{report.title}</span>
              <span className="report-list-date">
                {formatReportDate(report.publishedAt, locale)} · {report.readMinutes} min
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="report-detail">
        {active ? (
          <>
            <div className="report-detail-head">
              {active.kicker && <p className="report-detail-kicker">{active.kicker}</p>}
              <h3 className="report-detail-title">{active.title}</h3>
              <p className="report-detail-summary">{active.excerpt}</p>
              <div className="report-hero-stat">
                <span className="report-hero-stat-value">{active.heroStat.value}</span>
                <span className="report-hero-stat-label">{active.heroStat.label}</span>
              </div>
              <div className="report-detail-meta">
                <span>{active.market}</span>
                <span>·</span>
                <span>{formatReportDate(active.publishedAt, locale)}</span>
                <Link href={`/reports/${active.slug}`}>
                  <Button variant="primary" size="sm">Read full report</Button>
                </Link>
              </div>
            </div>
            <div className="report-detail-body">
              <p className="report-lede">{active.overview}</p>
              {active.findings.slice(0, 3).map((f, i) => (
                <div key={f.title} className="report-finding">
                  <span className="report-finding-index">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="report-finding-title">{f.title}</h4>
                  <p className="report-finding-body">{f.body}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="report-detail-empty">Select a report.</div>
        )}
      </div>
    </div>
  )
}
