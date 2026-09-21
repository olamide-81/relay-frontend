'use client'

import { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { CommercialsCompact } from '@/components/dashboard/ui/Commercials'
import { CatalogCap } from '@/components/dashboard/ui/CatalogCap'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { useOpenWeighting } from '@/components/dashboard/compare/WeightingPopover'
import { useVisibleProviders } from '@/hooks/useVisibleProviders'
import { computeScore, sortByScore } from '@/lib/relay/score'
import { commercialPackages } from '@/lib/relay/format'

export default function IntelligenceCanvas() {
  const { weighting } = useWeighting()
  const { has, toggle, ids, setAll } = useCompareTray()
  const openWeighting = useOpenWeighting()
  const { providers, catalogTotal, hiddenCount, capped, compareSlots, loading } = useVisibleProviders()

  const ranked = useMemo(() => sortByScore(providers, weighting), [providers, weighting])
  const selectedHere = ids.filter((id) => ranked.some((p) => p.slug === id))

  return (
    <div className="relay-page relay-page--intelligence">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Intelligence</h1>
          <div className="relay-hd-sub">
            {loading
              ? 'Loading the live catalog…'
              : catalogTotal
                ? `Ranked from the live catalog · compare up to ${compareSlots}`
                : 'Providers appear here as they go live'}
          </div>
        </div>
        <div className="relay-hd-actions">
          <button type="button" className="relay-btn relay-btn--outline" onClick={openWeighting}>
            Edit weighting
          </button>
          {selectedHere.length >= 2 ? (
            <Link
              href={`/dashboard/compare?ids=${selectedHere.join(',')}`}
              className="relay-btn relay-btn--lime"
              onClick={() => setAll(selectedHere)}
            >
              Compare {selectedHere.length}
            </Link>
          ) : null}
        </div>
      </div>

      {capped ? <CatalogCap visible={ranked.length} total={catalogTotal} compareSlots={compareSlots} /> : null}

      <div className="relay-panel relay-panel--dir">
        <div className="relay-dir-head">
          <div>
            <div className="relay-dir-title">Provider list</div>
            <div className="relay-dir-sub">
              {capped
                ? `Showing ${ranked.length} of ${catalogTotal} live · pick up to ${compareSlots} to compare`
                : `${ranked.length} live · scored with your weighting`}
            </div>
          </div>
        </div>

        {ranked.length === 0 ? (
          <EmptyState
            kind="intel"
            compact
            title={loading ? 'Loading providers' : 'No providers live yet'}
            body="Intelligence ranks the same catalog the directory uses. Nothing here is a placeholder."
          />
        ) : (
          <>
            <div className="relay-th relay-th--dir">
              <span />
              <span>PROVIDER</span>
              <span>COMMERCIALS</span>
              <span>SETTLE</span>
              <span>COVERAGE</span>
              <span style={{ textAlign: 'right' }}>SCORE</span>
            </div>
            <div className="relay-rows">
              {ranked.map((p, i) => {
                const on = has(p.slug)
                const score = computeScore(p, weighting)
                return (
                  <div key={p.slug} className={`relay-row relay-row--dir${on ? ' relay-row--tray' : ''}`}>
                    <CheckBox checked={on} label={`Select ${p.name}`} onChange={() => toggle(p.slug)} />
                    <div>
                      <Link href={`/dashboard/intelligence/${p.slug}`} className="relay-prov-name">
                        <span>
                          {i + 1}. {p.name}
                        </span>
                        {on ? <span className="relay-flag relay-flag--lime">IN TRAY</span> : null}
                      </Link>
                      <div className="relay-meta">
                        {p.hq}
                        {p.regions.length ? ` · ${p.regions.slice(0, 3).join(', ')}` : ''}
                      </div>
                    </div>
                    <CommercialsCompact packages={commercialPackages(p)} />
                    <span className="relay-settle">{p.settleLabel}</span>
                    <span className="relay-settle">{p.regions[0] || '—'}</span>
                    <span className="relay-dir-score">{score}</span>
                  </div>
                )
              })}
              <div className="relay-table-foot">
                <span>
                  {ranked.length} visible
                  {hiddenCount ? ` · ${hiddenCount} more on Pro` : ' · live catalog'}
                  {` · ${selectedHere.length} of ${compareSlots} in compare`}
                </span>
                <Link href="/dashboard/providers" className="relay-link">
                  Open directory →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
