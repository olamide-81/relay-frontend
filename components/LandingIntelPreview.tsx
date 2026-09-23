'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { Sparkline } from '@/components/dashboard/ui/Sparkline'
import { EASE } from '@/components/heroes/ease'
import { useWaitlist } from '@/components/WaitlistModal'
import RelayMark from '@/components/RelayMark'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import { computeScore, DEFAULT_WEIGHTING } from '@/lib/relay/score'
import type { Provider } from '@/lib/relay/types'
import '@/components/dashboard/relay.css'

export type IntelSceneId = 'discover' | 'research' | 'act' | 'signals'

const PILLS = ['Overview', 'Directory', 'Compare', 'Shortlists', 'Intelligence'] as const

const CHROME: Record<
  IntelSceneId,
  { url: string; pill: (typeof PILLS)[number]; title: string; sub: string }
> = {
  discover: {
    url: 'app.relay · directory',
    pill: 'Directory',
    title: 'Payouts',
    sub: 'Live catalog · scored on your weighting',
  },
  research: {
    url: 'app.relay · compare',
    pill: 'Compare',
    title: 'Compare',
    sub: 'Add two providers from directory to compare',
  },
  act: {
    url: 'app.relay · shortlists',
    pill: 'Shortlists',
    title: 'Shortlists',
    sub: 'Create a shortlist from the directory',
  },
  signals: {
    url: 'app.relay · intelligence',
    pill: 'Intelligence',
    title: 'Intelligence',
    sub: 'Latest fintech articles and data points',
  },
}

type Criterion = {
  label: string
  kind: 'min' | 'max' | 'prefer'
  value: (p: Provider) => number
  display: (p: Provider) => string
  prefer?: (p: Provider) => boolean
}

const CRITERIA: Criterion[] = [
  {
    label: 'Fee (EU→LATAM)',
    kind: 'min',
    value: (p) => p.feeFromBps,
    display: (p) => formatFeeFromBps(p.feeFromBps),
  },
  {
    label: 'Median settlement',
    kind: 'min',
    value: (p) => p.medianSettleMinutes,
    display: (p) => p.settleLabel,
  },
  {
    label: 'Corridors in scope',
    kind: 'max',
    value: (p) => p.corridorsInScope,
    display: (p) => `${p.corridorsInScope} of ${p.corridorsScopeTotal}`,
  },
  {
    label: 'Licence model',
    kind: 'prefer',
    value: () => 0,
    display: (p) => p.licenceModel,
    prefer: (p) => p.licenceModel === 'EMI direct',
  },
  {
    label: 'Payout success rate',
    kind: 'max',
    value: (p) => p.successRatePct ?? 0,
    display: (p) => (p.successRatePct != null ? `${p.successRatePct}%` : '—'),
  },
]

function bestFlags(cols: Provider[], criterion: Criterion): boolean[] {
  if (criterion.kind === 'prefer') {
    return cols.map((p) => Boolean(criterion.prefer?.(p)))
  }
  const values = cols.map(criterion.value)
  const target = criterion.kind === 'min' ? Math.min(...values) : Math.max(...values)
  return values.map((v) => v === target)
}

/**
 * Product window for the cost-of-guessing chapter — same chrome and
 * canvases as the signed-in workspace, cropped into the landing column.
 */
export default function LandingIntelPreview({
  scene,
  direction,
  reduceMotion,
}: {
  scene: IntelSceneId
  direction: number
  reduceMotion: boolean
}) {
  const chrome = CHROME[scene]
  const variants = {
    enter: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, y: dir > 0 ? 18 : -18 },
    center: { opacity: 1, y: 0 },
    exit: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, y: dir > 0 ? -14 : 14 },
  }

  return (
    <div className="intel-window" aria-label={`Relay workspace — ${chrome.pill}`}>
      <div className="intel-browser" aria-hidden>
        <span className="intel-traffic intel-traffic--close" />
        <span className="intel-traffic intel-traffic--min" />
        <span className="intel-traffic intel-traffic--max" />
        <span className="intel-url">
          <span className="intel-url-lock" />
          {chrome.url}
        </span>
      </div>

      <div className="relay intel-dash">
        <div className="relay-glow" />
        <header className="relay-topbar">
          <div className="relay-logo">
            <RelayMark />
          </div>
          <nav className="relay-pills" aria-hidden>
            {PILLS.map((name) => (
              <span
                key={name}
                className={`relay-pill${name === chrome.pill ? ' relay-pill--on' : ''}`}
              >
                {name}
                {name === 'Shortlists' ? <span className="relay-pill-badge">12</span> : null}
              </span>
            ))}
          </nav>
          <div className="relay-topbar-right">
            <span className="relay-account">
              <span className="relay-avatar">N</span>
            </span>
          </div>
        </header>

        <div className="relay-main">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={scene}
              className="relay-page"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: EASE }}
            >
              <div className="relay-hd">
                <div>
                  <h3 className="relay-hd-title">{chrome.title}</h3>
                  <div className="relay-hd-sub">{chrome.sub}</div>
                </div>
                <SceneActions scene={scene} />
              </div>
              {scene === 'discover' ? <DiscoverScene /> : null}
              {scene === 'research' ? <ResearchScene /> : null}
              {scene === 'act' ? <ActScene /> : null}
              {scene === 'signals' ? <SignalsScene /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="intel-dash-fade" aria-hidden />
      </div>
    </div>
  )
}

function SceneActions({ scene }: { scene: IntelSceneId }) {
  const { openWaitlist } = useWaitlist()

  if (scene === 'discover') {
    return null
  }

  if (scene === 'research') {
    return (
      <div className="relay-hd-actions">
        <button type="button" className="relay-btn relay-btn--outline" onClick={openWaitlist}>
          Export PDF
        </button>
        <button type="button" className="relay-btn relay-btn--lime" onClick={openWaitlist}>
          Request 2 intros
        </button>
      </div>
    )
  }

  if (scene === 'act') {
    return (
      <div className="relay-hd-actions">
        <button type="button" className="relay-btn relay-btn--white" onClick={openWaitlist}>
          Compare 4
        </button>
      </div>
    )
  }

  return (
    <div className="relay-hd-actions">
      <button type="button" className="relay-btn relay-btn--outline" onClick={openWaitlist}>
        Follow my corridors
      </button>
    </div>
  )
}

function DiscoverScene() {
  const { openWaitlist } = useWaitlist()
  const { providers, categoryCards } = useCatalog()
  const cats = categoryCards.slice(0, 2)
  const dirRows = providers.slice(0, 4)
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(slug: string, next: boolean) {
    setChecked((prev) => {
      const copy = new Set(prev)
      if (next) copy.add(slug)
      else copy.delete(slug)
      return copy
    })
  }

  return (
    <>
      <div className="relay-cats">
        {cats.map((c) => (
          <button type="button" key={c.id} className="relay-cat" onClick={openWaitlist}>
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
          </button>
        ))}
      </div>

      <div className="relay-panel relay-panel--20 intel-dir-panel">
        <div className="relay-th relay-th--dir intel-th-dir">
          <span />
          <span>PROVIDER</span>
          <span>FEE</span>
          <span>SETTLE</span>
          <span style={{ textAlign: 'right' }}>SCORE</span>
        </div>
        <div className="relay-rows">
          {dirRows.length === 0 ? (
            <p className="relay-empty-hint">No providers in the catalog yet.</p>
          ) : (
            dirRows.map((p) => {
            const on = checked.has(p.slug)
            const score = computeScore(p, DEFAULT_WEIGHTING)
            return (
              <div key={p.slug} className={`relay-row relay-row--dir intel-row-dir${on ? ' relay-row--on' : ''}`}>
                <CheckBox checked={on} label={`Select ${p.name}`} onChange={(next) => toggle(p.slug, next)} />
                <div>
                  <div className="relay-prov-name">
                    <span>{p.name}</span>
                    {on ? <span className="relay-flag relay-flag--lime">IN TRAY</span> : null}
                  </div>
                  <div className="relay-meta">{p.hq}</div>
                </div>
                <span className="relay-fee">{formatFeeFromBps(p.feeFromBps)}</span>
                <span className="relay-settle">{p.settleLabel}</span>
                <span className="relay-dir-score">{score}</span>
              </div>
            )
          })
          )}
        </div>
      </div>
    </>
  )
}

function ResearchScene() {
  const { openWaitlist } = useWaitlist()
  const { providers } = useCatalog()
  const cols = providers.slice(0, 2) as Provider[]

  return (
    <div className="relay-matrix intel-matrix">
      {cols.length < 2 ? (
        <p className="relay-empty-hint">Add two providers in admin to preview compare.</p>
      ) : null}
      <div className="relay-matrix-head">
        <div className="relay-matrix-crit">CRITERION</div>
        {cols.map((p, i) => (
          <div key={p.slug} className={`relay-matrix-col${i === 0 ? ' relay-matrix-col--hi' : ''}`}>
            <div className="relay-matrix-col-name">{p.name.replace(' Payments', '')}</div>
            <div className="relay-matrix-col-score">
              <strong>{computeScore(p, DEFAULT_WEIGHTING)}</strong>
              <span>SCORE</span>
            </div>
          </div>
        ))}
      </div>
      <div className="relay-matrix-body">
        {CRITERIA.map((row) => {
          const flags = bestFlags(cols, row)
          return (
            <div className="relay-matrix-row" key={row.label}>
              <div className="relay-matrix-label">{row.label}</div>
              {cols.map((p, i) => (
                <div key={p.slug} className={`relay-matrix-cell${flags[i] ? ' relay-matrix-cell--best' : ''}`}>
                  {row.display(p)}
                </div>
              ))}
            </div>
          )
        })}
      </div>
      <div className="relay-matrix-foot">
        <div className="relay-matrix-foot-label">Next step</div>
        {cols.map((p, i) => (
          <div key={p.slug} className={`relay-matrix-cta ${i === 0 ? 'relay-matrix-cta--lime' : 'relay-matrix-cta--mute'}`}>
            <button type="button" onClick={openWaitlist}>
              {i === 0 ? 'Request intro' : 'Keep on list'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActScene() {
  const { openWaitlist } = useWaitlist()
  const { providers } = useCatalog()
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const rows = providers.slice(0, 4)

  return (
    <div className="relay-panel">
      <div className="relay-rfp-head">
        <div>
          <div className="relay-rfp-title">
            <span>Shortlists</span>
          </div>
          <div className="relay-rfp-sub">
            {rows.length ? `${rows.length} from the catalog` : 'Empty until providers are added'}
          </div>
        </div>
        <button type="button" className="relay-btn relay-btn--white relay-btn--sm" onClick={openWaitlist}>
          Request intros
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
        {rows.length === 0 ? (
          <p className="relay-empty-hint">No shortlist rows yet.</p>
        ) : (
          rows.map((p) => {
          const score = computeScore(p, DEFAULT_WEIGHTING)
          const on = checked.has(p.slug)
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
              <span className="relay-fee">{formatFeeFromBps(p.feeFromBps || null)}</span>
              <div className="relay-status">
                <span className="relay-status-dot" style={{ background: 'rgba(255,255,255,.5)' }} />
                <span className="relay-status-label" style={{ color: 'rgba(255,255,255,.5)' }}>
                  {statusLabel('waiting', 'catalog')}
                </span>
              </div>
              <span className="relay-score" style={{ color: score >= 80 ? '#fff' : 'rgba(255,255,255,.75)' }}>
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
            See the delta →
          </button>
        </div>
      </div>
    </div>
  )
}

function SignalsScene() {
  const { openWaitlist } = useWaitlist()

  return (
    <>
      <div className="relay-intel-top intel-signals-top">
        <div className="relay-featured">
          <div className="relay-featured-kicker">MARKET MAP</div>
          <h2>
            The world moves $35 trillion a day. Fintech handles a tenth of it — and the payout layer compounds
            fastest.
          </h2>
          <div className="relay-featured-foot">
            <button type="button" className="relay-featured-btn" onClick={openWaitlist}>
              Read the map
            </button>
            <span className="relay-featured-meta">Research note</span>
          </div>
        </div>
        <div className="relay-index">
          <div className="relay-index-head">
            Fee index · your corridors
            <span>EMPTY</span>
          </div>
          <p className="relay-empty-hint">No fee history until providers are listed.</p>
        </div>
      </div>

      <div className="relay-bottom intel-signals-bottom">
        <div className="relay-panel" style={{ flex: 1 }}>
          <div className="relay-activity-head">
            <span>Activity</span>
            <span className="relay-badge relay-badge--live">
              <LiveDot size="sm" />
              LIVE
            </span>
          </div>
          <div className="relay-rows">
            <p className="relay-empty-hint">No activity yet.</p>
          </div>
        </div>
        <div className="relay-intel-mini">
          <div className="relay-intel-kicker">
            <span>INTELLIGENCE · MARKET MAPS</span>
          </div>
          <div className="relay-intel-body">
            <div className="relay-intel-stat">
              <strong>—</strong>
              <span>
                live catalog
                <br />
                in directory
              </span>
            </div>
            <div className="relay-intel-rule" />
            <div>
              <div className="relay-intel-hook">Add providers in admin to populate intelligence and compare.</div>
              <div className="relay-intel-cta">
                <button type="button" className="relay-link" onClick={openWaitlist}>
                  Join waitlist →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
