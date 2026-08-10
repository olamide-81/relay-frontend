'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { EASE } from './ease'
import './hero.css'

/**
 * Full-bleed cinematic hero — centered headline over atmospheric field image.
 * Nav overlays this section from SiteNav.
 */
export default function Hero() {
  const t = useTranslations()

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-media" aria-hidden>
        <Image
          src="/hero-mountains.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media-img"
        />
        <div className="hero-media-shade" />
        <div className="hero-media-grain" />
      </div>

      <div className="hero-center">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.18, ease: EASE }}
        >
          <span className="hero-title-line">{t('hero.titleLine1')}</span>
          <span className="hero-title-line">{t('hero.titleLine2')}</span>
        </motion.h1>
      </div>
    </section>
  )
}
