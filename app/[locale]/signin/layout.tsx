import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.signin' })

  return buildMetadata({
    locale,
    title: t('metadata.title'),
    description: t('metadata.description'),
    path: '/signin',
    noIndex: true,
  })
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children
}
