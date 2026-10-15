# Handoff: Relay by Gratebridge — Marketing website + Product dashboard

## Overview
Relay by Gratebridge (a Gratebridge Labs product, `relay.gratebridge.com`) is a directory for fintech teams to discover, compare and partner with financial infrastructure Providers worldwide (Collections, Payouts, FX, Cards, KYC, Banks).

This bundle contains the **complete, final design** for:
1. **The marketing website** — landing page + every sub-page + Login / Sign up.
2. **The product dashboard** — app shell, every sidebar page, every modal, flow, toast and confirmation.

Both already exist in the codebase. **The task is to re-skin and upgrade the existing implementations so they match these designs exactly** — every pixel, word, colour, font weight, spacing value, animation and interaction. Do not invent, paraphrase or "improve" anything. When in doubt, open the HTML file and copy the value.

## About the design files
The files in `source/` are **design references built in HTML** (a small React-like runtime called "Design Components", `*.dc.html`). They are prototypes showing the intended look and behaviour — **not production code to paste in**. Recreate them in the target codebase's existing stack (React/Next, Vue, etc.) using its established patterns.

### How to read a `.dc.html` file
Each file has two parts:
- **Template** (inside `<x-dc>…</x-dc>`): HTML with **all styles inline**. Every colour, size, radius, shadow, transition and copy string is literally on the element. `style-hover="…"`, `style-focus="…"`, `style-active="…"` are the `:hover` / `:focus` / `:active` states. `{{ path }}` holes are values computed in the logic class.
- **Logic** (`<script type="text/x-dc" data-dc-script>` → `class Component extends DCLogic`): behaves like a React class component. `state` + `setState`; `renderVals()` returns everything the template reads (computed styles, lists, handlers). **All data, copy arrays, timings and state machines live here.**
- `<sc-for list="{{ items }}" as="x">` = map; `<sc-if value="{{ cond }}">` = conditional.
- `<dc-import name="Relay App Icon" kind="fx" size="32">` = render the sibling component `Relay App Icon.dc.html` with props.
- `<helmet>` = head content (fonts, `relay-data.js`, body resets).

### Viewing them
Serve the `source/` folder with any static server (`npx serve source`) and open e.g. `Relay Landing.dc.html` or `Relay Dashboard.dc.html`. `support.js` is the runtime; keep it beside the files. `?plan=pro` on the dashboard URL shows the Pro state (no upgrade banner).

## Fidelity
**High-fidelity, final.** Exact colours, typography, spacing, radii, shadows, copy and motion. Match pixel-for-pixel.

---

## Design tokens

### Colour
| Role | Value |
|---|---|
| Site background | `#0f1011` |
| App base (sidebar / chrome) | `#151618` |
| App content panel | `#161719` (1px border `rgba(255,255,255,.055)`, radius 12px, margin 8px 8px 8px 0, `box-shadow: inset 0 1px 0 rgba(255,255,255,.03), 0 8px 24px rgba(0,0,0,.18)`) |
| Card surface (site) | `#121315` (hover `#16171a`) |
| Raised surface / modal | `rgba(28,29,32,.97)` + `backdrop-filter: blur(20px)` |
| Popover / menu | `rgba(32,33,37,.9)` + `blur(18px) saturate(140%)` |
| Text primary | `#f7f8f8` |
| Text secondary | `#d4d6da` |
| Text body muted | `#b4b8bf` |
| Text tertiary | `#8a8f98` |
| Text quaternary / labels | `#62666d` |
| Disabled / dim | `#3a3c40` |
| Hairline | `rgba(255,255,255,.06)` (also .04 / .07 / .08 / .1 / .12 — use exactly what each element specifies) |
| Brand accent (Mint) | `#6fe3b4` |
| Primary button | bg `#f7f8f8`, text `#0f1011`, hover `#ffffff` (+ `translateY(-1px)` + `box-shadow: 0 10px 30px -8px rgba(255,255,255,.35)`) |

**Category colours (locked — accents only on dark UI):**
| Category | `kind` | Colour | RGB |
|---|---|---|---|
| All | `all` | Graphite tile | — |
| Collections | `collections` | Mint `#6FE3B4` | 111,227,180 |
| Payouts | `payouts` | Lime `#D6EE4E` | 214,238,78 |
| FX | `fx` | Sky `#8FB8FF` | 143,184,255 |
| Cards | `cards` | Lilac `#B9A3FF` | 185,163,255 |
| KYC | `kyc` | Peach `#FFAB7A` | 255,171,122 |
| Banks | `bank` | Rose `#FF8FB1` | 255,143,177 |

**Feedback colours:** success `#6FE3B4`, error `#FF7B7B`, warning `#F2C14E`, info `#8FB8FF`. Destructive text `#ff8a7a`. Pending/amber `#e9b949`. Favourite star `#e9b949`.

### Typography
- **Geist** (400/500/600) for all UI — Google Fonts. **Geist Mono** (400/500) for IDs, codes, eyebrows, licences.
- `-webkit-font-smoothing: antialiased` on body.
- Headline scale (site): H1 `clamp(44px,7vw,84px)` / 500 / line-height 1 / letter-spacing `-0.05em`; H2 `clamp(34px,4.4vw,52px)` / 500 / 1.04 / `-0.04em`; sub-page H1 `clamp(40px,6vw,72px)` / 1.02 / `-0.05em`.
- Two-tone headlines: first clause `#f7f8f8`, second clause in `<span style="color:#8a8f98">`.
- Eyebrow labels: Geist Mono 12px `#62666d`.
- App: page title 22px/500/`-0.02em`; body 13–13.5px; meta 12–12.5px.
- `text-wrap: balance` on headlines, `pretty` on paragraphs.
- Capitalisation rule: UI text starts with a capital letter; **"Provider(s)" is always capitalised**.

### Radii
6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 28px and `999px` pills — each element states its own. Buttons 8–10px. Cards 12–16px. Modals 14–16px. Category app-icon tiles: ~26% of size.

### Shadows
Hairline ring via `box-shadow: 0 0 0 1px rgba(255,255,255,.06)` (not borders) for cards; inset rings `inset 0 0 0 1px rgba(255,255,255,.08–.12)` for inputs/chips. Modal: `0 0 0 1px rgba(255,255,255,.08), 0 24px 64px rgba(0,0,0,.55)`. Product shot: `0 50px 100px -30px rgba(0,0,0,.9)`.

### Motion
- Standard ease: `cubic-bezier(.2,.8,.2,1)`. Springy ease (icons, toasts, notifications): `cubic-bezier(.2,.9,.25,1.15)` / `(.2,.9,.25,1.2)`.
- Hover transitions .12–.2s. Reveals .8–.9s. Modals: opacity .18s + transform .22s from `translate(-50%,-48%) scale(.98)`.
- Scroll reveals: IntersectionObserver, threshold .15, rootMargin `0px 0px -60px 0px`, from `opacity:0; translateY(28px)` to `1 / 0`, staggered per item (see each file's `delay` values).

### Icons
Lucide-style stroke icons, inlined as SVG paths in the files (stroke-width 1.8–2.6 as specified). Category icons are the custom **`Relay App Icon`** component (gradient tile + white glyph) — reproduce `Relay App Icon.dc.html` exactly; it is the brand.

---

## Shared data
`source/relay-data.js` defines `window.RELAY`: `CAT` (labels, accents, counts — total 1,600), `REGIONS` (8), `providers` (~60 seeded Providers with hq, region, licences, rails, pricing, uptime, go-live, score, reach), `byId`, `fmt`. Providers are deterministically **shuffled so categories are mixed** in lists. Port this as fixtures/mock API.

---

## WEBSITE (`source/`)

Shared pieces used on every page:
- **`Relay Site Nav`** — sticky 64px header, max-width 1200, padding 0 24px. Left: R icon 22px (radius 5) + "Relay" 16px/**500**. Right: links Product, Directory, Intelligence, Customers, Pricing, Contact (13.5px/500, pill 32px tall, hover `rgba(255,255,255,.05)`), 1px divider, Log in, Sign up (white button). Transparent at top → `rgba(15,16,17,.72)` + `blur(20px) saturate(150%)` + bottom hairline after 8px scroll. **Product** opens a Linear-style mega menu (860px, anchored right): 2 columns × 2 items (icon 22px, title, 2-line desc) + side links (Integrations, Changelog, API, Security) + footer "New · Banks are now in the directory · Learn more →". 120ms hover-leave delay.
- **`Relay Site Footer`** — optional CTA band ("Find the partners behind your next market." + Start for free / Talk to sales), brand block (Relay by Gratebridge, address `1021 E Lincolnway Suite #7415, Cheyenne, Wyoming 82001, United States`, `relay.gratebridge.com`), 4 link columns, bottom bar © 2026 Gratebridge Labs. Relay by Gratebridge · "All systems normal" · Cookie preferences · Privacy · Terms.
- **`Relay Site Cookies`** — bottom-right 400px glass card, appears 1.4s after first visit; Customise expands toggles (Essential locked, Analytics, Marketing); Accept all / Reject optional / Save choices; persisted in `localStorage['relay-cookie-consent']`; reopened via `window` event `relay:cookies`.
- **`Relay Site Shot`** — scaled live iframe of a dashboard screen inside a 14px-radius frame with bottom fade.

### `Relay Landing.dc.html` — sections in order
1. **Hero** — monochrome radial gradient (`#2a2c30 → #1c1d20 → #131416 → #0f1011`) + top hairline glow. H1 "Every financial Provider. One directory." (blur-in). Paragraph, Start for free + Talk to sales. Right-aligned "New · Banks in the directory →". Load stagger: nav .6s, h1 .15s, p .3s, buttons .42s, link .55s. **Product shot** = Pro dashboard iframe (1440×900 scaled), tilts from `rotateX(12deg) scale(.94)` to flat as you scroll 0→520px; one light sweep across it after load.
2. **Who Relay is for** — 3 cards (Founders / Startups / Enterprise, stage labels Pre-launch / Series A–C / Scale), each with an animated illustration (starter stack · −38% corridor bars · RFP list), copy and chips.
3. **Categories** — pinned scroll-driven section (`height: n*90+10 vh`, sticky 100vh). Left: vertical category nav (active pill, icon scales). Middle: text block per category cross-fades with blur + vertical travel + icon rotation driven continuously by scroll position. Right: notification stack + chart card per category travel/scale with scroll; bar heights interpolate. Background tint cross-fades per category colour. Clicking a nav item smooth-scrolls to it.
4. **How it works** — 3 cards: typed search (45ms/char) + results, compare mockup (two Provider chips, 3 metric rows with bars, "Best" tags, mint "Cobalt saves at your volume · €4,120 / mo"), connect (request sent → reply → "Call booked for Thursday").
5. **Customers** — "Trusted by teams that move money." 3 tall duotone portrait cards (greyscale photo + `mix-blend-mode: luminosity` over colour), then a **stat marquee** of glass chips with category icons, scrolling 0.03px/ms, edge-masked.
6. Footer + cookies.

### Other site pages
Product · Directory Page · Intelligence Page · Customers · Pricing (yearly/monthly toggle, 3 plans, comparison table, FAQ accordion) · Contact (validated form → success state) · Category (`?kind=`) · About · Careers · Changelog · Security (status bars) · Developers (code tabs, copy) · For Providers · Legal (`?doc=privacy|terms|cookies`).

### Auth — `Relay Login.dc.html`, `Relay Sign Up.dc.html`, `Relay Auth Art.dc.html`
Two-column (`minmax(460px,1fr)` each). Left = **static** brand art (isometric line drawing, glass R tile, six category icons on platforms, "INFRASTRUCTURE DIRECTORY" tag, headline, paragraph) — no motion. Right = form: Continue/Sign up with Google (multicolour G), divider "or", email, password (Show/Hide), validation (red ring `rgba(255,123,123,.6)` + message), loading label, redirect to dashboard. Sign up adds full name, 4-segment strength meter (Weak/Fair/Good/Strong in error/warning/info/success colours) and Terms checkbox.

---

## DASHBOARD (`source/Relay Dashboard.dc.html` = shell)

Shell owns routing, favorites, shortlists, saved comparisons, modals, toasts and confirmations. Pages receive callbacks (`onNavigate`, `onToast`, `onCompare`, `onAddToShortlist`, `onUpgrade` …).

- **Sidebar** (`Relay Sidebar`) — workspace header (no dropdown), Overview / Inbox / Compare, Workspace group with More/Less, Favorites (with empty state + restore), profile. Stronger grey `#151618`.
- **Topbar** (`Relay Topbar`) — page title (every page has one), favourite star (adds current page/params to Favorites), dots menu, notifications dropdown, search, avatar menu (Sarah Mitchell · Admin · Free/Pro plan; no keyboard shortcuts; Invite team members).
- **Overview** — greeting, stats (1,600 Providers / 140 countries), Pro upsell banner with half-moon radar of monochrome icons around "1,000+ Providers worldwide" (hidden on Pro), category cards (Collections, Payouts, Banks, Cards, KYC), vertically centred Activity.
- **Inbox** — two-pane, tabs All/Unread/Providers, read/unread, empty state.
- **Directory / Providers** — search, region tabs + More menu, category chips with inline counts, mixed list, bookmarks first, pagination (10/page), selection bar (max 4) → Compare / Add to shortlist, **Load more → upgrade modal**, Provider drawer with blurred sections + Expand → full **Provider** page (`route 'provider', params {id, from}`).
- **Compare** — up to 4 columns, Only differences toggle, Best tags, Add Provider picker with category filter, Save comparison (name + optional category), saved list, delete (confirm).
- **Shortlists** — list (no filter) + detail, note, ranked items, Add Providers modal, Edit (name/category/note/delete).
- **Requests** — tabs, paginated table, row click expands detail, 3-step New request modal (search 1,600 by category + region, max 5 → details → review → send).
- **Intelligence** — scope (Global + regions), tabs Signals / News / Reports / FX benchmarks / Licence watch; expandable rows; "View full" opens full report page.
- **Profile** — editable fields, timezone dropdown; unsaved-changes confirm.
- **Settings** — sections General, Notifications (event × Email/In app/Slack matrix, delivery, quiet hours), Security, Members (invite flow: multi-email chips, role, seats), Billing, API; each title has an icon tile. No Workspace settings.
- **Modals** (`Relay Modals`) — Add to shortlist, New/Edit shortlist, Upgrade to Pro.
- **Toasts** (`Relay Toast`) — bottom-right stack (max 3), solid gradient icon tile per type, title + desc, text action + Dismiss, **countdown ring** around close (4.2s; errors sticky, no ring), enter `translateY(12px) scale(.96)` → 0 with springy ease.
- **Confirmations** (`Relay Confirm`) — tones danger (irreversible, rose button), warning (lost work), neutral (undoable); optional item preview row. `Relay Feedback.dc.html` shows every toast and confirmation variant with exact copy.

## State management (minimum)
`page, params, activeKey, favs[], lists[], compares[], modal, toasts[], confirm, plan ('Free'|'Pro'), focusList` in the shell; per-page local state as in each file's `state = {…}`. Cookie consent and Pro preview via `localStorage` / query string.

## Assets
- `source/assets/relay-icon.png` — the user's original R logo (use everywhere; wordmark "Relay" Geist 500 on site, 600 in app sidebar).
- Portrait photos are Unsplash placeholders; customer names, quotes, stats, team and investors are placeholders to replace with real content.

## Screenshots
`screenshots/website/` holds reference captures of the landing page. For the **complete set** (every site page full-length, landing scroll frames incl. the pinned Categories animation, every category page, and every dashboard page on Free and Pro), run `capture-screenshots.mjs` — instructions at the top of the file. Note: embedded product-shot iframes render only in real browser captures.

## Cursor prompt
See `CURSOR_PROMPT.md` — paste it into Cursor to start the implementation.

## Files
`source/` — open any `.dc.html` directly. Entry points: **`Relay Landing.dc.html`**, **`Relay Dashboard.dc.html`**, `Relay Login.dc.html`, `Relay Sign Up.dc.html`, `Relay Feedback.dc.html` (feedback system reference), `Relay Category Identity v2.dc.html` (locked category brand reference).
