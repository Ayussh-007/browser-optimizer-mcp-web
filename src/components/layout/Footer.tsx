import { motion } from 'framer-motion';
import { type TabId } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
}

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.15, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-level2)] transition-colors border border-[var(--color-border-subtle)]"
  >
    {icon}
  </motion.a>
);

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="w-full bg-[#070708] border-t border-[var(--color-border-subtle)] pt-16 pb-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8">

        {/* Brand & Quote Column (Left Side) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="md:col-span-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="font-semibold text-xs tracking-widest text-white font-geist uppercase">
                Browser <span className="text-[#6C63FF]">Optimizer MCP</span>
              </span>
            </div>
            <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed max-w-sm mb-6">
              The high-performance DOM pruning layer built specifically for LLM and browser agents.
            </p>
          </div>

          {/* Inspirational / Tech Quote */}
          <div className="border-l-2 border-[#6C63FF]/40 pl-4 py-1.5 my-2">
            <p className="text-xs italic text-[var(--color-text-secondary)] font-light leading-relaxed">
              "The most efficient DOM structure is the one that was never parsed. Simplify the environment, and the intelligence will follow."
            </p>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#6C63FF] mt-1.5">
              — Browser Optimizer MCP Team
            </span>
          </div>
        </motion.div>

        {/* Links Column (Right Side - Navigation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="md:col-span-3 md:col-start-8 flex flex-col gap-3"
        >
          <h4 className="text-xs font-mono font-semibold tracking-wider text-white uppercase mb-2">Navigation</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: 'Home', action: () => setActiveTab('home') },
              { label: 'Product', action: () => setActiveTab('product') },
              { label: 'Documentation', action: () => setActiveTab('resources') },
              { label: 'Pricing', action: () => setActiveTab('pricing') },
            ].map((link, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={link.action}
                  className="text-[13px] text-[var(--color-text-secondary)] hover:text-white transition-colors relative group cursor-pointer text-left"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-accent-purple)] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Ecosystem Column (Right Side - GitHub / Community) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-2 md:col-start-11 flex flex-col gap-3"
        >
          <h4 className="text-xs font-mono font-semibold tracking-wider text-white uppercase mb-2">Ecosystem</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="https://github.com/Manthan-Railkar/browser-optimizer-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
              >
                GitHub Repository
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-accent-purple)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-2.5 mt-4">
            <SocialIcon href="https://github.com/Manthan-Railkar/browser-optimizer-mcp" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>} />
            <SocialIcon href="https://discord.com" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 5.5a14 14 0 0 0-5.5-2 15 15 0 0 0-1 2 15 15 0 0 0-6 0 15 15 0 0 0-1-2 14 14 0 0 0-5.5 2C-2 15.5 2 21.5 5 22.5a14 14 0 0 0 5-2l-.5-1.5c-1.5.5-3 .5-4-1.5 1-.5 2-.5 3 0l1-2a14 14 0 0 0 6 0l1 2c1 .5 2 .5 3 0-1 2-2.5 2-4 1.5l-.5 1.5a14 14 0 0 0 5 2c3-1 7-7 2-17z" /></svg>} />
          </div>
        </motion.div>

      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#1C1C20] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest uppercase">
          © 2026 Browser Optimizer. All rights reserved.
        </p>
        <p className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest flex items-center gap-1.5">
          Built for agents. <span className="text-[#6C63FF]">♡</span>
        </p>
      </motion.div>
    </footer>
  );
}
