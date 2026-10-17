/* eslint-disable @typescript-eslint/no-explicit-any */
import { setPages } from './site-pages'
import { setReportConfig } from './reports'
import { applyStats } from './dc/relay-data'

/**
 * Website content managed in the admin panel (relay-api /api/site/content).
 * The design components keep their own constants as defaults; each registers
 * them with cmsBind() and they're replaced in place when content arrives.
 */
export type SiteContent = {
  pages?: { pages?: Record<string, boolean> }
  reports?: { reports?: any[] }
  stats?: { categories?: Record<string, number>; countries?: number; updated?: string }
  changelog?: { entries?: any[] }
  customers?: { stories?: any[]; logos?: any[]; quotes?: any[]; marquee?: any[] }
  careers?: { roles?: any[] }
  intelligence?: Record<string, any[]>
  pricing?: { monthlyLabel?: string; yearlyLabel?: string; savePct?: number }
}

/** Pro prices shown across the site and app (USD; charged in NGN at checkout). */
export const PRICE = { free: '$0', monthly: '$49', yearly: '$39', savePct: 20 }

type Binding = { target: any; row?: (row: any) => any }

const bound = new Map<string, Binding[]>()
let current: SiteContent | null = null

function at(c: SiteContent | null, path: string) {
  return path.split('.').reduce<any>((o, k) => (o == null ? o : o[k]), c)
}

function replaceInPlace({ target, row }: Binding, value: any) {
  if (Array.isArray(target) && Array.isArray(value)) {
    target.splice(0, target.length, ...(row ? value.map(row) : value))
  } else if (target && typeof target === 'object' && value && typeof value === 'object') {
    for (const k of Object.keys(target)) delete target[k]
    Object.assign(target, value)
  }
}

/**
 * Called from a design component's module: `cmsBind('changelog.entries', E)`.
 * Content rows are stored as tuples; pass `row` when the design keeps them as objects.
 */
export function cmsBind<T>(path: string, target: T, row?: (row: any) => any): T {
  if (!bound.has(path)) bound.set(path, [])
  const list = bound.get(path)!
  if (!list.some((b) => b.target === target)) list.push({ target, row })
  const value = at(current, path)
  if (value != null) replaceInPlace({ target, row }, value)
  return target
}

export function applySiteContent(c: SiteContent | null | undefined) {
  if (!c || c === current) return
  current = c
  setPages(c.pages?.pages)
  setReportConfig(c.reports?.reports)
  applyStats(c.stats?.categories)
  if (c.pricing) {
    if (c.pricing.monthlyLabel) PRICE.monthly = c.pricing.monthlyLabel
    if (c.pricing.yearlyLabel) PRICE.yearly = c.pricing.yearlyLabel
    if (c.pricing.savePct != null) PRICE.savePct = c.pricing.savePct
  }
  for (const [path, bindings] of bound) {
    const value = at(c, path)
    if (value != null) bindings.forEach((b) => replaceInPlace(b, value))
  }
}
