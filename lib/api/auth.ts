import { ApiError, delay } from './simulate'
import { api, apiRequest, refreshAccessToken } from './client'
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
  avatarUrl?: string | null
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
    avatarUrl: input.avatarUrl || null,
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
  avatarUrl?: string | null
}

function sessionFromApi(accessToken: string, user: ApiAuthUser): Session {
  const mapped = userFrom({
    email: user.email,
    fullName: user.fullName,
    company: user.company ?? 'Independent',
    role: user.userRole ?? 'founder',
    provider: user.authProvider === 'google' ? 'google' : 'email',
    subscriptionStatus: user.subscriptionStatus,
    avatarUrl: user.avatarUrl,
  })
  mapped.id = String(user.id)
  mapped.emailVerified = Boolean(user.emailVerified)
  mapped.role = user.role ?? 'user'
  mapped.currentPeriodEnd = user.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toISOString()
    : null
  return persist(mapped, accessToken)
}

type SessionResponse =
  | { accessToken: string; user: ApiAuthUser; twoFactorRequired?: undefined }
  | { twoFactorRequired: true; twoFactorToken: string; accessToken?: undefined }

const TWO_FA_KEY = 'relay-2fa'
const INVITE_KEY = 'relay-invite'

/** Password (or Google) was right; the account has 2FA on, so the code screen comes next. */
export class TwoFactorRequired extends Error {
  constructor() {
    super('Enter the code from your authenticator app.')
  }
}

function sessionOrChallenge(result: SessionResponse): Session {
  if (result.twoFactorRequired) {
    sessionStorage.setItem(TWO_FA_KEY, result.twoFactorToken)
    throw new TwoFactorRequired()
  }
  return sessionFromApi(result.accessToken, { ...result.user, id: String(result.user.id) })
}

/** POST /api/auth/2fa — finish a login that stopped at the authenticator step. */
export async function completeTwoFactor(code: string): Promise<Session> {
  const token = sessionStorage.getItem(TWO_FA_KEY)
  if (!token) throw new ApiError(401, 'Your login expired. Log in again.')
  const result = await api.post<SessionResponse>('/api/auth/2fa', { token, code: code.replace(/\s+/g, '') })
  sessionStorage.removeItem(TWO_FA_KEY)
  return sessionOrChallenge(result)
}

export function hasTwoFactorChallenge() {
  return typeof window !== 'undefined' && Boolean(sessionStorage.getItem(TWO_FA_KEY))
}

/** Workspace invite links (`?invite=`) are remembered until the invitee has a session. */
export function rememberInvite(token: string | null) {
  if (token) sessionStorage.setItem(INVITE_KEY, token)
}

export function pendingInvite() {
  return typeof window === 'undefined' ? null : sessionStorage.getItem(INVITE_KEY)
}

export function clearInvite() {
  sessionStorage.removeItem(INVITE_KEY)
}

/** POST /api/auth/login */
export async function login(input: LoginInput): Promise<Session> {
  if (useLiveApi) {
    const result = await api.post<SessionResponse>('/api/auth/login', {
      email: input.email.trim().toLowerCase(),
      password: input.password,
    })
    return sessionOrChallenge(result)
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
        ...(pendingInvite() ? { invite: pendingInvite() } : {}),
      }
    )
    if (!result.accessToken || !result.user) {
      throw new ApiError(201, result.message || 'Check your email to verify your account')
    }
    clearInvite()
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
export async function loginWithGoogle(
  locale = 'en',
  intent: 'signin' | 'signup' = 'signin'
): Promise<Session> {
  if (useLiveApi) {
    if (typeof window === 'undefined') {
      throw new ApiError(500, 'Google sign-in is only available in the browser')
    }
    const next = '/dashboard'
    const origin = window.location.origin
    const url = `${apiBaseUrl}/api/auth/google?locale=${encodeURIComponent(locale)}&next=${encodeURIComponent(next)}&intent=${intent}&origin=${encodeURIComponent(origin)}`
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
  const result = await api.post<SessionResponse>('/api/auth/google/complete', { ticket })
  return sessionOrChallenge(result)
}

export const googleAuthErrorMessage: Record<string, string> = {
  google_denied: 'Google sign-in was cancelled.',
  google_failed: 'Google sign-in failed. Try again.',
  google_not_configured: 'Google sign-in is not configured on the API.',
  google_no_account: 'No Relay account for this Google login yet.',
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
  if (!email.includes('@')) throw new ApiError(400, 'Email required')
  return api.post<{ message: string }>('/api/auth/forgot-password', { email: email.trim().toLowerCase() })
}

/** POST /api/auth/reset-password */
export async function resetPassword(token: string, password: string) {
  return api.post<{ message: string }>('/api/auth/reset-password', { token, password })
}

/** POST /api/auth/verify-email */
export async function verifyEmail(token: string) {
  return api.post<{ message: string }>('/api/auth/verify-email', { token })
}

/** Rebuild the tab's session from the refresh cookie (new tab, reload after sessionStorage was cleared). */
export async function restoreSession(): Promise<SessionUser | null> {
  const token = await refreshAccessToken()
  if (!token) return null
  const user = await apiRequest<ApiAuthUser>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => null)
  if (!user) return null
  return sessionFromApi(token, { ...user, id: String(user.id) }).user
}

