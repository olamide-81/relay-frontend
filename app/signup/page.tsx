'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthShell, AuthField, GoogleButton } from '@/components/AuthShell'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <AuthShell
      aside={{
        eyebrow: 'Get started',
        title: (
          <>
            Build on the right rails, <span className="serif-italic">from the first call.</span>
          </>
        ),
        points: [
          'Free for builders — no credit card required',
          'Full access to the directory and comparison tools',
          'Request warm introductions to vetted providers',
        ],
      }}
    >
      <div className="auth-head">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>

      <GoogleButton label="Sign up with Google" />

      <div className="auth-divider">or</div>

      <form className="auth-form" onSubmit={onSubmit}>
        <AuthField
          id="name"
          label="Full name"
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
        <AuthField
          id="company"
          label="Company"
          placeholder="Your fintech"
          autoComplete="organization"
        />
        <AuthField
          id="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <div className="auth-input-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <button
              type="button"
              className="auth-reveal"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <label className="auth-check">
          <input type="checkbox" name="terms" required />
          I agree to the Terms and Privacy Policy
        </label>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-legal">
        Join 140+ fintech teams already building with Relay.
      </p>
    </AuthShell>
  )
}
