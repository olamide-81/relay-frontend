/** Simulated network delay while relay-api auth is still being wired. */
export const API_LATENCY_MS = 720

export function delay(ms = API_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
