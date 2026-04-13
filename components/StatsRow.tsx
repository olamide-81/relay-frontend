import { BarChart3, Building2, Globe2, TimerReset } from "lucide-react";
import { BarVisualization } from "@/components/ui/BarVisualization";
import { CountUp } from "@/components/ui/CountUp";

export function StatsRow() {
  return (
    <section className="grid gap-8 border-b border-border-subtle px-6 py-10 md:px-10 xl:grid-cols-2">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-text-secondary"><Building2 size={14} />Providers Listed</p>
          <p className="mono text-5xl font-bold"><CountUp value={200} suffix="+" /></p>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-text-secondary"><Globe2 size={14} />Countries Covered</p>
          <p className="mono text-5xl font-bold"><CountUp value={40} suffix="+" /></p>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-text-secondary"><BarChart3 size={14} />Categories</p>
          <p className="mono text-5xl font-bold"><CountUp value={12} /></p>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-text-secondary"><TimerReset size={14} />Updated</p>
          <p className="mono text-5xl font-bold">Weekly</p>
        </div>
      </div>
      <BarVisualization bars={28} height={180} width={350} className="h-[180px] w-full" />
    </section>
  );
}
