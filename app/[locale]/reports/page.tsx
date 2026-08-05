import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { dataReports, formatReportDate } from '@/data/reports'
import '@/components/data-reports.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dataReports' })
  return {
    title: `${t('indexTitle')} | Relay`,
    description: t('indexLede'),
  }
}

export default async function ReportsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('dataReports')

  return (
    <div className="dr-page">
      <header className="dr-page-nav">
        <div className="dr-page-nav-inner">
          <Link href="/" className="dr-page-brand">
            <Image src="/relaylight.png" alt="" width={28} height={28} />
            <span>Relay</span>
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm">
            {t('getStarted')}
          </Link>
        </div>
      </header>

      <div className="dr-page-hero">
        <p className="dr-kicker">{t('kicker')}</p>
        <h1>{t('indexTitle')}</h1>
        <p>{t('indexLede')}</p>
      </div>

      <div className="dr-page-filters" aria-hidden>
        <span className="dr-filter is-active">{t('filterAll')}</span>
        <span className="dr-filter">Benchmarks</span>
        <span className="dr-filter">Market maps</span>
        <span className="dr-filter">Corridors</span>
        <span className="dr-filter">Vendors</span>
      </div>

      <div className="dr-list">
        {dataReports.map((report) => (
          <Link key={report.slug} href={`/reports/${report.slug}`} className="dr-list-item">
            <div>
              <h2>{report.title}</h2>
              <p>{report.excerpt}</p>
              <div className="dr-list-meta">
                <span>{report.category}</span>
                <span>·</span>
                <span>{report.market}</span>
                <span>·</span>
                <span>{formatReportDate(report.publishedAt)}</span>
                <span>·</span>
                <span>
                  {report.readMinutes} {t('minRead')}
                </span>
              </div>
            </div>
            <div className="dr-list-stat">
              <strong>{report.heroStat.value}</strong>
              <span>{report.heroStat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
