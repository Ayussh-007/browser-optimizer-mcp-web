"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";

export default function ApiReferenceTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <DocsBreadcrumbs path={["API Reference"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">API Reference</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          The Browser Optimizer MCP provides a RESTful interface for direct integration, alongside native MCP tool definitions for agents. 
          Below is the complete API documentation for the core engine.
        </p>

        <div className="space-y-16">
          {/* Endpoint 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-[var(--purple-glow-dim)] text-[var(--purple-glow)] text-xs font-bold rounded">POST</span>
              <h2 className="text-xl font-mono text-white">/v1/optimize</h2>
            </div>
            <p className="text-[var(--text-secondary)] mb-6 text-sm">
              Core endpoint to extract, clean, and compress context from a target URL. Automatically runs the classification and DOM stripping pipeline.
            </p>

            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Parameters</h4>
            <div className="border border-[var(--border-glass)] rounded-xl bg-[rgba(255,255,255,0.01)] overflow-hidden mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-glass)] text-[var(--text-secondary)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-glass)] text-[var(--text-tertiary)]">
                  <tr>
                    <td className="px-4 py-3 font-mono text-white">url<span className="text-[var(--text-secondary)] ml-1">*</span></td>
                    <td className="px-4 py-3 font-mono text-[var(--cyan-accent)]">string</td>
                    <td className="px-4 py-3">The target website to crawl and optimize.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white">compress_dom</td>
                    <td className="px-4 py-3 font-mono text-[var(--cyan-accent)]">boolean</td>
                    <td className="px-4 py-3">Strips scripts, styles, and hidden elements. Default: true.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white">wait_until</td>
                    <td className="px-4 py-3 font-mono text-[var(--cyan-accent)]">string</td>
                    <td className="px-4 py-3">"load", "domcontentloaded", or "networkidle". Default: "networkidle".</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Request Example</h4>
                <div className="rounded-xl border border-[var(--border-glass)] bg-[#0A0D18] p-4 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
                  <span className="text-[#C678DD]">curl</span> -X POST https://localhost:8080/v1/optimize \<br/>
                  &nbsp;&nbsp;-H <span className="text-[#98C379]">"Content-Type: application/json"</span> \<br/>
                  &nbsp;&nbsp;-d <span className="text-[#98C379]">'{'{'}"url": "https://stripe.com", "compress_dom": true{'}'}'</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Response Example</h4>
                <div className="rounded-xl border border-[var(--border-glass)] bg-[#0A0D18] p-4 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
                  <span className="text-[#D19A66]">{'{'}</span><br/>
                  &nbsp;&nbsp;<span className="text-[#E06C75]">"status"</span>: <span className="text-[#98C379]">"success"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[#E06C75]">"tokens_used"</span>: <span className="text-[#D19A66]">1450</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[#E06C75]">"semantic_tree"</span>: <span className="text-[#98C379]">"..."</span><br/>
                  <span className="text-[#D19A66]">{'}'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Endpoint 2 */}
          <div className="pt-8 border-t border-[var(--border-glass)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-[var(--primary-blue-dim)] text-[var(--primary-blue)] text-xs font-bold rounded">GET</span>
              <h2 className="text-xl font-mono text-white">/v1/metrics</h2>
            </div>
            <p className="text-[var(--text-secondary)] mb-6 text-sm">
              Retrieves global telemetry data including cache hit ratios, total tokens saved, and average latency reductions.
            </p>
            <div className="rounded-xl border border-[var(--border-glass)] bg-[#0A0D18] p-4 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
              <span className="text-[#C678DD]">curl</span> https://localhost:8080/v1/metrics
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
