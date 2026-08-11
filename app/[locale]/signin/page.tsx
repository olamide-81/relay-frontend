'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AuthShell, AuthField, GoogleButton } from '@/components/AuthShell'

export default function SignInPage() {
  const t = useTranslations('auth.signin')
  const tAuth = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <AuthShell aside={{ line: t('asideLine') }}>
      <div className="auth-head">
        <h1 className="auth-title">{t('title')}</h1>
        <p className="auth-subtitle">
          {t('subtitleBefore')}{' '}
          <Link href="/signup">{t('createAccount')}</Link>
        </p>
      </div>

      <GoogleButton label={t('google')} />

      <div className="auth-divider">{tAuth('or')}</div>

      <form className="auth-form" onSubmit={onSubmit}>
        <AuthField
          id="email"
          label={t('emailLabel')}
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
        />

        <div className="auth-field">
          <div className="auth-field-row">
            <label htmlFor="password">{t('passwordLabel')}</label>
            <Link href="/forgot-password" className="auth-link">
              {t('forgotPassword')}
            </Link>
          </div>
          <div className="auth-input-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
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

        <label className="auth-check">
          <input type="checkbox" name="remember" defaultChecked />
          {t('remember')}
        </label>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? t('submitting') : t('submit')}
        </button>
      </form>

      <p className="auth-legal">
        {t('legalBefore')}{' '}
        <a href="#">{tAuth('terms')}</a> {t('legalAnd')}{' '}
        <a href="#">{tAuth('privacyPolicy')}</a>.
      </p>
    </AuthShell>
  )
}
