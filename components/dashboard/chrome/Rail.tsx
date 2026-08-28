'use client'

import { Link } from '@/i18n/navigation'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import type { RailSection } from '@/lib/relay/types'

const ITEMS: { name: RailSection; href: string; n: string }[] = [
  { name: 'Overview', href: '/dashboard', n: '' },
  { name: 'Directory', href: '/dashboard/providers', n: '210' },
  { name: 'Shortlists', href: '/dashboard/shortlists', n: '3' },
  { name: 'Requests', href: '/dashboard/intros', n: '7' },
  { name: 'Intelligence', href: '/dashboard/intelligence', n: '' },
]

export default function Rail({ active }: { active: RailSection }) {
  const { setOpen } = useWeighting()

  return (
    <aside className="relay-rail" aria-label="Workspace">
      <div className="relay-rail-label">WORKSPACE</div>
      {ITEMS.map((item) => {
        const on = item.name === active
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relay-rail-item${on ? ' relay-rail-item--on' : ''}`}
            aria-current={on ? 'page' : undefined}
          >
            <span className="relay-rail-dot" />
            <span className="relay-rail-name">{item.name}</span>
            {item.n ? <span className="relay-rail-count">{item.n}</span> : null}
          </Link>
        )
      })}
      <button type="button" className="relay-weight-card" onClick={() => setOpen(true)}>
        <div className="relay-weight-copy">Weighting drives every score in Relay.</div>
        <div className="relay-weight-link">Edit weighting →</div>
      </button>
      <div className="relay-rail-live">
        <LiveDot variant="green" />
        <span>Data live · 14m ago</span>
      </div>
    </aside>
  )
}
