import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelayProduct from '@/components/relay/RelayProduct'
import { pageMetadata } from '@/lib/dc/meta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/product')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RelayProduct />
}
