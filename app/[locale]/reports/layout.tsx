import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relay-reports">
      <SiteNav solid />
      {children}
      <SiteFooter />
    </div>
  )
}
