"use client";

import { motion } from "framer-motion";
import { COMPATIBILITY } from "@/lib/constants";

export default function CompatibilitySection() {
  // Double the items for infinite marquee
  const doubled = [...COMPATIBILITY, ...COMPATIBILITY];

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
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-medium">
            Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Works with <span className="gradient-text">everything</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Seamless integration with the tools and frameworks you already use.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <div
            className="flex gap-4 py-4"
            style={{ animation: "marquee 40s linear infinite" }}
          >
            {doubled.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="glass-card px-6 py-4 flex flex-col items-center justify-center min-w-[140px] group cursor-default"
              >
                <div className="text-sm font-semibold text-white mb-1 whitespace-nowrap">
                  {item.name}
                </div>
                <div className="text-xs text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
