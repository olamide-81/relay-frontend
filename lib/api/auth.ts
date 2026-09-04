import { ApiError, delay } from './simulate'
import { api } from './client'
import { apiBaseUrl, useLiveApi } from './config'
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

function persist(user: SessionUser, accessToken?: string): Session {
  const session: Session = {
    accessToken: accessToken ?? tokenFor(user.email),
    user,
  }
  setSession(session)
  return session
}

type ApiAuthUser = {
  id: string
  email: string
  fullName: string
  firstName: string
  lastName: string
  company?: string
  userRole?: UserRole
  role?: 'user' | 'admin'
  subscriptionStatus?: SessionUser['subscriptionStatus']
  currentPeriodEnd?: string | Date | null
  emailVerified?: boolean
  authProvider?: 'email' | 'google'
}

function sessionFromApi(accessToken: string, user: ApiAuthUser): Session {
  const mapped = userFrom({
    email: user.email,
    fullName: user.fullName,
    company: user.company ?? 'Independent',
    role: user.userRole ?? 'founder',
    provider: user.authProvider === 'google' ? 'google' : 'email',
    subscriptionStatus: user.subscriptionStatus,
  })
  mapped.id = String(user.id)
  mapped.emailVerified = Boolean(user.emailVerified)
  mapped.role = user.role ?? 'user'
  mapped.currentPeriodEnd = user.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toISOString()
    : null
  return persist(mapped, accessToken)
}

/** POST /api/auth/login */
export async function login(input: LoginInput): Promise<Session> {
  if (useLiveApi) {
    const result = await api.post<{ accessToken: string; user: ApiAuthUser }>('/api/auth/login', {
      email: input.email.trim().toLowerCase(),
      password: input.password,
    })
    return sessionFromApi(result.accessToken, { ...result.user, id: String(result.user.id) })
  }

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

/** POST /api/auth/register */
export async function register(input: RegisterInput): Promise<Session> {
  if (useLiveApi) {
    const result = await api.post<{ accessToken?: string; user?: ApiAuthUser; message?: string }>(
      '/api/auth/register',
      {
        email: input.email.trim().toLowerCase(),
        password: input.password,
        fullName: input.fullName,
        company: input.company,
        role: input.role ?? 'founder',
      }
    )
    if (!result.accessToken || !result.user) {
      throw new ApiError(201, result.message || 'Check your email to verify your account')
    }
    return sessionFromApi(result.accessToken, { ...result.user, id: String(result.user.id) })
  }

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

/** Start Google OAuth. Live API redirects the browser to Google. */
export async function loginWithGoogle(locale = 'en'): Promise<Session> {
  if (useLiveApi) {
    if (typeof window === 'undefined') {
      throw new ApiError(500, 'Google sign-in is only available in the browser')
    }
    const next = '/dashboard'
    const url = `${apiBaseUrl}/api/auth/google?locale=${encodeURIComponent(locale)}&next=${encodeURIComponent(next)}`
    window.location.assign(url)
    return new Promise<Session>(() => {})
  }

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

/** POST /api/auth/google/complete — finish the Google redirect. */
export async function completeGoogleLogin(ticket: string): Promise<Session> {
  const result = await api.post<{ accessToken: string; user: ApiAuthUser }>('/api/auth/google/complete', {
    ticket,
  })
  return sessionFromApi(result.accessToken, { ...result.user, id: String(result.user.id) })
}

export const googleAuthErrorMessage: Record<string, string> = {
  google_denied: 'Google sign-in was cancelled.',
  google_failed: 'Google sign-in failed. Try again.',
  google_not_configured: 'Google sign-in is not configured on the API.',
  access_denied: 'Google sign-in was cancelled.',
}

/** GET /api/auth/me */
export async function getMe(): Promise<SessionUser> {
  if (useLiveApi) {
    const user = await api.get<ApiAuthUser>('/api/auth/me')
    const session = getSession()
    if (!session) throw new ApiError(401, 'Not authenticated')
    sessionFromApi(session.accessToken, { ...user, id: String(user.id) })
    return getSession()!.user
  }
  await delay(180)
  const session = getSession()
  if (!session) throw new ApiError(401, 'Not authenticated')
  return session.user
}

/** POST /api/auth/logout */
export async function logout() {
  if (useLiveApi) {
    try {
      await api.post('/api/auth/logout')
    } catch {
      // still clear the client session
    }
    clearSession()
    return
  }
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
