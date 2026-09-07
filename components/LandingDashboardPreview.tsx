'use client'

import { useEffect, useRef, useState } from 'react'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { Sparkline } from '@/components/dashboard/ui/Sparkline'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWaitlist } from '@/components/WaitlistModal'
import RelayMark from '@/components/RelayMark'
import { computeScore, DEFAULT_WEIGHTING } from '@/lib/relay/score'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import '@/components/dashboard/relay.css'

const DESIGN_WIDTH = 1600
const PEEK_HEIGHT = 820
const PILLS = [
  { name: 'Overview', on: true },
  { name: 'Directory', on: false },
  { name: 'Compare', on: false },
  { name: 'Shortlists', badge: '0', on: false },
  { name: 'Requests', badge: '0', lime: true, on: false },
] as const

/**
 * Static workspace window for the landing page — same chrome and overview
 * as the signed-in dashboard, without auth or live navigation.
 */
export default function LandingDashboardPreview() {
  const { openWaitlist } = useWaitlist()
  const { providers, categoryCards } = useCatalog()
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.72)
  const [compact, setCompact] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const previewRows = providers.slice(0, 4)
  const overviewKpis = [
    { label: 'OPEN REQUESTS', v: '0', note: 'none yet', tone: 'muted' as const },
    { label: 'SHORTLISTED', v: '0', note: 'across 0 lists', tone: 'muted' as const },
    { label: 'MEDIAN PAYOUT FEE', v: '—', note: 'from catalog', tone: 'muted' as const },
    { label: 'LISTED PROVIDERS', v: String(providers.length), note: 'from admin', tone: 'muted' as const },
  ]
  const rail = [
    { name: 'Overview', n: '', on: true },
    { name: 'Directory', n: String(providers.length), on: false },
    { name: 'Shortlists', n: '0', on: false },
    { name: 'Requests', n: '0', on: false },
    { name: 'Intelligence', n: '', on: false },
  ] as const

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const sync = () => {
      const width = el.clientWidth
      const isCompact = width < 720
      const design = isCompact ? 1080 : DESIGN_WIDTH
      setCompact(isCompact)
      setScale(width / design)
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="ov-frame" ref={frameRef} aria-label="Relay workspace preview">
      <div className="ov-browser" aria-hidden>
        <span className="ov-traffic ov-traffic--close" />
        <span className="ov-traffic ov-traffic--min" />
        <span className="ov-traffic ov-traffic--max" />
        <span className="ov-url">
          <span className="ov-url-lock" aria-hidden />
          app.relay · overview
        </span>
      </div>

      <div
        className="ov-clip"
        style={{ height: (compact ? 960 : PEEK_HEIGHT) * scale }}
      >
        <div
          className="ov-scale"
          style={{
            ['--ov-scale' as string]: String(scale),
            width: compact ? 1080 : DESIGN_WIDTH,
          }}
        >
          <div className={`relay ov-app${compact ? ' ov-app--compact' : ''}`}>
            <div className="relay-glow" />
            <header className="relay-topbar">
              <div className="relay-logo">
                <RelayMark />
              </div>
              <nav className="relay-pills" aria-label="Workspace sections">
                {PILLS.map((item) => (
                  <span
                    key={item.name}
                    className={`relay-pill${item.on ? ' relay-pill--on' : ''}`}
                  >
                    {item.name}
                    {'badge' in item ? (
                      <span
                        className={`relay-pill-badge${'lime' in item && item.lime ? ' relay-pill-badge--lime' : ''}`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                ))}
              </nav>
              <div className="relay-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
                  <path d="M16.5 16.5L21 21" stroke="rgba(255,255,255,.45)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="ov-search-ph">Search providers, corridors, licences</span>
                <kbd>⌘K</kbd>
              </div>
              <div className="relay-topbar-right">
                <span className="relay-bell" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"
                      stroke="rgba(255,255,255,.8)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M10.5 21a2 2 0 0 0 3 0" stroke="rgba(255,255,255,.8)" strokeWidth="2" />
                  </svg>
                  <span className="relay-bell-dot" />
                </span>
                <span className="relay-account">
                  <span className="relay-avatar">N</span>
                  <span className="relay-account-label">Northwind Co.</span>
                </span>
              </div>
            </header>

            <div className="relay-body">
              <aside className="relay-rail" aria-label="Workspace">
                <div className="relay-rail-label">WORKSPACE</div>
                {rail.map((item) => (
                  <span
                    key={item.name}
                    className={`relay-rail-item${item.on ? ' relay-rail-item--on' : ''}`}
                  >
                    <span className="relay-rail-dot" />
                    <span className="relay-rail-name">{item.name}</span>
                    {item.n ? <span className="relay-rail-count">{item.n}</span> : null}
                  </span>
                ))}
                <div className="relay-weight-card">
                  <div className="relay-weight-copy">Weighting drives every score in Relay.</div>
                  <div className="relay-weight-link">Edit weighting →</div>
                </div>
                <div className="relay-rail-live">
                  <LiveDot variant="green" />
                  <span>Data live · 14m ago</span>
                </div>
              </aside>

              <div className="relay-main">
                <div className="relay-page">
                  <div className="relay-hd">
                    <div>
                      <h3 className="relay-hd-title">Overview</h3>
                      <div className="relay-hd-sub">210 providers · 38 corridors · 14 markets</div>
                    </div>
                    <div className="relay-hd-actions">
                      <button
                        type="button"
                        className="relay-btn relay-btn--outline"
                        onClick={openWaitlist}
                      >
                        New shortlist
                      </button>
                      <button
                        type="button"
                        className="relay-btn relay-btn--white"
                        onClick={openWaitlist}
                      >
                        Request intro
                      </button>
                    </div>
                  </div>

                  <div className="relay-kpi relay-kpi--4">
                    {overviewKpis.map((k) => (
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
                      <button
                        type="button"
                        className="relay-btn relay-btn--chip"
                        onClick={openWaitlist}
                      >
                        All 210 ↗
                      </button>
                    </div>
                    <div className="relay-cats">
                      {categoryCards.map((c) => (
                        <button
                          type="button"
                          key={c.id}
                          className="relay-cat"
                          onClick={openWaitlist}
                        >
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
                              <div className={`relay-spark-delta relay-spark-delta--${c.deltaTone}`}>
                                {c.delta}
                              </div>
                            </div>
                          </div>
                          <div className="relay-cat-foot">
                            <LiveDot variant="green" />
                            <span className="relay-cat-live">{c.live}</span>
                            <span className="relay-cat-open">Open →</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relay-bottom">
                    <div className="relay-panel">
                      <div className="relay-rfp-head">
                        <div>
                          <div className="relay-rfp-title">
                            <span>Shortlists</span>
                          </div>
                          <div className="relay-rfp-sub">
                            {previewRows.length
                              ? `${previewRows.length} from the live catalog`
                              : 'Empty until you add providers in admin'}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="relay-btn relay-btn--white relay-btn--sm"
                          onClick={openWaitlist}
                        >
                          Compare
                        </button>
                      </div>
                      <div className="relay-th relay-th--rfp">
                        <span />
                        <span>PROVIDER</span>
                        <span>FEE</span>
                        <span>STATUS</span>
                        <span style={{ textAlign: 'right' }}>SCORE</span>
                      </div>
                      <div className="relay-rows">
                        {previewRows.length === 0 ? (
                          <p className="relay-empty-hint">No providers listed yet.</p>
                        ) : (
                          previewRows.map((p) => {
                          const score = computeScore(p, DEFAULT_WEIGHTING)
                          const on = checked.has(p.slug)
                          return (
                            <div
                              key={p.slug}
                              className={`relay-row relay-row--rfp${on ? ' relay-row--on' : ''}`}
                            >
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
                                <div className="relay-meta">
                                  {`${p.hq} · ${p.licenceLabel}`}
                                </div>
                              </div>
                              <span className="relay-fee">{formatFeeFromBps(p.feeFromBps || null)}</span>
                              <div className="relay-status">
                                <span className="relay-status-dot" style={{ background: 'rgba(255,255,255,.5)' }} />
                                <span className="relay-status-label" style={{ color: 'rgba(255,255,255,.5)' }}>
                                  {statusLabel('waiting', 'catalog')}
                                </span>
                              </div>
                              <span
                                className="relay-score"
                                style={{ color: score >= 80 ? '#fff' : 'rgba(255,255,255,.75)' }}
                              >
                                {score}
                              </span>
                            </div>
                          )
                        })
                        )}
                        <div className="relay-rfp-foot">
                          <LiveDot />
                          <p>Catalog is live. Add providers in admin and they appear here.</p>
                          <button type="button" className="relay-link" onClick={openWaitlist}>
                            Join waitlist →
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relay-stack">
                      <div className="relay-panel" style={{ flex: 1 }}>
                        <div className="relay-activity-head">
                          <span>Activity</span>
                          <span className="relay-badge relay-badge--live">
                            <LiveDot size="sm" />
                            LIVE
                          </span>
                          <span className="relay-activity-date">Live</span>
                        </div>
                        <div className="relay-rows">
                          <p className="relay-empty-hint">No activity yet.</p>
                          <button type="button" className="relay-feed-more" onClick={openWaitlist}>
                            All activity →
                          </button>
                        </div>
                      </div>

                      <div className="relay-intel-mini">
                        <div className="relay-intel-kicker">
                          <span>INTELLIGENCE · MARKET MAPS</span>
                          <span>28 MIN</span>
                        </div>
                        <div className="relay-intel-body">
                          <div className="relay-intel-stat">
                            <strong>10.4%</strong>
                            <span>
                              fintech share
                              <br />
                              of daily flow
                            </span>
                          </div>
                          <div className="relay-intel-rule" />
                          <div>
                            <div className="relay-intel-hook">
                              $35 trillion moves daily. Fintech handles more of it every quarter — and the
                              payout layer compounds fastest.
                            </div>
                            <div className="relay-intel-cta">
                              <button type="button" className="relay-link" onClick={openWaitlist}>
                                Read the map →
                              </button>
                              <span>2 more this week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ov-fade" aria-hidden />
      </div>
    </div>
  )
}
