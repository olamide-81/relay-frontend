export type ProviderCategoryId =
  | 'payouts'
  | 'collections'
  | 'banks'
  | 'open-banking'
  | 'cards'
  | 'kyc'
  | 'fx'
  | 'compliance'

export type DirectoryGroup = {
  id: string
  label: string
}

export type DirectoryCategory = {
  id: ProviderCategoryId
  name: string
  count: number
  description: string
  groupId: string
}

export type FeeBand = {
  from: number
  to: number | null
  fee: string
  cap?: string
}

export type FeeSchedule = {
  rail: string
  currency: string
  direction: 'credit' | 'debit' | 'transfer'
  notes?: string
  bands: FeeBand[]
}

export type License = {
  name: string
  regulator: string
  jurisdiction: string
  number?: string
  status: 'active' | 'pending' | 'exempt'
}

export type Sla = {
  uptimeTarget: string
  measuredUptime: number
  supportResponse: string
  incidentCredit: string
  maintenanceWindow: string
  severity1: string
}

export type Partnering = {
  minVolume?: string
  entityRequirements: string[]
  onboardingTime: string
  sandbox: boolean
  commercial: string
  introRequired: boolean
  exclusivity?: string
}

export type HistoryEvent = {
  year: string
  title: string
  detail: string
}

export type Provider = {
  id: string
  name: string
  website: string
  headquarters: string
  founded: number
  categoryId: ProviderCategoryId
  categoryName: string
  categories: string[]
  regions: string[]
  countries: string[]
  description: string
  longDescription: string
  relayVerified: boolean
  verificationLevel: 'relay_verified' | 'documented' | 'listed'
  uptime: number
  licenses: License[]
  sla: Sla
  feeSchedule: FeeSchedule[]
  capabilities: string[]
  partnering: Partnering
  history: HistoryEvent[]
  settlement: string
  integrationTime: string
  sdks: string[]
  compliance: string[]
  keyClients: string[]
  paidDossier: boolean
}

export const directoryGroups: DirectoryGroup[] = [
  { id: 'payments', label: 'Payments' },
  { id: 'banking', label: 'Banking & accounts' },
  { id: 'cards', label: 'Cards & identity' },
  { id: 'markets', label: 'Markets & risk' },
]

export const directoryCategories: DirectoryCategory[] = [
  { id: 'payouts', name: 'Payouts', count: 42, description: 'Disbursements, mass pay and cross-border payouts', groupId: 'payments' },
  { id: 'collections', name: 'Collections', count: 34, description: 'Payment acceptance, invoicing and receivables', groupId: 'payments' },
  { id: 'banks', name: 'Banks & BaaS', count: 28, description: 'Core banking, sponsored accounts and commercial transfer schedules', groupId: 'banking' },
  { id: 'open-banking', name: 'Open Banking', count: 18, description: 'Account aggregation, AIS and payment initiation', groupId: 'banking' },
  { id: 'cards', name: 'Cards', count: 26, description: 'Issuing, processing and card programme APIs', groupId: 'cards' },
  { id: 'kyc', name: 'KYC & Identity', count: 24, description: 'Verification, onboarding and document checks', groupId: 'cards' },
  { id: 'fx', name: 'FX & Treasury', count: 22, description: 'FX rates, hedging and multi-currency rails', groupId: 'markets' },
  { id: 'compliance', name: 'Compliance & AML', count: 16, description: 'Sanctions, PEP screening and regulatory reporting', groupId: 'markets' },
]

const sla = (
  measured: number,
  extras?: Partial<Sla>
): Sla => ({
  uptimeTarget: '99.90%',
  measuredUptime: measured,
  supportResponse: 'P1 acknowledged in 15 minutes',
  incidentCredit: '10% monthly fee per 0.1% below target, capped at 50%',
  maintenanceWindow: 'Sundays 01:00–03:00 local, 7-day notice',
  severity1: 'Critical payment outage — 24/7 bridge within 15 min',
  ...extras,
})

export const providers: Provider[] = [
  {
    id: 'gtbank',
    name: 'Guaranty Trust Bank',
    website: 'https://www.gtbank.com',
    headquarters: 'Lagos, Nigeria',
    founded: 1990,
    categoryId: 'banks',
    categoryName: 'Banks & BaaS',
    categories: ['Banks & BaaS', 'Payouts'],
    regions: ['Africa'],
    countries: ['NG', 'GH', 'KE', 'RW', 'SL', 'LR', 'CI', 'UK'],
    description: 'Tier-1 Nigerian bank with API collections, NIP transfers and corporate commercial schedules used by fintechs for local settlement.',
    longDescription:
      'GTBank remains one of the most common settlement banks for Nigerian fintechs. Corporate commercials for NIP, instant transfers, debit and credit are negotiated by volume band — not the published retail tariff. Relay tracks the indicative partner schedule used by licensed PSPs and payment service banks. Direct API access typically requires a relationship manager, AML review of your licence, and a six-to-eight week onboarding.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.72,
    licenses: [
      { name: 'Commercial banking licence', regulator: 'Central Bank of Nigeria', jurisdiction: 'Nigeria', status: 'active' },
      { name: 'Deposit-taking licence', regulator: 'Bank of Ghana', jurisdiction: 'Ghana', status: 'active' },
    ],
    sla: sla(99.72, {
      uptimeTarget: '99.50%',
      supportResponse: 'Relationship manager + 24/7 operations desk',
      incidentCredit: 'Negotiated; typically fee waivers for confirmed NIP downtime > 2 hours',
    }),
    feeSchedule: [
      {
        rail: 'NIP instant transfer',
        currency: 'NGN',
        direction: 'transfer',
        notes: 'Indicative corporate commercial, not retail. CBN NIP cap still applies to the customer-facing fee.',
        bands: [
          { from: 1, to: 5000, fee: '₦8–₦10 flat' },
          { from: 5001, to: 50000, fee: '₦15–₦25 flat' },
          { from: 50001, to: null, fee: '₦40–₦50 flat', cap: '₦50 statutory cap' },
        ],
      },
      {
        rail: 'Inward credit (collections)',
        currency: 'NGN',
        direction: 'credit',
        notes: 'Posted to virtual account / corporate current. Volume discounts from ₦2bn monthly throughput.',
        bands: [
          { from: 0, to: null, fee: '₦5–₦15 per inward credit' },
        ],
      },
      {
        rail: 'Direct debit / mandate',
        currency: 'NGN',
        direction: 'debit',
        bands: [
          { from: 0, to: 10000, fee: '₦10 + 0.5% of value' },
          { from: 10001, to: null, fee: '0.5% of value', cap: '₦1,000' },
        ],
      },
    ],
    capabilities: ['NIP', 'Virtual accounts', 'Corporate current', 'FX desk', 'Trade', 'Card acquiring via partners'],
    partnering: {
      minVolume: 'Typically ₦500m monthly throughput for API commercials',
      entityRequirements: [
        'CBN-licensed PSP, MMO, or payment service bank — or a regulated foreign EMI with a local sponsor',
        'Board-approved AML/CFT programme and NDPR compliance',
        'Two directors with BVN, CAC documents, and beneficial ownership disclosure',
      ],
      onboardingTime: '6–8 weeks after complete KYC pack',
      sandbox: false,
      commercial: 'Relationship-managed. Fee schedule is a starting point; treasury and NIP are priced together.',
      introRequired: true,
      exclusivity: 'No exclusivity required. Multi-bank settlement is expected.',
    },
    history: [
      { year: '1990', title: 'Founded', detail: 'Incorporated in Lagos as a commercial bank.' },
      { year: '2007', title: 'Listed', detail: 'Dual-listed; became a regional group across West Africa.' },
      { year: '2021', title: 'HoldCo restructure', detail: 'GTCO holding company; banking subsidiary remains the settlement entity fintechs contract with.' },
      { year: '2025', title: 'API banking push', detail: 'Expanded corporate NIP and virtual-account APIs used by several licensed PSPs.' },
    ],
    settlement: 'T+0 NIP / T+1 corporate',
    integrationTime: '6–8 weeks',
    sdks: ['REST', 'ISO 8583 via switch'],
    compliance: ['CBN', 'NDPR', 'PCI-DSS (acquiring partners)'],
    keyClients: ['Licensed Nigerian PSPs', 'Payroll platforms', 'Remittance operators'],
    paidDossier: true,
  },
  {
    id: 'access-bank',
    name: 'Access Bank',
    website: 'https://www.accessbankplc.com',
    headquarters: 'Lagos, Nigeria',
    founded: 1988,
    categoryId: 'banks',
    categoryName: 'Banks & BaaS',
    categories: ['Banks & BaaS', 'Payouts'],
    regions: ['Africa'],
    countries: ['NG', 'GH', 'KE', 'ZA', 'ZM', 'RW', 'UK'],
    description: 'Pan-African commercial bank. Widely used for bulk NIP, salary, and agency banking settlement.',
    longDescription:
      'Access is often the second or third bank on a Nigerian fintech’s settlement stack. Corporate NIP commercials sit close to the CBN cap; the negotiation is usually about volume rebates, failed-transaction handling, and weekend processing windows. Introductions through Relay typically go to the digital corporate coverage team rather than a branch RM.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.61,
    licenses: [
      { name: 'International commercial banking licence', regulator: 'Central Bank of Nigeria', jurisdiction: 'Nigeria', status: 'active' },
    ],
    sla: sla(99.61, { uptimeTarget: '99.50%' }),
    feeSchedule: [
      {
        rail: 'NIP instant transfer',
        currency: 'NGN',
        direction: 'transfer',
        bands: [
          { from: 1, to: 5000, fee: '₦10 flat' },
          { from: 5001, to: 50000, fee: '₦25 flat' },
          { from: 50001, to: null, fee: '₦50 flat', cap: '₦50' },
        ],
      },
      {
        rail: 'Bulk salary credit',
        currency: 'NGN',
        direction: 'credit',
        bands: [
          { from: 0, to: null, fee: '₦8–₦20 per credit, volume-tiered' },
        ],
      },
      {
        rail: 'Card debit (POS/web via switch)',
        currency: 'NGN',
        direction: 'debit',
        notes: 'Acquiring is usually via Interswitch / Unified Payments; bank takes interchange share.',
        bands: [
          { from: 0, to: null, fee: '0.5%–1.5% + switch fee', cap: '₦2,000 typical web cap' },
        ],
      },
    ],
    capabilities: ['NIP', 'Bulk payouts', 'Agency banking', 'Trade FX', 'Africa-to-UK correspondent'],
    partnering: {
      minVolume: '₦1bn monthly preferred for dedicated API',
      entityRequirements: ['Local operating entity', 'CBN licence or sponsor bank letter', 'UBO pack'],
      onboardingTime: '8–12 weeks',
      sandbox: false,
      commercial: 'Treasury + payments packaged. Weekend NIP may carry a surcharge.',
      introRequired: true,
    },
    history: [
      { year: '1988', title: 'Founded', detail: 'Started as a commercial bank in Nigeria.' },
      { year: '2019', title: 'Diamond Bank merger', detail: 'Became one of the largest retail footprints in Nigeria.' },
      { year: '2024', title: 'Pan-African rails', detail: 'Expanded instant corridors into East and Southern Africa.' },
    ],
    settlement: 'T+0 / T+1',
    integrationTime: '8–12 weeks',
    sdks: ['REST (corporate)', 'Host-to-host'],
    compliance: ['CBN', 'NDPR', 'FATF correspondent standards'],
    keyClients: ['Payroll', 'Government collections', 'Remittance'],
    paidDossier: true,
  },
  {
    id: 'paystack',
    name: 'Paystack',
    website: 'https://paystack.com',
    headquarters: 'Lagos, Nigeria',
    founded: 2015,
    categoryId: 'collections',
    categoryName: 'Collections',
    categories: ['Payment Gateway', 'Subscriptions', 'Payouts'],
    regions: ['Africa'],
    countries: ['NG', 'GH', 'ZA', 'KE'],
    description: 'Stripe-owned African gateway. Cards, bank, USSD, and transfer collections with a well-documented API.',
    longDescription:
      'Paystack is the default collection stack for many English-speaking African startups. Commercials are published for cards; bank transfer and dedicated virtual accounts are priced separately and move with volume. Stripe ownership improved uptime and dispute tooling. Relay verifies PCI, local acquiring relationships, and settlement currencies independently of marketing pages.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.95,
    licenses: [
      { name: 'Payments service provider', regulator: 'Central Bank of Nigeria', jurisdiction: 'Nigeria', status: 'active' },
      { name: 'Payments service provider', regulator: 'Bank of Ghana', jurisdiction: 'Ghana', status: 'active' },
    ],
    sla: sla(99.95, { uptimeTarget: '99.95%', incidentCredit: 'Service credits per published status policy' }),
    feeSchedule: [
      {
        rail: 'Local cards (NG)',
        currency: 'NGN',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '1.5% + ₦100', cap: '₦2,000' }],
      },
      {
        rail: 'International cards',
        currency: 'NGN',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '3.9% + ₦100' }],
      },
      {
        rail: 'Bank transfer / dedicated NUBAN',
        currency: 'NGN',
        direction: 'credit',
        bands: [{ from: 0, to: null, fee: '1% typical, volume down to 0.5%' }],
      },
    ],
    capabilities: ['Cards', 'Bank transfer', 'USSD', 'Apple Pay', 'Subscriptions', 'Transfers API'],
    partnering: {
      entityRequirements: ['Registered company', 'Directors’ IDs', 'Business description and expected volumes'],
      onboardingTime: '1–5 days for standard; 2–4 weeks for higher-risk MCC',
      sandbox: true,
      commercial: 'Self-serve until ~₦50m/month, then a named AM and custom MDR.',
      introRequired: false,
    },
    history: [
      { year: '2015', title: 'Founded', detail: 'Started in Yaba, Lagos.' },
      { year: '2020', title: 'Acquired by Stripe', detail: 'Became Stripe’s African acquiring layer.' },
      { year: '2023', title: 'Kenya live', detail: 'Expanded beyond NG/GH/ZA.' },
    ],
    settlement: 'T+1 typical',
    integrationTime: '1–5 days',
    sdks: ['REST', 'Node', 'PHP', 'Python', 'Go', 'Mobile'],
    compliance: ['PCI-DSS', 'CBN PSP', 'NDPR'],
    keyClients: ['Commerce', 'SaaS', 'NGOs'],
    paidDossier: true,
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    website: 'https://flutterwave.com',
    headquarters: 'San Francisco / Lagos',
    founded: 2016,
    categoryId: 'payouts',
    categoryName: 'Payouts',
    categories: ['Payment Gateway', 'Payouts', 'FX'],
    regions: ['Africa', 'Global'],
    countries: ['NG', 'KE', 'GH', 'ZA', 'UG', 'TZ', 'US', 'GB'],
    description: 'Pan-African payments and payouts with checkout, transfers, and cross-border corridors.',
    longDescription:
      'Flutterwave is used when a team needs one contract across several African markets plus a US/EU receiving entity. Payout commercials are corridor-specific: mobile money, bank, and wallet each have different FX + rail fees. Relay dossiers flag licence perimeter (which entity you actually contract) and historically material incidents.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.55,
    licenses: [
      { name: 'PSP', regulator: 'Central Bank of Nigeria', jurisdiction: 'Nigeria', status: 'active' },
      { name: 'MSB', regulator: 'FinCEN', jurisdiction: 'United States', status: 'active' },
    ],
    sla: sla(99.55, { uptimeTarget: '99.90%' }),
    feeSchedule: [
      {
        rail: 'Local collections (NG cards)',
        currency: 'NGN',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '1.4% local / ~3.8% international' }],
      },
      {
        rail: 'Bank payout NGN',
        currency: 'NGN',
        direction: 'transfer',
        bands: [
          { from: 1, to: 5000, fee: '₦10–₦25' },
          { from: 5001, to: 50000, fee: '₦25–₦50' },
          { from: 50001, to: null, fee: '₦50 + FX if cross-border' },
        ],
      },
    ],
    capabilities: ['Checkout', 'Transfers', 'Barter', 'Store', 'Cross-border USD receiving'],
    partnering: {
      entityRequirements: ['KYB pack', 'Use-case review', 'Sanctioned-country screening'],
      onboardingTime: '3–10 days standard',
      sandbox: true,
      commercial: 'Published MDR plus custom payout + FX for volume.',
      introRequired: false,
    },
    history: [
      { year: '2016', title: 'Founded', detail: 'Started as a pan-African gateway.' },
      { year: '2022', title: 'Valuation peak', detail: 'Became one of Africa’s most valuable fintechs.' },
      { year: '2024', title: 'Licence cleanup', detail: 'Re-centred operating entities after regulatory reviews in several markets.' },
    ],
    settlement: 'T+1 / T+2 by corridor',
    integrationTime: '3–10 days',
    sdks: ['REST', 'Inline JS', 'Mobile'],
    compliance: ['PCI-DSS', 'CBN', 'FinCEN MSB'],
    keyClients: ['Global merchants collecting in Africa', 'Remittance'],
    paidDossier: true,
  },
  {
    id: 'mono',
    name: 'Mono',
    website: 'https://mono.co',
    headquarters: 'Lagos, Nigeria',
    founded: 2020,
    categoryId: 'open-banking',
    categoryName: 'Open Banking',
    categories: ['Open Finance'],
    regions: ['Africa'],
    countries: ['NG', 'KE', 'GH'],
    description: 'Open banking and data APIs for Africa — account linking, statements, and payments initiation.',
    longDescription:
      'Mono is the most common AIS layer for Nigerian lending and personal-finance products. Coverage quality varies by bank; Relay tracks live connection rates, not just “number of institutions.” Payments initiation is a separate commercial from data.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.6,
    licenses: [
      { name: 'Operating as a data processor / AIS provider', regulator: 'NDPR + bank partnerships', jurisdiction: 'Nigeria', status: 'active' },
    ],
    sla: sla(99.6),
    feeSchedule: [
      {
        rail: 'Account linked (AIS)',
        currency: 'USD',
        direction: 'credit',
        notes: 'Priced per successful connection / refresh, not per API call.',
        bands: [{ from: 0, to: null, fee: '$0.20–$0.80 per connection, volume-tiered' }],
      },
    ],
    capabilities: ['AIS', 'Statements', 'Income insights', 'Direct debit (where live)', 'Sandbox'],
    partnering: {
      entityRequirements: ['Product use-case', 'Data protection addendum', 'Local entity preferred'],
      onboardingTime: '2–7 days',
      sandbox: true,
      commercial: 'Usage-based. Payments initiation quoted separately.',
      introRequired: false,
    },
    history: [
      { year: '2020', title: 'Founded', detail: 'Open banking for Nigeria.' },
      { year: '2022', title: 'Series A', detail: 'Expanded coverage and Kenya/Ghana.' },
    ],
    settlement: 'n/a (data) / T+1 (payments)',
    integrationTime: '3–7 days',
    sdks: ['REST', 'JS widget', 'Mobile'],
    compliance: ['NDPR', 'ISO 27001'],
    keyClients: ['Lenders', 'Wealth', 'Payroll'],
    paidDossier: true,
  },
  {
    id: 'smile-identity',
    name: 'Smile Identity',
    website: 'https://smileidentity.com',
    headquarters: 'Nairobi, Kenya',
    founded: 2014,
    categoryId: 'kyc',
    categoryName: 'KYC & Identity',
    categories: ['KYC & Identity'],
    regions: ['Africa'],
    countries: ['NG', 'KE', 'GH', 'ZA', 'UG', 'TZ'],
    description: 'African identity verification — government ID, selfie, and AML screening built for local documents.',
    longDescription:
      'Smile is the default KYC vendor when your users hold African government IDs. Accuracy on NIN, BVN-adjacent flows, and Kenya ID is materially better than global vendors in Relay’s sampled pass-through rates. Per-check pricing drops sharply above 50k monthly verifications.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.8,
    licenses: [
      { name: 'Data processor agreements with ID authorities', regulator: 'NIMC / NIA partners', jurisdiction: 'Nigeria / Kenya', status: 'active' },
    ],
    sla: sla(99.8, { supportResponse: 'P1 in 15 min; ID authority outages excluded' }),
    feeSchedule: [
      {
        rail: 'ID + selfie',
        currency: 'USD',
        direction: 'debit',
        bands: [
          { from: 0, to: 10000, fee: '$0.40–$0.80 per check' },
          { from: 10001, to: 50000, fee: '$0.25–$0.45' },
          { from: 50001, to: null, fee: '$0.12–$0.28' },
        ],
      },
    ],
    capabilities: ['Gov ID', 'Liveness', 'AML/PEP', 'Document capture', 'Business KYB'],
    partnering: {
      entityRequirements: ['DPA', 'Use-case (fraud vs onboarding)', 'No sharing of raw biometrics to unapproved subprocessors'],
      onboardingTime: '1–5 days',
      sandbox: true,
      commercial: 'Per successful verification. Failed/authority-down retries often unbilled.',
      introRequired: false,
    },
    history: [
      { year: '2014', title: 'Founded', detail: 'Nairobi — built for African IDs first.' },
      { year: '2021', title: 'Series B', detail: 'Expanded coverage across SSA.' },
    ],
    settlement: 'n/a',
    integrationTime: '2–5 days',
    sdks: ['REST', 'Android', 'iOS', 'Web'],
    compliance: ['ISO 27001', 'GDPR', 'NDPR'],
    keyClients: ['Neobanks', 'Lenders', 'Crypto on-ramps'],
    paidDossier: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    website: 'https://stripe.com',
    headquarters: 'South San Francisco, USA',
    founded: 2010,
    categoryId: 'collections',
    categoryName: 'Collections',
    categories: ['Payment Gateway', 'Billing', 'Issuing', 'Treasury'],
    regions: ['North America', 'Europe', 'Global'],
    countries: ['US', 'GB', 'EU', 'CA', 'AU', 'SG', 'JP', 'MX', 'BR'],
    description: 'Global payments, billing, issuing and treasury APIs. Best-in-class docs; coverage still US/EU-weighted.',
    longDescription:
      'Stripe is the default for US/EU collection. Treasury and Issuing require a higher underwriting bar. For African or LATAM-first products, Stripe is usually a second processor, not the local rail. Relay tracks which country entities you can actually activate — published “global” lists overstate live acquiring.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.99,
    licenses: [
      { name: 'Money transmitter (state-by-state)', regulator: 'US state MTLs + FinCEN', jurisdiction: 'United States', status: 'active' },
      { name: 'EMI', regulator: 'CBI / FCA (via Stripe entities)', jurisdiction: 'EEA / UK', status: 'active' },
    ],
    sla: sla(99.99, { uptimeTarget: '99.99%', incidentCredit: 'Published uptime credits' }),
    feeSchedule: [
      {
        rail: 'US cards',
        currency: 'USD',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '2.9% + $0.30 (IC+ available)' }],
      },
      {
        rail: 'ACH debit',
        currency: 'USD',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '0.8%', cap: '$5' }],
      },
      {
        rail: 'ACH credit / payout',
        currency: 'USD',
        direction: 'credit',
        bands: [{ from: 0, to: null, fee: '0.5% typical via Treasury/Connect' }],
      },
    ],
    capabilities: ['Payments', 'Billing', 'Connect', 'Issuing', 'Treasury', 'Identity', 'Radar'],
    partnering: {
      entityRequirements: ['Incorporated in a supported country', 'Use-case within AUP', 'Enhanced KYC for Treasury/Issuing'],
      onboardingTime: 'Same day payments; 2–6 weeks Issuing/Treasury',
      sandbox: true,
      commercial: 'Self-serve + IC+ at volume. Banking products are invite/underwrite.',
      introRequired: false,
    },
    history: [
      { year: '2010', title: 'Founded', detail: 'Collison brothers — developer-first payments.' },
      { year: '2021', title: 'Treasury & Issuing scale', detail: 'BaaS-adjacent products via partner banks.' },
    ],
    settlement: 'T+2 typical US',
    integrationTime: '1–3 days',
    sdks: ['REST', 'All major languages'],
    compliance: ['PCI-DSS L1', 'SOC 2', 'GDPR'],
    keyClients: ['SaaS', 'Marketplaces', 'Platforms'],
    paidDossier: true,
  },
  {
    id: 'column',
    name: 'Column',
    website: 'https://column.com',
    headquarters: 'San Francisco, USA',
    founded: 2021,
    categoryId: 'banks',
    categoryName: 'Banks & BaaS',
    categories: ['Banks & BaaS', 'ACH', 'Wires'],
    regions: ['North America'],
    countries: ['US'],
    description: 'National bank with a developer API for ACH, wires, checks and accounts — a true bank, not a middleware.',
    longDescription:
      'Column is a nationally chartered bank. You contract with the bank, not a BaaS middleware. That changes failure modes, FDIC, and how FedACH returns work. Commercials for ACH credit vs debit and domestic wires are published to partners as basis-point plus item fees. Introductions are required; they do not run a public self-serve signup for programme banking.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.94,
    licenses: [
      { name: 'National bank charter', regulator: 'OCC', jurisdiction: 'United States', number: 'OCC charter', status: 'active' },
      { name: 'Member', regulator: 'Federal Reserve', jurisdiction: 'United States', status: 'active' },
      { name: 'FDIC insured', regulator: 'FDIC', jurisdiction: 'United States', status: 'active' },
    ],
    sla: sla(99.94, { uptimeTarget: '99.90%', supportResponse: 'Named engineer + bank ops, P1 15 min' }),
    feeSchedule: [
      {
        rail: 'ACH credit (payout)',
        currency: 'USD',
        direction: 'credit',
        bands: [
          { from: 0, to: 100000, fee: '$0.25–$0.50 per item' },
          { from: 100001, to: null, fee: '$0.08–$0.25 per item + 0–8 bps' },
        ],
      },
      {
        rail: 'ACH debit (pull)',
        currency: 'USD',
        direction: 'debit',
        notes: 'Returns (R01/R10) billed separately. Unauthorized returns can reprice the programme.',
        bands: [{ from: 0, to: null, fee: '$0.30–$0.60 per item + return fees' }],
      },
      {
        rail: 'Domestic wire',
        currency: 'USD',
        direction: 'transfer',
        bands: [{ from: 0, to: null, fee: '$5–$15 outbound / $0–$8 inbound' }],
      },
    ],
    capabilities: ['Demand deposit accounts', 'ACH', 'Wires', 'Checks', 'Book transfers', 'FedNow where live'],
    partnering: {
      minVolume: 'Serious programme — expect a credit memo and projected ACH volume',
      entityRequirements: [
        'US entity or qualifying foreign with US programme partner',
        'Bank-grade BSA/AML, OFAC, and consumer compliance if retail',
        'SOC 2 or equivalent security review',
      ],
      onboardingTime: '8–16 weeks',
      sandbox: true,
      commercial: 'Bank programme agreement. Not a software ToS.',
      introRequired: true,
    },
    history: [
      { year: '2021', title: 'Founded / charter', detail: 'Built as an API-first national bank.' },
      { year: '2023', title: 'Programme scale', detail: 'Became a common alternative after several BaaS sponsor failures.' },
    ],
    settlement: 'ACH window / T+0 book',
    integrationTime: '4–8 weeks engineering + bank review',
    sdks: ['REST'],
    compliance: ['OCC', 'FDIC', 'BSA/AML', 'Reg E / Reg CC as applicable'],
    keyClients: ['Payroll', 'Treasury', 'Lending disbursements'],
    paidDossier: true,
  },
  {
    id: 'ebanx',
    name: 'EBANX',
    website: 'https://ebanx.com',
    headquarters: 'Curitiba, Brazil',
    founded: 2012,
    categoryId: 'collections',
    categoryName: 'Collections',
    categories: ['Payment Gateway'],
    regions: ['LATAM'],
    countries: ['BR', 'MX', 'CO', 'AR', 'CL', 'PE'],
    description: 'LATAM local acquiring specialist — Pix, boleto, SPEI, cash and cards for cross-border merchants.',
    longDescription:
      'EBANX is how many global merchants actually get paid in Brazil and Spanish LATAM. Pix commercials are the number that matters: MDR + FX + IOF. Relay separates local-entity vs cross-border contracting because tax and settlement timing change the all-in cost by 100+ bps.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.8,
    licenses: [
      { name: 'Pagamento / acquiring partnerships', regulator: 'Banco Central do Brasil', jurisdiction: 'Brazil', status: 'active' },
    ],
    sla: sla(99.8),
    feeSchedule: [
      {
        rail: 'Pix',
        currency: 'BRL',
        direction: 'credit',
        bands: [{ from: 0, to: null, fee: '0.8%–1.5% cross-border all-in typical; local much lower' }],
      },
      {
        rail: 'Cards (BR)',
        currency: 'BRL',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '3.5%–4.5% + instalment markup' }],
      },
    ],
    capabilities: ['Pix', 'Boleto', 'Cards', 'SPEI', 'Cash', 'Payouts'],
    partnering: {
      entityRequirements: ['Global merchant KYB', 'MCC review', 'Local tax setup if in-country'],
      onboardingTime: '2–6 weeks',
      sandbox: true,
      commercial: 'Custom. Pix vs cards priced separately.',
      introRequired: true,
    },
    history: [
      { year: '2012', title: 'Founded', detail: 'Curitiba — cross-border into Brazil.' },
      { year: '2020', title: 'Pix era', detail: 'Shifted mix heavily into instant rails.' },
    ],
    settlement: 'T+1 Pix / T+30 cards typical',
    integrationTime: '2–4 weeks',
    sdks: ['REST'],
    compliance: ['PCI-DSS', 'BCB', 'LGPD'],
    keyClients: ['Global digital goods', 'Travel', 'SaaS'],
    paidDossier: true,
  },
  {
    id: 'xendit',
    name: 'Xendit',
    website: 'https://xendit.co',
    headquarters: 'Jakarta, Indonesia',
    founded: 2015,
    categoryId: 'collections',
    categoryName: 'Collections',
    categories: ['Payment Gateway', 'Payouts'],
    regions: ['Southeast Asia'],
    countries: ['ID', 'PH', 'MY', 'TH', 'VN'],
    description: 'SEA payments — VA, e-wallets, QRIS, cards and disbursements across Indonesia and the Philippines.',
    longDescription:
      'Xendit is the workhorse for Indonesia and the Philippines. Virtual account and QRIS commercials are volume-tiered; e-wallet MDRs are set by the wallet (OVO, DANA, GCash) plus Xendit’s take. Disbursements have a per-item + failed-retry schedule that matters at payroll scale.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.7,
    licenses: [
      { name: 'Payment gateway / switching partnerships', regulator: 'Bank Indonesia / BSP', jurisdiction: 'Indonesia / Philippines', status: 'active' },
    ],
    sla: sla(99.7),
    feeSchedule: [
      {
        rail: 'QRIS / VA (ID)',
        currency: 'IDR',
        direction: 'credit',
        bands: [{ from: 0, to: null, fee: '0.7%–1.5% typical MDR' }],
      },
      {
        rail: 'Disbursement bank ID',
        currency: 'IDR',
        direction: 'transfer',
        bands: [{ from: 0, to: null, fee: 'IDR 2,500–5,000 per item' }],
      },
    ],
    capabilities: ['VA', 'QRIS', 'eWallets', 'Cards', 'Disbursements', 'XenPlatform'],
    partnering: {
      entityRequirements: ['Local or regional entity', 'KYB', 'Use-case'],
      onboardingTime: '3–10 days',
      sandbox: true,
      commercial: 'Self-serve then AM. Platform pricing for XenPlatform.',
      introRequired: false,
    },
    history: [
      { year: '2015', title: 'Founded', detail: 'Jakarta payments API.' },
      { year: '2022', title: 'Regional expansion', detail: 'Philippines, Malaysia, Thailand, Vietnam.' },
    ],
    settlement: 'T+1 / T+2',
    integrationTime: '2–7 days',
    sdks: ['REST', 'PHP', 'Node'],
    compliance: ['PCI-DSS', 'BI', 'BSP'],
    keyClients: ['Marketplaces', 'Billers', 'Payroll'],
    paidDossier: true,
  },
  {
    id: 'adyen',
    name: 'Adyen',
    website: 'https://adyen.com',
    headquarters: 'Amsterdam, Netherlands',
    founded: 2006,
    categoryId: 'collections',
    categoryName: 'Collections',
    categories: ['Payment Gateway'],
    regions: ['Europe', 'Global'],
    countries: ['NL', 'GB', 'US', 'EU', 'AU', 'SG', 'BR'],
    description: 'Enterprise acquiring platform — unified commerce, platforms, and issuing for large volume.',
    longDescription:
      'Adyen is an enterprise conversation: IC++, interchange++ plus a gateway fee, plus local acquiring licences. Not a startup self-serve product. Intros are required unless you already have a named enterprise AE. Uptime and unified settlement are the reasons teams switch from a patchwork of PSPs.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.99,
    licenses: [
      { name: 'Acquiring / EMI entities', regulator: 'DNB / FCA / others', jurisdiction: 'EEA / UK / global', status: 'active' },
    ],
    sla: sla(99.99, { uptimeTarget: '99.99%' }),
    feeSchedule: [
      {
        rail: 'Cards IC++',
        currency: 'EUR',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: 'Interchange + scheme + 0.10%–0.60% Adyen' }],
      },
    ],
    capabilities: ['Unified commerce', 'Platforms', 'Issuing', 'Local acquiring', 'In-person'],
    partnering: {
      minVolume: 'Typically €10m+ GMV or a strategic platform',
      entityRequirements: ['Enterprise KYB', 'PCI', 'Financial statements'],
      onboardingTime: '6–12 weeks',
      sandbox: true,
      commercial: 'IC++ contract. Minimums apply.',
      introRequired: true,
    },
    history: [
      { year: '2006', title: 'Founded', detail: 'Amsterdam acquiring.' },
      { year: '2018', title: 'IPO', detail: 'Euronext Amsterdam.' },
    ],
    settlement: 'T+1 / T+2 configurable',
    integrationTime: '4–8 weeks',
    sdks: ['REST', 'Drop-in'],
    compliance: ['PCI-DSS L1', 'PSD2', 'SOC 2'],
    keyClients: ['Enterprise retail', 'Platforms', 'Travel'],
    paidDossier: true,
  },
  {
    id: 'plaid',
    name: 'Plaid',
    website: 'https://plaid.com',
    headquarters: 'San Francisco, USA',
    founded: 2013,
    categoryId: 'open-banking',
    categoryName: 'Open Banking',
    categories: ['Open Finance'],
    regions: ['North America', 'Europe'],
    countries: ['US', 'CA', 'GB', 'EU'],
    description: 'Account linking and payment initiation across US, Canada, UK and Europe.',
    longDescription:
      'Plaid is table-stakes for US fintech. Auth, Identity, Transactions, and Signal are separate SKUs. Bank connectivity quality is the dossier, not the logo wall. Payment initiation (US) is still institution-dependent.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.9,
    licenses: [
      { name: 'AISP / PISP (UK/EU entities)', regulator: 'FCA / NCAs', jurisdiction: 'UK / EEA', status: 'active' },
    ],
    sla: sla(99.9),
    feeSchedule: [
      {
        rail: 'Auth + Identity',
        currency: 'USD',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '$0.50–$1.50 per item, product-stacked' }],
      },
    ],
    capabilities: ['Auth', 'Transactions', 'Identity', 'Assets', 'Signal', 'Pay by bank'],
    partnering: {
      entityRequirements: ['Use-case review', 'Security questionnaire', 'Production request'],
      onboardingTime: '1–3 weeks to production',
      sandbox: true,
      commercial: 'Per-product. Volume commits unlock discounts.',
      introRequired: false,
    },
    history: [
      { year: '2013', title: 'Founded', detail: 'Bank linking for US apps.' },
      { year: '2021', title: 'Visa deal unwound', detail: 'Remained independent after DOJ challenge.' },
    ],
    settlement: 'n/a / T+0–T+1 pay-by-bank',
    integrationTime: '1–2 weeks',
    sdks: ['REST', 'Link iOS/Android/Web'],
    compliance: ['SOC 2', 'ISO 27001', 'PSD2'],
    keyClients: ['Neobanks', 'Investing', 'Lending'],
    paidDossier: true,
  },
  {
    id: 'nium',
    name: 'Nium',
    website: 'https://nium.com',
    headquarters: 'Singapore',
    founded: 2014,
    categoryId: 'payouts',
    categoryName: 'Payouts',
    categories: ['Payouts', 'FX & Currency', 'Cards'],
    regions: ['Global', 'Asia-Pacific'],
    countries: ['SG', 'GB', 'EU', 'US', 'AU', 'HK', 'IN'],
    description: 'Cross-border payouts, accounts and cards with a dense APAC licence stack.',
    longDescription:
      'Nium is what you look at when payouts must land in 100+ countries from one contract. The dossier is licences + corridor FX + which entity you onboard to (Singapore vs EU vs US). Cards and payouts are different commercials.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.85,
    licenses: [
      { name: 'Major payment institution', regulator: 'MAS', jurisdiction: 'Singapore', status: 'active' },
      { name: 'EMI', regulator: 'Lithuania / FCA network', jurisdiction: 'EEA / UK', status: 'active' },
    ],
    sla: sla(99.85),
    feeSchedule: [
      {
        rail: 'Local payout (APAC bank)',
        currency: 'USD',
        direction: 'transfer',
        bands: [{ from: 0, to: null, fee: '$1–$8 per payout + 30–80 bps FX on exotic corridors' }],
      },
    ],
    capabilities: ['Payouts', 'VA', 'Issuing', 'FX', 'Travel cards'],
    partnering: {
      minVolume: 'Meaningful cross-border volume or a platform use-case',
      entityRequirements: ['KYB', 'Licence of the customer if regulated', 'Corridor questionnaire'],
      onboardingTime: '4–10 weeks',
      sandbox: true,
      commercial: 'Custom. FX spread is where margin lives.',
      introRequired: true,
    },
    history: [
      { year: '2014', title: 'Founded as Instarem', detail: 'Singapore remittance, then platform.' },
      { year: '2021', title: 'Rebrand Nium', detail: 'Infrastructure brand for payouts and cards.' },
    ],
    settlement: 'T+0 to T+2 by corridor',
    integrationTime: '3–6 weeks',
    sdks: ['REST'],
    compliance: ['MAS MPI', 'PCI-DSS', 'FCA'],
    keyClients: ['Platforms', 'Travel', 'Marketplaces'],
    paidDossier: true,
  },
  {
    id: 'marqeta',
    name: 'Marqeta',
    website: 'https://marqeta.com',
    headquarters: 'Oakland, USA',
    founded: 2010,
    categoryId: 'cards',
    categoryName: 'Cards',
    categories: ['Card Issuance'],
    regions: ['Global'],
    countries: ['US', 'GB', 'EU', 'AU', 'CA'],
    description: 'Modern card issuing and JIT funding. Needs a bin sponsor + programme manager in most regions.',
    longDescription:
      'Marqeta is the processor, not always the BIN sponsor. Relay dossiers spell out who holds the BIN in US vs UK vs EU, PCI scope, and JIT vs prefunded. Commercials are a mix of per-card, per-auth, and interchange share.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.95,
    licenses: [
      { name: 'Programme via partner banks / EMIs', regulator: 'OCC / FCA / others via sponsors', jurisdiction: 'US / UK / EU', status: 'active' },
    ],
    sla: sla(99.95, { uptimeTarget: '99.95%' }),
    feeSchedule: [
      {
        rail: 'Authorization',
        currency: 'USD',
        direction: 'debit',
        bands: [{ from: 0, to: null, fee: '$0.01–$0.04 per auth + interchange share to programme' }],
      },
    ],
    capabilities: ['JIT', 'Virtual cards', 'Physical', 'Spend controls', '3DS'],
    partnering: {
      entityRequirements: ['BIN sponsor or Marqeta-introduced bank', 'PCI', 'Card programme policy'],
      onboardingTime: '8–16 weeks',
      sandbox: true,
      commercial: 'Processor + sponsor. Two contracts is common.',
      introRequired: true,
    },
    history: [
      { year: '2010', title: 'Founded', detail: 'Issuing API.' },
      { year: '2021', title: 'IPO', detail: 'Public issuer-processor.' },
    ],
    settlement: 'Scheme / sponsor',
    integrationTime: '6–12 weeks',
    sdks: ['REST'],
    compliance: ['PCI-DSS', 'Network rules'],
    keyClients: ['Expense', 'Neobanks', 'On-demand'],
    paidDossier: true,
  },
  {
    id: 'airwallex',
    name: 'Airwallex',
    website: 'https://airwallex.com',
    headquarters: 'Melbourne, Australia',
    founded: 2015,
    categoryId: 'fx',
    categoryName: 'FX & Treasury',
    categories: ['FX & Currency', 'Payouts', 'Accounts'],
    regions: ['Global', 'Asia-Pacific'],
    countries: ['AU', 'GB', 'EU', 'US', 'SG', 'HK', 'CN'],
    description: 'Multi-currency accounts, FX and payouts for globally collecting businesses.',
    longDescription:
      'Airwallex competes with Wise and Nium on multi-currency collections. The dossier is which wallets are real local accounts vs SWIFT, and the FX spread at your monthly volume. China corridors need extra operational care.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.88,
    licenses: [
      { name: 'AFSL / various EMI & MTL', regulator: 'ASIC / FCA / others', jurisdiction: 'AU / UK / global', status: 'active' },
    ],
    sla: sla(99.88),
    feeSchedule: [
      {
        rail: 'FX major pairs',
        currency: 'USD',
        direction: 'transfer',
        bands: [
          { from: 0, to: 50000, fee: '40–70 bps over mid' },
          { from: 50001, to: 1000000, fee: '20–40 bps' },
          { from: 1000001, to: null, fee: '10–25 bps' },
        ],
      },
    ],
    capabilities: ['Wallets', 'FX', 'Payouts', 'Cards', 'Yield (where live)'],
    partnering: {
      entityRequirements: ['Business KYB', 'Source of funds', 'Supported country of incorporation'],
      onboardingTime: '3–10 days',
      sandbox: true,
      commercial: 'FX spread + payout item fees. Platform pricing available.',
      introRequired: false,
    },
    history: [
      { year: '2015', title: 'Founded', detail: 'Melbourne — China/APAC FX roots.' },
      { year: '2022', title: 'Global scale', detail: 'US and EU licences expanded the wallet set.' },
    ],
    settlement: 'T+0 / T+1',
    integrationTime: '1–3 weeks',
    sdks: ['REST'],
    compliance: ['ASIC', 'FCA', 'PCI'],
    keyClients: ['Exporters', 'Platforms', 'Agencies'],
    paidDossier: true,
  },
  {
    id: 'sumsub',
    name: 'Sumsub',
    website: 'https://sumsub.com',
    headquarters: 'London, UK',
    founded: 2015,
    categoryId: 'compliance',
    categoryName: 'Compliance & AML',
    categories: ['KYC & Identity', 'Compliance & AML'],
    regions: ['Global'],
    countries: ['GB', 'EU', 'US', 'SG', 'AE'],
    description: 'End-to-end verification and AML — KYC, KYB, travel rule and ongoing monitoring.',
    longDescription:
      'Sumsub is chosen when you want one vendor for KYC + KYB + AML rather than stitching Smile + ComplyAdvantage. Pass-through rates and manual-review SLAs are the numbers that matter. Pricing is per applicant plus add-on databases.',
    relayVerified: true,
    verificationLevel: 'relay_verified',
    uptime: 99.92,
    licenses: [
      { name: 'Data processor / ISO stack', regulator: 'ICO / GDPR', jurisdiction: 'UK / EEA', status: 'active' },
    ],
    sla: sla(99.92, { supportResponse: 'P1 15 min; manual review SLA 4h median' }),
    feeSchedule: [
      {
        rail: 'Applicant (KYC)',
        currency: 'USD',
        direction: 'debit',
        bands: [
          { from: 0, to: 5000, fee: '$1.20–$2.40 per applicant' },
          { from: 5001, to: null, fee: '$0.60–$1.40' },
        ],
      },
    ],
    capabilities: ['KYC', 'KYB', 'AML screening', 'Travel rule', 'Transaction monitoring'],
    partnering: {
      entityRequirements: ['DPA', 'Retention policy', 'Restricted-country review'],
      onboardingTime: '3–7 days',
      sandbox: true,
      commercial: 'Modular. AML database adds per screen.',
      introRequired: false,
    },
    history: [
      { year: '2015', title: 'Founded', detail: 'Verification platform.' },
      { year: '2023', title: 'Crypto + travel rule', detail: 'Became a default stack for VASPs.' },
    ],
    settlement: 'n/a',
    integrationTime: '3–7 days',
    sdks: ['REST', 'WebSDK', 'Mobile'],
    compliance: ['GDPR', 'ISO 27001', 'SOC 2'],
    keyClients: ['Crypto', 'Neobanks', 'Marketplaces'],
    paidDossier: true,
  },
]

export const totalProviderCount = directoryCategories.reduce((sum, c) => sum + c.count, 0)

export function getCategoryById(id: string) {
  return directoryCategories.find((c) => c.id === id)
}

export function getProviderById(id: string) {
  return providers.find((p) => p.id === id)
}

export function getProvidersByCategory(categoryId: string) {
  return providers.filter((p) => p.categoryId === categoryId)
}

export function getCategoriesByGroup(groupId: string) {
  return directoryCategories.filter((c) => c.groupId === groupId)
}

export function getProviderInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function searchProviders(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return providers
  return providers.filter((p) => {
    const hay = [
      p.name,
      p.description,
      p.categoryName,
      ...p.regions,
      ...p.countries,
      ...p.capabilities,
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}
