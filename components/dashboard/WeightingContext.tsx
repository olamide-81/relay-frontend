'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { clampWeighting, DEFAULT_WEIGHTING } from '@/lib/relay/score'
import type { Weighting } from '@/lib/relay/types'

const WEIGHT_KEY = 'relay-weighting'

function readWeighting(): Weighting {
  if (typeof window === 'undefined') return DEFAULT_WEIGHTING
  try {
    const raw = sessionStorage.getItem(WEIGHT_KEY)
    return raw ? clampWeighting(JSON.parse(raw) as Weighting) : DEFAULT_WEIGHTING
  } catch {
    return DEFAULT_WEIGHTING
  }
}

type WeightingContextValue = {
  weighting: Weighting
  setWeighting: (next: Weighting) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const WeightingContext = createContext<WeightingContextValue | null>(null)

export function WeightingProvider({ children }: { children: React.ReactNode }) {
  const [weighting, setWeightingState] = useState<Weighting>(readWeighting)
  const [open, setOpen] = useState(false)

  const setWeighting = useCallback((next: Weighting) => {
    const clamped = clampWeighting(next)
    setWeightingState(clamped)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(WEIGHT_KEY, JSON.stringify(clamped))
    }
  }, [])

  const value = useMemo(
    () => ({ weighting, setWeighting, open, setOpen }),
    [weighting, setWeighting, open]
  )

  return <WeightingContext.Provider value={value}>{children}</WeightingContext.Provider>
}

export function useWeighting() {
  const ctx = useContext(WeightingContext)
  if (!ctx) throw new Error('useWeighting must be used within WeightingProvider')
  return ctx
}
