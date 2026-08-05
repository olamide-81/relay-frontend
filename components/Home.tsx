'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import Hero from '@/components/heroes/Hero'
import Highlights from '@/components/Highlights'
import DataReportsSection from '@/components/DataReportsSection'
import './home.css'

export default function Home() {
  const t = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [showFloat, setShowFloat] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setShowFloat(y > 280)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`relay-home ${bannerOpen ? 'has-banner' : ''}`}>
      {bannerOpen && (
        <div className="banner">
          <div className="banner-inner">
            <span className="banner-text">
              <span className="banner-tag">{t('banner.tag')}</span>
              {t('banner.text')}
            </span>
            <Link href="/reports" className="banner-link">
              {t('banner.link')}
            </Link>
            <button
              type="button"
              className="banner-close"
              aria-label={t('banner.dismiss')}
              onClick={() => setBannerOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <Image
              src="/relaylight.png"
              alt={t('images.logoAlt')}
              width={30}
              height={30}
              className="nav-logo"
            />
            <span>{t('nav.brand')}</span>
          </Link>

          <div className="nav-actions">
            <Link href="/signin" className="nav-signin">
              {t('nav.login')}
            </Link>
            <a href="#footer" className="nav-signin nav-hide-sm">
              {t('nav.contactSales')}
            </a>
            <a href="#pricing" className="nav-signin nav-hide-sm">
              {t('nav.pricing')}
            </a>
            <Link href="/signup" className="btn btn-ghost btn-sm">
              {t('nav.getStarted')}
            </Link>
            <LocaleSwitcher
              className="nav-locale"
              variant="nav"
              label={t('nav.languageLabel')}
            />
          </div>
        </div>
      </header>

      <Hero />

      <section className="position">
        <div className="position-inner">
          <p className="position-kicker">{t('position.kicker')}</p>
          <h2 className="position-title">{t('position.title')}</h2>
          <p className="position-lede">{t('position.lede')}</p>
        </div>
      </section>

      <Highlights />

      <DataReportsSection />

      <section className="quote">
        <div className="quote-inner">
          <blockquote className="quote-text">“{t('quote.text')}”</blockquote>
          <p className="quote-cite">{t('quote.cite')}</p>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-top">
                <Image
                  src="/relaylight.png"
                  alt={t('images.logoAlt')}
                  width={30}
                  height={30}
                />
                <span>{t('nav.brand')}</span>
              </div>
              <p className="footer-tagline">{t('footer.tagline')}</p>
              <a href="#" className="footer-status">
                <span className="footer-status-dot" />
                <span className="mono">{t('footer.status')}</span>
              </a>
              <div className="footer-social">
                <a href="#" aria-label={t('footer.socialX')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                  </svg>
                </a>
                <a href="#" aria-label={t('footer.socialLinkedIn')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a href="#" aria-label={t('footer.socialGitHub')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>

            <nav className="footer-links">
              <div>
                <h4 className="mono">{t('footer.product')}</h4>
                <a href="#directory">{t('footer.directory')}</a>
                <a href="#compare">{t('footer.compare')}</a>
                <a href="#intros">{t('footer.introductions')}</a>
                <Link href="/reports">{t('footer.intelligence')}</Link>
                <Link href="/signup">{t('footer.requestAccess')}</Link>
              </div>
              <div>
                <h4 className="mono">{t('footer.categories')}</h4>
                <a href="#directory">{t('footer.kyc')}</a>
                <a href="#directory">{t('footer.payments')}</a>
                <a href="#directory">{t('footer.payouts')}</a>
                <a href="#directory">{t('footer.fx')}</a>
                <a href="#directory">{t('footer.compliance')}</a>
              </div>
              <div>
                <h4 className="mono">{t('footer.resources')}</h4>
                <Link href="/reports">{t('footer.reports')}</Link>
                <a href="#">{t('footer.benchmarks')}</a>
                <a href="#">{t('footer.dispatch')}</a>
                <a href="#directory">{t('footer.providerDirectory')}</a>
                <a href="#">{t('footer.methodology')}</a>
              </div>
              <div>
                <h4 className="mono">{t('footer.company')}</h4>
                <a href="#">{t('footer.about')}</a>
                <a href="#">{t('footer.blog')}</a>
                <a href="#">{t('footer.contact')}</a>
                <a href="#">{t('footer.press')}</a>
              </div>
            </nav>
          </div>

          <div className="footer-disclaimer">
            <LocaleSwitcher
              className="footer-locale"
              variant="footer"
              label={t('footer.language')}
            />
            <p>{t('footer.disclaimer')}</p>
          </div>

          <div className="footer-wordmark" aria-hidden>
            {t('nav.brand')}
          </div>

          <div className="footer-bottom">
            <span className="mono">{t('footer.copyright')}</span>
            <div className="footer-legal mono">
              <a href="#">{t('footer.privacy')}</a>
              <a href="#">{t('footer.terms')}</a>
              <a href="#">{t('footer.security')}</a>
              <a href="#">{t('footer.cookies')}</a>
            </div>
          </div>
        </div>
      </footer>

      <Link
        href="/signup"
        className={`float-cta ${showFloat ? 'is-visible' : ''}`}
      >
        <span className="float-icons" aria-hidden>
          <span className="float-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4 4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="float-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="8" />
              <path d="M4 12h16M12 4c2.4 2.5 3.6 5.2 3.6 8s-1.2 5.5-3.6 8c-2.4-2.5-3.6-5.2-3.6-8s1.2-5.5 3.6-8z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="float-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 14a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
              <path d="M16 14a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
              <path d="M4.5 19c.6-2.2 2.3-3.5 4.5-3.5h1c1 0 1.9.3 2.6.9" strokeLinecap="round" />
              <path d="M19.5 19c-.6-2.2-2.3-3.5-4.5-3.5h-1c-.6 0-1.1.1-1.6.3" strokeLinecap="round" />
            </svg>
          </span>
        </span>
        <span className="float-copy">
          <strong>{t('floatCta.title')}</strong>
          <span>{t('floatCta.subtitle')}</span>
        </span>
        <span className="float-arrow" aria-hidden>
          →
        </span>
      </Link>
    </div>
  )
}
