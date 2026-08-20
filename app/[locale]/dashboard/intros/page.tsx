'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Paywall } from '@/components/dashboard/Paywall'
import { providers } from '@/data/providers'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import { useWorkspace } from '@/hooks/useWorkspace'
import {
  formatIntroDate,
  introStatusLabel,
  removeIntroRequest,
  submitIntroRequest,
  type IntroStatus,
} from '@/lib/workspace'

export default function IntrosPage() {
  return (
    <Suspense>
      <IntrosContent />
    </Suspense>
  )
}

function IntrosContent() {
  const searchParams = useSearchParams()
  const { user } = useSession()
  const { intros, refresh } = useWorkspace()
  const [providerId, setProviderId] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const subscribed = isSubscribed(user)

  useEffect(() => {
    const id = searchParams.get('provider')
    if (id) setProviderId(id)
  }, [searchParams])

  const sorted = useMemo(
    () => [...intros].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [intros]
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const provider = providers.find((p) => p.id === providerId)
    if (!provider || !subscribed) return
    setSubmitting(true)
    submitIntroRequest({
      providerId: provider.id,
      providerName: provider.name,
      categoryName: provider.categoryName,
      note,
    })
    setProviderId('')
    setNote('')
    setSubmitting(false)
    setSuccess(true)
    refresh()
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <>
      <PageHeader
        index="05"
        label="Requests"
        title={
          <>
            Warm <span className="serif-italic">introductions.</span>
          </>
        }
        desc="If a partner does not take cold inbound, Relay will introduce you. Typical response within 48 hours."
      />

      <Paywall
        user={user}
        title="Introductions are Operator"
        copy="We only send intros for subscribed teams — it keeps partners from getting noise."
      >
        <div className="dash-panel intro-form-panel">
          <div className="dash-panel-header">
            <span className="dash-panel-title">New intro request</span>
          </div>
          <form className="intro-form" onSubmit={onSubmit}>
            <div className="intro-field">
              <label htmlFor="intro-provider">Provider</label>
              <select
                id="intro-provider"
                className="intro-select"
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                required
              >
                <option value="">Select a provider…</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                    {p.partnering.introRequired ? ' — intro required' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="intro-field">
              <label htmlFor="intro-note">Use case</label>
              <textarea
                id="intro-note"
                className="intro-textarea"
                placeholder="What are you building? Markets, volumes, timeline, licence status…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="intro-form-foot">
              <button type="submit" className="pg-btn pg-btn--primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit request'}
              </button>
              <Link href="/dashboard/providers" className="pg-btn pg-btn--ghost mono">
                Browse directory
              </Link>
            </div>
            {success && (
              <p className="intro-success mono" role="status">
                Request submitted — we&apos;ll be in touch within 48 hours.
              </p>
            )}
          </form>
        </div>
      </Paywall>

      <div className="dash-panel intro-list-panel">
        <div className="dash-panel-header">
          <span className="dash-panel-title">Your requests</span>
          <span className="dir-panel-note mono">{sorted.length} total</span>
        </div>
        {sorted.length === 0 ? (
          <div className="pg-empty pg-empty--inline">
            <p>No intro requests yet.</p>
          </div>
        ) : (
          <ul className="intro-list">
            {sorted.map((req) => (
              <li key={req.id} className="intro-list-item">
                <div className="intro-list-main">
                  <div className="intro-list-head">
                    <Link href={`/dashboard/providers/${req.providerId}`} className="intro-list-name mono">
                      {req.providerName}
                    </Link>
                    <span className={`dash-badge dash-badge--${tone(req.status)}`}>
                      {introStatusLabel[req.status]}
                    </span>
                  </div>
                  <span className="intro-list-cat">{req.categoryName}</span>
                  {req.note && <p className="intro-list-note">{req.note}</p>}
                  <span className="intro-list-date mono">{formatIntroDate(req.createdAt)}</span>
                </div>
                <button
                  type="button"
                  className="prov-btn prov-btn--danger"
                  onClick={() => {
                    removeIntroRequest(req.id)
                    refresh()
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

function tone(status: IntroStatus) {
  if (status === 'completed') return 'success'
  if (status === 'in_progress') return 'accent'
  return 'neutral'
}
