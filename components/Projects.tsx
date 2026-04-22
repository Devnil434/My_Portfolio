"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { ArrowUpRight, Code, X } from "lucide-react";

type Project = (typeof resumeData.projects)[number];

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl overflow-hidden cursor-pointer group"
      style={
        {
          "--project-color": project.color,
          borderColor: `color-mix(in srgb, ${project.color} 20%, transparent)`,
          border: `1px solid color-mix(in srgb, ${project.color} 15%, transparent)`,
        } as React.CSSProperties
      }
    >
      {/* Color bar top */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Card image / color block */}
      <div
        className="h-40 w-full relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, color-mix(in srgb, ${project.color} 25%, transparent), transparent 70%), #0a0a14`,
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.color}33 1px, transparent 1px), linear-gradient(90deg, ${project.color}33 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-6xl font-black opacity-10 font-mono tracking-tighter"
            style={{ color: project.color }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-neon transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-0.5"
          />
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full font-mono border"
              style={{
                color: project.color,
                borderColor: `color-mix(in srgb, ${project.color} 30%, transparent)`,
                background: `color-mix(in srgb, ${project.color} 8%, transparent)`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full font-mono border border-white/10 text-zinc-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          border: `1px solid color-mix(in srgb, ${project.color} 25%, transparent)`,
        }}
      >
        {/* Top color bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        {/* Modal hero area */}
        <div
          className="h-52 relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, color-mix(in srgb, ${project.color} 30%, transparent), transparent 70%), #0a0a14`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `linear-gradient(${project.color}55 1px, transparent 1px), linear-gradient(90deg, ${project.color}55 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute inset-0 flex items-end p-6">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-white"
            >
              {project.title}
            </motion.h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="p-6 md:p-8"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-mono border"
                style={{
                  color: project.color,
                  borderColor: `color-mix(in srgb, ${project.color} 35%, transparent)`,
                  background: `color-mix(in srgb, ${project.color} 10%, transparent)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Full description */}
          <p className="text-zinc-300 leading-relaxed text-[15px] mb-8">
            {project.fullDescription}
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black font-bold px-5 py-2.5 rounded-xl text-sm btn-neon"
            >
              <ArrowUpRight className="w-4 h-4" /> Live Demo
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 glass px-5 py-2.5 rounded-xl text-sm text-zinc-200 hover:text-white border border-[var(--glass-border)] hover:border-[var(--neon-blue)] transition-colors"
            >
              <Code className="w-4 h-4" /> Source Code
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { projects } = resumeData;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-10%] top-1/3 w-[500px] h-[500px] rounded-full bg-[var(--neon-purple)] opacity-[0.04] blur-[100px]" />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-tag mb-3">&gt;&gt; My Work</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Click any card to see the full deep-dive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
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
