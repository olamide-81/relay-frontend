'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { EASE } from './ease'
import './hero.css'

/**
 * Full-bleed cinematic hero — centered headline over atmospheric field image.
 * Nav overlays this section from SiteNav.
 */
export default function Hero() {
  const t = useTranslations()
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" aria-label="Hero">
      <motion.div
        className="hero-media"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
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
      </motion.div>

      <motion.div
        className="hero-veil"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
      />

      <div className="hero-center">
        <h1 className="hero-title">
          <motion.span
            className="hero-title-line"
            initial={
              reduceMotion ? false : { opacity: 0, y: 36, filter: 'blur(10px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.45, ease: EASE }}
          >
            {t('hero.titleLine1')}
          </motion.span>
          <motion.span
            className="hero-title-line"
            initial={
              reduceMotion ? false : { opacity: 0, y: 36, filter: 'blur(10px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.62, ease: EASE }}
          >
            {t('hero.titleLine2')}
          </motion.span>
        </h1>
      </div>
    </section>
  )
}
