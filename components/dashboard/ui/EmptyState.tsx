'use client'

import { Link } from '@/i18n/navigation'

export type EmptyKind = 'shortlist' | 'activity' | 'request' | 'directory' | 'intel'

function Art({ kind }: { kind: EmptyKind }) {
  if (kind === 'shortlist') {
    return (
      <svg viewBox="0 0 120 120" aria-hidden className="relay-empty-svg">
        <rect x="22" y="28" width="76" height="68" rx="14" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
        <rect x="32" y="18" width="56" height="18" rx="9" fill="#141416" stroke="rgba(255,255,255,.12)" />
        <rect x="36" y="48" width="48" height="6" rx="3" fill="rgba(255,255,255,.12)" />
        <rect x="36" y="62" width="36" height="6" rx="3" fill="rgba(255,255,255,.08)" />
        <rect x="36" y="76" width="28" height="6" rx="3" fill="rgba(255,255,255,.06)" />
        <circle cx="86" cy="86" r="16" fill="oklch(0.78 0.17 130)" />
        <path d="M80 86h12M86 80v12" stroke="#0a0a0b" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'activity') {
    return (
      <svg viewBox="0 0 120 120" aria-hidden className="relay-empty-svg">
        <circle cx="60" cy="60" r="38" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
        <circle cx="60" cy="60" r="24" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
        <circle cx="60" cy="60" r="10" fill="oklch(0.78 0.17 130 / .18)" stroke="oklch(0.78 0.17 130)" strokeWidth="2" />
        <circle cx="60" cy="60" r="3.5" fill="oklch(0.78 0.17 130)" />
        <path
          d="M60 22v8M98 60h-8M60 98v-8M22 60h8"
          stroke="rgba(255,255,255,.2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="86" cy="34" r="5" fill="oklch(0.78 0.17 130)" />
      </svg>
    )
  }
  if (kind === 'request') {
    return (
      <svg viewBox="0 0 120 120" aria-hidden className="relay-empty-svg">
        <rect x="20" y="32" width="80" height="56" rx="14" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
        <path d="M20 46l40 24 40-24" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2.4" />
        <path d="M20 80l24-18M100 80l-24-18" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
        <circle cx="88" cy="36" r="16" fill="oklch(0.78 0.17 130)" />
        <path
          d="M82 36.5l4.2 4.2 8.2-8.4"
          fill="none"
          stroke="#0a0a0b"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (kind === 'intel') {
    return (
      <svg viewBox="0 0 120 120" aria-hidden className="relay-empty-svg">
        <rect x="26" y="24" width="68" height="72" rx="14" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
        <path d="M40 78V52M56 78V44M72 78V58M88 78V38" stroke="rgba(255,255,255,.16)" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 52l16-8 16 14 16-20" fill="none" stroke="oklch(0.78 0.17 130)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="88" cy="38" r="4" fill="oklch(0.78 0.17 130)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="relay-empty-svg">
      <rect x="20" y="28" width="36" height="28" rx="8" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
      <rect x="64" y="28" width="36" height="28" rx="8" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
      <rect x="20" y="64" width="36" height="28" rx="8" fill="#1c1c1f" stroke="rgba(255,255,255,.1)" />
      <rect x="64" y="64" width="36" height="28" rx="8" fill="oklch(0.78 0.17 130 / .16)" stroke="oklch(0.78 0.17 130)" />
      <circle cx="82" cy="78" r="4" fill="oklch(0.78 0.17 130)" />
    </svg>
  )
}

export function EmptyState({
  kind,
  title,
  body,
  actionLabel,
  actionHref,
  compact,
}: {
  kind: EmptyKind
  title: string
  body: string
  actionLabel?: string
  actionHref?: string
  compact?: boolean
}) {
  return (
    <div className={`relay-empty${compact ? ' relay-empty--compact' : ''}`}>
      <div className="relay-empty-art">
        <Art kind={kind} />
      </div>
      <h3 className="relay-empty-title">{title}</h3>
      <p className="relay-empty-body">{body}</p>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="relay-btn relay-btn--white relay-btn--sm relay-empty-action">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
