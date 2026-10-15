'use client'

import { useEffect, useState } from 'react'

/** Renders children only after mount (screens that read the URL or session on first render). */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false)
  useEffect(() => setOn(true), [])
  return on ? <>{children}</> : null
}
