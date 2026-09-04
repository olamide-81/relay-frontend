'use client'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import {
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationItem,
} from '@/lib/api/notifications'

function timeAgo(iso: string) {
  const delta = Date.now() - new Date(iso).getTime()
  const mins = Math.max(1, Math.round(delta / 60000))
  if (mins < 60) return `${mins}m`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

const KIND_LABEL: Record<NotificationItem['kind'], string> = {
  intro: 'Intro',
  pricing: 'Pricing',
  shortlist: 'Shortlist',
  market: 'Market',
  system: 'Relay',
}

export default function NotificationBell() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<NotificationItem[]>([])
  const [unread, setUnread] = useState(0)

  const load = () =>
    listNotifications()
      .then((result) => {
        setItems(result.notifications)
        setUnread(result.unread)
      })
      .catch(() => {})

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    if (open) void load()
  }, [open])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const onOpenItem = (item: NotificationItem) => {
    if (!item.read) {
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
      setUnread((n) => Math.max(0, n - 1))
      void markNotificationRead(item.id).catch(() => {})
    }
    setOpen(false)
  }

  const onMarkAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnread(0)
    void markAllNotificationsRead().catch(() => {})
  }

  return (
    <div className="relay-bell-wrap" ref={wrapRef}>
      <button
        type="button"
        className="relay-bell"
        aria-label={unread ? `${unread} unread notifications` : 'Notifications'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"
            stroke="rgba(255,255,255,.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 21a2 2 0 0 0 3 0"
            stroke="rgba(255,255,255,.8)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {unread > 0 ? <span className="relay-bell-dot" /> : null}
      </button>

      {open ? (
        <div className="relay-note-panel" role="dialog" aria-label="Notifications">
          <div className="relay-note-head">
            <strong>Notifications</strong>
            {unread > 0 ? (
              <button type="button" className="relay-note-all" onClick={onMarkAll}>
                Mark all read
              </button>
            ) : (
              <span>You’re up to date</span>
            )}
          </div>
          {items.length === 0 ? (
            <p className="relay-note-empty">No notifications yet. Intros, pricing replies and corridor moves land here.</p>
          ) : (
            <div className="relay-note-list">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relay-note-item${item.read ? '' : ' relay-note-item--unread'}`}
                  onClick={() => onOpenItem(item)}
                >
                  <span className="relay-note-kind">{KIND_LABEL[item.kind]}</span>
                  <span className="relay-note-title">{item.title}</span>
                  <span className="relay-note-body">{item.body}</span>
                  <span className="relay-note-time">{timeAgo(item.createdAt)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
