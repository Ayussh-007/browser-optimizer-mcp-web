"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";

export default function GettingStartedTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <DocsBreadcrumbs path={["Getting Started"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Getting Started</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          Welcome to the Browser Optimizer MCP. This guide will help you understand the core concepts and get your first optimization pipeline running in under 5 minutes.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-[var(--border-glass)] pb-2">
          Why Browser Optimizer MCP?
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          Large Language Models are incredibly powerful at driving browser automation, but they suffer from high token costs, latency, and context window limits when fed raw HTML. 
          The Browser Optimizer MCP acts as an intelligent middleware layer that intercepts Playwright/Puppeteer data, strips the noise, classifies the page, and compresses the DOM into a token-efficient semantic structure before it reaches your agent.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-[var(--border-glass)] pb-2 mt-12">
          Hello World
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          To see the immediate impact, let's look at a basic <code>extract_context</code> request. This single call can reduce a 150k token raw HTML page down to a 4k token semantic tree.
        </p>

        <div className="my-8 rounded-xl border border-[var(--border-glass)] overflow-hidden bg-[#0A0D18]">
          <div className="flex items-center justify-between px-4 py-2 bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-glass)] text-xs text-[var(--text-tertiary)]">
            <span>python</span>
          </div>
          <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
            <pre className="text-[var(--text-secondary)]">
<span className="text-[#C678DD]">from</span> browser_optimizer_mcp <span className="text-[#C678DD]">import</span> BrowserOptimizer<br/><br/>
<span className="text-[#5C6370]"># Initialize the optimizer</span><br/>
optimizer = BrowserOptimizer()<br/><br/>
<span className="text-[#5C6370]"># Extract and compress context from a URL</span><br/>
result = optimizer.extract_context(<br/>
&nbsp;&nbsp;&nbsp;&nbsp;url=<span className="text-[#98C379]">"https://github.com"</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;options=<span className="text-[#D19A66]">{'{'}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">"remove_scripts"</span>: <span className="text-[#E5C07B]">True</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">"semantic_extraction"</span>: <span className="text-[#E5C07B]">True</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D19A66]">{'}'}</span><br/>
)<br/><br/>
<span className="text-[#56B6C2]">print</span>(<span className="text-[#98C379]">f"Compressed payload: </span><span className="text-[#D19A66]">{'{'}</span><span className="text-[#E06C75]">result.compressed_dom</span><span className="text-[#D19A66]">{'}'}</span><span className="text-[#98C379]">"</span>)
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
