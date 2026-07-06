"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function InstallSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("pip install browser-optimizer-mcp");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API might not be available
    }
  };

  return (
    <section className="section-space relative">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--success-green)] font-medium">
            Installation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Get started in <span className="gradient-text">seconds</span>
          </h2>
        </motion.div>

        {/* Install Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <div
            className="glass-card p-1 relative group"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,124,255,0.12), rgba(0,245,255,0.08), rgba(139,92,246,0.08))",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(79,124,255,0.1) 0%, transparent 60%)",
              }}
            />

            <div className="rounded-xl bg-[var(--bg-secondary)] p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-[var(--text-tertiary)] shrink-0">$</span>
                <code className="font-mono text-sm sm:text-base text-white whitespace-nowrap">
                  pip install browser-optimizer-mcp
                </code>
              </div>

              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg hover:bg-[var(--surface-glass)] transition-all duration-200 text-[var(--text-secondary)] hover:text-white"
                aria-label="Copy install command"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={16} className="text-[var(--success-green)]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Success toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-center mt-4"
              >
                <div className="text-xs text-[var(--success-green)] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--success-green-dim)]">
                  <Check size={12} /> Copied to clipboard
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
