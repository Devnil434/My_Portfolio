"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Name Animation */}
            <div className="relative">
              <motion.h1
                className="text-5xl md:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-mint)] to-emerald-400 uppercase"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              >
                Nilanjan
              </motion.h1>
              
              {/* Glowing Aura behind text */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent-mint)] to-emerald-400 opacity-20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Loading Line */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-[var(--accent-mint)]"
                initial={{ width: "0%", x: "0%" }}
                animate={{ width: ["0%", "100%", "100%"], x: ["0%", "0%", "100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.6, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
