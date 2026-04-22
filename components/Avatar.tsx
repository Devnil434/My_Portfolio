"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, size = 150, className = "" }: AvatarProps) {
  return (
    <motion.div
      className={`relative rounded-full p-1 bg-gradient-to-tr from-[var(--color-neon-blue)] via-[var(--color-neon-purple)] to-[var(--color-neon-pink)] ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div 
        className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-[var(--color-neon-blue)] to-[var(--color-neon-pink)] opacity-50"
        style={{ zIndex: -1 }}
      />
      <div 
        className="relative rounded-full overflow-hidden bg-black"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt="AI Avatar"
          fill
          className="object-cover"
          sizes={`${size}px`}
          priority
        />
      </div>
    </motion.div>
  );
}
