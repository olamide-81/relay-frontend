'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { useOpenWeighting } from '@/components/dashboard/compare/WeightingPopover'
import { computeScore, sortByScore } from '@/lib/relay/score'
import { formatFeeFromBps } from '@/lib/relay/format'
import { categoryMeta, providers } from '@/lib/mock/relay'
import type { Category, CorridorRegion } from '@/lib/relay/types'

type View = 'table' | 'cards'
type FilterKey = 'category' | 'corridor'

const CATEGORY_OPTIONS: { id: Category; label: string }[] = [
  { id: 'payouts', label: 'Payouts' },
  { id: 'collections', label: 'Collections' },
  { id: 'fx', label: 'FX' },
  { id: 'other', label: 'Others' },
]

const CORRIDOR_OPTIONS = [
  { id: 'North America', label: 'North America' },
  { id: 'Europe', label: 'EU' },
  { id: 'UK', label: 'UK' },
  { id: 'Asia Pacific', label: 'Asia' },
  { id: 'Middle East', label: 'Middle East' },
  { id: 'Africa', label: 'Africa' },
  { id: 'Australia', label: 'Australia' },
  { id: 'LATAM', label: 'Latam' },
] as const

export default function DirectoryCanvas() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { weighting } = useWeighting()
  const { has, toggle, selectMany } = useCompareTray()
  const openWeighting = useOpenWeighting()
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()
  const initialCat = (searchParams.get('category') as Category) || 'payouts'

  const [category, setCategory] = useState<Category>(
    CATEGORY_OPTIONS.some((c) => c.id === initialCat) ? initialCat : 'payouts'
  )
  const [corridor, setCorridor] = useState<CorridorRegion>('Europe')
  const [openMenu, setOpenMenu] = useState<FilterKey | null>(null)
  const [view, setView] = useState<View>('table')
  const [limit, setLimit] = useState(7)

  const meta = categoryMeta[category]
  const corridorLabel = CORRIDOR_OPTIONS.find((c) => c.id === corridor)?.label ?? 'EU'

  const rows = useMemo(() => {
    let list =
      category === 'payouts'
        ? providers
        : providers.filter((p) => {
            if (category === 'collections') return ['meridian', 'solano', 'helix', 'nordbridge'].includes(p.slug)
            if (category === 'fx') return ['kestrel', 'avenir', 'palma', 'helix'].includes(p.slug)
            return ['zenith', 'palma', 'helix', 'solano'].includes(p.slug)
          })
    list = list.filter((p) => p.regions.includes(corridor))
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.licenceLabel.toLowerCase().includes(q) ||
          p.hq.toLowerCase().includes(q)
      )
    }
    return sortByScore(list, weighting)
  }, [category, corridor, q, weighting])

  const shown = rows.slice(0, limit)
  const shownSlugs = shown.map((p) => p.slug)
  const allShownOn = shownSlugs.length > 0 && shownSlugs.every((s) => has(s))

  return (
    <div className="relay-page relay-page--directory">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">{meta.title}</h1>
          <div className="relay-hd-sub">
            {rows.length} providers · filtered to {corridorLabel} · scored on your weighting
          </div>
        </div>
        <div className="relay-hd-actions">
          <button type="button" className="relay-weight-btn" onClick={openWeighting}>
            Weighting · fee {weighting.feePct} / settle {weighting.settlePct} / licence {weighting.licencePct}
          </button>
        </div>
      </div>

      <div className="relay-filters">
        <FilterChip
          label="CATEGORY"
          value={CATEGORY_OPTIONS.find((c) => c.id === category)?.label ?? 'Payouts'}
          open={openMenu === 'category'}
          onOpen={() => setOpenMenu(openMenu === 'category' ? null : 'category')}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={opt.id === category ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setCategory(opt.id)
                setOpenMenu(null)
                router.replace(`/dashboard/providers?category=${opt.id}`)
              }}
            >
              {opt.label}
            </button>
          ))}
        </FilterChip>
        <FilterChip
          label="CORRIDOR"
          value={corridorLabel}
          open={openMenu === 'corridor'}
          onOpen={() => setOpenMenu(openMenu === 'corridor' ? null : 'corridor')}
        >
          {CORRIDOR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={opt.id === corridor ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setCorridor(opt.id)
                setOpenMenu(null)
              }}
            >
              {opt.label}
            </button>
          ))}
        </FilterChip>
        <div className="relay-filter-right">
          <div className="relay-toggle">
            <button type="button" className={view === 'table' ? 'relay-toggle--on' : ''} onClick={() => setView('table')}>
              Table
            </button>
            <button type="button" className={view === 'cards' ? 'relay-toggle--on' : ''} onClick={() => setView('cards')}>
              Cards
            </button>
          </div>
        </div>
      </div>

      <div className="relay-panel relay-panel--20" style={{ flex: 1 }}>
        {view === 'table' ? (
          <>
            <div className="relay-th relay-th--dir">
              <CheckBox
                checked={allShownOn}
                label="Select all visible providers"
                onChange={(next) => selectMany(shownSlugs, next)}
              />
              <span>PROVIDER</span>
              <span>FEE</span>
              <span>SETTLE</span>
              <span>LICENCES</span>
              <span>CORRIDOR FIT</span>
              <span style={{ textAlign: 'right' }}>SCORE</span>
            </div>
            <div className="relay-rows">
              {shown.map((p) => {
                const on = has(p.slug)
                const score = computeScore(p, weighting)
                const fitColor = p.corridorFitPct >= 85 ? 'oklch(.78 .17 130)' : 'rgba(255,255,255,.5)'
                return (
                  <div key={p.slug} className={`relay-row relay-row--dir${on ? ' relay-row--tray' : ''}`}>
                    <CheckBox checked={on} label={`Select ${p.name}`} onChange={() => toggle(p.slug)} />
                    <div>
                      <Link href={`/dashboard/providers/${p.slug}`} className="relay-prov-name">
                        <span>{p.name}</span>
                        {on ? (
                          <span className="relay-flag relay-flag--lime">IN TRAY</span>
                        ) : p.flag === 'new' ? (
                          <span className="relay-flag relay-flag--grey">NEW</span>
                        ) : null}
                      </Link>
                      <div className="relay-meta">{p.hq}</div>
                    </div>
                    <span className="relay-fee">{formatFeeFromBps(p.feeFromBps)}</span>
                    <span className="relay-settle">{p.settleLabel}</span>
                    <span className="relay-lic">{p.licenceLabel}</span>
                    <div className="relay-fit">
                      <div className="relay-fit-track">
                        <div className="relay-fit-bar" style={{ width: `${p.corridorFitPct}%`, background: fitColor }} />
                      </div>
                      <span className="relay-fit-pct">{p.corridorFitPct}%</span>
                    </div>
                    <span className="relay-dir-score">{score}</span>
                  </div>
                )
              })}
              <div className="relay-table-foot">
                <span>
                  {shown.length} of {meta.count} · sorted by score
                </span>
                {limit < rows.length || rows.length < meta.count ? (
                  <button type="button" onClick={() => setLimit((n) => n + 8)}>
                    Load more ↓
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <div className="relay-dir-cards">
            {shown.map((p) => (
              <div key={p.slug} className="relay-dir-card">
                <CheckBox
                  checked={has(p.slug)}
                  label={`Select ${p.name}`}
                  onChange={() => toggle(p.slug)}
                />
                <Link href={`/dashboard/providers/${p.slug}`} style={{ minWidth: 0, flex: 1, color: 'inherit' }}>
                  <div className="relay-prov-name">
                    <span>{p.name}</span>
                    {has(p.slug) ? (
                      <span className="relay-flag relay-flag--lime">IN TRAY</span>
                    ) : p.flag === 'new' ? (
                      <span className="relay-flag relay-flag--grey">NEW</span>
                    ) : null}
                  </div>
                  <div className="relay-meta">{p.hq}</div>
                </Link>
                <span className="relay-fee">{formatFeeFromBps(p.feeFromBps)}</span>
                <span className="relay-dir-score">{computeScore(p, weighting)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FilterChip({
  label,
  value,
  open,
  onOpen,
  children,
}: {
  label: string
  value: string
  open: boolean
  onOpen: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relay-filter-menu">
      <button type="button" className="relay-filter relay-filter--on" onClick={onOpen}>
        <span className="relay-filter-label">{label}</span>
        <span className="relay-filter-value">{value}</span>
      </button>
      {open && <div className="relay-filter-pop">{children}</div>}
    </div>
  )
}
