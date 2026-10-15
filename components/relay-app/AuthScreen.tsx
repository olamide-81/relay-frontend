'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RelayLogin from '@/components/relay/RelayLogin'
import RelaySignUp from '@/components/relay/RelaySignUp'
import { googleAuthErrorMessage, login, loginWithGoogle, register } from '@/lib/api/auth'

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
    const code = new URLSearchParams(window.location.search).get('error')
    if (code) setError(googleAuthErrorMessage[code] ?? 'Google sign-in failed. Try again.')
  }, [])

  const onAuth = async (kind: 'email' | 'google', f: Fields) => {
    setError(undefined)
    if (kind === 'google') await loginWithGoogle(locale, mode)
    else if (mode === 'signin') await login({ email: f.email, password: f.password })
    else await register({ fullName: f.name ?? '', email: f.email, password: f.password, company: companyFromEmail(f.email) })
    window.location.assign(`/${locale}/dashboard`)
  }

  return mode === 'signin' ? <RelayLogin onAuth={onAuth} error={error} /> : <RelaySignUp onAuth={onAuth} error={error} />
}
