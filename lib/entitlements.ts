export type PlanId = 'free' | 'pro' | 'team'

export interface Entitlements {
  corridorPricesPerProvider: number | 'all'
  pricingHistoryMonths: 0 | 24
  compareSlots: 2 | 4
  customWeighting: boolean
  shortlists: number | 'unlimited'
  shortlistsShared: boolean
  introRequestsPerMonth: number | 'unlimited'
  marketMapsPerMonth: number | 'unlimited'
  reportAppendix: boolean
  exports: false | 'csv_pdf'
  seatsIncluded: number
  apiAccess: boolean
  rfpApprovals: boolean
  sso: boolean
}

export const ENTITLEMENTS: Record<PlanId, Entitlements> = {
  free: {
    corridorPricesPerProvider: 1,
    pricingHistoryMonths: 0,
    compareSlots: 2,
    customWeighting: false,
    shortlists: 1,
    shortlistsShared: false,
    introRequestsPerMonth: 2,
    marketMapsPerMonth: 1,
    reportAppendix: false,
    exports: false,
    seatsIncluded: 1,
    apiAccess: false,
    rfpApprovals: false,
    sso: false,
  },
  pro: {
    corridorPricesPerProvider: 'all',
    pricingHistoryMonths: 24,
    compareSlots: 4,
    customWeighting: true,
    shortlists: 'unlimited',
    shortlistsShared: false,
    introRequestsPerMonth: 'unlimited',
    marketMapsPerMonth: 'unlimited',
    reportAppendix: true,
    exports: 'csv_pdf',
    seatsIncluded: 1,
    apiAccess: false,
    rfpApprovals: false,
    sso: false,
  },
  team: {
    corridorPricesPerProvider: 'all',
    pricingHistoryMonths: 24,
    compareSlots: 4,
    customWeighting: true,
    shortlists: 'unlimited',
    shortlistsShared: true,
    introRequestsPerMonth: 'unlimited',
    marketMapsPerMonth: 'unlimited',
    reportAppendix: true,
    exports: 'csv_pdf',
    seatsIncluded: 5,
    apiAccess: true,
    rfpApprovals: true,
    sso: true,
  },
}

export function isProPlan(plan: PlanId) {
  return plan === 'pro' || plan === 'team'
}
