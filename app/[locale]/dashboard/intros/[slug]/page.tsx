'use client'

import { use } from 'react'
import RequestCanvas from '@/components/dashboard/RequestCanvas'
import { getProvider } from '@/lib/mock/relay'

export default function IntroSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const provider = getProvider(slug)
  return <RequestCanvas slug={provider ? slug : 'nordbridge'} />
}
