'use client'

/**
 * Minimal runtime for components ported from Claude Design `.dc.html` files.
 *
 * Each ported component pairs a logic class (copied verbatim from the design's
 * `class Component extends DCLogic`) with a JSX template compiled from the
 * design's markup by `scripts/dc-port/convert.mjs`. This host mirrors the
 * design runtime's semantics exactly so behaviour matches the prototype:
 *  - `setState` merges synchronously into `logic.state`, then re-renders;
 *  - the template renders against `{ ...props, ...logic.renderVals() }`;
 *  - every component renders inside a `div.sc-host` carrying only the
 *    position/size styles its parent placed on the import.
 */

import React from 'react'
import NextLink from 'next/link'
import { dcHref, dcFrameSrc, dcAsset } from './routes'
import { isHiddenHref } from '@/lib/site-pages'

export { dcHref, dcFrameSrc, dcAsset }

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyProps = Record<string, any>

export class DCLogic {
  props: AnyProps
  state: AnyProps = {}
  __host: any
  constructor(props?: AnyProps) {
    this.props = props || {}
  }
  setState(update: any, cb?: () => void) {
    if (this.__host) this.__host.__setLogicState(update, cb)
  }
  forceUpdate() {
    if (this.__host) this.__host.forceUpdate()
  }
  componentDidMount() {}
  componentDidUpdate(_prevProps?: AnyProps) {}
  componentWillUnmount() {}
  renderVals(): AnyProps {
    return {}
  }
}

/* ---------- locale context (used to build localised hrefs) ---------- */

export const DCLocaleContext = React.createContext<string>('en')
let renderLocale = 'en'
export function currentLocale() {
  return renderLocale
}

/* ---------- template helpers ---------- */

/** Text hole: strings/numbers render in a span (as the design runtime does). */
export function hole(v: any): React.ReactNode {
  if (v === undefined || v === null || typeof v === 'boolean') return null
  if (React.isValidElement(v) || Array.isArray(v)) return v as React.ReactNode
  return <span className="sc-interp">{String(v)}</span>
}

/** Text hole where only text is allowed (<option>, <title>). */
export function holeText(v: any): string | null {
  if (v === undefined || v === null || typeof v === 'boolean') return null
  return String(v)
}

function kebabToCamel(s: string) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

/** Inline CSS string → React style object (same split rules as the design runtime). */
export function css(str: string): React.CSSProperties {
  const o: AnyProps = {}
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim()
  }
  return o
}

export function sty(v: any): React.CSSProperties | undefined {
  if (typeof v === 'string') return css(v)
  return v ?? undefined
}

/** `value`/`checked` that resolve to undefined render as ''/false (keeps inputs controlled). */
export function dv(v: any, d: any) {
  return v === undefined ? d : v
}

export function list(v: any): any[] {
  return Array.isArray(v) ? v : []
}

const HOST_STYLE_PROPS = new Set([
  'position',
  'left',
  'right',
  'top',
  'bottom',
  'inset',
  'width',
  'height',
  'z-index',
  'transform',
])

/** Only the positioning part of an import's style reaches the host div. */
export function hostStyle(style: any): React.CSSProperties | undefined {
  const all = typeof style === 'string' ? css(style) : style && typeof style === 'object' ? style : null
  if (!all) return undefined
  const out: AnyProps = {}
  for (const [k, v] of Object.entries(all)) {
    const kebab = k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
    if (HOST_STYLE_PROPS.has(kebab)) out[k] = v
  }
  return Object.keys(out).length ? out : undefined
}

export function href(raw: any): string | undefined {
  if (raw == null) return undefined
  return dcHref(String(raw), renderLocale)
}

export function frameSrc(raw: any): string | undefined {
  if (raw == null) return undefined
  return dcFrameSrc(String(raw), renderLocale)
}

export function asset(raw: any): string | undefined {
  if (raw == null) return undefined
  return dcAsset(String(raw))
}

/**
 * Anchor that uses client-side navigation for internal routes. Links to pages
 * switched off in config/site-pages.json aren't rendered at all.
 */
export function A(props: AnyProps) {
  const { href: h, ...rest } = props
  if (isHiddenHref(h)) return null
  if (typeof h === 'string' && h.startsWith('/')) {
    return <NextLink href={h} {...rest} />
  }
  return <a href={h} {...rest} />
}

/** Navigation used by ported logic in place of `location.href = '…'`. */
export function dcNavigate(raw: string) {
  if (typeof window === 'undefined') return
  const locale = window.location.pathname.split('/')[1] || 'en'
  window.location.assign(dcHref(raw, locale) ?? raw)
}

/** `location.search`, safe during server render. */
export function dcSearch(): string {
  return typeof window === 'undefined' ? '' : window.location.search
}

/* ---------- component host ---------- */

type Template = (v: AnyProps, self: any) => React.ReactNode

function userProps(props: AnyProps) {
  const { __hostStyle, ...rest } = props
  void __hostStyle
  return rest
}

export function defineDC(name: string, Logic: typeof DCLogic, template: Template) {
  class Host extends React.Component<AnyProps, { v: number; err: string | null }> {
    static contextType = DCLocaleContext
    static displayName = name.replace(/\s+/g, '')
    declare context: string
    logic: DCLogic

    constructor(props: AnyProps) {
      super(props)
      this.state = { v: 0, err: null }
      this.logic = new Logic(userProps(props))
      this.logic.__host = this
    }

    static getDerivedStateFromError(e: unknown) {
      return { err: e instanceof Error ? e.message : String(e) }
    }

    componentDidCatch(e: unknown) {
      console.error('[dc] render error in <' + name + '>:', e)
    }

    __setLogicState(update: any, cb?: () => void) {
      const prev = this.logic.state
      const patch = typeof update === 'function' ? update(prev) : update
      this.logic.state = { ...prev, ...patch }
      this.setState((s) => ({ v: s.v + 1 }), cb)
    }

    componentDidMount() {
      try {
        this.logic.componentDidMount()
      } catch (e) {
        console.error(e)
      }
    }

    componentDidUpdate(prevProps: AnyProps) {
      this.logic.props = userProps(this.props)
      try {
        this.logic.componentDidUpdate(prevProps)
      } catch (e) {
        console.error(e)
      }
    }

    componentWillUnmount() {
      try {
        this.logic.componentWillUnmount()
      } catch (e) {
        console.error(e)
      }
    }

    render() {
      const up = userProps(this.props)
      this.logic.props = up
      if (this.state.err) {
        return <div className="sc-host" data-sc-name={name} style={this.props.__hostStyle} />
      }
      const prevLocale = renderLocale
      renderLocale = this.context || 'en'
      try {
        const vals = { ...up, ...(this.logic.renderVals() || {}) }
        return (
          <div className="sc-host" data-sc-name={name} style={this.props.__hostStyle}>
            {template(vals, this.logic)}
          </div>
        )
      } finally {
        renderLocale = prevLocale
      }
    }
  }
  return Host as unknown as React.ComponentType<AnyProps>
}

/* ---------- signed-in user (wired in via scripts/dc-port/patches.mjs) ---------- */

type DCUser = { name?: string; email?: string; initials?: string; avatarUrl?: string | null } | null | undefined

export function userName(u: DCUser, fallback = 'Sarah Mitchell') {
  return u ? u.name || u.email || fallback : fallback
}

/** Real avatar, or an initials disc in the design's avatar colour; the design photo when signed out (product shots). */
export function userAvatar(u: DCUser, fallback: string) {
  if (!u) return fallback
  if (u.avatarUrl) return u.avatarUrl
  const initials = (u.initials || userName(u).slice(0, 2)).toUpperCase().replace(/[^A-Z0-9]/g, '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#2a2b2e"/><text x="32" y="32" dy=".35em" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-size="24" font-weight="500" fill="#d4d6da">${initials}</text></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
