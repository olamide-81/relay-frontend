export function Marquee() {
  const names = [
    'Flutterwave',
    'Mono',
    'Smile Identity',
    'Pawapay',
    'Currencycloud',
    'Belvo',
    'Youverify',
    'Nium',
    'Fincra',
    'Paystack',
    'Chipper Cash',
  ]

  const sequence = [...names, ...names]

  return (
    <section style={{ padding: '34px 0', borderBottom: '1px solid #111', overflow: 'hidden' }}>
      <p style={{ fontSize: 11, fontWeight: 300, color: '#555555', textAlign: 'center', letterSpacing: '0.04em', marginBottom: 18 }}>
        Providers in the directory
      </p>
      <div className="animate-marquee" style={{ display: 'flex', gap: 36, width: 'max-content' }}>
        {sequence.map((name, index) => (
          <span key={`${name}-${index}`} style={{ fontSize: 13, fontWeight: 400, color: '#444' }}>
            {name} <span style={{ color: '#111' }}>—</span>
          </span>
        ))}
      </div>
    </section>
  )
}
