import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { getReportEntry, KIND_ACCENT } from '@/lib/reports'

/** 1200×630 social card for a public report, in the style of the site's og-image. */
export const runtime = 'nodejs'

// Fixed paths keep the bundler from tracing the whole project.
const ICON = () => fs.readFileSync(path.join(process.cwd(), 'public', 'relay', 'relay-icon.png'))
const GEIST_400 = () => fs.readFileSync(path.join(process.cwd(), 'assets', 'fonts', 'Geist-Regular.ttf'))
const GEIST_500 = () => fs.readFileSync(path.join(process.cwd(), 'assets', 'fonts', 'Geist-Medium.ttf'))

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = new URL(req.url).searchParams.get('locale') ?? 'en'
  const entry = getReportEntry(slug, 'site', locale)
  if (!entry) return new Response('Not found', { status: 404 })
  const r = entry.report
  const { rgb, accent } = KIND_ACCENT[entry.kind] ?? KIND_ACCENT.all
  const icon = `data:image/png;base64,${ICON().toString('base64')}`
  const date = new Date(r.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  const title = locale === 'en' ? entry.cardTitle : r.title

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: `radial-gradient(70% 90% at 100% 50%, rgba(${rgb},.14), rgba(15,16,17,0) 70%), #0f1011`,
          color: '#f7f8f8',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={icon} width={36} height={36} style={{ borderRadius: 8 }} />
          <span style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.025em' }}>Relay</span>
          <span style={{ fontSize: 18, color: '#62666d' }}>Research</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', gap: 12, fontSize: 20, color: '#8a8f98' }}>
            <span style={{ color: accent === '#8a8f98' ? '#d4d6da' : accent }}>{entry.type}</span>
            <span>·</span>
            <span>{r.market}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <div style={{ fontSize: title.length > 70 ? 52 : 60, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.045em', maxWidth: 1000 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.035em', color: accent === '#8a8f98' ? '#6fe3b4' : accent }}>{r.heroStat.value}</span>
            <span style={{ fontSize: 21, color: '#8a8f98' }}>{r.heroStat.label}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: GEIST_400(), weight: 400 },
        { name: 'Geist', data: GEIST_500(), weight: 500 },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  )
}
