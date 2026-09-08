'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { listIntros, listShortlists } from '@/lib/api/workspace'
import { WORKSPACE_EVENT } from '@/lib/workspace'

type WorkspaceCounts = {
  providers: number
  shortlists: number
  shortlistEntries: number
  intros: number
  loading: boolean
  refresh: () => void
}

const Ctx = createContext<WorkspaceCounts | null>(null)

export function WorkspaceCountsProvider({ children }: { children: React.ReactNode }) {
  const { providers } = useCatalog()
  const [shortlists, setShortlists] = useState(0)
  const [shortlistEntries, setShortlistEntries] = useState(0)
  const [intros, setIntros] = useState(0)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    void Promise.all([
      listShortlists()
        .then((result) => {
          const lists = result.shortlists ?? []
          setShortlists(lists.length)
          setShortlistEntries(lists.reduce((n, list) => n + list.entries.length, 0))
        })
        .catch(() => {
          setShortlists(0)
          setShortlistEntries(0)
        }),
      listIntros()
        .then((result) => setIntros((result.intros ?? []).length))
        .catch(() => setIntros(0)),
    ]).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(WORKSPACE_EVENT, refresh)
    return () => window.removeEventListener(WORKSPACE_EVENT, refresh)
  }, [refresh])

  const value = useMemo<WorkspaceCounts>(
    () => ({
      providers: providers.length,
      shortlists,
      shortlistEntries,
      intros,
      loading,
      refresh,
    }),
    [providers.length, shortlists, shortlistEntries, intros, loading, refresh]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useWorkspaceCounts(): WorkspaceCounts {
  const ctx = useContext(Ctx)
  return (
    ctx ?? {
      providers: 0,
      shortlists: 0,
      shortlistEntries: 0,
      intros: 0,
      loading: true,
      refresh: () => {},
    }
  )
}
