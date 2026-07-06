"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import DocsSearch from "@/components/docs/DocsSearch";
import Navbar from "@/components/sections/Navbar";

const TABS = [
  { label: "Getting Started", href: "/docs/getting-started" },
  { label: "Installation", href: "/docs/installation" },
  { label: "API Reference", href: "/docs/api-reference" },
  { label: "MCP Tools", href: "/docs/mcp-tools" },
  { label: "Architecture", href: "/docs/architecture" },
  { label: "Examples", href: "/docs/examples" },
  { label: "Benchmarks", href: "/docs/benchmarks" },
  { label: "Changelog", href: "/docs/changelog" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col pt-16 md:pt-20">
      <Navbar />
      <DocsSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 container-main py-10 flex flex-col">
        {/* Section Header with Search Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-sm tracking-widest text-[var(--text-secondary)] font-medium">
              WORKSPACE
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
              Documentation
            </h1>
          </div>
          
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-4 px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[var(--border-glass)] hover:border-[var(--border-glass-hover)] rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors w-full md:w-64 group"
          >
            <Search size={16} className="group-hover:text-white transition-colors" />
            <span className="flex-1 text-left text-sm">Search docs...</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-xs font-mono">⌘K</span>
          </button>
        </div>

        {/* Documentation Portal Container */}
        <div className="border border-[var(--border-glass)] rounded-2xl bg-[var(--bg-secondary)] overflow-hidden flex flex-col flex-1 min-h-[700px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          
          {/* Top Tabs */}
          <div className="flex items-center gap-1 px-4 pt-2 border-b border-[var(--border-glass)] overflow-x-auto hide-scrollbar bg-[rgba(255,255,255,0.01)] relative z-20 shrink-0">
            {TABS.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(tab.href);
                  }}
                  className={`relative px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                    isActive ? "text-white font-medium" : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeDocTabLayout"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-blue)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Content */}
          <div className="flex-1 relative flex bg-[var(--bg-primary)]">
            {/* The page components will render here automatically */}
            <div className="w-full h-full flex flex-col overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex overflow-y-auto"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
