/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Connects the design components to the signed-in workspace (`props.app`, an
 * AppBridge). Applied from scripts/dc-port/patches.mjs as
 * `Component = wireX(Component)`; without `app` (the website's product shots)
 * every component keeps the design's demo behaviour.
 *
 * Pattern: seed the design's own state from the API once, then diff that state
 * after each update and send the changes to the API. Server replies are
 * written back with `quiet()` so they don't echo.
 */
import { appApi, type MemberRow, type PipelineRow, type SourcingRow } from '@/lib/api/app'
import { forgotPassword } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/simulate'
import { PRICE } from '@/lib/site-content'
import { dcNavigate } from './runtime'
import { RELAY as RELAY_DATA } from './relay-data'
import { initialsAvatar, type AppBridge } from './app-bridge'

const RELAY: any = RELAY_DATA

type Hooks = {
  seed?: (this: any, app: AppBridge) => void
  mount?: (this: any, app: AppBridge) => void
  unmount?: (this: any, app: AppBridge) => void
  watch?: string[]
  sync?: (this: any, app: AppBridge, prev: Record<string, any>, next: Record<string, any>) => void
}

const pick = (state: Record<string, any>, keys: string[] = []) => Object.fromEntries(keys.map((k) => [k, state[k]]))

export function wire(Base: any, h: Hooks) {
  return class Wired extends Base {
    __snap: Record<string, any>
    constructor(props: any) {
      super(props)
      if (props?.app) h.seed?.call(this, props.app)
      this.__snap = pick(this.state, h.watch)
    }
    componentDidMount() {
      super.componentDidMount?.()
      if (this.props.app) h.mount?.call(this, this.props.app)
    }
    componentWillUnmount() {
      super.componentWillUnmount?.()
      if (this.props.app) h.unmount?.call(this, this.props.app)
    }
    componentDidUpdate(prevProps: any) {
      super.componentDidUpdate?.(prevProps)
      const app = this.props.app
      if (!app || !h.watch || !h.sync) return
      const prev = this.__snap
      const next = pick(this.state, h.watch)
      if (!h.watch.some((k) => prev[k] !== next[k])) return
      this.__snap = next
      h.sync.call(this, app, prev, next)
    }
    /** setState for server results, without treating them as user edits. */
    quiet(patch: any) {
      this.setState(patch)
      this.__snap = pick(this.state, h.watch)
    }
  }
}

const isServerId = (id: unknown) => typeof id === 'string' && /^[a-f0-9]{24}$/.test(id)
const isLimit = (e: unknown) => e instanceof ApiError && e.status === 402
const fmtN = (n: number) => n.toLocaleString('en-US')
const kindLabel = (k: string) => RELAY.CAT[k]?.label ?? (k === 'all' ? 'Relay' : k)

/** Diff two id-keyed lists. */
function diff<T extends { id: string }>(prev: T[], next: T[]) {
  const pm = new Map(prev.map((x) => [x.id, x]))
  const nm = new Map(next.map((x) => [x.id, x]))
  return {
    added: next.filter((x) => !pm.has(x.id)),
    changed: next.filter((x) => pm.has(x.id) && pm.get(x.id) !== x),
    removed: prev.filter((x) => !nm.has(x.id)),
  }
}

/* ======================= Dashboard shell ======================= */

function defaultFavs(app: AppBridge) {
  const d = app.data
  const favs: any[] = []
  const c = d.compares[0]
  if (c) favs.push({ id: 'f1', label: c.name, kind: 'corridor', page: 'compare', params: { ids: c.ids, savedId: c.id } })
  const l = d.shortlists[0]
  if (l) favs.push({ id: 'f2', label: l.name, kind: 'shortlist', page: 'shortlists', params: { initial: l.id } })
  favs.push(
    { id: 'f3', label: 'FX benchmarks', kind: 'benchmark', page: 'intelligence', params: { tab: 'benchmarks' } },
    { id: 'f4', label: 'Licence watch', kind: 'watch', page: 'intelligence', params: { tab: 'licences' } }
  )
  return favs
}

function saveFavs(this: any, app: AppBridge) {
  app.data.favorites = this.state.favs
  app.later('favs', 400, () => appApi.setFavorites(this.state.favs).catch((e) => app.fail(e)))
}

function syncLists(this: any, app: AppBridge, prev: any[], next: any[]) {
  app.data.shortlists = next
  const { added, changed, removed } = diff(prev, next)
  for (const l of added) {
    if (isServerId(l.id)) continue
    appApi
      .createShortlist({ name: l.name, ids: l.ids, note: l.note, kind: l.kind })
      .then((row) => {
        const cur = this.state.lists.find((x: any) => x.id === l.id)
        this.quiet((s: any) => ({
          lists: s.lists.map((x: any) => (x.id === l.id ? { ...x, id: row.id } : x)),
          focusList: s.focusList === l.id ? row.id : s.focusList,
          favs: s.favs.map((f: any) => (f.params?.initial === l.id ? { ...f, params: { ...f.params, initial: row.id } } : f)),
        }))
        app.data.shortlists = this.state.lists
        if (this.state.favs.some((f: any) => f.params?.initial === row.id)) saveFavs.call(this, app)
        if (cur && (cur.name !== row.name || cur.note !== row.note || cur.ids.join() !== row.ids.join()))
          appApi.updateShortlist(row.id, { name: cur.name, note: cur.note, ids: cur.ids }).catch((e) => app.fail(e))
      })
      .catch((e) => {
        this.quiet((s: any) => ({ lists: s.lists.filter((x: any) => x.id !== l.id), focusList: null }))
        app.data.shortlists = this.state.lists
        app.fail(e, 'Could not create the shortlist.')
      })
  }
  for (const l of changed) {
    if (!isServerId(l.id)) continue
    app.later('list:' + l.id, 500, () => {
      const cur = this.state.lists.find((x: any) => x.id === l.id)
      if (cur) appApi.updateShortlist(cur.id, { name: cur.name, note: cur.note, ids: cur.ids, kind: cur.kind } as any).catch((e) => app.fail(e))
    })
  }
  for (const l of removed) if (isServerId(l.id)) appApi.deleteShortlist(l.id).catch((e) => app.fail(e))
}

function syncCompares(this: any, app: AppBridge, prev: any[], next: any[]) {
  app.data.compares = next
  const { added, changed, removed } = diff(prev, next)
  for (const c of added) {
    if (isServerId(c.id)) continue
    appApi
      .saveCompare({ name: c.name, ids: c.ids })
      .then((row) => {
        this.quiet((s: any) => ({
          compares: s.compares.map((x: any) => (x.id === c.id ? { ...x, id: row.id, kind: row.kind } : x)),
          params: s.params?.savedId === c.id ? { ...s.params, savedId: row.id } : s.params,
          favs: s.favs.map((f: any) => (f.params?.savedId === c.id ? { ...f, params: { ...f.params, savedId: row.id } } : f)),
        }))
        app.data.compares = this.state.compares
        if (this.state.favs.some((f: any) => f.params?.savedId === row.id)) saveFavs.call(this, app)
      })
      .catch((e) => {
        this.quiet((s: any) => ({ compares: s.compares.filter((x: any) => x.id !== c.id) }))
        app.data.compares = this.state.compares
        app.fail(e, 'Could not save the comparison.')
      })
  }
  for (const c of changed) {
    if (isServerId(c.id)) appApi.updateCompare(c.id, { name: c.name, ids: c.ids }).catch((e) => app.fail(e))
  }
  for (const c of removed) if (isServerId(c.id)) appApi.deleteCompare(c.id).catch((e) => app.fail(e))
}

export function wireDashboard(C: any) {
  return wire(C, {
    seed(app) {
      const d = app.data
      const n = Math.max(10, ...d.favorites.map((f) => Number(String(f.id).replace(/\D/g, '')) + 1).filter(Number.isFinite))
      this.state = { ...this.state, favs: d.favorites, lists: d.shortlists, compares: d.compares, plan: d.plan, n }
    },
    mount(app) {
      app.attach(this)
    },
    unmount(app) {
      app.detach(this)
    },
    watch: ['favs', 'lists', 'compares'],
    sync(app, prev, next) {
      if (prev.favs !== next.favs) saveFavs.call(this, app)
      if (prev.lists !== next.lists) syncLists.call(this, app, prev.lists, next.lists)
      if (prev.compares !== next.compares) syncCompares.call(this, app, prev.compares, next.compares)
    },
  })
}

export function dashboardVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  return {
    app,
    appInboxUnread: app.data.inbox.filter((m) => m.unread).length,
    confirmUpgrade: () => {
      this.setState({ modal: null })
      app.checkout('yearly')
    },
    openUpgrade: () => (app.pro ? this.go('settings', { section: 'billing' }) : this.setState({ modal: { type: 'upgrade' } })),
    restoreFavs: () => this.setState({ favs: defaultFavs(app) }),
    createList: () => app.blockShortlist() || v.createList(),
    saveList: (l: any) => (!l.id && app.blockShortlist()) || v.saveList(l),
    saveCompare: (c: any) => (!this.state.compares.some((x: any) => x.id === c.id) && app.blockSavedCompare()) || v.saveCompare(c),
  }
}

/* ======================= Topbar (bell) ======================= */

export function wireTopbar(C: any) {
  return wire(C, {
    seed(app) {
      const notes = app.data.notifications
      this.state = {
        ...this.state,
        readIds: Object.fromEntries(notes.filter((n) => !n.unread).map((n) => [n.id, true])),
        unread: notes.some((n) => n.unread),
      }
    },
    watch: ['readIds'],
    sync(app, prev, next) {
      const fresh = Object.keys(next.readIds).filter((id) => next.readIds[id] && !prev.readIds[id])
      if (!fresh.length) return
      const notes = app.data.notifications
      notes.forEach((n) => fresh.includes(n.id) && (n.unread = false))
      const all = fresh.length > 1 && notes.every((n) => !n.unread)
      const ids = all ? ['all'] : fresh
      ids.forEach((id) => appApi.readNotifications(id).catch(() => {}))
    },
  })
}

const SEARCH_PAGES: Array<[string, string, string]> = [
  ['overview', 'Overview', 'all'],
  ['directory', 'Directory', 'globe'],
  ['providers', 'Providers', 'wallet'],
  ['shortlists', 'Shortlists', 'all'],
  ['compare', 'Compare', 'chart'],
  ['requests', 'Requests', 'api'],
  ['inbox', 'Inbox', 'all'],
  ['intelligence', 'Intelligence', 'chart'],
  ['profile', 'Profile', 'all'],
  ['settings', 'Settings', 'all'],
]

/** Top bar search: matching Providers and dashboard pages; Enter opens the highlighted one or the Directory. */
export function searchVals(this: any) {
  const S = this.state
  const q = String(S.query ?? '').trim().toLowerCase()
  const nav = (page: string, params?: any) => {
    this.setState({ query: '', hi: 0 })
    this.searchRef.current?.blur()
    this.props.onNavigate?.(page, params)
  }
  const toDirectory = () => nav('directory', { q: S.query.trim(), t: Date.now() })
  if (!q) return { appSearchOpen: false, appResults: [], appSearchKey: () => {} }

  const rank = (s: string) => (s.startsWith(q) ? 0 : s.split(/\s+/).some((w) => w.startsWith(q)) ? 1 : s.includes(q) ? 2 : 9)
  const providers = (RELAY.providers as any[])
    .map((p) => ({ p, r: Math.min(rank(p.name.toLowerCase()), rank(`${p.cat} ${p.hq} ${p.region}`.toLowerCase()) + 3) }))
    .filter((x) => x.r < 9)
    .sort((a, b) => a.r - b.r || b.p.score - a.p.score)
    .slice(0, 6)
    .map(({ p }) => ({ label: p.name, meta: `${p.cat} · ${p.hq}`, kind: p.kind, go: () => nav('provider', { id: p.id, from: 'directory' }) }))
  const pages = SEARCH_PAGES.filter(([, label]) => label.toLowerCase().includes(q)).map(([key, label, kind]) => ({
    label,
    meta: 'Page',
    kind,
    go: () => nav(key),
  }))
  const all = { label: `Search the directory for “${S.query.trim()}”`, meta: 'Enter', kind: 'globe', go: toDirectory }
  const items = [...providers, ...pages, all]
  const hi = Math.min(S.hi ?? 0, items.length - 1)
  const row = (it: any, i: number) => ({
    ...it,
    item: true,
    run: (e: any) => {
      e?.preventDefault?.()
      it.go()
    },
    hover: () => i !== hi && this.setState({ hi: i }),
    bg: i === hi ? '#2a2b2e' : 'transparent',
    fg: i === hi ? '#f7f8f8' : '#d4d6da',
  })
  const results: any[] = []
  providers.forEach((it, i) => {
    if (i === 0) results.push({ head: true, label: 'Providers' })
    results.push(row(it, i))
  })
  pages.forEach((it, i) => {
    if (i === 0) results.push({ head: true, label: 'Pages' })
    results.push(row(it, providers.length + i))
  })
  if (results.length) results.push({ head: true, label: '' })
  results.push(row(all, items.length - 1))
  return {
    appSearchOpen: Boolean(S.focus) || (typeof document !== 'undefined' && document.activeElement === this.searchRef.current),
    appResults: results,
    appSearchKey: (e: any) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const step = e.key === 'ArrowDown' ? 1 : -1
        this.setState({ hi: (hi + step + items.length) % items.length })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        items[hi].go()
      }
    },
    onQuery: (e: any) => this.setState({ query: e.target.value, hi: 0 }),
  }
}

export function topbarVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  const notes = app.data.notifications
  return {
    noteGroups: v.noteGroups.map((g: any) => ({
      ...g,
      items: g.items.map((n: any) => ({
        ...n,
        appAction: (e: any) => {
          e?.stopPropagation?.()
          n.read()
          this.setState({ menu: null })
          const row = notes.find((x) => x.id === n.id)
          if (!app.open(row?.href)) this.props.onNavigate?.(n.type === 'requests' ? 'requests' : 'inbox')
        },
        appDismiss: (e: any) => {
          e?.stopPropagation?.()
          n.read()
        },
      })),
    })),
    dotsItems: v.dotsItems.map((d: any) =>
      d.label === 'Open in new tab'
        ? {
            ...d,
            run: () => {
              this.setState({ menu: null })
              window.open(window.location.href, '_blank', 'noopener')
            },
          }
        : d
    ),
  }
}

/* ======================= Inbox ======================= */

export function wireInbox(C: any) {
  return wire(C, {
    seed(app) {
      const msgs = app.data.inbox
      this.state = {
        ...this.state,
        sel: msgs[0]?.id ?? null,
        unread: Object.fromEntries(msgs.map((m) => [m.id, m.unread])),
      }
    },
    watch: ['unread'],
    sync(app, prev, next) {
      const ids = Object.keys(next.unread).filter((id) => next.unread[id] !== prev.unread[id])
      if (!ids.length) return
      const msgs = app.data.inbox
      msgs.forEach((m) => ids.includes(m.id) && (m.unread = !!next.unread[m.id]))
      if (ids.length > 1 && msgs.every((m) => !m.unread)) appApi.readInbox('all').catch(() => {})
      else ids.forEach((id) => appApi.readInbox(id, !!next.unread[id]).catch(() => {}))
      app.set({})
    },
  })
}

export function inboxVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  const m = app.data.inbox.find((x) => x.id === this.state.sel)
  const viewProvider = () => {
    const pid = m?.pid ?? RELAY.providers.find((x: any) => x.name === m?.from)?.id
    if (pid) this.props.onOpenProvider?.(pid, 'inbox')
    return !!pid
  }
  return {
    appViewProvider: viewProvider,
    appPrimary: () => {
      if (!m || app.open(m.primaryHref)) return
      if (/directory/i.test(m.primary)) return this.props.onNavigate?.('directory')
      if (/request|intro/i.test(m.primary) && m.pid) return this.props.onNavigate?.('requests', { provider: m.pid })
      if (!viewProvider()) this.props.onNavigate?.('requests')
    },
  }
}

/* ======================= Requests ======================= */

export function wireRequests(C: any) {
  return wire(C, {
    seed(app) {
      this.state = { ...this.state, rows: app.data.requests.map((r) => ({ ...r })) }
      this.__codes = new Set(app.data.requests.map((r) => r.code))
    },
    // Requests created elsewhere (Sourcing intros) show up here without a reload.
    mount(app) {
      this.__unsub = app.subscribe(() => {
        const known: Set<string> = this.__codes
        const added = app.data.requests.filter((r) => !known.has(r.code) && !this.state.rows.some((x: any) => x.code === r.code))
        if (!added.length) return
        added.forEach((r) => known.add(r.code))
        this.quiet((s: any) => ({ rows: [...added.map((r) => ({ ...r })), ...s.rows] }))
      })
    },
    unmount() {
      this.__unsub?.()
    },
    watch: ['rows'],
    sync(app, prev, next) {
      const known: Set<string> = this.__codes
      const before = new Map(prev.rows.map((r: any) => [r.code, r]))
      const fresh = next.rows.filter((r: any) => !before.has(r.code) && !known.has(r.code))
      if (fresh.length) {
        const first = fresh[0]
        const type = String(first.subject).split(' — ')[0]
        const topic = String(first.subject).split(' — ').slice(1).join(' — ')
        const temp = new Set(fresh.map((r: any) => r.code))
        appApi
          .createRequests({
            pids: fresh.map((r: any) => r.pid),
            type,
            subject: fresh.length === 1 ? first.subject : undefined,
            volume: first.volume,
            timeline: first.timeline,
            message: first.msg,
          })
          .then(({ requests, usage }) => {
            requests.forEach((r) => known.add(r.code))
            const byPid = new Map(requests.map((r) => [r.pid, r]))
            this.quiet((s: any) => ({
              rows: s.rows.map((r: any) => (temp.has(r.code) && byPid.has(r.pid) ? { ...byPid.get(r.pid)!, subject: fresh.length > 1 && topic ? `${type} — ${topic}` : byPid.get(r.pid)!.subject } : r)),
            }))
            app.data.requests = this.state.rows
            app.data.usage = usage
            app.refresh()
          })
          .catch((e) => {
            this.quiet((s: any) => ({ rows: s.rows.filter((r: any) => !temp.has(r.code)) }))
            app.fail(e, 'Could not send the request.')
          })
      }
      for (const r of next.rows) {
        const was: any = before.get(r.code)
        if (was && known.has(r.code) && was.status !== 'closed' && r.status === 'closed') {
          appApi
            .closeRequest(r.code)
            .then(() => (app.data.requests = this.state.rows))
            .catch((e) => {
              this.quiet((s: any) => ({ rows: s.rows.map((x: any) => (x.code === r.code ? was : x)) }))
              app.fail(e)
            })
        }
      }
    },
  })
}

export function requestsVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  const rows = new Map(this.state.rows.map((r: any) => [r.code, r]))
  return {
    rows: v.rows.map((x: any) => {
      const r: any = rows.get(x.code)
      return {
        ...x,
        reply: r?.reply?.text ?? x.reply,
        hasReply: !!r?.reply?.text,
        follow: () => {
          if (!this.__codes?.has(x.code)) return
          appApi
            .followUp(x.code)
            .then(() => this.props.onToast?.('Follow-up sent', 'success', (x.provider ?? 'The Provider') + ' will be nudged by email.'))
            .catch((e) => app.fail(e))
        },
      }
    }),
    next: () => {
      if (this.state.step === 3 && app.blockIntro(this.state.picks.length)) return
      v.next()
    },
  }
}

/* ======================= Sourcing ======================= */

/** Status labels and dots, as in the Relay Sourcing design. */
export const SOURCING_STATUS: Record<string, [string, string]> = {
  submitted: ['Submitted', '#8fb8ff'],
  sourcing: ['Sourcing', '#f2c14e'],
  ready: ['Options ready', '#6fe3b4'],
  intro: ['Intros requested', '#d4d6da'],
  closed: ['Closed', '#3a3c40'],
}

const setSourcing = (app: AppBridge, rows: SourcingRow[]) => app.set({ sourcing: rows })

export function wireSourcing(C: any) {
  return wire(C, {
    seed(app) {
      const rows = (app.data.sourcing ?? []).map((r) => ({ ...r }))
      this.state = { ...this.state, rows, open: rows.find((r) => r.status === 'ready')?.code ?? null }
      this.__codes = new Set(rows.map((r) => r.code))
    },
    watch: ['rows'],
    sync(app, prev, next) {
      const known: Set<string> = this.__codes
      const before = new Map<string, any>(prev.rows.map((r: any) => [r.code, r]))
      const swap = (code: string, row: any) => {
        this.quiet((s: any) => ({ rows: s.rows.map((x: any) => (x.code === code ? row : x)), open: s.open === code ? row.code : s.open }))
        setSourcing(app, this.state.rows)
      }
      const revert = (code: string, was: any) => (e: unknown) => {
        this.quiet((s: any) => ({ rows: was ? s.rows.map((x: any) => (x.code === code ? was : x)) : s.rows.filter((x: any) => x.code !== code) }))
        app.fail(e)
      }
      for (const r of next.rows) {
        const was = before.get(r.code)
        if (!was && !known.has(r.code)) {
          // New request (the design numbers it locally; relay-api assigns the real code).
          appApi
            .createSourcing({
              category: r.cat, need: r.cap, title: r.title, markets: r.markets, currencies: r.ccys,
              volume: r.volume, goLive: r.timeline, mustHaves: r.must, notes: r.notes,
            })
            .then((row) => (known.add(row.code), swap(r.code, row)))
            .catch(revert(r.code, null))
          continue
        }
        if (!was || !known.has(r.code) || was.status === r.status) continue
        if (r.status === 'closed') appApi.withdrawSourcing(r.code).then((row) => swap(r.code, row)).catch(revert(r.code, was))
        else if (r.status === 'sourcing' && was.status === 'ready') appApi.noneFitSourcing(r.code).then((row) => swap(r.code, row)).catch(revert(r.code, was))
        else if (r.status === 'intro')
          appApi
            .pickSourcing(r.code, r.picked ?? [])
            .then(({ sourcing, requests, usage }) => {
              swap(r.code, sourcing)
              // The matching Provider intro requests: under To Providers and, once sent, in the Inbox.
              const have = new Set(app.data.requests.map((x) => x.code))
              app.set({ requests: [...requests.filter((x) => !have.has(x.code)), ...app.data.requests], usage })
              app.refresh()
            })
            .catch(revert(r.code, was))
      }
    },
  })
}

export function sourcingVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  const rows = new Map<string, any>(this.state.rows.map((r: any) => [r.code, r]))
  return {
    rows: v.rows.map((x: any) => {
      const r = rows.get(x.code)
      const unseen = r?.unseen ?? (r?.options ?? []).length
      const nSel = (this.state.sel[x.code] ?? []).length
      return {
        ...x,
        hasBadge: x.hasBadge && unseen > 0,
        badge: `${unseen} new`,
        toggle: () => {
          x.toggle()
          if (r?.status === 'ready' && r.unseen && this.__codes?.has(x.code)) {
            this.quiet((s: any) => ({ rows: s.rows.map((y: any) => (y.code === x.code ? { ...y, unseen: 0 } : y)) }))
            setSourcing(app, this.state.rows)
            appApi.seenSourcing(x.code).catch(() => {})
          }
        },
        intro: () => {
          if (nSel && app.blockIntro(nSel)) return
          x.intro()
        },
      }
    }),
  }
}

/** The Overview's Sourcing card: the two latest requests. */
export function sourcingCardRows(app: AppBridge | undefined, go: (params: Record<string, unknown>) => void) {
  const rows: any[] = app
    ? (app.data.sourcing ?? []).slice(0, 2)
    : [
        { code: 'SRC-014', cat: 'bank', title: 'SWIFT correspondent bank for USD and EUR payouts', markets: ['United Kingdom', 'European Union'], status: 'ready', unseen: 3 },
        { code: 'SRC-013', cat: 'kyc', title: 'KYB for UAE registered businesses', markets: ['UAE'], status: 'sourcing' },
      ]
  return rows.map((r, i) => {
    const [label, dot] = SOURCING_STATUS[r.status] ?? SOURCING_STATUS.submitted
    const unseen = r.unseen ?? (r.options ?? []).length
    return {
      kind: r.cat,
      title: r.title,
      code: r.code,
      markets: r.markets.join(', '),
      status: label,
      dot,
      hasBadge: r.status === 'ready' && unseen > 0,
      badge: `${unseen} new`,
      line: i < rows.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
      open: () => go({ view: 'sourcing' }),
    }
  })
}

/* ======================= Providers (pipeline) ======================= */

let pipeCache: { src: PipelineRow[] | null; rows: any[] } = { src: null, rows: [] }

/** The pipeline in the design's ROWS shape. */
export function pipelineRows(app: AppBridge) {
  const src = app.data.pipeline
  if (pipeCache.src !== src) {
    pipeCache = {
      src,
      rows: src.map(([id, name, kind, hq, stage, owner, volume, updated, licence, price, pid, log], i) => ({
        id,
        name,
        kind,
        hq,
        stage,
        owner,
        volume,
        updated,
        licence,
        price,
        pid,
        log: log ?? [],
        code: 'PRV-' + (1040 + i * 7),
      })),
    }
  }
  return pipeCache.rows
}

function personImg(app: AppBridge, name: string) {
  const m = app.data.members.find((x) => x.name === name)
  return m?.img || initialsAvatar(name)
}

export function wireProviders(C: any) {
  return wire(C, {
    watch: ['stages', 'removed'],
    sync(app, prev, next) {
      const save = (p: Promise<PipelineRow[]>) =>
        p.then((rows) => (app.data.pipeline = rows)).catch((e) => {
          app.fail(e)
          app.refresh()
        })
      for (const [id, stage] of Object.entries(next.stages)) {
        if (prev.stages[id] !== stage && !next.removed.includes(id)) save(appApi.updatePipeline(id, { stage: stage as string }))
      }
      for (const id of next.removed) if (!prev.removed.includes(id)) save(appApi.removePipeline(id))
    },
  })
}

export function providersVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  const rows = pipelineRows(app)
  const cur = rows.find((r) => r.id === this.state.open) ?? rows[0]
  return {
    rows: v.rows.map((r: any) => ({ ...r, cat: kindLabel(r.kind), ownerImg: personImg(app, r.owner) })),
    cur: cur
      ? {
          ...v.cur,
          cat: kindLabel(cur.kind),
          ownerImg: personImg(app, cur.owner),
          log: cur.log.length ? cur.log : v.cur.log.slice(0, 1),
        }
      : v.cur,
  }
}

/* ======================= Compare ======================= */

export function wireCompare(C: any) {
  return wire(C, {
    seed(app) {
      const open = app.data.requests.filter((r) => r.status === 'sent' || r.status === 'opened' || r.status === 'replied')
      this.state = { ...this.state, requested: Object.fromEntries(open.map((r) => [r.pid, true])) }
    },
    watch: ['ids'],
    sync(app, prev) {
      app.later('compare', 1500, () => {
        const ids = this.state.ids.filter((id: string) => RELAY.byId[id])
        if (ids.length < 2) return
        appApi
          .trackCompare(ids)
          .then((usage) => (app.data.usage = usage))
          .catch((e) => {
            if (isLimit(e)) this.quiet({ ids: prev.ids })
            app.fail(e)
          })
      })
    },
  })
}

export function compareVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  return {
    suggest: () => {
      const byKind: Record<string, any[]> = {}
      for (const p of RELAY.providers) (byKind[p.kind] ??= []).push(p)
      const best = Object.values(byKind)
        .filter((l) => l.length >= 2)
        .sort((a, b) => b.length - a.length)[0]
      if (!best) return
      const ids = [...best].sort((a, b) => Number(b.score) - Number(a.score)).slice(0, 3).map((p) => p.id)
      this.setState({ ids })
    },
    picked: v.picked.map((p: any) => ({
      ...p,
      request: () => {
        if (this.state.requested[p.id]) return this.props.onNavigate?.('requests')
        if (app.blockIntro(1)) return
        this.props.onNavigate?.('requests', { provider: p.id })
      },
    })),
  }
}

/* ======================= Directory (bookmarks) ======================= */

export function wireDirectory(C: any) {
  return wire(C, {
    seed(app) {
      this.state = { ...this.state, saved: Object.fromEntries(app.data.bookmarks.map((id) => [id, true])) }
    },
    watch: ['saved'],
    sync(app, prev, next) {
      for (const id of new Set([...Object.keys(prev.saved), ...Object.keys(next.saved)])) {
        const on = !!next.saved[id]
        if (on === !!prev.saved[id]) continue
        appApi
          .setBookmark(id, on)
          .then((list) => (app.data.bookmarks = list))
          .catch((e) => {
            this.quiet((s: any) => ({ saved: { ...s.saved, [id]: !on } }))
            app.fail(e)
          })
      }
    },
  })
}

export function directoryVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  return app.pro
    ? {
        shownLabel: String(v.shownLabel).replace(/ · Free plan: limited preview$/, ''),
        upgrade: () => this.props.onNavigate?.('settings', { section: 'billing' }),
      }
    : {}
}

/* ======================= Overview ======================= */

const OVERVIEW_DEMO = {
  appTotal: 'Live',
  appCountries: '—',
  appMore: 'More',
  appVisible: 'Preview',
  appVisiblePct: '2%',
  appListCount: '0',
  appNoLists: true,
  appHasLists: false,
  appLists: [],
}

export function overviewVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return { appFromPrice: PRICE.monthly, ...OVERVIEW_DEMO }
  const d = app.data
  const total = RELAY.TOTAL
  const visible = app.pro ? total : Math.min(total, RELAY.providers.length)
  const countries = d.catalog.countries ?? 0
  const regions = d.catalog.regionsCovered ?? 0
  const added = d.catalog.addedThisMonth ?? 0
  const lists = d.shortlists.map((l: any) => ({
    name: l.name,
    note: l.note || (l.kind && RELAY.CAT[l.kind] ? RELAY.CAT[l.kind].label : ''),
    kind: l.kind && RELAY.CAT[l.kind] ? l.kind : 'all',
    count: `${l.ids.length} Provider${l.ids.length === 1 ? '' : 's'}`,
    open: () => this.props.onNavigate?.('shortlists', { initial: l.id }),
  }))
  const numbers = {
    appTotal: fmtN(total),
    appCountries: fmtN(countries),
    appMore: fmtN(Math.max(0, total - visible)),
    appVisible: fmtN(visible),
    appVisiblePct: total ? `${Math.round((visible / total) * 100)}%` : '0%',
    appListCount: String(lists.length),
    appNoLists: lists.length === 0,
    appHasLists: lists.length > 0,
    appLists: lists,
  }
  const open = d.requests.filter((r) => r.status === 'sent' || r.status === 'opened' || r.status === 'draft').length
  const replied = d.requests.filter((r) => r.status === 'replied').length
  const shortlisted = new Set(d.shortlists.flatMap((l) => l.ids)).size
  const avail = (k: string) => RELAY.providers.filter((p: any) => p.kind === k).length
  const locked = (k: string) => (app.pro ? 0 : Math.max(0, (RELAY.CAT[k]?.count ?? 0) - avail(k)))
  const feed = [
    ...d.notifications.slice(0, 3).map((n) => ({ kind: n.kind, who: n.who, what: n.what, when: n.when })),
    ...d.activity.map(([kind, text, when]) => ({ kind, who: 'You', what: text.charAt(0).toLowerCase() + text.slice(1), when })),
  ].slice(0, 5)
  return {
    appFromPrice: PRICE.monthly,
    ...numbers,
    stats: [
      { ...v.stats[0], value: fmtN(total), note: `+${fmtN(added)} this month` },
      { ...v.stats[1], value: fmtN(countries), note: `${regions} region${regions === 1 ? '' : 's'}` },
      { label: 'Open requests', value: String(open), note: open ? `${replied} replied` : replied ? `${replied} replied` : 'None in flight' },
      { label: 'Shortlisted', value: String(shortlisted), note: d.shortlists.length ? `${d.shortlists.length} shortlist${d.shortlists.length === 1 ? '' : 's'}` : 'None yet' },
    ],
    cats: v.cats.map((c: any) => {
      const n = avail(c.key)
      const ps = RELAY.providers.filter((p: any) => p.kind === c.key)
      const cheapest = ps.filter((p: any) => p.pn > 0).sort((a: any, b: any) => a.pn - b.pn)[0]
      const settles: string[] = ps.map((p: any) => p.settle).filter((s: string) => s && s !== '—')
      const freq = (s: string) => settles.filter((x) => x === s).length
      const settle = [...settles].sort((a, b) => freq(b) - freq(a))[0]
      return {
        ...c,
        from: cheapest?.price ?? (ps[0]?.price || '—'),
        settle: settle ?? '—',
        count: fmtN(n || locked(c.key)),
        locked: fmtN(locked(c.key)),
        has: n > 0,
        empty: n === 0,
        countColor: n ? '#f7f8f8' : '#62666d',
        countNote: n ? 'Providers' : 'Locked',
      }
    }),
    orbit: v.orbit.map((o: any) => ({ ...o, locked: fmtN(locked(o.key)) })),
    activity: feed.length ? feed : [{ kind: 'all', who: 'Relay', what: 'is ready. Request your first intro to get started', when: 'now' }],
  }
}

/* ======================= Provider page ======================= */

const DOCS = ['', 'Basic', 'Fair', 'Good', 'Very good', 'Excellent']
const OK_BAR = 'rgba(111,227,180,.55)'
const PRICING_NOTE = 'Indicative list pricing collected by Relay. Final terms depend on volume and risk review.'

/** The Provider page from admin-managed data (profile) instead of the design's seeded figures. */
export function providerVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  const p: any = RELAY.byId[this.props.pid]
  if (!app || !p || !v.p?.id) return { appPricingNote: PRICING_NOTE }
  const pr = p.profile ?? {}
  const dash = (x: unknown) => (x == null || x === '' ? '—' : String(x))
  const tiers = pr.tiers?.length
    ? pr.tiers
    : [{ name: 'Standard', volume: 'All volumes', price: p.price, monthlyMin: p.minimumCommitment }]
  const incidents = new Map<number, boolean>((pr.incidents ?? []).map((i: any) => [i.day, Boolean(i.major)]))
  const bars = Array.from({ length: 90 }, (_, i) => {
    const day = 89 - i
    return incidents.has(day) ? (incidents.get(day) ? '#ff7b7b' : '#f2c14e') : OK_BAR
  })
  const inc = incidents.size
  const tpl = v.tiers ?? []
  const priced = /\d/.test(p.price)
  const trust = p.trust
  return {
    scoreLabel: trust ? 'Relay Trust Score' : v.scoreLabel || 'Relay score',
    scoreNote: trust
      ? `Tier ${trust.tier} · ${trust.confidence} confidence`
      : v.scoreNote,
    hasTrust: Boolean(trust),
    hasRedFlag: Boolean(trust?.hasRedFlag),
    redFlag: trust?.redFlag || '',
    trustMeta: trust ? `${trust.status} · out of 100` : '',
    trustPillars: trust?.pillars || [],
    kpis: (v.kpis ?? []).map((k: any) => {
      if (k.k === 'Pricing from' && !priced) return { ...k, v: '—', n: p.price || 'On request' }
      if (k.k === 'Currencies' && !p.currencies) return { ...k, n: p.kind === 'kyc' ? 'Not applicable' : 'Not listed yet' }
      if (k.k === 'Settlement' && (!p.settle || p.settle === '—')) return { ...k, v: '—', n: 'Not listed yet' }
      return k
    }),
    appPricingNote: pr.pricingNote || PRICING_NOTE,
    tiers: tiers.map((t: any, i: number) => {
      const look = tpl[tiers.length === 1 ? 1 : Math.min(i, tpl.length - 1)] ?? {}
      return {
        name: t.name,
        vol: dash(t.volume),
        price: dash(t.price),
        bg: look.bg,
        ring: look.ring,
        lines: [
          { k: 'Setup fee', v: dash(t.setupFee) },
          { k: 'Monthly minimum', v: dash(t.monthlyMin) },
          { k: 'Support', v: dash(t.support) },
        ],
      }
    }),
    reach: (p.reach ?? []).map((r: any) => ({ region: r.region, w: (r.pct ?? 0) + '%', countries: r.countries ?? [] })),
    ops: [
      { k: 'Onboarding', v: dash(pr.ops?.onboarding) },
      { k: 'Customer types', v: dash(pr.ops?.customerTypes) },
      { k: 'Data residency', v: dash(pr.ops?.dataResidency) },
      { k: 'Support hours', v: dash(pr.ops?.supportHours) },
    ],
    licences: (p.licences ?? []).map((l: any) => ({ ...l, since: dash(l.since), dot: l.status === 'Active' ? '#6fe3b4' : '#f2c14e' })),
    assurance: [
      ...(pr.assurance?.length ? pr.assurance : (p.certs ?? []).map((name: string) => ({ name }))).map((a: any) => ({
        k: a.name,
        v: a.note || 'Certified',
        c: '#6fe3b4',
        tint: 'rgba(111,227,180,.1)',
        icon: 'M20 6 9 17l-5-5',
      })),
      ...(pr.sanctions
        ? [{ k: 'Sanctions screening', v: pr.sanctions, c: '#8fb8ff', tint: 'rgba(143,184,255,.1)', icon: 'M20 6 9 17l-5-5' }]
        : []),
    ],
    integ: [
      { k: 'API', v: dash(p.apiText) },
      { k: 'SDKs', v: pr.integration?.sdks || (p.sdks?.length ? p.sdks.join(' · ') : '—') },
      { k: 'Sandbox', v: pr.integration?.sandbox || (p.api?.includes('Sandbox') ? 'Self-serve' : 'On request') },
      { k: 'Webhooks', v: pr.integration?.webhooks || (p.api?.includes('Webhooks') ? 'Available' : 'Polling only') },
      { k: 'Docs', v: pr.integration?.docs || DOCS[p.docsQuality ?? 0] || '—' },
    ],
    bars,
    incidents: inc ? inc + ' incident' + (inc > 1 ? 's' : '') : 'No incidents',
  }
}

/* ======================= Profile ======================= */

export function wireProfile(C: any) {
  return wire(C, {
    seed(app) {
      const p = app.data.profile
      this.state = { ...this.state, saved: { ...p }, draft: { ...p } }
    },
  })
}

export function profileVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return {}
  return {
    save: () => {
      const S = this.state
      if (!Object.keys(S.draft).some((k) => S.draft[k] !== S.saved[k])) return
      appApi
        .updateProfile(S.draft)
        .then((p) => {
          app.data.profile = p
          this.setState({ saved: p, draft: p, flash: true })
          this.props.onToast?.('Profile updated', 'success', 'Your details are saved.')
          clearTimeout(this.t)
          this.t = setTimeout(() => this.setState({ flash: false }), 1600)
        })
        .catch((e) => app.fail(e, 'Could not save your profile.'))
    },
    activity: app.data.activity.map(([kind, text, when]) => ({ kind, text, when })),
  }
}

/* ======================= Settings ======================= */

const memberTuples = (rows: MemberRow[]) =>
  rows.map((m) => [m.pending ? 'Invite pending' : m.name, m.email, m.role, m.pending ? null : m.img || initialsAvatar(m.name), m.id])

const PREF_KEYS = ['theme', 'currency', 'start', 'region', 'mx', 'freq', 'quiet']

export function wireSettings(C: any) {
  return wire(C, {
    seed(app) {
      const d = app.data
      const p = d.prefs
      this.state = {
        ...this.state,
        plan: d.plan,
        theme: p.theme,
        currency: p.currency,
        start: p.start,
        region: p.region,
        mx: p.mx,
        freq: p.freq,
        quiet: p.quiet,
        twoFa: d.twoFa,
        sessions: d.sessions,
        ws: { name: d.workspace.name, slug: d.workspace.slug },
        members: memberTuples(d.members),
        keys: [],
      }
    },
    watch: [...PREF_KEYS, 'twoFa', 'sessions', 'members'],
    sync(app, prev, next) {
      if (PREF_KEYS.some((k) => prev[k] !== next[k])) {
        app.later('prefs', 600, () => {
          const body = Object.fromEntries(PREF_KEYS.map((k) => [k, this.state[k]]))
          appApi
            .updatePrefs(body)
            .then((p) => (app.data.prefs = p))
            .catch((e) => app.fail(e))
        })
      }
      if (prev.twoFa !== next.twoFa) {
        this.quiet({ twoFa: prev.twoFa })
        window.location.assign(`/${app.locale}/two-factor?mode=${prev.twoFa ? 'disable' : 'setup'}`)
      }
      if (prev.sessions !== next.sessions) {
        const ids = new Set(next.sessions.map((s: any) => s[0]))
        for (const s of prev.sessions) if (!ids.has(s[0])) appApi.revokeSession(s[0]).catch((e) => app.fail(e))
      }
      if (prev.members !== next.members && prev.members.length === next.members.length) {
        next.members.forEach((m: any, i: number) => {
          const was = prev.members[i]
          if (was && was[4] === m[4] && was[2] !== m[2]) {
            appApi
              .setMemberRole(m[4], m[2])
              .then((rows) => {
                app.data.members = rows
                this.quiet({ members: memberTuples(rows) })
              })
              .catch((e) => {
                this.quiet({ members: prev.members })
                app.fail(e)
              })
          }
        })
      }
    },
  })
}

function dateLabel(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
}

export function settingsVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return { plans: v.plans.map((p: any) => priced(p, this.state.cycle === 'yearly')) }
  const d = app.data
  const S = this.state
  const b = d.billing
  const yr = S.cycle === 'yearly'
  const valid = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
  const emails = [...new Set([...S.inviteList, ...S.invite.split(/[,\s]+/).map((x: string) => x.trim()).filter(Boolean)])].filter(valid)
  const seats = d.usage.seats
  const planNote =
    b.plan !== 'Pro'
      ? 'Upgrade to Relay Pro for unlimited compares, intros and market signals.'
      : b.complimentary
        ? 'Complimentary Pro from the Relay team.'
        : b.cancelAtPeriodEnd || b.status === 'canceled'
          ? `Cancelled · Pro stays on until ${dateLabel(b.currentPeriodEnd)}.`
          : `Renews ${dateLabel(b.currentPeriodEnd)}${b.card ? ` · ${b.card.brand} •••• ${b.card.last4}` : ''}.`
  return {
    appPlanName: b.plan,
    appPlanNote: planNote,
    appPwNote: (d as any).passwordNote ?? 'Reset by email',
    appChangePassword: () =>
      forgotPassword(d.user.email)
        .then(() => app.toast('Check your email', 'success', `We sent a link to ${d.user.email} to set a new password.`))
        .catch((e) => app.fail(e)),
    seatLabel: seats.limit == null ? `${seats.used} of unlimited seats used` : `${seats.used} of ${seats.limit} seats used`,
    seatHint: seats.limit == null ? 'Pro includes unlimited seats.' : `${Math.max(0, seats.limit - seats.used)} seats left on the Free plan.`,
    usage: [
      { label: 'Compares this month', v: d.usage.compares.v, w: d.usage.compares.w },
      { label: 'Intro requests', v: d.usage.intros.v, w: d.usage.intros.w },
      { label: 'Seats', v: d.usage.seats.v, w: d.usage.seats.w },
    ],
    cycles: v.cycles.map((c: any) => (c.label.startsWith('Yearly') ? { ...c, label: `Yearly · save ${PRICE.savePct}%` } : c)),
    plans: v.plans.map((p: any) => {
      const out = priced(p, yr)
      if (p.name === 'Pro') return { ...out, act: () => !p.isCurrent && app.checkout(yr ? 'yearly' : 'monthly') }
      if (p.name === 'Enterprise') return { ...out, act: () => dcNavigate('Relay%20Contact.dc.html') }
      return {
        ...out,
        act: () => {
          if (p.isCurrent) return
          if (b.complimentary) return app.toast('Complimentary Pro', 'info', 'Contact support to change this plan.')
          if (b.cancelAtPeriodEnd) return app.toast('Pro is already cancelled', 'info', `It stays on until ${dateLabel(b.currentPeriodEnd)}.`)
          app.dashAsk({
            title: 'Cancel Relay Pro?',
            body: 'Your workspace keeps Pro until the end of the billing period, then moves to the Free plan.',
            ok: 'Cancel Pro',
            item: d.workspace.name,
            kind: 'all',
            meta: `Pro · renews ${dateLabel(b.currentPeriodEnd)}`,
            run: () => app.cancelPlan(),
          })
        },
      }
    }),
    sendInvites: () => {
      if (!emails.length) return
      appApi
        .invite(emails, S.inviteRole)
        .then((res) => {
          app.data.members = res.members
          this.quiet({ inviteOpen: false, invite: '', inviteList: [], members: memberTuples(res.members) })
          this.flash(emails.length > 1 ? emails.length + ' invites sent' : 'Invite sent', 'success', emails.join(', '))
          app.refresh()
        })
        .catch((e) => app.fail(e, 'Could not send the invites.'))
    },
    createKey: () => app.toast('API keys are coming soon', 'info', 'Talk to us for early API access.'),
  }
}

function priced(p: any, yr: boolean) {
  if (p.name === 'Free') return { ...p, price: PRICE.free }
  if (p.name === 'Pro') return { ...p, price: yr ? PRICE.yearly : PRICE.monthly }
  return p
}
