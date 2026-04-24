import Link from 'next/link'

export default function SignInPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <section style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #f0f0f5' }}>
        <Link href="/" className="logo" style={{ marginBottom: 26, width: 'fit-content' }}>
          <img className="logo-img" src="/relaylight.png" alt="Relay logo" />
          Relay
        </Link>
        <p className="eyebrow" style={{ marginBottom: 12 }}>Welcome back</p>
        <h1 style={{ fontSize: 'clamp(34px, 4vw, 48px)', marginBottom: 12 }}>Sign in to Relay</h1>
        <p style={{ color: '#4b4b58', marginBottom: 26 }}>Access your provider shortlists and intelligence workspace.</p>
        <div style={{ display: 'grid', gap: 10, maxWidth: 460 }}>
          <input placeholder="Work email" style={{ border: '1px solid #e6e6ee', borderRadius: 10, padding: '12px 14px', fontSize: 14, outline: 'none' }} />
          <input type="password" placeholder="Password" style={{ border: '1px solid #e6e6ee', borderRadius: 10, padding: '12px 14px', fontSize: 14, outline: 'none' }} />
          <button type="button" className="btn btn-primary" style={{ justifyContent: 'center', borderRadius: 10, marginTop: 4 }}>Sign in</button>
          <Link href="/#cta" style={{ marginTop: 6, color: 'var(--blue)', fontSize: 14 }}>Need access? Join the waitlist →</Link>
        </div>
      </section>
      <section style={{ background: 'linear-gradient(155deg, #eef1ff 0%, #ffffff 60%)', padding: '56px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 520 }}>
          <p className="eyebrow">Team access</p>
          <h2 style={{ marginBottom: 14 }}>Provider intelligence for teams shipping across regions.</h2>
          <p style={{ color: '#4b4b58', lineHeight: 1.7 }}>
            Relay helps Nigerian and US based teams compare KYC, payouts, FX and compliance infrastructure across Africa, LATAM, Europe and global rails.
          </p>
          <div style={{ marginTop: 22, border: '1px solid #dfe3ff', borderRadius: 14, background: '#fff', padding: 16 }}>
            <p style={{ fontSize: 13, color: '#6b6b7a', marginBottom: 6 }}>Included in workspace</p>
            <p style={{ fontSize: 14, color: '#222' }}>Saved shortlists, provider comparisons, uptime snapshots, and team notes.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

