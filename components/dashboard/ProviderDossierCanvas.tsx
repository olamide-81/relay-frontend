'use client'

import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { useOpenWeighting } from '@/components/dashboard/compare/WeightingPopover'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { useGate } from '@/components/dashboard/gate/GateContext'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { computeScore } from '@/lib/relay/score'
import {
  commercialPackages,
  commercialsSummary,
  feeFromProvider,
  formatFee,
  formatSettle,
} from '@/lib/relay/format'
import { CommercialPackages } from '@/components/dashboard/ui/Commercials'
import { addToShortlist, getShortlist } from '@/lib/workspace'
import { useWorkspace } from '@/hooks/useWorkspace'

const TABS = ['Overview', 'Commercials', 'Coverage', 'Compliance', 'Company'] as const

export default function ProviderDossierCanvas({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { weighting } = useWeighting()
  const openWeighting = useOpenWeighting()
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
        <EmptyState
          kind="directory"
          title="This provider isn’t in your directory"
          body="It may have been unpublished. Open Directory to pick someone who is live."
          actionLabel="Back to directory"
          actionHref="/dashboard/providers"
        />
      </div>
    )
  }

  const score = computeScore(provider, weighting)
  const shortlisted = shortlist.includes(provider.slug)
  const inTray = has(provider.slug)
  const rawTab = searchParams.get('tab')
  const tab = (rawTab === 'Pricing' ? 'Commercials' : rawTab ?? 'Overview') as (typeof TABS)[number]
  const activeTab = TABS.includes(tab) ? tab : 'Overview'
  const shortName = provider.name.replace(' Payments', '').replace(' Pay', '').replace(' Rails', '').replace(' Global', '')
  const corridors = record?.supportedCorridors ?? []
  const others = providers.filter((p) => p.slug !== provider.slug).slice(0, 4)
  const licences = record?.licenses?.length ? record.licenses : provider.licences
  const compliance = record?.complianceStandards ?? []
  const countries = record?.countries ?? []
  const regions = record?.regions ?? provider.regions
  const fee = feeFromProvider(provider)
  const packages = commercialPackages(provider)
  const settle = formatSettle(provider.medianSettleMinutes, provider.settleLabel)
  const hasLicences = licences.length > 0

  const goTab = (name: (typeof TABS)[number]) => {
    router.replace(`/dashboard/providers/${provider.slug}?tab=${name}`)
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
      <div className="relay-crumb">
        <Link href="/dashboard/providers">Directory</Link>
        <span> / {provider.category}</span>
        <span> / {provider.name}</span>
      </div>

      <div className="relay-profile-head">
        <div>
          <div className="relay-profile-title">
            <h1 className="relay-hd-title">{provider.name}</h1>
            <span className="relay-badge relay-badge--lime">SCORE {score}</span>
            {record?.relayVerified ? <span className="relay-badge relay-badge--grey">VERIFIED</span> : null}
          </div>
          <p className="relay-profile-desc">{record?.longDescription || provider.description || 'No description yet.'}</p>
          <div className="relay-profile-pills">
            {packages.length > 1 ? <span>{packages.length} commercial packages</span> : null}
            <span>{settle}</span>
            <span>{provider.hq}</span>
          </div>
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

      <div className="relay-kpi relay-kpi--4">
        {[
          { label: 'FROM', v: packages[0]?.headline || formatFee(fee, true), sub: packages.length > 1 ? `${packages.length} packages` : packages[0]?.kicker || 'published commercials' },
          { label: 'SETTLEMENT', v: settle, sub: 'when funds typically land' },
          { label: 'CORRIDORS', v: String(provider.corridorCount || corridors.length || 0), sub: `${countries.length} countries` },
          { label: 'YOUR SCORE', v: String(score), sub: 'from your weighting' },
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
          {activeTab === 'Overview' ? (
            <>
              <section className="relay-dpanel">
                <h3>At a glance</h3>
                <dl className="relay-facts">
                  {[
                    { k: 'Website', v: record?.website || '—' },
                    { k: 'Headquarters', v: provider.hq },
                    { k: 'Founded', v: record?.founded ? String(record.founded) : '—' },
                    { k: 'Funding', v: record?.fundingStage || '—' },
                    { k: 'Commercials', v: packages[0]?.headline || '—' },
                    { k: 'Settlement', v: settle },
                  ].map((f) => (
                    <div key={f.k}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className="relay-dpanel">
                <h3>How they charge</h3>
                <p className="relay-dpanel-lede">
                  {packages.length
                    ? `${packages.length} commercial package${packages.length === 1 ? '' : 's'} on file. ${settle}.`
                    : `No published commercials yet. ${settle}.`}
                </p>
                <Link href={`/dashboard/providers/${provider.slug}?tab=Commercials`} className="relay-link" style={{ marginTop: 14, display: 'inline-block' }}>
                  Full commercials →
                </Link>
              </section>
            </>
          ) : null}

          {activeTab === 'Commercials' ? (
            <section className="relay-dpanel">
              <h3>Commercials</h3>
              <p className="relay-dpanel-lede">
                {packages.length
                  ? 'Product schedules as published — currency, channel, fee, and limits — not a single blended rate.'
                  : 'No published commercials yet.'}
              </p>
              {packages.length ? (
                <div style={{ marginTop: 16 }}>
                  <CommercialPackages packages={packages} benefits={provider.sharedBenefits} />
                </div>
              ) : (
                <EmptyState
                  kind="intel"
                  compact
                  title="No published commercials"
                  body="Request an intro to get a quote for your corridors and volume."
                  actionLabel="Request intro"
                  actionHref={`/dashboard/intros/${provider.slug}`}
                />
              )}
            </section>
          ) : null}

          {activeTab === 'Coverage' ? (
            <section className="relay-dpanel">
              <h3>Where they operate</h3>
              <p className="relay-dpanel-lede">{regions.join(', ') || 'Regions not listed'}</p>
              {countries.length === 0 ? (
                <EmptyState
                  kind="directory"
                  compact
                  title="No country coverage on file"
                  body="Request an intro if you need a specific corridor confirmed."
                />
              ) : (
                <div className="relay-chip-cloud">
                  {countries.map((c) => (
                    <span key={c} className="relay-chip">
                      {c}
                    </span>
                  ))}
                </div>
              )}
              {corridors.length ? (
                <div className="relay-chip-cloud" style={{ marginTop: 12 }}>
                  {corridors.map((c) => (
                    <span key={c} className="relay-chip">
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {activeTab === 'Compliance' ? (
            <section className="relay-dpanel relay-dpanel--flush">
              <div className="relay-dpanel-head">
                <span>{hasLicences ? 'Licences & standards' : 'Standards'}</span>
                <span className="relay-dpanel-meta">{licences.length + compliance.length || undefined}</span>
              </div>
              {licences.length === 0 && compliance.length === 0 ? (
                <EmptyState
                  kind="intel"
                  compact
                  title="Nothing on file"
                  body="Confirmed licences and standards show up here when we have them — many providers operate through partners instead."
                />
              ) : (
                <>
                  {hasLicences ? (
                    <>
                      <div className="relay-th relay-th--comp">
                        <span>ITEM</span>
                        <span>TYPE</span>
                      </div>
                      {licences.map((name) => (
                        <div className="relay-row relay-row--comp" key={String(name)}>
                          <span>{name}</span>
                          <span>Licence</span>
                        </div>
                      ))}
                    </>
                  ) : null}
                  {compliance.map((name) => (
                    <div className="relay-row relay-row--comp" key={name}>
                      <span>{name}</span>
                      <span>Standard</span>
                    </div>
                  ))}
                </>
              )}
            </section>
          ) : null}

          {activeTab === 'Company' ? (
            <section className="relay-dpanel">
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
                  <dt>Typical onboarding</dt>
                  <dd>
                    {provider.integrationWeeks
                      ? `About ${provider.integrationWeeks} week${provider.integrationWeeks === 1 ? '' : 's'}`
                      : '—'}
                  </dd>
                </div>
                <div>
                  <dt>Requirements</dt>
                  <dd>{(record?.onboardingRequirements ?? []).join(', ') || record?.minimumCommitment || '—'}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>

        <aside className="relay-dossier-side">
          <div className="relay-score-card">
            <div className="relay-score-card-top">
              <span className="relay-score-card-num">{score}</span>
              <span className="relay-score-card-lab">YOUR SCORE</span>
            </div>
            {[
              { label: `Commercials (${weighting.feePct}%)`, v: provider.scoreFee },
              { label: `Settlement (${weighting.settlePct}%)`, v: provider.scoreSettle },
            ].map((p) => (
              <div className="relay-score-part" key={p.label}>
                <div className="relay-score-part-lab">
                  <span>{p.label}</span>
                  <span>{p.v}</span>
                </div>
                <div className="relay-score-track">
                  <div style={{ width: `${p.v}%` }} />
                </div>
              </div>
            ))}
            <button type="button" className="relay-btn relay-btn--outline" onClick={openWeighting}>
              Edit weighting
            </button>
            <Link href={`/dashboard/intros/${provider.slug}`} className="relay-btn relay-btn--ink">
              Request intro
            </Link>
          </div>

          <div className="relay-dpanel">
            <h3>Compare with</h3>
            <div className="relay-cmp-list">
              {others.length === 0 ? (
                <EmptyState kind="directory" compact title="No others to compare" body="This is the only provider in view right now." />
              ) : (
                others.map((p) => (
                  <div key={p.slug} className="relay-cmp-row">
                    <CheckBox checked={has(p.slug)} label={`Add ${p.name} to compare`} onChange={() => toggle(p.slug)} />
                    <button type="button" onClick={() => router.push(`/dashboard/providers/${p.slug}`)}>
                      <span>{p.name}</span>
                      <em>{commercialsSummary(commercialPackages(p)).headline}</em>
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
