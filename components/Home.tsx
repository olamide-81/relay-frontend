'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/heroes/Hero'
import Highlights from '@/components/Highlights'
import DataReportsSection from '@/components/DataReportsSection'
import './home.css'

export default function Home() {
  const t = useTranslations()
  const [bannerOpen, setBannerOpen] = useState(true)
  const [showFloat, setShowFloat] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 280)
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

      <SiteNav />

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

      <SiteFooter />

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
