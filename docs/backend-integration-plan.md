# Backend integration plan

Branch: `backend-integration` (relay-frontend). The redesign is the source of truth: the UI does not change, only where its data comes from and what its actions do.

Legend — **Have**: exists in relay-api today. **Gap**: must be built. **Admin**: what relayadmin needs.

---

## Step 1 — What exists vs what the design needs

### A. Accounts and sign-in

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Log in (email) | Live (`POST /auth/login`) | Have | — | Users list |
| Sign up (name, work email, password, Terms) | Live, company guessed from email | Have, but requires `company` ≥2, `role`, password with uppercase + digit | Relax register to the design's fields (name, email, password ≥8); company/role optional | Users list shows company/role when set |
| Google sign in / sign up | Live | Have | — | — |
| Forgot password | **Fake** (`delay`) | Have `POST /auth/forgot-password` | Wire frontend | — |
| Reset password (`/reset-password?token=`) | **Fake** (`setTimeout`), ignores token | Have `POST /auth/reset-password` | Wire frontend; password rule must match design (≥8) | — |
| Verify email link (`/verify-email?token=`) | **Page missing** | Have `POST /auth/verify-email` | Route that calls the API, then redirects using existing auth screens (no new UI) | Toggle verified |
| Log out | Live | Have | — | — |
| Session refresh | Access token in sessionStorage, no refresh | Have `POST /auth/refresh` (cookie) | Frontend refresh on 401 | — |

### B. Profile and settings (dashboard › Profile, Settings)

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Profile fields (name, title, company, location, bio…) | Local state + toast | `GET /auth/me` only | `PATCH /me` + extra user fields | Edit user details |
| Profile activity list | Hardcoded `ACT` | — | Activity feed from real events (requests, shortlists, logins); empty state | — |
| Avatar | Display only | `avatarUrl` field | (design has no upload control — display only) | — |
| Settings › General (theme, currency, start page, region) | Local | — | Store as user preferences | — |
| Settings › Notifications matrix + quiet hours | Local | — | Store preferences; mailer respects them | — |
| Settings › Members (invite, role, pending, remove) | Local | — | **Workspace/team model**: members, invites (email), roles Admin/Member/Viewer, accept-invite flow | View workspaces + members |
| Settings › Billing (plans, usage, upgrade) | Upgrade is **fake** (sessionStorage) | Paystack initialize/verify/webhook exist; amount/currency unclear, no invoices | Real Paystack checkout + verify on return, cancel, invoices/receipts, usage counters | Billing: subscriptions, payments, plan prices |
| Settings › Security: change password | Sends user to forgot-password | — | `POST /me/password` | — |
| Settings › Security: sessions + revoke | Hardcoded | RefreshToken docs exist | List/revoke sessions (device, location, current) | — |
| Settings › Security: 2FA toggle | Local | — | TOTP 2FA (enroll, verify at login) | Reset a user's 2FA |
| Settings › API keys (create, copy, revoke) | Fake key | — | API key model (hashed), create/list/revoke | View/revoke keys |
| Delete account | Not in design | — | — | — |

### C. Directory and Providers

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Directory, Category pages, Provider page, Landing category counts, Compare | `lib/dc/relay-data.ts` — ~58 **fictional** Providers, invented counts (1,600) | 84 real seeded Providers with a different, richer shape | Map API Provider → design shape (`kind, hq, region, price, settle, uptime, golive, regulator, licences, rails, api, certs, reach, score`); serve counts from the API; Free plan lock from API | Provider editor covers every field the design shows |
| Free vs Pro gating | UI lock only | Strips 2 fields if JWT says paid | Enforce Free limits server-side (5 visible Providers, 5 compares/month, 3 intro requests/month per Pricing) | Plan limits configurable |
| Favorites (sidebar stars) | Local state | — | Store per user | — |
| Compare + saved comparisons | Local | `POST /providers/compare` (unused) | Saved comparisons CRUD | — |
| Shortlists (create, edit, note, add/remove, delete) | Local `LISTS` | Shortlist CRUD exists, different shape (corridor, volume, stage) | Align model to design (`name, kind, note, ids, updated`); wire | List + view |
| Providers pipeline (live / integrating / evaluating, owner) | Hardcoded `ROWS` | — | Per-workspace Provider pipeline model | View |

### D. Requests and Inbox

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Requests list + 3-step "Request intro" modal (Providers → Details → Review), follow-up, close | Local `INIT` | Intro model exists (status pending/in_progress/completed/declined) | Align statuses to design (sent/replied/draft/closed), fields (type, volume, timeline, message, code REQ-####); wire; email `requestSent` template | Requests queue: reply as Provider, change status |
| Inbox (messages from Providers/Relay, read/unread, facts, primary CTA, View provider) | Hardcoded `MSGS` | Notification model (title/body only) | Message model (from, kind, subject, body, facts, CTA, provider); created when admin replies to a request or sends a message; `providerReplied` email | Compose/reply to users |
| Topbar notifications | Not live | Notification API exists | Wire if design surfaces it | — |

### E. Intelligence and reports

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Public report pages + Intelligence report list | `config/reports.json` + `data/*.ts` | — | Reports managed in API (visibility, cards); keep existing article bodies as seed | Reports: visibility, card title/summary |
| Dashboard Intelligence: news, signals feed, benchmarks, licence watch | Hardcoded `NEWS`, `BENCH`, `CAT`, signals | — | Content models for signals/news/benchmarks; empty states | Publish signals/news |
| Weekly digest email | — | Template exists, not sent | Scheduled send (Monday) | — |

### F. Marketing site

| Design surface | Frontend today | API today | Gap | Admin |
|---|---|---|---|---|
| Page visibility switches | `config/site-pages.json` (build-time) | — | Serve from API, cached; keep JSON as fallback | Toggle pages |
| Contact form | **Fake** | — | `POST /contact` → store + email team | Contact inbox |
| Pricing plans (Free €0, Pro €49/€39 yearly per seat, Enterprise) | Hardcoded | — | Plans/prices from API (single source for checkout + emails) | Edit prices |
| Customers stories, Changelog, Careers roles, About, Security, Legal | Hardcoded in components | — | Decide which become API-managed (see decisions) | — |
| Cookie consent | localStorage | — | — (client-only by nature) | — |
| Waitlist | Only legacy pages | Have | Keep; not in redesign | Waitlist list |

### G. Email

| Template | Trigger today | Gap |
|---|---|---|
| verifyEmail, resetPassword, welcome | Have | — |
| subscriptionActive, subscriptionCancelled | Have | Real plan/amount |
| receipt, trialEnding | — | Send on Paystack charge / trial end |
| requestSent, providerReplied | — | Send from Requests/Inbox |
| newLogin, loginCode | — | newLogin on unseen device; loginCode for 2FA if chosen |
| weeklyDigest | — | Scheduler |
| waitlistJoined, waitlistInvite | joined only | Invite from admin |

### H. Admin (relayadmin)

Has today: Overview counts, Providers kanban + editor, Banks + import, Users (role/plan/verified), Waitlist, Intros (status), Shortlists (read), Partnerships, Notifications (read).

Needs: restyle to the Relay design tokens (bg `#0f1011`, sidebar `#151618`, panel `#161719`, mint `#6fe3b4`, Geist); Billing (plans, prices, subscriptions, payments, refunds link-out); Requests queue with reply → Inbox; Messages; Intelligence content; Reports; Site pages; Contact inbox; Workspaces/members; Users detail (profile fields, sessions, 2FA reset, API keys); provider names instead of raw IDs; Marketing (waitlist invites, email sends).

---

## Step 2 — Implementation order

1. Auth fixes: register fields, forgot/reset/verify wiring, token refresh.
2. Plans + Paystack: plan config, checkout, verify on return, webhook, cancel, invoices, receipt email.
3. Providers: API → design mapping, counts, plan gating; replace `relay-data.ts` reads.
4. Workspace data: favorites, shortlists, saved compares, pipeline.
5. Requests + Inbox + emails.
6. Profile, preferences, notifications, security (password, sessions, 2FA), API keys, members/invites.
7. Intelligence + reports + site pages + contact via API.
8. Admin: new sections + restyle.
9. End-to-end run: API 4000, frontend 3000, admin 3002.

## Step 3 — Admin sync

Covered in H; built after each backend area lands so every new entity is manageable the same day.

---

## Status (Oct 16, 2026)

All three repos are on `backend-integration`, uncommitted.

**Frontend.** Every dashboard page reads and writes through `/api/app` (`lib/dc/app-bridge.ts`, `lib/dc/wiring.ts`); generated `components/relay/*` change only through `scripts/dc-port/patches.mjs` + `npm run design:port`. Site content (pages, stats, reports, pricing, changelog, customers, careers, Intelligence) comes from `/api/site/content`, falling back to the design copy. New page: `/two-factor` (sign-in challenge, setup, disable). Unprefixed links (`/dashboard/…` from emails and the Paystack return) now redirect to `/en/…` in `middleware.ts`.

**Admin.** New sections: Overview (revenue, product, jobs), Workspaces (grant/trial/revoke Pro, rename, members, payments, usage), Billing (prices, ₦ rate, plan limits, payments, Paystack status), Requests (reply as the Provider → Inbox + bell + email), Inbox (broadcasts), Site content (form editors for every block, JSON fallback, restore design copy), Contact, Users (disable, sign out everywhere, reset 2FA, sessions). Old Intros/Shortlists sit under "Legacy dashboard". Restyled to the product palette and Geist.

**Not built (by decision).** API keys: Settings › API keys shows its empty state; "Create key" says it's coming soon.

**Tested end to end** against a local API with seeded data: 47 HTTP checks (auth, workspace data, requests, admin reply/broadcast, billing settings, plan grant, Free limits, content, contact, user controls, jobs) plus a browser run: sign-in, dashboard, Settings › Billing, a real Paystack test checkout (monthly ₦67,620), return, verification, Pro on the workspace, and the payment and MRR in admin.

## Going live

- relay-api env: `PAYSTACK_SECRET_KEY` / `PAYSTACK_PUBLIC_KEY` (live `sk_live_…` / `pk_live_…`), `CRON_SECRET`, `CONTACT_NOTIFY_EMAIL`, `FRONTEND_URL` (public site, used for the Paystack return and email links).
- Paystack dashboard: webhook URL `https://<api-host>/api/webhooks/paystack`. Plans are created automatically on the first checkout at each price/rate.
- Vercel Cron on relay-api calls `/api/cron/daily` and `/api/cron/weekly-digest` (both also runnable from admin › Overview).
- relayadmin: commit `public/fonts/` (Geist files are new; the folder was untracked before).
- Changing prices or the rate in admin › Billing applies to new checkouts; existing subscriptions keep their Paystack plan until they re-subscribe.
