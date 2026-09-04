'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { GateId } from '@/lib/gates'
import { usePlan } from '@/components/dashboard/PlanContext'

const SHOWN_KEY = 'relay-gates-shown'

function readShown(): GateId[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem(SHOWN_KEY)
    return raw ? (JSON.parse(raw) as GateId[]) : []
  } catch {
    return []
  }
}

function writeShown(ids: GateId[]) {
  sessionStorage.setItem(SHOWN_KEY, JSON.stringify(ids))
}

export type GateVars = { name?: string; count?: number }

type GateState = { id: GateId; vars?: GateVars } | null

type GateContextValue = {
  gate: GateState
  openGate: (id: GateId, vars?: GateVars) => boolean
  closeGate: (reason?: 'dismiss' | 'convert') => void
}

const GateContext = createContext<GateContextValue | null>(null)

export function GateProvider({ children }: { children: React.ReactNode }) {
  const { isPro, plan } = usePlan()
  const [gate, setGate] = useState<GateState>(null)

  const openGate = useCallback(
    (id: GateId, vars?: GateVars) => {
      if (id !== 'seats.invite' && isPro) return false
      if (id === 'seats.invite' && plan === 'team') return false
      const shown = readShown()
      if (shown.includes(id)) return false
      writeShown([...shown, id])
      setGate({ id, vars })
      console.info('[relay:gate]', { event: 'open', gate_id: id, provider: vars?.name ?? null })
      return true
    },
    [isPro, plan]
  )

  const closeGate = useCallback((reason: 'dismiss' | 'convert' = 'dismiss') => {
    setGate((current) => {
      if (current) {
        console.info('[relay:gate]', {
          event: reason,
          gate_id: current.id,
          provider: current.vars?.name ?? null,
        })
      }
      return null
    })
  }, [])

  const value = useMemo(() => ({ gate, openGate, closeGate }), [gate, openGate, closeGate])
  return <GateContext.Provider value={value}>{children}</GateContext.Provider>
}

export function useGate() {
  const ctx = useContext(GateContext)
  if (!ctx) throw new Error('useGate must be used within GateProvider')
  return ctx
}
