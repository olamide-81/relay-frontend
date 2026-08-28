'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSession } from '@/hooks/useSession'
import TopBar from '@/components/dashboard/chrome/TopBar'
import Rail from '@/components/dashboard/chrome/Rail'
import { WeightingProvider } from '@/components/dashboard/WeightingContext'
import { WeightingDialog } from '@/components/dashboard/WeightingDialog'
import type { RailSection, TopBarSection } from '@/lib/relay/types'
import './relay.css'

function getTopBar(path: string): TopBarSection {
  if (path.startsWith('/dashboard/providers')) return 'Directory'
  if (path.startsWith('/dashboard/compare')) return 'Compare'
  if (path.startsWith('/dashboard/shortlists')) return 'Shortlists'
  if (path.startsWith('/dashboard/intros')) return 'Requests'
  return 'Overview'
}

function getRail(path: string): RailSection {
  if (path.startsWith('/dashboard/intelligence')) return 'Intelligence'
  if (path.startsWith('/dashboard/providers')) return 'Directory'
  if (path.startsWith('/dashboard/compare')) return 'Directory'
  if (path.startsWith('/dashboard/shortlists')) return 'Shortlists'
  if (path.startsWith('/dashboard/intros')) return 'Requests'
  return 'Overview'
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, ready } = useSession()
  const top = getTopBar(pathname)
  const rail = getRail(pathname)

  useEffect(() => {
    if (ready && !user) router.replace('/signin')
  }, [ready, user, router])

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#0A0A0B'
    return () => {
      document.body.style.background = prev
    }
  }, [])

  if (!ready || !user) {
    return (
      <div className="relay relay--boot">
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <WeightingProvider>
      <div className="relay">
        <div className="relay-glow" />
        <TopBar active={top} />
        <div className="relay-body">
          <Rail active={rail} />
          <div className="relay-main">{children}</div>
        </div>
        <WeightingDialog />
      </div>
    </WeightingProvider>
  )
}
