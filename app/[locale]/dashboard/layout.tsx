import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import DashboardShell from '@/components/dashboard/DashboardShell'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-relay',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-relay-mono',
  display: 'swap',
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <DashboardShell>{children}</DashboardShell>
    </div>
  )
}
