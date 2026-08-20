export type SubscriptionStatus =
  | 'free'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'trialing'

export type UserRole =
  | 'developer'
  | 'founder'
  | 'product manager'
  | 'product designer'
  | 'others'

export type SessionUser = {
  id: string
  email: string
  fullName: string
  firstName: string
  lastName: string
  company: string
  userRole: UserRole
  role: 'user' | 'admin'
  subscriptionStatus: SubscriptionStatus
  currentPeriodEnd: string | null
  emailVerified: boolean
  provider: 'google' | 'email'
  initials: string
}

export type Session = {
  accessToken: string
  user: SessionUser
}

const SESSION_KEY = 'relay-session'

export function isSubscribed(user: SessionUser | null | undefined) {
  if (!user) return false
  if (user.subscriptionStatus !== 'active' && user.subscriptionStatus !== 'trialing') {
    return false
  }
  if (!user.currentPeriodEnd) return true
  return new Date(user.currentPeriodEnd) > new Date()
}

export function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function setSession(session: Session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
