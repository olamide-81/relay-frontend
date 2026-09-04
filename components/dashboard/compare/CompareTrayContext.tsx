'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProvider } from '@/lib/mock/relay'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'

const TRAY_KEY = 'relay-compare-tray'
const TRAY_EVENT = 'relay-tray-change'
const HARD_CAP = 4
const DEFAULT_TRAY = ['nordbridge', 'kestrel', 'avenir']

function readTray(): string[] {
  if (typeof window === 'undefined') return DEFAULT_TRAY
  try {
    const raw = sessionStorage.getItem(TRAY_KEY)
    if (!raw) return DEFAULT_TRAY
    const parsed = JSON.parse(raw) as string[]
    return parsed.filter((slug) => Boolean(getProvider(slug))).slice(0, HARD_CAP)
  } catch {
    return DEFAULT_TRAY
  }
}

function writeTray(ids: string[]) {
  sessionStorage.setItem(TRAY_KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event(TRAY_EVENT))
}

type CompareTrayValue = {
  ids: string[]
  pendingSlug: string | null
  setPendingSlug: (slug: string | null) => void
  has: (slug: string) => boolean
  toggle: (slug: string) => void
  selectMany: (slugs: string[], selected: boolean) => void
  remove: (slug: string) => void
  clear: () => void
  replace: (outSlug: string, inSlug: string) => void
  setAll: (ids: string[]) => void
}

const CompareTrayContext = createContext<CompareTrayValue | null>(null)

export function CompareTrayProvider({ children }: { children: React.ReactNode }) {
  const { entitlements, isPro } = usePlan()
  const { openGate } = useGate()
  const [ids, setIds] = useState<string[]>([])
  const [pendingSlug, setPendingSlug] = useState<string | null>(null)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem(TRAY_KEY) : null
    if (stored) {
      setIds(readTray())
      return
    }
    const initial = DEFAULT_TRAY.slice(0, Math.min(DEFAULT_TRAY.length, entitlements.compareSlots))
    setIds(initial)
    sessionStorage.setItem(TRAY_KEY, JSON.stringify(initial))
  }, [entitlements.compareSlots])

  const persist = useCallback((next: string[]) => {
    const unique = Array.from(new Set(next)).slice(0, HARD_CAP)
    setIds(unique)
    writeTray(unique)
  }, [])

  const has = useCallback((slug: string) => ids.includes(slug), [ids])

  const remove = useCallback(
    (slug: string) => persist(ids.filter((s) => s !== slug)),
    [ids, persist]
  )

  const replace = useCallback(
    (outSlug: string, inSlug: string) => {
      persist(ids.map((s) => (s === outSlug ? inSlug : s)))
      setPendingSlug(null)
    },
    [ids, persist]
  )

  const setAll = useCallback(
    (next: string[]) => persist(next),
    [persist]
  )

  const toggle = useCallback(
    (slug: string) => {
      if (ids.includes(slug)) {
        persist(ids.filter((s) => s !== slug))
        return
      }
      const cap = entitlements.compareSlots
      if (ids.length >= cap) {
        if (!isPro) {
          openGate('compare.slot_limit')
          return
        }
        if (ids.length >= HARD_CAP) {
          setPendingSlug(slug)
          return
        }
      }
      persist([...ids, slug])
    },
    [ids, entitlements.compareSlots, isPro, openGate, persist]
  )

  const selectMany = useCallback(
    (slugs: string[], selected: boolean) => {
      if (!selected) {
        persist(ids.filter((s) => !slugs.includes(s)))
        return
      }
      const cap = entitlements.compareSlots
      const next = [...ids]
      for (const slug of slugs) {
        if (next.includes(slug)) continue
        if (next.length >= cap) {
          if (!isPro) {
            openGate('compare.slot_limit')
            break
          }
          if (next.length >= HARD_CAP) {
            setPendingSlug(slug)
            break
          }
        }
        next.push(slug)
      }
      persist(next)
    },
    [ids, entitlements.compareSlots, isPro, openGate, persist]
  )

  const clear = useCallback(() => persist([]), [persist])

  const value = useMemo(
    () => ({ ids, pendingSlug, setPendingSlug, has, toggle, selectMany, remove, clear, replace, setAll }),
    [ids, pendingSlug, has, toggle, selectMany, remove, clear, replace, setAll]
  )

  return <CompareTrayContext.Provider value={value}>{children}</CompareTrayContext.Provider>
}

export function useCompareTray() {
  const ctx = useContext(CompareTrayContext)
  if (!ctx) throw new Error('useCompareTray must be used within CompareTrayProvider')
  return ctx
}
