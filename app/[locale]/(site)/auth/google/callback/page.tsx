'use client'

import { useEffect, useState } from 'react'
import { AuthFrame, AuthError, AuthNote, AuthStyles } from '@/components/relay-app/AuthFrame'
import { completeGoogleLogin, TwoFactorRequired } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { Link, useRouter } from '@/i18n/navigation'

function safeNext(raw: string | null) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  return raw
}

const completing = new Map<string, Promise<void>>()

export default function GoogleCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ticket = params.get('ticket')
    const next = safeNext(params.get('next'))
    if (!ticket) {
      setError('Google sign-in did not return a session. Try again.')
      return
    }

    let cancelled = false
    let pending = completing.get(ticket)
    if (!pending) {
      pending = completeGoogleLogin(ticket).then(() => undefined)
      completing.set(ticket, pending)
    }

    pending
      .then(() => {
        if (!cancelled) router.replace(next)
      })
      .catch((err) => {
        completing.delete(ticket)
        if (cancelled) return
        if (err instanceof TwoFactorRequired) return router.replace('/two-factor')
        setError(err instanceof ApiError ? err.message : 'Google sign-in failed. Try again.')
      })

    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <AuthFrame
      title={error ? 'Google sign-in failed' : 'Signing you in'}
      lede={error ? undefined : 'One moment while we finish the Google handshake.'}
    >
      <AuthStyles />
      {error ? (
        <AuthError>
          {error}{' '}
          <Link href="/signin" style={{ color: '#d4d6da' }}>
            Back to log in
          </Link>
        </AuthError>
      ) : (
        <AuthNote>Do not close this tab.</AuthNote>
      )}
    </AuthFrame>
  )
}
