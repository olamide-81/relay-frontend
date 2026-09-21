'use client'

import { useMemo } from 'react'
import { cardsFrom, useCatalog } from '@/components/dashboard/CatalogContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import type { Provider } from '@/lib/relay/types'

export function takeVisible<T>(items: T[], limit: number | 'all'): T[] {
  if (limit === 'all') return items
  return items.slice(0, Math.max(0, limit))
}

export function useVisibleProviders() {
  const { providers, loading, getProvider, getRecord, records } = useCatalog()
  const { entitlements, isPro, plan } = usePlan()
  const visible: Provider[] = useMemo(
    () => takeVisible(providers, entitlements.catalogVisible),
    [providers, entitlements.catalogVisible]
  )
  const categoryCards = useMemo(() => cardsFrom(visible), [visible])
  const hiddenCount = Math.max(0, providers.length - visible.length)
  return {
    providers: visible,
    allProviders: providers,
    catalogTotal: providers.length,
    hiddenCount,
    capped: !isPro && hiddenCount > 0,
    limit: entitlements.catalogVisible,
    compareSlots: entitlements.compareSlots,
    plan,
    isPro,
    loading,
    getProvider,
    getRecord,
    categoryCards,
    records,
  }
}
