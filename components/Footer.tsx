"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { resumeData } from "@/data/resume";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--glass-border)] mt-auto">
      <div className="container mx-auto px-6 max-w-6xl py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg btn-neon flex items-center justify-center text-black font-bold text-xs">
              A
            </span>
            <span className="font-bold text-zinc-300">
              {resumeData.personalInfo.name}
            </span>
          </div>

          {/* Nav links */}
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors font-mono tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="text-xs text-zinc-600 font-mono">
            © {year} {resumeData.personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Built with */}
        <motion.div
          className="text-center mt-8 text-[11px] text-zinc-700 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Built with{" "}
          <span className="text-[var(--neon-blue)]">Next.js</span> ·{" "}
          <span className="text-[var(--neon-purple)]">Tailwind CSS</span> ·{" "}
          <span className="text-[var(--neon-pink)]">Framer Motion</span>
        </motion.div>
      </div>
    </footer>
  );
}
