'use client'

import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { GatedPanel } from '@/components/dashboard/gate/GatedPanel'
import { ProBadge } from '@/components/dashboard/gate/ProBadge'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps } from '@/lib/relay/format'
import { addToShortlist, getShortlist } from '@/lib/workspace'
import { alsoConsidered, getProvider } from '@/lib/mock/relay'
import {
  complianceRows,
  coverageRows,
  dossierCorridors,
  dossierFacts,
  dossierLongCopy,
  fundingRows,
  glanceRows,
  historyBars,
  integrationRows,
  mentionRows,
  peopleRows,
  reliabilityRows,
} from '@/lib/mock/addendum'
import { useWorkspace } from '@/hooks/useWorkspace'

const TABS = ['Overview', 'Pricing', 'Coverage', 'Compliance', 'Company', 'Activity'] as const
const TAB_IDS: Record<(typeof TABS)[number], string> = {
  Overview: 'overview',
  Pricing: 'pricing',
  Coverage: 'coverage',
  Compliance: 'compliance',
  Company: 'company',
  Activity: 'activity',
}

export default function ProviderDossierCanvas({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { weighting } = useWeighting()
  const { shortlist, refresh } = useWorkspace()
  const { has, toggle } = useCompareTray()
  const { isPro, entitlements } = usePlan()
  const { openGate } = useGate()
  const provider = getProvider(id)
  if (!provider) return null

  const score = computeScore(provider, weighting)
  const shortlisted = shortlist.includes(provider.slug)
  const inTray = has(provider.slug)
  const tab = (searchParams.get('tab') ?? 'Overview') as (typeof TABS)[number]
  const activeTab = TABS.includes(tab) ? tab : 'Overview'
  const shortName = provider.name.replace(' Payments', '').replace(' Pay', '').replace(' Rails', '').replace(' Global', '')
  const showAllCorridors = isPro || entitlements.corridorPricesPerProvider === 'all'
  const visibleCorridors = showAllCorridors ? dossierCorridors : dossierCorridors.slice(0, 1)
  const gatedCorridors = showAllCorridors ? [] : dossierCorridors.slice(1)

  const goTab = (name: (typeof TABS)[number]) => {
    router.replace(`/dashboard/providers/${provider.slug}?tab=${name}`)
    document.getElementById(TAB_IDS[name])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onShortlist = () => {
    if (shortlisted) return
    if (!isPro && getShortlist().length >= 5) {
      openGate('shortlist.limit', { name: shortName })
      return
    }
    addToShortlist(provider.slug)
    refresh()
  }

  return (
    <div className="relay-page relay-page--dossier">
      <div className="relay-crumb">Directory · Payouts · {provider.name}</div>
      <div className="relay-profile-head">
        <div>
          <div className="relay-profile-title">
            <h1 className="relay-hd-title">{provider.name}</h1>
            <span className="relay-badge relay-badge--lime">SCORE {score}</span>
            <span className="relay-badge relay-badge--grey">VERIFIED 12 AUG</span>
          </div>
          <p className="relay-profile-desc">{provider.slug === 'nordbridge' ? dossierLongCopy : provider.description}</p>
        </div>
        <div className="relay-hd-actions">
          <button type="button" className="relay-btn relay-btn--outline" onClick={() => toggle(provider.slug)}>
            {inTray ? 'In compare tray' : 'Add to compare'}
          </button>
          <button type="button" className="relay-btn relay-btn--outline" onClick={onShortlist}>
            {shortlisted ? 'On shortlist' : 'Add to shortlist'}
          </button>
          <Link href={`/dashboard/intros/${provider.slug}`} className="relay-btn relay-btn--lime">
            Request intro
          </Link>
        </div>
      </div>

      <div className="relay-tabs" role="tablist">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={activeTab === name}
            className={activeTab === name ? 'relay-tabs--on' : ''}
            onClick={() => goTab(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="relay-kpi relay-kpi--6" id="overview">
        {[
          { label: 'FOUNDED', v: '2016', sub: '10 years old' },
          { label: 'HEADCOUNT', v: '180–220', sub: '+18% YoY' },
          { label: 'TOTAL RAISED', v: '$84M', sub: '4 rounds' },
          { label: 'OWNERSHIP', v: 'Private', sub: 'VC-backed' },
          { label: 'CORRIDORS', v: String(provider.corridorCount), sub: '14 markets' },
          { label: 'RELAY SCORE', v: String(score), sub: '1st of 42' },
        ].map((s) => (
          <div className="relay-kpi-tile" key={s.label}>
            <div className="relay-kpi-label">{s.label}</div>
            <div className="relay-kpi-value">{s.v}</div>
            <div className="relay-kpi-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="relay-dossier-grid">
        <div className="relay-dossier-col">
          <section className="relay-dpanel" id="company-facts">
            <h3>Company facts</h3>
            <dl className="relay-facts">
              {dossierFacts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="relay-dpanel relay-dpanel--flush" id="pricing">
            <div className="relay-dpanel-head">
              <span>Pricing by corridor</span>
              <span className="relay-dpanel-note">indicative at USD 1M/month</span>
              <span className="relay-dpanel-meta">REFRESHED DAILY</span>
            </div>
            <div className="relay-th relay-th--dprice">
              <span>CORRIDOR</span>
              <span>FEE</span>
              <span>FX</span>
              <span>SETTLE</span>
              <span style={{ textAlign: 'right' }}>VS CATEGORY</span>
            </div>
            {visibleCorridors.map((c) => (
              <div className="relay-row relay-row--dprice" key={c.name}>
                <span>{c.name}</span>
                <span className="relay-fee">{c.fee}</span>
                <span className="relay-fx">{c.fx}</span>
                <span className="relay-settle">{c.settle}</span>
                <span className={c.good ? 'relay-delta--good' : 'relay-delta--bad'} style={{ textAlign: 'right' }}>
                  {c.delta}
                </span>
              </div>
            ))}
            {gatedCorridors.length > 0 ? (
              <GatedPanel
                locked
                blur={4}
                headline={`See all ${provider.corridorCount} corridor prices for ${shortName}`}
                cta="Unlock →"
                onUnlock={() =>
                  openGate('provider.corridor_table', { name: shortName, count: provider.corridorCount })
                }
              >
                {gatedCorridors.map((c) => (
                  <div className="relay-row relay-row--dprice" key={c.name}>
                    <span>{c.name}</span>
                    <span className="relay-fee">{c.fee}</span>
                    <span className="relay-fx">{c.fx}</span>
                    <span className="relay-settle">{c.settle}</span>
                    <span style={{ textAlign: 'right' }}>{c.delta}</span>
                  </div>
                ))}
              </GatedPanel>
            ) : null}
            <GatedPanel
              locked={!isPro}
              blur={4}
              headline="24 months of pricing history for this provider"
              cta="Unlock →"
              onUnlock={() => openGate('provider.pricing_history', { name: shortName })}
            >
              <div className="relay-history">
                {historyBars.map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </GatedPanel>
          </section>

          <div className="relay-half">
            <section className="relay-dpanel" id="coverage">
              <h3>Coverage</h3>
              <p className="relay-dpanel-lede">31 corridors · 14 markets · 9 currencies</p>
              <div className="relay-cov">
                {coverageRows.map((c) => (
                  <div key={c.region}>
                    <div className="relay-cov-lab">
                      <span>{c.region}</span>
                      <span>{c.n}</span>
                    </div>
                    <div className="relay-cov-track">
                      <div
                        className={`relay-cov-bar relay-cov-bar--${c.tone}`}
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="relay-dpanel">
              <h3>Reliability</h3>
              <p className="relay-dpanel-lede">Reported by provider, sampled by Relay</p>
              <div className="relay-reli">
                {reliabilityRows.map((r) => (
                  <div key={r.label}>
                    <strong>{r.v}</strong>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="relay-dpanel relay-dpanel--flush" id="compliance">
            <div className="relay-dpanel-head">
              <span>Licences & compliance</span>
              <span className="relay-dpanel-meta">4 HELD · 1 GAP</span>
            </div>
            <div className="relay-th relay-th--comp">
              <span>LICENCE</span>
              <span>REGULATOR</span>
              <span>HELD</span>
              <span style={{ textAlign: 'right' }}>STATUS</span>
            </div>
            {complianceRows.map((c) => (
              <div className="relay-row relay-row--comp" key={c.name}>
                <span>{c.name}</span>
                <span>{c.regulator}</span>
                <span>{c.held}</span>
                <span className={c.ok ? 'relay-status--ok' : 'relay-status--warn'}>
                  <span className="relay-status-dot" />
                  {c.status}
                </span>
              </div>
            ))}
          </section>

          <div className="relay-half" id="company">
            <section className="relay-dpanel">
              <h3>Integration</h3>
              <dl className="relay-kv">
                {integrationRows.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd className={r.lime ? 'relay-kv--lime' : ''}>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section className="relay-dpanel">
              <h3>People</h3>
              <div className="relay-people">
                {peopleRows.map((p) => (
                  <div key={p.name}>
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.role}</span>
                    </div>
                    <em>{p.prior}</em>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="relay-dpanel relay-dpanel--flush relay-dpanel--fund" id="funding">
            <div className="relay-dpanel-head">
              <span>Funding & ownership</span>
              <ProBadge />
              <span className="relay-dpanel-note">$84M across 4 rounds</span>
            </div>
            <GatedPanel
              locked={!isPro}
              blur={4.5}
              headline="Rounds, investors, cap-table signals and filings"
              cta="Unlock with Pro →"
              onUnlock={() => openGate('provider.funding', { name: shortName })}
            >
              <div className="relay-th relay-th--fund">
                <span>ROUND</span>
                <span>AMOUNT</span>
                <span>DATE</span>
                <span>LEAD</span>
              </div>
              {fundingRows.map((f) => (
                <div className="relay-row relay-row--fund" key={f.round}>
                  <span>{f.round}</span>
                  <span>{f.amount}</span>
                  <span>{f.date}</span>
                  <span>{f.lead}</span>
                </div>
              ))}
            </GatedPanel>
          </section>

          <section className="relay-dpanel relay-dpanel--flush" id="activity">
            <div className="relay-dpanel-head">
              <span>In the intelligence feed</span>
            </div>
            {mentionRows.map((m) => (
              <div className="relay-row relay-row--mention" key={m.title}>
                <span className={`relay-kind relay-kind--${m.tone}`}>{m.kind}</span>
                <span>{m.title}</span>
                <span className="relay-when">{m.when}</span>
              </div>
            ))}
          </section>
        </div>

        <aside className="relay-dossier-side">
          <div className="relay-score-card">
            <div className="relay-score-card-top">
              <span className="relay-score-card-num">{score}</span>
              <span className="relay-score-card-lab">RELAY SCORE</span>
            </div>
            {[
              { label: `Fee (${weighting.feePct}%)`, v: provider.scoreFee },
              { label: `Settlement (${weighting.settlePct}%)`, v: provider.scoreSettle },
              { label: `Licence coverage (${weighting.licencePct}%)`, v: provider.scoreLicence },
            ].map((p) => (
              <div className="relay-score-part" key={p.label}>
                <div className="relay-score-part-lab">
                  <span>{p.label}</span>
                  <span>{p.v}%</span>
                </div>
                <div className="relay-score-track">
                  <div style={{ width: `${p.v}%` }} />
                </div>
              </div>
            ))}
            <Link href={`/dashboard/intros/${provider.slug}`} className="relay-btn relay-btn--ink">
              Request intro
            </Link>
            <p>
              Replies in ~{provider.avgResponseHours ?? 4} hours. 3 fintechs in your segment shortlisted this provider
              this month.
            </p>
          </div>

          <div className="relay-dpanel">
            <h3>At a glance</h3>
            <ul className="relay-glance">
              {glanceRows.map((g) => (
                <li key={g.text}>
                  <span className={`relay-glance-dot relay-glance-dot--${g.tone}`} />
                  {g.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relay-dpanel">
            <h3>Compare with</h3>
            <div className="relay-cmp-list">
              {alsoConsidered.map((slug) => {
                const p = getProvider(slug)
                if (!p) return null
                return (
                  <div key={slug} className="relay-cmp-row">
                    <CheckBox checked={has(slug)} label={`Add ${p.name} to compare`} onChange={() => toggle(slug)} />
                    <button type="button" onClick={() => router.push(`/dashboard/providers/${slug}`)}>
                      <span>{p.name}</span>
                      <em>
                        {formatFeeFromBps(p.feeFromBps)} · {computeScore(p, weighting)}
                      </em>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relay-dpanel">
            <div className="relay-dq-kicker">DATA QUALITY</div>
            <div className="relay-dq-val">
              94% <span>complete</span>
            </div>
            <p className="relay-dq-note">
              Pricing verified 12 Aug by the provider. Licences checked against 3 registers. Missing: APAC roadmap, SOC
              2 date.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
