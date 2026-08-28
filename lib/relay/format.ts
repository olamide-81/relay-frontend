import type { RequestStatus } from './types'

export function formatFeeFromBps(bps: number | null): string {
  if (bps == null) return '—'
  if (bps >= 100) return `${(bps / 100).toFixed(2)}%`.replace(/\.00%$/, '%')
  const pct = bps / 100
  return `${pct.toFixed(2)}%`
}

export function formatBpsDelta(bps: number): string {
  if (bps === 0) return 'flat'
  const sign = bps > 0 ? '+' : '−'
  return `${sign}${Math.abs(bps)} bps`
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes <= 0) return 'instant'
  if (minutes < 60) return `${minutes} min`
  if (minutes % 60 === 0) return `${minutes / 60} hr`
  const hours = Math.floor(minutes / 60)
  return `${hours} hr`
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
