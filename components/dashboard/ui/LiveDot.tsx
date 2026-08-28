export function LiveDot({
  variant = 'lime',
  size = 'md',
}: {
  variant?: 'lime' | 'green'
  size?: 'md' | 'sm'
}) {
  const cls = [
    'relay-live',
    variant === 'green' ? 'relay-live--green' : '',
    size === 'sm' ? 'relay-live--sm' : '',
  ]
    .filter(Boolean)
    .join(' ')
  return <span className={cls} aria-hidden />
}
