'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AuthShell } from '@/components/AuthShell'

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword')
  const tAuth = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const data = new FormData(e.currentTarget)
    const password = String(data.get('password') ?? '')
    const confirm = String(data.get('confirm') ?? '')

    if (password.length < 8) {
      setError(t('errorShort'))
      return
    }
    if (password !== confirm) {
      setError(t('errorMismatch'))
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 900)
  }

  return (
    <AuthShell aside={{ line: t('asideLine') }}>
      {done ? (
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
          <p className="auth-subtitle">{t('successLede')}</p>
          <div className="auth-success-actions">
            <Link href="/signin" className="auth-submit">
              {t('backToSignIn')}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="auth-head">
            <h1 className="auth-title">{t('title')}</h1>
            <p className="auth-subtitle">{t('subtitle')}</p>
          </div>

          <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-field">
              <label htmlFor="password">{t('passwordLabel')}</label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder')}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="auth-reveal"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? tAuth('hide') : tAuth('show')}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirm">{t('confirmLabel')}</label>
              <div className="auth-input-wrap">
                <input
                  id="confirm"
                  name="confirm"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('confirmPlaceholder')}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
            </div>

            {error ? (
              <p className="auth-subtitle" role="alert" style={{ color: '#f2a7a7' }}>
                {error}
              </p>
            ) : null}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? t('submitting') : t('submit')}
            </button>
          </form>

          <p className="auth-foot-note">
            <Link href="/signin">{t('cancel')}</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
