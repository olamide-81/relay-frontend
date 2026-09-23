'use client'

import { useState } from 'react'
import { emailPartnership } from '@/lib/api/workspace'
import { ApiError } from '@/lib/api/simulate'

export function PartnershipMailButton({
  providerId,
  providerName,
  className = 'relay-btn relay-btn--outline',
}: {
  providerId: string
  providerName: string
  className?: string
}) {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSend = async () => {
    if (busy || done) return
    setBusy(true)
    setError(null)
    try {
      const result = await emailPartnership(providerId)
      if (result.via === 'provider' && result.emailed) {
        setDone(`Emailed ${providerName}. They can reply to you directly.`)
      } else if (result.emailed) {
        setDone(`Relay will introduce you to ${providerName}.`)
      } else {
        setDone(`Request logged. Relay will reach ${providerName} for you.`)
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not send partnership email')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return <p className="relay-mail-done">{done}</p>
  }

  return (
    <span className="relay-mail-wrap">
      <button type="button" className={className} disabled={busy} onClick={() => void onSend()}>
        {busy ? 'Sending…' : 'Email partnership'}
      </button>
      {error ? <span className="relay-mail-err">{error}</span> : null}
    </span>
  )
}
