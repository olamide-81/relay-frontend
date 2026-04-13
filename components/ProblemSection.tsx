'use client'

import { Clock, FileText, Link2 } from 'lucide-react'
import { motion } from 'framer-motion'

const cols = [
  {
    num: '01',
    title: 'Too many providers',
    desc: "A new KYC, payout or FX provider launches every week. Keeping up is a full-time job before you've built anything.",
    Icon: FileText,
  },
  {
    num: '02',
    title: 'No real comparison',
    desc: "You can't compare fees, uptime, or coverage without signing an NDA and reading a 40-page deck. It's deliberately opaque.",
    Icon: Link2,
  },
  {
    num: '03',
    title: 'Setup takes months',
    desc: "Compliance checks, API integrations, sandbox testing — all before you've served your first customer. That's the tax.",
    Icon: Clock,
  },
]

export function ProblemSection() {
  return (
    <section style={{ padding: '96px 0', borderBottom: '1px solid #111' }}>
      <p style={{ fontSize: 11, fontWeight: 400, color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
        The Problem
      </p>
      <h2 style={{ fontSize: 'clamp(32px, 3.8vw, 50px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
        <span style={{ color: '#e8e8e8' }}>Building fintech is slow.</span>
        <br />
        <span style={{ color: '#666' }}>Provider research is broken.</span>
      </h2>

      <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {cols.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            style={{
              borderRight: i === 2 ? 'none' : '1px solid #111',
              paddingRight: i === 0 ? 44 : 0,
              paddingLeft: i === 2 ? 44 : i === 1 ? 44 : 0,
            }}
          >
            <c.Icon size={17} color="#666" strokeWidth={1.5} style={{ marginBottom: 18, opacity: 0.6 }} />
            <p style={{ fontSize: 11, color: '#444', letterSpacing: '0.08em', marginBottom: 16 }}>{c.num}</p>
            <h3 style={{ fontSize: 14, fontWeight: 500, color: '#dddddd', marginBottom: 9 }}>{c.title}</h3>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#999', lineHeight: 1.75 }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
