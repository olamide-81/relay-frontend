interface FilterPillProps {
  label: string;
  active?: boolean;
}

export function FilterPill({ label, active = false }: FilterPillProps) {
  return (
    <button
      className={`mono rounded-full px-4 py-2 text-sm transition-colors duration-150 ${
        active ? "bg-accent text-white" : "bg-card-bg text-text-primary hover:bg-zinc-200"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}
