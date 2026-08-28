'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { clampWeighting, DEFAULT_WEIGHTING } from '@/lib/relay/score'
import type { Weighting } from '@/lib/relay/types'

type WeightingContextValue = {
  weighting: Weighting
  setWeighting: (next: Weighting) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const WeightingContext = createContext<WeightingContextValue | null>(null)

export function WeightingProvider({ children }: { children: React.ReactNode }) {
  const [weighting, setWeightingState] = useState<Weighting>(DEFAULT_WEIGHTING)
  const [open, setOpen] = useState(false)

  const setWeighting = useCallback((next: Weighting) => {
    setWeightingState(clampWeighting(next))
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
