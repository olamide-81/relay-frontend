'use client'

import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { useLocale } from 'next-intl'

type WaitlistContextValue = {
  open: boolean
  openWaitlist: () => void
  closeWaitlist: () => void
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null)

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) {
    throw new Error('useWaitlist must be used within WaitlistProvider')
  }
  return ctx
}

/** The legacy pages' "Join waitlist" buttons now open the /waitlist flow. */
export function WaitlistProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const openWaitlist = useCallback(() => window.location.assign(`/${locale}/waitlist`), [locale])
  const closeWaitlist = useCallback(() => {}, [])

  return (
    <WaitlistContext.Provider value={{ open: false, openWaitlist, closeWaitlist }}>{children}</WaitlistContext.Provider>
  )
}
