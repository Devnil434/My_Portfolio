"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { preloadImages } from "@/lib/preloadImages";
import SectionsOverlay from "./SectionsOverlay";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
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
    // Scale down logical dimensions for drawing logic since canvas.width is scaled
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
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  const scheduleDraw = (frameIndex: number, imgs: HTMLImageElement[] = images) => {
    if (!canvasRef.current || imgs.length === 0) return;
    const img = imgs[frameIndex];
    if (img) {
      requestAnimationFrame(() => drawFrame(canvasRef.current!, img));
    }
  };

  // Sync scroll progress with frame image
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.floor(latest * (images.length - 1));
    scheduleDraw(frameIndex);
  });

  const resizeCanvas = (imgs: HTMLImageElement[] = images) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    if (imgs.length > 0) {
      const frameIndex = Math.floor(scrollYProgress.get() * (imgs.length - 1));
      scheduleDraw(frameIndex, imgs);
    }
  };

  useEffect(() => {
    let mounted = true;
    preloadImages().then((imgs) => {
      if (!mounted) return;
      setImages(imgs);
      setIsLoading(false);
      // Setup initial canvas bounds and draw first frame
      resizeCanvas(imgs);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => resizeCanvas(images);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* SCROLL-DRIVEN UI LAYERS */}
        <SectionsOverlay scrollYProgress={scrollYProgress} />

        {/* LOADING OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000">
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/80 font-mono tracking-widest text-sm uppercase">
                Initializing experience...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
