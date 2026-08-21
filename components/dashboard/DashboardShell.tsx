'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { logout } from '@/lib/api/auth'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import DashTooltip from '@/components/dashboard/DashTooltip'
import './dashboard.css'

const navItems: { section: Section; label: string; href: string }[] = [
  { section: 'overview', label: 'Overview', href: '/dashboard' },
  { section: 'directory', label: 'Directory', href: '/dashboard/providers' },
  { section: 'compare', label: 'Compare', href: '/dashboard/compare' },
  { section: 'shortlists', label: 'Shortlists', href: '/dashboard/shortlists' },
  { section: 'requests', label: 'Requests', href: '/dashboard/intros' },
  { section: 'reports', label: 'Reports', href: '/dashboard' },
  { section: 'markets', label: 'Markets', href: '/dashboard/markets' },
]

type Section = 'overview' | 'directory' | 'compare' | 'shortlists' | 'requests' | 'reports' | 'markets'

type QuickAction = {
  id: string
  href: string
  label: string
  hint: string
  icon: 'plus' | 'star' | 'compare' | 'directory' | 'report' | 'market' | 'grid'
  reportsHash?: boolean
}

const sectionActions: Record<Section, QuickAction[]> = {
  overview: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Browse directory',
      hint: 'Search and explore payment providers across categories and markets.',
      icon: 'directory',
    },
    {
      id: 'request',
      href: '/dashboard/intros',
      label: 'New request',
      hint: 'Start a warm intro when a partner does not take cold inbound.',
      icon: 'plus',
    },
    {
      id: 'compare',
      href: '/dashboard/compare',
      label: 'Compare',
      hint: 'Review shortlisted providers side by side on fees, coverage, and fit.',
      icon: 'compare',
    },
  ],
  directory: [
    {
      id: 'shortlists',
      href: '/dashboard/shortlists',
      label: 'Shortlists',
      hint: 'Save providers you want to revisit, share, or compare later.',
      icon: 'star',
    },
    {
      id: 'compare',
      href: '/dashboard/compare',
      label: 'Compare',
      hint: 'Open the compare view with providers you are evaluating.',
      icon: 'compare',
    },
    {
      id: 'request',
      href: '/dashboard/intros',
      label: 'New request',
      hint: 'Request a warm introduction to a provider from the directory.',
      icon: 'plus',
    },
    {
      id: 'markets',
      href: '/dashboard/markets',
      label: 'Markets',
      hint: 'Switch to regional market context while browsing providers.',
      icon: 'market',
    },
    {
      id: 'reports',
      href: '/dashboard',
      label: 'Reports',
      hint: 'Jump to intelligence reports linked to your directory research.',
      icon: 'report',
      reportsHash: true,
    },
  ],
  compare: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Add providers',
      hint: 'Go back to the directory to add more rows to your comparison.',
      icon: 'directory',
    },
    {
      id: 'shortlists',
      href: '/dashboard/shortlists',
      label: 'Shortlists',
      hint: 'Pull saved providers into your compare workflow.',
      icon: 'star',
    },
    {
      id: 'reports',
      href: '/dashboard',
      label: 'Reports',
      hint: 'Open reports for deeper market and provider analysis.',
      icon: 'report',
      reportsHash: true,
    },
  ],
  shortlists: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Browse directory',
      hint: 'Find more providers to add to your shortlists.',
      icon: 'directory',
    },
    {
      id: 'compare',
      href: '/dashboard/compare',
      label: 'Compare',
      hint: 'Compare saved providers on the metrics that matter to you.',
      icon: 'compare',
    },
    {
      id: 'request',
      href: '/dashboard/intros',
      label: 'New request',
      hint: 'Request an intro to a shortlisted provider.',
      icon: 'plus',
    },
  ],
  requests: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Find provider',
      hint: 'Pick a provider to attach to a new intro request.',
      icon: 'directory',
    },
    {
      id: 'shortlists',
      href: '/dashboard/shortlists',
      label: 'Shortlists',
      hint: 'Use saved lists to choose who you want an intro to.',
      icon: 'star',
    },
  ],
  reports: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Directory',
      hint: 'Move from report insights into live provider profiles.',
      icon: 'directory',
    },
    {
      id: 'markets',
      href: '/dashboard/markets',
      label: 'Markets',
      hint: 'See how report findings map to specific regions.',
      icon: 'market',
    },
    {
      id: 'compare',
      href: '/dashboard/compare',
      label: 'Compare',
      hint: 'Compare providers mentioned in your research.',
      icon: 'compare',
    },
  ],
  markets: [
    {
      id: 'directory',
      href: '/dashboard/providers',
      label: 'Directory',
      hint: 'Browse providers filtered by the market you are viewing.',
      icon: 'directory',
    },
    {
      id: 'reports',
      href: '/dashboard',
      label: 'Reports',
      hint: 'Read intelligence reports for this region or topic.',
      icon: 'report',
      reportsHash: true,
    },
  ],
}

function readHash() {
  return typeof window !== 'undefined' ? window.location.hash : ''
}

function clearUrlHash() {
  if (typeof window === 'undefined' || !window.location.hash) return
  window.history.replaceState(null, '', window.location.pathname)
}

function setUrlReportsHash() {
  if (typeof window === 'undefined') return
  window.history.replaceState(null, '', `${window.location.pathname}#reports`)
}

function getSection(path: string, hash: string): Section {
  if (path === '/dashboard' && hash === '#reports') return 'reports'
  if (path.startsWith('/dashboard/providers')) return 'directory'
  if (path.startsWith('/dashboard/compare')) return 'compare'
  if (path.startsWith('/dashboard/shortlists')) return 'shortlists'
  if (path.startsWith('/dashboard/intros')) return 'requests'
  if (path.startsWith('/dashboard/markets')) return 'markets'
  return 'overview'
}

function getPageTitle(path: string, hash: string): string {
  if (path === '/dashboard/billing') return 'Billing'
  const section = getSection(path, hash)
  const titles: Record<Section, string> = {
    overview: 'Overview',
    directory: 'Directory',
    compare: 'Compare',
    shortlists: 'Shortlists',
    requests: 'Requests',
    reports: 'Reports',
    markets: 'Markets',
  }
  return titles[section]
}

function actionTargetSection(action: QuickAction): Section {
  if (action.reportsHash) return 'reports'
  if (action.href === '/dashboard') return 'overview'
  return getSection(action.href, '')
}

function ActionIcon({ name }: { name: QuickAction['icon'] }) {
  switch (name) {
    case 'plus':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M10 3.5 11.8 7.2l4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L10 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'compare':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect x="3.5" y="4.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11.5" y="4.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'directory':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <ellipse cx="10" cy="5.5" rx="6.5" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 5.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 9.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'report':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M5.5 4.5h9v11h-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7.5 8h5M7.5 11h5M7.5 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'market':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 10h13M10 3.5a10.5 10.5 0 0 1 0 13M10 3.5a10.5 10.5 0 0 0 0 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="3.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3.5" y="11" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="11" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
  }
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

  const section = getSection(pathname, hash)
  const pageTitle = getPageTitle(pathname, hash)
  const quickActions = sectionActions[section]

  const goToReports = () => {
    if (pathname === '/dashboard') {
      setUrlReportsHash()
      setHash('#reports')
      return
    }
    sessionStorage.setItem('relay-dash-pending-reports', '1')
    router.push('/dashboard')
  }

  const goToSection = (href: string) => {
    sessionStorage.removeItem('relay-dash-pending-reports')
    clearUrlHash()
    setHash('')
    if (pathname !== href) router.push(href)
  }

  useEffect(() => {
    if (ready && !user) router.replace('/signin')
  }, [ready, user, router])

  useEffect(() => {
    setHash(readHash())
    const onHash = () => setHash(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (pathname === '/dashboard' && sessionStorage.getItem('relay-dash-pending-reports')) {
      sessionStorage.removeItem('relay-dash-pending-reports')
      setUrlReportsHash()
      setHash('#reports')
      return
    }

    const current = readHash()
    if (pathname === '/dashboard') {
      if (current === '#reports') {
        setHash('#reports')
      } else {
        if (current) clearUrlHash()
        setHash('')
      }
      return
    }

    if (current) clearUrlHash()
    setHash('')
  }, [pathname])

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#0a0a0c'
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
      <div className="dash-frame">
      <header className="dash-topbar">
        <Link href="/dashboard" className="dash-topbar-logo">
          <Image src="/relaylight.png" alt="" width={26} height={26} />
          <span>Relay</span>
        </Link>

        <nav className="dash-topbar-nav" aria-label="Workspace">
          {navItems.map((item) => {
            const active = section === item.section
            const className = `dash-topbar-link ${active ? 'dash-topbar-link--active' : ''}`

            if (item.section === 'reports') {
              return (
                <button key={item.section} type="button" className={className} onClick={goToReports}>
                  {item.label}
                </button>
              )
            }

            if (item.section === 'overview') {
              return (
                <button
                  key={item.section}
                  type="button"
                  className={className}
                  onClick={() => goToSection('/dashboard')}
                >
                  {item.label}
                </button>
              )
            }

            return (
              <button
                key={item.section}
                type="button"
                className={className}
                onClick={() => goToSection(item.href)}
              >
                {item.label}
              </button>
            )
          })}
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
              <DashTooltip
                side="bottom"
                title="Close search"
                hint="Exit search and return to the top bar actions."
              >
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
              </DashTooltip>
            </form>
          ) : (
            <>
              <DashTooltip
                side="bottom"
                title="Search"
                hint="Find providers by name, category, or keyword across the directory."
              >
                <button type="button" className="dash-icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M13.5 13.5 17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </DashTooltip>
              <DashTooltip
                side="bottom"
                title="Notifications"
                hint="See updates on intro requests, replies, and workspace activity."
              >
                <Link href="/dashboard/intros" className="dash-icon-btn" aria-label="Notifications">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M10 3a5 5 0 0 1 5 5v2.8l1.7 2.8H3.3L5 10.8V8a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8.5 15.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
              </DashTooltip>
              <DashTooltip
                side="bottom"
                title="Inbox"
                hint="Open your intro request inbox to track and follow up."
              >
                <Link href="/dashboard/intros" className="dash-icon-btn" aria-label="Inbox">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="2.5" y="5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2.5 7.5 10 12.5l7.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </Link>
              </DashTooltip>
            </>
          )}

          <div className="dash-profile" ref={profileRef}>
            <DashTooltip
              side="bottom"
              title="Account"
              hint="Manage your profile, billing plan, and sign out."
            >
              <button
                type="button"
                className="dash-profile-btn"
                aria-label="Account"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((o) => !o)}
              >
                <span className="dash-profile-avatar">{user.initials}</span>
              </button>
            </DashTooltip>
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

      <aside className="dash-rail" aria-label="Quick actions">
        <div className="dash-rail-stack">
          <DashTooltip
            side="right"
            title="Go back"
            hint="Return to the previous page in your browsing session."
          >
            <button
              type="button"
              className="dash-icon-btn dash-icon-btn--rail dash-icon-btn--back"
              aria-label="Go back"
              onClick={() => router.back()}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M12.5 5 7.5 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </DashTooltip>

          {quickActions.map((action) => {
            const target = actionTargetSection(action)
            const isActive = section === target
            const className = `dash-icon-btn dash-icon-btn--rail ${isActive ? 'dash-icon-btn--active' : ''}`

            if (action.reportsHash) {
              return (
                <DashTooltip key={action.id} side="right" title={action.label} hint={action.hint}>
                  <button
                    type="button"
                    className={className}
                    aria-label={action.label}
                    onClick={goToReports}
                  >
                    <ActionIcon name={action.icon} />
                  </button>
                </DashTooltip>
              )
            }

            return (
              <DashTooltip key={action.id} side="right" title={action.label} hint={action.hint}>
                <Link
                  href={action.href}
                  className={className}
                  aria-label={action.label}
                  onClick={() => {
                    clearUrlHash()
                    setHash('')
                  }}
                >
                  <ActionIcon name={action.icon} />
                </Link>
              </DashTooltip>
            )
          })}
        </div>
      </aside>

      <div className="dash-main">
        <div className="dash-page-head">
          <h1 className="dash-page-title">{pageTitle}</h1>
        </div>
      </div>
      </div>
    </div>
  )
}
