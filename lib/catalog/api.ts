import { api } from '@/lib/api/client'
import type { CatalogRecord } from './map'

export async function listCatalog(): Promise<CatalogRecord[]> {
  const body = await api.get<{ providers?: CatalogRecord[] }>('/api/providers?limit=200')
  return body.providers ?? []
}
