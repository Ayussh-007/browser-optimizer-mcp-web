import RoiCalculator from '../ui/RoiCalculator';
import { Filter, Database, Layers, BrainCircuit, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: <Filter size={20} className="text-[var(--color-accent-blue)]" />,
    title: 'Smart Extraction',
    desc: 'Heuristic-based filtering of non-interactive elements, scripts, and decorative CSS containers.'
  },
  {
    icon: <Database size={20} className="text-[var(--color-accent-blue)]" />,
    title: 'Semantic Caching',
    desc: 'Store structured representations of pages to avoid recalculating identical UI components.'
  },
  {
    icon: <Layers size={20} className="text-[var(--color-accent-blue)]" />,
    title: 'Delta Diffing',
    desc: 'Only transmit state changes to the LLM, reducing context window exhaustion on long sessions.'
  },
  {
    icon: <BrainCircuit size={20} className="text-[var(--color-accent-blue)]" />,
    title: 'Classification',
    desc: 'Automated role assignment for UI widgets using machine learning classification headers.'
  }
];

export default function HomeTab() {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-[10px] font-mono font-medium tracking-wide mb-8">
            v1.4.0 NOW STABLE
          </div>
          <h1 className="font-geist text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The performance layer for <span className="text-[var(--color-accent-purple)]">browser agents.</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto lg:mx-0">
            Eliminate up to 94% of unnecessary HTML markup, reduce latency to milliseconds, and slash LLM token costs with automated DOM pruning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center justify-between bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] rounded pl-4 pr-2 py-1.5 w-full sm:w-80">
              <span className="font-mono text-xs text-[var(--color-text-primary)]">pip install browser-mcp</span>
              <button className="p-1 rounded bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] transition-colors border border-[var(--color-border-subtle)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
            <a href="#" className="px-6 py-2 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-sm font-medium hover:bg-[var(--color-surface-level2)] transition-colors flex items-center gap-2">
              Read Documentation <span>→</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="flex-1 w-full relative hidden md:block">
          <div className="w-full flex items-stretch gap-0">
            {/* Left Side: Before */}
            <div className="flex-1 bg-[#0A0A0B] rounded-l border border-[var(--color-border-subtle)] overflow-hidden flex flex-col font-mono text-[10px] leading-[1.8] shadow-2xl">
              <div className="bg-[#2A1616] text-[#FF5A5A] text-center py-2 font-bold uppercase tracking-widest border-b border-[#3D2020] text-[9px]">
                BEFORE: MESSY HTML TREE
              </div>
              <div className="p-4 text-[#8A8F98] overflow-hidden relative">
                <div className="whitespace-pre">
                  {'<!DOCTYPE html>\n'}
                  {'<html lang="en">\n'}
                  {'<head>...</head>\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'<div class="texthader">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  <div className="bg-[#2A1616]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'  <div class="new-comdener">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  {'    <span class="nextnak-ou-tequartit1"></span>\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'    <div class="dropps -sita -chpds-manufactueery">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  {'      <div class="controller-center">\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'        <div class="sever-ara-hector">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  {'          <div class="matt">\n'}
                  {'            <div class="hoer:hatch">\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'              <div class="proppy-vectory">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  {'                <span class="hasshower">\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'                  <span class="helo"></span>'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  <div className="bg-[#2A1616]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'                  <ul class="text-ovarning">'}</span>
                    <AlertTriangle size={10} />
                  </div>
                  {'                    <span class="caterinderaicy">&itar...</span>\n'}
                  {'                    <span class="text color-son">Kis...</span>\n'}
                  <div className="bg-[#3D2020]/40 -mx-4 px-4 flex justify-between items-center text-[#FF5A5A]">
                    <span>{'                    <span class="warning height"></span>'}</span>
                    <AlertTriangle size={10} />
                  </div>
                </div>
              </div>
            </div>

            {/* Center Arrow */}
            <div className="flex flex-col justify-center items-center -mx-3 z-10">
              <div className="w-6 h-6 rounded bg-[#111113] border border-[var(--color-border-subtle)] flex items-center justify-center text-[#8A8F98] shadow-xl">
                <ArrowRight size={10} />
              </div>
            </div>

            {/* Right Side: After */}
            <div className="flex-1 bg-[#0A0A0B] rounded-r border border-[var(--color-border-subtle)] overflow-hidden flex flex-col font-mono text-[10px] leading-[1.8] shadow-2xl">
              <div className="bg-[#122A1D] text-[#4ADE80] text-center py-2 font-bold uppercase tracking-widest border-b border-[#1A3D2A] text-[9px]">
                AFTER: CLEAN JSON OBJECT
              </div>
              <div className="p-4 text-[#8A8F98] overflow-hidden relative">
                <div className="whitespace-pre">
                  {'[\n'}
                  {'  {\n'}
                  {'    "titl": "clean",\n'}
                  <div className="bg-[#1A3D2A]/40 -mx-4 px-4 flex justify-between items-center text-[#4ADE80]">
                    <span>{'    "name": "3039800003opm",'}</span>
                    <CheckCircle2 size={10} />
                  </div>
                  {'    "state": "botmoin",\n'}
                  <div className="bg-[#122A1D]/40 -mx-4 px-4 flex justify-between items-center text-[#4ADE80]">
                    <span>{'    "voltats": {},'}</span>
                    <CheckCircle2 size={10} />
                  </div>
                  {'    "object": [\n'}
                  {'      {\n'}
                  {'        "code": 1020,\n'}
                  {'        "name": "Sale Stisth",\n'}
                  {'        "titl": "{tama Prktonna..}"\n'}
                  {'      },\n'}
                  {'      {\n'}
                  {'        "name": "Tefe Garden",\n'}
                  {'        "titl": "{tama Prktonak..}"\n'}
                  {'      }\n'}
                  {'    ],\n'}
                  <div className="bg-[#1A3D2A]/40 -mx-4 px-4 flex justify-between items-center text-[#4ADE80]">
                    <span>{'    "oodification": [],'}</span>
                    <CheckCircle2 size={10} />
                  </div>
                  {'    "rouenecemsent": {\n'}
                  {'      "totalogy": "18000000"\n'}
                  {'    }\n'}
                  <div className="bg-[#122A1D]/40 -mx-4 px-4 flex justify-between items-center text-[#4ADE80]">
                    <span>{'  }'}</span>
                    <CheckCircle2 size={10} />
                  </div>
                  {']'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="p-6 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-level2)] transition-colors flex flex-col">
            <div className="w-8 h-8 rounded bg-[var(--color-surface-main)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="font-bold text-sm mb-2">{feature.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ROI Calculator */}
      <RoiCalculator />
    </div>
  );
}
