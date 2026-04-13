export function Footer() {
  return (
    <footer className="grid gap-6 border-t border-border-subtle px-6 py-8 text-sm text-text-secondary md:px-10 xl:grid-cols-3">
      <div>
        <p className="font-extrabold text-text-primary">relay</p>
        <p className="mono text-xs">by GrateBridge</p>
        <p className="mt-1">© 2026 GrateBridge Ltd.</p>
      </div>
      <p className="self-center">Directory · Compare · Pricing · About</p>
      <div className="mono flex items-center gap-3 xl:justify-end">
        <span className="text-sm">X</span>
        <span className="text-sm">in</span>
      </div>
    </footer>
  );
}
