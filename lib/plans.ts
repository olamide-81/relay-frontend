import type { PlanId } from './entitlements'

export const PLAN_LABEL: Record<PlanId, string> = {
  free: 'Free',
  pro: 'Pro',
  proMax: 'Pro Max',
}

export const PLAN_PRICE: Record<PlanId, { month: string; annual: string; per: string }> = {
  free: { month: '$0', annual: '$0', per: 'forever' },
  pro: { month: '$499', annual: '$416', per: 'per month' },
  proMax: { month: '$1,290', annual: '$1,075', per: 'per month' },
}

export const planCards = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0',
    annual: '$0',
    per: 'forever',
    badge: '',
    desc: 'Enough to see if Relay is real. Five providers, two in compare.',
    features: [
      '5 providers in Intelligence and Directory',
      'Compare 2 of those 5',
      '1 shortlist',
      '2 intro requests per month',
    ],
    foot: 'No card required.',
    variant: 'dark' as const,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: '$499',
    annual: '$416',
    per: 'per month',
    badge: 'MOST TEAMS',
    desc: 'The full catalog, scored your way, when you are ready to decide.',
    features: [
      'Every live provider',
      'Compare up to 4 at a time',
      'Unlimited shortlists and intros',
      'Custom score weighting',
      'CSV and PDF export',
    ],
    foot: 'Annual billing saves two months.',
    variant: 'light' as const,
  },
  {
    id: 'proMax' as const,
    name: 'Pro Max',
    price: '$1,290',
    annual: '$1,075',
    per: 'per month',
    badge: '5 SEATS',
    desc: 'For teams where product, finance and ops all sit on the same RFP.',
    features: [
      'Everything in Pro',
      '5 seats included',
      'Shared shortlists',
      'API access',
      'SSO and audit log',
    ],
    foot: 'Additional seats $190/month.',
    variant: 'dark' as const,
  },
]

export const planMatrix = [
  { feature: 'Providers visible', free: '5', pro: 'All live', proMax: 'All live' },
  { feature: 'Compare at once', free: '2', pro: '4', proMax: '4' },
  { feature: 'Shortlists', free: '1', pro: 'Unlimited', proMax: 'Shared' },
  { feature: 'Intro requests', free: '2 / month', pro: 'Unlimited', proMax: 'Unlimited' },
  { feature: 'Custom weighting', free: 'Yes', pro: 'Yes', proMax: 'Yes' },
  { feature: 'Export (CSV, PDF)', free: '—', pro: 'Yes', proMax: 'Yes' },
  { feature: 'Seats', free: '1', pro: '1', proMax: '5 included' },
  { feature: 'API access', free: '—', pro: '—', proMax: 'Yes' },
  { feature: 'SSO', free: '—', pro: '—', proMax: 'Yes' },
]

export function planLabel(plan: PlanId) {
  return PLAN_LABEL[plan]
}

const PLAN_STORE = 'relay-plan'

export function readStoredPlan(): PlanId | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(PLAN_STORE)
    if (raw === 'pro' || raw === 'proMax') return raw
    if (raw === 'team') return 'proMax'
  } catch {
    return null
  }
  return null
}

export function writeStoredPlan(plan: PlanId) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(PLAN_STORE, plan)
}
