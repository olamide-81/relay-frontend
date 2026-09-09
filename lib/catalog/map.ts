import type { Category, CorridorRegion, FeeKind, FeeTier, LicenceKind, Provider } from '@/lib/relay/types'
import { formatSettle } from '@/lib/relay/format'

export type CatalogRecord = {
  id: string
  name: string
  website?: string
  headquartered?: string
  founded?: number
  category?: string[]
  subcategories?: string[]
  tags?: string[]
  regions?: string[]
  countries?: string[]
  description?: string
  longDescription?: string
  useCases?: string[]
  integrations?: string[]
  apiType?: string[]
  sdks?: string[]
  sandboxAvailable?: boolean
  documentationQuality?: number
  pricingModel?: string[]
  startingPrice?: string
  freeTrialAvailable?: boolean
  uptime?: number
  complianceStandards?: string[]
  licenses?: string[]
  keyClients?: string[]
  fundingStage?: string
  relayVerified?: boolean
  relayScore?: number
  isActive?: boolean
  tier?: 'free' | 'paid'
  logoUrl?: string
  settlementWindow?: string
  supportedCurrencies?: string[]
  supportedCorridors?: string[]
  onboardingRequirements?: string[]
  minimumCommitment?: string
  feeFromBps?: number
  feeKind?: FeeKind
  feePercentBps?: number
  feeFixedAmount?: number
  feeFixedCurrency?: string
  feeTiers?: FeeTier[]
  medianSettleMinutes?: number
  settleLabel?: string
  licenceLabel?: string
  licenceModel?: string
  scoreFee?: number
  scoreSettle?: number
  scoreLicence?: number
  successRatePct?: number
  minMonthlyVolumeUsd?: number
  integrationWeeks?: number
  avgResponseHours?: number
  corridorCount?: number
  feeTable?: Array<{ label: string; amount: string; notes?: string }>
  rateCard?: Array<{ metric: string; value: string; notes?: string }>
}

const REGIONS = new Set<CorridorRegion>([
  'Africa',
  'Europe',
  'UK',
  'LATAM',
  'North America',
  'Australia',
  'Asia Pacific',
  'Middle East',
])

const LICENCES = new Set<LicenceKind>(['EMI', 'MTL', 'MPI', 'FCA_API', 'MSB', 'PSP', 'SVF'])

export function mapCategory(raw?: string[]): Category {
  const text = (raw ?? []).join(' ').toLowerCase()
  if (/(payout|disburs)/.test(text)) return 'payouts'
  if (/(collection|acceptance|acquiring)/.test(text)) return 'collections'
  if (/\bfx\b|currency|foreign exchange/.test(text)) return 'fx'
  return 'other'
}

function mapRegions(raw?: string[]): CorridorRegion[] {
  return (raw ?? []).filter((item): item is CorridorRegion => REGIONS.has(item as CorridorRegion))
}

function mapLicences(raw?: string[]): LicenceKind[] {
  return (raw ?? [])
    .map((item) => item.replace(/\s+/g, '_').toUpperCase())
    .filter((item): item is LicenceKind => LICENCES.has(item as LicenceKind))
}

export function toUiProvider(record: CatalogRecord): Provider {
  const licences = mapLicences(record.licenses)
  const licenceLabel =
    record.licenceLabel ||
    licences.join(' · ') ||
    (record.licenses ?? []).join(' · ') ||
    '—'
  const countries = record.countries ?? []
  const corridors = record.supportedCorridors ?? []
  const corridorCount = record.corridorCount ?? corridors.length
  return {
    slug: record.id,
    name: record.name,
    hq: record.headquartered || '—',
    country: countries[0] || '',
    category: mapCategory(record.category),
    licences,
    licenceLabel,
    licenceModel: record.licenceModel || licenceLabel,
    regions: mapRegions(record.regions),
    feeKind: (record.feeKind as FeeKind) || (record.feeTiers?.length ? 'tiered' : record.feeFixedAmount ? 'fixed' : 'percent'),
    feeFromBps: record.feeFromBps ?? record.feePercentBps ?? 0,
    feePercentBps: record.feePercentBps ?? record.feeFromBps ?? null,
    feeFixedAmount: record.feeFixedAmount ?? null,
    feeFixedCurrency: record.feeFixedCurrency || 'USD',
    feeTiers: record.feeTiers ?? [],
    medianSettleMinutes: record.medianSettleMinutes ?? 0,
    settleLabel: formatSettle(record.medianSettleMinutes, record.settleLabel || record.settlementWindow),
    corridorCount,
    corridorFitPct: corridorCount ? Math.min(100, Math.round((corridorCount / Math.max(corridorCount, 6)) * 100)) : 0,
    corridorsInScope: corridors.length || corridorCount,
    corridorsScopeTotal: Math.max(corridors.length || corridorCount, 1),
    scoreFee: record.scoreFee ?? 0,
    scoreSettle: record.scoreSettle ?? 0,
    scoreLicence: record.scoreLicence ?? 0,
    successRatePct: record.successRatePct,
    minMonthlyVolumeUsd: record.minMonthlyVolumeUsd,
    integrationWeeks: record.integrationWeeks,
    avgResponseHours: record.avgResponseHours,
    description: record.description || record.longDescription,
  }
}
