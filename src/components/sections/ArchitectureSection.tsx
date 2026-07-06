"use client";

import { motion } from "framer-motion";
import { ARCHITECTURE_NODES } from "@/lib/constants";
import { Bot, Zap, Monitor, Globe, FileJson, Cpu } from "lucide-react";

const nodeIcons = [Cpu, Zap, Bot, Globe, FileJson, FileJson];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section-space relative overflow-hidden">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[var(--primary-blue)] font-medium">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            A seamless middleware layer that intercepts, analyzes, and compresses browser data before it hits your LLM's context window.
          </p>
        </motion.div>

        {/* Horizontal Pipeline */}
        <div className="relative w-full overflow-x-auto pb-12 pt-4 hide-scrollbar">
          <div className="min-w-[1000px] flex items-center justify-between relative px-4">
            
            {/* Connection Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--border-glass-hover)] to-transparent pointer-events-none" />

            {/* Animated Particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-16 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--primary-blue), transparent)",
                  boxShadow: "0 0 10px var(--primary-blue)",
                }}
                animate={{
                  left: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "linear",
                }}
              />
            ))}

            {/* Nodes */}
            {ARCHITECTURE_NODES.map((node, i) => {
              const isCore = node.id === "mcp";
              const Icon = nodeIcons[i];
              
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col items-center group z-10 ${
                    isCore ? "w-64" : "w-40"
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`
                      relative flex items-center justify-center shrink-0 mb-6 bg-[var(--bg-primary)]
                      transition-transform duration-500 ease-out group-hover:-translate-y-2
                      ${isCore ? 'w-20 h-20 rounded-2xl' : 'w-14 h-14 rounded-xl'}
                    `}
                    style={{
                      border: `1px solid ${isCore ? "rgba(79,124,255,0.4)" : "var(--border-glass-hover)"}`,
                      boxShadow: isCore 
                        ? "0 0 40px -10px rgba(79,124,255,0.2), inset 0 0 20px rgba(79,124,255,0.1)" 
                        : "0 4px 20px -5px rgba(0,0,0,0.4)",
                    }}
                  >
                    {isCore && (
                      <>
                        <div className="absolute inset-0 rounded-2xl border border-[var(--primary-blue)] opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
                      </>
                    )}
                    <Icon
                      size={isCore ? 28 : 20}
                      className={isCore ? "text-[var(--primary-blue)]" : "text-[var(--text-secondary)] group-hover:text-white transition-colors"}
                    />
                  </div>

                  {/* Text Details */}
                  <div className="text-center">
                    <h4 className={`font-semibold mb-1 ${isCore ? 'text-base text-white' : 'text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors'}`}>
                      {node.label}
                    </h4>
                    
                    {/* Description - Fades in on hover for non-core, always visible for core */}
                    <div className={`
                      text-xs text-[var(--text-tertiary)] max-w-[140px] mx-auto leading-relaxed
                      transition-opacity duration-300
                      ${isCore ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 w-48'}
                    `}>
                      {node.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
