"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { X, ArrowDown } from "lucide-react";

const ARCH_NODES = [
  { id: "agent", label: "AI Agent", resp: "Orchestrates automation goals and sends raw commands." },
  { id: "mcp", label: "Browser Optimizer MCP", resp: "Core middleware intercepting Playwright protocols." },
  { id: "extract", label: "Extraction", resp: "Pulls full HTML, shadow DOMs, and iframe contexts." },
  { id: "compress", label: "Compression", resp: "Strips scripts, inline styles, SVGs, and hidden elements." },
  { id: "classify", label: "Classification", resp: "Determines page type (e-commerce, auth) for dynamic rules." },
  { id: "cache", label: "Cache", resp: "Semantic caching of previously optimized static pages." },
  { id: "playwright", label: "Playwright", resp: "Executes optimized commands on the headless browser." },
  { id: "browser", label: "Browser", resp: "The Chromium/WebKit execution environment." },
  { id: "response", label: "Optimized Response", resp: "Returns <5k token semantic tree back to AI Agent." },
];

export default function ArchitectureTab() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 relative flex">
      <div className="max-w-4xl mx-auto w-full">
        <DocsBreadcrumbs path={["Architecture"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">System Architecture</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed max-w-2xl">
          Explore the internal request pipeline. Click any node in the flow to learn about its specific responsibility, source module, and performance impact.
        </p>

        <div className="relative py-12 flex flex-col items-center">
          {/* Background flow line */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[var(--border-glass-hover)] to-transparent" />

          {ARCH_NODES.map((node, i) => (
            <div key={node.id} className="relative z-10 flex flex-col items-center mb-8 last:mb-0 group">
              <motion.button
                onClick={() => setActiveNode(node.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 backdrop-blur-md
                  ${activeNode === node.id 
                    ? "bg-[rgba(79,124,255,0.15)] border border-[var(--primary-blue)] text-white shadow-[0_0_30px_rgba(79,124,255,0.3)]" 
                    : node.id === "mcp" 
                      ? "bg-gradient-to-r from-[var(--primary-blue)] to-[var(--cyan-accent)] border border-transparent text-white shadow-[0_0_20px_rgba(79,124,255,0.4)]"
                      : "bg-[var(--bg-primary)] border border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-[var(--primary-blue-dim)] hover:text-white"
                  }
                `}
              >
                {node.label}
              </motion.button>
              
              {i < ARCH_NODES.length - 1 && (
                <div className="mt-4 text-[var(--text-tertiary)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary-blue)] transition-colors">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel for Node Details */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-80 lg:w-96 bg-[var(--bg-secondary)] border-l border-[var(--border-glass)] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 overflow-y-auto"
          >
            <div className="p-6 mt-12">
              <button 
                onClick={() => setActiveNode(null)}
                className="absolute top-4 right-4 p-2 text-[var(--text-tertiary)] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-full transition-colors"
              >
                <X size={16} />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-2">
                {ARCH_NODES.find(n => n.id === activeNode)?.label}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed">
                {ARCH_NODES.find(n => n.id === activeNode)?.resp}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Module</h4>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--border-glass)] rounded-lg px-3 py-2 text-sm font-mono text-[var(--cyan-accent)]">
                    core/pipeline/{activeNode}.py
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Performance Impact</h4>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--border-glass)] rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)]">
                    {activeNode === 'mcp' ? 'Adds ~5ms latency overhead.' : 'O(N) operation based on DOM node depth.'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
