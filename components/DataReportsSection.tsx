'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { dataReports } from '@/data/reports'
import './data-reports.css'

type LeaderRow = {
  name: string
  score: string
  width: number
}

/**
 * Homepage research teaser — dark benchmark cards inspired by micro1 Research.
 * Uses live report excerpts + synthetic leader rows from hero stats.
 */
export default function DataReportsSection() {
  const t = useTranslations('dataReports')
  const cards = [...dataReports]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3)

  return (
    <section className="dr dr--dark" id="research" aria-labelledby="dr-title">
      <div className="dr-inner">
        <header className="dr-head dr-head--center">
          <h2 className="dr-title" id="dr-title">
            {t('title')}
          </h2>
          <p className="dr-lede">{t('lede')}</p>
        </header>

        <div className="dr-bench-grid">
          {cards.map((report, index) => {
            const rows = buildRows(report.heroStat.value, index)
            return (
              <Link
                key={report.slug}
                href={`/reports/${report.slug}`}
                className="dr-bench-card"
              >
                <h3 className="dr-bench-title">{report.title}</h3>
                <p className="dr-bench-excerpt">{report.excerpt}</p>
                <ul className="dr-bench-list">
                  {rows.map((row, i) => (
                    <li key={row.name} className={i === 0 ? 'is-lead' : undefined}>
                      <div className="dr-bench-row">
                        <span className="dr-bench-name">{row.name}</span>
                        <strong>{row.score}</strong>
                      </div>
                      <span className="dr-bench-bar" aria-hidden>
                        <i style={{ width: `${row.width}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="dr-bench-more">
                  {t('moreProviders', { count: 6 + index * 2 })}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="dr-foot-cta">
          <Link href="/reports" className="nav-cta dr-view-all">
            <span>{t('ctaClean')}</span>
            <span className="nav-cta-icon" aria-hidden>
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

function buildRows(leadScore: string, seed: number): LeaderRow[] {
  const names = [
    ['dLocal', 'EBANX', 'Pomelo'],
    ['Rapyd', 'Stripe Treasury', 'Local ACH'],
    ['Sumsub', 'Persona', 'Metamap'],
  ][seed % 3]

  const widths = [92, 78, 64]
  return names.map((name, i) => ({
    name,
    score: i === 0 ? leadScore : shrinkScore(leadScore, i),
    width: widths[i],
  }))
}

function shrinkScore(value: string, step: number): string {
  const num = parseFloat(value.replace(/[^\d.]/g, ''))
  if (Number.isNaN(num)) return value
  const next = Math.max(0, num - step * (num > 10 ? 4 : 0.25))
  if (value.includes('%')) return `${next.toFixed(1)}%`
  return String(Math.round(next))
}
