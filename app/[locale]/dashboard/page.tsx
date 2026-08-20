'use client'

import { Link } from '@/i18n/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { directoryCategories, providers, totalProviderCount } from '@/data/providers'
import { markets } from '@/data/markets'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import { useWorkspace } from '@/hooks/useWorkspace'

export default function OverviewPage() {
  const { user } = useSession()
  const { shortlist, compare, intros } = useWorkspace()
  const firstName = user?.firstName ?? 'there'
  const subscribed = isSubscribed(user)

  const links = [
    { href: '/dashboard/providers', label: 'Directory', desc: 'Find providers and banks by category and region' },
    { href: '/dashboard/compare', label: 'Compare', desc: 'Fees, uptime, licences and settlement side by side' },
    { href: '/dashboard/markets', label: 'Markets', desc: 'Licences, policy, news and local big players' },
    { href: '/dashboard/intros', label: 'Intros', desc: 'Ask Relay to introduce you to a partner' },
  ]

  return (
    <>
      <PageHeader
        index="01"
        label="Overview"
        title={
          <>
            Welcome, <span className="serif-italic">{firstName}</span>
          </>
        }
        desc="Find, compare and diligence fintech infrastructure — then request a warm introduction when you are ready."
      />

      <div className="ov-stats">
        <div className="ov-stat">
          <span className="ov-stat-value">{totalProviderCount}</span>
          <span className="ov-stat-label mono">Mapped</span>
        </div>
        <div className="ov-stat">
          <span className="ov-stat-value">{providers.length}</span>
          <span className="ov-stat-label mono">Dossiers</span>
        </div>
        <div className="ov-stat">
          <span className="ov-stat-value">{shortlist.length}</span>
          <span className="ov-stat-label mono">Saved</span>
        </div>
        <div className="ov-stat">
          <span className="ov-stat-value">{intros.length}</span>
          <span className="ov-stat-label mono">Intros</span>
        </div>
      </div>

      {!subscribed && (
        <div className="ov-banner">
          <div>
            <span className="dash-badge dash-badge--accent">Free plan</span>
            <p>
              You can browse the directory. Operator unlocks commercials, SLAs, licences, market policy and introductions — $149 / month.
            </p>
          </div>
          <Link href="/dashboard/billing" className="pg-btn pg-btn--primary">
            See Operator
          </Link>
        </div>
      )}

      <div className="ov-grid">
        <nav className="ov-nav">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="ov-nav-link">
              <span className="ov-nav-label">{item.label}</span>
              <span className="ov-nav-desc">{item.desc}</span>
              {item.href === '/dashboard/compare' && compare.length > 0 && (
                <span className="ov-nav-badge mono">{compare.length} in compare</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="dash-panel">
          <div className="dash-panel-header">
            <span className="dash-panel-title">Markets to start with</span>
            <Link href="/dashboard/markets" className="dash-panel-link mono">
              All markets
            </Link>
          </div>
          <ul className="ov-markets">
            {markets.slice(0, 5).map((m) => (
              <li key={m.id}>
                <Link href={`/dashboard/markets/${m.id}`} className="ov-market">
                  <span className="ov-market-name">{m.name}</span>
                  <span className="ov-market-meta mono">{m.region}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="ov-cats mono">
        {directoryCategories.length} categories · {providers.filter((p) => p.relayVerified).length} Relay-verified dossiers in this build
      </p>
    </>
  )
}
