// Feature data, compatibility items, and shared constants

export const GITHUB_URL = "https://github.com/Manthan-Railkar/browser-optimizer-mcp";

export const FEATURES = [
  {
    title: "Token Compression",
    description: "Dramatically reduce token count by intelligently compressing DOM content before sending to AI models.",
    icon: "Minimize2",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Smart DOM Reduction",
    description: "Remove unnecessary DOM nodes, styles, and metadata to create clean, focused context for AI agents.",
    icon: "Layers",
    gradient: "from-cyan-400 to-emerald-400",
  },
  {
    title: "Browser Middleware",
    description: "Sits transparently between your AI agent and browser automation — zero workflow changes required.",
    icon: "GitBranch",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "FastMCP Integration",
    description: "Built on the FastMCP protocol for seamless integration with modern AI agent frameworks.",
    icon: "Zap",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Playwright Compatible",
    description: "Works directly with Playwright for reliable, production-grade browser automation under the hood.",
    icon: "Monitor",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Lower Inference Cost",
    description: "Cut AI inference costs by up to 80% through intelligent context optimization and payload reduction.",
    icon: "TrendingDown",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    title: "Reduced Latency",
    description: "2.4× faster execution through optimized browser interactions and compressed data pipelines.",
    icon: "Clock",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "Developer Friendly",
    description: "Simple API, comprehensive docs, and familiar patterns. Get started in under 5 minutes.",
    icon: "Code",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    title: "Plug-and-Play",
    description: "One-line installation. Zero configuration. Works with your existing AI agent setup immediately.",
    icon: "Package",
    gradient: "from-cyan-400 to-blue-500",
  },
] as const;

export const METRICS = [
  {
    value: 70,
    suffix: "%",
    label: "Less Tokens",
    description: "Token reduction on average",
    color: "var(--cyan-accent)",
  },
  {
    value: 2.4,
    suffix: "×",
    label: "Faster Execution",
    description: "Speed improvement",
    color: "var(--primary-blue)",
  },
  {
    value: 80,
    suffix: "%",
    label: "Lower AI Costs",
    description: "Inference cost savings",
    color: "var(--success-green)",
  },
  {
    value: 95,
    suffix: "%",
    label: "Browser Accuracy",
    description: "Task completion rate",
    color: "var(--purple-glow)",
  },
] as const;

export const COMPATIBILITY = [
  { name: "OpenAI", category: "AI Provider" },
  { name: "Anthropic Claude", category: "AI Provider" },
  { name: "Google Gemini", category: "AI Provider" },
  { name: "Cursor", category: "IDE" },
  { name: "VS Code", category: "IDE" },
  { name: "Playwright", category: "Framework" },
  { name: "FastMCP", category: "Protocol" },
  { name: "Python", category: "Language" },
  { name: "Node.js", category: "Language" },
  { name: "CrewAI", category: "Agent Framework" },
  { name: "LangChain", category: "Agent Framework" },
  { name: "AutoGen", category: "Agent Framework" },
] as const;

export const ARCHITECTURE_NODES = [
  { id: "agent", label: "AI Agent", description: "LLM or orchestration framework" },
  { id: "mcp", label: "Browser Optimizer MCP", description: "Intelligent compression & optimization layer" },
  { id: "playwright", label: "Playwright", description: "Reliable browser automation engine" },
  { id: "browser", label: "Browser", description: "Headless execution environment" },
  { id: "website", label: "Website", description: "Target application or DOM" },
  { id: "response", label: "Compressed Response", description: "Token-optimized result returned to AI" },
] as const;

export const TERMINAL_LINES = [
  { type: "command" as const, text: "$ optimize browser task", delay: 0 },
  { type: "output" as const, text: "", delay: 600 },
  { type: "output" as const, text: "Initializing Browser Optimizer MCP...", delay: 800 },
  { type: "output" as const, text: "Analyzing DOM...", delay: 1200 },
  { type: "output" as const, text: "Removing unnecessary nodes...", delay: 1600 },
  { type: "output" as const, text: "Compressing context...", delay: 2000 },
  { type: "output" as const, text: "Optimizing payload...", delay: 2400 },
  { type: "output" as const, text: "Launching Playwright...", delay: 2800 },
  { type: "output" as const, text: "", delay: 3200 },
  { type: "success" as const, text: "✓ Done.", delay: 3400 },
  { type: "output" as const, text: "", delay: 3600 },
  { type: "header" as const, text: "Results", delay: 3800 },
  { type: "output" as const, text: "", delay: 3900 },
  { type: "metric" as const, text: "Token Usage", value: 78, delay: 4000 },
  { type: "metric" as const, text: "Latency", value: 65, suffix: "2.4x Faster", delay: 4400 },
  { type: "metric" as const, text: "Inference Cost", value: 80, suffix: "80% Saved", delay: 4800 },
] as const;

export const DOC_CARDS = [
  { title: "Getting Started", description: "Quick setup guide and first steps", icon: "Rocket" },
  { title: "Installation", description: "Package setup and dependencies", icon: "Download" },
  { title: "API Reference", description: "Complete API documentation", icon: "FileCode" },
  { title: "MCP Tools", description: "Available optimization tools", icon: "Wrench" },
  { title: "Architecture", description: "System design and data flow", icon: "Network" },
  { title: "Examples", description: "Real-world usage patterns", icon: "BookOpen" },
  { title: "Benchmarks", description: "Performance comparison data", icon: "BarChart3" },
  { title: "Contributing", description: "Join the open-source effort", icon: "GitPullRequest" },
] as const;

export const WORKFLOW_STEPS = [
  { label: "Task", description: "AI agent receives automation task" },
  { label: "Optimizer", description: "MCP analyzes and compresses" },
  { label: "Browser", description: "Playwright executes commands" },
  { label: "Compression", description: "Response data is optimized" },
  { label: "AI Response", description: "Clean result returned to agent" },
] as const;
