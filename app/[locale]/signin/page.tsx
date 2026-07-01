'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { AuthShell, AuthField, GoogleButton } from '@/components/AuthShell'

export default function SignInPage() {
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
        eyebrow: 'Welcome back',
        title: (
          <>
            Infrastructure intelligence, <span className="serif-italic">at your fingertips.</span>
          </>
        ),
        points: [
          '240+ APIs benchmarked on fees, settlement and coverage',
          'Compare providers side by side in one workspace',
          'Warm introductions to the right teams within 48 hours',
        ],
      }}
    >
      <div className="auth-head">
        <h2 className="auth-title">Sign in to Relay</h2>
        <p className="auth-subtitle">
          New to Relay? <Link href="/signup">Create an account</Link>
        </p>
      </div>

      <GoogleButton label="Continue with Google" />

      <div className="auth-divider">or</div>

      <form className="auth-form" onSubmit={onSubmit}>
        <AuthField
          id="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />

        <div className="auth-field">
          <div className="auth-field-row">
            <label htmlFor="password">Password</label>
            <Link href="/forgot-password" className="auth-link">Forgot password?</Link>
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
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <label className="auth-check">
          <input type="checkbox" name="remember" defaultChecked />
          Keep me signed in
        </label>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="auth-legal">
        Protected by industry-standard encryption. By continuing you agree to our{' '}
        <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
      </p>
    </AuthShell>
  )
}
