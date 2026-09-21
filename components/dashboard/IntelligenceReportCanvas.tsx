'use client'

import { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { useVisibleProviders } from '@/hooks/useVisibleProviders'
import { CatalogCap } from '@/components/dashboard/ui/CatalogCap'
import { CommercialPackages } from '@/components/dashboard/ui/Commercials'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { computeScore } from '@/lib/relay/score'
import { commercialPackages, commercialsSummary, formatSettle } from '@/lib/relay/format'

export default function IntelligenceReportCanvas({ slug }: { slug: string }) {
  const { weighting } = useWeighting()
  const { getProvider, getRecord } = useCatalog()
  const { has, toggle } = useCompareTray()
  const { providers, catalogTotal, capped, compareSlots } = useVisibleProviders()
  const provider = getProvider(slug)
  const record = getRecord(slug)

  const peers = useMemo(
    () => providers.filter((p) => p.slug !== slug).slice(0, 4),
    [providers, slug]
  )

  if (!provider) {
    return (
      <div className="relay-page">
        <EmptyState
          kind="intel"
          title="Not in the live catalog"
          body="This link is not a listed provider. Intelligence only ranks providers that are live."
          actionLabel="Back to Intelligence"
          actionHref="/dashboard/intelligence"
        />
      </div>
    )
  }

  const packages = commercialPackages(provider)
  const summary = commercialsSummary(packages)
  const score = computeScore(provider, weighting)
  const on = has(provider.slug)
  const currencies = record?.supportedCurrencies ?? []
  const corridors = record?.supportedCorridors ?? []

  return (
    <div className="relay-page relay-page--report">
      <div className="relay-report-util">
        <Link href="/dashboard/intelligence">Intelligence · Provider list</Link>
        <Link href={`/dashboard/providers/${provider.slug}`}>Open dossier</Link>
      </div>

      {capped ? <CatalogCap visible={providers.length} total={catalogTotal} compareSlots={compareSlots} /> : null}

      <div className="relay-report-grid">
        <article className="relay-article">
          <div className="relay-article-kicker">LIVE CATALOG · {provider.regions.join(' · ') || 'Coverage unset'}</div>
          <h1 id="report-headline">{provider.name}</h1>
          <div className="relay-byline">
            <strong>{provider.hq}</strong>
            <span>{summary.headline}</span>
            <span>{provider.settleLabel}</span>
            <em>SCORE {score}</em>
          </div>
          <p>{provider.description || record?.longDescription || `${provider.name} is listed in the live catalog.`}</p>

          <h2>Commercials</h2>
          {packages.length ? (
            <CommercialPackages packages={packages} benefits={provider.sharedBenefits} />
          ) : (
            <p>No published commercials on file yet.</p>
          )}

          <h2>Coverage</h2>
          <p>
            {provider.regions.length
              ? `Regions: ${provider.regions.join(', ')}.`
              : 'Regions are not listed yet.'}{' '}
            {currencies.length ? `Currencies: ${currencies.join(', ')}.` : ''}
          </p>
          {corridors.length ? (
            <ul className="relay-intel-corridors">
              {corridors.map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          ) : (
            <p>No corridor list on file — request an intro if you need a specific pair confirmed.</p>
          )}
        </article>

        <aside className="relay-report-side">
          <div className="relay-dpanel relay-dpanel--flush">
            <div className="relay-dpanel-head">
              <span>This provider</span>
              <span className="relay-dpanel-meta">{score}</span>
            </div>
            <div className="relay-keys">
              <div>
                <strong>{summary.headline}</strong>
                <span>Published commercials</span>
              </div>
              <div>
                <strong>{formatSettle(provider.medianSettleMinutes, provider.settleLabel)}</strong>
                <span>Settlement</span>
              </div>
              <div>
                <strong>{provider.corridorCount || corridors.length || '—'}</strong>
                <span>Corridors on file</span>
              </div>
            </div>
            <button
              type="button"
              className={`relay-btn ${on ? 'relay-btn--outline' : 'relay-btn--lime'} relay-named-cta`}
              onClick={() => toggle(provider.slug)}
            >
              {on ? 'Remove from compare' : 'Add to compare'}
            </button>
          </div>

          {peers.length ? (
            <div className="relay-dpanel relay-dpanel--flush">
              <div className="relay-dpanel-head">
                <span>Also in this list</span>
                <span className="relay-dpanel-meta">{peers.length}</span>
              </div>
              {peers.map((p) => (
                <Link href={`/dashboard/intelligence/${p.slug}`} className="relay-named" key={p.slug}>
                  <span>{p.name}</span>
                  <em>{commercialsSummary(commercialPackages(p)).headline}</em>
                  <strong>{computeScore(p, weighting)}</strong>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
