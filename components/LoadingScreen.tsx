'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#060606',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image src="/relaydark.png" width={64} height={64} alt="Relay" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ fontSize: 18, fontWeight: 500, color: '#e8e8e8', letterSpacing: '-0.02em' }}
          >
            Relay by GrateBridge Labs
          </motion.p>

          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 1, background: '#111' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              style={{ height: 1, background: '#e8e8e8' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
