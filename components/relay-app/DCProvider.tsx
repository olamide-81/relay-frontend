'use client'

import { DCLocaleContext } from '@/lib/dc/runtime'

export default function DCProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  return <DCLocaleContext.Provider value={locale}>{children}</DCLocaleContext.Provider>
}
