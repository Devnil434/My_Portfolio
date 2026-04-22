"use client";

import { motion } from "framer-motion";

interface WaveDividerProps {
  flip?: boolean;
  label?: string;
  fromColor?: string;
  toColor?: string;
}

export function WaveDivider({
  flip = false,
  label,
  fromColor = "var(--bg-deep)",
  toColor = "var(--bg-deep)",
}: WaveDividerProps) {
  return (
    <div className={`relative w-full ${flip ? "scale-y-[-1]" : ""}`}>
      {/* Animated glow line above/below the wave */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-mint), var(--accent-lime), transparent)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Traveling glow particle along the line */}
      <motion.div
        className="absolute top-0 w-16 h-1 rounded-full blur-sm"
        style={{ background: "var(--accent-mint)", top: "-1px" }}
        animate={{ left: ["-10%", "110%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG wave */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-14"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`waveGrad-${label ?? "d"}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="var(--accent-mint)" stopOpacity="0.2" />
            <stop offset="50%"  stopColor="var(--accent-lime)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-mint)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Background fill */}
        <path
          d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
          fill={`url(#waveGrad-${label ?? "d"})`}
        />
        {/* Wave stroke */}
        <motion.path
          d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30"
          fill="none"
          stroke="var(--accent-mint)"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          animate={{
            d: [
              "M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30",
              "M0,30 C240,5 480,55 720,30 C960,5 1200,55 1440,30",
              "M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Optional label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="section-label px-4 py-1 rounded-full"
            style={{
              background: "rgba(7,31,23,0.8)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(8px)",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
