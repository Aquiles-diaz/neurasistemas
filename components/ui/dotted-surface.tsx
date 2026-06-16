"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D wave of platinum dots (adapted from 21st.dev "dotted-surface" to the
 * Neura design system). Implemented with Canvas 2D + manual perspective
 * projection instead of three.js/WebGL so it renders on every machine —
 * including browsers with hardware acceleration disabled. Static when the
 * visitor prefers reduced motion.
 */

const SEPARATION = 150;
const AMOUNTX = 50; // columns (world X)
const AMOUNTY = 55; // rows away from the camera (world Z)
const FOV = 560; // perspective strength
const CAM_HEIGHT = 330; // camera height above the wave plane
const NEAR = 320; // distance of the first row

export function DottedSurface({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = canvas.parentElement as HTMLElement;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (count: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const horizon = height * 0.3; // dots live below this line

      // Per row: depth-dependent scale, alpha and dot size are constant, so
      // each row batches into a single fill for speed on software canvases.
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const z = NEAR + iy * SEPARATION;
        const s = FOV / (FOV + z);
        const alpha = Math.max(0, Math.min(1, 1.15 - z / 5200)) * 0.62;
        if (alpha <= 0.01) continue;
        const r = Math.max(0.6, 3.4 * s);

        ctx.beginPath();
        for (let ix = 0; ix < AMOUNTX; ix++) {
          const x = (ix - (AMOUNTX - 1) / 2) * SEPARATION;
          const wave =
            Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          const px = cx + x * s;
          if (px < -8 || px > width + 8) continue;
          const py = horizon + (CAM_HEIGHT - wave) * s;
          ctx.moveTo(px + r, py);
          ctx.arc(px, py, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(221, 224, 229, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationId = 0;
    let count = 0;
    if (reduce) {
      draw(0); // one still frame — texture without motion
    } else {
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        draw(count);
        count += 0.04;
      };
      animate();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(count);
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // fade the field out toward the top so the copy stays clean
        "[mask-image:linear-gradient(to_bottom,transparent_0%,black_38%,black_100%)]",
        className
      )}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
