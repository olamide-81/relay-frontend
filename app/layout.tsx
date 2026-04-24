import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://relay.gratebridge.com'),
  title: {
    default: 'Relay — Fintech Provider Intelligence',
    template: '%s | Relay'
  },
  description: 'The fintech provider directory. Search, compare and shortlist KYC, payout, FX, treasury and compliance providers across Africa, LATAM, Europe and beyond. Built by GrateBridge Labs.',
  keywords: [
    'fintech providers directory',
    'KYC providers Africa',
    'payout providers LATAM',
    'FX providers Europe',
    'fintech infrastructure',
    'compliance providers',
    'treasury providers',
    'fintech API comparison',
    'GrateBridge',
    'Relay fintech',
    'African fintech providers',
    'LATAM fintech providers',
    'fintech due diligence',
    'provider comparison tool'
  ],
  authors: [{ name: 'GrateBridge Labs', url: 'https://gratebridge.com' }],
  creator: 'GrateBridge Labs',
  publisher: 'GrateBridge Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://relay.gratebridge.com',
    siteName: 'Relay by GrateBridge',
    title: 'Relay — Every Fintech Provider. One Directory.',
    description: 'Stop reading pitch decks and signing NDAs. Relay maps 200+ KYC, payout, FX, treasury and compliance providers across Africa, LATAM, Europe and beyond. Built for fintech teams.',
    images: [{
      url: '/relaydark.png',
      width: 480,
      height: 480,
      alt: 'Relay — Fintech Provider Intelligence',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relay — Every Fintech Provider. One Directory.',
    description: 'Stop reading pitch decks. Relay maps 200+ providers across Africa, LATAM and Europe. Built for fintech teams.',
    images: ['/relaydark.png'],
    creator: '@gratebridge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/relaydark.png', sizes: '32x32' },
      { url: '/relaydark.png', sizes: '16x16' },
    ],
    shortcut: '/relaydark.png',
    apple: '/relaydark.png',
  },
  alternates: {
    canonical: 'https://relay.gratebridge.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
