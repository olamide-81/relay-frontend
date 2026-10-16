import { api } from './client'
import { useLiveApi } from './config'
import { delay } from './simulate'

export type WaitlistRole =
  | 'founder_ceo'
  | 'product'
  | 'engineering'
  | 'finance'
  | 'payments_ops'
  | 'compliance_risk'
  | 'partnerships'
  | 'other'
export type WaitlistVolume = 'pre_launch' | 'lt_100k' | '100k_1m' | '1m_10m' | '10m_100m' | 'gt_100m'
export type WaitlistCategory = 'collections' | 'payouts' | 'fx' | 'cards' | 'kyc' | 'bank'
export type WaitlistGoal =
  | 'find_provider'
  | 'compare_pricing'
  | 'new_market'
  | 'replace_provider'
  | 'backup_provider'
  | 'due_diligence'
  | 'market_intelligence'

export type WaitlistInput = {
  fullName: string
  email: string
  company: string
  role: WaitlistRole
  monthlyVolume: WaitlistVolume
  primaryCategory: WaitlistCategory
  goals: WaitlistGoal[]
  notes?: string
  consent: true
  /** Honeypot: always empty for people. */
  website?: string
  source: {
    locale: string
    landingPath: string
    referrer?: string
    [utm: `utm_${string}`]: string | undefined
  }
}

/** 'created' for a new entry (201), 'exists' when the email was already on the list (200, answers updated). */
export type WaitlistResult = 'created' | 'exists'

/** POST /api/waitlist — upserts on email. */
export async function joinWaitlist(input: WaitlistInput): Promise<WaitlistResult> {
  if (!useLiveApi) {
    await delay(1100)
    return /^taken@/i.test(input.email.trim()) ? 'exists' : 'created'
  }
  const res = await api.post<{ status?: WaitlistResult; alreadyJoined?: boolean }>('/api/waitlist', input)
  return res?.status === 'exists' || res?.alreadyJoined ? 'exists' : 'created'
}
