export function Badge({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'neutral'
}) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>
}
