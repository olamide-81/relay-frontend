import Link from 'next/link'
import { StaticPageShell } from '@/components/StaticPageShell'

export default function ContactPage() {
  return (
    <StaticPageShell>
      <main className="legal-page">
        <div className="container-narrow prose">
          <Link href="/">← Back to Relay</Link>
          <h1>Contact</h1>
          <p>For partnerships, product access, or support, email hello@gratebridge.com.</p>
          <p>Relay is built by GrateBridge Labs, a Nigerian and US based team.</p>
        </div>
      </main>
    </StaticPageShell>
  )
}

