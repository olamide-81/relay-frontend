'use client'

import { use } from 'react'
import RequestCanvas from '@/components/dashboard/RequestCanvas'

export default function IntroSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  return <RequestCanvas slug={slug} />
}
