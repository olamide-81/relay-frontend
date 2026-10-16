import { api } from './client'

export type ContactInput = {
  name: string
  email: string
  company: string
  role?: string
  size?: string
  needs?: string[]
  message?: string
}

/** POST /api/site/contact — lands in the admin's Contact inbox and notifies the team by email. */
export function sendContact(input: ContactInput) {
  return api.post<{ ok: true }>('/api/site/contact', input)
}
