'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { dataReports, formatReportDate } from '@/data/reports'
import './research-home.css'

/**
 * Research — solid text cards with grey noise, real report content only.
 */
export default function ResearchHomeSection() {
  const t = useTranslations('dataReports')
  const cards = dataReports.slice(0, 3)

  return (
    <section className="rh" id="research" aria-labelledby="rh-title">
      <div className="rh-inner">
        <header className="rh-head">
          <h2 className="rh-title" id="rh-title">
            {t('title')}
          </h2>
          <p className="rh-lede">{t('lede')}</p>
        </header>

        <div className="rh-grid">
          {cards.map((report) => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="noise-card rh-card"
            >
              <div className="rh-card-meta">
                <span>{report.category}</span>
                <span aria-hidden>·</span>
                <span>{report.market}</span>
              </div>
              <h3 className="rh-card-title">{report.title}</h3>
              <p className="rh-card-desc">{report.excerpt}</p>
              <div className="rh-card-stat">
                <strong>{report.heroStat.value}</strong>
                <span>{report.heroStat.label}</span>
              </div>
              <div className="rh-card-foot">
                <span>
                  {formatReportDate(report.publishedAt)} · {report.readMinutes}{' '}
                  {t('minRead')}
                </span>
                <span className="rh-card-go">{t('readReport')}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="rh-cta-wrap">
          <Link href="/reports" className="rh-cta">
            <span>{t('ctaClean')}</span>
            <span className="rh-cta-icon" aria-hidden>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h5.5M5.5 2.5L8 5 5.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
