'use client'

import { useEffect, useState } from 'react'
import OverviewCanvas from '@/components/dashboard/OverviewCanvas'

export default function OverviewPage() {
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(typeof window !== 'undefined' ? window.location.hash : '')
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#reports') return null

  return <OverviewCanvas />
}
