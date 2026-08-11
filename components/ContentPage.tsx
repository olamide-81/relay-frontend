'use client'

import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import './content-page.css'

export default function ContentPage({
  title,
  lede,
  children,
}: {
  title: string
  lede?: string
  children: React.ReactNode
}) {
  return (
    <div className="relay-content">
      <SiteNav solid />
      <main className="cp">
        <Reveal className="cp-inner">
          <header className="cp-head">
            <h1 className="cp-title">{title}</h1>
            {lede ? <p className="cp-lede">{lede}</p> : null}
          </header>
          <div className="cp-body">{children}</div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  )
}
