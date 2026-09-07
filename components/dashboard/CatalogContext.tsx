'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { listCatalog } from '@/lib/catalog/api'
import { toUiProvider, type CatalogRecord } from '@/lib/catalog/map'
import type { Category, CategoryCardData, Provider } from '@/lib/relay/types'
import { formatFeeFromBps } from '@/lib/relay/format'

type CatalogValue = {
  records: CatalogRecord[]
  providers: Provider[]
  loading: boolean
  getProvider: (slug: string) => Provider | undefined
  getRecord: (slug: string) => CatalogRecord | undefined
  refresh: () => Promise<void>
  categoryCards: CategoryCardData[]
}

const CatalogContext = createContext<CatalogValue | null>(null)

const CAT_COPY: Record<Category, { name: string; short: string }> = {
  payouts: { name: 'Payouts', short: 'Disbursements, mass pay, cross-border' },
  collections: { name: 'Collections', short: 'Acceptance, invoicing, receivables' },
  fx: { name: 'FX', short: 'Rates, hedging, multi-currency rails' },
  other: { name: 'Others', short: 'Banking, cards, identity, compliance' },
}

function cardsFrom(providers: Provider[]): CategoryCardData[] {
  return (Object.keys(CAT_COPY) as Category[]).map((id, i) => {
    const list = providers.filter((p) => p.category === id)
    const fees = list.map((p) => p.feeFromBps).filter((n) => n > 0)
    const settles = list.map((p) => p.settleLabel).filter((s) => s && s !== '—')
    const minFee = fees.length ? Math.min(...fees) : null
    return {
      id,
      name: CAT_COPY[id].name,
      short: CAT_COPY[id].short,
      n: list.length,
      feeFrom: minFee != null ? formatFeeFromBps(minFee) : '—',
      settle: settles[0] ?? '—',
      live: list.length ? `${list.length} listed` : 'None listed yet',
      delta: '—',
      deltaTone: 'flat',
      sparkSeed: 7 + i * 20,
      sparkDir: 'flat',
    }
  })
}

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<CatalogRecord[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const next = await listCatalog()
      setRecords(next)
    } catch {
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const providers = useMemo(() => records.map(toUiProvider), [records])
  const bySlug = useMemo(() => new Map(providers.map((p) => [p.slug, p])), [providers])
  const byId = useMemo(() => new Map(records.map((r) => [r.id, r])), [records])
  const categoryCards = useMemo(() => cardsFrom(providers), [providers])

  const value = useMemo<CatalogValue>(
    () => ({
      records,
      providers,
      loading,
      getProvider: (slug) => bySlug.get(slug),
      getRecord: (slug) => byId.get(slug),
      refresh,
      categoryCards,
    }),
    [records, providers, loading, bySlug, byId, refresh, categoryCards]
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
