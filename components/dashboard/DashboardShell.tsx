'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSession } from '@/hooks/useSession'
import TopBar from '@/components/dashboard/chrome/TopBar'
import Rail from '@/components/dashboard/chrome/Rail'
import { WeightingProvider } from '@/components/dashboard/WeightingContext'
import { PlanProvider } from '@/components/dashboard/PlanContext'
import { GateProvider, useGate } from '@/components/dashboard/gate/GateContext'
import { UpgradeDialog } from '@/components/dashboard/gate/UpgradeDialog'
import { CompareTrayProvider, useCompareTray } from '@/components/dashboard/compare/CompareTrayContext'
import { CompareTray } from '@/components/dashboard/compare/CompareTray'
import { WeightingPopover } from '@/components/dashboard/compare/WeightingPopover'
import type { RailSection, TopBarSection } from '@/lib/relay/types'
import './relay.css'
import './addendum.css'

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

function showCompareTray(path: string) {
  if (path.startsWith('/dashboard/providers')) return true
  if (path.startsWith('/dashboard/intelligence/')) return true
  return false
}

function DashboardFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { gate } = useGate()
  const { ids } = useCompareTray()
  const top = getTopBar(pathname)
  const rail = getRail(pathname)
  const trayOn = showCompareTray(pathname) && ids.length > 0

  return (
    <div className={`relay${gate ? ' relay--paywall' : ''}`}>
      <div className="relay-glow" />
      <div className="relay-paywall-blur">
        <TopBar active={top} />
        <div className="relay-body">
          <Rail active={rail} />
          <div className="relay-main">
            {children}
            {trayOn ? <CompareTray /> : null}
            <WeightingPopover />
          </div>
        </div>
      </div>
      <UpgradeDialog />
    </div>
  )
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, ready } = useSession()

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
    <PlanProvider>
      <GateProvider>
        <WeightingProvider>
          <CompareTrayProvider>
            <DashboardFrame>{children}</DashboardFrame>
          </CompareTrayProvider>
        </WeightingProvider>
      </GateProvider>
    </PlanProvider>
  )
}
