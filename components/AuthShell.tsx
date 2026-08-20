'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './auth.css'

type AuthAside = {
  /** Short line over the image — keep it one breath. */
  line: string
}

export function AuthShell({
  aside,
  children,
}: {
  aside: AuthAside
  children: React.ReactNode
}) {
  const t = useTranslations('auth')

  return (
    <div className="auth">
      <aside className="auth-visual" aria-hidden={false}>
        <Image
          src="/auth-mountains.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 0px, 50vw"
          className="auth-visual-img"
        />
        <div className="auth-visual-shade" aria-hidden />
        <div className="auth-visual-grain" aria-hidden />

        <Link href="/" className="auth-visual-brand">
          <Image
            src="/relaydark.png"
            alt={t('logoAlt')}
            width={28}
            height={28}
            className="auth-visual-brand-icon"
          />
          <span>{t('brandMark')}</span>
        </Link>

        <p className="auth-visual-line">{aside.line}</p>
      </aside>

      <main className="auth-panel">
        <div className="auth-panel-top">
          <Link href="/" className="auth-logo auth-logo--mobile">
            <Image
              src="/relaydark.png"
              alt={t('logoAlt')}
              width={28}
              height={28}
            />
            <span>{t('brandMark')}</span>
          </Link>
          <div className="auth-panel-actions">
            <LocaleSwitcher
              className="auth-locale"
              variant="nav"
              label={t('languageLabel')}
            />
            <Link href="/" className="auth-back">
              {t('backToSite')}
            </Link>
          </div>
        </div>

        <div className="auth-form-wrap">{children}</div>
      </main>
    </div>
  )
}

export function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = true,
  trailing,
  minLength,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  trailing?: React.ReactNode
  minLength?: number
}) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
        {trailing}
      </div>
    </div>
  )
}

export function GoogleButton({
  label,
  loading = false,
  disabled = false,
  onClick,
}: {
  label: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button type="button" className="auth-social" disabled={disabled || loading} onClick={onClick}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62Z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.33A9 9 0 0 0 9 18Z"
          fill="#34A853"
        />
        <path
          d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.02-2.33Z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
          fill="#EA4335"
        />
      </svg>
      {label}
    </button>
  )
}
