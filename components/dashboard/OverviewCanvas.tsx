'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { Sparkline } from '@/components/dashboard/ui/Sparkline'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps, statusLabel } from '@/lib/relay/format'
import {
  activityFeed,
  categoryCards,
  getProvider,
  hqShort,
  overviewKpis,
  shortlists,
} from '@/lib/mock/relay'

const RFP = shortlists[0]
const DEFAULT_CHECKED = new Set(['nordbridge', 'kestrel', 'avenir'])

export default function OverviewCanvas() {
  const { weighting } = useWeighting()
  const [checked, setChecked] = useState<Set<string>>(DEFAULT_CHECKED)

  return (
    <div className="relay-page">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Overview</h1>
          <div className="relay-hd-sub">210 providers · 38 corridors · 14 markets</div>
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
          <Link href="/dashboard/providers" className="relay-btn relay-btn--chip">
            All 210 ↗
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
                <span>Q3 payout RFP</span>
                <span className="relay-badge relay-badge--warn">CLOSES IN 6D</span>
              </div>
              <div className="relay-rfp-sub">4 shortlisted · 2 replied · 1 missing pricing</div>
            </div>
            <Link href="/dashboard/compare?ids=nordbridge,kestrel,avenir,solano" className="relay-btn relay-btn--white relay-btn--sm">
              Compare 4
            </Link>
          </div>
          <div className="relay-th relay-th--rfp">
            <span />
            <span>PROVIDER</span>
            <span>FEE</span>
            <span>STATUS</span>
            <span style={{ textAlign: 'right' }}>SCORE</span>
          </div>
          <div className="relay-rows">
            {RFP.entries.map((entry) => {
              const p = getProvider(entry.slug)
              if (!p) return null
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
                    <div className="relay-meta">{hqShort[p.slug] ?? `${p.hq.split(',')[0]} · ${p.licenceLabel}`}</div>
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
            <div className="relay-rfp-foot">
              <LiveDot />
              <p>Kestrel came back 22bps under Avenir on EU→LATAM, 14 minutes ago.</p>
              <Link href="/dashboard/compare?ids=nordbridge,kestrel,avenir,solano" className="relay-link">
                See the delta →
              </Link>
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
              <span className="relay-activity-date">Fri 28 Aug</span>
            </div>
            <div className="relay-rows">
              {activityFeed.map((a) => (
                <div className="relay-feed-row" key={a.at}>
                  <span className="relay-feed-time">{a.at}</span>
                  <div>
                    <div className="relay-feed-text">{a.text}</div>
                    <div className="relay-feed-meta">{a.meta}</div>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/intelligence" className="relay-feed-more">
                All activity →
              </Link>
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
                  $35 trillion moves daily. Fintech handles more of it every quarter — and the payout layer
                  compounds fastest.
                </div>
                <div className="relay-intel-cta">
                  <Link href="/dashboard/intelligence/fintech-35-trillion-daily" className="relay-link">
                    Read the map →
                  </Link>
                  <span>2 more this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
