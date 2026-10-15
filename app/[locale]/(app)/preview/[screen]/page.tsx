import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import PreviewScreen from '@/components/relay-app/PreviewScreen'

const SCREENS = ['dashboard', 'overview', 'inbox', 'directory', 'providers', 'compare', 'shortlists', 'requests', 'intelligence', 'profile', 'settings', 'provider'] as const
type Screen = (typeof SCREENS)[number]

type Props = { params: Promise<{ locale: string; screen: string }> }

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function Page({ params }: Props) {
  const { locale, screen } = await params
  if (!SCREENS.includes(screen as Screen)) notFound()
  setRequestLocale(locale)
  return <PreviewScreen screen={screen as Screen} />
}
