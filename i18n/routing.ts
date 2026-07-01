import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'fr', 'es'] as const
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
}
