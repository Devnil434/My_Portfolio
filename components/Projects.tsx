"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Code } from "lucide-react";
import { resumeData } from "@/data/resume";

export function Projects() {
  const { projects } = resumeData;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section className="py-24 container mx-auto px-4 relative">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          A selection of my best work, blending design and engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-container-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="glass-panel cursor-pointer overflow-hidden group hover:border-[var(--color-neon-purple)] transition-colors duration-300"
            whileHover={{ y: -5 }}
          >
            <motion.div 
              layoutId={`card-image-container-${project.id}`}
              className="relative h-48 w-full bg-zinc-900"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <motion.div 
              layoutId={`card-content-${project.id}`}
              className="p-6"
            >
              <motion.h3 
                layoutId={`card-title-${project.id}`}
                className="text-xl font-bold mb-2 text-white"
              >
                {project.title}
              </motion.h3>
              <motion.p 
                layoutId={`card-description-${project.id}`}
                className="text-zinc-400 text-sm mb-4 line-clamp-2"
              >
                {project.shortDescription}
              </motion.p>
              <motion.div 
                layoutId={`card-tags-${project.id}`}
                className="flex flex-wrap gap-2"
              >
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-300">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              className="glass-panel w-full max-w-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <motion.div 
                layoutId={`card-image-container-${selectedProject.id}`}
                className="relative h-64 sm:h-80 w-full bg-zinc-900"
              >
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
              </motion.div>
              
              <motion.div 
                layoutId={`card-content-${selectedProject.id}`}
                className="p-6 md:p-8"
              >
                <motion.h3 
                  layoutId={`card-title-${selectedProject.id}`}
                  className="text-3xl font-bold mb-4 text-white"
                >
                  {selectedProject.title}
                </motion.h3>
                
                <motion.div 
                  layoutId={`card-tags-${selectedProject.id}`}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-[var(--color-neon-purple)]/20 border border-[var(--color-neon-purple)]/30 rounded-md text-[var(--color-neon-purple)]">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="prose prose-invert max-w-none mb-8"
                >
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-neon-blue)] text-black font-semibold hover:bg-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    Source Code
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
