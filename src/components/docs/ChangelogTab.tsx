"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { motion } from "framer-motion";

const RELEASES = [
  {
    version: "v1.3.0",
    date: "July 2026",
    changes: ["Introduced Semantic Caching layer", "Improved DOM compression speed by 40%", "Added advanced page classification models", "Fixed hydration mismatches in edge rendering"]
  },
  {
    version: "v1.2.0",
    date: "June 2026",
    changes: ["Added native Playwright hooks", "Reduced memory footprint by 200MB", "New `execute_action()` generic tool"]
  },
  {
    version: "v1.1.0",
    date: "May 2026",
    changes: ["Initial public beta release", "Core DOM stripping functionality", "API endpoints finalized"]
  }
];

export default function ChangelogTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <DocsBreadcrumbs path={["Changelog"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Changelog</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12 leading-relaxed">
          Keep track of new features, optimizations, and bug fixes for Browser Optimizer MCP.
        </p>

        <div className="relative border-l border-[var(--border-glass)] ml-4 space-y-12 pb-8">
          {RELEASES.map((release, i) => (
            <motion.div 
              key={release.version}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-[var(--primary-blue)] shadow-[0_0_10px_rgba(79,124,255,0.5)]" />
              
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-white">{release.version}</h2>
                <span className="text-sm font-mono text-[var(--text-tertiary)]">{release.date}</span>
              </div>
              
              <ul className="space-y-3">
                {release.changes.map((change, j) => (
                  <li key={j} className="text-[var(--text-secondary)] text-sm flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: change.replace(/`([^`]+)`/g, '<code class="bg-[rgba(255,255,255,0.05)] px-1 py-0.5 rounded text-[var(--cyan-accent)]">$1</code>') }} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
