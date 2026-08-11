import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default
  const seo = messages.seo.terms as {
    title: string
    description: string
    keywords: string[]
  }

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: '/terms',
    keywords: seo.keywords,
  })
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
