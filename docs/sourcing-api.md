# Sourcing: relay-api contract

The dashboard's Sourcing view (`components/relay/RelaySourcing.tsx`, wired in `lib/dc/wiring.ts` →
`wireSourcing`) expects these endpoints. Types are in `lib/api/app.ts`. Spec: `design/relay-handoff/SOURCING.md`.

## Bootstrap

`GET /api/app/bootstrap` gains `sourcing: SourcingRow[]`, newest first. Until it's there the view shows its
empty state.

Rows use the design's own field names, like the other bootstrap lists:

| Field | Notes |
| --- | --- |
| `code` | `SRC-014`, sequential per workspace |
| `cat`, `cap` | category (`bank`, `payouts`, `collections`, `fx`, `cards`, `kyc`) and need |
| `title`, `markets[]`, `ccys[]`, `volume`, `timeline`, `must[]`, `notes` | as sent |
| `status` | `submitted` · `sourcing` · `ready` · `intro` · `closed` |
| `updated` | display label: `Just now`, `Today`, `Yesterday`, `Oct 14` |
| `dates[]` | one label per finished step: sent, sourcing, options shared, intros requested |
| `repliedBy`, `relayNote`, `options[]` | set when the Relay team replies (`ready`) |
| `options[]` | `{ id, kind, name, where, fit[], watch?, onboard }` |
| `picked[]` | option ids the user asked to meet |
| `unseen` | options not opened yet (the "N new" pill). Omit to show all as new |

## User endpoints

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| POST | `/api/app/sourcing` | `{ category, need, title, markets[], currencies[], volume, goLive, mustHaves[], notes }` | the new row (`submitted`) |
| POST | `/api/app/sourcing/:code/withdraw` | | row (`closed`); only from `submitted` or `sourcing` |
| POST | `/api/app/sourcing/:code/intros` | `{ optionIds[] }` | `{ sourcing, requests, usage }` |
| POST | `/api/app/sourcing/:code/none-fit` | | row (`sourcing`); only from `ready` |
| POST | `/api/app/sourcing/:code/seen` | | row with `unseen: 0` |

`intros`: sets `intro` and `picked`, and creates one Provider intro request per picked option. It returns them
as `RequestRow`s so they show under Requests › To Providers and, as replies come in, in the Inbox. It counts
against the plan's intro limit (402 when over, like `POST /api/app/requests`).

Validate the fixed lists (needs per category, markets, currencies, volumes, go live, must haves) as in the spec.
At least one market is required.

## Relay team (admin)

- Queue of requests by status.
- Set `sourcing`.
- Post a reply: `repliedBy`, `relayNote`, `options[]` from the off-Directory Provider list. This sets `ready`
  and `unseen = options.length`, and notifies the user with an Inbox item "Options ready for SRC-014" and an
  email in the dark layout.

The admin UI isn't designed yet.
