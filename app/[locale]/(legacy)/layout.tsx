import '../../globals.css'
import { WaitlistProvider } from '@/components/WaitlistModal'
import { CatalogProvider } from '@/components/dashboard/CatalogContext'

/** Pages that predate the Relay redesign (reports, methodology, password reset). */
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <WaitlistProvider>
      <CatalogProvider>{children}</CatalogProvider>
    </WaitlistProvider>
  )
}
