'use client'

import { useState } from 'react'
import { activateSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { useSession } from '@/hooks/useSession'
import { usePlan } from '@/components/dashboard/PlanContext'
import { TickIcon } from '@/components/dashboard/gate/ProBadge'
import { planCards, planMatrix } from '@/lib/mock/addendum'

function matrixColor(col: 'free' | 'pro' | 'team', value: string) {
  if (value === '—') return 'rgba(255,255,255,.25)'
  if (col === 'pro') return 'oklch(.85 .15 130)'
  if (col === 'team') return '#f5f5f3'
  return 'rgba(255,255,255,.6)'
}

export default function PlansCanvas() {
  const { refresh } = useSession()
  const { plan } = usePlan()
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onStartPro = async () => {
    if (plan === 'pro' || plan === 'team') return
    setError(null)
    setLoading(true)
    try {
      await activateSubscription()
      refresh()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not start Pro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relay-page relay-page--plans">
      <div className="relay-plans-hero">
        <h1>Relay is free to browse. Pro is for deciding.</h1>
        <p>210 providers, 38 corridors and weekly market maps. Upgrade when you need the numbers behind a decision, not the headline.</p>
        <div className="relay-bill-toggle">
          <button type="button" className={!annual ? 'relay-bill-toggle--on' : ''} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" className={annual ? 'relay-bill-toggle--on' : ''} onClick={() => setAnnual(true)}>
            Annual
            <span>−2 MO</span>
          </button>
        </div>
      </div>

      <div className="relay-plan-grid">
        {planCards.map((p) => {
          const current =
            (p.id === 'free' && plan === 'free') ||
            (p.id === 'pro' && plan === 'pro') ||
            (p.id === 'team' && plan === 'team')
          const price = annual && p.id !== 'free' ? p.annual : p.price
          const tick = p.variant === 'light' ? '#0a0a0b' : p.id === 'team' ? 'oklch(.85 .15 130)' : 'rgba(255,255,255,.4)'
          return (
            <article key={p.id} className={`relay-plan-card${p.variant === 'light' ? ' relay-plan-card--light' : ''}`}>
              <div className="relay-plan-card-hd">
                <span>{p.name}</span>
                {p.badge ? <em>{p.badge}</em> : null}
              </div>
              <div className="relay-plan-price">
                <strong>{price}</strong>
                <span>{p.per}</span>
              </div>
              <p className="relay-plan-desc">{p.desc}</p>
              {p.id === 'free' ? (
                <span className="relay-plan-cta relay-plan-cta--ghost">{current ? 'Current plan' : 'Explorer'}</span>
              ) : p.id === 'pro' ? (
                <button
                  type="button"
                  className="relay-plan-cta relay-plan-cta--ink"
                  onClick={onStartPro}
                  disabled={loading || current}
                >
                  {current ? 'Current plan' : loading ? 'Starting Pro…' : 'Start Pro'}
                </button>
              ) : (
                <a className="relay-plan-cta relay-plan-cta--fill" href="mailto:sales@relay.dev">
                  Talk to sales
                </a>
              )}
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <TickIcon stroke={tick} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="relay-plan-foot">{p.foot}</div>
            </article>
          )
        })}
      </div>
      {error ? <p className="relay-paywall-error">{error}</p> : null}

      <div className="relay-matrix">
        <div className="relay-th relay-th--matrix">
          <span>WHAT YOU GET</span>
          <span>FREE</span>
          <span>PRO</span>
          <span>TEAM</span>
        </div>
        {planMatrix.map((m) => (
          <div className="relay-row relay-row--matrix" key={m.feature}>
            <span>{m.feature}</span>
            <span style={{ color: matrixColor('free', m.free) }}>{m.free}</span>
            <span style={{ color: matrixColor('pro', m.pro) }}>{m.pro}</span>
            <span style={{ color: matrixColor('team', m.team) }}>{m.team}</span>
          </div>
        ))}
        <div className="relay-matrix-foot">
          <span>Prices in USD, billed to Northwind Co. Cancel any time — data you exported stays yours.</span>
          <a href="mailto:sales@relay.dev">Talk to us about Team →</a>
        </div>
      </div>
    </div>
  )
}
