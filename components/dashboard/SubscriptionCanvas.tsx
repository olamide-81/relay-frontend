'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { activateSubscription, cancelSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import { usePlan } from '@/components/dashboard/PlanContext'
import { TickIcon } from '@/components/dashboard/gate/ProBadge'
import { useWorkspaceCounts } from '@/components/dashboard/chrome/WorkspaceCounts'
import { PLAN_PRICE, planCards, planLabel } from '@/lib/plans'
import type { PlanId } from '@/lib/entitlements'

export default function SubscriptionCanvas() {
  const { user, refresh } = useSession()
  const { plan, entitlements } = usePlan()
  const counts = useWorkspaceCounts()
  const [loading, setLoading] = useState<PlanId | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [annual, setAnnual] = useState(false)
  const subscribed = isSubscribed(user)
  const company = user?.company || 'Your workspace'
  const renews = user?.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  const run = async (next: 'pro' | 'proMax' | 'free') => {
    setError(null)
    setLoading(next)
    try {
      if (next === 'free') await cancelSubscription()
      else await activateSubscription(next)
      refresh()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not update plan')
    } finally {
      setLoading(null)
    }
  }

  const meters = useMemo(() => {
    const catalogCap = entitlements.catalogVisible === 'all' ? counts.providers : entitlements.catalogVisible
    const catalogPct = counts.providers ? Math.min(100, Math.round((Math.min(counts.providers, catalogCap) / Math.max(counts.providers, 1)) * 100)) : 0
    const introCap = entitlements.introRequestsPerMonth === 'unlimited' ? null : entitlements.introRequestsPerMonth
    const introPct = introCap ? Math.min(100, Math.round((counts.intros / introCap) * 100)) : 12
    const listCap = entitlements.shortlists === 'unlimited' ? null : entitlements.shortlists
    const listPct = listCap ? Math.min(100, Math.round((counts.shortlists / listCap) * 100)) : 18
    return [
      {
        label: 'Providers visible',
        v: entitlements.catalogVisible === 'all' ? `${counts.providers} / all` : `${Math.min(counts.providers, catalogCap)} / ${catalogCap}`,
        pct: catalogPct || 8,
        note: counts.providers ? `${counts.providers} live in the catalog` : 'Catalog empty',
        tone: entitlements.catalogVisible === 'all' ? 'lime' : 'amber',
      },
      {
        label: 'Compare slots',
        v: `${entitlements.compareSlots} at a time`,
        pct: entitlements.compareSlots === 2 ? 50 : 100,
        note: plan === 'free' ? 'Two of the five you can see' : 'Up to four side by side',
        tone: 'lime' as const,
      },
      {
        label: 'Intro requests',
        v: introCap ? `${counts.intros} / ${introCap}` : `${counts.intros} / ∞`,
        pct: introPct,
        note: introCap ? 'Resets with the billing month' : 'No monthly cap',
        tone: introPct >= 100 ? 'amber' : 'lime',
      },
      {
        label: 'Shortlists',
        v: listCap ? `${counts.shortlists} / ${listCap}` : `${counts.shortlists} / ∞`,
        pct: listPct,
        note: entitlements.shortlistsShared ? 'Shared across seats' : 'This workspace',
        tone: listPct >= 100 ? 'amber' : 'plain',
      },
    ]
  }, [counts, entitlements, plan])

  return (
    <div className="relay-page relay-page--sub">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Subscription</h1>
          <div className="relay-hd-sub">
            {company}
            {user?.email ? ` · ${user.email}` : ''}
            {' · billed in USD'}
          </div>
        </div>
        <div className="relay-hd-actions">
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
      </div>

      <div className="relay-sub-plan">
        <div className="relay-dq-kicker" style={{ color: 'rgba(0,0,0,.45)' }}>
          CURRENT PLAN
        </div>
        <div className="relay-sub-plan-row">
          <div>
            <div className="relay-sub-plan-name">{planLabel(plan)}</div>
            <div className="relay-sub-plan-meta">
              {subscribed && renews
                ? `Renews ${renews}`
                : 'Five providers, two in compare, until you need the rest'}
            </div>
          </div>
          <div className="relay-sub-plan-price">
            <strong>{annual ? PLAN_PRICE[plan].annual : PLAN_PRICE[plan].month}</strong>
            <span>{PLAN_PRICE[plan].per}</span>
          </div>
        </div>
      </div>

      <div className="relay-plan-grid relay-plan-grid--sub">
        {planCards.map((p) => {
          const current = p.id === plan
          const price = annual && p.id !== 'free' ? p.annual : p.price
          const tick = p.variant === 'light' ? '#0a0a0b' : p.id === 'proMax' ? 'oklch(.85 .15 130)' : 'rgba(255,255,255,.45)'
          return (
            <article key={p.id} className={`relay-plan-card${p.variant === 'light' ? ' relay-plan-card--light' : ''}${current ? ' relay-plan-card--current' : ''}`}>
              <div className="relay-plan-card-hd">
                <span>{p.name}</span>
                {current ? <em>CURRENT</em> : p.badge ? <em>{p.badge}</em> : null}
              </div>
              <div className="relay-plan-price">
                <strong>{price}</strong>
                <span>{p.per}</span>
              </div>
              <p className="relay-plan-desc">{p.desc}</p>
              {p.id === 'free' ? (
                current ? (
                  <span className="relay-plan-cta relay-plan-cta--ghost">Current plan</span>
                ) : (
                  <button
                    type="button"
                    className="relay-plan-cta relay-plan-cta--ghost"
                    onClick={() => void run('free')}
                    disabled={loading !== null}
                  >
                    {loading === 'free' ? 'Updating…' : 'Switch to Free'}
                  </button>
                )
              ) : (
                <button
                  type="button"
                  className={`relay-plan-cta ${p.id === 'pro' ? 'relay-plan-cta--ink' : 'relay-plan-cta--fill'}`}
                  onClick={() => void run(p.id)}
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
            </article>
          )
        })}
      </div>
      {error ? <p className="relay-paywall-error">{error}</p> : null}

      <div className="relay-dpanel">
        <div className="relay-dpanel-head">
          <span>This workspace</span>
          <Link href="/dashboard/intelligence" className="relay-link">
            Open Intelligence →
          </Link>
        </div>
        <div className="relay-meters">
          {meters.map((m) => (
            <div key={m.label}>
              <div className="relay-meter-lab">
                <span>{m.label}</span>
                <span className="relay-mono">{m.v}</span>
              </div>
              <div className="relay-meter-track">
                <div className={`relay-meter-bar relay-meter-bar--${m.tone}`} style={{ width: `${m.pct}%` }} />
              </div>
              <div className="relay-meter-note">{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relay-dpanel">
        <div className="relay-dpanel-head">
          <span>Seats</span>
          <span className="relay-dpanel-meta">
            {entitlements.seatsIncluded} included
          </span>
        </div>
        <div className="relay-seats">
          <div className="relay-seat">
            <div>
              <strong>{user?.fullName || 'You'}</strong>
              <span>{user?.email}</span>
            </div>
            <em className="relay-seat-role relay-seat-role--plain">ADMIN</em>
          </div>
          {plan !== 'proMax' ? (
            <div className="relay-seat">
              <div>
                <strong>More seats</strong>
                <span>Pro Max includes five, then $190/month each</span>
              </div>
              <button type="button" className="relay-link" onClick={() => void run('proMax')}>
                Start Pro Max →
              </button>
            </div>
          ) : (
            <div className="relay-seat">
              <div>
                <strong>Four seats open</strong>
                <span>Invite from your workspace admin</span>
              </div>
              <em className="relay-seat-role relay-seat-role--lime">INCLUDED</em>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
