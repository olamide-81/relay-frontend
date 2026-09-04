'use client'

import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { logout } from '@/lib/api/auth'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import RelayMark from '@/components/RelayMark'
import NotificationBell from '@/components/dashboard/chrome/NotificationBell'
import type { TopBarSection } from '@/lib/relay/types'

const NAV: { name: TopBarSection; href: string; badge?: string; lime?: boolean }[] = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Directory', href: '/dashboard/providers' },
  { name: 'Compare', href: '/dashboard/compare' },
  { name: 'Shortlists', href: '/dashboard/shortlists', badge: '12' },
  { name: 'Requests', href: '/dashboard/intros', badge: '3', lime: true },
]

export default function TopBar({ active }: { active: TopBarSection }) {
  const router = useRouter()
  const { user } = useSession()
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const subscribed = isSubscribed(user)
  const company = user?.company || 'Northwind Co.'
  const initial = (user?.initials || 'D').slice(0, 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/dashboard/providers?q=${encodeURIComponent(q)}` : '/dashboard/providers')
  }

  return (
    <header className="relay-topbar">
      <Link href="/dashboard" className="relay-logo">
        <RelayMark priority />
      </Link>

      <nav className="relay-pills" aria-label="Primary">
        {NAV.map((item) => {
          const on = item.name === active
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relay-pill${on ? ' relay-pill--on' : ''}`}
              aria-current={on ? 'page' : undefined}
            >
              {item.name}
              {item.badge ? (
                <span className={`relay-pill-badge${item.lime ? ' relay-pill-badge--lime' : ''}`}>
                  {item.badge}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      <form className="relay-search" onSubmit={onSearch} role="search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,.45)" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.5 16.5L21 21" stroke="rgba(255,255,255,.45)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search providers, corridors, licences"
          aria-label="Search providers, corridors, licences"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <kbd>⌘K</kbd>
      </form>

      <div className="relay-topbar-right">
        <NotificationBell />

        <div className="relay-account-wrap" ref={profileRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="relay-account"
            aria-label="Account"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((o) => !o)}
          >
            <span className="relay-avatar">{initial}</span>
            <span className="relay-account-label">{company}</span>
          </button>
          {profileOpen && (
            <div className="relay-menu">
              <div className="relay-menu-head">
                <strong>{user?.fullName}</strong>
                <span>{user?.email}</span>
                <span>{subscribed ? 'Pro' : 'Explorer'}</span>
              </div>
              <Link href="/dashboard/billing" className="relay-menu-item" onClick={() => setProfileOpen(false)}>
                Subscription
              </Link>
              <button
                type="button"
                className="relay-menu-item"
                onClick={async () => {
                  await logout()
                  router.push('/signin')
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
