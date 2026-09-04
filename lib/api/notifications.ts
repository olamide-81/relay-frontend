import { api } from './client'
import { useLiveApi } from './config'

export type NotificationKind = 'intro' | 'pricing' | 'shortlist' | 'market' | 'system'

export type NotificationItem = {
  id: string
  kind: NotificationKind
  title: string
  body: string
  href: string
  read: boolean
  createdAt: string
}

export type NotificationList = {
  unread: number
  notifications: NotificationItem[]
}

const MOCK: NotificationItem[] = [
  {
    id: 'n1',
    kind: 'pricing',
    title: 'Kestrel Pay returned pricing',
    body: '0.24% on EU→LATAM — 22 bps under Avenir.',
    href: '/dashboard/compare?ids=nordbridge,kestrel,avenir,solano',
    read: false,
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
  },
  {
    id: 'n2',
    kind: 'shortlist',
    title: 'Solano pricing is overdue',
    body: 'Chase is due today on Q3 payout RFP.',
    href: '/dashboard/shortlists',
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'n3',
    kind: 'intro',
    title: 'Nordbridge usually replies in 4 hours',
    body: 'Your intro request is pending.',
    href: '/dashboard/intros/nordbridge',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'n4',
    kind: 'market',
    title: 'Median payout fee moved +3 bps',
    body: '30-day index across 38 corridors.',
    href: '/dashboard/intelligence',
    read: true,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
]

let localStore: NotificationItem[] | null = null

function store() {
  if (!localStore) localStore = MOCK.map((item) => ({ ...item }))
  return localStore
}

function pack(list: NotificationItem[]): NotificationList {
  return { unread: list.filter((n) => !n.read).length, notifications: list }
}

export async function listNotifications(): Promise<NotificationList> {
  if (useLiveApi) return api.get('/api/notifications')
  return pack(store())
}

export async function markNotificationRead(id: string): Promise<NotificationItem> {
  if (useLiveApi) return api.post(`/api/notifications/${id}/read`)
  const list = store()
  const item = list.find((n) => n.id === id)
  if (item) item.read = true
  return item ?? list[0]
}

export async function markAllNotificationsRead(): Promise<NotificationList> {
  if (useLiveApi) return api.post('/api/notifications/read-all')
  store().forEach((n) => {
    n.read = true
  })
  return pack(store())
}
