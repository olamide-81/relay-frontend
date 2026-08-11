import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  formatReportDate,
  getAllReportSlugs,
  getReport,
} from '@/data/reports'
import { routing } from '@/i18n/routing'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, researchArticleJsonLd } from '@/lib/jsonld'
import { buildMetadata, localizedPath } from '@/lib/seo'
import '@/components/report-detail.css'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const REPORT_KEYWORDS = [
  'fintech global transactions',
  'digital wallets market share',
  'instant payments Pix UPI',
  'cross-border remittances Africa',
  'fintech Europe open banking',
  'fintech United States payments',
  'stablecoin settlement',
  'payment rails emerging markets',
  'fintech infrastructure research',
  '$35 trillion daily transactions',
]

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllReportSlugs().map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const report = getReport(slug)
  if (!report) return { title: 'Report | Relay' }

  const seoTitle =
    report.seoTitle ??
    'Fintech Clears Over 10% of $35T Daily Global Transactions | Relay Research'
  const seoDescription =
    report.seoDescription ??
    report.excerpt

  return buildMetadata({
    locale,
    title: seoTitle,
    description: seoDescription,
    path: `/reports/${slug}`,
    type: 'article',
    publishedTime: report.publishedAt,
    modifiedTime: report.updatedAt ?? report.publishedAt,
    authors: ['Relay Research'],
    keywords: REPORT_KEYWORDS,
    image: report.heroImage
      ? {
          url: report.heroImage.src,
          width: 1200,
          height: 1600,
          alt: report.heroImage.alt,
        }
      : undefined,
  })
}

export default async function ReportDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const report = getReport(slug)
  if (!report) notFound()

  const t = await getTranslations('dataReports')
  const path = localizedPath(locale, `/reports/${slug}`)

  return (
    <article className="rd">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: 'Relay', path: '/' },
              { name: t('papersTitle'), path: '/reports' },
              {
                name: report.seoTitle ?? report.title,
                path: `/reports/${slug}`,
              },
            ],
            locale,
          ),
          researchArticleJsonLd({
            locale,
            title: report.title,
            description: report.seoDescription ?? report.excerpt,
            path,
            image: report.heroImage?.src,
            datePublished: report.publishedAt,
            dateModified: report.updatedAt ?? report.publishedAt,
            keywords: REPORT_KEYWORDS,
          }),
        ]}
      />

      <header className="rd-cover">
        {report.heroImage ? (
          <div className="rd-cover-media">
            <Image
              src={report.heroImage.src}
              alt={report.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="rd-cover-img"
            />
            <div className="rd-cover-shade" aria-hidden />
          </div>
        ) : null}

        <div className="rd-cover-inner">
          <Link href="/reports" className="rd-back">
            ← {t('backToIndex')}
          </Link>
          {report.kicker ? <p className="rd-kicker">{report.kicker}</p> : null}
          <div className="rd-tags">
            <span className="rd-tag">{report.category}</span>
            <span className="rd-tag rd-tag--market">{report.market}</span>
          </div>
          <h1 className="rd-title">{report.title}</h1>
          <div className="rd-meta">
            <span>
              {t('published')}{' '}
              <time dateTime={report.publishedAt}>
                {formatReportDate(report.publishedAt)}
              </time>
            </span>
            <span aria-hidden>·</span>
            <span>
              {report.readMinutes} {t('minRead')}
            </span>
            {report.updatedAt ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {t('lastUpdated')}{' '}
                  <time dateTime={report.updatedAt}>
                    {formatReportDate(report.updatedAt)}
                  </time>
                </span>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <div className="rd-body">
        {report.dek || report.excerpt ? (
          <p className="rd-dek rd-dek--body">{report.dek ?? report.excerpt}</p>
        ) : null}

        {report.keyTakeaways && report.keyTakeaways.length > 0 ? (
          <section className="rd-takeaways" aria-label="Key takeaways">
            <h2 className="rd-takeaways-title">Key takeaways</h2>
            <ol className="rd-takeaways-list">
              {report.keyTakeaways.map((item, i) => (
                <li key={item.slice(0, 48)}>
                  <span className="rd-takeaways-num" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="rd-statbar" aria-label={t('keyMetrics')}>
          <div className="rd-stat rd-stat--hero">
            <strong className="rd-stat-value">{report.heroStat.value}</strong>
            <span className="rd-stat-label">{report.heroStat.label}</span>
            {report.heroStat.delta ? (
              <span
                className={`rd-stat-meta${report.heroStat.tone ? ` is-${report.heroStat.tone}` : ''}`}
              >
                {report.heroStat.delta}
              </span>
            ) : null}
          </div>
          {report.metrics.map((m) => (
            <div key={m.label} className="rd-stat">
              <strong className="rd-stat-value">{m.value}</strong>
              <span className="rd-stat-label">{m.label}</span>
              {m.delta ? (
                <span className={`rd-stat-meta${m.tone ? ` is-${m.tone}` : ''}`}>
                  {m.delta}
                </span>
              ) : null}
            </div>
          ))}
        </section>

        <section className="rd-overview">
          <p className="rd-overview-lead">{report.overview}</p>
          {report.background ? (
            <div className="rd-overview-bg">
              <h2>{t('whyWeBuilt')}</h2>
              <p>{report.background}</p>
            </div>
          ) : null}
          {report.heroImage?.caption ? (
            <p className="rd-figure-cap">{report.heroImage.caption}</p>
          ) : null}
        </section>

        <nav className="rd-toc" aria-label="Contents">
          <div className="rd-toc-head">
            <h2>In this report</h2>
            <span className="rd-toc-count">
              {String(report.sections.length + 3).padStart(2, '0')} chapters
            </span>
          </div>
          <ol className="rd-toc-list">
            {[
              { href: '#findings', label: t('keyFindings') },
              ...report.sections.map((section) => ({
                href: `#${slugify(section.heading)}`,
                label: section.heading,
              })),
              { href: '#implications', label: t('implications') },
              { href: '#methodology', label: t('methodology') },
            ].map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="rd-toc-link">
                  <span className="rd-toc-num" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="rd-toc-label">{item.label}</span>
                  <span className="rd-toc-go" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="rd-block" id="findings">
          <h2 className="rd-block-title">{t('keyFindings')}</h2>
          <div className="rd-findings">
            {report.findings.map((f, i) => {
              const featured = i === 0
              return (
                <article
                  key={f.title}
                  className={`rd-finding${featured ? ' rd-finding--lead' : ''}`}
                >
                  <header className="rd-finding-top">
                    <span className="rd-finding-num" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f.stat ? (
                      <div className="rd-finding-stat">
                        <strong className="rd-finding-stat-value">
                          {f.stat.value}
                        </strong>
                        <span className="rd-finding-stat-label">
                          {f.stat.label}
                        </span>
                        {f.stat.compare ? (
                          <span className="rd-finding-stat-compare">
                            {f.stat.compare}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </header>

                  <div className="rd-finding-copy">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>

                  {f.compareStats && f.compareStats.length > 0 ? (
                    <dl className="rd-finding-comps">
                      {f.compareStats.map((c) => (
                        <div key={`${f.title}-${c.label}`} className="rd-finding-comp">
                          <dt>{c.label}</dt>
                          <dd>{c.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : f.dataSupport ? (
                    <p className="rd-finding-data">{f.dataSupport}</p>
                  ) : null}

                  {f.whyItMatters ? (
                    <p className="rd-finding-why">
                      <span className="rd-finding-why-label">Implication</span>
                      {f.whyItMatters}
                    </p>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        {report.sections.map((section) => (
          <section
            key={section.heading}
            className="rd-block"
            id={slugify(section.heading)}
          >
            <h2 className="rd-block-title">{section.heading}</h2>
            <p className="rd-block-lede">{section.body}</p>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="rd-prose-p">
                {p}
              </p>
            ))}

            {section.pullQuote ? (
              <blockquote className="rd-pull">
                <p>{section.pullQuote}</p>
              </blockquote>
            ) : null}

            {section.bullets && section.bullets.length > 0 ? (
              <ul className="rd-bullets">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}

            {section.image ? (
              <figure className="rd-figure">
                <div className="rd-figure-frame">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={1200}
                    height={1600}
                    className="rd-figure-img"
                  />
                </div>
                {section.image.caption ? (
                  <figcaption>{section.image.caption}</figcaption>
                ) : null}
              </figure>
            ) : null}

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
                {section.caption && !section.bars ? (
                  <p className="rd-chart-caption">{section.caption}</p>
                ) : null}
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
            <p className="rd-block-lede">
              Who clears volume today, by segment — and whether that position is
              expanding or eroding.
            </p>
            <div className="rd-landscape" role="table" aria-label={t('providerLandscape')}>
              <div className="rd-landscape-head" role="row">
                <span role="columnheader">Segment</span>
                <span role="columnheader">Providers</span>
                <span role="columnheader">Position</span>
                <span role="columnheader">Signal</span>
              </div>
              {report.providerLandscape.map((row) => (
                <div
                  key={row.metric}
                  className={`rd-landscape-row${row.tone ? ` is-${row.tone}` : ''}`}
                  role="row"
                >
                  <div className="rd-landscape-seg" role="cell">
                    <strong>{row.metric}</strong>
                    {row.note ? <span>{row.note}</span> : null}
                  </div>
                  <div className="rd-landscape-who" role="cell">
                    {row.leader}
                  </div>
                  <div className="rd-landscape-pos" role="cell">
                    <span className="rd-landscape-badge">{row.value}</span>
                  </div>
                  <div className="rd-landscape-signal" role="cell">
                    {row.signal ?? row.note}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rd-block" id="implications">
          <h2 className="rd-block-title">{t('implications')}</h2>
          <ol className="rd-implications">
            {report.implications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        {report.closing ? (
          <section className="rd-closing">
            <p>{report.closing}</p>
          </section>
        ) : null}

        <div className="rd-next-cta">
          <div>
            <h2>{report.cta?.title ?? t('reportCtaTitle')}</h2>
            <p>{report.cta?.lede ?? t('reportCtaLede')}</p>
          </div>
          {report.cta?.href?.startsWith('http') ? (
            <a
              href={report.cta.href}
              className="rd-next-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {report.cta.label}
            </a>
          ) : (
            <Link href={report.cta?.href ?? '/#providers'} className="rd-next-btn">
              {report.cta?.label ?? t('reportCtaLabel')}
            </Link>
          )}
        </div>

        <details className="rd-method" id="methodology">
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
      </div>
    </article>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
