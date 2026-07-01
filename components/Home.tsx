'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { channelIcons, logoWall, valueMocks } from '@/data/providers'
import './home.css'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const inView = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, margin: '-80px' },
}

type MockCopy = {
  assistantChip: string
  assistantTitle: string
  assistantBubble: string
  assistantSource: string
  compareAll: string
  requestIntro: string
  compareChip: string
  compareNote: string
  reportChip: string
  reportKpiLabel: string
}

type ComparisonRow = { provider: string; fee: string; setup: string }

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label-index">{index}</span>
      <span className="section-label-rule" />
      <span className="section-label-text">{children}</span>
    </div>
  )
}

function AssistantMock({ copy }: { copy: MockCopy }) {
  return (
    <div className="snap snap--assistant">
      <div className="snap-chip mono">{copy.assistantChip}</div>
      <div className="snap-title">{copy.assistantTitle}</div>
      <div className="snap-bubble">{copy.assistantBubble}</div>
      <div className="snap-source mono">{copy.assistantSource}</div>
      <div className="snap-pills">
        <span>{copy.compareAll}</span>
        <span>{copy.requestIntro}</span>
      </div>
    </div>
  )
}

function CompareMock({
  copy,
  rows,
}: {
  copy: MockCopy
  rows: ComparisonRow[]
}) {
  return (
    <div className="snap snap--compare">
      <div className="snap-chip mono">{copy.compareChip}</div>
      <table className="snap-table">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.provider} className={i === 1 ? 'is-hl' : ''}>
              <td className="mono">{r.provider}</td>
              <td>{r.fee}</td>
              <td>{r.setup}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="snap-note mono">{copy.compareNote}</div>
    </div>
  )
}

function ReportingMock({ copy }: { copy: MockCopy }) {
  const bars = [42, 58, 36, 72, 50, 64, 88]
  return (
    <div className="snap snap--report">
      <div className="snap-chip mono">{copy.reportChip}</div>
      <div className="snap-kpi">
        <span className="snap-kpi-val serif">94.1%</span>
        <span className="snap-kpi-label mono">{copy.reportKpiLabel}</span>
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
  const t = useTranslations()
  const [navScrolled, setNavScrolled] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [activeNews, setActiveNews] = useState(0)
  const [activeQuote, setActiveQuote] = useState(0)

  const mockCopy = {
    assistantChip: t('mocks.assistantChip'),
    assistantTitle: t('mocks.assistantTitle'),
    assistantBubble: t('mocks.assistantBubble'),
    assistantSource: t('mocks.assistantSource'),
    compareAll: t('mocks.compareAll'),
    requestIntro: t('mocks.requestIntro'),
    compareChip: t('mocks.compareChip'),
    compareNote: t('mocks.compareNote'),
    reportChip: t('mocks.reportChip'),
    reportKpiLabel: t('mocks.reportKpiLabel'),
  }

  const valueCards = t.raw('valueCards') as Array<{ title: string; description: string }>
  const channels = t.raw('channels.items') as Array<{ title: string; description: string }>
  const testimonials = t.raw('testimonials') as Array<{
    company: string
    quote: string
    name: string
    role: string
  }>
  const featuredTestimonial = t.raw('featuredTestimonial') as {
    brand: string
    quote: string
    name: string
    role: string
  }
  const features = t.raw('features') as Array<{ title: string; description: string }>
  const stats = t.raw('stats') as Array<{ value: string; label: string }>
  const categories = t.raw('categories') as Array<{ name: string; count: number }>
  const caseStudies = t.raw('caseStudies.items') as Array<{
    company: string
    headline: string
    products: string
    stats: Array<{ value: string; label: string }>
  }>
  const introSteps = t.raw('intros.steps') as Array<{ title: string; detail: string }>
  const newsItems = t.raw('dispatch.items') as Array<{
    title: string
    description: string
    tag: string
  }>
  const comparisonRows = t.raw('comparisonRows') as ComparisonRow[]

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
  }, [newsItems.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveQuote((q) => (q + 1) % testimonials.length)
    }, 7000)
    return () => clearTimeout(timer)
  }, [activeQuote, testimonials.length])

  return (
    <div className={`relay-home ${bannerOpen ? 'has-banner' : ''}`}>
      {bannerOpen && (
        <div className="banner">
          <div className="banner-inner">
            <span className="banner-text">
              <span className="banner-tag mono">{t('banner.tag')}</span>
              {t('banner.text')}
            </span>
            <a href="#resources" className="banner-link">{t('banner.link')}</a>
            <button
              type="button"
              className="banner-close"
              aria-label={t('banner.dismiss')}
              onClick={() => setBannerOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <Image src="/relaylight.png" alt={t('nav.brand')} width={30} height={30} className="nav-logo" />
            <span>{t('nav.brand')}</span>
          </Link>

          <div className="nav-actions">
            <LocaleSwitcher className="nav-locale" label={t('nav.languageLabel')} />
            <a href="/signin" className="nav-signin">{t('nav.login')}</a>
            <a href="#waitlist" className="nav-signin nav-hide-sm">{t('nav.contactSales')}</a>
            <a href="#waitlist" className="btn btn-ghost btn-sm nav-hide-sm">{t('nav.startTrial')}</a>
            <a href="#waitlist" className="btn btn-primary btn-sm">{t('nav.requestAccess')}</a>
          </div>
        </div>
      </header>

      <section className="hero2 hero2--center">
        <div className="hero2-center">
          <motion.div className="hero2-lead" variants={stagger} initial="hidden" animate="show">
            <motion.span className="hero2-eyebrow mono" variants={fadeUp}>
              {t('hero.eyebrow')}
            </motion.span>
            <motion.h1 className="hero2-title" variants={fadeUp}>
              {t('hero.titleBefore')}{' '}
              <span className="serif-italic">{t('hero.titleEmphasis')}</span>
            </motion.h1>
            <motion.p className="hero2-lede" variants={fadeUp}>{t('hero.lede')}</motion.p>
            <motion.div className="hero2-actions" variants={fadeUp}>
              <a href="#waitlist" className="btn btn-primary">{t('hero.requestAccess')}</a>
              <a href="#directory" className="btn btn-ghost">{t('hero.exploreDirectory')}</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="logos" aria-label={t('logos.label')}>
        <motion.p className="logos-label mono" variants={fadeUp} {...inView}>
          {t('logos.label')}
        </motion.p>
        <motion.div className="logos-grid" variants={stagger} {...inView}>
          {logoWall.map((name) => (
            <motion.div key={name} className="logos-item" variants={fadeUp}>
              {name}
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section section--paper-pure">
        <div className="section-inner">
          <motion.h2 className="band-title" variants={fadeUp} {...inView}>
            {t('valueBand.title')}
          </motion.h2>
          <motion.div className="value-grid" variants={stagger} {...inView}>
            {valueCards.map((card, i) => (
              <motion.article key={card.title} className="value-card" variants={fadeUp}>
                <div className="value-snap">
                  <div className="value-snap-bg" aria-hidden />
                  {valueMocks[i] === 'assistant' && <AssistantMock copy={mockCopy} />}
                  {valueMocks[i] === 'compare' && (
                    <CompareMock copy={mockCopy} rows={comparisonRows} />
                  )}
                  {valueMocks[i] === 'reporting' && <ReportingMock copy={mockCopy} />}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" id="solutions">
        <div className="section-inner">
          <motion.h2 className="channels-head" variants={fadeUp} {...inView}>
            <span className="channels-head-muted">{t('channels.headMuted')}</span>
            <span>{t('channels.head')}</span>
          </motion.h2>
          <div className="channels-list">
            {channels.map((ch, i) => (
              <motion.div key={ch.title} className="channel-row" variants={fadeUp} {...inView}>
                <div className="channel-copy">
                  <h3>{ch.title}</h3>
                  <p>{ch.description}</p>
                  <a href="#directory" className="text-link">{t('channels.learnMore')}</a>
                  <div className="channel-icons">
                    {channelIcons[i].map((ic) => (
                      <span key={ic} className="channel-icon mono">{ic}</span>
                    ))}
                  </div>
                </div>
                <div className="channel-art">
                  {i === 0 ? (
                    <Image src="/editorial/ink-river.png" alt="" width={420} height={280} aria-hidden />
                  ) : i === 1 ? (
                    <CompareMock copy={mockCopy} rows={comparisonRows} />
                  ) : (
                    <AssistantMock copy={mockCopy} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="quotes">
        <div className="section-inner">
          <div className="quotes-tabs">
            {testimonials.map((item, i) => (
              <button
                key={item.company}
                type="button"
                className={`quotes-tab ${i === activeQuote ? 'is-active' : ''}`}
                onClick={() => setActiveQuote(i)}
              >
                <span className="quotes-progress" />
                {item.company}
              </button>
            ))}
          </div>
          <figure className="quotes-panel">
            <span className="quotes-corner quotes-corner--tl" aria-hidden />
            <span className="quotes-corner quotes-corner--tr" aria-hidden />
            <span className="quotes-corner quotes-corner--bl" aria-hidden />
            <span className="quotes-corner quotes-corner--br" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <span className="quotes-company serif">{testimonials[activeQuote].company}</span>
                <blockquote className="quotes-text">“{testimonials[activeQuote].quote}”</blockquote>
                <figcaption className="quotes-cite">
                  <span className="quotes-name">{testimonials[activeQuote].name}</span>
                  <span className="quotes-role">{testimonials[activeQuote].role}</span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
        </div>
      </section>

      <section className="feature-quote">
        <span className="fq-marker fq-marker--tl" aria-hidden />
        <span className="fq-marker fq-marker--tr" aria-hidden />
        <span className="fq-marker fq-marker--bl" aria-hidden />
        <span className="fq-marker fq-marker--br" aria-hidden />
        <div className="fq-inner">
          <motion.div className="fq-copy" variants={fadeUp} {...inView}>
            <span className="fq-brand mono">{featuredTestimonial.brand}</span>
            <blockquote>“{featuredTestimonial.quote}”</blockquote>
            <div className="fq-cite">
              <span className="fq-name">{featuredTestimonial.name}</span>
              <span className="fq-role">{featuredTestimonial.role}</span>
            </div>
          </motion.div>
          <motion.div
            className="fq-photo"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src="/editorial/testimonial-headshot.png"
              alt={featuredTestimonial.name}
              width={320}
              height={400}
            />
          </motion.div>
        </div>
      </section>

      <section className="section section--paper-pure">
        <div className="section-inner">
          <SectionLabel index="01">{t('capabilities.label')}</SectionLabel>
          <h2 className="section-title">
            {t('capabilities.titleBefore')}{' '}
            <span className="serif-italic">{t('capabilities.titleEmphasis')}</span>
          </h2>
          <motion.div className="feature-grid" variants={stagger} {...inView}>
            {features.map((f, i) => (
              <motion.article key={f.title} className="feature-card" variants={fadeUp}>
                <span className="feature-num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-inner">
          <motion.div className="stats-grid" variants={stagger} {...inView}>
            {stats.map((s) => (
              <motion.div key={s.label} className="stat-item" variants={fadeUp}>
                <div className="stat-value serif">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" id="directory">
        <div className="section-inner">
          <SectionLabel index="02">{t('directory.label')}</SectionLabel>
          <h2 className="section-title">
            {t('directory.titleBefore')}{' '}
            <span className="serif-italic">{t('directory.titleEmphasis')}</span>
          </h2>
          <p className="section-desc">{t('directory.description')}</p>
          <motion.div className="category-grid" variants={stagger} {...inView}>
            {categories.map((c, i) => (
              <motion.a key={c.name} href="#directory" className="category-card" variants={fadeUp}>
                <span className="category-index mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="category-name">{c.name}</div>
                <div className="category-count mono">
                  {t('directory.apis', { count: c.count })}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--paper-pure" id="compare">
        <div className="section-inner">
          <SectionLabel index="03">{t('caseStudies.label')}</SectionLabel>
          <h2 className="section-title">
            {t('caseStudies.titleBefore')}{' '}
            <span className="serif-italic">{t('caseStudies.titleEmphasis')}</span>
          </h2>
          <motion.div className="cases-grid" variants={stagger} {...inView}>
            {caseStudies.map((cs) => (
              <motion.article key={cs.company} className="case-card" variants={fadeUp}>
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
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--ink" id="intros">
        <div className="section-inner intro-layout">
          <div className="intro-content">
            <SectionLabel index="04">{t('intros.label')}</SectionLabel>
            <h2 className="section-title section-title--light">
              {t('intros.titleBefore')}{' '}
              <span className="serif-italic">{t('intros.titleEmphasis')}</span>
            </h2>
            <p className="section-desc section-desc--light">{t('intros.description')}</p>
            <ol className="intro-steps">
              {introSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </li>
              ))}
            </ol>
            <a href="#waitlist" className="btn btn-light">{t('intros.cta')}</a>
          </div>
          <div className="intro-visual">
            <div className="intro-card">
              <div className="intro-card-row">
                <span className="intro-card-label mono">{t('intros.cardRequest')}</span>
                <span className="intro-card-badge mono">{t('intros.cardBadge')}</span>
              </div>
              <div className="intro-card-divider" />
              <div className="intro-match">
                <div className="intro-match-avatar mono">PA</div>
                <div>
                  <div className="intro-match-name">{t('intros.providerMatched')}</div>
                  <div className="intro-match-detail mono">{t('intros.providerDetailA')}</div>
                </div>
                <span className="intro-match-status mono">{t('intros.sent')}</span>
              </div>
              <div className="intro-match">
                <div className="intro-match-avatar intro-match-avatar--alt mono">PB</div>
                <div>
                  <div className="intro-match-name">{t('intros.providerMatched')}</div>
                  <div className="intro-match-detail mono">{t('intros.providerDetailB')}</div>
                </div>
                <span className="intro-match-status mono">{t('intros.sent')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="resources">
        <div className="section-inner">
          <SectionLabel index="05">{t('intelligence.label')}</SectionLabel>
          <h2 className="section-title">
            {t('intelligence.titleBefore')}{' '}
            <span className="serif-italic">{t('intelligence.titleEmphasis')}</span>
          </h2>
          <div className="dev-grid">
            <div className="dev-card">
              <h3>{t('intelligence.compareTitle')}</h3>
              <p>{t('intelligence.compareDescription')}</p>
            </div>
            <div className="dev-card">
              <h3>{t('intelligence.filterTitle')}</h3>
              <p>{t('intelligence.filterDescription')}</p>
            </div>
            <div className="dev-card dev-card--stats">
              <div className="dev-stat">
                <strong className="serif">240+</strong>
                <span className="mono">{t('intelligence.statListings')}</span>
              </div>
              <div className="dev-stat">
                <strong className="serif">12</strong>
                <span className="mono">{t('intelligence.statCategories')}</span>
              </div>
              <div className="dev-stat">
                <strong className="serif">45</strong>
                <span className="mono">{t('intelligence.statCountries')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper-pure">
        <div className="section-inner">
          <SectionLabel index="06">{t('dispatch.label')}</SectionLabel>
          <div className="news-carousel">
            <div className="news-track" style={{ transform: `translateX(-${activeNews * 100}%)` }}>
              {newsItems.map((item) => (
                <article key={item.title} className="news-slide">
                  <span className="news-tag mono">{item.tag}</span>
                  <h3 className="serif">{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#" className="text-link">{t('dispatch.readMore')}</a>
                </article>
              ))}
            </div>
            <div className="news-dots">
              {newsItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`news-dot ${i === activeNews ? 'news-dot--active' : ''}`}
                  aria-label={t('dispatch.goToSlide', { index: i + 1 })}
                  onClick={() => setActiveNews(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial" id="pricing">
        <motion.div className="editorial-inner" variants={stagger} {...inView}>
          <motion.h2 className="editorial-title" variants={fadeUp}>
            {t('editorial.titleBefore')}{' '}
            <span className="serif-italic">{t('editorial.titleEmphasis')}</span>
          </motion.h2>
          <motion.div className="editorial-actions" variants={fadeUp}>
            <a href="#waitlist" className="btn btn-primary">{t('editorial.requestAccess')}</a>
            <a href="#directory" className="btn btn-ghost">{t('editorial.exploreDirectory')}</a>
          </motion.div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-top">
                <Image src="/relaylight.png" alt={t('nav.brand')} width={30} height={30} />
                <span>{t('nav.brand')}</span>
              </div>
              <p className="footer-tagline">{t('footer.tagline')}</p>
              <a href="#" className="footer-status">
                <span className="footer-status-dot" />
                <span className="mono">{t('footer.status')}</span>
              </a>
              <div className="footer-social">
                <a href="#" aria-label={t('footer.socialX')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                  </svg>
                </a>
                <a href="#" aria-label={t('footer.socialLinkedIn')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a href="#" aria-label={t('footer.socialGitHub')} className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>

            <nav className="footer-links">
              <div>
                <h4 className="mono">{t('footer.product')}</h4>
                <a href="#directory">{t('footer.directory')}</a>
                <a href="#compare">{t('footer.compare')}</a>
                <a href="#intros">{t('footer.introductions')}</a>
                <a href="#resources">{t('footer.intelligence')}</a>
                <a href="#waitlist">{t('footer.requestAccess')}</a>
              </div>
              <div>
                <h4 className="mono">{t('footer.categories')}</h4>
                <a href="#directory">{t('footer.kyc')}</a>
                <a href="#directory">{t('footer.payments')}</a>
                <a href="#directory">{t('footer.payouts')}</a>
                <a href="#directory">{t('footer.fx')}</a>
                <a href="#directory">{t('footer.compliance')}</a>
              </div>
              <div>
                <h4 className="mono">{t('footer.resources')}</h4>
                <a href="#resources">{t('footer.reports')}</a>
                <a href="#">{t('footer.benchmarks')}</a>
                <a href="/blog">{t('footer.dispatch')}</a>
                <a href="#">{t('footer.providerDirectory')}</a>
                <a href="#">{t('footer.methodology')}</a>
              </div>
              <div>
                <h4 className="mono">{t('footer.company')}</h4>
                <a href="#">{t('footer.about')}</a>
                <a href="#">{t('footer.careers')}</a>
                <a href="/blog">{t('footer.blog')}</a>
                <a href="#">{t('footer.contact')}</a>
                <a href="#">{t('footer.press')}</a>
              </div>
            </nav>
          </div>

          <div className="footer-disclaimer">
            <LocaleSwitcher className="footer-locale" label={t('footer.language')} />
            <p>{t('footer.disclaimer')}</p>
          </div>

          <div className="footer-wordmark" aria-hidden>{t('nav.brand')}</div>

          <div className="footer-bottom">
            <span className="mono">{t('footer.copyright')}</span>
            <div className="footer-legal mono">
              <a href="#">{t('footer.privacy')}</a>
              <a href="#">{t('footer.terms')}</a>
              <a href="#">{t('footer.security')}</a>
              <a href="#">{t('footer.cookies')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
