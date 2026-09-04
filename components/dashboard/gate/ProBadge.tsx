export function LockIcon({
  size = 11,
  stroke = 'oklch(.85 .15 130)',
}: {
  size?: number
  stroke?: string
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function TickIcon({
  size = 13,
  stroke = 'oklch(.85 .15 130)',
}: {
  size?: number
  stroke?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4.5 4.5L19 7" />
    </svg>
  )
}

export function ProBadge({
  label = 'PRO',
  onLight = false,
}: {
  label?: string
  onLight?: boolean
}) {
  return (
    <span className={`relay-pro${onLight ? ' relay-pro--dark' : ''}`}>
      <LockIcon size={11} stroke="oklch(.85 .15 130)" />
      <span>{label}</span>
    </span>
  )
}
