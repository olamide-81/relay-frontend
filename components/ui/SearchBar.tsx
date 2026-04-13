import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <label className="flex items-center gap-3 rounded-sm border border-border-subtle bg-white px-5 py-4 focus-within:border-accent">
      <Search size={18} className="text-text-muted" />
      <input
        className="mono w-full bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
        placeholder="Search KYC, payouts, FX, collections..."
      />
    </label>
  );
}
