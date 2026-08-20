'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { ProviderActions, VerifiedBadge } from '@/components/dashboard/ProviderActions'
import {
  directoryCategories,
  directoryGroups,
  getCategoriesByGroup,
  getCategoryById,
  getProvidersByCategory,
  searchProviders,
  totalProviderCount,
  type Provider,
} from '@/data/providers'
import { isSubscribed } from '@/lib/session'
import { useSession } from '@/hooks/useSession'
import { Suspense } from 'react'

function FolderIcon() {
  return (
    <svg className="dir-folder-icon" width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden>
      <path
        d="M4 8a2 2 0 0 1 2-2h10l3 3h15a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 11h32" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export default function DirectoryPage() {
  return (
    <Suspense>
      <DirectoryContent />
    </Suspense>
  )
}

function DirectoryContent() {
  const searchParams = useSearchParams()
  const { user } = useSession()
  const subscribed = isSubscribed(user)
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [region, setRegion] = useState('all')

  const searched = useMemo(() => searchProviders(query), [query])

  const regions = useMemo(() => {
    const set = new Set<string>()
    searched.forEach((p) => p.regions.forEach((r) => set.add(r)))
    return ['all', ...Array.from(set).sort()]
  }, [searched])

  const byRegion = useMemo(() => {
    if (region === 'all') return searched
    return searched.filter((p) => p.regions.includes(region))
  }, [searched, region])

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return directoryGroups
    return directoryGroups.filter((group) =>
      getCategoriesByGroup(group.id).some(
        (cat) =>
          cat.name.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q) ||
          byRegion.some((p) => p.categoryId === cat.id)
      )
    )
  }, [query, byRegion])

  const activeCategory = openFolder ? getCategoryById(openFolder) : null
  const activeProviders = openFolder
    ? getProvidersByCategory(openFolder).filter((p) =>
        region === 'all' ? true : p.regions.includes(region)
      )
    : []

  const showSearchHits = query.trim().length > 0 && !openFolder

  return (
    <>
      <PageHeader
        index="02"
        label="Directory"
        title={
          <>
            Find providers by <span className="serif-italic">market.</span>
          </>
        }
        desc={`${totalProviderCount} mapped partners. ${byRegion.length} full dossiers in this workspace.`}
      />

      <div className="dir-toolbar">
        <input
          type="search"
          className="dir-search"
          placeholder="Search providers, rails, countries…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpenFolder(null)
          }}
        />
        <select className="dir-select" value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === 'all' ? 'All regions' : r}
            </option>
          ))}
        </select>
      </div>

      {showSearchHits ? (
        <ProviderTable providers={byRegion} user={user} subscribed={subscribed} />
      ) : activeCategory ? (
        <div className="dir-open">
          <button type="button" className="dir-back mono" onClick={() => setOpenFolder(null)}>
            ← All folders
          </button>
          <div className="dir-open-head">
            <div className="dir-open-folder">
              <FolderIcon />
              <div>
                <h2 className="dir-open-name">{activeCategory.name}</h2>
                <p className="dir-open-desc">{activeCategory.description}</p>
              </div>
            </div>
            <div className="dir-open-count">
              <span className="dir-open-count-val">{activeCategory.count}</span>
              <span className="dir-open-count-label mono">mapped</span>
            </div>
          </div>
          <ProviderTable providers={activeProviders} user={user} subscribed={subscribed} />
        </div>
      ) : (
        filteredGroups.map((group) => {
          const cats = getCategoriesByGroup(group.id)
          const groupTotal = cats.reduce((sum, c) => sum + c.count, 0)
          return (
            <section key={group.id} className="dir-section">
              <div className="dir-section-head">
                <h2 className="dir-section-label mono">{group.label}</h2>
                <span className="dir-section-count mono">{groupTotal} mapped</span>
              </div>
              <div className="dir-grid">
                {cats.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="dir-folder"
                    onClick={() => setOpenFolder(cat.id)}
                  >
                    <div className="dir-folder-tab" aria-hidden />
                    <div className="dir-folder-body">
                      <FolderIcon />
                      <span className="dir-folder-count">{cat.count}</span>
                      <span className="dir-folder-name">{cat.name}</span>
                      <span className="dir-folder-meta mono">
                        {getProvidersByCategory(cat.id).length} dossiers live
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )
        })
      )}
    </>
  )
}

function ProviderTable({
  providers,
  user,
  subscribed,
}: {
  providers: Provider[]
  user: ReturnType<typeof useSession>['user']
  subscribed: boolean
}) {
  if (providers.length === 0) {
    return (
      <div className="dir-empty">
        <p>No dossiers match this filter yet.</p>
      </div>
    )
  }

  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <span className="dash-panel-title">Providers</span>
        <span className="dir-panel-note mono">{providers.length} shown</span>
      </div>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Region</th>
            <th>Uptime</th>
            <th>Settlement</th>
            <th>Fees</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.id}>
              <td>
                <Link href={`/dashboard/providers/${p.id}`} className="dir-name">
                  {p.name}
                </Link>
                <div className="dir-name-meta">
                  <VerifiedBadge verified={p.relayVerified} level={p.verificationLevel} />
                  <span className="mono">{p.categoryName}</span>
                </div>
              </td>
              <td>{p.regions.join(', ')}</td>
              <td className="mono">{p.uptime.toFixed(2)}%</td>
              <td>{p.settlement}</td>
              <td className="mono">
                {subscribed ? p.feeSchedule[0]?.bands[0]?.fee ?? '—' : 'Operator'}
              </td>
              <td>
                <ProviderActions provider={p} user={user} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
