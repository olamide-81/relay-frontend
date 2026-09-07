'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { useCatalog } from '@/components/dashboard/CatalogContext'
import { createIntro } from '@/lib/api/workspace'
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
  const { getProvider, providers } = useCatalog()
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

  if (!provider) {
    return (
      <div className="relay-page relay-page--request">
        <h1 className="relay-hd-title">Request intro</h1>
        <p className="relay-empty-hint">
          Pick a provider from the <Link href="/dashboard/providers">directory</Link> first. Add catalog records in
          admin if the list is empty.
        </p>
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
                    <span>{a.licenceLabel}</span>
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
