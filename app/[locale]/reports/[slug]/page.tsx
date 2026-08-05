import Image from 'next/image'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  dataReports,
  formatReportDate,
  getAllReportSlugs,
  getReport,
} from '@/data/reports'
import { routing } from '@/i18n/routing'
import '@/components/data-reports.css'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllReportSlugs().map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const report = getReport(slug)
  if (!report) return { title: 'Report | Relay' }
  return {
    title: `${report.title} | Relay`,
    description: report.excerpt,
  }
}

export default async function ReportDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const report = getReport(slug)
  if (!report) notFound()

  const t = await getTranslations('dataReports')
  const related = dataReports.filter((r) => r.slug !== slug).slice(0, 2)

  return (
    <div className="dr-detail">
      <header className="dr-page-nav">
        <div className="dr-page-nav-inner">
          <Link href="/" className="dr-page-brand">
            <Image src="/relaylight.png" alt="" width={28} height={28} />
            <span>Relay</span>
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm">
            {t('getStarted')}
          </Link>
        </div>
      </header>

      <div className="dr-detail-hero">
        <div className="dr-detail-hero-inner">
          <Link href="/reports" className="dr-detail-back">
            ← {t('backToIndex')}
          </Link>
          <div className="dr-detail-tags">
            <span>{report.category}</span>
            <span>{report.market}</span>
          </div>
          <h1>{report.title}</h1>
          <p className="dr-detail-excerpt">{report.excerpt}</p>
          <div className="dr-detail-hero-meta">
            <span>{formatReportDate(report.publishedAt)}</span>
            <span>·</span>
            <span>
              {report.readMinutes} {t('minRead')}
            </span>
          </div>
        </div>
      </div>

      <article className="dr-detail-body">
        <div className="dr-metrics">
          {report.metrics.map((m) => (
            <div key={m.label} className="dr-metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
              {m.delta ? (
                <em className={m.tone ? `is-${m.tone}` : undefined}>{m.delta}</em>
              ) : null}
            </div>
          ))}
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          {t('keyFindings')}
        </h2>
        <div className="dr-findings">
          {report.findings.map((f) => (
            <div key={f.title} className="dr-finding">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        {report.sections.map((section) => (
          <section key={section.heading} className="dr-section">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>

            {section.bars && section.bars.length > 0 ? (
              <div className="dr-chart">
                {section.chartTitle ? (
                  <div className="dr-chart-title">{section.chartTitle}</div>
                ) : null}
                <div className="dr-bars">
                  {section.bars.map((bar) => (
                    <div key={bar.label} className="dr-bar-row">
                      <span>{bar.label}</span>
                      <div className="dr-bar-track">
                        <div
                          className="dr-bar-fill"
                          style={{ width: `${Math.min(100, Math.max(4, bar.value))}%` }}
                        />
                      </div>
                      <span>{bar.display}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {section.table ? (
              <div className="dr-table-wrap">
                <table className="dr-table">
                  <thead>
                    <tr>
                      {section.table.columns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ))}

        <aside className="dr-method">
          <h2>{t('methodology')}</h2>
          <p>{report.methodology}</p>
          <ul>
            {report.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>

        <div className="dr-related">
          <h2>{t('related')}</h2>
          <div className="dr-related-grid">
            {related.map((r) => (
              <Link key={r.slug} href={`/reports/${r.slug}`} className="dr-card">
                <div className="dr-card-top">
                  <span className="dr-card-cat">{r.category}</span>
                  <span className="dr-card-market">{r.market}</span>
                </div>
                <h3 className="dr-card-title">{r.title}</h3>
                <p className="dr-card-excerpt">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
