'use client'

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  disabled,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ui-btn ui-btn--${variant} ui-btn--${size} ${className}`.trim()}
    >
      {children}
    </button>
  )
}
