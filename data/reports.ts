export type ReportMetric = {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'down' | 'flat' | 'alert'
}

export type ReportFinding = {
  title: string
  body: string
  dataSupport?: string
  whyItMatters?: string
}

export type ReportChartBar = {
  label: string
  value: number
  display: string
}

export type ReportSection = {
  heading: string
  body: string
  chartTitle?: string
  caption?: string
  bars?: ReportChartBar[]
  table?: {
    columns: string[]
    rows: string[][]
  }
}

export type ProviderLead = {
  metric: string
  leader: string
  value: string
  note?: string
}

export type DataReport = {
  slug: string
  title: string
  /** Short one-liner for cards and list items */
  excerpt: string
  category: string
  market: string
  publishedAt: string
  updatedAt?: string
  readMinutes: number
  heroStat: ReportMetric
  metrics: ReportMetric[]
  overview: string
  background?: string
  findings: ReportFinding[]
  sections: ReportSection[]
  marketContext?: string[]
  providerLandscape?: ProviderLead[]
  implications: string[]
  methodology: string
  sources: string[]
  /** Optional Discover market filter anchor */
  discoverMarket?: string
}

export const REPORT_CATEGORIES = [
  'Benchmarks',
  'Market maps',
  'Corridors',
  'Vendors',
  'Licensing',
  'Reliability',
] as const

/**
 * Order matters: index [0] is featured on the home page;
 * hub “Latest” also sorts by publishedAt.
 * Keep LatAm / Europe / multi-market first — not a single region mono-narrative.
 */
export const dataReports: DataReport[] = [
  {
    slug: 'latam-fx-corridor-costs',
    title: 'LatAm FX corridor costs: CO ↔ BR ↔ MX',
    excerpt:
      'True landed cost across major LatAm corridors — spread, fees and settlement lag for treasury and payout use cases.',
    category: 'Corridors',
    market: 'LatAm',
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    readMinutes: 14,
    discoverMarket: 'LatAm',
    heroStat: {
      label: 'CO→BR median spread',
      value: '1.8%',
      delta: '+20 bps',
      tone: 'alert',
    },
    metrics: [
      { label: 'Corridors scored', value: '9' },
      { label: 'Providers compared', value: '22' },
      { label: 'Cheapest CO→MX', value: '1.1%' },
      { label: 'Median settlement', value: 'T+1' },
    ],
    overview:
      'True landed cost across nine LatAm corridors linking Colombia, Brazil and Mexico. Platform fees look competitive; FX markup still drives 60–75% of all-in cost. CO→BR median all-in sits at 1.8% — up 20 bps on the prior read.',
    findings: [
      {
        title: 'Spread dominates fee on every major corridor',
        body: 'Platform fees look competitive; FX markup still drives 60–75% of all-in cost for mid-market tickets.',
        dataSupport: '68% average contribution from FX markup',
      },
      {
        title: 'BR inbound remains the expensive leg',
        body: 'Corridors into Brazil carried the widest spreads in the sample, even when outbound BR legs compressed.',
        dataSupport: 'MX→BR median all-in 1.9%',
      },
      {
        title: 'Settlement promises diverge from ops reality',
        body: 'T+0 marketing was common. Measured credit times clustered T+1 for treasury-grade tickets.',
        dataSupport: 'Median measured credit T+1',
      },
    ],
    sections: [
      {
        heading: 'All-in cost by corridor',
        body: 'Median all-in (spread + fee) on USD 25k equivalent tickets, Q2 2026 sample.',
        chartTitle: 'Median all-in cost',
        caption: 'Bar height maps to relative cost; labels show absolute median all-in %.',
        bars: [
          { label: 'CO → MX', value: 55, display: '1.1%' },
          { label: 'MX → CO', value: 65, display: '1.3%' },
          { label: 'CO → BR', value: 90, display: '1.8%' },
          { label: 'BR → CO', value: 80, display: '1.6%' },
          { label: 'MX → BR', value: 95, display: '1.9%' },
          { label: 'BR → MX', value: 85, display: '1.7%' },
        ],
      },
      {
        heading: 'Provider spread vs fee split',
        body: 'Average contribution to all-in cost across the top 10 providers by corridor volume in Relay evaluations.',
        table: {
          columns: ['Component', 'Share of all-in', 'YoY change'],
          rows: [
            ['FX spread / markup', '68%', '+4 pts'],
            ['Platform fee', '19%', '−3 pts'],
            ['Rail / partner fee', '13%', '−1 pt'],
          ],
        },
      },
    ],
    marketContext: [
      'LatAm corridors remain FX-heavy. Negotiating platform basis points without measuring mid-market spread leaves most of the landed cost on the table.',
    ],
    providerLandscape: [
      {
        metric: 'Cheapest CO→MX',
        leader: 'Regional FX specialists',
        value: '1.1%',
        note: 'Median all-in',
      },
      {
        metric: 'Widest inbound BR',
        leader: 'Cross-border multi-leg',
        value: '1.9%',
        note: 'MX→BR sample',
      },
    ],
    implications: [
      'Model landed cost as spread + fee; treat platform fee as secondary in RFP scoring.',
      'Separate CO–MX economics from any corridor into Brazil — inbound BR pricing behaves differently.',
      'Validate settlement clocks on treasury ticket sizes; ignore T+0 brochure claims.',
    ],
    methodology:
      'Quotes collected via Relay partner APIs and builder RFPs for standardized ticket sizes. Spreads measured vs. mid-market at quote time.',
    sources: ['Relay corridor quotes', 'Builder RFP archive'],
  },
  {
    slug: 'colombia-payouts-fee-benchmark-2026',
    title: 'Colombia payouts fee benchmark 2026',
    excerpt:
      'All-in fee bands, settlement SLAs and sandbox-to-production timelines across 16 payout providers covering Colombia.',
    category: 'Benchmarks',
    market: 'Colombia',
    publishedAt: '2026-07-10',
    updatedAt: '2026-07-10',
    readMinutes: 12,
    discoverMarket: 'Colombia',
    heroStat: {
      label: 'Median all-in fee',
      value: '0.88%',
      delta: '−15 bps YoY',
      tone: 'down',
    },
    metrics: [
      { label: 'Providers sampled', value: '16', delta: '+2 YoY', tone: 'up' },
      { label: 'Same-day settlement', value: '72%', delta: '+11 pts', tone: 'up' },
      { label: 'Median sandbox', value: '5 days', delta: '−1 day', tone: 'down' },
      { label: 'PSE-ready stacks', value: '11', delta: '+3', tone: 'up' },
    ],
    overview:
      'This benchmark covers all-in costs, settlement reliability and sandbox-to-live timelines for 16 payout providers active in Colombia. The sample spans Bre-B/local ACH, PSE-linked paths and FX into Mexico and Brazil. Median all-in on local bank rails sits at 0.88% — 15 bps below the 2025 mid-year read.',
    background:
      'Builder evaluations through Q2 2026 showed faster fee compression on local rails than brochure pages suggested, driven by instant-payment mandates and denser competition among mid-market PSPs. Tickets were normalized at COP 2M and COP 10M for like-for-like RFP scoring.',
    findings: [
      {
        title: 'Fee compression is real — mostly on local instant rails',
        body: 'Providers competing on local bank credit cut all-in fees 10–18 bps versus the prior sample. Cross-border CO→MX and CO→BR held flat or rose slightly on FX markup. The cheapest brochure fee in the set ranked mid-pack on measured same-day reliability.',
        dataSupport: '11 of 16 providers reduced local all-in fee bands by ≥10 bps',
        whyItMatters:
          'Comparing list prices without corridor and reliability context over-weights local winners for multi-market rolls.',
      },
      {
        title: 'Sandbox speed now predicts win-rate',
        body: 'Teams that went live under 6 days from sandbox access were 2.1× more likely to shortlist that provider as primary rather than secondary. Engineering hours tracked more closely to documentation quality than to feature lists.',
        dataSupport: '2.1× higher primary shortlist rate under 6-day sandbox path',
        whyItMatters:
          'Weight sandbox SLA and docs quality equal to fee when scoring RFP responses.',
      },
      {
        title: 'Same-day is table stakes for top quartile',
        body: 'Thirteen of sixteen providers advertise same-day. Only nine consistently hit it on more than 90% of volume in builder-reported samples.',
        dataSupport: '9 of 16 cleared >90% same-day hit rate',
        whyItMatters:
          'Contract SLAs should reference measured hit rates, not marketing “same-day available” language.',
      },
    ],
    sections: [
      {
        heading: 'All-in fee distribution',
        body: 'All-in includes platform fee, rail fee and typical FX markup where applicable. Sampled on COP 2M and COP 10M local payouts.',
        chartTitle: 'Share of providers by fee band',
        caption:
          'Distribution across 16 providers. Median lands in the 0.75–0.90% band; long tail above 1.20% is mostly corridor-heavy stacks.',
        bars: [
          { label: '< 0.75%', value: 19, display: '19%' },
          { label: '0.75–0.90%', value: 31, display: '31%' },
          { label: '0.90–1.05%', value: 25, display: '25%' },
          { label: '1.05–1.20%', value: 16, display: '16%' },
          { label: '> 1.20%', value: 9, display: '9%' },
        ],
      },
      {
        heading: 'Settlement & sandbox matrix',
        body: 'Builder-reported medians across Q1–Q2 2026 evaluations. Settlement reliability is percentage of payouts credited same business day.',
        table: {
          columns: ['Provider tier', 'Median fee', 'Same-day hit rate', 'Sandbox → live'],
          rows: [
            ['Top quartile', '0.74%', '95%', '3 days'],
            ['Mid market', '0.91%', '84%', '5 days'],
            ['Long tail', '1.18%', '66%', '10 days'],
          ],
        },
      },
    ],
    marketContext: [
      'Colombia’s payout landscape is shifting around mandatory instant rails and denser PSE-adjacent collection infrastructure. Local fee competition is fiercer than FX-corridor pricing — teams rolling out to MX or BR need separate models for each leg.',
      'Builder pressure since late 2025 has pushed same-day reliability into RFP scoring more often than list price alone.',
    ],
    providerLandscape: [
      {
        metric: 'Lowest all-in fee (local)',
        leader: 'Top-quartile local stack',
        value: '0.71%',
        note: 'Measured, not brochure',
      },
      {
        metric: 'Fastest sandbox → live',
        leader: 'API-first mid-market',
        value: '2 days',
        note: 'Documented sandbox + live path',
      },
      {
        metric: 'Same-day reliability',
        leader: 'Bank-rail specialists',
        value: '95%+',
        note: 'Builder-reported sample',
      },
      {
        metric: 'PSE / instant depth',
        leader: 'Multi-rail local PSPs',
        value: '11 providers',
        note: 'Live path in sample',
      },
    ],
    implications: [
      'Score providers on measured same-day hit rate and sandbox path before brochure fee.',
      'Budget FX markup separately for CO→MX / CO→BR — local compression does not transfer.',
      'Require written SLAs on same-day reliability if payout latency is product-critical.',
    ],
    methodology:
      'Compiled from 38 builder evaluation reports, public pricing pages and Relay provider records for Q1–Q2 2026. Fees normalized to all-in % on local bank rails unless noted. Settlement hit rates reflect builder-reported samples, not provider marketing claims.',
    sources: [
      'Relay provider index',
      'Builder evaluation corpus',
      'Public pricing pages',
    ],
  },
  {
    slug: 'portugal-banking-as-a-service-landscape',
    title: 'Portugal banking-as-a-service landscape',
    excerpt:
      'Who can actually issue accounts, IBANs and cards under Portuguese / EU licensing — and what builders should pressure-test.',
    category: 'Market maps',
    market: 'Portugal',
    publishedAt: '2026-06-22',
    updatedAt: '2026-06-22',
    readMinutes: 11,
    discoverMarket: 'Portugal',
    heroStat: { label: 'BaaS options with PT IBAN', value: '8' },
    metrics: [
      { label: 'EMI / bank partners', value: '12' },
      { label: 'With card issuing', value: '5' },
      { label: 'Median KYB', value: '5 weeks' },
      { label: 'EU passport ready', value: '9' },
    ],
    overview:
      'Eight indexed partners can deliver Portuguese IBANs without a second hop. Card issuing collapses the field to five. KYB averages five weeks for regulated entities — the silent path on every launch plan.',
    findings: [
      {
        title: 'IBAN availability is the filter',
        body: 'Many EU BaaS decks mention Portugal. Fewer deliver Portuguese IBANs without a second partner hop.',
        dataSupport: '8 of 12 account partners with PT IBAN',
      },
      {
        title: 'Card issuing narrows the field fast',
        body: 'Only five indexed partners combine local account and card issuing without a multi-vendor stitch.',
        dataSupport: '5 full account + card stacks',
      },
      {
        title: 'KYB timelines are the silent killer',
        body: 'Product demos take days. KYB for regulated entities averaged five weeks — plan backlog accordingly.',
        dataSupport: 'Median KYB 5 weeks',
      },
    ],
    sections: [
      {
        heading: 'Capability stack',
        body: 'Count of indexed partners advertising each capability for Portugal-focused launches.',
        chartTitle: 'Partners by capability',
        caption: 'PT IBAN and card issuing are the real shortlist compressors.',
        bars: [
          { label: 'Accounts', value: 85, display: '12' },
          { label: 'PT IBAN', value: 55, display: '8' },
          { label: 'SEPA', value: 90, display: '13' },
          { label: 'Cards', value: 35, display: '5' },
          { label: 'FX wallets', value: 40, display: '6' },
        ],
      },
      {
        heading: 'Diligence checklist',
        body: 'Questions that separated viable partners from slideware in recent Relay evaluations.',
        table: {
          columns: ['Check', 'Why it matters', 'Fail pattern'],
          rows: [
            ['IBAN country', 'Local payouts & trust', 'EU IBAN only'],
            ['Card BIN sponsor', 'Issuing path clarity', 'TBD partner'],
            ['KYB SLA in writing', 'Launch planning', 'Best effort'],
            ['Sandbox data realism', 'Integration quality', 'Static mocks'],
          ],
        },
      },
    ],
    marketContext: [
      'Portugal sits inside EU passporting, but local IBAN issuance and card BIN sponsorship still separate marketable BaaS options from decks that list “EU coverage.”',
    ],
    implications: [
      'Filter the shortlist on PT IBAN first, card issuing second.',
      'Put a written KYB SLA in every term sheet.',
      'Re-verify licensing status before contracting — capability matrices drift.',
    ],
    methodology:
      'Capability matrix from Relay partner records and 2026 PT launch evaluations. Licensing status should be re-verified before contracting.',
    sources: ['Relay partner records', 'PT launch evaluations'],
  },
  {
    slug: 'mexico-collections-rail-map',
    title: 'Mexico collections rail map',
    excerpt:
      'Which rails actually move volume in Mexico — SPEI, CoDi, cards and wallets — and which partners cover each path.',
    category: 'Market maps',
    market: 'Mexico',
    publishedAt: '2026-06-08',
    updatedAt: '2026-06-08',
    readMinutes: 10,
    discoverMarket: 'Mexico',
    heroStat: {
      label: 'SPEI share of online',
      value: '41%',
      delta: '+5 pts YoY',
      tone: 'up',
    },
    metrics: [
      { label: 'Rails mapped', value: '6' },
      { label: 'Partners covering ≥3 rails', value: '10' },
      { label: 'Median go-live', value: '5 weeks' },
      { label: 'Card acceptance depth', value: '88%', delta: '+3 pts', tone: 'up' },
    ],
    overview:
      'A rail-by-rail map of how online collections actually clear in Mexico. SPEI and related open-banking paths now carry 41% of Relay-indexed merchant online volume — up 5 points year over year — with cards still primary at 36% and wallets growing into the gap.',
    background:
      'Teams often over-index on card-only stacks for B2C launches in CDMX and Monterrey. This map aligns partner capability claims with volume mix and refund path readiness after recent instant-rail adoption.',
    findings: [
      {
        title: 'SPEI is mandatory infrastructure for serious checkout',
        body: 'In builder cohorts launching B2C nationwide, omitting real-time bank transfer cut conversion 9–14% versus card-plus-SPEI stacks on mid-ticket purchases.',
        dataSupport: '9–14% conversion gap vs. card+SPEI',
      },
      {
        title: 'CoDi coverage is thinner than SPEI claims imply',
        body: 'Most partners list open banking. A smaller set supports the full pay-by-bank UX builders expect in production.',
        dataSupport: '7 of 12 SPEI-listed partners support full pay-by-bank UX',
      },
      {
        title: 'Cards still lead high-urgency consumer checkout',
        body: 'Below MXN 800 average ticket, cards remained primary for 58% of sampled B2C collection flows.',
        dataSupport: '58% B2C primary on cards below MXN 800',
      },
    ],
    sections: [
      {
        heading: 'Volume mix by rail',
        body: 'Estimated share of online collection volume among Relay-indexed merchant cohorts in Mexico (not national economy totals).',
        chartTitle: 'Estimated volume mix',
        caption: 'Cohort mix H1 2026 — SPEI now edges cards on share.',
        bars: [
          { label: 'SPEI / bank', value: 41, display: '41%' },
          { label: 'Cards', value: 36, display: '36%' },
          { label: 'Wallets', value: 15, display: '15%' },
          { label: 'Cash networks', value: 6, display: '6%' },
          { label: 'Other', value: 2, display: '2%' },
        ],
      },
      {
        heading: 'Partner coverage heatmap',
        body: 'Count of indexed partners advertising support for each rail. Advertising is not production readiness — validate refunds and settlement in sandbox.',
        table: {
          columns: ['Rail', 'Partners listed', 'With refunds', 'Median settlement'],
          rows: [
            ['Cards', '15', '13', 'T+1'],
            ['SPEI', '12', '10', 'T+0'],
            ['Wallets', '9', '7', 'T+0–1'],
            ['Cash networks', '6', '5', 'T+1–2'],
          ],
        },
      },
    ],
    marketContext: [
      'Mexico’s collections stack mixes SPEI instant bank transfer, cards, wallets and cash-adjacent networks. Launch scope should lead with rails that match ticket size and segment — not a universal all-rails mandate.',
    ],
    providerLandscape: [
      {
        metric: 'Most rails covered',
        leader: 'Multi-rail aggregators',
        value: '≥3 rails',
        note: '10 partners in sample',
      },
      {
        metric: 'SPEI depth',
        leader: 'Open-banking specialists',
        value: '41% volume share',
        note: 'Online cohort mix',
      },
    ],
    implications: [
      'Ship card + SPEI day one for B2C; treat pay-by-bank UX completeness as a diligence item.',
      'Keep card UX primary for low-ticket consumer paths rather than forcing bank transfer alone.',
      'Measure partner refund completeness in sandbox before production cutover.',
    ],
    methodology:
      'Rail mix estimated from anonymized Relay merchant cohort data and partner capability records, H1 2026. Not a Banxico official series.',
    sources: ['Relay merchant cohorts', 'Partner capability matrix'],
  },
  {
    slug: 'kyc-vendor-time-to-decision',
    title: 'KYC vendor time-to-decision',
    excerpt:
      'How long identity vendors actually take from API key to production decisioning — and where teams lose weeks.',
    category: 'Vendors',
    market: 'Multi-market',
    publishedAt: '2026-05-19',
    updatedAt: '2026-05-19',
    readMinutes: 9,
    discoverMarket: '',
    heroStat: {
      label: 'Median time to prod',
      value: '19 days',
      delta: '−4 days',
      tone: 'down',
    },
    metrics: [
      { label: 'Vendors profiled', value: '16' },
      { label: 'Avg docs requested', value: '11' },
      { label: 'Fail rate (first pass)', value: '23%' },
      { label: 'Multi-country kits', value: '6' },
    ],
    overview:
      'Median calendar time from contract signed to first production identity decision across 16 vendors is 19 days — four days faster than the prior cohort, still dominated by compliance review rather than engineering.',
    findings: [
      {
        title: 'Compliance questionnaires dominate the calendar',
        body: 'Engineering integration averaged 6 days. Security and compliance review averaged 11 — the real bottleneck.',
        dataSupport: '11 of 19 median days in compliance review',
      },
      {
        title: 'Multi-country kits cut rework',
        body: 'Teams buying a single-country kit then expanding paid a 30–45% time penalty versus starting multi-country.',
        dataSupport: '30–45% expansion time penalty after single-country start',
      },
      {
        title: 'First-pass fail is mostly document quality',
        body: 'False rejects clustered on lighting and document type mismatch — not model accuracy claims.',
        dataSupport: '23% first-pass reject rate',
      },
    ],
    sections: [
      {
        heading: 'Where the days go',
        body: 'Median calendar days from contract signed to first production decision across 16 vendors.',
        chartTitle: 'Days by stage',
        caption: 'Compliance review remains the longest stage in every quartile.',
        bars: [
          { label: 'Contracting', value: 20, display: '4d' },
          { label: 'Sandbox build', value: 30, display: '6d' },
          { label: 'Compliance review', value: 55, display: '11d' },
          { label: 'Prod cutover', value: 15, display: '3d' },
        ],
      },
      {
        heading: 'Decision quality snapshot',
        body: 'First-pass outcomes on a mixed CO/BR/MX/PT document set in partner sandboxes.',
        table: {
          columns: ['Outcome', 'Share', 'Notes'],
          rows: [
            ['Auto-approve', '61%', 'Clear document + liveness'],
            ['Manual review', '16%', 'Edge cases / older IDs'],
            ['Reject', '23%', 'Mostly capture quality'],
          ],
        },
      },
    ],
    implications: [
      'Start compliance questionnaires the same week as technical kickoff — not after integration.',
      'Prefer multi-country kits if a second market is already on the roadmap.',
      'Invest in capture UX; document quality drives most first-pass fails.',
    ],
    methodology:
      'Timeline data from 29 Relay builder onboarding journals (2025–2026). Decision quality from controlled sandbox runs, not production traffic.',
    sources: ['Builder onboarding journals', 'Sandbox decision logs'],
  },
  {
    slug: 'gulf-disbursement-reliability',
    title: 'Gulf disbursement reliability: AE · SA · QA',
    excerpt:
      'Measured success rates and retry patterns for bank and wallet disbursements across the UAE, Saudi Arabia and Qatar.',
    category: 'Reliability',
    market: 'Gulf',
    publishedAt: '2026-04-14',
    updatedAt: '2026-04-14',
    readMinutes: 13,
    discoverMarket: 'Gulf',
    heroStat: {
      label: 'Median success rate',
      value: '97.1%',
      delta: '+0.6 pts',
      tone: 'up',
    },
    metrics: [
      { label: 'Markets', value: '3' },
      { label: 'Providers', value: '12' },
      { label: 'P95 latency', value: '14s' },
      { label: 'Retry salvage', value: '38%' },
    ],
    overview:
      'Measured first-attempt success and retry salvage across bank and wallet disbursements in the UAE, Saudi Arabia and Qatar. Median success sits at 97.1%. Thirty-eight percent of timeouts recovered on idempotent retry within 60 seconds.',
    findings: [
      {
        title: 'Timeouts are not failures',
        body: 'Thirty-eight percent of timed-out disbursements succeeded on idempotent retry within 60 seconds — design for that before swapping providers.',
        dataSupport: '38% retry salvage within 60s',
      },
      {
        title: 'Local instant windows still create evening dips',
        body: 'Recurring late-day dips aligned with bank batch windows more than wallet providers. Smart routing around windows beat raw provider switches.',
      },
      {
        title: 'Bank rails win on ticket size; wallets on latency',
        body: 'Bank disbursements were slightly slower but carried 2–4× higher average tickets with fewer hard declines on corporate payroll-like flows.',
      },
    ],
    sections: [
      {
        heading: 'Success rate by market',
        body: 'Provider-weighted median success on first attempt, Jan–Mar 2026.',
        chartTitle: 'First-attempt success',
        caption: 'UAE bank rails lead the sample; wallet paths trail slightly on first-attempt success.',
        bars: [
          { label: 'UAE bank', value: 98, display: '97.8%' },
          { label: 'UAE wallet', value: 96, display: '96.2%' },
          { label: 'SA bank', value: 97, display: '96.9%' },
          { label: 'QA bank', value: 96, display: '96.1%' },
        ],
      },
      {
        heading: 'Failure taxonomy',
        body: 'Normalized decline reasons across sampled providers.',
        table: {
          columns: ['Reason', 'Share', 'Recoverable?'],
          rows: [
            ['Timeout / unknown', '27%', 'Often (retry)'],
            ['Insufficient float', '16%', 'Ops'],
            ['Invalid account', '24%', 'No'],
            ['Bank / scheme reject', '22%', 'Sometimes'],
            ['Other', '11%', 'Mixed'],
          ],
        },
      },
    ],
    implications: [
      'Build idempotent retry into disbursement clients before switching providers on timeout noise.',
      'Route around known bank batch windows rather than only swapping vendors.',
      'Use bank rails when ticket size justifies latency trade-offs; wallets for consumer-grade speed.',
    ],
    methodology:
      'Success and latency from anonymized production-like sandbox and limited production mirrors shared by builders. Not a guarantee of live performance.',
    sources: ['Builder reliability shares', 'Relay provider SLAs'],
  },
]

export function getReport(slug: string): DataReport | undefined {
  return dataReports.find((r) => r.slug === slug)
}

export function getAllReportSlugs(): string[] {
  return dataReports.map((r) => r.slug)
}

export function getReportCategories(): string[] {
  const present = new Set(dataReports.map((r) => r.category))
  const ordered = REPORT_CATEGORIES.filter((c) => present.has(c))
  const extras = [...present].filter(
    (c) => !REPORT_CATEGORIES.includes(c as (typeof REPORT_CATEGORIES)[number])
  )
  return [...ordered, ...extras]
}

export function formatReportDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
