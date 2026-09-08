'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { Sparkline } from '@/components/dashboard/ui/Sparkline'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import { listShortlists, type ShortlistDoc } from '@/lib/api/workspace'
import { listNotifications, type NotificationItem } from '@/lib/api/notifications'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useWorkspaceCounts } from '@/components/dashboard/chrome/WorkspaceCounts'

export default function OverviewCanvas() {
  const { weighting } = useWeighting()
  const { providers, categoryCards, loading } = useCatalog()
  const { intros, shortlistEntries, shortlists } = useWorkspaceCounts()
  const [lists, setLists] = useState<ShortlistDoc[]>([])
  const [notes, setNotes] = useState<NotificationItem[]>([])
  const [checked, setChecked] = useState<Set<string>>(new Set())

  useEffect(() => {
    void listShortlists()
      .then((result) => setLists(result.shortlists ?? []))
      .catch(() => setLists([]))
    void listNotifications()
      .then((result) => setNotes(result.notifications ?? []))
      .catch(() => setNotes([]))
  }, [])

  const activeList = lists[0]
  const listEntries = useMemo(() => {
    if (!activeList) return []
    return activeList.entries
      .map((entry) => {
        const p = providers.find((row) => row.slug === entry.providerId)
        if (!p) return null
        return { entry, p }
      })
      .filter(Boolean) as Array<{
      entry: ShortlistDoc['entries'][number]
      p: (typeof providers)[number]
    }>
  }, [activeList, providers])

  const fees = providers.map((p) => p.feeFromBps).filter((n) => n > 0)
  const medianFee = fees.length
    ? formatFeeFromBps([...fees].sort((a, b) => a - b)[Math.floor(fees.length / 2)])
    : '—'

  const kpis = [
    { label: 'OPEN REQUESTS', v: String(intros), note: intros === 1 ? 'from your inbox' : 'from your inbox', tone: 'muted' as const },
    { label: 'SHORTLISTED', v: String(shortlistEntries), note: `across ${shortlists} ${shortlists === 1 ? 'list' : 'lists'}`, tone: 'muted' as const },
    { label: 'MEDIAN PAYOUT FEE', v: medianFee, note: 'from catalog', tone: 'muted' as const },
    { label: 'LISTED PROVIDERS', v: String(providers.length), note: loading ? 'loading' : 'from admin', tone: 'muted' as const },
  ]

  return (
    <div className="relay-page">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Overview</h1>
          <div className="relay-hd-sub">
            {providers.length} {providers.length === 1 ? 'provider' : 'providers'} · managed from admin
          </div>
        </div>
        <div className="relay-hd-actions">
          <Link href="/dashboard/shortlists" className="relay-btn relay-btn--outline">
            New shortlist
          </Link>
          <Link href="/dashboard/intros" className="relay-btn relay-btn--white">
            Request intro
          </Link>
        </div>
      </div>

      <div className="relay-kpi relay-kpi--4">
        {kpis.map((k) => (
          <div className="relay-kpi-tile" key={k.label}>
            <div className="relay-kpi-label">{k.label}</div>
            <div className="relay-kpi-row">
              <span className="relay-kpi-value">{k.v}</span>
              <span className={`relay-kpi-note relay-kpi-note--${k.tone}`}>{k.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relay-panel relay-panel--dir">
        <div className="relay-dir-head">
          <div>
            <div className="relay-dir-title">Provider Directory</div>
            <div className="relay-dir-sub">
              Fees, settlement and licence coverage by category — scored on your weighting.
            </div>
          </div>
          <Link href="/dashboard/providers" className="relay-btn relay-btn--chip">
            All {providers.length} ↗
          </Link>
        </div>
        <div className="relay-cats">
          {categoryCards.map((c) => (
            <Link key={c.id} href={`/dashboard/providers?category=${c.id}`} className="relay-cat">
              <div className="relay-cat-top">
                <div>
                  <div className="relay-cat-name">{c.name}</div>
                  <div className="relay-cat-short">{c.short}</div>
                </div>
                <div className="relay-cat-n">
                  <strong>{c.n}</strong>
                  <span>LISTED</span>
                </div>
              </div>
              <div className="relay-cat-metrics">
                <div>
                  <div className="relay-cat-metric-label">FEE FROM</div>
                  <div className="relay-cat-metric-value">{c.feeFrom}</div>
                </div>
                <div>
                  <div className="relay-cat-metric-label">SETTLE</div>
                  <div className="relay-cat-metric-value">{c.settle}</div>
                </div>
                <div className="relay-spark">
                  <Sparkline seed={c.sparkSeed} dir={c.sparkDir} />
                  <div className={`relay-spark-delta relay-spark-delta--${c.deltaTone}`}>{c.delta}</div>
                </div>
              </div>
              <div className="relay-cat-foot">
                <LiveDot variant="green" />
                <span className="relay-cat-live">{c.live}</span>
                <span className="relay-cat-open">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="relay-bottom">
        <div className="relay-panel">
          <div className="relay-rfp-head">
            <div>
              <div className="relay-rfp-title">
                <span>{activeList?.name ?? 'Shortlists'}</span>
              </div>
              {activeList ? (
                <div className="relay-rfp-sub">
                  {`${activeList.entries.length} providers · ${activeList.meta}`}
                </div>
              ) : null}
            </div>
            {listEntries.length >= 2 ? (
              <Link
                href={`/dashboard/compare?ids=${listEntries.map((row) => row.p.slug).slice(0, 4).join(',')}`}
                className="relay-btn relay-btn--white relay-btn--sm"
              >
                Compare {Math.min(4, listEntries.length)}
              </Link>
            ) : null}
          </div>
          {listEntries.length === 0 ? (
            <EmptyState
              kind="shortlist"
              title="No shortlists yet"
              body="Star providers from Directory to build a private RFP. Quotes stay in this workspace until you send a request."
              actionLabel="Open directory"
              actionHref="/dashboard/providers"
            />
          ) : (
            <>
              <div className="relay-th relay-th--rfp">
                <span />
                <span>PROVIDER</span>
                <span>FEE</span>
                <span>STATUS</span>
                <span style={{ textAlign: 'right' }}>SCORE</span>
              </div>
              <div className="relay-rows">
                {listEntries.map(({ entry, p }) => {
                  const score = computeScore(p, weighting)
                  const on = checked.has(p.slug)
                  const stFg =
                    entry.status === 'replied'
                      ? 'oklch(.85 .15 130)'
                      : entry.status === 'no_pricing'
                        ? 'oklch(.86 .13 80)'
                        : 'rgba(255,255,255,.5)'
                  return (
                    <div key={p.slug} className={`relay-row relay-row--rfp${on ? ' relay-row--on' : ''}`}>
                      <CheckBox
                        checked={on}
                        label={`Select ${p.name}`}
                        onChange={(next) => {
                          setChecked((prev) => {
                            const copy = new Set(prev)
                            if (next) copy.add(p.slug)
                            else copy.delete(p.slug)
                            return copy
                          })
                        }}
                      />
                      <div>
                        <div className="relay-name">{p.name}</div>
                        <div className="relay-meta">{`${p.hq} · ${p.licenceLabel}`}</div>
                      </div>
                      <span className="relay-fee">{formatFeeFromBps(entry.feeBps)}</span>
                      <div className="relay-status">
                        <span className="relay-status-dot" style={{ background: stFg }} />
                        <span className="relay-status-label" style={{ color: stFg }}>
                          {statusLabel(entry.status, entry.statusAt)}
                        </span>
                      </div>
                      <span className="relay-score" style={{ color: score >= 80 ? '#fff' : 'rgba(255,255,255,.75)' }}>
                        {score}
                      </span>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <div className="relay-stack">
          <div className="relay-panel" style={{ flex: 1 }}>
            <div className="relay-activity-head">
              <span>Activity</span>
              <span className="relay-badge relay-badge--live">
                <LiveDot size="sm" />
                LIVE
              </span>
            </div>
            <div className="relay-rows">
              {notes.length === 0 ? (
                <EmptyState
                  kind="activity"
                  compact
                  title="Nothing in the feed yet"
                  body="Pricing replies, intro updates and licence notes will land here as you work the catalog."
                  actionLabel="Browse intelligence"
                  actionHref="/dashboard/intelligence"
                />
              ) : (
                notes.slice(0, 6).map((a) => (
                  <div className="relay-feed-row" key={a.id}>
                    <span className="relay-feed-time">
                      {new Date(a.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div>
                      <div className="relay-feed-text">{a.title}</div>
                      <div className="relay-feed-meta">{a.body}</div>
                    </div>
                  </div>
                ))
              )}
              {notes.length > 0 ? (
              <Link href="/dashboard/intelligence" className="relay-feed-more">
                Intelligence →
              </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
