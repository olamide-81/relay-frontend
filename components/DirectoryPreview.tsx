import { providers } from "@/data/providers";
import { FilterPill } from "@/components/ui/FilterPill";
import { ProviderCard } from "@/components/ui/ProviderCard";
import { SearchBar } from "@/components/ui/SearchBar";

const filters = ["All", "KYC & Identity", "Payouts", "FX", "Collections", "Treasury", "Compliance", "Lending"];

export function DirectoryPreview() {
  return (
    <section className="px-6 py-16 md:px-10">
      <p className="mono text-xs tracking-[0.2em] text-text-muted">LIVE PREVIEW</p>
      <h2 className="mt-4 text-[56px] font-extrabold leading-tight tracking-tight">Search the directory.</h2>
      <p className="mt-4 max-w-3xl text-lg text-text-secondary">
        Explore providers by category, region, and use case. Depth data unlocked with access.
      </p>
      <div className="mt-8"><SearchBar /></div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => <FilterPill key={f} label={f} active={f === "All"} />)}
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {providers.map((provider) => <ProviderCard key={provider.name} provider={provider} />)}
      </div>
    </section>
  );
}
