import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelaySecurity from '@/components/relay/RelaySecurity'
import { pageMetadata } from '@/lib/dc/meta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/security')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RelaySecurity />
}
