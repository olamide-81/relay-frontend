'use client'

import { Suspense } from 'react'
import { use } from 'react'
import { notFound } from 'next/navigation'
import ProviderDossierCanvas from '@/components/dashboard/ProviderDossierCanvas'
import { getProvider } from '@/lib/mock/relay'

export default function ProviderDossierPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  if (!getProvider(id)) {
    notFound()
  }

  return (
    <Suspense>
      <ProviderDossierCanvas id={id} />
    </Suspense>
  )
}
