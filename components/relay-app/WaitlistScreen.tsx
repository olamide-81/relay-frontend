'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import RelayWaitlist from '@/components/relay/RelayWaitlist'
import { joinWaitlist } from '@/lib/api/waitlist'
import { track } from '@/lib/analytics'
import { waitlistEventProps, waitlistPayload, type WaitlistAnswers } from '@/lib/waitlist'

/** The pre-launch waitlist (Relay Waitlist design) wired to POST /api/waitlist. */
export default function WaitlistScreen() {
  const { locale } = useParams<{ locale: string }>()
  const onSubmit = useCallback(
    async (a: WaitlistAnswers) => {
      const result = await joinWaitlist(waitlistPayload(a, locale))
      track('waitlist_submitted', waitlistEventProps(a))
      if (result === 'exists') track('waitlist_duplicate')
      return result
    },
    [locale],
  )
  return <RelayWaitlist onSubmit={onSubmit} />
}
