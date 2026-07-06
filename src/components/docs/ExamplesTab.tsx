"use client";

import DocsBreadcrumbs from "./DocsBreadcrumbs";
import { Monitor, Key, Search, ShoppingCart, Activity, ShieldCheck } from "lucide-react";

const EXAMPLES = [
  { title: "Login Automation", icon: Key, color: "text-purple-400" },
  { title: "E-commerce Checkout", icon: ShoppingCart, color: "text-green-400" },
  { title: "RAG Crawling", icon: Search, color: "text-blue-400" },
  { title: "Product Monitoring", icon: Activity, color: "text-red-400" },
  { title: "Accessibility Audit", icon: ShieldCheck, color: "text-teal-400" },
  { title: "SPA Navigation", icon: Monitor, color: "text-orange-400" },
];

export default function ExamplesTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <DocsBreadcrumbs path={["Examples"]} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Examples Gallery</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed max-w-2xl">
          Real-world implementations of the Browser Optimizer MCP handling complex web interactions with vastly reduced token overhead.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMPLES.map((example) => {
            const Icon = example.icon;
            return (
              <div key={example.title} className="group relative rounded-2xl border border-[var(--border-glass)] bg-[rgba(255,255,255,0.01)] p-6 hover:bg-[rgba(255,255,255,0.03)] hover:border-[var(--border-glass-hover)] transition-all cursor-pointer overflow-hidden">
                <div className="mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-glass)] flex items-center justify-center ${example.color} shadow-lg`}>
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--primary-blue)] transition-colors">{example.title}</h3>
                <p className="text-sm text-[var(--text-tertiary)] mb-6">
                  Learn how to implement optimized automation for this use case.
                </p>
                <div className="text-xs font-mono text-[var(--primary-blue)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  View implementation <span className="text-lg leading-none mt-[-2px]">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
