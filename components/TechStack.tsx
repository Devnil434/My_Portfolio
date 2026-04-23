"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TECH_STACK = [
  { name: "Next.js",       logo: "/logo/next.png",                    category: "Framework" },
  { name: "React",         logo: "/logo/react.png",                   category: "Library" },
  { name: "TypeScript",    logo: "/logo/ts.png",                      category: "Language" },
  { name: "JavaScript",    logo: "/logo/js.png",                      category: "Language" },
  { name: "Tailwind CSS",  logo: "/logo/tailwind.png",                category: "Styling" },
  { name: "CSS",           logo: "/logo/css.svg",                     category: "Styling" },
  { name: "HTML",          logo: "/logo/html.png",                    category: "Markup" },
  { name: "Framer Motion", logo: "/logo/framer-motion.svg",           category: "Animation" },
  { name: "Node.js",       logo: "/logo/node.png",                    category: "Runtime" },
  { name: "Express",       logo: "/logo/express.png",                 category: "Framework" },
  { name: "FastAPI",       logo: "/logo/fastapi.png",                 category: "Framework" },
  { name: "PostgreSQL",    logo: "/logo/postgreSQL.png",              category: "Database" },
  { name: "MongoDB",       logo: "/logo/mongodb.svg",                 category: "Database" },
  { name: "MySQL",         logo: "/logo/mysql.svg",                   category: "Database" },
  { name: "Prisma",        logo: "/logo/prisma.png",                  category: "ORM" },
  { name: "Supabase",      logo: "/logo/supabase.png",                category: "Backend" },
  { name: "Clerk",         logo: "/logo/clerk.png",                   category: "Auth" },
  { name: "Docker",        logo: "/logo/docker.svg",                  category: "DevOps" },
  { name: "AWS",           logo: "/logo/aws.png",                     category: "Cloud" },
  { name: "Kubernetes",    logo: "/logo/Kubernetes-Logo.wine.png",    category: "DevOps" },
  { name: "Vercel",        logo: "/logo/vercel.png",                  category: "Cloud" },
  { name: "Git",           logo: "/logo/git.png",                     category: "Tools" },
  { name: "GitHub",        logo: "/logo/github.png",                  category: "Tools" },
  { name: "Postman",       logo: "/logo/postman.png",                 category: "Tools" },
  { name: "n8n",           logo: "/logo/n8n.png",                     category: "Automation" },
  { name: "Python",        logo: "/logo/python.jpg",                  category: "Language" },
  { name: "Java",          logo: "/logo/java.png",                    category: "Language" },
  { name: "C",             logo: "/logo/c.jpg",                       category: "Language" },
  { name: "NumPy",         logo: "/logo/numpy.png",                   category: "ML/Data" },
  { name: "Pandas",        logo: "/logo/pandas.png",                  category: "ML/Data" },
  { name: "TensorFlow",    logo: "/logo/tensorflow.png",              category: "ML/AI" },
  { name: "OpenCV",        logo: "/logo/opencv.png",                  category: "ML/AI" },
  { name: "Jupyter",       logo: "/logo/jupyter.png",                 category: "Tools" },
  { name: "Colab",         logo: "/logo/colab.png",                   category: "Tools" },
  { name: "REST API",      logo: "/logo/api.png",                     category: "API" },
];

const ORBITS = [
  { label: "LANGUAGES",        color: "#22c55e",  radius: 110, duration: 22, dir:  1, names: ["TypeScript","JavaScript","Python","Java","C","HTML","CSS"] },
  { label: "AI / ML",          color: "#A3FF12",  radius: 195, duration: 38, dir: -1, names: ["TensorFlow","NumPy","Pandas","OpenCV","Jupyter","Colab"] },
  { label: "DEVOPS",           color: "#3EE6A5",  radius: 278, duration: 55, dir:  1, names: ["AWS","Kubernetes","Docker","Vercel","Git","GitHub"] },
  { label: "LIBRARIES / TOOLS",color: "#86efac",  radius: 368, duration: 72, dir: -1, names: ["Next.js","React","Tailwind CSS","Framer Motion","Node.js","Express","FastAPI","REST API","Prisma","Supabase","Clerk","n8n","Postman","MongoDB","MySQL","PostgreSQL"] },
];

const SIZE  = 860;
const LOGO  = 34;

function GalaxyRing({ orbit, scale }: { orbit: typeof ORBITS[0]; scale: number }) {
  const items = TECH_STACK.filter(t => orbit.names.includes(t.name));
  const n = items.length;
  const { radius, duration, dir, color } = orbit;

  return (
    <>
      {/* Dashed orbit circle */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: radius * 2, height: radius * 2,
          left: SIZE / 2 - radius, top: SIZE / 2 - radius,
          border: `1px dashed color-mix(in srgb, ${color} 22%, transparent)`,
        }}
      />

      {/* Rotating ring wrapper */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2, left: SIZE / 2 - radius, top: SIZE / 2 - radius }}
        animate={{ rotate: 360 * dir }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tech, i) => {
          const angle = ((360 / n) * i * Math.PI) / 180;
          const x = Math.round(radius + radius * Math.cos(angle) - LOGO / 2);
          const y = Math.round(radius + radius * Math.sin(angle) - LOGO / 2);
          return (
            <motion.div
              key={tech.name}
              className="absolute group cursor-default"
              style={{ left: x, top: y, width: LOGO, height: LOGO }}
              animate={{ rotate: -360 * dir }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.6, zIndex: 50 }}
            >
              {/* Logo bubble */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center p-1 relative"
                style={{
                  background: `color-mix(in srgb, ${color} 10%, #0c0c0c)`,
                  boxShadow: `0 0 10px color-mix(in srgb, ${color} 30%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image src={tech.logo} alt={tech.name} fill className="object-contain rounded-full" sizes={`${LOGO}px`} />
                </div>
              </div>
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                style={{ background: "#0a0a0a", border: `1px solid ${color}`, color }}
              >
                {tech.name}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export function TechStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(Math.min(1, wrapRef.current.offsetWidth / SIZE));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="tech" className="relative py-24 z-10">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Tech <span className="text-forest">Stacks</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-md mx-auto">
            Every tool I&apos;ve grown proficient with — from pixel to pipeline.
          </p>
        </motion.div>

        {/* Galaxy container */}
        <div ref={wrapRef} className="w-full flex items-center justify-center overflow-hidden" style={{ height: SIZE * scale }}>
          <div className="relative origin-top" style={{ width: SIZE, height: SIZE, transform: `scale(${scale})` }}>

            {/* Ambient glow blobs */}
            <div className="absolute rounded-full blur-[80px] opacity-10 bg-[var(--accent-mint)]" style={{ width: 200, height: 200, left: SIZE/2 - 100, top: SIZE/2 - 100 }} />
            <div className="absolute rounded-full blur-[120px] opacity-5 bg-[#A3FF12]" style={{ width: 400, height: 400, left: SIZE/2 - 200, top: SIZE/2 - 200 }} />

            {/* Center core */}
            <div className="absolute flex items-center justify-center" style={{ width: 72, height: 72, left: SIZE/2 - 36, top: SIZE/2 - 36 }}>
              <div className="w-full h-full rounded-full absolute blur-xl bg-[var(--accent-mint)] opacity-30" />
              <div
                className="w-full h-full rounded-full flex items-center justify-center relative z-10 font-black font-mono text-xs"
                style={{
                  border: "2px solid var(--accent-mint)",
                  color: "var(--accent-mint)",
                  boxShadow: "0 0 28px var(--accent-mint), inset 0 0 20px rgba(62,230,165,0.1)",
                }}
              >
                DEV
              </div>
            </div>

            {/* Orbit rings */}
            {ORBITS.map(orbit => <GalaxyRing key={orbit.label} orbit={orbit} scale={scale} />)}

            {/* Orbit labels */}
            {ORBITS.map(orbit => {
              const a = -25 * (Math.PI / 180);
              const lx = SIZE / 2 + orbit.radius * Math.cos(a) + 6;
              const ly = SIZE / 2 + orbit.radius * Math.sin(a) - 8;
              return (
                <div
                  key={orbit.label + "-lbl"}
                  className="absolute text-[9px] font-mono font-bold tracking-widest pointer-events-none opacity-40"
                  style={{ left: lx, top: ly, color: orbit.color }}
                >
                  {orbit.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <motion.p
          className="text-center mt-8 text-xs text-[var(--fg-subtle)] font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-forest font-bold">{TECH_STACK.length}</span> technologies &amp; growing 🌿
        </motion.p>
      </div>
    </section>
  );
}
