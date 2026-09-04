import { getSession } from '../session'
import { apiBaseUrl } from './config'
import { ApiError } from './simulate'

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
  if (body && !Array.isArray(body) && Array.isArray(body.error)) return 'Invalid request'
  return fallback
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
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
  const body = await parseBody(res)
  if (!res.ok) {
    throw new ApiError(res.status, errorMessage(body, res.statusText || 'Request failed'))
  }
  return body as T
}

export const api = {
  get: <T>(path: string) => apiRequest<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'POST', body: body != null ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PATCH', body: body != null ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
}
