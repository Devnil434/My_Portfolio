"use client";

import {
  useRef, useState, useCallback, useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValue, useSpring, useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────
   Reduced-motion hook (no cascading setState)
───────────────────────────────────────── */
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MQ).matches;
}

function getReducedMotionServer() {
  return false;
}

/* ─────────────────────────────────────────
   Props
───────────────────────────────────────── */
interface AvatarEntityProps {
  /** Size in px (square bounding box) */
  size?: number;
  /** Disable mouse parallax (e.g. on mobile) */
  noParallax?: boolean;
  /** Show click burst */
  clickBurst?: boolean;
  /** Extra className on wrapper */
  className?: string;
  /** Reduce all motion (contact / watermark use) */
  ambient?: boolean;
}

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export function AvatarEntity({
  size = 420,
  noParallax = false,
  clickBurst = true,
  className = "",
  ambient = false,
}: AvatarEntityProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [burst, setBurst] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* ── Mouse parallax values ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (noParallax || ambient) return;
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [noParallax, ambient, rawX, rawY]
  );

  const resetParallax = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  /* ── Click burst ── */
  function handleClick() {
    if (!clickBurst) return;
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  /* ── Reduce motion (SSR-safe, no cascading renders) ── */
  const prefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  const floatDuration = prefersReduced ? 0 : ambient ? 7 : 5;
  const breatheDuration = prefersReduced ? 0 : ambient ? 8 : 5.5;

  return (
    <div
      ref={wrapperRef}
      className={`relative select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 900,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetParallax}
      onMouseEnter={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* ── OUTER SLOW ORBIT RING ── */}
      {!ambient && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -size * 0.1,
            border: "1px solid rgba(62,230,165,0.12)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* ── MID DASHED RING ── */}
      {!ambient && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -size * 0.05,
            border: "1px dashed rgba(163,255,18,0.14)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* ── MOUSE PARALLAX + FLOATING WRAPPER ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {/* ── FLOATING LOOP ── */}
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={
            prefersReduced
              ? {}
              : { y: [0, ambient ? -10 : -18, 0] }
          }
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* ── BREATHING + IDLE TILT LOOP ── */}
          <motion.div
            style={{ width: "100%", height: "100%" }}
            animate={
              prefersReduced
                ? {}
                : {
                    scale: [1, 1.03, 1],
                    rotate: ambient ? [0, 0, 0] : [0, 0.6, -0.6, 0],
                  }
            }
            transition={{
              duration: breatheDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* ── ENERGY ORB BACKGROUND ── */}
            {/* Deep core glow */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                inset: size * 0.08,
                background: "radial-gradient(circle at 50% 55%, #b6ffd0 0%, #3EE6A5 28%, #1db870 52%, #0a5c38 72%, transparent 90%)",
                boxShadow: hovered
                  ? "0 0 80px 30px rgba(62,230,165,0.7), 0 0 160px 60px rgba(62,230,165,0.35), inset 0 0 60px rgba(200,255,230,0.3)"
                  : "0 0 60px 20px rgba(62,230,165,0.55), 0 0 120px 50px rgba(62,230,165,0.25), inset 0 0 40px rgba(200,255,230,0.2)",
              }}
              animate={prefersReduced ? {} : {
                scale: [1, 1.04, 1],
                opacity: hovered ? [0.9, 1, 0.9] : [0.8, 0.95, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Thick glowing outer ring */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                inset: size * 0.06,
                border: "3px solid rgba(62,230,165,0.9)",
                boxShadow: "0 0 20px rgba(62,230,165,0.8), 0 0 50px rgba(62,230,165,0.5), inset 0 0 20px rgba(62,230,165,0.3)",
              }}
              animate={prefersReduced ? {} : {
                opacity: [0.7, 1, 0.7],
                scale: hovered ? [1, 1.03, 1] : [1, 1.01, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating bright arc */}
            {!ambient && (
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  inset: size * 0.04,
                  border: "2px solid transparent",
                  borderTopColor: "rgba(163,255,18,0.9)",
                  borderRightColor: "rgba(62,230,165,0.6)",
                  filter: "blur(1px)",
                  boxShadow: "0 0 12px rgba(163,255,18,0.7)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Counter-rotating arc */}
            {!ambient && (
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  inset: size * 0.1,
                  border: "1.5px solid transparent",
                  borderBottomColor: "rgba(62,230,165,0.7)",
                  borderLeftColor: "rgba(163,255,18,0.4)",
                  filter: "blur(0.5px)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Sparkle dots */}
            {!ambient && !prefersReduced && [
              { top: "8%",  left: "50%", s: 4, d: 0 },
              { top: "50%", left: "5%",  s: 3, d: 1 },
              { top: "88%", left: "35%", s: 5, d: 0.5 },
              { top: "65%", left: "92%", s: 3, d: 1.5 },
              { top: "20%", left: "85%", s: 4, d: 0.8 },
              { top: "75%", left: "12%", s: 3, d: 0.3 },
            ].map((sp, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: sp.top, left: sp.left,
                  width: sp.s, height: sp.s,
                  background: i % 2 === 0 ? "#A3FF12" : "#ffffff",
                  boxShadow: `0 0 ${sp.s * 3}px ${i % 2 === 0 ? "#A3FF12" : "#3EE6A5"}`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{
                  duration: 2 + sp.d,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: sp.d,
                }}
              />
            ))}

            {/* ── AVATAR IMAGE (on top of orb) ── */}
            <motion.div
              className="absolute inset-0"
              whileHover={prefersReduced ? {} : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <Image
                src="/avatar.png"
                alt="AI Developer Avatar"
                fill
                priority
                draggable={false}
                className="object-contain"
                sizes={`${size}px`}
                style={{
                  filter: hovered
                    ? "drop-shadow(0 0 24px rgba(62,230,165,0.8)) drop-shadow(0 0 50px rgba(163,255,18,0.4))"
                    : "drop-shadow(0 0 12px rgba(62,230,165,0.5))",
                  transition: "filter 0.4s ease",
                }}
              />
            </motion.div>

            {/* ── HOVER ENERGY RIPPLE ── */}
            <AnimatePresence>
              {hovered && !prefersReduced && !ambient && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ border: "2px solid rgba(62,230,165,0.8)" }}
                  initial={{ scale: 0.85, opacity: 0.9 }}
                  animate={{ scale: 1.45, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── CLICK BURST RINGS ── */}
      <AnimatePresence>
        {burst && (
          <>
            {[1, 2, 3].map((r) => (
              <motion.div
                key={r}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: `${4 - r}px solid rgba(62,230,165,${0.8 - r * 0.2})`,
                }}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 1.4 + r * 0.2, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.6 + r * 0.1, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   SMALL circular avatar (Navbar / badge)
───────────────────────────────────────── */
export function AvatarBadge({ size = 32 }: { size?: number }) {
  return (
    <motion.div
      className="relative rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
      style={{
        width: size,
        height: size,
        border: "1.5px solid rgba(62,230,165,0.35)",
        boxShadow: "0 0 10px rgba(62,230,165,0.3)",
      }}
      animate={{ boxShadow: ["0 0 8px rgba(62,230,165,0.3)", "0 0 18px rgba(62,230,165,0.55)", "0 0 8px rgba(62,230,165,0.3)"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.12 }}
    >
      <Image
        src="/avatar.png"
        alt="Avatar"
        fill
        className="object-cover object-top"
        sizes={`${size}px`}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   WATERMARK (background / contact section)
───────────────────────────────────────── */
export function AvatarWatermark({
  opacity = 0.05,
  size = 320,
  className = "",
}: {
  opacity?: number;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      animate={{ y: [0, -12, 0], opacity: [opacity, opacity * 1.4, opacity] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/avatar.png"
        alt=""
        fill
        aria-hidden
        className="object-contain"
        sizes={`${size}px`}
      />
    </motion.div>
  );
}
