'use client'

/**
 * A Relay Research report, laid out like the dashboard's full report view
 * ("Relay Intelligence.dc.html", isFull): same type scale, colours, KPI cards,
 * chart bars and table rows, extended to every block the reports use
 * (findings, tables, images, Provider landscape, methodology, sources).
 * Used on the public site (/reports/<slug>) and inside the dashboard.
 */

import { useState } from 'react'
import RelayAppIcon from '@/components/relay/RelayAppIcon'
import { A } from '@/lib/dc/runtime'
import type { DataReport, ReportImage, ReportMetric, ReportSection } from '@/data/reports'

export type ReportLabels = {
  back: string
  takeaways: string
  keyMetrics: string
  keyFindings: string
  whyThisMatters: string
  background: string
  marketContext: string
  providerLandscape: string
  implications: string
  methodology: string
  sources: string
  published: string
  lastUpdated: string
  minRead: string
  related: string
  copyLink: string
  copied: string
  downloadPdf: string
}

export type RelatedReport = { slug: string; href?: string; kind: string; type: string; scope: string; title: string }

type Props = {
  report: DataReport
  kind: string
  type: string
  accent: string
  rgb: string
  labels: ReportLabels
  /** "Published 18 Aug 2026" style date strings, formatted on the server. */
  publishedLabel: string
  updatedLabel?: string
  imageSizes: Record<string, { width: number; height: number }>
  related: RelatedReport[]
  backHref?: string
  onBack?: () => void
  onOpenRelated?: (slug: string) => void
  /** "site" adds room for the sticky site nav; "app" matches the dashboard panel. */
  variant: 'site' | 'app'
}

const TONE: Record<string, string> = { up: '#6fe3b4', down: '#ff7b7b', alert: '#f2c14e', flat: '#8a8f98' }

const H2: React.CSSProperties = { margin: 0, fontSize: '19px', fontWeight: 500, letterSpacing: '-0.015em' }
const BODY: React.CSSProperties = { margin: 0, fontSize: '15px', lineHeight: 1.7, color: '#b4b8bf', textWrap: 'pretty' }
const CARD: React.CSSProperties = {
  borderRadius: '12px',
  background: 'rgba(255,255,255,.015)',
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)',
}
const SECTION: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '12px' }

function webp(src: string) {
  return src.replace(/\.png$/, '.webp')
}

function Points({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((pt, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: 1.55, color: '#d4d6da' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', marginTop: '8px', flex: 'none', background: accent }} />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  )
}

function Figure({ image, sizes, priority }: { image: ReportImage; sizes: Props['imageSizes']; priority?: boolean }) {
  const dim = sizes[image.src]
  const portrait = image.layout === 'portrait' || (dim && dim.height > dim.width)
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: portrait ? 'center' : 'stretch' }}>
      <picture style={{ display: 'block', width: portrait ? 'min(100%,420px)' : '100%' }}>
        <source srcSet={webp(image.src)} type="image/webp" />
        <img
          src={image.src}
          alt={image.alt}
          width={dim?.width}
          height={dim?.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: portrait ? '560px' : undefined,
            objectFit: 'cover',
            borderRadius: '14px',
            boxShadow: '0 0 0 1px rgba(255,255,255,.08)',
            background: '#1b1c1f',
          }}
        />
      </picture>
      {image.caption ? (
        <figcaption style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#62666d', textAlign: portrait ? 'center' : 'left' }}>
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function Kpi({ m }: { m: ReportMetric }) {
  return (
    <div style={{ ...CARD, padding: '16px' }}>
      <div style={{ fontSize: '12px', color: '#62666d' }}>{m.label}</div>
      <div style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.025em', marginTop: '6px', fontVariantNumeric: 'tabular-nums' }}>
        {m.value}
      </div>
      {m.delta ? <div style={{ fontSize: '12px', marginTop: '4px', color: TONE[m.tone ?? 'flat'] }}>{m.delta}</div> : null}
    </div>
  )
}

function Table({ columns, rows }: { columns: string[]; rows: string[][] }) {
  const grid = `minmax(0,1.4fr) repeat(${Math.max(columns.length - 1, 1)}, minmax(0,1fr))`
  return (
    <div style={{ ...CARD, background: 'rgba(255,255,255,.012)', overflowX: 'auto' }}>
      <div role="table" style={{ minWidth: `${Math.max(560, columns.length * 140)}px` }}>
        <div role="row" style={{ display: 'grid', gridTemplateColumns: grid, gap: '12px', alignItems: 'center', minHeight: '38px', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,.06)', fontSize: '12px', color: '#62666d' }}>
          {columns.map((c, i) => (
            <span role="columnheader" key={i}>
              {c}
            </span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div role="row" key={i} style={{ display: 'grid', gridTemplateColumns: grid, gap: '12px', alignItems: 'center', minHeight: '46px', padding: '10px 16px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,.04)', fontSize: '13px', lineHeight: 1.45 }}>
            {r.map((cell, j) => (
              <span role="cell" key={j} style={{ color: j === 0 ? '#f7f8f8' : '#b4b8bf', fontWeight: j === 0 ? 500 : 400, fontVariantNumeric: 'tabular-nums' }}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Chart({ section, accent }: { section: ReportSection; accent: string }) {
  const bars = section.bars ?? []
  const max = Math.max(...bars.map((b) => b.value), 1)
  return (
    <section style={{ padding: '20px', borderRadius: '14px', background: 'rgba(255,255,255,.012)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{section.chartTitle ?? section.heading}</span>
        {section.caption ? <span style={{ fontSize: '12px', color: '#62666d' }}>{section.caption}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bars.map((b, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(90px,160px) minmax(0,1fr) 64px', alignItems: 'center', gap: '12px', fontSize: '12.5px' }}>
            <span style={{ color: '#b4b8bf' }}>{b.label}</span>
            <div style={{ height: '10px', borderRadius: '4px', background: 'rgba(255,255,255,.04)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '4px', background: accent, opacity: 0.45 + 0.55 * (b.value / max), width: `${Math.max(2, (b.value / max) * 100)}%` }} />
            </div>
            <span style={{ textAlign: 'right', color: '#d4d6da', fontVariantNumeric: 'tabular-nums' }}>{b.display}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} style={BODY}>
          {p}
        </p>
      ))}
    </>
  )
}

const ICON_LINK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </svg>
)
const ICON_DOWNLOAD = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </svg>
)
const ICON_BACK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export default function ReportArticle(props: Props) {
  const { report: r, kind, type, accent, rgb, labels: L, imageSizes, variant } = props
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      },
      () => {},
    )
  }
  const kpis = [r.heroStat, ...r.metrics.filter((m) => m.label !== r.heroStat.label)]

  const backStyle: React.CSSProperties = { width: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: '6px', height: '28px', padding: '0 8px 0 4px', borderRadius: '7px', fontSize: '12.5px', fontWeight: 500, color: '#8a8f98', cursor: 'pointer' }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '340px', pointerEvents: 'none', background: `radial-gradient(60% 100% at 0% 0%,rgba(${rgb},.08),transparent 70%)` }} />
      <article
        data-r="m-pad"
        itemScope
        itemType="https://schema.org/Article"
        style={{ position: 'relative', maxWidth: '920px', margin: '0 auto', padding: variant === 'site' ? '48px 40px 96px' : '28px 40px 80px', display: 'flex', flexDirection: 'column', gap: '28px' }}
      >
        {props.backHref ? (
          <A href={props.backHref} className="relay-report-back" style={backStyle}>
            {ICON_BACK}
            {L.back}
          </A>
        ) : props.onBack ? (
          <span role="link" tabIndex={0} onClick={props.onBack} className="relay-report-back" style={backStyle}>
            {ICON_BACK}
            {L.back}
          </span>
        ) : null}

        <header style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RelayAppIcon kind={kind} size="44" />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '12.5px', color: '#8a8f98' }}>
              <span style={{ height: '22px', padding: '0 8px', display: 'inline-flex', alignItems: 'center', borderRadius: '999px', color: '#d4d6da', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)' }}>{type}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {r.market} ·&nbsp;<time dateTime={r.publishedAt} itemProp="datePublished">{props.publishedLabel}</time>&nbsp;· {r.readMinutes} {L.minRead}
              </span>
            </div>
          </div>
          <h1 itemProp="headline" style={{ margin: 0, fontSize: 'clamp(28px,3.4vw,40px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.1, textWrap: 'balance' }}>
            {r.title}
          </h1>
          <p itemProp="description" style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#b4b8bf', textWrap: 'pretty' }}>
            {r.dek ?? r.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8a8f98', flex: '1 1 200px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '7px', overflow: 'hidden', display: 'block' }}>
                <img src="/relay/relay-icon.png" alt="" width={26} height={26} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </span>
              <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                <span itemProp="name">{r.kicker ?? 'Relay Research'}</span>
              </span>
              {props.updatedLabel ? <span>· {L.lastUpdated} {props.updatedLabel}</span> : null}
            </span>
            <span role="button" tabIndex={0} onClick={copy} className="relay-report-ghost" style={{ height: '32px', padding: '0 12px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#d4d6da', cursor: 'pointer', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)' }}>
              {ICON_LINK}
              {copied ? L.copied : L.copyLink}
            </span>
            <span role="button" tabIndex={0} onClick={() => window.print()} className="relay-report-primary" style={{ height: '32px', padding: '0 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#0f1011', background: '#f7f8f8', cursor: 'pointer' }}>
              {ICON_DOWNLOAD}
              {L.downloadPdf}
            </span>
          </div>
        </header>

        {r.heroImage ? <Figure image={r.heroImage} sizes={imageSizes} priority /> : null}

        <section aria-label={L.keyMetrics} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: '10px' }}>
          {kpis.map((m, i) => (
            <Kpi key={i} m={m} />
          ))}
        </section>

        {r.keyTakeaways?.length ? (
          <section style={{ ...SECTION, padding: '20px', borderRadius: '14px', background: `rgba(${rgb},.04)`, boxShadow: `inset 0 0 0 1px rgba(${rgb},.14)` }}>
            <h2 style={H2}>{L.takeaways}</h2>
            <Points items={r.keyTakeaways} accent={accent} />
          </section>
        ) : null}

        <div itemProp="articleBody" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <section style={SECTION}>
            <p style={{ ...BODY, fontSize: '16px', color: '#d4d6da' }}>{r.overview}</p>
          </section>

          {r.background ? (
            <section style={SECTION}>
              <h2 style={H2}>{L.background}</h2>
              <p style={BODY}>{r.background}</p>
            </section>
          ) : null}

          {r.findings.length ? (
            <section style={{ ...SECTION, gap: '16px' }}>
              <h2 style={H2}>{L.keyFindings}</h2>
              {r.findings.map((f, i) => (
                <div key={i} style={{ ...CARD, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.35 }}>{f.title}</h3>
                  {f.stat ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.035em', color: accent === '#8a8f98' ? '#f7f8f8' : accent, fontVariantNumeric: 'tabular-nums' }}>{f.stat.value}</span>
                      <span style={{ fontSize: '13px', color: '#b4b8bf' }}>
                        {f.stat.label}
                        {f.stat.compare ? <span style={{ color: '#62666d' }}> · {f.stat.compare}</span> : null}
                      </span>
                    </div>
                  ) : null}
                  {f.compareStats?.length ? (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      {f.compareStats.map((c, j) => (
                        <span key={j} style={{ fontSize: '12.5px', color: '#8a8f98' }}>
                          <span style={{ color: '#f7f8f8', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{c.value}</span> {c.label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p style={{ ...BODY, fontSize: '14.5px' }}>{f.body}</p>
                  {f.dataSupport ? <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.6, color: '#62666d' }}>{f.dataSupport}</p> : null}
                  {f.whyItMatters ? (
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#d4d6da' }}>
                      <span style={{ fontWeight: 500, color: '#f7f8f8' }}>{L.whyThisMatters}</span> {f.whyItMatters}
                    </p>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}

          {r.sections.map((s, i) => (
            <section key={i} style={SECTION}>
              <h2 style={H2}>{s.heading}</h2>
              {s.body ? <p style={BODY}>{s.body}</p> : null}
              {s.paragraphs?.length ? <Paragraphs items={s.paragraphs} /> : null}
              {s.pullQuote ? (
                <blockquote style={{ margin: '4px 0', padding: '2px 0 2px 18px', borderLeft: `2px solid ${accent}`, fontSize: '19px', lineHeight: 1.5, letterSpacing: '-0.01em', color: '#f7f8f8', textWrap: 'pretty' }}>
                  {s.pullQuote}
                </blockquote>
              ) : null}
              {s.bullets?.length ? <Points items={s.bullets} accent={accent} /> : null}
              {s.bars?.length ? <Chart section={s} accent={accent} /> : null}
              {s.table ? <Table columns={s.table.columns} rows={s.table.rows} /> : null}
              {!s.bars?.length && s.caption && !s.table ? <p style={{ margin: 0, fontSize: '12.5px', color: '#62666d' }}>{s.caption}</p> : null}
              {s.image ? <Figure image={s.image} sizes={imageSizes} /> : null}
            </section>
          ))}

          {r.marketContext?.length ? (
            <section style={SECTION}>
              <h2 style={H2}>{L.marketContext}</h2>
              <Points items={r.marketContext} accent={accent} />
            </section>
          ) : null}

          {r.providerLandscape?.length ? (
            <section style={SECTION}>
              <h2 style={H2}>{L.providerLandscape}</h2>
              <div style={{ borderRadius: '12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)', background: 'rgba(255,255,255,.012)', overflowX: 'auto' }}>
                <div style={{ minWidth: '640px' }}>
                  {r.providerLandscape.map((p, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1.6fr) 110px', alignItems: 'start', gap: '14px', padding: '14px 16px', borderBottom: i === r.providerLandscape!.length - 1 ? 'none' : '1px solid rgba(255,255,255,.04)' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{p.metric}</span>
                      <span style={{ fontSize: '13px', color: '#b4b8bf', lineHeight: 1.5 }}>
                        {p.leader}
                        {p.note ? <span style={{ display: 'block', color: '#62666d', fontSize: '12.5px', marginTop: '3px' }}>{p.note}</span> : null}
                        {p.signal ? <span style={{ display: 'block', color: '#8a8f98', fontSize: '12.5px', marginTop: '3px' }}>{p.signal}</span> : null}
                      </span>
                      <span style={{ fontSize: '12.5px', textAlign: 'right', color: TONE[p.tone ?? 'flat'] }}>{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {r.implications.length ? (
            <section style={SECTION}>
              <h2 style={H2}>{L.implications}</h2>
              <Points items={r.implications} accent={accent} />
            </section>
          ) : null}

          {r.closing ? (
            <section style={SECTION}>
              <p style={{ ...BODY, fontSize: '16px', color: '#d4d6da' }}>{r.closing}</p>
            </section>
          ) : null}
        </div>

        {r.cta ? (
          <section style={{ padding: '24px', borderRadius: '14px', background: 'rgba(255,255,255,.02)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ ...H2, fontSize: '20px' }}>{r.cta.title}</h2>
            <p style={{ ...BODY, fontSize: '14.5px' }}>{r.cta.lede}</p>
            <A href={r.cta.href} className="relay-report-primary" style={{ marginTop: '6px', width: 'fit-content', height: '36px', padding: '0 16px', display: 'inline-flex', alignItems: 'center', borderRadius: '9px', fontSize: '13.5px', fontWeight: 500, color: '#0f1011', background: '#f7f8f8' }}>
              {r.cta.label}
            </A>
          </section>
        ) : null}

        <section style={{ ...SECTION, paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <h2 style={{ ...H2, fontSize: '15px' }}>{L.methodology}</h2>
          <p style={{ ...BODY, fontSize: '13.5px', color: '#8a8f98' }}>{r.methodology}</p>
          {r.sources.length ? (
            <>
              <div style={{ fontSize: '13px', fontWeight: 500, marginTop: '6px' }}>{L.sources}</div>
              <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12.5px', lineHeight: 1.55, color: '#8a8f98' }}>
                {r.sources.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </>
          ) : null}
        </section>

        {props.related.length ? (
          <section style={{ ...SECTION, paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 500 }}>{L.related}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '10px' }}>
              {props.related.map((x) => {
                const inner = (
                  <>
                    <RelayAppIcon kind={x.kind} size="30" />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: '#62666d' }}>
                        {x.type} · {x.scope}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 500, marginTop: '3px', textWrap: 'pretty', color: '#f7f8f8' }}>{x.title}</div>
                    </div>
                  </>
                )
                const style: React.CSSProperties = { padding: '14px', borderRadius: '12px', display: 'flex', gap: '12px', cursor: 'pointer', background: 'rgba(255,255,255,.012)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }
                return x.href ? (
                  <A key={x.slug} href={x.href} className="relay-report-card" style={style}>
                    {inner}
                  </A>
                ) : (
                  <div key={x.slug} role="link" tabIndex={0} onClick={() => props.onOpenRelated?.(x.slug)} className="relay-report-card" style={style}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </section>
        ) : null}
      </article>
      <style
        dangerouslySetInnerHTML={{
          __html: `.relay-report-back:hover{color:#f7f8f8 !important;background:rgba(255,255,255,.04) !important}
.relay-report-ghost:hover{background:rgba(255,255,255,.05) !important}
.relay-report-primary:hover{background:#e3e5e8 !important;color:#0f1011 !important}
.relay-report-card:hover{background:rgba(255,255,255,.03) !important}
@media print{[data-sc-name="Relay Site Nav"],[data-sc-name="Relay Site Footer"],[data-sc-name="Relay Site Cookies"],.relay-report-back,.relay-report-ghost,.relay-report-primary{display:none !important}html,body{background:#0f1011 !important}}`,
        }}
      />
    </div>
  )
}
