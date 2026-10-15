'use client'

import RelayDashboard from '@/components/relay/RelayDashboard'
import RelayOverview from '@/components/relay/RelayOverview'
import RelayInbox from '@/components/relay/RelayInbox'
import RelayDirectory from '@/components/relay/RelayDirectory'
import RelayProviders from '@/components/relay/RelayProviders'
import RelayCompare from '@/components/relay/RelayCompare'
import RelayShortlists from '@/components/relay/RelayShortlists'
import RelayRequests from '@/components/relay/RelayRequests'
import RelayIntelligence from '@/components/relay/RelayIntelligence'
import RelayProfile from '@/components/relay/RelayProfile'
import RelaySettings from '@/components/relay/RelaySettings'
import RelayProvider from '@/components/relay/RelayProvider'
import ClientOnly from './ClientOnly'

export const PREVIEW_SCREENS = {
  dashboard: RelayDashboard,
  overview: RelayOverview,
  inbox: RelayInbox,
  directory: RelayDirectory,
  providers: RelayProviders,
  compare: RelayCompare,
  shortlists: RelayShortlists,
  requests: RelayRequests,
  intelligence: RelayIntelligence,
  profile: RelayProfile,
  settings: RelaySettings,
  provider: RelayProvider,
} as const

/** A dashboard screen rendered standalone with demo data, for the site's product shots. */
export default function PreviewScreen({ screen }: { screen: keyof typeof PREVIEW_SCREENS }) {
  const C = PREVIEW_SCREENS[screen]
  return (
    <ClientOnly>
      <C preview />
    </ClientOnly>
  )
}
