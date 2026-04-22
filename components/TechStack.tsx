"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import {
  Code2, Database, Layers, Server,
  Zap, Package, GitBranch, Cloud,
  Terminal, Globe, Lock, Cpu,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "Next.js": Globe,
  "React": Zap,
  "TypeScript": Code2,
  "Tailwind CSS": Layers,
  "Framer Motion": Package,
  "Node.js": Server,
  "GraphQL": GitBranch,
  "PostgreSQL": Database,
  "Prisma": Lock,
  "Docker": Terminal,
  "Redis": Cpu,
  "AWS": Cloud,
};

const categoryColor: Record<string, string> = {
  Framework: "var(--neon-blue)",
  Library: "var(--neon-purple)",
  Language: "var(--neon-blue)",
  Styling: "var(--neon-pink)",
  Animation: "var(--neon-purple)",
  Runtime: "var(--neon-blue)",
  API: "var(--neon-pink)",
  Database: "var(--neon-purple)",
  ORM: "var(--neon-blue)",
  DevOps: "var(--neon-pink)",
  Cache: "var(--neon-purple)",
  Cloud: "var(--neon-blue)",
};

export function TechStack() {
  const { techStack } = resumeData;

  return (
    <section id="tech" className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--neon-blue)] opacity-[0.04] blur-[100px]" />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-tag mb-3">&gt;&gt; Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Tech <span className="text-neon">Arsenal</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            The core technologies I rely on to build scalable, high-performance products.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {techStack.map((tech, index) => {
            const Icon = iconMap[tech.name] ?? Code2;
            const color = categoryColor[tech.category] ?? "var(--neon-blue)";
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="glass rounded-2xl p-5 flex flex-col items-center gap-3 group cursor-default"
                style={{ "--card-color": color } as React.CSSProperties}
              >
                <div
                  className="p-3 rounded-xl transition-colors duration-300"
                  style={{
                    background: `color-mix(in srgb, ${color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                  }}
                >
                  <Icon
                    className="w-6 h-6 transition-colors duration-300"
                    style={{ color }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200 font-mono">{tech.name}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{tech.category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
