import { getTranslations } from 'next-intl/server'
import type { ReportLabels } from '@/components/relay-app/ReportArticle'

/** Section labels in the reader's language (existing dataReports messages), English for the rest. */
export async function reportLabels(locale: string, back: string): Promise<ReportLabels> {
  const t = await getTranslations({ locale, namespace: 'dataReports' })
  const tr = (k: string, fallback: string) => (t.has(k) ? t(k) : fallback)
  return {
    back,
    takeaways: 'Key takeaways',
    keyMetrics: tr('keyMetrics', 'Key metrics'),
    keyFindings: tr('keyFindings', 'Key findings'),
    whyThisMatters: tr('whyThisMatters', 'Why this matters:'),
    background: tr('whyWeBuilt', 'Why we built this'),
    marketContext: tr('marketContext', 'Market context'),
    providerLandscape: tr('providerLandscape', 'Provider landscape'),
    implications: tr('implications', 'What this means for you'),
    methodology: tr('methodology', 'Data sources & methodology'),
    sources: 'Sources',
    published: tr('published', 'Published'),
    lastUpdated: tr('lastUpdated', 'Last updated'),
    minRead: tr('minRead', 'min read'),
    related: tr('related', 'Related reports'),
    copyLink: 'Copy link',
    copied: 'Link copied',
    downloadPdf: 'Download PDF',
  }
}

export { reportView } from '@/lib/reports'
