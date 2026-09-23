'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { EmptyState } from '@/components/dashboard/ui/EmptyState'
import { useVisibleProviders } from '@/hooks/useVisibleProviders'
import { createIntro, listIntros, type IntroDoc } from '@/lib/api/workspace'
import { PartnershipMailButton } from '@/components/dashboard/PartnershipMailButton'
import { ApiError } from '@/lib/api/simulate'
import type { SlotDay } from '@/lib/relay/types'

const EMPTY_FIELDS = [
  { label: 'MONTHLY VOLUME', value: '', hint: '' },
  { label: 'GO-LIVE TARGET', value: '', hint: '' },
  { label: 'PAYOUT TYPE', value: '', hint: '' },
  { label: 'PRIORITY', value: '', hint: '' },
]

const CORRIDOR_OPTIONS = ['UK → Nigeria', 'EU → UK', 'US → Mexico', 'Intra-EU']

function upcomingSlots(): SlotDay[] {
  const days: SlotDay[] = []
  const now = new Date()
  for (let i = 1; i <= 3; i += 1) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    days.push({
      day: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
      times: [
        { label: '09:00', available: true },
        { label: '11:30', available: true },
        { label: '15:00', available: true },
      ],
    })
  }
  return days
}

export default function RequestCanvas({ slug }: { slug?: string }) {
  const { getProvider, providers } = useVisibleProviders()
  const provider = slug ? getProvider(slug) : undefined
  const others = providers.filter((p) => p.slug !== slug).slice(0, 4)
  const slots = useMemo(() => upcomingSlots(), [])
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [chips, setChips] = useState(CORRIDOR_OPTIONS.map((name) => ({ name, selected: false })))
  const [context, setContext] = useState('')
  const [slot, setSlot] = useState('')
  const [also, setAlso] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inbox, setInbox] = useState<IntroDoc[] | null>(null)

  useEffect(() => {
    if (slug) return
    void listIntros()
      .then((result) => setInbox(result.intros ?? []))
      .catch(() => setInbox([]))
  }, [slug])

  if (slug && !provider) {
    return (
      <div className="relay-page relay-page--request">
        <div className="relay-panel relay-panel--20">
          <EmptyState
            kind="directory"
            title="Provider not in the catalog"
            body="This intro target is missing. Open Directory and pick a listed provider to request an intro."
            actionLabel="Open directory"
            actionHref="/dashboard/providers"
          />
        </div>
      </div>
    )
  }

  if (!provider) {
    const rows = inbox ?? []
    return (
      <div className="relay-page relay-page--request">
        <div className="relay-hd">
          <div>
            <h1 className="relay-hd-title">Requests</h1>
            <div className="relay-hd-sub">
              {inbox === null
                ? 'Loading your intro requests'
                : rows.length
                  ? `${rows.length} intro request${rows.length === 1 ? '' : 's'}`
                  : 'Intros start from a provider in Directory'}
            </div>
          </div>
          <div className="relay-hd-actions">
            <Link href="/dashboard/providers" className="relay-btn relay-btn--white">
              Request intro
            </Link>
          </div>
        </div>
        {inbox === null ? null : rows.length === 0 ? (
          <div className="relay-panel relay-panel--20">
            <EmptyState
              kind="request"
              title="No intro requests yet"
              body="Pick a provider from Directory, choose a slot, and Relay will send a private intro. Contact details stay hidden until they accept."
              actionLabel="Open directory"
              actionHref="/dashboard/providers"
            />
          </div>
        ) : (
          <div className="relay-panel relay-panel--20">
            <div className="relay-th relay-th--rfp2">
              <span>PROVIDER</span>
              <span>SLOT</span>
              <span>STATUS</span>
              <span>CORRIDORS</span>
              <span style={{ textAlign: 'right' }}>SENT</span>
            </div>
            <div className="relay-rows">
              {rows.map((row) => {
                const p = getProvider(row.providerId)
                const name = p?.name ?? row.providerName ?? row.providerId
                return (
                  <Link
                    key={row.id}
                    href={`/dashboard/intros/${row.providerId}`}
                    className="relay-row relay-row--rfp2"
                  >
                    <div>
                      <div className="relay-prov-name">{name}</div>
                      <div className="relay-meta">{row.categoryName || p?.hq || 'Intro request'}</div>
                    </div>
                    <span className="relay-settle">{row.slot || '—'}</span>
                    <div className="relay-status">
                      <span className="relay-status-dot" style={{ background: 'oklch(.85 .15 130)' }} />
                      <span className="relay-status-label">{row.status.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="relay-meta">{row.corridors?.length ? row.corridors.join(', ') : '—'}</span>
                    <span className="relay-score">
                      {new Date(row.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  const canSend = Boolean(slot)

  const send = () => {
    if (!canSend || sent) return
    setError(null)
    void createIntro({
      providerId: provider.slug,
      providerName: provider.name,
      categoryName: provider.category,
      alsoProviderIds: also,
      corridors: chips.filter((c) => c.selected).map((c) => c.name),
      fields,
      context,
      slot: slot.replace('|', ' '),
    })
      .then(() => setSent(true))
      .catch((e) => {
        setError(e instanceof ApiError ? e.message : 'Could not send request. Is the API running?')
      })
  }

  return (
    <div className="relay-page relay-page--request">
      <div>
        <h1 className="relay-hd-title">Request intro</h1>
        <div className="relay-hd-sub">
          {provider.name}
          {provider.avgResponseHours ? ` · usually replies within ${provider.avgResponseHours} hours` : ''}
        </div>
        <div className="relay-hd-actions" style={{ marginLeft: 0, marginTop: 14, justifyContent: 'flex-start' }}>
          <PartnershipMailButton providerId={provider.slug} providerName={provider.name} />
        </div>
      </div>

      <div className="relay-req-grid">
        <div className="relay-form">
          <div className="relay-form-title">What {provider.name.split(' ')[0]} needs to price this</div>
          <div className="relay-fields">
            {fields.map((f, i) => (
              <div key={f.label}>
                <div className="relay-field-label">{f.label}</div>
                <label className="relay-field">
                  <input
                    value={f.value}
                    onChange={(e) =>
                      setFields((prev) => prev.map((row, j) => (j === i ? { ...row, value: e.target.value } : row)))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <div>
            <div className="relay-field-label">CORRIDORS IN SCOPE</div>
            <div className="relay-chips">
              {chips.map((ch) => (
                <button
                  key={ch.name}
                  type="button"
                  className={`relay-chip${ch.selected ? ' relay-chip--on' : ''}`}
                  onClick={() =>
                    setChips((prev) => prev.map((c) => (c.name === ch.name ? { ...c, selected: !c.selected } : c)))
                  }
                >
                  {ch.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="relay-field-label">CONTEXT FOR THE CALL</div>
            <textarea className="relay-textarea" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
          <div className="relay-form-foot">
            <button type="button" className="relay-btn relay-btn--lime" disabled={!canSend || sent} onClick={send}>
              {sent ? 'Request sent' : 'Send request'}
            </button>
            <p>
              {error ??
                'Your company profile and volumes are shared. Contact details stay hidden until they accept.'}
            </p>
          </div>
        </div>

        <div className="relay-stack">
          <div className="relay-slots">
            <div className="relay-slots-head">
              <h2>Pick a slot</h2>
              <span>Times in your local timezone</span>
            </div>
            <div className="relay-slots-days">
              {slots.map((day) => (
                <div key={day.day}>
                  <div className="relay-slot-day">{day.day}</div>
                  <div className="relay-slot-row">
                    {day.times.map((t) => {
                      const id = `${day.day}|${t.label}`
                      const on = slot === id
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`relay-slot${on ? ' relay-slot--on' : ''}`}
                          disabled={!t.available}
                          onClick={() => setSlot(id)}
                        >
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="relay-slots-foot">
              <LiveDot />
              <span>Pick a time to send the request</span>
            </div>
          </div>

          {others.length ? (
            <div className="relay-also">
              <div className="relay-field-label">ALSO REQUESTING</div>
              <div className="relay-also-list">
                {others.map((a) => (
                  <div className="relay-also-row" key={a.slug}>
                    <CheckBox
                      checked={also.includes(a.slug)}
                      label={`Also request ${a.name}`}
                      onChange={(next) =>
                        setAlso((prev) => (next ? [...prev, a.slug] : prev.filter((s) => s !== a.slug)))
                      }
                    />
                    <span>{a.name}</span>
                    <span>{a.hq.split(',')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
