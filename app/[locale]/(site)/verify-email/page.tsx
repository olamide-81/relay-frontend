'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AuthButton, AuthError, AuthFrame, AuthNote, AuthStyles } from '@/components/relay-app/AuthFrame'
import { verifyEmail } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { getSession } from '@/lib/session'
import { Link, useRouter } from '@/i18n/navigation'

const verifying = new Map<string, Promise<unknown>>()

export default function VerifyEmailPage() {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
  const [state, setState] = useState<'busy' | 'done' | 'error'>('busy')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) {
      setError('This verification link is incomplete. Open the link from your email again.')
      setState('error')
      return
    }
    let pending = verifying.get(token)
    if (!pending) {
      pending = verifyEmail(token)
      verifying.set(token, pending)
    }
    let cancelled = false
    pending
      .then(() => {
        if (cancelled) return
        setState('done')
        if (getSession()) router.replace('/dashboard')
      })
      .catch((err) => {
        verifying.delete(token)
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : 'We could not verify your email. Try again.')
        setState('error')
      })
    return () => {
      cancelled = true
    }
  }, [router])

  if (state === 'error')
    return (
      <AuthFrame title="Verification failed">
        <AuthStyles />
        <AuthError>
          {error}{' '}
          <Link href="/signin" style={{ color: '#d4d6da' }}>
            Back to log in
          </Link>
        </AuthError>
      </AuthFrame>
    )

  if (state === 'done')
    return (
      <AuthFrame title="Email verified" lede="Your Relay account is confirmed.">
        <AuthStyles />
        <AuthButton href={`/${locale}/signin`}>Log in to Relay</AuthButton>
      </AuthFrame>
    )

  return (
    <AuthFrame title="Verifying your email" lede="One moment while we confirm your account.">
      <AuthStyles />
      <AuthNote>Do not close this tab.</AuthNote>
    </AuthFrame>
  )
}
