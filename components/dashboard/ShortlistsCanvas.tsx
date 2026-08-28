'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import { getProvider, shortlists as mockLists } from '@/lib/mock/relay'
import type { Shortlist } from '@/lib/relay/types'

export default function ShortlistsCanvas() {
  const [lists, setLists] = useState(mockLists)
  const [activeId, setActiveId] = useState(mockLists[0].id)
  const [toast, setToast] = useState<string | null>(null)
  const active = lists.find((l) => l.id === activeId) ?? lists[0]

  const chaseCount = useMemo(() => {
    const urgent = active.entries.filter((e) => e.next === 'chase_urgent').length
    if (urgent) return urgent
    return active.entries.filter((e) => e.next === 'chase').length
  }, [active])

  const chase = (slug?: string) => {
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
          <div className="relay-hd-sub">3 active · 12 providers · 2 RFPs closing this month</div>
        </div>
        <div className="relay-hd-actions">
          <button
            type="button"
            className="relay-btn relay-btn--white"
            onClick={() => {
              const id = `list-${Date.now()}`
              setLists((prev) => [
                ...prev,
                {
                  id,
                  name: 'New shortlist',
                  corridor: '—',
                  monthlyVolumeUsd: 0,
                  closesAt: null,
                  createdAt: '28 Aug',
                  entries: [],
                  progressPct: 0,
                  meta: '0 replied · draft',
                  stage: 'draft',
                },
              ])
              setActiveId(id)
            }}
          >
            New shortlist
          </button>
        </div>
      </div>

      <div className="relay-sl-grid">
        <div className="relay-sl-list">
          {lists.map((list) => {
            const on = list.id === active.id
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
            Shortlists are private to Northwind Co. Providers only see a request when you send one.
          </div>
        </div>

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
                {active.id === 'q3-payout'
                  ? 'Two quotes in. Median of replies: 0.21% — 21bps under category median.'
                  : active.stage === 'draft'
                    ? 'No quotes yet. Chase when you are ready to send a request.'
                    : 'All three have replied. Compare and book intros to close.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {toast ? <div className="relay-toast">{toast}</div> : null}
    </div>
  )
}
