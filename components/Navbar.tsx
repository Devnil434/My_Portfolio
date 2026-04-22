"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { FileText, Menu, X, Leaf } from "lucide-react";
import { AvatarBadge } from "./AvatarEntity";

const NAV_LINKS = [
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#tech" },
  { label: "Projects",  href: "#projects" },
  { label: "Contact",   href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Blur/glass background that fades in on scroll */}
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          opacity: bgOpacity,
          background: "rgba(7,31,23,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "var(--glass-border)",
        }}
      />

      <nav className="relative container mx-auto flex items-center justify-between px-6 py-4 max-w-6xl">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2.5 group" aria-label="Home">
          <AvatarBadge size={34} />
          <span className="font-bold tracking-tight text-[var(--fg-primary)] text-lg">
            {resumeData.personalInfo.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent-mint)] transition-colors font-mono tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent-mint)] group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <div className="hidden md:flex">
          <motion.a
            href={resumeData.personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-forest px-4 py-2 text-sm rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className="w-4 h-4" />
            Resume
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-[var(--fg-muted)] hover:text-[var(--accent-mint)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="relative md:hidden overflow-hidden"
        style={{
          background: "rgba(7,31,23,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[var(--fg-muted)] hover:text-[var(--accent-mint)] transition-colors font-mono text-sm"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={resumeData.personalInfo.resumeUrl}
            className="btn-forest text-center py-2.5 text-sm rounded-xl mt-2"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
