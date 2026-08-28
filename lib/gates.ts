export type GateId =
  | 'provider.corridor_table'
  | 'provider.pricing_history'
  | 'provider.funding'
  | 'report.locked_sections'
  | 'compare.slot_limit'
  | 'directory.export'
  | 'weighting.custom'
  | 'shortlist.limit'
  | 'intro.monthly_limit'
  | 'seats.invite'

export type GateCopy = {
  headline: string
  body: string
  bullets: string[]
  cta: string
  counter?: string
}

export function gateCopy(id: GateId, vars?: { name?: string; count?: number }): GateCopy {
  const name = vars?.name ?? 'Nordbridge'
  const count = vars?.count ?? 31
  const map: Record<GateId, GateCopy> = {
    'provider.corridor_table': {
      headline: `See all ${count} corridor prices for ${name} — and 24 months of history.`,
      body: "You're looking at one corridor. Pro opens the full pricing table for every provider, the movement behind each number, and side-by-side comparison without limits.",
      bullets: [
        `All ${count} corridors for ${name}, and every other provider`,
        '24 months of fee and FX-margin history',
        'Compare four providers side by side, unlimited',
        'Export the comparison to CSV or PDF',
      ],
      cta: 'Start Pro — $499/mo',
      counter: 'Free plan · 1 of 1 corridor views used',
    },
    'provider.pricing_history': {
      headline: `24 months of pricing history for ${name}.`,
      body: 'See how fees and FX margins moved on every corridor, not just the latest quote.',
      bullets: [
        'Month-by-month fee and FX-margin history',
        'Compare movement against the category median',
        'Export the series to CSV or PDF',
      ],
      cta: 'Start Pro — $499/mo',
      counter: 'Free plan · history locked',
    },
    'provider.funding': {
      headline: `Rounds, investors and cap-table signals for ${name}.`,
      body: 'Pro unlocks funding history, lead investors and filings so diligence is not a second tab.',
      bullets: [
        'Full round history with amounts and dates',
        'Lead investors and notable co-investors',
        'Filings and ownership notes',
      ],
      cta: 'Unlock with Pro — $499/mo',
    },
    'report.locked_sections': {
      headline: 'The remaining 3 sections model this against your own corridor mix.',
      body: 'Corridor-level forecasts, provider exposure and the full data appendix. Included in Pro, from $499/month.',
      bullets: [
        'Your corridor mix modelled against the map',
        'Provider exposure on the corridors you run',
        'Full data appendix',
      ],
      cta: 'Unlock with Pro',
    },
    'compare.slot_limit': {
      headline: 'Free compares two providers. Pro compares four, unlimited times.',
      body: 'You have two in the tray. Upgrade to keep adding — and to export the matrix when you are done.',
      bullets: [
        'Compare four providers side by side',
        'Custom score weighting, saved per project',
        'CSV and PDF export',
      ],
      cta: 'Start Pro — $499/mo',
      counter: 'Free plan · 2 of 2 compare slots used',
    },
    'directory.export': {
      headline: 'Export this view to CSV or PDF.',
      body: 'Pro includes CSV and PDF export of any directory, compare or shortlist view.',
      bullets: ['CSV of the current table', 'PDF of a comparison matrix', 'Saved views stay yours after you cancel'],
      cta: 'Start Pro — $499/mo',
    },
    'weighting.custom': {
      headline: 'Custom weighting is a Pro feature.',
      body: 'Changing fee, settlement and licence weights re-sorts every score in Relay. Saved per shortlist.',
      bullets: ['Re-score the directory live', 'Saved per project / shortlist', 'Same weights flow into compare'],
      cta: 'Start Pro — $499/mo',
    },
    'shortlist.limit': {
      headline: 'Free includes one shortlist of five. Pro is unlimited.',
      body: 'Upgrade to run multiple RFPs in parallel without dropping providers.',
      bullets: ['Unlimited shortlists', 'Unlimited intro requests', 'Shared lists on Team'],
      cta: 'Start Pro — $499/mo',
    },
    'intro.monthly_limit': {
      headline: 'You have used both intro requests for this month.',
      body: 'Pro removes the monthly cap so you can book intros as the RFP moves.',
      bullets: ['Unlimited intro requests', 'Slot booking on every request', 'Typical reply under 4 hours'],
      cta: 'Start Pro — $499/mo',
      counter: 'Free plan · 2 of 2 intros used',
    },
    'seats.invite': {
      headline: 'Additional seats are on Team.',
      body: 'Pro is one seat. Team includes five, then $190/month each.',
      bullets: ['5 seats included', 'Shared shortlists and comments', 'SSO and audit log'],
      cta: 'Talk to sales',
    },
  }
  return map[id]
}
