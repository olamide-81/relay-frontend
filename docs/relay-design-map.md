# Relay redesign: design → code map

Source of truth: `design/relay-handoff/` (the Claude Design export; `HANDOFF.md` is its README).

## How the designs are implemented

Each `*.dc.html` design file is compiled into a React component in `components/relay/` by
`scripts/dc-port/convert.mjs` (`npm run design:port`).

- **Template → JSX.** Every inline style, colour, size and copy string is carried over exactly.
  `style-hover` / `style-focus` / `style-active` become generated rules in `components/relay/pseudo.css`.
- **Logic → verbatim.** The design's `class Component extends DCLogic` (state, timings, data, animation)
  is copied unchanged and runs on `lib/dc/runtime.tsx`, which reproduces the design runtime's behaviour.
- **Product wiring → `scripts/dc-port/patches.mjs`.** Real user, plan, auth, URL routing, and controls that
  had no handler in the design. Patches are applied during conversion, so a new design export can be
  re-converted without losing them. A patch whose anchor disappears from the design fails the run.
- **Links.** `Relay X.dc.html` links map to app routes in `lib/dc/routes.ts`.
- **Data.** `relay-data.js` is ported as `lib/dc/relay-data.ts` (deterministic, SSR-safe).

- **Responsive layer.** The designs mark elements with `data-r="m-g1 m-pad …"` tokens (spec:
  `design/relay-handoff/RESPONSIVE.md`). The converter keeps those attributes, and
  `app/relay-responsive.css` (a copy of the design's `relay-responsive.css`) applies them at ≤1024 / ≤768 / ≤480px.
  It's a stylesheet rather than Tailwind `max-md:` classes because the ported components keep the designs'
  inline styles: the rules must override those with `!important`, exactly as in the prototypes.
  Hand-built screens (`components/relay-app/AuthFrame.tsx`) use the same tokens.

Don't hand-edit files in `components/relay/`. Change the design or a patch, then re-run the converter.

## Marketing site — `app/[locale]/(site)`

| Design file | Route | Component |
|---|---|---|
| Relay Landing | `/` | RelayLanding |
| Relay Product | `/product` | RelayProduct |
| Relay Directory Page | `/directory` | RelayDirectoryPage |
| Relay Intelligence Page | `/intelligence` | RelayIntelligencePage |
| Relay Customers | `/customers` | RelayCustomers |
| Relay Pricing | `/pricing` | RelayPricing |
| Relay Contact | `/contact` | RelayContact |
| Relay About | `/about` | RelayAbout |
| Relay Careers | `/careers` | RelayCareers |
| Relay Changelog | `/changelog` | RelayChangelog |
| Relay Security | `/security` | RelaySecurity |
| Relay Developers | `/developers` | RelayDevelopers |
| Relay For Providers | `/for-providers` | RelayForProviders |
| Relay Category `?kind=` | `/categories/[kind]` | RelayCategory |
| Relay Legal `?doc=` | `/privacy`, `/terms`, `/cookies` | RelayLegal |
| Relay Login | `/signin` | RelayLogin via `components/relay-app/AuthScreen` |
| Relay Sign Up | `/signup` (invite links only before launch) | RelaySignUp via `components/relay-app/AuthScreen` |
| Relay Waitlist | `/waitlist` | RelayWaitlist via `components/relay-app/WaitlistScreen` |
| (no design; Login styling) | `/forgot-password`, `/reset-password`, `/auth/google/callback` | `components/relay-app/AuthFrame` |
| Relay Site Nav / Footer / Cookies / Shot, Relay Auth Art, Relay App Icon | shared | imported by the pages above |

## Product dashboard — `app/[locale]/(app)`

| Design file | Route |
|---|---|
| Relay Dashboard (shell: Sidebar, Topbar, Modals, Toast, Confirm) | `/dashboard/[[...slug]]` via `components/relay-app/DashboardApp` |
| Relay Overview | `/dashboard` |
| Relay Inbox / Compare / Directory / Providers / Shortlists / Requests / Intelligence / Profile / Settings | `/dashboard/<page>` |
| Relay Sourcing (inside Requests, To Providers / Sourcing switch) | `/dashboard/requests?view=sourcing` (`&compose=true` opens the form) |
| Relay Provider | `/dashboard/provider?id=…&from=…` |
| Any dashboard screen, standalone with demo data | `/preview/<screen>` (used by the site's product shots; noindex) |

The shell keeps `page` + `params` in state as in the design. `DashboardApp` mirrors them into the URL,
so deep links, refresh and Back/Forward work (`lib/dc/dashboard-route.ts`). Old routes (`/dashboard/intros`,
`/markets`, `/plans`, `/billing`, `/subscription`, `/providers/<id>`) redirect into the new screens.

`DashboardApp` also:
- sends signed-out visitors to `/signin`;
- shows the signed-in user's name, first name, email and avatar (initials when there's no photo);
- sets the plan from the session (`?plan=pro` still previews Pro);
- calls `activateSubscription` from the upgrade modal, and `logout` from the avatar menu.

## Not from the designs

- `/reports`, `/reports/[slug]`, `/methodology` keep their previous design (`app/[locale]/(legacy)`, Tailwind).
- Reference boards not ported: `Relay Feedback`, `Relay Category Identity v2`.

## Sourcing

Spec: `design/relay-handoff/SOURCING.md`. API contract for relay-api: `docs/sourcing-api.md`. Entry points: Requests
header and the link under Provider requests, the Directory empty state, and the Overview card (its two latest
requests). The landing page has a static Sourcing section after How it works.

## Pre-launch waitlist (`design/relay-handoff/WAITLIST.md`)

`NEXT_PUBLIC_SIGNUP_OPEN` (default off, read in `lib/launch.ts`; set at build time):
- **Off:** `/signup` answers 307 → `/waitlist` (middleware), except invite links (`/signup?invite=…`, with
  `&email=` to prefill and lock the address). Every sign-up CTA (nav, landing, footer, pricing, Directory Page,
  Developers, Login) points at the waitlist with the waitlist copy, and Google sign-up is hidden. Google log in stays.
- **On (launch):** the same CTAs go back to `/signup` with the original copy. `/waitlist` stays live.

Designs read the switch as `{{ launch.* }}` (patches use `cta()`), so a new export keeps it.

The waitlist posts to relay-api `POST /api/waitlist` (body in `lib/api/waitlist.ts`, labels → enum values in
`lib/waitlist.ts`, honeypot field `website`) and expects `{ status: 'created' | 'exists' }`. Log in shows the
"still on the waitlist" notice when the API answers `{ code: 'WAITLISTED' }`. Analytics events
(`waitlist_step_viewed`, `_step_completed`, `_submitted`, `_duplicate`) go through `lib/analytics.ts`.

## Content switches (no code changes needed)

- **`config/site-pages.json`** — `true`/`false` per page. A hidden page answers 404, every link to it
  disappears (nav, footer, in-page) and it leaves the sitemap. Careers is off.
- **`config/reports.json`** — Relay Research reports: `public` (website + dashboard), `private`
  (signed-in dashboard only) or `hidden`; order, icon and the short title/summary used in lists.
  Report content lives in `data/<report>.ts` (with translations); images in `public/reports/`
  (add a `.webp` next to each `.png` and its size to `lib/report-image-sizes.json`).

Public reports render at `/reports/<slug>` (`components/relay-app/ReportArticle.tsx`, laid out like the
dashboard's full report view) with article metadata, hreflang for each translation, a generated social
card (`/og/report/<slug>`), and the RSS feed at `/feed.xml`. In the dashboard they appear under
Intelligence › Reports and open at `/dashboard/report?slug=…`.
