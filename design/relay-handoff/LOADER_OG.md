# Handoff: Relay landing loader + social preview

## Overview
Two things to implement in the Relay Next.js app (localhost:3000/en):
1. **Landing intro loader:** a full-screen R icon that fades in gently with a glass shine, then hands off to the hero entrance animation. The hero's dashboard preview shows a shimmering skeleton until it's ready, then crossfades.
2. **Social preview:** a 1200×630 Open Graph image plus the meta tags.

## About the design files
`source/*.dc.html` are **HTML design references**. Open them in a browser to see the exact motion. Rebuild them with the app's own React components and Tailwind; don't ship the HTML. `Relay Landing.dc.html#hold-intro` keeps the loader on screen so you can inspect it.

## Fidelity
High-fidelity. Match the timings, easings, sizes and colors exactly.

---

## 1. Intro loader

### Structure
```
<IntroLoader>                     position:fixed; inset:0; z-index:200; bg #0f1011; flex center
  <Stage>                         position:relative   (exit transform + blur live here)
    <Glow/>                       absolute, centered, 160×160, radial-gradient(closest-side, rgba(255,255,255,.07), transparent)
    <IconTile>                    44×44, radius 10px, overflow:hidden
                                  box-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 16px 40px -10px rgba(0,0,0,.85)
      <img src="/relay-icon.png" 44×44 />
      <Shine/>                    absolute inset 0, pointer-events none
                                  linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.28) 48%, rgba(255,255,255,0) 64%)
    </IconTile>
  </Stage>
</IntroLoader>
```

### Timeline (t = 0 at mount)
| t | What happens | CSS |
|---|---|---|
| 0 | Initial state | Tile: `opacity:0; filter:blur(8px); transform:scale(.96)`. Shine: `translateX(-130%)`. Glow: `opacity:0` |
| 60ms | Set `revealed=true` | Tile → `opacity:1` (1.6s `cubic-bezier(.4,0,.2,1)`), `blur(0)` (1.6s `cubic-bezier(.2,.8,.2,1)`), `scale(1)` (2s `cubic-bezier(.2,.8,.2,1)`). Glow → `opacity:1` (1.8s ease-out) |
| 60ms + .75s delay | Shine sweeps once | Shine → `translateX(130%)`, 1.4s `cubic-bezier(.4,0,.2,1)`, delay .75s |
| max(2.1s, fonts ready) + 120ms | Set `phase='out'` **and** start the hero entrance | Overlay → `opacity:0; visibility:hidden` (.6s `cubic-bezier(.4,0,.2,1)`). Stage → `scale(1.06)` (.8s `cubic-bezier(.2,.8,.2,1)`), `blur(6px)` (.6s) |
| out + 1.1s | Unmount the overlay | — |
| 3.2s | Hard cap: force exit if fonts haven't resolved | — |

Gate on `Promise.all([document.fonts.ready, wait(2100)])`, with `setTimeout(finish, 3200)` as the fallback. Make `finish()` safe to call twice.

### Reduced motion
With `prefers-reduced-motion: reduce`, don't render the overlay; mark the hero as ready immediately.

### Avoiding a flash
Render the overlay in the server HTML (it's in the initial markup, not mounted after hydration), so the page never shows a frame of unstyled hero first. Optionally show it only on the first visit per session: `sessionStorage['relay-intro']`.

### Hero entrance (already built — trigger it from the loader)
When `phase='out'`, set the hero `ready` flag that the existing entrance uses:
- Headline: opacity, translateY 18px → 0, blur 8px → 0; .9s, delay .15s.
- Paragraph: delay .3s. Buttons: delay .42s. "New" link: opacity, delay .55s.
- Dashboard frame: opacity 1.2s with delay .55s, plus `rotateX(20deg) scale(.9) translateY(40px)` → scroll-linked tilt. Its glass shine runs `translateX(-120%)` → `120%` over 1.8s `cubic-bezier(.4,0,.2,1)`, delay .9s.

---

## 2. Dashboard skeleton (hero frame)

Shown inside the hero dashboard frame until the real dashboard preview has painted, then crossfaded.

- **Canvas:** an absolute 1440×900 layer, `transform-origin:0 0`, scaled by the same factor as the preview (`frameWidth / 1440`). Background #151618.
- **Panels** (`inset 0 0 0 1px rgba(255,255,255,.055)`), as x, y, w, h, radius:
  - Content panel: 256, 8, 1176, 884, r12, bg #161719.
  - Topbar divider: 256, 68, 1176, 1, rgba(255,255,255,.06).
  - Hero card: 296, 184, 1096, 236, r12, bg rgba(255,255,255,.012).
  - 4 KPI cards: x ∈ {296, 573, 850, 1127}, y 444, 265×96, r10.
  - 2 list cards: x ∈ {296, 850}, y 564, 542×300, r12.
- **Bones:** background rgba(255,255,255,.055), radius 4px unless noted, as [x, y, w, h, r]:
  - **Sidebar:**
    - Logo [16,21,18,18] and [42,24,52,12].
    - Nav: 3 rows at y = 64 + i·32, each an icon [18,y,16,16] plus a label [44,y+2,w,12], with w = 78/52/64.
    - Section label [18,176,70,9], then 4 rows from y 200 (w = 64/72/86/58).
    - Section label [18,340,62,9], then 4 rows from y 364 (w = 112/92/98/84).
    - Footer avatar [16,856,28,28,r14] and [52,864,96,12].
  - **Topbar:** [276,30,16,16], [300,32,84,12], search [924,21,380,34,r9], bell [1314,21,34,34,r17], avatar chip [1356,21,62,34,r17].
  - **Heading:** [296,108,200,22,r6], [296,142,340,12].
  - **Hero card:**
    - Text: [324,212,120,11], [324,238,380,30,r6], [324,280,260,12], [324,300,220,12].
    - Pills: [324,360,104,30,r15], [438,360,88,30,r15], [536,360,96,30,r15].
    - Ring: [1180,228,180,160,r80].
  - **KPI cards (each):** [x+18,464,84,10] and [x+18,488,112,26,r6].
  - **List cards (each):**
    - Header [x+20,584,130,12].
    - 5 rows at y = 620 + i·46: avatar [x+20,y,30,30,r8], title [x+64,y+3,w,11], subtitle [x+64,y+20,0.6w,8], value [x+466,y+10,56,10].
    - Title width w is picked from (180, 140, 200, 160, 124) at index (i + c) % 5, where c is the card index (0 or 1).
- **Shimmer (synchronized):**
  - Each bone has `overflow:hidden`. Inside it, a 520px band `linear-gradient(100deg, transparent 0%, rgba(255,255,255,.075) 50%, transparent 100%)` with `margin-left: -boneX px`, so every band shares frame coordinates and the sweep reads as one light pass across the whole UI.
  - `@keyframes sweep { from { transform: translateX(-560px) } to { transform: translateX(2000px) } }`, 2s `cubic-bezier(.45,0,.25,1)`, infinite.
  - Turn the animation off with `prefers-reduced-motion`.
  - In React, build this from one array of boxes. An alternative is a single masked gradient layer: an SVG mask of the bones with one moving gradient on top.
- **Swap:**
  - Wait until the real preview is ready: the image's `onLoad`, or the component's mounted and painted signal, plus 450ms.
  - Then crossfade over .7s `cubic-bezier(.4,0,.2,1)`: preview opacity 0 → 1, skeleton 1 → 0.
  - Fallback swap at 6s.
  - Recommended in production: use a static `dashboard-hero.webp` (2880×1800) instead of an iframe, so the swap fires on image load.

---

## 3. Social preview

- **Asset:** `assets/og-image.png`, 1200×630. Put it at `public/og-image.png`.
- **Layout (source: `Relay Social Preview.dc.html`):**
  - Background #0f1011, with a faint 48px grid masked toward the right and a mint radial glow (rgba(111,227,180,.10)) on the right.
  - Left column at x 72, top 64 / bottom 64, width 520:
    - R icon 36px (radius 8) + "Relay" (Geist 26/600, −0.025em) + "by Gratebridge" (16px, #62666d).
    - Pinned to the bottom: H1 "Every financial Provider. One directory." (Geist 68/500, line-height 1, −0.05em), where "One directory." is #8a8f98.
    - Then the subline (21px/1.45, #8a8f98).
  - Right: a dashboard Directory screenshot at x 600, top 118, inside a 10px glass bezel (radius 22 outer, 14 inner). It fades out to the left and toward the bottom.
  - No URL text and no category dots.
- **Meta:** in the Next.js App Router, set this in `app/[locale]/layout.tsx` via `metadata`:
```ts
export const metadata = {
  metadataBase: new URL('https://relay.gratebridge.com'),
  title: 'Relay — Every financial Provider. One directory.',
  description: 'Find, compare and partner with 1,600 Providers across 140 countries.',
  themeColor: '#0f1011',
  openGraph: { type: 'website', siteName: 'Relay', url: '/', title: 'Relay — Every financial Provider. One directory.', description: 'Find, compare and partner with 1,600 Providers across 140 countries.', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Relay' }] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] }
};
```
- **Check it:** after deploying, test with opengraph.xyz or the LinkedIn Post Inspector.

## Files
- `CLAUDE_CODE_PROMPT.md`: paste this into Claude Code.
- `assets/og-image.png`, `assets/relay-icon.png`.
- `source/Relay Landing.dc.html`: the loader and skeleton reference (search for `Intro loader` and `Dashboard skeleton`; data in `SK_BOXES` / `SK_BONES`).
- `source/Relay Social Preview.dc.html` and `source/assets/og-directory.png`.
