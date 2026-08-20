'use client'

import { use } from 'react'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Paywall } from '@/components/dashboard/Paywall'
import { ProviderActions, VerifiedBadge } from '@/components/dashboard/ProviderActions'
import { getProviderById } from '@/data/providers'
import { useSession } from '@/hooks/useSession'

export default function ProviderDossierPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { user } = useSession()
  const provider = getProviderById(id)
  if (!provider) {
    notFound()
  }

  return (
    <>
      <PageHeader
        index="02"
        label="Dossier"
        title={
          <>
            {provider.name}{' '}
            <span className="serif-italic">{provider.headquarters.split(',')[0]}.</span>
          </>
        }
        desc={provider.description}
        action={
          <a href={provider.website} target="_blank" rel="noreferrer" className="pg-btn pg-btn--ghost mono">
            Website
          </a>
        }
      />

      <div className="dos-hero">
        <div className="dos-hero-main">
          <div className="dos-badges">
            <VerifiedBadge verified={provider.relayVerified} level={provider.verificationLevel} />
            <span className="dash-badge">{provider.categoryName}</span>
            {provider.partnering.introRequired && (
              <span className="dash-badge dash-badge--neutral">Intro required</span>
            )}
          </div>
          <p className="dos-lede">{provider.longDescription}</p>
          <ProviderActions provider={provider} user={user} />
        </div>
        <dl className="dos-kpis">
          <div>
            <dt className="mono">Measured uptime</dt>
            <dd>{provider.uptime.toFixed(2)}%</dd>
          </div>
          <div>
            <dt className="mono">Founded</dt>
            <dd>{provider.founded}</dd>
          </div>
          <div>
            <dt className="mono">Integration</dt>
            <dd>{provider.integrationTime}</dd>
          </div>
          <div>
            <dt className="mono">Settlement</dt>
            <dd>{provider.settlement}</dd>
          </div>
        </dl>
      </div>

      <Paywall
        user={user}
        title="Full commercial dossier"
        copy="Fee bands (credit, debit, transfer by value), licences, SLA credits, and what it actually takes to partner — Operator only."
      >
        <div className="dos-grid">
          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Commercials — transfer, credit, debit</span>
            </div>
            <div className="dos-fees">
              {provider.feeSchedule.map((sched) => (
                <div key={`${sched.rail}-${sched.direction}`} className="dos-fee">
                  <div className="dos-fee-head">
                    <strong>{sched.rail}</strong>
                    <span className="mono">
                      {sched.direction} · {sched.currency}
                    </span>
                  </div>
                  {sched.notes && <p className="dos-note">{sched.notes}</p>}
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Value band</th>
                        <th>Fee</th>
                        <th>Cap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sched.bands.map((b, i) => (
                        <tr key={i}>
                          <td className="mono">
                            {b.from.toLocaleString()}
                            {b.to == null ? '+' : ` – ${b.to.toLocaleString()}`}
                          </td>
                          <td>{b.fee}</td>
                          <td>{b.cap ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">SLA</span>
            </div>
            <dl className="dos-list">
              <div>
                <dt>Target</dt>
                <dd>{provider.sla.uptimeTarget}</dd>
              </div>
              <div>
                <dt>Measured</dt>
                <dd>{provider.sla.measuredUptime.toFixed(2)}%</dd>
              </div>
              <div>
                <dt>P1</dt>
                <dd>{provider.sla.severity1}</dd>
              </div>
              <div>
                <dt>Support</dt>
                <dd>{provider.sla.supportResponse}</dd>
              </div>
              <div>
                <dt>Credits</dt>
                <dd>{provider.sla.incidentCredit}</dd>
              </div>
              <div>
                <dt>Maintenance</dt>
                <dd>{provider.sla.maintenanceWindow}</dd>
              </div>
            </dl>
          </section>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Licences</span>
            </div>
            <ul className="dos-lic">
              {provider.licenses.map((lic) => (
                <li key={lic.name}>
                  <strong>{lic.name}</strong>
                  <span className="mono">
                    {lic.regulator} · {lic.jurisdiction} · {lic.status}
                  </span>
                  {lic.number && <span className="dos-note">{lic.number}</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Operating & partnering</span>
            </div>
            <dl className="dos-list">
              <div>
                <dt>Onboarding</dt>
                <dd>{provider.partnering.onboardingTime}</dd>
              </div>
              <div>
                <dt>Sandbox</dt>
                <dd>{provider.partnering.sandbox ? 'Yes' : 'No — production after KYC'}</dd>
              </div>
              <div>
                <dt>Minimums</dt>
                <dd>{provider.partnering.minVolume ?? 'Case by case'}</dd>
              </div>
              <div>
                <dt>Commercial</dt>
                <dd>{provider.partnering.commercial}</dd>
              </div>
              {provider.partnering.exclusivity && (
                <div>
                  <dt>Exclusivity</dt>
                  <dd>{provider.partnering.exclusivity}</dd>
                </div>
              )}
            </dl>
            <ul className="dos-reqs">
              {provider.partnering.entityRequirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
            {provider.partnering.introRequired && (
              <p className="dos-note">
                This partner typically wants a Relay introduction rather than a cold inbound.
              </p>
            )}
          </section>
        </div>

        <div className="dos-grid dos-grid--2">
          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">Capabilities</span>
            </div>
            <ul className="dos-chips">
              {provider.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="dos-note">
              SDKs: {provider.sdks.join(', ')} · Compliance: {provider.compliance.join(', ')}
            </p>
          </section>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">History</span>
            </div>
            <ol className="dos-hist">
              {provider.history.map((h) => (
                <li key={h.year + h.title}>
                  <span className="mono">{h.year}</span>
                  <strong>{h.title}</strong>
                  <p>{h.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Paywall>

      <p className="dos-foot mono">
        Indicative research — not a quote. Always confirm commercials in writing.{' '}
        <Link href="/dashboard/providers">Back to directory</Link>
      </p>
    </>
  )
}
