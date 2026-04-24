import Link from 'next/link'
import { StaticPageShell } from '@/components/StaticPageShell'

export default function TermsPage() {
  return (
    <StaticPageShell>
      <main className="legal-page">
        <div className="container-narrow prose">
          <Link href="/">← Back to Relay</Link>
          <h1>Terms of Service</h1>
          <p>These terms govern your use of Relay, operated by GrateBridge Labs.</p>
          <h2>Use of Service</h2>
          <p>You agree to use Relay lawfully and not misuse data, APIs, or account access.</p>
          <h2>Billing</h2>
          <p>Paid plans are billed per team as described on the pricing section, unless a separate written agreement applies.</p>
          <h2>Liability</h2>
          <p>Relay provides information to support diligence decisions. Final vendor selection responsibility remains with your team.</p>
        </div>
      </main>
    </StaticPageShell>
  )
}

