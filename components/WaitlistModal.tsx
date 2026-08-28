'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { useTranslations } from 'next-intl'
import './waitlist.css'

type WaitlistContextValue = {
  open: boolean
  openWaitlist: () => void
  closeWaitlist: () => void
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null)

const SHEET_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 }

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) {
    throw new Error('useWaitlist must be used within WaitlistProvider')
  }
  return ctx
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openWaitlist = useCallback(() => setOpen(true), [])
  const closeWaitlist = useCallback(() => setOpen(false), [])

  return (
    <WaitlistContext.Provider value={{ open, openWaitlist, closeWaitlist }}>
      {children}
      <AnimatePresence>
        {open ? <WaitlistModal key="waitlist" /> : null}
      </AnimatePresence>
    </WaitlistContext.Provider>
  )
}

const ROLES = ['founder', 'engineer', 'productManager', 'other'] as const

function WaitlistModal() {
  const t = useTranslations('waitlist')
  const { closeWaitlist } = useWaitlist()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [role, setRole] = useState<(typeof ROLES)[number] | ''>('')
  const reduceMotion = useReducedMotion()
  const dragControls = useDragControls()
  const [canDrag, setCanDrag] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const tId = window.setTimeout(() => firstFieldRef.current?.focus(), 40)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWaitlist()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(tId)
      window.removeEventListener('keydown', onKey)
    }
  }, [closeWaitlist])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.velocity.y > 500 || info.offset.y > 120) {
      closeWaitlist()
    }
  }

  return (
    <motion.div
      className="wl"
      role="presentation"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <button
        type="button"
        className="wl-backdrop"
        aria-label={t('close')}
        onClick={closeWaitlist}
      />
      <motion.div
        ref={panelRef}
        className="wl-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
        animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { y: '100%' }}
        transition={reduceMotion ? { duration: 0.15 } : SHEET_SPRING}
        onAnimationComplete={() => {
          if (!reduceMotion) setCanDrag(true)
        }}
        drag={canDrag ? 'y' : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragEnd={handleDragEnd}
      >
        <div
          className="wl-grab"
          onPointerDown={(event) => {
            if (!canDrag) return
            dragControls.start(event)
          }}
        >
          <div className="wl-handle" aria-hidden />
        </div>
        <button type="button" className="wl-close" onClick={closeWaitlist} aria-label={t('close')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4.5 4.5l9 9M13.5 4.5l-9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="wl-inner">
          {submitted ? (
            <div className="wl-success">
              <h2 id={titleId} className="wl-title">
                {t('successTitle')}
              </h2>
              <p className="wl-lede">{t('successLede')}</p>
              <button type="button" className="wl-submit" onClick={closeWaitlist}>
                {t('done')}
              </button>
            </div>
          ) : (
            <>
              <header className="wl-header">
                <h2 id={titleId} className="wl-title">
                  {t('title')}
                </h2>
                <p className="wl-lede">{t('lede')}</p>
              </header>

              <form className="wl-form" onSubmit={onSubmit}>
                <label className="wl-field">
                  <span>{t('fullName')}</span>
                  <input
                    ref={firstFieldRef}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t('fullNamePlaceholder')}
                  />
                </label>

                <label className="wl-field">
                  <span>{t('email')}</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t('emailPlaceholder')}
                  />
                </label>

                <label className="wl-field">
                  <span>{t('role')}</span>
                  <select
                    name="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value as (typeof ROLES)[number] | '')}
                  >
                    <option value="" disabled>
                      {t('rolePlaceholder')}
                    </option>
                    {ROLES.map((key) => (
                      <option key={key} value={key}>
                        {t(`roles.${key}`)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="wl-field">
                  <span>{t('company')}</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    placeholder={t('companyPlaceholder')}
                  />
                </label>

                <button type="submit" className="wl-submit">
                  {t('submit')}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
