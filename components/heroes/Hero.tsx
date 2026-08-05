'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { EASE } from './ease'
import './hero.css'

/**
 * Studio still — pitch-deck clarity: brand, value, editorial partner index, market floor.
 * Mono is the product voice. No floating AI cards.
 */
export default function Hero() {
  const t = useTranslations()
  const markets = t.raw('hero.markets') as string[]
  const offerings = t.raw('hero.offerings') as Array<{ name: string; role: string }>

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-frame">
        <div className="hero-copy">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {t('hero.kicker')}
          </motion.p>

          <motion.p
            className="hero-brand"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.06, ease: EASE }}
          >
            {t('nav.brand')}
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
          >
            {t('hero.subtext')}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
          >
            <Link href="/signup" className="btn btn-primary">
              {t('nav.getStarted')}
            </Link>
            <Link href="/signup" className="hero-link">
              {t('hero.secondaryCta')}
            </Link>
          </motion.div>
        </div>

        <motion.aside
          className="hero-index"
          aria-label={t('hero.indexLabel')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <div className="hero-index-head">
            <span>{t('hero.indexLabel')}</span>
          </div>

          <ol className="hero-index-list">
            {offerings.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.48 + i * 0.08, ease: EASE }}
              >
                <span className="hero-index-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="hero-index-body">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.aside>
      </div>

      <motion.div
        className="hero-floor"
        aria-hidden
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
      >
        <div className="hero-markets">
          {markets.map((city, i) => (
            <motion.span
              key={city}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.07, ease: EASE }}
            >
              {city}
            </motion.span>
          ))}
        </div>
        <div className="hero-floor-glow" />
      </motion.div>
    </section>
  )
}
