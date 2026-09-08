'use client'

import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { useOpenWeighting } from '@/components/dashboard/compare/WeightingPopover'
import { useWorkspaceCounts } from '@/components/dashboard/chrome/WorkspaceCounts'
import type { RailSection } from '@/lib/relay/types'

const ITEMS: { name: RailSection; href: string; countKey?: 'providers' | 'shortlists' | 'intros' }[] = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Directory', href: '/dashboard/providers', countKey: 'providers' },
  { name: 'Shortlists', href: '/dashboard/shortlists', countKey: 'shortlists' },
  { name: 'Requests', href: '/dashboard/intros', countKey: 'intros' },
  { name: 'Intelligence', href: '/dashboard/intelligence' },
]

export default function Rail({ active }: { active: RailSection }) {
  const openWeighting = useOpenWeighting()
  const counts = useWorkspaceCounts()

  const valueFor = (key?: 'providers' | 'shortlists' | 'intros') => {
    if (!key) return 0
    if (key === 'providers') return counts.providers
    if (key === 'shortlists') return counts.shortlists
    return counts.intros
  }

  return (
    <aside className="relay-rail" aria-label="Workspace">
      <div className="relay-rail-label">WORKSPACE</div>
      {ITEMS.map((item) => {
        const on = item.name === active
        const n = valueFor(item.countKey)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relay-rail-item${on ? ' relay-rail-item--on' : ''}`}
            aria-current={on ? 'page' : undefined}
          >
            <span className="relay-rail-dot" />
            <span className="relay-rail-name">{item.name}</span>
            {n > 0 ? <span className="relay-rail-count">{n}</span> : null}
          </Link>
        )
      })}
      <button type="button" className="relay-weight-card" onClick={openWeighting}>
        <div className="relay-weight-copy">Weighting drives every score in Relay.</div>
        <div className="relay-weight-link">Edit weighting →</div>
      </button>
      <div className="relay-rail-live">
        <LiveDot variant="green" />
        <span>{counts.providers ? `${counts.providers} providers live` : 'Catalog live'}</span>
      </div>
    </aside>
  )
}
