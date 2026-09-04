import { submitIntroRequest, type IntroRequest } from '../workspace'
import { api } from './client'
import { useLiveApi } from './config'

export type WorkspaceWeighting = {
  feePct: number
  settlePct: number
  licencePct: number
}

export type WorkspacePrefs = {
  weighting: WorkspaceWeighting
  followedCorridors: string[]
}

export type CreateIntroInput = {
  providerId: string
  providerName?: string
  categoryName?: string
  alsoProviderIds?: string[]
  corridors?: string[]
  fields?: Array<{ label: string; value: string }>
  context?: string
  slot: string
  note?: string
}

export type IntroDoc = IntroRequest & {
  alsoProviderIds?: string[]
  corridors?: string[]
  slot?: string
}

export type CreateShortlistInput = {
  name: string
  corridor?: string
  monthlyVolumeUsd?: number
  providerIds?: string[]
}

export type ShortlistDoc = {
  id: string
  name: string
  corridor: string
  monthlyVolumeUsd: number
  closesAt: string | null
  createdAt: string
  stage: 'active' | 'draft' | 'decision'
  progressPct: number
  meta: string
  entries: Array<{
    providerId: string
    feeBps: number | null
    settleLabel: string
    status: 'replied' | 'waiting' | 'no_pricing'
    statusAt: string
    next: 'book_intro' | 'chase' | 'chase_urgent'
  }>
}

export type CompareResult = {
  providers: unknown[]
  weights?: WorkspaceWeighting
}

/** POST /api/intros — Request intro / Send request */
export async function createIntro(input: CreateIntroInput): Promise<IntroDoc> {
  if (useLiveApi) {
    return api.post<IntroDoc>('/api/intros', input)
  }
  const note = [input.context, input.slot ? `Slot: ${input.slot}` : '', input.note]
    .filter(Boolean)
    .join('\n')
  return submitIntroRequest({
    providerId: input.providerId,
    providerName: input.providerName ?? input.providerId,
    categoryName: input.categoryName ?? 'Payouts',
    note,
  })
}

/** GET /api/intros */
export async function listIntros(): Promise<{ intros: IntroDoc[] }> {
  if (useLiveApi) return api.get('/api/intros')
  const { getIntroRequests } = await import('../workspace')
  return { intros: getIntroRequests() }
}

/** POST /api/intros/:id/chase */
export async function chaseIntro(id: string): Promise<{ ok: boolean }> {
  if (useLiveApi) return api.post(`/api/intros/${id}/chase`)
  return { ok: true }
}

/** POST /api/shortlists — New shortlist */
export async function createShortlist(input: CreateShortlistInput): Promise<ShortlistDoc> {
  if (useLiveApi) return api.post('/api/shortlists', input)
  const now = new Date().toISOString()
  return {
    id: `list-${Date.now()}`,
    name: input.name,
    corridor: input.corridor ?? '—',
    monthlyVolumeUsd: input.monthlyVolumeUsd ?? 0,
    closesAt: null,
    createdAt: now,
    stage: 'draft',
    progressPct: 0,
    meta: '0 replied · draft',
    entries: (input.providerIds ?? []).map((providerId) => ({
      providerId,
      feeBps: null,
      settleLabel: '—',
      status: 'waiting',
      statusAt: now,
      next: 'book_intro',
    })),
  }
}

/** GET /api/shortlists */
export async function listShortlists(): Promise<{ shortlists: ShortlistDoc[] }> {
  if (useLiveApi) return api.get('/api/shortlists')
  return { shortlists: [] }
}

/** POST /api/shortlists/:id/chase — Chase N providers */
export async function chaseShortlist(id: string): Promise<{ chased: number }> {
  if (useLiveApi) return api.post(`/api/shortlists/${id}/chase`)
  return { chased: 0 }
}

/** POST /api/providers/compare — Compare N */
export async function compareProviders(providerIds: string[], weights?: WorkspaceWeighting) {
  if (useLiveApi) {
    return api.post<CompareResult>('/api/providers/compare', { providerIds, weights })
  }
  return { providers: providerIds.map((id) => ({ id })), weights }
}

/** GET /api/workspace */
export async function getWorkspacePrefs(): Promise<WorkspacePrefs> {
  if (useLiveApi) return api.get('/api/workspace')
  return {
    weighting: { feePct: 40, settlePct: 30, licencePct: 30 },
    followedCorridors: [],
  }
}

/** PATCH /api/workspace — Follow my corridors / save weighting */
export async function updateWorkspacePrefs(patch: Partial<WorkspacePrefs>): Promise<WorkspacePrefs> {
  if (useLiveApi) return api.patch('/api/workspace', patch)
  return {
    weighting: patch.weighting ?? { feePct: 40, settlePct: 30, licencePct: 30 },
    followedCorridors: patch.followedCorridors ?? [],
  }
}
