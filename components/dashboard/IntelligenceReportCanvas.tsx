'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { formatIntelDate, getIntelArticles, getIntelBrief } from '@/data/intel'

export default function IntelligenceReportCanvas({ slug }: { slug: string }) {
  const locale = useLocale()
  const { getProvider } = useCatalog()
  const report = getIntelBrief(slug, locale)
  const others = useMemo(
    () => getIntelArticles(locale).filter((item) => item.id !== slug).slice(0, 6),
    [locale, slug]
  )
  const provider = getProvider(slug)

  if (!report) {
    return (
      <div className="relay-page">
        <EmptyState
          kind="intel"
          title="Article not in Intelligence"
          body={
            provider
              ? `${provider.name} is a live provider. Provider dossiers live in Directory.`
              : 'This link is not a Relay research article.'
          }
          actionLabel={provider ? `Open ${provider.name}` : 'Back to Intelligence'}
          actionHref={provider ? `/dashboard/providers/${provider.slug}` : '/dashboard/intelligence'}
        />
      </div>
    )
  }

  const stats = [report.heroStat, ...report.metrics].filter(
    (metric, index, all) => all.findIndex((item) => item.label === metric.label) === index
  ).slice(0, 3)

  return (
    <div className="relay-page relay-page--report">
      <div className="relay-report-util">
        <Link href="/dashboard/intelligence">Intelligence · Articles</Link>
        <Link href={`/reports/${report.slug}`}>Open full report</Link>
      </div>

      <div className="relay-report-grid relay-report-grid--brief">
        <article className="relay-article">
          <div className="relay-article-kicker">
            {(report.kicker || report.category).toUpperCase()} · {report.market.toUpperCase()}
          </div>
          <h1 id="report-headline">{report.title}</h1>
          <div className="relay-byline">
            <strong>Relay Research</strong>
            <span>{formatIntelDate(report.publishedAt, locale)}</span>
            <span>{report.readMinutes} min read</span>
            <em>{report.heroStat.value}</em>
          </div>

          <div className="relay-article-stats">
            {stats.map((metric) => (
              <div key={`${metric.label}-${metric.value}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <p>{report.overview}</p>

          {report.keyTakeaways?.length ? (
            <>
              <h2>Data points</h2>
              <ul>
                {report.keyTakeaways.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}

          {report.findings.slice(0, 4).map((finding) => (
            <section key={finding.title}>
              <h2>{finding.title}</h2>
              {finding.stat ? (
                <blockquote>
                  {finding.stat.value}
                  <span style={{ display: 'block', marginTop: 8, fontSize: 13, opacity: 0.62 }}>
                    {finding.stat.label}
                  </span>
                </blockquote>
              ) : null}
              <p>{finding.body}</p>
            </section>
          ))}

          <p>
            <Link href={`/reports/${report.slug}`} className="relay-link" style={{ color: '#0a0a0b' }}>
              Continue in the full report →
            </Link>
          </p>
        </article>

        <aside className="relay-report-side">
          <div className="relay-dpanel relay-dpanel--flush">
            <div className="relay-dpanel-head">
              <span>This brief</span>
              <span className="relay-dpanel-meta">{report.heroStat.value}</span>
            </div>
            <div className="relay-keys">
              {report.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <Link href={`/reports/${report.slug}`} className="relay-btn relay-btn--lime relay-named-cta">
              Read full report
            </Link>
          </div>

          {others.length ? (
            <div className="relay-dpanel relay-dpanel--flush">
              <div className="relay-dpanel-head">
                <span>More intelligence</span>
                <span className="relay-dpanel-meta">{others.length}</span>
              </div>
              {others.map((item) => (
                <Link href={item.href} className="relay-named relay-named--stack" key={item.id}>
                  <span>{item.title}</span>
                  <em>
                    {item.kind} · {formatIntelDate(item.date, locale)}
                  </em>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
