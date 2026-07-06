

export default function PricingTab() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h1 className="font-geist text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">Pay only for the tokens you save.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Pro Plan */}
        <div className="border border-[var(--color-border-subtle)] rounded bg-[var(--color-surface-elevated)] p-8 flex flex-col relative overflow-hidden">
          <h3 className="font-geist text-xl font-bold mb-2">Pro</h3>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">For individual agents and small fleets.</p>
          <div className="mb-8">
            <span className="font-geist text-4xl font-bold">$49</span>
            <span className="text-[var(--color-text-secondary)]">/mo</span>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> Up to 1M optimized tokens
            </li>
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> Semantic DOM Caching
            </li>
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> Standard Support
            </li>
          </ul>
          <button className="w-full py-2.5 rounded border border-[var(--color-border-subtle)] bg-transparent hover:bg-[var(--color-surface-level2)] transition-colors text-sm font-medium">
            Start Free Trial
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-[var(--color-border-subtle)] rounded p-8 bg-[var(--color-surface-level2)] flex flex-col relative overflow-hidden shadow-2xl shadow-black/20">
          <h3 className="font-geist text-xl font-bold mb-2 text-[var(--color-text-primary)]">Enterprise Cloud</h3>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">For massive parallel agent workloads.</p>
          <div className="mb-8">
            <span className="font-geist text-4xl font-bold">Custom</span>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> Unlimited token optimization
            </li>
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> Priority Delta Diffing
            </li>
            <li className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)]" /> 24/7 Dedicated Support
            </li>
          </ul>
          <button className="w-full py-2.5 rounded bg-[var(--color-accent-purple)] text-white hover:opacity-90 transition-opacity text-sm font-medium">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
