'use client'

import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { computeScore } from '@/lib/relay/score'
import { formatFeeFromBps } from '@/lib/relay/format'
import { addToShortlist, getShortlist } from '@/lib/workspace'
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
  const { isPro } = usePlan()
  const { openGate } = useGate()
  const { getProvider, getRecord, providers, loading } = useCatalog()
  const provider = getProvider(id)
  const record = getRecord(id)

  if (loading && !provider) {
    return (
      <div className="relay-page">
        <p className="relay-empty-hint">Loading provider…</p>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="relay-page">
        <p className="relay-empty-hint">This provider is not in the catalog. Add it in admin.</p>
        <Link href="/dashboard/providers" className="relay-link">
          Back to directory
        </Link>
      </div>
    )
  }

  const score = computeScore(provider, weighting)
  const shortlisted = shortlist.includes(provider.slug)
  const inTray = has(provider.slug)
  const tab = (searchParams.get('tab') ?? 'Overview') as (typeof TABS)[number]
  const activeTab = TABS.includes(tab) ? tab : 'Overview'
  const shortName = provider.name.replace(' Payments', '').replace(' Pay', '').replace(' Rails', '').replace(' Global', '')
  const corridors = record?.supportedCorridors?.length ? record.supportedCorridors : []
  const visibleCorridors = corridors
  const others = providers.filter((p) => p.slug !== provider.slug).slice(0, 4)
  const facts = [
    { k: 'Website', v: record?.website || '—' },
    { k: 'HQ', v: provider.hq },
    { k: 'Countries', v: (record?.countries ?? []).join(', ') || '—' },
    { k: 'Sandbox', v: record?.sandboxAvailable ? 'Available' : 'Not listed' },
    { k: 'Pricing', v: (record?.pricingModel ?? []).join(', ') || record?.startingPrice || '—' },
    { k: 'Settlement', v: provider.settleLabel },
  ]
  const licences = record?.licenses?.length ? record.licenses : provider.licences
  const compliance = record?.complianceStandards ?? []

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
      <div className="relay-crumb">Directory · {provider.category} · {provider.name}</div>
      <div className="relay-profile-head">
        <div>
          <div className="relay-profile-title">
            <h1 className="relay-hd-title">{provider.name}</h1>
            <span className="relay-badge relay-badge--lime">SCORE {score}</span>
            {record?.relayVerified ? <span className="relay-badge relay-badge--grey">VERIFIED</span> : null}
          </div>
          <p className="relay-profile-desc">{record?.longDescription || provider.description || 'No description yet.'}</p>
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
          { label: 'FOUNDED', v: record?.founded ? String(record.founded) : '—', sub: 'from catalog' },
          { label: 'FUNDING', v: record?.fundingStage || '—', sub: 'stage' },
          { label: 'FEE FROM', v: formatFeeFromBps(provider.feeFromBps || null), sub: 'bps in admin' },
          { label: 'SETTLE', v: provider.settleLabel, sub: 'window' },
          { label: 'CORRIDORS', v: String(provider.corridorCount || corridors.length || 0), sub: `${(record?.countries ?? []).length} countries` },
          { label: 'RELAY SCORE', v: String(score), sub: 'your weighting' },
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
              {facts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="relay-dpanel relay-dpanel--flush" id="pricing">
            <div className="relay-dpanel-head">
              <span>Pricing & corridors</span>
              <span className="relay-dpanel-note">{record?.startingPrice || provider.settleLabel}</span>
            </div>
            {visibleCorridors.length === 0 && !(record?.feeTable?.length) ? (
              <p className="relay-empty-hint">No corridor pricing on file yet.</p>
            ) : (
              <>
                <div className="relay-th relay-th--dprice">
                  <span>CORRIDOR / LINE</span>
                  <span>FEE</span>
                  <span>SETTLE</span>
                </div>
                {visibleCorridors.map((name) => (
                  <div className="relay-row relay-row--dprice" key={name}>
                    <span>{name}</span>
                    <span className="relay-fee">{formatFeeFromBps(provider.feeFromBps || null)}</span>
                    <span className="relay-settle">{provider.settleLabel}</span>
                  </div>
                ))}
                {(record?.feeTable ?? []).map((row) => (
                  <div className="relay-row relay-row--dprice" key={row.label}>
                    <span>{row.label}</span>
                    <span className="relay-fee">{row.amount}</span>
                    <span className="relay-settle">{row.notes || '—'}</span>
                  </div>
                ))}
              </>
            )}
          </section>

          <div className="relay-half">
            <section className="relay-dpanel" id="coverage">
              <h3>Coverage</h3>
              <p className="relay-dpanel-lede">
                {(record?.regions ?? provider.regions).join(', ') || 'No regions listed'}
              </p>
              <div className="relay-cov">
                {(record?.regions ?? provider.regions).length === 0 ? (
                  <p className="relay-empty-hint">Add regions in admin.</p>
                ) : (
                  (record?.regions ?? provider.regions).map((region) => (
                    <div key={region}>
                      <div className="relay-cov-lab">
                        <span>{region}</span>
                        <span>{(record?.countries ?? []).length || '—'}</span>
                      </div>
                      <div className="relay-cov-track">
                        <div className="relay-cov-bar relay-cov-bar--ok" style={{ width: '70%' }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
            <section className="relay-dpanel">
              <h3>Reliability</h3>
              <div className="relay-reli">
                <div>
                  <strong>{record?.uptime != null ? `${record.uptime}%` : '—'}</strong>
                  <span>Uptime</span>
                </div>
                <div>
                  <strong>{record?.successRatePct != null ? `${record.successRatePct}%` : '—'}</strong>
                  <span>Success rate</span>
                </div>
                <div>
                  <strong>{record?.documentationQuality != null ? `${record.documentationQuality}/5` : '—'}</strong>
                  <span>Docs</span>
                </div>
              </div>
            </section>
          </div>

          <section className="relay-dpanel relay-dpanel--flush" id="compliance">
            <div className="relay-dpanel-head">
              <span>Licences & compliance</span>
              <span className="relay-dpanel-meta">{licences.length} listed</span>
            </div>
            {licences.length === 0 && compliance.length === 0 ? (
              <p className="relay-empty-hint">No licences on file yet.</p>
            ) : (
              <>
                <div className="relay-th relay-th--comp">
                  <span>LICENCE / STANDARD</span>
                  <span>SOURCE</span>
                </div>
                {licences.map((name) => (
                  <div className="relay-row relay-row--comp" key={String(name)}>
                    <span>{name}</span>
                    <span>Catalog</span>
                  </div>
                ))}
                {compliance.map((name) => (
                  <div className="relay-row relay-row--comp" key={name}>
                    <span>{name}</span>
                    <span>Compliance</span>
                  </div>
                ))}
              </>
            )}
          </section>

          <section className="relay-dpanel" id="company">
            <h3>Integration</h3>
            <dl className="relay-kv">
              <div>
                <dt>Sandbox</dt>
                <dd>{record?.sandboxAvailable ? 'Yes' : 'No'}</dd>
              </div>
              <div>
                <dt>API</dt>
                <dd>{(record?.apiType ?? []).join(', ') || '—'}</dd>
              </div>
              <div>
                <dt>SDKs</dt>
                <dd>{(record?.sdks ?? []).join(', ') || '—'}</dd>
              </div>
              <div>
                <dt>Onboarding</dt>
                <dd>{(record?.onboardingRequirements ?? []).join(', ') || record?.minimumCommitment || '—'}</dd>
              </div>
            </dl>
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
          </div>

          <div className="relay-dpanel">
            <h3>Compare with</h3>
            <div className="relay-cmp-list">
              {others.length === 0 ? (
                <p className="relay-empty-hint">No other providers in the catalog yet.</p>
              ) : (
                others.map((p) => (
                  <div key={p.slug} className="relay-cmp-row">
                    <CheckBox checked={has(p.slug)} label={`Add ${p.name} to compare`} onChange={() => toggle(p.slug)} />
                    <button type="button" onClick={() => router.push(`/dashboard/providers/${p.slug}`)}>
                      <span>{p.name}</span>
                      <em>
                        {formatFeeFromBps(p.feeFromBps || null)} · {computeScore(p, weighting)}
                      </em>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
