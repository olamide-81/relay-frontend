'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { chaseShortlist, createShortlist, listShortlists, type ShortlistDoc } from '@/lib/api/workspace'
import type { Shortlist } from '@/lib/relay/types'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useSession } from '@/hooks/useSession'

function formatCreated(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function toUi(doc: ShortlistDoc): Shortlist {
  return {
    id: doc.id,
    name: doc.name,
    corridor: doc.corridor,
    monthlyVolumeUsd: doc.monthlyVolumeUsd,
    closesAt: doc.closesAt,
    createdAt: formatCreated(doc.createdAt),
    progressPct: doc.progressPct,
    meta: doc.meta,
    stage: doc.stage,
    entries: doc.entries.map((e) => ({
      slug: e.providerId,
      feeBps: e.feeBps,
      settleLabel: e.settleLabel,
      status: e.status,
      statusAt: formatCreated(e.statusAt),
      next: e.next,
    })),
  }
}

export default function ShortlistsCanvas() {
  const { getProvider } = useCatalog()
  const { user } = useSession()
  const workspaceLabel = user?.company && user.company !== 'Independent' ? user.company : user?.fullName || 'your workspace'
  const [lists, setLists] = useState<Shortlist[]>([])
  const [activeId, setActiveId] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const active = lists.find((l) => l.id === activeId) ?? lists[0]

  useEffect(() => {
    void listShortlists()
      .then((result) => {
        const mapped = result.shortlists.map(toUi)
        setLists(mapped)
        setActiveId(mapped[0]?.id ?? '')
      })
      .catch(() => {
        setToast('Could not load shortlists from the API.')
        window.setTimeout(() => setToast(null), 2400)
      })
  }, [])

  const chaseCount = useMemo(() => {
    if (!active) return 0
    const urgent = active.entries.filter((e) => e.next === 'chase_urgent').length
    if (urgent) return urgent
    return active.entries.filter((e) => e.next === 'chase').length
  }, [active])

  const chase = (slug?: string) => {
    void chaseShortlist(active.id).catch(() => {})
    const name = slug ? getProvider(slug)?.name : `${chaseCount} provider`
    setToast(`Reminder sent to ${name}.`)
    window.setTimeout(() => setToast(null), 2400)
  }

  const badge = (list: Shortlist) => {
    if (list.closesAt) return 'CLOSES 3 SEP'
    if (list.stage === 'decision') return 'DECISION'
    return null
  }

  return (
    <div className="relay-page relay-page--shortlists">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Shortlists</h1>
          <div className="relay-hd-sub">
            {lists.length
              ? `${lists.length} shortlist${lists.length === 1 ? '' : 's'} · ${lists.reduce((n, l) => n + l.entries.length, 0)} providers`
              : 'Create a shortlist to start an RFP'}
          </div>
        </div>
        <div className="relay-hd-actions">
          <button
            type="button"
            className="relay-btn relay-btn--white"
            onClick={() => {
              void createShortlist({ name: 'New shortlist', corridor: 'UK' })
                .then((created) => {
                  const ui = toUi(created)
                  setLists((prev) => [ui, ...prev])
                  setActiveId(ui.id)
                })
                .catch(() => {
                  setToast('Could not create shortlist.')
                  window.setTimeout(() => setToast(null), 2400)
                })
            }}
          >
            New shortlist
          </button>
        </div>
      </div>

      <div className="relay-sl-grid">
        {lists.length === 0 ? (
          <div className="relay-panel relay-panel--20 relay-sl-empty">
            <EmptyState
              kind="shortlist"
              title="Build your first shortlist"
              body="Pick providers from Directory, then chase quotes and book intros from one private list. Providers only see a request when you send one."
              actionLabel="Open directory"
              actionHref="/dashboard/providers"
            />
          </div>
        ) : (
          <>
        <div className="relay-sl-list">
          {lists.map((list) => {
            const on = list.id === active?.id
            return (
              <button
                type="button"
                key={list.id}
                className={`relay-sl-card${on ? ' relay-sl-card--on' : ''}`}
                onClick={() => setActiveId(list.id)}
              >
                <div className="relay-sl-card-top">
                  <span className="relay-sl-card-name">{list.name}</span>
                  <span className="relay-sl-card-n">{list.entries.length}</span>
                </div>
                <div className="relay-sl-card-meta">{list.meta}</div>
                <div className={`relay-sl-bar${list.stage === 'draft' ? ' relay-sl-bar--draft' : ''}`}>
                  <span style={{ width: `${list.progressPct}%` }} />
                </div>
              </button>
            )
          })}
          <div className="relay-sl-note">
            Shortlists are private to {workspaceLabel}. Providers only see a request when you send one.
          </div>
        </div>

        {active ? (
        <div className="relay-panel relay-panel--20">
          <div className="relay-rfp-head" style={{ padding: '22px 26px' }}>
            <div>
              <div className="relay-rfp-title">
                <span style={{ fontSize: 18 }}>{active.name}</span>
                {badge(active) ? <span className="relay-badge relay-badge--warn">{badge(active)}</span> : null}
              </div>
              <div className="relay-rfp-sub" style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', marginTop: 10 }}>
                {active.corridor} · USD {active.monthlyVolumeUsd ? `${active.monthlyVolumeUsd / 1_000_000}M` : '—'} monthly
                · created {active.createdAt}
              </div>
            </div>
            <div className="relay-hd-actions">
              <Link
                href={`/dashboard/compare?ids=${active.entries.map((e) => e.slug).join(',')}`}
                className="relay-btn relay-btn--outline relay-btn--sm"
              >
                Compare
              </Link>
              <button
                type="button"
                className="relay-btn relay-btn--lime relay-btn--sm"
                onClick={() => chase()}
                disabled={chaseCount === 0}
              >
                Chase {chaseCount} provider{chaseCount === 1 ? '' : 's'}
              </button>
            </div>
          </div>
          {active.entries.length === 0 ? (
            <EmptyState
              kind="directory"
              compact
              title="No providers on this list"
              body="Add providers from Directory to start collecting quotes on this corridor."
              actionLabel="Open directory"
              actionHref="/dashboard/providers"
            />
          ) : (
          <>
          <div className="relay-th relay-th--rfp2">
            <span>PROVIDER</span>
            <span>FEE</span>
            <span>SETTLE</span>
            <span>STATUS</span>
            <span style={{ textAlign: 'right' }}>NEXT</span>
          </div>
          <div className="relay-rows">
            {active.entries.map((entry) => {
              const p = getProvider(entry.slug)
              if (!p) return null
              const stFg =
                entry.status === 'replied'
                  ? 'oklch(.85 .15 130)'
                  : entry.status === 'no_pricing'
                    ? 'oklch(.86 .13 80)'
                    : 'rgba(255,255,255,.5)'
              const nextCls =
                entry.next === 'book_intro' ? 'relay-next--lime' : entry.next === 'chase_urgent' ? 'relay-next--warn' : 'relay-next--mute'
              const nextLabel =
                entry.next === 'book_intro' ? 'Book intro' : entry.next === 'chase_urgent' ? 'Chase today' : 'Chase'
              return (
                <div className="relay-row relay-row--rfp2" key={entry.slug}>
                  <div>
                    <div className="relay-prov-name">{p.name}</div>
                    <div className="relay-meta">
                      {p.hq.split(',')[0]} · {p.licenceModel}
                    </div>
                  </div>
                  <span className="relay-fee">{formatFeeFromBps(entry.feeBps)}</span>
                  <span className="relay-settle">{entry.settleLabel}</span>
                  <div className="relay-status">
                    <span className="relay-status-dot" style={{ background: stFg }} />
                    <span className="relay-status-label" style={{ color: stFg }}>
                      {statusLabel(entry.status, entry.statusAt)}
                    </span>
                  </div>
                  {entry.next === 'book_intro' ? (
                    <Link href={`/dashboard/intros/${p.slug}`} className={`relay-next ${nextCls}`}>
                      {nextLabel}
                    </Link>
                  ) : (
                    <button type="button" className={`relay-next ${nextCls}`} onClick={() => chase(p.slug)}>
                      {nextLabel}
                    </button>
                  )}
                </div>
              )
            })}
            <div className="relay-rfp-foot">
              <LiveDot />
              <p>
                {active.stage === 'draft'
                  ? 'No quotes yet. Chase when you are ready to send a request.'
                  : `${active.entries.length} provider${active.entries.length === 1 ? '' : 's'} on this list.`}
              </p>
            </div>
          </div>
          </>
          )}
        </div>
        ) : (
          <div className="relay-panel relay-panel--20">
            <EmptyState
              kind="shortlist"
              title="This list is empty"
              body="Add providers from Directory to start collecting quotes on this corridor."
              actionLabel="Open directory"
              actionHref="/dashboard/providers"
            />
          </div>
        )}
          </>
        )}
      </div>
      {toast ? <div className="relay-toast">{toast}</div> : null}
    </div>
  )
}
