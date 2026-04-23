"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { resumeData } from "@/data/resume";

const NAV = [
  { label: "About",       href: "#about" },
  { label: "Skills",      href: "#tech" },
  { label: "Projects",    href: "#projects" },
  { label: "Experience",  href: "#experience" },
  { label: "Contact",     href: "#contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Devnil434",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    color: "#ffffff",
    hoverColor: "#3EE6A5",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/itsDevNil434",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "#ffffff",
    hoverColor: "#A3FF12",
  },
  {
    label: "LinkedIn",
    href: resumeData.personalInfo.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "#ffffff",
    hoverColor: "#0077b5",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t mt-auto" style={{ borderColor: "var(--glass-border)" }}>
      <div className="container mx-auto px-6 max-w-6xl py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <Link href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-forest flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[var(--fg-primary)]">{resumeData.personalInfo.name}</span>
          </Link>

          {/* Nav */}
          <ul className="flex items-center gap-6">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-xs text-[var(--fg-subtle)] hover:text-[var(--accent-mint)] transition-colors font-mono">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--glass-border)] text-[var(--fg-muted)] transition-all duration-300"
                style={{ background: "var(--glass-bg)" }}
                whileHover={{
                  scale: 1.15,
                  color: s.hoverColor,
                  borderColor: s.hoverColor,
                  boxShadow: `0 0 16px color-mix(in srgb, ${s.hoverColor} 40%, transparent)`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t" style={{ borderColor: "var(--glass-border)" }}>
          <p className="text-xs text-[var(--fg-subtle)] font-mono">© {year} {resumeData.personalInfo.name}</p>
          <motion.p
            className="text-center text-[11px] font-mono"
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
      </div>
    </footer>
  );
}
