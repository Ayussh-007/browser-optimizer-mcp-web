import { motion } from 'framer-motion';

const FOOTER_LINKS = {
  product: [
    { label: 'Documentation', href: '#' },
    { label: 'Examples', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Support', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
  ]
};

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

const Column = ({ title, links, delay }: { title: string, links: { label: string, href: string }[], delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className="flex flex-col gap-3"
  >
    <h4 className="text-sm font-semibold text-white font-geist mb-2">{title}</h4>
    <ul className="flex flex-col gap-2.5">
      {links.map((link, i) => (
        <li key={i}>
          <a 
            href={link.href} 
            className="text-[13px] text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-accent-purple)] transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#070708] border-t border-[var(--color-border-subtle)] pt-20 pb-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
        
        {/* Brand Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="col-span-2 lg:col-span-2 pr-8"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-semibold text-base tracking-tight text-white font-geist uppercase tracking-widest text-xs">
              MCP <span className="text-[#6C63FF]">Optimizer</span>
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
            The performance layer for browser agents. Reduce tokens, slash latency, and execute automated interactions natively.
          </p>
        </motion.div>

        {/* Links Columns */}
        <Column title="Product" links={FOOTER_LINKS.product} delay={0.1} />
        <Column title="Resources" links={FOOTER_LINKS.resources} delay={0.2} />
        <Column title="Company" links={FOOTER_LINKS.company} delay={0.3} />

        {/* Subscribe Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="col-span-2 lg:col-span-1 min-w-[240px]"
        >
          <h4 className="text-sm font-semibold text-white font-geist mb-3">Stay in the loop</h4>
          <p className="text-[12px] text-[var(--color-text-secondary)] mb-4 leading-relaxed">
            Get updates on releases and performance tips.
          </p>
          <form className="relative group">
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-[#0C0C0E] border border-[var(--color-border-subtle)] rounded pl-3 pr-10 py-2 text-sm text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-[#6C63FF]/20 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
          
          <div className="flex items-center gap-2.5 mt-6">
            <SocialIcon href="https://github.com" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>} />
            <SocialIcon href="https://twitter.com" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>} />
            <SocialIcon href="https://discord.com" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 5.5a14 14 0 0 0-5.5-2 15 15 0 0 0-1 2 15 15 0 0 0-6 0 15 15 0 0 0-1-2 14 14 0 0 0-5.5 2C-2 15.5 2 21.5 5 22.5a14 14 0 0 0 5-2l-.5-1.5c-1.5.5-3 .5-4-1.5 1-.5 2-.5 3 0l1-2a14 14 0 0 0 6 0l1 2c1 .5 2 .5 3 0-1 2-2.5 2-4 1.5l-.5 1.5a14 14 0 0 0 5 2c3-1 7-7 2-17z"/></svg>} />
            <SocialIcon href="https://linkedin.com" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>} />
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t border-[#1C1C20] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest uppercase">
          © 2026 MCP Optimizer. All rights reserved.
        </p>
        <p className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest flex items-center gap-1.5">
          Built with kinetic precision. <span className="text-[#6C63FF]">♡</span>
        </p>
      </motion.div>
    </footer>
  );
}
