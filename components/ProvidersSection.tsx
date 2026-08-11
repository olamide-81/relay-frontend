'use client'

import { useTranslations } from 'next-intl'
import Reveal from '@/components/Reveal'
import './providers.css'

type Capability = {
  title: string
  description: string
  visual: 'search' | 'compare' | 'shortlist' | 'intros'
}

/**
 * Providers — simple, solid capabilities with lightweight illustration mocks.
 */
export default function ProvidersSection() {
  const t = useTranslations('providers')
  const items = t.raw('items') as Capability[]

  return (
    <section className="pv" id="providers" aria-labelledby="pv-title">
      <div className="pv-inner">
        <Reveal>
          <header className="pv-head">
            <p className="pv-kicker">{t('kicker')}</p>
            <h2 className="pv-title" id="pv-title">
              {t('title')}
            </h2>
            <p className="pv-lede">{t('lede')}</p>
          </header>
        </Reveal>

        <div className="pv-grid">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i} y={32}>
              <article className="noise-card pv-card">
                <div className="pv-visual" aria-hidden>
                  <CapabilityVisual kind={item.visual} />
                </div>
                <h3 className="pv-card-title">{item.title}</h3>
                <p className="pv-card-desc">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityVisual({ kind }: { kind: Capability['visual'] }) {
  if (kind === 'compare') {
    return (
      <div className="pv-illu pv-illu--compare">
        <div className="pv-col">
          <span />
          <i style={{ width: '72%' }} />
          <i style={{ width: '54%' }} />
          <i style={{ width: '88%' }} />
        </div>
        <div className="pv-col is-lead">
          <span />
          <i style={{ width: '90%' }} />
          <i style={{ width: '70%' }} />
          <i style={{ width: '96%' }} />
        </div>
      </div>
    )
  }

  if (kind === 'shortlist') {
    return (
      <div className="pv-illu pv-illu--list">
        <div className="pv-row is-on">
          <em />
          <span />
        </div>
        <div className="pv-row is-on">
          <em />
          <span />
        </div>
        <div className="pv-row">
          <em />
          <span />
        </div>
      </div>
    )
  }

  if (kind === 'intros') {
    return (
      <div className="pv-illu pv-illu--flow">
        <span>You</span>
        <i />
        <span className="is-on">Relay</span>
        <i />
        <span>Provider</span>
      </div>
    )
  }

  return (
    <div className="pv-illu pv-illu--search">
      <div className="pv-search-bar">
        <b />
        <span />
      </div>
      <div className="pv-chips">
        <span className="is-on" />
        <span />
        <span />
      </div>
      <div className="pv-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

