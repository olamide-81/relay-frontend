import Link from 'next/link'
import { StaticPageShell } from '@/components/StaticPageShell'

export default function PrivacyPage() {
  return (
    <StaticPageShell>
      <main className="legal-page">
        <div className="container-narrow prose">
          <Link href="/">← Back to Relay</Link>
          <h1>Privacy Policy</h1>
          <p>Relay by GrateBridge Labs is committed to protecting your privacy.</p>
          <h2>What We Collect</h2>
          <p>We collect account information, product usage signals, and support communications to operate and improve Relay.</p>
          <h2>How We Use Data</h2>
          <p>Data is used to provide the directory, improve search relevance, secure accounts, and deliver product updates. We do not sell your research activity to providers.</p>
          <h2>Contact</h2>
          <p>For privacy questions, email hello@gratebridge.com.</p>
        </div>
      </main>
    </StaticPageShell>
  )
}

