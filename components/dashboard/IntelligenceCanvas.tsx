'use client'

import { useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  barHeights,
  formatIntelDate,
  getFeaturedArticle,
  getIntelArticles,
  getIntelPoints,
  type IntelKind,
} from '@/data/intel'

const FILTERS: Array<{ id: 'all' | IntelKind; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'RESEARCH', label: 'Research' },
  { id: 'MARKET', label: 'Market' },
  { id: 'REGULATION', label: 'Regulation' },
  { id: 'LICENSING', label: 'Licensing' },
]

export default function IntelligenceCanvas() {
  const locale = useLocale()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')

  const featured = useMemo(() => getFeaturedArticle(locale), [locale])
  const points = useMemo(() => getIntelPoints(locale), [locale])
  const articles = useMemo(() => getIntelArticles(locale), [locale])
  const heights = useMemo(() => barHeights(points), [points])
  const list = useMemo(
    () => articles.filter((item) => (filter === 'all' ? true : item.kind === filter)),
    [articles, filter]
  )
  const lead = points[0]
  const second = points[1]

  return (
    <div className="relay-page relay-page--intelligence">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Intelligence</h1>
          <div className="relay-hd-sub">Latest fintech articles and the data points behind them</div>
        </div>
      </div>

      <div className="relay-intel-top">
        {featured ? (
          <Link href={featured.href} className="relay-featured">
            <div className="relay-featured-kicker">{featured.kicker || 'RELAY RESEARCH'}</div>
            <h2>{featured.summary}</h2>
            <div className="relay-featured-foot">
              <span className="relay-featured-btn">Read article</span>
              <span className="relay-featured-meta">
                {featured.market}
                {featured.readMinutes ? ` · ${featured.readMinutes} min` : ''}
                {` · ${formatIntelDate(featured.date, locale)}`}
              </span>
            </div>
          </Link>
        ) : null}

        <div className="relay-index">
          <div className="relay-index-head">
            Fintech data points
            <span>LIVE</span>
          </div>
          <div className="relay-index-bars" aria-hidden>
            {heights.map((h, i) => (
              <i
                key={`${h}-${i}`}
                className={`relay-index-bar${i >= heights.length - 3 ? ' relay-index-bar--lime' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="relay-index-foot">
            <div>
              <strong>{lead?.value ?? '—'}</strong>
              <span>{lead?.label ?? 'Waiting on research'}</span>
            </div>
            <div>
              <strong>{second?.value ?? '—'}</strong>
              <span>{second?.label ?? ''}</span>
            </div>
          </div>
        </div>
      </div>

      {points.length ? (
        <div className="relay-points" aria-label="Fintech data points">
          {points.slice(0, 8).map((point) => (
            <div className="relay-point" key={point.id}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
              {point.delta ? <em>{point.delta}</em> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="relay-panel relay-week">
        <div className="relay-week-head">
          Latest articles
          <div className="relay-week-filter">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? 'is-on' : ''}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <div className="relay-empty-hint" style={{ padding: '28px' }}>
            No articles in this filter.
          </div>
        ) : (
          list.map((item) => (
            <Link key={item.id} href={item.href} className="relay-news-row">
              <span className={`relay-news-kind relay-news-kind--${item.kind}`}>{item.kind}</span>
              <div>
                <div className="relay-news-title">{item.title}</div>
                <div className="relay-news-meta">
                  {item.source} · {item.summary}
                </div>
              </div>
              <span className="relay-news-affects">{item.market}</span>
              <span className="relay-news-when">{formatIntelDate(item.date, locale)}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
