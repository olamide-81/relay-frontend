'use client'

import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/heroes/Hero'
import ProvidersSection from '@/components/ProvidersSection'
import IntelligenceSection from '@/components/IntelligenceSection'
import ResearchHomeSection from '@/components/ResearchHomeSection'
import './home.css'

export default function Home() {
  return (
    <div className="relay-home relay-home--cinema">
      <SiteNav />
      <Hero />
      <ProvidersSection />
      <IntelligenceSection />
      <ResearchHomeSection />
      <SiteFooter />
    </div>
  )
}
