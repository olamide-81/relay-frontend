'use client'

import type { ReactElement } from 'react'

type DashTooltipProps = {
  title: string
  hint: string
  side?: 'right' | 'bottom'
  children: ReactElement
}

export default function DashTooltip({ title, hint, side = 'right', children }: DashTooltipProps) {
  return (
    <span className={`dash-tip dash-tip--${side}`}>
      {children}
      <span className="dash-tip-panel" role="tooltip">
        <strong className="dash-tip-title">{title}</strong>
        <span className="dash-tip-hint">{hint}</span>
      </span>
    </span>
  )
}
