import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import RoiCalculator from '../ui/RoiCalculator';
import AnimatedCodePanel from '../ui/AnimatedCodePanel';
import { Filter, Database, Layers, BrainCircuit, Check, Copy, Zap, Clock, Code2, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: <Filter size={20} className="text-[#6C63FF] transition-transform duration-300 group-hover:scale-110" />,
    title: 'Smart Extraction',
    desc: 'Heuristic-based filtering of non-interactive elements, scripts, and decorative CSS containers.'
  },
  {
    icon: <Database size={20} className="text-[#6C63FF] transition-transform duration-300 group-hover:scale-110" />,
    title: 'Semantic Caching',
    desc: 'Store structured representations of pages to avoid recalculating identical UI components.'
  },
  {
    icon: <Layers size={20} className="text-[#6C63FF] transition-transform duration-300 group-hover:scale-110" />,
    title: 'Delta Diffing',
    desc: 'Only transmit state changes to the LLM, reducing context window exhaustion on long sessions.'
  },
  {
    icon: <BrainCircuit size={20} className="text-[#6C63FF] transition-transform duration-300 group-hover:scale-110" />,
    title: 'Classification',
    desc: 'Automated role assignment for UI widgets using machine learning classification headers.'
  }
];

const BADGES = [
  { icon: <Zap size={14} className="text-[#6C63FF]" />, label: 'Reduce token usage up to 94%' },
  { icon: <Clock size={14} className="text-[#34D399]" />, label: 'Lower latency to milliseconds' },
  { icon: <Code2 size={14} className="text-[#FBBF24]" />, label: 'Slash LLM inference costs' },
  { icon: <ShieldCheck size={14} className="text-[#38BDF8]" />, label: 'Built for scale. Trusted in prod.' },
];

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(text: string, speed: number = 70, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      const type = () => {
        if (idx < text.length) {
          idx++;
          setDisplayed(text.slice(0, idx));
          timer = setTimeout(type, speed + Math.random() * 40);
        } else {
          setDone(true);
        }
      };
      type();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ─── Blinking Cursor ─────────────────────────────────────────────────────────
function TypewriterCursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[0.9em] bg-[var(--color-accent-purple)] ml-[2px] align-middle rounded-sm"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'steps(2)' as unknown as undefined }}
    />
  );
}

export default function HomeTab({ setActiveTab }: { setActiveTab?: (tab: 'home' | 'product' | 'resources' | 'pricing') => void }) {
  const [copied, setCopied] = useState(false);
  const { displayed: typedText, done: typingDone } = useTypewriter('agentic efficiency', 75, 800);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('pip install browser-optimizer-mcp');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Sequence delays (seconds)
  const badgeDelay = 0.1;
  const subtitleDelay = typingDone ? 0 : 99; // only show after typing
  const buttonsDelay = typingDone ? 0.25 : 99;

  return (
    <div className="w-full flex-1 flex flex-col relative">
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#6C63FF]/[0.035] blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#6C63FF]/[0.03] blur-[120px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />
        {/* Floating particles */}
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-[#FFFFFF]/[0.05]"
          style={{ top: '15%', left: '20%' }}
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#FFFFFF]/[0.03]"
          style={{ top: '70%', left: '80%' }}
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-[#6C63FF]/[0.08]"
          style={{ top: '45%', left: '30%' }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ─── Hero Section ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: badgeDelay, ease: 'easeOut' }}
            className="inline-flex items-center justify-center px-2 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-[10px] font-mono font-medium tracking-widest uppercase mb-8 shadow-sm"
          >
            v0.1.2 NOW STABLE
          </motion.div>

          {/* Headline with typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-geist text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] text-white"
          >
            Engineered for{' '}
            <span className="text-[var(--color-accent-purple)] block sm:inline">
              {typedText}
              <TypewriterCursor />
            </span>
          </motion.h1>

          {/* Subtitle — fades up after typing */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: subtitleDelay, ease: 'easeOut' }}
            className="text-[17px] md:text-[19px] font-light text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Eliminate up to <span className="text-white font-medium">94% of unnecessary HTML markup</span>, reduce latency to milliseconds, and slash LLM inference costs with automated DOM pruning.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: buttonsDelay, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            {/* Install command */}
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(108,99,255,0.12)' }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded-lg pl-4 pr-1.5 py-1.5 w-full sm:w-[340px] hover:border-[#6C63FF]/40 transition-colors duration-300 group"
            >
              <span className="font-mono text-[13px] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors select-all">pip install browser-optimizer</span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-md bg-[var(--color-surface-elevated)] hover:bg-[#6C63FF] hover:text-white hover:border-[#6C63FF] transition-all duration-300 border border-[var(--color-border-subtle)] cursor-pointer text-[var(--color-text-secondary)]"
                title="Copy package command"
              >
                {copied ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Check size={14} className="text-white" />
                  </motion.span>
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </motion.div>

            {/* Documentation button */}
            <motion.button
              onClick={() => setActiveTab?.('resources')}
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(108,99,255,0.08)' }}
              transition={{ duration: 0.25 }}
              className="group px-7 py-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[15px] font-medium hover:bg-[var(--color-surface-level2)] hover:border-[#6C63FF]/30 transition-all duration-300 flex items-center gap-2 cursor-pointer text-white shadow-sm"
            >
              Read Docs
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 0 }}
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100">→</span>
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Visual — Animated Code Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 w-full relative hidden md:block"
        >
          <AnimatedCodePanel />
        </motion.div>
      </div>

      {/* ─── Feature Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8 relative z-10">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
            className="group relative p-7 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] hover:bg-[#111113] transition-all duration-300 flex flex-col cursor-default overflow-hidden"
          >
            {/* Hover Glow Border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 0 1px rgba(108,99,255,0.4)' }} />
            
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-6 relative group-hover:border-[#6C63FF]/30 transition-colors duration-300">
              <div className="absolute inset-0 bg-[#6C63FF] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
              {feature.icon}
            </div>
            <h3 className="font-geist font-bold text-[16px] text-white mb-2">{feature.title}</h3>
            <p className="text-[14px] font-light text-[#8A8FA0] leading-relaxed flex-1">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ─── ROI Calculator ─── */}
      <RoiCalculator />

      {/* ─── Divider Badges Strip ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto w-full px-6 mb-16 relative z-10"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6 border-t border-b border-[var(--color-border-subtle)] bg-[#0C0C0E]/50 backdrop-blur-sm rounded-2xl">
          {BADGES.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
              className="flex items-center gap-2 group cursor-default"
            >
              <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform">
                {badge.icon}
              </div>
              <span className="text-[12px] font-medium text-[var(--color-text-secondary)] group-hover:text-white transition-colors duration-300">
                {badge.label}
              </span>
              {/* Dot Separator */}
              {idx < BADGES.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)] ml-8 hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
