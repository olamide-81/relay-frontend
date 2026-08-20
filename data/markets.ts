export type MarketNews = {
  date: string
  title: string
  source: string
  summary: string
  paywalled: boolean
}

export type MarketLicense = {
  name: string
  regulator: string
  typicalTime: string
  capital?: string
  notes: string
}

export type Market = {
  id: string
  name: string
  region: string
  countryCodes: string[]
  headline: string
  regulator: string
  compliance: string
  bigPlayers: string[]
  licenses: MarketLicense[]
  policies: { title: string; body: string }[]
  news: MarketNews[]
  reportSlugs: string[]
}

export const markets: Market[] = [
  {
    id: 'nigeria',
    name: 'Nigeria',
    region: 'West Africa',
    countryCodes: ['NG'],
    headline: 'Africa’s largest payments market by volume — CBN-led licensing, NIP rails, and a crowded PSP stack.',
    regulator: 'Central Bank of Nigeria (CBN), with SEC for capital markets and NDPC for data.',
    compliance: 'NDPR/NDPA data rules, CBN KYC tiers, NFIU AML, BVN/NIN identity. Payments firms sit in PSP, MMO, Super-Agent, or Payment Service Bank categories — mixing them is a common licence error.',
    bigPlayers: ['Paystack', 'Flutterwave', 'Interswitch', 'GTBank', 'Access Bank', 'OPay', 'Moniepoint', 'PalmPay'],
    licenses: [
      {
        name: 'Payments Service Provider (PSP)',
        regulator: 'CBN',
        typicalTime: '9–18 months',
        capital: '₦100m–₦2bn depending on category',
        notes: 'Switching, processing, super-agent, and MMOs are different licences. Do not assume a PSP can issue e-money.',
      },
      {
        name: 'Payment Service Bank',
        regulator: 'CBN',
        typicalTime: '12–24 months',
        capital: '₦5bn',
        notes: 'Deposit-taking lite. Useful if you need accounts at scale; heavy compliance.',
      },
      {
        name: 'MMO / super-agent',
        regulator: 'CBN',
        typicalTime: '9–15 months',
        notes: 'Wallet and agency. Float, agent network, and consumer protection are the exam.',
      },
    ],
    policies: [
      {
        title: 'NIP and instant payments',
        body: 'NIBSS Instant Payments is the domestic rail. Customer-facing fees are capped; your commercial with a settlement bank is a separate schedule. Weekend and failed-transaction handling should be in the SLA.',
      },
      {
        title: 'FX and IMTOs',
        body: 'Official FX windows, IMTOs, and crypto-adjacent flows are tightly supervised. If you settle USD offshore against NGN locally, document the corridor — this is where licences get pulled.',
      },
      {
        title: 'Data and identity',
        body: 'NIN and BVN access goes through licensed identity partners. Storing biometrics without a DPA is a red flag in diligence.',
      },
    ],
    news: [
      {
        date: '2026-07-18',
        title: 'CBN reiterates category boundaries for PSPs vs MMOs',
        source: 'Relay policy desk',
        summary: 'Several fintechs were asked to unwind products that looked like e-money without the matching licence.',
        paywalled: true,
      },
      {
        date: '2026-05-02',
        title: 'NIP weekend processing windows widen at two tier-1 banks',
        source: 'Relay bank commercials',
        summary: 'GTBank and Access expanded Sunday NIP for API corporates; surcharge still applies on some bands.',
        paywalled: true,
      },
      {
        date: '2026-03-11',
        title: 'Identity vendors: NIN pass-through rates in Q1',
        source: 'Relay KYC index',
        summary: 'Smile Identity and Youverify remain ahead on NIN + selfie; global vendors still lag on older laminates.',
        paywalled: false,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily', 'asia-pacific-payment-rails'],
  },
  {
    id: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    countryCodes: ['KE'],
    headline: 'M-Pesa still sets the rails. CBK licensing plus a dual stack: mobile money and bank IPS.',
    regulator: 'Central Bank of Kenya, with CAK on competition and ODPC on data.',
    compliance: 'CBK prudential guidelines for PSPs, AML via FRC, Data Protection Act. Safaricom commercial terms are as important as the licence.',
    bigPlayers: ['Safaricom M-Pesa', 'Airtel Money', 'KCB', 'Equity', 'Cellulant', 'PesaPal', 'Flutterwave'],
    licenses: [
      {
        name: 'Payments service provider',
        regulator: 'CBK',
        typicalTime: '6–14 months',
        notes: 'If you touch M-Pesa, budget a parallel Safaricom due-diligence track.',
      },
    ],
    policies: [
      {
        title: 'Mobile money dominance',
        body: 'Card acquiring exists but M-Pesa C2B/B2C is the conversion path. Interoperability has improved; commercials still differ by operator.',
      },
      {
        title: 'Data Protection Act',
        body: 'ODPC registration and cross-border transfer rules apply to KYC vendors storing selfies outside Kenya.',
      },
    ],
    news: [
      {
        date: '2026-06-09',
        title: 'CBK consults on open banking APIs',
        source: 'Relay policy desk',
        summary: 'Draft standards would push banks toward AIS-style sharing; timelines still indicative.',
        paywalled: true,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily'],
  },
  {
    id: 'brazil',
    name: 'Brazil',
    region: 'Latin America',
    countryCodes: ['BR'],
    headline: 'Pix is the rail. Open finance is live. IOF and local incorporation decide your all-in cost.',
    regulator: 'Banco Central do Brasil (BCB), CVM for securities, Bacen PIX rulebook.',
    compliance: 'LGPD, PIX security requirements, open finance consent, tax (IOF) on cross-border. Acquiring vs initiation are different licences.',
    bigPlayers: ['Nubank', 'Mercado Pago', 'Stone', 'Cielo', 'EBANX', 'PagSeguro', 'Itaú'],
    licenses: [
      {
        name: 'Instituição de pagamento',
        regulator: 'BCB',
        typicalTime: '12–24 months',
        notes: 'Pix participation has its own operational bar. Many globals contract a local IP instead of licensing.',
      },
    ],
    policies: [
      {
        title: 'Pix',
        body: 'Instant, 24/7, QR and keys. MDR for cross-border is not the domestic Pix fee. Settlement and IOF need to be modelled together.',
      },
      {
        title: 'Open finance',
        body: 'Consent-based data and initiation. Coverage is among the deepest globally; UX and consent expiry are the product work.',
      },
    ],
    news: [
      {
        date: '2026-08-01',
        title: 'Pix automatic recurring payments adoption',
        source: 'Relay rails desk',
        summary: 'Recurring Pix is eating card subscriptions in bill-pay; acquirers repricing.',
        paywalled: true,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily'],
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    region: 'Europe',
    countryCodes: ['GB'],
    headline: 'FCA authorisation, Faster Payments, and open banking as a default rail — not a science project.',
    regulator: 'FCA, PRA for banks, PSR on payments, ICO on data.',
    compliance: 'FCA handbook (especially CASS, DISP, SYSC), AML regs, APP fraud reimbursement, Strong Customer Authentication.',
    bigPlayers: ['TrueLayer', 'GoCardless', 'Stripe', 'Wise', 'Revolut', 'Checkout.com', 'Modulr'],
    licenses: [
      {
        name: 'EMI or PI',
        regulator: 'FCA',
        typicalTime: '12–18 months',
        capital: 'Initial + ongoing own funds',
        notes: 'Agent/distributor models are faster but you inherit the principal’s perimeter. APP fraud cost is now a P&L line.',
      },
    ],
    policies: [
      {
        title: 'Open banking / VRP',
        body: 'AISP/PISP permissions. Variable recurring payments expanding. Bank connectivity quality still varies — compare providers on live success rate, not institution count.',
      },
      {
        title: 'APP fraud',
        body: 'Reimbursement rules shifted cost onto PSPs. Underwriting and confirmation-of-payee are part of the commercial, not extras.',
      },
    ],
    news: [
      {
        date: '2026-04-22',
        title: 'FCA multi-firm review on APP fraud controls',
        source: 'Relay policy desk',
        summary: 'Expect more evidence requests on outbound Faster Payments risk scoring.',
        paywalled: true,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily'],
  },
  {
    id: 'united-states',
    name: 'United States',
    region: 'North America',
    countryCodes: ['US'],
    headline: 'State money-transmitter patchwork, federal bank partners, ACH/wires/FedNow — sponsor risk is the product.',
    regulator: 'FinCEN, state regulators, OCC/FDIC/Fed if bank-chartered, CFPB for consumer.',
    compliance: 'BSA/AML, OFAC, state MTLs, Reg E, privacy (state laws). BaaS middleware failures in 2023–25 still shape sponsor appetite.',
    bigPlayers: ['Stripe', 'Plaid', 'Marqeta', 'Column', 'Unit', 'Treasury Prime', 'Adyen'],
    licenses: [
      {
        name: 'Money transmitter (state-by-state)',
        regulator: 'State + FinCEN MSB',
        typicalTime: '18–36 months for a full map',
        notes: 'Many teams never licence — they sit on a bank or MTL partner. Relay tracks who actually holds the licence.',
      },
      {
        name: 'Bank partnership / OCC charter',
        regulator: 'OCC / state banks',
        typicalTime: '6–18 months to programme; years to charter',
        notes: 'After Synapse, sponsors want skin in the game: capital, compliance staff, and clear account ownership.',
      },
    ],
    policies: [
      {
        title: 'ACH credit vs debit',
        body: 'Credits (payouts) and debits (pulls) have different return risk. Unauthorized debit returns can reprice or kill a programme. Commercials should split item fee, returns, and same-day.',
      },
      {
        title: 'FedNow / RTP',
        body: 'Instant rails are live but not ubiquitous. Your bank’s participation — not the network brochure — is the constraint.',
      },
    ],
    news: [
      {
        date: '2026-07-01',
        title: 'Sponsor banks tightening BaaS onboarding',
        source: 'Relay banking desk',
        summary: 'Programmes without in-house BSA officers are being exited. Direct bank APIs (Column-style) gaining share.',
        paywalled: true,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily'],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    region: 'Asia-Pacific',
    countryCodes: ['SG'],
    headline: 'MAS licences are a badge and a bottleneck. PayNow, FAST, and a hub for regional payouts.',
    regulator: 'Monetary Authority of Singapore.',
    compliance: 'MAS notices (especially 626 AML), PDPA, technology risk guidelines. MPI vs SFA vs banking are different worlds.',
    bigPlayers: ['Grab', 'GXS', 'Liquid Group', 'Nium', 'Airwallex', 'DBS', 'Xendit (regional)'],
    licenses: [
      {
        name: 'Major payment institution',
        regulator: 'MAS',
        typicalTime: '12–24 months',
        capital: 'Base + safeguarding',
        notes: 'Standard PI is lighter but activity thresholds force an MPI. Cross-border adds another conversation.',
      },
    ],
    policies: [
      {
        title: 'Safeguarding',
        body: 'Customer money segregation is examined in practice, not just in the application. Bank partners for safeguarding are a diligence item.',
      },
    ],
    news: [
      {
        date: '2026-02-14',
        title: 'MAS technology risk guidelines — operational resilience updates',
        source: 'Relay APAC desk',
        summary: 'Incident reporting clocks tightened for MPI licensees.',
        paywalled: true,
      },
    ],
    reportSlugs: ['asia-pacific-payment-rails'],
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    region: 'Middle East',
    countryCodes: ['AE'],
    headline: 'ADGM, DIFC and CBUAE — pick the jurisdiction on purpose. Instant payments and a wealth of stored-value licences.',
    regulator: 'CBUAE onshore; FSRA (ADGM) or DFSA (DIFC) in financial free zones.',
    compliance: 'AML (Cabinet Decision), ESR, data residency sensitivities, and dual licensing if you serve onshore and zone.',
    bigPlayers: ['Network International', 'Telr', 'Checkout.com', 'Amazon.ae payments', 'Mashreq', 'Wio'],
    licenses: [
      {
        name: 'Retail payment services / stored value',
        regulator: 'CBUAE or FSRA/DFSA',
        typicalTime: '9–18 months',
        notes: 'Onshore vs free zone changes who you can serve. Introductions to CBUAE-supervised banks still matter for settlement.',
      },
    ],
    policies: [
      {
        title: 'Choose a perimeter',
        body: 'ADGM/DIFC is not a shortcut to onshore UAE customers. Map the customer, the dirham, and the scheme before you apply.',
      },
    ],
    news: [
      {
        date: '2026-01-20',
        title: 'AANI instant payments expanding participant list',
        source: 'Relay MENA desk',
        summary: 'More banks live; fintech access still mostly via sponsor.',
        paywalled: true,
      },
    ],
    reportSlugs: ['fintech-35-trillion-daily'],
  },
  {
    id: 'india',
    name: 'India',
    region: 'Asia-Pacific',
    countryCodes: ['IN'],
    headline: 'UPI is the product. RBI licensing (PA/PG, PPI) and NPCI operating rules decide whether you exist.',
    regulator: 'Reserve Bank of India, NPCI for UPI, CERT-In for incidents, MeitY on data.',
    compliance: 'RBI KYC master directions, data localisation, PA-PG guidelines, PPI rules. UPI handle and bank account are different stacks.',
    bigPlayers: ['PhonePe', 'Google Pay', 'Paytm', 'Razorpay', 'Cashfree', 'ICICI', 'HDFC'],
    licenses: [
      {
        name: 'Payment aggregator / PA-PG',
        regulator: 'RBI',
        typicalTime: '12–24 months',
        notes: 'Many startups go live as a sub of a licensed PA. That is a commercial and concentration risk.',
      },
      {
        name: 'PPI (wallets)',
        regulator: 'RBI',
        typicalTime: '18+ months',
        notes: 'Full KYC wallets vs minimum-detail are different products.',
      },
    ],
    policies: [
      {
        title: 'UPI',
        body: 'MDR on UPI P2M has been a political and commercial battleground. Model take-rate without assuming card-like economics.',
      },
    ],
    news: [
      {
        date: '2026-06-20',
        title: 'NPCI incremental UPI limits for certain MCCs',
        source: 'Relay India desk',
        summary: 'Credit-on-UPI and credit-line products still tightly gated.',
        paywalled: true,
      },
    ],
    reportSlugs: ['asia-pacific-payment-rails', 'fintech-35-trillion-daily'],
  },
]

export function getMarketById(id: string) {
  return markets.find((m) => m.id === id)
}

export function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
