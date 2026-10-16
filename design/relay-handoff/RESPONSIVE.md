# Handoff: Relay responsive / mobile

## Overview
Responsive behavior for the whole Relay product: the marketing site, the auth pages (Log in / Sign up) and the full dashboard. It covers three breakpoints, mobile navigation (a site hamburger menu and a dashboard slide-in sidebar), the collapsed topbar, stacked split panes, and tables that scroll sideways. Desktop visuals don't change. This is a pure layout layer on top of the existing handoff in `design_handoff_relay/`.

## About the design files
The files in `source/` are **design references built in HTML**. They're prototypes that show the intended look and behavior, not production code. Recreate the behavior in the Relay app at `localhost:3000/en` (Next.js + Tailwind) using its existing components and patterns. Don't ship the HTML.

In the prototypes, responsive rules are opt-in attributes (`data-r="m-g1 m-pad"`) backed by one stylesheet, `relay-responsive.css`. Each token maps 1:1 to a Tailwind class (table below). Port them as Tailwind utilities on the matching components, not as a global stylesheet.

## Fidelity
**High-fidelity.** Breakpoints, paddings, sizes, colors, z-indexes and transitions are final. Match them exactly.

## Breakpoints
| Name | Rule | Tailwind (max-width variants) |
|---|---|---|
| Tablet | `max-width: 1024px` | `max-lg:` |
| Mobile | `max-width: 768px` | `max-md:` |
| Small | `max-width: 480px` | `max-[480px]:` |

Desktop (>1024px) is unchanged from the main handoff. Test widths: 1280, 1024, 820, 768, 390, 360.

## Token → Tailwind map
| Token | CSS at breakpoint | Tailwind |
|---|---|---|
| `t-hide` | ≤1024 `display:none` | `max-lg:hidden` |
| `t-g1` | ≤1024 one column | `max-lg:grid-cols-1` |
| `m-hide` | ≤768 `display:none` | `max-md:hidden` |
| `m-show` | hidden by default, ≤768 `display:flex` | `hidden max-md:flex` |
| `m-g1` | ≤768 `grid-template-columns:minmax(0,1fr)` | `max-md:grid-cols-1` |
| `m-g2` | ≤768 two equal columns | `max-md:grid-cols-2` |
| `s-g1` | ≤480 one column | `max-[480px]:grid-cols-1` |
| `s-hide` | ≤480 hidden | `max-[480px]:hidden` |
| `m-col` | ≤768 `flex-direction:column; align-items:stretch` | `max-md:flex-col max-md:items-stretch` |
| `m-pad` | ≤768 padding L/R 16px, top 20px (bottom kept) | `max-md:px-4 max-md:pt-5` |
| `m-sec` | ≤768 `padding-top:72px` (sections are 96–160px on desktop) | `max-md:pt-[72px]` |
| `m-row` | ≤768 `min-width:720px`; parent gets `overflow-x:auto`, hidden scrollbar, touch scrolling | `max-md:min-w-[720px]` on the row, `max-md:overflow-x-auto no-scrollbar` on the parent |
| `m-flush` | ≤768 margin 0, radius 0, no L/R border | `max-md:m-0 max-md:rounded-none max-md:border-x-0` |
| `m-dvh` | ≤768 `height:100dvh` | `max-md:h-dvh` |
| `m-drawer` | ≤768 fixed left drawer (see Dashboard) | see below |
| `m-scrim` | ≤768 visible backdrop | see below |
| `m-sheet` | ≤768 popover becomes fixed sheet: `left/right:12px; top:64px; width:auto` | `max-md:fixed max-md:inset-x-3 max-md:top-16 max-md:w-auto` |
| `m-pane` | ≤768 side list pane becomes full-width top block: `flex:0 0 auto; width:100%; max-height:44vh; border-right:0; border-bottom:1px solid rgba(255,255,255,.06)` | `max-md:w-full max-md:flex-none max-md:max-h-[44vh] max-md:border-r-0 max-md:border-b` |
| `m-hnav` | ≤768 vertical settings nav → horizontal scrolling tab strip; group labels hidden; `padding:10px 12px; gap:2px` | `max-md:flex-row max-md:overflow-x-auto max-md:px-3 max-md:py-2.5` |

Global rules: never let `body` scroll sideways (assert `document.documentElement.scrollWidth === innerWidth` at 360px). Auto-fit grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so a single card never overflows on small screens.

---

## Marketing site

### Site nav (`Relay Site Nav`)
- **Desktop:** unchanged. Height 64px, max-width 1200px. Horizontal padding is now `clamp(16px,4vw,24px)` and the gap is `clamp(12px,3vw,32px)`.
- **≤768:** the link list and the vertical divider are hidden (`m-hide`). "Sign up" stays visible. A 36×36 menu button appears on the right: radius 9px, `inset 0 0 0 1px rgba(255,255,255,.1)`, 16px icon, 1.8 stroke. Closed icon is two lines (`M4 8h16M4 16h16`); open icon is an X (`M6 6l12 12M18 6 6 18`).
- **≤480:** "Log in" is also hidden (`s-hide`). It's still available in the menu.
- **Full-screen menu (open):**
  - Panel: `position:fixed; top:64px; left:0; right:0; bottom:0; z-index:49`, background #0f1011, padding `8px 16px 32px`, `overflow-y:auto`, top hairline `0 -1px 0 rgba(255,255,255,.06)`.
  - Links: one row per item (Product, Directory, Intelligence, Customers, Pricing, Contact). Each row is 56px tall, 4px horizontal padding, bottom border `1px rgba(255,255,255,.06)`, Geist 17px weight 500, letter-spacing −0.01em, color #f7f8f8 (#6fe3b4 for the active page), with a 14px chevron in #62666d on the right.
  - Below the links: a 2-column grid, gap 10px, margin-top 24px. "Log in" button: 46px tall, radius 10px, 15px weight 500, `inset 0 0 0 1px rgba(255,255,255,.12)`. "Sign up" button: background #f7f8f8, text #0f1011.
  - While open, lock page scroll (`document.documentElement.style.overflow='hidden'`). Close on link click and on route change.
  - **Important:** while the menu is open, the sticky header must have **no** `backdrop-filter` and a solid #0f1011 background. A backdrop-filter on the header turns it into the containing block for fixed children, and the panel collapses to 40px tall. Keep the blur (`blur(20px) saturate(150%)`, bg `rgba(15,16,17,.72)`) only for the scrolled state with the menu closed. Alternatively, render the panel through a portal outside `<header>`.

### Page sections (all marketing pages)
- Each top-level `<section>` (`max-width:1200px; padding:96–160px 24px 0`) gets `m-sec`: top padding becomes 72px at ≤768. The 24px side padding stays.
- Headline sizes are already fluid (`clamp(44px,7vw,84px)`, `clamp(30px,3.8vw,46px)` and so on). Keep those clamps.
- **Grid changes per page:**
  - **Landing:**
    - Category feature block (`minmax(180px,220px) 1fr 1fr`) → 1 column at ≤768.
    - Stat strip (`repeat(3,1fr)`) → 1 column at ≤480.
    - The hero dashboard iframe (1440×900, scaled to fit) stays as is; it already scales with the container.
  - **Pricing:**
    - Plan cards use auto-fit at `min(100%,300px)`.
    - The "Compare plans" table keeps `min-width:640px` inside an `overflow-x:auto` wrapper (it scrolls sideways).
  - **Careers:** role rows (`2fr 1fr 1fr 20px`) → `m-row` (scroll sideways).
  - **Intelligence Page:** report rows (`52px 1fr 140px 120px 20px`) → `m-row`.
  - **Two-column `1fr 1fr` blocks → 1 column at ≤768:**
    - Category: "how it works" split.
    - For Providers: benefits split.
    - Contact: form name fields.
  - **3-column stat/logo strips → 1 column at ≤480:** Customers, Directory Page, Contact, Landing.
  - **Legal** (`200px 1fr` table of contents + body) and **Changelog** (`180px 1fr` date + entry) → 1 column at ≤768. The table of contents and dates sit above the content.
  - **Category:** the "Top Providers" table keeps `min-width:680px` with sideways scroll.
- **Footer:** the CTA block gets `m-sec`. The link columns already use `repeat(auto-fit,minmax(130px,1fr))`, which gives 2 columns on phones.
- **Cookie banner:** already `max-width: calc(100vw - 40px)`. No change.

### Auth (`Relay Login`, `Relay Sign Up`)
- **≤1024:** the brand art panel (left column) is hidden (`t-hide`). The form fills the screen.
- The form column has `min-height:100vh; min-height:100dvh` and padding `clamp(18px,4vw,28px) clamp(18px,4vw,32px)`. The form itself stays at `max-width:380px`, centered.
- **≤480:** hide the "by Gratebridge" label next to the logo (`s-hide`).
- Inputs stay 42px tall (minimum touch target 44px including the label gap). Use `font-size:16px` on inputs at ≤768 in production to stop iOS zooming in.

---

## Dashboard

### Shell (`Relay Dashboard`)
- **Root:** `height:100vh` → `100dvh` at ≤768 (`m-dvh`).
- **Sidebar wrapper:** `m-drawer`.
  - **≤768:** `position:fixed; top:0; bottom:0; left:0; z-index:80; width:256px; background:#151618`, closed state `transform:translateX(-105%)`, transition `transform .32s cubic-bezier(.2,.8,.2,1)`, shadow `24px 0 64px rgba(0,0,0,.6)`. Open state (`data-open="true"`): `transform:none`.
  - **>768:** the sidebar stays in the flex row at 256px, as on desktop.
- **Scrim:** rendered only when the drawer is open. `position:fixed; inset:0; z-index:79; background:rgba(0,0,0,.55); backdrop-filter:blur(2px)`. Clicking it closes the drawer. It's hidden above 768.
- **State:** `navOpen: boolean`.
  - Opens from the Topbar menu button (`onMenu`).
  - Closes on scrim click, on any navigation (`go()` sets `navOpen:false`) and on Escape.
- **Content panel `<main>`:**
  - Desktop: margin `8px 8px 8px 0`, radius 12px, 1px border `rgba(255,255,255,.055)`.
  - ≤768 (`m-flush`): margin 0, radius 0, no left/right border, so it's edge to edge.
- **Sidebar:** height `100vh` with a `100dvh` fallback. The drawer is the same component as the desktop sidebar, with no visual changes.

### Topbar (`Relay Topbar`)
- Left padding is `clamp(10px,2vw,20px)` (was 20px).
- **≤768:** a menu button appears first.
  - Size 36×36, radius 9px, color #d4d6da, `inset 0 0 0 1px #2e2f33`, hover background #232427.
  - Icon is three lines (`M4 7h16M4 12h16M4 17h10`), 16px, stroke 1.8.
- The page title truncates with an ellipsis (`min-width:0; overflow:hidden; text-overflow:ellipsis`). The star and "more" buttons stay.
- The inline "Link copied" text is hidden at ≤768.
- **Search ≤768:** the 380px search field is hidden. A round 34×34 search button replaces it (`inset 0 0 0 1px #2e2f33`, 15px icon, stroke 2). Tapping it goes to the Directory page, where search is the first field. In production you can open a full-screen command sheet instead.
- **Profile chip ≤768:** the "Sarah Mitchell" name is hidden; only the 28px avatar shows.
- **Notifications popover ≤768 (`m-sheet`):** it becomes a fixed sheet with `left:12px; right:12px; top:64px; width:auto; max-height:min(560px, calc(100dvh - 80px))`. The profile and "more" menus keep their anchored popovers (232px and 208px fit at 360px).

### Pages
- **All page wrappers** (`max-width:1200px; padding:36px 40px 56px`) get `m-pad`: 16px side padding and 20px top at ≤768.
  - Applies to Overview, Compare, Directory, Providers, Requests, Intelligence, Provider detail and Profile.
- **Overview:**
  - KPI strip `repeat(4,1fr)` → 2 columns at ≤768.
  - Two-column lists `1fr 1fr` → 1 column.
  - The hero ring graphic keeps `min-width:280px` and wraps below the text.
- **Directory:**
  - Table header and rows (`36px 2.2fr 1fr 1.2fr 96px 1.5fr 44px`) → `m-row`. Rows keep their columns at 720px and the table scrolls sideways inside its rounded container.
  - Filter facet grid `repeat(4,1fr)` → 2 columns.
  - Filter drawer split `1fr 1fr` → 1 column.
  - The search field, region segments and category chips already wrap.
- **Intelligence:** the benchmark table and the "Watched changes" table → `m-row`. Licence table keeps `min-width:680px` with sideways scroll.
- **Requests:**
  - Expanded request detail (`1.4fr 1fr`, left inset 112px) → 1 column.
  - The 3-column meta strip → 1 column at ≤480.
  - The 4-column step tracker → 2 columns.
  - The form split → 1 column.
- **Provider detail:** the key facts `1fr 1fr` grid → 1 column. The header (icon + name, actions) already wraps via `flex-wrap`.
- **Providers:** the stats and pricing `1fr 1fr` grids → 1 column.
- **Profile:** field rows (`200px label | value`) → 1 column, with the label stacked above the value.
- **Inbox and Shortlists** (two-pane list + detail): the root flex becomes a column (`m-col`). The list pane becomes `m-pane`: full width, at most 44vh tall, scrolls internally, bottom hairline instead of right. The detail sits below.
- **Settings:**
  - Root becomes a column (`m-col`).
  - The 220px left nav becomes `m-hnav`: a horizontal, scrollable strip of section tabs with group labels hidden and items `white-space:nowrap`.
  - The content column already uses `padding:36px clamp(20px,4vw,40px) 64px`.
  - The notification matrix (`1fr repeat(3,76px)`) stays as is (fits at 360px).
  - The plan cards `repeat(3,1fr)` → 1 column at ≤480.
- **Modals and Confirm:** already `width:460px; max-width:calc(100% - 32px)`. No change.
- **Toasts:** already `width:380px; max-width:calc(100vw - 40px)`, anchored bottom-right at 20px. No change.

---

## Interactions and behavior
- Drawer open/close: 320ms `cubic-bezier(.2,.8,.2,1)` transform. The scrim appears immediately (no fade needed; a 160ms opacity fade is fine).
- Site menu: instant mount. The icon swaps between hamburger and X. Lock body scroll while it's open.
- Escape closes the drawer, menus and sheets.
- Sideways-scrolling tables: hidden scrollbar, `-webkit-overflow-scrolling:touch`. Keep the rounded container border on the outer wrapper so the scroll stays clipped.
- Hit targets on mobile are at least 34px for icon buttons in the topbar and at least 44px for menu rows and primary buttons.

## State
- Dashboard: `navOpen: boolean`, plus handlers `openNav` and `closeNav`. The Topbar receives an `onMenu` callback.
- Site Nav: `mobileOpen: boolean`. It also forces a solid header background and no blur while open.

## Design tokens (unchanged from main handoff)
- **Backgrounds:**
  - Marketing page #0f1011.
  - Dashboard base #151618; content panel #161719.
  - Raised surfaces #1b1c1f / #232427.
- **Text:** #f7f8f8 / #d4d6da / #8a8f98 / #62666d.
- **Accent:** mint #6fe3b4.
- **Hairlines:** rgba(255,255,255,.06), interactive rings #2e2f33.
- **Radii:** 6 / 8 / 9 / 10 / 12px.
- **Fonts:** Geist (UI), Geist Mono (IDs and codes).

## Files
- `relay-responsive.css`: the full responsive layer (source of truth for every rule above).
- `source/`: the updated DC prototypes with `data-r` attributes. Open them in a browser at any width. `support.js` and `relay-data.js` are included so they run.
- `source/Relay Mobile Preview.dc.html`: 12 key pages in 390×844 frames side by side.
- Search any source file for `data-r=` to find the exact element each rule applies to.

## Also shipped this round
- **Social preview:** `assets/og-image.png` (1200×630). Source: `Relay Social Preview.dc.html`. Add these Open Graph tags to the root layout: `og:title` "Relay — Every financial Provider. One directory.", `og:description` "Find, compare and partner with 1,600 Providers across 140 countries.", `og:image` `https://relay.gratebridge.com/og-image.png` (1200×630), `twitter:card` `summary_large_image`, `theme-color` #0f1011.
- **Emails:** see `email/README.md` in the project.
