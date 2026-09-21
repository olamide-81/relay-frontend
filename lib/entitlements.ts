export type PlanId = 'free' | 'pro' | 'proMax'

export interface Entitlements {
  catalogVisible: 5 | 'all'
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
    catalogVisible: 5,
    corridorPricesPerProvider: 1,
    pricingHistoryMonths: 0,
    compareSlots: 2,
    customWeighting: true,
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
    catalogVisible: 'all',
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
  proMax: {
    catalogVisible: 'all',
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
  return plan === 'pro' || plan === 'proMax'
}
