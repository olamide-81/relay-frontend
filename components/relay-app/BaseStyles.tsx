/**
 * Document-level styles from the designs' <helmet> blocks. The marketing site
 * and the app differ only in background and link transitions.
 */
const COMMON = `*,*::before,*::after{box-sizing:border-box}
html,body{height:100%;margin:0}
#dc-root,#dc-root>.sc-host{height:100%}
input::placeholder,textarea::placeholder{color:#62666d}
select option{background:#1c1d20;color:#f7f8f8}`

const SITE = `${COMMON}
html,body{background:#0f1011;color:#f7f8f8;font-family:"Geist",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:#8a8f98;text-decoration:none;transition:color .12s}
a:hover{color:#f7f8f8}`

const APP = `${COMMON}
html,body{background:#151618;color:#f7f8f8;font-family:"Geist",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:#8a8f98;text-decoration:none}
a:hover{color:#f7f8f8}`

export default function BaseStyles({ variant }: { variant: 'site' | 'app' }) {
  return <style dangerouslySetInnerHTML={{ __html: variant === 'site' ? SITE : APP }} />
}
