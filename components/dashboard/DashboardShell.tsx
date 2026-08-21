'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { logout } from '@/lib/api/auth'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import './dashboard.css'

const nav = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/providers', label: 'Directory' },
  { href: '/dashboard/compare', label: 'Compare' },
  { href: '/dashboard/shortlists', label: 'Shortlists' },
  { href: '/dashboard/intros', label: 'Requests' },
  { href: '/dashboard#reports', label: 'Reports' },
  { href: '/dashboard/markets', label: 'Markets' },
]

function isActive(href: string, path: string, hash: string) {
  if (href === '/dashboard#reports') return path === '/dashboard' && hash === '#reports'
  if (href === '/dashboard') return path === '/dashboard' && hash !== '#reports'
  return path === href || path.startsWith(`${href}/`)
}

export default function DashboardShell({ children: _children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, ready } = useSession()
  const [hash, setHash] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ready && !user) router.replace('/signin')
  }, [ready, user, router])

  useEffect(() => {
    setHash(typeof window !== 'undefined' ? window.location.hash : '')
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#0a0b0d'
    return () => {
      document.body.style.background = prev
    }
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
    if (query.trim()) {
      router.push(`/dashboard/providers?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  if (!ready || !user) {
    return (
      <div className="dash dash--boot">
        <p>Loading…</p>
      </div>
    )
  }

  const subscribed = isSubscribed(user)

  return (
    <div className="dash">
      <header className="dash-topbar">
        <Link href="/dashboard" className="dash-topbar-logo">
          <Image src="/relaylight.png" alt="" width={26} height={26} />
          <span>Relay</span>
        </Link>

        <nav className="dash-topbar-nav" aria-label="Workspace">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dash-topbar-link ${isActive(item.href, pathname, hash) ? 'dash-topbar-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="dash-topbar-tools">
          {searchOpen ? (
            <form className="dash-topbar-search" onSubmit={onSearch}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search providers…"
                autoFocus
                aria-label="Search providers"
              />
              <button
                type="button"
                className="dash-icon-btn"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          ) : (
            <>
              <button type="button" className="dash-icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5 17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <Link href="/dashboard/intros" className="dash-icon-btn" aria-label="Notifications">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 3a5 5 0 0 1 5 5v2.8l1.7 2.8H3.3L5 10.8V8a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8.5 15.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Link href="/dashboard/intros" className="dash-icon-btn" aria-label="Inbox">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <rect x="2.5" y="5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2.5 7.5 10 12.5l7.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </Link>
            </>
          )}

          <div className="dash-profile" ref={profileRef}>
            <button
              type="button"
              className="dash-profile-btn"
              aria-label="Account"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((o) => !o)}
            >
              <span className="dash-profile-avatar">{user.initials}</span>
            </button>
            {profileOpen && (
              <div className="dash-profile-menu">
                <div className="dash-profile-menu-head">
                  <strong>{user.fullName}</strong>
                  <span>{user.email}</span>
                  <span className="dash-profile-plan">{subscribed ? 'Operator' : 'Free'}</span>
                </div>
                <Link href="/dashboard/billing" className="dash-profile-item" onClick={() => setProfileOpen(false)}>
                  Billing
                </Link>
                <button
                  type="button"
                  className="dash-profile-item"
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
    </div>
  )
}
