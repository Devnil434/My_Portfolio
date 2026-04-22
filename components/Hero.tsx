"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

/* Section fade-up animation helper */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut" as const, delay },
});

export function Hero() {
  const { name, role, tagline, bio, email, avatarUrl } = resumeData.personalInfo;
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const smoothAvatarY = useSpring(avatarY, { stiffness: 60, damping: 18 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div style={{ y: textY, opacity }} className="flex flex-col gap-7 order-2 lg:order-1">
            {/* Tag */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-mint)] breathe" />
              <span className="section-label">Living Digital Portfolio</span>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight">
              I&apos;m{" "}
              <span className="text-forest glow-mint">{name}</span>
            </motion.h1>

            {/* Role */}
            <motion.div {...fadeUp(0.2)} className="flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--accent-mint)] opacity-50" />
              <p className="text-xl md:text-2xl text-[var(--fg-muted)] font-mono">
                {role}
                <span className="text-[var(--accent-mint)] opacity-70"> {tagline}</span>
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p {...fadeUp(0.3)} className="text-[var(--fg-muted)] text-lg leading-relaxed max-w-md">
              {bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              <Link href="#projects">
                <motion.span
                  className="btn-forest px-6 py-3 text-sm rounded-xl inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles className="w-4 h-4" />
                  See My Work
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <a href={`mailto:${email}`}>
                <motion.span
                  className="btn-outline-forest px-6 py-3 text-sm rounded-xl inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail className="w-4 h-4" />
                  Say Hello
                </motion.span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex gap-8 pt-4 border-t"
              style={{ borderColor: "var(--glass-border)" }}
            >
              {[
                { v: "5+",  l: "Years" },
                { v: "30+", l: "Projects" },
                { v: "98",  l: "Lighthouse" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-black text-forest">{s.v}</span>
                  <span className="text-xs text-[var(--fg-subtle)] font-mono">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: AI Avatar ── */}
          <motion.div
            style={{ y: smoothAvatarY }}
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative select-none">

              {/* Outermost slow rotating ring */}
              <motion.div
                className="absolute rounded-full border"
                style={{
                  inset: -36,
                  borderColor: "rgba(62,230,165,0.15)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Mid dashed ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  inset: -20,
                  border: "1px dashed rgba(163,255,18,0.2)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              {/* Breathing + floating wrapper */}
              <motion.div
                animate={{ y: [0, -18, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow aura behind avatar */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(62,230,165,0.35) 0%, rgba(163,255,18,0.15) 50%, transparent 70%)",
                    scale: 1.3,
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Avatar circle */}
                <div
                  className="relative w-60 h-60 md:w-72 md:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(62,230,165,0.3)",
                    boxShadow:
                      "0 0 40px rgba(62,230,165,0.4), 0 0 80px rgba(62,230,165,0.15), inset 0 0 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <Image
                    src={avatarUrl}
                    alt={`${name} AI Avatar`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, (max-width: 1280px) 288px, 320px"
                  />
                  {/* Inner vignette overlay */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at center, transparent 50%, rgba(7,31,23,0.5) 100%)",
                    }}
                  />
                </div>

                {/* Available badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono"
                  style={{ border: "1px solid var(--glass-border-h)", color: "var(--fg-muted)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 6px #34d399" }}
                  />
                  Available
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="section-label text-[10px]">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[var(--accent-mint)] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
