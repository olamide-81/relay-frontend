import BaseStyles from '@/components/relay-app/BaseStyles'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseStyles variant="site" />
      <div id="dc-root">{children}</div>
    </>
  )
}
