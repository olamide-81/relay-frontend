import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelayForProviders from '@/components/relay/RelayForProviders'
import { pageMetadata } from '@/lib/dc/meta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/for-providers')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RelayForProviders />
}
