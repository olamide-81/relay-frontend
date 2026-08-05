# Harmonic → Relay visual clone — extraction & verification

## Stack
Next.js 16 + React 19 + Tailwind CSS v4 (token-driven `@theme`) + custom CSS for exact px values + Framer Motion for scroll fades using extracted easing `cubic-bezier(0.165, 0.84, 0.44, 1)`.

## Artifacts
| Path | Purpose |
|------|---------|
| `design-tokens.json` | Full live extract (palette, typography, spacing, structure, transitions, breakpoints) |
| `design-tokens/harmonic/deep-metrics.json` | Targeted element metrics + media queries |
| `design-tokens/harmonic/tailwind-theme.css` | Generated Tailwind `@theme` from tokens |
| `design-tokens/harmonic/tailwind-theme.json` | Same theme as JSON |
| `design-tokens/harmonic/screenshots/` | Original full-page + section shots |
| `design-tokens/harmonic/fonts/` | Downloaded `@font-face` files |
| `public/fonts/harmonic/` | Fonts served by the clone |
| `design-tokens/harmonic/diffs/` | Clone vs original screenshots + pixel diffs |
| `scripts/harmonic-extract/` | Extract / deep / theme / verify scripts |

## Key extracted tokens (live)
- **Display font:** PP Neue Montreal (400/500/700)
- **Body font:** Inter (400/500/600)
- **Mono:** Fira Code / AntikorMono
- **Paper:** `#f5f5f9` / `#f5f6fa`
- **Ink:** `#040508`
- **Nav link:** 13px / 400 / `#82858c` / ls `-0.1px` / pad `14px 16px`
- **Login btn:** bg `#e4e5eb`, pad `10px 16px`, radius `99px`, 13px/500
- **Primary btn:** bg `#040508`, color `#f1f1f1`, radius `99px`
- **Hero H1:** 74px / 74px / weight 500
- **H2:** 48px / 49.92px / weight 400–500
- **Hero form:** max `420px`, pad `4.5px`, radius `99px`, border `1px solid #e4e5eb`
- **Nav container:** max `1240px`, margin `96px` (≥1280)
- **Logos:** max `1152px`, flex gap `8px`, section pad-bottom `80px`
- **Scout/agent bg:** `#121214`, pad `200px 0 128px+`
- **Feature sections:** pad `70px 100px 100px`
- **Quote:** pad `140px 64px 220px`
- **Footer CTA green:** `#06351e`
- **Footer shell:** bg `#f4f5f8`, pad `16px`
- **Breakpoints (from CSS MQs):** 479 / 767 / 991 / 1280 / 1440 / 1920
- **Motion:** `transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)`, `opacity 0.4s`, `color 0.2s`, float CTA shadow `rgba(0,0,0,0.38) 0 8px 12px`

## Pixel-diff results
### First viewport (1440×900) — fair chrome comparison
**3.87% mismatch** (`design-tokens/harmonic/diffs/hero-diff-1440.png`)

### Full-page (intentionally high — different content length & copy)
| Width | Mismatch % | Note |
|------:|----------:|------|
| 375 | 31.14% | Clone shorter; original content/images differ |
| 768 | 43.86% | |
| 1024 | 47.63% | |
| 1440 | 50.47% | |
| 1920 | 52.16% | |

Full-page % is **not** a fidelity score for chrome — Harmonic’s page is ~2× taller (product UI mockups, story imagery, Hot 100 grids). Prefer hero viewport + section side-by-sides.

## Could not extract / flagged (not guessed)
1. **Webflow IX2 / Lottie / canvas aurora** — no GSAP/Framer globals; purple glow approximated with CSS radial gradient from observed Scout colors (`#8957da`, `#4a72ff` alphas). Exact particle/mesh animation not in CSS.
2. **Product UI mockups** inside Scout Find/Screen/Act — complex nested app chrome; replaced with simplified mock cards (same role, not pixel-identical).
3. **Customer story photography / Hot 100 cards** — copyrighted imagery; replaced with dark ranking cards of similar aspect.
4. **Logo SVG marks** for VC firms — not copied; text placeholders in white cards matching card geometry.
5. **Nav “Book a demo” hover** — floating off-viewport CTA blocked Playwright hover; computed rest state captured (`transition: all`, bg `#040508`).
6. **PP Neue Montreal license** — files downloaded for visual parity only; production should use a licensed copy or substitute.
7. **Auth-gated / cookie preference modals** — dismissed; not cloned.
8. **Dynamic CMS article cards** — structure noted; content not mirrored.

## Scripts
```bash
npm run tokens:extract   # full live extract → design-tokens.json
npm run tokens:deep      # element-level metrics
npm run tokens:theme     # regenerate Tailwind theme from tokens
npm run tokens:verify    # screenshot + pixelmatch (needs `npm run dev`)
```
