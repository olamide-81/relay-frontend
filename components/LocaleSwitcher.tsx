'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { localeLabels, locales, type Locale } from '@/i18n/routing'
import './locale-switcher.css'

type Props = {
  className?: string
  label?: string
  variant?: 'nav' | 'footer'
}

const LOCALE_GROUPS: Locale[][] = [
  ['en', 'fr', 'es'],
  ['zh', 'ja', 'ko', 'id'],
]

export function LocaleSwitcher({ className, label, variant = 'footer' }: Props) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (target && rootRef.current?.contains(target)) return
      setOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setOpen(false)
      return
    }
    setOpen(false)
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div
      ref={rootRef}
      className={`locale-switcher-wrap locale-switcher-wrap--${variant}${className ? ` ${className}` : ''}${isPending ? ' is-pending' : ''}`}
    >
      {label && variant === 'footer' && (
        <span className="locale-switcher-label">{label}</span>
      )}
      <button
        type="button"
        className="locale-switcher-trigger"
        aria-label={label ?? localeLabels[locale]}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-busy={isPending}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeLabels[locale] ?? locale}</span>
        <span className="locale-switcher-caret" aria-hidden />
      </button>
      {open && (
        <ul
          className="locale-switcher-menu"
          role="listbox"
          aria-label={label ?? localeLabels[locale]}
        >
          {LOCALE_GROUPS.map((group, groupIndex) => (
            <li key={group.join('-')} className="locale-switcher-group" role="presentation">
              {groupIndex > 0 ? (
                <div className="locale-switcher-divider" aria-hidden />
              ) : null}
              <ul className="locale-switcher-group-list" role="group">
                {group.map((code) => (
                  <li key={code} role="option" aria-selected={code === locale}>
                    <button
                      type="button"
                      className={`locale-switcher-option${code === locale ? ' is-active' : ''}`}
                      onClick={() => switchLocale(code)}
                      onMouseDown={(event) => {
                        // Keep focus inside the control so the option click always fires.
                        event.preventDefault()
                      }}
                    >
                      {localeLabels[code]}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
