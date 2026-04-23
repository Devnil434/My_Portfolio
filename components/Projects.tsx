"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { resumeData } from "@/data/resume";
import { ArrowUpRight, Code, ExternalLink, Zap, CheckCircle2, X } from "lucide-react";
import { AvatarEntity } from "./AvatarEntity";

type Project = (typeof resumeData.projects)[number];

/* ── 3D Tilt Card (Short View) ── */
function TiltCard({ project, onOpenModal }: { project: Project; onOpenModal: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Less extreme tilt for a premium feel
  const rotX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function resetTilt() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative flex flex-col h-full rounded-[24px] overflow-hidden bg-[var(--bg-card)] border border-[var(--glass-border)] cursor-default transition-all duration-500"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Dynamic Glow Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${project.color} 15%, transparent), transparent 70%)`,
        }}
      />

      {/* Top Gradient Bar */}
      <div
        className="h-1.5 w-full transition-all duration-500 group-hover:h-2"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <div className="p-6 flex flex-col flex-grow z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-inner"
              style={{
                backgroundColor: `color-mix(in srgb, ${project.color} 10%, transparent)`,
                color: project.color,
                border: `1px solid color-mix(in srgb, ${project.color} 20%, transparent)`,
              }}
            >
              {project.title.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-[var(--fg-primary)] group-hover:text-[var(--accent-mint)] transition-colors">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[var(--fg-subtle)] group-hover:text-[var(--accent-mint)] transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-6 flex-grow">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full font-mono border transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{
                color: project.color,
                borderColor: `color-mix(in srgb, ${project.color} 30%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${project.color} 5%, transparent)`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-mono border border-[var(--glass-border)] text-[var(--fg-subtle)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={onOpenModal}
            className="flex-1 py-2 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 border transition-all hover:shadow-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${project.color} 10%, transparent)`,
              borderColor: `color-mix(in srgb, ${project.color} 40%, transparent)`,
              color: project.color,
            }}
          >
            Quick View
          </button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--glass-border)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-mint)] hover:bg-[var(--bg-surface)] transition-all"
            aria-label="Live Demo"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--glass-border)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-mint)] hover:bg-[var(--bg-surface)] transition-all"
            aria-label="Source Code"
          >
            <Code className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Demo Placeholder (Shimmer) ── */
function DemoPlaceholder({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--glass-border)] group">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#071f17]" />
      
      {/* Animated shimmer gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(110deg, transparent 20%, ${color} 40%, transparent 60%)`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-3"
        >
          <span className="text-4xl">🌱</span>
        </motion.div>
        <span
          className="font-mono text-sm tracking-widest uppercase font-semibold"
          style={{ color }}
        >
          Demo Growing...
        </span>
      </div>
    </div>
  );
}

/* ── Long Demo Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8"
        onClick={onClose}
      >
        {/* Blur Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(3, 14, 10, 0.75)", backdropFilter: "blur(16px)" }}
        />

        {/* Modal Content */}
        <motion.div
          key="modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[32px] custom-scrollbar shadow-2xl"
          style={{
            background: "var(--bg-deep)",
            border: `1px solid color-mix(in srgb, ${project.color} 20%, transparent)`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.8), inset 0 0 40px color-mix(in srgb, ${project.color} 5%, transparent)`,
          }}
        >
          {/* Subtle Avatar Watermark inside Modal */}
          <div className="absolute -bottom-20 -right-20 opacity-[0.05] pointer-events-none select-none z-0">
            <AvatarEntity size={500} ambient noParallax />
          </div>

          {/* Top Color Accent */}
          <div
            className="sticky top-0 z-50 h-2 w-full"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />

          <div className="relative z-10 p-6 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-4 border"
                  style={{
                    color: project.color,
                    borderColor: `color-mix(in srgb, ${project.color} 40%, transparent)`,
                    background: `color-mix(in srgb, ${project.color} 10%, transparent)`,
                  }}
                >
                  Featured Project
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-5xl font-black text-[var(--fg-primary)] tracking-tight"
                >
                  {project.title}
                </motion.h2>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full border border-[var(--glass-border)] text-[var(--fg-muted)] hover:text-white hover:border-[var(--accent-mint)] hover:bg-[var(--bg-surface)] transition-all bg-[var(--bg-card)]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: Narrative */}
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-sm font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[var(--glass-border)]" /> The Problem
                  </h4>
                  <p className="text-[var(--fg-primary)] leading-relaxed text-lg">
                    {project.problem || project.shortDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h4 className="text-sm font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[var(--glass-border)]" /> The Solution
                  </h4>
                  <p className="text-[var(--fg-subtle)] leading-relaxed">
                    {project.solution || project.fullDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[var(--glass-border)]" /> Key Features
                  </h4>
                  <ul className="space-y-3">
                    {(project.features || []).map((feature: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                        className="flex items-start gap-3 text-[var(--fg-subtle)]"
                      >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 flex flex-wrap gap-4"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
                    style={{ backgroundColor: project.color, color: "#000" }}
                  >
                    <Zap className="w-4 h-4" /> Live Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border border-[var(--glass-border)] text-[var(--fg-primary)] hover:border-[var(--accent-mint)] transition-all hover:bg-[var(--bg-surface)]"
                  >
                    <Code className="w-4 h-4" /> Source Code
                  </a>
                </motion.div>
              </div>

              {/* Right Column: Visuals & Metrics */}
              <div className="space-y-10">
                
                {/* Demo Area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <DemoPlaceholder color={project.color} />
                </motion.div>

                {/* Tech Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h4 className="text-sm font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[var(--glass-border)]" /> Tech Breakdown
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="px-3 py-1.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--glass-border)] text-[var(--fg-subtle)] flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[var(--glass-border)]" /> Performance
                  </h4>
                  <div className="space-y-4">
                    {(project.metrics || []).map((metric: { label: string; val: number }, idx: number) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-[var(--fg-muted)]">{metric.label}</span>
                          <span style={{ color: project.color }}>{metric.val}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-[#0a2016]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, color-mix(in srgb, ${project.color} 50%, transparent), ${project.color})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.val}%` }}
                            transition={{ duration: 1.2, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Section ── */
export function Projects() {
  const { projects } = resumeData;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent-mint)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-lime)] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label inline-block mb-3 bg-[var(--bg-surface)] px-4 py-1.5 rounded-full border border-[var(--glass-border)] text-sm tracking-wider text-[var(--accent-mint)]">
            &#47;&#47; MY WORK
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-mint)] to-[var(--accent-lime)]">Projects</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-6 max-w-lg mx-auto text-lg">
            A selection of my best work, blending immersive design with robust engineering.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard project={project} onOpenModal={() => setSelected(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Portal (rendered in flow here, but fixed overlay) */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
