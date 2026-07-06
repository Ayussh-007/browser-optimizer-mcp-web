"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { motion } from "framer-motion";

export default function BenchmarksTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <DocsBreadcrumbs path={["Benchmarks"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Performance Benchmarks</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12 leading-relaxed max-w-2xl">
          Real-world data collected across 10,000 automated sessions comparing standard Playwright extraction versus Browser Optimizer MCP.
        </p>

        <div className="space-y-12">
          {/* Chart 1: Token Usage */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              Average Token Usage per Page
            </h3>
            <div className="bg-[rgba(255,255,255,0.01)] border border-[var(--border-glass)] rounded-2xl p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-[var(--text-tertiary)]">
                    <span>Standard HTML</span>
                    <span>145,000 Tokens</span>
                  </div>
                  <div className="h-3 bg-[var(--surface-glass)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-red-500/50 rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 text-white font-medium">
                    <span>Browser Optimizer MCP</span>
                    <span className="text-[var(--success-green)]">3,500 Tokens</span>
                  </div>
                  <div className="h-3 bg-[var(--surface-glass)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "5%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-[var(--success-green)] rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Latency */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              LLM Inference Latency (GPT-4o)
            </h3>
            <div className="bg-[rgba(255,255,255,0.01)] border border-[var(--border-glass)] rounded-2xl p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-[var(--text-tertiary)]">
                    <span>Standard Execution</span>
                    <span>14.2 seconds</span>
                  </div>
                  <div className="h-3 bg-[var(--surface-glass)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-red-500/50 rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 text-white font-medium">
                    <span>With Optimizer Cache</span>
                    <span className="text-[var(--primary-blue)]">0.8 seconds</span>
                  </div>
                  <div className="h-3 bg-[var(--surface-glass)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "8%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-[var(--primary-blue)] rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
