"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/data/resume";
import { ArrowUpRight, Code, X, Zap } from "lucide-react";

type Project = (typeof resumeData.projects)[number];

/* ── 3D tilt card ── */
function TiltCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function resetTilt() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="glass-card cursor-pointer group overflow-hidden relative"
    >
      {/* Glow border animation on hover */}
      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{
          border: `1px solid color-mix(in srgb, ${project.color} 0%, transparent)`,
        }}
        whileHover={{
          borderColor: `color-mix(in srgb, ${project.color} 55%, transparent)`,
          boxShadow: `0 0 30px color-mix(in srgb, ${project.color} 25%, transparent), inset 0 0 20px color-mix(in srgb, ${project.color} 8%, transparent)`,
        }}
      />

      {/* Color accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent 80%)` }}
      />

      {/* Card hero area */}
      <div
        className="h-36 w-full relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, color-mix(in srgb, ${project.color} 20%, transparent), transparent 70%), var(--bg-deep)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(${project.color}44 1px, transparent 1px), linear-gradient(90deg, ${project.color}44 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Big monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-7xl font-black opacity-[0.07] font-mono"
            style={{ color: project.color }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {/* Animated looping ring inside demo area */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 60, height: 60,
            border: `1px solid color-mix(in srgb, ${project.color} 40%, transparent)`,
            translateX: "-50%", translateY: "-50%",
          }}
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-[var(--fg-primary)] group-hover:text-[var(--accent-mint)] transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent-mint)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{
                color:            project.color,
                borderColor:      `color-mix(in srgb, ${project.color} 30%, transparent)`,
                background:       `color-mix(in srgb, ${project.color} 8%, transparent)`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border border-[var(--glass-border)] text-[var(--fg-subtle)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(7,31,23,0.8)", backdropFilter: "blur(20px)" }}
      />

      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-[24px]"
        style={{
          background: "var(--bg-card)",
          border: `1px solid color-mix(in srgb, ${project.color} 30%, transparent)`,
          boxShadow: `0 0 60px color-mix(in srgb, ${project.color} 20%, transparent), 0 40px 80px rgba(0,0,0,0.6)`,
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Color bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent 80%)` }}
        />

        {/* Modal hero */}
        <div
          className="h-52 relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, color-mix(in srgb, ${project.color} 25%, transparent), transparent 70%), var(--bg-deep)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `linear-gradient(${project.color}55 1px, transparent 1px), linear-gradient(90deg, ${project.color}55 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          {/* Animated pulse rings inside modal demo area */}
          {[1, 2, 3].map((r) => (
            <motion.div
              key={r}
              className="absolute top-1/2 left-1/4 rounded-full"
              style={{
                width: 40 * r, height: 40 * r,
                border: `1px solid color-mix(in srgb, ${project.color} 35%, transparent)`,
                translateX: "-50%", translateY: "-50%",
              }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: r * 0.6, ease: "easeOut" }}
            />
          ))}
          <div className="absolute inset-0 flex items-end p-6">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-[var(--fg-primary)]"
            >
              {project.title}
            </motion.h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-mint)] transition-all"
            style={{ background: "rgba(7,31,23,0.7)", borderColor: "var(--glass-border)", backdropFilter: "blur(8px)" }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 md:p-8"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-mono border"
                style={{
                  color:       project.color,
                  borderColor: `color-mix(in srgb, ${project.color} 40%, transparent)`,
                  background:  `color-mix(in srgb, ${project.color} 10%, transparent)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-[var(--fg-muted)] leading-relaxed text-sm mb-6">
            {project.fullDescription}
          </p>

          {/* Animated progress bars */}
          <div className="space-y-3 mb-8">
            {[
              { label: "Performance", val: 98 },
              { label: "Accessibility", val: 94 },
              { label: "Best Practices", val: 100 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--fg-muted)]">{bar.label}</span>
                  <span style={{ color: project.color }}>{bar.val}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-surface)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${project.color}, var(--accent-lime))` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.val}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-forest px-5 py-2.5 text-sm rounded-xl flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Live Demo
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-forest px-5 py-2.5 text-sm rounded-xl flex items-center gap-2"
            >
              <Code className="w-4 h-4" /> Source Code
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Projects() {
  const { projects } = resumeData;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; My Work</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Featured <span className="text-forest">Projects</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-md mx-auto">
            Click any card to see the full story.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.65 }}
            >
              <TiltCard project={project} onClick={() => setSelected(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
