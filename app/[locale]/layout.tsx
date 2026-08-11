import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { WaitlistProvider } from '@/components/WaitlistModal'
import JsonLd from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld'
import '../globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default
  const seo = messages.seo as {
    title: string
    description: string
    keywords: string[]
  }

  return {
    ...buildMetadata({
      locale,
      title: seo.title,
      description: seo.description,
      path: '/',
      keywords: seo.keywords,
      titleTemplate: true,
    }),
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
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale)]} />
        <NextIntlClientProvider messages={messages}>
          <WaitlistProvider>{children}</WaitlistProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
