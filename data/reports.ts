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

export type ReportImage = {
  src: string
  alt: string
  caption?: string
}

export type ReportSection = {
  heading: string
  body: string
  /** Optional secondary paragraphs for long-form reading */
  paragraphs?: string[]
  chartTitle?: string
  caption?: string
  bars?: ReportChartBar[]
  table?: {
    columns: string[]
    rows: string[][]
  }
  image?: ReportImage
  pullQuote?: string
  bullets?: string[]
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
  discoverMarket?: string
  /** Flagship presentation */
  heroImage?: ReportImage
  dek?: string
  kicker?: string
  keyTakeaways?: string[]
  closing?: string
  cta?: {
    title: string
    lede: string
    label: string
    href: string
  }
  /** Shorter title for <title>, OG, and SERP (keep H1 as full title). */
  seoTitle?: string
  seoDescription?: string
}

export const REPORT_CATEGORIES = [
  'Market maps',
  'Benchmarks',
  'Corridors',
  'Vendors',
  'Licensing',
  'Reliability',
] as const

/**
 * Relay Research — flagship report catalogue.
 * Only ship reports that are fully researched and production-ready.
 */
export const dataReports: DataReport[] = [
  {
    slug: 'fintech-35-trillion-daily',
    title:
      'The World Does Over $35 Trillion in Transactions Daily, and Fintech Carries Out Over 10% of That Transactional Volume, Growing From Less Than 1% a Decade Ago',
    seoTitle:
      'Fintech Clears Over 10% of $35T Daily Global Transactions | Relay Research',
    seoDescription:
      'Flagship Relay Research: global transaction volume exceeds $35 trillion daily. Fintech now clears over 10% — from less than 1% a decade ago. Deep dives on digital wallets, instant payments, remittances, and rails across the US, Europe, Africa, LatAm, and Asia.',
    dek: 'Global financial and market transaction volumes exceed $35 trillion in value every day. Fintech now captures over 10% of that flow — up from less than 1% a decade ago. This report maps where the money moves, who is clearing it, and what gets built next.',
    kicker: 'Relay Research · Flagship',
    excerpt:
      'The world does over $35 trillion in transactions daily. Fintech now carries out over 10% of that volume — growing from less than 1% a decade ago.',
    category: 'Market maps',
    market: 'Global',
    publishedAt: '2026-08-11',
    updatedAt: '2026-08-11',
    readMinutes: 28,
    heroImage: {
      src: '/reports/fintech-volume-hero.png',
      alt: 'Fintech interfaces and live market tickers in a modern financial district at dusk',
      caption:
        'Consumer interfaces and wholesale market infrastructure are converging — the same stack that settles a street payment now competes for cross-border value.',
    },
    heroStat: {
      label: 'Fintech share of daily flow',
      value: 'Over 10%',
      delta: 'From less than 1% a decade ago',
      tone: 'up',
    },
    metrics: [
      {
        label: 'Daily global flow',
        value: '$35T+',
        delta: 'Payments + markets',
        tone: 'flat',
      },
      {
        label: 'FX turnover (BIS)',
        value: '$7.5T',
        delta: 'Per day',
        tone: 'flat',
      },
      {
        label: 'Digital wallet e-comm share',
        value: '54%',
        delta: '2026',
        tone: 'up',
      },
      {
        label: 'Instant payments growth',
        value: '470%',
        delta: '2021 to 2026',
        tone: 'up',
      },
    ],
    cta: {
      title: 'Turn this map into decisions for your markets',
      lede: 'This report is a global system view. If you are expanding into wallets, instant rails, remittances, or FX corridors, Relay helps you translate the shift into partner shortlists, fee reality, and introductions — by market.',
      label: 'Contact sales',
      href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08',
    },
    keyTakeaways: [
      'Fintech is no longer a side channel. It clears over 10% of a $35T+ daily flow stack that includes FX, derivatives, retail payments, and institutional transfers — up from less than 1% a decade ago.',
      'The decisive pattern is geographic: Asia, Latin America, and Africa built mobile-first rails with thin legacy resistance. North America still holds outsized value via cards and the dollar — but loses on velocity.',
      'Instant government rails plus fintech apps (Pix, UPI, mobile money) are the winning template. Cards are forecast to fall toward about 15% of digital transactions by 2028.',
      'The next prize is infrastructure: B2B treasury, stablecoin settlement, compliance plumbing, and intelligence on payment flows — not another consumer wallet.',
    ],
    overview:
      'Global financial and market transaction volumes exceed $35 trillion in value every day. That figure is not a single retail payment network — it is the combined movement of money and market risk across FX, derivatives, consumer payments, B2B transfers, and emerging crypto rails. The story that matters for operators and builders is not the size of the pie. It is who is clearing it. Fintech now captures more than 10% of that flow, up from less than 1% a decade ago. Most of the companies moving that volume did not exist fifteen years ago. This report maps where the $35T moves, which categories fintech is winning, how regions diverge, and where the next decade of infrastructure will be built.',
    background:
      'Relay’s first flagship report is deliberately wide-aperture. Builders expanding across markets keep asking the same question: is fintech still “disrupting” finance, or has it become the operating system? The data says the latter — unevenly. We synthesize central-bank and industry sources (BIS, Capgemini, NPCI, Banco Central do Brasil, World Bank remittance monitors, and market research) to separate durable structural shifts from hype. Where figures are directional or definition-sensitive, we say so.',
    findings: [
      {
        title: 'Share, not slogans: fintech cleared the 10% line',
        body: 'A decade ago fintech sat under 1% of global transactional flow. Crossing 10% means fintech now clears more daily value than many national banking systems — not as a niche, but as core rails.',
        dataSupport: 'Less than 1% to over 10% share of $35T+ daily flow',
        whyItMatters:
          'Product and partnership strategy that still treats fintech as optional overlay is already behind the settlement map.',
      },
      {
        title: 'Wallets won retail. Cards are in structural retreat.',
        body: 'Digital wallets account for roughly 54% of global e-commerce transaction value in 2026. Cards are forecast to fall from ~21% to ~15% of digital transactions by 2028 — a ~29% share decline in five years.',
        dataSupport: '54% wallet e-comm share · cards toward about 15% by 2028',
        whyItMatters:
          'Merchant acquiring, fraud stacks, and treasury assumptions built only on card economics will misprice emerging corridors.',
      },
      {
        title: 'Instant rails are the new national infrastructure',
        body: 'Instant payments are on track for roughly $27.7T by 2026, from about $4.8T in 2021 — ~470% growth in five years. Pix and UPI show how government rails + fintech UX can rewire an entire market in under half a decade.',
        dataSupport: '$4.8T to $27.7T instant payments (2021–2026)',
        whyItMatters:
          'Float-based banking economics erode when settlement compresses from days to seconds.',
      },
      {
        title: 'Emerging markets set the template; the West follows',
        body: 'Brazil’s Pix, India’s UPI, and African mobile money scaled without defending a credit-card middle. Developed markets still hold volume, but innovation velocity has shifted toward São Paulo, Bangalore, Lagos, and Nairobi.',
        dataSupport: 'LatAm & Africa ~15%+ CAGR vs 2–5% in mature markets',
        whyItMatters:
          'Global product roadmaps that copy Silicon Valley card patterns will underfit the markets growing fastest.',
      },
      {
        title: 'Stablecoins are small in share — large in trajectory',
        body: 'Crypto and stablecoins remain a thin slice of the $35T daily stack (~0.4%), but grow 2–3× faster than traditional categories and already move trillions annually on settlement-like use cases.',
        dataSupport: '~$144B/day crypto · 2–3× category growth',
        whyItMatters:
          'Cross-border B2B and remittance corridors are where stablecoin rails threaten correspondent banking first.',
      },
    ],
    sections: [
      {
        heading: 'The $35 trillion stack — what’s actually moving',
        body: 'Treat $35T as a composite of global financial and market flows in a 24-hour window — not as a single ACH-like network. The composition explains why fintech can own retail interfaces while banks still dominate wholesale FX desks.',
        paragraphs: [
          'Foreign exchange remains the largest discrete slice, with BIS Triennial Survey figures on the order of $7.5 trillion per day. Derivatives and related financial products add a comparable wholesale layer. Retail and consumer payments, B2B transfers, and crypto rails fill the remainder — with very different fee structures, settlement clocks, and regulatory overlays.',
          'Fintech’s share is concentrated where UX, mobile distribution, and instant settlement compound: wallets, A2A, remittances, and real-time domestic rails. It is thinner where balance-sheet FX and institutional derivatives still require bank credit and clearing membership.',
        ],
        table: {
          columns: ['Category', 'Daily scale (order of magnitude)', 'Fintech pressure'],
          rows: [
            ['Foreign exchange', '~$7.5T (BIS)', 'Edges & SMB FX first'],
            ['Derivatives & markets', '~$7–8T', 'Mostly incumbent clearing'],
            ['Retail & consumer payments', '~$5.5T', 'High — wallets winning'],
            ['B2B & institutional transfers', '~$5T', 'Rising — treasury tools'],
            ['Crypto & stablecoins', '~$144B (≈0.4%)', 'Fastest growth rate'],
          ],
        },
        caption:
          'Order-of-magnitude composition of the $35T+ daily flow stack. Definitions vary by source; use for structural reading, not precise accounting.',
        pullQuote:
          'The story isn’t the size of the pie. It’s who’s clearing it — and fintech is reshaping the table.',
      },
      {
        heading: 'Retail payments: the wallet era',
        body: 'The card stack — swipe, scheme routing, issuer check, 2–3% merchant fee, T+1–3 settlement — is losing the default position in digital commerce.',
        paragraphs: [
          'Digital wallets are the largest global e-commerce method at roughly 54% of transaction value in 2026 (up from ~49% in 2023). In China, dominant wallet platforms still concentrate the vast majority of online volume. In India, UPI has become the national default: NPCI data shows on the order of 18 billion monthly transactions in early 2025, with FY25 volumes near 186 billion transactions and value growth of ~30% year over year.',
          'Brazil’s Pix, launched in late 2020, reached mass adoption in four years — with adult coverage near universal, e-commerce share around 40% and climbing, and single-day peaks above 250 million transactions (252.1 million on 20 December 2024). Southeast Asian local wallets routinely out-volume international card schemes domestically.',
          'Forecasts put wallet processing toward $3.1T by 2027 — several times traditional card digital share — while card share of digital transactions compresses toward ~15% by 2028.',
        ],
        bullets: [
          'Displacing: scheme-centric fees, multi-day settlement, banks as exclusive gatekeepers',
          'Replacing: instant A2A, QR and app-native checkout, near-zero consumer fees on domestic rails',
        ],
        bars: [
          { label: 'Wallets 2026', value: 54, display: '54%' },
          { label: 'Cards 2023', value: 21, display: '21%' },
          { label: 'Cards 2028e', value: 15, display: '~15%' },
          { label: 'Cash now', value: 8, display: '~8%' },
        ],
        chartTitle: 'Share of digital / tracked payment methods (directional)',
        caption:
          'Wallet and card shares reflect digital commerce mix from industry payment reports; cash share is global transaction mix, down from ~46% a decade ago.',
      },
      {
        heading: 'Cross-border: remittances, spreads, and stablecoin rails',
        body: 'A $200 remittance into Sub-Saharan Africa still averages roughly 7–9% in fees — nearly 3× the UN’s 3% target. That gap is the product brief for fintech corridors.',
        paragraphs: [
          'Traditional remittance centers and bank wires price opacity and delay into the product: 5–7% fees and multi-day credit are still common on consumer corridors. Fintech apps and increasingly stablecoin settlement compress that to low single-digit dollars and minutes.',
          'Stablecoin transfer value is already measured in the trillions annually across major USD-pegged tokens. Share of the full $35T daily stack remains small, but growth rates of 2–3× traditional categories make this the clearest threat to correspondent banking economics on retail and SMB cross-border legs.',
          'Card networks are adapting at the edge — crypto-linked cards and digital asset services — which is itself a signal: legacy schemes are integrating fintech rails rather than ignoring them.',
        ],
        image: {
          src: '/reports/fintech-volume-floor.png',
          alt: 'Trading floor and market data walls in a global financial hub',
          caption:
            'Wholesale market infrastructure still concentrates FX and derivatives. Fintech pressure is strongest where those desks never served SMBs and diaspora corridors well.',
        },
      },
      {
        heading: 'Real-time payments: float dies when money moves in seconds',
        body: 'Instant payment value is projected near $27.7T by 2026 versus roughly $4.8T in 2021. That is not a feature release — it is a rewrite of working-capital physics.',
        paragraphs: [
          'Europe’s open-banking regime forced banks to expose rails via API, spawning a layer of fintech products on mandated-open infrastructure. The US launched government-backed real-time systems in 2023 as an alternative path for bills and gig payouts — still early versus UPI/Pix scale. Asia and Latin America show the mature pattern: public settlement fabric + private fintech UX.',
          'When a $1M B2B payment that used to arrive Monday after a Friday send now clears in seconds, weekend float and wire fee schedules stop being a business model and start being a tax on the customer.',
        ],
        bullets: [
          'Displacing: T+2 wires, weekend trapped capital, opaque correspondent chains',
          'Replacing: 10-second credit, open APIs, near-zero domestic instant fees',
        ],
      },
      {
        heading: 'FX and SMB B2B: eating the edges of the desk',
        body: 'FX still clears on the order of $7.5–9.5T per day and remains bank-dominated because it is credit- and franchise-intensive. Fintech wins the edges: SMBs that never justified a relationship desk.',
        paragraphs: [
          'A mid-market importer facing 1–3% opaque spreads on a €1M payables ticket is the exact customer fintech FX platforms underwrite with mid-market rates plus a flat fee. Same-day or next-day credit replaces multi-day desk workflows.',
          'This is not the overnight death of bank FX. It is permanent share shift on the long tail of corporate payments — the same pattern wallets used against cards in retail.',
        ],
      },
      {
        heading: 'Regional power map: where the $35T sits',
        body: 'Volume is not evenly distributed. Asia-Pacific and North America together clear roughly three of every four dollars moved globally — for opposite reasons.',
        paragraphs: [
          'Asia-Pacific leads with roughly 38% of global payment transaction revenue share and an estimated ~$13T daily contribution to the flow stack: population scale, government rails, and fintech-native adoption. China and India alone reshape retail payment gravity; Southeast Asia’s local wallets routinely beat international schemes on domestic volume.',
          'North America rivals Asia on value (~$12T daily order of magnitude) with a third of the population — high ticket sizes, mature card rails (~$6.5T US annual card purchase volume), and dollar dominance in FX (USD on ~88% of FX trades). Fintech wins velocity here (wallets, BNPL, FedNow-era A2A) while cards still hold bulk volume.',
          'Europe (~20%) is the regulatory laboratory: PSD2-style open banking forces cooperation. BNPL already runs near 9% of European e-commerce versus ~4% globally. Latin America (~7%) and Africa & Middle East (~6%) are smaller today but print 15%+ growth — and they are where fintech is default infrastructure, not an app store category.',
        ],
        table: {
          columns: ['Region', 'Share of flow', 'Daily (order of mag.)', 'Growth', 'Fintech posture'],
          rows: [
            ['Asia-Pacific', '~38%', '~$13.2T', '10–15% YoY', 'Fintech-native'],
            ['North America', '~35%', '~$12.3T', '3–5% YoY', 'Incumbent defense'],
            ['Europe', '~20%', '~$7T', '2–4% YoY', 'Regulated open APIs'],
            ['Latin America', '~7%', '~$2.5T', '15–20% CAGR', 'Leapfrog / Pix model'],
            ['Africa & MEA', '~6%', '~$2.1T', '~15% CAGR', 'Mobile-money foundation'],
          ],
        },
        caption:
          'Regional shares blend payment-revenue and flow estimates from industry and central-bank reporting. Use comparatively; absolute daily figures are compositional estimates around the $35T framing.',
        pullQuote:
          'Where banks built the rails, fintech must compete. Where rails never existed, fintech built them — and dominates.',
      },
      {
        heading: 'Case files: UPI, Pix, and mobile money',
        body: 'Three systems illustrate the winning public–private pattern.',
        paragraphs: [
          'India — UPI: National A2A fabric with fintech apps on top. Monthly volumes in the high teens of billions of transactions; FY25 near 186B transactions with ~42% volume growth. Average daily counts approach ~600 million. UPI is not “a wallet app” — it is national settlement UX.',
          'Brazil — Pix: From November 2020 launch to 2024, 63.4B transactions and ~$4.6T value in a single year; cumulative value since launch measured in the tens of trillions of dollars. Adult adoption is effectively saturated; e-commerce share ~40% with a path toward ~50%+ by 2027. Single-day record: 252.1M transactions (20 Dec 2024).',
          'Africa — mobile money: Markets like Kenya show over 90% mobile-money dominance on domestic retail. Phones outran bank branches; fintech filled the gap. Remittance inflows to Africa exceed $60B annually — fee compression from 5–10% toward less than 1% is a multi-billion-dollar transfer of surplus to households.',
        ],
        bars: [
          { label: 'UPI FY25 txns', value: 100, display: '~186B' },
          { label: 'Pix 2024 txns', value: 34, display: '63.4B' },
          { label: 'Pix Dec 20 peak', value: 14, display: '252M/day' },
          { label: 'Wallet e-comm', value: 54, display: '54%' },
        ],
        chartTitle: 'Scale markers (indexed for readability)',
        caption:
          'UPI and Pix bars are not the same unit as wallet share — chart is a visual scale board for headline magnitudes, not a single-axis comparison.',
      },
      {
        heading: 'Asia-Pacific deep dive: fintech-native at continental scale',
        body: 'Asia-Pacific leads with roughly 38% of global payment transaction revenue share. Nearly 38 cents of every dollar moved globally flows through Asian markets and corridors — population scale, government rails, and mobile-first adoption.',
        paragraphs: [
          'China concentrates enormous domestic wallet volume: dominant platforms together account for over 90% of online transaction volume. Domestic payments dominate; cross-border is growing via stablecoin and corridor products.',
          'India’s UPI is national settlement UX — on the order of 13–18 billion transactions per month in recent prints, with FY25 near 186 billion transactions. Rural reach matters: banks become back-end infrastructure, not the only gatekeeper.',
          'Japan remains the exception inside Asia: credit cards still represent about 55% of online payments, though wallets are rising. Singapore punches above its weight as a regional financial hub for cross-border finance, forex, and institutional flows. Across Southeast Asia (Philippines, Indonesia, Thailand, Vietnam), local wallets often carry more domestic volume than international card schemes.',
          'Fintech did not merely disrupt banking in much of Asia — it replaced the missing card layer. That is why the region is years ahead on real-time retail rails.',
        ],
        table: {
          columns: ['Market', 'Role in the stack', 'Fintech posture'],
          rows: [
            ['China', 'Wallet-native domestic scale', 'Platform concentration'],
            ['India', 'UPI national A2A fabric', 'Gov rail + apps'],
            ['Japan', 'Card-heavy online mix', 'Wallets catching up'],
            ['Singapore', 'Regional finance hub', 'Cross-border / FX'],
            ['Southeast Asia', 'Mobile-first populations', 'Local wallets lead'],
          ],
        },
      },
      {
        heading: 'North America deep dive: value heavy, velocity contested',
        body: 'North America processes roughly a third of global flow despite a fraction of Asia’s population — high ticket sizes, mature card rails, and dollar centrality in FX.',
        paragraphs: [
          'The United States still runs enormous card purchase volume (on the order of $6.5T annually) and anchors FX because the dollar appears in the vast majority of forex trades. Digital wallets are growing in e-commerce but trail the global wallet-first mix. Fintech wins edges: small merchant accepting, remittances, BNPL, and early real-time payout rails.',
          'Canada mirrors high-income card habits with rising fintech share. Mexico sits at the hinge of North America and Latin America: large remittance inflows from the US diaspora (tens of billions annually) make fee compression a household macro issue, not a niche product story.',
          'The North American pattern: incumbents defend volume; fintech wins velocity. Real-time systems launched in 2023 are still early versus UPI and Pix scale — but the direction is set.',
        ],
        bullets: [
          'Cards still hold bulk US purchase volume — share is the story, not extinction',
          'BNPL and wallets grow faster than card mix',
          'US–Mexico remittance corridor is a permanent fintech battleground',
        ],
      },
      {
        heading: 'Europe deep dive: regulation as distribution',
        body: 'Europe commands about 20% of global payments. It did not invent the fastest national rail — but open banking forced incumbents to be fintech-friendly by law.',
        paragraphs: [
          'PSD2-style regimes require banks to expose data and payment initiation via APIs. Fintech builds lending, accounting, and payment features on mandated-open rails. Buy-now-pay-later already represents about 9% of European e-commerce — roughly double the global average.',
          'Germany concentrates industrial B2B payment weight. The UK remains a global financial center for forex and institutional trading. France and the Nordics show advanced digital-payment habits; Nordic markets in particular behave like near-cashless laboratories.',
          'Europe’s edge is cooperative disruption: fintech wins by working through regulation, not only around it. Instant payment mandates continue to compress settlement times across the region.',
        ],
      },
      {
        heading: 'Latin America deep dive: the leapfrog template',
        body: 'Latin America is smaller in absolute share today and among the fastest-growing regions — roughly 15–20% CAGR. This is where fintech’s future operating system is being written in public.',
        paragraphs: [
          'Brazil’s Pix is the reference architecture: government-backed instant payments, open to banks and fintech, near-zero consumer fees, mass adoption within four years. E-commerce share around 40% with a path toward about 51% by 2027; single-day peaks above 250 million transactions.',
          'Mexico combines retail growth with remittance gravity. Colombia and Chile are building or adopting real-time rails on similar logic. Argentina shows the inflation hedge path: stablecoins used as functional money when local currency volatility spikes.',
          'Why it works: thin card incumbency, government rails, smartphone reach, and fintech UX on top. Latin America is not copying Silicon Valley card checkout — it is exporting the Pix pattern.',
        ],
        table: {
          columns: ['Market', 'Signal', 'Implication'],
          rows: [
            ['Brazil', 'Pix mass adoption', 'Cards lose default status'],
            ['Mexico', 'Remittance + e-comm', 'Corridor fintech wedge'],
            ['Colombia / Chile', 'RTP buildout', 'Follow the Pix template'],
            ['Argentina', 'Stablecoin hedge use', 'Crypto as utility, not hype'],
          ],
        },
      },
      {
        heading: 'Africa and Middle East deep dive: fintech as foundation',
        body: 'Africa and the Middle East are a smaller share of global flow today and among the fastest growers (about 15% CAGR). Fintech here is not optional overlay — it is how people get paid.',
        paragraphs: [
          'Large unbanked populations meet high mobile penetration. Kenya’s mobile-money operators still dominate domestic retail with market shares above 90% in core use cases. Nigeria combines a large population, remittance demand, and crypto/stablecoin usage as a hedge against currency volatility — Lagos has become a continental fintech hub.',
          'South Africa’s more developed banking base still leaps toward fintech distribution. Egypt’s scale and government digital-payment push matter for North Africa. The UAE concentrates high per-capita international business and forex activity with comparatively crypto-friendly positioning.',
          'Pan-African payment initiatives aim to enable instant local-currency settlement across borders. Remittance inflows to Africa exceed $60B annually; cutting legacy fees from 5–10% toward less than 1% is one of the highest-ROI fintech outcomes on earth.',
        ],
        bullets: [
          'Mobile money proved the model before “fintech” was a category',
          'Remittances and currency hedges drive stablecoin utility',
          'Greenfield growth: every new smartphone user is a potential rail user',
        ],
      },
      {
        heading: 'What legacy loses next',
        body: 'Cards, cash, remittance storefronts, and slow correspondent chains are all on the wrong side of settlement time and fee transparency.',
        paragraphs: [
          'Cash has already collapsed from roughly 46% of global transactions a decade ago to ~8% today. Remittance storefronts face 10× fee compression and 100× speed improvements from app-native corridors. Traditional bank-to-bank networks still move trillions institutionally — but lose the speed/cost benchmark to stablecoin and instant A2A alternatives on the corridors that matter to SMBs and diaspora.',
          'Incumbents are not disappearing. Card networks still command enormous valuations and processing outside China. They are losing share and being forced to integrate fintech capabilities.',
        ],
        bullets: [
          'Cards: share compression toward ~15% of digital by 2028',
          'Cash: structural decline except pockets of emerging-market cash preference',
          'Remittance centers: fee and speed gap too large to defend',
          'Correspondent banking: multi-hop $100–500 over days, replaced by point-to-point in seconds',
        ],
      },
      {
        heading: '2027–2030: seven shifts to underwrite',
        body: 'The second half of the decade is about settlement fabric becoming invisible — and banks becoming commodity infrastructure.',
        paragraphs: [
          '1. Stablecoins as default cross-border settlement for more business corridors — CBDC pilots continue (dozens of countries), but private USD rails already clear at production scale.',
          '2. Instant payments become table stakes in every developed market; emerging markets follow the Brazil template.',
          '3. Open banking / open finance mandates spread; fintech layers lending, accounting, insurance, and KYC on bank data.',
          '4. Emerging markets keep exporting payment design patterns to developed markets — not the reverse.',
          '5. Payment-flow underwriting replaces static credit files; BNPL already scaled from ~$179B (2022) toward $450B+ by 2026.',
          '6. Crypto becomes boring plumbing — speculation remains retail theater; infrastructure use goes institutional.',
          '7. Correspondent chains shorten toward point-to-point stablecoin or instant A2A — fee and latency collapse.',
        ],
        pullQuote:
          'Fintech isn’t disrupting finance anymore. Fintech is finance — unevenly distributed.',
      },
      {
        heading: 'Builder opportunities: where fintech goes next',
        body: 'Fintech won consumer payments. The white space is infrastructure, intelligence, and the underserved middle — exactly where Relay focuses.',
        paragraphs: [
          '1. The underserved middle — Emerging-market infrastructure: More than 2 billion people have phones but incomplete banking. Wallet platforms exist; localized UX (low bandwidth, offline-first, multilingual) is still thin.',
          '2. B2B payments and corporate treasury: FX, international payables, and payroll remain inefficient for SMBs. Retail P2P was solved first; B2B is still fragmented.',
          '3. Compliance plus fintech: Every new rail multiplies KYC, AML, and reporting demand. Plug-in compliance infrastructure for emerging-market fintechs is unfinished business.',
          '4. Real-time payment automation: Instant rails exist; SMB software that auto-settles on invoice receipt is the next software layer.',
          '5. Stablecoin infrastructure: Transfer value is compounding. Corporate controls, lending, and treasury tooling on top of issuer rails will decide who owns the boring plumbing.',
          '6. Data and analytics — the intelligence layer: Payment flow data is among the most valuable datasets in the economy. Aggregating corridor cost, reliability, and provider performance is Relay’s core thesis.',
        ],
        bullets: [
          'Consumer wallets are crowded — build underneath and beside them',
          'SMB cross-border and treasury remain high-fee, high-friction',
          'Intelligence on who actually works in a corridor beats another pitch deck',
        ],
      },
    ],
    marketContext: [
      'Asia and North America together represent roughly 73% of global flow — Asia via population and fintech-native rails, North America via ticket size and dollar centrality. Strategy that ignores either side will misread both volume and velocity.',
      'Latin America and Africa are smaller in absolute share today (about 13% combined) but grow at roughly 15% or more annually versus low-single-digits in mature markets. By 2030 their share of global flow should expand materially on growth alone.',
      'Remittances remain one of the cleanest fintech wedges: Africa (over $60B annually) and Latin America (over $150B including large US–Mexico corridors) still pay legacy fee taxes that instant and stablecoin rails can compress toward less than 1%.',
      'Key insight from the regional map: where banks built the rails, fintech must compete. Where rails never existed, fintech built them — and dominates.',
    ],
    providerLandscape: [
      {
        metric: 'Domestic retail default',
        leader: 'Gov rails + local wallets (UPI, Pix, Alipay/WeChat, M-Pesa)',
        value: 'Winner',
        note: 'Public settlement + private UX',
      },
      {
        metric: 'Cross-border consumer',
        leader: 'Corridor fintechs + stablecoin ramps',
        value: 'Disrupting',
        note: 'Fee compression vs 5–10% legacy',
      },
      {
        metric: 'Wholesale FX / derivatives',
        leader: 'Bank franchises & CCPs',
        value: 'Incumbent',
        note: 'Fintech eats SMB edges',
      },
      {
        metric: 'Card schemes',
        leader: 'Global networks',
        value: 'Defending',
        note: 'Share down; integrating crypto/wallet',
      },
    ],
    implications: [
      'If you expand into Asia, LatAm, or Africa, design for A2A and wallet-native checkout first — cards are the fallback, not the foundation.',
      'Price total cost of settlement (fee + FX + delay + failure) rather than sticker MDR. Instant rails change working-capital math.',
      'Treat stablecoins as a treasury and corridor option, not a speculation sidebar — especially for B2B cross-border.',
      'Build compliance and data layers as products: every new rail multiplies KYC/AML and analytics demand.',
      'Watch government instant systems as platform risk and platform opportunity — distribution can shift in months, not decades.',
      'Use Relay to shortlist providers by corridor reality (coverage, rails, fees, reliability), not by deck narrative.',
    ],
    closing:
      'Digital wallets are on track toward roughly 61% of digital transactions by 2028. Instant rails are compounding. Emerging markets are exporting the playbook. Fintech won the consumer interface war. The next war is infrastructure, intelligence, and B2B efficiency — on top of a $35 trillion daily flow that will not wait for slow settlers.',
    methodology:
      'This flagship synthesizes publicly reported figures from central banks and industry research into a single comparative frame. The $35T daily figure is a composite of global financial and market transaction flows (FX, derivatives, payments, transfers, and crypto), not a single operator’s throughput. Regional daily allocations are compositional estimates for structural comparison. UPI and Pix statistics prioritize NPCI and Banco Central do Brasil releases; remittance fee benchmarks follow World Bank-style corridor monitors; FX levels reference BIS Triennial Survey publications. Where forecasts (wallet share, instant payments totals, 2028 card mix) come from industry payment reports, they are labeled as directional. Relay does not provide financial, legal, or investment advice.',
    sources: [
      'BIS Triennial Central Bank Survey (FX turnover)',
      'Capgemini World Payments Report',
      'NPCI UPI monthly / annual statistics',
      'Banco Central do Brasil — Pix statistics',
      'World Bank remittance price monitors',
      'Federal Reserve / FedNow public materials',
      'ECB / SEPA Instant reporting',
      'Industry payment research (Mordor, Grand View, and related)',
      'Company filings and blockchain analytics summaries for stablecoin transfer value',
    ],
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
    (c) => !REPORT_CATEGORIES.includes(c as (typeof REPORT_CATEGORIES)[number]),
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
