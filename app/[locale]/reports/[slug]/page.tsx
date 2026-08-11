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
import ReportPaperCard from '@/components/ReportPaperCard'
import '@/components/report-detail.css'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllReportSlugs().map((slug) => ({ locale, slug })),
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
      const score = (r: typeof a) =>
        (r.category === report.category ? 2 : 0) +
        (r.market === report.market ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)

  return (
    <div className="rd">
      <header className="rd-hero">
        <div className="rd-hero-inner">
          <Link href="/reports" className="rd-back">
            ← {t('backToIndex')}
          </Link>
          <div className="rd-tags">
            <span className="rd-tag">{report.category}</span>
            <span className="rd-tag rd-tag--market">{report.market}</span>
          </div>
          <h1>{report.title}</h1>
          <p className="rd-excerpt">{report.excerpt}</p>
          <div className="rd-meta">
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

      <article className="rd-body">
        <section className="rd-overview">
          <p className="rd-overview-lead">{report.overview}</p>
          {report.background ? (
            <div className="rd-overview-bg">
              <h2>{t('whyWeBuilt')}</h2>
              <p>{report.background}</p>
            </div>
          ) : null}
        </section>

        <section className="rd-metrics" aria-label={t('keyMetrics')}>
          {report.metrics.map((m) => (
            <div key={m.label} className="rd-metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
              {m.delta ? (
                <em className={m.tone ? `is-${m.tone}` : undefined}>{m.delta}</em>
              ) : null}
            </div>
          ))}
        </section>

        <section className="rd-block">
          <h2 className="rd-block-title">{t('keyFindings')}</h2>
          <div className="rd-findings">
            {report.findings.map((f, i) => (
              <div key={f.title} className="rd-finding">
                <span className="rd-finding-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  {f.dataSupport ? (
                    <p className="rd-finding-data">{f.dataSupport}</p>
                  ) : null}
                  {f.whyItMatters ? (
                    <p className="rd-finding-why">
                      <strong>{t('whyThisMatters')}</strong> {f.whyItMatters}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {report.sections.map((section) => (
          <section key={section.heading} className="rd-block">
            <h2 className="rd-block-title">{section.heading}</h2>
            <p className="rd-block-lede">{section.body}</p>

            {section.bars && section.bars.length > 0 ? (
              <div className="rd-chart">
                {section.chartTitle ? (
                  <div className="rd-chart-title">{section.chartTitle}</div>
                ) : null}
                <div className="rd-bars">
                  {section.bars.map((bar) => (
                    <div key={bar.label} className="rd-bar-row">
                      <span>{bar.label}</span>
                      <div className="rd-bar-track">
                        <div
                          className="rd-bar-fill"
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
                  <p className="rd-chart-caption">{section.caption}</p>
                ) : null}
              </div>
            ) : null}

            {section.table ? (
              <div className="rd-table-wrap">
                <table className="rd-table">
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
          <section className="rd-block">
            <h2 className="rd-block-title">{t('marketContext')}</h2>
            <div className="rd-prose">
              {report.marketContext.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {report.providerLandscape && report.providerLandscape.length > 0 ? (
          <section className="rd-block">
            <h2 className="rd-block-title">{t('providerLandscape')}</h2>
            <div className="rd-leads">
              {report.providerLandscape.map((row) => (
                <div key={row.metric} className="rd-lead">
                  <span className="rd-lead-metric">{row.metric}</span>
                  <strong className="rd-lead-leader">{row.leader}</strong>
                  <em className="rd-lead-value">{row.value}</em>
                  {row.note ? <span className="rd-lead-note">{row.note}</span> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rd-block">
          <h2 className="rd-block-title">{t('implications')}</h2>
          <ol className="rd-implications">
            {report.implications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <div className="rd-next-cta">
          <div>
            <h2>{t('exploreProviders')}</h2>
            <p>{t('exploreProvidersLede')}</p>
          </div>
          <Link href="/#providers" className="rd-next-btn">
            {t('exploreProvidersCta')}
          </Link>
        </div>

        <details className="rd-method">
          <summary>
            <span>{t('methodology')}</span>
            <span className="rd-method-hint">{t('showMethodology')}</span>
          </summary>
          <div className="rd-method-body">
            <p>{report.methodology}</p>
            <ul>
              {report.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {report.updatedAt ? (
              <p className="rd-method-updated">
                {t('lastUpdated')} {formatReportDate(report.updatedAt)}
              </p>
            ) : null}
          </div>
        </details>

        <section className="rd-related">
          <h2 className="rd-block-title">{t('related')}</h2>
          <div className="rd-related-grid">
            {related.map((r) => (
              <ReportPaperCard key={r.slug} report={r} />
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
