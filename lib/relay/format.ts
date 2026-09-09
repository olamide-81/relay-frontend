import type { RequestStatus } from './types'

export type FeeKind = 'percent' | 'fixed' | 'tiered' | 'mixed'

export type FeeTier = {
  upToUsd: number | null
  feePercentBps?: number | null
  feeFixedAmount?: number | null
}

export type FeeInput = {
  kind?: FeeKind | null
  feeFromBps?: number | null
  feePercentBps?: number | null
  feeFixedAmount?: number | null
  feeFixedCurrency?: string | null
  feeTiers?: FeeTier[] | null
}

function trimPct(bps: number) {
  const pct = bps / 100
  if (Number.isInteger(pct)) return String(pct)
  const digits = pct < 0.1 ? 2 : 2
  return pct.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '')
}

export function formatFeeFromBps(bps: number | null, opts?: { ofValue?: boolean }): string {
  if (bps == null) return '—'
  const body = `${trimPct(bps)}%`
  return opts?.ofValue ? `${body} of value` : body
}

export function formatMoney(amount: number, currency = 'USD') {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency && currency !== 'USD' ? `${currency} ` : '$'
  const n = Number.isInteger(amount) ? String(amount) : amount.toFixed(2)
  return `${symbol}${n}`
}

function inferKind(input: FeeInput): FeeKind {
  if (input.kind) return input.kind
  if (input.feeTiers?.length) return 'tiered'
  if ((input.feePercentBps || input.feeFromBps) && input.feeFixedAmount) return 'mixed'
  if (input.feeFixedAmount) return 'fixed'
  return 'percent'
}

export function formatFee(input: FeeInput | number | null | undefined, compact = true): string {
  if (input == null) return '—'
  if (typeof input === 'number') return formatFeeFromBps(input, { ofValue: !compact })

  const kind = inferKind(input)
  const pctBps = input.feePercentBps ?? (kind === 'percent' || kind === 'mixed' ? input.feeFromBps : null)
  const fixed = input.feeFixedAmount
  const currency = input.feeFixedCurrency || 'USD'

  if (kind === 'fixed' && fixed != null) {
    return compact ? `${formatMoney(fixed, currency)} / tx` : `${formatMoney(fixed, currency)} per transfer`
  }

  if (kind === 'mixed' && pctBps != null && fixed != null) {
    return compact
      ? `${formatFeeFromBps(pctBps)} + ${formatMoney(fixed, currency)}`
      : `${formatFeeFromBps(pctBps, { ofValue: true })} + ${formatMoney(fixed, currency)} per transfer`
  }

  if (kind === 'tiered') {
    const tiers = input.feeTiers ?? []
    const first = tiers[0]
    const fromPct = first?.feePercentBps ?? pctBps ?? input.feeFromBps
    const fromFixed = first?.feeFixedAmount ?? fixed
    const from =
      fromPct != null
        ? formatFeeFromBps(fromPct)
        : fromFixed != null
          ? formatMoney(fromFixed, currency)
          : null
    if (!from) return compact ? 'Tiered' : 'Tiered by transfer value'
    return compact ? `From ${from}` : `Tiered · from ${from}`
  }

  if (pctBps != null) return formatFeeFromBps(pctBps, { ofValue: !compact })
  if (input.feeFromBps != null) return formatFeeFromBps(input.feeFromBps, { ofValue: !compact })
  if (fixed != null) return compact ? `${formatMoney(fixed, currency)} / tx` : `${formatMoney(fixed, currency)} per transfer`
  return '—'
}

export function feeFromProvider(p: {
  feeKind?: FeeKind | null
  feeFromBps?: number | null
  feePercentBps?: number | null
  feeFixedAmount?: number | null
  feeFixedCurrency?: string | null
  feeTiers?: FeeTier[] | null
}): FeeInput {
  return {
    kind: p.feeKind,
    feeFromBps: p.feeFromBps,
    feePercentBps: p.feePercentBps,
    feeFixedAmount: p.feeFixedAmount,
    feeFixedCurrency: p.feeFixedCurrency,
    feeTiers: p.feeTiers,
  }
}

export function formatFeeKind(kind?: FeeKind | null) {
  if (kind === 'fixed') return 'Fixed per transfer'
  if (kind === 'tiered') return 'Tiered by value'
  if (kind === 'mixed') return 'Percent + fixed'
  return '% of transfer value'
}

export function formatSettle(minutes?: number | null, raw?: string | null): string {
  const label = (raw || '').trim()
  const lower = label.toLowerCase()

  if (/rtp\s*\/\s*ach|ach\s*\/\s*rtp/.test(lower)) return 'Instant or next business day'
  if (/near-instant|a2a|instant data|instant link/.test(lower)) return 'Usually instant'
  if (/\binstant\b/.test(lower) && !/ach/.test(lower)) return 'Usually instant'
  if (/t\s*\+\s*1|next (business )?day/.test(lower)) return 'Next business day'
  if (/t\s*\+\s*2/.test(lower)) return 'In 2 business days'
  if (/t\s*\+\s*3/.test(lower)) return 'In 3 business days'
  if (/same day|t\s*\+\s*0/.test(lower)) {
    if (minutes != null && minutes > 0 && minutes < 60) return `Same day · about ${minutes} min`
    return 'Same day'
  }

  if (minutes == null || minutes < 0) {
    if (!label || label === '—') return '—'
    return label
  }
  if (minutes === 0) return 'Usually instant'
  if (minutes < 60) return `About ${minutes} minutes`
  if (minutes <= 12 * 60) return 'Same day'
  if (minutes <= 36 * 60) return 'Next business day'
  const days = Math.max(2, Math.round(minutes / (24 * 60)))
  return `In about ${days} business days`
}

export function formatBpsDelta(bps: number): string {
  if (bps === 0) return 'flat'
  const sign = bps > 0 ? '+' : '−'
  return `${sign}${Math.abs(bps)} bps`
}

export function formatDurationMinutes(minutes: number): string {
  return formatSettle(minutes)
}

export function formatVolumeUsd(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000
    return Number.isInteger(m) ? `USD ${m}M` : `USD ${m.toFixed(1)}M`
  }
  if (value >= 1_000) return `$${Math.round(value / 1000)}k`
  return `$${value}`
}

export function statusLabel(status: RequestStatus, at: string): string {
  if (status === 'replied') return `Replied ${at}`
  if (status === 'waiting') return `Waiting · ${at}`
  return 'No pricing yet'
}

export function sparkBars(seed: number, dir: 'up' | 'down' | 'flat') {
  const out: { h: string; last: boolean }[] = []
  let x = seed
  for (let i = 0; i < 12; i++) {
    x = (x * 9301 + 49297) % 233280
    const jitter = (x / 233280) * 26
    const trend = dir === 'up' ? i * 4.2 : dir === 'down' ? (11 - i) * 4.2 : 22
    const h = Math.max(14, Math.min(96, Math.round(30 + trend + jitter)))
    out.push({ h: `${h}%`, last: i >= 10 })
  }
  return out
}
