export type Category = 'payouts' | 'collections' | 'fx' | 'other'

export type LicenceKind = 'EMI' | 'MTL' | 'MPI' | 'FCA_API' | 'MSB' | 'PSP' | 'SVF'

export type TopBarSection = 'Overview' | 'Directory' | 'Compare' | 'Shortlists' | 'Requests'

export type RailSection = 'Overview' | 'Directory' | 'Shortlists' | 'Requests' | 'Intelligence'

export interface Weighting {
  feePct: number
  settlePct: number
  licencePct: number
}

export type CorridorRegion =
  | 'Africa'
  | 'Europe'
  | 'UK'
  | 'LATAM'
  | 'North America'
  | 'Australia'
  | 'Asia Pacific'
  | 'Middle East'

export interface Provider {
  slug: string
  name: string
  hq: string
  country: string
  category: Category
  licences: LicenceKind[]
  licenceLabel: string
  licenceModel: string
  regions: CorridorRegion[]
  feeFromBps: number
  medianSettleMinutes: number
  settleLabel: string
  corridorCount: number
  corridorFitPct: number
  corridorsInScope: number
  corridorsScopeTotal: number
  scoreFee: number
  scoreSettle: number
  scoreLicence: number
  successRatePct?: number
  minMonthlyVolumeUsd?: number
  integrationWeeks?: number
  avgResponseHours?: number
  flag?: 'shortlisted' | 'new'
  description?: string
}

export interface CorridorPrice {
  corridor: string
  feeBps: number
  settle: string
  vsCategoryBps: number
}

export interface LicenceRow {
  name: string
  meta: string
  tone: 'ok' | 'warn'
}

export type RequestStatus = 'replied' | 'waiting' | 'no_pricing'

export interface ShortlistEntry {
  slug: string
  feeBps: number | null
  settleLabel: string
  status: RequestStatus
  statusAt: string
  next: 'book_intro' | 'chase' | 'chase_urgent'
}

export interface Shortlist {
  id: string
  name: string
  corridor: string
  monthlyVolumeUsd: number
  closesAt: string | null
  createdAt: string
  entries: ShortlistEntry[]
  progressPct: number
  meta: string
  stage: 'active' | 'draft' | 'decision'
}

export interface ActivityItem {
  at: string
  text: string
  meta: string
  kind: 'quote' | 'market' | 'listing' | 'action' | 'compliance'
}

export interface NewsItem {
  kind: 'REGULATION' | 'PRICING' | 'LICENSING' | 'MARKET'
  title: string
  meta: string
  affects: string
  when: string
}

export interface CategoryCardData {
  id: Category
  name: string
  short: string
  n: number
  feeFrom: string
  settle: string
  live: string
  delta: string
  deltaTone: 'down' | 'up' | 'flat'
  sparkSeed: number
  sparkDir: 'up' | 'down' | 'flat'
}

export interface SlotTime {
  label: string
  available: boolean
}

export interface SlotDay {
  day: string
  times: SlotTime[]
}
