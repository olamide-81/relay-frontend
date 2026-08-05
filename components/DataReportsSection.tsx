'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { dataReports, formatReportDate } from '@/data/reports'
import './data-reports.css'

export default function DataReportsSection() {
  const t = useTranslations('dataReports')
  const featured = dataReports[0]
  const rest = dataReports.slice(1, 3)

  return (
    <section className="dr" id="reports" aria-labelledby="dr-title">
      <div className="dr-inner">
        <div className="dr-head">
          <div>
            <p className="dr-kicker">{t('kicker')}</p>
            <h2 className="dr-title" id="dr-title">
              {t('title')}
            </h2>
            <p className="dr-lede">{t('lede')}</p>
          </div>
          <Link href="/reports" className="dr-cta">
            {t('cta')}
          </Link>
        </div>

        <div className="dr-grid">
          <Link
            href={`/reports/${featured.slug}`}
            className="dr-card dr-card--featured"
          >
            <div className="dr-card-top">
              <span className="dr-card-cat">{featured.category}</span>
              <span className="dr-card-market">{featured.market}</span>
            </div>
            <h3 className="dr-card-title">{featured.title}</h3>
            <p className="dr-card-excerpt">{featured.excerpt}</p>
            <div className="dr-card-stat">
              <strong className="dr-card-stat-value">
                {featured.heroStat.value}
              </strong>
              <span className="dr-card-stat-label">
                {featured.heroStat.label}
              </span>
              {featured.heroStat.delta ? (
                <span
                  className={`dr-delta is-${featured.heroStat.tone || 'flat'}`}
                >
                  {featured.heroStat.delta}
                </span>
              ) : null}
            </div>
            <div className="dr-card-meta">
              <span>{formatReportDate(featured.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span>
                {featured.readMinutes} {t('minRead')}
              </span>
            </div>
          </Link>

          {rest.map((report) => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="dr-card"
            >
              <div className="dr-card-top">
                <span className="dr-card-cat">{report.category}</span>
                <span className="dr-card-market">{report.market}</span>
              </div>
              <h3 className="dr-card-title">{report.title}</h3>
              <p className="dr-card-excerpt">{report.excerpt}</p>
              <div className="dr-card-stat">
                <strong className="dr-card-stat-value">
                  {report.heroStat.value}
                </strong>
                <span className="dr-card-stat-label">
                  {report.heroStat.label}
                </span>
              </div>
              <div className="dr-card-meta">
                <span>{formatReportDate(report.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>
                  {report.readMinutes} {t('minRead')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
