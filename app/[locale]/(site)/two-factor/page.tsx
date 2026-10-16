'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { A } from '@/lib/dc/runtime'
import { completeTwoFactor, hasTwoFactorChallenge, restoreSession } from '@/lib/api/auth'
import { appApi } from '@/lib/api/app'
import { getSession } from '@/lib/session'
import { AuthButton, AuthError, AuthFrame, AuthInput, AuthNote, AuthStyles } from '@/components/relay-app/AuthFrame'

type Mode = 'login' | 'setup' | 'disable'

const COPY: Record<Mode, { title: string; lede: string; submit: string; busy: string }> = {
  login: {
    title: 'Two-factor authentication',
    lede: 'Enter the 6-digit code from your authenticator app.',
    submit: 'Verify and continue',
    busy: 'Verifying…',
  },
  setup: {
    title: 'Turn on two-factor',
    lede: 'Scan the code with Google Authenticator, 1Password or any authenticator app, then enter the 6-digit code it shows.',
    submit: 'Turn on two-factor',
    busy: 'Turning on…',
  },
  disable: {
    title: 'Turn off two-factor',
    lede: 'Enter a code from your authenticator app to confirm.',
    submit: 'Turn off two-factor',
    busy: 'Turning off…',
  },
}

/** TOTP step after password / Google sign-in, and 2FA setup from Settings › Security. */
export default function TwoFactorPage() {
  const { locale } = useParams<{ locale: string }>()
  const [mode, setMode] = useState<Mode | null>(null)
  const [setup, setSetup] = useState<{ qr: string; secret: string } | null>(null)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const security = `/${locale}/dashboard/settings?section=security`

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get('mode')
    const next: Mode = m === 'setup' || m === 'disable' ? m : 'login'
    if (next === 'login') {
      if (!hasTwoFactorChallenge()) window.location.replace(`/${locale}/signin`)
      setMode(next)
      return
    }
    const ready = getSession() ? Promise.resolve(true) : restoreSession().then(Boolean)
    ready.then((ok) => {
      if (!ok) return window.location.replace(`/${locale}/signin`)
      setMode(next)
      if (next === 'setup')
        appApi
          .startTwoFactor()
          .then((s) => setSetup({ qr: s.qr, secret: s.secret }))
          .catch((e) => setError(e instanceof Error ? e.message : 'Could not start setup.'))
    })
  }, [locale])

  if (!mode) return null
  const t = COPY[mode]

  const submit = () => {
    if (busy) return
    const clean = code.replace(/\s+/g, '')
    if (!/^\d{6}$/.test(clean)) return setError('Enter the 6-digit code.')
    setError('')
    setBusy(true)
    const run =
      mode === 'login'
        ? completeTwoFactor(clean).then(() => `/${locale}/dashboard`)
        : mode === 'setup'
          ? appApi.enableTwoFactor(clean).then(() => security)
          : appApi.disableTwoFactor(clean).then(() => security)
    run
      .then((to) => window.location.assign(to))
      .catch((e) => {
        setBusy(false)
        setError(e instanceof Error ? e.message : 'That code didn’t work. Try again.')
      })
  }

  return (
    <AuthFrame title={t.title} lede={t.lede}>
      <AuthStyles />
      {mode === 'setup' ? (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              width: '132px',
              height: '132px',
              flex: 'none',
              borderRadius: '12px',
              background: '#f7f8f8',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden',
            }}
          >
            {setup ? <img src={setup.qr} alt="Authenticator QR code" style={{ width: '120px', height: '120px', display: 'block' }} /> : null}
          </div>
          <div style={{ fontSize: '12.5px', color: '#8a8f98', lineHeight: 1.5, minWidth: 0 }}>
            Can’t scan? Enter this key:
            <div
              style={{
                marginTop: '6px',
                color: '#f7f8f8',
                fontFamily: 'Geist Mono,ui-monospace,monospace',
                fontSize: '12.5px',
                wordBreak: 'break-all',
                letterSpacing: '0.04em',
              }}
            >
              {setup?.secret.replace(/(.{4})/g, '$1 ').trim() ?? '…'}
            </div>
          </div>
        </div>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
      >
        <AuthInput
          label="Authentication code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123 456"
          maxLength={7}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          invalid={!!error}
          autoFocus
        />
        {error ? <AuthError>{error}</AuthError> : null}
        <AuthButton busy={busy} onClick={submit}>
          {busy ? t.busy : t.submit}
        </AuthButton>
        <button type="submit" hidden />
      </form>
      <AuthNote>
        <A href={mode === 'login' ? `/${locale}/signin` : security} style={{ color: '#d4d6da' }}>
          {mode === 'login' ? 'Back to log in' : 'Cancel'}
        </A>
      </AuthNote>
    </AuthFrame>
  )
}
