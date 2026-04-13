import { BarVisualization } from "@/components/ui/BarVisualization";

const cards = [
  ["RELAY DIRECTORY", "Relay Directory", "Search 200+ providers"],
  ["RELAY COMPARE", "Relay Compare", "Side-by-side fee tables"],
  ["RELAY REGIONS", "Relay Regions", "Africa, LATAM, Europe & more"],
  ["RELAY INTEL", "Relay Intel", "Deep data, unlocked on access"],
] as const;

export function ProductCards() {
  return (
    <section className="px-6 py-16 md:px-10">
      <div className="grid gap-8 xl:grid-cols-2">
        <div>
          <p className="mono text-xs tracking-[0.2em] text-text-muted">WHAT RELAY COVERS</p>
          <h2 className="mt-4 text-5xl font-extrabold tracking-tight">An intelligence layer<br />for fintech builders.</h2>
        </div>
        <p className="max-w-xl text-lg text-text-secondary">
          Relay gives fintech teams a single place to research, compare, and shortlist providers — so you spend less time on due diligence and more time shipping product.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, title, desc], idx) => (
          <article key={title} className="aspect-[1/1.2] rounded-md bg-card-bg p-6">
            <p className="mono text-xs text-text-muted">{label}</p>
            <BarVisualization bars={16 + idx * 3} height={110} width={220} accentRatio={0.2} className="my-5 h-[110px] w-full" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
