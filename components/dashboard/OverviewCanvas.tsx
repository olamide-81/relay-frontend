'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import DashTooltip from '@/components/dashboard/DashTooltip'
import { useSession } from '@/hooks/useSession'
import { formatReportDate, getDataReports } from '@/data/reports'
import { directoryCategories } from '@/data/providers'
import './overview.css'

type LaneExtra = {
  feeRange: string
  settle: string
  corridors: string
  avatars: string[]
  more: number
}

const primaryLanes: { id: string; name: string; extra: LaneExtra }[] = [
  {
    id: 'payouts',
    name: 'Payouts',
    extra: {
      feeRange: '0.18–0.62%',
      settle: '4 min',
      corridors: '38',
      avatars: ['NE', 'KF', 'AV'],
      more: 39,
    },
  },
  {
    id: 'collections',
    name: 'Collections',
    extra: {
      feeRange: '0.22–0.85%',
      settle: 'T+0',
      corridors: '44',
      avatars: ['PX', 'MO', 'GC'],
      more: 48,
    },
  },
  {
    id: 'fx',
    name: 'FX',
    extra: {
      feeRange: '8–35 bps',
      settle: 'Same day',
      corridors: '62',
      avatars: ['WI', 'OF', 'TR'],
      more: 33,
    },
  },
]

const othersExtra: LaneExtra = {
  feeRange: 'Varies',
  settle: 'API',
  corridors: '120+',
  avatars: ['VS', 'SM', 'ID'],
  more: 78,
}

const sampleShortlist = [
  {
    rank: '01',
    name: 'Nordbridge Payments',
    meta: 'SE · EMI licence · 31 corridors',
    fee: '0.18%',
    score: 92,
  },
  {
    rank: '02',
    name: 'Kestrel Pay',
    meta: 'UK · EMI · 28 corridors',
    fee: '0.24%',
    score: 84,
  },
  {
    rank: '03',
    name: 'Avenir Global',
    meta: 'SG · MPI · 41 corridors',
    fee: '0.31%',
    score: 76,
  },
  {
    rank: '04',
    name: 'Meridian Rails',
    meta: 'NL · PI · 22 corridors',
    fee: '0.36%',
    score: 68,
  },
]

function getCategoryMeta(id: string) {
  return directoryCategories.find((c) => c.id === id)
}

const othersCount = directoryCategories
  .filter((c) => !['payouts', 'collections', 'fx'].includes(c.id))
  .reduce((sum, c) => sum + c.count, 0)

function greetingForHour(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function firstName(user: { firstName?: string; fullName?: string; email?: string } | null) {
  if (user?.firstName?.trim()) return user.firstName.trim()
  if (user?.fullName?.trim()) return user.fullName.trim().split(/\s+/)[0]
  if (user?.email) return user.email.split('@')[0]
  return 'there'
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6.5 13.5 13.5 6.5M13.5 6.5H9M13.5 6.5V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3.5 11.8 7.2l4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3.5" y="4.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="4.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MarketIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 10h13M10 3.5a10.5 10.5 0 0 1 0 13M10 3.5a10.5 10.5 0 0 0 0 13"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg className="dash-ov-lane-folder" viewBox="0 0 44 36" fill="none" aria-hidden>
      <path
        d="M5 12a2.5 2.5 0 0 1 2.5-2.5h10.5l3.5 3.5H37a2.5 2.5 0 0 1 2.5 2.5v14a2.5 2.5 0 0 1-2.5 2.5H7.5A2.5 2.5 0 0 1 5 26V12Z"
        fill="rgba(17, 17, 17, 0.06)"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M5 15h34" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function DirectoryLane({
  href,
  name,
  description,
  count,
  extra,
}: {
  href: string
  name: string
  description: string
  count: number
  extra: LaneExtra
}) {
  return (
    <Link href={href} className="dash-ov-lane">
      <div className="dash-ov-lane-top">
        <FolderIcon />
        <div className="dash-ov-lane-count-wrap">
          <span className="dash-ov-lane-count">{count}</span>
          <span className="dash-ov-lane-count-label">providers</span>
        </div>
      </div>
      <div className="dash-ov-lane-copy">
        <span className="dash-ov-lane-name">{name}</span>
        <span className="dash-ov-lane-desc">{description}</span>
      </div>
      <div className="dash-ov-lane-chart" aria-hidden>
        <span style={{ height: '38%' }} />
        <span style={{ height: '62%' }} />
        <span style={{ height: '48%' }} />
        <span style={{ height: '78%' }} />
        <span style={{ height: '54%' }} />
        <span style={{ height: '70%' }} />
      </div>
      <dl className="dash-ov-lane-stats">
        <div>
          <dt>Fee range</dt>
          <dd>{extra.feeRange}</dd>
        </div>
        <div>
          <dt>Median settle</dt>
          <dd>{extra.settle}</dd>
        </div>
        <div>
          <dt>Corridors</dt>
          <dd>{extra.corridors}</dd>
        </div>
      </dl>
      <div className="dash-ov-lane-foot">
        <div className="dash-ov-lane-avatars" aria-hidden>
          {extra.avatars.map((initials) => (
            <span key={initials}>{initials}</span>
          ))}
          <em>+{extra.more}</em>
        </div>
        <span className="dash-ov-lane-arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  )
}

function OverviewGreeting() {
  const { user } = useSession()
  const locale = useLocale()

  const dateLabel = useMemo(() => {
    const tag = locale === 'en' ? 'en-GB' : locale === 'zh' ? 'zh-CN' : locale
    return new Date()
      .toLocaleDateString(tag, { weekday: 'long', day: 'numeric', month: 'short' })
      .toUpperCase()
  }, [locale])

  const hour = new Date().getHours()

  return (
    <header className="dash-ov-greeting">
      <div className="dash-ov-greeting-copy">
        <p className="dash-ov-greeting-date">{dateLabel}</p>
        <h2 className="dash-ov-greeting-title">
          {greetingForHour(hour)}, {firstName(user)}
        </h2>
      </div>
      <div className="dash-ov-greeting-actions">
        <Link href="/dashboard/shortlists" className="dash-ov-btn dash-ov-btn--ghost">
          New shortlist
        </Link>
        <Link href="/dashboard/intros" className="dash-ov-btn dash-ov-btn--primary">
          Request intro
        </Link>
      </div>
    </header>
  )
}

function OverviewMetrics() {
  const totalProviders = directoryCategories.reduce((sum, c) => sum + c.count, 0)

  const metrics = [
    { label: 'Open requests', value: '7', hint: '3 awaiting you', tone: 'up' as const },
    { label: 'Shortlisted', value: '12', hint: 'across 3 lists', tone: 'flat' as const },
    { label: 'Median payout fee', value: '0.42%', hint: '+3bps 30d', tone: 'alert' as const },
    {
      label: 'Directory',
      value: String(totalProviders || 210),
      hint: 'providers mapped',
      tone: 'flat' as const,
    },
  ]

  return (
    <div className="dash-ov-metrics" role="list" aria-label="Workspace metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="dash-ov-metric" role="listitem">
          <span className="dash-ov-metric-label">{metric.label}</span>
          <div className="dash-ov-metric-row">
            <strong className="dash-ov-metric-value">{metric.value}</strong>
            <span className={`dash-ov-metric-hint is-${metric.tone}`}>{metric.hint}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProviderDirectorySection() {
  return (
    <article className="dash-ov-card dash-ov-card--wide dash-ov-card--directory">
      <header className="dash-ov-directory-head">
        <div className="dash-ov-directory-copy">
          <h2 className="dash-ov-directory-title">Provider Directory</h2>
          <p className="dash-ov-directory-desc">
            Browse payouts, collections, FX and adjacent categories — compare fees, licences and SLAs
            before you request an intro.
          </p>
        </div>
        <DashTooltip
          side="bottom"
          title="View Full Provider Directory"
          hint="Open the complete directory with search, filters and provider profiles."
        >
          <Link
            href="/dashboard/providers"
            className="dash-icon-btn dash-ov-directory-link"
            aria-label="View Full Provider Directory"
          >
            <ArrowUpRightIcon />
          </Link>
        </DashTooltip>
      </header>

      <div className="dash-ov-lanes">
        {primaryLanes.map(({ id, name, extra }) => {
          const meta = getCategoryMeta(id)
          return (
            <DirectoryLane
              key={id}
              href={`/dashboard/providers?cat=${id}`}
              name={name}
              description={meta?.description ?? ''}
              count={meta?.count ?? 0}
              extra={extra}
            />
          )
        })}
        <DirectoryLane
          href="/dashboard/providers"
          name="Others"
          description="Banking, cards, identity, compliance and open banking"
          count={othersCount}
          extra={othersExtra}
        />
      </div>
    </article>
  )
}

function ShortlistsSection() {
  return (
    <article className="dash-ov-card">
      <header className="dash-ov-card-head">
        <div>
          <h2 className="dash-ov-card-title">Shortlist · Q3 payout RFP</h2>
          <p className="dash-ov-card-sub">Scored against fee, settle and licence fit</p>
        </div>
        <div className="dash-ov-card-actions">
          <span className="dash-ov-badge">4 of 6 scored</span>
          <DashTooltip side="bottom" title="Add provider" hint="Browse the directory and save providers to a shortlist.">
            <Link
              href="/dashboard/providers"
              className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon"
              aria-label="Add provider"
            >
              <PlusIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Compare saved" hint="Compare providers you have already shortlisted.">
            <Link
              href="/dashboard/compare"
              className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon"
              aria-label="Compare saved"
            >
              <CompareIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Open shortlists" hint="View and manage all of your saved lists.">
            <Link
              href="/dashboard/shortlists"
              className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon"
              aria-label="Open shortlists"
            >
              <StarIcon />
            </Link>
          </DashTooltip>
        </div>
      </header>
      <div className="dash-ov-card-body">
        <ol className="dash-ov-shortlist-rows">
          {sampleShortlist.map((row) => (
            <li key={row.rank} className="dash-ov-shortlist-row">
              <span className="dash-ov-shortlist-rank">{row.rank}</span>
              <div className="dash-ov-shortlist-main">
                <strong>{row.name}</strong>
                <span>{row.meta}</span>
              </div>
              <div className="dash-ov-shortlist-score">
                <span>{row.fee}</span>
                <i style={{ width: `${row.score}%` }} aria-hidden />
              </div>
            </li>
          ))}
        </ol>
        <div className="dash-ov-shortlist-footer">
          <p>Preview list — save real providers from the directory to replace this sample.</p>
          <Link href="/dashboard/providers" className="dash-ov-shortlist-cta">
            Start in directory
          </Link>
        </div>
      </div>
    </article>
  )
}

function IntelligenceSection() {
  const locale = useLocale()
  const reports = getDataReports(locale)
  const featured = reports[0]

  if (!featured) return null

  return (
    <article className="dash-ov-card dash-ov-card--intel">
      <header className="dash-ov-card-head">
        <h2 className="dash-ov-card-title">Intelligence</h2>
        <div className="dash-ov-card-actions">
          <DashTooltip side="bottom" title="All reports" hint="Open the full reports view on this workspace.">
            <Link
              href="/dashboard#reports"
              className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon"
              aria-label="All reports"
            >
              <ArrowUpRightIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Markets" hint="Regional context to pair with report findings.">
            <Link
              href="/dashboard/markets"
              className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon"
              aria-label="Markets"
            >
              <MarketIcon />
            </Link>
          </DashTooltip>
        </div>
      </header>
      <div className="dash-ov-card-body">
        <div className="dash-ov-intel">
          <Link href="/dashboard#reports" className="dash-ov-intel-featured">
            <div className="dash-ov-intel-kicker">
              <span className="dash-ov-intel-cat">{featured.category}</span>
              <span className="dash-ov-intel-read">{featured.readMinutes} min read</span>
            </div>
            <div className="dash-ov-intel-stat">
              <span className="dash-ov-intel-stat-value">{featured.heroStat.value}</span>
              <span className="dash-ov-intel-stat-label">{featured.heroStat.label}</span>
            </div>
            <h3 className="dash-ov-intel-title">{featured.title}</h3>
            <p className="dash-ov-intel-excerpt">{featured.dek ?? featured.excerpt}</p>
            <span className="dash-ov-intel-meta">
              {featured.market} · {formatReportDate(featured.publishedAt, locale)}
            </span>
          </Link>
          <p className="dash-ov-intel-note">EU instant-payout mandate lands Oct 9 · 6 min</p>
        </div>
      </div>
    </article>
  )
}

export default function OverviewCanvas() {
  return (
    <div className="dash-ov-canvas">
      <OverviewGreeting />
      <OverviewMetrics />
      <ProviderDirectorySection />
      <div className="dash-ov-grid">
        <ShortlistsSection />
        <IntelligenceSection />
      </div>
    </div>
  )
}
