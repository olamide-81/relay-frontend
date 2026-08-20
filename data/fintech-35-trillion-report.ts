import type { DataReport } from './reports'

export const fintech35TrillionReport: DataReport = {
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
    'Fintech clears over 10% of a $35T+ daily flow stack spanning FX, derivatives, retail payments, and institutional transfers — up from less than 1% a decade ago.',
    'Asia, Latin America, and Africa scaled mobile-first rails with less card-era lock-in. North America still holds outsized value through cards and the dollar; it lags on velocity.',
    'Public instant rails plus fintech apps (Pix, UPI, mobile money) are the pattern that scales. Cards are forecast near 15% of digital transactions by 2028.',
    'The buildable prize is infrastructure: B2B treasury, stablecoin settlement, compliance plumbing, and payment-flow intelligence — more than another consumer wallet.',
  ],
  overview:
    'Global financial and market transaction volumes exceed $35 trillion in value every day. That is not one retail network — it is FX, derivatives, consumer payments, B2B transfers, and crypto rails moving in the same 24-hour window. Fintech now clears more than 10% of that flow, up from less than 1% a decade ago. Most of the firms moving that volume did not exist fifteen years ago. This report maps where the $35T sits, which categories fintech is taking, how regions diverge, and where infrastructure gets built next.',
  background:
    'This flagship is wide on purpose. Operators expanding corridors keep asking whether fintech is still “disrupting” finance or whether it is already the operating layer. The data says the second — unevenly by region and by rail. We draw on BIS, Capgemini, NPCI, Banco Central do Brasil, World Bank remittance monitors, and market research. Where a figure is directional or definition-sensitive, we mark it.',
  findings: [
    {
      title: 'Fintech now clears more than a tenth of daily global flow',
      body: 'Ten years ago, non-bank payment and market platforms sat below 1% of the combined $35T+ daily stack. That share is now above 10%. The volume cleared through those rails each day exceeds the domestic payment systems of most countries.',
      stat: {
        value: 'Over 10%',
        label: 'Fintech share of daily flow',
        compare: 'From less than 1% a decade ago',
      },
      compareStats: [
        { value: '$35T+', label: 'Daily global stack' },
        { value: '10×', label: 'Share increase' },
      ],
      whyItMatters:
        'Treating fintech as a side channel understates who already settles the customer.',
    },
    {
      title: 'Wallets are the default in digital commerce; cards are not',
      body: 'Wallets take about 54% of global e-commerce value in 2026. Industry forecasts put card share of digital transactions near 15% by 2028, down from roughly 21% in 2023.',
      stat: {
        value: '54%',
        label: 'Wallet share of e-commerce value',
        compare: '2026',
      },
      compareStats: [
        { value: '~21%', label: 'Cards, 2023' },
        { value: '~15%', label: 'Cards, 2028e' },
      ],
      whyItMatters:
        'Acquiring, fraud, and treasury models built only on scheme economics misread markets where A2A and wallets already dominate checkout.',
    },
    {
      title: 'Instant payment value grew nearly fivefold in five years',
      body: 'Real-time rails are projected near $27.7T in 2026, from about $4.8T in 2021. Pix and UPI show the pattern: a public settlement fabric, private fintech interfaces, and adoption measured in years—not decades.',
      stat: {
        value: '$27.7T',
        label: 'Instant payments, 2026e',
        compare: 'From $4.8T in 2021 (~470%)',
      },
      compareStats: [
        { value: 'Pix', label: 'Brazil mass rail' },
        { value: 'UPI', label: 'India mass rail' },
      ],
      whyItMatters:
        'Weekend float and multi-day wires stop looking like products once credit lands in seconds.',
    },
    {
      title: 'The growth template is coming from emerging markets',
      body: 'Pix, UPI, and African mobile money scaled without a credit-card middle. Mature markets still hold most absolute volume. The product patterns that travel are being written in São Paulo, Bangalore, Lagos, and Nairobi.',
      stat: {
        value: '15%+',
        label: 'LatAm & Africa payment CAGR',
        compare: 'Vs ~2–5% in mature markets',
      },
      compareStats: [
        { value: '2–5%', label: 'Mature-market CAGR' },
        { value: 'EM', label: 'Template source' },
      ],
      whyItMatters:
        'Roadmaps that export Silicon Valley card UX into the fastest-growing corridors will keep missing fit.',
    },
    {
      title: 'Stablecoins are a thin slice of the stack—and the fastest-moving one',
      body: 'Crypto and stablecoin flow is on the order of $144B a day, about 0.4% of the $35T stack. Growth runs two to three times traditional payment categories, with the clearest pressure on remittance and SMB cross-border corridors.',
      stat: {
        value: '~$144B',
        label: 'Crypto / stablecoin daily flow',
        compare: '~0.4% of the $35T stack',
      },
      compareStats: [
        { value: '2–3×', label: 'Vs traditional growth' },
        { value: 'XB', label: 'First pressure point' },
      ],
      whyItMatters:
        'Correspondent economics feel the squeeze first on retail and SMB cross-border legs—not on wholesale FX desks.',
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
        'Fintech’s share is concentrated where UX, mobile distribution, and instant settlement compound. It is thinner where bank credit and clearing membership still set the table.',
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
      metric: 'Domestic retail payments',
      leader: 'Public instant rails and local wallets',
      value: 'Leading',
      tone: 'up',
      signal:
        'UPI, Pix, Alipay/WeChat Pay, and M-Pesa set the checkout default in their home markets',
      note: 'Public settlement fabric; private apps on top',
    },
    {
      metric: 'Consumer cross-border',
      leader: 'Corridor specialists and stablecoin ramps',
      value: 'Gaining',
      tone: 'up',
      signal:
        'Legacy remittance fees still run 5–10% on many Africa and LatAm corridors',
      note: 'Pressure is fee and speed, not brand',
    },
    {
      metric: 'Wholesale FX and derivatives',
      leader: 'Bank franchises and central clearing',
      value: 'Holding',
      tone: 'flat',
      signal:
        'Daily FX still on the order of $7.5T; fintech share is mostly SMB and mid-market tickets',
      note: 'Balance-sheet and membership barriers remain high',
    },
    {
      metric: 'Card networks',
      leader: 'Global schemes',
      value: 'Losing share',
      tone: 'down',
      signal:
        'Cards forecast near ~15% of digital transactions by 2028, from ~21% in 2023',
      note: 'Integrating wallets and crypto-linked products at the edge',
    },
  ],
  implications: [
    'In Asia, LatAm, and Africa, design for account-to-account and wallet checkout first. Cards are the fallback.',
    'Price the full cost of settlement — fee, FX, delay, and failure — not sticker MDR alone. Instant rails change working-capital math.',
    'Treat stablecoins as a treasury and corridor option for B2B cross-border, not a speculative sidebar.',
    'Ship compliance and data layers as products: every new rail multiplies KYC/AML and analytics demand.',
    'Watch government instant systems as both platform risk and distribution opportunity. Share can move in months.',
    'Shortlist providers by corridor reality — coverage, rails, fees, reliability — not by pitch-deck narrative.',
  ],
  closing:
    'Wallets are headed toward roughly 61% of digital transactions by 2028. Instant rails keep compounding. Emerging markets are exporting the playbook. Fintech already owns much of the consumer interface. The next contest is infrastructure, intelligence, and B2B efficiency — against a $35 trillion daily flow that does not wait for slow settlers.',
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
  }
