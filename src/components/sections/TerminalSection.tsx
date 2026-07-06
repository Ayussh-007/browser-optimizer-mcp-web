"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TERMINAL_LINES } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

export default function TerminalSection() {
  const { ref, isInView } = useInView(0.3);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Reveal lines one by one with delays
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
    });

    // Typing animation for the first command
    const commandText = TERMINAL_LINES[0].text;
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      charIdx++;
      setTypingIndex(charIdx);
      if (charIdx >= commandText.length) {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isInView]);

  return (
    <section className="section-space relative">
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
            In Action
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            See it <span className="gradient-text">live</span>
          </h2>
        </motion.div>

        {/* Terminal */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="rounded-2xl overflow-hidden border border-[var(--border-glass)]"
            style={{
              background: "linear-gradient(180deg, rgba(11,16,35,0.95) 0%, rgba(5,8,22,0.98) 100%)",
              boxShadow:
                "0 0 60px -20px rgba(79,124,255,0.15), 0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-glass)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-[var(--text-tertiary)] font-mono">
                  browser-optimizer-mcp
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-5 md:p-6 font-mono text-sm leading-7 min-h-[380px]">
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
                if (line.type === "command") {
                  const displayText =
                    i === 0 ? line.text.slice(0, typingIndex) : line.text;
                  return (
                    <div key={i} className="text-[var(--cyan-accent)]">
                      {displayText}
                      {i === 0 && typingIndex < line.text.length && (
                        <span
                          className="inline-block w-2 h-4 ml-0.5 align-middle"
                          style={{
                            background: "var(--cyan-accent)",
                            animation: "blink 1s step-end infinite",
                          }}
                        />
                      )}
                    </div>
                  );
                }

                if (line.type === "success") {
                  return (
                    <div key={i} className="text-[var(--success-green)] font-semibold">
                      {line.text}
                    </div>
                  );
                }

                if (line.type === "header") {
                  return (
                    <div key={i} className="text-white font-semibold text-base mt-2">
                      {line.text}
                    </div>
                  );
                }

                if (line.type === "metric") {
                  const val = "value" in line ? line.value : 0;
                  const suffix =
                    "suffix" in line && line.suffix
                      ? line.suffix
                      : `${val}% Reduction`;

                  return (
                    <div key={i} className="flex items-center gap-3 my-1">
                      <span className="text-[var(--text-secondary)] w-32 shrink-0">
                        {line.text}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${val}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--primary-blue), var(--cyan-accent))",
                          }}
                        />
                      </div>
                      <span className="text-xs text-[var(--cyan-accent)] w-24 text-right">
                        {suffix}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={i} className="text-[var(--text-secondary)]">
                    {line.text || "\u00A0"}
                  </div>
                );
              })}

              {/* Blinking cursor at end */}
              {visibleLines >= TERMINAL_LINES.length && (
                <div className="mt-2 text-[var(--text-secondary)]">
                  ${" "}
                  <span
                    className="inline-block w-2 h-4 ml-0.5 align-middle"
                    style={{
                      background: "var(--cyan-accent)",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
