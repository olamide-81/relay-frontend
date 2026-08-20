'use client'

import { use } from 'react'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Paywall } from '@/components/dashboard/Paywall'
import { formatNewsDate, getMarketById } from '@/data/markets'
import { providers } from '@/data/providers'
import { useSession } from '@/hooks/useSession'

export default function MarketDetailPage({
  params,
}: {
  params: Promise<{ region: string }>
}) {
  const { region } = use(params)
  const { user } = useSession()
  const market = getMarketById(region)
  if (!market) notFound()

  const localProviders = providers.filter((p) =>
    p.countries.some((c) => market.countryCodes.includes(c))
  )

  return (
    <>
      <PageHeader
        index="06"
        label={market.region}
        title={
          <>
            {market.name}{' '}
            <span className="serif-italic">operating map.</span>
          </>
        }
        desc={market.headline}
        action={
          <Link href="/dashboard/markets" className="pg-btn pg-btn--ghost mono">
            All markets
          </Link>
        }
      />

      <div className="mkt-stateline">
        <div>
          <span className="mono">Regulator</span>
          <p>{market.regulator}</p>
        </div>
        <div>
          <span className="mono">Compliance spine</span>
          <p>{market.compliance}</p>
        </div>
      </div>

      <section className="dash-panel" style={{ marginBottom: 24 }}>
        <div className="dash-panel-header">
          <span className="dash-panel-title">Big players</span>
        </div>
        <ul className="dos-chips" style={{ padding: 20 }}>
          {market.bigPlayers.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <Paywall
        user={user}
        title="Operator market intelligence"
        copy="Licence paths, policy notes, and the news desk for this jurisdiction."
      >
        <div className="dos-grid dos-grid--2">
          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Licences you actually apply for</span>
            </div>
            <ul className="dos-lic">
              {market.licenses.map((lic) => (
                <li key={lic.name}>
                  <strong>{lic.name}</strong>
                  <span className="mono">
                    {lic.regulator} · {lic.typicalTime}
                    {lic.capital ? ` · ${lic.capital}` : ''}
                  </span>
                  <span className="dos-note">{lic.notes}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Policy</span>
            </div>
            <ul className="mkt-policy">
              {market.policies.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="dash-panel" style={{ marginTop: 24 }}>
          <div className="dash-panel-header">
            <span className="dash-panel-title">News & signals</span>
          </div>
          <ul className="intel-list">
            {market.news.map((n) => (
              <li key={n.title} className="intel-item" style={{ cursor: 'default' }}>
                <span className="intel-item-cat mono">
                  {n.source} · {formatNewsDate(n.date)}
                </span>
                <span className="intel-item-title">{n.title}</span>
                <span className="intel-item-summary">{n.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      </Paywall>

      {localProviders.length > 0 && (
        <section className="dash-panel" style={{ marginTop: 24 }}>
          <div className="dash-panel-header">
            <span className="dash-panel-title">Dossiers covering this market</span>
          </div>
          <ul className="sl-list">
            {localProviders.map((p) => (
              <li key={p.id} className="sl-item">
                <div className="sl-body">
                  <Link href={`/dashboard/providers/${p.id}`} className="sl-name">
                    {p.name}
                  </Link>
                  <div className="sl-meta mono">
                    {p.categoryName} · {p.uptime.toFixed(2)}% uptime
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {market.reportSlugs.length > 0 && (
        <p className="dos-foot">
          Related research:{' '}
          {market.reportSlugs.map((slug, i) => (
            <span key={slug}>
              {i > 0 && ' · '}
              <Link href={`/reports/${slug}`}>{slug.replace(/-/g, ' ')}</Link>
            </span>
          ))}
        </p>
      )}
    </>
  )
}
