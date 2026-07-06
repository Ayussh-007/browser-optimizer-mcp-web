import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Rocket, Plug, FileCode2, LayoutDashboard, GitFork, BarChart3,
  Lightbulb, FlaskConical, Copy, Check, ChevronLeft, ChevronRight,
  List, Settings, Terminal, Cpu, Shield, Layers
} from 'lucide-react';

/* ─── Types ─── */
type SectionId =
  | 'getting-started'
  | 'client-integrations'
  | 'reference'
  | 'architecture'
  | 'process-flow'
  | 'benchmarks'
  | 'use-cases'
  | 'testing';

interface SidebarItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
  category: string;
}

interface AnchorLink {
  id: string;
  label: string;
}

/* ─── Sidebar Navigation Data ─── */
const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'getting-started', label: 'Getting Started', icon: <Rocket size={16} />, category: 'GETTING STARTED' },
  { id: 'client-integrations', label: 'Client Integrations', icon: <Plug size={16} />, category: 'GETTING STARTED' },
  { id: 'reference', label: 'Reference', icon: <FileCode2 size={16} />, category: 'GETTING STARTED' },
  { id: 'architecture', label: 'Architecture Overview', icon: <LayoutDashboard size={16} />, category: 'CORE CONCEPTS' },
  { id: 'process-flow', label: 'Process Flow', icon: <GitFork size={16} />, category: 'CORE CONCEPTS' },
  { id: 'benchmarks', label: 'Benchmarks', icon: <BarChart3 size={16} />, category: 'CORE CONCEPTS' },
  { id: 'use-cases', label: 'Use Cases', icon: <Lightbulb size={16} />, category: 'USE CASES' },
  { id: 'testing', label: 'Testing & Deployment', icon: <FlaskConical size={16} />, category: 'USE CASES' },
];

/* ─── Section Titles for Breadcrumbs ─── */
const SECTION_TITLES: Record<SectionId, string> = {
  'getting-started': 'Quick Install & Setup',
  'client-integrations': 'Client Integrations',
  'reference': 'MCP Tools Reference',
  'architecture': 'Architecture Overview',
  'process-flow': 'Process Flow',
  'benchmarks': 'Benchmark & Comparison',
  'use-cases': 'Use Cases',
  'testing': 'Testing & Deployment',
};

/* ─── "On this page" Anchors Per Section ─── */
const SECTION_ANCHORS: Record<SectionId, AnchorLink[]> = {
  'getting-started': [
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'installation-steps', label: 'Installation Steps' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'features-highlight', label: 'Features Highlight' },
  ],
  'client-integrations': [
    { id: 'claude-desktop', label: 'Claude Desktop Setup' },
    { id: 'antigravity-ide', label: 'Antigravity IDE Setup' },
    { id: 'cursor-setup', label: 'Cursor Setup' },
  ],
  'reference': [
    { id: 'tools-table', label: 'Tools Table' },
    { id: 'extract-context', label: 'extract_context' },
    { id: 'page-diff', label: 'page_diff' },
    { id: 'execute-action', label: 'execute_action' },
  ],
  'architecture': [
    { id: 'module-overview', label: 'Module Overview' },
    { id: 'browser-manager', label: 'Browser Manager' },
    { id: 'compressor', label: 'Context Compressor' },
    { id: 'cache', label: 'Semantic Cache' },
  ],
  'process-flow': [
    { id: 'execution-pipeline', label: 'Execution Pipeline' },
    { id: 'flow-diagram', label: 'Flow Diagram' },
  ],
  'benchmarks': [
    { id: 'performance-comparison', label: 'Performance Comparison' },
    { id: 'running-benchmarks', label: 'Running Benchmarks' },
  ],
  'use-cases': [
    { id: 'cost-reduction', label: 'Cost Reduction' },
    { id: 'web-scraping', label: 'Web Scraping' },
    { id: 'form-filling', label: 'Form Auto-Filling' },
    { id: 'all-use-cases', label: 'All Use Cases' },
  ],
  'testing': [
    { id: 'unit-tests', label: 'Unit Tests' },
    { id: 'docker', label: 'Docker Deployment' },
    { id: 'license', label: 'License' },
  ],
};

/* ─── Ordered section list for prev/next ─── */
const SECTION_ORDER: SectionId[] = [
  'getting-started', 'client-integrations', 'reference', 'architecture',
  'process-flow', 'benchmarks', 'use-cases', 'testing',
];

/* ─── Terminal-style Code Block ─── */
function CodeBlock({ title, children, language }: { title: string; children: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="rounded-lg border border-[var(--color-border-subtle)] overflow-hidden my-6">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-code-header)] border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[var(--color-text-secondary)] font-mono ml-3">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1 rounded hover:bg-[var(--color-surface-level2)]"
        >
          {copied ? <Check size={12} className="text-[#28C840]" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* Code content */}
      <div className="bg-[var(--color-code-bg)] p-4 overflow-x-auto">
        <pre className="text-[13px] leading-[1.8] font-mono text-[var(--color-text-body)]">
          <code data-language={language}>{children}</code>
        </pre>
      </div>
    </div>
  );
}

/* ─── Numbered Code Block ─── */
function NumberedCodeBlock({ title, lines }: { title: string; lines: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [lines]);

  return (
    <div className="rounded-lg border border-[var(--color-border-subtle)] overflow-hidden my-6">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-code-header)] border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[var(--color-text-secondary)] font-mono ml-3">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1 rounded hover:bg-[var(--color-surface-level2)]"
        >
          {copied ? <Check size={12} className="text-[#28C840]" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="bg-[var(--color-code-bg)] p-4 overflow-x-auto">
        <pre className="text-[13px] leading-[1.8] font-mono text-[var(--color-text-body)]">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="inline-block w-6 text-right mr-4 text-[var(--color-text-secondary)] opacity-40 select-none">{i + 1}</span>
              <span className="font-bold text-[var(--color-text-primary)]">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border border-[var(--color-border-subtle)] rounded-lg p-6 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] hover:border-[#363639] transition-all duration-200 group">
      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-purple-muted)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center mb-4 text-[var(--color-accent-purple)] group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="font-geist text-lg font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Styled Table ─── */
function DocTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-[var(--color-border-subtle)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-code-header)] border-b border-[var(--color-border-subtle)]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-[var(--color-text-primary)] font-mono text-xs tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--color-surface-level2)] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-[var(--color-text-body)] leading-relaxed ${ci === 0 ? 'font-mono text-[var(--color-accent-purple)] font-medium' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTENT SECTIONS
   ════════════════════════════════════════════════════════════ */

function GettingStartedSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        The install command automatically checks your Python version ({'>='}  3.11), installs Playwright browser
        binaries, and configures your local MCP environments.
      </p>

      <NumberedCodeBlock
        title="zsh — browser-optimizer"
        lines={[
          'pip install browser-optimizer-mcp',
          'browser-optimizer install',
          'browser-optimizer start',
        ]}
      />

      <h3 id="prerequisites" className="font-geist text-xl font-bold mt-10 mb-3">Prerequisites</h3>
      <ul className="list-disc list-inside text-[var(--color-text-body)] text-[15px] leading-[1.85] space-y-1 ml-1">
        <li>Python 3.11 or newer.</li>
        <li>Playwright dependencies installed on your system.</li>
      </ul>

      <h3 id="installation-steps" className="font-geist text-xl font-bold mt-10 mb-3">Installation Steps</h3>
      <CodeBlock title="bash — setup" language="bash">{`# Clone the repository
git clone https://github.com/yourusername/browser-optimizer-mcp.git
cd browser-optimizer-mcp

# Create and activate virtual environment
python -m venv venv
venv\\Scripts\\activate     # On Windows
source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Install Playwright browser binaries
playwright install chromium`}</CodeBlock>

      <h3 id="configuration" className="font-geist text-xl font-bold mt-10 mb-3">Configuration</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Create a <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">.env</code> file in the project root:
      </p>
      <CodeBlock title="env — .env" language="env">{`LOG_LEVEL=INFO
HEADLESS=True
CACHE_ENABLED=True
CACHE_TTL=300
CACHE_MAX_SIZE=100
BROWSER_TIMEOUT=30000`}</CodeBlock>

      <h3 id="features-highlight" className="font-geist text-xl font-bold mt-10 mb-4">Features Highlight</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FeatureCard
          icon={<Settings size={20} />}
          title="CLI Auto-Config"
          description="Automatically detects your existing LLM environment and patches the MCP configuration without manual JSON editing."
        />
        <FeatureCard
          icon={<Cpu size={20} />}
          title="Binary Performance"
          description="Custom-built Chromium binaries optimized specifically for scraping and automation tasks with zero head-overhead."
        />
      </div>
    </>
  );
}

function ClientIntegrationsSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        The Browser Optimizer MCP integrates with multiple AI development environments. Below are the setup instructions for each supported client.
      </p>

      <h3 id="claude-desktop" className="font-geist text-xl font-bold mt-8 mb-3">Claude Desktop Setup</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Add the configuration to your <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">claude_desktop_config.json</code> file.
      </p>

      <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mt-6 mb-2">For Windows:</h4>
      <CodeBlock title="json — claude_desktop_config.json" language="json">{`{
  "mcpServers": {
    "browser-optimizer": {
      "command": "cmd",
      "args": [
        "/c",
        "C:\\\\path\\\\to\\\\browser-optimizer-mcp\\\\venv\\\\Scripts\\\\python.exe",
        "-m",
        "app.server.main"
      ],
      "env": {
        "PYTHONPATH": "C:\\\\path\\\\to\\\\browser-optimizer-mcp"
      }
    }
  }
}`}</CodeBlock>

      <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mt-6 mb-2">For macOS / Linux:</h4>
      <CodeBlock title="json — claude_desktop_config.json" language="json">{`{
  "mcpServers": {
    "browser-optimizer": {
      "command": "/path/to/browser-optimizer-mcp/venv/bin/python",
      "args": ["-m", "app.server.main"],
      "env": {
        "PYTHONPATH": "/path/to/browser-optimizer-mcp"
      }
    }
  }
}`}</CodeBlock>

      <h3 id="antigravity-ide" className="font-geist text-xl font-bold mt-10 mb-3">Antigravity IDE Setup</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Add this to your <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">mcp_config.json</code> file:
      </p>
      <CodeBlock title="json — mcp_config.json" language="json">{`{
  "mcpServers": {
    "browser-optimizer": {
      "command": "C:\\\\path\\\\to\\\\venv\\\\Scripts\\\\python.exe",
      "args": ["-m", "app.server.main"],
      "env": {
        "PYTHONPATH": "C:\\\\path\\\\to\\\\browser-optimizer-mcp"
      }
    }
  }
}`}</CodeBlock>

      <h3 id="cursor-setup" className="font-geist text-xl font-bold mt-10 mb-3">Cursor Setup</h3>
      <ol className="list-decimal list-inside text-[var(--color-text-body)] text-[15px] leading-[1.85] space-y-2 ml-1">
        <li>Go to <strong className="text-[var(--color-text-primary)]">Settings</strong> → <strong className="text-[var(--color-text-primary)]">Features</strong> → <strong className="text-[var(--color-text-primary)]">MCP</strong>.</li>
        <li>Click <strong className="text-[var(--color-text-primary)]">+ Add New MCP Server</strong>.</li>
        <li>Configure: Name = <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">browser-optimizer</code>, Type = <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">command</code></li>
        <li>Set the environment variable <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">PYTHONPATH</code> = path to your project.</li>
        <li>Click <strong className="text-[var(--color-text-primary)]">Save</strong>.</li>
      </ol>
    </>
  );
}

function ReferenceSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        The server registers and exposes the following tools via the Model Context Protocol. Each tool is callable by any connected AI agent.
      </p>

      <h3 id="tools-table" className="font-geist text-xl font-bold mt-8 mb-3">Tools Table</h3>
      <DocTable
        headers={['Tool', 'Parameters', 'Return Type', 'Description']}
        rows={[
          ['extract_context', 'url (string)', 'CompressedContext', 'Navigates to a URL, performs cleanup and compression, runs page classification, and returns optimized UI and ARIA trees.'],
          ['page_diff', 'url (string)', 'PageDiff', 'Returns deltas (added/removed elements) compared to the last observed state of this URL.'],
          ['execute_action', 'action, selector?, value?', 'ActionResult', 'Executes standard interactions (click, type, select, scroll, wait, navigate) on the active page.'],
          ['summarize_page', 'url (string)', 'Dict', 'Produces an instant text summary listing interactive element counts and text content snippets.'],
          ['classify_page', 'url (string)', 'ClassificationResult', 'Evaluates UI elements to identify the page category (e.g. login, search, survey).'],
          ['wait_until_ready', 'url, timeout?', 'ActionResult', 'Navigates to a page and waits for browser stabilization.'],
          ['cache_lookup', 'url (string)', 'Dict', 'Directly queries the semantic cache for stored context.'],
          ['get_metrics', 'None', 'Dict', 'Retrieves telemetry (bytes saved, cache hit rate, total actions).'],
        ]}
      />

      <h3 id="extract-context" className="font-geist text-xl font-bold mt-10 mb-3">extract_context</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        The primary tool. Navigates to a URL, captures the raw HTML and accessibility tree, compresses it by stripping scripts/styles/SVGs, classifies the page type, and returns a compact JSON payload.
      </p>
      <CodeBlock title="python — usage" language="python">{`result = await client.call_tool("extract_context", {
    "url": "https://example.com/login"
})
# Returns: CompressedContext with UI elements, ARIA snapshot, metadata`}</CodeBlock>

      <h3 id="page-diff" className="font-geist text-xl font-bold mt-10 mb-3">page_diff</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Compares the current page state with the previously cached version and returns only the delta — added and removed interactive elements.
      </p>

      <h3 id="execute-action" className="font-geist text-xl font-bold mt-10 mb-3">execute_action</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75]">
        Executes deterministic browser interactions. Supports <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">click</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">type</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">select</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">scroll</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">wait</code>, and <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">navigate</code> actions.
      </p>
    </>
  );
}

function ArchitectureSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        The codebase is structured modularly under the <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">app/</code> directory. Each module is responsible for a single stage in the optimization pipeline.
      </p>

      <h3 id="module-overview" className="font-geist text-xl font-bold mt-8 mb-4">Module Overview</h3>
      <DocTable
        headers={['Module', 'Path', 'Responsibility']}
        rows={[
          ['Browser Manager', 'app/browser/manager.py', 'Controls the lifecycle of the async Playwright browser. Reuses page contexts to avoid startup overhead.'],
          ['Page Extractor', 'app/extractor/extractor.py', 'Captures raw HTML and ARIA accessibility trees using Playwright\'s .aria_snapshot() API.'],
          ['Context Compressor', 'app/compressor/compressor.py', 'Strips scripts, styles, headers, footers, SVGs. Outputs structured interactive UI controls.'],
          ['Page Classifier', 'app/classifier/classifier.py', 'Heuristics-based scoring to classify pages into LOGIN, SEARCH, SURVEY, etc.'],
          ['Difference Engine', 'app/diff/diff.py', 'Compares consecutive observations and generates delta reports using composite fingerprints.'],
          ['Semantic Cache', 'app/cache/cache.py', 'In-memory TTLCache indexed by URL, validated via 64-bit xxhash signatures of page HTML.'],
          ['Action Executor', 'app/executor/executor.py', 'Executes browser interactions deterministically (click, type, select, scroll).'],
          ['Schemas', 'app/schemas/schemas.py', 'Pydantic data models enforcing contract compliance across modules.'],
          ['Metrics', 'app/metrics/metrics.py', 'Logs context size reductions, cache hits/misses, cumulative byte savings.'],
        ]}
      />

      <h3 id="browser-manager" className="font-geist text-xl font-bold mt-10 mb-3">Browser Manager</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Controls the lifecycle of the async Playwright browser. Reuses page contexts to avoid startup overhead and manages navigation timeouts.
      </p>

      <h3 id="compressor" className="font-geist text-xl font-bold mt-10 mb-3">Context Compressor</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        Houses DOM filters. Strips unneeded tags (scripts, styles, headers, footers, SVGs) and outputs a list of structured interactive UI controls.
      </p>

      <h3 id="cache" className="font-geist text-xl font-bold mt-10 mb-3">Semantic Cache</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75]">
        Manages an in-memory <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">cachetools.TTLCache</code> indexed by URL and validated via 64-bit <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">xxhash</code> signatures of page HTML.
      </p>
    </>
  );
}

function ProcessFlowSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        When an AI agent requests a page analysis, the Optimizer executes the following pipeline:
      </p>

      <h3 id="execution-pipeline" className="font-geist text-xl font-bold mt-8 mb-4">Step-by-Step Execution Pipeline</h3>
      <ol className="list-decimal list-inside text-[var(--color-text-body)] text-[15px] leading-[1.85] space-y-3 ml-1">
        <li><strong className="text-[var(--color-text-primary)]">Request Intake</strong>: The AI agent calls <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-[13px] font-mono">extract_context</code> with a target URL.</li>
        <li><strong className="text-[var(--color-text-primary)]">Browser Navigation</strong>: The browser manager opens or reuses a Playwright page and navigates to the URL.</li>
        <li><strong className="text-[var(--color-text-primary)]">HTML & Accessibility Tree Capture</strong>: The extractor captures raw HTML and generates a semantic ARIA snapshot.</li>
        <li><strong className="text-[var(--color-text-primary)]">xxhash Fingerprinting</strong>: The semantic cache hashes the raw HTML to uniquely identify the page state.
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[var(--color-text-secondary)]">
            <li><strong className="text-[var(--color-text-primary)]">Cache Hit</strong>: Returns cached context in {'<'}1ms, skipping DOM parsing.</li>
            <li><strong className="text-[var(--color-text-primary)]">Cache Miss</strong>: Continues with full extraction process.</li>
          </ul>
        </li>
        <li><strong className="text-[var(--color-text-primary)]">Context Compression</strong>: Strips styling, scripts, SVGs, and boilerplate. Extracts only interactable elements.</li>
        <li><strong className="text-[var(--color-text-primary)]">Task Classification</strong>: Analyzes interactive elements to score and categorize the page type.</li>
        <li><strong className="text-[var(--color-text-primary)]">Delta Diff Calculation</strong>: Compares fresh UI elements with last observed state, outputs only changes.</li>
        <li><strong className="text-[var(--color-text-primary)]">Metrics Logging</strong>: Records raw bytes, compressed bytes, and savings ratios.</li>
        <li><strong className="text-[var(--color-text-primary)]">Payload Delivery</strong>: Returns compact JSON with optimized UI elements, ARIA snapshot, and metadata.</li>
      </ol>

      <h3 id="flow-diagram" className="font-geist text-xl font-bold mt-10 mb-4">Flow Diagram</h3>
      <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-code-bg)] p-6 my-4">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          {[
            { label: 'AI Agent', color: '#5E6AD2' },
            { label: 'MCP Server', color: '#5E6AD2' },
            { label: 'Semantic Cache', color: '#28C840' },
            { label: 'Browser Manager', color: '#FEBC2E' },
            { label: 'Page Extractor', color: '#FF5F57' },
            { label: 'Compressor', color: '#5E6AD2' },
            { label: 'Diff Engine', color: '#28C840' },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--color-text-secondary)]">→</span>}
              <span
                className="px-3 py-1.5 rounded border text-[var(--color-text-primary)]"
                style={{ borderColor: node.color, backgroundColor: `${node.color}15` }}
              >
                {node.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[var(--color-text-secondary)] text-xs mt-4">
          extract_context(url) → navigate → cache check → extract → compress → diff → return JSON
        </p>
      </div>
    </>
  );
}

function BenchmarksSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        Directly comparing the Browser Optimizer MCP against traditional browser automation agents highlights the efficiency gains.
      </p>

      <h3 id="performance-comparison" className="font-geist text-xl font-bold mt-8 mb-4">Performance Comparison</h3>
      <DocTable
        headers={['Metric / Feature', 'Standard Browser Tools', 'Browser Optimizer MCP']}
        rows={[
          ['Avg Token Count (Google)', '~50,000+ tokens', '~120 tokens (97.7% reduction)'],
          ['Avg Token Count (HN)', '~9,000+ tokens', '~1,500 tokens (87.8% reduction)'],
          ['Observation Payload Type', 'Raw DOM or Base64 screenshots', 'Clean JSON UI controls + ARIA snapshot'],
          ['Incremental Observations', 'Resends entire DOM or new screenshot', 'Returns only element deltas (added/removed)'],
          ['Re-observation Latency', 'Full DOM download and parse (~1.5s)', 'In-memory cache lookup (~0.12ms)'],
          ['Page Classification', 'Requires LLM API call & reasoning tokens', 'Instant, local rule-based heuristics (0 tokens)'],
          ['Action Execution', 'LLM must reason step-by-step', 'Deterministic rule-based execution'],
          ['Inference Cost', 'High ($0.15 - $1.00+ per step)', 'Extremely Low (80-95% cost reduction)'],
        ]}
      />

      <h3 id="running-benchmarks" className="font-geist text-xl font-bold mt-10 mb-3">Running the Benchmark Suite</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-4">
        To run the benchmark suite against live public pages and verify these savings on your local machine:
      </p>
      <CodeBlock title="powershell — benchmark" language="powershell">{`$env:PYTHONPATH="."
venv/Scripts/python scripts/benchmark.py`}</CodeBlock>
    </>
  );
}

function UseCasesSection() {
  const useCases = [
    { title: 'AI Agent Cost Reduction', desc: 'Reduces token usage on dense web pages (like e-commerce portals or social media feeds) by up to 98%, dramatically lowering LLM API costs.', icon: <BarChart3 size={18} /> },
    { title: 'Structured Web Scraping', desc: 'Empowers LLM-based scrapers to locate and extract content from specific elements without parsing scripts, styles, or bloated HTML trees.', icon: <Layers size={18} /> },
    { title: 'Automated UI/E2E Testing', desc: 'Helps developers run fast assertion checks on UI changes by using delta diffing to detect structural regressions.', icon: <FlaskConical size={18} /> },
    { title: 'Form Auto-Filling', desc: 'Provides clean interactive element trees, allowing agents to fill forms, log in, or interact with custom widgets.', icon: <Terminal size={18} /> },
    { title: 'Real-time Page Monitoring', desc: 'Monitors active pages for updates using delta diffing, alerting agents only when new interactive components are added or removed.', icon: <Shield size={18} /> },
    { title: 'Web Search & RAG Pipelines', desc: 'Acts as an efficient web crawler that strips boilerplates and provides clean context for Retrieval-Augmented Generation.', icon: <Cpu size={18} /> },
    { title: 'Accessibility Compliance Audits', desc: 'Exposes semantic ARIA accessibility trees, letting automated agents inspect pages for accessibility compliance.', icon: <FileCode2 size={18} /> },
    { title: 'E-Commerce Monitoring', desc: 'Navigates product listings, classifies page types, and extracts price/stock updates with minimal payload sizes.', icon: <Settings size={18} /> },
    { title: 'SPA Automation', desc: 'Handles modern JavaScript-heavy frameworks by running Playwright locally, caching states, and delivering optimized components.', icon: <GitFork size={18} /> },
    { title: 'Multi-Agent Browser Sharing', desc: 'Serves as a standardized MCP bridge for multi-agent workflows, letting separate agents share and control the same browser session.', icon: <Plug size={18} /> },
  ];

  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        Here are key use cases where the Browser Optimizer MCP delivers significant value:
      </p>

      <div id="all-use-cases" className="grid md:grid-cols-2 gap-4 mt-4">
        {useCases.map((uc, i) => (
          <div
            key={i}
            id={i === 0 ? 'cost-reduction' : i === 1 ? 'web-scraping' : i === 3 ? 'form-filling' : undefined}
            className="border border-[var(--color-border-subtle)] rounded-lg p-5 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] hover:border-[#363639] transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-purple-muted)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)] group-hover:scale-105 transition-transform mt-0.5">
                {uc.icon}
              </div>
              <div>
                <h4 className="font-geist font-bold text-[var(--color-text-primary)] mb-1.5">{uc.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{uc.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TestingSection() {
  return (
    <>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75] mb-6">
        Run the test suite and deploy via Docker with the following commands.
      </p>

      <h3 id="unit-tests" className="font-geist text-xl font-bold mt-8 mb-3">Run Unit Tests</h3>
      <CodeBlock title="bash — tests" language="bash">{`pytest tests/ -v`}</CodeBlock>

      <h3 id="docker" className="font-geist text-xl font-bold mt-10 mb-3">Docker Deployment</h3>
      <CodeBlock title="bash — docker" language="bash">{`docker compose -f docker/docker-compose.yml up --build`}</CodeBlock>

      <h3 id="license" className="font-geist text-xl font-bold mt-10 mb-3">License</h3>
      <p className="text-[var(--color-text-body)] text-[15px] leading-[1.75]">
        Distributed under the <strong className="text-[var(--color-text-primary)]">MIT License</strong>. See LICENSE for more details.
      </p>
      <p className="text-[var(--color-text-secondary)] text-sm mt-2">
        Copyright (c) 2026 Manthan.
      </p>
    </>
  );
}

/* ─── Section Renderer ─── */
const SECTION_COMPONENTS: Record<SectionId, () => JSX.Element> = {
  'getting-started': GettingStartedSection,
  'client-integrations': ClientIntegrationsSection,
  'reference': ReferenceSection,
  'architecture': ArchitectureSection,
  'process-flow': ProcessFlowSection,
  'benchmarks': BenchmarksSection,
  'use-cases': UseCasesSection,
  'testing': TestingSection,
};

/* ════════════════════════════════════════════════════════════
   MAIN RESOURCES TAB
   ════════════════════════════════════════════════════════════ */

export default function ResourcesTab() {
  const [activeSection, setActiveSection] = useState<SectionId>('getting-started');
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  // Track pending scroll-to-top after section change
  const pendingScrollTop = useRef(false);

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const prevSection = currentIndex > 0 ? SECTION_ORDER[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIndex + 1] : null;

  const handleSectionChange = useCallback((id: SectionId) => {
    // Mark that after new content mounts, we want to scroll to top
    pendingScrollTop.current = true;
    setActiveSection(id);
    setActiveAnchor('');
  }, []);

  // After section content mounts (activeSection changes), scroll to top smoothly
  useEffect(() => {
    if (pendingScrollTop.current && contentRef.current) {
      pendingScrollTop.current = false;
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    const element = document.getElementById(anchorId);
    const container = contentRef.current;
    if (!element || !container) return;

    // getBoundingClientRect difference is reliable regardless of nesting depth
    const elRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    // Current scroll position + visual distance from container top, minus 32px breathing room
    const targetScrollTop = container.scrollTop + (elRect.top - containerRect.top) - 32;

    container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
    setActiveAnchor(anchorId);
    window.history.pushState(null, '', `#${anchorId}`);
  }, []);

  // Scroll spy for right sidebar — uses the scrollable container as root
  useEffect(() => {
    const anchors = SECTION_ANCHORS[activeSection];
    if (!anchors?.length || !contentRef.current) return;

    const container = contentRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting element
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const top = intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveAnchor(top.target.id);
        }
      },
      { root: container, rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    const timer = setTimeout(() => {
      anchors.forEach((a) => {
        const el = document.getElementById(a.id);
        if (el) observer.observe(el);
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeSection]);

  // Group sidebar items by category
  const categories: { name: string; items: SidebarItem[] }[] = [];
  SIDEBAR_ITEMS.forEach((item) => {
    const existing = categories.find((c) => c.name === item.category);
    if (existing) {
      existing.items.push(item);
    } else {
      categories.push({ name: item.category, items: [item] });
    }
  });

  const ContentComponent = SECTION_COMPONENTS[activeSection];
  const anchors = SECTION_ANCHORS[activeSection] || [];

  return (
    <div className="w-full flex-1 flex overflow-hidden">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 min-h-0 border-r border-[var(--color-border-subtle)] px-5 py-6 overflow-y-auto hide-scrollbar">
        {/* Documentation title */}
        <div className="mb-6">
          <h2 className="font-geist text-lg font-bold text-[var(--color-text-primary)] tracking-tight">Documentation</h2>
          <span className="text-[11px] font-mono text-[var(--color-text-secondary)] tracking-wide">v2.4.0-stable</span>
        </div>

        {/* Navigation */}
        {categories.map((cat) => (
          <div key={cat.name} className="mb-5">
            {/* Category separator (not for the first group) */}
            {cat.name !== 'GETTING STARTED' && (
              <p className="text-[11px] font-medium text-[var(--color-text-secondary)] tracking-[0.12em] uppercase mb-2.5 mt-3 font-sans">
                {cat.name}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {cat.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[14px] font-medium transition-all duration-150 text-left ${
                        isActive
                          ? 'bg-[var(--color-accent-purple-muted)] text-[var(--color-accent-purple)] border-l-2 border-[var(--color-accent-purple)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-level2)]'
                      }`}
                    >
                      <span className={isActive ? 'text-[var(--color-accent-purple)]' : 'opacity-60'}>{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main ref={contentRef} className="flex-1 min-h-0 overflow-y-auto px-8 md:px-12 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] mb-6">
          <span className="text-[var(--color-text-secondary)]">Documentation</span>
          <span className="text-[var(--color-text-secondary)] opacity-40">›</span>
          <span className="text-[var(--color-accent-purple)] font-medium">{SECTION_TITLES[activeSection]}</span>
        </nav>

        {/* Section heading */}
        <h1 className="font-geist text-[32px] font-bold tracking-tight text-[var(--color-text-primary)] mb-4 leading-tight">
          {SECTION_TITLES[activeSection]}
        </h1>

        {/* Section content — animated on section switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="docs-content"
          >
            <ContentComponent />
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next Navigation ── */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-[var(--color-border-subtle)]">
          {prevSection ? (
            <button
              onClick={() => handleSectionChange(prevSection)}
              className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-left">
                <div className="text-[11px] text-[var(--color-text-secondary)] tracking-wide">Previous</div>
                <div className="font-medium text-[var(--color-text-primary)]">{SECTION_TITLES[prevSection]}</div>
              </div>
            </button>
          ) : <div />}
          {nextSection ? (
            <button
              onClick={() => handleSectionChange(nextSection)}
              className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
            >
              <div className="text-right">
                <div className="text-[11px] text-[var(--color-text-secondary)] tracking-wide">Next</div>
                <div className="font-medium text-[var(--color-text-primary)]">{SECTION_TITLES[nextSection]}</div>
              </div>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : <div />}
        </div>
      </main>

      {/* ── RIGHT SIDEBAR — On this page ── */}
      <aside className="hidden xl:flex flex-col w-[200px] flex-shrink-0 min-h-0 py-8 pr-6 pl-4 overflow-y-auto hide-scrollbar">
        {anchors.length > 0 && (
          <div className="sticky top-8">
            <h4 className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-text-primary)] mb-3 tracking-wide">
              <List size={14} />
              On this page
            </h4>
            <ul className="flex flex-col gap-1 border-l border-[var(--color-border-subtle)]">
              {anchors.map((a) => {
                const isActive = activeAnchor === a.id;
                return (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      onClick={(e) => handleAnchorClick(e, a.id)}
                      className={`block pl-3 py-1.5 text-[13px] transition-colors border-l-2 -ml-px ${
                        isActive
                          ? 'border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] font-medium'
                          : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-secondary)]'
                      }`}
                    >
                      {a.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
