import { ApiError, delay } from './simulate'
import {
  clearSession,
  getSession,
  initialsFromName,
  setSession,
  type Session,
  type SessionUser,
  type UserRole,
} from '../session'

type LoginInput = {
  email: string
  password: string
}

type RegisterInput = {
  email: string
  password: string
  fullName: string
  company: string
  role?: UserRole
}

function tokenFor(email: string) {
  return `sim_${btoa(email).replace(/=+/g, '')}_${Date.now().toString(36)}`
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  return {
    firstName: parts[0] || 'Builder',
    lastName: parts.slice(1).join(' ') || '',
  }
}

function userFrom(input: {
  email: string
  fullName: string
  company: string
  role?: UserRole
  provider: 'google' | 'email'
  subscriptionStatus?: SessionUser['subscriptionStatus']
}): SessionUser {
  const { firstName, lastName } = splitName(input.fullName)
  const demoPro = input.email.toLowerCase() === 'pro@relay.dev'
  return {
    id: `usr_${btoa(input.email).replace(/=+/g, '').slice(0, 12)}`,
    email: input.email.toLowerCase(),
    fullName: input.fullName.trim(),
    firstName,
    lastName,
    company: input.company.trim() || 'Independent',
    userRole: input.role ?? 'founder',
    role: 'user',
    subscriptionStatus: demoPro ? 'active' : (input.subscriptionStatus ?? 'free'),
    currentPeriodEnd: demoPro
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null,
    emailVerified: input.provider === 'google',
    provider: input.provider,
    initials: initialsFromName(input.fullName),
  }
}

function persist(user: SessionUser): Session {
  const session: Session = {
    accessToken: tokenFor(user.email),
    user,
  }
  setSession(session)
  return session
}

/** POST /api/auth/login — simulated until relay-api is live. */
export async function login(input: LoginInput): Promise<Session> {
  await delay()
  const email = input.email.trim().toLowerCase()
  if (!email || !input.password) {
    throw new ApiError(400, 'Email and password are required')
  }
  if (!email.includes('@')) {
    throw new ApiError(400, 'Enter a valid work email')
  }
  if (input.password.length < 8) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const existing = getSession()
  if (existing?.user.email === email) {
    return persist({ ...existing.user, lastName: existing.user.lastName })
  }

  const local = email.split('@')[0].replace(/[._-]/g, ' ')
  const fullName = local
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return persist(
    userFrom({
      email,
      fullName: fullName || 'Builder',
      company: email.split('@')[1]?.split('.')[0] ?? 'Independent',
      provider: 'email',
    })
  )
}

/** POST /api/auth/register — simulated. Auto-signs in so dashboard work can proceed. */
export async function register(input: RegisterInput): Promise<Session> {
  await delay()
  const email = input.email.trim().toLowerCase()
  if (!email.includes('@')) {
    throw new ApiError(400, 'Enter a valid work email')
  }
  if (input.password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(input.password) || !/[0-9]/.test(input.password)) {
    throw new ApiError(400, 'Password needs an uppercase letter and a number')
  }
  if (input.fullName.trim().length < 3) {
    throw new ApiError(400, 'Enter your full name')
  }
  if (input.company.trim().length < 2) {
    throw new ApiError(400, 'Enter your company name')
  }

  return persist(
    userFrom({
      email,
      fullName: input.fullName,
      company: input.company,
      role: input.role ?? 'founder',
      provider: 'email',
    })
  )
}

/** Simulated Google OAuth callback. */
export async function loginWithGoogle(): Promise<Session> {
  await delay(1100)
  return persist(
    userFrom({
      email: 'alex@company.com',
      fullName: 'Alex Morgan',
      company: 'Company',
      role: 'founder',
      provider: 'google',
    })
  )
}

/** GET /api/auth/me */
export async function getMe(): Promise<SessionUser> {
  await delay(180)
  const session = getSession()
  if (!session) throw new ApiError(401, 'Not authenticated')
  return session.user
}

/** POST /api/auth/logout */
export async function logout() {
  await delay(220)
  clearSession()
}

/** POST /api/auth/forgot-password */
export async function forgotPassword(email: string) {
  await delay(800)
  if (!email.includes('@')) throw new ApiError(400, 'Email required')
  return { message: 'If that account exists, we sent a reset link.' }
}

export async function activateSubscription(): Promise<SessionUser> {
  await delay(900)
  const session = getSession()
  if (!session) throw new ApiError(401, 'Not authenticated')
  const user: SessionUser = {
    ...session.user,
    subscriptionStatus: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
  persist(user)
  return user
}

export async function cancelSubscription(): Promise<SessionUser> {
  await delay(600)
  const session = getSession()
  if (!session) throw new ApiError(401, 'Not authenticated')
  const user: SessionUser = {
    ...session.user,
    subscriptionStatus: 'canceled',
    currentPeriodEnd: null,
  }
  persist(user)
  return user
}
