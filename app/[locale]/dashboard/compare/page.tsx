'use client'

import { Suspense } from 'react'
import CompareCanvas from '@/components/dashboard/CompareCanvas'

export default function ComparePage() {
  return (
    <Suspense>
      <CompareCanvas />
    </Suspense>
  )
}
