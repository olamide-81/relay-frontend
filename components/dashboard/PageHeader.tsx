'use client'

import { Link } from '@/i18n/navigation'

export function PageHeader({
  index,
  label,
  title,
  desc,
  action,
}: {
  index: string
  label: string
  title: React.ReactNode
  desc?: string
  action?: React.ReactNode
}) {
  return (
    <header className="pg-header">
      <div>
        <div className="dash-page-label pg-page-label">
          <span className="dash-page-label-index">{index}</span>
          <span className="dash-page-label-rule" />
          <span className="dash-page-label-text">{label}</span>
        </div>
        <h1 className="pg-title">{title}</h1>
        {desc && <p className="pg-desc">{desc}</p>}
      </div>
      {action}
    </header>
  )
}

export function EmptyState({
  message,
  actionLabel,
  actionHref,
}: {
  message: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <div className="pg-empty">
      <p>{message}</p>
      <Link href={actionHref} className="pg-empty-link mono">
        {actionLabel} →
      </Link>
    </div>
  )
}
