# Relay Sourcing: handoff for Claude Code

Sourcing lets a user ask Relay to find a Provider that isn't in the Directory. The Relay team replies with vetted options, and the user picks who to be introduced to. Relay has roughly 400 Providers outside the public Directory; Sourcing is how users reach them.

Reference designs are in `source/`. Open them in a browser; they are working prototypes, not production code. Rebuild in the app's own stack and components. Match the visuals exactly (Relay dark theme, Geist / Geist Mono, hairline borders `rgba(255,255,255,.06)`, 6 to 12px radii).

## Where it lives

| Surface | File | What changes |
| --- | --- | --- |
| Requests page | `Relay Requests.dc.html` | New segmented switch under the header: **To Providers** / **Sourcing** (mint dot on Sourcing). Header subtitle and primary button change with the view. Link under the Provider requests list: "Don't see the Provider you need? Ask Relay to source one". |
| Sourcing view | `Relay Sourcing.dc.html` | New. How it works strip, status tabs, request table with expandable rows, options picker, 3 step compose modal, withdraw confirm. |
| Directory | `Relay Directory.dc.html` | Empty search state gets a **Request sourcing** button. |
| Overview | `Relay Overview.dc.html` | New Sourcing card under the stats row: explainer, Request sourcing button, the two latest sourcing requests with status. |
| Landing page | `Relay Landing.dc.html` | New "Sourcing" section after "How it works": headline "Not in the Directory? We'll find it.", three steps, and a static mock of a request with options. |
| Dashboard shell | `Relay Dashboard.dc.html` | Passes `params.view` and `params.compose` to Requests; passes `onNavigate` to Overview. |

## Routes and entry points

- `requests` with `{ view: 'sourcing' }` opens the Sourcing view.
- `requests` with `{ view: 'sourcing', compose: true }` opens it with the compose modal already open.
- Entry points: Requests header button, link under Provider requests, Directory empty state, Overview card (button and rows).
- Switching views by hand must not reopen the modal.

## Data model

```ts
type SourcingStatus = 'submitted' | 'sourcing' | 'ready' | 'intro' | 'closed';
type Category = 'bank' | 'payouts' | 'collections' | 'fx' | 'cards' | 'kyc';

interface SourcingRequest {
  code: string;            // 'SRC-014', sequential, Geist Mono
  category: Category;
  need: string;            // one of NEEDS[category]
  title: string;           // user's one line, or auto: `${need} in ${markets[0]} and ${markets[1]}`
  markets: string[];       // at least 1
  currencies: string[];
  volume: string;          // 'Under €100k' | '€100k – €1M' | '€1M – €10M' | 'Over €10M'
  goLive: string;          // 'This month' | 'Next quarter' | 'In 6 months' | 'Exploring'
  mustHaves: string[];
  notes: string;
  status: SourcingStatus;
  createdAt; updatedAt;
  reply?: { by: string; note: string; options: SourcingOption[] };  // set by the Relay team
  pickedOptionIds?: string[];
}

interface SourcingOption {
  id: string; name: string; category: Category; location: string;  // 'London · Correspondent bank'
  fit: string[];        // 2 to 3 reasons, shown with mint checks
  watchOut?: string;    // optional caveat, shown with an amber info icon
  onboarding: string;   // '6 to 8 weeks'
}
```

### Fixed option lists (keep exact)
- **Needs by category:**
  - Banks: SWIFT correspondent, Safeguarding accounts, Sponsor bank, Virtual IBANs, Local clearing access
  - Payouts: Mass payouts, Cross border transfers, Instant local payouts, Marketplace splits, Payroll
  - Collections: Card acquiring, Local payment methods, Open banking pay ins, Invoicing and receivables, Recurring billing
  - FX: Spot conversion, Forwards and hedging, Multi currency accounts, Liquidity provider
  - Cards: Card issuing, BIN sponsorship, Processing, Programme management
  - KYC: Identity verification, Business verification, Sanctions and PEP screening, Transaction monitoring
- **Markets:** United Kingdom, European Union, United States, Canada, Singapore, Hong Kong, Australia, Japan, UAE, Brazil, Mexico, India
- **Currencies:** USD, EUR, GBP, CAD, CHF, SGD, HKD, AUD, JPY, AED
- **Must haves:** API first, Licensed in market, Live in under 8 weeks, Crypto friendly, Higher risk sectors, Dedicated account manager

## Status lifecycle

| Status | Label | Dot | Set by |
| --- | --- | --- | --- |
| submitted | Submitted | #8FB8FF | User sends |
| sourcing | Sourcing | #F2C14E | Relay team picks it up, or user clicks "None of these fit" |
| ready | Options ready (+ mint "N new" pill) | #6FE3B4 | Relay team posts reply |
| intro | Intros requested | #D4D6DA | User requests intros |
| closed | Closed | #3A3C40 | User withdraws |

Tabs: **All**, **In progress** (submitted + sourcing), **Options ready**, **Done** (intro + closed), each with a count.

The row's Progress timeline has four steps: Request sent to Relay → Relay is sourcing → Options shared → Intros requested. Done steps get a mint dot and the date. Closed requests show: Request sent → Closed by you.

## Flows

### 1. Compose (modal, 640px, three steps with stepper)
1. **Need**: category tiles (3 × 2, App Icon + label) → need chips for that category → "Describe it in one line" input (placeholder changes by category). Continue requires category and need.
2. **Scope**: Markets chips (multi, at least 1 required), Currencies chips (multi, Geist Mono), Monthly volume select, Go live select, Must haves chips (optional), Anything else textarea (optional).
3. **Review**: icon, title, category and need, summary table, then the line "The Relay team reviews your request and replies with vetted options, usually within two business days. You choose who to meet." Button: **Send to Relay**.

On send: prepend the row with status submitted, switch to the All tab, expand the new row, and show toast success "Sourcing request sent" / "Relay will reply with options, usually within two business days."

Footer hint per step: the chosen need / "Pick a category and a need" → "N markets selected" / "Pick at least one market" → "Sent to the Relay Sourcing team".

### 2. Track
Clicking a row expands it in place (grid-rows animation, .26s). The expanded row shows:
- six fact tiles (Category, Need, Markets, Currencies, Monthly volume, Go live)
- Must haves chips and Your notes, if set
- **Withdraw request**, when submitted or sourcing. This opens a neutral Confirm: "Withdraw this request?" On confirm the row is closed and a toast says "Request withdrawn".

### 3. Review options and pick (status ready)
- A reply block shows the R tile, "Options from Relay · {name}, Relay Sourcing" and the team's note.
- Option cards sit in a 3 column grid, one column on mobile. Each card shows the App Icon, name and location, a checkbox, 2 to 3 fit reasons with mint checks, an optional caveat with an amber icon, and Onboarding time in the footer.
- Selecting a card gives it a mint ring and a mint checkbox.
- Footer: "Select the Providers you'd like to meet" / "N selected". Buttons: **None of these fit** (secondary) and **Request intro** / **Request N intros** (disabled until something is selected).
- **Request intros**: status becomes intro, the picked cards are tagged "Intro requested", and a toast says "Relay will connect you by email. Replies land in your Inbox." In production this should also create the matching Provider intro requests, so they appear under To Providers and in the Inbox.
- **None of these fit**: status goes back to sourcing, with an info toast "Back to sourcing" / "Relay will look for more options."

### 4. Relay team side (not designed)
Production needs an internal admin view: a queue of submitted requests → set status to sourcing → attach options from the off-Directory Provider list → post the reply (status ready, notify the user by email and in app). Tell me if you want this designed.

## Notifications
- When options are posted: an in-app toast or Inbox item ("Options ready for SRC-014"), plus an email. Use the existing dark email layout in `email/`.
- The Overview card and the "N new" pill show unseen options.

## Copy rules
- Capitalise "Provider(s)". First letter capitalised on all UI text.
- No dashes in UI copy. The option-list ranges ("€100k – €1M") match the existing Requests volume options.
- The option Provider names in the mocks (Harbourline Bank, Vantor Trust, Calder Bay Bank, Northwind Markets, Southern Cross FX) are placeholders.

## Responsive
Uses `relay-responsive.css` tokens. `m-g1` stacks the how it works strip, the fact grid, the option grid and the Overview card at 768px or below. The table scrolls horizontally inside its container (min-width 760px). On mobile the modal is full width minus 32px.
