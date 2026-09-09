'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { clampWeighting, DEFAULT_WEIGHTING } from '@/lib/relay/score'
import { getWorkspacePrefs, updateWorkspacePrefs } from '@/lib/api/workspace'
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

function persistLocal(next: Weighting) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(WEIGHT_KEY, JSON.stringify(next))
  }
}

type WeightingContextValue = {
  weighting: Weighting
  setWeighting: (next: Weighting) => void
  saving: boolean
  open: boolean
  setOpen: (open: boolean) => void
}

const WeightingContext = createContext<WeightingContextValue | null>(null)

export function WeightingProvider({ children }: { children: React.ReactNode }) {
  const [weighting, setWeightingState] = useState<Weighting>(readWeighting)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    let cancelled = false
    void getWorkspacePrefs()
      .then((prefs) => {
        if (cancelled || !prefs.weighting) return
        const next = clampWeighting(prefs.weighting)
        setWeightingState(next)
        persistLocal(next)
        loaded.current = true
      })
      .catch(() => {
        loaded.current = true
      })
    return () => {
      cancelled = true
    }
  }, [])

  const setWeighting = useCallback((next: Weighting) => {
    const clamped = clampWeighting(next)
    setWeightingState(clamped)
    persistLocal(clamped)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setSaving(true)
      void updateWorkspacePrefs({ weighting: clamped })
        .catch(() => {})
        .finally(() => setSaving(false))
    }, 450)
  }, [])

  const value = useMemo(
    () => ({ weighting, setWeighting, saving, open, setOpen }),
    [weighting, setWeighting, saving, open]
  )

  return <WeightingContext.Provider value={value}>{children}</WeightingContext.Provider>
}

export function useWeighting() {
  const ctx = useContext(WeightingContext)
  if (!ctx) throw new Error('useWeighting must be used within WeightingProvider')
  return ctx
}
