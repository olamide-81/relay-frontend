import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    locale,
    title: 'Google sign-in | Relay',
    description: 'Finishing Google sign-in.',
    path: '/auth/google/callback',
    noIndex: true,
  })
}

export default function GoogleCallbackLayout({ children }: { children: React.ReactNode }) {
  return children
}
