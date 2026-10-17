import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = { title: 'Relay', robots: { index: false, follow: false } }

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return null
}
