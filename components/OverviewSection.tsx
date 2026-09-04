'use client'

import { useTranslations } from 'next-intl'
import { useWaitlist } from '@/components/WaitlistModal'
import LandingDashboardPreview from '@/components/LandingDashboardPreview'
import Reveal from '@/components/Reveal'
import { calendlyUrl } from '@/lib/api/config'
import '@/components/dashboard/relay.css'
import './overview.css'

/**
 * Landing product section: marketing intro + live-looking workspace window.
 * Header actions use the same relay-btn variants as OverviewCanvas.
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
                className="relay-btn relay-btn--outline"
                onClick={openWaitlist}
              >
                {t('ctaSecondary')}
              </button>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relay-btn relay-btn--white"
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
