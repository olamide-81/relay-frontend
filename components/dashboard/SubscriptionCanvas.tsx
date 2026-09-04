'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { activateSubscription, cancelSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { billingRows, invoices, seatRows, usageMeters } from '@/lib/mock/addendum'

export default function SubscriptionCanvas() {
  const { user, refresh } = useSession()
  const { plan } = usePlan()
  const { openGate } = useGate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [annualNote, setAnnualNote] = useState(false)
  const subscribed = isSubscribed(user)
  const company = user?.company || 'Northwind Co.'
  const renews = user?.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '28 Sep 2026'

  const onStart = async () => {
    setError(null)
    setLoading(true)
    try {
      await activateSubscription()
      refresh()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not start subscription')
    } finally {
      setLoading(false)
    }
  }

  const onCancel = async () => {
    setError(null)
    setLoading(true)
    try {
      await cancelSubscription()
      refresh()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not cancel')
    } finally {
      setLoading(false)
    }
  }

  const planName = plan === 'team' ? 'Team' : subscribed ? 'Pro' : 'Explorer'
  const price = plan === 'team' ? '$1,290' : subscribed ? '$499' : '$0'

  return (
    <div className="relay-page relay-page--sub">
      <div>
        <h1 className="relay-hd-title">Subscription</h1>
        <div className="relay-hd-sub">
          {company} · workspace admin · billing in USD
        </div>
      </div>

      <div className="relay-sub-top">
        <div className="relay-sub-plan">
          <div className="relay-dq-kicker" style={{ color: 'rgba(0,0,0,.45)' }}>CURRENT PLAN</div>
          <div className="relay-sub-plan-row">
            <div>
              <div className="relay-sub-plan-name">{planName}</div>
              <div className="relay-sub-plan-meta">
                {subscribed ? `Monthly · renews ${renews}` : 'Free forever · upgrade when you need the numbers'}
              </div>
            </div>
            <div className="relay-sub-plan-price">
              <strong>{price}</strong>
              <span>per month</span>
            </div>
          </div>
          <div className="relay-sub-plan-actions">
            {subscribed ? (
              <>
                <button type="button" className="relay-btn relay-btn--ink" onClick={() => setAnnualNote(true)}>
                  {annualNote ? 'We’ll switch you at renewal' : 'Switch to annual · save $998'}
                </button>
                <Link href="/dashboard/plans" className="relay-btn relay-btn--ink-outline">
                  Upgrade to Team
                </Link>
                <button type="button" className="relay-text-btn" onClick={onCancel} disabled={loading}>
                  {loading ? 'Updating…' : 'Cancel plan'}
                </button>
              </>
            ) : (
              <>
                <button type="button" className="relay-btn relay-btn--ink" onClick={onStart} disabled={loading}>
                  {loading ? 'Starting Pro…' : 'Start Pro — $499/mo'}
                </button>
                <Link href="/dashboard/plans" className="relay-btn relay-btn--ink-outline">
                  Compare plans
                </Link>
              </>
            )}
          </div>
          {error ? <p className="relay-paywall-error">{error}</p> : null}
        </div>

        <div className="relay-dpanel">
          <h3>Payment method</h3>
          <div className="relay-card-row">
            <span className="relay-card-mark" />
            <div>
              <div className="relay-mono">•••• 4417</div>
              <div className="relay-meta" style={{ marginTop: 6 }}>
                Visa · expires 04/29
              </div>
            </div>
            <button type="button" className="relay-text-btn">
              Update
            </button>
          </div>
          <dl className="relay-kv">
            {billingRows.map((r) => (
              <div key={r.k}>
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relay-dpanel">
        <div className="relay-dpanel-head">
          <span>This billing period</span>
          <span className="relay-dpanel-meta">28 AUG — 28 SEP</span>
        </div>
        <div className="relay-meters">
          {usageMeters.map((m) => (
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

      <div className="relay-sub-bot">
        <div className="relay-dpanel">
          <div className="relay-dpanel-head">
            <span>Seats</span>
            <button type="button" className="relay-link" onClick={() => openGate('seats.invite')}>
              Invite →
            </button>
          </div>
          <div className="relay-seats">
            {seatRows.map((s) => (
              <div key={s.email} className="relay-seat">
                <div>
                  <strong>{s.name}</strong>
                  <span>{s.email}</span>
                </div>
                <em className={`relay-seat-role relay-seat-role--${s.tone}`}>{s.role}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="relay-dpanel relay-dpanel--flush">
          <div className="relay-dpanel-head">
            <span>Invoices</span>
          </div>
          <div className="relay-th relay-th--inv">
            <span>INVOICE</span>
            <span>DATE</span>
            <span>AMOUNT</span>
            <span style={{ textAlign: 'right' }}>STATUS</span>
          </div>
          {invoices.map((inv) => (
            <div className="relay-row relay-row--inv" key={inv.id}>
              <span>{inv.id}</span>
              <span>{inv.date}</span>
              <span>{inv.amount}</span>
              <span className="relay-delta--good" style={{ textAlign: 'right' }}>
                Paid
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
