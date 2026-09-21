'use client'

import { useParams } from 'next/navigation'
import IntelligenceReportCanvas from '@/components/dashboard/IntelligenceReportCanvas'

export default function IntelligenceReportPage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  return <IntelligenceReportCanvas slug={slug} />
}
