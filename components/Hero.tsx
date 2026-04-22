"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { ArrowRight, Mail } from "lucide-react";

export function Hero() {
  const { name, role, tagline, bio, email, avatarUrl } = resumeData.personalInfo;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const smoothAvatarY = useSpring(avatarY, { stiffness: 80, damping: 20 });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--neon-blue)] opacity-[0.05] blur-[100px]" />
        <div className="absolute bottom-0 right-[-5%] w-[600px] h-[600px] rounded-full bg-[var(--neon-purple)] opacity-[0.06] blur-[120px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Text */}
          <motion.div style={{ y, opacity }} className="flex flex-col gap-6">
            <motion.p
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="section-tag"
            >
              &gt;&gt; Hello, World
            </motion.p>

            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              I&apos;m{" "}
              <span className="text-neon glow-text">{name}</span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <div className="h-px flex-1 max-w-[40px] bg-[var(--neon-blue)] opacity-60" />
              <p className="text-xl md:text-2xl text-zinc-300 font-mono">
                {role}{" "}
                <span className="text-[var(--neon-purple)] opacity-80">{tagline}</span>
              </p>
            </motion.div>

            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-zinc-400 text-lg leading-relaxed max-w-lg"
            >
              {bio}
            </motion.p>

            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="#projects"
                className="btn-neon flex items-center gap-2 text-black font-bold px-6 py-3 rounded-xl text-sm"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 glass px-6 py-3 rounded-xl text-sm text-zinc-200 hover:text-white border border-[var(--glass-border)] hover:border-[var(--neon-blue)] transition-colors"
              >
                <Mail className="w-4 h-4" /> Contact Me
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-8 pt-4 border-t border-[var(--glass-border)]"
            >
              {[
                { value: "5+", label: "Years Exp." },
                { value: "30+", label: "Projects" },
                { value: "98", label: "Lighthouse" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-neon">{s.value}</span>
                  <span className="text-xs text-zinc-500 font-mono mt-1">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Avatar */}
          <motion.div
            style={{ y: smoothAvatarY }}
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-[-16px] rounded-full border border-[var(--neon-blue)] opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-32px] rounded-full border border-[var(--neon-purple)] opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow behind avatar */}
                <div className="absolute inset-0 avatar-glow rounded-full scale-90 blur-2xl opacity-70 bg-gradient-to-br from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-pink)]" />

                {/* Avatar image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-[rgba(0,240,255,0.3)] avatar-glow">
                  <Image
                    src={avatarUrl}
                    alt={`${name} AI Avatar`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, (max-width: 1280px) 320px, 384px"
                  />
                  {/* Inner gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-40" />
                </div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 right-0 glass rounded-full px-3 py-1.5 flex items-center gap-2 border border-[var(--glass-border)] text-xs font-mono text-zinc-300"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for hire
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
