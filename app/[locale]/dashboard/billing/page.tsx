'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { activateSubscription, cancelSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'

const FEATURES = [
  'Full provider dossiers — commercials, SLA, licences, history',
  'Bank transfer fee bands by value, credit and debit',
  'Market intelligence: policy, licences, news, local stack',
  'Side-by-side comparison of Operator fields',
  'Warm introductions to partners that require them',
]

export default function BillingPage() {
  const { user, refresh } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const subscribed = isSubscribed(user)

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

  return (
    <>
      <PageHeader
        index="07"
        label="Billing"
        title={
          <>
            Operator, <span className="serif-italic">monthly.</span>
          </>
        }
        desc="Most of Relay — commercials, licences, SLA, market policy and intros — is paid. Directory browsing stays free while we finish the live API."
      />

      <div className="bill-grid">
        <article className="dash-panel bill-card">
          <span className="dash-badge">Free</span>
          <h2>Explorer</h2>
          <p className="bill-price">$0</p>
          <ul className="bill-list">
            <li>Browse the directory</li>
            <li>Shortlist and compare headlines</li>
            <li>Public research papers</li>
          </ul>
          <p className="dos-note">You are{subscribed ? ' not ' : ' '}on this plan{subscribed ? ' anymore' : ''}.</p>
        </article>

        <article className="dash-panel bill-card bill-card--on">
          <span className="dash-badge dash-badge--accent">Recommended</span>
          <h2>Operator</h2>
          <p className="bill-price">
            $149 <span className="mono">/ month</span>
          </p>
          <ul className="bill-list">
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {subscribed ? (
            <>
              <p className="intro-success mono">
                Active
                {user?.currentPeriodEnd
                  ? ` · renews ${new Date(user.currentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                  : ''}
              </p>
              <button type="button" className="pg-btn pg-btn--ghost" onClick={onCancel} disabled={loading}>
                {loading ? 'Updating…' : 'Cancel (simulated)'}
              </button>
            </>
          ) : (
            <button type="button" className="pg-btn pg-btn--primary" onClick={onStart} disabled={loading}>
              {loading ? 'Starting Operator…' : 'Start Operator — simulated checkout'}
            </button>
          )}
          {error && <p className="auth-error">{error}</p>}
          <p className="dos-note">
            Checkout is simulated until Paystack on relay-api is wired. Sign in as{' '}
            <span className="mono">pro@relay.dev</span> with any 8+ character password to land already subscribed.
          </p>
        </article>
      </div>
    </>
  )
}
