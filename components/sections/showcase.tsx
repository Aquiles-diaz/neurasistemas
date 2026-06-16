"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { PROJECTS, type Project } from "@/components/sections/projects-data";

/* ============================================================
   CRT monitor geometry — a hand-drawn 3/4 frustum (front face,
   right face with vents, top lid, swivel base). Same for every
   instance, so it's computed once at module load; only the
   gradient ids differ per monitor.
   ============================================================ */
type Pt = [number, number];
const lerp = (a: Pt, b: Pt, t: number): Pt => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const poly = (pts: Pt[]) =>
  pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

const FTL: Pt = [70, 60];
const FTR: Pt = [320, 60];
const FBR: Pt = [320, 330];
const FBL: Pt = [70, 330];
const cF: Pt = [195, 195];
const cB: Pt = [cF[0] + 108, cF[1] - 50];
const TAPER = 0.8;
const back = (c: Pt): Pt => [
  cB[0] + (c[0] - cF[0]) * TAPER,
  cB[1] + (c[1] - cF[1]) * TAPER,
];
const BTL = back(FTL);
const BTR = back(FTR);
const BBR = back(FBR);
const BBL = back(FBL);
const TOP_FACE = poly([FTL, FTR, BTR, BTL]);
const RIGHT_FACE = poly([FTR, BTR, BBR, FBR]);
const BACK_FACE = poly([BTL, BTR, BBR, BBL]);
const VENTS = Array.from({ length: 11 }, (_, k) => {
  const u = 0.32 + (k / 10) * 0.62;
  const a = lerp(FTR, BTR, u);
  const b = lerp(FBR, BBR, u);
  return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
});

// Screen cutout (inner sunk panel) — also the zoom pivot.
const SCR = { x: 96, y: 86, w: 198, h: 218, r: 36 };
// Screen-center as a fraction of the SVG box (viewBox "55 25 385 390").
const ORIGIN_X = (SCR.x + SCR.w / 2 - 55) / 385; // ≈ 0.364
const ORIGIN_Y = (SCR.y + SCR.h / 2 - 25) / 390; // ≈ 0.436

function MonitorSvg({
  index,
  project,
  on,
}: {
  index: number;
  project: Project;
  on: boolean;
}) {
  const id = (k: string) => `${k}-${index}`;
  return (
    <svg viewBox="55 25 385 390" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id("front")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ded7c4" />
          <stop offset="1" stopColor="#c7bfa9" />
        </linearGradient>
        <linearGradient id={id("top")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ece6d4" />
          <stop offset="1" stopColor="#d6cfba" />
        </linearGradient>
        <linearGradient id={id("side")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bdb5a0" />
          <stop offset="1" stopColor="#a59d88" />
        </linearGradient>
        <radialGradient id={id("scr")} cx="42%" cy="38%" r="75%">
          <stop offset="0" stopColor="#3a4046" />
          <stop offset="55%" stopColor="#23282d" />
          <stop offset="100%" stopColor="#14171a" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <rect x={SCR.x} y={SCR.y} width={SCR.w} height={SCR.h} rx={SCR.r} />
        </clipPath>
        <pattern
          id={id("scan")}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="2" fill="rgba(0,0,0,0.22)" />
        </pattern>
      </defs>

      {/* contact shadow (no stand — the monitor sits flush) */}
      <ellipse cx="195" cy="344" rx="118" ry="14" fill="#000" opacity="0.28" />

      {/* 3D body */}
      <polygon points={BACK_FACE} fill="#aaa28d" />
      <polygon points={RIGHT_FACE} fill={`url(#${id("side")})`} />
      <g stroke="#7d7660" strokeWidth="2.4" opacity="0.55" strokeLinecap="round">
        {VENTS.map((v, k) => (
          <line
            key={k}
            x1={v.x1.toFixed(1)}
            y1={v.y1.toFixed(1)}
            x2={v.x2.toFixed(1)}
            y2={v.y2.toFixed(1)}
          />
        ))}
      </g>
      <polygon points={TOP_FACE} fill={`url(#${id("top")})`} />

      {/* front face */}
      <rect x="70" y="60" width="250" height="270" rx="26" fill={`url(#${id("front")})`} />
      <rect
        x="70"
        y="60"
        width="250"
        height="270"
        rx="26"
        fill="none"
        stroke="#efe8d6"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* sunk screen */}
      <rect x="90" y="80" width="210" height="230" rx="40" fill="#1b1d1f" />
      <rect
        x={SCR.x}
        y={SCR.y}
        width={SCR.w}
        height={SCR.h}
        rx={SCR.r}
        fill={`url(#${id("scr")})`}
      />

      {/* ---- screen content (revealed when powered on) ---- */}
      <g clipPath={`url(#${id("clip")})`}>
        {project.image ? (
          <image
            href={project.image}
            x={SCR.x}
            y={SCR.y}
            width={SCR.w}
            height={SCR.h}
            preserveAspectRatio="xMidYMid slice"
            opacity={on ? 1 : 0}
            style={{ transition: "opacity 0.6s ease" }}
          />
        ) : (
          <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
            <rect x={SCR.x} y={SCR.y} width={SCR.w} height={SCR.h} fill="#0a140d" />
            <text x="112" y="140" fill="#7dffa6" fontSize="14" fontFamily="monospace">
              &gt; {project.name}
            </text>
            <text x="112" y="166" fill="#5fd98c" fontSize="11" fontFamily="monospace">
              &gt; {project.type}
            </text>
            <text x="112" y="206" fill="#3f9c63" fontSize="11" fontFamily="monospace">
              &gt; cargar_proyecto
            </text>
          </g>
        )}
        {/* scanlines + green wash so it reads as a live tube */}
        <rect
          x={SCR.x}
          y={SCR.y}
          width={SCR.w}
          height={SCR.h}
          fill={`url(#${id("scan")})`}
          opacity={on ? 0.5 : 0}
          style={{ transition: "opacity 0.6s ease" }}
        />
        <rect
          x={SCR.x}
          y={SCR.y}
          width={SCR.w}
          height={SCR.h}
          fill="#7dffa6"
          opacity={on ? 0.05 : 0}
          style={{ transition: "opacity 0.6s ease" }}
        />
        {/* blinking prompt */}
        <text
          x="112"
          y="294"
          fill="#7dffa6"
          fontSize="20"
          fontFamily="monospace"
          className={on ? "ns-blink" : undefined}
          opacity={on ? 1 : 0}
        >
          &gt;_
        </text>
      </g>

      {/* curved glass reflection */}
      <path
        d="M118,104 Q150,96 196,98 Q150,118 122,160 Q108,128 118,104Z"
        fill="#aeb6bd"
        opacity="0.1"
      />
      {/* power-on flash — remounts (key) so the animation replays each time
          the screen turns on */}
      <rect
        key={on ? "on" : "off"}
        x={SCR.x}
        y={SCR.y}
        width={SCR.w}
        height={SCR.h}
        rx={SCR.r}
        fill="#dffbe8"
        opacity="0"
        className={on ? "ns-flash-on" : undefined}
      />

      {/* bezel details */}
      <circle cx="250" cy="316" r="4.5" fill="#9b9580" />
      <circle cx="250" cy="316" r="2.4" fill="none" stroke="#5d5847" strokeWidth="1.2" />
      <rect x="120" y="312" width="40" height="6" rx="3" fill="#b7af99" />

      {/* aged grime */}
      <ellipse cx="300" cy="120" rx="40" ry="60" fill="#6e6147" opacity="0.05" />
      <ellipse cx="120" cy="300" rx="50" ry="30" fill="#6e6147" opacity="0.05" />
    </svg>
  );
}

/* ============================================================
   A single falling monitor. Its fall is driven by the section's
   scroll progress over the window [s, e]; landing triggers a
   rumble; clicking (once ready) zooms into the screen.
   ============================================================ */
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function Monitor({
  index,
  project,
  progress,
  window: win,
  fallPx,
  on,
  ready,
  entering,
  active,
  onEnter,
}: {
  index: number;
  project: Project;
  progress: MotionValue<number>;
  window: [number, number];
  fallPx: number;
  on: boolean;
  ready: boolean;
  entering: boolean;
  active: boolean;
  onEnter: (slug: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const landed = useRef(false);
  const [rumbling, setRumbling] = useState(false);
  const [zoom, setZoom] = useState<{ dx: number; dy: number } | null>(null);

  const [s, e] = win;
  const lp = useTransform(progress, [s, e], [0, 1], { clamp: true });
  const eb = useTransform(lp, easeOutBack);
  const y = useTransform(eb, (v) => -(1 - v) * fallPx);
  const rotate = useTransform(eb, (v) => (1 - v) * -6);
  const scale = useTransform(eb, (v) => 0.95 + clamp01(v) * 0.05);

  // Rumble + screen flash the moment it touches down.
  useMotionValueEvent(lp, "change", (v) => {
    if (v > 0.995 && !landed.current) {
      landed.current = true;
      setRumbling(true);
      window.setTimeout(() => setRumbling(false), 520);
    }
    if (v < 0.9) landed.current = false;
  });

  const enter = () => {
    if (!ready || entering) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const scx = r.left + r.width * ORIGIN_X;
    const scy = r.top + r.height * ORIGIN_Y;
    setZoom({ dx: window.innerWidth / 2 - scx, dy: window.innerHeight / 2 - scy });
    onEnter(project.slug);
  };

  const zoomerStyle: CSSProperties =
    active && zoom
      ? {
          transform: `translate(${zoom.dx}px, ${zoom.dy}px) scale(16)`,
          transformOrigin: `${(ORIGIN_X * 100).toFixed(1)}% ${(ORIGIN_Y * 100).toFixed(1)}%`,
          transition: "transform 0.9s cubic-bezier(0.66,0,0.34,1)",
          zIndex: 60,
        }
      : entering
        ? { opacity: 0, transition: "opacity 0.4s ease" }
        : {};

  return (
    <motion.div
      style={{ y, rotate, scale }}
      className="w-[clamp(146px,24vw,310px)] [filter:drop-shadow(0_38px_30px_rgba(0,0,0,0.55))]"
    >
      {/* Only the monitor (no caption) lives inside the zoomer, so the screen
          center is the true scale pivot when entering. */}
      <div ref={wrapRef} style={zoomerStyle} className="relative">
        <div
          role="link"
          tabIndex={ready ? 0 : -1}
          aria-label={`Abrir proyecto ${project.name}`}
          onClick={enter}
          onKeyDown={(ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              enter();
            }
          }}
          className={`${rumbling ? "ns-rumbling" : ""} ${
            ready ? "cursor-pointer" : "cursor-default"
          } [transform-origin:center_bottom]`}
        >
          <MonitorSvg index={index} project={project} on={on} />
        </div>
      </div>
      {/* caption — sibling of the zoomer so it doesn't shift the pivot */}
      <div
        className="mt-3 text-center transition-opacity duration-500"
        style={{ opacity: on && !entering ? 1 : 0 }}
      >
        <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[color:var(--text-strong)]">
          {project.name}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
          {project.type}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   The scroll-driven stage: a tall section with a pinned, sticky
   viewport in which the monitors drop one by one.
   ============================================================ */
const WINDOWS: [number, number][] = [
  [0.06, 0.34],
  [0.3, 0.58],
  [0.54, 0.82],
];

function CrtStage({ projects }: { projects: Project[] }) {
  const tallRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [entering, setEntering] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [fallPx, setFallPx] = useState(760);

  const { scrollYProgress } = useScroll({
    target: tallRef,
    offset: ["start start", "end end"],
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const pickOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  useEffect(() => {
    const f = () => setFallPx(window.innerHeight * 0.95);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => setReady(v > 0.84));

  const handleEnter = (slug: string) => {
    setActiveSlug(slug);
    setEntering(true);
    window.setTimeout(() => router.push(`/proyectos/${slug}`), 760);
  };

  return (
    <div ref={tallRef} className="relative h-[300vh]">
      <div
        className={`sticky top-0 flex h-screen flex-col items-center justify-center ${
          entering ? "z-[70] overflow-visible" : "overflow-hidden"
        }`}
      >
        {/* backdrop that swallows the page as a monitor zooms in */}
        <div
          aria-hidden
          className="fixed inset-0 z-[55] bg-[#05060a]"
          style={{
            opacity: entering ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: entering ? "auto" : "none",
          }}
        />

        <div className="flex w-full items-end justify-center gap-[clamp(8px,3vw,44px)] px-4">
          {projects.map((p, i) => (
            <Monitor
              key={p.slug}
              index={i}
              project={p}
              progress={scrollYProgress}
              window={WINDOWS[i]}
              fallPx={fallPx}
              on={ready}
              ready={ready && !entering}
              entering={entering}
              active={activeSlug === p.slug}
              onEnter={handleEnter}
            />
          ))}
        </div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[color:var(--text-subtle)]"
        >
          Scrolleá ↓
        </motion.p>
        <motion.p
          style={{ opacity: pickOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[color:var(--text-subtle)]"
        >
          Elegí un monitor para entrar
        </motion.p>
      </div>
    </div>
  );
}

/* Static, no-scroll fallback for reduced-motion visitors. */
function StaticMonitors({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-12 flex flex-wrap items-start justify-center gap-[clamp(12px,3vw,44px)]">
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/proyectos/${p.slug}`}
          aria-label={`Abrir proyecto ${p.name}`}
          className="group w-[clamp(150px,28vw,300px)] [filter:drop-shadow(0_30px_24px_rgba(0,0,0,0.5))]"
        >
          <div className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
            <MonitorSvg index={i} project={p} on />
          </div>
          <div className="mt-3 text-center">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[color:var(--text-strong)]">
              {p.name}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
              {p.type}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Landing showcase: featured projects shown as bootable CRT monitors. */
export function Showcase() {
  const reduce = useReducedMotion();
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="portafolio" className="pt-[var(--section-y)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Trabajo reciente</Eyebrow>
            </Reveal>
            <Reveal delay={d(1)}>
              <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
                Proyectos que hablan por nosotros
              </h2>
            </Reveal>
          </div>
          <Reveal delay={d(2)}>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:[box-shadow:var(--glow-accent-lg),var(--edge-hi)]"
            >
              Ver todos los proyectos
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </Container>

      {reduce ? (
        <Container>
          <StaticMonitors projects={featured} />
        </Container>
      ) : (
        <CrtStage projects={featured} />
      )}
    </section>
  );
}
