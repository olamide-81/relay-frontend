import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { DirectorySection } from '@/components/DirectorySection'
import { StatsRow } from '@/components/StatsRow'
import { ProblemSection } from '@/components/ProblemSection'
import { FeatureCards } from '@/components/FeatureCards'
import { Marquee } from '@/components/Marquee'
import { AccessSection } from '@/components/AccessSection'
import { Waitlist } from '@/components/Waitlist'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function Page() {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <LoadingScreen />
      <Nav />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 52px' }}>
        <Hero />
        <ScrollReveal>
          <DirectorySection />
        </ScrollReveal>
        <ScrollReveal><StatsRow /></ScrollReveal>
        <ScrollReveal><ProblemSection /></ScrollReveal>
        <ScrollReveal><FeatureCards /></ScrollReveal>
        <ScrollReveal><Marquee /></ScrollReveal>
        <ScrollReveal><AccessSection /></ScrollReveal>
        <ScrollReveal><Waitlist /></ScrollReveal>
        <ScrollReveal><Footer /></ScrollReveal>
      </div>
    </div>
  )
}
