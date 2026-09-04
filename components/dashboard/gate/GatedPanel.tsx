'use client'

import { Link } from '@/i18n/navigation'
import { ProBadge } from '@/components/dashboard/gate/ProBadge'

export function GatedPanel({
  locked,
  variant = 'dark',
  blur = 4,
  headline,
  sub,
  cta = 'Unlock →',
  onUnlock,
  secondary,
  children,
}: {
  locked: boolean
  variant?: 'light' | 'dark'
  blur?: number
  headline: string
  sub?: string
  cta?: string
  onUnlock: () => void
  secondary?: { label: string; href: string }
  children: React.ReactNode
}) {
  if (!locked) return <>{children}</>

  return (
    <div className={`relay-gate relay-gate--${variant}`}>
      <div className="relay-gate-body" style={{ filter: `blur(${blur}px)`, opacity: 0.52 }} aria-hidden>
        {children}
      </div>
      <div className="relay-gate-overlay">
        <ProBadge onLight={variant === 'light'} />
        <p className="relay-gate-headline">{headline}</p>
        {sub ? <p className="relay-gate-sub">{sub}</p> : null}
        <div className="relay-gate-actions">
          <button type="button" className={variant === 'light' ? 'relay-btn relay-btn--ink' : 'relay-btn relay-btn--lime'} onClick={onUnlock}>
            {cta}
          </button>
          {secondary ? (
            <Link href={secondary.href} className="relay-btn relay-btn--outline relay-btn--outline-ink">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
