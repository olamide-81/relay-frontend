'use client'

import { useState } from 'react'
import { activateSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { useSession } from '@/hooks/useSession'
import { usePlan } from '@/components/dashboard/PlanContext'
import { TickIcon } from '@/components/dashboard/gate/ProBadge'
import { planCards as cards, planMatrix as matrix } from '@/lib/plans'
import type { PlanId } from '@/lib/entitlements'

function matrixColor(col: PlanId, value: string) {
  if (value === '—') return 'rgba(255,255,255,.25)'
  if (col === 'pro') return 'oklch(.85 .15 130)'
  if (col === 'proMax') return '#f5f5f3'
  return 'rgba(255,255,255,.6)'
}

export default function PlansCanvas() {
  const { refresh } = useSession()
  const { plan } = usePlan()
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState<PlanId | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onStart = async (next: 'pro' | 'proMax') => {
    if (plan === next) return
    setError(null)
    setLoading(next)
    try {
      await activateSubscription(next)
      refresh()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not start plan')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="relay-page relay-page--plans">
      <div className="relay-plans-hero">
        <h1>Free to try. Pro when you need the full catalog.</h1>
        <p>
          Free shows five live providers and lets you compare two. Pro opens every listed provider.
          Pro Max is for teams that share the same shortlist.
        </p>
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
        {cards.map((p) => {
          const current = p.id === plan
          const price = annual && p.id !== 'free' ? p.annual : p.price
          const tick = p.variant === 'light' ? '#0a0a0b' : p.id === 'proMax' ? 'oklch(.85 .15 130)' : 'rgba(255,255,255,.4)'
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
                <span className="relay-plan-cta relay-plan-cta--ghost">{current ? 'Current plan' : 'Free'}</span>
              ) : (
                <button
                  type="button"
                  className={`relay-plan-cta ${p.id === 'pro' ? 'relay-plan-cta--ink' : 'relay-plan-cta--fill'}`}
                  onClick={() => void onStart(p.id)}
                  disabled={loading !== null || current}
                >
                  {current ? 'Current plan' : loading === p.id ? 'Starting…' : `Start ${p.name}`}
                </button>
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
          <span>PRO MAX</span>
        </div>
        {matrix.map((m) => (
          <div className="relay-row relay-row--matrix" key={m.feature}>
            <span>{m.feature}</span>
            <span style={{ color: matrixColor('free', m.free) }}>{m.free}</span>
            <span style={{ color: matrixColor('pro', m.pro) }}>{m.pro}</span>
            <span style={{ color: matrixColor('proMax', m.proMax) }}>{m.proMax}</span>
          </div>
        ))}
        <div className="relay-matrix-foot">
          <span>Prices in USD. Cancel any time. Data you exported stays yours.</span>
        </div>
      </div>
    </div>
  )
}
