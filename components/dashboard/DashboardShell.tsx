'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { logout } from '@/lib/api/auth'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import './dashboard.css'

const nav = [
  {
    section: 'Workspace',
    items: [
      { href: '/dashboard', label: 'Overview' },
      { href: '/dashboard/providers', label: 'Directory' },
      { href: '/dashboard/compare', label: 'Compare' },
      { href: '/dashboard/shortlists', label: 'Shortlists' },
    ],
  },
  {
    section: 'Intros',
    items: [{ href: '/dashboard/intros', label: 'Requests' }],
  },
  {
    section: 'Intelligence',
    items: [
      { href: '/dashboard/markets', label: 'Markets' },
      { href: '/reports', label: 'Reports' },
    ],
  },
  {
    section: 'Account',
    items: [{ href: '/dashboard/billing', label: 'Billing' }],
  },
]

function breadcrumbFor(path: string) {
  if (path.startsWith('/dashboard/providers/')) return 'WORKSPACE / DIRECTORY / DOSSIER'
  if (path.startsWith('/dashboard/markets/')) return 'INTELLIGENCE / MARKETS'
  const map: Record<string, string> = {
    '/dashboard': 'WORKSPACE / OVERVIEW',
    '/dashboard/providers': 'WORKSPACE / DIRECTORY',
    '/dashboard/compare': 'WORKSPACE / COMPARE',
    '/dashboard/shortlists': 'WORKSPACE / SHORTLISTS',
    '/dashboard/intros': 'INTROS / REQUESTS',
    '/dashboard/markets': 'INTELLIGENCE / MARKETS',
    '/dashboard/billing': 'ACCOUNT / BILLING',
  }
  return map[path] ?? 'WORKSPACE'
}

function isActive(href: string, path: string) {
  if (href === '/dashboard') return path === '/dashboard'
  return path === href || path.startsWith(`${href}/`)
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, ready } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (ready && !user) {
      router.replace('/signin')
    }
  }, [ready, user, router])

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#121212'
    return () => {
      document.body.style.background = prev
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const signOut = async () => {
    setSigningOut(true)
    await logout()
    router.push('/signin')
  }

  if (!ready || !user) {
    return (
      <div className="dash dash--boot">
        <p className="mono">Loading workspace…</p>
      </div>
    )
  }

  const subscribed = isSubscribed(user)
  const firstName = user.firstName || user.fullName.split(' ')[0]

  return (
    <div className={`dash${menuOpen ? ' dash--menu' : ''}`}>
      <aside className="dash-sidebar">
        <Link href="/dashboard" className="dash-logo">
          <Image src="/relaydark.png" alt="Relay" width={28} height={28} />
          <span>Relay.</span>
        </Link>

        <nav className="dash-nav">
          {nav.map((group) => (
            <div key={group.section} className="dash-nav-group">
              <span className="dash-nav-label mono">{group.section}</span>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`dash-nav-link ${isActive(item.href, pathname) ? 'dash-nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="dash-sidebar-foot">
          {!subscribed && (
            <Link href="/dashboard/billing" className="dash-upgrade mono">
              Upgrade to Operator
            </Link>
          )}
          <div className="dash-user">
            <span className="dash-user-avatar mono">{user.initials}</span>
            <div className="dash-user-meta">
              <div className="dash-user-name">{firstName}</div>
              <div className="dash-user-email mono">{user.email}</div>
              <button type="button" onClick={signOut} className="dash-user-action mono" disabled={signingOut}>
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <button
            type="button"
            className="dash-menu-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <i />
            <i />
          </button>
          <span className="dash-breadcrumb mono">{breadcrumbFor(pathname)}</span>
          <form
            className="dash-search-form"
            onSubmit={(e) => {
              e.preventDefault()
              const q = new FormData(e.currentTarget).get('q')
              if (typeof q === 'string' && q.trim()) {
                router.push(`/dashboard/providers?q=${encodeURIComponent(q.trim())}`)
              }
            }}
          >
            <input
              type="search"
              name="q"
              className="dash-search"
              placeholder="Search providers, rails, markets…"
            />
          </form>
          <span className={`dash-plan mono ${subscribed ? 'dash-plan--on' : ''}`}>
            {subscribed ? 'Operator' : 'Free'}
          </span>
        </header>
        <div className="dash-scroll">
          <div className="dash-content">{children}</div>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="dash-nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}
