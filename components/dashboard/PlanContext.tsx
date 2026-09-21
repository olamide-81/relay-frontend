'use client'

import { createContext, useContext, useMemo } from 'react'
import { isSubscribed, type SessionUser } from '@/lib/session'
import { ENTITLEMENTS, isProPlan, type PlanId } from '@/lib/entitlements'
import { readStoredPlan } from '@/lib/plans'
import { useSession } from '@/hooks/useSession'

export function planFromUser(user: SessionUser | null): PlanId {
  if (!user || !isSubscribed(user)) return 'free'
  const stored = readStoredPlan()
  if (stored === 'pro' || stored === 'proMax') return stored
  const email = user.email.toLowerCase()
  if (email === 'promax@relay.dev' || email === 'team@relay.dev') return 'proMax'
  return 'pro'
}

type PlanContextValue = {
  plan: PlanId
  isPro: boolean
  entitlements: (typeof ENTITLEMENTS)[PlanId]
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const plan = planFromUser(user)
  const value = useMemo(
    () => ({ plan, isPro: isProPlan(plan), entitlements: ENTITLEMENTS[plan] }),
    [plan]
  )
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlan must be used within PlanProvider')
  return ctx
}

export function useOptionalPlan() {
  return useContext(PlanContext)
}
