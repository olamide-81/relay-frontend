export function DataTable<T>({
  rows,
  columns,
  keyFn,
  emptyMessage = 'No data.',
}: {
  rows: T[]
  columns: { key: string; header: string; render: (row: T) => React.ReactNode }[]
  keyFn: (row: T) => string
  emptyMessage?: string
}) {
  if (rows.length === 0) {
    return <div className="ui-table-empty">{emptyMessage}</div>
  }

  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={keyFn(row)}>
              {columns.map((col) => (
                <td key={col.key}>{col.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
