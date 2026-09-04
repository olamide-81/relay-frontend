'use client'

import { useEffect, useState } from 'react'
import { AuthShell } from '@/components/AuthShell'
import { completeGoogleLogin } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { Link, useRouter } from '@/i18n/navigation'

function safeNext(raw: string | null) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  return raw
}

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
    void completeGoogleLogin(ticket)
      .then(() => {
        if (!cancelled) router.replace(next)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : 'Google sign-in failed. Try again.')
      })
    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <AuthShell aside={{ line: 'Signing you in with Google.' }}>
      <div className="auth-head">
        <h1 className="auth-title">{error ? 'Google sign-in failed' : 'Signing you in'}</h1>
        <p className="auth-subtitle">
          {error ?? 'One moment while we finish the Google handshake.'}
        </p>
      </div>
      {error ? (
        <p className="auth-error">
          {error}{' '}
          <Link href="/signin">Back to sign in</Link>
        </p>
      ) : (
        <p className="auth-legal">Do not close this tab.</p>
      )}
    </AuthShell>
  )
}
