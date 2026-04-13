export default function Home() {
  const features = [
    {
      title: "Provider Directory",
      desc: "Search vetted infrastructure providers by category, region, and use case.",
    },
    {
      title: "Compare Faster",
      desc: "Line up options side-by-side and make decisions without chasing scattered docs.",
    },
    {
      title: "Market Intelligence",
      desc: "Track reliability signals, rollout patterns, and ecosystem shifts in one place.",
    },
  ];

  const providers = [
    "Smile Identity",
    "Flutterwave",
    "Belvo",
    "Currencycloud",
    "Mono",
    "Nium",
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-base font-extrabold tracking-tight">relay</p>
            <p className="text-xs text-zinc-500">by GrateBridge</p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#" className="hover:text-zinc-950">Product</a>
            <a href="#" className="hover:text-zinc-950">Directory</a>
            <a href="#" className="hover:text-zinc-950">Pricing</a>
            <a href="#" className="hover:text-zinc-950">About</a>
          </nav>
          <button className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Join Waitlist
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(26,86,255,0.14),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(9,9,11,0.08),transparent_32%)]" />
          <p className="mb-4 text-sm font-medium text-zinc-600">Every fintech provider. One place.</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight text-zinc-950 md:text-7xl">
            Research, compare, and choose fintech infrastructure with confidence.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-zinc-600">
            Relay helps product and ops teams evaluate KYC, payouts, FX, treasury, and compliance providers faster - with cleaner data and less noise.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button className="rounded-lg bg-[#1A56FF] px-5 py-3 text-sm font-medium text-white hover:bg-[#1240CC]">
              Explore Directory
            </button>
            <button className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50">
              See Pricing
            </button>
          </div>
        </section>

        <section className="grid gap-4 border-y border-zinc-200 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-500">Providers listed</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">200+</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Countries covered</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">40+</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Teams on waitlist</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">140+</p>
          </div>
        </section>

        <section className="py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Built for modern fintech teams.</h2>
            <p className="max-w-md text-sm text-zinc-600">
              A cleaner experience inspired by the product clarity of Linear, Resend, and Crunchbase.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <p className="text-lg font-bold tracking-tight">{feature.title}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-3xl font-extrabold tracking-tight md:text-4xl">Directory snapshot</h3>
            <span className="rounded-full bg-[#EEF3FF] px-3 py-1 text-xs font-medium text-[#1A56FF]">Live Preview</span>
          </div>
          <div className="rounded-2xl border border-zinc-200">
            <div className="border-b border-zinc-200 px-5 py-4">
              <input
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#1A56FF]"
                placeholder="Search KYC, payouts, FX, collections..."
              />
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              {providers.map((name) => (
                <div key={name} className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 text-sm">
                  <span className="font-medium text-zinc-900">{name}</span>
                  <span className="text-[#1A56FF]">View</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-600">
          <p>© 2026 GrateBridge Ltd.</p>
          <p>relay.gratebridge.com</p>
          <p>Directory · Compare · Pricing · About</p>
        </div>
      </footer>
    </div>
  );
}
