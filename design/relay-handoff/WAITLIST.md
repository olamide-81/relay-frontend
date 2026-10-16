# Handoff: Relay pre-launch waitlist

## Overview
Until launch, **sign up is closed** and every sign-up entry point goes to a **waitlist**. **Log in stays open**: approved users log in as normal. People still on the waitlist who try to log in get a clear message instead of an error.

The waitlist collects structured data for launch planning:
- Name
- Work email
- Company
- Role
- Monthly payment volume
- Most important category
- What they're looking for
- Optional notes

## About the design files
`source/*.dc.html` are **HTML design references**, not production code. Rebuild them in the Relay Next.js app (localhost:3000/en) with its existing components, tokens and the auth layout already built for Login / Sign up. `screenshots/` shows every state.

Preview states by opening the reference with a query string:
- `Relay Waitlist.dc.html` (step 1)
- `?state=step2`
- `?state=step3`
- `?state=done`
- `?state=duplicate`
- `Relay Login.dc.html?state=waitlisted`

## Fidelity
High-fidelity. Copy every string exactly ("Provider" is always capitalised). Keep every state, transition and colour as specified.

---

## Routing changes
| Route | Behaviour |
|---|---|
| `/[locale]/waitlist` | **New.** The waitlist flow (this doc). |
| `/[locale]/signup` | Redirects to `/waitlist` (307 while pre-launch). Keep the page code behind a flag: `SIGNUP_OPEN=false`. |
| `/[locale]/login` | Unchanged, plus the waitlisted state (below). The top-right link now reads "New to Relay? **Join the waitlist**" → `/waitlist`. |
| Site nav | The primary button "Sign up" becomes **"Join waitlist"** → `/waitlist`, on desktop and in the mobile full-screen menu. |
| Other CTAs | Every "Sign up", "Start for free" and "Get started" link (landing hero, footer CTA band, pricing plans, Directory Page "Sign up free to see them all") → `/waitlist`. When the flag is off, change the copy: "Start for free" → "Join the waitlist"; Directory Page → "Join the waitlist to see them all." |
| Google sign-up | Hidden while the flag is off. Google **log in** remains, for approved users only. |

When `SIGNUP_OPEN=true` (launch), revert the redirects and labels. Keep the waitlist route alive so it can be re-enabled.

---

## Layout
- Same two-column auth layout as Login.
  - Left: `Relay Auth Art` brand panel. It's hidden at ≤1024px (`max-lg:hidden`).
  - Right: the form column. Background `radial-gradient(80% 50% at 50% 0%, #1e1f22 0%, #0f1011 70%)`, padding `clamp(18px,4vw,28px) clamp(18px,4vw,32px)`.
- **Top bar:** logo lockup (22px R, "Relay" 16/500, "by Gratebridge" 12.5px #62666d, hidden ≤480). On the right: "Already approved? **Log in**" (13.5px #8a8f98, link #f7f8f8/500).
- **Form container:** max-width **420px** (Login is 380), centred, gap 24px. Entrance: opacity 0 → 1 and translateY 14px → 0 over .7s `cubic-bezier(.2,.8,.2,1)`, 60ms after mount.
- **Footer:** "© 2026 Gratebridge Labs" plus Privacy and Terms links, 12px #62666d.

## Header block (steps 1–3)
1. **Pills row:**
   - "Early access" pill: 24px tall, radius 999px, 12px/500, colour #6fe3b4, background `rgba(111,227,180,.08)`, ring `inset 0 0 0 1px rgba(111,227,180,.22)`, with a 6px mint dot.
   - Next to it, Geist Mono 12px #62666d: `1 / 3 · About you`.
2. **Progress:** 3 equal bars, 3px tall, radius 2px, track `rgba(255,255,255,.08)`. The fill is #f7f8f8 and scales on X from 0 to 1, over .5s `cubic-bezier(.2,.8,.2,1)`. Bars up to and including the current step are filled.
3. **H1:** 30px/1.1, weight 500, −0.035em. **Sub:** 14.5px/1.55, #8a8f98.

| Step | Label | H1 | Sub |
|---|---|---|---|
| 1 | About you | Join the waitlist | Relay is opening to teams in waves. Tell us who you are and we’ll save your place. |
| 2 | Your company | Tell us about your company | This helps us invite teams Relay can help most, first. |
| 3 | What you need | What should Relay find for you? | We’ll tune your workspace to this before you log in. |

## Fields
**Text inputs:**
- Size and shape: 44px tall, radius 10px, padding 0 12px.
- Colours: background `rgba(255,255,255,.03)`, ring `inset 0 0 0 1px rgba(255,255,255,.1)`, focus ring `rgba(255,255,255,.3)`, error ring `rgba(255,123,123,.6)`.
- Type: 14.5px Geist. Labels: 12.5px #8a8f98, 6px above the input.

**Step 1 — About you**
- Full name: placeholder "Sarah Mitchell", `autocomplete=name`. Required, at least 2 characters.
- Work email: placeholder "sarah@company.com", `autocomplete=email`, `inputmode=email`. Required and must be a valid email.
  - If the domain is a free provider (gmail, yahoo, hotmail, outlook, icloud, aol, proton/protonmail, gmx, mail, yandex, live), show a non-blocking hint under the field: a 5px #f2c14e dot + "Work emails are reviewed first." (12px #f2c14e).

**Step 2 — Your company**
- Company: placeholder "Northwind Payments", `autocomplete=organization`. Required, at least 2 characters.
- **Your role** (single choice, pill chips, wrap, gap 6px). Options: Founder / CEO · Product · Engineering · Finance · Payments / Ops · Compliance / Risk · Partnerships · Other.
- **Monthly payment volume** (single choice, 3-column grid, gap 6px, tiles 40px tall, radius 10px). Options: Pre-launch · Under $100k · $100k–$1M · $1M–$10M · $10M–$100M · $100M+.
- Chip and tile states:
  - Idle: background `rgba(255,255,255,.03)`, text #d4d6da, ring `rgba(255,255,255,.1)`.
  - Hover: ring `rgba(255,255,255,.28)`.
  - Selected: background #f7f8f8, text #0f1011.
  - Pills are 34px tall, padding 0 13px, 13px/500. All transitions .15s.

**Step 3 — What you need**
- **Most important category** (single choice, 3×2 grid, gap 6px):
  - Tile: padding 12px, radius 12px, idle background `rgba(255,255,255,.02)` with ring `rgba(255,255,255,.08)`. Contents: the 28px `RelayAppIcon` for the category, then the label (13px/500).
  - Selected: background `rgba(255,255,255,.06)`, ring `inset 0 0 0 1px <category accent>`, and a 16px check badge in the top right (filled with the accent, dark check). The badge animates from scale .6 to 1 and opacity 0 to 1 over .2s.
  - Categories: Collections #6FE3B4 · Payouts #D6EE4E · FX #8FB8FF · Cards #B9A3FF · KYC #FFAB7A · Banks #FF8FB1. The API value for Banks is `bank`.
- **What are you looking for?** (multi-select pills, at least one; "Pick any" hint on the right of the label, #62666d). Selected pills show an 11px check icon before the label. Options: Find a new Provider · Compare pricing · Enter a new market · Replace a current Provider · Add a backup Provider · Due diligence · Market intelligence.
- **Anything else we should know?** Optional textarea, 3 rows, no resize, placeholder "e.g. Launching card issuing in the UK and EU in Q2". Max 500 characters.
- **Consent checkbox** (required): "I agree to the Terms and Privacy policy, and to receive launch emails." Uses the same checkbox as Sign up (16px, radius 4px, mint when checked).

## Validation and errors
- Validate the current step only, on Continue (or Enter in a text input).
- An invalid field gets the red ring; an invalid choice group turns its label red (#ff7b7b).
- One message appears above the buttons: a 6px #ff7b7b dot + 13px text, in this order:
  - "Enter your full name."
  - "Enter a valid work email."
  - "Enter your company name."
  - "Choose your role."
  - "Choose your monthly volume."
  - "Choose the category that matters most."
  - "Pick at least one thing you’re looking for."
  - "Please accept the Terms to continue."
- Errors clear when you change step.

## Buttons
- **Back** (steps 2–3): 44px, padding 0 16px, radius 10px, ring `rgba(255,255,255,.12)`, text #d4d6da. Hover: background `rgba(255,255,255,.05)`, text #f7f8f8.
- **Primary** (flex 1): 44px, radius 10px, background #f7f8f8, text #0f1011 14.5/500. Hover: translateY(−1px) + `0 10px 30px -8px rgba(255,255,255,.3)`.
  - Label: "Continue" on steps 1–2, "Join the waitlist" on step 3.
  - Loading: "Joining…" with background #d4d6da; disable the button.
- Under the buttons: "We review every request by hand and invite teams in waves. No password needed yet." (12px #62666d).

## Step transition
When moving between steps, the field group fades out and shifts 14px toward the direction of travel (opacity .35s, transform .45s `cubic-bezier(.2,.8,.2,1)`). Swap the content at 180ms, then fade back in. Keep all answers when going back.

## Success — `done`
- 52px mint tile (#6fe3b4, radius 14, dark check, shadow `0 12px 32px -10px rgba(111,227,180,.6)`) over a soft mint radial glow.
- H1: "You’re on the list, {firstName}."
- Copy: "We’ve sent a confirmation to **{email}**. When your invite is ready we’ll email you a link to create your workspace."
- Summary card: radius 12px, background `rgba(255,255,255,.02)`, ring `.08`, rows separated by `.06` lines. Each row has the key in #8a8f98 and the value right-aligned in #f7f8f8, 13px. Rows:
  - Company
  - Role
  - Volume
  - Focus (with the category accent dot)
  - Looking for (comma-joined)
- Timeline, 3 rows:
  - Request received · "Just now" (mint filled check).
  - Review · "We look at every team by hand, usually within a week" (mint ring).
  - Invite · "An email with a link to create your workspace" (grey ring, muted title).
- Buttons: "Back to Relay" (primary, → `/`) and "Edit answers" (secondary, returns to step 1 with the answers kept; re-submitting updates the record).

## Already on the list — `duplicate`
Shown when the email already exists. The submit becomes an **upsert**: answers are updated and the person keeps their place.
- 52px sky-tinted mail tile.
- H1: "You’re already on the list."
- Copy: "**{email}** joined the waitlist earlier. We’ve updated your answers and you keep your place."
- Buttons: "Approved? Log in" (primary) and "Back to Relay".

## Login: waitlisted state
If someone logs in with an email that's on the waitlist but not yet approved, show an info notice instead of an error:
- Background `rgba(143,184,255,.07)`, ring `rgba(143,184,255,.25)`, radius 10px, padding 12×14, with a 6px #8fb8ff dot.
- Copy: "**You’re still on the waitlist.** We’ll email {email} as soon as your invite is ready. Update your answers" (the last part links to `/waitlist`).
- The notice clears when the email changes.
- Return the same response whether or not the password was set, so the form never reveals whether an account exists beyond the waitlist.

---

## Data and API
**Table `waitlist_entries`**
| column | type | notes |
|---|---|---|
| id | uuid | pk |
| email | citext | unique, lowercased + trimmed |
| full_name | text | |
| company | text | |
| role | enum | `founder_ceo, product, engineering, finance, payments_ops, compliance_risk, partnerships, other` |
| monthly_volume | enum | `pre_launch, lt_100k, 100k_1m, 1m_10m, 10m_100m, gt_100m` |
| primary_category | enum | `collections, payouts, fx, cards, kyc, bank` |
| goals | text[] | `find_provider, compare_pricing, new_market, replace_provider, backup_provider, due_diligence, market_intelligence` |
| notes | text | ≤500 chars, nullable |
| email_domain | text | derived; `is_work_email` boolean derived from the free-domain list |
| status | enum | `pending, approved, invited, joined, rejected` (default `pending`) |
| consent_at | timestamptz | |
| source | jsonb | utm_*, referrer, landing path, locale |
| created_at / updated_at | timestamptz | |

**`POST /api/waitlist`**
- Body: `{ fullName, email, company, role, monthlyVolume, primaryCategory, goals[], notes?, consent: true, source }`.
- Validate on the server with the same rules as the form (zod).
- Upsert on email. Responses:
  - New entry: `201 { status: 'created' }`.
  - Existing entry: `200 { status: 'exists' }`. The UI shows the duplicate state.
- Rate-limit by IP and email. Add a hidden honeypot field.
- After a new entry, send the email template `templates.waitlistJoined({ name })`. After an update, send nothing.

**Approving people (admin, out of scope for UI)**
- Approving sets `status='approved'` and sends `templates.waitlistInvite({ name, url })` with a one-time signup link (7 days).
- That link opens the existing Sign up form with the email locked, even while the flag is off.
- Accepting the invite creates the account; the workspace is pre-tuned to `primary_category`.

**Login check**
On login, if no user exists but a `waitlist_entries` row is `pending`, return `{ code: 'WAITLISTED' }` and show the notice above.

**Analytics events**
- `waitlist_step_viewed {step}`
- `waitlist_step_completed {step}`
- `waitlist_submitted {role, monthlyVolume, primaryCategory, goals}`
- `waitlist_duplicate`

Never include the email in analytics events.

## Accessibility
- Choice groups use `role="radiogroup"` (role, volume, category) or `role="group"` with `aria-pressed` (goals). They are keyboard selectable with arrow keys, Space and Enter.
- The progress bar has `aria-label="Step 1 of 3"`.
- Errors are linked with `aria-describedby`, and the message has `role="alert"`.
- On step change, move focus to the H1.
- With `prefers-reduced-motion`, the step transition is opacity only.

## Responsive
At ≤1024px the brand panel is hidden. At ≤480px the volume grid becomes 2 columns and the category grid stays at 3 (tiles get 10px padding). Touch targets are at least 34px.

## Files
- `source/Relay Waitlist.dc.html`: the flow, with every state.
- `source/Relay Login.dc.html`: waitlisted notice (`?state=waitlisted`, or log in with `pending@…`).
- `source/Relay Sign Up.dc.html`: redirects to the waitlist (append `?open=1` to view the old form).
- `source/Relay Site Nav.dc.html`: "Join waitlist" button.
- `source/Relay Auth Art.dc.html`, `Relay App Icon.dc.html`: shared parts.
- `screenshots/`:
  - `01` step 1
  - `02` step 2
  - `03` step 3
  - `04` success
  - `05` duplicate
  - `06` login waitlisted
- Emails already exist in `email/emailLayout.ts`: `waitlistJoined`, `waitlistInvite`.
