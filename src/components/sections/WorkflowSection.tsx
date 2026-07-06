"use client";

import { motion } from "framer-motion";
import { WORKFLOW_STEPS } from "@/lib/constants";

export default function WorkflowSection() {
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
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--primary-blue)] font-medium">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Streamlined <span className="gradient-text">pipeline</span>
          </h2>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connection line — desktop */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--border-glass-hover)] to-transparent">
            {/* Animated flow */}
            <motion.div
              className="absolute top-0 h-full w-20"
              style={{
                background: "linear-gradient(90deg, transparent, var(--cyan-accent), transparent)",
                opacity: 0.6,
              }}
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle */}
                <div className="relative mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor:
                        i === 1
                          ? "rgba(79,124,255,0.3)"
                          : "var(--border-glass)",
                      boxShadow:
                        i === 1
                          ? "0 0 20px rgba(79,124,255,0.2)"
                          : "none",
                    }}
                  >
                    <span className="gradient-text-static">{i + 1}</span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold mb-1">{step.label}</h4>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed max-w-[140px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
