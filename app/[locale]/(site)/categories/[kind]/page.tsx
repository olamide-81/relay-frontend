import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import RelayCategory from '@/components/relay/RelayCategory'
import { CATEGORY_META } from '@/lib/dc/meta'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; kind: string }> }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => Object.keys(CATEGORY_META).map((kind) => ({ locale, kind })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, kind } = await params
  const c = CATEGORY_META[kind]
  if (!c) return {}
  return buildMetadata({
    locale,
    path: `/categories/${kind}`,
    title: `${c.label} Providers | Relay`,
    description: `${c.label}. ${c.tag} Compare ${c.label} Providers worldwide on Relay.`,
  })
}

export default async function Page({ params }: Props) {
  const { locale, kind } = await params
  if (!CATEGORY_META[kind]) notFound()
  setRequestLocale(locale)
  return <RelayCategory kind={kind} />
}
