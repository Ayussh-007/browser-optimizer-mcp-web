"use client";

import { useState } from "react";
import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { Terminal, Copy, Check, ChevronDown } from "lucide-react";

export default function InstallationTab() {
  const [activePkg, setActivePkg] = useState("pip");
  const [activePlatform, setActivePlatform] = useState("macOS");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getInstallCommand = () => {
    switch (activePkg) {
      case "pip": return "pip install browser-optimizer-mcp";
      case "uv": return "uv pip install browser-optimizer-mcp";
      case "Poetry": return "poetry add browser-optimizer-mcp";
      case "Docker": return "docker pull manthanrailkar/browser-optimizer-mcp";
      default: return "pip install browser-optimizer-mcp";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <DocsBreadcrumbs path={["Installation"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Installation</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          Install the Browser Optimizer MCP using your preferred Python package manager. We recommend using <code>uv</code> for the fastest installation times.
        </p>

        {/* Platform & Package Manager Switcher */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex bg-[rgba(255,255,255,0.03)] border border-[var(--border-glass)] rounded-lg p-1">
            {["macOS", "Linux", "Windows"].map(platform => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activePlatform === platform ? "bg-[var(--surface-glass)] text-white" : "text-[var(--text-tertiary)] hover:text-white"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Installation Block */}
        <div className="rounded-xl border border-[var(--border-glass)] overflow-hidden bg-[#0A0D18] mb-12">
          <div className="flex items-center px-4 py-2 bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-glass)]">
            <div className="flex gap-2">
              {["pip", "uv", "Poetry", "Docker"].map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setActivePkg(pkg)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    activePkg === pkg ? "bg-[var(--primary-blue-dim)] text-[var(--primary-blue)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between group">
            <div className="flex items-center gap-3 text-sm font-mono text-[var(--text-secondary)]">
              <span className="text-[var(--primary-blue)] select-none">$</span>
              <span>{getInstallCommand()}</span>
            </div>
            <button
              onClick={() => handleCopy(getInstallCommand())}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)] hover:text-white"
            >
              {copied === getInstallCommand() ? <Check size={16} className="text-[var(--success-green)]" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-[var(--border-glass)] pb-2">
          Initialization Steps
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          After installation, verify the environment and initialize the optimizer.
        </p>

        <div className="space-y-4 font-mono text-sm">
          {[
            { cmd: "browser-optimizer doctor", desc: "Verifies Playwright browsers and dependencies are installed correctly." },
            { cmd: "browser-optimizer install", desc: "Downloads necessary headless browser binaries if missing." },
            { cmd: "browser-optimizer start", desc: "Starts the local MCP server on port 8080." }
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="p-4 rounded-xl border border-[var(--border-glass)] bg-[rgba(255,255,255,0.01)] group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-[var(--cyan-accent)] select-none">$</span>
                  <span>{cmd}</span>
                </div>
                <button
                  onClick={() => handleCopy(cmd)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)] hover:text-white"
                >
                  {copied === cmd ? <Check size={14} className="text-[var(--success-green)]" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] font-sans">{desc}</p>
            </div>
          ))}
        </div>

        {/* Troubleshooting Accordion */}
        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-[var(--border-glass)] pb-2 mt-12">
          Troubleshooting
        </h2>
        <div className="border border-[var(--border-glass)] rounded-xl divide-y divide-[var(--border-glass)]">
          <details className="group">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-[var(--text-secondary)] group-open:text-white transition-colors">
              Playwright browser binaries missing
              <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-sm text-[var(--text-tertiary)] leading-relaxed">
              If you receive a <code>BrowserType.launch: Executable doesn't exist</code> error, ensure you have run <code>browser-optimizer install</code> to fetch the required Chromium binaries for your platform.
            </div>
          </details>
          <details className="group">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-[var(--text-secondary)] group-open:text-white transition-colors">
              Port 8080 is already in use
              <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-sm text-[var(--text-tertiary)] leading-relaxed">
              You can specify a custom port by running <code>browser-optimizer start --port 9090</code>. Be sure to update your agent's MCP client configuration to point to the new port.
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}
