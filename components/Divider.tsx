"use client";

import { motion } from "framer-motion";

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="relative flex items-center justify-center w-full py-4 overflow-hidden">
      <div className="divider w-full" />
      {label && (
        <span className="absolute px-4 section-tag bg-[var(--background)]">
          {label}
        </span>
      )}
      {/* Traveling light particle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--neon-blue)] blur-sm"
        initial={{ left: "-5%" }}
        whileInView={{ left: "105%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        style={{ position: "absolute" }}
      />
    </div>
  );
}
