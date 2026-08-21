'use client'

import { useState } from 'react'

export function Tabs({
  tabs,
  defaultTab,
}: {
  tabs: { id: string; label: string; content: React.ReactNode; badge?: number }[]
  defaultTab?: string
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)
  const current = tabs.find((t) => t.id === active)

  return (
    <div className="ui-tabs">
      <div className="ui-tabs-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={`ui-tab ${active === tab.id ? 'ui-tab--active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
            {tab.badge != null && tab.badge > 0 && (
              <span className="ui-tab-count">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="ui-tabs-panel" role="tabpanel">
        {current?.content}
      </div>
    </div>
  )
}
