"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { GraduationCap, CalendarDays, BookOpen } from "lucide-react";

export function Education() {
  const { education } = resumeData;

  return (
    <section id="education" className="relative py-24 overflow-hidden z-10">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(62,230,165,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-3">
            <GraduationCap className="inline w-4 h-4 mr-1 mb-0.5" />
            My Education
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Academic <span className="text-forest">Foundation</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start group"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 p-4 rounded-2xl"
                style={{
                  background: "color-mix(in srgb, var(--accent-mint) 10%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--accent-mint) 20%, transparent)",
                }}
              >
                <BookOpen className="w-6 h-6" style={{ color: "var(--accent-mint)" }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--accent-mint)" }}
                >
                  {edu.institution}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-[var(--fg-primary)] mb-2">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-3.5 h-3.5 text-[var(--fg-subtle)]" />
                  <span className="text-xs font-mono text-[var(--fg-subtle)]">{edu.period}</span>
                </div>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  {edu.description}
                </p>
              </div>

              {/* Decorative glow line on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full pointer-events-none"
                style={{ background: "var(--accent-mint)", opacity: 0 }}
                whileHover={{ opacity: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
