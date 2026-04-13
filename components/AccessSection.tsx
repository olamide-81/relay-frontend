import { Check, Lock } from 'lucide-react'

export function AccessSection() {
  const freeItems = [
    'Provider listings & profiles',
    'Category & region filters',
    'Basic search across all providers',
    'Community uptime signals',
  ]

  const paidItems = [
    'Fee & rate comparison tables',
    'Integration complexity scores',
    'Historical uptime data',
    'Side-by-side provider comparisons',
    'API access to directory data',
    'Weekly intelligence digest',
  ]

  return (
    <section style={{ padding: '96px 0', borderBottom: '1px solid #111' }}>
      <p style={{ fontSize: 11, fontWeight: 400, color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Access</p>
      <h2 style={{ marginTop: 18, fontSize: 'clamp(32px, 3.8vw, 50px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
        <span style={{ color: '#e8e8e8' }}>Start free.</span>
        <br />
        <span style={{ color: '#666' }}>Go deeper when ready.</span>
      </h2>

      <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 300, color: '#888', lineHeight: 1.75, marginBottom: 26 }}>
            No account needed to browse. The directory is open. The depth is where the real intelligence lives.
          </p>
          {freeItems.map((item, idx) => (
            <div
              key={item}
              style={{
                display: 'flex',
                gap: 10,
                padding: '9px 0',
                borderBottom: idx === freeItems.length - 1 ? 'none' : '1px solid #0d0d0d',
              }}
            >
              <Check size={13} stroke="#888" strokeWidth={2} />
              <span style={{ fontSize: 13, fontWeight: 300, color: '#888' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0a0a0a', border: '1px solid #161616', borderRadius: 14, padding: 32 }}>
          <p style={{ fontSize: 10, fontWeight: 400, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            Full Access
          </p>
          <p style={{ fontSize: 50, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.04em', lineHeight: 1 }}>$49</p>
          <p style={{ fontSize: 12, fontWeight: 300, color: '#555', margin: '4px 0 26px' }}>per team, per month</p>
          <div style={{ borderTop: '1px solid #111', marginBottom: 20 }} />
          {paidItems.map((item, idx) => (
            <div
              key={item}
              style={{
                display: 'flex',
                gap: 10,
                padding: '8px 0',
                borderBottom: idx === paidItems.length - 1 ? 'none' : '1px solid #0d0d0d',
              }}
            >
              <Lock size={12} stroke="#777" strokeWidth={1.8} />
              <span style={{ fontSize: 13, fontWeight: 300, color: '#777' }}>{item}</span>
            </div>
          ))}
          <button
            type="button"
            style={{
              width: '100%',
              background: '#e8e8e8',
              color: '#060606',
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 6,
              border: 'none',
              padding: 13,
              marginTop: 26,
            }}
          >
            Get Access
          </button>
        </div>
      </div>
    </section>
  )
}
