import { getReportEntries } from '@/lib/reports'
import { absoluteUrl } from '@/lib/seo'
import { syncSiteContent } from '@/lib/site-content.server'

/** RSS feed of public Relay Research reports (config/reports.json). */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function GET() {
  await syncSiteContent()
  const items = getReportEntries('site', 'en')
    .sort((a, b) => b.report.publishedAt.localeCompare(a.report.publishedAt))
    .map((e) => {
      const url = absoluteUrl(`/en/reports/${e.slug}`)
      return `    <item>
      <title>${esc(e.report.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(e.report.publishedAt).toUTCString()}</pubDate>
      <category>${esc(e.type)}</category>
      <description>${esc(e.report.seoDescription ?? e.report.excerpt)}</description>
    </item>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Relay Research</title>
    <link>${absoluteUrl('/en/intelligence')}</link>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>Reports on the financial infrastructure market from Relay by Gratebridge.</description>
    <language>en</language>
${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
