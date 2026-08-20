'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import type { Provider } from '@/data/providers'
import { isSubscribed, type SessionUser } from '@/lib/session'
import {
  addToCompare,
  isInCompare,
  isInShortlist,
  MAX_COMPARE,
  submitIntroRequest,
  toggleShortlist,
} from '@/lib/workspace'

export function ProviderActions({
  provider,
  user,
  compact = false,
}: {
  provider: Provider
  user: SessionUser | null
  compact?: boolean
}) {
  const [saved, setSaved] = useState(() => isInShortlist(provider.id))
  const [compared, setCompared] = useState(() => isInCompare(provider.id))
  const [toast, setToast] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(false)
  const [note, setNote] = useState('')
  const subscribed = isSubscribed(user)

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const onShortlist = () => {
    const nowSaved = toggleShortlist(provider.id)
    setSaved(nowSaved)
    flash(nowSaved ? 'Added to shortlist' : 'Removed from shortlist')
  }

  const onCompare = () => {
    if (compared) {
      flash('Already in compare')
      return
    }
    const result = addToCompare(provider.id)
    if (result.ok) {
      setCompared(true)
      flash('Added to compare')
    } else {
      flash(result.message ?? 'Could not add')
    }
  }

  const onIntroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subscribed) return
    submitIntroRequest({
      providerId: provider.id,
      providerName: provider.name,
      categoryName: provider.categoryName,
      note,
    })
    setNote('')
    setShowIntro(false)
    flash('Intro request submitted')
  }

  return (
    <div className={`prov-actions ${compact ? 'prov-actions--compact' : ''}`}>
      {toast && <span className="prov-toast mono">{toast}</span>}

      <button
        type="button"
        className={`prov-btn ${saved ? 'prov-btn--active' : ''}`}
        onClick={onShortlist}
      >
        {saved ? 'Saved' : 'Save'}
      </button>

      <button
        type="button"
        className={`prov-btn ${compared ? 'prov-btn--active' : ''}`}
        onClick={onCompare}
        title={`Add to compare (max ${MAX_COMPARE})`}
      >
        {compared ? 'In compare' : 'Compare'}
      </button>

      {subscribed ? (
        <button type="button" className="prov-btn" onClick={() => setShowIntro((s) => !s)}>
          Intro
        </button>
      ) : (
        <Link href="/dashboard/billing" className="prov-btn">
          Intro
        </Link>
      )}

      {showIntro && subscribed && (
        <form className="prov-intro-form" onSubmit={onIntroSubmit}>
          <textarea
            className="prov-intro-input"
            placeholder="What are you building? Markets, volumes, timeline…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            required
          />
          <div className="prov-intro-actions">
            <button type="submit" className="prov-btn prov-btn--primary">
              Submit request
            </button>
            <button type="button" className="prov-btn" onClick={() => setShowIntro(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {!compact && compared && (
        <Link href="/dashboard/compare" className="prov-link mono">
          View compare →
        </Link>
      )}
    </div>
  )
}

export function VerifiedBadge({
  verified,
  level,
}: {
  verified: boolean
  level?: Provider['verificationLevel']
}) {
  if (!verified) {
    return <span className="dash-badge dash-badge--neutral">Listed</span>
  }
  return (
    <span className="dash-badge dash-badge--verified" title="Relay-verified dossier">
      {level === 'relay_verified' ? 'Relay verified' : 'Documented'}
    </span>
  )
}
