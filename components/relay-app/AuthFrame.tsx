'use client'

/**
 * Shell + form primitives for auth screens that have no design file of their
 * own (forgot / reset password, Google callback). Every value is copied from
 * "Relay Login.dc.html" so these screens sit seamlessly next to Log in.
 */

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RelayAuthArt from '@/components/relay/RelayAuthArt'
import { A } from '@/lib/dc/runtime'

const RING = 'inset 0 0 0 1px rgba(255,255,255,.1)'
const RING_ERR = 'inset 0 0 0 1px rgba(255,123,123,.6)'

export function AuthFrame({
  title,
  lede,
  children,
}: {
  title: string
  lede?: React.ReactNode
  children?: React.ReactNode
}) {
  const { locale } = useParams<{ locale: string }>()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))',
        fontFamily: 'Geist,system-ui,sans-serif',
        color: '#f7f8f8',
        background: '#0f1011',
      }}
    >
      <div data-r="t-hide" style={{ position: 'relative', minHeight: '100vh', borderRight: '1px solid rgba(255,255,255,.06)' }}>
        <RelayAuthArt __hostStyle={{ position: 'absolute', inset: '0' }} />
      </div>
      <div
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(18px,4vw,28px) clamp(18px,4vw,32px)',
          background: 'radial-gradient(80% 50% at 50% 0%,#1e1f22 0%,#0f1011 70%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <A href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#f7f8f8' }}>
            <img src="/relay/relay-icon.png" alt="Relay" style={{ width: '22px', height: '22px', display: 'block', borderRadius: '5px' }} />
            <span style={{ fontWeight: 500, fontSize: '16px', letterSpacing: '-0.02em' }}>Relay</span>
            <span data-r="s-hide" style={{ fontSize: '12.5px', color: '#62666d' }}>
              by Gratebridge
            </span>
          </A>
          <span style={{ fontSize: '13.5px', color: '#8a8f98' }}>
            New to Relay?{' '}
            <A href={`/${locale}/signup`} style={{ color: '#f7f8f8', fontWeight: 500 }}>
              Sign up
            </A>
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              transition: 'opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1)',
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translateY(14px)',
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: '30px', fontWeight: 500, letterSpacing: '-0.035em' }}>{title}</h1>
              {lede ? <p style={{ margin: '8px 0 0', fontSize: '14.5px', color: '#8a8f98' }}>{lede}</p> : null}
            </div>
            {children}
          </div>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#62666d' }}
        >
          <span>© 2026 Gratebridge Labs</span>
          <span style={{ display: 'flex', gap: '16px' }}>
            <A href={`/${locale}/privacy`} style={{ fontSize: '12px', color: '#62666d' }}>
              Privacy
            </A>
            <A href={`/${locale}/terms`} style={{ fontSize: '12px', color: '#62666d' }}>
              Terms
            </A>
          </span>
        </div>
      </div>
    </div>
  )
}

export function AuthInput({
  label,
  invalid,
  aside,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; invalid?: boolean; aside?: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#8a8f98' }}>{label}</span>
      <span style={{ position: 'relative', display: 'block' }}>
        <input
          {...input}
          className="relay-auth-input"
          style={{
            width: '100%',
            height: '42px',
            padding: aside ? '0 64px 0 12px' : '0 12px',
            border: 'none',
            outline: 'none',
            borderRadius: '10px',
            background: 'rgba(255,255,255,.03)',
            boxShadow: invalid ? RING_ERR : RING,
            color: '#f7f8f8',
            font: '14.5px Geist,system-ui,sans-serif',
            transition: 'box-shadow .15s',
          }}
        />
        {aside}
      </span>
    </label>
  )
}

export function AuthReveal({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <span
      onClick={onToggle}
      className="relay-auth-reveal"
      style={{ position: 'absolute', right: '10px', top: '11px', fontSize: '12.5px', color: '#8a8f98', cursor: 'pointer' }}
    >
      {shown ? 'Hide' : 'Show'}
    </span>
  )
}

export function AuthError({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" style={{ fontSize: '13px', color: '#ff7b7b' }}>
      {children}
    </div>
  )
}

export function AuthButton({
  children,
  busy,
  ghost,
  onClick,
  href,
}: {
  children: React.ReactNode
  busy?: boolean
  ghost?: boolean
  onClick?: () => void
  href?: string
}) {
  const style: React.CSSProperties = ghost
    ? {
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        borderRadius: '10px',
        fontSize: '14.5px',
        fontWeight: 500,
        color: '#f7f8f8',
        background: 'rgba(255,255,255,.04)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.12)',
        cursor: 'pointer',
        transition: 'background-color .15s,box-shadow .15s,transform .2s',
      }
    : {
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        fontSize: '14.5px',
        fontWeight: 500,
        color: '#0f1011',
        cursor: 'pointer',
        transition: 'background-color .15s,transform .2s,box-shadow .2s',
        background: busy ? '#d4d6da' : '#f7f8f8',
      }
  const className = ghost ? 'relay-auth-ghost' : 'relay-auth-primary'
  if (href)
    return (
      <A href={href} className={className} style={style}>
        {children}
      </A>
    )
  return (
    <span role="button" tabIndex={0} onClick={onClick} className={className} style={style}>
      {children}
    </span>
  )
}

export function AuthNote({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: '12.5px', color: '#62666d', textAlign: 'center' }}>{children}</div>
}

/** Hover/focus states from the Login design (style-hover / style-focus). */
export const AUTH_CSS = `.relay-auth-input:focus{box-shadow:inset 0 0 0 1px rgba(255,255,255,.3) !important}
.relay-auth-reveal:hover{color:#f7f8f8 !important}
.relay-auth-primary:hover{transform:translateY(-1px) !important;box-shadow:0 10px 30px -8px rgba(255,255,255,.3) !important;color:#0f1011 !important}
.relay-auth-ghost:hover{background:rgba(255,255,255,.07) !important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2) !important;transform:translateY(-1px) !important;color:#f7f8f8 !important}`

export function AuthStyles() {
  return <style dangerouslySetInnerHTML={{ __html: AUTH_CSS }} />
}
