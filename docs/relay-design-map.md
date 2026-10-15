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
| Relay Sign Up | `/signup` | RelaySignUp via `components/relay-app/AuthScreen` |
| (no design; Login styling) | `/forgot-password`, `/reset-password`, `/auth/google/callback` | `components/relay-app/AuthFrame` |
| Relay Site Nav / Footer / Cookies / Shot, Relay Auth Art, Relay App Icon | shared | imported by the pages above |

## Product dashboard — `app/[locale]/(app)`

| Design file | Route |
|---|---|
| Relay Dashboard (shell: Sidebar, Topbar, Modals, Toast, Confirm) | `/dashboard/[[...slug]]` via `components/relay-app/DashboardApp` |
| Relay Overview | `/dashboard` |
| Relay Inbox / Compare / Directory / Providers / Shortlists / Requests / Intelligence / Profile / Settings | `/dashboard/<page>` |
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
