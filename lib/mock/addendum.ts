export const dossierFacts = [
  { k: 'Legal name', v: 'Nordbridge Payments AB' },
  { k: 'Headquarters', v: 'Stockholm, Sweden' },
  { k: 'Offices', v: 'Stockholm, London, São Paulo' },
  { k: 'Category', v: 'Payouts · FX' },
  { k: 'Primary licence', v: 'EMI (direct)' },
  { k: 'Settlement model', v: 'Prefunded + on-demand' },
  { k: 'Company stage', v: 'Series B' },
  { k: 'Client segment', v: 'Marketplaces, PSPs, gig platforms' },
  { k: 'Volume processed', v: '$14.2B in 2025' },
  { k: 'First listed on Relay', v: 'March 2024' },
]

export const dossierCorridors = [
  { name: 'EU → Brazil (BRL)', fee: '0.18%', fx: '+18 bps', settle: '4 min', delta: '−24 bps', good: true },
  { name: 'EU → Mexico (MXN)', fee: '0.21%', fx: '+22 bps', settle: '6 min', delta: '−19 bps', good: true },
  { name: 'UK → Nigeria (NGN)', fee: '0.34%', fx: '+41 bps', settle: '18 min', delta: '−7 bps', good: true },
  { name: 'Intra-EU (EUR)', fee: '0.09%', fx: '—', settle: 'instant', delta: '−11 bps', good: true },
  { name: 'EU → India (INR)', fee: '0.46%', fx: '+29 bps', settle: '1 hr', delta: '+6 bps', good: false },
  { name: 'EU → Philippines (PHP)', fee: '0.52%', fx: '+34 bps', settle: '2 hr', delta: '+9 bps', good: false },
]

export const historyBars = [42, 48, 44, 51, 47, 55, 52, 61, 57, 64, 60, 68, 63, 71, 66, 74, 70, 78]

export const coverageRows = [
  { region: 'Europe (EEA + UK)', n: '14 corridors', pct: 92, tone: 'lime' as const },
  { region: 'LATAM', n: '9 corridors', pct: 74, tone: 'lime' as const },
  { region: 'West Africa', n: '6 corridors', pct: 48, tone: 'grey' as const },
  { region: 'APAC', n: '2 corridors', pct: 14, tone: 'amber' as const },
]

export const reliabilityRows = [
  { v: '99.4%', label: 'payout success rate, 90 days' },
  { v: '99.97%', label: 'API uptime, 12 months' },
  { v: '4 min', label: 'median settlement' },
  { v: '0.31%', label: 'returns / failed payouts' },
]

export const complianceRows = [
  { name: 'Electronic Money Institution', regulator: 'Finansinspektionen', held: 'Direct, 2018', status: 'Active', ok: true },
  { name: 'Money Transmitter Licence ×18', regulator: 'US state regulators', held: 'Via subsidiary', status: 'Active', ok: true },
  { name: 'Safeguarding audit', regulator: 'External (Big 4)', held: 'Q2 2026', status: 'Passed', ok: true },
  { name: 'PCI DSS Level 1', regulator: 'PCI SSC', held: '2025', status: 'Certified', ok: true },
  { name: 'APAC payments licence', regulator: 'MAS / other', held: '—', status: 'Not held', ok: false },
]

export const integrationRows = [
  { k: 'API', v: 'REST + webhooks', lime: false },
  { k: 'SDKs', v: 'Node, Python, Go', lime: false },
  { k: 'Sandbox', v: 'Self-serve, instant', lime: true },
  { k: 'Typical go-live', v: '3 weeks', lime: false },
  { k: 'Batch / file upload', v: 'SFTP, CSV', lime: false },
  { k: 'Reconciliation', v: 'T+0 statements', lime: false },
]

export const peopleRows = [
  { name: 'Elin Marklund', role: 'CEO, co-founder', prior: 'Previously Klarna, Trustly' },
  { name: 'Tobias Ferrer', role: 'CTO, co-founder', prior: 'Previously Adyen' },
  { name: 'Renata Alves', role: 'GM, LATAM', prior: 'Previously EBANX' },
  { name: 'Joseph Adeyemi', role: 'Head of Compliance', prior: 'Previously Flutterwave' },
]

export const fundingRows = [
  { round: 'Series B', amount: '$52M', date: 'Nov 2024', lead: 'Index Ventures · existing investors' },
  { round: 'Series A', amount: '$21M', date: 'Jun 2022', lead: 'Northzone' },
  { round: 'Seed', amount: '$8M', date: 'Mar 2020', lead: 'Creandum' },
  { round: 'Pre-seed', amount: '$3M', date: 'Sep 2017', lead: 'Angel syndicate' },
]

export const mentionRows = [
  { kind: 'PRICING', title: 'Cut EU→LATAM pricing by 6bps ahead of Q4 volumes', when: '2H AGO', tone: 'lime' as const },
  { kind: 'LISTING', title: 'Added three West Africa corridors (NGN, GHS, XOF)', when: '11:05', tone: 'muted' as const },
  { kind: 'REGULATION', title: 'Named in EU instant-payout readiness review', when: '24 AUG', tone: 'amber' as const },
]

export const glanceRows = [
  { text: 'Cheapest qualified provider on your mix', tone: 'lime' as const },
  { text: 'Licensed direct — no sponsor risk', tone: 'lime' as const },
  { text: 'Instant settlement on 24 of 31 corridors', tone: 'lime' as const },
  { text: 'No APAC licence — gap if you expand east', tone: 'amber' as const },
  { text: 'Min. volume $250k/month', tone: 'grey' as const },
]

export const dossierLongCopy =
  'Stockholm-headquartered payout rail covering 31 corridors across the EEA, UK, LATAM and West Africa. Direct EMI licence, no intermediary sponsor. Founded 2016, 180–220 staff, $84M raised.'

export const reportToc = [
  { n: '01', name: 'The headline number', id: 'headline', locked: false },
  { n: '02', name: 'Where compression is', id: 'compression', locked: false },
  { n: '03', name: 'Corridor detail', id: 'corridor', locked: false },
  { n: '04', name: 'Your corridor mix', id: 'mix', locked: true },
  { n: '05', name: 'Provider exposure', id: 'exposure', locked: true },
  { n: '06', name: 'Data appendix', id: 'appendix', locked: true },
]

export const reportStats = [
  { v: '$35T', label: 'moved globally every day, 2025' },
  { v: '10.4%', label: 'handled on a fintech rail, up from 7.1%' },
  { v: '−24 bps', label: 'median payout fee, EU→LATAM, 18 months' },
]

export const reportChart = [
  { h: 34, label: 'Q3·24' },
  { h: 38, label: 'Q4·24' },
  { h: 44, label: 'Q1·25' },
  { h: 41, label: 'Q2·25' },
  { h: 52, label: 'Q3·25' },
  { h: 58, label: 'Q4·25' },
  { h: 67, label: 'Q1·26' },
  { h: 74, label: 'Q2·26' },
]

export const lockedLines = ['96%', '88%', '94%', '72%', '91%', '84%', '61%']

export const reportProviderSlugs = ['nordbridge', 'kestrel', 'avenir', 'meridian', 'palma'] as const

export const keyNumbers = [
  { v: '24 / 38', label: 'corridors where median fee fell', tone: 'lime' as const },
  { v: '5', label: 'corridors that rose, all after a licensing change', tone: 'amber' as const },
  { v: '2.3×', label: 'payout volume growth vs card acceptance', tone: 'plain' as const },
  { v: '9', label: 'new licensed entrants tracked this quarter', tone: 'plain' as const },
]

export const planCards = [
  {
    id: 'free' as const,
    name: 'Explorer',
    price: '$0',
    per: 'forever',
    badge: '',
    desc: 'Prove the data is real. Browse every provider and read the market maps.',
    features: [
      'All 210 providers in the directory',
      'One corridor price per provider',
      'One market map per month',
      '1 shortlist, up to 5 providers',
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
    badge: 'MOST FINTECHS',
    desc: 'Everything you need to run a partner decision end to end, on your own weighting.',
    features: [
      'Full corridor pricing for every provider',
      '24 months of pricing history',
      'Unlimited compare, up to 4 at a time',
      'Unlimited shortlists and intro requests',
      'Every market map plus the data appendix',
      'Custom score weighting, saved per project',
      'CSV and PDF export',
    ],
    foot: 'Annual billing saves two months.',
    variant: 'light' as const,
  },
  {
    id: 'team' as const,
    name: 'Team',
    price: '$1,290',
    annual: '$1,075',
    per: 'per month',
    badge: '5 SEATS',
    desc: 'For fintechs where procurement, finance and product all touch the decision.',
    features: [
      'Everything in Pro, 5 seats included',
      'Shared shortlists and comments',
      'RFP workflow with approvals',
      'API access to pricing data',
      'Quarterly analyst briefing',
      'SSO and audit log',
    ],
    foot: 'Additional seats $190/month.',
    variant: 'dark' as const,
  },
]

export const planMatrix = [
  { feature: 'Provider directory (210)', free: 'Full', pro: 'Full', team: 'Full' },
  { feature: 'Corridor pricing per provider', free: '1 corridor', pro: 'All', team: 'All' },
  { feature: 'Pricing history', free: '—', pro: '24 months', team: '24 months' },
  { feature: 'Compare providers', free: '2 at a time', pro: '4 at a time', team: '4 at a time' },
  { feature: 'Custom score weighting', free: '—', pro: 'Unlimited', team: 'Unlimited' },
  { feature: 'Shortlists', free: '1', pro: 'Unlimited', team: 'Shared' },
  { feature: 'Intro requests', free: '2 / month', pro: 'Unlimited', team: 'Unlimited' },
  { feature: 'Market maps', free: '1 / month', pro: 'All + appendix', team: 'All + appendix' },
  { feature: 'Export (CSV, PDF)', free: '—', pro: 'Yes', team: 'Yes' },
  { feature: 'Seats', free: '1', pro: '1', team: '5 included' },
  { feature: 'API access', free: '—', pro: '—', team: 'Yes' },
]

export const billingRows = [
  { k: 'Billing email', v: 'finance@northwind.co' },
  { k: 'Billing address', v: 'Berlin, DE' },
  { k: 'VAT ID', v: 'DE 318 552 004' },
  { k: 'Tax treatment', v: 'Reverse charge' },
]

export const usageMeters = [
  { label: 'Intro requests', v: '7 / ∞', pct: 24, tone: 'lime' as const, note: 'Unlimited on Pro' },
  { label: 'Compare sessions', v: '18', pct: 42, tone: 'lime' as const, note: 'No cap' },
  { label: 'Exports', v: '4 / 20', pct: 20, tone: 'plain' as const, note: 'Resets 28 Sep' },
  { label: 'Seats', v: '1 / 1', pct: 100, tone: 'amber' as const, note: 'Team includes 5' },
]

export const seatRows = [
  { name: 'Dana Okafor', email: 'dana@northwind.co', role: 'ADMIN', tone: 'plain' as const },
  { name: 'Invite pending', email: 'marc@northwind.co', role: 'NEEDS TEAM', tone: 'amber' as const },
  { name: 'Add a seat', email: 'Available on Team — $190/month each', role: 'UPGRADE', tone: 'lime' as const },
]

export const invoices = [
  { id: 'INV-2026-08', date: '28 Aug 2026', amount: '$499.00' },
  { id: 'INV-2026-07', date: '28 Jul 2026', amount: '$499.00' },
  { id: 'INV-2026-06', date: '28 Jun 2026', amount: '$499.00' },
  { id: 'INV-2026-05', date: '28 May 2026', amount: '$499.00' },
]

export const MARKET_MAP_SLUG = 'fintech-35-trillion-daily'
