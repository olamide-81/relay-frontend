import BaseStyles from '@/components/relay-app/BaseStyles'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseStyles variant="app" />
      <div id="dc-root">{children}</div>
    </>
  )
}
