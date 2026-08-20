'use client'

import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useWaitlist } from '@/components/WaitlistModal'
import './home.css'

type Props = {
  /** Force the floating pill treatment (use on non-hero pages). */
  solid?: boolean
}

const CALENDLY =
  'https://calendly.com/gratebridgelabs/30min?month=2026-08'

/**
 * Cinema nav — Providers, Reports, Contact sales.
 * Overlay on home hero; dark glass pill when scrolled or on solid pages.
 * Mobile: compact bar + full-screen menu.
 */
export default function SiteNav({ solid = false }: Props) {
  const t = useTranslations()
  const { openWaitlist } = useWaitlist()
  const [scrolled, setScrolled] = useState(solid)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (solid) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  useEffect(() => {
    if (!menuOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const overlay = !solid && !scrolled
  const pill = solid || scrolled

  const closeMenu = () => setMenuOpen(false)

  const openWaitlistFromMenu = () => {
    closeMenu()
    openWaitlist()
  }

  const links = (
    <>
      <Link href="/#providers" onClick={closeMenu}>
        {t('nav.providers')}
      </Link>
      <Link href="/reports" onClick={closeMenu}>
        {t('nav.reports')}
      </Link>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
      >
        {t('nav.contactSales')}
      </a>
    </>
  )

  return (
    <header
      className={`nav${solid ? '' : ' nav--home'}${pill ? ' nav--scrolled nav--dark' : ''}${overlay ? ' nav--overlay' : ''}${menuOpen ? ' nav--menu-open' : ''}`}
    >
      {overlay ? (
        <div className="nav-overlay-inner">
          <nav className="nav-overlay-links" aria-label={t('nav.primaryLabel')}>
            {links}
          </nav>

          <Link href="/" className="nav-overlay-brand" onClick={closeMenu}>
            {t('nav.brandMark')}
          </Link>

          <div className="nav-overlay-actions">
            <LocaleSwitcher
              className="nav-locale nav-hide-sm"
              variant="nav"
              label={t('nav.languageLabel')}
            />
            <Link href="/signin" className="nav-overlay-login">
              {t('nav.login')}
            </Link>
            <button type="button" className="nav-cta nav-cta--desktop" onClick={openWaitlist}>
              <span className="nav-cta-full">{t('nav.joinWaitlist')}</span>
              <span className="nav-cta-short">{t('nav.joinWaitlistShort')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </button>
            <MenuToggle
              open={menuOpen}
              menuId={menuId}
              labelOpen={t('nav.openMenu')}
              labelClose={t('nav.closeMenu')}
              onToggle={() => setMenuOpen((v) => !v)}
            />
          </div>
        </div>
      ) : (
        <div className="nav-inner nav-inner--dark">
          <Link href="/" className="nav-brand-mark" onClick={closeMenu}>
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
            <LocaleSwitcher
              className="nav-locale nav-hide-sm"
              variant="nav"
              label={t('nav.languageLabel')}
            />
            <Link href="/signin" className="nav-signin nav-hide-sm">
              {t('nav.login')}
            </Link>
            <button type="button" className="nav-cta nav-cta--desktop" onClick={openWaitlist}>
              <span className="nav-cta-full">{t('nav.joinWaitlist')}</span>
              <span className="nav-cta-short">{t('nav.joinWaitlistShort')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </button>
            <MenuToggle
              open={menuOpen}
              menuId={menuId}
              labelOpen={t('nav.openMenu')}
              labelClose={t('nav.closeMenu')}
              onToggle={() => setMenuOpen((v) => !v)}
            />
          </div>
        </div>
      )}

      <div
        id={menuId}
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <button
          type="button"
          className="nav-drawer-backdrop"
          aria-label={t('nav.closeMenu')}
          onClick={closeMenu}
        />
        <div className="nav-drawer-panel" role="dialog" aria-modal="true" aria-label={t('nav.menuLabel')}>
          <nav className="nav-drawer-links" aria-label={t('nav.primaryLabel')}>
            {links}
          </nav>
          <div className="nav-drawer-actions">
            <div className="nav-drawer-locale">
              <span className="nav-drawer-locale-label">{t('nav.languageLabel')}</span>
              <LocaleSwitcher
                className="nav-locale"
                variant="nav"
                label={t('nav.languageLabel')}
              />
            </div>
            <Link href="/signin" className="nav-drawer-login" onClick={closeMenu}>
              {t('nav.login')}
            </Link>
            <button type="button" className="nav-cta nav-cta--block" onClick={openWaitlistFromMenu}>
              <span>{t('nav.joinWaitlist')}</span>
              <span className="nav-cta-icon" aria-hidden>
                <Chevron />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuToggle({
  open,
  menuId,
  labelOpen,
  labelClose,
  onToggle,
}: {
  open: boolean
  menuId: string
  labelOpen: string
  labelClose: string
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className={`nav-menu-btn${open ? ' is-open' : ''}`}
      aria-expanded={open}
      aria-controls={menuId}
      aria-label={open ? labelClose : labelOpen}
      onClick={onToggle}
    >
      <span className="nav-menu-btn-bars" aria-hidden>
        <i />
        <i />
      </span>
    </button>
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
