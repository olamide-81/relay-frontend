import type { Metadata } from 'next'
import Home from '@/components/Home'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import { buildMetadata } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default
  const seo = messages.seo as {
    title: string
    description: string
    keywords: string[]
  }

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: '/',
    keywords: seo.keywords,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = (await import(`@/messages/${locale}.json`)).default
  const faq = (messages.seo as { faq?: { question: string; answer: string }[] })
    .faq

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Relay', path: '/' }], locale),
          ...(faq?.length ? [faqJsonLd(faq)] : []),
        ]}
      />
      <Home key={locale} />
    </>
  )
}
