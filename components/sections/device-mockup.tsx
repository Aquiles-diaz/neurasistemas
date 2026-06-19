"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Bot } from "lucide-react";

/* ============================================================
   Hero showpiece: on the left, a compact "automation engine"
   stack of the real platforms we build on (n8n · Zapier · Make)
   with their brand marks, wired by a flowing spine; on the right
   a phone where an AI assistant answers WhatsApp messages —
   cycling through business niches, on a loop (like a short
   video). Static, single exchange under reduced motion.
   ============================================================ */

// ---- The niches the AI assistant cycles through ----
type Niche = { label: string; emoji: string; user: string; ai: string };

const NICHES: Niche[] = [
  {
    label: "Restaurante",
    emoji: "🍽️",
    user: "Hola 👋 ¿Tienen mesa para 4 esta noche?",
    ai: "¡Sí! Reservé para 4 a las 21:00 hs ✅ ¿Te lo confirmo?",
  },
  {
    label: "Clínica dental",
    emoji: "🦷",
    user: "Necesito un turno con el dentista",
    ai: "Tengo martes 10:30 o jueves 16:00 🗓️ ¿Cuál preferís?",
  },
  {
    label: "E-commerce",
    emoji: "🛍️",
    user: "¿Dónde está mi pedido #1024?",
    ai: "Tu pedido salió hoy 📦 Llega mañana antes de las 18 hs.",
  },
  {
    label: "Inmobiliaria",
    emoji: "🏠",
    user: "Busco un depto de 2 ambientes",
    ai: "Tengo 3 opciones en tu zona 📸 ¿Te paso fotos y precios?",
  },
  {
    label: "Gimnasio",
    emoji: "💪",
    user: "¿Qué horarios de spinning hay?",
    ai: "Lun/Mié/Vie 19 hs y Sáb 10 hs 🚴 ¿Te anoto hoy?",
  },
];

// ============================================================
//  Automation engine stack — left side of the scene.
//  The real platforms we automate on, with their brand marks.
// ============================================================
type Platform = {
  id: string;
  name: string;
  tag: string;
  brand: string; // signature brand colour (glow + accents)
  Logo: () => React.JSX.Element;
};

// --- Brand marks (compact, recognisable, drawn inline) ---
function N8nLogo() {
  // n8n's signature interconnected-node workflow graph.
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
      <g stroke="#ffffff" strokeWidth={2} strokeLinecap="round">
        <path d="M7 16h6M19 16h6M16 16l3-7M16 16l3 7" opacity={0.85} />
      </g>
      <g fill="#ffffff">
        <circle cx="6" cy="16" r="3" />
        <circle cx="16" cy="16" r="3" />
        <circle cx="26" cy="16" r="3" />
        <circle cx="20" cy="8" r="2.4" />
        <circle cx="20" cy="24" r="2.4" />
      </g>
    </svg>
  );
}

function ZapierLogo() {
  // Zapier's six-point orange spark.
  return (
    <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden>
      <g stroke="#ffffff" strokeWidth={3.4} strokeLinecap="round">
        <path d="M16 4v24M16 16 5.6 10M16 16l10.4-6M16 16 5.6 22M16 16l10.4 6" />
      </g>
    </svg>
  );
}

function MakeLogo() {
  // Make's geometric mark — four shapes in a row over its violet field.
  return (
    <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden fill="#ffffff">
      <rect x="4" y="6" width="3.4" height="20" rx="1.7" />
      <path d="M11.5 26V6l5.2 13 5.2-13v20" fill="none" stroke="#ffffff" strokeWidth={3.4} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="27.2" cy="9" r="2.6" />
      <rect x="24.6" y="16" width="5.2" height="10" rx="2.6" />
    </svg>
  );
}

const PLATFORMS: Platform[] = [
  { id: "n8n", name: "n8n", tag: "Workflows a medida", brand: "#ea4b71", Logo: N8nLogo },
  { id: "zapier", name: "Zapier", tag: "6.000+ apps", brand: "#ff4f00", Logo: ZapierLogo },
  { id: "make", name: "Make", tag: "Escenarios visuales", brand: "#a855f7", Logo: MakeLogo },
];

function PlatformCard({
  p,
  index,
  reduce,
}: {
  p: Platform;
  index: number;
  reduce: boolean;
}) {
  const { Logo } = p;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }
        }
        className="glass-pill relative flex items-center gap-3 rounded-2xl px-3.5 py-3"
      >
        {/* brand-tinted glow bleeding from the logo tile */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-3 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full opacity-70 blur-xl"
          style={{ background: `radial-gradient(circle, ${p.brand}, transparent 70%)` }}
        />
        <div
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
          style={{
            background: `linear-gradient(150deg, ${p.brand}, color-mix(in srgb, ${p.brand} 55%, #000))`,
          }}
        >
          <Logo />
        </div>
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-display)] text-[15px] font-semibold leading-tight text-[color:var(--text-strong)]">
            {p.name}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[color:var(--text-subtle)]">
            {p.tag}
          </p>
        </div>
        {/* live pulse dot in the brand colour */}
        <span className="relative ml-auto flex h-2 w-2 shrink-0">
          {!reduce && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: p.brand }}
            />
          )}
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: p.brand }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}

function AutomationStack({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative flex h-full flex-col justify-center">
      {/* flowing spine wired down the left edge of the cards */}
      <svg
        aria-hidden
        viewBox="0 0 24 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-[14px] top-1/2 h-[62%] w-6 -translate-y-1/2"
      >
        <defs>
          <linearGradient id="ns-spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ea4b71" />
            <stop offset="0.5" stopColor="#ff4f00" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="ns-spine-pkt">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path id="ns-spine-path" d="M12 6 V394" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
        <path
          d="M12 6 V394"
          fill="none"
          stroke="url(#ns-spine)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="5 14"
          className={reduce ? undefined : "ns-flow"}
        />
        {!reduce &&
          [0, 1].map((k) => (
            <circle key={k} r={4} fill="url(#ns-spine-pkt)">
              <animateMotion dur="2.6s" begin={`${k * 1.3}s`} repeatCount="indefinite">
                <mpath href="#ns-spine-path" />
              </animateMotion>
            </circle>
          ))}
      </svg>

      <div className="relative flex flex-col gap-4 pl-1.5">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-subtle)]"
        >
          Motor de automatización
        </motion.p>

        {PLATFORMS.map((p, i) => (
          <PlatformCard key={p.id} p={p} index={i} reduce={reduce} />
        ))}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-1 flex items-center gap-2 pl-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-subtle)]"
        >
          <span className="h-px w-5 bg-[var(--silver-400)]" />
          +1.000 tareas / día
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
//  Phone with the cycling WhatsApp AI conversation
// ============================================================
type Step = "in" | "typing" | "ai" | "out";

function Phone({ reduce }: { reduce: boolean }) {
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState<Step>(reduce ? "ai" : "in");
  const niche = NICHES[cycle % NICHES.length];

  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await sleep(700);
      while (alive) {
        setStep("in");
        await sleep(1400);
        if (!alive) break;
        setStep("typing");
        await sleep(1500);
        if (!alive) break;
        setStep("ai");
        await sleep(3300);
        if (!alive) break;
        setStep("out");
        await sleep(520);
        if (!alive) break;
        setCycle((c) => c + 1);
      }
    })();
    return () => {
      alive = false;
    };
  }, [reduce]);

  const showUser = reduce || step !== "out";
  const showTyping = !reduce && step === "typing";
  const showAi = reduce || step === "ai";

  return (
    <div className="relative w-[clamp(198px,14.5vw,242px)]">
      {/* phone frame */}
      <div className="relative aspect-[9/19] rounded-[2.1rem] border border-white/12 bg-[#0a0e0d] p-[7px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]">
        {/* glow behind */}
        <div
          aria-hidden
          className="absolute -inset-8 -z-10 rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(37,211,102,0.22), transparent 70%)",
          }}
        />
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.65rem] bg-[#0b141a]">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60" />

          {/* header */}
          <div className="flex items-center gap-2.5 bg-[#1f2c33] px-3 pb-2.5 pt-4">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#894fe2] to-[#3a5fd9] text-white shadow">
              <Bot size={17} strokeWidth={1.9} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold leading-tight text-[#e9edef]">
                Asistente IA
              </p>
              <span className="flex items-center gap-1 text-[10px] leading-tight text-[#8aa0aa]">
                <i className="inline-block h-1.5 w-1.5 rounded-full bg-[#25d366]" />
                en línea
              </span>
            </div>
          </div>

          {/* chat */}
          <div
            className="relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-2.5 py-3"
            style={{
              background:
                "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.03), transparent 60%), #0b141a",
            }}
          >
            {/* niche chip */}
            <div className="mb-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`chip-${cycle}`}
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-medium text-white/70 backdrop-blur"
                >
                  {niche.emoji} {niche.label}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="popLayout">
              {showUser && (
                <motion.div
                  key={`u-${cycle}`}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[82%] self-start rounded-2xl rounded-tl-sm bg-[#202c33] px-3 py-2 text-[11.5px] leading-snug text-[#e9edef] shadow"
                >
                  {niche.user}
                </motion.div>
              )}

              {showTyping && (
                <motion.div
                  key={`t-${cycle}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1 self-end rounded-2xl rounded-tr-sm bg-[#005c4b] px-3 py-2.5 shadow"
                >
                  {[0, 1, 2].map((d) => (
                    <i
                      key={d}
                      className="ns-dot inline-block h-1.5 w-1.5 rounded-full bg-white/80"
                      style={{ animationDelay: `${d * 0.18}s` }}
                    />
                  ))}
                </motion.div>
              )}

              {showAi && (
                <motion.div
                  key={`a-${cycle}`}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="flex max-w-[86%] items-end gap-1.5 self-end"
                >
                  <div className="rounded-2xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-[11.5px] leading-snug text-[#e9edef] shadow">
                    {niche.ai}
                    <span className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-[#8ac6b8]">
                      9:41
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M1 8.5l3 3L9 5M7 11.5l1 .5L13.5 5"
                          stroke="#53bdeb"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* input bar */}
          <div className="flex items-center gap-2 bg-[#1f2c33] px-2.5 py-2">
            <div className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5 text-[10.5px] text-[#8aa0aa]">
              Escribe un mensaje…
            </div>
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[#25d366] text-[#0b141a]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* The automation engine stack — left column on desktop. Hidden on small
   screens where its tall vertical shape would feel cramped. */
export function HeroFlow() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      data-hero-media
      className="hidden h-[clamp(420px,56vh,560px)] w-[238px] shrink-0 lg:block xl:w-[264px]"
    >
      <AutomationStack reduce={reduce} />
    </div>
  );
}

/* The phone — the star of the scene. Always visible; centered on mobile,
   right column on desktop. */
export function HeroPhone() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      aria-hidden
      data-hero-media
      className="pointer-events-none flex w-full justify-center lg:w-auto lg:justify-end"
    >
      <Phone reduce={reduce} />
    </div>
  );
}
