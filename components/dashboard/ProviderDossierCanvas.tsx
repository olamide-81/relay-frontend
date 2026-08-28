'use client'

import { Link, useRouter } from '@/i18n/navigation'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps, formatBpsDelta } from '@/lib/relay/format'
import { addToShortlist } from '@/lib/workspace'
import {
  alsoConsidered,
  compareDefaultSlugs,
  getProvider,
  hqShort,
  nordbridgeCorridors,
  nordbridgeLicences,
} from '@/lib/mock/relay'
import { useWorkspace } from '@/hooks/useWorkspace'

export default function ProviderDossierCanvas({ id }: { id: string }) {
  const router = useRouter()
  const { weighting } = useWeighting()
  const { shortlist, refresh } = useWorkspace()
  const provider = getProvider(id)
  if (!provider) return null

  const score = computeScore(provider, weighting)
  const shortlisted = shortlist.includes(provider.slug)
  const corridors = provider.slug === 'nordbridge' ? nordbridgeCorridors : nordbridgeCorridors
  const licences = provider.slug === 'nordbridge' ? nordbridgeLicences : nordbridgeLicences

  return (
    <div className="relay-page relay-page--profile">
      <div className="relay-crumb">Directory · Payouts · {provider.name}</div>
      <div className="relay-profile-head">
        <div>
          <div className="relay-profile-title">
            <h1 className="relay-hd-title">{provider.name}</h1>
            <span className="relay-badge relay-badge--lime">TOP SCORE {score}</span>
          </div>
          <p className="relay-profile-desc">
            {provider.description ??
              `${provider.hq.split(',')[0]}-headquartered payout rail covering ${provider.corridorCount} corridors.`}
          </p>
        </div>
        <div className="relay-hd-actions">
          <button
            type="button"
            className="relay-btn relay-btn--outline"
            onClick={() => {
              addToShortlist(provider.slug)
              refresh()
            }}
          >
            {shortlisted ? 'On shortlist' : 'Add to shortlist'}
          </button>
          <Link href={`/dashboard/intros/${provider.slug}`} className="relay-btn relay-btn--lime">
            Book an intro
          </Link>
        </div>
      </div>

      <div className="relay-kpi relay-kpi--5">
        {[
          { label: 'FEE FROM', v: formatFeeFromBps(provider.feeFromBps), sub: 'EU→LATAM, 1M/mo' },
          { label: 'MEDIAN SETTLE', v: provider.settleLabel, sub: 'instant on 24 rails' },
          { label: 'CORRIDORS', v: String(provider.corridorCount), sub: '14 markets' },
          { label: 'SCORE', v: String(score), sub: 'your weighting' },
          {
            label: 'RESPONSE',
            v: provider.avgResponseHours ? `${provider.avgResponseHours} hrs` : '4 hrs',
            sub: 'avg. to intro request',
          },
        ].map((s) => (
          <div className="relay-kpi-tile" key={s.label}>
            <div className="relay-kpi-label">{s.label}</div>
            <div className="relay-kpi-value">{s.v}</div>
            <div className="relay-kpi-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="relay-profile-grid">
        <div className="relay-panel relay-panel--20">
          <div className="relay-panel-head">
            <span>Pricing by corridor</span>
            <span className="relay-panel-head-meta">indicative, refreshed daily</span>
            <span className="relay-panel-head-right">USD 1M / MONTH</span>
          </div>
          <div className="relay-th relay-th--price">
            <span>CORRIDOR</span>
            <span>FEE</span>
            <span>SETTLE</span>
            <span style={{ textAlign: 'right' }}>VS CATEGORY</span>
          </div>
          <div className="relay-rows">
            {corridors.map((c) => (
              <div className="relay-row relay-row--price" key={c.corridor}>
                <span style={{ fontSize: 13.5, whiteSpace: 'nowrap' }}>{c.corridor}</span>
                <span className="relay-fee" style={{ fontSize: 13.5 }}>
                  {formatFeeFromBps(c.feeBps)}
                </span>
                <span className="relay-settle">{c.settle}</span>
                <span
                  className={`relay-mono ${c.vsCategoryBps < 0 ? 'relay-delta--good' : 'relay-delta--bad'}`}
                  style={{ textAlign: 'right', fontSize: 12 }}
                >
                  {formatBpsDelta(c.vsCategoryBps)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relay-stack">
          <div className="relay-lic-panel">
            <h3>Licences & coverage</h3>
            <div className="relay-lic-list">
              {licences.map((l) => (
                <div className="relay-lic-row" key={l.name}>
                  <span
                    className="relay-status-dot"
                    style={{ background: l.tone === 'ok' ? 'oklch(.78 .17 130)' : 'oklch(.7 .15 60)' }}
                  />
                  <span>{l.name}</span>
                  <span>{l.meta}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relay-similar">
            <h3>Also considered</h3>
            <div className="relay-similar-list">
              {alsoConsidered.map((slug) => {
                const p = getProvider(slug)
                if (!p) return null
                return (
                  <button
                    type="button"
                    className="relay-similar-row"
                    key={slug}
                    onClick={() => router.push(`/dashboard/providers/${slug}`)}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{p.name}</div>
                      <div className="relay-meta" style={{ marginTop: 5 }}>
                        {hqShort[p.slug]}
                      </div>
                    </div>
                    <span className="relay-mono" style={{ marginLeft: 'auto', fontSize: 12.5, color: 'rgba(255,255,255,.7)' }}>
                      {formatFeeFromBps(p.feeFromBps)}
                    </span>
                    <span style={{ fontSize: 14 }}>{computeScore(p, weighting)}</span>
                  </button>
                )
              })}
            </div>
            <Link
              href={`/dashboard/compare?ids=${[provider.slug, ...compareDefaultSlugs.filter((s) => s !== provider.slug)].slice(0, 4).join(',')}`}
              className="relay-link relay-similar-cta"
            >
              Compare all four →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
