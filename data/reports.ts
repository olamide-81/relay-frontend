export type ReportMetric = {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'down' | 'flat'
}

export type ReportFinding = {
  title: string
  body: string
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
  bars?: ReportChartBar[]
  table?: {
    columns: string[]
    rows: string[][]
  }
}

export type DataReport = {
  slug: string
  title: string
  excerpt: string
  category: string
  market: string
  publishedAt: string
  readMinutes: number
  heroStat: ReportMetric
  metrics: ReportMetric[]
  findings: ReportFinding[]
  sections: ReportSection[]
  methodology: string
  sources: string[]
}

export const dataReports: DataReport[] = [
  {
    slug: 'nigeria-payouts-fee-benchmark-2026',
    title: 'Nigeria payouts fee benchmark 2026',
    excerpt:
      'All-in fee bands, settlement SLAs and sandbox-to-production timelines across 18 payout providers covering Nigeria.',
    category: 'Benchmarks',
    market: 'Nigeria',
    publishedAt: '2026-07-14',
    readMinutes: 12,
    heroStat: { label: 'Median all-in fee', value: '0.95%', delta: '−12 bps YoY', tone: 'down' },
    metrics: [
      { label: 'Providers sampled', value: '18' },
      { label: 'Same-day settlement', value: '61%', delta: '+9 pts', tone: 'up' },
      { label: 'Median sandbox', value: '4 days', delta: '−2 days', tone: 'down' },
      { label: 'KE corridor coverage', value: '7', delta: '+2', tone: 'up' },
    ],
    findings: [
      {
        title: 'Fee compression is real — but only on local rails',
        body: 'Providers competing on NIP/local ACH cut all-in fees 8–15 bps. Cross-border corridors (NG→KE, NG→GH) held flat or rose slightly on FX markup.',
      },
      {
        title: 'Sandbox speed now predicts win-rate',
        body: 'Teams that went live under 5 days from sandbox access were 2.4× more likely to shortlist that provider as primary vs. secondary.',
      },
      {
        title: 'Same-day is table stakes for top quartile',
        body: '11 of 18 providers advertise same-day. Only 7 consistently hit it on >90% of volume in builder-reported samples.',
      },
    ],
    sections: [
      {
        heading: 'All-in fee distribution',
        body: 'All-in includes platform fee, rail fee and typical FX markup where applicable. Sampled on ₦500k and ₦2m ticket sizes.',
        chartTitle: 'Share of providers by fee band',
        bars: [
          { label: '< 0.80%', value: 17, display: '17%' },
          { label: '0.80–0.95%', value: 33, display: '33%' },
          { label: '0.95–1.10%', value: 28, display: '28%' },
          { label: '1.10–1.30%', value: 14, display: '14%' },
          { label: '> 1.30%', value: 8, display: '8%' },
        ],
      },
      {
        heading: 'Settlement & sandbox matrix',
        body: 'Builder-reported medians across Q1–Q2 2026 evaluations. Settlement reliability is % of payouts credited same business day.',
        table: {
          columns: ['Provider tier', 'Median fee', 'Same-day hit rate', 'Sandbox → live'],
          rows: [
            ['Top quartile', '0.82%', '94%', '3 days'],
            ['Mid market', '0.97%', '81%', '5 days'],
            ['Long tail', '1.24%', '62%', '9 days'],
          ],
        },
      },
      {
        heading: 'What this means for expansion teams',
        body: 'If you are entering Nigeria for disbursements, optimize for sandbox speed and measured same-day reliability — not brochure fee alone. The cheapest quote in this sample ranked 11th on reliability.',
      },
    ],
    methodology:
      'Compiled from 41 builder evaluation reports, public pricing pages and Relay provider records for Q1–Q2 2026. Fees normalized to all-in % on local NIP payouts unless noted.',
    sources: ['Relay provider index', 'Builder evaluation corpus', 'Public pricing pages'],
  },
  {
    slug: 'egypt-collections-rail-map',
    title: 'Egypt collections rail map',
    excerpt:
      'Which rails actually move volume in Egypt — Meeza, cards, wallets and bank transfer — and which partners cover each path.',
    category: 'Market maps',
    market: 'Egypt',
    publishedAt: '2026-06-28',
    readMinutes: 10,
    heroStat: { label: 'Wallet share of online', value: '34%', delta: '+6 pts YoY', tone: 'up' },
    metrics: [
      { label: 'Rails mapped', value: '7' },
      { label: 'Partners covering ≥3 rails', value: '9' },
      { label: 'Median go-live', value: '6 weeks' },
      { label: 'Meeza acceptance', value: '82%', delta: '+4 pts', tone: 'up' },
    ],
    findings: [
      {
        title: 'Wallets are no longer optional for consumer checkout',
        body: 'In builder cohorts launching B2C in Cairo/Alexandria, omitting wallet rails cut conversion 11–18% vs. card+wallet stacks.',
      },
      {
        title: 'Meeza coverage varies more than marketing suggests',
        body: 'Most partners list Meeza. Only a subset support the full auth/capture/refund path teams need for subscriptions.',
      },
      {
        title: 'Bank transfer still dominates high-ticket B2B',
        body: 'Above EGP 50k average ticket, bank transfer remained primary for 73% of sampled B2B collections flows.',
      },
    ],
    sections: [
      {
        heading: 'Volume mix by rail',
        body: 'Estimated share of online collection volume among Relay-indexed merchant cohorts in Egypt (not national economy totals).',
        chartTitle: 'Estimated volume mix',
        bars: [
          { label: 'Cards', value: 38, display: '38%' },
          { label: 'Wallets', value: 34, display: '34%' },
          { label: 'Meeza', value: 16, display: '16%' },
          { label: 'Bank transfer', value: 9, display: '9%' },
          { label: 'Other', value: 3, display: '3%' },
        ],
      },
      {
        heading: 'Partner coverage heatmap',
        body: 'Count of indexed partners advertising support for each rail. Advertising ≠ production readiness — validate refunds and settlement in sandbox.',
        table: {
          columns: ['Rail', 'Partners listed', 'With refunds', 'Median settlement'],
          rows: [
            ['Cards', '14', '12', 'T+1'],
            ['Wallets', '11', '8', 'T+0–1'],
            ['Meeza', '10', '6', 'T+1'],
            ['Bank transfer', '13', '13', 'T+0–2'],
          ],
        },
      },
    ],
    methodology:
      'Rail mix estimated from anonymized Relay merchant cohort data and partner capability records, H1 2026. Not a Central Bank official series.',
    sources: ['Relay merchant cohorts', 'Partner capability matrix'],
  },
  {
    slug: 'latam-fx-corridor-costs',
    title: 'LatAm FX corridor costs: CO ↔ BR ↔ MX',
    excerpt:
      'True landed cost across major LatAm corridors — spread, fees and settlement lag for treasury and payout use cases.',
    category: 'Corridors',
    market: 'LatAm',
    publishedAt: '2026-06-02',
    readMinutes: 14,
    heroStat: { label: 'CO→BR median spread', value: '1.8%', delta: '+20 bps', tone: 'up' },
    metrics: [
      { label: 'Corridors scored', value: '9' },
      { label: 'Providers compared', value: '22' },
      { label: 'Cheapest CO→MX', value: '1.1%' },
      { label: 'Median settlement', value: 'T+1' },
    ],
    findings: [
      {
        title: 'Spread > fee on every major corridor',
        body: 'Platform fees look competitive; FX markup still drives 60–75% of all-in cost for mid-market tickets.',
      },
      {
        title: 'BR inbound remains the expensive leg',
        body: 'Corridors into Brazil carried the widest spreads in the sample, even when outbound BR legs compressed.',
      },
      {
        title: 'Settlement promises diverge from ops reality',
        body: 'T+0 marketing was common. Measured credit times clustered T+1 for treasury-grade tickets.',
      },
    ],
    sections: [
      {
        heading: 'All-in cost by corridor',
        body: 'Median all-in (spread + fee) on USD 25k equivalent tickets, Q2 2026 sample.',
        chartTitle: 'Median all-in cost',
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
    methodology:
      'Quotes collected via Relay partner APIs and builder RFPs for standardized ticket sizes. Spreads measured vs. mid-market at quote time.',
    sources: ['Relay corridor quotes', 'Builder RFP archive'],
  },
  {
    slug: 'kyc-vendor-time-to-decision',
    title: 'KYC vendor time-to-decision',
    excerpt:
      'How long identity vendors actually take from API key to production decisioning — and where teams lose weeks.',
    category: 'Vendors',
    market: 'Multi-market',
    publishedAt: '2026-05-19',
    readMinutes: 9,
    heroStat: { label: 'Median time to prod', value: '19 days', delta: '−4 days', tone: 'down' },
    metrics: [
      { label: 'Vendors profiled', value: '16' },
      { label: 'Avg docs requested', value: '11' },
      { label: 'Fail rate (first pass)', value: '23%' },
      { label: 'Multi-country kits', value: '6' },
    ],
    findings: [
      {
        title: 'Compliance questionnaires dominate the calendar',
        body: 'Engineering integration averaged 6 days. Security/compliance review averaged 11 — the real bottleneck.',
      },
      {
        title: 'Multi-country kits cut rework',
        body: 'Teams buying a single-country kit then expanding paid a 30–45% time penalty vs. starting multi-country.',
      },
      {
        title: 'First-pass fail is mostly document quality',
        body: 'False rejects clustered on lighting and document type mismatch — not model accuracy claims.',
      },
    ],
    sections: [
      {
        heading: 'Where the days go',
        body: 'Median calendar days from contract signed to first production decision across 16 vendors.',
        chartTitle: 'Days by stage',
        bars: [
          { label: 'Contracting', value: 20, display: '4d' },
          { label: 'Sandbox build', value: 30, display: '6d' },
          { label: 'Compliance review', value: 55, display: '11d' },
          { label: 'Prod cutover', value: 15, display: '3d' },
        ],
      },
      {
        heading: 'Decision quality snapshot',
        body: 'First-pass outcomes on a mixed NG/EG/CO document set in partner sandboxes.',
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
    methodology:
      'Timeline data from 29 Relay builder onboarding journals (2025–2026). Decision quality from controlled sandbox runs, not production traffic.',
    sources: ['Builder onboarding journals', 'Sandbox decision logs'],
  },
  {
    slug: 'portugal-banking-as-a-service-landscape',
    title: 'Portugal banking-as-a-service landscape',
    excerpt:
      'Who can actually issue accounts, IBANs and cards under Portuguese / EU licensing — and what builders should pressure-test.',
    category: 'Licensing',
    market: 'Portugal',
    publishedAt: '2026-04-30',
    readMinutes: 11,
    heroStat: { label: 'BaaS options with PT IBAN', value: '8' },
    metrics: [
      { label: 'EMI / bank partners', value: '12' },
      { label: 'With card issuing', value: '5' },
      { label: 'Median KYB', value: '5 weeks' },
      { label: 'EU passport ready', value: '9' },
    ],
    findings: [
      {
        title: 'IBAN availability is the filter',
        body: 'Many EU BaaS decks mention Portugal. Fewer deliver Portuguese IBANs without a second partner hop.',
      },
      {
        title: 'Card issuing narrows the field fast',
        body: 'Only 5 indexed partners combine local account + card issuing without a multi-vendor stitch.',
      },
      {
        title: 'KYB timelines are the silent killer',
        body: 'Product demos take days. KYB for regulated entities averaged 5 weeks — plan backlog accordingly.',
      },
    ],
    sections: [
      {
        heading: 'Capability stack',
        body: 'Count of indexed partners advertising each capability for Portugal-focused launches.',
        chartTitle: 'Partners by capability',
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
    methodology:
      'Capability matrix from Relay partner records and 2026 PT launch evaluations. Licensing status should be re-verified before contracting.',
    sources: ['Relay partner records', 'PT launch evaluations'],
  },
  {
    slug: 'east-africa-disbursement-reliability',
    title: 'East Africa disbursement reliability',
    excerpt:
      'Measured success rates and retry patterns for mobile-money and bank disbursements across Kenya, Uganda and Tanzania.',
    category: 'Reliability',
    market: 'East Africa',
    publishedAt: '2026-03-21',
    readMinutes: 13,
    heroStat: { label: 'Median success rate', value: '96.4%', delta: '+0.8 pts', tone: 'up' },
    metrics: [
      { label: 'Markets', value: '3' },
      { label: 'Providers', value: '14' },
      { label: 'P95 latency', value: '18s' },
      { label: 'Retry salvage', value: '41%' },
    ],
    findings: [
      {
        title: 'Timeouts ≠ failures',
        body: '41% of timed-out disbursements succeeded on idempotent retry within 60 seconds — design for that.',
      },
      {
        title: 'MNO maintenance windows still bite',
        body: 'Recurring evening dips aligned with known MNO windows. Smart routing around windows beat raw provider switches.',
      },
      {
        title: 'Bank rails lag MM on latency, win on ticket size',
        body: 'Bank disbursements were slower but carried 3–5× higher average tickets with fewer hard declines.',
      },
    ],
    sections: [
      {
        heading: 'Success rate by market',
        body: 'Provider-weighted median success on first attempt, Jan–Mar 2026.',
        chartTitle: 'First-attempt success',
        bars: [
          { label: 'Kenya MM', value: 97, display: '97.1%' },
          { label: 'Kenya bank', value: 95, display: '95.4%' },
          { label: 'Uganda MM', value: 96, display: '96.0%' },
          { label: 'Tanzania MM', value: 95, display: '94.8%' },
        ],
      },
      {
        heading: 'Failure taxonomy',
        body: 'Normalized decline reasons across sampled providers.',
        table: {
          columns: ['Reason', 'Share', 'Recoverable?'],
          rows: [
            ['Timeout / unknown', '29%', 'Often (retry)'],
            ['Insufficient float', '18%', 'Ops'],
            ['Invalid account', '22%', 'No'],
            ['MNO / bank reject', '21%', 'Sometimes'],
            ['Other', '10%', 'Mixed'],
          ],
        },
      },
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

export function formatReportDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
