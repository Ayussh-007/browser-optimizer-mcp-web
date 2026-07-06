import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

export default function PricingTab({ setActiveTab }: { setActiveTab?: (tab: 'home' | 'product' | 'resources' | 'pricing') => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('pip install browser-optimizer-mcp');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col items-center relative py-12 md:py-16">
      
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
        {/* Radial glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#6C63FF]/[0.05] blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-[700px] mx-auto px-6 w-full flex flex-col items-center relative z-10"
      >
        
        {/* ─── Header ─── */}
        <div className="text-center mb-8">
          <h1 className="font-geist text-3xl md:text-4xl font-[800] tracking-tight mb-3 text-white">
            Simple, transparent pricing
          </h1>
          <p className="text-[#B8BBC6] text-base max-w-[600px] mx-auto leading-relaxed">
            <span className="text-white font-medium">100% Free & Open Source.</span> Built for developers, researchers, and AI browser agents.
          </p>
        </div>

        {/* ─── Open Source Card ─── */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 12px 40px -15px rgba(108,99,255,0.15)' }}
          className="w-full bg-[#0A0A0B]/60 backdrop-blur-xl border border-[var(--color-border-subtle)] rounded-[18px] p-8 md:p-10 text-center relative overflow-hidden group transition-all duration-300"
        >
          {/* Subtle Inner Glow on Hover */}
          <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(108,99,255,0.3)' }} />
          
          <div className="flex flex-col items-center justify-center gap-1 mb-6">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-geist text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                $0
              </span>
              <span className="text-[#6C63FF] font-medium tracking-widest uppercase text-xs md:text-sm font-mono">
                Forever Free
              </span>
            </div>
          </div>

          <p className="text-[#8A8FA0] text-sm leading-relaxed mb-6">
            Browser Optimizer MCP is completely free and open source.
          </p>
          
          {/* Inline Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#8A8FA0] mb-8">
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-[#6C63FF]" /> MIT Licensed</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)]" />
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-[#6C63FF]" /> Open Source</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)]" />
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-[#6C63FF]" /> Community Driven</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            {/* Install Command Box */}
            <motion.div
              whileHover={{ boxShadow: '0 4px 20px rgba(108,99,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="flex items-center justify-between bg-[#111113] hover:bg-[#16161A] border border-[var(--color-border-subtle)] hover:border-[#6C63FF]/40 rounded-lg p-1.5 pl-4 w-full max-w-[340px] cursor-pointer transition-all duration-300 group/btn"
            >
              <span className="font-mono text-[13px] text-[#B8BBC6] group-hover/btn:text-white transition-colors">
                pip install browser-optimizer-mcp
              </span>
              <div className="w-8 h-8 rounded-md bg-[#1C1C20] group-hover/btn:bg-[#6C63FF] flex items-center justify-center text-[#8A8FA0] group-hover/btn:text-white transition-colors duration-300 ml-3">
                {copied ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Check size={14} className="text-white" />
                  </motion.span>
                ) : (
                  <Copy size={14} />
                )}
              </div>
            </motion.div>

            {/* Documentation Link */}
            <button
              onClick={() => setActiveTab?.('resources')}
              className="group text-[13px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-2"
            >
              View Documentation
              <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100">
                →
              </motion.span>
            </button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
