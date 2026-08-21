export function Panel({
  title,
  meta,
  action,
  children,
  flush = false,
  className = '',
}: {
  title?: string
  meta?: string
  action?: React.ReactNode
  children: React.ReactNode
  flush?: boolean
  className?: string
}) {
  return (
    <section className={`ui-card ${className}`.trim()}>
      {title && (
        <div className="ui-card-head">
          <div className="ui-card-head-left">
            <h3 className="ui-card-title">{title}</h3>
            {meta && <span className="ui-card-meta">{meta}</span>}
          </div>
          {action}
        </div>
      )}
      <div className={flush ? 'ui-card-body ui-card-body--flush' : 'ui-card-body'}>{children}</div>
    </section>
  )
}
