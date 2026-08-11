'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AuthShell, AuthField, GoogleButton } from '@/components/AuthShell'

export default function SignUpPage() {
  const t = useTranslations('auth.signup')
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
          <Link href="/signin">{t('signIn')}</Link>
        </p>
      </div>

      <GoogleButton label={t('google')} />

      <div className="auth-divider">{tAuth('or')}</div>

      <form className="auth-form" onSubmit={onSubmit}>
        <AuthField
          id="name"
          label={t('nameLabel')}
          placeholder={t('namePlaceholder')}
          autoComplete="name"
        />
        <AuthField
          id="company"
          label={t('companyLabel')}
          placeholder={t('companyPlaceholder')}
          autoComplete="organization"
        />
        <AuthField
          id="email"
          label={t('emailLabel')}
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
        />

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

        <label className="auth-check">
          <input type="checkbox" name="terms" required />
          {t('termsAgree')}
        </label>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? t('submitting') : t('submit')}
        </button>
      </form>

      <p className="auth-legal">{t('footnote')}</p>
    </AuthShell>
  )
}
