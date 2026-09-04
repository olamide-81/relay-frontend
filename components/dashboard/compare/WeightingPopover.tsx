'use client'

import { useEffect, useRef } from 'react'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import type { Weighting } from '@/lib/relay/types'

const ROWS: { key: keyof Weighting; label: string }[] = [
  { key: 'feePct', label: 'Fee' },
  { key: 'settlePct', label: 'Settlement speed' },
  { key: 'licencePct', label: 'Licence coverage' },
]

export function useOpenWeighting() {
  const { setOpen } = useWeighting()
  const { entitlements } = usePlan()
  const { openGate } = useGate()
  return () => {
    if (!entitlements.customWeighting) {
      openGate('weighting.custom')
      return
    }
    setOpen(true)
  }
}

export function WeightingPopover() {
  const { weighting, setWeighting, open, setOpen } = useWeighting()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

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
    <div className="relay-wpop" ref={ref} role="dialog" aria-labelledby="relay-wpop-title">
      <div className="relay-wpop-hd">
        <span id="relay-wpop-title">Score weighting</span>
        <span className="relay-wpop-sum">100%</span>
      </div>
      {ROWS.map((row) => (
        <div className="relay-wpop-row" key={row.key}>
          <div className="relay-wpop-lab">
            <label htmlFor={`wpop-${row.key}`}>{row.label}</label>
            <output>{weighting[row.key]}%</output>
          </div>
          <input
            id={`wpop-${row.key}`}
            type="range"
            min={0}
            max={100}
            value={weighting[row.key]}
            onChange={(e) => onSlide(row.key, Number(e.target.value))}
          />
        </div>
      ))}
      <p className="relay-wpop-note">
        Changing weights re-sorts the list and every score in Relay. Saved per shortlist.
      </p>
    </div>
  )
}
