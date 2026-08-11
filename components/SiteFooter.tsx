'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useWaitlist } from '@/components/WaitlistModal'
import Reveal from '@/components/Reveal'
import './home.css'

const CALENDLY =
  'https://calendly.com/gratebridgelabs/30min?month=2026-08'

/**
 * Cinema footer — only real destinations. No dead Blog / Press / Careers.
 */
export default function SiteFooter() {
  const t = useTranslations()
  const { openWaitlist } = useWaitlist()

  return (
    <footer className="footer footer--cinema" id="footer">
      <div className="footer-glow" aria-hidden />
      <div className="footer-inner">
        <Reveal>
          <div className="footer-closing">
            <h2 className="footer-closing-title">{t('footer.closing')}</h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="footer-main">
            <div className="footer-brand">
              <Link href="/" className="footer-brand-lockup">
                <Image
                  src="/relaydark.png"
                  alt={t('images.logoAlt')}
                  width={36}
                  height={36}
                  className="footer-brand-icon"
                />
                <span className="footer-brand-mark">{t('nav.brandMark')}</span>
              </Link>
            </div>

            <nav className="footer-cols" aria-label={t('footer.sitemapLabel')}>
              <div className="footer-col">
                <div className="footer-group">
                  <h4>{t('footer.product')}</h4>
                  <Link href="/#providers">{t('footer.providers')}</Link>
                  <Link href="/#directory">{t('footer.howItWorks')}</Link>
                  <Link href="/reports">{t('footer.reports')}</Link>
                  <button type="button" className="footer-link-btn" onClick={openWaitlist}>
                    {t('footer.joinWaitlist')}
                  </button>
                </div>
              </div>

              <div className="footer-col">
                <div className="footer-group">
                  <h4>{t('footer.resources')}</h4>
                  <Link href="/reports">{t('footer.researchPapers')}</Link>
                  <Link href="/methodology">{t('footer.methodology')}</Link>
                  <Link href="/about">{t('footer.about')}</Link>
                </div>
                <div className="footer-group">
                  <h4>{t('footer.support')}</h4>
                  <a href="mailto:support@relay.app">{t('footer.supportEmail')}</a>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.contactSales')}
                  </a>
                </div>
              </div>

              <div className="footer-col">
                <div className="footer-group">
                  <h4>{t('footer.account')}</h4>
                  <Link href="/signin">{t('footer.signIn')}</Link>
                  <Link href="/signup">{t('footer.createAccount')}</Link>
                </div>
                <div className="footer-group">
                  <h4>{t('footer.language')}</h4>
                  <LocaleSwitcher
                    className="footer-locale"
                    variant="footer"
                    label={t('footer.language')}
                  />
                </div>
              </div>
            </nav>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="footer-base">
            <div className="footer-bottom">
              <div className="footer-legal-line">
                <span>{t('footer.copyright')}</span>
                <Link href="/privacy">{t('footer.privacy')}</Link>
                <Link href="/terms">{t('footer.terms')}</Link>
              </div>
            </div>
            <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
          </div>
        </Reveal>
      </div>

      <div className="footer-wordmark-band" aria-hidden>
        <div className="footer-wordmark">{t('nav.brand')}</div>
      </div>
    </footer>
  )
}
