import type { DataReport } from './reports'

/** Asia Pacific deep dive from operator brief. Hyphens stripped from copy. */
export const asiaPacificReport: DataReport = {
  slug: 'asia-pacific-payment-rails',
  title: 'Asia Pacific Deep Dive: The World Financial Powerhouse Waking Up',
  seoTitle: 'Asia Pacific Deep Dive: Fintech, Gaps, and 12 Markets | Relay Research',
  seoDescription: 'Asia Pacific deep dive: $43T GDP, $13T daily volume, fintech rails, country gaps, foreign setup, government demand, culture, and where operators can still win.',
  seoKeywords: ['Asia Pacific deep dive','Asia fintech powerhouse','UPI PromptPay PayNow BI FAST QRIS','SME cross border payments Asia','Singapore Hong Kong fintech hub','Indonesia Vietnam Philippines fintech','China SAFE capital controls','Asia supply chain finance'],
  dek: 'The Asia Pacific region is not just large. It is the economic center of the world. Here is what that means operationally across production, fintech, gaps, setup, and demand.',
  kicker: 'Relay Research · Asia Pacific Deep Dive',
  excerpt: 'A full Asia Pacific deep dive covering economic scale, history, fintech players, country gaps, foreign company setup, government targets, culture, and where operators can still win.',
  category: 'Market maps',
  market: 'Asia-Pacific',
  publishedAt: '2026-08-18',
  updatedAt: '2026-08-18',
  readMinutes: 42,
  heroImage: { src: '/reports/asia-pacific-hero.png', alt: 'Hong Kong harbour and skyline at golden hour across an Asia Pacific trade and finance hub', caption: 'Trade, settlement, and skyline density in a region that clears a disproportionate share of global activity across many national systems.' },
  heroStat: { label: 'Daily APAC volume', value: '$13.17T', delta: '43% of global daily stack', tone: 'up' },
  metrics: [
    { label: 'Combined GDP', value: '$43.12T', delta: '37% of world', tone: 'flat' },
    { label: 'Population', value: '4.7B', delta: '60% of world', tone: 'flat' },
    { label: 'Daily volume', value: '$13.17T', delta: '43% of global', tone: 'up' },
    { label: 'Fintech market', value: '$167.7B', delta: 'Toward $348B by 2031', tone: 'up' },
  ],
  keyTakeaways: [
    'Asia Pacific is already the center: $43.12T GDP, $13.17T daily volume, 4.7B people. It is twelve plus markets, not one.',
    'Governments built the rails (UPI, PromptPay, PayNow, BI FAST, QRIS, DuitNow). Fintech builds on top. Cross border connection is still missing.',
    'Proven money follows super apps, BNPL, digital banks, and ecommerce embedded finance. Unproven upside sits in SME cross border, supply chain finance, rail integration, tokenization, and alternative credit.',
    'China is mature inside and constrained outbound. Singapore and Hong Kong remain the cleanest hubs. Southeast Asia and India hold the growth and inclusion story.',
  ],
  overview: 'This report walks Asia Pacific as an operator map: scale and production, how the region became the center, who plays in fintech, where the gaps are by country, how foreigners set up, what governments and markets want, how culture differs, and what that means for builders, investors, and corporations.',
  findings: [
    {
      title: 'Asia is the market, not a side quest',
      body: 'Combined GDP near $43T and daily volume near $13T mean operators who treat Asia as optional are already late.',
      stat: { value: '$43.12T', label: 'GDP nominal' },
      compareStats: [{ value: '$13.17T', label: 'Daily volume' }],
    },
    {
      title: 'Governments built the rails',
      body: 'UPI, PromptPay, PayNow, BI FAST, QRIS, and DuitNow democratize infrastructure. Companies compete on experience and credit, not on owning the switch.',
      stat: { value: 'Gov rails', label: 'Public infrastructure' },
      compareStats: [{ value: 'Fintech UX', label: 'Built on top' }],
    },
    {
      title: 'Cross border is the last frontier',
      body: 'Domestic instant rails work. Connecting them does not. SME cross border and supply chain finance remain broken at scale.',
      stat: { value: '$15.8T', label: 'SME XB market' },
      compareStats: [{ value: '$415B', label: 'Asia SCF' }],
    },
    {
      title: 'Proven models already have capital',
      body: 'Super apps, BNPL, digital banks, and ecommerce lending are funded. New capital wins on the unproven gaps.',
      stat: { value: 'Grab class', label: 'Proven' },
      compareStats: [{ value: 'XB / SCF', label: 'Open gaps' }],
    },
  ],
  sections: [
      {
        heading: 'Asia Pacific is the economic center of the world',
        body: 'The Asia Pacific region is not just large. It is the economic center of the world. Yet many operators outside this region still do not fully grasp what that means operationally.',
        paragraphs: [
          'Combined GDP sits at $43.12 trillion nominal and $102.71 trillion on a purchasing power basis. Daily transactional volume is $13.17 trillion. That is 37% of world GDP and 43% of daily global transaction volume. Population: 4.7 billion people, 60% of the world.',
          'If Asia Pacific were its own country, it would be the world economy by a massive margin. But it is not one country. It is twelve plus distinct markets, each with different regulations, payment infrastructure, and growth trajectories.',
        ],
        pullQuote: 'This is not a region with potential. This is a region already producing at a scale that dwarfs most developed nations.',
      },
      {
        heading: 'Where Asia produces',
        body: 'The depth of production happening in this region is staggering.',
        paragraphs: [
          'China produces $6+ trillion in daily transaction volume alone. It manufactures roughly 28% of all global goods. Semiconductors, electronics, textiles, chemicals: China is the factory floor of the world. Yet for all that production, the fintech innovation has not matched the scale.',
          'Japan handles $800 billion daily in transactions and is home to the world third largest stock market, the Nikkei 225. It pioneered advanced manufacturing, robotics, and automotive excellence.',
          'India processes 13 billion transactions per month through UPI alone (Unified Payments Interface). It is becoming the back office for global tech companies and is home to the world fastest growing startup ecosystem.',
          'Indonesia produces electronics, palm oil, textiles, and raw materials. It has 278 million people, the 4th largest population globally. Its fintech ecosystem is the fastest growing in Southeast Asia.',
          'Vietnam is becoming the China alternative for manufacturing. It is capturing displaced supply chains fleeing US China trade tensions. Thailand is a regional trade hub, manufacturing center, and tourism powerhouse, with 35 million plus international visitors annually. Singapore is the financial hub of Southeast Asia, handling $383 billion in daily FX trading. South Korea is a semiconductor and EV manufacturing leader, with Samsung and Hyundai as global powerhouses.',
        ],
      },
      {
        heading: 'A quick history: how Asia became the center',
        body: 'To understand where Asia is now, you need to understand where it was.',
        paragraphs: [
          'For the majority of the 20th century, Asia was not the financial center. The Western world was. Europe and North America controlled global trade, finance, and innovation. Developing Asian economies were largely suppliers of raw materials and cheap labor to Western companies. The payment systems, the banks, the stock markets: all Western controlled.',
          'The shift happened gradually but then suddenly. In the 1970s and 80s, Japan emerged as a manufacturing powerhouse. By the 1990s, it was the world second largest economy. In the 2000s, China opened up and began capturing global manufacturing. By 2010, Asia had become the factory of the world. By 2020, it became the financial center of the world too.',
        ],
      },
      {
        heading: 'The growth trajectory and the digital leap',
        body: 'GDP share rose steadily. The real inflection was digital transformation.',
        paragraphs: [
          'From 2000 to 2010, Asia share of global GDP went from 20% to 30%. From 2010 to 2020 it grew from 30% to 35%. From 2020 to 2026 it reached 37% and continues to grow.',
          'But the real inflection point was not GDP growth. It was digital transformation. When smartphones arrived, Asia did not just adopt them. It leapfrogged traditional banking entirely. India built UPI, a government backed real time payments system. China built Alipay and WeChat Pay, covering 90%+ of online transactions. Southeast Asia built instant payment systems across every country: PromptPay, PayNow, QRIS, and more.',
          'The West still relied on credit cards and traditional banking. Asia moved to digital native payments overnight.',
        ],
        table: {
          columns: ['Period', 'Asia share of global GDP'],
          rows: [
            ['2000 to 2010', '20% to 30%'],
            ['2010 to 2020', '30% to 35%'],
            ['2020 to 2026', 'Reached 37% and rising'],
          ],
        },
      },
      {
        heading: 'Where Asia is targeting now',
        body: 'The region governments have explicit targets. Financial technology is no longer a nice to have. It is a national strategy.',
        paragraphs: [
          'India targets digital financial inclusion for 500M+ unbanked people. Vietnam targets supply chain hub status by capturing displaced manufacturing from China. Indonesia targets fintech leadership and unicorn status for multiple startups. Thailand targets regional payments hub status, making PromptPay the standard for ASEAN. Singapore targets crypto and blockchain innovation hub status as explicit government strategy. China targets domestic tech dominance plus Belt and Road financial integration, exporting the yuan. Japan targets an aging population pivot through automation, robotics, and institutional fintech.',
        ],
        pullQuote: 'Financial technology is no longer a nice to have. It is a national strategy.',
      },
      {
        heading: 'Fintech options: the big players and their volumes',
        body: 'Who plays, who does not, and who already is infrastructure.',
        paragraphs: [
          'In China, Alipay takes 50 to 55% of Chinese digital transactions and WeChat Pay takes 35 to 40%. Combined they hold 90%+ market dominance. Daily volume they handle is hard to quantify precisely, but estimates land around $2 to $3 trillion daily just in China. These are not startups. They are infrastructure. Alipay sits in the Alibaba ecosystem. WeChat Pay sits in Tencent. They function as payment rails that have already matured.',
          'In India, UPI runs 13 billion transactions per month, about 57% of all Indian transactions, reaches 500M+ of the previously unbanked population, and is zero fee and government built. Daily volume sits near $1.5 trillion. UPI is unique. It is not a company. It is a government built payment system that any fintech can build on top of. The architecture forces innovation rather than consolidation.',
          'Across Southeast Asia, government instant payment rails include PromptPay in Thailand (24/7 instant settlement, free), PayNow in Singapore (real time, linked to phone or ID), BI FAST in Indonesia (central bank instant system), DuitNow in Malaysia (24/7 real time settlement), and InstaPay and PESONet in the Philippines. Combined daily volume sits near $1.2 trillion. Governments build the rails. Fintech builds consumer experience on top. That democratizes payment infrastructure.',
        ],
        table: {
          columns: ['Market', 'Rail or player', 'Signal'],
          rows: [
            ['China', 'Alipay and WeChat Pay', '90%+ digital dominance'],
            ['India', 'UPI', '13B transactions a month'],
            ['Thailand', 'PromptPay', '24/7 free instant'],
            ['Singapore', 'PayNow', 'Real time phone or ID'],
            ['Indonesia', 'BI FAST', 'Central bank instant'],
            ['Malaysia', 'DuitNow', '24/7 real time'],
            ['Philippines', 'InstaPay and PESONet', 'Real time plus batch'],
          ],
        },
      },
      {
        heading: 'The scaling fintechs',
        body: 'Super apps, digital banks, BNPL, and ecommerce credit are where growth is already compounding.',
        paragraphs: [
          'Super apps combine payment and ecosystem. Grab across Southeast Asia does ride hailing plus payments plus financial services. Gojek in Indonesia runs a similar model. Kakao in South Korea combines payment, social, and commerce. Momo in Vietnam is a wallet plus ecosystem with 50M+ users.',
          'Digital banks are scaling fast. Tonik Bank in the Philippines reached 2M users in 3 years, the fastest growing digital bank in Southeast Asia. Kakao Bank in South Korea has 40M+ users with full banking services. Jago in Indonesia is a neobank reaching millions. OCBC Digital Bank covers Singapore and the wider region.',
          'BNPL (Buy Now Pay Later) includes Kredivo in Indonesia, Fintech in the Philippines, and Atome across five countries. Market size is framed near $450 billion globally with about 25% annual growth.',
          'On lending and credit, ecommerce platforms originating SME loans (Tokopedia, Shopee in Indonesia, Lazada across Southeast Asia) are originating more SME loans than traditional banks. They use transaction data instead of credit bureaus.',
        ],
        bullets: [
          'Super apps: Grab, Gojek, Kakao, Momo',
          'Digital banks: Tonik, Kakao Bank, Jago, OCBC Digital',
          'BNPL: Kredivo, Fintech, Atome',
          'Ecommerce credit: Tokopedia, Shopee, Lazada beating banks on SME loans',
        ],
      },
      {
        heading: 'Who is underserved: the gaps',
        body: 'The domestic rails are ahead. Cross border, supply chain finance, and thin file credit are not.',
        paragraphs: [
          'SME cross border payments sit near a $15.8 trillion annual market, and current solutions are all broken. Letters of Credit cost 1 to 3%, take 3 to 5 days, and require Fortune 500 status to access. Alibaba Trade Assurance only works on Alibaba with 1 to 2 day settlement. Wire transfer is fast but has no fraud protection. PayPal charges 4 to 5% fees and is not officially supported in many Asian countries. Nobody has solved this at scale.',
          'Supply chain finance for SMEs is a $415 billion market in Asia growing about 7% annually. Today it mostly works for Fortune 500. What is needed is digital supply chain financing that works for 50 person manufacturing companies.',
          'Cross border B2B between Asian countries is still fragmented. UPI, PromptPay, PayNow, QRIS, and DuitNow all exist but do not connect to each other. Project Nexus was supposed to solve this but remains slow. The impact: $1.2T+ in Southeast Asia daily volume stays inefficient.',
          'Real estate tokenization is emerging. Illiquid real estate in Vietnam, Bali, and the Philippines creates an opening for fractional ownership via blockchain for $5K investments instead of a $500K requirement. Alternative credit scoring is already working in pieces: 500M+ unbanked people have no credit history, yet Indonesia ecommerce platforms already originate more loans than banks using ecommerce data, mobile payments, and utility bills, though not yet at optimal scale.',
        ],
        pullQuote: 'Nobody has solved SME cross border payments at scale. That gap is still open.',
      },
      {
        heading: 'Hidden countries with promise',
        body: 'Most fintech funding flows to China, India, Singapore, and Vietnam. Population plus underserved demand elsewhere still waits.',
        paragraphs: [
          'The Philippines has about 120 million people who are young, growing, and English speaking. Tonik Bank reached 2M users in 3 years. GCash holds 92M+ wallets. The gap: a BPO hub that needs better cross border payments for 1.3M workers sending remittances, plus supply chain finance for SME suppliers to global companies.',
          'Pakistan has about 230 million people and just moved from a crypto ban to a regulated framework in 2026. The gap is digital financial inclusion and cross border payments. Bangladesh has about 170 million people. bKash dominates mobile money with 100M+ users. The gap is cross border labor payments and supply chain finance for the largest garment manufacturing hub globally.',
        ],
      },
      {
        heading: 'China: trapped wealth, broken cross border',
        body: 'China produces $6+ trillion daily in transaction volume. Crypto is banned. SAFE restricts money leaving. The gap is outbound.',
        paragraphs: [
          'The paradox: China produces enormous daily volume, yet crypto is completely banned, capital controls restrict money leaving, cross border RMB payments require government approval, and fintech companies face increasing government scrutiny.',
          'A tiny slice of China daily volume is massive. China exports $3.5+ trillion annually. SMEs importing from China face 5 to 10% hidden costs through fees, FX markup, and delays. Current methods: Letter of Credit (expensive, slow), Alibaba Trade Assurance (restricted), wire transfer (risky).',
          'What is needed is a one platform SME importer hub that handles payment security (escrow), FX at tight spreads, settlement in days not weeks, and supplier verification. Why it has not been built: regulatory friction plus capital controls make it difficult to move money internationally. China internal payment infrastructure is mature. The gap is outbound, getting money out for cross border payments.',
        ],
      },
      {
        heading: 'India: fintech gold, unbanked silver',
        body: 'UPI dominates. Cross border, remittances, B2B trade, and supply chain finance for SMEs are still broken.',
        paragraphs: [
          'What is working: UPI at 13B transactions a month, 500M+ people getting digital access, fintech lending platforms originating massive volumes, and a booming startup ecosystem in Bengaluru and Mumbai.',
          'What is broken: cross border payments still expensive and slow (banks charge 1 to 3% for cross border wire); remittances, with India receiving $120+ billion annually through expensive methods; B2B trade payments still on legacy banking; supply chain finance barely exists for SME suppliers.',
          'Who is underserved: agricultural suppliers, SME exporters, remittance senders currently paying 2 to 5% Western Union type fees, and supply chain participants from farmers to distributors to retailers. The government wants to expand UPI to global payments (RBI wants UPI to rival SWIFT), include 500M+ unbanked people, drive export led growth, and integrate blockchain and CBDC.',
          'Opportunity size: India has 1.45 billion people. 500M+ are unbanked. Digital payment adoption is 57% of transactions. The remaining 43% in cash represents trillions in annual volume still to digitize.',
        ],
      },
      {
        heading: 'Japan: mature market, aging opportunity',
        body: 'Rich, trusted, slow. Fintech that solves for elderly users has the clearest domestic TAM.',
        paragraphs: [
          'What is working: a mature banking system, stable institutions, Nikkei 225 as one of the world largest stock markets, and high credit card penetration at about 55% of online payments.',
          'What is broken: slow innovation with legacy banking still dominant, an aging population with fewer young fintech users, conservative regulation with crypto heavily restricted and individual tax rates of 35 to 45%, and low growth near 0.6% GDP, the slowest in developed Asia.',
          'Who is underserved: elderly users who need simple trusted interfaces, cross border payment users still paying expensive banking fees, and tech startups in a culture slower than Southeast Asia. Japan is rich. Average household income is highest in Asia. But it is also aging. Fintech companies that solve for elderly users with clarity, simplicity, and security could have massive TAM. The government wants technology adoption by the elderly, regional fintech hub status competing with Singapore and Hong Kong, and stable institutional development rather than rapid disruption.',
        ],
      },
      {
        heading: 'Hong Kong: crypto bridge, capital controls escape',
        body: 'Hong Kong is the escape valve for mainland fintech and the offshore RMB settlement path that skips SAFE.',
        paragraphs: [
          'What is working: offshore RMB hub status (CNH is most liquid), crypto friendly regulation through the A S P I Re framework, gateway access to China without mainland capital controls, and digital banking licenses already issued.',
          'What is broken: geopolitical risk around autonomy, expensive operations (highest costs in Southeast Asia except Singapore), a limited domestic market of only 7.5M people, and expensive real estate with 2 to 3% yields.',
          'Who is underserved: crypto companies that can operate here but not in China, China exporters who need RMB settlement without mainland restrictions, and institutional investors who need Asia fintech access. Hong Kong is the escape valve for mainland fintech. Companies cannot operate freely in China, so they base in Hong Kong. RMB can be settled offshore without SAFE approval. That is a regulatory arbitrage opportunity. The government wants fintech innovation to compete with Singapore, crypto regulation leadership including stablecoin licenses, and RMB internationalization.',
        ],
      },
      {
        heading: 'Singapore: fintech hub, expensive haven',
        body: 'Singapore is the regional HQ launchpad. Expensive, small locally, and still the best control plane for Southeast Asia expansion.',
        paragraphs: [
          'What is working: MAS actively supports fintech and crypto, four licensed digital banks, stablecoin licenses issued in 2026, 80+ bilateral tax treaties that prevent double taxation, and PayNow as the instant payment system.',
          'What is broken: the highest cost base in Southeast Asia, a small local market of 5.9M people, and slower growth than emerging markets. Who is underserved: regional companies that need Southeast Asia expansion rather than Singapore alone, and budget conscious founders who cannot afford $3K a month rent.',
          'Singapore is the regional HQ for companies targeting all of Southeast Asia. It is expensive, but it is the best launchpad. Companies like Grab use Singapore to expand across the region. The government wants crypto and fintech hub status, regional payment rail development through Project Nexus, and financial institution headquarters for wealth management and insurance.',
        ],
      },
      {
        heading: 'Thailand: payments hub, best real estate yields',
        body: 'PromptPay made domestic payments instant. Cross border neighbors and Foreign Business Act friction are the unfinished chapters.',
        paragraphs: [
          'What is working: PromptPay 24/7 and free, SEC regulated crypto exchanges with Bitcoin, Ethereum, and Ripple approved, a super app ecosystem through Grab and GrabFinance, and tourism dominance with 35M+ visitors annually.',
          'What is broken: the Foreign Business Act with 14 restricted sectors requiring a Thai partner, complex regulations with inconsistent enforcement, PromptPay connecting domestic banks but not cross border, and cross border B2B still on legacy banking.',
          'Who is underserved: tourists facing payment friction, foreign SME importers finding Thai suppliers, cross border commerce with neighbors, and supply chain participants from farmers to exporters. Thailand is a regional trade hub inside $1.2T+ Southeast Asia daily volume. The gap is cross border between Thailand and Vietnam, Cambodia, Laos, and Myanmar. The government wants regional payments hub status, tourism digital payments, manufacturing competitiveness through supply chain finance, and BOI incentivized sectors in EVs, semiconductors, robotics, and biotech.',
        ],
      },
      {
        heading: 'Indonesia: fintech boom, hidden gaps',
        body: 'Product market fit at scale is already here. Cross border payments and remittances are the next gap.',
        paragraphs: [
          'What is working: BI FAST, ecommerce platforms (Tokopedia, Shopee) originating more loans than banks, super apps (Grab, Gojek), digital banks (Jago, Ajaib, Kredivo scaling), BNPL platforms, and 278 million people as the 4th largest population globally.',
          'What is broken: bureaucracy with complex regulations and inconsistent enforcement, a crypto framework that just moved from commodities (Bappebti) to financial products (OJK) oversight in 2025, limited cross border infrastructure, and $13B+ in remittances still moving through expensive traditional channels.',
          'Who is underserved: garment and textile workers, agricultural cooperatives, remittance senders in the Middle East and Malaysia, and Bali tourism visitors who need integrated payment systems. Indonesia is where fintech gets product market fit at scale. The next gap is cross border payments to Malaysia, Singapore, Thailand, and the Philippines. The government wants fintech unicorns, financial inclusion, supply chain finance, and digital bank maturation.',
        ],
        image: {
          src: '/reports/asia-pacific-portrait.png',
          alt: 'Vertical harbour and skyline view across an Asia Pacific financial city',
          caption: 'Density is the regional constant. Every market still keeps its own registry, tax code, and clearing rail.',
          layout: 'portrait',
        },
      },
      {
        heading: 'Vietnam: manufacturing hub, fastest growth',
        body: 'Vietnam is becoming the new China for factories. Fintech infrastructure has not caught up.',
        paragraphs: [
          'What is working: capturing displaced supply chains from China, fastest economic growth near 7.1% annually, fastest property appreciation near 8 to 15% annually, Momo dominance with 50M+ digital wallet users, and 200+ fintech startups.',
          'What is broken: banking infrastructure still catching up, limited cross border payment infrastructure for trade, foreign investment ownership rules improving but still complex, and fintech concentration around Momo while others stay small.',
          'Who is underserved: manufacturing SMEs needing supply chain finance, export oriented businesses needing cross border rails, and imported goods suppliers needing inventory financing. Manufacturing is moving here from China. Supply chain finance and cross border B2B payments are all underdeveloped. The government wants manufacturing hub status, foreign investment attraction, digital economy development, and FDI capture from the China trade war.',
        ],
      },
      {
        heading: 'Bali: high yields, leasehold risk',
        body: 'Highest rental yields in developed Asia come with leasehold tenure risk and cooling condo supply.',
        paragraphs: [
          'What is working: 5 to 10% annual real estate rental yields, a digital nomad hub with 100K+ foreigners living on cost of living arbitrage, and tourism infrastructure with 5M+ annual visitors.',
          'What is broken: foreigners cannot own land, only lease for 25 to 30 years; condo oversupply and market cooling in 2025 to 2026; difficult liquidity when selling to other foreigners; and regulatory uncertainty if ownership rules change.',
          'Who is underserved: real estate investors who want stable long term yields but face leasehold risk, the expat community needing housing and payment infrastructure, and tourists needing better digital payments. Tokenizing real estate and fractional ownership via blockchain can spread leasehold risk across many investors.',
        ],
      },
      {
        heading: 'Malaysia: stable, overlooked',
        body: 'Five digital banks and DuitNow make Malaysia denser than its funding attention suggests.',
        paragraphs: [
          'What is working: five digital banks (most in ASEAN), DuitNow, stable government and regulations, and ASEAN financial center status. What is broken: slower fintech growth than Indonesia, the Philippines, or Vietnam; more expensive than Vietnam and less innovative than Singapore; and less funding attention overall.',
          'Who is underserved: SMEs needing cross border payment infrastructure, foreign workers needing remittance solutions, and cross border traders needing integration with ASEAN rails. Malaysia is stable but overlooked. ASEAN integration is real here. Companies focusing on regional payments could use Malaysia as a base.',
        ],
      },
      {
        heading: 'South Korea: tech power, conservative fintech',
        body: 'Kakao Bank and Toss prove digital banking at tens of millions of users. Domestic tax and caution push ambition outward.',
        paragraphs: [
          'What is working: Kakao Bank with 40M+ users, Toss Bank as a payment leader, about 25.47% CAGR in the neobanking segment, and tech forward infrastructure. What is broken: 25 to 27% corporate tax, cautious crypto regulation, and slower growth than emerging markets.',
          'Who is underserved: cross border businesses needing regional fintech, and SME exporters needing international payment infrastructure. South Korea is tech forward but expensive. Companies here focus on regional expansion into Southeast Asia more than domestic saturation.',
        ],
      },
      {
        heading: 'Taiwan: semiconductor power, geopolitical risk',
        body: 'TSMC is the strategic fact. Fintech is less developed than Singapore, Hong Kong, or Southeast Asia.',
        paragraphs: [
          'What is working: TSMC with about 90% of advanced chip manufacturing globally, a strong tech ecosystem, and digital banking development. What is broken: geopolitical risk from China tensions, high capital requirements, and slow setup (2 to 4 months for business registration versus Singapore in minutes).',
          'Who is underserved: crypto businesses in a still developing framework, and cross border tech trade. Supply chain finance for semiconductor trade is underserved.',
        ],
      },
      {
        heading: 'Philippines: young population, high tax, BPO hub',
        body: 'Youngest fintech ready population in Southeast Asia, GCash density, and BPO scale under ownership caps and high headline tax.',
        paragraphs: [
          'What is working: 120M+ young people, Tonik Bank at 2M users in 3 years (fastest growing digital bank in the region), GCash at 92M+ digital wallet users, a BPO hub with 1.3M+ workers handling US and EU operations, and about 5.7% economic growth.',
          'What is broken: highest corporate tax in Asia at 37% in the source frame, foreign ownership caps and restricted sectors, and complex regulations across multiple agencies. Who is underserved: BPO workers needing cross border remittance rails, SME exporters needing international payment infrastructure, and a young population with high smartphone penetration but limited traditional banking.',
          'The Philippines has the youngest fintech ready population in Southeast Asia. Tonik proved digital banking can scale fast. The gap is cross border payments for 1.3M BPO workers and for SME exporters. The government wants fintech unicorns, digital banking maturity, financial inclusion, and BPO industry payment support.',
        ],
      },
      {
        heading: 'Setting up as a foreigner: the fast setups',
        body: 'Singapore, Hong Kong, Vietnam, and Thailand sit in the two to eight week band when filings are clean.',
        paragraphs: [
          'Singapore: about 15 minutes online for roughly $600. Literally the fastest on Earth. You can incorporate from anywhere without visiting. Tax ID is automatic. Bank account opens in 5 to 7 days. Best for crypto and fintech regional HQ and payment infrastructure.',
          'Hong Kong: 2 to 3 weeks for about $1,200. Very fast second place. No office lease required (mail forwarding OK). Companies Registry processes quickly. Best for China gateway, crypto, and regional operations.',
          'Vietnam: 6 to 10 weeks for $1,500 to $3,500. Online system now available. Simpler than Thailand or Indonesia. Need an accountant familiar with foreign business. Best for manufacturing and supply chain hub work.',
          'Thailand: 4 to 8 weeks for $1,500 to $3,000. Relatively straightforward, with Foreign Business Act complications (workaround: Board of Investment). Bank account opening is slow at 4 to 8 weeks and is the bottleneck. Best for regional hub, real estate investment, and tourism.',
        ],
      },
      {
        heading: 'Medium and complex setups',
        body: 'Indonesia, Philippines, Malaysia, Taiwan, and Korea sit mid. China, India, and Japan carry heavier friction.',
        paragraphs: [
          'Indonesia takes 8 to 12 weeks and $2,500 to $5,000, with multiple agencies, foreigner registration, and more bureaucracy than the Southeast Asia average. The Positive Investment List now allows 100% foreign ownership post 2021. Best for fintech, manufacturing, and local presence. The Philippines takes 20 to 35 days and $1,000 to $2,000, actually quite fast, but Foreign Investment Negative List restrictions apply and $200K minimum capital applies for 40%+ foreign ownership. Best for digital banking, BPO services, and the young market. Malaysia takes 4 to 8 weeks and $1,000 to $1,800. Taiwan can incorporate in 2 to 4 weeks on paper, but ARC stretches 2 to 4 months. South Korea takes 4 to 6 weeks and $1,500 to $3,000 with minimum capital near KRW 10M (about $8,000).',
          'China takes 8 to 12 weeks for services and 4 to 6 months for manufacturing at $6,500 to $8,500. WFOE is standard. SAMR approval is required. Bank account opening takes 4 to 8 weeks. Capital controls restrict repatriation (6 to 8 weeks per transaction, can be denied). The real challenge is getting money out, not getting in. India takes 6 to 8 weeks and $1,500 to $2,500, requires an India resident director (presence 182+ days in the prior year), uses MCA digital filing (SPICe+), and needs multiple tax registrations. Japan takes 4 to 6 weeks and $2,000 to $4,500 with notarization, slow banking, and multiple agency registrations.',
        ],
        bullets: [
          'Common across all: apostille or notarization, capital deposit, tax registration, employer registration if hiring, address verification, corporate banking (often the slowest step), and sector licenses if required',
        ],
        table: {
          columns: ['Market', 'Timeline', 'Cost frame', 'Best for'],
          rows: [
            ['Singapore', 'Minutes to days', 'About $600', 'Crypto, fintech HQ'],
            ['Hong Kong', '2 to 3 weeks', 'About $1,200', 'China gateway, crypto'],
            ['Vietnam', '6 to 10 weeks', '$1,500 to $3,500', 'Manufacturing hub'],
            ['Thailand', '4 to 8 weeks', '$1,500 to $3,000', 'Tourism, real estate'],
            ['Indonesia', '8 to 12 weeks', '$2,500 to $5,000', 'Fintech, local presence'],
            ['Philippines', '20 to 35 days', '$1,000 to $2,000', 'Digital banking, BPO'],
            ['Malaysia', '4 to 8 weeks', '$1,000 to $1,800', 'ASEAN hub'],
            ['China', '8 to 12 weeks+', '$6,500 to $8,500', 'Manufacturing, long term'],
            ['India', '6 to 8 weeks', '$1,500 to $2,500', 'Tech, fintech'],
            ['Japan', '4 to 6 weeks', '$2,000 to $4,500', 'Established tech'],
          ],
        },
      },
      {
        heading: 'What governments want',
        body: 'Government targets are explicit. Fintech is strategy.',
        table: {
          columns: ['Country', 'Explicit strategy'],
          rows: [
            ['India', 'Digital financial inclusion for 500M unbanked; UPI as global standard'],
            ['Vietnam', 'Supply chain hub capturing from China'],
            ['Indonesia', 'Fintech unicorn creation; inclusion for 278M people'],
            ['Philippines', 'Digital banking maturity; BPO support; fintech innovation'],
            ['Thailand', 'Regional payments hub; BOI incentivized sectors'],
            ['Singapore', 'Crypto and blockchain hub status'],
            ['Hong Kong', 'Fintech and crypto innovation; RMB internationalization'],
            ['Taiwan', 'Tech ecosystem and semiconductor supply chain'],
            ['South Korea', 'Fintech ecosystem maturity; regional hub status'],
            ['China', 'Domestic tech dominance; Belt and Road; yuan export'],
            ['Malaysia', 'ASEAN financial center; regional fintech leadership'],
            ['Japan', 'Aging population fintech; institutional fintech'],
          ],
        },
      },
      {
        heading: 'What market demand actually is',
        body: 'Below the government targets, here is what is actually being funded and built.',
        paragraphs: [
          'Consumer payments are a massive market: super apps, digital wallets (Momo 50M users, GCash 92M users), BNPL platforms growing near 25% annually, and digital banks like Tonik. Consumer demand is convenience, speed, and no fees. These markets have already moved past credit cards to instant digital payments.',
          'SME lending is a huge underserved market. Ecommerce platforms originating SME loans are beating traditional banks. Supply chain finance platforms are emerging. SMEs do not need fintech branding. They need credit, and they will take it from whoever can verify them fastest. Transaction data beats a credit bureau.',
          'Cross border trade is entirely broken. SME importers pay 5 to 10% hidden costs to get paid from China. Remittance senders pay 2 to 5% fees. Export import still uses legacy banking. Market demand is speed, cost reduction, and security. Nobody has solved this at scale.',
          'B2B domestic payments have instant rails built, but integration is missing. PromptPay, PayNow, BI FAST, QRIS, and DuitNow do not connect to each other. Market demand is one API to reach all of ASEAN.',
        ],
      },
      {
        heading: 'What companies are already building, and what they are not getting',
        body: 'Payments infrastructure, digital banks, and lending are crowded. The real gaps are still open.',
        paragraphs: [
          'Already building: Grab and Gojek as Southeast Asia super apps; Momo in Vietnam as wallet plus payments plus lending plus investment; Tonik, Kakao Bank, and Jago as digital banks; Kredivo, Fintech, Atome, and ecommerce platforms as lending and credit. These companies are looking for talent (pay up 30 to 40% in 2 years), capital for proven models, partnerships with banks, telcos, and ecommerce platforms, transaction data, and regulatory clarity.',
          'What they are not getting: unified cross border payment infrastructure for Asia; supply chain finance that works for SMEs inside a $415B market growing 7%; alternative credit for thin file merchants beyond ecommerce platforms; real estate tokenization at scale; and currency hedging products for SMEs facing FX risk on both sides of trade.',
        ],
        bullets: [
          'Gap 1: Cross border payment infrastructure',
          'Gap 2: Supply chain finance for SMEs',
          'Gap 3: Alternative credit for thin file merchants',
          'Gap 4: Real estate tokenization',
          'Gap 5: Currency hedging for SMEs',
        ],
      },
      {
        heading: 'Culture and operating environment',
        body: 'Payment culture, business culture, regulatory predictability, and talent all change by market.',
        paragraphs: [
          'China is digital native with 90%+ online transactions, Alipay and WeChat Pay ubiquitous, cash disappearing, mobile first mindset, and skepticism of Western payment systems. India was rewritten by UPI; feature phones suffice; cash still significant at 40 to 50%; trust in government systems is high; smartphone adoption is accelerating. Japan remains credit card heavy online at about 55%, with high trust in banking, cash still respected near 30%, slower digital adoption than Southeast Asia, and elderly users who need simplicity.',
          'Southeast Asia (Thailand, Vietnam, Indonesia, Philippines) is digital first and mobile first, super app native, with cash declining from 30 to 50% depending on country, having leapfrogged credit cards entirely, and young median ages in the mid twenties to thirties. Singapore and Hong Kong are fully digital, multi currency minded, fastest to adopt new fintech, crypto aware (Singapore most so), and premium on speed and security.',
          'Business culture: China prizes speed and guanxi with rising compliance and accepted surveillance norms. India is paperwork intensive but digitizing, with an English speaking advantage. Southeast Asia is relationship based with less intrusive government than China and uneven English (Philippines strongest). Singapore, Hong Kong, Japan, and South Korea are process based, documentation essential, rules based, and English widely spoken.',
        ],
      },
      {
        heading: 'Regulatory predictability and talent',
        body: 'Where rules are clear, and where talent actually sits.',
        paragraphs: [
          'Most predictable: Singapore, Hong Kong, Japan, South Korea. Moderately predictable: Thailand, Malaysia, Taiwan. Less predictable: Vietnam, Indonesia, Philippines, China, India.',
          'Best tech talent: India (Bengaluru, Hyderabad), China (Shanghai, Beijing, Shenzhen), Singapore (limited but premium). Best operational talent: Philippines BPO hub with 1.3M+ experienced English speaking workers, and India back office work. Best startup founders: Singapore fintech concentration, Hong Kong crypto founders leaving China constraints, Vietnam new generation founders, and Indonesia super app precedent.',
        ],
        bullets: [
          'Most predictable: Singapore, Hong Kong, Japan, South Korea',
          'Less predictable: Vietnam, Indonesia, Philippines, China, India',
          'Talent: India and China for tech; Philippines for BPO ops; Singapore and Hong Kong for founders and HQ',
        ],
      },
      {
        heading: 'The scale and the inflection points',
        body: 'Asia Pacific daily transaction volume is $13.17 trillion, about 43% of the world $35T daily stack. Fintech market size sits near $167.71 billion in 2026, growing toward $348.1B by 2031.',
        paragraphs: [
          'Asia GDP is $43.12 trillion, about 37% of a $116T global frame. Population is 4.7 billion, 60% of the world. Translation: Asia is not a market to explore. It is the market. It has roughly 10x the fintech opportunity of Europe or the US by scale.',
          'Digital payment adoption moved from basic infrastructure (2000 to 2010), to full digital with Alipay, WeChat, and UPI (2010 to 2020), to super apps and instant payments with PromptPay, PayNow, BI FAST, and QRIS (2020 to 2026). Next: integration of cross border rails, tokenization, and alternative credit at scale.',
          'Governments went from experimental (2015 to 2020) to all in (2020 to 2026), building payment rails, issuing crypto licenses, and targeting unicorns. Fintech is now government strategy. Capital followed: VC cautious, then doubling down (Grab $40B+ valuation, fintech funding records), then chasing proven models in super apps, BNPL, and digital banks.',
        ],
      },
      {
        heading: 'Proven models and unproven opportunities',
        body: 'Money is following proven models. New capital can still win on the unproven gaps.',
        paragraphs: [
          'Proven: super apps (Grab, Gojek) combining ride hailing, payments, and finance into a defensible moat; BNPL platforms (Kredivo, Fintech) with 25% annual growth and proven unit economics; digital banks (Tonik, Kakao) filling the bank gap for young populations; ecommerce embedded finance (Tokopedia, Shopee) using transaction data to beat traditional credit.',
          'Unproven opportunities where new capital can win: cross border SME payments ($15.8T market, nobody solved); supply chain finance for SMEs ($415B market, 7% growth, underserved); regional B2B payment integration ($1.2T+ daily, fragmented rails); real estate tokenization (emerging, no leaders yet); alternative credit at scale (ecommerce figured it out, traditional sector has not).',
        ],
        table: {
          columns: ['Opportunity', 'Market frame', 'Status'],
          rows: [
            ['Cross border SME payments', '$15.8T annually', 'Nobody solved at scale'],
            ['Supply chain finance for SMEs', '$415B, growing 7%', 'Fortune 500 only'],
            ['Regional B2B rail integration', '$1.2T+ daily SE Asia', 'Fragmented'],
            ['Real estate tokenization', 'Emerging', 'No scale leaders'],
            ['Alternative credit at scale', '500M+ thin file', 'Partial, ecommerce led'],
          ],
        },
      },
      {
        heading: 'The biggest surprises in the data',
        body: 'Five facts that rewrite how operators should think about Asia.',
        paragraphs: [
          'Fintech did not disrupt Asia like it disrupted the West. Asia skipped credit cards entirely and went straight to digital. That is a fundamental difference in infrastructure.',
          'Governments built the payment rails, not companies. UPI, PromptPay, BI FAST, QRIS, PayNow: all government built. That democratizes innovation.',
          'Ecommerce platforms are the real fintech disruptors. They beat banks at SME lending because they have transaction data. Tokopedia, Shopee, and Lazada originate more SME loans than traditional banks.',
          'Cross border payments are still broken. Despite all the innovation, moving money between Asian countries is still expensive and slow. This is the last frontier.',
          'China success has an expiration date for open fintech innovation. Capital controls and a crypto ban mean fintech innovation is moving to Singapore, Hong Kong, and Southeast Asia. China built the infrastructure but cannot innovate freely within it.',
        ],
      },
      {
        heading: 'What this means for operators, investors, and corporations',
        body: 'Pick the job. Then pick the market.',
        paragraphs: [
          'If you are building fintech: pick a market with government support (India, Southeast Asia, Singapore). Avoid China unless you are in manufacturing or institutional finance. Pick proven models (super apps, BNPL, digital banks) or massive underserved gaps (cross border, supply chain finance). Talent is abundant and cheaper in India, Indonesia, and the Philippines. Regulatory clarity matters: Singapore and Hong Kong best; Vietnam and Thailand riskier.',
          'If you are looking to invest: real estate yields point to Thailand (7 to 9%), Bali (5 to 10% with leasehold risk), and Vietnam (2 to 4% current yield with 8 to 15% appreciation). Fintech growth points to the Philippines (Tonik model), Indonesia (super apps, BNPL), and Vietnam (200+ startups). Stock return frames point to Vietnam 12 to 15% annual, India 10 to 14%, with emerging markets outperforming developed in the planning ranges.',
          'If you are a corporation expanding: Singapore is the hub (expensive but efficient). India is the talent back office (massive workforce, cheaper). Southeast Asia is the growth market (young population, underbanked). China is the factory still, but capital controls make repatriation painful.',
        ],
      },
      {
        heading: 'The real opportunity',
        body: 'Asia does not need another global payments company. It needs execution on the gaps.',
        paragraphs: [
          'What is needed: cross border integration connecting PromptPay to PayNow to BI FAST; supply chain finance automation that works for SMEs, not just Fortune 500; alternative credit at scale using transactional data to reach the unbanked; real estate tokenization solving illiquidity in emerging markets; and regional super apps that move money across five plus countries.',
          'These gaps represent $100B+ in value creation opportunity. The capital is available. The fintech talent is available. The payment rails exist. What is missing is execution on the gaps, not building a faster credit card or payment app.',
        ],
        pullQuote: 'This region is not emerging. It is already emerged. The question for fintech operators is: what gap will you fill?',
      },
  ],
  marketContext: [
    'Asia Pacific: $43.12T GDP, $13.17T daily volume, 4.7B people, fintech market near $168B growing toward $348B by 2031.',
    'Domestic rails are mature across India and ASEAN. Cross border integration, SME supply chain finance, and thin file credit remain open.',
    'Singapore and Hong Kong are hub cities. China is scale with outbound friction. India and Southeast Asia hold inclusion and growth.',
    'Proven capital follows super apps, BNPL, digital banks, and ecommerce credit. Unproven upside sits in the gaps.',
  ],
  providerLandscape: [
    {
      metric: 'China domestic wallets', leader: 'Alipay and WeChat Pay', value: 'Leading', tone: 'up',
      signal: '90%+ digital dominance', note: 'Outbound is the gap',
    },
    {
      metric: 'India public A2A', leader: 'UPI', value: 'Leading', tone: 'up',
      signal: '13B transactions a month', note: 'Any fintech can build on top',
    },
    {
      metric: 'ASEAN instant rails', leader: 'PromptPay, PayNow, BI FAST, DuitNow, InstaPay', value: 'Leading', tone: 'up',
      signal: 'Near $1.2T combined daily', note: 'Not yet connected',
    },
    {
      metric: 'Super apps', leader: 'Grab, Gojek, Kakao, Momo', value: 'Leading', tone: 'up',
      signal: 'Payments plus ecosystem', note: 'Proven capital magnet',
    },
    {
      metric: 'Digital banks', leader: 'Tonik, Kakao Bank, Jago', value: 'Gaining', tone: 'up',
      signal: 'Young population scale', note: 'Still filling bank gaps',
    },
  ],
  implications: [
    'Treat Asia Pacific as the primary market map, not an expansion afterthought.',
    'Build on government rails instead of trying to replace them.',
    'Win on cross border SME payments, supply chain finance, rail integration, tokenization, or alternative credit.',
    'Use Singapore or Hong Kong as hub entities unless a regulator forces otherwise.',
    'Treat China outbound and SAFE as first class product risk.',
    'Match talent strategy to market: India and China for tech, Philippines for BPO ops, Singapore and Hong Kong for HQ.',
    'Follow proven models for near term capital, or name a specific unproven gap if you want open white space.',
  ],
  closing: 'This region is not emerging. It is already emerged. The question for fintech operators is: what gap will you fill?',
  methodology: 'Operator deep dive covering Asia Pacific scale, history, fintech landscape, country gaps, foreign setup, government and market demand, culture, and takeaways. Macro and volume figures are directional planning inputs. Not legal, tax, or investment advice.',
  sources: [
    'Asia Pacific operator deep dive brief (Aug 2026)',
    'NPCI UPI; NAPAS; Bank Indonesia BI FAST and QRIS; MAS PayNow; BOT PromptPay; Bank Negara DuitNow; BSP InstaPay and PESONet',
    'Public company, tax, and licensing headlines across the twelve markets',
    'Industry APAC payments, remittance, and macro trackers',
  ],
  cta: { title: 'Building across Asia Pacific?', lede: 'Relay turns this deep dive into corridor shortlists: economy, entity, rail, and provider coverage in one frame.', label: 'Contact sales', href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08' },
  discoverMarket: 'Asia-Pacific',
}
