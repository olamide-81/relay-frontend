import { defineRouting } from 'next-intl/routing'

/** Site locales: EN + Western + major Asia Pacific reader languages. */
export const locales = ['en', 'fr', 'es', 'zh', 'ja', 'ko', 'id'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
}

/** BCP 47 tags for dates, OG, and Intl APIs. */
export const localeTags: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr',
  es: 'es',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  id: 'id',
}
