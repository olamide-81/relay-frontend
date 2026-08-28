export type IntroStatus = 'pending' | 'in_progress' | 'completed'

export type IntroRequest = {
  id: string
  providerId: string
  providerName: string
  categoryName: string
  note: string
  status: IntroStatus
  createdAt: string
}

const SHORTLIST_KEY = 'relay-shortlist'
const COMPARE_KEY = 'relay-compare'
const INTROS_KEY = 'relay-intros'

export const MAX_COMPARE = 4

export const WORKSPACE_EVENT = 'relay-workspace-change'

function emitChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(WORKSPACE_EVENT))
  }
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
  emitChange()
}

export function getShortlist(): string[] {
  return readJson<string[]>(SHORTLIST_KEY, [])
}

export function isInShortlist(providerId: string) {
  return getShortlist().includes(providerId)
}

export function addToShortlist(providerId: string) {
  const list = getShortlist()
  if (list.includes(providerId)) return
  writeJson(SHORTLIST_KEY, [...list, providerId])
}

export function removeFromShortlist(providerId: string) {
  writeJson(SHORTLIST_KEY, getShortlist().filter((id) => id !== providerId))
}

export function toggleShortlist(providerId: string) {
  if (isInShortlist(providerId)) {
    removeFromShortlist(providerId)
    return false
  }
  addToShortlist(providerId)
  return true
}

export function getCompareList(): string[] {
  return readJson<string[]>(COMPARE_KEY, [])
}

export function isInCompare(providerId: string) {
  return getCompareList().includes(providerId)
}

export function addToCompare(providerId: string): { ok: boolean; message?: string } {
  const list = getCompareList()
  if (list.includes(providerId)) {
    return { ok: false, message: 'Already in compare' }
  }
  if (list.length >= MAX_COMPARE) {
    return { ok: false, message: `Compare is full (max ${MAX_COMPARE})` }
  }
  writeJson(COMPARE_KEY, [...list, providerId])
  return { ok: true }
}

export function removeFromCompare(providerId: string) {
  writeJson(COMPARE_KEY, getCompareList().filter((id) => id !== providerId))
}

export function clearCompare() {
  writeJson(COMPARE_KEY, [])
}

export function setCompareList(providerIds: string[]) {
  writeJson(COMPARE_KEY, providerIds.slice(0, MAX_COMPARE))
}

export function getIntroRequests(): IntroRequest[] {
  return readJson<IntroRequest[]>(INTROS_KEY, [])
}

export function submitIntroRequest(input: {
  providerId: string
  providerName: string
  categoryName: string
  note: string
}): IntroRequest {
  const request: IntroRequest = {
    id: `intro-${Date.now()}`,
    providerId: input.providerId,
    providerName: input.providerName,
    categoryName: input.categoryName,
    note: input.note.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  writeJson(INTROS_KEY, [request, ...getIntroRequests()])
  return request
}

export function updateIntroStatus(id: string, status: IntroStatus) {
  writeJson(
    INTROS_KEY,
    getIntroRequests().map((r) => (r.id === id ? { ...r, status } : r))
  )
}

export function removeIntroRequest(id: string) {
  writeJson(INTROS_KEY, getIntroRequests().filter((r) => r.id !== id))
}

export function formatIntroDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const introStatusLabel: Record<IntroStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
}
