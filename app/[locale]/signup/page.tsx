'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { AuthShell, AuthField, GoogleButton } from '@/components/AuthShell'
import { loginWithGoogle, register } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'

export default function SignUpPage() {
  const t = useTranslations('auth.signup')
  const tAuth = useTranslations('auth')
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const busy = loading || googleLoading

  const goDashboard = () => router.push('/dashboard')

  const onGoogle = async () => {
    setError(null)
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      goDashboard()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not continue with Google')
      setGoogleLoading(false)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
      await register({
        fullName: String(form.get('name') ?? ''),
        company: String(form.get('company') ?? ''),
        email: String(form.get('email') ?? ''),
        password: String(form.get('password') ?? ''),
      })
      goDashboard()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create account')
      setLoading(false)
    }
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

      <GoogleButton
        label={googleLoading ? t('submitting') : t('google')}
        loading={googleLoading}
        disabled={busy}
        onClick={onGoogle}
      />

      <div className="auth-divider">{tAuth('or')}</div>

      {error && <p className="auth-error">{error}</p>}

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
              disabled={busy}
            >
              {showPassword ? tAuth('hide') : tAuth('show')}
            </button>
          </div>
        </div>

        <label className="auth-check">
          <input type="checkbox" name="terms" required disabled={busy} />
          {t('termsAgree')}
        </label>

        <button type="submit" className="auth-submit" disabled={busy}>
          {loading ? t('submitting') : t('submit')}
        </button>
      </form>

      <p className="auth-legal">{t('footnote')}</p>
    </AuthShell>
  )
}
