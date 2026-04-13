import { Blocks, Building2, CircleDollarSign, Globe, Landmark, ShieldCheck } from "lucide-react";
import { categories } from "@/data/categories";

const icons = [ShieldCheck, CircleDollarSign, Landmark, Globe, Blocks, Building2];

export function Categories() {
  return (
    <section className="px-6 py-16 md:px-10">
      <p className="mono text-xs tracking-[0.2em] text-text-muted">CATEGORIES</p>
      <h2 className="mt-4 text-5xl font-extrabold tracking-tight">Every layer of<br />fintech infrastructure.</h2>
      <div className="mt-10 grid grid-cols-2 border border-border-subtle sm:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={category.name} className="border-r border-b border-border-subtle p-4">
              <Icon size={20} className="text-accent" />
              <p className="mt-3 text-sm font-semibold">{category.name}</p>
              <p className="mono text-xs text-text-muted">{category.count}</p>
            </div>
          );
        })}
      </div>
      <p className="mono mt-8 text-sm tracking-[0.18em] text-text-secondary">
        AFRICA <span className="text-accent">·</span> LATAM <span className="text-accent">·</span> EUROPE <span className="text-accent">·</span> MIDDLE EAST <span className="text-accent">·</span> SOUTHEAST ASIA <span className="text-accent">·</span> GLOBAL
      </p>
    </section>
  );
}
