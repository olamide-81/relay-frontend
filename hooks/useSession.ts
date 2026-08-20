'use client'

import { useCallback, useEffect, useState } from 'react'
import { getSession, type Session, type SessionUser } from '@/lib/session'

export function useSession() {
  const [session, setSessionState] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => {
    setSessionState(getSession())
    setReady(true)
  }, [])

  useEffect(() => {
    refresh()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'relay-session') refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  return {
    session,
    user: session?.user ?? null,
    ready,
    refresh,
  }
}

export function useUser(): SessionUser | null {
  const { user } = useSession()
  return user
}
