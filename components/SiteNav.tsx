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
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  return (
    <header className={`nav ${scrolled || solid ? 'nav--scrolled' : ''}`}>
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
    </header>
  )
}
