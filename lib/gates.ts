export type GateId =
  | 'provider.corridor_table'
  | 'provider.pricing_history'
  | 'provider.funding'
  | 'report.locked_sections'
  | 'compare.slot_limit'
  | 'catalog.limit'
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
  const name = vars?.name ?? 'this provider'
  const count = vars?.count ?? 12
  const map: Record<GateId, GateCopy> = {
    'provider.corridor_table': {
      headline: `See all corridor prices for ${name}.`,
      body: 'Free shows the headline commercials. Pro opens the full schedule for every live provider.',
      bullets: [
        `Full commercials for ${name}`,
        'Compare up to four providers',
        'Export the comparison',
      ],
      cta: 'Start Pro',
      counter: 'Free · headline commercials only',
    },
    'provider.pricing_history': {
      headline: `Pricing history for ${name}.`,
      body: 'See how fees moved, not just the latest quote.',
      bullets: ['Fee history on listed corridors', 'Compare movement in the tray', 'CSV and PDF export'],
      cta: 'Start Pro',
      counter: 'Free plan · history locked',
    },
    'provider.funding': {
      headline: `Rounds and investors for ${name}.`,
      body: 'Pro unlocks funding history so diligence is not a second tab.',
      bullets: ['Round history', 'Lead investors', 'Filings where we have them'],
      cta: 'Unlock with Pro',
    },
    'report.locked_sections': {
      headline: 'The rest of this brief is on Pro.',
      body: 'Provider exposure against your mix, plus the data behind the ranking.',
      bullets: ['Full catalog, not five', 'Compare four at a time', 'Export'],
      cta: 'Unlock with Pro',
    },
    'compare.slot_limit': {
      headline: 'Free compares two of the five you can see.',
      body: 'You already have two in the tray. Pro opens the full catalog and four-up compare.',
      bullets: ['See every live provider', 'Compare four side by side', 'CSV and PDF export'],
      cta: 'Start Pro',
      counter: 'Free · 2 of 2 compare slots',
    },
    'catalog.limit': {
      headline: `Free shows 5 of ${count} live providers.`,
      body: 'Intelligence and Directory stay at five until you upgrade. Compare is two of those five.',
      bullets: ['Every live provider', 'Compare up to four', 'Unlimited shortlists and intros'],
      cta: 'Start Pro',
      counter: `Free · 5 of ${count} providers`,
    },
    'directory.export': {
      headline: 'Export this view to CSV or PDF.',
      body: 'Pro includes CSV and PDF export of any directory, compare or shortlist view.',
      bullets: ['CSV of the current table', 'PDF of a comparison matrix'],
      cta: 'Start Pro',
    },
    'weighting.custom': {
      headline: 'Custom weighting is a Pro feature.',
      body: 'Changing commercials and settlement weights re-sorts every score in Relay.',
      bullets: ['Re-score the directory live', 'Same weights flow into compare'],
      cta: 'Start Pro',
    },
    'shortlist.limit': {
      headline: 'Free includes one shortlist. Pro is unlimited.',
      body: 'Upgrade to run more than one list without dropping providers.',
      bullets: ['Unlimited shortlists', 'Unlimited intro requests', 'Shared lists on Pro Max'],
      cta: 'Start Pro',
    },
    'intro.monthly_limit': {
      headline: 'You have used both intro requests for this month.',
      body: 'Pro removes the monthly cap so you can book intros as the RFP moves.',
      bullets: ['Unlimited intro requests', 'Typical reply under a working day'],
      cta: 'Start Pro',
      counter: 'Free · 2 of 2 intros used',
    },
    'seats.invite': {
      headline: 'Additional seats are on Pro Max.',
      body: 'Pro is one seat. Pro Max includes five, then $190/month each.',
      bullets: ['5 seats included', 'Shared shortlists', 'SSO'],
      cta: 'See Pro Max',
    },
  }
  return map[id]
}
