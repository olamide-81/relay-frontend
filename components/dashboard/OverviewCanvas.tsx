'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import DashTooltip from '@/components/dashboard/DashTooltip'
import { formatReportDate, getDataReports } from '@/data/reports'
import { directoryCategories } from '@/data/providers'
import './overview.css'

const primaryLanes = [
  { id: 'payouts', name: 'Payouts' },
  { id: 'collections', name: 'Collections' },
  { id: 'fx', name: 'FX' },
] as const

function getCategoryMeta(id: string) {
  return directoryCategories.find((c) => c.id === id)
}

const othersCount = directoryCategories
  .filter((c) => !['payouts', 'collections', 'fx'].includes(c.id))
  .reduce((sum, c) => sum + c.count, 0)

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6.5 13.5 13.5 6.5M13.5 6.5H9M13.5 6.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      <path d="M3.5 10h13M10 3.5a10.5 10.5 0 0 1 0 13M10 3.5a10.5 10.5 0 0 0 0 13" stroke="currentColor" strokeWidth="1.5" />
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
}: {
  href: string
  name: string
  description: string
  count: number
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
    </Link>
  )
}

function ProviderDirectorySection() {
  return (
    <article className="dash-ov-card dash-ov-card--wide dash-ov-card--directory">
      <header className="dash-ov-directory-head">
        <div className="dash-ov-directory-copy">
          <h2 className="dash-ov-directory-title">Provider Directory</h2>
          <p className="dash-ov-directory-desc">
            Browse payouts, collections, FX and adjacent categories — compare fees, licences and SLAs before you request an intro.
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
        {primaryLanes.map(({ id, name }) => {
          const meta = getCategoryMeta(id)
          return (
            <DirectoryLane
              key={id}
              href={`/dashboard/providers?cat=${id}`}
              name={name}
              description={meta?.description ?? ''}
              count={meta?.count ?? 0}
            />
          )
        })}
        <DirectoryLane
          href="/dashboard/providers"
          name="Others"
          description="Banking, cards, identity, compliance and open banking"
          count={othersCount}
        />
      </div>
    </article>
  )
}

function ShortlistsSection() {
  return (
    <article className="dash-ov-card">
      <header className="dash-ov-card-head">
        <h2 className="dash-ov-card-title">Shortlists</h2>
        <div className="dash-ov-card-actions">
          <DashTooltip side="bottom" title="Add provider" hint="Browse the directory and save providers to a shortlist.">
            <Link href="/dashboard/providers" className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon" aria-label="Add provider">
              <PlusIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Compare saved" hint="Compare providers you have already shortlisted.">
            <Link href="/dashboard/compare" className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon" aria-label="Compare saved">
              <CompareIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Open shortlists" hint="View and manage all of your saved lists.">
            <Link href="/dashboard/shortlists" className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon" aria-label="Open shortlists">
              <StarIcon />
            </Link>
          </DashTooltip>
        </div>
      </header>
      <div className="dash-ov-card-body">
        <div className="dash-ov-shortlist-empty">
          <div className="dash-ov-shortlist-empty-icon" aria-hidden>
            <StarIcon />
          </div>
          <p className="dash-ov-shortlist-empty-title">No providers saved yet</p>
          <p className="dash-ov-shortlist-empty-desc">
            Shortlist partners while you research. Saved providers flow into compare and warm intro requests.
          </p>
          <ol className="dash-ov-shortlist-steps">
            <li>Browse a category in the directory</li>
            <li>Save providers you want to revisit</li>
            <li>Compare or request an intro from your list</li>
          </ol>
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
  const rest = reports.slice(1)

  if (!featured) return null

  return (
    <article className="dash-ov-card dash-ov-card--intel">
      <header className="dash-ov-card-head">
        <h2 className="dash-ov-card-title">Intelligence</h2>
        <div className="dash-ov-card-actions">
          <DashTooltip side="bottom" title="All reports" hint="Open the full reports view on this workspace.">
            <Link href="/dashboard#reports" className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon" aria-label="All reports">
              <ArrowUpRightIcon />
            </Link>
          </DashTooltip>
          <DashTooltip side="bottom" title="Markets" hint="Regional context to pair with report findings.">
            <Link href="/dashboard/markets" className="dash-icon-btn dash-icon-btn--rail dash-ov-card-icon" aria-label="Markets">
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
          {rest.length > 0 ? (
            <div className="dash-ov-intel-more">
              {rest.map((report) => (
                <Link key={report.slug} href="/dashboard#reports" className="dash-ov-intel-item">
                  <div className="dash-ov-intel-item-copy">
                    <span className="dash-ov-intel-cat">{report.category}</span>
                    <span className="dash-ov-intel-item-title">{report.title}</span>
                  </div>
                  <span className="dash-ov-intel-item-stat">{report.heroStat.value}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function OverviewCanvas() {
  return (
    <div className="dash-ov-canvas">
      <ProviderDirectorySection />
      <div className="dash-ov-grid">
        <ShortlistsSection />
        <IntelligenceSection />
      </div>
    </div>
  )
}
