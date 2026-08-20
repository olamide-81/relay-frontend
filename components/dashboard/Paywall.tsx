'use client'

import { Link } from '@/i18n/navigation'
import { isSubscribed, type SessionUser } from '@/lib/session'

export function Paywall({
  user,
  title = 'This is Operator data',
  copy = 'Fee schedules, licences, SLAs and partnering requirements sit behind a monthly subscription.',
  children,
}: {
  user: SessionUser | null
  title?: string
  copy?: string
  children: React.ReactNode
}) {
  if (isSubscribed(user)) return <>{children}</>

  return (
    <div className="paywall">
      <div className="paywall-blur" aria-hidden>
        {children}
      </div>
      <div className="paywall-card">
        <span className="dash-badge dash-badge--accent">Operator</span>
        <h2 className="paywall-title">{title}</h2>
        <p className="paywall-copy">{copy}</p>
        <Link href="/dashboard/billing" className="pg-btn pg-btn--primary">
          Start monthly access
        </Link>
      </div>
    </div>
  )
}

export function LockedHint({ href = '/dashboard/billing' }: { href?: string }) {
  return (
    <span className="locked-hint mono">
      <Link href={href}>Unlock</Link>
    </span>
  )
}
