"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const colors = [
      "rgba(79, 124, 255, 0.4)",
      "rgba(0, 245, 255, 0.3)",
      "rgba(139, 92, 246, 0.3)",
      "rgba(0, 255, 179, 0.2)",
    ];

    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Draw subtle connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79, 124, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 124, 255, 0.12) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), " +
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0, 245, 255, 0.06) 0%, transparent 50%)",
        }}
      />

      {/* Aurora bands */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(79, 124, 255, 0.03) 60deg, transparent 120deg, rgba(0, 245, 255, 0.02) 200deg, transparent 260deg, rgba(139, 92, 246, 0.03) 320deg, transparent 360deg)",
            animation: "aurora 60s linear infinite",
          }}
        />
      </div>

      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Perspective grid */}
      <div className="perspective-grid" />

      {/* Depth-based lighting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(79, 124, 255, 0.06) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
