"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { METRICS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

function AnimatedCounter({
  value,
  suffix,
  duration = 2000,
  startCounting,
}: {
  value: number;
  suffix: string;
  duration?: number;
  startCounting: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    if (!startCounting || hasCountedRef.current) return;
    hasCountedRef.current = true;

    const startTime = performance.now();
    const isDecimal = value % 1 !== 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * value;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [startCounting, value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section id="metrics" className="section-space relative">
      <div className="container-main" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--primary-blue)] font-medium">
            Performance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Numbers that <span className="gradient-text">speak</span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 text-center group"
            >
              {/* Glow circle */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${metric.color}15 0%, transparent 70%)`,
                }}
              />

              <div
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 relative"
                style={{
                  color: metric.color,
                  textShadow: `0 0 30px ${metric.color}40, 0 0 60px ${metric.color}20`,
                }}
              >
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  startCounting={isInView}
                />
              </div>
              <div className="text-sm md:text-base font-semibold text-white mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-[var(--text-tertiary)]">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
