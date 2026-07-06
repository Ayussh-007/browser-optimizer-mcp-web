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
    <div className="w-full flex-1 flex flex-col items-center relative py-16">
      
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6C63FF]/[0.05] blur-[120px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />
        {/* Floating particles */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#6C63FF]/[0.1]"
          style={{ top: '20%', left: '30%' }}
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-[#FFFFFF]/[0.1]"
          style={{ top: '70%', left: '75%' }}
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-[#6C63FF]/[0.08]"
          style={{ top: '80%', left: '25%' }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center relative z-10">
        
        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto"
          >
            <span className="text-white font-medium">100% Free & Open Source.</span> Built for developers, researchers, and AI browser agents.
          </motion.p>
        </div>

        {/* ─── Open Source Card ─── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          whileHover={{ y: -4, boxShadow: '0 20px 60px -15px rgba(108,99,255,0.15)' }}
          className="w-full max-w-2xl bg-[#0A0A0B]/60 backdrop-blur-xl border border-[var(--color-border-subtle)] rounded-[20px] p-10 md:p-14 text-center relative overflow-hidden group transition-all duration-300"
        >
          {/* Subtle Inner Glow on Hover */}
          <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(108,99,255,0.3)' }} />
          
          <div className="inline-flex items-center justify-center px-3 py-1 rounded bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-[11px] font-mono font-medium tracking-widest uppercase mb-8 shadow-sm">
            Open Source
          </div>

          <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-md mx-auto">
            Browser Optimizer MCP is completely free to use, modify, and contribute to.
          </p>

          <div className="mb-8 flex flex-col items-center">
            <span className="font-geist text-7xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              $0
            </span>
            <span className="text-[#6C63FF] font-medium tracking-widest uppercase text-sm mt-3 font-mono">
              Forever Free
            </span>
          </div>

          <p className="text-[#8A8FA0] text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-10">
            No subscriptions.<br />No hidden costs.<br />Install locally and start optimizing your browser agents in seconds.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            {/* Install Button */}
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(108,99,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="flex flex-col items-center bg-[#6C63FF] hover:bg-[#5b54d6] text-white rounded-xl p-4 w-full max-w-[320px] cursor-pointer transition-all duration-300 border border-[#6C63FF]/50 group/btn relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              
              <span className="font-semibold text-[15px] mb-2 flex items-center gap-2 relative z-10">
                {copied ? 'Copied!' : 'Install with pip'}
                {copied ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Check size={16} />
                  </motion.span>
                ) : (
                  <Copy size={16} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                )}
              </span>
              <span className="font-mono text-[11px] text-white/80 tracking-wide relative z-10">pip install browser-optimizer-mcp</span>
            </motion.div>

            {/* Documentation Link */}
            <motion.button
              onClick={() => setActiveTab?.('resources')}
              className="group text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-2"
            >
              View Documentation
              <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100">
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* ─── Bottom Note ─── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-[12px] font-mono text-[#8A8FA0]"
        >
          <span className="hover:text-white transition-colors cursor-default">MIT Licensed</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)]" />
          <span className="hover:text-white transition-colors cursor-default">Community Driven</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)]" />
          <span className="hover:text-white transition-colors cursor-default">Contributions Welcome</span>
        </motion.div>

      </div>
    </div>
  );
}
