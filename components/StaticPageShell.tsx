import Link from 'next/link'
import { ReactNode } from 'react'

export function StaticPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <img className="logo-img" src="/relaylight.png" alt="Relay logo" />
            Relay
          </Link>
          <div className="nav-links">
            <Link href="/#directory">Directory</Link>
            <Link href="/#regions">Coverage</Link>
            <Link href="/#features">Product</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="nav-cta">
            <Link href="/signin" className="btn btn-ghost">Sign in</Link>
            <Link href="/#cta" className="btn btn-primary">Get early access <span className="arrow">→</span></Link>
          </div>
        </div>
      </nav>

      {children}

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo">
                <img className="logo-img" src="/relaylight.png" alt="Relay logo" />
                Relay
              </Link>
              <p>Fintech provider intelligence, built by GrateBridge Labs.</p>
              <a href="https://gratebridge.com" target="_blank" rel="noreferrer">GrateBridge.com</a>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><Link href="/#directory">Directory</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/#pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/contact">Contact</Link></li>
                <li><a href="https://gratebridge.com" target="_blank" rel="noreferrer">GrateBridge</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 GrateBridge Labs Ltd. All rights reserved.</span>
            <span className="status"><span className="dot" />All systems operational</span>
          </div>
        </div>
      </footer>
    </>
  )
}

