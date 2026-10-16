import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RelayDirectoryPage from '@/components/relay/RelayDirectoryPage'
import { pageMetadata } from '@/lib/dc/meta'
import PageJsonLd from '@/components/relay-app/PageJsonLd'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/directory')
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <PageJsonLd path="/directory" />
      <RelayDirectoryPage />
    </>
  )
}
