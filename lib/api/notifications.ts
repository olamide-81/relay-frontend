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

const MOCK: NotificationItem[] = []

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
