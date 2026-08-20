'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { EmptyState, PageHeader } from '@/components/dashboard/PageHeader'
import { Paywall } from '@/components/dashboard/Paywall'
import { providers, getProviderById } from '@/data/providers'
import { useSession } from '@/hooks/useSession'
import { useWorkspace } from '@/hooks/useWorkspace'
import {
  addToCompare,
  clearCompare,
  MAX_COMPARE,
  removeFromCompare,
} from '@/lib/workspace'

export default function ComparePage() {
  const { user } = useSession()
  const { compare, refresh } = useWorkspace()
  const [pick, setPick] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const selected = useMemo(
    () => compare.map((id) => getProviderById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getProviderById>>[],
    [compare]
  )
  const available = useMemo(
    () => providers.filter((p) => !compare.includes(p.id)),
    [compare]
  )

  const onAdd = () => {
    if (!pick) return
    const result = addToCompare(pick)
    if (result.ok) {
      setPick('')
      refresh()
    } else {
      setMessage(result.message ?? 'Could not add')
      setTimeout(() => setMessage(null), 2200)
    }
  }

  const rows: { label: string; render: (p: (typeof selected)[number]) => string }[] = [
    { label: 'Category', render: (p) => p.categoryName },
    { label: 'Regions', render: (p) => p.regions.join(', ') },
    { label: 'Uptime', render: (p) => `${p.uptime.toFixed(2)}%` },
    { label: 'Settlement', render: (p) => p.settlement },
    { label: 'Integration', render: (p) => p.integrationTime },
    { label: 'Sandbox', render: (p) => (p.partnering.sandbox ? 'Yes' : 'No') },
    { label: 'Intro required', render: (p) => (p.partnering.introRequired ? 'Yes' : 'No') },
    { label: 'Verified', render: (p) => (p.relayVerified ? 'Relay verified' : 'Listed') },
  ]

  const paidRows: { label: string; render: (p: (typeof selected)[number]) => string }[] = [
    { label: 'Headline fee', render: (p) => p.feeSchedule[0]?.bands[0]?.fee ?? '—' },
    { label: 'SLA target', render: (p) => p.sla.uptimeTarget },
    { label: 'Primary licence', render: (p) => p.licenses[0]?.name ?? '—' },
    { label: 'Onboarding', render: (p) => p.partnering.onboardingTime },
  ]

  return (
    <>
      <PageHeader
        index="03"
        label="Compare"
        title={
          <>
            Side-by-side <span className="serif-italic">diligence.</span>
          </>
        }
        desc={`Up to ${MAX_COMPARE} providers. Operator unlocks commercials, SLA and licences.`}
        action={
          selected.length > 0 ? (
            <button
              type="button"
              className="pg-btn pg-btn--ghost mono"
              onClick={() => {
                clearCompare()
                refresh()
              }}
            >
              Clear all
            </button>
          ) : undefined
        }
      />

      {message && <div className="pg-toast mono">{message}</div>}

      {compare.length < MAX_COMPARE && (
        <div className="cmp-add">
          <select className="cmp-select" value={pick} onChange={(e) => setPick(e.target.value)}>
            <option value="">Add a provider…</option>
            {available.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.categoryName}
              </option>
            ))}
          </select>
          <button type="button" className="pg-btn pg-btn--primary" onClick={onAdd} disabled={!pick}>
            Add to compare
          </button>
          <Link href="/dashboard/providers" className="pg-btn pg-btn--ghost mono">
            Browse directory
          </Link>
        </div>
      )}

      {selected.length === 0 ? (
        <EmptyState
          message="No providers selected for comparison yet."
          actionLabel="Browse directory"
          actionHref="/dashboard/providers"
        />
      ) : (
        <>
          <div className="dash-panel cmp-table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th className="cmp-row-label" />
                  {selected.map((p) => (
                    <th key={p.id}>
                      <div className="cmp-col-head">
                        <Link href={`/dashboard/providers/${p.id}`} className="cmp-col-name mono">
                          {p.name}
                        </Link>
                        <span className="cmp-col-cat">{p.categoryName}</span>
                        <button
                          type="button"
                          className="cmp-remove mono"
                          onClick={() => {
                            removeFromCompare(p.id)
                            refresh()
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="cmp-row-label mono">{row.label}</td>
                    {selected.map((p) => (
                      <td key={p.id}>{row.render(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Paywall user={user} title="Operator comparison" copy="Fee headlines, SLA targets, licences and onboarding times.">
            <div className="dash-panel cmp-table-wrap">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th className="cmp-row-label" />
                    {selected.map((p) => (
                      <th key={p.id} className="mono">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paidRows.map((row) => (
                    <tr key={row.label}>
                      <td className="cmp-row-label mono">{row.label}</td>
                      {selected.map((p) => (
                        <td key={p.id}>{row.render(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paywall>
        </>
      )}
    </>
  )
}
