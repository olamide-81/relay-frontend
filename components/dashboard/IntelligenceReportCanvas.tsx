'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { GatedPanel } from '@/components/dashboard/gate/GatedPanel'
import { LockIcon } from '@/components/dashboard/gate/ProBadge'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps } from '@/lib/relay/format'
import { getProvider } from '@/lib/mock/relay'
import {
  keyNumbers,
  lockedLines,
  reportChart,
  reportProviderSlugs,
  reportStats,
  reportToc,
} from '@/lib/mock/addendum'

export default function IntelligenceReportCanvas() {
  const { weighting } = useWeighting()
  const { setAll } = useCompareTray()
  const { isPro, entitlements } = usePlan()
  const { openGate } = useGate()
  const [saved, setSaved] = useState(false)
  const [active, setActive] = useState('headline')
  const named = reportProviderSlugs.map((slug) => getProvider(slug)).filter(Boolean)
  const compareIds = reportProviderSlugs.slice(0, 4)

  const onToc = (id: string, locked: boolean) => {
    if (locked && !isPro) {
      openGate('report.locked_sections')
      return
    }
    setActive(id)
    document.getElementById(`report-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relay-page relay-page--report">
      <div className="relay-report-util">
        <span>Intelligence · Market maps</span>
        <button type="button">Share</button>
        <button type="button" onClick={() => setSaved(true)}>
          {saved ? 'Saved' : 'Save to reading list'}
        </button>
      </div>

      <div className="relay-report-grid">
        <nav className="relay-toc" aria-label="Contents">
          <div className="relay-toc-kicker">CONTENTS</div>
          {reportToc.map((t) => {
            const locked = t.locked && !isPro
            const on = active === t.id
            return (
              <button
                key={t.id}
                type="button"
                className={`relay-toc-item${on ? ' relay-toc-item--on' : ''}`}
                onClick={() => onToc(t.id, t.locked)}
              >
                <span className="relay-toc-n">{t.n}</span>
                <span>{t.name}</span>
                {locked ? <LockIcon size={11} stroke="oklch(.86 .13 80)" /> : null}
              </button>
            )
          })}
          <div className="relay-toc-prog">
            <div>
              <i style={{ width: isPro ? '100%' : '42%' }} />
            </div>
            <span>{isPro ? '100% · COMPLETE' : '42% · 16 MIN LEFT'}</span>
          </div>
        </nav>

        <article className="relay-article">
          <div className="relay-article-kicker">MARKET MAP · 04 / 2026</div>
          <h1 id="report-headline">
            The world moves $35 trillion a day. Fintech handles a tenth of it — and the payout layer compounds fastest.
          </h1>
          <div className="relay-byline">
            <strong>Relay Research</strong>
            <span>21 Aug 2026</span>
            <span>28 min read</span>
            <em>14 MARKETS · 38 CORRIDORS</em>
          </div>
          <div className="relay-article-stats">
            {reportStats.map((s) => (
              <div key={s.v}>
                <strong>{s.v}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p>
            Daily global transaction volume passed $35 trillion in 2025, and the share touched by a fintech rail rather
            than a correspondent bank crossed 10% for the first time. The headline is unremarkable. What matters is
            where that share is concentrated: not in card acceptance, which is mature and price-compressed, but in
            payouts — the leg of the chain where the incumbent cost base is highest and the customer&apos;s tolerance
            for delay is lowest.
          </p>
          <blockquote>
            Payout fees fell 24bps on EU→LATAM in eighteen months. Every basis point came out of an intermediary, not a
            margin.
          </blockquote>
          <h2 id="report-compression">Where the compression is happening</h2>
          <p>
            Corridor-level pricing tells a cleaner story than category averages. Of the 38 corridors we track, 24 saw
            median payout fees fall over the last four quarters; nine were flat; five rose, all of them in markets
            where a licensing change added a compliance cost that providers passed through.
          </p>
          <figure className="relay-fig" id="report-corridor">
            <div className="relay-fig-cap">
              <span>FIG 1 · MEDIAN PAYOUT FEE INDEX</span>
              <span>Q3 2024 — Q2 2026</span>
            </div>
            <div className="relay-fig-bars">
              {reportChart.map((b, i) => (
                <div key={b.label}>
                  <i className={i >= 6 ? 'relay-fig-bar--lime' : ''} style={{ height: `${b.h}%` }} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </figure>

          {isPro ? (
            <>
              <h2 id="report-mix">What this means for your corridor mix</h2>
              <p>
                On the six corridors in Northwind&apos;s payout RFP, median fees fell in five. EU→Brazil compressed 24
                bps; EU→Mexico 19 bps. The exception is EU→India, where a new local-partner requirement added 6 bps of
                landed cost.
              </p>
              <h2 id="report-exposure">Provider exposure</h2>
              <p>
                Nordbridge, Kestrel and Avenir together cover 31 of the 38 corridors in this map. Palma is the only
                named provider with native LATAM origination. The appendix lists every licensed entity by corridor.
              </p>
              <h2 id="report-appendix">Data appendix</h2>
              <p>Full corridor time series, licence register snapshot and methodology notes are included with Pro.</p>
            </>
          ) : (
            <div id="report-mix">
              <GatedPanel
                locked
                variant="light"
                blur={5}
                headline="The remaining 3 sections model this against your own corridor mix."
                sub="Corridor-level forecasts, provider exposure and the full data appendix. Included in Pro, from $499/month."
                cta="Unlock with Pro"
                secondary={{ label: 'See plans', href: '/dashboard/plans' }}
                onUnlock={() => openGate('report.locked_sections')}
              >
                <h2>What this means for your corridor mix</h2>
                <div className="relay-locked-lines">
                  {lockedLines.map((w) => (
                    <div key={w} style={{ width: w }} />
                  ))}
                </div>
              </GatedPanel>
            </div>
          )}
        </article>

        <aside className="relay-report-side">
          <div className="relay-dpanel relay-dpanel--flush">
            <div className="relay-dpanel-head">
              <span>Named in this report</span>
              <span className="relay-dpanel-meta">5</span>
            </div>
            {named.map((p) =>
              p ? (
                <Link href={`/dashboard/providers/${p.slug}`} className="relay-named" key={p.slug}>
                  <span>{p.name}</span>
                  <em>{formatFeeFromBps(p.feeFromBps)}</em>
                  <strong>{computeScore(p, weighting)}</strong>
                </Link>
              ) : null
            )}
            <Link
              href={`/dashboard/compare?ids=${compareIds.join(',')}`}
              className="relay-btn relay-btn--lime relay-named-cta"
              onClick={(e) => {
                if (!isPro && compareIds.length > entitlements.compareSlots) {
                  e.preventDefault()
                  openGate('compare.slot_limit')
                  return
                }
                setAll([...compareIds])
              }}
            >
              Compare all five
            </Link>
          </div>

          <div className="relay-dpanel">
            <h3>Key numbers</h3>
            <div className="relay-keys">
              {keyNumbers.map((k) => (
                <div key={k.v}>
                  <strong className={`relay-keys--${k.tone}`}>{k.v}</strong>
                  <span>{k.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relay-next">
            <div>NEXT IN SERIES</div>
            <p>Collections in Southeast Asia: why acceptance costs stopped falling</p>
            <span>Publishing 4 Sep · 22 min</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
