"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { resumeData } from "@/data/resume";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t mt-auto" style={{ borderColor: "var(--glass-border)" }}>
      <div className="container mx-auto px-6 max-w-6xl py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-forest flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[var(--fg-primary)]">{resumeData.personalInfo.name}</span>
          </Link>
          <ul className="flex items-center gap-6">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-xs text-[var(--fg-subtle)] hover:text-[var(--accent-mint)] transition-colors font-mono">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--fg-subtle)] font-mono">© {year} {resumeData.personalInfo.name}</p>
        </div>
        <motion.p
          className="text-center mt-8 text-[11px] font-mono"
          style={{ color: "var(--fg-subtle)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Crafted with{" "}
          <span style={{ color: "var(--accent-mint)" }}>Next.js</span> ·{" "}
          <span style={{ color: "var(--accent-lime)" }}>Tailwind</span> ·{" "}
          <span style={{ color: "var(--accent-emerald)" }}>Framer Motion</span>{" "}
          · Growing in the digital forest 🌿
        </motion.p>
      </div>
    </footer>
  );
}
