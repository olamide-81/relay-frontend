export type Provider = {
  name: string
  domain: string
  category: string
}

export const providers: Provider[] = [
  { name: 'Stripe', domain: 'stripe.com', category: 'Payments' },
  { name: 'Plaid', domain: 'plaid.com', category: 'Banking' },
  { name: 'Mono', domain: 'mono.co', category: 'Banking' },
  { name: 'Paystack', domain: 'paystack.com', category: 'Payments' },
  { name: 'Flutterwave', domain: 'flutterwave.com', category: 'Payments' },
  { name: 'Onfido', domain: 'onfido.com', category: 'KYC' },
  { name: 'Sumsub', domain: 'sumsub.com', category: 'KYC' },
  { name: 'TrueLayer', domain: 'truelayer.com', category: 'Open Banking' },
  { name: 'Belvo', domain: 'belvo.com', category: 'Open Banking' },
  { name: 'Currencycloud', domain: 'currencycloud.com', category: 'FX' },
  { name: 'Nium', domain: 'nium.com', category: 'Payouts' },
  { name: 'dLocal', domain: 'dlocal.com', category: 'Payments' },
  { name: 'ComplyAdvantage', domain: 'complyadvantage.com', category: 'Compliance' },
  { name: 'Smile Identity', domain: 'smileidentity.com', category: 'KYC' },
  { name: 'Youverify', domain: 'youverify.co', category: 'KYC' },
  { name: 'Pawapay', domain: 'pawapay.io', category: 'Payouts' },
  { name: 'Wise', domain: 'wise.com', category: 'FX' },
  { name: 'Marqeta', domain: 'marqeta.com', category: 'Card Issuing' },
]

export const stats = [
  { value: '240+', label: 'APIs catalogued across 12 categories' },
  { value: '60+', label: 'providers vetted and benchmarked' },
  { value: '45', label: 'countries with coverage data' },
  { value: '48hrs', label: 'average time to first intro' },
]

export const features = [
  {
    title: 'Discover APIs by category',
    description:
      'Browse KYC, payouts, FX, treasury, compliance, and card issuing — mapped by region, use case, and integration depth.',
    tag: 'Directory',
  },
  {
    title: 'Compare fees side by side',
    description:
      'See per-transaction costs, monthly minimums, and volume tiers across providers — no NDA required to get started.',
    tag: 'Compare',
  },
  {
    title: 'Benchmark integration times',
    description:
      'Know how long sandbox access, compliance review, and go-live actually take — based on real builder reports.',
    tag: 'Benchmarks',
  },
  {
    title: 'Coverage by market',
    description:
      'Filter by country, currency, and regulatory requirements. Find who actually operates where you need to.',
    tag: 'Coverage',
  },
  {
    title: 'Warm introductions',
    description:
      'Skip the cold outreach. Relay connects you directly with the right partner team — already briefed on your use case.',
    tag: 'Intros',
  },
  {
    title: 'Build on verified data',
    description:
      'Every listing is maintained with docs links, SDK availability, webhook support, and sandbox access details.',
    tag: 'Data',
  },
]

export const categories = [
  { name: 'KYC & Identity', count: 34 },
  { name: 'Payments', count: 52 },
  { name: 'Payouts & Disbursements', count: 28 },
  { name: 'FX & Treasury', count: 19 },
  { name: 'Open Banking', count: 24 },
  { name: 'Compliance & AML', count: 31 },
  { name: 'Card Issuing', count: 16 },
  { name: 'Fraud & Risk', count: 22 },
]

export const caseStudies = [
  {
    company: 'Nomba',
    headline: 'Nomba cut provider evaluation from 8 weeks to 5 days with Relay.',
    stats: [
      { value: '8→5', label: 'weeks to shortlist' },
      { value: '12', label: 'providers compared' },
      { value: '3', label: 'markets launched' },
    ],
    products: 'KYC, Payouts, FX',
    gradient: 'linear-gradient(135deg, #635bff 0%, #0073e6 100%)',
  },
  {
    company: 'Chipper Cash',
    headline: 'Chipper Cash unified cross-border payout providers on one view.',
    stats: [
      { value: '6', label: 'payout APIs compared' },
      { value: '40%', label: 'fee reduction' },
      { value: '4', label: 'new corridors' },
    ],
    products: 'Payouts, FX, Compliance',
    gradient: 'linear-gradient(135deg, #0073e6 0%, #00d4aa 100%)',
  },
  {
    company: 'Kuda',
    headline: 'Kuda accelerated compliance vendor selection across 3 regulators.',
    stats: [
      { value: '100%', label: 'AML vendors mapped' },
      { value: '2wk', label: 'to first intro' },
      { value: '5', label: 'vendors shortlisted' },
    ],
    products: 'Compliance, KYC, Banking',
    gradient: 'linear-gradient(135deg, #0a2540 0%, #635bff 100%)',
  },
  {
    company: 'Paga',
    headline: 'Paga found the right agent network API for rural disbursements.',
    stats: [
      { value: '18', label: 'agent APIs reviewed' },
      { value: '3x', label: 'faster onboarding' },
      { value: 'NG', label: 'full coverage' },
    ],
    products: 'Payouts, KYC, Payments',
    gradient: 'linear-gradient(135deg, #00d4aa 0%, #0073e6 100%)',
  },
]

export const comparisonRows = [
  { provider: 'Provider A', fee: '1.4%', setup: '2 weeks', sandbox: 'Instant', coverage: '12 countries' },
  { provider: 'Provider B', fee: '0.9%', setup: '6 weeks', sandbox: '3 days', coverage: '28 countries' },
  { provider: 'Provider C', fee: '1.1%', setup: '3 weeks', sandbox: 'Instant', coverage: '19 countries' },
]

/* ── Logo wall (providers indexed in the directory) ── */
export const logoWall: string[] = [
  'Stripe',
  'Plaid',
  'Flutterwave',
  'Paystack',
  'Mono',
  'Onfido',
  'Sumsub',
  'TrueLayer',
  'Belvo',
  'Nium',
  'Wise',
  'dLocal',
  'Marqeta',
  'Smile ID',
  'Currencycloud',
  'ComplyAdvantage',
  'Youverify',
  'Pawapay',
]

/* ── Hero sub-tabs (under the hero, like Intercom's tab row) ── */
export const heroTabs = [
  {
    id: 'directory',
    label: 'A complete directory',
    caption: 'Every KYC, payments, payout, FX and compliance API — mapped by region and use case.',
  },
  {
    id: 'benchmarks',
    label: 'Live fee benchmarks',
    caption: 'Per-transaction costs, settlement times and coverage, compared side by side.',
  },
  {
    id: 'intros',
    label: 'Warm introductions',
    caption: 'Skip cold outreach. We connect you to the right provider team, already briefed.',
  },
  {
    id: 'intelligence',
    label: 'Verified intelligence',
    caption: 'Docs links, SDKs, webhooks and sandbox details — maintained and re-verified quarterly.',
  },
]

/* ── Three-up value cards (with mockup snapshots) ── */
export const valueCards = [
  {
    title: 'Faster decisions, less guesswork',
    description:
      'Evaluate every provider in a category in minutes — not weeks of sales calls and NDAs. Shortlist on real fees, coverage and go-live times.',
    mock: 'assistant' as const,
  },
  {
    title: 'Compare what actually matters',
    description:
      'Side-by-side fee tables, settlement timelines and regulatory coverage, so your team can defend every infrastructure choice with data.',
    mock: 'compare' as const,
  },
  {
    title: 'Intelligence & benchmarks',
    description:
      'Quarterly benchmark reports, market coverage maps and integration-time data drawn from real builder reports across 45 markets.',
    mock: 'reporting' as const,
  },
]

/* ── Omnichannel-style capability rows ── */
export const channels = [
  {
    title: 'One directory, every category',
    description:
      'Bring KYC, payments, payouts, FX, treasury, card issuing and compliance into a single searchable index — so your team evaluates from one place.',
    icons: ['KYC', 'PAY', 'FX', 'AML', 'CARD'],
  },
  {
    title: 'Live provider intelligence',
    description:
      'Access rich, continually re-verified records for every provider — fees, coverage, SDKs, webhooks and sandbox access — updated quarterly.',
    icons: ['DOCS', 'SDK', 'API', 'HOOK'],
  },
  {
    title: 'Connects to your stack',
    description:
      'Export shortlists, sync to Notion, Slack and Linear, or pull benchmarks through the Relay API to keep procurement moving.',
    icons: ['SLK', 'NOT', 'LIN', 'API'],
  },
]

/* ── Tabbed testimonials ── */
export const testimonials = [
  {
    company: 'Nomba',
    quote:
      'We started using Relay to scope payout providers and we love it. In one quarter we cut provider evaluation from eight weeks to five days — it’s become how we make infrastructure decisions.',
    name: 'Tola Adeyemi',
    role: 'Head of Payments at Nomba',
  },
  {
    company: 'Chipper Cash',
    quote:
      'Relay is a complete picture of the market. The benchmarks are honest, the coverage data is accurate, and the warm introductions saved us months of cold outreach.',
    name: 'Lerato Mokoena',
    role: 'Infrastructure Lead at Chipper Cash',
  },
  {
    company: 'Kuda',
    quote:
      'Relay mapped every AML and KYC vendor across three regulators for us in days. It freed our team to focus on building instead of chasing sales decks.',
    name: 'Emeka Obi',
    role: 'Director of Compliance at Kuda',
  },
]

/* ── Featured editorial testimonial ── */
export const featuredTestimonial = {
  quote:
    'If you’re debating whether to map the provider landscape yourself or use a directory, as a fast-growing company in a complex market, my advice is simple — use Relay.',
  name: 'Amara Bello',
  role: 'VP Operations at a fintech scale-up',
  image: '/editorial/testimonial-headshot.png',
}

export const newsItems = [
  {
    title: '240 APIs now catalogued across Africa, LATAM, and Europe.',
    description: 'Our Q1 directory update adds 40 new providers with full fee and integration benchmarks.',
    tag: 'Product',
  },
  {
    title: 'How neobanks pick KYC vendors in under a week.',
    description: 'A framework for evaluating identity providers by market, volume, and compliance depth.',
    tag: 'Guide',
  },
  {
    title: 'Relay intros hit 48-hour average response time.',
    description: 'Warm introductions now connect builders to partner teams within two business days.',
    tag: 'Update',
  },
  {
    title: 'Payout API fee benchmarks: Africa 2026 report.',
    description: 'Compare per-transaction costs across 18 disbursement providers operating in SSA.',
    tag: 'Report',
  },
]
