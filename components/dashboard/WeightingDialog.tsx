'use client'

import { useWeighting } from '@/components/dashboard/WeightingContext'
import type { Weighting } from '@/lib/relay/types'

const ROWS: { key: keyof Weighting; label: string }[] = [
  { key: 'feePct', label: 'FEE' },
  { key: 'settlePct', label: 'SETTLE' },
  { key: 'licencePct', label: 'LICENCE' },
]

export function WeightingDialog() {
  const { weighting, setWeighting, open, setOpen } = useWeighting()
  if (!open) return null

  const onSlide = (key: keyof Weighting, value: number) => {
    const restKeys = ROWS.map((r) => r.key).filter((k) => k !== key)
    const remaining = Math.max(0, 100 - value)
    const restSum = restKeys.reduce((s, k) => s + weighting[k], 0) || 1
    const next: Weighting = { ...weighting, [key]: value }
    restKeys.forEach((k, i) => {
      if (i === restKeys.length - 1) {
        next[k] = remaining - restKeys.slice(0, -1).reduce((s, rk) => s + next[rk], 0)
      } else {
        next[k] = Math.round((weighting[k] / restSum) * remaining)
      }
    })
    setWeighting(next)
  }

  return (
    <div className="relay-modal-back" onClick={() => setOpen(false)}>
      <div
        className="relay-modal"
        role="dialog"
        aria-labelledby="weighting-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="weighting-title">Edit weighting</h2>
        <p>Score is fee, settlement and licence coverage — reweighted live across the directory.</p>
        {ROWS.map((row) => (
          <div className="relay-weight-row" key={row.key}>
            <label htmlFor={`w-${row.key}`}>{row.label}</label>
            <input
              id={`w-${row.key}`}
              type="range"
              min={0}
              max={100}
              value={weighting[row.key]}
              onChange={(e) => onSlide(row.key, Number(e.target.value))}
            />
            <output>{weighting[row.key]}</output>
          </div>
        ))}
        <div className="relay-modal-actions">
          <button type="button" className="relay-btn relay-btn--outline" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
