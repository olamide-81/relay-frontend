export function Waitlist() {
  return (
    <section style={{ padding: '140px 0', textAlign: 'center', borderBottom: '1px solid #111' }}>
      <p style={{ fontSize: 11, fontWeight: 300, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
        Early Access
      </p>
      <h2 style={{ fontSize: 'clamp(46px, 6vw, 76px)', fontWeight: 500, color: '#e8e8e8', lineHeight: 1, letterSpacing: '-0.035em', marginBottom: 16 }}>
        Be the first
        <br />
        team on Relay.
      </h2>
      <p style={{ fontSize: 14, fontWeight: 300, color: '#888', marginBottom: 36 }}>
        Join 140+ fintech teams already on the waitlist.
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 400, margin: '0 auto 12px' }}>
        <input
          placeholder="your@company.com"
          style={{
            flex: 1,
            background: '#0a0a0a',
            border: '1px solid #1a1a1a',
            borderRadius: 6,
            padding: '11px 14px',
            fontSize: 13,
            fontWeight: 300,
            color: '#d0d0d0',
            outline: 'none',
          }}
        />
        <button
          type="button"
          style={{
            background: '#e8e8e8',
            color: '#060606',
            fontSize: 12,
            fontWeight: 500,
            padding: '11px 20px',
            borderRadius: 6,
            border: '1px solid #d0d0d0',
          }}
        >
          Join Waitlist
        </button>
      </div>
      <p style={{ fontSize: 11, fontWeight: 300, color: '#333' }}>No spam. Unsubscribe anytime.</p>
    </section>
  )
}
