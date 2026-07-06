

const TOOLS = [
  { name: 'extract_context', desc: 'Prunes raw HTML DOM into compressed markdown/JSON, removing purely visual wrappers.' },
  { name: 'page_diff', desc: 'Compares current state to last cached state and returns a compact delta patch.' },
  { name: 'execute_action', desc: 'Translates semantic intents ("click login") to precise Playwright selectors.' },
  { name: 'wait_until_ready', desc: 'Intelligently polls network requests to ensure SPA hydration is complete.' },
];

export default function ResourcesTab() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col md:flex-row gap-12 pt-12">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <h4 className="font-mono text-xs font-medium tracking-widest text-[var(--color-text-secondary)] uppercase mb-4">Documentation</h4>
        <ul className="flex flex-col gap-2">
          <li><button className="text-sm font-medium text-[var(--color-text-primary)]">MCP Tools Reference</button></li>
          <li><button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">Architecture Overview</button></li>
          <li><button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">Caching Strategies</button></li>
          <li><button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">API Keys & Auth</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="font-geist text-3xl font-bold mb-2">MCP Tools Reference</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 text-lg">
          These tools are automatically exposed to your agent when connecting via the Model Context Protocol.
        </p>

        <div className="flex flex-col gap-4">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="border border-[var(--color-border-subtle)] rounded bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] p-6 transition-colors">
              <h3 className="font-mono text-lg font-bold text-[var(--color-text-primary)] mb-2">{tool.name}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
