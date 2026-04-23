"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; Background</span>
          <h2 className="text-4xl md:text-5xl font-black">
            My <span className="text-forest">Experience</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-md mx-auto">
            Where I&apos;ve made an impact.
          </p>
        </motion.div>

        {/* Timeline/List */}
        <div className="flex flex-col gap-8">
          {resumeData.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[var(--fg-primary)] group-hover:text-forest transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-mono text-[var(--fg-muted)] mt-1">
                    {exp.company}
                  </p>
                </div>
                <div className="text-xs font-mono px-3 py-1 rounded-full border border-forest/30 bg-forest/10 text-forest shrink-0 w-fit">
                  {exp.period}
                </div>
              </div>
              <p className="text-[var(--fg-subtle)] leading-relaxed text-sm">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
