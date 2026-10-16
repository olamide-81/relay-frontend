import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import RelayCategory from '@/components/relay/RelayCategory'
import { CATEGORY_META, categoryMetadata } from '@/lib/dc/meta'
import PageJsonLd from '@/components/relay-app/PageJsonLd'

type Props = { params: Promise<{ locale: string; kind: string }> }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => Object.keys(CATEGORY_META).map((kind) => ({ locale, kind })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, kind } = await params
  if (!CATEGORY_META[kind]) return {}
  return categoryMetadata(locale, kind)
}

export default async function Page({ params }: Props) {
  const { locale, kind } = await params
  if (!CATEGORY_META[kind]) notFound()
  setRequestLocale(locale)
  const crumbs = [
    { name: 'Relay', path: '/' },
    { name: 'Directory', path: '/directory' },
    { name: CATEGORY_META[kind].label, path: `/categories/${kind}` },
  ]
  return (
    <>
      <PageJsonLd path={`/categories/${kind}`} crumbs={crumbs} />
      <RelayCategory kind={kind} />
    </>
  )
}
