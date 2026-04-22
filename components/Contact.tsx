"use client";

import { motion } from "framer-motion";
import { Mail, Code, Briefcase } from "lucide-react";
import { resumeData } from "@/data/resume";

export function Contact() {
  const { email, github, linkedin, twitter } = resumeData.personalInfo;

  return (
    <section className="py-24 container mx-auto px-4 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-[var(--color-neon-pink)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-10 md:p-16">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let&apos;s <span className="text-gradient">Connect</span>
        </motion.h2>
        
        <motion.p 
          className="text-zinc-400 mb-10 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          I&apos;m always open to discussing product design work or partnership opportunities. 
          Feel free to reach out through any of these platforms.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a href={`mailto:${email}`} className="group flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 hover:border-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10 transition-all duration-300">
            <Mail className="w-6 h-6 text-zinc-300 group-hover:text-[var(--color-neon-blue)]" />
          </a>
          <a href={github} target="_blank" rel="noreferrer" className="group flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300">
            <Code className="w-6 h-6 text-zinc-300 group-hover:text-white" />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 hover:border-[var(--color-neon-purple)] hover:bg-[var(--color-neon-purple)]/10 transition-all duration-300">
            <Briefcase className="w-6 h-6 text-zinc-300 group-hover:text-[var(--color-neon-purple)]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
