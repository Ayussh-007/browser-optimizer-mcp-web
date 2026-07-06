import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import RoiCalculator from '../ui/RoiCalculator';
import AnimatedCodePanel from '../ui/AnimatedCodePanel';
import { Filter, Database, Layers, BrainCircuit, Check, Copy } from 'lucide-react';

const FEATURES = [
  {
    icon: <Filter size={20} className="text-[var(--color-accent-purple)]" />,
    title: 'Smart Extraction',
    desc: 'Heuristic-based filtering of non-interactive elements, scripts, and decorative CSS containers.'
  },
  {
    icon: <Database size={20} className="text-[var(--color-accent-purple)]" />,
    title: 'Semantic Caching',
    desc: 'Store structured representations of pages to avoid recalculating identical UI components.'
  },
  {
    icon: <Layers size={20} className="text-[var(--color-accent-purple)]" />,
    title: 'Delta Diffing',
    desc: 'Only transmit state changes to the LLM, reducing context window exhaustion on long sessions.'
  },
  {
    icon: <BrainCircuit size={20} className="text-[var(--color-accent-purple)]" />,
    title: 'Classification',
    desc: 'Automated role assignment for UI widgets using machine learning classification headers.'
  }
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
  const { displayed: typedText, done: typingDone } = useTypewriter('browser agents.', 75, 800);

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
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-[#5E6AD2]/[0.04] blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#5E6AD2]/[0.03] blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.025]" />
        {/* Floating particles */}
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-white/[0.06]"
          style={{ top: '20%', left: '15%' }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white/[0.04]"
          style={{ top: '60%', left: '70%' }}
          animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-[#5E6AD2]/[0.08]"
          style={{ top: '40%', left: '50%' }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ─── Hero Section ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: badgeDelay, ease: 'easeOut' }}
            className="inline-flex items-center justify-center px-2 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-[10px] font-mono font-medium tracking-wide mb-8"
          >
            v0.1.2 NOW STABLE
          </motion.div>

          {/* Headline with typewriter */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-geist text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            The performance layer for{' '}
            <span className="text-[var(--color-accent-purple)]">
              {typedText}
              <TypewriterCursor />
            </span>
          </motion.h1>

          {/* Subtitle — fades up after typing */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: subtitleDelay, ease: 'easeOut' }}
            className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto lg:mx-0"
          >
            Eliminate up to 94% of unnecessary HTML markup, reduce latency to milliseconds, and slash LLM token costs with automated DOM pruning.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: buttonsDelay, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            {/* Install command */}
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(94,106,210,0.1)' }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded pl-4 pr-2 py-1.5 w-full sm:w-80 hover:border-[var(--color-accent-purple)]/30 transition-colors duration-250"
            >
              <span className="font-mono text-xs text-[var(--color-text-primary)] select-all">pip install browser-optimizer-mcp</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] transition-all duration-200 border border-[var(--color-border-subtle)] cursor-pointer"
                title="Copy package command"
              >
                {copied ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Check size={12} className="text-[#4ADE80]" />
                  </motion.span>
                ) : (
                  <Copy size={12} className="text-[var(--color-text-secondary)]" />
                )}
              </button>
            </motion.div>

            {/* Documentation button */}
            <motion.button
              onClick={() => setActiveTab?.('resources')}
              whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(94,106,210,0.08)' }}
              transition={{ duration: 0.25 }}
              className="group px-6 py-2.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-sm font-medium hover:bg-[var(--color-surface-level2)] hover:border-[var(--color-accent-purple)]/30 transition-all duration-250 flex items-center gap-2 cursor-pointer text-white"
            >
              Read Documentation
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 0 }}
              >
                <span className="inline-block transition-transform duration-250 group-hover:translate-x-1">→</span>
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Visual — Animated Code Panel */}
        <div className="flex-1 w-full relative hidden md:block">
          <AnimatedCodePanel />
        </div>
      </div>

      {/* ─── Feature Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative z-10">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
            className="p-6 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] hover:border-[var(--color-accent-purple)]/20 transition-all duration-250 flex flex-col cursor-default"
          >
            <div className="w-8 h-8 rounded bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="font-bold text-sm mb-2">{feature.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ─── ROI Calculator ─── */}
      <RoiCalculator />
    </div>
  );
}
