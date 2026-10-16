/**
 * Product analytics events. There's no analytics vendor wired in yet: events go
 * to `window.dataLayer` (Google Tag Manager-compatible) and are dispatched as a
 * `relay:analytics` DOM event, so a tag manager or provider can pick them up.
 * Never pass personal data (email, name) in props.
 */
type Props = Record<string, string | number | boolean | string[] | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === 'undefined') return
  try {
    ;(window.dataLayer ??= []).push({ event, ...props })
    window.dispatchEvent(new CustomEvent('relay:analytics', { detail: { event, props } }))
  } catch {}
}
