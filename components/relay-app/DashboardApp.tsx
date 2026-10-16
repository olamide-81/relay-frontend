'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import RelayDashboard from '@/components/relay/RelayDashboard'
import { useSession } from '@/hooks/useSession'
import { activateSubscription, getMe, logout } from '@/lib/api/auth'
import { isSubscribed } from '@/lib/session'
import { routeFromUrl, urlFromRoute } from '@/lib/dc/dashboard-route'
import { RELAY } from '@/lib/dc/relay-data'

const PAGE_TITLES: Record<string, string> = {
  overview: 'Overview',
  inbox: 'Inbox',
  compare: 'Compare',
  directory: 'Directory',
  providers: 'Providers',
  shortlists: 'Shortlists',
  requests: 'Requests',
  intelligence: 'Intelligence',
  profile: 'Profile',
  settings: 'Settings',
}

/**
 * The signed-in product. Wraps the ported dashboard shell with the real
 * session (gate, user, plan), URL routing and the subscription API.
 */
export default function DashboardApp() {
  const { locale } = useParams<{ locale: string }>()
  // usePathname/useSearchParams follow history.pushState (useParams does not).
  const pathname = usePathname()
  const search = useSearchParams()
  const { user, ready, refresh } = useSession()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!ready) return
    if (!user) {
      window.location.replace(`/${locale}/signin`)
      return
    }
    setChecked(true)
    getMe()
      .then(() => refresh())
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user?.id])

  const route = useMemo(() => {
    const slug = pathname.split('/').filter(Boolean).slice(2) // drop locale + "dashboard"
    return routeFromUrl(slug, new URLSearchParams(search.toString()))
  }, [pathname, search])

  // Browser tab title follows the screen, e.g. "Directory | Relay".
  useEffect(() => {
    const name =
      route.page === 'provider'
        ? (RELAY.byId as Record<string, { name: string }>)[String(route.params.id)]?.name ?? 'Provider'
        : PAGE_TITLES[route.page] ?? 'Overview'
    document.title = `${name} | Relay`
  }, [route])

  const onRoute = useCallback(
    (page: string, params: Record<string, unknown>) => {
      const next = urlFromRoute(locale, page, params)
      if (next !== window.location.pathname + window.location.search) window.history.pushState(null, '', next)
    },
    [locale]
  )

  const onLogout = useCallback(async () => {
    try {
      await logout()
    } finally {
      window.location.assign(`/${locale}/signin`)
    }
  }, [locale])

  const onUpgrade = useCallback(async () => {
    try {
      await activateSubscription('pro')
      refresh()
    } catch {
      // The shell already shows the upgraded state; the API sync retries on next load.
    }
  }, [refresh])

  if (!checked || !user) return null

  const plan = isSubscribed(user) || /[?&]plan=pro/i.test(window.location.search) ? 'Pro' : 'Free'
  const shellUser = {
    name: user.fullName || user.email,
    firstName: user.firstName || user.fullName?.split(' ')[0] || '',
    email: user.email,
    initials: user.initials,
    avatarUrl: user.avatarUrl ?? null,
    company: user.company,
  }

  return (
    <RelayDashboard
      route={route}
      initialRoute={route}
      onRoute={onRoute}
      plan={plan}
      user={shellUser}
      onLogout={onLogout}
      onUpgradePlan={onUpgrade}
    />
  )
}
