'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './home.css'

/**
 * micro1-grade footer — closing line, brand + logo, stacked link groups,
 * legal row clear of the oversized watermark band.
 */
export default function SiteFooter() {
  const t = useTranslations()

  return (
    <footer className="footer footer--cinema" id="footer">
      <div className="footer-glow" aria-hidden />
      <div className="footer-inner">
        <div className="footer-closing">
          <h2 className="footer-closing-title">{t('footer.closing')}</h2>
        </div>

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
                <Link href="/#directory">{t('footer.directory')}</Link>
                <Link href="/#research">{t('footer.reports')}</Link>
                <Link href="/signup">{t('footer.requestAccess')}</Link>
                <Link href="/#directory">{t('footer.compare')}</Link>
              </div>
              <div className="footer-group">
                <h4>{t('footer.categories')}</h4>
                <Link href="/#directory">{t('footer.kyc')}</Link>
                <Link href="/#directory">{t('footer.payments')}</Link>
                <Link href="/#directory">{t('footer.payouts')}</Link>
                <Link href="/#directory">{t('footer.fx')}</Link>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-group">
                <h4>{t('footer.resources')}</h4>
                <Link href="/reports">{t('footer.intelligence')}</Link>
                <a href="#">{t('footer.benchmarks')}</a>
                <a href="#">{t('footer.methodology')}</a>
                <Link href="/#directory">{t('footer.providerDirectory')}</Link>
              </div>
              <div className="footer-group">
                <h4>{t('footer.support')}</h4>
                <a href="mailto:support@relay.app">{t('footer.supportEmail')}</a>
                <a href="#footer">{t('footer.contact')}</a>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-group">
                <h4>{t('footer.company')}</h4>
                <a href="#">{t('footer.about')}</a>
                <a href="#">{t('footer.blog')}</a>
                <a href="#">{t('footer.press')}</a>
                <a href="#">{t('footer.careers')}</a>
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

        <div className="footer-base">
          <div className="footer-bottom">
            <div className="footer-legal-line">
              <span>{t('footer.copyright')}</span>
              <a href="#">{t('footer.sitemap')}</a>
              <a href="#">{t('footer.legalCenter')}</a>
            </div>

            <div className="footer-social">
              <a href="#" aria-label={t('footer.socialX')} className="footer-social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
              <a href="#" aria-label={t('footer.socialLinkedIn')} className="footer-social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <a href="#" aria-label={t('footer.socialGitHub')} className="footer-social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-wordmark-band" aria-hidden>
        <div className="footer-wordmark">{t('nav.brand')}</div>
      </div>
    </footer>
  )
}
