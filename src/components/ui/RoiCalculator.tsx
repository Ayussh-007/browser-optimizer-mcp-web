import { useState } from 'react';

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
    <div className="w-full max-w-5xl mx-auto mt-32 mb-24 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="font-geist text-3xl font-bold mb-4 tracking-tight">Calculate your savings</h2>
        <p className="text-[var(--color-text-secondary)]">Simulate efficiency gains based on your typical agent workloads.</p>
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-12 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-lg p-8 lg:p-12">
        {/* Controls */}
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--color-text-secondary)] tracking-wider">
              <span>BASELINE TOKENS (PER PAGE)</span>
              <span className="text-[var(--color-accent-purple)]">{baselineTokens}k</span>
            </div>
            <input 
              type="range" 
              min="10" max="500" step="10"
              value={baselineTokens}
              onChange={(e) => setBaselineTokens(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-purple)] bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded appearance-none h-1.5 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--color-text-secondary)] tracking-wider">
              <span>AGENT STEPS (PER SESSION)</span>
              <span className="text-[var(--color-accent-purple)]">{agentSteps}</span>
            </div>
            <input 
              type="range" 
              min="1" max="100" step="1"
              value={agentSteps}
              onChange={(e) => setAgentSteps(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-purple)] bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded appearance-none h-1.5 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--color-text-secondary)] tracking-wider">
              <span>COST PER 1M TOKENS ($)</span>
              <span className="text-[var(--color-accent-purple)]">${costPerMillion.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0.10" max="10" step="0.10"
              value={costPerMillion}
              onChange={(e) => setCostPerMillion(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-purple)] bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded appearance-none h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Results output */}
        <div className="flex flex-col items-center justify-center bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded p-8 relative overflow-hidden">
          <div className="absolute top-0 w-full h-px bg-[var(--color-accent-purple)] opacity-30" />
          
          <span className="px-3 py-1 rounded-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-accent-purple)] text-xs font-mono tracking-widest mb-6">ESTIMATED SAVINGS/MO</span>
          <h3 className="font-geist text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-2">
            ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm mb-10">est. monthly savings (10k sessions/mo)</p>

          <div className="w-full grid grid-cols-2 gap-4 border-t border-[var(--color-border-subtle)] pt-8">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--color-text-primary)]">{(standardMonthlyTokens / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 })}M</div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest mt-1">STANDARD TOKENS</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--color-accent-purple)]">{(optimizedMonthlyTokens / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M</div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-widest mt-1">OPTIMIZED TOKENS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
