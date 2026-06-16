"use client";

import { useEffect, useState, Fragment } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "motion/react";

/* ============================================================
   A spiral "spring" of flow on the right. As you scroll, the
   coil STRETCHES downward — it grows longer and winds more turns
   (it doesn't slide as a rigid block). The nodes are coloured
   "suns" (n8n palette) that orbit around their point on the
   spiral, drifting down / up and turning a full 360° as the coil
   extends. Semi-transparent, behind the content. Static under
   reduced motion.
   ============================================================ */

const TWO_PI = Math.PI * 2;
const DEF = { w: 1440, h: 900 };
const HALF = 27;

type IconKey = "webhook" | "code" | "branch" | "database" | "send";
const NODES: { u: number; icon: IconKey; label: string }[] = [
  { u: 0.06, icon: "webhook", label: "WEBHOOK" },
  { u: 0.28, icon: "code", label: "TRANSFORMAR" },
  { u: 0.5, icon: "branch", label: "FILTRAR" },
  { u: 0.72, icon: "database", label: "GUARDAR" },
  { u: 0.94, icon: "send", label: "ENVIAR" },
];

// n8n-style colours, one per node.
const COLORS = [
  { glow: "#f2c94c", top: "#ffe488", bot: "#c89a1e" }, // yellow
  { glow: "#5b8cff", top: "#93b4ff", bot: "#3a5fd9" }, // blue
  { glow: "#ff5c8a", top: "#ff93b4", bot: "#d83b69" }, // pink
  { glow: "#15c8a0", top: "#63e7c8", bot: "#0d9077" }, // teal
  { glow: "#b07cff", top: "#cda9ff", bot: "#894fe2" }, // purple
];

// motion + shape tuning
const SPIN = 0.13; // idle rad/s
const SCROLL_SPIN = 0.5; // extra turns of phase across the page
const BASE_COILS = 1.5;
const EXTRA_COILS = 1.6; // coils added as it stretches
const ORBIT_R = 16;
const ORBIT_SPIN = 0.6;

const baseGeom = (w: number, h: number) => ({
  cx: w * 0.7,
  R: Math.min(w, h) * 0.12,
  topY: h * 0.1,
});

function coilPoint(
  u: number,
  w: number,
  h: number,
  phi: number,
  height: number,
  coils: number
) {
  const { cx, R, topY } = baseGeom(w, h);
  const ang = u * coils * TWO_PI + phi;
  return {
    x: cx + R * Math.cos(ang),
    y: topY + u * height,
    depth: (Math.sin(ang) + 1) / 2,
  };
}

function coilPath(
  w: number,
  h: number,
  phi: number,
  height: number,
  coils: number
) {
  const STEPS = 80;
  let s = "";
  for (let k = 0; k <= STEPS; k++) {
    const p = coilPoint(k / STEPS, w, h, phi, height, coils);
    s += (k ? " L " : "M ") + p.x.toFixed(1) + " " + p.y.toFixed(1);
  }
  return s;
}

function renderIcon(key: IconKey) {
  switch (key) {
    case "webhook":
      return (
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      );
    case "code":
      return (
        <>
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </>
      );
    case "branch":
      return (
        <>
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </>
      );
    case "send":
      return (
        <>
          <path d="M22 2 11 13" />
          <path d="m22 2-7 20-4-9-9-4Z" />
        </>
      );
  }
}

function SunNode({
  i,
  x,
  y,
  scale,
  opacity,
  icon,
  label,
}: {
  i: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  icon: IconKey;
  label: string;
}) {
  const c = COLORS[i];
  return (
    <motion.g style={{ x, y, scale, opacity }}>
      <circle r={48} fill={`url(#ns-glow-${i})`} />
      <rect
        x={-HALF}
        y={-HALF}
        width={HALF * 2}
        height={HALF * 2}
        rx={14}
        fill={`url(#ns-fill-${i})`}
        stroke={c.top}
        strokeOpacity={0.7}
        strokeWidth={1.5}
      />
      <path
        d={`M ${-HALF + 13} ${-HALF + 1.5} H ${HALF - 13}`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <g
        transform="translate(-11,-11) scale(0.92)"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {renderIcon(icon)}
      </g>
      <text
        y={45}
        textAnchor="middle"
        className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em]"
        style={{ fill: "var(--text-subtle)" }}
      >
        {label}
      </text>
    </motion.g>
  );
}

export function DeviceMockup() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [size, setSize] = useState(DEF);

  const nx = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const ny = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const ns = [useMotionValue(1), useMotionValue(1), useMotionValue(1), useMotionValue(1), useMotionValue(1)];
  const no = [useMotionValue(0.7), useMotionValue(0.7), useMotionValue(0.7), useMotionValue(0.7), useMotionValue(0.7)];
  const pathD = useMotionValue(
    coilPath(DEF.w, DEF.h, 0, DEF.h * 0.4, BASE_COILS)
  );

  // Lay out the coil for a moment in time at scroll progress `sp`.
  const place = (w: number, h: number, t: number, sp: number) => {
    const phi = t * SPIN + sp * SCROLL_SPIN * TWO_PI;
    const height = h * 0.4 + sp * h * 1.15; // stretches downward with scroll
    const coils = BASE_COILS + sp * EXTRA_COILS; // gains turns as it extends
    for (let i = 0; i < NODES.length; i++) {
      const base = coilPoint(NODES[i].u, w, h, phi, height, coils);
      const oa = t * ORBIT_SPIN + i * 1.3;
      nx[i].set(base.x + Math.cos(oa) * ORBIT_R);
      ny[i].set(base.y + Math.sin(oa) * ORBIT_R * 0.6);
      ns[i].set(0.66 + base.depth * 0.46);
      no[i].set(0.4 + base.depth * 0.55);
    }
    pathD.set(coilPath(w, h, phi, height, coils));
  };

  useEffect(() => {
    const measure = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduce) place(size.w, size.h, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, size]);

  useAnimationFrame((t) => {
    if (reduce) return;
    place(size.w, size.h, t / 1000, scrollYProgress.get());
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <svg
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="h-full w-full"
        style={{ opacity: 0.7 }}
      >
        <defs>
          <linearGradient id="ns-flow-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2c94c" />
            <stop offset="0.28" stopColor="#5b8cff" />
            <stop offset="0.5" stopColor="#ff5c8a" />
            <stop offset="0.72" stopColor="#15c8a0" />
            <stop offset="1" stopColor="#b07cff" />
          </linearGradient>
          {COLORS.map((c, i) => (
            <Fragment key={i}>
              <linearGradient id={`ns-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={c.top} />
                <stop offset="1" stopColor={c.bot} />
              </linearGradient>
              <radialGradient id={`ns-glow-${i}`}>
                <stop offset="0" stopColor={c.glow} stopOpacity="0.55" />
                <stop offset="100%" stopColor={c.glow} stopOpacity="0" />
              </radialGradient>
            </Fragment>
          ))}
        </defs>

        {/* the spiral spring — faint pipe + flowing coloured dashes */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#ns-flow-stroke)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="6 15"
          className={reduce ? undefined : "ns-flow"}
        />

        {/* orbiting coloured suns */}
        {NODES.map((n, i) => (
          <SunNode
            key={n.label}
            i={i}
            x={nx[i]}
            y={ny[i]}
            scale={ns[i]}
            opacity={no[i]}
            icon={n.icon}
            label={n.label}
          />
        ))}
      </svg>
    </div>
  );
}
