import { api } from './client'
import { useLiveApi } from './config'

export type WaitlistRole = 'founder' | 'engineer' | 'productManager' | 'other'

export type WaitlistInput = {
  fullName: string
  email: string
  role: WaitlistRole
  company: string
  locale?: string
  source?: string
}

export type WaitlistEntry = {
  id: string
  fullName: string
  email: string
  role: WaitlistRole | string
  company: string
  locale: string
  source: string
  createdAt: string
}

export async function joinWaitlist(input: WaitlistInput) {
  if (!useLiveApi) return { alreadyJoined: false }
  return api.post<{ alreadyJoined: boolean; entry: WaitlistEntry }>('/api/waitlist', input)
}
