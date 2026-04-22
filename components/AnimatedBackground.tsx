"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

/* ─── Leaf particle ─── */
interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

/* ─── Blob data ─── */
const BLOBS = [
  { cx: "15%", cy: "20%", r: 320, color: "rgba(62,230,165,0.055)", dur: 18 },
  { cx: "80%", cy: "60%", r: 400, color: "rgba(34,197,94,0.06)",   dur: 24 },
  { cx: "50%", cy: "90%", r: 280, color: "rgba(163,255,18,0.04)",  dur: 20 },
  { cx: "5%",  cy: "70%", r: 240, color: "rgba(62,230,165,0.04)",  dur: 15 },
  { cx: "90%", cy: "15%", r: 200, color: "rgba(34,197,94,0.05)",   dur: 22 },
];

/* ─── Canvas leaf particles ─── */
function LeafCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn 22 leaves
    leavesRef.current = Array.from({ length: 22 }, (_, i) => ({
      id:       i,
      x:        Math.random() * window.innerWidth,
      y:        Math.random() * window.innerHeight,
      size:     Math.random() * 6 + 3,
      speed:    Math.random() * 0.35 + 0.12,
      drift:    (Math.random() - 0.5) * 0.3,
      opacity:  Math.random() * 0.35 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
    }));

    function drawLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf) {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      ctx.fillStyle = "#3EE6A5";
      ctx.beginPath();
      // Simple oval leaf shape
      ctx.ellipse(0, 0, leaf.size, leaf.size * 1.8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Vein
      ctx.strokeStyle = "rgba(62,230,165,0.5)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size * 1.6);
      ctx.lineTo(0,  leaf.size * 1.6);
      ctx.stroke();
      ctx.restore();
    }

    function loop() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leavesRef.current.forEach((leaf) => {
        leaf.y        += leaf.speed;
        leaf.x        += leaf.drift;
        leaf.rotation += leaf.rotSpeed;
        if (leaf.y > canvas.height + 20) {
          leaf.y  = -20;
          leaf.x  = Math.random() * canvas.width;
        }
        if (leaf.x > canvas.width + 20)  leaf.x = -20;
        if (leaf.x < -20) leaf.x = canvas.width + 20;
        drawLeaf(ctx, leaf);
      });
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}

/* ─── Cursor glow ─── */
function CursorGlow() {
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "cursor-glow";
    document.body.appendChild(el);
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      el.remove();
    };
  }, []);
  return null;
}

/* ─── Main component ─── */
export function AnimatedBackground() {
  return (
    <>
      <CursorGlow />

      {/* Fixed background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Base gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 20%, #0f4a35 0%, #071f17 60%, #071f17 100%)",
              "radial-gradient(ellipse 80% 60% at 70% 30%, #0d4030 0%, #071f17 60%, #071f17 100%)",
              "radial-gradient(ellipse 80% 60% at 50% 80%, #0a3828 0%, #071f17 60%, #071f17 100%)",
              "radial-gradient(ellipse 80% 60% at 20% 20%, #0f4a35 0%, #071f17 60%, #071f17 100%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating blobs */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px]"
            style={{
              left: b.cx,
              top:  b.cy,
              width:  b.r,
              height: b.r,
              background: b.color,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: [1, 1.15, 0.92, 1],
              x:     [0, 30, -20, 0],
              y:     [0, -25, 15, 0],
              opacity: [0.7, 1, 0.6, 0.7],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5,
            }}
          />
        ))}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(62,230,165,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(62,230,165,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Vein lines — SVG neural overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path
            d="M0 400 Q300 200 600 400 Q900 600 1200 300 Q1500 100 1920 350"
            fill="none"
            stroke="#3EE6A5"
            strokeWidth="1.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 700 Q400 500 800 700 Q1200 900 1600 600 Q1800 450 1920 550"
            fill="none"
            stroke="#A3FF12"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
          <motion.path
            d="M200 0 Q400 300 600 150 Q800 0 1000 200 Q1200 400 1400 150 Q1700 -50 1920 200"
            fill="none"
            stroke="#3EE6A5"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </svg>
      </div>

      {/* Leaf particles */}
      <LeafCanvas />
    </>
  );
}
