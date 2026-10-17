import { getSession, setSession } from '../session'
import { apiBaseUrl } from './config'
import { ApiError } from './simulate'
import { trackBusy } from '../dc/busy'

type Json = Record<string, unknown> | unknown[] | null

async function parseBody(res: Response): Promise<Json> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as Json
  } catch {
    return null
  }
}

function errorMessage(body: Json, fallback: string) {
  if (body && !Array.isArray(body) && typeof body.error === 'string') return body.error
  if (body && !Array.isArray(body) && Array.isArray(body.error)) {
    const first = body.error[0] as { message?: unknown } | undefined
    return typeof first?.message === 'string' ? first.message : 'Invalid request'
  }
  return fallback
}

let refreshing: Promise<string | null> | null = null

/** Swap the httpOnly refresh cookie for a new access token. Resolves null when the session is gone. */
export function refreshAccessToken(): Promise<string | null> {
  refreshing ??= fetch(`${apiBaseUrl}/api/auth/refresh`, { method: 'POST', credentials: 'include' })
    .then(async (res) => {
      if (!res.ok) return null
      const body = (await parseBody(res)) as { accessToken?: string } | null
      const token = body?.accessToken ?? null
      const session = getSession()
      if (token && session) setSession({ ...session, accessToken: token })
      return token
    })
    .catch(() => null)
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

const NO_REFRESH = /^\/api\/auth\/(login|register|refresh|logout|google)/

export function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  return trackBusy(send<T>(path, init, false))
}

async function send<T>(path: string, init: RequestInit, retried: boolean): Promise<T> {
  const session = getSession()
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (session?.accessToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${session.accessToken}`)
  }

  const res = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  })
  if (res.status === 401 && !retried && session && !NO_REFRESH.test(path)) {
    const token = await refreshAccessToken()
    if (token) return send<T>(path, init, true)
  }
  const body = await parseBody(res)
  if (!res.ok) {
    const code = body && !Array.isArray(body) && typeof body.code === 'string' ? body.code : undefined
    throw new ApiError(res.status, errorMessage(body, res.statusText || 'Request failed'), code)
  }
  return body as T
}

export const api = {
  get: <T>(path: string) => apiRequest<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'POST', body: body != null ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PATCH', body: body != null ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PUT', body: body != null ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
}
