/* eslint-disable @typescript-eslint/no-explicit-any */
import { appApi, type Bootstrap } from '@/lib/api/app'
import { ApiError } from '@/lib/api/simulate'
import { hydrateRelay } from './relay-data'

type Listener = () => void

/**
 * The signed-in workspace as the design components see it (`this.props.app`).
 * Holds the bootstrap payload, talks to /api/app, and reaches back into the
 * Dashboard shell for its toasts, upgrade modal and navigation.
 */
export class AppBridge {
  data: Bootstrap
  locale: string
  private dash: any = null
  private listeners = new Set<Listener>()
  private timers = new Map<string, ReturnType<typeof setTimeout>>()

  constructor(data: Bootstrap, locale: string) {
    this.data = data
    this.locale = locale
    hydrateRelay(data.catalog)
  }

  /* ---------- state ---------- */

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }

  set(patch: Partial<Bootstrap>) {
    Object.assign(this.data, patch)
    if (patch.catalog) hydrateRelay(patch.catalog)
    this.listeners.forEach((f) => f())
  }

  async refresh() {
    try {
      this.set(await appApi.bootstrap())
    } catch {
      // keep what we have; the next action will surface the error
    }
  }

  get pro() {
    return this.data.plan === 'Pro'
  }

  get isAdmin() {
    return this.data.workspace.role === 'admin'
  }

  /** Debounce per key (typing in notes, toggling a matrix). */
  later(key: string, ms: number, fn: () => void) {
    clearTimeout(this.timers.get(key))
    this.timers.set(key, setTimeout(() => (this.timers.delete(key), fn()), ms))
  }

  /* ---------- shell ---------- */

  private queued: Array<[string, 'success' | 'info' | 'error', string | undefined]> = []

  attach(dash: any) {
    this.dash = dash
    const q = this.queued.splice(0)
    if (q.length) setTimeout(() => q.forEach((t) => this.toast(...t)), 300)
  }

  detach(dash: any) {
    if (this.dash === dash) this.dash = null
  }

  toast(title: string, type: 'success' | 'info' | 'error' = 'success', desc?: string) {
    if (this.dash?.flash) this.dash.flash(title, type, desc)
    else this.queued.push([title, type, desc])
  }

  upgrade(message?: string) {
    if (message) this.toast(message, 'info')
    this.dash?.setState?.({ modal: { type: 'upgrade' } })
  }

  /** 402 = plan limit → upgrade modal; anything else → error toast. */
  fail(err: unknown, fallback = 'Something went wrong. Try again.') {
    if (err instanceof ApiError && err.status === 402) return this.upgrade(err.message)
    this.toast(err instanceof Error && err.message ? err.message : fallback, 'error')
  }

  /** The shell's confirm dialog: { title, body, ok, item, kind, meta, run }. */
  dashAsk(c: Record<string, unknown>) {
    this.dash?.ask?.(c)
  }

  navigate(page: string, params: Record<string, unknown> = {}) {
    this.dash?.go?.(page, params)
  }

  /** Links stored server-side (`/dashboard/requests`, `https://…`). */
  open(href?: string | null) {
    if (!href) return false
    if (/^https?:\/\//.test(href) || href.startsWith('mailto:')) {
      window.open(href, '_blank', 'noopener')
      return true
    }
    const m = href.match(/\/dashboard\/?([^/?#]*)(?:\/([^?#]+))?(?:\?([^#]*))?/)
    if (!m) return false
    const params: Record<string, unknown> = Object.fromEntries(new URLSearchParams(m[3] ?? ''))
    if (m[1] === 'provider' && m[2]) params.id = m[2]
    this.navigate(m[1] || 'overview', params)
    return true
  }

  /* ---------- plan limits (checked before the design's success flow runs) ---------- */

  left(kind: 'intros' | 'compares') {
    const bar = this.data.usage[kind]
    return bar.limit == null ? null : Math.max(0, bar.limit - bar.used)
  }

  blockIntro(n: number) {
    const left = this.left('intros')
    if (left == null || n <= left) return false
    this.upgrade(
      left
        ? `You have ${left} intro request${left === 1 ? '' : 's'} left this month on the Free plan.`
        : 'You’ve used all your intro requests this month. Upgrade to Pro for unlimited requests.'
    )
    return true
  }

  blockShortlist() {
    const limit = this.data.limits.shortlists
    if (limit == null || this.data.shortlists.length < limit) return false
    this.upgrade(limit === 1 ? 'The Free plan includes 1 Shortlist. Upgrade to Pro for unlimited Shortlists.' : `The Free plan includes ${limit} Shortlists.`)
    return true
  }

  blockSavedCompare() {
    if (this.data.limits.savedComparisons) return false
    this.upgrade('Saved comparisons are part of Relay Pro.')
    return true
  }

  /* ---------- billing ---------- */

  async checkout(interval: 'monthly' | 'yearly' = 'yearly') {
    if (!this.isAdmin) return this.toast('Only workspace admins can change the plan.', 'info')
    try {
      const { authorizationUrl } = await appApi.checkout(interval)
      window.location.assign(authorizationUrl)
    } catch (err) {
      this.fail(err, 'Could not start checkout.')
    }
  }

  async cancelPlan() {
    try {
      const billing = await appApi.cancel()
      this.set({ billing })
      const end = billing.currentPeriodEnd ? new Date(billing.currentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null
      this.toast('Pro cancelled', 'success', end ? `You keep Pro until ${end}.` : undefined)
    } catch (err) {
      this.fail(err, 'Could not cancel the plan.')
    }
  }

  async manageCard() {
    try {
      const { url } = await appApi.manageCard()
      window.open(url, '_blank', 'noopener')
    } catch (err) {
      this.fail(err, 'Could not open card settings.')
    }
  }
}

/** Neutral initials avatar for people without a photo, drawn locally. */
export function initialsAvatar(name: string) {
  const ini =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join('') || '?'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#2a2b2e"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-size="24" font-weight="500" fill="#d4d6da">${ini}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
