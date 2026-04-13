import { Check, Lock } from "lucide-react";

const freeItems = [
  "Provider listings",
  "Category & region filters",
  "Basic provider profiles",
  "Community uptime signals",
];

const paidItems = [
  "Fee & rate comparison tables",
  "Integration complexity scores",
  "Historical uptime data",
  "Side-by-side provider comparison",
  "API access to directory data",
  "Weekly provider intelligence digest",
];

export function AccessSection() {
  return (
    <section className="bg-section-alt px-6 py-16 md:px-10">
      <div className="grid gap-6 xl:grid-cols-2">
        <div>
          <p className="mono text-xs tracking-[0.2em] text-text-muted">FREE ACCESS</p>
          <div className="mt-4 space-y-3">
            {freeItems.map((item) => (
              <p key={item} className="flex items-center gap-2 text-sm text-text-secondary"><Check size={14} className="text-accent" />{item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-md border-l-[3px] border-accent bg-white p-6">
          <p className="mono text-xs tracking-[0.2em] text-text-muted">FULL ACCESS</p>
          <div className="mt-4 space-y-2">
            {paidItems.map((item) => (
              <p key={item} className="flex items-center gap-2 text-sm text-text-secondary"><Lock size={14} />{item}</p>
            ))}
          </div>
          <p className="mt-6 text-4xl font-extrabold tracking-tight">$49 / mo</p>
          <p className="mt-1 text-sm text-text-secondary">Per team. Cancel anytime.</p>
          <button className="mt-5 w-full rounded-sm bg-accent px-4 py-3 text-sm font-medium text-white hover:bg-accent-hover">Get Access →</button>
        </div>
      </div>
    </section>
  );
}
