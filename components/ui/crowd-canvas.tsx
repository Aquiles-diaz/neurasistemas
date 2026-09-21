"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * CrowdCanvas — a crowd of line-art people (Open Peeps) walking across a
 * canvas. Same idea as skiper-ui's "canvas crowd" / zadvorsky's crowd
 * simulator, rewritten on requestAnimationFrame so the site keeps `motion`
 * as its only animation library.
 *
 * - Sprite sheet: `cols` × `rows` frames, one person each.
 * - Depth: people spawn at a random baseline; the further back, the higher
 *   and earlier they're drawn, so the front row overlaps the back.
 * - Pauses when off-screen (IntersectionObserver) and renders a single
 *   static frame under `prefers-reduced-motion`.
 * - The art is black on transparent; the canvas gets `dark:invert` so it
 *   reads white on the dark theme.
 */
export function CrowdCanvas({
  src,
  cols = 15,
  rows = 7,
  className,
}: {
  src: string;
  cols?: number;
  rows?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const easeInQuad = (t: number) => t * t;

    type Peep = {
      sx: number; // sprite rect
      sy: number;
      w: number;
      h: number;
      x: number;
      y: number;
      anchorY: number;
      dir: 1 | -1;
      startX: number;
      endX: number;
      duration: number; // ms for the full crossing
      elapsed: number;
    };

    const stage = { w: 0, h: 0 };
    const img = new Image();
    const pool: Peep[] = [];
    const crowd: Peep[] = [];
    let raf = 0;
    let last = 0;
    let running = false;
    let visible = false;
    let ready = false;

    const reset = (p: Peep, progress = 0) => {
      p.dir = Math.random() > 0.5 ? 1 : -1;
      // Baseline: most people near the front, a few further back and higher.
      const offsetY = 100 - 250 * easeInQuad(Math.random());
      p.anchorY = stage.h - p.h + offsetY;
      p.y = p.anchorY;
      if (p.dir === 1) {
        p.startX = -p.w;
        p.endX = stage.w;
      } else {
        p.startX = stage.w + p.w;
        p.endX = -p.w;
      }
      p.duration = 10_000 / rand(0.5, 1.5);
      p.elapsed = progress * p.duration;
      p.x = p.startX + (p.endX - p.startX) * progress;
    };

    const spawn = (progress = 0) => {
      if (pool.length === 0) return;
      const p = pool.splice((Math.random() * pool.length) | 0, 1)[0];
      reset(p, progress);
      crowd.push(p);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      for (const p of crowd) {
        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.dir === -1) {
          ctx.translate(p.w, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(img, p.sx, p.sy, p.w, p.h, 0, 0, p.w, p.h);
        ctx.restore();
      }
      ctx.restore();
    };

    const step = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      for (let i = crowd.length - 1; i >= 0; i--) {
        const p = crowd[i];
        p.elapsed += dt;
        const t = p.elapsed / p.duration;
        if (t >= 1) {
          crowd.splice(i, 1);
          pool.push(p);
          spawn();
          continue;
        }
        p.x = p.startX + (p.endX - p.startX) * t;
        // Walking bob: a 500 ms yoyo, up to 10 px.
        const bob = Math.abs(Math.sin((p.elapsed / 500) * Math.PI)) * 10;
        p.y = p.anchorY - bob;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || !ready || !visible || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const layout = () => {
      stage.w = canvas.clientWidth;
      stage.h = canvas.clientHeight;
      canvas.width = Math.round(stage.w * devicePixelRatio);
      canvas.height = Math.round(stage.h * devicePixelRatio);
      // Rebuild the crowd for the new stage, scattered along their walks.
      pool.push(...crowd.splice(0));
      while (pool.length) spawn(Math.random());
      draw();
    };

    const onLoad = () => {
      const fw = img.naturalWidth / cols;
      const fh = img.naturalHeight / rows;
      for (let i = 0; i < cols * rows; i++) {
        pool.push({
          sx: (i % cols) * fw,
          sy: ((i / cols) | 0) * fh,
          w: fw,
          h: fh,
          x: 0,
          y: 0,
          anchorY: 0,
          dir: 1,
          startX: 0,
          endX: 0,
          duration: 1,
          elapsed: 0,
        });
      }
      ready = true;
      layout();
      start();
    };

    img.addEventListener("load", onLoad);
    img.src = src;

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      if (ready) layout();
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      img.removeEventListener("load", onLoad);
    };
  }, [src, cols, rows]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("block h-full w-full dark:invert", className)}
    />
  );
}
