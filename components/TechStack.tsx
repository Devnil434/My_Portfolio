"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { 
  Code2, Database, Layout, Server, 
  Smartphone, Terminal, Cpu, Cloud
} from "lucide-react";

// Map to provide random/placeholder icons for the tech stack
const iconMap = [Code2, Database, Layout, Server, Smartphone, Terminal, Cpu, Cloud];

export function TechStack() {
  const { techStack } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 container mx-auto px-4 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-neon-blue)] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            The core technologies I use to build scalable, high-performance applications.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-6 flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--color-neon-blue)] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-zinc-300 group-hover:text-[var(--color-neon-blue)] transition-colors duration-300" />
                </div>
                <span className="font-mono text-sm tracking-wide group-hover:text-white transition-colors duration-300 text-zinc-400">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
