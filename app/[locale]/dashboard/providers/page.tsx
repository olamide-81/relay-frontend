'use client'

import { Suspense } from 'react'
import DirectoryCanvas from '@/components/dashboard/DirectoryCanvas'

export default function DirectoryPage() {
  return (
    <Suspense>
      <DirectoryCanvas />
    </Suspense>
  )
}
