import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductTab() {
  const [innerTab, setInnerTab] = useState<'usage' | 'diffing' | 'config'>('usage');

  const getCode = () => {
    switch (innerTab) {
      case 'usage':
        return `// standard MCP usage
import { BrowserOptimizer } from '@mcp/browser-optimizer';

const optimizer = new BrowserOptimizer({
  apiKey: process.env.MCP_API_KEY
});

// Pass raw HTML, get pruned DOM tree
const optimized = await optimizer.prune(rawHtml);
console.log(optimized.tokensSaved);`;
      case 'diffing':
        return `// Delta Diffing ensures only changes are sent
const session = optimizer.createSession();

// Tick 1
await session.ingest(pageState1);

// Tick 2 - only differences transmitted
const patch = await session.ingest(pageState2);
console.log(\`Patch size: \${patch.byteLength} bytes\`);`;
      case 'config':
        return `// Custom Configuration
export default {
  caching: {
    strategy: 'semantic',
    ttl: 3600 // 1 hour cache
  },
  pruning: {
    removeScripts: true,
    removeStyles: true,
    compressSvg: true
  }
};`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col pt-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-geist text-3xl font-bold tracking-tight mb-4">Deep Integration. Minimal Code.</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          The product works entirely as middleware. You connect your agents to the Browser Optimizer MCP, and we handle the DOM distillation automatically.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Code Sandbox */}
        <div className="border border-[var(--color-border-subtle)] rounded bg-[var(--color-surface-elevated)] overflow-hidden flex flex-col">
          <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-main)]">
            {(['usage', 'diffing', 'config'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setInnerTab(tab)}
                className={`px-3 py-1 text-[11px] font-mono rounded transition-colors ${
                  innerTab === tab ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]' : 'text-[var(--color-text-secondary)] hover:text-white border border-transparent'
                }`}
              >
                {tab}.ts
              </button>
            ))}
          </div>
          <div className="p-6 overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={innerTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <pre className="text-sm font-mono text-gray-300">
                  <code>{getCode()}</code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex flex-col justify-center">
          <h3 className="font-geist text-xl font-bold mb-6">Performance Comparison</h3>
          <div className="border border-[var(--color-border-subtle)] rounded bg-[var(--color-surface-elevated)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-surface-main)] border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-medium text-[var(--color-text-secondary)]">METRIC</th>
                  <th className="px-4 py-3 font-mono text-xs font-medium text-[var(--color-text-secondary)]">STANDARD PLAYWRIGHT</th>
                  <th className="px-4 py-3 font-mono text-xs font-medium text-[var(--color-text-primary)]">BROWSER OPTIMIZER MCP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                <tr>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">Tokens per page</td>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">~150k</td>
                  <td className="px-4 py-4 font-bold text-[var(--color-text-primary)]">~8k (94.6% reduction)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">Latency</td>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">3.2s</td>
                  <td className="px-4 py-4 font-bold text-[var(--color-text-primary)]">120ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">Context Window</td>
                  <td className="px-4 py-4 text-[var(--color-text-secondary)]">Exhausted rapidly</td>
                  <td className="px-4 py-4 font-bold text-[var(--color-text-primary)]">Maintained infinitely</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
