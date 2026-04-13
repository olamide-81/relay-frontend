'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 1500
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target])

  return value
}

export function StatsRow() {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const c200 = useCountUp(200, inView)
  const c40 = useCountUp(40, inView)
  const c12 = useCountUp(12, inView)

  const cellStyle: React.CSSProperties = {
    padding: '28px 28px',
    borderRight: '1px solid #111',
  }

  return (
    <section
      className="stats-row"
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        borderBottom: '1px solid #111',
      }}
    >
      <div style={cellStyle}>
        <div style={{ fontSize: 48, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.04em', lineHeight: 1 }}>{c200}+</div>
        <div style={{ fontSize: 13, fontWeight: 300, color: '#666', marginTop: 7 }}>Providers indexed</div>
      </div>
      <div style={cellStyle}>
        <div style={{ fontSize: 48, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.04em', lineHeight: 1 }}>{c40}</div>
        <div style={{ fontSize: 13, fontWeight: 300, color: '#666', marginTop: 7 }}>Countries covered</div>
      </div>
      <div style={cellStyle}>
        <div style={{ fontSize: 48, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.04em', lineHeight: 1 }}>{c12}</div>
        <div style={{ fontSize: 13, fontWeight: 300, color: '#666', marginTop: 7 }}>Categories</div>
      </div>
      <div style={{ padding: '28px 28px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ fontSize: 26, fontWeight: 500, color: '#e8e8e8', lineHeight: 1 }}>
          Weekly
        </motion.div>
        <div style={{ fontSize: 13, fontWeight: 300, color: '#666', marginTop: 7 }}>Updated</div>
      </div>
    </section>
  )
}
