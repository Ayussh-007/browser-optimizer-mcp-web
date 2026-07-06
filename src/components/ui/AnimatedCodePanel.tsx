import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

// ─── HTML lines for the "Before" panel ───────────────────────────────────────
const HTML_LINES: { text: string; indent: number; warn?: boolean }[] = [
  { text: '<!DOCTYPE html>', indent: 0 },
  { text: '<html lang="en">', indent: 0 },
  { text: '<head>...</head>', indent: 0 },
  { text: '<body>', indent: 0 },
  { text: '<div class="app-root">', indent: 1 },
  { text: '<div class="layout-wrapper">', indent: 2, warn: true },
  { text: '<div class="content-frame">', indent: 3, warn: true },
  { text: '<header class="nav-bar">', indent: 4 },
  { text: '<div class="nav-inner-wrap">', indent: 5, warn: true },
  { text: '<ul class="nav-list deprecated">', indent: 6, warn: true },
  { text: '<li><a href="/">Home</a></li>', indent: 7 },
  { text: '<li><a href="/about">About</a></li>', indent: 7 },
  { text: '</ul>', indent: 6 },
  { text: '</div>', indent: 5 },
  { text: '</header>', indent: 4 },
  { text: '<main class="page-body">', indent: 4 },
  { text: '<div class="container-fluid">', indent: 5, warn: true },
  { text: '<div class="row gx-0">', indent: 6, warn: true },
  { text: '<div class="col-wrapper">', indent: 7, warn: true },
  { text: '<section class="hero-banner">', indent: 8 },
  { text: '<h1 class="title">Dashboard</h1>', indent: 9 },
  { text: '<p class="subtitle hidden">…</p>', indent: 9, warn: true },
  { text: '<div class="spacer-24"></div>', indent: 9, warn: true },
  { text: '</section>', indent: 8 },
  { text: '<div class="card-grid">', indent: 8 },
  { text: '<div class="card">', indent: 9 },
  { text: '<span class="card-icon"></span>', indent: 10, warn: true },
  { text: '<h3>Revenue</h3>', indent: 10 },
  { text: '<p>$12,340</p>', indent: 10 },
  { text: '</div>', indent: 9 },
  { text: '<div class="card empty-state">', indent: 9, warn: true },
  { text: '<span class="placeholder"></span>', indent: 10, warn: true },
  { text: '</div>', indent: 9 },
  { text: '</div>', indent: 8 },
  { text: '<form id="search-form">', indent: 8 },
  { text: '<input type="text" name="q" />', indent: 9 },
  { text: '<button type="submit">Go</button>', indent: 9 },
  { text: '</form>', indent: 8 },
  { text: '</div>', indent: 7 },
  { text: '</div>', indent: 6 },
  { text: '</div>', indent: 5 },
  { text: '</main>', indent: 4 },
  { text: '<footer class="site-footer">', indent: 4 },
  { text: '<div class="footer-inner">', indent: 5, warn: true },
  { text: '<span>© 2026</span>', indent: 6 },
  { text: '</div>', indent: 5 },
  { text: '</footer>', indent: 4 },
  { text: '</div>', indent: 3 },
  { text: '</div>', indent: 2 },
  { text: '</div>', indent: 1 },
  { text: '</body>', indent: 0 },
  { text: '</html>', indent: 0 },
];

// ─── JSON lines for the "After" panel ────────────────────────────────────────
const JSON_LINES: { text: string; highlight?: boolean }[] = [
  { text: '{' },
  { text: '  "page": "Dashboard",' },
  { text: '  "title": "Dashboard",' , highlight: true },
  { text: '  "nav": [' },
  { text: '    { "label": "Home", "href": "/" },' , highlight: true },
  { text: '    { "label": "About", "href": "/about" }' },
  { text: '  ],' },
  { text: '  "sections": [' },
  { text: '    {' },
  { text: '      "type": "hero",' , highlight: true },
  { text: '      "heading": "Dashboard"' },
  { text: '    }' },
  { text: '  ],' },
  { text: '  "cards": [' },
  { text: '    {' },
  { text: '      "title": "Revenue",' , highlight: true },
  { text: '      "value": "$12,340"' },
  { text: '    }' },
  { text: '  ],' },
  { text: '  "forms": [' , highlight: true },
  { text: '    {' },
  { text: '      "id": "search-form",' },
  { text: '      "fields": 1,' , highlight: true },
  { text: '      "buttons": 1' },
  { text: '    }' },
  { text: '  ],' },
  { text: '  "nodesRemoved": 18,' , highlight: true },
  { text: '  "compressionRatio": "94.2%"' , highlight: true },
  { text: '}' },
];

// ─── Syntax highlight HTML ───────────────────────────────────────────────────
function SyntaxHTML({ code }: { code: string }) {
  const parts: { text: string; cls: string }[] = [];
  let rest = code;

  // match tags, attributes, strings
  const regex = /(<\/?[\w!-]+)|(\s[\w-]+=)("[^"]*")|("[^"]*")|(>)|([^<"]+)/g;
  let m: RegExpExecArray | null;
  let lastIndex = 0;

  while ((m = regex.exec(rest)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ text: rest.slice(lastIndex, m.index), cls: 'text-[#6e7076]' });
    }
    if (m[1]) parts.push({ text: m[1], cls: 'text-[#E06C75]' }); // tags → red
    if (m[2]) parts.push({ text: m[2], cls: 'text-[#D19A66]' }); // attrs → orange
    if (m[3]) parts.push({ text: m[3], cls: 'text-[#E5C07B]' }); // strings → yellow
    if (m[4]) parts.push({ text: m[4], cls: 'text-[#E5C07B]' });
    if (m[5]) parts.push({ text: m[5], cls: 'text-[#E06C75]' }); // > → red
    if (m[6]) parts.push({ text: m[6], cls: 'text-[#ABB2BF]' }); // content
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < rest.length) {
    parts.push({ text: rest.slice(lastIndex), cls: 'text-[#6e7076]' });
  }

  return (
    <span>
      {parts.map((p, i) => (
        <span key={i} className={p.cls}>{p.text}</span>
      ))}
    </span>
  );
}

// ─── Syntax highlight JSON ───────────────────────────────────────────────────
function SyntaxJSON({ code }: { code: string }) {
  const parts: { text: string; cls: string }[] = [];
  const regex = /("[\w-]+"\s*:)|("(?:[^"\\]|\\.)*")|(\d+(?:\.\d+)?%?)|([{}\[\],])|([^"{\}\[\],\d]+)/g;
  let m: RegExpExecArray | null;
  let lastIndex = 0;

  while ((m = regex.exec(code)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ text: code.slice(lastIndex, m.index), cls: 'text-[#5c6370]' });
    }
    if (m[1]) parts.push({ text: m[1], cls: 'text-[#56B6C2]' }); // keys → cyan
    else if (m[2]) parts.push({ text: m[2], cls: 'text-[#98C379]' }); // strings → green
    else if (m[3]) parts.push({ text: m[3], cls: 'text-[#D19A66]' }); // numbers → orange
    else if (m[4]) parts.push({ text: m[4], cls: 'text-[#5c6370]' }); // brackets → gray
    else if (m[5]) parts.push({ text: m[5], cls: 'text-[#ABB2BF]' });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < code.length) {
    parts.push({ text: code.slice(lastIndex), cls: 'text-[#5c6370]' });
  }

  return (
    <span>
      {parts.map((p, i) => (
        <span key={i} className={p.cls}>{p.text}</span>
      ))}
    </span>
  );
}

// ─── Blinking Cursor ─────────────────────────────────────────────────────────
function CodeCursor({ color }: { color: string }) {
  return (
    <motion.span
      className="inline-block w-[1px] h-[12px] ml-[1px] align-middle"
      style={{ backgroundColor: color }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'steps(2)' as unknown as undefined }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AnimatedCodePanel() {
  const [htmlOffset, setHtmlOffset] = useState(0);
  const [jsonVisibleCount, setJsonVisibleCount] = useState(0);
  const [htmlCursorLine, setHtmlCursorLine] = useState(0);
  const [jsonCursorLine, setJsonCursorLine] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [warnFlash, setWarnFlash] = useState<Set<number>>(new Set());
  const htmlScrollRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // Smooth HTML scroll with requestAnimationFrame
  useEffect(() => {
    const speed = 0.15; // px per frame (~9px/sec at 60fps)
    const totalHeight = HTML_LINES.length * 18; // approximate

    const tick = () => {
      htmlScrollRef.current += speed;
      if (htmlScrollRef.current > totalHeight) htmlScrollRef.current = 0;
      setHtmlOffset(htmlScrollRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // JSON lines fade in one by one
  useEffect(() => {
    if (jsonVisibleCount >= JSON_LINES.length) return;
    const timer = setTimeout(() => {
      setJsonVisibleCount(c => c + 1);
    }, 250 + Math.random() * 200);
    return () => clearTimeout(timer);
  }, [jsonVisibleCount]);

  // Cycle JSON visible count to create re-animation loop
  useEffect(() => {
    if (jsonVisibleCount < JSON_LINES.length) return;
    const timer = setTimeout(() => {
      setJsonVisibleCount(0);
    }, 8000); // pause 8s then restart
    return () => clearTimeout(timer);
  }, [jsonVisibleCount]);

  // Move cursors
  useEffect(() => {
    const interval = setInterval(() => {
      setHtmlCursorLine(l => (l + 1) % Math.min(HTML_LINES.length, 20));
      setJsonCursorLine(l => (l + 1) % JSON_LINES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Random warning flash
  const flashWarnings = useCallback(() => {
    const warnIndices = HTML_LINES.map((l, i) => l.warn ? i : -1).filter(i => i >= 0);
    const picks = new Set<number>();
    for (let i = 0; i < 3; i++) {
      picks.add(warnIndices[Math.floor(Math.random() * warnIndices.length)]);
    }
    setWarnFlash(picks);
    setTimeout(() => setWarnFlash(new Set()), 1200);
  }, []);

  useEffect(() => {
    const interval = setInterval(flashWarnings, 3000);
    return () => clearInterval(interval);
  }, [flashWarnings]);

  // Pulse every ~6s
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full relative"
      animate={{ y: [0, -8, 0, 8, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-full flex items-stretch gap-0">
        {/* ─── LEFT: Messy HTML ─── */}
        <div className="flex-1 bg-[#0C0C0E] rounded-l-lg border border-[var(--color-border-subtle)] overflow-hidden flex flex-col font-mono text-[10px] leading-[18px] shadow-2xl shadow-black/20 relative">
          <div className="bg-[#1C0F0F] text-[#FF5A5A] text-center py-2 font-bold uppercase tracking-widest border-b border-[#2D1818] text-[9px]">
            BEFORE: MESSY HTML TREE
          </div>
          <div className="p-3 overflow-hidden relative h-[340px]">
            <div
              className="will-change-transform"
              style={{ transform: `translateY(-${htmlOffset}px)` }}
            >
              {/* Render lines twice for seamless loop */}
              {[...HTML_LINES, ...HTML_LINES].map((line, idx) => {
                const realIdx = idx % HTML_LINES.length;
                const isFlashing = warnFlash.has(realIdx);
                const isWarning = line.warn;
                const showCursor = realIdx === htmlCursorLine && idx < HTML_LINES.length;

                return (
                  <div
                    key={idx}
                    className={`
                      flex items-center justify-between pr-2 transition-colors duration-300
                      ${isWarning ? (isFlashing ? 'bg-[#3D2020]/60' : 'bg-[#2A1616]/20') : ''}
                    `}
                    style={{ paddingLeft: `${line.indent * 10 + 8}px` }}
                  >
                    <span className={`flex-1 truncate ${isWarning ? 'text-[#FF5A5A]/80' : ''}`}>
                      <SyntaxHTML code={line.text} />
                      {showCursor && <CodeCursor color="#FF5A5A" />}
                    </span>
                    {isWarning && (
                      <AlertTriangle
                        size={8}
                        className={`shrink-0 ml-1 transition-opacity duration-300 ${
                          isFlashing ? 'text-[#FF5A5A] opacity-100' : 'text-[#FF5A5A]/30 opacity-60'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Fade overlays */}
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0C0C0E] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0C0C0E] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ─── CENTER: Arrow + Pulse ─── */}
        <div className="flex flex-col justify-center items-center -mx-3 z-10 relative">
          <motion.div
            className="w-7 h-7 rounded-full bg-[#111113] border border-[var(--color-border-subtle)] flex items-center justify-center shadow-xl"
            animate={pulseActive ? { scale: [1, 1.3, 1], borderColor: ['#242427', '#5E6AD2', '#242427'] } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowRight size={11} className="text-[#8A8F98]" />
          </motion.div>
          {/* Vertical pulse line */}
          {pulseActive && (
            <motion.div
              className="absolute w-[2px] bg-[#5E6AD2]/40 rounded-full"
              initial={{ top: '0%', height: 0, opacity: 0 }}
              animate={{ top: ['0%', '100%'], height: 20, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* ─── RIGHT: Clean JSON ─── */}
        <div className="flex-1 bg-[#0C0C0E] rounded-r-lg border border-[var(--color-border-subtle)] overflow-hidden flex flex-col font-mono text-[10px] leading-[18px] shadow-2xl shadow-black/20 relative">
          <div className="bg-[#0D1F17] text-[#4ADE80] text-center py-2 font-bold uppercase tracking-widest border-b border-[#14332A] text-[9px]">
            AFTER: CLEAN JSON OBJECT
          </div>
          <div className="p-3 overflow-hidden relative h-[340px]">
            {JSON_LINES.map((line, idx) => {
              const isVisible = idx < jsonVisibleCount;
              const showCursor = idx === jsonCursorLine && isVisible;

              return (
                <motion.div
                  key={idx}
                  className={`flex items-center justify-between pr-2 ${
                    line.highlight && isVisible ? 'bg-[#14332A]/40' : ''
                  }`}
                  initial={{ opacity: 0, x: 6 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
                  transition={{ duration: 0.3, delay: isVisible ? idx * 0.02 : 0 }}
                  style={{ paddingLeft: 8 }}
                >
                  <span className="flex-1 truncate">
                    <SyntaxJSON code={line.text} />
                    {showCursor && <CodeCursor color="#4ADE80" />}
                  </span>
                  {line.highlight && isVisible && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
                    >
                      <CheckCircle2 size={8} className="text-[#4ADE80]/60 shrink-0 ml-1" />
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0C0C0E] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
