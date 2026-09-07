'use client'

import { Suspense } from 'react'
import { use } from 'react'
import ProviderDossierCanvas from '@/components/dashboard/ProviderDossierCanvas'

export default function ProviderDossierPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <Suspense>
      <ProviderDossierCanvas id={id} />
    </Suspense>
  )
}
