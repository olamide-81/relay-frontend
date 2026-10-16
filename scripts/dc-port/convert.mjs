#!/usr/bin/env node
/**
 * Ports Claude Design `.dc.html` files into React components.
 *
 *   npm run design:port            (reads design/relay-handoff)
 *   node scripts/dc-port/convert.mjs [design source dir] [out dir]
 *
 * The template becomes JSX (inline styles kept exactly, `style-hover` etc.
 * become generated pseudo-class rules), and the logic class is copied
 * verbatim. Semantics follow the design runtime (support.js) so the result
 * renders identically. Output: components/relay/*.tsx + components/relay/pseudo.css.
 */
import fs from 'node:fs'
import path from 'node:path'
import { parseFragment } from 'parse5'
import prettier from 'prettier'
import PATCHES from './patches.mjs'

const SRC = process.argv[2] ?? 'design/relay-handoff'
const OUT = process.argv[3] ?? 'components/relay'

/* Files that are references/boards, not product UI. */
const SKIP = new Set(['Relay Feedback', 'Relay Category Identity v2', 'Relay Mobile Preview', 'Relay Social Preview'])

const warnings = []
const warn = (file, msg) => warnings.push(`${file}: ${msg}`)

/* ---------------- preprocessing (mirrors support.js encodeCase) ---------------- */

const CAMEL_ATTR = 'sc-camel-'
const RAW_WRAP = {
  select: 'sc-raw-select',
  table: 'sc-raw-table',
  tbody: 'sc-raw-tbody',
  thead: 'sc-raw-thead',
  tfoot: 'sc-raw-tfoot',
  tr: 'sc-raw-tr',
  td: 'sc-raw-td',
  th: 'sc-raw-th',
  caption: 'sc-raw-caption',
}
const RAW_UNWRAP = Object.fromEntries(Object.entries(RAW_WRAP).map(([k, v]) => [v, k]))
const ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`
const IMPORT_SELF_CLOSE_RE = new RegExp('<(x-import|dc-import)(' + ATTRS + ')/>', 'gi')
const CAMEL_ATTR_RE = /(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)/g

function encodeCase(html) {
  html = html.replace(IMPORT_SELF_CLOSE_RE, (_, t, a) => '<' + t + a + '></' + t + '>')
  html = html.replace(/<helmet(\s|>)/gi, '<sc-helmet$1')
  html = html.replace(/<\/helmet\s*>/gi, '</sc-helmet>')
  html = html.replace(
    CAMEL_ATTR_RE,
    (_, sp, name, eq) => sp + CAMEL_ATTR + name.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()) + eq
  )
  for (const [real, alias] of Object.entries(RAW_WRAP)) {
    html = html.replace(new RegExp('(</?)' + real + '(?=[\\s>])', 'gi'), '$1' + alias)
  }
  return html
}

const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

function cssToObj(css) {
  const o = {}
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim()
  }
  return o
}

/* ---------------- expressions (mirrors support.js resolve) ---------------- */

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*/
const NUMBER_RE = /^-?\d+(\.\d+)?$/

function parensWrapWhole(expr) {
  let depth = 0
  for (let i = 0; i < expr.length - 1; i++) {
    if (expr[i] === '(') depth++
    else if (expr[i] === ')') {
      depth--
      if (depth === 0) return false
    }
  }
  return true
}

function findTopLevelEquality(expr) {
  let depth = 0
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i]
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth--
    else if (depth === 0 && (c === '=' || c === '!') && expr[i + 1] === '=') {
      if (i > 0 && (expr[i - 1] === '=' || expr[i - 1] === '!')) continue
      if (!expr.slice(0, i).trim()) continue
      const op = expr[i + 2] === '=' ? c + '==' : c + '='
      return { index: i, op }
    }
  }
  return null
}

function cexpr(src, scope) {
  const expr = String(src).trim()
  if (!expr) return 'undefined'
  if (expr[0] === '(' && expr[expr.length - 1] === ')' && parensWrapWhole(expr)) {
    return cexpr(expr.slice(1, -1), scope)
  }
  const eq = findTopLevelEquality(expr)
  if (eq) {
    const l = cexpr(expr.slice(0, eq.index), scope)
    const r = cexpr(expr.slice(eq.index + eq.op.length), scope)
    return `(${l} ${eq.op} ${r})`
  }
  if (expr[0] === '!') return `!(${cexpr(expr.slice(1), scope)})`
  if (['true', 'false', 'null', 'undefined'].includes(expr)) return expr
  if (NUMBER_RE.test(expr)) return expr
  if (expr.length >= 2 && (expr[0] === '"' || expr[0] === "'") && expr[expr.length - 1] === expr[0]) {
    return JSON.stringify(expr.slice(1, -1))
  }
  return cpath(expr, scope)
}

function cpath(expr, scope) {
  const head = expr.match(IDENT_RE)
  if (!head) return 'undefined'
  let out = `${scope}.${head[0]}`
  let i = head[0].length
  while (i < expr.length) {
    if (expr[i] === '.') {
      const rest = expr.slice(i + 1)
      const m = rest.match(IDENT_RE) || rest.match(/^\d+/)
      if (!m) return 'undefined'
      out += /^\d/.test(m[0]) ? `?.[${m[0]}]` : `?.${m[0]}`
      i += 1 + m[0].length
    } else if (expr[i] === '[') {
      let depth = 1
      let j = i + 1
      while (j < expr.length && depth > 0) {
        if (expr[j] === '[') depth++
        else if (expr[j] === ']') {
          depth--
          if (depth === 0) break
        }
        j++
      }
      if (depth !== 0) return 'undefined'
      out += `?.[${cexpr(expr.slice(i + 1, j), scope)}]`
      i = j + 1
    } else {
      return 'undefined'
    }
  }
  return out
}

/** Attribute value → { code, static } (mirrors compileAttr). */
function cattr(raw, scope) {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/)
  if (whole) return { code: cexpr(whole[1], scope), isStatic: false, whole: true }
  if (raw.includes('{{')) {
    const parts = raw.split(/\{\{([\s\S]+?)\}\}/g)
    const code =
      '`' +
      parts
        .map((s, i) =>
          i & 1 ? '${' + cexpr(s, scope) + ' ?? ""}' : s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
        )
        .join('') +
      '`'
    return { code, isStatic: false, whole: false }
  }
  return { code: JSON.stringify(raw), isStatic: true, value: raw }
}

/** JSX attribute: plain quotes when safe, braces otherwise. */
function jsxAttr(k, code, v) {
  if (v.isStatic && code === v.code && /^[^"&\\{}<>\n]*$/.test(v.value)) return `${k}="${v.value}"`
  return `${k}={${code}}`
}

/* ---------------- pseudo classes (mirrors support.js pseudo.ts) ---------------- */

function scanUnquotedUrl(css, i) {
  if ((css[i] !== 'u' && css[i] !== 'U') || css.slice(i, i + 4).toLowerCase() !== 'url(' || /[a-z0-9_-]/i.test(css[i - 1] ?? '')) {
    return -1
  }
  let j = i + 4
  while (j < css.length && /\s/.test(css[j])) j++
  if (css[j] === '"' || css[j] === "'") return -1
  while (j < css.length && css[j] !== ')') {
    if (css[j] === '\\') j++
    j++
  }
  return j < css.length ? j + 1 : css.length
}

function stripComments(css) {
  let out = ''
  let quote = ''
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (quote) {
      if (c === '\\') {
        out += c + (css[i + 1] ?? '')
        i++
        continue
      }
      if (c === quote) quote = ''
      out += c
    } else if (c === "'" || c === '"') {
      quote = c
      out += c
    } else if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      i = end === -1 ? css.length : end + 1
      out += ' '
    } else {
      const end = scanUnquotedUrl(css, i)
      if (end === -1) out += c
      else {
        out += css.slice(i, end)
        i = end - 1
      }
    }
  }
  return out
}

function importantify(css) {
  css = stripComments(css)
  const decls = []
  let start = 0
  let depth = 0
  let quote = ''
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = ''
    } else if (c === "'" || c === '"') quote = c
    else if (c === '(') depth++
    else if (c === ')') depth = Math.max(0, depth - 1)
    else if (c === ';' && depth === 0) {
      decls.push(css.slice(start, i))
      start = i + 1
    } else {
      const end = scanUnquotedUrl(css, i)
      if (end !== -1) i = end - 1
    }
  }
  decls.push(css.slice(start))
  return decls
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => (/!\s*important$/i.test(d) ? d : d + ' !important'))
    .join(';')
}

function hash(s) {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return (h >>> 0).toString(36)
}

const pseudoRules = new Map()
function pseudoClass(file, pseudo, css) {
  if (css.includes('{{')) warn(file, `style-${pseudo} contains a hole; holes are not supported in pseudo styles`)
  const cls = 'dcp-' + hash(pseudo + '|' + css)
  if (!pseudoRules.has(cls)) {
    const el = pseudo === 'before' || pseudo === 'after'
    const sel = el ? `.${cls}::${pseudo}` : `.${cls}:${pseudo}`
    pseudoRules.set(cls, `${sel}{${el ? css : importantify(css)}}`)
  }
  return cls
}

/* ---------------- JSX generation ---------------- */

const EVENT_MAP = {
  onclick: 'onClick', onchange: 'onChange', oninput: 'onInput', onsubmit: 'onSubmit', onkeydown: 'onKeyDown',
  onkeyup: 'onKeyUp', onkeypress: 'onKeyPress', onmousedown: 'onMouseDown', onmouseup: 'onMouseUp',
  onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave', onfocus: 'onFocus', onblur: 'onBlur',
  ondoubleclick: 'onDoubleClick', oncontextmenu: 'onContextMenu', onmousemove: 'onMouseMove',
  onmouseover: 'onMouseOver', onmouseout: 'onMouseOut', onpointerdown: 'onPointerDown', onpointerup: 'onPointerUp',
  onpointermove: 'onPointerMove', onpointerenter: 'onPointerEnter', onpointerleave: 'onPointerLeave',
  ontransitionend: 'onTransitionEnd', onanimationend: 'onAnimationEnd',
}
const ATTR_MAP = {
  tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', minlength: 'minLength',
  autocomplete: 'autoComplete', autofocus: 'autoFocus', spellcheck: 'spellCheck', contenteditable: 'contentEditable',
  colspan: 'colSpan', rowspan: 'rowSpan', crossorigin: 'crossOrigin', srcset: 'srcSet', enctype: 'encType',
  novalidate: 'noValidate', inputmode: 'inputMode', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen',
  datetime: 'dateTime', accesskey: 'accessKey', referrerpolicy: 'referrerPolicy', playsinline: 'playsInline',
  autoplay: 'autoPlay', enterkeyhint: 'enterKeyHint', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace',
}

const compName = (n) => n.replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join('')

class Ctx {
  constructor(file) {
    this.file = file
    this.imports = new Set()
    this.helmetCss = []
    this.helmetOther = []
    this.depth = 0
  }
}

function attrName(a) {
  let n = a.prefix ? `${a.prefix}:${a.name}` : a.name
  if (n.startsWith(CAMEL_ATTR)) n = kebabToCamel(n.slice(CAMEL_ATTR.length))
  return n
}

function textOf(node) {
  return (node.childNodes || []).map((c) => (c.nodeName === '#text' ? c.value : textOf(c))).join('')
}

function walkChildren(node, scope, ctx) {
  const kids = node.content ? node.content.childNodes : node.childNodes || []
  return kids.map((c) => walk(c, scope, ctx)).filter((x) => x != null)
}

function walk(node, scope, ctx) {
  if (node.nodeName === '#text') return walkText(node.value, scope, ctx)
  if (node.nodeName === '#comment' || node.nodeName === '#documentType') return null
  const tag = node.tagName
  if (tag === 'sc-for') return walkFor(node, scope, ctx)
  if (tag === 'sc-if') return walkIf(node, scope, ctx)
  if (tag === 'sc-helmet') return walkHelmet(node, ctx)
  if (tag === 'dc-import') return walkImport(node, scope, ctx)
  if (tag === 'x-import' || tag === 'sc-else') warn(ctx.file, `unsupported <${tag}>`)
  return walkElement(node, scope, ctx)
}

/* Literal text: outside <pre>, a whitespace run renders as one space, so emit that. */
function lit(p, ctx) {
  if (!ctx.pre) {
    if (!p.trim()) return ctx.svg ? '' : `{' '}`
    p = p.replace(/\s*\n\s*/g, ' ')
  }
  if (!ctx.pre && /^[^{}<>&\n]+$/.test(p) && p.trim() === p) return p
  return `{${JSON.stringify(p)}}`
}

function walkText(txt, scope, ctx) {
  if (!txt.includes('{{')) {
    if (!txt.trim() && !txt.includes(' ')) return null
    return lit(txt, ctx)
  }
  const parts = txt.split(/\{\{([\s\S]+?)\}\}/g)
  return parts
    .map((p, i) => (i & 1 ? (ctx.plainText ? `{holeText(${cexpr(p, scope)})}` : `{hole(${cexpr(p, scope)})}`) : p ? lit(p, ctx) : ''))
    .join('')
}

function walkFor(node, scope, ctx) {
  const get = (n) => node.attrs.find((a) => a.name === n)?.value
  const src = get('list') || ''
  const as = get('as') || 'item'
  const l = cattr(src, scope)
  ctx.depth++
  const inner = `v${ctx.depth}`
  const kids = walkChildren(node, inner, ctx)
  ctx.depth--
  const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(as) ? as : JSON.stringify(as)
  return `{list(${l.code}).map((it${ctx.depth + 1}, i${ctx.depth + 1}) => { const ${inner} = { ...${scope}, ${key}: it${ctx.depth + 1}, $index: i${ctx.depth + 1} }; return (<React.Fragment key={i${ctx.depth + 1}}>${kids.join('')}</React.Fragment>) })}`
}

function walkIf(node, scope, ctx) {
  const v = node.attrs.find((a) => a.name === 'value')?.value || ''
  const c = cattr(v, scope)
  const kids = walkChildren(node, scope, ctx)
  return `{${c.code} ? (<>${kids.join('')}</>) : null}`
}

function walkHelmet(node, ctx) {
  for (const c of node.childNodes || []) {
    if (c.nodeName === 'style') ctx.helmetCss.push(textOf(c).trim())
    else if (c.nodeName === 'link' || c.nodeName === 'script') {
      const at = Object.fromEntries(c.attrs.map((a) => [a.name, a.value]))
      ctx.helmetOther.push(`${c.nodeName} ${at.src ?? at.href ?? ''}`)
    } else if (c.nodeName !== '#text' && c.nodeName !== 'meta') warn(ctx.file, `helmet child <${c.nodeName}> ignored`)
  }
  return null
}

function walkImport(node, scope, ctx) {
  let name = ''
  let style = null
  const props = []
  for (const a of node.attrs) {
    let k = attrName(a)
    if (k === 'name' || k === 'component') {
      name = a.value
      continue
    }
    if (k === 'sc-name' || k === 'data-dc-tpl' || k === 'hint-size') continue
    if (k === 'style') {
      style = a.value
      continue
    }
    if (k.startsWith('style-')) continue
    if (k.includes('-')) k = kebabToCamel(k)
    const v = cattr(a.value, scope)
    if (k === 'dcProps') props.push(`{...(${v.code})}`)
    else props.push(jsxAttr(k, v.code, v))
  }
  if (style != null) {
    const s = cattr(style, scope)
    if (s.isStatic) {
      const hs = hostStyleStatic(s.value)
      if (hs) props.push(`__hostStyle={${JSON.stringify(hs)}}`)
    } else props.push(`__hostStyle={hostStyle(${s.code})}`)
  }
  const C = compName(name)
  ctx.imports.add(JSON.stringify([C, name]))
  const kids = walkChildren(node, scope, ctx)
  return kids.length ? `<${C} ${props.join(' ')}>${kids.join('')}</${C}>` : `<${C} ${props.join(' ')} />`
}

const HOST_STYLE_PROPS = new Set(['position', 'left', 'right', 'top', 'bottom', 'inset', 'width', 'height', 'z-index', 'transform'])
function hostStyleStatic(css) {
  const all = cssToObj(css)
  const out = {}
  for (const [k, v] of Object.entries(all)) {
    const kebab = k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
    if (HOST_STYLE_PROPS.has(kebab)) out[k] = v
  }
  return Object.keys(out).length ? out : null
}

function walkElement(node, scope, ctx) {
  const realTag = RAW_UNWRAP[node.tagName] || node.tagName
  const props = []
  const classes = []
  let classCode = null
  for (const a of node.attrs || []) {
    let k = attrName(a)
    if (k === 'sc-name' || k === 'data-dc-tpl' || k.startsWith('hint-')) continue
    if (k.startsWith('style-')) {
      classes.push(pseudoClass(ctx.file, k.slice(6), a.value))
      continue
    }
    const v = cattr(a.value, scope)
    if (k === 'class') {
      classCode = v.code
      continue
    }
    if (k === 'for') k = 'htmlFor'
    else if (k.startsWith('on') && !k.startsWith('on-')) k = EVENT_MAP[k] || 'on' + k[2].toUpperCase() + k.slice(3)
    else if (ATTR_MAP[k]) k = ATTR_MAP[k]
    else if (k.includes('-') && !k.startsWith('data-') && !k.startsWith('aria-')) k = kebabToCamel(k)

    if (k === 'style') {
      if (v.isStatic) props.push(`style={${JSON.stringify(cssToObj(v.value))}}`)
      else if (v.whole) props.push(`style={sty(${v.code})}`)
      else props.push(`style={css(${v.code})}`)
      continue
    }
    let code = v.code
    if (realTag === 'a' && k === 'href') code = `href(${code})`
    else if (realTag === 'iframe' && k === 'src') code = `frameSrc(${code})`
    else if (realTag === 'img' && k === 'src') code = `asset(${code})`
    if (!v.isStatic && (k === 'value' || k === 'checked')) code = `dv(${code}, ${k === 'checked' ? 'false' : '""'})`
    if (['checked', 'selected', 'disabled', 'hidden', 'readOnly', 'required', 'multiple', 'autoFocus', 'controls', 'open'].includes(k) && v.isStatic) {
      warn(ctx.file, `static boolean attribute ${k}="${v.value}" on <${realTag}> (passed through as-is)`)
    }
    props.push(jsxAttr(k, code, v))
  }
  if (classes.length || classCode) {
    const parts = [classCode, classes.length ? JSON.stringify(classes.join(' ')) : null].filter(Boolean)
    props.push(parts.length === 1 ? `className={${parts[0]}}` : `className={[${parts.join(', ')}].filter(Boolean).join(' ')}`)
  }
  if (realTag === 'textarea' || realTag === 'select') {
    if ((node.childNodes || []).some((c) => c.nodeName !== '#text' || c.value.trim()) && realTag === 'textarea') {
      warn(ctx.file, `<textarea> has children`)
    }
  }
  const tag = realTag === 'a' ? 'A' : realTag
  const styleRaw = (node.attrs || []).find((a) => a.name === 'style')?.value || ''
  const prevPre = ctx.pre
  const prevSvg = ctx.svg
  if (realTag === 'pre' || realTag === 'textarea' || /white-space:\s*(pre|break-spaces)/.test(styleRaw)) ctx.pre = true
  if (realTag === 'svg') ctx.svg = true
  const prevPlain = ctx.plainText
  if (realTag === 'option' || realTag === 'title' || realTag === 'textarea') ctx.plainText = true
  if (realTag === 'text' || realTag === 'tspan' || realTag === 'foreignObject') ctx.svg = false
  const kids = walkChildren(node, scope, ctx)
  ctx.pre = prevPre
  ctx.svg = prevSvg
  ctx.plainText = prevPlain
  if (realTag === 'textarea') kids.length = 0
  return kids.length ? `<${tag} ${props.join(' ')}>${kids.join('')}</${tag}>` : `<${tag} ${props.join(' ')} />`
}

/* ---------------- logic transform ---------------- */

function transformLogic(js, file) {
  let out = js
  out = out.replace(/window\.RELAY/g, 'RELAY')
  out = out.replace(/(?:window\.)?location\.href\s*=(?!=)\s*([^;\n]+);?/g, 'dcNavigate($1);')
  out = out.replace(/(?:window\.)?location\.search/g, 'dcSearch()')
  if (/\bdocument\.write|\beval\(/.test(out)) warn(file, 'logic uses document.write/eval')
  return out
}

/* ---------------- main ---------------- */

function applyPatches(base, kind, src) {
  for (const [find, replace] of PATCHES[base]?.[kind] ?? []) {
    if (find instanceof RegExp) {
      if (!new RegExp(find.source, find.flags.replace('g', '')).test(src)) throw new Error(`${base}: ${kind} patch not found in design:\n  ${find}`)
      src = src.replace(find, replace)
      continue
    }
    if (!src.includes(find)) throw new Error(`${base}: ${kind} patch not found in design:\n  ${find.slice(0, 160)}`)
    src = src.split(find).join(replace)
  }
  return src
}

async function convertFile(fp) {
  const base = path.basename(fp).replace(/\.dc\.html$/, '')
  const text = fs.readFileSync(fp, 'utf8')
  const open = /<x-dc(?:\s[^>]*)?>/.exec(text)
  const close = text.lastIndexOf('</x-dc>')
  const template = applyPatches(base, 'template', text.slice(open.index + open[0].length, close))
  const sm = [...text.matchAll(/<script type="text\/x-dc" data-dc-script[^>]*>([\s\S]*?)<\/script>/g)].pop()
  let js = applyPatches(base, 'logic', sm ? sm[1] : 'class Component extends DCLogic {}')
  const patch = PATCHES[base] ?? {}
  if (patch.prelude) js = patch.prelude + '\n' + js
  if (patch.vals) {
    js += `\n{\n  const designVals = Component.prototype.renderVals\n  const appVals = ${patch.vals}\n  Component.prototype.renderVals = function () {\n    const v = designVals.call(this)\n    return { ...v, ...appVals.call(this, v) }\n  }\n}\n`
  }
  if (patch.after) js += '\n' + patch.after + '\n'

  const ctx = new Ctx(base)
  const frag = parseFragment(encodeCase(template))
  const kids = walkChildren(frag, 'v0', ctx)
  const C = compName(base)
  const imports = [...ctx.imports].map((s) => JSON.parse(s)).filter(([n]) => n !== C)
  const logic = transformLogic(js, base)
  const usesRelay = /\bRELAY\b/.test(logic)

  const src = `// @ts-nocheck
/* eslint-disable */
/**
 * ${C} — ported from the Claude Design file "${base}.dc.html".
 * Generated by scripts/dc-port/convert.mjs: the template is compiled to JSX and
 * the logic class is the design's own. Re-run the converter rather than
 * hand-editing layout; product wiring lives in the files that render this.
 */
'use client'

import React from 'react'
import { DCLogic, defineDC, hole, css, sty, list, hostStyle, href, frameSrc, asset, dv, A, dcNavigate, dcSearch, userName, userAvatar, holeText } from '@/lib/dc/runtime'
${usesRelay ? "import { RELAY } from '@/lib/dc/relay-data'\n" : ''}${imports.map(([n]) => `import ${n} from './${n}'`).join('\n')}

${logic.trim()}

function template(v0, self) {
  return (<>${kids.join('')}</>)
}

export default defineDC(${JSON.stringify(base)}, Component, template)
`
  let formatted
  try {
    formatted = await prettier.format(src, { parser: 'babel-ts', semi: false, singleQuote: true, printWidth: 120 })
  } catch (e) {
    warn(base, 'prettier failed: ' + e.message.split('\n')[0])
    formatted = src
  }
  fs.writeFileSync(path.join(OUT, C + '.tsx'), formatted)
  return { base, C, helmetCss: ctx.helmetCss, helmetOther: ctx.helmetOther, imports: imports.map(([, n]) => n) }
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.dc.html')).sort()
fs.mkdirSync(OUT, { recursive: true })
const manifest = []
for (const f of files) {
  const base = f.replace(/\.dc\.html$/, '')
  if (SKIP.has(base)) continue
  manifest.push(await convertFile(path.join(SRC, f)))
}
fs.writeFileSync(
  path.join(OUT, 'pseudo.css'),
  '/* Generated by scripts/dc-port/convert.mjs — :hover/:focus/:active states from the designs. */\n' +
    [...pseudoRules.values()].join('\n') +
    '\n'
)
fs.writeFileSync(path.join('scripts/dc-port', 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`converted ${manifest.length} files, ${pseudoRules.size} pseudo rules`)
if (warnings.length) console.log('warnings:\n  ' + warnings.join('\n  '))
