import type { CommercialLine, CommercialPackage, SharedBenefit } from '@/lib/relay/types'
import { commercialsSummary } from '@/lib/relay/format'

export function CommercialsCompact({ packages }: { packages: CommercialPackage[] }) {
  const summary = commercialsSummary(packages)
  return (
    <div className="relay-comms">
      <span className="relay-comms-head">{summary.headline}</span>
      {summary.sub ? <span className="relay-comms-sub">{summary.sub}</span> : null}
    </div>
  )
}

function isSchedule(pkg: CommercialPackage) {
  return (pkg.lines ?? []).some((line) => Boolean(line.currency || line.channel))
}

function lineKey(line: CommercialLine, i: number) {
  return [line.currency, line.channel, line.label, line.value, i].filter(Boolean).join('-')
}

function ScheduleTable({ pkg }: { pkg: CommercialPackage }) {
  const lines = pkg.lines ?? []
  const showCurrency = lines.some((line) => line.currency)
  const showChannel = lines.some((line) => line.channel)
  return (
    <div className="relay-comm-table-wrap">
      <table className="relay-comm-table">
        <thead>
          <tr>
            {showCurrency ? <th>Currency</th> : null}
            {showChannel ? <th>{showCurrency ? 'Channels' : 'Item'}</th> : null}
            {!showCurrency && !showChannel ? <th>Item</th> : null}
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={lineKey(line, i)}>
              {showCurrency ? <td>{line.currency || '—'}</td> : null}
              {showChannel ? <td>{line.channel || line.label}</td> : null}
              {!showCurrency && !showChannel ? <td>{line.label}</td> : null}
              <td>
                <strong>{line.value}</strong>
                {line.note ? <span className="relay-comm-td-note">{line.note}</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LimitsTable({ pkg }: { pkg: CommercialPackage }) {
  if (!pkg.limits?.length) return null
  return (
    <div className="relay-comm-table-wrap">
      <div className="relay-comm-limits-lab">Transfer limits</div>
      <table className="relay-comm-table">
        <thead>
          <tr>
            <th>Channel</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {pkg.limits.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.min || '—'}</td>
              <td>{row.max || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PackageCard({ pkg }: { pkg: CommercialPackage }) {
  const schedule = isSchedule(pkg)
  return (
    <article className={`relay-comm-card${schedule ? ' relay-comm-card--schedule' : ''}`}>
      <span className="relay-comm-badge">{pkg.name}</span>
      {pkg.kicker ? <div className="relay-comm-kicker">{pkg.kicker}</div> : null}
      <div className="relay-comm-headline">{pkg.headline}</div>
      {pkg.headlineNote ? <div className="relay-comm-hn">{pkg.headlineNote}</div> : null}
      {schedule ? (
        <ScheduleTable pkg={pkg} />
      ) : (pkg.lines ?? []).length ? (
        <ul className="relay-comm-lines">
          {(pkg.lines ?? []).map((line, i) => (
            <li key={lineKey(line, i)}>
              <span className="relay-comm-line-lab">{line.label}</span>
              <strong>{line.value}</strong>
              {line.note ? <em>{line.note}</em> : null}
            </li>
          ))}
        </ul>
      ) : null}
      <LimitsTable pkg={pkg} />
      {pkg.callout ? (
        <div className="relay-comm-callout">
          <strong>{pkg.callout.title}</strong>
          <p>{pkg.callout.body}</p>
        </div>
      ) : null}
    </article>
  )
}

export function CommercialPackages({
  packages,
  benefits,
}: {
  packages: CommercialPackage[]
  benefits?: SharedBenefit[]
}) {
  if (!packages.length) return null
  const schedules = packages.filter(isSchedule)
  const cards = packages.filter((pkg) => !isSchedule(pkg))
  return (
    <div className="relay-comm-block">
      {schedules.length ? (
        <div className="relay-comm-stack">
          {schedules.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      ) : null}
      {cards.length ? (
        <div className={`relay-comm-grid${cards.length === 1 ? ' relay-comm-grid--one' : ''}`}>
          {cards.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      ) : null}
      {benefits?.length ? (
        <div className="relay-comm-shared">
          <div className="relay-comm-shared-hd">
            <span>Notes</span>
            <em>Across these commercials</em>
          </div>
          <div className="relay-comm-shared-grid">
            {benefits.map((item) => (
              <div className="relay-comm-shared-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                {item.chips?.length ? (
                  <div className="relay-comm-chips">
                    {item.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
