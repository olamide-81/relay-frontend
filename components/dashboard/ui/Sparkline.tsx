import { sparkBars } from '@/lib/relay/format'

export function Sparkline({
  seed,
  dir,
}: {
  seed: number
  dir: 'up' | 'down' | 'flat'
}) {
  const bars = sparkBars(seed, dir)
  return (
    <div className="relay-spark-bars" aria-hidden>
      {bars.map((b, i) => (
        <div
          key={i}
          className={`relay-spark-bar${b.last ? ' relay-spark-bar--last' : ''}`}
          style={{ height: b.h }}
        />
      ))}
    </div>
  )
}
