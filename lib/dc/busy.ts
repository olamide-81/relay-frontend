/**
 * Loading state for the design's buttons (spans/divs with onClick): an API request
 * started by a click shows a spinner inside the clicked control until it settles.
 * Requests made later (debounced saves, polling) aren't tied to a click.
 */

const CSS = `
[data-dc-busy]{color:transparent!important;pointer-events:none;cursor:progress}
[data-dc-busy]>*{opacity:0!important}
[data-dc-busy-rel]{position:relative}
[data-dc-busy]::after{content:'';position:absolute;inset:0;margin:auto;width:14px;height:14px;box-sizing:border-box;border-radius:50%;border:2px solid var(--dc-spin,#f7f8f8);border-right-color:transparent;animation:dc-busy-spin .6s linear infinite}
@keyframes dc-busy-spin{to{transform:rotate(360deg)}}
`

const SHOW_AFTER_MS = 120

let enabled = 0
let armed: HTMLElement | null = null
let disarm: ReturnType<typeof setTimeout> | undefined
const pending = new Map<HTMLElement, number>()

/** The control a click landed on: a compact clickable element, not a list row or card. */
function controlFor(target: EventTarget | null): HTMLElement | null {
  let el = target instanceof Element ? (target as HTMLElement) : null
  for (let depth = 0; el && depth < 6; depth++, el = el.parentElement) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return null
    if (getComputedStyle(el).cursor !== 'pointer' && el.tagName !== 'BUTTON') continue
    const r = el.getBoundingClientRect()
    return r.height <= 44 && r.width <= 360 && el.textContent?.trim() ? el : null
  }
  return null
}

function onClick(e: MouseEvent) {
  armed = controlFor(e.target)
  clearTimeout(disarm)
  disarm = setTimeout(() => (armed = null), 0)
}

function mark(el: HTMLElement) {
  if (!el.isConnected) return
  const cs = getComputedStyle(el)
  el.style.setProperty('--dc-spin', cs.color)
  if (cs.position === 'static') el.setAttribute('data-dc-busy-rel', '')
  el.setAttribute('data-dc-busy', '')
}

function unmark(el: HTMLElement) {
  el.removeAttribute('data-dc-busy')
  el.removeAttribute('data-dc-busy-rel')
  el.style.removeProperty('--dc-spin')
}

/** Tie a request to the control that was just clicked (no-op outside a click). */
export function trackBusy<T>(request: Promise<T>): Promise<T> {
  const el = enabled ? armed : null
  if (!el) return request
  pending.set(el, (pending.get(el) ?? 0) + 1)
  const show = setTimeout(() => pending.has(el) && mark(el), SHOW_AFTER_MS)
  const done = () => {
    const left = (pending.get(el) ?? 1) - 1
    if (left > 0) return void pending.set(el, left)
    clearTimeout(show)
    pending.delete(el)
    unmark(el)
  }
  request.then(done, done)
  return request
}

/** Turn button spinners on while the dashboard is mounted. Returns the cleanup. */
export function enableBusyButtons() {
  if (typeof document === 'undefined') return () => {}
  if (enabled++ === 0) {
    document.addEventListener('click', onClick, true)
    if (!document.getElementById('dc-busy-css')) {
      const style = document.createElement('style')
      style.id = 'dc-busy-css'
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }
  return () => {
    if (--enabled === 0) {
      document.removeEventListener('click', onClick, true)
      pending.forEach((_, el) => unmark(el))
      pending.clear()
    }
  }
}
