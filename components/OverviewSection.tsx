'use client'

import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getDataReports } from '@/data/reports'
import { useWaitlist } from '@/components/WaitlistModal'
import Reveal from '@/components/Reveal'
import './overview.css'

type Metric = {
  label: string
  value: string
  hint: string
  tone?: 'up' | 'alert' | 'flat'
}

type Category = {
  key: string
  title: string
  count: string
  description: string
  feeRange: string
  settle: string
  corridors: string
  avatars: string[]
  more: string
}

type ShortlistRow = {
  rank: string
  name: string
  meta: string
  fee: string
  score: number
}

const CALENDLY =
  'https://calendly.com/gratebridgelabs/30min?month=2026-08'

/**
 * Product-overview preview inspired by the Relay workspace dashboard:
 * greeting + CTAs, metrics strip, category directory, shortlist + intelligence.
 */
export default function OverviewSection() {
  const t = useTranslations('overview')
  const locale = useLocale()
  const { openWaitlist } = useWaitlist()
  const metrics = t.raw('metrics') as Metric[]
  const categories = t.raw('categories') as Category[]
  const shortlist = t.raw('shortlist.rows') as ShortlistRow[]

  const featured = useMemo(() => {
    const reports = [...getDataReports(locale)].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    return reports[0] ?? null
  }, [locale])

  const greetingDate = useMemo(() => {
    const tag =
      locale === 'en' ? 'en-GB' : locale === 'zh' ? 'zh-CN' : locale
    return new Date()
      .toLocaleDateString(tag, {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
      .toUpperCase()
  }, [locale])

  return (
    <section className="ov" id="providers" aria-labelledby="ov-title">
      <div className="ov-inner">
        <Reveal>
          <header className="ov-top">
            <div className="ov-greeting">
              <p className="ov-date">{greetingDate}</p>
              <h2 className="ov-title" id="ov-title">
                {t('greeting')}
              </h2>
              <p className="ov-lede">{t('lede')}</p>
            </div>
            <div className="ov-actions">
              <button
                type="button"
                className="ov-btn ov-btn--ghost"
                onClick={openWaitlist}
              >
                {t('ctaSecondary')}
              </button>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="ov-btn ov-btn--primary"
              >
                {t('ctaPrimary')}
              </a>
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="ov-metrics" role="list" aria-label={t('metricsLabel')}>
            {metrics.map((metric) => (
              <div key={metric.label} className="ov-metric" role="listitem">
                <span className="ov-metric-label">{metric.label}</span>
                <div className="ov-metric-row">
                  <strong className="ov-metric-value">{metric.value}</strong>
                  <span
                    className={`ov-metric-hint${metric.tone ? ` is-${metric.tone}` : ''}`}
                  >
                    {metric.hint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ov-directory-head">
            <div>
              <h3 className="ov-directory-title">{t('directory.title')}</h3>
              <p className="ov-directory-lede">{t('directory.lede')}</p>
            </div>
            <Link href="/#directory" className="ov-directory-link">
              {t('directory.all')}
            </Link>
          </div>
        </Reveal>

        <div className="ov-categories">
          {categories.map((cat, i) => (
            <Reveal key={cat.key} delay={0.05 * i} y={28}>
              <article className="ov-cat">
                <div className="ov-cat-top">
                  <h4 className="ov-cat-title">{cat.title}</h4>
                  <span className="ov-cat-count">{cat.count}</span>
                </div>
                <p className="ov-cat-desc">{cat.description}</p>
                <div className="ov-cat-chart" aria-hidden>
                  <span style={{ height: '38%' }} />
                  <span style={{ height: '62%' }} />
                  <span style={{ height: '48%' }} />
                  <span style={{ height: '78%' }} />
                  <span style={{ height: '54%' }} />
                  <span style={{ height: '70%' }} />
                </div>
                <dl className="ov-cat-stats">
                  <div>
                    <dt>{t('directory.feeRange')}</dt>
                    <dd>{cat.feeRange}</dd>
                  </div>
                  <div>
                    <dt>{t('directory.medianSettle')}</dt>
                    <dd>{cat.settle}</dd>
                  </div>
                  <div>
                    <dt>{t('directory.corridors')}</dt>
                    <dd>{cat.corridors}</dd>
                  </div>
                </dl>
                <div className="ov-cat-foot">
                  <div className="ov-avatars" aria-hidden>
                    {cat.avatars.map((initials) => (
                      <span key={initials}>{initials}</span>
                    ))}
                    <em>+{cat.more}</em>
                  </div>
                  <span className="ov-cat-arrow" aria-hidden>
                    →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="ov-split">
          <Reveal delay={0.08} y={24}>
            <aside className="ov-panel ov-shortlist">
              <div className="ov-panel-head">
                <div>
                  <h3 className="ov-panel-title">{t('shortlist.title')}</h3>
                  <p className="ov-panel-meta">{t('shortlist.meta')}</p>
                </div>
                <span className="ov-panel-badge">{t('shortlist.badge')}</span>
              </div>
              <ol className="ov-shortlist-rows">
                {shortlist.map((row) => (
                  <li key={row.rank} className="ov-shortlist-row">
                    <span className="ov-shortlist-rank">{row.rank}</span>
                    <div className="ov-shortlist-main">
                      <strong>{row.name}</strong>
                      <span>{row.meta}</span>
                    </div>
                    <div className="ov-shortlist-score">
                      <span>{row.fee}</span>
                      <i style={{ width: `${row.score}%` }} aria-hidden />
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>

          <Reveal delay={0.12} y={24}>
            <aside className="ov-panel ov-intel">
              <div className="ov-panel-head">
                <h3 className="ov-panel-title">{t('intel.title')}</h3>
                <Link href="/reports" className="ov-panel-link">
                  {t('intel.link')}
                </Link>
              </div>
              {featured ? (
                <Link
                  href={`/reports/${featured.slug}`}
                  className="ov-feature"
                >
                  <p className="ov-feature-stat">
                    {featured.heroStat?.value ?? featured.metrics[0]?.value}
                  </p>
                  <p className="ov-feature-label">
                    {featured.heroStat?.label ?? featured.metrics[0]?.label}
                  </p>
                  <p className="ov-feature-body">
                    {featured.excerpt}
                  </p>
                  <div className="ov-feature-meta">
                    <span>
                      {featured.readMinutes} {t('intel.minRead')}
                    </span>
                    <time dateTime={featured.publishedAt}>
                      {new Date(featured.publishedAt).toLocaleDateString(
                        locale === 'en' ? 'en-GB' : locale,
                        { month: 'short', day: 'numeric' },
                      )}
                    </time>
                  </div>
                </Link>
              ) : null}
              <p className="ov-intel-note">{t('intel.note')}</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
