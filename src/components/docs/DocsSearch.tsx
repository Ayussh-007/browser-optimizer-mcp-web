"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocsSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 sm:pt-40 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border-glass)]">
          <Search size={20} className="text-[var(--text-tertiary)]" />
          <input
            autoFocus
            type="text"
            placeholder="Search documentation, tools, APIs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[var(--text-tertiary)] text-lg"
          />
          <button
            onClick={onClose}
            className="text-xs bg-[var(--surface-glass)] px-2 py-1 rounded text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query ? (
            <div className="py-12 text-center text-[var(--text-tertiary)]">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Quick Links
                </h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Getting Started", href: "/docs/getting-started" },
                    { label: "Installation", href: "/docs/installation" },
                    { label: "API Reference: extract_context", href: "/docs/api-reference" }
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        onClose();
                      }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
