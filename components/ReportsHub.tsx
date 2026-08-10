'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  dataReports,
  formatReportDate,
  getReportCategories,
  type DataReport,
} from '@/data/reports'

type SortMode = 'latest' | 'market'

const PAGE_SIZE = 10

export default function ReportsHub() {
  const t = useTranslations('dataReports')
  const categories = useMemo(() => getReportCategories(), [])
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortMode>('latest')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let list: DataReport[] =
      category === 'all'
        ? [...dataReports]
        : dataReports.filter((r) => r.category === category)

    if (sort === 'latest') {
      list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } else {
      list.sort((a, b) => {
        const m = a.market.localeCompare(b.market)
        return m !== 0
          ? m
          : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
    }
    return list
  }, [category, sort])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <div className="dr-hub">
      <div className="dr-hub-toolbar">
        <div className="dr-page-filters" role="tablist" aria-label="Report categories">
          <button
            type="button"
            role="tab"
            aria-selected={category === 'all'}
            className={`dr-filter${category === 'all' ? ' is-active' : ''}`}
            onClick={() => {
              setCategory('all')
              setVisible(PAGE_SIZE)
            }}
          >
            {t('filterAll')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              className={`dr-filter${category === cat ? ' is-active' : ''}`}
              onClick={() => {
                setCategory(cat)
                setVisible(PAGE_SIZE)
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dr-hub-meta-row">
          <p className="dr-hub-count">{t('reportsCount', { count: filtered.length })}</p>
          <label className="dr-sort">
            <span className="dr-sort-label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              aria-label="Sort reports"
            >
              <option value="latest">{t('sortLatest')}</option>
              <option value="market">{t('sortMarket')}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="dr-list" role="list">
        {shown.map((report) => (
          <Link
            key={report.slug}
            href={`/reports/${report.slug}`}
            className="dr-list-item"
            role="listitem"
          >
            <div className="dr-list-main">
              <div className="dr-list-tags">
                <span className="dr-tag dr-tag--cat">{report.category}</span>
                <span className="dr-tag dr-tag--market">{report.market}</span>
              </div>
              <h2 className="dr-list-title">{report.title}</h2>
              <p className="dr-list-excerpt">{report.excerpt}</p>
              <div className="dr-list-meta">
                <span>{formatReportDate(report.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>
                  {report.readMinutes} {t('minRead')}
                </span>
              </div>
            </div>
            <div className="dr-list-stat">
              <strong>{report.heroStat.value}</strong>
              <span>{report.heroStat.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="dr-hub-footer">
        <p className="dr-hub-showing">
          {t('showing', { shown: shown.length, total: filtered.length })}
        </p>
        {hasMore ? (
          <button
            type="button"
            className="dr-load-more"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            {t('loadMore')}
          </button>
        ) : null}
      </div>
    </div>
  )
}
