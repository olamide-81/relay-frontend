'use client'

import { Link } from '@/i18n/navigation'
import { useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { useWeighting } from '@/components/dashboard/WeightingContext'
import { usePlan } from '@/components/dashboard/PlanContext'
import { computeScore } from '@/lib/relay/score'
import { getProvider } from '@/lib/mock/relay'

export function CompareTray() {
  const { ids, remove, clear, pendingSlug, setPendingSlug, replace } = useCompareTray()
  const { weighting } = useWeighting()
  const { entitlements } = usePlan()
  const cap = entitlements.compareSlots
  const slotsLeft = Math.max(0, cap - ids.length)
  const members = ids.map((slug) => getProvider(slug)).filter(Boolean)

  if (ids.length === 0 && !pendingSlug) return null

  return (
    <>
      <div className="relay-tray" role="region" aria-label="Compare tray">
        <div className="relay-tray-left">
          <span className="relay-tray-kicker">COMPARE TRAY</span>
          {members.map((p) =>
            p ? (
              <span className="relay-tray-chip" key={p.slug}>
                <span>{p.name.replace(' Payments', '').replace(' Pay', '')}</span>
                <span className="relay-tray-score">{computeScore(p, weighting)}</span>
                <button type="button" aria-label={`Remove ${p.name}`} onClick={() => remove(p.slug)}>
                  ×
                </button>
              </span>
            ) : null
          )}
          {slotsLeft > 0 ? (
            <span className="relay-tray-slot">
              {slotsLeft} slot{slotsLeft === 1 ? '' : 's'} left
            </span>
          ) : null}
        </div>
        <div className="relay-tray-right">
          <span className="relay-tray-hint">
            Up to {cap} · ticking a {cap === 2 ? 'third' : 'fifth'} asks which to swap
          </span>
          <button type="button" className="relay-tray-clear" onClick={clear}>
            Clear
          </button>
          <Link
            href={ids.length ? `/dashboard/compare?ids=${ids.join(',')}` : '/dashboard/compare'}
            className="relay-btn relay-btn--lime"
            aria-disabled={ids.length === 0}
            onClick={(e) => {
              if (ids.length === 0) e.preventDefault()
            }}
            style={ids.length === 0 ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
          >
            Compare {ids.length} →
          </Link>
        </div>
      </div>

      {pendingSlug ? (
        <div className="relay-modal-back" onClick={() => setPendingSlug(null)}>
          <div
            className="relay-swap"
            role="dialog"
            aria-labelledby="relay-swap-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="relay-swap-title">Tray is full</h2>
            <p>Four providers already. Choose one to swap for {getProvider(pendingSlug)?.name}.</p>
            <div className="relay-swap-list">
              {members.map((p) =>
                p ? (
                  <button type="button" key={p.slug} onClick={() => replace(p.slug, pendingSlug)}>
                    Replace {p.name}
                    <span>{computeScore(p, weighting)}</span>
                  </button>
                ) : null
              )}
            </div>
            <button type="button" className="relay-btn relay-btn--outline" onClick={() => setPendingSlug(null)}>
              Keep current tray
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
