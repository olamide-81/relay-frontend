import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Two-factor authentication',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
