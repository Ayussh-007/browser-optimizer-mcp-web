"use client";

import { motion } from "framer-motion";
import {
  Minimize2,
  Layers,
  GitBranch,
  Zap,
  Monitor,
  TrendingDown,
  Clock,
  Code,
  Package,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Minimize2,
  Layers,
  GitBranch,
  Zap,
  Monitor,
  TrendingDown,
  Clock,
  Code,
  Package,
};

export default function FeaturesSection() {
  return (
    <section id="features" className="section-space relative">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--success-green)] font-medium">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Everything you <span className="gradient-text">need</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto text-sm sm:text-base">
            A complete optimization layer designed for modern AI-powered browser automation.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass-card p-6 md:p-7 group cursor-default relative overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 0%, rgba(79,124,255,0.06) 0%, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    style={{ boxShadow: "0 4px 20px -4px rgba(79,124,255,0.3)" }}
                  >
                    {Icon && <Icon size={18} className="text-white" />}
                  </div>

                  <h3 className="text-base font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
