/**
 * Product highlights — Harmonic Discover/Research/Act structure,
 * Relay content from hero.offerings.
 */
'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import './highlights.css'

type Card = {
  title: string
  description: string
  mock: string
  cta?: string
}

type Block = {
  id: string
  title: string
  lede: string
  layout: 'triple' | 'double' | 'ready'
  cards: Card[]
}

export default function Highlights() {
  const t = useTranslations('highlights')
  const blocks = t.raw('blocks') as Block[]

  return (
    <div className="hl" id="directory">
      {blocks.map((block) => (
        <section key={block.id} className={`hl-block hl-block--${block.layout}`} id={block.id}>
          <header className="hl-head">
            <h2 className="hl-title">{block.title}</h2>
            <p className="hl-lede">{block.lede}</p>
          </header>

          <div className={`hl-grid hl-grid--${block.layout}`}>
            {block.cards.map((card) => (
              <article key={card.title} className={`hl-card hl-card--${card.mock}`}>
                <div className="hl-card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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

function Mock({ mock }: { mock: string }) {
  switch (mock) {
    case 'search':
      return (
        <div className="mock mock-search">
          <div className="mock-search-bar">
            <span className="mock-search-icon" />
            <span>Partner search</span>
          </div>
          <div className="mock-pills">
            <span>Nigeria</span>
            <span>Payouts</span>
            <span>same-day</span>
            <span>{'< 1.2% fee'}</span>
            <span>Sandbox</span>
          </div>
          <div className="mock-results">
            <div className="mock-result-meta">48 results · by coverage</div>
            {['Nomba Rails', 'Clearpath NG', 'SettleFast'].map((name, i) => (
              <div key={name} className="mock-result">
                <span className="mock-result-logo" />
                <div>
                  <strong>{name}</strong>
                  <span>Payouts · NG + KE · 0.{9 - i}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'people':
      return (
        <div className="mock mock-people">
          {[
            { tag: 'Live', tagClass: 'is-live', name: 'Ada Okonkwo', role: 'Head of Expansion · Lagos' },
            { tag: 'New market', tagClass: 'is-new', name: 'Carlos Mendes', role: 'VP Partnerships · Bogotá' },
            { tag: 'Shortlisted', tagClass: 'is-list', name: 'Sara El-Sayed', role: 'Payments Lead · Cairo' },
          ].map((p) => (
            <div key={p.name} className="mock-person">
              <span className={`mock-person-tag ${p.tagClass}`}>{p.tag}</span>
              <span className="mock-person-avatar" />
              <strong>{p.name}</strong>
              <span>{p.role}</span>
            </div>
          ))}
        </div>
      )

    case 'network':
      return (
        <div className="mock mock-network">
          <div className="mock-apps">
            {['SL', 'NO', 'LI', 'EM', 'CR'].map((label) => (
              <span key={label} className="mock-app">
                {label}
              </span>
            ))}
          </div>
          <div className="mock-network-card">
            <div className="mock-network-head">
              <span className="mock-result-logo" />
              <div>
                <strong>Clearpath</strong>
                <span>12 team connections</span>
              </div>
            </div>
            <div className="mock-activity">
              <div>Maya emailed ops@clearpath</div>
              <div>Tom connected on LinkedIn</div>
              <div>Priya shared shortlist in Slack</div>
            </div>
          </div>
        </div>
      )

    case 'report':
      return (
        <div className="mock mock-report">
          <div className="mock-report-banner" />
          <div className="mock-report-body">
            <strong>Nigeria payouts · research brief</strong>
            <p className="mock-report-label">Executive summary</p>
            <p>
              Three providers clear same-day settlement with sandbox access under 5 days.
              Fee bands cluster 0.8–1.1% for local rails.
            </p>
            <div className="mock-insights">
              <div>
                <span>Insight</span>
                Lowest all-in fee with KE corridor
              </div>
              <div>
                <span>Insight</span>
                Fastest sandbox → production path
              </div>
            </div>
          </div>
        </div>
      )

    case 'cloud':
      return (
        <div className="mock mock-cloud">
          {['Paystack', 'Flutterwave', 'Nomba', 'Mono', 'Okra', 'Chipper', 'Interswitch', 'Kuda'].map(
            (name, i) => (
              <span key={name} className={`mock-cloud-item i${i}`}>
                {name.slice(0, 2)}
              </span>
            )
          )}
        </div>
      )

    case 'crm':
      return (
        <div className="mock mock-crm">
          <div className="mock-crm-head">
            <span className="mock-result-logo" />
            <div>
              <strong>SettleFast</strong>
              <span>Updated 3d ago</span>
            </div>
          </div>
          <div className="mock-crm-meta">
            <span>Lagos, NG</span>
            <span>Payouts</span>
            <span>$12M</span>
          </div>
          <p className="mock-crm-blurb">
            Local + regional payout rails with same-day settlement and open sandbox.
          </p>
          <div className="mock-crm-row">
            <span>Owner</span>
            <span>Maya Chen</span>
          </div>
          <div className="mock-crm-row">
            <span>Priority</span>
            <span className="mock-badge">High</span>
          </div>
          <div className="mock-crm-row">
            <span>Coverage</span>
            <span className="mock-bar">
              <i style={{ width: '78%' }} />
            </span>
          </div>
        </div>
      )

    case 'extension':
      return (
        <div className="mock mock-ext">
          <div className="mock-browser">
            <div className="mock-browser-bar">relay.app/providers/clearpath</div>
            <div className="mock-ext-panel">
              <div className="mock-ext-head">
                <strong>Clearpath</strong>
                <span>Series B · Lagos</span>
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

    case 'mcp':
      return (
        <div className="mock mock-mcp">
          <div className="mock-mcp-panel">
            <div className="mock-mcp-row">
              <span className="mock-app">RL</span> Relay providers <i className="on" />
            </div>
            <div className="mock-mcp-row">
              <span className="mock-app">SL</span> Slack shortlists <i className="on" />
            </div>
            <div className="mock-mcp-row">
              <span className="mock-app">NO</span> Notion briefs <i />
            </div>
            <div className="mock-mcp-foot">Manage connectors</div>
          </div>
          <div className="mock-mcp-orbit">
            {['AI', 'GM', 'NT', 'LN'].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      )

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
