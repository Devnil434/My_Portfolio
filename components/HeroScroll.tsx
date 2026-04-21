"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { preloadImages, FrameData } from "@/lib/preloadImages";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 400vh container gives us a long scroll range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cWidth = canvas.width / dpr;
    const cHeight = canvas.height / dpr;

    const canvasRatio = cWidth / cHeight;
    const imgRatio = img.width / img.height;

    let drawWidth = cWidth;
    let drawHeight = cHeight;
    let offsetX = 0;
    let offsetY = 0;

    // "Cover" scaling. Fill the entire canvas, crop excess.
    if (canvasRatio > imgRatio) {
      drawWidth = cWidth;
      drawHeight = img.height * (cWidth / img.width);
      offsetY = (cHeight - drawHeight) / 2;
    } else {
      drawHeight = cHeight;
      drawWidth = img.width * (cHeight / img.height);
      offsetX = (cWidth - drawWidth) / 2;
    }

    // Set cinematic black background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Scale ctx to handle high DPI displays, then draw
    ctx.save();
    ctx.scale(dpr, dpr);
    
    // Draw Active Sequence Layer (Matches both sequences perfectly via sequence handoff)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    ctx.restore();
  };

  const scheduleDraw = (latestProgress: number, data: FrameData | null = frameData) => {
    if (!canvasRef.current || !data) return;
    
    let activeImg: HTMLImageElement | undefined;
    
    // 0 -> 0.6 is Phase 1 (Hero Space)
    // 0.6 -> 1.0 is Phase 2 (Section/Screen Space)
    if (latestProgress <= 0.6) {
      const heroProgress = latestProgress / 0.6;
      const maxIndex = data.heroImages.length - 1;
      const frameIndex = Math.min(Math.floor(heroProgress * maxIndex), maxIndex);
      activeImg = data.heroImages[frameIndex];
    } else {
      const sectionProgress = (latestProgress - 0.6) / 0.4;
      const maxIndex = data.sectionImages.length - 1;
      const frameIndex = Math.min(Math.floor(sectionProgress * maxIndex), maxIndex);
      activeImg = data.sectionImages[frameIndex];
    }
    
    if (activeImg) {
      requestAnimationFrame(() => drawFrame(canvasRef.current!, activeImg));
    }
  };

  // Sync scroll progress with frame image
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scheduleDraw(latest);
  });

  const resizeCanvas = (data: FrameData | null = frameData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    if (data && data.heroImages.length > 0) {
      scheduleDraw(scrollYProgress.get(), data);
    }
  };

  useEffect(() => {
    let mounted = true;
    preloadImages().then((data) => {
      if (!mounted) return;
      setFrameData(data);
      setIsLoading(false);
      // Setup initial canvas bounds and draw first composite frame
      resizeCanvas(data);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => resizeCanvas(frameData);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameData, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
        />

        {/* LOADING OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000">
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/80 font-mono tracking-widest text-sm uppercase">
                Loading experience...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
