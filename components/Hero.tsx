'use client'

import { motion } from 'framer-motion'

const baseAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        marginTop: 62,
        padding: '96px 0 40px',
        borderBottom: '1px solid #111',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, #1a1a1a 0%, #060606 60%)',
      }}
    >
      <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <motion.h1
          {...baseAnim}
          transition={{ ...baseAnim.transition, delay: 0.1 }}
          style={{
            marginBottom: 26,
            fontSize: 'clamp(48px, 5.2vw, 70px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            width: '100%',
            color: '#e8e8e8',
            textAlign: 'left',
          }}
        >
          Every provider. One directory.
          <br />
          <span style={{ color: '#666' }}>Built for builders.</span>
        </motion.h1>

        <motion.div {...baseAnim} transition={{ ...baseAnim.transition, delay: 0.3 }} style={{ fontSize: 15, fontWeight: 300, color: '#aaaaaa', lineHeight: 1.85, maxWidth: 540, margin: '0 0 40px 0' }}>
          Stop reading pitch decks and signing NDAs. Relay maps every KYC, payout, FX, treasury, and compliance provider — across Africa, LATAM, Europe and beyond.
        </motion.div>

        <motion.div {...baseAnim} transition={{ ...baseAnim.transition, delay: 0.4 }} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 24, justifyContent: 'flex-start' }}>
          <button type="button" style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', background: '#e8e8e8', border: '1px solid #d0d0d0', borderRadius: 5, padding: '8px 18px' }}>
            Explore Directory
          </button>
          <button
            type="button"
            style={{ fontSize: 13, fontWeight: 400, color: '#777', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 5, padding: '8px 16px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = '#ccc'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e1e1e'
              e.currentTarget.style.color = '#777'
            }}
          >
            Join Waitlist
          </button>
        </motion.div>

        <motion.div {...baseAnim} transition={{ ...baseAnim.transition, delay: 0.45 }} style={{ fontSize: 12, fontWeight: 300, color: '#555555', textAlign: 'left' }}>
          140+ fintech teams on the waitlist
        </motion.div>
      </div>
    </section>
  )
}
