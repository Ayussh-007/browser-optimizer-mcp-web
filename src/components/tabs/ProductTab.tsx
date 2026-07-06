import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Copy, Check, Zap, Shield, Clock, BarChart3, ArrowRight, Cpu, Globe, Layers } from 'lucide-react';

/* ─── Code snippets per tab ─── */
const CODE_TABS = [
  {
    id: 'usage',
    label: 'USAGE',
    stepLabel: 'STEP 01: INITIALIZE CLIENT',
    lines: [
      { text: 'import', kind: 'keyword' as const },
      { text: ' { ', kind: 'punct' as const },
      { text: 'Optimizer', kind: 'type' as const },
      { text: ' } ', kind: 'punct' as const },
      { text: 'from', kind: 'keyword' as const },
      { text: ' "', kind: 'punct' as const },
      { text: '@mcp/optimizer', kind: 'string' as const },
      { text: '"', kind: 'punct' as const },
      { text: ';', kind: 'punct' as const },
      { text: '\n\n', kind: 'break' as const },
      { text: 'const', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'mcp', kind: 'variable' as const },
      { text: ' = ', kind: 'punct' as const },
      { text: 'new', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'Optimizer', kind: 'type' as const },
      { text: '({\n', kind: 'punct' as const },
      { text: '  intensity: ', kind: 'punct' as const },
      { text: '"aggressive"', kind: 'string' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '  cache_ttl: ', kind: 'punct' as const },
      { text: '3600', kind: 'number' as const },
      { text: '\n});\n\n', kind: 'punct' as const },
      { text: 'const', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'optimizedDom', kind: 'variable' as const },
      { text: ' = ', kind: 'punct' as const },
      { text: 'await', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'mcp', kind: 'variable' as const },
      { text: '.', kind: 'punct' as const },
      { text: 'prune', kind: 'function' as const },
      { text: '(page);\n', kind: 'punct' as const },
      { text: '// Result: 50kb HTML → 2kb structured JSON', kind: 'comment' as const },
      { text: '\n', kind: 'break' as const },
      { text: 'sendToLLM', kind: 'function' as const },
      { text: '(', kind: 'punct' as const },
      { text: 'optimizedDom', kind: 'variable' as const },
      { text: ');', kind: 'punct' as const },
    ],
  },
  {
    id: 'diffing',
    label: 'STATE DIFFING',
    stepLabel: 'STEP 02: DELTA TRACKING',
    lines: [
      { text: 'const', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'session', kind: 'variable' as const },
      { text: ' = ', kind: 'punct' as const },
      { text: 'mcp', kind: 'variable' as const },
      { text: '.', kind: 'punct' as const },
      { text: 'createSession', kind: 'function' as const },
      { text: '();\n\n', kind: 'punct' as const },
      { text: '// Tick 1: Full state capture', kind: 'comment' as const },
      { text: '\n', kind: 'break' as const },
      { text: 'await', kind: 'keyword' as const },
      { text: ' session.', kind: 'punct' as const },
      { text: 'ingest', kind: 'function' as const },
      { text: '(pageState1);\n\n', kind: 'punct' as const },
      { text: '// Tick 2: Only diff transmitted', kind: 'comment' as const },
      { text: '\n', kind: 'break' as const },
      { text: 'const', kind: 'keyword' as const },
      { text: ' ', kind: 'punct' as const },
      { text: 'patch', kind: 'variable' as const },
      { text: ' = ', kind: 'punct' as const },
      { text: 'await', kind: 'keyword' as const },
      { text: ' session.', kind: 'punct' as const },
      { text: 'ingest', kind: 'function' as const },
      { text: '(pageState2);\n', kind: 'punct' as const },
      { text: 'console', kind: 'variable' as const },
      { text: '.', kind: 'punct' as const },
      { text: 'log', kind: 'function' as const },
      { text: '(`Patch: ${patch.byteLength}B`);', kind: 'punct' as const },
    ],
  },
  {
    id: 'config',
    label: 'CONFIGURATION',
    stepLabel: 'STEP 03: CONFIGURE PIPELINE',
    lines: [
      { text: 'export default', kind: 'keyword' as const },
      { text: ' {\n', kind: 'punct' as const },
      { text: '  caching', kind: 'variable' as const },
      { text: ': {\n', kind: 'punct' as const },
      { text: '    strategy: ', kind: 'punct' as const },
      { text: '"semantic"', kind: 'string' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '    ttl: ', kind: 'punct' as const },
      { text: '3600', kind: 'number' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '    invalidation: ', kind: 'punct' as const },
      { text: '"content-hash"', kind: 'string' as const },
      { text: '\n  },\n', kind: 'punct' as const },
      { text: '  pruning', kind: 'variable' as const },
      { text: ': {\n', kind: 'punct' as const },
      { text: '    removeScripts: ', kind: 'punct' as const },
      { text: 'true', kind: 'keyword' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '    removeStyles: ', kind: 'punct' as const },
      { text: 'true', kind: 'keyword' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '    compressSvg: ', kind: 'punct' as const },
      { text: 'true', kind: 'keyword' as const },
      { text: ',\n', kind: 'punct' as const },
      { text: '    maxDepth: ', kind: 'punct' as const },
      { text: '12', kind: 'number' as const },
      { text: '\n  }\n};', kind: 'punct' as const },
    ],
  },
];

const SYNTAX_COLORS: Record<string, string> = {
  keyword: '#C678DD',
  type: '#E5C07B',
  string: '#98C379',
  number: '#D19A66',
  variable: '#61AFEF',
  function: '#61AFEF',
  comment: '#5C6370',
  punct: '#ABB2BF',
  break: 'transparent',
};

/* ─── Benchmark data ─── */
const BENCHMARKS = [
  { payload: 'E-commerce Product', standard: '842 KB', optimized: '12 KB', reduction: -98.5 },
  { payload: 'Dashboard (Dynamic)', standard: '1.2 MB', optimized: '45 KB', reduction: -96.2 },
  { payload: 'Documentation Page', standard: '156 KB', optimized: '8 KB', reduction: -94.8 },
  { payload: 'SPA Navigation', standard: '2.1 MB', optimized: '67 KB', reduction: -96.8 },
];

/* ─── Architecture pipeline stages ─── */
const PIPELINE_STAGES = [
  { icon: <Globe size={20} />, label: 'Browser', desc: 'Raw DOM capture from live pages', color: '#61AFEF' },
  { icon: <Layers size={20} />, label: 'Extractor', desc: 'Heuristic element filtering', color: '#C678DD' },
  { icon: <Cpu size={20} />, label: 'Classifier', desc: 'ML-based widget role assignment', color: '#E5C07B' },
  { icon: <BarChart3 size={20} />, label: 'Compressor', desc: 'Semantic token compression', color: '#98C379' },
  { icon: <Zap size={20} />, label: 'Diff Engine', desc: 'Delta-only state transmissions', color: '#D19A66' },
];

/* ─── Metrics cards ─── */
const METRICS = [
  { icon: <Zap size={18} />, value: '94.6%', label: 'Token Reduction', color: '#98C379' },
  { icon: <Clock size={18} />, value: '120ms', label: 'Avg Latency', color: '#61AFEF' },
  { icon: <Shield size={18} />, value: '99.9%', label: 'Uptime SLA', color: '#C678DD' },
  { icon: <BarChart3 size={18} />, value: '50x', label: 'Cost Savings', color: '#E5C07B' },
];

/* ─── Scroll‑reveal wrapper ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(
        target.includes('.')
          ? current.toFixed(1)
          : Math.round(current).toString()
      );
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ════════════════════════════════════════════════════════
   PRODUCT TAB — Main export
   ════════════════════════════════════════════════════════ */
export default function ProductTab() {
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const tab = CODE_TABS[activeCodeTab];
    const plainText = tab.lines.map((l) => l.text).join('');
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeCodeTab]);

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-hidden">

      {/* ─── SECTION 1: Hero heading ─── */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center">
        <Reveal>
          <h1 className="font-geist text-4xl md:text-5.5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-5 text-white">
            Built for{' '}
            <span className="bg-gradient-to-r from-[#7C8AFF] via-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">
              multi-agent workflows
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Browser Optimizer acts as a transparent proxy between your browser driver and the model, handling complex DOM lifecycle management.
          </p>
        </Reveal>
      </section>

      {/* ─── SECTION 2: Tabbed code editor (pixel-perfect clone) ─── */}
      <section className="max-w-4xl mx-auto px-6 w-full pb-10 pt-4">
        <Reveal delay={0.12}>
          <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[#0D0D10] overflow-hidden shadow-2xl shadow-black/40">

            {/* Tab bar */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[#111115]">
              <div className="flex items-center">
                {CODE_TABS.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(i)}
                    className={`
                      px-5 py-3 text-[11px] font-mono font-semibold tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer
                      border-b-2 relative
                      ${activeCodeTab === i
                        ? 'text-white border-white/80'
                        : 'text-[#5A5A6B] hover:text-[#8A8A9B] border-transparent'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pr-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
            </div>

            {/* Code body */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCodeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="p-5 md:p-6 font-mono text-[12px] md:text-[13px] leading-[1.8]"
                >
                  {/* Step label */}
                  <div className="text-[10px] font-semibold tracking-[0.1em] text-[#D19A66] mb-3 select-none">
                    {CODE_TABS[activeCodeTab].stepLabel}
                  </div>

                  {/* Syntax-highlighted code */}
                  <pre className="whitespace-pre-wrap">
                    {CODE_TABS[activeCodeTab].lines.map((seg, i) => (
                      <span key={i} style={{ color: SYNTAX_COLORS[seg.kind] }}>
                        {seg.text}
                      </span>
                    ))}
                  </pre>
                </motion.div>
              </AnimatePresence>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-1.5 rounded bg-[#1A1A22] hover:bg-[#252530] border border-[#2A2A35] transition-all duration-200 cursor-pointer group"
                title="Copy code"
              >
                {copied
                  ? <Check size={12} className="text-[#98C379]" />
                  : <Copy size={12} className="text-[#5A5A6B] group-hover:text-[#8A8A9B] transition-colors" />
                }
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── SECTION 3: Operational Benchmarks table ─── */}
      <section className="max-w-4xl mx-auto px-6 w-full pb-10">
        <Reveal>
          <h2 className="font-geist text-2.5xl md:text-3.5xl font-bold tracking-tight mb-4 text-white">
            Operational Benchmarks
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[#0D0D10] overflow-hidden shadow-xl shadow-black/30">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] bg-[#111115]">
                  <th className="px-5 py-3.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#5A5A6B] uppercase">Payload Type</th>
                  <th className="px-5 py-3.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#5A5A6B] uppercase">Standard HTML</th>
                  <th className="px-5 py-3.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#5A5A6B] uppercase">MCP Optimized</th>
                  <th className="px-5 py-3.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#D19A66] uppercase text-right">Reduction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {BENCHMARKS.map((row, i) => (
                  <motion.tr
                    key={row.payload}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    className="group hover:bg-[#13131A] transition-colors"
                  >
                    <td className="px-5 py-4 text-xs text-white font-medium">{row.payload}</td>
                    <td className="px-5 py-4 text-xs text-[#5A5A6B]">{row.standard}</td>
                    <td className="px-5 py-4 text-xs font-bold text-[#61AFEF]">{row.optimized}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#98C379]/10 text-[#98C379] border border-[#98C379]/20">
                        {row.reduction}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
      </div>

      {/* ─── SECTION 4: Metrics cards (additional content) ─── */}
      <section className="max-w-4xl mx-auto px-6 w-full py-12">
        <Reveal>
          <h2 className="font-geist text-2.5xl md:text-3.5xl font-bold tracking-tight mb-2 text-center text-white">
            Performance at a Glance
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8 max-w-lg mx-auto leading-relaxed">
            Real production numbers from enterprise deployments across thousands of browser sessions.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative rounded-xl border border-[var(--color-border-subtle)] bg-[#0D0D10] p-5 text-center overflow-hidden group cursor-default"
              >
                {/* Glow accent */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${m.color}08, transparent 70%)`,
                  }}
                />
                <div
                  className="w-8 h-8 mx-auto mb-3 rounded-lg flex items-center justify-center border transition-colors duration-300"
                  style={{
                    borderColor: `${m.color}30`,
                    color: m.color,
                    backgroundColor: `${m.color}08`,
                  }}
                >
                  {m.icon}
                </div>
                <div className="text-xl md:text-2xl font-geist font-bold tracking-tight mb-0.5" style={{ color: m.color }}>
                  <AnimatedCounter target={m.value} suffix={m.value.replace(/[0-9.]/g, '')} />
                </div>
                <div className="text-[10px] text-[#5A5A6B] font-mono tracking-wide uppercase">
                  {m.label}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
      </div>

      {/* ─── SECTION 5: Processing pipeline (additional content) ─── */}
      <section className="max-w-4xl mx-auto px-6 w-full py-12">
        <Reveal>
          <h2 className="font-geist text-xl md:text-2xl font-bold tracking-tight mb-2 text-center">
            Processing Pipeline
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] text-center mb-10 max-w-lg mx-auto">
            Five specialized stages transform raw browser DOM into minimal, structured payloads for your agent.
          </p>
        </Reveal>

        <div className="relative flex flex-col md:flex-row items-stretch gap-4">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-[#61AFEF]/20 via-[#E5C07B]/20 to-[#98C379]/20 -translate-y-1/2 z-0" />

          {PIPELINE_STAGES.map((stage, i) => (
            <Reveal key={stage.label} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="relative z-10 flex-1 rounded-xl border border-[var(--color-border-subtle)] bg-[#0D0D10] p-4 flex flex-col items-center text-center group cursor-default min-w-[130px]"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 border transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    borderColor: `${stage.color}30`,
                    color: stage.color,
                    backgroundColor: `${stage.color}08`,
                    boxShadow: `0 0 0px ${stage.color}00`,
                  }}
                >
                  {stage.icon}
                </div>
                <h4 className="font-geist font-bold text-xs mb-1 text-white">{stage.label}</h4>
                <p className="text-[10px] text-[#5A5A6B] leading-relaxed">{stage.desc}</p>

                {/* Arrow between stages (desktop only) */}
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-[#111115] border border-[var(--color-border-subtle)] flex items-center justify-center">
                      <ArrowRight size={8} className="text-[#5A5A6B]" />
                    </div>
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
      </div>

      {/* ─── SECTION 6: Integration logos / ecosystem ─── */}
      <section className="max-w-4xl mx-auto px-6 w-full py-12 text-center">
        <Reveal>
          <p className="text-[9px] font-mono font-semibold tracking-[0.2em] text-[#5A5A6B] uppercase mb-2">
            Works with your stack
          </p>
          <h2 className="font-geist text-xl md:text-2xl font-bold tracking-tight mb-8">
            First-class integrations
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {['Playwright', 'Puppeteer', 'Selenium', 'Cypress', 'LangChain'].map((name, i) => (
            <Reveal key={name} delay={i * 0.03}>
              <motion.div
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.1)' }}
                className="rounded-xl border border-[var(--color-border-subtle)] bg-[#0D0D10] py-4 px-3 flex flex-col items-center gap-1.5 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1A1A22] border border-[#2A2A35] flex items-center justify-center text-[#8A8A9B]">
                  <Globe size={14} />
                </div>
                <span className="text-[11px] font-mono text-[#8A8A9B] tracking-wide">{name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
