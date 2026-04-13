export function Waitlist() {
  return (
    <section className="px-6 py-24 md:px-10 xl:py-32">
      <p className="mono text-xs tracking-[0.2em] text-text-muted">EARLY ACCESS</p>
      <h2 className="mt-4 text-[clamp(52px,6vw,64px)] font-extrabold leading-[1] tracking-tight">Be the first<br />team to use Relay.</h2>
      <p className="mt-5 text-lg text-text-secondary">Join 140+ fintech teams already on the waitlist.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input className="w-full max-w-[300px] rounded-sm border border-border-subtle px-4 py-3" placeholder="Email address" />
        <button className="rounded-sm bg-accent px-6 py-3 text-white hover:bg-accent-hover">Join Waitlist</button>
      </div>
      <p className="mt-3 text-xs text-text-muted">No spam. Unsubscribe anytime.</p>
    </section>
  );
}
