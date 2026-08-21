export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string | number
  hint?: string
  icon?: React.ReactNode
}) {
  return (
    <article className="ui-stat">
      {icon && (
        <div className="ui-stat-top">
          <span className="ui-stat-icon">{icon}</span>
        </div>
      )}
      <span className="ui-stat-label">{label}</span>
      <span className="ui-stat-value">{value}</span>
      {hint && <span className="ui-stat-hint">{hint}</span>}
    </article>
  )
}
