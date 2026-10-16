'use client'

import { DCLocaleContext } from '@/lib/dc/runtime'
import { applySiteContent, type SiteContent } from '@/lib/site-content'

export default function DCProvider({
  locale,
  content,
  children,
}: {
  locale: string
  content?: SiteContent | null
  children: React.ReactNode
}) {
  // Before children render (server and client alike) so both see the same admin-managed content.
  applySiteContent(content)
  return <DCLocaleContext.Provider value={locale}>{children}</DCLocaleContext.Provider>
}
