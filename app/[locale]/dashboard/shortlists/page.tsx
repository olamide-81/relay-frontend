'use client'

import { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { EmptyState, PageHeader } from '@/components/dashboard/PageHeader'
import { getProviderById, getProviderInitials } from '@/data/providers'
import { useWorkspace } from '@/hooks/useWorkspace'
import {
  addToCompare,
  MAX_COMPARE,
  removeFromShortlist,
  setCompareList,
} from '@/lib/workspace'

export default function ShortlistsPage() {
  const { shortlist, refresh } = useWorkspace()
  const list = useMemo(
    () => shortlist.map((id) => getProviderById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getProviderById>>[],
    [shortlist]
  )

  return (
    <>
      <PageHeader
        index="04"
        label="Shortlists"
        title={
          <>
            Your saved <span className="serif-italic">providers.</span>
          </>
        }
        desc={`${list.length} provider${list.length !== 1 ? 's' : ''} saved for later.`}
        action={
          list.length > 0 ? (
            <Link
              href="/dashboard/compare"
              className="pg-btn pg-btn--primary"
              onClick={() => setCompareList(shortlist.slice(0, MAX_COMPARE))}
            >
              Compare {Math.min(list.length, MAX_COMPARE)}
            </Link>
          ) : undefined
        }
      />

      {list.length === 0 ? (
        <EmptyState
          message="You haven't saved any providers yet."
          actionLabel="Browse directory"
          actionHref="/dashboard/providers"
        />
      ) : (
        <div className="dash-panel">
          <ul className="sl-list">
            {list.map((p) => (
              <li key={p.id} className="sl-item">
                <span className="sl-mark mono">{getProviderInitials(p.name)}</span>
                <div className="sl-body">
                  <div className="sl-row">
                    <Link href={`/dashboard/providers/${p.id}`} className="sl-name">
                      {p.name}
                    </Link>
                    <span className="sl-fee mono">{p.uptime.toFixed(2)}%</span>
                  </div>
                  <div className="sl-meta mono">
                    {p.categoryName} · {p.settlement} · {p.regions.join(', ')}
                  </div>
                </div>
                <div className="sl-actions">
                  <button
                    type="button"
                    className="prov-btn"
                    onClick={() => {
                      addToCompare(p.id)
                      refresh()
                    }}
                  >
                    Compare
                  </button>
                  <Link href={`/dashboard/intros?provider=${p.id}`} className="prov-btn">
                    Intro
                  </Link>
                  <button
                    type="button"
                    className="prov-btn prov-btn--danger"
                    onClick={() => {
                      removeFromShortlist(p.id)
                      refresh()
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
