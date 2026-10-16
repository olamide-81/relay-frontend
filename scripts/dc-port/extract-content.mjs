/**
 * Copies the redesign's editable content (changelog, customers, careers, Intelligence…)
 * out of the ported components into relay-api/src/content/*.json. Those files are the
 * defaults the API serves until a block is edited in the admin panel, so re-run this
 * after pulling a design update: `npm run design:content`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const out = path.resolve(root, process.env.RELAY_API_DIR || '../relay-api', 'src/content')

/** [content key, field, component, const name] */
const BLOCKS = [
  ['changelog', 'entries', 'RelayChangelog', 'E'],
  ['customers', 'stories', 'RelayCustomers', 'STORIES'],
  ['customers', 'logos', 'RelayCustomers', 'LOGOS'],
  ['customers', 'quotes', 'RelayLanding', 'QUOTES'],
  ['customers', 'marquee', 'RelayLanding', 'MARQUEE'],
  ['careers', 'roles', 'RelayCareers', 'ROLES'],
  ['intelligence', 'signals', 'RelayIntelligence', 'SIG'],
  ['intelligence', 'news', 'RelayIntelligence', 'NEWS'],
  ['intelligence', 'benchmarks', 'RelayIntelligence', 'BENCH'],
  ['intelligence', 'licenceCatalog', 'RelayIntelligence', 'CAT'],
  ['intelligence', 'licenceChanges', 'RelayIntelligence', 'LIC'],
]

/** Returns the source of the array/object literal assigned to `const NAME =`. */
function literal(src, name) {
  const at = src.search(new RegExp(`^const ${name} = [\\[{]`, 'm'))
  if (at < 0) throw new Error(`const ${name} not found`)
  const start = src.indexOf('=', at) + 2
  const open = src[start]
  const close = open === '[' ? ']' : '}'
  let depth = 0
  let quote = null
  for (let i = start; i < src.length; i++) {
    const ch = src[i]
    if (quote) {
      if (ch === '\\') i++
      else if (ch === quote) quote = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch
    else if (ch === open || ch === '[' || ch === '{') depth++
    else if (ch === close || ch === ']' || ch === '}') {
      depth--
      if (depth === 0) return src.slice(start, i + 1)
    }
  }
  throw new Error(`Unterminated literal for ${name}`)
}

const result = {}
for (const [key, field, file, name] of BLOCKS) {
  const src = fs.readFileSync(path.join(root, 'components/relay', `${file}.tsx`), 'utf8')
  const value = new Function(`return (${literal(src, name)})`)()
  ;(result[key] ??= {})[field] = value
}

const pages = JSON.parse(fs.readFileSync(path.join(root, 'config/site-pages.json'), 'utf8')).pages
const reports = JSON.parse(fs.readFileSync(path.join(root, 'config/reports.json'), 'utf8')).reports
result.pages = { pages }
result.reports = { reports }
result.stats = {
  categories: { collections: 214, payouts: 268, fx: 183, cards: 247, kyc: 372, bank: 316 },
  countries: 140,
  updated: 'weekly',
}
{
  const src = fs.readFileSync(path.join(root, 'lib/dc/relay-data.ts'), 'utf8')
  const cat = new Function(`return (${literal(src, 'CAT')})`)()
  result.stats.categories = Object.fromEntries(Object.entries(cat).map(([k, v]) => [k, v.count]))
}

fs.mkdirSync(out, { recursive: true })
for (const [key, value] of Object.entries(result)) {
  fs.writeFileSync(path.join(out, `${key}.json`), JSON.stringify(value, null, 2) + '\n')
  const sizes = Object.entries(value).map(([f, v]) => `${f}:${Array.isArray(v) ? v.length : Object.keys(v).length}`)
  console.log(`${key}.json  ${sizes.join('  ')}`)
}
