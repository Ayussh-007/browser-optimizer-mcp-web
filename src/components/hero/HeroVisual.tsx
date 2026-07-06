"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Node {
  x: number;
  y: number;
  label: string;
  color: string;
  glowColor: string;
  size: number;
}

const NODES: Node[] = [
  { x: 0.5, y: 0.08, label: "AI Agent", color: "#8B5CF6", glowColor: "rgba(139,92,246,0.3)", size: 48 },
  { x: 0.5, y: 0.28, label: "Browser Optimizer MCP", color: "#4F7CFF", glowColor: "rgba(79,124,255,0.4)", size: 60 },
  { x: 0.5, y: 0.48, label: "Playwright", color: "#00F5FF", glowColor: "rgba(0,245,255,0.3)", size: 44 },
  { x: 0.5, y: 0.65, label: "Browser", color: "#00FFB3", glowColor: "rgba(0,255,179,0.3)", size: 44 },
  { x: 0.5, y: 0.82, label: "Compressed Response", color: "#4F7CFF", glowColor: "rgba(79,124,255,0.3)", size: 40 },
];

interface FlowParticle {
  progress: number;
  speed: number;
  fromIdx: number;
  toIdx: number;
  offset: number;
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const mouseRef = useRef(mouse);
  const animRef = useRef<number>(0);

  mouseRef.current = mouse;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 500;
    let H = 550;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = rect?.width || 500;
      H = rect?.height || 550;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Flow particles
    const particles: FlowParticle[] = [];
    for (let i = 0; i < NODES.length - 1; i++) {
      for (let j = 0; j < 4; j++) {
        particles.push({
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          fromIdx: i,
          toIdx: i + 1,
          offset: (Math.random() - 0.5) * 20,
        });
      }
    }

    let time = 0;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Calculate node positions with parallax
      const resolvedNodes = NODES.map((n) => ({
        ...n,
        rx: n.x * W + mx * 15,
        ry: n.y * H + my * 10 + Math.sin(time * 0.8 + n.y * 5) * 4,
      }));

      // Draw connections
      for (let i = 0; i < resolvedNodes.length - 1; i++) {
        const from = resolvedNodes[i];
        const to = resolvedNodes[i + 1];

        const grad = ctx.createLinearGradient(from.rx, from.ry, to.rx, to.ry);
        grad.addColorStop(0, from.glowColor);
        grad.addColorStop(1, to.glowColor);

        ctx.beginPath();
        ctx.moveTo(from.rx, from.ry);

        // Bezier curve
        const midY = (from.ry + to.ry) / 2;
        ctx.bezierCurveTo(from.rx, midY, to.rx, midY, to.rx, to.ry);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dashed overlay
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(from.rx, from.ry);
        ctx.bezierCurveTo(from.rx, midY, to.rx, midY, to.rx, to.ry);
        ctx.strokeStyle = `rgba(255,255,255,0.06)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw flow particles
      for (const p of particles) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const from = resolvedNodes[p.fromIdx];
        const to = resolvedNodes[p.toIdx];
        const t = p.progress;

        // Bezier interpolation
        const midY = (from.ry + to.ry) / 2;
        const u = 1 - t;
        const px = u * u * u * from.rx + 3 * u * u * t * from.rx + 3 * u * t * t * to.rx + t * t * t * to.rx;
        const py = u * u * u * from.ry + 3 * u * u * t * midY + 3 * u * t * t * midY + t * t * t * to.ry;

        const alpha = Math.sin(t * Math.PI);

        ctx.beginPath();
        ctx.arc(px + p.offset * Math.sin(t * Math.PI), py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alpha * 0.8})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(px + p.offset * Math.sin(t * Math.PI), py, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alpha * 0.15})`;
        ctx.fill();
      }

      // Draw nodes
      for (const node of resolvedNodes) {
        const isCore = node.label === "Browser Optimizer MCP";
        const r = node.size / 2;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(node.rx, node.ry, r * 0.5, node.rx, node.ry, r * 2.5);
        glowGrad.addColorStop(0, node.glowColor);
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.rx, node.ry, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Node body
        ctx.beginPath();
        ctx.arc(node.rx, node.ry, r, 0, Math.PI * 2);

        const bodyGrad = ctx.createRadialGradient(node.rx - r * 0.3, node.ry - r * 0.3, 0, node.rx, node.ry, r);
        bodyGrad.addColorStop(0, "rgba(255,255,255,0.12)");
        bodyGrad.addColorStop(1, "rgba(255,255,255,0.03)");
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.arc(node.rx, node.ry, r, 0, Math.PI * 2);
        ctx.strokeStyle = isCore ? "rgba(79,124,255,0.6)" : "rgba(255,255,255,0.12)";
        ctx.lineWidth = isCore ? 2 : 1;
        ctx.stroke();

        // Internal circuitry for MCP core
        if (isCore) {
          const pulseAlpha = 0.3 + Math.sin(time * 2) * 0.2;
          ctx.beginPath();
          ctx.arc(node.rx, node.ry, r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(79,124,255,${pulseAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.rx, node.ry, r * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,245,255,${pulseAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Center dot
          ctx.beginPath();
          ctx.arc(node.rx, node.ry, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,245,255,${0.5 + Math.sin(time * 3) * 0.5})`;
          ctx.fill();
        }

        // Label
        ctx.font = `${isCore ? "600 12px" : "500 10px"} var(--font-sans), system-ui, sans-serif`;
        ctx.fillStyle = isCore ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.rx, node.ry + r + 18);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-[550px]">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
