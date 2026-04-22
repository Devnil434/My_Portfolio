"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ─── All available logos from /public/logo ─── */
const TECH_STACK = [
  { name: "Next.js",       logo: "/logo/next.png",           category: "Framework" },
  { name: "React",         logo: "/logo/react.png",          category: "Library" },
  { name: "TypeScript",    logo: "/logo/ts.png",             category: "Language" },
  { name: "JavaScript",    logo: "/logo/js.png",             category: "Language" },
  { name: "Tailwind CSS",  logo: "/logo/tailwind.png",       category: "Styling" },
  { name: "CSS",           logo: "/logo/css.svg",            category: "Styling" },
  { name: "HTML",          logo: "/logo/html.png",           category: "Markup" },
  { name: "Framer Motion", logo: "/logo/framer-motion.svg",  category: "Animation" },
  { name: "Node.js",       logo: "/logo/node.png",           category: "Runtime" },
  { name: "Express",       logo: "/logo/express.png",        category: "Framework" },
  { name: "FastAPI",       logo: "/logo/fastapi.png",        category: "Framework" },
  { name: "PostgreSQL",    logo: "/logo/postgreSQL.png",     category: "Database" },
  { name: "MongoDB",       logo: "/logo/mongodb.svg",        category: "Database" },
  { name: "MySQL",         logo: "/logo/mysql.svg",          category: "Database" },
  { name: "Prisma",        logo: "/logo/prisma.png",         category: "ORM" },
  { name: "Supabase",      logo: "/logo/supabase.png",       category: "Backend" },
  { name: "Clerk",         logo: "/logo/clerk.png",          category: "Auth" },
  { name: "Docker",        logo: "/logo/docker.svg",         category: "DevOps" },
  { name: "AWS",           logo: "/logo/aws.png",            category: "Cloud" },
  { name: "Kubernetes",    logo: "/logo/Kubernetes-Logo.wine.png", category: "DevOps" },
  { name: "Vercel",        logo: "/logo/vercel.png",         category: "Cloud" },
  { name: "Git",           logo: "/logo/git.png",            category: "Tools" },
  { name: "GitHub",        logo: "/logo/github.png",         category: "Tools" },
  { name: "Postman",       logo: "/logo/postman.png",        category: "Tools" },
  { name: "n8n",           logo: "/logo/n8n.png",            category: "Automation" },
  { name: "Python",        logo: "/logo/python.jpg",         category: "Language" },
  { name: "Java",          logo: "/logo/java.png",           category: "Language" },
  { name: "C",             logo: "/logo/c.jpg",              category: "Language" },
  { name: "NumPy",         logo: "/logo/numpy.png",          category: "ML/Data" },
  { name: "Pandas",        logo: "/logo/pandas.png",         category: "ML/Data" },
  { name: "TensorFlow",    logo: "/logo/tensorflow.png",     category: "ML/AI" },
  { name: "OpenCV",        logo: "/logo/opencv.png",         category: "ML/AI" },
  { name: "Jupyter",       logo: "/logo/jupyter.png",        category: "Tools" },
  { name: "Colab",         logo: "/logo/colab.png",          category: "Tools" },
  { name: "REST API",      logo: "/logo/api.png",            category: "API" },
];

/* Category accent colours */
const CAT_COLOR: Record<string, string> = {
  Framework:  "#3EE6A5",
  Library:    "#A3FF12",
  Language:   "#22c55e",
  Styling:    "#86efac",
  Markup:     "#3EE6A5",
  Animation:  "#A3FF12",
  Runtime:    "#22c55e",
  Database:   "#3EE6A5",
  ORM:        "#86efac",
  Backend:    "#A3FF12",
  Auth:       "#22c55e",
  DevOps:     "#3EE6A5",
  Cloud:      "#86efac",
  Tools:      "#A3FF12",
  Automation: "#22c55e",
  "ML/Data":  "#3EE6A5",
  "ML/AI":    "#A3FF12",
  API:        "#86efac",
};

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 z-10">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Tech <span className="text-forest">Arsenal</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-md mx-auto">
            Every tool I&apos;ve grown proficient with — from pixel to pipeline.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {TECH_STACK.map((tech, i) => {
            const color = CAT_COLOR[tech.category] ?? "#3EE6A5";
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                whileHover={{
                  y: -8,
                  scale: 1.1,
                  boxShadow: `0 0 22px color-mix(in srgb, ${color} 45%, transparent), 0 14px 28px rgba(0,0,0,0.4)`,
                }}
                className="glass-card p-4 flex flex-col items-center gap-2.5 group cursor-default"
              >
                {/* Logo image */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    className="object-contain drop-shadow-sm"
                    sizes="40px"
                    loading="lazy"
                  />
                </div>

                {/* Name */}
                <p className="text-[10px] font-mono font-semibold text-center leading-tight text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)] transition-colors">
                  {tech.name}
                </p>

                {/* Category badge */}
                <span
                  className="text-[8px] font-mono px-1.5 py-0.5 rounded-full border"
                  style={{
                    color,
                    borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
                    background:  `color-mix(in srgb, ${color} 8%, transparent)`,
                  }}
                >
                  {tech.category}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Total count */}
        <motion.p
          className="text-center mt-10 text-xs text-[var(--fg-subtle)] font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-forest font-bold">{TECH_STACK.length}</span> technologies &amp; growing 🌿
        </motion.p>
      </div>
    </section>
  );
}
