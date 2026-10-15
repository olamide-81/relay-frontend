'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { A } from '@/lib/dc/runtime'
import { AuthButton, AuthError, AuthFrame, AuthInput, AuthNote, AuthReveal, AuthStyles } from '@/components/relay-app/AuthFrame'

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword')
  const { locale } = useParams<{ locale: string }>()
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submit = () => {
    if (busy) return
    if (pw.length < 8) return setError(t('errorShort'))
    if (pw !== confirm) return setError(t('errorMismatch'))
    setError('')
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setDone(true)
    }, 900)
  }

  if (done)
    return (
      <AuthFrame title={t('successTitle')} lede={t('successLede')}>
        <AuthStyles />
        <AuthButton href={`/${locale}/signin`}>{t('backToSignIn')}</AuthButton>
      </AuthFrame>
    )

  return (
    <AuthFrame title={t('title')} lede={t('subtitle')}>
      <AuthStyles />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
      >
        <AuthInput
          label={t('passwordLabel')}
          type={show ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          invalid={!!error && pw.length < 8}
          aside={<AuthReveal shown={show} onToggle={() => setShow((s) => !s)} />}
        />
        <AuthInput
          label={t('confirmLabel')}
          type={show ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          invalid={!!error && pw.length >= 8 && pw !== confirm}
        />
        {error ? <AuthError>{error}</AuthError> : null}
        <AuthButton busy={busy} onClick={submit}>
          {busy ? t('submitting') : t('submit')}
        </AuthButton>
        <button type="submit" hidden />
      </form>
      <AuthNote>
        <A href={`/${locale}/signin`} style={{ color: '#d4d6da' }}>
          {t('cancel')}
        </A>
      </AuthNote>
    </AuthFrame>
  )
}
