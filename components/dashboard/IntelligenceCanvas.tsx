'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { feeIndex, newsItems } from '@/lib/mock/relay'
import type { NewsItem } from '@/lib/relay/types'

type Filter = 'All' | 'Regulation' | 'Pricing'

export default function IntelligenceCanvas() {
  const [filter, setFilter] = useState<Filter>('All')
  const [following, setFollowing] = useState(false)

  const rows = useMemo(() => {
    if (filter === 'Regulation') return newsItems.filter((n) => n.kind === 'REGULATION')
    if (filter === 'Pricing') return newsItems.filter((n) => n.kind === 'PRICING')
    return newsItems
  }, [filter])

  return (
    <div className="relay-page relay-page--intelligence">
      <div className="relay-hd">
        <div>
          <h1 className="relay-hd-title">Intelligence</h1>
          <div className="relay-hd-sub">Fee indices, regulation and market maps for 38 corridors</div>
        </div>
        <div className="relay-hd-actions">
          <button
            type="button"
            className="relay-btn relay-btn--outline"
            onClick={() => setFollowing((v) => !v)}
          >
            {following ? 'Following corridors' : 'Follow my corridors'}
          </button>
        </div>
      </div>

      <div className="relay-intel-top">
        <div className="relay-featured">
          <div className="relay-featured-kicker">MARKET MAP · 28 MIN READ</div>
          <h2>
            The world moves $35 trillion a day. Fintech handles a tenth of it — and the payout layer compounds
            fastest.
          </h2>
          <div className="relay-featured-foot">
            <Link href="/dashboard/intelligence/fintech-35-trillion-daily" className="relay-featured-btn">
              Read the map
            </Link>
            <span className="relay-featured-meta">Published 21 Aug · covers 14 markets</span>
          </div>
        </div>
        <div className="relay-index">
          <div className="relay-index-head">
            Fee index · your corridors
            <span>90 DAYS</span>
          </div>
          <div className="relay-index-bars" aria-hidden>
            {feeIndex.map((h, i) => (
              <div
                key={i}
                className={`relay-index-bar${i > 10 ? ' relay-index-bar--lime' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="relay-index-foot">
            <div>
              <strong>+11 bps</strong>
              <span>EU→LATAM</span>
            </div>
            <div>
              <strong>−4 bps</strong>
              <span>US→APAC</span>
            </div>
            <Link href="/dashboard/providers?category=payouts" className="relay-link" style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              See affected providers →
            </Link>
          </div>
        </div>
      </div>

      <div className="relay-panel relay-panel--20 relay-week">
        <div className="relay-week-head">
          <span>This week</span>
          <div className="relay-toggle">
            {(['All', 'Regulation', 'Pricing'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={filter === f ? 'relay-toggle--on' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="relay-week-filter">Filtered to your 6 corridors</span>
        </div>
        <div className="relay-rows">
          {rows.map((n) => (
            <NewsRow key={n.title} item={n} />
          ))}
        </div>
      </div>
    </div>
  )
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <div className="relay-news-row">
      <span className={`relay-news-kind relay-news-kind--${item.kind}`}>{item.kind}</span>
      <div>
        <div className="relay-news-title">{item.title}</div>
        <div className="relay-news-meta">{item.meta}</div>
      </div>
      <span className="relay-news-affects">{item.affects}</span>
      <span className="relay-news-when">{item.when}</span>
    </div>
  )
}
