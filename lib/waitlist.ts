import type { WaitlistCategory, WaitlistGoal, WaitlistInput, WaitlistRole, WaitlistVolume } from './api/waitlist'

/** The design's option labels → API values (design/relay-handoff/WAITLIST.md). */
const ROLE: Record<string, WaitlistRole> = {
  'Founder / CEO': 'founder_ceo',
  Product: 'product',
  Engineering: 'engineering',
  Finance: 'finance',
  'Payments / Ops': 'payments_ops',
  'Compliance / Risk': 'compliance_risk',
  Partnerships: 'partnerships',
  Other: 'other',
}
const VOLUME: Record<string, WaitlistVolume> = {
  'Pre-launch': 'pre_launch',
  'Under $100k': 'lt_100k',
  '$100k–$1M': '100k_1m',
  '$1M–$10M': '1m_10m',
  '$10M–$100M': '10m_100m',
  '$100M+': 'gt_100m',
}
const GOAL: Record<string, WaitlistGoal> = {
  'Find a new Provider': 'find_provider',
  'Compare pricing': 'compare_pricing',
  'Enter a new market': 'new_market',
  'Replace a current Provider': 'replace_provider',
  'Add a backup Provider': 'backup_provider',
  'Due diligence': 'due_diligence',
  'Market intelligence': 'market_intelligence',
}

/** What the Relay Waitlist design collects (its own state, labels as shown). */
export type WaitlistAnswers = {
  name: string
  email: string
  company: string
  role: string
  volume: string
  category: string
  goals: string[]
  notes: string
  hp?: string
}

export function waitlistPayload(a: WaitlistAnswers, locale: string): WaitlistInput {
  const q = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const [k, v] of q) if (k.startsWith('utm_') && v) utm[k] = v.slice(0, 200)
  const notes = a.notes.trim().slice(0, 500)
  return {
    fullName: a.name.trim(),
    email: a.email.trim().toLowerCase(),
    company: a.company.trim(),
    role: ROLE[a.role],
    monthlyVolume: VOLUME[a.volume],
    primaryCategory: a.category as WaitlistCategory,
    goals: a.goals.map((g) => GOAL[g]),
    ...(notes ? { notes } : {}),
    consent: true,
    website: a.hp ?? '',
    source: {
      ...utm,
      locale,
      landingPath: window.location.pathname,
      ...(document.referrer ? { referrer: document.referrer.slice(0, 500) } : {}),
    },
  }
}

/** Analytics props for a submission (no personal data). */
export function waitlistEventProps(a: WaitlistAnswers) {
  return { role: ROLE[a.role], monthlyVolume: VOLUME[a.volume], primaryCategory: a.category, goals: a.goals.map((g) => GOAL[g]) }
}

