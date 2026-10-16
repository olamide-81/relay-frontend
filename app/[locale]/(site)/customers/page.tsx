import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelayCustomers from '@/components/relay/RelayCustomers'
import { pageMetadata } from '@/lib/dc/meta'
import PageJsonLd from '@/components/relay-app/PageJsonLd'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/customers')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <PageJsonLd path="/customers" />
      <RelayCustomers />
    </>
  )
}
