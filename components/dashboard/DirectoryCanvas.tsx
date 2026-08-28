'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { computeScore, sortByScore } from '@/lib/relay/score'
import { formatFeeFromBps } from '@/lib/relay/format'
import { categoryMeta, providers } from '@/lib/mock/relay'
import type { Category } from '@/lib/relay/types'

type View = 'table' | 'cards'
type FilterKey = 'category' | 'corridor' | 'licence' | 'fee'

const CATEGORY_OPTIONS: { id: Category; label: string }[] = [
  { id: 'payouts', label: 'Payouts' },
  { id: 'collections', label: 'Collections' },
  { id: 'fx', label: 'FX' },
  { id: 'other', label: 'Others' },
]

const CORRIDOR_OPTIONS = ['EU→LATAM', 'Intra-EU', 'UK→NG', 'All']
const LICENCE_OPTIONS = ['EMI or MTL', 'Any']
const FEE_OPTIONS = ['0.40%', '0.50%', 'Any']

export default function DirectoryCanvas() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { weighting } = useWeighting()
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()
  const initialCat = (searchParams.get('category') as Category) || 'payouts'

  const [category, setCategory] = useState<Category>(
    CATEGORY_OPTIONS.some((c) => c.id === initialCat) ? initialCat : 'payouts'
  )
  const [corridor, setCorridor] = useState('EU→LATAM')
  const [licence, setLicence] = useState('EMI or MTL')
  const [fee, setFee] = useState('0.40%')
  const [active, setActive] = useState<Record<FilterKey, boolean>>({
    category: true,
    corridor: true,
    licence: false,
    fee: false,
  })
  const [openMenu, setOpenMenu] = useState<FilterKey | 'add' | null>(null)
  const [view, setView] = useState<View>('table')
  const [selected, setSelected] = useState<string[]>(['nordbridge', 'kestrel', 'avenir'])
  const [limit, setLimit] = useState(8)

  const meta = categoryMeta[category]

  const rows = useMemo(() => {
    let list =
      category === 'payouts'
        ? providers
        : providers.filter((p) => {
            if (category === 'collections') return ['meridian', 'solano', 'helix', 'nordbridge'].includes(p.slug)
            if (category === 'fx') return ['kestrel', 'avenir', 'palma', 'helix'].includes(p.slug)
            return ['zenith', 'palma', 'helix', 'solano'].includes(p.slug)
          })
    if (active.licence && licence === 'EMI or MTL') {
      list = list.filter((p) => p.licences.includes('EMI') || p.licences.includes('MTL'))
    }
    if (active.fee && fee !== 'Any') {
      const cap = fee === '0.40%' ? 40 : 50
      list = list.filter((p) => p.feeFromBps <= cap)
    }
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.licenceLabel.toLowerCase().includes(q) ||
          p.hq.toLowerCase().includes(q)
      )
    }
    return sortByScore(list, weighting)
  }, [category, active, licence, fee, q, weighting])

  const shown = rows.slice(0, limit)

  const toggleSelect = (slug: string, next: boolean) => {
    setSelected((prev) => {
      if (next) return prev.includes(slug) ? prev : [...prev, slug]
      return prev.filter((s) => s !== slug)
    })
  }

  const compareHref =
    selected.length > 0
      ? `/dashboard/compare?ids=${selected.join(',')}`
      : '/dashboard/compare'

  return (
    <div className="relay-page relay-page--directory">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">{meta.title}</h1>
          <div className="relay-hd-sub">
            {meta.count} providers · {meta.corridors} corridors · median fee {meta.medianFee}
          </div>
        </div>
        <div className="relay-hd-actions">
          <button type="button" className="relay-btn relay-btn--outline">
            Save this view
          </button>
          <Link
            href={compareHref}
            className="relay-btn relay-btn--white"
            aria-disabled={selected.length === 0}
            onClick={(e) => {
              if (selected.length === 0) e.preventDefault()
            }}
            style={selected.length === 0 ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
          >
            Compare {selected.length} selected
          </Link>
        </div>
      </div>

      <div className="relay-filters">
        <FilterChip
          label="CATEGORY"
          value={CATEGORY_OPTIONS.find((c) => c.id === category)?.label ?? 'Payouts'}
          on={active.category}
          open={openMenu === 'category'}
          onToggle={() => setActive((a) => ({ ...a, category: !a.category }))}
          onOpen={() => setOpenMenu(openMenu === 'category' ? null : 'category')}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={opt.id === category ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setCategory(opt.id)
                setActive((a) => ({ ...a, category: true }))
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
          value={corridor}
          on={active.corridor}
          open={openMenu === 'corridor'}
          onToggle={() => setActive((a) => ({ ...a, corridor: !a.corridor }))}
          onOpen={() => setOpenMenu(openMenu === 'corridor' ? null : 'corridor')}
        >
          {CORRIDOR_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={opt === corridor ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setCorridor(opt)
                setActive((a) => ({ ...a, corridor: opt !== 'All' }))
                setOpenMenu(null)
              }}
            >
              {opt}
            </button>
          ))}
        </FilterChip>
        <FilterChip
          label="LICENCE"
          value={licence}
          on={active.licence}
          open={openMenu === 'licence'}
          onToggle={() => setActive((a) => ({ ...a, licence: !a.licence }))}
          onOpen={() => setOpenMenu(openMenu === 'licence' ? null : 'licence')}
        >
          {LICENCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={opt === licence ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setLicence(opt)
                setActive((a) => ({ ...a, licence: opt !== 'Any' }))
                setOpenMenu(null)
              }}
            >
              {opt}
            </button>
          ))}
        </FilterChip>
        <FilterChip
          label="FEE ≤"
          value={fee}
          on={active.fee}
          open={openMenu === 'fee'}
          onToggle={() => setActive((a) => ({ ...a, fee: !a.fee }))}
          onOpen={() => setOpenMenu(openMenu === 'fee' ? null : 'fee')}
        >
          {FEE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={opt === fee ? 'relay-filter-pop--on' : ''}
              onClick={() => {
                setFee(opt)
                setActive((a) => ({ ...a, fee: opt !== 'Any' }))
                setOpenMenu(null)
              }}
            >
              {opt}
            </button>
          ))}
        </FilterChip>
        <div className="relay-filter-menu">
          <button
            type="button"
            className="relay-filter relay-filter--add"
            onClick={() => setOpenMenu(openMenu === 'add' ? null : 'add')}
          >
            + Add filter
          </button>
          {openMenu === 'add' && (
            <div className="relay-filter-pop">
              {(['licence', 'fee'] as FilterKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive((a) => ({ ...a, [key]: true }))
                    setOpenMenu(key)
                  }}
                >
                  {key === 'licence' ? 'Licence' : 'Fee ceiling'}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relay-filter-right">
          <span className="relay-weight-readout">
            fee {weighting.feePct} · settle {weighting.settlePct} · licence {weighting.licencePct}
          </span>
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
              <span />
              <span>PROVIDER</span>
              <span>FEE</span>
              <span>SETTLE</span>
              <span>LICENCES</span>
              <span>CORRIDOR FIT</span>
              <span style={{ textAlign: 'right' }}>SCORE</span>
            </div>
            <div className="relay-rows">
              {shown.map((p) => {
                const on = selected.includes(p.slug)
                const score = computeScore(p, weighting)
                const fitColor = p.corridorFitPct >= 85 ? 'oklch(.78 .17 130)' : 'rgba(255,255,255,.5)'
                return (
                  <div key={p.slug} className={`relay-row relay-row--dir${on ? ' relay-row--on' : ''}`}>
                    <CheckBox checked={on} label={`Select ${p.name}`} onChange={(next) => toggleSelect(p.slug, next)} />
                    <div>
                      <Link href={`/dashboard/providers/${p.slug}`} className="relay-prov-name">
                        <span>{p.name}</span>
                        {p.flag === 'shortlisted' && <span className="relay-flag relay-flag--lime">SHORTLISTED</span>}
                        {p.flag === 'new' && <span className="relay-flag relay-flag--grey">NEW</span>}
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
                  checked={selected.includes(p.slug)}
                  label={`Select ${p.name}`}
                  onChange={(next) => toggleSelect(p.slug, next)}
                />
                <Link href={`/dashboard/providers/${p.slug}`} style={{ minWidth: 0, flex: 1, color: 'inherit' }}>
                  <div className="relay-prov-name">
                    <span>{p.name}</span>
                    {p.flag === 'shortlisted' && <span className="relay-flag relay-flag--lime">SHORTLISTED</span>}
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
  on,
  open,
  onToggle,
  onOpen,
  children,
}: {
  label: string
  value: string
  on: boolean
  open: boolean
  onToggle: () => void
  onOpen: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relay-filter-menu">
      <button
        type="button"
        className={`relay-filter${on ? ' relay-filter--on' : ''}`}
        onClick={onOpen}
        onDoubleClick={onToggle}
      >
        <span className="relay-filter-label">{label}</span>
        <span className="relay-filter-value">{value}</span>
      </button>
      {open && <div className="relay-filter-pop">{children}</div>}
    </div>
  )
}
