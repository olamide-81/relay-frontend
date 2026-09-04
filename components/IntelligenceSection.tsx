'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useTranslations } from 'next-intl'
import { EASE } from '@/components/heroes/ease'
import LandingIntelPreview, { type IntelSceneId } from '@/components/LandingIntelPreview'
import './intelligence.css'

type Product = {
  name: string
  description: string
  points: string[]
}

const SCENES: IntelSceneId[] = ['discover', 'research', 'act', 'signals']

function IntelProgressFill({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>
  index: number
  count: number
}) {
  const scaleX = useTransform(progress, (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v)))
    if (index < next) return 1
    if (index > next) return 0
    return Math.min(1, Math.max(0.08, v - next))
  })

  return <motion.span className="intel-tab-fill" style={{ scaleX }} />
}

/**
 * Cost-of-guessing chapter — pinned workspace scenes, not duplicated copy cards.
 */
export default function IntelligenceSection() {
  const t = useTranslations('intelligence')
  const products = t.raw('products') as Product[]
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const prevActive = useRef(0)
  const count = products.length

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })
  const progress = useTransform(scrollYProgress, [0, 1], [0, Math.max(count, 1)])

  useEffect(() => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(progress.get())))
    prevActive.current = next
    setActive(next)
  }, [count, progress])

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v)))
    if (next === prevActive.current) return
    setDirection(next > prevActive.current ? 1 : -1)
    prevActive.current = next
    setActive(next)
  })

  const current = products[active] ?? products[0]
  const indexLabel = String(active + 1).padStart(2, '0')
  const scene = SCENES[active] ?? SCENES[0]

  function goTo(index: number) {
    const el = trackRef.current
    if (!el || count <= 0) return
    const total = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + (total * (index + 0.18)) / count
    window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const copyVariants = {
    enter: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, y: dir > 0 ? 28 : -28 },
    center: { opacity: 1, y: 0 },
    exit: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, y: dir > 0 ? -20 : 20 },
  }

  return (
    <section className="intel" id="directory" aria-label={t('title')}>
      <div
        className="intel-track"
        ref={trackRef}
        style={{ height: `${Math.max(count, 1) * 100}vh` }}
      >
        <div className="intel-sticky">
          <div className="intel-stage">
            <header className="intel-head">
              <p className="intel-kicker">{t('kicker')}</p>
              <h2 className="intel-title">{t('title')}</h2>
              <p className="intel-lede">{t('lede')}</p>
            </header>

            <nav className="intel-tabs" aria-label={t('kicker')}>
              {products.map((product, i) => (
                <button
                  key={product.name}
                  type="button"
                  className={`intel-tab${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  aria-current={i === active ? 'step' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="intel-tab-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="intel-tab-name">{product.name}</span>
                  <span className="intel-tab-track" aria-hidden>
                    <IntelProgressFill progress={progress} index={i} count={count} />
                  </span>
                </button>
              ))}
            </nav>

            <div className="intel-body">
              <div className="intel-copy" aria-live="polite">
                <AnimatePresence mode="wait" custom={direction}>
                  {current ? (
                    <motion.div
                      key={current.name}
                      className="intel-panel"
                      custom={direction}
                      variants={copyVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.42, ease: EASE }}
                    >
                      <p className="intel-chapter">
                        <span>{indexLabel}</span>
                        <span>/ {String(count).padStart(2, '0')}</span>
                      </p>
                      <h3 className="intel-product">{current.name}</h3>
                      <p className="intel-desc">{current.description}</p>
                      <ul className="intel-points">
                        {current.points.map((point) => (
                          <li key={point}>
                            <span className="intel-point-mark" aria-hidden />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="intel-visual">
                <LandingIntelPreview
                  scene={scene}
                  direction={direction}
                  reduceMotion={Boolean(reduceMotion)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
