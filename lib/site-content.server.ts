import { apiBaseUrl } from './api/config'
import { applySiteContent, type SiteContent } from './site-content'

/** For server code that reads page/report visibility outside the layout (sitemap, feeds, report pages). */
export async function syncSiteContent() {
  const content = await loadSiteContent()
  applySiteContent(content)
  return content
}

/** Admin-managed website content; null (→ the design's defaults) when the API is unreachable. */
export async function loadSiteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/site/content`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    })
    return res.ok ? ((await res.json()) as SiteContent) : null
  } catch {
    return null
  }
}
