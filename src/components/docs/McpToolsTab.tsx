"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { Wrench, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MCP_TOOLS = [
  { name: "extract_context", desc: "Extracts semantic content from a webpage while stripping DOM noise.", params: "url (string), compress (bool)" },
  { name: "page_diff", desc: "Compares current DOM state against previous state to highlight dynamic changes.", params: "snapshot_id (string)" },
  { name: "execute_action", desc: "Executes a Playwright action (click, type, scroll) using semantic selectors.", params: "selector (string), action (string)" },
  { name: "summarize_page", desc: "Uses local classification to generate a dense summary of page purpose.", params: "url (string)" },
  { name: "classify_page", desc: "Determines page type (e-commerce, auth, article) for strategy selection.", params: "url (string)" },
  { name: "wait_until_ready", desc: "Pauses agent execution until network is idle or specific element appears.", params: "condition (string)" },
  { name: "cache_lookup", desc: "Checks semantic cache for previous extraction results to save latency.", params: "url (string)" },
  { name: "get_metrics", desc: "Returns token savings and latency statistics for the current session.", params: "session_id (string)" },
];

export default function McpToolsTab() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 relative flex">
      <div className="max-w-4xl mx-auto w-full transition-all duration-300 pr-0">
        <DocsBreadcrumbs path={["MCP Tools"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">MCP Tools Catalog</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed max-w-2xl">
          The server exposes these native tools directly to your LLM agent. 
          Click on any tool to view its full schema and execution parameters.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {MCP_TOOLS.map((tool) => (
            <div
              key={tool.name}
              onClick={() => setActiveTool(tool.name)}
              className={`
                group cursor-pointer p-5 rounded-xl border transition-all duration-300
                ${activeTool === tool.name 
                  ? "bg-[rgba(79,124,255,0.05)] border-[var(--primary-blue)] shadow-[0_0_20px_rgba(79,124,255,0.15)]" 
                  : "bg-[rgba(255,255,255,0.01)] border-[var(--border-glass)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.03)]"
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wrench size={16} className={activeTool === tool.name ? "text-[var(--primary-blue)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"} />
                  <h3 className="font-mono text-white text-sm font-semibold">{tool.name}</h3>
                </div>
                <ChevronRight size={16} className={`transition-transform duration-300 ${activeTool === tool.name ? "text-[var(--primary-blue)] rotate-90" : "text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
              </div>
              <p className="text-[var(--text-tertiary)] text-xs leading-relaxed mb-3">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Drawer for Tool Details */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-80 lg:w-96 bg-[var(--bg-secondary)] border-l border-[var(--border-glass)] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 overflow-y-auto"
          >
            <div className="p-6">
              <button 
                onClick={() => setActiveTool(null)}
                className="absolute top-4 right-4 p-2 text-[var(--text-tertiary)] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-full transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-blue-dim)] text-[var(--primary-blue)] text-xs font-mono mb-4">
                  Tool Schema
                </div>
                <h2 className="text-xl font-mono text-white mb-2">{activeTool}</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-8">
                  {MCP_TOOLS.find(t => t.name === activeTool)?.desc}
                </p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Input Schema</h4>
                <div className="bg-[#0A0D18] border border-[var(--border-glass)] rounded-xl p-4 mb-8">
                  <pre className="text-xs font-mono text-[var(--text-secondary)]">
<span className="text-[#D19A66]">{'{'}</span><br/>
&nbsp;&nbsp;<span className="text-[#E06C75]">"type"</span>: <span className="text-[#98C379]">"object"</span>,<br/>
&nbsp;&nbsp;<span className="text-[#E06C75]">"properties"</span>: <span className="text-[#D19A66]">{'{'}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E06C75]">"url"</span>: <span className="text-[#D19A66]">{'{'}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E06C75]">"type"</span>: <span className="text-[#98C379]">"string"</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D19A66]">{'}'}</span><br/>
&nbsp;&nbsp;<span className="text-[#D19A66]">{'}'}</span><br/>
<span className="text-[#D19A66]">{'}'}</span>
                  </pre>
                </div>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Expected Output</h4>
                <div className="bg-[#0A0D18] border border-[var(--border-glass)] rounded-xl p-4">
                  <div className="text-xs font-mono text-[var(--text-tertiary)]">Returns semantic JSON tree representing the page content, stripped of standard HTML boilerplates.</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
