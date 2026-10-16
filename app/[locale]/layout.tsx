import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import DCProvider from '@/components/relay-app/DCProvider'
import '../relay.css'
import JsonLd from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from '@/lib/dc/meta'
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...buildMetadata({
      locale,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: '/',
      keywords: SITE_KEYWORDS,
      englishOnly: true,
    }),
    title: { default: SITE_TITLE, template: '%s | Relay' },
    applicationName: 'Relay',
    appleWebApp: { title: 'Relay', statusBarStyle: 'black-translucent' },
    formatDetection: { telephone: false },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
    verification: {
      // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in production when ready
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale)]} />
      <NextIntlClientProvider messages={messages}>
        <DCProvider locale={locale}>{children}</DCProvider>
      </NextIntlClientProvider>
    </>
  )
}
