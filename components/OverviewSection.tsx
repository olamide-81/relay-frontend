'use client'

import { useTranslations } from 'next-intl'
import { useWaitlist } from '@/components/WaitlistModal'
import LandingDashboardPreview from '@/components/LandingDashboardPreview'
import Reveal from '@/components/Reveal'
import './overview.css'

const CALENDLY =
  'https://calendly.com/gratebridgelabs/30min?month=2026-08'

/**
 * Landing product section: marketing intro + live-looking workspace window.
 */
export default function OverviewSection() {
  const t = useTranslations('overview')
  const { openWaitlist } = useWaitlist()

  return (
    <section className="ov" id="providers" aria-labelledby="ov-title">
      <div className="ov-inner">
        <Reveal>
          <header className="ov-top">
            <div className="ov-greeting">
              <p className="ov-kicker">{t('kicker')}</p>
              <h2 className="ov-title" id="ov-title">
                {t('greeting')}
              </h2>
              <p className="ov-lede">{t('lede')}</p>
            </div>
            <div className="ov-actions">
              <button
                type="button"
                className="ov-btn ov-btn--ghost"
                onClick={openWaitlist}
              >
                {t('ctaSecondary')}
              </button>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="ov-btn ov-btn--primary"
              >
                {t('ctaPrimary')}
              </a>
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.08} y={36}>
          <LandingDashboardPreview />
        </Reveal>
      </div>
    </section>
  )
}
