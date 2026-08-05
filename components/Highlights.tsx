/**
 * Product highlights — Discover / Research / Act / Expansion-ready.
 * Directory-first visuals; cards share a single design system.
 */
'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import './highlights.css'

type Card = {
  title: string
  description: string
  points?: string[]
  mock: string
  cta?: string
}

type Block = {
  id: string
  title: string
  lede: string
  layout: 'triple' | 'double' | 'ready' | 'featured' | 'workflow'
  cards: Card[]
}

export default function Highlights() {
  const t = useTranslations('highlights')
  const blocks = t.raw('blocks') as Block[]

  return (
    <div className="hl" id="directory">
      {blocks.map((block) => (
        <section
          key={block.id}
          className={`hl-block hl-block--${block.layout}`}
          id={block.id}
        >
          <header className="hl-head">
            <h2 className="hl-title">{block.title}</h2>
            <p className="hl-lede">{block.lede}</p>
          </header>

          <div className={`hl-grid hl-grid--${block.layout}`}>
            {block.cards.map((card) => (
              <article
                key={card.title}
                className={`hl-card hl-card--${card.mock}`}
              >
                <div className="hl-card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.points && card.points.length > 0 ? (
                    <ul className="hl-points">
                      {card.points.map((point) => (
                        <li key={point}>
                          <span className="hl-point-mark" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {card.cta ? (
                    <Link href="/signup" className="hl-card-cta">
                      {card.cta}
                    </Link>
                  ) : null}
                </div>
                <div className="hl-card-stage" aria-hidden>
                  <Mock mock={card.mock} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ProviderMark({
  tone = 'a',
  glyph = 'node',
}: {
  tone?: 'a' | 'b' | 'c' | 'd' | 'e'
  glyph?: 'node' | 'rails' | 'card' | 'map' | 'link'
}) {
  return (
    <span className={`mock-mark mock-mark--${tone}`} aria-hidden>
      {glyph === 'node' && (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        </svg>
      )}
      {glyph === 'rails' && (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 8h14M5 12h14M5 16h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {glyph === 'card' && (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {glyph === 'map' && (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 20s6-4.4 6-9a6 6 0 1 0-12 0c0 4.6 6 9 6 9z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      {glyph === 'link' && (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M9.5 14.5l5-5M8 11H6.5a3.5 3.5 0 0 0 0 7H10M16 13h1.5a3.5 3.5 0 0 0 0-7H14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  )
}

type WorkflowTone = 'a' | 'b' | 'c' | 'd' | 'e'
type WorkflowGlyph = 'node' | 'rails' | 'card' | 'map' | 'link'
type PriorityKind = 'high' | 'medium' | 'normal' | 'done'
type StatusKind = 'shortlisted' | 'evaluating' | 'intalks' | 'pending' | 'introduced'

type WorkflowProvider = {
  name: string
  market: string
  category: string
  owner: string
  badge: string
  badgeKind: PriorityKind | StatusKind
  updated: string
  action: string
  note?: string
  recent?: boolean
  tone: WorkflowTone
  glyph: WorkflowGlyph
}

type WorkflowStage = {
  id: string
  label: string
  providers: WorkflowProvider[]
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'shortlist',
    label: 'Shortlist',
    providers: [
      {
        name: 'Nomba',
        market: 'Nairobi, KE',
        category: 'Payouts',
        owner: 'Unassigned',
        badge: 'High priority',
        badgeKind: 'high',
        updated: 'Updated 3d ago',
        action: 'Request intro',
        note: 'Shortlisted 3 days ago',
        tone: 'a',
        glyph: 'rails',
      },
      {
        name: 'Paystack',
        market: 'Accra, GH',
        category: 'Collections',
        owner: 'Tom Blake',
        badge: 'Shortlisted',
        badgeKind: 'shortlisted',
        updated: 'Updated 5d ago',
        action: 'View details',
        tone: 'c',
        glyph: 'card',
      },
    ],
  },
  {
    id: 'evaluating',
    label: 'Evaluating',
    providers: [
      {
        name: 'SettleFast',
        market: 'Nairobi, KE',
        category: 'Payouts',
        owner: 'Priya Shah',
        badge: 'In progress',
        badgeKind: 'evaluating',
        updated: 'Updated 6h ago',
        action: 'Schedule call',
        tone: 'b',
        glyph: 'node',
      },
      {
        name: 'Flutterwave',
        market: 'Accra, GH',
        category: 'Collections',
        owner: 'Priya Shah',
        badge: 'In progress',
        badgeKind: 'evaluating',
        updated: 'Updated 1d ago',
        action: 'View details',
        tone: 'd',
        glyph: 'link',
      },
    ],
  },
  {
    id: 'intalks',
    label: 'In talks',
    providers: [
      {
        name: 'Clearpath',
        market: 'Nairobi, KE',
        category: 'Payouts',
        owner: 'Maya Chen',
        badge: 'In talks',
        badgeKind: 'intalks',
        updated: 'Updated 4h ago',
        action: 'Schedule call',
        note: 'In talks with Maya Chen',
        recent: true,
        tone: 'e',
        glyph: 'map',
      },
      {
        name: 'Cellulant',
        market: 'Nairobi, KE',
        category: 'Collections',
        owner: 'Maya Chen',
        badge: 'Pending',
        badgeKind: 'pending',
        updated: 'Updated 2d ago',
        action: 'Request intro',
        tone: 'a',
        glyph: 'rails',
      },
    ],
  },
  {
    id: 'introduced',
    label: 'Introduced',
    providers: [
      {
        name: 'Dojah',
        market: 'Accra, GH',
        category: 'Identity',
        owner: 'Tom Blake',
        badge: 'Introduced',
        badgeKind: 'introduced',
        updated: 'Updated 2h ago',
        action: 'View details',
        note: 'Introduction sent 2h ago',
        recent: true,
        tone: 'c',
        glyph: 'node',
      },
      {
        name: 'Mono',
        market: 'Accra, GH',
        category: 'Banking data',
        owner: 'Maya Chen',
        badge: 'Introduced',
        badgeKind: 'introduced',
        updated: 'Updated 1d ago',
        action: 'View details',
        tone: 'b',
        glyph: 'card',
      },
    ],
  },
]

function WorkflowBoard() {
  const total = WORKFLOW_STAGES.reduce((n, s) => n + s.providers.length, 0)

  return (
    <div className="mock mock-workflow">
      <div className="mock-wf-chrome">
        <div className="mock-wf-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <em>relay / pipeline</em>
        <div className="mock-wf-live">
          <span className="mock-wf-live-dot" />
          Live
        </div>
      </div>

      <div className="mock-wf-toolbar">
        <div className="mock-wf-title-block">
          <strong>Africa payouts pipeline</strong>
          <span>
            {total} providers · Maya Chen · Tom Blake
          </span>
        </div>
        <div className="mock-wf-meta">
          <span className="mock-wf-pill">High · 1</span>
          <span className="mock-wf-pill mock-wf-pill--muted">Just now</span>
        </div>
      </div>

      <div className="mock-wf-board">
        {WORKFLOW_STAGES.map((stage) => {
          // Show lead card + keep count so the board reads as a full pipeline
          const lead = stage.providers[0]
          return (
            <div key={stage.id} className="mock-wf-stage">
              <div className="mock-wf-stage-head">
                <h4>{stage.label}</h4>
                <span className="mock-wf-count">{stage.providers.length}</span>
              </div>
              <div className="mock-wf-cards">
                <div
                  className={`mock-wf-card${lead.recent ? ' is-recent' : ''}`}
                >
                  <div className="mock-wf-card-top">
                    <ProviderMark tone={lead.tone} glyph={lead.glyph} />
                    <div className="mock-wf-card-id">
                      <strong>{lead.name}</strong>
                      <span>
                        {lead.market} · {lead.category}
                      </span>
                    </div>
                    {lead.recent ? (
                      <span className="mock-wf-pulse" title="Recent activity" />
                    ) : null}
                  </div>

                  <div className="mock-wf-card-row">
                    <span className={`mock-wf-badge badge-${lead.badgeKind}`}>
                      {lead.badge}
                    </span>
                    <time>{lead.updated.replace(/^Updated /, '')}</time>
                  </div>

                  <div className="mock-wf-card-owner">
                    <span className="mock-wf-owner-label">Owner</span>
                    <span className="mock-wf-owner-name">{lead.owner}</span>
                  </div>

                  {lead.note ? (
                    <p className="mock-wf-note">{lead.note}</p>
                  ) : null}

                  <button type="button" className="mock-wf-action" tabIndex={-1}>
                    {lead.action}
                  </button>
                </div>

                {stage.providers.length > 1 ? (
                  <div className="mock-wf-more">
                    +{stage.providers.length - 1} more
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type SignalKind = 'regulation' | 'provider' | 'rail' | 'heat'
type MarketTone = 'active' | 'emerging' | 'stable'

type MarketSignal = {
  id: string
  market: string
  flag: string
  kind: SignalKind
  label: string
  headline: string
  time: string
  live?: boolean
}

type MarketChip = {
  market: string
  flag: string
  tone: MarketTone
  meta: string
  trend: string
}

const MARKET_SIGNALS: MarketSignal[] = [
  {
    id: 'co-pse',
    market: 'Colombia',
    flag: 'CO',
    kind: 'rail',
    label: 'New rail',
    headline: 'PSE instant payments now mandatory for banks',
    time: 'Just now',
    live: true,
  },
  {
    id: 'eg-instapay',
    market: 'Egypt',
    flag: 'EG',
    kind: 'heat',
    label: 'Market heat',
    headline: 'Central Bank InstaPay adoption push live on corridor',
    time: '2h ago',
  },
  {
    id: 'ke-clearpath',
    market: 'Kenya',
    flag: 'KE',
    kind: 'provider',
    label: 'New provider',
    headline: 'Clearpath expands to Kenya and Uganda',
    time: '5h ago',
  },
  {
    id: 'br-pix',
    market: 'Brazil',
    flag: 'BR',
    kind: 'regulation',
    label: 'Regulation',
    headline: 'Pix rules expand for open-finance payout providers',
    time: 'Yesterday',
  },
]

const MARKET_CHIPS: MarketChip[] = [
  {
    market: 'Colombia',
    flag: 'CO',
    tone: 'active',
    meta: '9 providers',
    trend: '↑ Hot',
  },
  {
    market: 'Egypt',
    flag: 'EG',
    tone: 'emerging',
    meta: '7 providers',
    trend: 'Watch',
  },
  {
    market: 'Kenya',
    flag: 'KE',
    tone: 'active',
    meta: '11 providers',
    trend: '↑ Hot',
  },
  {
    market: 'Brazil',
    flag: 'BR',
    tone: 'stable',
    meta: '16 providers',
    trend: 'Stable',
  },
]

function SignalsMonitor() {
  return (
    <div className="mock mock-signals">
      <header className="mock-sig-head">
        <div className="mock-sig-head-left">
          <span className="mock-sig-live">
            <span className="mock-sig-live-dot" />
            Live
          </span>
          <strong>Market signals</strong>
        </div>
        <span className="mock-sig-count">4 new this week</span>
      </header>

      <ul className="mock-sig-list">
        {MARKET_SIGNALS.map((signal) => (
          <li
            key={signal.id}
            className={`mock-sig-row mock-sig-row--${signal.kind}${
              signal.live ? ' is-live' : ''
            }`}
          >
            <span className={`mock-sig-dot mock-sig-dot--${signal.kind}`} />
            <div className="mock-sig-main">
              <div className="mock-sig-line">
                <span className="mock-sig-market">
                  <em>{signal.flag}</em>
                  {signal.market}
                </span>
                <span className={`mock-sig-badge mock-sig-badge--${signal.kind}`}>
                  {signal.label}
                </span>
                <time className={signal.live ? 'is-now' : undefined}>{signal.time}</time>
              </div>
              <p>{signal.headline}</p>
            </div>
          </li>
        ))}
      </ul>

      <footer className="mock-sig-foot">
        <div className="mock-sig-foot-label">Market status</div>
        <div className="mock-sig-chips">
          {MARKET_CHIPS.map((m) => (
            <div
              key={m.market}
              className={`mock-sig-chip mock-sig-chip--${m.tone}`}
              title={`${m.market}: ${m.meta}`}
            >
              <span className="mock-sig-chip-flag">{m.flag}</span>
              <span className="mock-sig-chip-name">{m.market}</span>
              <span className="mock-sig-chip-meta">{m.meta}</span>
              <span className="mock-sig-chip-trend">{m.trend}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

function Mock({ mock }: { mock: string }) {
  switch (mock) {
    case 'search':
      return (
        <div className="mock mock-search">
          <div className="mock-search-chrome">
            <span />
            <span />
            <span />
            <em>relay / discover</em>
          </div>
          <div className="mock-search-bar">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M15.5 15.5L20 20"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="mock-search-q">
              Payouts in Africa
              <i />
            </span>
          </div>
          <div className="mock-pills">
            <span className="is-on">Africa</span>
            <span className="is-on">Payouts</span>
            <span>Fee ≤ 1.2%</span>
            <span>Sandbox</span>
          </div>
          <div className="mock-result-meta">
            <span>12 matches</span>
            <span>Sorted by coverage</span>
          </div>
          <div className="mock-results">
            {[
              {
                name: 'Provider A',
                meta: 'Payouts · 34 markets',
                fee: '0.9%',
                tag: 'Live',
                tone: 'a' as const,
                glyph: 'rails' as const,
              },
              {
                name: 'Provider B',
                meta: 'Collections + payouts · multi-market',
                fee: '1.0%',
                tag: 'Sandbox',
                tone: 'b' as const,
                glyph: 'card' as const,
              },
              {
                name: 'Provider C',
                meta: 'Payouts · regional footprint',
                fee: '1.1%',
                tag: 'Live',
                tone: 'c' as const,
                glyph: 'node' as const,
              },
            ].map((row) => (
              <div key={row.name} className="mock-result">
                <ProviderMark tone={row.tone} glyph={row.glyph} />
                <div className="mock-result-body">
                  <div className="mock-result-top">
                    <strong>{row.name}</strong>
                    <em>{row.fee}</em>
                  </div>
                  <span>{row.meta}</span>
                </div>
                <span className={`mock-result-tag tag-${row.tag.toLowerCase()}`}>
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )

    case 'people':
      return (
        <div className="mock mock-people">
          {[
            {
              tag: 'Live',
              tagClass: 'is-live',
              name: 'Africa · Payouts',
              role: '48 providers · 12 with sandbox',
              tone: 'd' as const,
              glyph: 'map' as const,
            },
            {
              tag: 'Corridor',
              tagClass: 'is-new',
              name: 'Cross-border',
              role: 'Same-day on 4 rails',
              tone: 'a' as const,
              glyph: 'rails' as const,
            },
            {
              tag: 'Coverage',
              tagClass: 'is-list',
              name: 'Regional footprint',
              role: 'Collections + banking data',
              tone: 'e' as const,
              glyph: 'node' as const,
            },
          ].map((p) => (
            <div key={p.name} className="mock-person">
              <div className="mock-person-top">
                <ProviderMark tone={p.tone} glyph={p.glyph} />
                <span className={`mock-person-tag ${p.tagClass}`}>{p.tag}</span>
              </div>
              <strong>{p.name}</strong>
              <span>{p.role}</span>
            </div>
          ))}
        </div>
      )

    case 'network':
      return (
        <div className="mock mock-network">
          <div className="mock-network-card">
            <div className="mock-network-chrome">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <em>relay / shortlists</em>
              <span className="mock-network-badge">Shared</span>
            </div>

            <div className="mock-network-head">
              <ProviderMark tone="b" glyph="link" />
              <div className="mock-network-titles">
                <strong>Africa payouts shortlist</strong>
                <span>3 providers · team shared</span>
              </div>
              <div className="mock-network-shared" aria-hidden>
                <span className="mock-activity-avatar mock-mark--a">M</span>
                <span className="mock-activity-avatar mock-mark--d">T</span>
                <span className="mock-activity-avatar mock-mark--e">P</span>
              </div>
            </div>

            <div className="mock-shortlist">
              <div className="mock-shortlist-caption">
                <span>Provider</span>
                <span>Status</span>
              </div>
              {[
                {
                  name: 'Provider A',
                  meta: 'Payouts · 34 markets',
                  status: 'Live',
                  statusKind: 'live' as const,
                  tone: 'a' as const,
                  glyph: 'rails' as const,
                },
                {
                  name: 'Provider B',
                  meta: 'Collections · Sandbox only',
                  status: 'Sandbox',
                  statusKind: 'sandbox' as const,
                  tone: 'b' as const,
                  glyph: 'card' as const,
                },
                {
                  name: 'Provider C',
                  meta: 'Payouts · 18 markets',
                  status: 'Live',
                  statusKind: 'live' as const,
                  tone: 'c' as const,
                  glyph: 'node' as const,
                },
              ].map((row, i) => (
                <div
                  key={row.name}
                  className={`mock-shortlist-row${i === 0 ? ' is-lead' : ''}`}
                >
                  <span className="mock-shortlist-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ProviderMark tone={row.tone} glyph={row.glyph} />
                  <div className="mock-shortlist-body">
                    <strong>{row.name}</strong>
                    <span>{row.meta}</span>
                  </div>
                  <span className={`mock-result-tag tag-${row.statusKind}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mock-activity">
              <div className="mock-activity-label">Recent activity</div>
              {[
                {
                  initials: 'M',
                  name: 'Maya',
                  action: 'added Provider A',
                  when: '2m',
                  tone: 'a' as const,
                },
                {
                  initials: 'T',
                  name: 'Tom',
                  action: 'flagged fee band',
                  when: '1h',
                  tone: 'd' as const,
                },
                {
                  initials: 'P',
                  name: 'Priya',
                  action: 'requested intro',
                  when: '3h',
                  tone: 'e' as const,
                },
              ].map((item) => (
                <div key={item.name} className="mock-activity-row">
                  <span className={`mock-activity-avatar mock-mark--${item.tone}`}>
                    {item.initials}
                  </span>
                  <p>
                    <strong>{item.name}</strong> {item.action}
                  </p>
                  <time>{item.when}</time>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'brief':
      return (
        <div className="mock mock-brief">
          <div className="mock-brief-chrome">
            <span />
            <span />
            <span />
            <em>relay / research</em>
          </div>
          <div className="mock-brief-head">
            <span className="mock-brief-mark" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="4"
                  width="14"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 9h8M8 12h6M8 15h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <strong>Egypt payouts market brief</strong>
              <span>CBE-licensed · Q1 2026</span>
            </div>
          </div>
          <div className="mock-brief-stats">
            {[
              { label: 'Regulation', value: 'Licensed', hint: 'Payment service provider' },
              { label: 'Major rails', value: '3', hint: 'InstaPay · ACH · RTGS' },
              { label: 'Avg fee range', value: '0.8–1.2%', hint: 'Local bank rails' },
              { label: 'Settlement', value: 'Same-day', hint: 'On 4 of 12 providers' },
            ].map((s) => (
              <div key={s.label} className="mock-brief-stat">
                <span className="mock-brief-stat-label">{s.label}</span>
                <strong>{s.value}</strong>
                <em>{s.hint}</em>
              </div>
            ))}
          </div>
          <div className="mock-brief-cats">
            <div className="mock-brief-cats-label">Providers by category</div>
            {[
              { name: 'Payouts', count: 12, pct: 100 },
              { name: 'Collections', count: 9, pct: 75 },
              { name: 'Banking data', count: 6, pct: 50 },
            ].map((c) => (
              <div key={c.name} className="mock-brief-cat">
                <div className="mock-brief-cat-top">
                  <span>{c.name}</span>
                  <strong>{c.count}</strong>
                </div>
                <div className="mock-brief-bar">
                  <i style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'compare':
      return (
        <div className="mock mock-compare">
          <div className="mock-compare-chrome">
            <span />
            <span />
            <span />
            <em>relay / compare</em>
          </div>
          <div className="mock-compare-head">
            <strong>KE payouts · 3 providers</strong>
            <span>Nomba · Clearpath · SettleFast</span>
          </div>
          <div className="mock-compare-cols" aria-hidden>
            <span>Provider</span>
            <span>Fee</span>
            <span>Settlement</span>
            <span>Coverage</span>
          </div>
          {[
            {
              name: 'Nomba',
              fee: '0.9%',
              settle: 'Same-day',
              coverage: 'KE',
              edge: 'Sandbox available',
              edgeKind: 'sandbox' as const,
              tone: 'a' as const,
              glyph: 'rails' as const,
            },
            {
              name: 'Clearpath',
              fee: '0.8%',
              settle: 'T+1',
              coverage: 'KE + UG',
              edge: 'API-first',
              edgeKind: 'api' as const,
              tone: 'b' as const,
              glyph: 'link' as const,
            },
            {
              name: 'SettleFast',
              fee: '1.0%',
              settle: 'Same-day',
              coverage: 'KE',
              edge: 'Local rails',
              edgeKind: 'rails' as const,
              tone: 'c' as const,
              glyph: 'node' as const,
            },
          ].map((row, i) => (
            <div
              key={row.name}
              className={`mock-compare-row${i === 0 ? ' is-focus' : ''}`}
            >
              <div className="mock-compare-name">
                <ProviderMark tone={row.tone} glyph={row.glyph} />
                <strong>{row.name}</strong>
              </div>
              <em className="mock-compare-fee">{row.fee}</em>
              <span className="mock-compare-settle">{row.settle}</span>
              <span className="mock-compare-cov">{row.coverage}</span>
              <span className={`mock-compare-edge edge-${row.edgeKind}`}>
                <svg viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {row.edge}
              </span>
            </div>
          ))}
        </div>
      )

    case 'crm':
    case 'workflow':
      return <WorkflowBoard />

    case 'extension':
      return (
        <div className="mock mock-ext">
          <div className="mock-browser">
            <div className="mock-browser-bar">relay.app/providers/provider-a</div>
            <div className="mock-ext-panel">
              <div className="mock-ext-head">
                <ProviderMark tone="c" glyph="node" />
                <div>
                  <strong>Provider A</strong>
                  <span>Growth stage · multi-market</span>
                </div>
              </div>
              <div className="mock-ext-stats">
                <div>
                  <span>Fee</span>
                  <strong>0.9%</strong>
                </div>
                <div>
                  <span>Sandbox</span>
                  <strong>3 days</strong>
                </div>
                <div>
                  <span>Markets</span>
                  <strong>6</strong>
                </div>
              </div>
              <div className="mock-ext-chart">
                <span className="mock-ext-up">+18% coverage YoY</span>
                <svg viewBox="0 0 120 36" preserveAspectRatio="none">
                  <path
                    d="M0 28 C20 26, 30 20, 45 18 S70 22, 85 12 S105 8, 120 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )

    case 'signals':
      return <SignalsMonitor />

    case 'mcp':
      return <SignalsMonitor />

    case 'zap':
      return (
        <div className="mock mock-zap">
          {['Zapier', 'Make', 'n8n', 'Relay'].map((name) => (
            <span key={name} className="mock-zap-tile">
              {name}
            </span>
          ))}
        </div>
      )

    case 'api':
      return (
        <div className="mock mock-api">
          <pre>{`query Partners($market: String!) {
  partners(market: $market) {
    name
    categories
    feeBand
    sandboxDays
  }
}`}</pre>
        </div>
      )

    default:
      return null
  }
}
