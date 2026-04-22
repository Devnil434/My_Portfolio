"use client";

import { motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { resumeData } from "@/data/resume";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { name, title, description, avatarUrl } = resumeData.personalInfo;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <Avatar src={avatarUrl} size={180} className="mb-8" />
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, I&apos;m <span className="text-gradient neon-glow">{name}</span>
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-3xl text-zinc-300 mb-6 font-mono"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="max-w-2xl text-lg text-zinc-400 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-zinc-500 uppercase tracking-widest font-mono">Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-[var(--color-neon-blue)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
