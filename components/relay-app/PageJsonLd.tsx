import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd } from '@/lib/jsonld'
import { breadcrumbFor } from '@/lib/dc/meta'

/** Copy of the Pricing design's FAQ, so the FAQ rich result matches what's on the page. */
const PRICING_FAQ = [
  ['Is the free plan really free?', 'Yes. Search the directory, run five compares a month and send three intro requests with no card required.'],
  ['How do you make money from Providers?', 'We don’t. Providers can’t pay for placement or ranking. Relay is funded by subscriptions from teams like yours.'],
  ['How current is the data?', 'Every Provider profile is verified weekly against public filings, regulator registers and direct confirmation.'],
  ['Can I switch plans later?', 'Anytime. Upgrades apply immediately and downgrades take effect at the end of your billing period.'],
  ['Do you offer discounts for early-stage startups?', 'Yes. Teams that raised less than $5M can apply for 50% off Pro for the first year.'],
].map(([question, answer]) => ({ question, answer }))

/** Structured data for a marketing page (breadcrumbs, product, FAQ). */
export default function PageJsonLd({ path, crumbs }: { path: string; crumbs?: { name: string; path: string }[] }) {
  const data: Record<string, unknown>[] = []
  const trail = crumbs ?? breadcrumbFor(path)
  if (trail) data.push(breadcrumbJsonLd(trail, 'en'))
  if (path === '/' || path === '/pricing') data.push(softwareApplicationJsonLd())
  if (path === '/pricing') data.push(faqJsonLd(PRICING_FAQ))
  return data.length ? <JsonLd data={data} /> : null
}
