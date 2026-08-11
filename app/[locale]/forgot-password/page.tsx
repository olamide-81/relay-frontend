'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AuthShell, AuthField } from '@/components/AuthShell'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = (e.currentTarget as HTMLFormElement).email?.value ?? ''
    setEmail(value)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 900)
  }

  return (
    <AuthShell aside={{ line: t('asideLine') }}>
      {sent ? (
        <div className="auth-success">
          <span className="auth-success-icon" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5 10 17.5 19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h1 className="auth-title">{t('successTitle')}</h1>
          <p className="auth-subtitle">
            {t('successBefore')} <strong>{email || t('yourEmail')}</strong>.{' '}
            {t('successAfter')}
          </p>
          <div className="auth-success-actions">
            <Link href="/reset-password" className="auth-submit">
              {t('openReset')}
            </Link>
            <button type="button" className="auth-submit auth-submit--ghost" onClick={() => setSent(false)}>
              {t('resend')}
            </button>
          </div>
          <p className="auth-foot-note">
            {t('backToSignIn')}{' '}
            <Link href="/signin">{t('signIn')}</Link>
          </p>
        </div>
      ) : (
        <>
          <div className="auth-head">
            <h1 className="auth-title">{t('title')}</h1>
            <p className="auth-subtitle">{t('subtitle')}</p>
          </div>

          <form className="auth-form" onSubmit={onSubmit}>
            <AuthField
              id="email"
              label={t('emailLabel')}
              type="email"
              placeholder={t('emailPlaceholder')}
              autoComplete="email"
            />
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? t('submitting') : t('submit')}
            </button>
          </form>

          <p className="auth-foot-note">
            {t('rememberPassword')}{' '}
            <Link href="/signin">{t('signIn')}</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
