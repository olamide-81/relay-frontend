import DashboardApp from '@/components/relay-app/DashboardApp'

/**
 * Keep the signed-in shell mounted while the catch-all slug changes
 * (/dashboard → /dashboard/inbox, …). Putting it on the page remounted the
 * workspace on every screen click and flashed a blank frame.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardApp />
      {children}
    </>
  )
}
