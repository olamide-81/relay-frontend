import Link from 'next/link'
import { StaticPageShell } from '@/components/StaticPageShell'

const posts = [
  {
    title: 'How to evaluate KYC providers in African markets',
    excerpt: 'A practical framework to compare onboarding quality, AML tooling, and jurisdiction coverage without losing weeks to discovery calls.',
    date: 'Apr 2026',
  },
  {
    title: 'Choosing payout rails for LATAM expansion',
    excerpt: 'What to prioritize between local settlement speed, reconciliation depth, and FX cost when expanding into LATAM corridors.',
    date: 'Apr 2026',
  },
  {
    title: 'Compliance-first provider shortlisting for fintech teams',
    excerpt: 'How product, compliance, and engineering can run one shared shortlist process from discovery through integration.',
    date: 'Mar 2026',
  },
]

export default function BlogPage() {
  return (
    <StaticPageShell>
      <main className="legal-page">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Relay Blog</span>
            <h1>Research notes for teams shipping fintech products.</h1>
          </div>
          <div className="cards3">
            {posts.map((post) => (
              <article className="card" key={post.title}>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{post.date}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href="/contact">Discuss with our team →</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </StaticPageShell>
  )
}

