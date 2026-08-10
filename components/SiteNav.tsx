'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './home.css'

type Props = {
  /** Force the floating pill treatment (use on non-hero pages). */
  solid?: boolean
}

export default function SiteNav({ solid = false }: Props) {
  const t = useTranslations()
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
  const homeScrolled = !solid && scrolled

  return (
    <header
      className={`nav${solid ? '' : ' nav--home'}${scrolled || solid ? ' nav--scrolled' : ''}${overlay ? ' nav--overlay' : ''}${homeScrolled ? ' nav--dark' : ''}`}
    >
      {overlay ? (
        <div className="nav-overlay-inner">
          <nav className="nav-overlay-links" aria-label={t('nav.primaryLabel')}>
            <Link href="/#directory">{t('nav.providers')}</Link>
            <Link href="/reports">{t('nav.reports')}</Link>
            <Link href="/#research">{t('nav.research')}</Link>
            <a href="#footer">{t('nav.contactSales')}</a>
          </nav>

          <Link href="/" className="nav-overlay-brand">
            {t('nav.brandMark')}
          </Link>

          <div className="nav-overlay-actions">
            <Link href="/signin" className="nav-overlay-login">
              {t('nav.login')}
            </Link>
            <a href="#footer" className="nav-cta">
              <span>{t('nav.getInTouch')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </a>
          </div>
        </div>
      ) : homeScrolled ? (
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
            <Link href="/#directory">{t('nav.providers')}</Link>
            <Link href="/reports">{t('nav.reports')}</Link>
            <Link href="/#research" className="nav-hide-sm">
              {t('nav.research')}
            </Link>
            <a href="#footer" className="nav-hide-sm">
              {t('nav.contactSales')}
            </a>
          </nav>

          <div className="nav-actions">
            <Link href="/signin" className="nav-signin nav-hide-sm">
              {t('nav.login')}
            </Link>
            <a href="#footer" className="nav-cta">
              <span>{t('nav.getInTouch')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </a>
          </div>
        </div>
      ) : (
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
            <Link href="/#pricing" className="nav-signin nav-hide-sm">
              {t('nav.pricing')}
            </Link>
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
