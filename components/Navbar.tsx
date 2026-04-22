"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { FileText, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(5,5,8,0)", "rgba(5,5,8,0.85)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.07)"]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      style={{ backgroundColor: navBg, borderBottomColor: navBorder }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 max-w-6xl">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg btn-neon flex items-center justify-center text-black font-bold text-sm">
            A
          </span>
          <span
            className={`font-bold tracking-tight text-lg transition-colors ${
              scrolled ? "text-white" : "text-zinc-200"
            }`}
          >
            {resumeData.personalInfo.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors font-mono tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Resume button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={resumeData.personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-neon flex items-center gap-2 text-black font-semibold text-sm px-4 py-2 rounded-lg"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden glass border-t border-[var(--glass-border)]"
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors font-mono text-sm"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={resumeData.personalInfo.resumeUrl}
            className="btn-neon text-black font-semibold text-sm px-4 py-2 rounded-lg text-center mt-2"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
