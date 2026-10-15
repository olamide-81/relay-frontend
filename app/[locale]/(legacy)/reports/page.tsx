import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import ReportsHub from '@/components/ReportsHub'
import JsonLd from '@/components/JsonLd'
import { getDataReports } from '@/data/reports'
import { breadcrumbJsonLd, researchIndexJsonLd } from '@/lib/jsonld'
import { buildMetadata } from '@/lib/seo'
import '@/components/report-hub.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default
  const seo = messages.seo.reports as {
    title: string
    description: string
    keywords: string[]
  }

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: '/reports',
    keywords: seo.keywords,
  })
}

export default async function ReportsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('dataReports')
  const reports = getDataReports(locale)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: 'Relay', path: '/' },
              { name: t('papersTitle'), path: '/reports' },
            ],
            locale,
          ),
          researchIndexJsonLd(
            locale,
            reports.map((r) => ({
              title: r.seoTitle ?? r.title,
              description: r.seoDescription ?? r.excerpt,
              slug: r.slug,
              datePublished: r.publishedAt,
            })),
          ),
        ]}
      />
      <div className="dr-page">
        <div className="rph-hero">
          <h1>{t('papersTitle')}</h1>
          <p>{t('indexLede')}</p>
          <p className="rph-hero-count">
            {t('reportsPublished', { count: reports.length })}
          </p>
        </div>

        <ReportsHub />
      </div>
    </>
  )
}
