import type { Provider, Weighting } from './types'

export const DEFAULT_WEIGHTING: Weighting = {
  feePct: 40,
  settlePct: 30,
  licencePct: 30,
}

export function computeScore(provider: Provider, weighting: Weighting): number {
  const total = weighting.feePct + weighting.settlePct + weighting.licencePct
  if (total <= 0) return 0
  const raw =
    (provider.scoreFee * weighting.feePct +
      provider.scoreSettle * weighting.settlePct +
      provider.scoreLicence * weighting.licencePct) /
    total
  return Math.round(raw)
}

export function sortByScore<T extends Provider>(providers: T[], weighting: Weighting): T[] {
  return [...providers].sort((a, b) => computeScore(b, weighting) - computeScore(a, weighting))
}

export function clampWeighting(next: Weighting): Weighting {
  const feePct = Math.max(0, Math.min(100, Math.round(next.feePct)))
  const settlePct = Math.max(0, Math.min(100, Math.round(next.settlePct)))
  const licencePct = Math.max(0, 100 - feePct - settlePct)
  return { feePct, settlePct, licencePct }
}
