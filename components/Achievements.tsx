"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Award } from "lucide-react";

export function Achievements() {
  if (!resumeData.achievements || resumeData.achievements.length === 0) return null;

  return (
    <section id="achievements" className="relative py-24 z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; Milestones</span>
          <h2 className="text-4xl md:text-5xl font-black">
            My <span className="text-forest">Achievements</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-md mx-auto">
            Recognitions and highlights from my journey.
          </p>
        </motion.div>

        {/* Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] transition-colors flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mb-4 text-forest group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--fg-primary)] group-hover:text-forest transition-colors mb-2">
                {ach.title}
              </h3>
              <p className="text-[var(--fg-subtle)] leading-relaxed text-sm">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
