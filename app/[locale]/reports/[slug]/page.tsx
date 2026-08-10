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
  const related = dataReports
    .filter((r) => r.slug !== slug)
    .sort((a, b) => {
      // Prefer same category, then same market
      const score = (r: typeof a) =>
        (r.category === report.category ? 2 : 0) +
        (r.market === report.market ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)

  const discoverHref = '/#directory'

  return (
    <div className="dr-detail">
      <header className="dr-detail-hero">
        <div className="dr-detail-hero-inner">
          <Link href="/reports" className="dr-detail-back">
            ← {t('backToIndex')}
          </Link>
          <div className="dr-detail-tags">
            <span className="dr-tag dr-tag--cat">{report.category}</span>
            <span className="dr-tag dr-tag--market">{report.market}</span>
          </div>
          <h1>{report.title}</h1>
          <p className="dr-detail-excerpt">{report.excerpt}</p>
          <div className="dr-detail-hero-meta">
            <span>
              {t('published')} {formatReportDate(report.publishedAt)}
            </span>
            <span aria-hidden>·</span>
            <span>
              {report.readMinutes} {t('minRead')}
            </span>
            {report.updatedAt ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {t('lastUpdated')} {formatReportDate(report.updatedAt)}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <article className="dr-detail-body">
        <section className="dr-overview">
          <p className="dr-overview-lead">{report.overview}</p>
          {report.background ? (
            <div className="dr-overview-bg">
              <h2>{t('whyWeBuilt')}</h2>
              <p>{report.background}</p>
            </div>
          ) : null}
        </section>

        <section className="dr-metrics" aria-label={t('keyMetrics')}>
          {report.metrics.map((m) => (
            <div key={m.label} className="dr-metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
              {m.delta ? (
                <em className={m.tone ? `is-${m.tone}` : undefined}>{m.delta}</em>
              ) : null}
            </div>
          ))}
        </section>

        <section className="dr-block">
          <h2 className="dr-block-title">{t('keyFindings')}</h2>
          <div className="dr-findings">
            {report.findings.map((f, i) => (
              <div key={f.title} className="dr-finding">
                <span className="dr-finding-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  {f.dataSupport ? (
                    <p className="dr-finding-data">{f.dataSupport}</p>
                  ) : null}
                  {f.whyItMatters ? (
                    <p className="dr-finding-why">
                      <strong>{t('whyThisMatters')}</strong> {f.whyItMatters}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {report.sections.map((section) => (
          <section key={section.heading} className="dr-block dr-section">
            <h2 className="dr-block-title">{section.heading}</h2>
            <p className="dr-block-lede">{section.body}</p>

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
                          style={{
                            width: `${Math.min(100, Math.max(4, bar.value))}%`,
                          }}
                        />
                      </div>
                      <span>{bar.display}</span>
                    </div>
                  ))}
                </div>
                {section.caption ? (
                  <p className="dr-chart-caption">{section.caption}</p>
                ) : null}
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

        {report.marketContext && report.marketContext.length > 0 ? (
          <section className="dr-block">
            <h2 className="dr-block-title">{t('marketContext')}</h2>
            <div className="dr-prose">
              {report.marketContext.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {report.providerLandscape && report.providerLandscape.length > 0 ? (
          <section className="dr-block">
            <h2 className="dr-block-title">{t('providerLandscape')}</h2>
            <div className="dr-leads">
              {report.providerLandscape.map((row) => (
                <div key={row.metric} className="dr-lead">
                  <span className="dr-lead-metric">{row.metric}</span>
                  <strong className="dr-lead-leader">{row.leader}</strong>
                  <em className="dr-lead-value">{row.value}</em>
                  {row.note ? <span className="dr-lead-note">{row.note}</span> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="dr-block">
          <h2 className="dr-block-title">{t('implications')}</h2>
          <ol className="dr-implications">
            {report.implications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <div className="dr-next-cta">
          <div>
            <h2>{t('exploreProviders')}</h2>
            <p>{t('exploreProvidersLede')}</p>
          </div>
          <Link href={discoverHref} className="dr-next-btn">
            {t('exploreProvidersCta')}
          </Link>
        </div>

        <details className="dr-method">
          <summary>
            <span>{t('methodology')}</span>
            <span className="dr-method-hint">{t('showMethodology')}</span>
          </summary>
          <div className="dr-method-body">
            <p>{report.methodology}</p>
            <ul>
              {report.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {report.updatedAt ? (
              <p className="dr-method-updated">
                {t('lastUpdated')} {formatReportDate(report.updatedAt)}
              </p>
            ) : null}
          </div>
        </details>

        <section className="dr-related">
          <h2 className="dr-block-title">{t('related')}</h2>
          <div className="dr-related-grid">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/reports/${r.slug}`}
                className="dr-card dr-card--related"
              >
                <div className="dr-card-top">
                  <span className="dr-card-cat">{r.category}</span>
                  <span className="dr-card-market">{r.market}</span>
                </div>
                <h3 className="dr-card-title">{r.title}</h3>
                <p className="dr-card-excerpt">{r.excerpt}</p>
                <div className="dr-card-stat">
                  <strong className="dr-card-stat-value">{r.heroStat.value}</strong>
                  <span className="dr-card-stat-label">{r.heroStat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
