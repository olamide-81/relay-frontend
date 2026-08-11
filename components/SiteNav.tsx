'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useWaitlist } from '@/components/WaitlistModal'
import './home.css'

type Props = {
  /** Force the floating pill treatment (use on non-hero pages). */
  solid?: boolean
}

/**
 * Cinema nav — same links everywhere: Providers, Reports, Contact sales.
 * Overlay on home hero; dark glass pill when scrolled or on solid pages.
 */
export default function SiteNav({ solid = false }: Props) {
  const t = useTranslations()
  const { openWaitlist } = useWaitlist()
  const [scrolled, setScrolled] = useState(solid)

  useEffect(() => {
    if (solid) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  const overlay = !solid && !scrolled
  const pill = solid || scrolled

  const links = (
    <>
      <Link href="/#providers">{t('nav.providers')}</Link>
      <Link href="/reports">{t('nav.reports')}</Link>
      <a
        href="https://calendly.com/gratebridgelabs/30min?month=2026-08"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('nav.contactSales')}
      </a>
    </>
  )

  return (
    <header
      className={`nav${solid ? '' : ' nav--home'}${pill ? ' nav--scrolled nav--dark' : ''}${overlay ? ' nav--overlay' : ''}`}
    >
      {overlay ? (
        <div className="nav-overlay-inner">
          <nav className="nav-overlay-links" aria-label={t('nav.primaryLabel')}>
            {links}
          </nav>

          <Link href="/" className="nav-overlay-brand">
            {t('nav.brandMark')}
          </Link>

          <div className="nav-overlay-actions">
            <Link href="/signin" className="nav-overlay-login">
              {t('nav.login')}
            </Link>
            <button type="button" className="nav-cta" onClick={openWaitlist}>
              <span>{t('nav.joinWaitlist')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="nav-inner nav-inner--dark">
          <Link href="/" className="nav-brand-mark">
            <Image
              src="/relaydark.png"
              alt={t('images.logoAlt')}
              width={28}
              height={28}
              className="nav-brand-mark-icon"
            />
            <span>{t('nav.brandMark')}</span>
          </Link>

          <nav className="nav-pill-links" aria-label={t('nav.primaryLabel')}>
            {links}
          </nav>

          <div className="nav-actions">
            <Link href="/signin" className="nav-signin nav-hide-sm">
              {t('nav.login')}
            </Link>
            <button type="button" className="nav-cta" onClick={openWaitlist}>
              <span>{t('nav.joinWaitlist')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 5h5.5M5.5 2.5L8 5 5.5 7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
