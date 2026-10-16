// @ts-nocheck
/* eslint-disable */
/**
 * Shared Provider dataset, ported verbatim from the design handoff (relay-data.js).
 * Deterministic, so it renders identically on server and client.
 */

const CAT = {
  collections: { label: 'Collections', accent: '#6fe3b4', count: 214 },
  payouts: { label: 'Payouts', accent: '#d6ee4e', count: 268 },
  fx: { label: 'FX', accent: '#8fb8ff', count: 183 },
  cards: { label: 'Cards', accent: '#b9a3ff', count: 247 },
  kyc: { label: 'KYC', accent: '#ffab7a', count: 372 },
  bank: { label: 'Banks', accent: '#ff8fb1', count: 316 }
};
const TOTAL = Object.values(CAT).reduce((a, c) => a + c.count, 0);
const REGIONS = ['Europe', 'North America', 'Asia-Pacific', 'Latin America', 'Middle East', 'Africa', 'Central Asia', 'Caribbean'];
const REG = { 'United Kingdom': 'FCA', Ireland: 'CBI', Netherlands: 'DNB', Germany: 'BaFin', France: 'ACPR', Switzerland: 'FINMA', Estonia: 'EFSA', Denmark: 'DFSA', Italy: 'Banca d’Italia', Norway: 'Finanstilsynet', Spain: 'Banco de España', Poland: 'KNF', Austria: 'FMA', 'United States': 'OCC', Canada: 'FINTRAC', Chile: 'CMF', Brazil: 'BCB', Argentina: 'BCRA', Mexico: 'CNBV', Colombia: 'SFC', Singapore: 'MAS', Japan: 'JFSA', Australia: 'ASIC', 'South Korea': 'FSC', India: 'RBI', 'New Zealand': 'RBNZ', 'Hong Kong': 'HKMA', 'United Arab Emirates': 'CBUAE', 'Saudi Arabia': 'SAMA', Qatar: 'QCB', Bahrain: 'CBB', 'South Africa': 'SARB', Kenya: 'CBK', Kazakhstan: 'AFSA', Uzbekistan: 'CBU', Bahamas: 'CBOB', Barbados: 'FSC' };
const RAW = [
  ['tidepool', 'Tidepool Pay', 'collections', 'Netherlands', 'Europe'], ['harbor', 'Harbor Collect', 'collections', 'United Kingdom', 'Europe'],
  ['ledgerline', 'Ledgerline', 'payouts', 'Ireland', 'Europe'], ['swiftrail', 'Swiftrail', 'payouts', 'United Kingdom', 'Europe'],
  ['meridian', 'Meridian FX', 'fx', 'United Kingdom', 'Europe'], ['cobalt', 'Cobalt Markets', 'fx', 'Switzerland', 'Europe'],
  ['northbeam', 'Northbeam Cards', 'cards', 'United Kingdom', 'Europe'], ['ivory', 'Ivory Issuing', 'cards', 'France', 'Europe'],
  ['kestrel', 'Kestrel Identity', 'kyc', 'Estonia', 'Europe'], ['veritas', 'Veritas ID', 'kyc', 'Germany', 'Europe'],
  ['nordhavn', 'Nordhavn Bank', 'bank', 'Denmark', 'Europe'], ['albion', 'Albion Trust Bank', 'bank', 'United Kingdom', 'Europe'],
  ['lucerna', 'Banca Lucerna', 'bank', 'Italy', 'Europe'], ['helix', 'Helix Clearing Bank', 'bank', 'Germany', 'Europe'],
  ['fjord', 'Fjord Pay', 'collections', 'Norway', 'Europe'], ['iberia', 'Iberia Payouts', 'payouts', 'Spain', 'Europe'],
  ['vistula', 'Vistula FX', 'fx', 'Poland', 'Europe'], ['alpine', 'Alpine Identity', 'kyc', 'Austria', 'Europe'],
  ['lumen', 'Lumen Billing', 'collections', 'United States', 'North America'], ['northgate', 'Northgate Payouts', 'payouts', 'Canada', 'North America'],
  ['atlas', 'Atlas Exchange', 'fx', 'United States', 'North America'], ['quanta', 'Quanta Cards', 'cards', 'United States', 'North America'],
  ['proofline', 'Proofline', 'kyc', 'United States', 'North America'], ['granite', 'Granite National Bank', 'bank', 'United States', 'North America'],
  ['mapleridge', 'Maple Ridge Bank', 'bank', 'Canada', 'North America'], ['beacon', 'Beacon Treasury Bank', 'bank', 'United States', 'North America'],
  ['cascade', 'Cascade Collect', 'collections', 'United States', 'North America'], ['hudson', 'Hudson Issuing', 'cards', 'United States', 'North America'],
  ['andes', 'Andes Pay', 'collections', 'Chile', 'Latin America'], ['rio', 'Rio Payouts', 'payouts', 'Brazil', 'Latin America'],
  ['pampa', 'Pampa FX', 'fx', 'Argentina', 'Latin America'], ['azteca', 'Azteca Cards', 'cards', 'Mexico', 'Latin America'],
  ['solano', 'Banco Solano', 'bank', 'Colombia', 'Latin America'], ['lumio', 'Lumio ID', 'kyc', 'Brazil', 'Latin America'],
  ['arcadia', 'Arcadia Pay', 'collections', 'Singapore', 'Asia-Pacific'], ['kairo', 'Kairo Transfer', 'payouts', 'Japan', 'Asia-Pacific'],
  ['pacifica', 'Pacifica FX', 'fx', 'Australia', 'Asia-Pacific'], ['sakura', 'Sakura Issuing', 'cards', 'Japan', 'Asia-Pacific'],
  ['orbis', 'Orbis Verify', 'kyc', 'Singapore', 'Asia-Pacific'], ['coral', 'Coral Bank', 'bank', 'Australia', 'Asia-Pacific'],
  ['hanriver', 'Han River Bank', 'bank', 'South Korea', 'Asia-Pacific'], ['lotus', 'Lotus Payouts', 'payouts', 'India', 'Asia-Pacific'],
  ['tasman', 'Tasman Collect', 'collections', 'New Zealand', 'Asia-Pacific'], ['jade', 'Jade Harbour Bank', 'bank', 'Hong Kong', 'Asia-Pacific'],
  ['monsoon', 'Monsoon ID', 'kyc', 'India', 'Asia-Pacific'], ['gulfline', 'Gulfline FX', 'fx', 'United Arab Emirates', 'Middle East'],
  ['dunes', 'Dunes Identity', 'kyc', 'Saudi Arabia', 'Middle East'], ['oasis', 'Oasis Bank', 'bank', 'Qatar', 'Middle East'],
  ['falcon', 'Falcon Pay', 'collections', 'United Arab Emirates', 'Middle East'], ['manama', 'Manama Payouts', 'payouts', 'Bahrain', 'Middle East'],
  ['capemeridian', 'Cape Meridian Bank', 'bank', 'South Africa', 'Africa'], ['kilima', 'Kilima Pay', 'collections', 'Kenya', 'Africa'],
  ['steppe', 'Steppe Bank', 'bank', 'Kazakhstan', 'Central Asia'], ['silkroad', 'Silk Road Payouts', 'payouts', 'Uzbekistan', 'Central Asia'],
  ['coralline', 'Coralline Bank', 'bank', 'Bahamas', 'Caribbean'], ['antilles', 'Antilles Pay', 'collections', 'Barbados', 'Caribbean']
];
const h = s => { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0) / 4294967295; };
const pick = (arr, r) => arr[Math.floor(r * arr.length) % arr.length];
const T = {
  collections: { lic: 'E-money institution', price: r => (0.15 + r * 0.25).toFixed(2) + '% + €0.10', settle: ['T+0', 'T+1', 'T+2'], rails: ['SEPA', 'SEPA Instant', 'ACH', 'Cards', 'Open banking', 'iDEAL', 'Faster Payments', 'PayNow', 'Pix'], desc: 'Accept bank transfers, cards and local methods with real-time reconciliation and automated matching.', why: ['Real-time reconciliation webhooks', 'Lowest blended acceptance cost', 'Broad local payment methods', 'Fast merchant onboarding'] },
  payouts: { lic: 'Payment institution', price: r => (0.2 + r * 0.3).toFixed(2) + '%', settle: ['Instant', 'Same day', 'T+1'], rails: ['SEPA Instant', 'SWIFT', 'Faster Payments', 'Wallets', 'RTP', 'Interac', 'Zengin', 'UPI'], desc: 'Send mass and on-demand payouts to bank accounts and wallets in local currency with full status tracking.', why: ['Instant settlement on major corridors', 'Widest corridor coverage', 'Flat, predictable fees', 'Strong payout status API'] },
  fx: { lic: 'Authorised payment institution', price: r => (0.08 + r * 0.17).toFixed(2) + '% spread', settle: ['Same day', 'T+1', 'T+2'], rails: ['Spot', 'Forwards', 'FIX API', 'Multi-currency accounts', 'Rate locks'], desc: 'Convert and hold currencies with transparent spreads, forwards and multi-currency accounts for treasury teams.', why: ['Tightest spread on majors', 'Forwards and rate locks', 'FIX API for treasury', 'Local settlement in key markets'] },
  cards: { lic: 'Card issuing principal member', price: r => '€' + (0.2 + r * 0.6).toFixed(2) + ' / card', settle: ['Real time'], rails: ['Visa', 'Mastercard', 'Virtual', 'Physical', 'Tokenisation', 'Commercial'], desc: 'Issue virtual and physical cards with spend controls, real-time authorisation and tokenised wallets.', why: ['Real-time authorisation hooks', 'Fast BIN sponsorship', 'Rich spend controls', 'Apple Pay and Google Pay ready'] },
  kyc: { lic: 'Registered data processor', price: r => '$' + (0.3 + r * 0.6).toFixed(2) + ' / check', settle: ['3.8s median', '4.6s median', '6.2s median'], rails: ['Documents', 'Biometrics', 'Liveness', 'AML screening', 'KYB', 'Video ident'], desc: 'Verify people and businesses with document checks, biometrics and ongoing sanctions screening.', why: ['Fastest median verification', 'Strong liveness detection', 'KYB and AML in one API', 'Widest document coverage'] },
  bank: { lic: 'Full banking licence', price: r => '€' + Math.round(80 + r * 220) + ' / month', settle: ['Same day', 'Instant', 'T+1'], rails: ['Safeguarding', 'Virtual IBANs', 'Correspondent banking', 'Sponsor bank', 'Deposits', 'Lending'], desc: 'Regulated banking partner offering safeguarding accounts, virtual IBANs and sponsorship for fintech programmes.', why: ['Fintech-friendly sponsor bank', 'Virtual IBANs at scale', 'Correspondent network', 'Fast account opening'] }
};
const CERTS = ['SOC 2 Type II', 'ISO 27001', 'PCI DSS Level 1', 'GDPR'];
const providers = RAW.map(([id, name, kind, hq, region]) => {
  const t = T[kind], r = k => h(id + k);
  const countries = kind === 'kyc' ? Math.round(110 + r('c') * 85) : kind === 'bank' ? Math.round(4 + r('c') * 40) : Math.round(10 + r('c') * 110);
  const currencies = kind === 'kyc' ? 0 : Math.round(6 + r('cu') * 46);
  const others = REGIONS.filter(x => x !== region);
  const reach = [{ region, pct: Math.round(70 + r('r0') * 30) }, ...others.filter((_, i) => r('rr' + i) > .55).slice(0, 3).map((x, i) => ({ region: x, pct: Math.round(15 + r('r' + i) * 55) }))];
  const extraCountry = pick(Object.keys(REG).filter(c => c !== hq), r('lc'));
  return {
    id, name, kind, hq, region,
    cat: CAT[kind].label, accent: CAT[kind].accent,
    code: 'PRV-' + String(1000 + Math.floor(r('id') * 8999)),
    founded: 2008 + Math.floor(r('f') * 15), team: pick(['50–100', '100–250', '250–500', '500–1,000', '1,000+'], r('t')),
    countries, currencies,
    pn: +(t.price(r('p')).match(/[\d.]+/)[0]), price: t.price(r('p')),
    settle: pick(t.settle, r('s')),
    uptime: +(99.9 + r('u') * 0.09).toFixed(2), golive: Math.round(5 + r('g') * 25),
    regulator: REG[hq] ?? '—', licence: (REG[hq] ?? '') + ' · ' + t.lic,
    licences: [{ reg: REG[hq], name: t.lic, country: hq, status: 'Active' }, { reg: REG[extraCountry], name: kind === 'bank' ? 'Representative office' : t.lic, country: extraCountry, status: r('ls') > .7 ? 'Pending' : 'Active' }],
    rails: t.rails.filter((_, i) => r('rl' + i) > .35).slice(0, 4).concat().length ? t.rails.filter((_, i) => r('rl' + i) > .35).slice(0, 4) : t.rails.slice(0, 2),
    api: ['REST', 'Webhooks', 'SDKs', 'Sandbox'].filter((_, i) => i === 0 || r('a' + i) > .3),
    certs: CERTS.filter((_, i) => i === 3 || r('ce' + i) > .4),
    desc: t.desc, why: pick(t.why, r('w')), reach
  };
});
providers.forEach(p => { p.railsText = p.rails.join(' · '); p.apiText = p.api.join(' · '); p.score = Math.max(52, Math.min(97, Math.round(60 + (p.uptime - 99.9) * 180 + Math.min(p.countries, 190) / 190 * 18 - p.golive / 30 * 8))); });
providers.sort((a, b) => h(a.id + 'mix') - h(b.id + 'mix'));
const byId = Object.fromEntries(providers.map(p => [p.id, p]));
export const RELAY = { CAT, TOTAL, REGIONS, providers, byId, fmt: n => n.toLocaleString('en-GB') };

const DEMO = { CAT: JSON.parse(JSON.stringify(CAT)), TOTAL, REGIONS: [...REGIONS], providers: [...providers] };

/**
 * Swap the design's demo catalog for the signed-in workspace's real one (from
 * /api/app/bootstrap). Mutates in place so every component's RELAY import sees it.
 */
export function hydrateRelay(catalog) {
  if (!catalog) return;
  for (const k of Object.keys(RELAY.CAT)) delete RELAY.CAT[k];
  Object.assign(RELAY.CAT, catalog.CAT);
  RELAY.TOTAL = catalog.TOTAL;
  RELAY.REGIONS.splice(0, RELAY.REGIONS.length, ...catalog.REGIONS);
  RELAY.providers.splice(0, RELAY.providers.length, ...catalog.providers);
  for (const k of Object.keys(RELAY.byId)) delete RELAY.byId[k];
  for (const p of catalog.providers) RELAY.byId[p.id] = p;
}

/** Marketing counts per category (admin › Content › Stats). Applies to the demo catalog the site shows. */
export function applyStats(categories) {
  if (!categories) return;
  for (const [k, n] of Object.entries(categories)) {
    if (DEMO.CAT[k] && Number.isFinite(Number(n))) DEMO.CAT[k].count = Number(n);
  }
  DEMO.TOTAL = Object.values(DEMO.CAT).reduce((a, c) => a + c.count, 0);
  if (RELAY.providers.length === DEMO.providers.length && RELAY.providers[0] === DEMO.providers[0]) {
    for (const [k, v] of Object.entries(DEMO.CAT)) if (RELAY.CAT[k]) RELAY.CAT[k].count = v.count;
    RELAY.TOTAL = DEMO.TOTAL;
  }
}

/** Back to the design's demo data (signed out, or the marketing site's product shots). */
export function resetRelay() {
  hydrateRelay(DEMO);
}

