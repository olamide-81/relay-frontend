'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { activateSubscription } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { gateCopy } from '@/lib/gates'
import { useSession } from '@/hooks/useSession'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { ProBadge } from '@/components/dashboard/gate/ProBadge'
import { TickIcon } from '@/components/dashboard/gate/ProBadge'

export function UpgradeDialog() {
  const router = useRouter()
  const { refresh } = useSession()
  const { gate, closeGate } = useGate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!gate) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGate('dismiss')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [gate, closeGate])

  if (!gate) return null

  const copy = gateCopy(gate.id, gate.vars)
  const isSeats = gate.id === 'seats.invite'

  const onStart = async () => {
    if (isSeats) {
      closeGate('convert')
      router.push('/dashboard/plans')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await activateSubscription()
      refresh()
      closeGate('convert')
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not start Pro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relay-paywall" role="presentation">
      <button type="button" className="relay-paywall-scrim" aria-label="Dismiss" onClick={() => closeGate('dismiss')} />
      <div className="relay-paywall-dialog" role="dialog" aria-labelledby="relay-paywall-title" aria-modal="true">
        <div className="relay-paywall-top">
          <ProBadge label="PRO FEATURE" />
          {copy.counter ? <span className="relay-paywall-meta">{copy.counter}</span> : null}
        </div>
        <h2 id="relay-paywall-title">{copy.headline}</h2>
        <p className="relay-paywall-body">{copy.body}</p>
        <ul className="relay-paywall-list">
          {copy.bullets.map((b) => (
            <li key={b}>
              <TickIcon />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="relay-paywall-actions">
          <button type="button" className="relay-btn relay-btn--lime" onClick={onStart} disabled={loading}>
            {loading ? 'Starting Pro…' : copy.cta}
          </button>
          <button
            type="button"
            className="relay-btn relay-btn--outline"
            onClick={() => {
              closeGate('dismiss')
              router.push('/dashboard/plans')
            }}
          >
            Compare plans
          </button>
          <button type="button" className="relay-paywall-later" onClick={() => closeGate('dismiss')}>
            Not now
          </button>
        </div>
        {error ? <p className="relay-paywall-error">{error}</p> : null}
        <div className="relay-paywall-foot">Cancel any time. Annual billing saves two months.</div>
      </div>
    </div>
  )
}
