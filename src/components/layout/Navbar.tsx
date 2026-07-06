import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export type TabId = 'home' | 'product' | 'resources' | 'pricing';

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'resources', label: 'Docs' },
  { id: 'pricing', label: 'Pricing' },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[rgba(10,10,11,0.7)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleTabClick('home')}
          >
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="font-semibold text-lg tracking-tight text-white font-geist hidden sm:block">
              Browser Optimizer MCP
            </span>
          </div>

          {/* Tab Router (Desktop) */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-[var(--color-surface-elevated)] rounded border border-[var(--color-border-subtle)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded transition-colors cursor-pointer ${isActive ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-tab"
                      className="absolute inset-0 bg-[var(--color-surface-level2)] rounded border border-[var(--color-border-subtle)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Call to Action (Only on Home Page) */}
            {activeTab === 'home' && (
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Manthan-Railkar/browser-optimizer-mcp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-mono text-[var(--color-text-secondary)] hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => handleTabClick('resources')}
                  className="px-4 py-1.5 text-sm font-medium bg-[var(--color-accent-purple)] text-white rounded hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] text-white md:hidden cursor-pointer flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-[var(--color-border-subtle)] bg-[#0A0A0B] p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer text-base ${
                      isActive 
                        ? 'bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-white' 
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-elevated)]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
