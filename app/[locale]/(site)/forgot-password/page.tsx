'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { forgotPassword } from '@/lib/api/auth'
import { A } from '@/lib/dc/runtime'
import { AuthButton, AuthError, AuthFrame, AuthInput, AuthNote, AuthStyles } from '@/components/relay-app/AuthFrame'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')
  const { locale } = useParams<{ locale: string }>()
  const [email, setEmail] = useState('')
  const [tried, setTried] = useState(false)
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ok = EMAIL.test(email)

  const submit = async () => {
    if (busy) return
    setTried(true)
    if (!ok) return
    setBusy(true)
    setError(null)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  const signIn = (
    <AuthNote>
      {t('rememberPassword')}{' '}
      <A href={`/${locale}/signin`} style={{ color: '#d4d6da' }}>
        {t('signIn')}
      </A>
    </AuthNote>
  )

  if (sent)
    return (
      <AuthFrame
        title={t('successTitle')}
        lede={
          <>
            {t('successBefore')} <span style={{ color: '#f7f8f8' }}>{email}</span>. {t('successAfter')}
          </>
        }
      >
        <AuthStyles />
        <AuthButton href={`/${locale}/reset-password`}>{t('openReset')}</AuthButton>
        <AuthButton ghost onClick={() => setSent(false)}>
          {t('resend')}
        </AuthButton>
        {signIn}
      </AuthFrame>
    )

  return (
    <AuthFrame title={t('title')} lede={t('subtitle')}>
      <AuthStyles />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
      >
        <AuthInput
          label={t('emailLabel')}
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={tried && !ok}
        />
        {(tried && !ok) || error ? <AuthError>{error ?? 'Enter a valid work email.'}</AuthError> : null}
        <AuthButton busy={busy} onClick={submit}>
          {busy ? t('submitting') : t('submit')}
        </AuthButton>
        <button type="submit" hidden />
      </form>
      {signIn}
    </AuthFrame>
  )
}
