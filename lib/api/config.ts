export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:4000'

export const useLiveApi = process.env.NEXT_PUBLIC_USE_LIVE_API === 'true'

export const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  'https://calendly.com/gratebridgelabs/30min?month=2026-08'
