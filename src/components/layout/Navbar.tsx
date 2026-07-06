import { motion } from 'framer-motion';

export type TabId = 'home' | 'product' | 'resources' | 'pricing';

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'resources', label: 'Resources' },
  { id: 'pricing', label: 'Pricing' },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[rgba(10,10,11,0.6)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 rounded bg-[var(--color-accent-purple)] flex items-center justify-center">
            <span className="text-white font-bold tracking-tighter font-geist">BO</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white font-geist hidden sm:block">
            Browser Optimizer MCP
          </span>
        </div>

        {/* Tab Router */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[var(--color-surface-elevated)] rounded border border-[var(--color-border-subtle)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
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

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-mono text-[var(--color-text-secondary)] hover:text-white transition-colors hidden sm:block">
            GitHub
          </a>
          <button 
            type="button" 
            className="px-4 py-1.5 text-sm font-medium bg-[var(--color-accent-purple)] text-white rounded hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
