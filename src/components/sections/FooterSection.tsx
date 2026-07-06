"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GITHUB_URL } from "@/lib/constants";

export default function FooterSection() {
  const [stars, setStars] = useState<Array<{ left: string; top: string; opacity: number; animDuration: string; animDelay: string }>>([]);

  useEffect(() => {
    // Generate random stars on the client only to prevent hydration mismatch
    setStars(
      Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.1,
        animDuration: `${3 + Math.random() * 4}s`,
        animDelay: `${Math.random() * 5}s`,
      }))
    );
  }, []);

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-30" />

      {/* Animated stars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-px h-px rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animation: `pulse-glow ${star.animDuration} ease-in-out infinite`,
              animationDelay: star.animDelay,
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready to <span className="gradient-text">optimize</span>?
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Join developers building faster, leaner AI-powered browser automation.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#docs" className="btn-primary text-sm">
              Get Started
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
          {[
            { label: "Documentation", href: "#docs" },
            { label: "GitHub", href: GITHUB_URL, external: true },
            { label: "Features", href: "#features" },
            { label: "Architecture", href: "#architecture" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={"external" in link ? "_blank" : undefined}
              rel={"external" in link ? "noopener noreferrer" : undefined}
              className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-glass)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--primary-blue)] to-[var(--cyan-accent)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-xs text-[var(--text-tertiary)]">
              Browser Optimizer MCP
            </span>
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} Browser Optimizer MCP. Open Source.
          </span>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-tertiary)] hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
