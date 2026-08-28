export function CheckBox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={`relay-check${checked ? ' relay-check--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      {checked ? (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13l4.5 4.5L19 7"
            stroke="#0a0a0b"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  )
}
