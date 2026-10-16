'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import RelayDashboard from '@/components/relay/RelayDashboard'
import { useSession } from '@/hooks/useSession'
import { clearInvite, getMe, logout, pendingInvite, restoreSession } from '@/lib/api/auth'
import { appApi } from '@/lib/api/app'
import { AppBridge } from '@/lib/dc/app-bridge'
import { routeFromUrl, urlFromRoute } from '@/lib/dc/dashboard-route'
import { RELAY, resetRelay } from '@/lib/dc/relay-data'
import { getReportEntries, getReportEntry } from '@/lib/reports'

/** Intelligence › Reports rows, in the design's tuple shape: [type, kind, title, scope, meta, points, slug]. */
const REAL_REPORTS = getReportEntries('app').map((e) => [
  e.type,
  e.kind,
  e.cardTitle,
  e.scope,
  `${e.report.readMinutes} min read · ${e.date}${e.visibility === 'private' ? ' · Private' : ''}`,
  (e.report.keyTakeaways ?? e.report.implications).slice(0, 3),
  e.slug,
])

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

/** Paystack sends the buyer back to /dashboard/settings?section=billing&verify=1&reference=… */
function takePaymentReference() {
  const url = new URL(window.location.href)
  const reference = url.searchParams.get('reference') || url.searchParams.get('trxref')
  if (!url.searchParams.has('verify') && !reference) return null
  for (const k of ['verify', 'reference', 'trxref']) url.searchParams.delete(k)
  window.history.replaceState(null, '', url.pathname + url.search)
  return reference
}

/** Everything the signed-in workspace needs before the shell renders. */
async function loadWorkspace(locale: string) {
  const invite = pendingInvite()
  const notes: Array<[string, 'success' | 'info' | 'error', string?]> = []
  if (invite) {
    await appApi
      .acceptInvite(invite)
      .then(() => notes.push(['You joined the workspace', 'success']))
      .catch((e) => notes.push([e instanceof Error ? e.message : 'This invite could not be used.', 'error']))
    clearInvite()
  }
  const reference = takePaymentReference()
  if (reference) {
    await appApi
      .verifyCheckout(reference)
      .then(() => notes.push(['Welcome to Relay Pro', 'success', 'The full directory is now unlocked.']))
      .catch((e) => notes.push([e instanceof Error ? e.message : 'We could not confirm the payment.', 'error']))
  }
  const app = new AppBridge(await appApi.bootstrap(), locale)
  notes.forEach(([t, type, desc]) => app.toast(t, type, desc))
  return app
}

/**
 * The signed-in product. Wraps the ported dashboard shell with the real
 * session (gate, user), URL routing and the workspace API (lib/dc/app-bridge).
 */
export default function DashboardApp() {
  const { locale } = useParams<{ locale: string }>()
  // usePathname/useSearchParams follow history.pushState (useParams does not).
  const pathname = usePathname()
  const search = useSearchParams()
  const { user, ready, refresh } = useSession()
  const [checked, setChecked] = useState(false)
  const [app, setApp] = useState<AppBridge | null>(null)
  const [failed, setFailed] = useState(false)
  const [, setVersion] = useState(0)

  useEffect(() => {
    if (!ready) return
    if (!user) {
      restoreSession().then((restored) => {
        if (restored) refresh()
        else window.location.replace(`/${locale}/signin`)
      })
      return
    }
    setChecked(true)
    getMe()
      .then(() => refresh())
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user?.id])

  const load = useCallback(() => {
    setFailed(false)
    loadWorkspace(locale)
      .then(setApp)
      .catch(() => setFailed(true))
  }, [locale])

  useEffect(() => {
    if (checked) load()
  }, [checked, load])

  useEffect(() => {
    if (!app) return
    const off = app.subscribe(() => setVersion((n) => n + 1))
    return () => {
      off()
      resetRelay()
    }
  }, [app])

  const route = useMemo(() => {
    const slug = pathname.split('/').filter(Boolean).slice(2) // drop locale + "dashboard"
    return routeFromUrl(slug, new URLSearchParams(search.toString()))
  }, [pathname, search])

  // Browser tab title follows the screen, e.g. "Directory | Relay".
  useEffect(() => {
    const name =
      route.page === 'provider'
        ? (RELAY.byId as Record<string, { name: string }>)[String(route.params.id)]?.name ?? 'Provider'
        : route.page === 'report'
          ? getReportEntry(String(route.params.slug), 'app')?.cardTitle ?? 'Report'
          : PAGE_TITLES[route.page] ?? 'Overview'
    document.title = `${name} | Relay`
  }, [route, app])

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

  const onUpgrade = useCallback(() => app?.checkout('yearly'), [app])

  if (failed)
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#0f1011',
          color: '#8a8f98',
          font: '14px Geist,system-ui,sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#f7f8f8', fontSize: '15px', marginBottom: '6px' }}>Relay couldn’t load your workspace.</div>
          <span onClick={load} style={{ color: '#6fe3b4', cursor: 'pointer' }}>
            Try again
          </span>
        </div>
      </div>
    )

  if (!checked || !user || !app) return null

  const shellUser = {
    name: app.data.user.name || user.fullName || user.email,
    firstName: app.data.user.firstName || user.firstName || '',
    email: user.email,
    initials: app.data.user.initials || user.initials,
    avatarUrl: app.data.user.avatarUrl ?? user.avatarUrl ?? null,
    company: user.company,
  }

  return (
    <RelayDashboard
      route={route}
      initialRoute={route}
      onRoute={onRoute}
      plan={app.data.plan}
      user={shellUser}
      onLogout={onLogout}
      onUpgradePlan={onUpgrade}
      realReports={REAL_REPORTS}
      app={app}
    />
  )
}
