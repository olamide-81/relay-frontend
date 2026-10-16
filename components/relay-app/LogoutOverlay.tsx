'use client'

import { useEffect, useState } from 'react'

/**
 * Shown while signing out: the intro loader's R tile (44px, radius 10, glass
 * shine) over a dimmed, blurred dashboard, with a short status line.
 */
export default function LogoutOverlay() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(t)
  }, [])
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        background: 'rgba(15,16,17,.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: on ? 1 : 0,
        transition: 'opacity .25s cubic-bezier(.4,0,.2,1)',
        fontFamily: 'Geist,system-ui,sans-serif',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: '160px', height: '160px', transform: 'translate(-50%,-50%)', background: 'radial-gradient(closest-side, rgba(255,255,255,.07), transparent)', pointerEvents: 'none' }} />
        <div
          style={{
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(255,255,255,.08), 0 16px 40px -10px rgba(0,0,0,.85)',
            transform: on ? 'scale(1)' : 'scale(.96)',
            transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <img src="/relay/relay-icon.png" alt="" width={44} height={44} style={{ display: 'block', width: '44px', height: '44px' }} />
          <div className="relay-logout-shine" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.28) 48%, rgba(255,255,255,0) 64%)' }} />
        </div>
      </div>
      <div style={{ fontSize: '13px', fontWeight: 500, color: '#8a8f98', letterSpacing: '-0.005em' }}>Logging out…</div>
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes relay-logout-shine{from{transform:translateX(-130%)}to{transform:translateX(130%)}}
.relay-logout-shine{animation:relay-logout-shine 1.4s cubic-bezier(.4,0,.2,1) infinite}
@media (prefers-reduced-motion: reduce){.relay-logout-shine{animation:none;opacity:0}}`,
        }}
      />
    </div>
  )
}
