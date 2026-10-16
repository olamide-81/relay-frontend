import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/dc/meta'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, '/forgot-password')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
