import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, formatter }: { value: number; formatter?: (v: number) => string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value]);

  return <>{formatter ? formatter(displayValue) : Math.round(displayValue).toLocaleString()}</>;
}

// ─── Glowing Slider Input ────────────────────────────────────────────────────
function RangeSlider({
  value, min, max, step, onChange, color = 'var(--color-accent-purple)'
}: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
  color?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <input 
      type="range" 
      min={min} max={max} step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-transparent appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, var(--color-surface-level2) ${percentage}%, var(--color-surface-level2) 100%)`,
        height: '6px',
        borderRadius: '3px',
      }}
    />
  );
}

export default function RoiCalculator() {
  const [baselineTokens, setBaselineTokens] = useState(150); // in thousands
  const [agentSteps, setAgentSteps] = useState(15);
  const [costPerMillion, setCostPerMillion] = useState(2.50);

  // Math logic simulating optimization (94.6% reduction)
  const optimizedTokens = baselineTokens * 0.054; 
  
  const standardMonthlyTokens = (baselineTokens * 1000) * agentSteps * 10000; // Assuming 10k sessions/mo
  const optimizedMonthlyTokens = (optimizedTokens * 1000) * agentSteps * 10000;
  
  const standardCost = (standardMonthlyTokens / 1_000_000) * costPerMillion;
  const optimizedCost = (optimizedMonthlyTokens / 1_000_000) * costPerMillion;
  const savings = standardCost - optimizedCost;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full max-w-5xl mx-auto mt-16 mb-16 flex flex-col items-center relative z-10"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent-purple)] opacity-[0.03] blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 text-[var(--color-accent-purple)] mb-4"
        >
          <span className="opacity-50">✨</span>
          <h2 className="font-geist text-3xl font-bold tracking-tight text-white">Calculate your <span className="text-[var(--color-accent-purple)]">savings</span></h2>
          <span className="opacity-50">✨</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-[var(--color-text-secondary)] font-mono text-sm tracking-wide"
        >
          Simulate efficiency gains based on your typical agent workloads.
        </motion.p>
      </div>

      <motion.div 
        initial={{ scale: 0.98 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full grid lg:grid-cols-2 gap-12 bg-[#0A0A0B]/80 backdrop-blur-md border border-[var(--color-border-subtle)] rounded-xl p-8 lg:p-12 shadow-2xl relative"
      >
        {/* Controls */}
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-text-secondary)] tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded border border-[#6C63FF]/30 text-[#6C63FF] flex items-center justify-center bg-[#6C63FF]/10">T</span> 
                BASELINE TOKENS (PER PAGE)
              </span>
              <span className="text-[var(--color-accent-purple)] font-bold text-sm">
                <AnimatedCounter value={baselineTokens} />k
              </span>
            </div>
            <RangeSlider min={10} max={500} step={10} value={baselineTokens} onChange={setBaselineTokens} color="#6C63FF" />
            <div className="flex justify-between text-[10px] text-[#8A8FA0] font-mono opacity-50">
              <span>10k</span>
              <span>500k</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-text-secondary)] tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded border border-[#34D399]/30 text-[#34D399] flex items-center justify-center bg-[#34D399]/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><path d="M20 12h-4v-4"/><path d="M4 16h4v4"/><path d="M16 20v-4h4"/><path d="M14 14l-4-4"/><path d="M10 14l4-4"/></svg>
                </span> 
                AGENT STEPS (PER SESSION)
              </span>
              <span className="text-[#34D399] font-bold text-sm">
                <AnimatedCounter value={agentSteps} />
              </span>
            </div>
            <RangeSlider min={1} max={100} step={1} value={agentSteps} onChange={setAgentSteps} color="#34D399" />
            <div className="flex justify-between text-[10px] text-[#8A8FA0] font-mono opacity-50">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-text-secondary)] tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded border border-[#FBBF24]/30 text-[#FBBF24] flex items-center justify-center bg-[#FBBF24]/10">$</span> 
                COST PER 1M TOKENS ($)
              </span>
              <span className="text-[#FBBF24] font-bold text-sm">
                $<AnimatedCounter value={costPerMillion} formatter={(v) => v.toFixed(2)} />
              </span>
            </div>
            <RangeSlider min={0.10} max={10} step={0.10} value={costPerMillion} onChange={setCostPerMillion} color="#FBBF24" />
            <div className="flex justify-between text-[10px] text-[#8A8FA0] font-mono opacity-50">
              <span>$0.10</span>
              <span>$10.00</span>
            </div>
          </div>
        </div>

        {/* Results output */}
        <motion.div 
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center bg-[#0C0C0E] border border-[var(--color-border-subtle)] rounded-xl p-8 relative overflow-hidden group shadow-xl"
        >
          {/* Animated glow border */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 40px rgba(52,211,153,0.05)' }} />
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-30" 
          />
          
          <span className="px-3 py-1 rounded-sm bg-[#102A20] border border-[#14332A] text-[#34D399] text-[10px] font-mono tracking-widest mb-6">ESTIMATED SAVINGS/MO</span>
          <h3 className="font-geist text-5xl lg:text-6xl font-bold tracking-tighter text-[#34D399] mb-2 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            $<AnimatedCounter value={savings} formatter={(v) => Math.round(v).toLocaleString()} />
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm mb-10">est. monthly savings (10k sessions/mo)</p>

          <div className="w-full grid grid-cols-2 gap-4 border-t border-[var(--color-border-subtle)] pt-8 relative z-10">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--color-text-primary)] font-geist">
                <AnimatedCounter value={standardMonthlyTokens / 1_000_000} formatter={(v) => Math.round(v).toLocaleString()} />M
              </div>
              <div className="text-[9px] text-[#8A8FA0] font-mono tracking-widest mt-1.5 flex items-center justify-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                STANDARD TOKENS
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#34D399] font-geist">
                <AnimatedCounter value={optimizedMonthlyTokens / 1_000_000} formatter={(v) => v.toFixed(1)} />M
              </div>
              <div className="text-[9px] text-[#8A8FA0] font-mono tracking-widest mt-1.5 flex items-center justify-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                OPTIMIZED TOKENS
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
