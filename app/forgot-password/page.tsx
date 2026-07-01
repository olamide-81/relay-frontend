'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthShell, AuthField } from '@/components/AuthShell'

export default function ForgotPasswordPage() {
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
    }, 1000)
  }

  return (
    <AuthShell
      aside={{
        eyebrow: 'Account recovery',
        title: (
          <>
            Back to building <span className="serif-italic">in a moment.</span>
          </>
        ),
        points: [
          'Enter the email associated with your account',
          'We’ll send a secure reset link that expires in 30 minutes',
          'Still stuck? Our team is one message away',
        ],
      }}
    >
      {sent ? (
        <div className="auth-success">
          <span className="auth-success-icon" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="auth-title">Check your inbox</h2>
          <p className="auth-subtitle">
            We sent a password reset link to{' '}
            <strong>{email || 'your email'}</strong>. It expires in 30 minutes.
          </p>
          <button
            type="button"
            className="auth-submit"
            style={{ marginTop: 24 }}
            onClick={() => setSent(false)}
          >
            Resend email
          </button>
          <p className="auth-foot-note">
            Back to <Link href="/signin">Sign in</Link>
          </p>
        </div>
      ) : (
        <>
          <div className="auth-head">
            <h2 className="auth-title">Reset your password</h2>
            <p className="auth-subtitle">
              Enter your email and we’ll send you a link to reset your password.
            </p>
          </div>

          <form className="auth-form" onSubmit={onSubmit}>
            <AuthField
              id="email"
              label="Work email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Sending link…' : 'Send reset link'}
            </button>
          </form>

          <p className="auth-foot-note">
            Remember your password? <Link href="/signin">Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
