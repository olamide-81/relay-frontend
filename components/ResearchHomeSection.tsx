'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { dataReports } from '@/data/reports'
import ReportPaperCard from '@/components/ReportPaperCard'
import Reveal from '@/components/Reveal'
import './research-home.css'

/**
 * Landing reports preview — research-paper card grid.
 */
export default function ResearchHomeSection() {
  const t = useTranslations('dataReports')
  const cards = [...dataReports]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 6)

  return (
    <section className="rh" id="research" aria-labelledby="rh-title">
      <div className="rh-inner">
        <Reveal>
          <header className="rh-head rh-head--row">
            <div>
              <h2 className="rh-title" id="rh-title">
                {t('papersTitle')}
              </h2>
              <p className="rh-lede">{t('lede')}</p>
            </div>
            <Link href="/reports" className="rh-cta rh-cta--inline">
              <span>{t('ctaClean')}</span>
              <span className="rh-cta-icon" aria-hidden>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5h5.5M5.5 2.5L8 5 5.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </header>
        </Reveal>

        <div className="rh-paper-grid">
          {cards.map((report, i) => (
            <Reveal key={report.slug} delay={0.05 * (i % 3)} y={30}>
              <ReportPaperCard report={report} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
