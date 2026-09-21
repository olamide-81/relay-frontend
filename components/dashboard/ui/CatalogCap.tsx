'use client'

import { Link } from '@/i18n/navigation'
import { useGate } from '@/components/dashboard/gate/GateContext'

export function CatalogCap({
  visible,
  total,
  compareSlots,
}: {
  visible: number
  total: number
  compareSlots: number
}) {
  const { openGate } = useGate()
  if (total <= visible) return null
  return (
    <div className="relay-cap">
      <div>
        <strong>
          Free shows {visible} of {total} live providers
        </strong>
        <p>
          Compare up to {compareSlots} from this set. Pro opens the rest of the catalog.
        </p>
      </div>
      <div className="relay-cap-actions">
        <button type="button" className="relay-btn relay-btn--lime" onClick={() => openGate('catalog.limit', { count: total })}>
          See all {total}
        </button>
        <Link href="/dashboard/plans" className="relay-btn relay-btn--outline">
          Compare plans
        </Link>
      </div>
    </div>
  )
}
