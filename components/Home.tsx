'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  caseStudies,
  categories,
  channels,
  comparisonRows,
  featuredTestimonial,
  features,
  heroTabs,
  logoWall,
  newsItems,
  providers,
  stats,
  testimonials,
  valueCards,
} from '@/data/providers'
import './home.css'

function ProviderWordmark({ name }: { name: string }) {
  return (
    <span className="marquee-logo">
      <span className="marquee-logo-name">{name}</span>
      <span className="marquee-logo-sep" aria-hidden>·</span>
    </span>
  )
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label-index">{index}</span>
      <span className="section-label-rule" />
      <span className="section-label-text">{children}</span>
    </div>
  )
}

/* ── CSS-built product mockups (no external screenshots) ── */

function HeroMock() {
  const rows = [
    { name: 'Provider A', fee: '1.4%', live: '2 wks', cover: '12', tone: 'a' },
    { name: 'Provider B', fee: '0.9%', live: '6 wks', cover: '28', tone: 'b', best: true },
    { name: 'Provider C', fee: '1.1%', live: '3 wks', cover: '19', tone: 'c' },
    { name: 'Provider D', fee: '1.6%', live: '4 wks', cover: '22', tone: 'd' },
  ]
  return (
    <div className="mock">
      <div className="mock-bar">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-tab mono">Directory · Payouts</span>
      </div>
      <div className="mock-head">
        <div>
          <div className="mock-title">Payouts · Sub-Saharan Africa</div>
          <div className="mock-meta mono">18 PROVIDERS · UPDATED Q2 2026</div>
        </div>
        <span className="mock-live mono"><i />LIVE</span>
      </div>
      <div className="mock-rows">
        <div className="mock-rowhead mono">
          <span>PROVIDER</span>
          <span>FEE</span>
          <span>GO-LIVE</span>
          <span>COVERAGE</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className={`mock-row ${r.best ? 'is-best' : ''}`}>
            <span className="mock-prov">
              <i className={`mock-logo tone-${r.tone}`} />
              {r.name}
            </span>
            <span>{r.fee}</span>
            <span>{r.live}</span>
            <span>{r.cover} countries</span>
          </div>
        ))}
      </div>
      <div className="mock-foot">
        <span className="mock-foot-ic" aria-hidden />
        <span className="mock-foot-text">
          <b>2 introductions sent</b> — NG, KE, GH payouts
        </span>
        <span className="mock-foot-status mono">41s ago</span>
      </div>
    </div>
  )
}

function AssistantMock() {
  return (
    <div className="snap snap--assistant">
      <div className="snap-chip mono">RELAY ASSISTANT</div>
      <div className="snap-title">Which payout API for NG + KE?</div>
      <div className="snap-bubble">
        Three providers cover both markets. Provider B has the lowest fee at 0.9% with a 3-day
        sandbox and 28-country coverage.
      </div>
      <div className="snap-source mono">SOURCE · benchmark report Q2 2026</div>
      <div className="snap-pills">
        <span>Compare all 3 →</span>
        <span>Request intro →</span>
      </div>
    </div>
  )
}

function CompareMock() {
  return (
    <div className="snap snap--compare">
      <div className="snap-chip mono">SIDE-BY-SIDE</div>
      <table className="snap-table">
        <tbody>
          {comparisonRows.map((r, i) => (
            <tr key={r.provider} className={i === 1 ? 'is-hl' : ''}>
              <td className="mono">{r.provider}</td>
              <td>{r.fee}</td>
              <td>{r.setup}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="snap-note mono">Provider B — best fee + coverage</div>
    </div>
  )
}

function ReportingMock() {
  const bars = [42, 58, 36, 72, 50, 64, 88]
  return (
    <div className="snap snap--report">
      <div className="snap-chip mono">BENCHMARKS</div>
      <div className="snap-kpi">
        <span className="snap-kpi-val serif">94.1%</span>
        <span className="snap-kpi-label mono">coverage confidence</span>
      </div>
      <div className="snap-chart">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} className={i === 6 ? 'is-peak' : ''} />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [activeNews, setActiveNews] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [activeQuote, setActiveQuote] = useState(0)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNews((n) => (n + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const doubledProviders = [...providers, ...providers]

  return (
    <div className={`relay-home ${bannerOpen ? 'has-banner' : ''}`}>
      {/* Announcement banner */}
      {bannerOpen && (
        <div className="banner">
          <div className="banner-inner">
            <span className="banner-text">
              <span className="banner-tag mono">NEW</span>
              Introducing the Relay 2026 Benchmark — 240+ fintech APIs, fully compared.
            </span>
            <a href="#resources" className="banner-link">Learn more →</a>
            <button
              type="button"
              className="banner-close"
              aria-label="Dismiss announcement"
              onClick={() => setBannerOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-brand">
            <Image src="/relaylight.png" alt="Relay" width={30} height={30} className="nav-logo" />
            <span>Relay</span>
          </a>

          <div className="nav-actions">
            <a href="/signin" className="nav-signin">Log in</a>
            <a href="#waitlist" className="nav-signin nav-hide-sm">Contact sales</a>
            <a href="#waitlist" className="btn btn-ghost btn-sm nav-hide-sm">Start free trial</a>
            <a href="#waitlist" className="btn btn-primary btn-sm">Request access →</a>
          </div>
        </div>
      </header>

      {/* Hero — split layout with product mockup */}
      <section className="hero2">
        <div className="hero2-inner">
          <div className="hero2-copy">
            <span className="hero2-eyebrow mono">INFRASTRUCTURE INTELLIGENCE</span>
            <h1 className="hero2-title">
              The only directory built for the{' '}
              <span className="serif-italic">fintech builder era.</span>
            </h1>
            <p className="hero2-lede">
              Relay indexes every API for building financial products — so every infrastructure
              decision is faster, cheaper and easier to defend than ever before.
            </p>
            <div className="hero2-actions">
              <a href="#waitlist" className="btn btn-primary">Request access</a>
              <a href="#directory" className="btn btn-ghost">Explore directory</a>
            </div>
          </div>

          <div className="hero2-visual">
            <div className="hero2-glow" aria-hidden />
            <Image
              src="/editorial/ink-flower.png"
              alt=""
              width={150}
              height={210}
              className="hero2-ink"
              aria-hidden
            />
            <HeroMock />
          </div>
        </div>

        {/* Hero feature strip */}
        <div className="hero2-tabs">
          {heroTabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`hero2-tab ${i === activeTab ? 'is-active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span className="hero2-tab-label">{t.label}</span>
              <span className="hero2-tab-cap">{t.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Logo wall */}
      <section className="logos" aria-label="Providers indexed">
        <p className="logos-label mono">Indexing more than 240 of the APIs fintechs build on</p>
        <div className="logos-grid">
          {logoWall.map((name) => (
            <div key={name} className="logos-item">{name}</div>
          ))}
        </div>
      </section>

      {/* Three-up value cards with snapshots */}
      <section className="section section--paper-pure">
        <div className="section-inner">
          <h2 className="band-title">
            A better way to choose infrastructure — for builders, leaders and finance teams.
          </h2>
          <div className="value-grid">
            {valueCards.map((card) => (
              <article key={card.title} className="value-card">
                <div className="value-snap">
                  <div className="value-snap-bg" aria-hidden />
                  {card.mock === 'assistant' && <AssistantMock />}
                  {card.mock === 'compare' && <CompareMock />}
                  {card.mock === 'reporting' && <ReportingMock />}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Provider marquee */}
      <section className="marquee-section" aria-label="Featured providers">
        <p className="marquee-label mono">Every provider, continuously re-verified</p>
        <div className="marquee-track-wrap">
          <div className="marquee-track">
            {doubledProviders.map((p, i) => (
              <ProviderWordmark key={`${p.domain}-${i}`} name={p.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities (Intercom omnichannel style) */}
      <section className="section" id="solutions">
        <div className="section-inner">
          <h2 className="channels-head">
            <span className="channels-head-muted">Deliver confident decisions</span>
            <span>across every category</span>
          </h2>
          <div className="channels-list">
            {channels.map((ch, i) => (
              <div key={ch.title} className="channel-row">
                <div className="channel-copy">
                  <h3>{ch.title}</h3>
                  <p>{ch.description}</p>
                  <a href="#directory" className="text-link">Learn more →</a>
                  <div className="channel-icons">
                    {ch.icons.map((ic) => (
                      <span key={ic} className="channel-icon mono">{ic}</span>
                    ))}
                  </div>
                </div>
                <div className="channel-art">
                  {i === 0 ? (
                    <Image src="/editorial/ink-river.png" alt="" width={420} height={280} aria-hidden />
                  ) : i === 1 ? (
                    <CompareMock />
                  ) : (
                    <AssistantMock />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed testimonials */}
      <section className="quotes">
        <div className="section-inner">
          <div className="quotes-tabs">
            {testimonials.map((t, i) => (
              <button
                key={t.company}
                type="button"
                className={`quotes-tab ${i === activeQuote ? 'is-active' : ''}`}
                onClick={() => setActiveQuote(i)}
              >
                {t.company}
              </button>
            ))}
          </div>
          <figure className="quotes-panel">
            <span className="quotes-corner quotes-corner--tl" aria-hidden />
            <span className="quotes-corner quotes-corner--tr" aria-hidden />
            <span className="quotes-corner quotes-corner--bl" aria-hidden />
            <span className="quotes-corner quotes-corner--br" aria-hidden />
            <span className="quotes-company serif">{testimonials[activeQuote].company}</span>
            <blockquote className="quotes-text">
              “{testimonials[activeQuote].quote}”
            </blockquote>
            <figcaption className="quotes-cite">
              <span className="quotes-name">{testimonials[activeQuote].name}</span>
              <span className="quotes-role">{testimonials[activeQuote].role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Featured editorial testimonial */}
      <section className="feature-quote">
        <span className="fq-marker fq-marker--tl" aria-hidden />
        <span className="fq-marker fq-marker--tr" aria-hidden />
        <span className="fq-marker fq-marker--bl" aria-hidden />
        <span className="fq-marker fq-marker--br" aria-hidden />
        <div className="fq-inner">
          <div className="fq-copy">
            <span className="fq-brand mono">A FINTECH SCALE-UP</span>
            <blockquote>“{featuredTestimonial.quote}”</blockquote>
            <div className="fq-cite">
              <span className="fq-name">{featuredTestimonial.name}</span>
              <span className="fq-role">{featuredTestimonial.role}</span>
            </div>
          </div>
          <div className="fq-photo">
            <Image
              src={featuredTestimonial.image}
              alt={featuredTestimonial.name}
              width={320}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="section section--paper-pure">
        <div className="section-inner">
          <SectionLabel index="01">Capabilities</SectionLabel>
          <h2 className="section-title">
            One workspace for every{' '}
            <span className="serif-italic">infrastructure decision.</span>
          </h2>
          <div className="feature-grid">
            {features.map((f, i) => (
              <article key={f.title} className="feature-card">
                <span className="feature-num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="section-inner">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-value serif">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory categories */}
      <section className="section" id="directory">
        <div className="section-inner">
          <SectionLabel index="02">Directory</SectionLabel>
          <h2 className="section-title">
            Every category of provider,{' '}
            <span className="serif-italic">mapped and benchmarked.</span>
          </h2>
          <p className="section-desc">
            Stop reading pitch decks and signing NDAs. Relay indexes every KYC, payout, FX,
            treasury and compliance provider — across Africa, LATAM, Europe and beyond.
          </p>
          <div className="category-grid">
            {categories.map((c, i) => (
              <a key={c.name} href="#directory" className="category-card">
                <span className="category-index mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="category-name">{c.name}</div>
                <div className="category-count mono">{c.count} APIs →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section section--paper-pure" id="compare">
        <div className="section-inner">
          <SectionLabel index="03">Field notes</SectionLabel>
          <h2 className="section-title">
            Trusted by teams building the{' '}
            <span className="serif-italic">next financial rails.</span>
          </h2>
          <div className="cases-grid">
            {caseStudies.map((cs) => (
              <article key={cs.company} className="case-card">
                <div className="case-top">
                  <span className="case-company serif">{cs.company}</span>
                  <span className="case-products mono">{cs.products}</span>
                </div>
                <h3>{cs.headline}</h3>
                <div className="case-stats">
                  {cs.stats.map((s) => (
                    <div key={s.label} className="case-stat">
                      <div className="case-stat-value serif">{s.value}</div>
                      <div className="case-stat-label mono">{s.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How intros work */}
      <section className="section section--ink" id="intros">
        <div className="section-inner intro-layout">
          <div className="intro-content">
            <SectionLabel index="04">Introductions</SectionLabel>
            <h2 className="section-title section-title--light">
              Skip cold outreach.{' '}
              <span className="serif-italic">We make the introduction.</span>
            </h2>
            <p className="section-desc section-desc--light">
              Tell us your use case, market and volume. Relay matches you with the right
              provider team — already briefed and ready to talk.
            </p>
            <ol className="intro-steps">
              <li>
                <strong>Share your requirements</strong>
                <span>Category, markets, volume, timeline</span>
              </li>
              <li>
                <strong>Receive a shortlist</strong>
                <span>Ranked by fit, fees and integration speed</span>
              </li>
              <li>
                <strong>Meet the right team</strong>
                <span>Warm introduction within 48 hours on average</span>
              </li>
            </ol>
            <a href="#waitlist" className="btn btn-light">Request an introduction</a>
          </div>
          <div className="intro-visual">
            <div className="intro-card">
              <div className="intro-card-row">
                <span className="intro-card-label mono">YOUR REQUEST</span>
                <span className="intro-card-badge mono">Payouts · NG, KE, GH</span>
              </div>
              <div className="intro-card-divider" />
              <div className="intro-match">
                <div className="intro-match-avatar mono">PA</div>
                <div>
                  <div className="intro-match-name">Provider matched</div>
                  <div className="intro-match-detail mono">0.9% · 28 countries · 3-day sandbox</div>
                </div>
                <span className="intro-match-status mono">SENT</span>
              </div>
              <div className="intro-match">
                <div className="intro-match-avatar intro-match-avatar--alt mono">PB</div>
                <div>
                  <div className="intro-match-name">Provider matched</div>
                  <div className="intro-match-detail mono">1.1% · 19 countries · instant sandbox</div>
                </div>
                <span className="intro-match-status mono">SENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence / data section */}
      <section className="section" id="resources">
        <div className="section-inner">
          <SectionLabel index="05">Intelligence</SectionLabel>
          <h2 className="section-title">
            Verified data behind{' '}
            <span className="serif-italic">every listing.</span>
          </h2>
          <div className="dev-grid">
            <div className="dev-card">
              <h3>Compare with confidence</h3>
              <p>Side-by-side fee tables, settlement timelines and coverage maps — updated quarterly from provider data and builder reports.</p>
            </div>
            <div className="dev-card">
              <h3>Filter by what matters</h3>
              <p>Market, currency, regulatory requirements, API type, sandbox access and minimum volume — all searchable in one view.</p>
            </div>
            <div className="dev-card dev-card--stats">
              <div className="dev-stat"><strong className="serif">240+</strong><span className="mono">API listings</span></div>
              <div className="dev-stat"><strong className="serif">12</strong><span className="mono">categories</span></div>
              <div className="dev-stat"><strong className="serif">45</strong><span className="mono">countries</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* News carousel */}
      <section className="section section--paper-pure">
        <div className="section-inner">
          <SectionLabel index="06">Dispatch</SectionLabel>
          <div className="news-carousel">
            <div className="news-track" style={{ transform: `translateX(-${activeNews * 100}%)` }}>
              {newsItems.map((item) => (
                <article key={item.title} className="news-slide">
                  <span className="news-tag mono">{item.tag}</span>
                  <h3 className="serif">{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#" className="text-link">Read more →</a>
                </article>
              ))}
            </div>
            <div className="news-dots">
              {newsItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`news-dot ${i === activeNews ? 'news-dot--active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveNews(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="cta-section section--ink" id="waitlist">
        <div className="section-inner cta-inner">
          <h2 className="cta-title">
            Build on the right rails,{' '}
            <span className="serif-italic">from the first call.</span>
          </h2>
          <p className="cta-desc">
            Request access to the full directory, comparison tools and warm introductions.
          </p>
          <form
            className="waitlist-form"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const input = form.querySelector('input') as HTMLInputElement
              if (input.value) {
                form.classList.add('waitlist-form--success')
              }
            }}
          >
            <input type="email" placeholder="Work email" required aria-label="Work email" />
            <button type="submit" className="btn btn-light">Request access</button>
          </form>
          <p className="waitlist-note mono">Free for builders · No credit card required</p>
        </div>
      </section>

      {/* Editorial pre-footer with scattered imagery */}
      <section className="editorial" id="pricing">
        <div className="editorial-scatter" aria-hidden>
          <Image src="/editorial/shadows.png" alt="" width={170} height={120} className="ed ed--shadows" />
          <Image src="/editorial/ink-flower.png" alt="" width={96} height={134} className="ed ed--flower" />
          <Image src="/editorial/bubbles.png" alt="" width={150} height={100} className="ed ed--bubbles" />
          <Image src="/editorial/palm-sky.png" alt="" width={160} height={110} className="ed ed--palm" />
          <Image src="/editorial/ink-river.png" alt="" width={150} height={100} className="ed ed--river" />
        </div>
        <div className="editorial-inner">
          <h2 className="editorial-title">
            Confident infrastructure decisions,{' '}
            <span className="serif-italic">powered by Relay.</span>
          </h2>
          <div className="editorial-actions">
            <a href="#waitlist" className="btn btn-primary">Request access</a>
            <a href="#directory" className="btn btn-ghost">Explore directory</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-top">
                <Image src="/relaylight.png" alt="Relay" width={30} height={30} />
                <span>Relay</span>
              </div>
              <p className="footer-tagline">
                Infrastructure intelligence for the people building financial products.
              </p>
              <a href="#" className="footer-status">
                <span className="footer-status-dot" />
                <span className="mono">All systems operational</span>
              </a>
              <div className="footer-social">
                <a href="#" aria-label="Relay on X" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Relay on LinkedIn" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Relay on GitHub" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>

            <nav className="footer-links">
              <div>
                <h4 className="mono">Product</h4>
                <a href="#directory">Directory</a>
                <a href="#compare">Compare</a>
                <a href="#intros">Introductions</a>
                <a href="#resources">Intelligence</a>
                <a href="#waitlist">Request access</a>
              </div>
              <div>
                <h4 className="mono">Categories</h4>
                <a href="#directory">KYC &amp; Identity</a>
                <a href="#directory">Payments</a>
                <a href="#directory">Payouts</a>
                <a href="#directory">FX &amp; Treasury</a>
                <a href="#directory">Compliance &amp; AML</a>
              </div>
              <div>
                <h4 className="mono">Resources</h4>
                <a href="#resources">Intelligence reports</a>
                <a href="#">Benchmarks</a>
                <a href="/blog">Dispatch</a>
                <a href="#">Provider directory</a>
                <a href="#">Methodology</a>
              </div>
              <div>
                <h4 className="mono">Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="/blog">Blog</a>
                <a href="#">Contact</a>
                <a href="#">Press</a>
              </div>
            </nav>
          </div>

          <div className="footer-disclaimer">
            <span className="mono">Region</span>
            <select className="footer-region" aria-label="Select region" defaultValue="global">
              <option value="global">Global (English)</option>
              <option value="ng">Nigeria</option>
              <option value="ke">Kenya</option>
              <option value="za">South Africa</option>
              <option value="uk">United Kingdom</option>
            </select>
            <p>
              Relay is an infrastructure directory and introduction service. Listed fees,
              settlement times and coverage are indicative, compiled from provider documentation
              and builder reports, and may change without notice. Relay is not a payment
              institution and does not provide financial, legal or regulatory advice.
            </p>
          </div>

          <div className="footer-wordmark" aria-hidden>Relay</div>

          <div className="footer-bottom">
            <span className="mono">© 2026 GrateBridge Labs — All rights reserved</span>
            <div className="footer-legal mono">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
