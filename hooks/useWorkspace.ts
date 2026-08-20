'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  getCompareList,
  getIntroRequests,
  getShortlist,
  WORKSPACE_EVENT,
  type IntroRequest,
} from '@/lib/workspace'

export function useWorkspace() {
  const [shortlist, setShortlist] = useState<string[]>([])
  const [compare, setCompare] = useState<string[]>([])
  const [intros, setIntros] = useState<IntroRequest[]>([])

  const refresh = useCallback(() => {
    setShortlist(getShortlist())
    setCompare(getCompareList())
    setIntros(getIntroRequests())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(WORKSPACE_EVENT, refresh)
    return () => window.removeEventListener(WORKSPACE_EVENT, refresh)
  }, [refresh])

  return { shortlist, compare, intros, refresh }
}
