'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps, formatDurationMinutes, formatVolumeUsd } from '@/lib/relay/format'
import { compareDefaultSlugs, getProvider, hqShort } from '@/lib/mock/relay'
import type { Provider } from '@/lib/relay/types'

type Kind = 'min' | 'max' | 'prefer'

type Criterion = {
  label: string
  kind: Kind
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
    display: (p) => p.settleLabel || formatDurationMinutes(p.medianSettleMinutes),
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
  {
    label: 'Min. monthly volume',
    kind: 'min',
    value: (p) => p.minMonthlyVolumeUsd ?? 0,
    display: (p) => (p.minMonthlyVolumeUsd != null ? formatVolumeUsd(p.minMonthlyVolumeUsd) : '—'),
  },
  {
    label: 'Integration time',
    kind: 'min',
    value: (p) => p.integrationWeeks ?? 0,
    display: (p) => (p.integrationWeeks != null ? `${p.integrationWeeks} weeks` : '—'),
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

export default function CompareCanvas() {
  const searchParams = useSearchParams()
  const { weighting } = useWeighting()
  const cols = useMemo(() => {
    const raw = searchParams.get('ids')
    const slugs = raw ? raw.split(',').filter(Boolean) : [...compareDefaultSlugs]
    const found = slugs.map(getProvider).filter(Boolean) as Provider[]
    return (found.length ? found : compareDefaultSlugs.map(getProvider).filter(Boolean) as Provider[]).slice(0, 4)
  }, [searchParams])

  const pad = 4 - cols.length

  return (
    <div className="relay-page relay-page--compare">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Compare</h1>
          <div className="relay-hd-sub">Q3 payout RFP · EU→LATAM · USD 1M monthly volume</div>
        </div>
        <div className="relay-hd-actions">
          <button type="button" className="relay-btn relay-btn--outline">
            Export PDF
          </button>
          <Link href="/dashboard/intros" className="relay-btn relay-btn--lime">
            Request {Math.min(2, cols.length)} intros
          </Link>
        </div>
      </div>

      <div className="relay-matrix" style={{ gridTemplateColumns: `1.2fr repeat(${Math.max(cols.length, 4)},1fr)` }}>
        <div className="relay-matrix-head">
          <div className="relay-matrix-crit">CRITERION</div>
          {cols.map((p, i) => (
            <div key={p.slug} className={`relay-matrix-col${i < 2 ? ' relay-matrix-col--hi' : ''}`}>
              <div className="relay-matrix-col-name">{p.name.replace(' Payments', '')}</div>
              <div className="relay-matrix-col-hq">{hqShort[p.slug] ?? `${p.hq.split(',')[0]} · ${p.licenceLabel}`}</div>
              <div className="relay-matrix-col-score">
                <strong>{computeScore(p, weighting)}</strong>
                <span>SCORE</span>
              </div>
            </div>
          ))}
          {Array.from({ length: pad }).map((_, i) => (
            <div key={`pad-${i}`} className="relay-matrix-col" />
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
                    <span>{row.display(p)}</span>
                    {flags[i] ? <span className="relay-matrix-best">BEST</span> : null}
                  </div>
                ))}
                {Array.from({ length: pad }).map((_, i) => (
                  <div key={`pad-${i}`} className="relay-matrix-cell" />
                ))}
              </div>
            )
          })}
        </div>
        <div className="relay-matrix-foot">
          <div className="relay-matrix-foot-label">Next step</div>
          {cols.map((p, i) => (
            <div key={p.slug} className={`relay-matrix-cta ${i < 2 ? 'relay-matrix-cta--lime' : 'relay-matrix-cta--mute'}`}>
              {i < 2 ? (
                <Link href={`/dashboard/intros/${p.slug}`}>Request intro</Link>
              ) : (
                <Link href="/dashboard/shortlists">Keep on list</Link>
              )}
            </div>
          ))}
          {Array.from({ length: pad }).map((_, i) => (
            <div key={`pad-${i}`} className="relay-matrix-cta" />
          ))}
        </div>
      </div>
    </div>
  )
}
