interface TagProps {
  children: React.ReactNode;
  accent?: boolean;
}

export function Tag({ children, accent = false }: TagProps) {
  return (
    <span
      className={`mono rounded-full px-2 py-0.5 text-xs ${
        accent ? "bg-accent-light text-accent" : "bg-card-bg text-text-secondary"
      }`}
    >
      {children}
    </span>
  );
}
