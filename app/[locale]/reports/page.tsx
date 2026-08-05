import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import ReportsHub from '@/components/ReportsHub'
import { dataReports } from '@/data/reports'
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
      <div className="dr-page-hero">
        <p className="dr-kicker">{t('kicker')}</p>
        <h1>{t('indexTitle')}</h1>
        <p>{t('indexLede')}</p>
        <p className="dr-page-hero-count">
          {t('reportsPublished', { count: dataReports.length })}
        </p>
      </div>

      <ReportsHub />
    </div>
  )
}
