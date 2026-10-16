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
import { appApi, type MemberRow, type PipelineRow } from '@/lib/api/app'
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
        if (this.state.requested[p.id] || app.blockIntro(1)) return
        this.setState((s: any) => ({ requested: { ...s.requested, [p.id]: true } }))
        appApi
          .createRequests({ pids: [p.id], type: 'Intro' })
          .then(({ requests, usage }) => {
            app.data.usage = usage
            app.data.requests = [...requests, ...app.data.requests]
            app.toast('Intro requested', 'success', 'Replies will land in your Inbox.')
          })
          .catch((e) => {
            this.setState((s: any) => ({ requested: { ...s.requested, [p.id]: false } }))
            app.fail(e)
          })
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
        shownLabel: String(v.shownLabel).replace(/ · Free plan previews .*$/, ''),
        upgrade: () => this.props.onNavigate?.('settings', { section: 'billing' }),
      }
    : {}
}

/* ======================= Overview ======================= */

export function overviewVals(this: any, v: any) {
  const app: AppBridge | undefined = this.props.app
  if (!app) return { appFromPrice: PRICE.monthly }
  const d = app.data
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
    stats: [
      { ...v.stats[0], value: fmtN(RELAY.TOTAL) },
      { ...v.stats[1], value: fmtN(d.catalog.countries ?? 140) },
      { label: 'Open requests', value: String(open), note: open ? `${replied} replied` : replied ? `${replied} replied` : 'None in flight' },
      { label: 'Shortlisted', value: String(shortlisted), note: d.shortlists.length ? `${d.shortlists.length} shortlist${d.shortlists.length === 1 ? '' : 's'}` : 'None yet' },
    ],
    cats: v.cats.map((c: any) => {
      const n = avail(c.key)
      return {
        ...c,
        count: n ? fmtN(n) : '0',
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
