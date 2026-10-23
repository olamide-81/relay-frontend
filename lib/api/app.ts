import { api } from './client'

/** Shapes returned by relay-api /api/app — already in the design components' own formats. */

export type Plan = 'Free' | 'Pro'
export type Role = 'admin' | 'member' | 'viewer'

export type Limits = {
  comparesPerMonth: number | null
  introsPerMonth: number | null
  shortlists: number | null
  bookmarks: number | null
  seats: number | null
  visibleProviders: number | null
  savedComparisons: boolean
}

export type UsageBar = { used: number; limit: number | null; v: string; w: string }
export type Usage = { compares: UsageBar; intros: UsageBar; seats: UsageBar }

export type Pricing = {
  rate: number
  monthlyUsd: number
  yearlyMonthlyUsd: number
  yearlyUsd: number
  monthlyLabel: string
  yearlyLabel: string
  savePct: number
}

export type Billing = {
  plan: Plan
  status: string
  interval: 'monthly' | 'yearly' | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  complimentary: boolean
  card: { brand: string; last4: string } | null
  canManageCard: boolean
  price: Pricing
  payments: Array<{ id: string; number: string; paidAt: string; amountUsd: number; amountNgn: number; interval: string; status: string }>
}

export type Favorite = { id: string; label: string; kind: string; page?: string; params?: Record<string, unknown> }
export type Shortlist = { id: string; name: string; kind: string; updated: string; note: string; ids: string[] }
export type Compare = { id: string; name: string; kind: string; ids: string[] }

export type RequestRow = {
  code: string
  subject: string
  pid: string
  status: 'draft' | 'sent' | 'opened' | 'replied' | 'closed'
  updated: string
  type: string
  volume: string
  timeline: string
  msg: string
  reply: { from: string; role: string; text: string; when: string } | null
  followUps: number
}

export type SourcingStatus = 'submitted' | 'sourcing' | 'ready' | 'intro' | 'closed'
export type SourcingCategory = 'bank' | 'payouts' | 'collections' | 'fx' | 'cards' | 'kyc'

/** An off-Directory Provider the Relay Sourcing team proposes. */
export type SourcingOption = {
  id: string
  kind: SourcingCategory
  name: string
  /** 'London · Correspondent bank' */
  where: string
  fit: string[]
  watch?: string
  /** '6 to 8 weeks' */
  onboard: string
}

/** A Sourcing request, in the Relay Sourcing design's row shape (dates/updated are display labels). */
export type SourcingRow = {
  code: string
  cat: SourcingCategory
  cap: string
  title: string
  markets: string[]
  ccys: string[]
  volume: string
  timeline: string
  must: string[]
  notes: string
  status: SourcingStatus
  updated: string
  /** One label per completed step: sent, sourcing, options shared, intros requested. */
  dates: string[]
  repliedBy?: string
  relayNote?: string
  options?: SourcingOption[]
  picked?: string[]
  /** Options the user hasn't opened yet (the "N new" pill). */
  unseen?: number
}

export type SourcingInput = {
  category: SourcingCategory
  need: string
  title: string
  markets: string[]
  currencies: string[]
  volume: string
  goLive: string
  mustHaves: string[]
  notes: string
}

export type InboxRow = {
  id: string
  day: string
  kind: string
  cat: string
  accent: string
  from: string
  when: string
  full: string
  subject: string
  body: string
  facts: string[][]
  primary: string
  primaryHref: string
  pid: string | null
  unread: boolean
}

export type NoteRow = {
  id: string
  day: string
  kind: string
  who: string
  what: string
  when: string
  action: string
  href?: string
  type: string
  unread: boolean
}

/** [id, name, kind, hq, stage, owner, volume, updated, licence, price, pid, log] */
export type PipelineRow = [string, string, string, string, string, string, string, string, string, string, string, Array<{ t: string; d: string }>]
/** Pending invites use id "invite:<id>". */
export type MemberRow = { id: string; name: string; email: string; role: string; img: string | null; pending: boolean; owner: boolean }
/** [sessionId, device, where, current] */
export type SessionRow = [string, string, string, boolean]

export type Prefs = {
  theme: string
  currency: string
  start: string
  region: string
  mx: Record<string, Record<string, number>>
  freq: string
  quiet: boolean
}

export type Profile = { name: string; title: string; email: string; location: string; timezone: string }

export type Catalog = {
  CAT: Record<string, { label: string; accent: string; count: number }>
  TOTAL: number
  REGIONS: string[]
  providers: Array<Record<string, any> & { id: string; name: string; kind: string }>
  available: number
  locked: number
  countries?: number
  regionsCovered?: number
  addedThisMonth?: number
}

export type Bootstrap = {
  user: { id: string; name: string; firstName: string; email: string; initials: string; avatarUrl: string | null; company: string; emailVerified: boolean }
  workspace: { id: string; name: string; slug: string; role: Role }
  plan: Plan
  limits: Limits
  usage: Usage
  billing: Billing
  members: MemberRow[]
  favorites: Favorite[]
  bookmarks: string[]
  shortlists: Shortlist[]
  compares: Compare[]
  requests: RequestRow[]
  /** Newest first. Optional until relay-api ships Sourcing. */
  sourcing?: SourcingRow[]
  inbox: InboxRow[]
  notifications: NoteRow[]
  pipeline: PipelineRow[]
  profile: Profile
  activity: string[][]
  prefs: Prefs
  twoFa: boolean
  sessions: SessionRow[]
  catalog: Catalog
  intelligence: Record<string, unknown>
}

const enc = encodeURIComponent

export const appApi = {
  bootstrap: () => api.get<Bootstrap>('/api/app/bootstrap'),

  setFavorites: (favorites: Favorite[]) => api.put<Favorite[]>('/api/app/favorites', { favorites }),
  setBookmark: (id: string, on: boolean) => api.put<string[]>(`/api/app/bookmarks/${enc(id)}`, { on }),

  createShortlist: (b: { name: string; ids: string[]; note?: string; kind?: string }) => api.post<Shortlist>('/api/app/shortlists', b),
  updateShortlist: (id: string, b: { name?: string; ids?: string[]; note?: string }) =>
    api.patch<Shortlist>(`/api/app/shortlists/${enc(id)}`, b),
  deleteShortlist: (id: string) => api.delete(`/api/app/shortlists/${enc(id)}`),

  trackCompare: (ids: string[]) => api.post<Usage>('/api/app/compares/track', { ids }),
  saveCompare: (b: { name: string; ids: string[] }) => api.post<Compare>('/api/app/compares', b),
  updateCompare: (id: string, b: { name?: string; ids?: string[] }) => api.patch<Compare>(`/api/app/compares/${enc(id)}`, b),
  deleteCompare: (id: string) => api.delete(`/api/app/compares/${enc(id)}`),

  addPipeline: (pid: string, stage?: string) => api.post<PipelineRow[]>('/api/app/pipeline', { pid, stage }),
  updatePipeline: (id: string, b: { stage?: string; volume?: string }) => api.patch<PipelineRow[]>(`/api/app/pipeline/${enc(id)}`, b),
  removePipeline: (id: string) => api.delete<PipelineRow[]>(`/api/app/pipeline/${enc(id)}`),

  createRequests: (b: { pids: string[]; type?: string; subject?: string; volume?: string; timeline?: string; message?: string; draft?: boolean }) =>
    api.post<{ requests: RequestRow[]; usage: Usage }>('/api/app/requests', b),
  sendDraft: (code: string) => api.post<RequestRow>(`/api/app/requests/${enc(code)}/send`),
  followUp: (code: string) => api.post<RequestRow>(`/api/app/requests/${enc(code)}/follow-up`),
  closeRequest: (code: string) => api.post<RequestRow>(`/api/app/requests/${enc(code)}/close`),
  deleteDraft: (code: string) => api.delete(`/api/app/requests/${enc(code)}`),

  createSourcing: (b: SourcingInput) => api.post<SourcingRow>('/api/app/sourcing', b),
  withdrawSourcing: (code: string) => api.post<SourcingRow>(`/api/app/sourcing/${enc(code)}/withdraw`),
  /** Request intros to the picked options; relay-api also creates the matching Provider intro requests. */
  pickSourcing: (code: string, optionIds: string[]) =>
    api.post<{ sourcing: SourcingRow; requests: RequestRow[]; usage: Usage }>(`/api/app/sourcing/${enc(code)}/intros`, { optionIds }),
  /** "None of these fit": back to sourcing. */
  noneFitSourcing: (code: string) => api.post<SourcingRow>(`/api/app/sourcing/${enc(code)}/none-fit`),
  seenSourcing: (code: string) => api.post<SourcingRow>(`/api/app/sourcing/${enc(code)}/seen`),

  readInbox: (id: string, unread = false) => api.post(`/api/app/inbox/${enc(id)}/read`, { unread }),
  readNotifications: (id: string) => api.post(`/api/app/notifications/${enc(id)}/read`),

  updateProfile: (b: Partial<Profile>) => api.put<Profile>('/api/app/profile', b),
  updatePrefs: (b: Partial<Prefs>) => api.put<Prefs>('/api/app/prefs', b),
  changePassword: (current: string, password: string) => api.post('/api/app/password', { current, password }),
  revokeSession: (id: string) => api.delete(`/api/app/sessions/${enc(id)}`),
  startTwoFactor: () => api.post<{ secret: string; otpauth: string; qr: string }>('/api/app/2fa/setup'),
  enableTwoFactor: (code: string) => api.post<{ twoFa: boolean }>('/api/app/2fa/enable', { code }),
  disableTwoFactor: (code: string) => api.post<{ twoFa: boolean }>('/api/app/2fa/disable', { code }),

  renameWorkspace: (name: string) => api.patch('/api/app/workspace', { name }),
  invite: (emails: string[], role: string) => api.post<{ members: MemberRow[]; sent: number }>('/api/app/members/invite', { emails, role }),
  setMemberRole: (id: string, role: string) => api.patch<MemberRow[]>(`/api/app/members/${enc(id)}`, { role }),
  removeMember: (id: string) => api.delete<MemberRow[]>(`/api/app/members/${enc(id)}`),
  acceptInvite: (token: string) => api.post('/api/app/invites/accept', { token }),

  checkout: (interval: 'monthly' | 'yearly') =>
    api.post<{ authorizationUrl: string; reference: string }>('/api/app/billing/checkout', { interval }),
  verifyCheckout: (reference: string) => api.get<Billing>(`/api/app/billing/verify?reference=${enc(reference)}`),
  cancel: () => api.post<Billing>('/api/app/billing/cancel'),
  manageCard: () => api.get<{ url: string }>('/api/app/billing/manage'),
}
