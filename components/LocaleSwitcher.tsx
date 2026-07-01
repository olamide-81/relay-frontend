'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { localeLabels, locales, type Locale } from '@/i18n/routing'

type Props = {
  className?: string
  label?: string
  variant?: 'nav' | 'footer'
}

export function LocaleSwitcher({ className, label, variant = 'footer' }: Props) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const switchLocale = (nextLocale: Locale) => {
    setOpen(false)
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale })
    }
  }

  return (
    <div
      ref={rootRef}
      className={`locale-switcher-wrap locale-switcher-wrap--${variant}${className ? ` ${className}` : ''}`}
    >
      {label && variant === 'footer' && (
        <span className="locale-switcher-label">{label}</span>
      )}
      <button
        type="button"
        className="locale-switcher-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeLabels[locale]}</span>
        <span className="locale-switcher-caret" aria-hidden />
      </button>
      {open && (
        <ul className="locale-switcher-menu" role="listbox" aria-label={label}>
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                className={`locale-switcher-option${code === locale ? ' is-active' : ''}`}
                onClick={() => switchLocale(code)}
              >
                {localeLabels[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
