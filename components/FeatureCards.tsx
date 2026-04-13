import { BarChart2, Code2, Search } from 'lucide-react'

const cards = [
  {
    label: 'Search',
    title: 'The Provider Directory',
    desc: 'Query 200+ providers by category, region, use case and compliance coverage. No signup required to browse.',
    Icon: Search,
    bg: 'linear-gradient(135deg, #0f0f20, #12122a)',
    glow1: { width: 130, height: 130, bg: '#2a2a6e', opacity: 0.3, top: -20, left: 10 },
    glow2: { width: 80, height: 80, bg: '#1a1a5a', opacity: 0.25, bottom: 0, right: 20 },
    stroke: '#333355',
  },
  {
    label: 'Compare',
    title: 'Rates & Intelligence',
    desc: "Side-by-side fee tables, uptime records and integration complexity scores. Data that's never been in one place.",
    Icon: BarChart2,
    bg: 'linear-gradient(135deg, #0a1410, #0c1a0e)',
    glow1: { width: 110, height: 110, bg: '#1a4020', opacity: 0.35, top: 0, right: 10 },
    glow2: { width: 70, height: 70, bg: '#0e2e10', opacity: 0.35, bottom: 0, left: 30 },
    stroke: '#253525',
  },
  {
    label: 'Build',
    title: 'Shortlist & Integrate',
    desc: 'Leave with a curated shortlist and the exact documentation you need. Cut months of due diligence to hours.',
    Icon: Code2,
    bg: 'linear-gradient(135deg, #18100e, #1e100c)',
    glow1: { width: 110, height: 110, bg: '#4a1a10', opacity: 0.35, top: -10, right: 20 },
    glow2: { width: 70, height: 70, bg: '#3a1008', opacity: 0.3, bottom: 10, left: 20 },
    stroke: '#352218',
  },
]

export function FeatureCards() {
  return (
    <section style={{ padding: '96px 0', borderBottom: '1px solid #111' }}>
      <p style={{ fontSize: 11, fontWeight: 400, color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>What Relay Does</p>
      <h2 style={{ marginTop: 18, fontSize: 'clamp(32px, 3.8vw, 50px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
        <span style={{ color: '#e8e8e8' }}>One layer above</span>
        <br />
        <span style={{ color: '#666' }}>the fragmentation.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 48 }}>
        {cards.map((card) => (
          <article
            key={card.title}
            style={{
              borderRadius: 12,
              background: '#0a0a0a',
              border: '1px solid #131313',
              overflow: 'hidden',
              transition: 'all 200ms',
            }}
          >
            <div style={{ height: 170, position: 'relative', overflow: 'hidden', background: card.bg }}>
              <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(44px)', width: card.glow1.width, height: card.glow1.height, background: card.glow1.bg, opacity: card.glow1.opacity, top: (card.glow1 as any).top, left: (card.glow1 as any).left, right: (card.glow1 as any).right }} />
              <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(44px)', width: card.glow2.width, height: card.glow2.height, background: card.glow2.bg, opacity: card.glow2.opacity, top: (card.glow2 as any).top, left: (card.glow2 as any).left, right: (card.glow2 as any).right, bottom: (card.glow2 as any).bottom }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.Icon size={26} color={card.stroke} strokeWidth={1.2} />
              </div>
            </div>
            <div style={{ padding: '20px 22px 24px' }}>
              <p style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</p>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: '#dddddd', letterSpacing: '-0.015em', marginBottom: 7 }}>{card.title}</h3>
              <p style={{ fontSize: 13, fontWeight: 300, color: '#888', lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
