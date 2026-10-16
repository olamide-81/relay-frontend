import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import JsonLd from '@/components/JsonLd'
import RelaySiteNav from '@/components/relay/RelaySiteNav'
import RelaySiteFooter from '@/components/relay/RelaySiteFooter'
import RelaySiteCookies from '@/components/relay/RelaySiteCookies'
import ReportArticle from '@/components/relay-app/ReportArticle'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbJsonLd, reportArticleJsonLd } from '@/lib/jsonld'
import { getReportEntries, getReportEntry } from '@/lib/reports'
import { reportLabels, reportView } from '@/lib/report-page'
import type { DataReport } from '@/data/reports'

type Props = { params: Promise<{ locale: string; slug: string }> }

/** Public reports only (config/reports.json), in every language they're written in. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getReportEntries('site', locale).map((r) => ({ locale, slug: r.slug })))
}

function words(r: DataReport) {
  const text = [
    r.overview,
    r.background,
    ...r.findings.flatMap((f) => [f.title, f.body, f.whyItMatters]),
    ...r.sections.flatMap((s) => [s.heading, s.body, ...(s.paragraphs ?? []), ...(s.bullets ?? [])]),
    ...(r.marketContext ?? []),
    ...r.implications,
    r.closing,
  ].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

const ogImage = (slug: string, locale: string) => `/og/report/${slug}?locale=${locale}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const entry = getReportEntry(slug, 'site', locale)
  if (!entry) return {}
  const r = entry.report
  return buildMetadata({
    locale,
    title: r.seoTitle ?? `${r.title} | Relay Research`,
    description: r.seoDescription ?? r.excerpt,
    path: `/reports/${slug}`,
    type: 'article',
    publishedTime: r.publishedAt,
    modifiedTime: r.updatedAt ?? r.publishedAt,
    authors: ['Relay Research'],
    keywords: r.seoKeywords ?? [],
    image: { url: ogImage(slug, locale), width: 1200, height: 630, alt: entry.cardTitle },
  })
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const entry = getReportEntry(slug, 'site', locale)
  if (!entry) notFound()
  const r = entry.report
  const view = reportView(entry, 'site', locale, (s) => `/${locale}/reports/${s}`)
  const labels = await reportLabels(locale, 'Intelligence')
  const path = `/${locale}/reports/${slug}`

  return (
    <>
      <JsonLd
        data={[
          reportArticleJsonLd({
            locale,
            path,
            headline: r.title,
            description: r.seoDescription ?? r.excerpt,
            images: [ogImage(slug, locale), ...(r.heroImage ? [r.heroImage.src] : [])],
            datePublished: r.publishedAt,
            dateModified: r.updatedAt,
            keywords: r.seoKeywords ?? [],
            section: entry.type,
            wordCount: words(r),
          }),
          breadcrumbJsonLd(
            [
              { name: 'Relay', path: '/' },
              { name: 'Intelligence', path: '/intelligence' },
              { name: entry.cardTitle, path: `/reports/${slug}` },
            ],
            locale,
          ),
        ]}
      />
      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'clip', fontFamily: 'Geist,system-ui,sans-serif', color: '#f7f8f8', background: '#0f1011' }}>
        <RelaySiteNav active="intelligence" __hostStyle={{ position: 'sticky', top: '0', zIndex: '50' }} />
        <main>
          <ReportArticle {...view} labels={labels} variant="site" backHref={`/${locale}/intelligence#latest-reports`} />
        </main>
        <RelaySiteFooter />
        <RelaySiteCookies />
      </div>
    </>
  )
}
