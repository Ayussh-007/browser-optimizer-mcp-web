import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar, { type TabId } from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Placeholder tab components
import HomeTab from './components/tabs/HomeTab';
import ProductTab from './components/tabs/ProductTab';
import ResourcesTab from './components/tabs/ResourcesTab';
import PricingTab from './components/tabs/PricingTab';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'product': return <ProductTab />;
      case 'resources': return <ResourcesTab />;
      case 'pricing': return <PricingTab />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-blue)] selection:text-white flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area with Tab Transitions */}
      <main className={`flex-1 pt-16 flex flex-col relative ${activeTab === 'resources' ? '' : 'overflow-hidden pb-12 pt-24'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {activeTab !== 'resources' && <Footer />}
    </div>
  );
}

export default App;
