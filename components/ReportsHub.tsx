'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  getDataReports,
  getReportCategories,
  type DataReport,
} from '@/data/reports'
import ReportPaperCard from '@/components/ReportPaperCard'
import Reveal from '@/components/Reveal'
import './report-hub.css'

type SortMode = 'latest' | 'market'

const PAGE_SIZE = 9

export default function ReportsHub() {
  const t = useTranslations('dataReports')
  const locale = useLocale()
  const reports = useMemo(() => getDataReports(locale), [locale])
  const categories = useMemo(() => getReportCategories(locale), [locale])
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortMode>('latest')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let list: DataReport[] =
      category === 'all'
        ? [...reports]
        : reports.filter((r) => r.category === category)

    if (sort === 'latest') {
      list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
  }, [category, sort, reports])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <div className="rph">
      <div className="rph-toolbar">
        <div className="rph-filters" role="tablist" aria-label="Report categories">
          <button
            type="button"
            role="tab"
            aria-selected={category === 'all'}
            className={`rph-filter${category === 'all' ? ' is-active' : ''}`}
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
              className={`rph-filter${category === cat ? ' is-active' : ''}`}
              onClick={() => {
                setCategory(cat)
                setVisible(PAGE_SIZE)
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rph-sort">
          <button
            type="button"
            className={`rph-sort-btn${sort === 'latest' ? ' is-active' : ''}`}
            onClick={() => setSort('latest')}
          >
            {t('sortLatest')}
          </button>
          <button
            type="button"
            className={`rph-sort-btn${sort === 'market' ? ' is-active' : ''}`}
            onClick={() => setSort('market')}
          >
            {t('sortMarket')}
          </button>
        </div>
      </div>

      <p className="rph-count">
        {t('showing', { shown: shown.length, total: filtered.length })}
      </p>

      <div className="rph-grid">
        {shown.map((report) => (
          <Reveal key={report.slug}>
            <ReportPaperCard report={report} />
          </Reveal>
        ))}
      </div>

      {hasMore ? (
        <div className="rph-more">
          <button
            type="button"
            className="rph-more-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            {t('loadMore')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
