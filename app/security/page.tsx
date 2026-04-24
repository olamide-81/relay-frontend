import Link from 'next/link'
import { StaticPageShell } from '@/components/StaticPageShell'

export default function SecurityPage() {
  return (
    <StaticPageShell>
      <main className="legal-page">
        <div className="container-narrow prose">
          <Link href="/">← Back to Relay</Link>
          <h1>Security</h1>
          <p>Security is foundational to how Relay is built and operated.</p>
          <h2>Controls</h2>
          <p>We apply least-privilege access, encrypted transport, and secure development practices for production systems.</p>
          <h2>Monitoring</h2>
          <p>Infrastructure and service availability are monitored continuously, with incident response procedures in place.</p>
          <h2>Reporting</h2>
          <p>To report vulnerabilities, contact hello@gratebridge.com with details and reproduction steps.</p>
        </div>
      </main>
    </StaticPageShell>
  )
}

