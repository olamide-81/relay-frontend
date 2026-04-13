'use client'
import Image from 'next/image'

export function Nav() {
  const links = ['Directory', 'Compare', 'Pricing', 'About', 'Contact']

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        background: 'transparent',
        backdropFilter: 'blur(16px)',
        borderBottom: 'none',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/relaydark.png" width={28} height={28} alt="Relay" style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: 15, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.02em', marginLeft: 8 }}>Relay</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {links.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: '#888888',
                padding: '0 10px',
                height: 52,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ccc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
            >
              {link}
            </a>
          ))}
          <button
            type="button"
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: '#888',
              background: 'none',
              border: 'none',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ccc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
          >
            Log in
          </button>
          <span style={{ width: 1, height: 16, background: '#1e1e1e', margin: '0 6px' }} />
          <button
            type="button"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#0a0a0a',
              background: '#e8e8e8',
              border: '1px solid #d0d0d0',
              borderRadius: 5,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#e8e8e8')}
          >
            Get Access
          </button>
        </div>
      </div>
    </nav>
  )
}
