'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { localeLabels, locales, type Locale } from '@/i18n/routing'

type Props = {
  className?: string
  label?: string
}

export function LocaleSwitcher({ className, label }: Props) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  return (
    <label className={className}>
      {label && <span className="locale-switcher-label">{label}</span>}
      <select
        className="locale-switcher"
        value={locale}
        aria-label={label}
        onChange={(e) => {
          router.replace(pathname, { locale: e.target.value as Locale })
        }}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  )
}
