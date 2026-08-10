'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { EASE } from '@/components/heroes/ease'
import './intelligence.css'

type Product = {
  name: string
  description: string
  points: string[]
}

/**
 * Bold text-first intelligence stage with creative pinned scroll motion.
 */
export default function IntelligenceSection() {
  const t = useTranslations('intelligence')
  const products = t.raw('products') as Product[]
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [localProgress, setLocalProgress] = useState(0)
  const prevActive = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) {
        setActive(0)
        setLocalProgress(0)
        return
      }

      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      const raw = (scrolled / total) * products.length
      const next = Math.min(products.length - 1, Math.floor(raw))
      const within = raw - next

      if (next !== prevActive.current) {
        setDirection(next > prevActive.current ? 1 : -1)
        prevActive.current = next
      }

      setActive(next)
      setLocalProgress(within)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [products.length])

  const current = products[active] ?? products[0]
  const indexLabel = String(active + 1).padStart(2, '0')

  const copyVariants = {
    enter: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: dir > 0 ? 56 : -56, filter: 'blur(8px)' },
    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: dir > 0 ? -40 : 40, filter: 'blur(6px)' },
  }

  const cardVariants = {
    enter: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir > 0 ? 72 : -72,
            rotateY: dir > 0 ? -12 : 12,
            scale: 0.94,
          },
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir > 0 ? -56 : 56,
            rotateY: dir > 0 ? 10 : -10,
            scale: 0.96,
          },
  }

  return (
    <section className="intel" id="directory" aria-label={t('title')}>
      <div className="intel-intro">
        <p className="intel-kicker">{t('kicker')}</p>
        <h2 className="intel-title">{t('title')}</h2>
        <p className="intel-lede">{t('lede')}</p>
      </div>

      <div
        className="intel-track"
        ref={trackRef}
        style={{ height: `${Math.max(products.length, 1) * 120}vh` }}
      >
        <div className="intel-sticky">
          <div
            className="intel-stage"
            style={{
              ['--local-progress' as string]: String(localProgress),
            }}
          >
            <div className="intel-copy" aria-live="polite">
              <div className="intel-index" aria-hidden>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.span
                    key={indexLabel}
                    className="intel-index-num"
                    custom={direction}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {indexLabel}
                  </motion.span>
                </AnimatePresence>
                <span className="intel-index-total">/ {String(products.length).padStart(2, '0')}</span>
              </div>

              <div className="intel-panel-slot">
                <AnimatePresence mode="wait" custom={direction}>
                  {current ? (
                    <motion.div
                      key={current.name}
                      className="intel-panel is-active"
                      custom={direction}
                      variants={copyVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <h3 className="intel-product">{current.name}</h3>
                      <p className="intel-desc">{current.description}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="intel-progress" aria-hidden>
                {products.map((product, i) => {
                  const fill =
                    i < active ? 1 : i === active ? Math.min(1, Math.max(0.08, localProgress)) : 0
                  return (
                    <div
                      key={product.name}
                      className={`intel-progress-seg${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                    >
                      <span className="intel-progress-label">{product.name}</span>
                      <span className="intel-progress-track">
                        <span
                          className="intel-progress-fill"
                          style={{ transform: `scaleX(${fill})` }}
                        />
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="intel-card-wrap">
              <AnimatePresence mode="wait" custom={direction}>
                {current ? (
                  <motion.article
                    key={current.name}
                    className="noise-card intel-card"
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{
                      transformOrigin: 'center left',
                    }}
                  >
                    <div className="intel-card-top">
                      <span className="intel-card-step">{indexLabel}</span>
                      <h4 className="intel-card-title">{current.name}</h4>
                    </div>
                    <p className="intel-card-body">{current.description}</p>
                    <ul className="intel-card-points">
                      {current.points.map((point, i) => (
                        <motion.li
                          key={point}
                          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.12 + i * 0.07,
                            ease: EASE,
                          }}
                        >
                          <span className="intel-point-mark" aria-hidden />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.article>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
