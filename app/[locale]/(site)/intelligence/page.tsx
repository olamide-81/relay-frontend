import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelayIntelligencePage from '@/components/relay/RelayIntelligencePage'
import { pageMetadata } from '@/lib/dc/meta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/intelligence')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RelayIntelligencePage />
}
