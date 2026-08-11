'use client'

import { useTranslations } from 'next-intl'
import ContentPage from '@/components/ContentPage'

type Section = { title: string; body: string[] }

export default function AboutPage() {
  const t = useTranslations('pages.about')
  const sections = t.raw('sections') as Section[]

  return (
    <ContentPage title={t('title')} lede={t('lede')}>
      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.body.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </section>
      ))}
    </ContentPage>
  )
}
