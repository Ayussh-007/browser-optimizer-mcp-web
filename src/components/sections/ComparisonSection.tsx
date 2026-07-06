"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const leftItems = [
  "Full DOM tree sent to AI model",
  "10,000+ tokens per request",
  "Redundant attributes and metadata",
  "High inference latency",
  "Expensive API costs",
];

const rightItems = [
  "Compressed DOM, only essential nodes",
  "~3,000 tokens per request",
  "Clean, focused context",
  "2.4× faster execution",
  "80% cost reduction",
];

export default function ComparisonSection() {
  const [redTokens, setRedTokens] = useState<number[]>([]);
  const [greenTokens, setGreenTokens] = useState<number[]>([]);

  useEffect(() => {
    // Generate random opacities on the client only to prevent hydration mismatch
    setRedTokens(Array.from({ length: 40 }).map(() => 0.2 + Math.random() * 0.4));
    setGreenTokens(Array.from({ length: 12 }).map(() => 0.4 + Math.random() * 0.4));
  }, []);

  return (
    <section className="section-space relative overflow-hidden">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--cyan-accent)] font-medium">
            Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Before & <span className="gradient-text">After</span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Traditional — Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 md:p-8 relative overflow-hidden group"
            style={{ borderColor: "rgba(239, 68, 68, 0.15)" }}
          >
            {/* Red tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-red-400">
                  Traditional Browser Automation
                </span>
              </div>

              {/* Token visualization - messy */}
              <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.05)] border border-red-500/10">
                <div className="flex flex-wrap gap-1 min-h-[30px]">
                  {redTokens.map((opacity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                      className="w-2 h-2 rounded-sm"
                      style={{
                        background: `rgba(239, 68, 68, ${opacity})`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-red-400/60 mt-2">~10,000 tokens</div>
              </div>

              <ul className="space-y-3">
                {leftItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* MCP — Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 md:p-8 relative overflow-hidden group"
            style={{ borderColor: "rgba(0, 255, 179, 0.15)" }}
          >
            {/* Green tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[var(--success-green)]" />
                <span className="text-sm font-semibold text-[var(--success-green)]">
                  With Browser Optimizer MCP
                </span>
              </div>

              {/* Token visualization - clean */}
              <div className="mb-6 p-4 rounded-xl bg-[rgba(0,255,179,0.03)] border border-[var(--success-green)]/10">
                <div className="flex flex-wrap gap-1 min-h-[30px]">
                  {greenTokens.map((opacity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 + 0.5 }}
                      className="w-2 h-2 rounded-sm bg-[var(--success-green)]"
                      style={{ opacity }}
                    />
                  ))}
                </div>
                <div className="text-xs text-[var(--success-green)]/60 mt-2">~3,000 tokens</div>
              </div>

              <ul className="space-y-3">
                {rightItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.4 }}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--success-green)] mt-0.5 shrink-0">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
