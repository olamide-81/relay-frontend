'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RelayLogin from '@/components/relay/RelayLogin'
import RelaySignUp from '@/components/relay/RelaySignUp'
import {
  googleAuthErrorMessage,
  login,
  loginWithGoogle,
  register,
  rememberInvite,
  TwoFactorRequired,
} from '@/lib/api/auth'

type Fields = { name?: string; email: string; password: string }

/** The design's sign-up has no company field; start from the email domain (editable later). */
function companyFromEmail(email: string) {
  const d = email.split('@')[1]?.split('.')[0] ?? ''
  return d ? d[0].toUpperCase() + d.slice(1) : 'Independent'
}

/** Log in / Sign up screens wired to the auth API. */
export default function AuthScreen({ mode }: { mode: 'signin' | 'signup' }) {
  const { locale } = useParams<{ locale: string }>()
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('error')
    // WAITLISTED is the login notice (Relay Login reads the query), not a red error.
    if (code && code !== 'WAITLISTED') setError(googleAuthErrorMessage[code] ?? 'Google sign-in failed. Try again.')
    rememberInvite(params.get('invite'))
  }, [])

  const onAuth = async (kind: 'email' | 'google', f: Fields) => {
    setError(undefined)
    try {
      if (kind === 'google') await loginWithGoogle(locale, mode)
      else if (mode === 'signin') await login({ email: f.email, password: f.password })
      else await register({ fullName: f.name ?? '', email: f.email, password: f.password, company: companyFromEmail(f.email) })
    } catch (err) {
      if (err instanceof TwoFactorRequired) {
        window.location.assign(`/${locale}/two-factor`)
        return new Promise<never>(() => {})
      }
      throw err
    }
    window.location.assign(`/${locale}/dashboard`)
  }

  return mode === 'signin' ? <RelayLogin onAuth={onAuth} error={error} /> : <RelaySignUp onAuth={onAuth} error={error} />
}
