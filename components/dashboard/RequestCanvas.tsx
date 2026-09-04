'use client'

import { useState } from 'react'
import { CheckBox } from '@/components/dashboard/ui/CheckBox'
import { LiveDot } from '@/components/dashboard/ui/LiveDot'
import { getProvider, alsoRequesting, requestCorridors, requestFields, requestSlots } from '@/lib/mock/relay'
import { createIntro } from '@/lib/api/workspace'
import { ApiError } from '@/lib/api/simulate'

const DEFAULT_CONTEXT =
  "We're consolidating three payout providers into one rail before Q4. Priority is settlement speed into BRL and MXN, then fee. Need EMI-direct, no sponsor."

export default function RequestCanvas({ slug = 'nordbridge' }: { slug?: string }) {
  const provider = getProvider(slug) ?? getProvider('nordbridge')!
  const [fields, setFields] = useState(requestFields)
  const [chips, setChips] = useState(requestCorridors)
  const [context, setContext] = useState(DEFAULT_CONTEXT)
  const [slot, setSlot] = useState('Mon 31 Aug|11:30')
  const [also, setAlso] = useState(alsoRequesting.map((a) => a.slug))
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSend = Boolean(slot)

  const send = () => {
    if (!canSend || sent) return
    setError(null)
    void createIntro({
      providerId: provider.slug,
      providerName: provider.name,
      categoryName: 'Payouts',
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
          {provider.name} · usually replies within {provider.avgResponseHours ?? 4} hours
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
                  {f.hint ? <span className="relay-field-hint">{f.hint}</span> : null}
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
              <span>Times in CET · Stockholm</span>
            </div>
            <div className="relay-slots-days">
              {requestSlots.map((day) => (
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
              <span>3 of your 7 open requests have slots booked</span>
            </div>
          </div>

          <div className="relay-also">
            <div className="relay-field-label">ALSO REQUESTING</div>
            <div className="relay-also-list">
              {alsoRequesting.map((a) => (
                <div className="relay-also-row" key={a.slug}>
                  <CheckBox
                    checked={also.includes(a.slug)}
                    label={`Also request ${a.name}`}
                    onChange={(next) =>
                      setAlso((prev) => (next ? [...prev, a.slug] : prev.filter((s) => s !== a.slug)))
                    }
                  />
                  <span>{a.name}</span>
                  <span>{a.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
