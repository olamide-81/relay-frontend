'use client'

import { Link } from '@/i18n/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { markets } from '@/data/markets'

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        index="06"
        label="Markets"
        title={
          <>
            Build in the right <span className="serif-italic">jurisdiction.</span>
          </>
        }
        desc="Licences, regulators, policy, news and the local stack — for every market a fintech actually launches in."
      />

      <div className="mkt-grid">
        {markets.map((m) => (
          <Link key={m.id} href={`/dashboard/markets/${m.id}`} className="mkt-card">
            <span className="mkt-region mono">{m.region}</span>
            <h2 className="mkt-name">{m.name}</h2>
            <p>{m.headline}</p>
            <span className="mkt-reg mono">{m.regulator}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
