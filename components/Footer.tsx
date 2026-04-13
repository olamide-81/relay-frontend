import Image from 'next/image'

export function Footer() {
  const linkStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 300,
    color: '#555',
    display: 'block',
    marginBottom: 10,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 150ms',
  }

  return (
    <footer className="footer-section" style={{ padding: '56px 0 44px', borderTop: '1px solid #111' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <Image src="/relaydark.png" width={32} height={32} alt="Relay logo" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: 15, fontWeight: 500, color: '#d0d0d0', letterSpacing: '-0.01em' }}>Relay</p>
          <p style={{ fontSize: 12, fontWeight: 300, color: '#666', lineHeight: 1.75, maxWidth: 240, marginTop: 8 }}>
            Relay is a fintech provider intelligence platform built by GrateBridge Labs. We help fintech teams across Africa, LATAM, Europe and globally research, compare and shortlist the right infrastructure providers — from KYC and payouts to FX, treasury and compliance. Stop reading pitch decks. Start building.
          </p>
          <p style={{ fontSize: 11, fontWeight: 300, color: '#333', marginTop: 12, fontFamily: "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>
            A product by GrateBridge Labs
          </p>
        </div>

        <div>
          <p style={{ fontSize: 10, fontWeight: 400, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Product</p>
          <a href="#" style={linkStyle}>Directory</a>
          <a href="#" style={linkStyle}>Compare</a>
          <a href="#" style={linkStyle}>Pricing</a>
          <a href="#" style={linkStyle}>API Access</a>
        </div>

        <div>
          <p style={{ fontSize: 10, fontWeight: 400, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Company</p>
          <a href="#" style={linkStyle}>About</a>
          <a href="#" style={linkStyle}>GrateBridge</a>
          <a href="#" style={linkStyle}>Blog</a>
          <a href="#" style={linkStyle}>Contact</a>
        </div>

        <div>
          <p style={{ fontSize: 10, fontWeight: 400, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Legal</p>
          <a href="#" style={linkStyle}>Privacy Policy</a>
          <a href="#" style={linkStyle}>Terms of Service</a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', paddingTop: 24, borderTop: '1px solid #0e0e0e' }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: '#333' }}>© 2025 GrateBridge Labs Ltd. All rights reserved.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifySelf: 'center' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', marginRight: 6 }} />
          <span style={{ fontSize: 11, color: '#333', fontFamily: "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>All systems operational</span>
        </div>
        <div style={{ display: 'flex', gap: 8, justifySelf: 'end' }}>
          <button type="button" style={{ width: 32, height: 32, border: '1px solid #161616', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="#444" strokeWidth="1.8" />
            </svg>
          </button>
          <button type="button" style={{ width: 32, height: 32, border: '1px solid #161616', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 10v8M7 7v.01M11 10v8M11 13c0-2 1.5-3 3-3s3 1 3 3v5" stroke="#444" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
