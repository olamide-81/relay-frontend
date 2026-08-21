'use client'

import { Link } from '@/i18n/navigation'

export function PageHeader({
  title,
  desc,
  action,
  index: _index,
  label: _label,
}: {
  title: React.ReactNode
  desc?: string
  action?: React.ReactNode
  index?: string
  label?: string
}) {
  return (
    <header className="dash-page-header">
      <div className="dash-page-header-main">
        <h1 className="dash-page-title">{title}</h1>
        {desc && <p className="dash-page-desc">{desc}</p>}
      </div>
      {action && <div className="dash-page-header-action">{action}</div>}
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
    <div className="ui-card ui-card--empty">
      <p>{message}</p>
      <Link href={actionHref} className="ui-link">
        {actionLabel} →
      </Link>
    </div>
  )
}
