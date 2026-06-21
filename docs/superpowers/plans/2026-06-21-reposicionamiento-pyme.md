# Reposicionamiento PyME / Automatización — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the Neura Sistemas landing from a dark/metal "premium studio" to a light, PyME/automation-focused site (blue/green + orange, Montserrat+Inter) with a new conversion-oriented section set.

**Architecture:** Next.js 15 static export, Tailwind v4 with CSS-variable design tokens in `app/globals.css`. The re-theme is driven by swapping the `:root` token values (one foundation task) so every section inherits the new look; then we add/reframe section components and rewire `app/page.tsx`. No backend; forms stay `mailto:`-based.

**Tech Stack:** Next.js 15 (App Router, `output: "export"`), React 19, Tailwind v4, motion (Reveal), GSAP (hero), lucide-react icons, `next/font` (Inter + Montserrat).

## Global Constraints

- **Voice:** Spanish rioplatense, **voseo** ("elegí", "mirá", "facturás"). Mobile-first (~80% mobile).
- **No test framework exists** in this repo. The per-task gate is: **`npx eslint .` clean** + **`npm run build` succeeds** + the described **visual check**. Do NOT invent a test runner.
- **`components/ui/**`** (vendored cult.ui) is ignored by ESLint — don't rely on linting it.
- **Accessibility:** contrast AA; respect `prefers-reduced-motion` (content never hidden); lucide SVG icons, **no emoji in final UI**.
- **Casos & testimonios** carry a visible **"Ejemplo ilustrativo"** badge (content is invented until real clients exist).
- **Contact data:** email `aquilesdiaz335@gmail.com`, WhatsApp `+54 9 3402507879` (`https://wa.me/5493402507879`), location **Rosario, Santa Fe**.
- **Prices are public:** Arrancar $450, Crecer $900, Dominar $1800 (USD, "Desde").
- Commit after each task. Branch: `reposicionamiento-pyme`.

### New design tokens (use these exact values)
| Token | Value | Role |
|---|---|---|
| `--bg-base` | `#FFFFFF` | page background |
| `--surface-1` | `#F7F9FC` | alt band / cards |
| `--surface-2` | `#EEF2F8` | nested surface |
| `--border-subtle` | `#E2E8F0` | hairlines |
| `--border-strong` | `#CBD5E1` | stronger borders |
| `--text-strong` | `#0F172A` | headings |
| `--text-body` | `#334155` | body |
| `--text-muted` | `#475569` | secondary |
| `--text-subtle` | `#94A3B8` | captions |
| `--primary` | `#1D4ED8` | blue (confianza) |
| `--navy` | `#0B1F33` | dark contrast bands |
| `--secondary` | `#10B981` | green (solución/positivo) |
| `--secondary-ink` | `#047857` | green text on light |
| `--accent-cta` | `#F97316` | orange CTA |
| `--accent-cta-hover` | `#EA580C` | orange CTA hover |
| `--danger-400` | `#DC2626` | "problema"/antes (sparingly) |

### Shared interfaces produced by foundation (Task 1)
- CSS vars above available globally.
- `--font-display` → Montserrat; `--font-body` → Inter.
- `CtaButton` component in `components/sections/primitives.tsx`:
  `CtaButton(props: ButtonHTMLAttributes<HTMLButtonElement> & { size?: "sm"|"md"|"lg" })` — solid orange, white text.
- Existing helpers reused by every section: `Container`, `Eyebrow`, `Badge`, `SecondaryButton` (primitives.tsx), `Reveal`, `d` (`components/ui/reveal`).

---

## Task 1: Foundation — light theme tokens, Montserrat, CTA button

**Files:**
- Modify: `app/globals.css` (`:root` block ~lines 12-111, `@theme inline` ~116-152, base `html`/`body` ~161-187)
- Modify: `app/layout.tsx` (font imports, `<html>` class, `<head>` link, metadata copy)
- Modify: `components/sections/primitives.tsx` (add `CtaButton`)

**Interfaces:**
- Produces: all new CSS tokens; `--font-montserrat` var; `CtaButton`.

- [ ] **Step 1: Swap `:root` token values in `app/globals.css`.** Replace the dark values with the light palette from Global Constraints. Concretely set: `--bg-base:#FFFFFF; --bg-sunken:#F1F5F9; --surface-1:#F7F9FC; --surface-2:#EEF2F8; --surface-3:#E7ECF3; --text-strong:#0F172A; --text-body:#334155; --text-muted:#475569; --text-subtle:#94A3B8; --text-onaccent:#FFFFFF;`. Add new vars: `--primary:#1D4ED8; --navy:#0B1F33; --secondary:#10B981; --secondary-ink:#047857; --accent-cta:#F97316; --accent-cta-hover:#EA580C;`. Repoint `--accent-300/400/500` to blues (`#3B82F6/#1D4ED8/#1E40AF`) so legacy references stay sensible. Set borders to light: `--border-subtle:#E2E8F0; --border-default:#E2E8F0; --border-strong:#CBD5E1;`. Soften shadows for light bg: `--shadow-sm:0 1px 2px rgba(15,23,42,.06); --shadow-md:0 10px 30px -12px rgba(15,23,42,.12); --shadow-lg:0 24px 60px -20px rgba(15,23,42,.18); --edge-hi:inset 0 1px 0 rgba(255,255,255,.6);`.

- [ ] **Step 2: Update `@theme inline` + base layer.** Set `--font-display: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;`. Change `html { background: #000 }` → `html { background: var(--bg-base) }`. Change `body { background: transparent }` → `background: var(--bg-base)`. Keep all `@keyframes` and `prefers-reduced-motion` block as-is.

- [ ] **Step 3: Montserrat + light html in `app/layout.tsx`.** Add `import { Inter, Montserrat } from "next/font/google";` and `const montserrat = Montserrat({ subsets:["latin"], weight:["600","700","800"], variable:"--font-montserrat", display:"swap" });`. Change `<html lang="es" className={`dark ${inter.variable}`}>` → `<html lang="es" className={`${inter.variable} ${montserrat.variable}`}>` (drop `dark`). Remove the Stack Sans Notch `<link>` (and keep the preconnects or drop them since next/font self-hosts — drop the googleapis links). Set `viewport.themeColor:"#0B1F33"`. Update `metadata.title.default` → `"Neura Sistemas — Automatización y Web para PyMEs"`, `metadata.description` → `"Automatizamos tu negocio: webs, CRM, chatbots y automatización para PyMEs y comercios. Trabajás menos, facturás más."` and openGraph/twitter copy to match.

- [ ] **Step 4: Add `CtaButton` to `components/sections/primitives.tsx`.** Mirror `SecondaryButton`'s shape:

```tsx
/** Primary CTA — solid orange, white text, lifts on hover. */
export function CtaButton({
  children,
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-[52px] px-7 text-base",
  };
  return (
    <button
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--accent-cta)] font-semibold text-white shadow-[var(--shadow-md)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-cta-hover)] active:translate-y-px active:scale-[0.985]",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Verify.** Run `npx eslint .` (expect clean) and `npm run build` (expect success). Visually the site will look half-broken (old sections on a light bg) — that's expected; we only confirm **no errors** and that backgrounds are now light.

- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: light theme tokens + Montserrat + CtaButton"`

---

## Task 2: Hero — video background + new copy

**Files:**
- Create: `components/sections/hero-video.tsx`
- Modify: `components/sections/hero.tsx` (full rewrite)
- Asset note: drop `public/hero/hero-bg.webm`, `public/hero/hero-bg.mp4`, `public/hero/hero-poster.jpg` later; component must work without them.

**Interfaces:**
- Consumes: `CtaButton`, `Container` (primitives), `useScrollTo`.
- Produces: `HeroVideoBg` component (background only).

- [ ] **Step 1: Create `hero-video.tsx`.** Full-bleed background that degrades gracefully:

```tsx
"use client";
export function HeroVideoBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[color:var(--navy)]">
      <video
        className="h-full w-full object-cover opacity-90 motion-reduce:hidden"
        autoPlay muted loop playsInline preload="metadata"
        poster="/hero/hero-poster.jpg"
      >
        <source src="/hero/hero-bg.webm" type="video/webm" />
        <source src="/hero/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Fallback gradient if neither video nor poster loads, plus scrim for text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(29,78,216,.45),transparent_55%),linear-gradient(180deg,rgba(11,31,51,.78),rgba(11,31,51,.92))]" />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `hero.tsx`.** Section `id="top"`, `min-h-[88vh]`, `relative overflow-hidden`. Render `<HeroVideoBg />` then a `Container` with white text, left-aligned, max-w-[640px]. Content (exact copy):
  - H1: **"Automatizamos tu negocio. Trabajás menos, facturás más."** (white, Montserrat, `text-[clamp(2.2rem,5.5vw,4.2rem)]`).
  - Sub `<p>` (light slate-200): "Webs, CRM, chatbots y automatización para PyMEs y comercios que quieren crecer sin morir en el intento."
  - Buttons row: `<CtaButton size="lg" onClick={() => scrollTo("solucion")}>Ver cómo funciona <ArrowRight/></CtaButton>` + `<SecondaryButton size="lg" onClick={() => scrollTo("contacto")}>Agendá una llamada</SecondaryButton>` (give SecondaryButton a `className` to read on dark: white text/border — e.g. `border-white/30 bg-white/10 text-white hover:bg-white/20`).
  - Benefits row (lucide `CheckCircle2`, green `--secondary`): three inline items — "Implementación en 2-3 semanas" · "Sin codificar" · "Soporte local".
  - Keep the GSAP `[data-hero]` staggered entrance from the current file (wrap each block in `data-hero`), inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Remove `HeroFlow`/`HeroPhone`/aura/STATS.

- [ ] **Step 3: Verify.** `npx eslint .` clean; `npm run build` success. Visual: hero shows navy gradient (no video file yet) with white copy, orange CTA, three green checks; CTA scrolls toward `#solucion` (exists after Task 3 — fine to verify after integration).

- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat: hero with video background + PyME copy"`

---

## Task 3: Problema → Solución section

**Files:** Create `components/sections/solution.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Reveal`, `d`. Section `id="solucion"`.

- [ ] **Step 1: Build the section.** Pattern after `services.tsx` (Eyebrow + h2 + Reveal grid). Eyebrow "Antes / Después"; h2 **"Del caos operativo al piloto automático"**. Data array (icons from lucide-react), render 4 transformation rows — left card (problema) muted with `--danger-400` icon + strike feel, center `ArrowRight`, right card (solución) with `--secondary` icon on `--surface-1`:

```tsx
import { Phone, FileSpreadsheet, Clock, Frown, CalendarCheck, LayoutDashboard, Zap, Smile } from "lucide-react";
const ROWS = [
  { pIcon: Phone, problema: "30 llamadas por día para tomar reservas", sIcon: CalendarCheck, solucion: "Sistema de reservas automático 24/7" },
  { pIcon: FileSpreadsheet, problema: "Hojas de Excel desactualizadas", sIcon: LayoutDashboard, solucion: "Dashboard en tiempo real" },
  { pIcon: Clock, problema: "8 horas por semana en tareas manuales", sIcon: Zap, solucion: "Automatización completa" },
  { pIcon: Frown, problema: "Equipo estresado y desmotivado", sIcon: Smile, solucion: "Procesos fluidos y simples" },
];
```
Each row: `grid md:grid-cols-[1fr_auto_1fr]`, stacks on mobile (arrow rotates to point down). Wrap rows in `Reveal delay={d(i+1)}`.

- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "feat: problema/solución section"`

---

## Task 4: Packs / Precios section

**Files:** Create `components/sections/packs.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Reveal`, `d`, `CtaButton`, `useScrollTo`. Section `id="packs"`.

- [ ] **Step 1: Build 3-card pricing.** Eyebrow "Planes"; h2 **"Elegí cómo querés crecer"**. Three cards, each with its own accent color, a lucide icon, benefit-narrative bullets (lucide `Check`), price, and a `CtaButton` "Quiero este" → `scrollTo("contacto")`. Middle card flagged "Más elegido" (green ring). Data:

```tsx
const PACKS = [
  { id:"arrancar", icon:Rocket, accent:"var(--primary)", name:"Arrancar",
    para:"Para comercios que recién abren", titular:"Tu web lista en 3 semanas",
    bullets:["Sitio profesional que vende","Horarios, ubicación y contacto integrados","Formulario para que te contacten directo"],
    precio:"Desde $450 USD", featured:false },
  { id:"crecer", icon:TrendingUp, accent:"var(--secondary)", name:"Crecer",
    para:"Para negocios con procesos para optimizar", titular:"Automatizamos lo que te quita tiempo",
    bullets:["Reservas/pedidos online automáticos","Chatbot que atiende mientras dormís","Dashboard para ver qué pasa en tu negocio"],
    precio:"Desde $900 USD", featured:true },
  { id:"dominar", icon:Crown, accent:"var(--accent-cta)", name:"Dominar",
    para:"Para negocios estructurados", titular:"Sistema completo integrado",
    bullets:["Web + CRM + Automatización","Reportes y métricas automáticas","Capacitación de tu equipo incluida"],
    precio:"Desde $1800 USD", featured:false },
];
```
Footnote under grid: "Primeros clientes: 30% de descuento." Cards: white bg, `--border-subtle`, hover lift; featured card has `ring-2 ring-[color:var(--secondary)]` + small "Más elegido" badge.

- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "feat: packs/precios section"`

---

## Task 5: Casos de éxito section (ejemplo ilustrativo)

**Files:** Create `components/sections/casos.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Badge`, `Reveal`, `d`. Section `id="casos"`.

- [ ] **Step 1: Build 3 before/after cards.** Eyebrow "Casos"; h2 **"Resultados que se notan"**. Each card shows a **`<Badge>Ejemplo ilustrativo</Badge>`** (non-negotiable), name/rubro/zona, an "Antes" line (muted) and "Ahora" line, and a highlighted metric with `TrendingUp`. Data:

```tsx
const CASOS = [
  { lugar:"Restaurante \"La Trattoria\"", zona:"Rosario", icon:UtensilsCrossed,
    antes:"40 llamadas/día para reservas, perdían clientes",
    ahora:"Reservas online automáticas", metrica:"−70% llamadas · +25% ocupación" },
  { lugar:"Tienda de ropa \"Estilo\"", zona:"Centro, Rosario", icon:Shirt,
    antes:"Inventario en papel, retrasos en pedidos",
    ahora:"CRM integrado que avisa automáticamente", metrica:"Tiempo de respuesta −80%" },
  { lugar:"Consultorio \"Dr. García\"", zona:"San Nicolás", icon:Stethoscope,
    antes:"Pacientes olvidaban citas, confirmación manual",
    ahora:"Recordatorios automáticos por SMS", metrica:"No-shows −50%" },
];
```
Grid `md:grid-cols-3`, `Reveal delay={d(i+1)}`. Use a light surface card; image area can be an icon tile (no stock photos required).

- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success. Confirm each card renders the "Ejemplo ilustrativo" badge.
- [ ] **Step 3: Commit.** `git commit -am "feat: casos de éxito (ejemplos ilustrativos)"`

---

## Task 6: Por qué nosotros — diferenciadores + tabla + métricas

**Files:** Create `components/sections/why-us.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Reveal`, `d`, `AnimatedNumber` (`components/ui/animated-number`), `useInView` (motion/react). Section `id="porque"`. Rendered on a **navy band** (`bg-[color:var(--navy)] text-white`) for contrast.

- [ ] **Step 1: Diferenciadores grid (6 items).** lucide icons + title + line. Data: `Zap` "Implementación rápida" / "2-4 semanas, no meses" · `MapPin` "Soporte local" / "Aquiles en Rosario, no un chat robótico" · `MousePointerClick` "Sin código" / "No necesitás saber programar" · `Sprout` "Crece con vos" / "Empezás chico, sumás funciones después" · `BadgeCheck` "Precio justo" / "Presupuestos cerrados, sin sorpresas" · `LineChart` "Rentabilidad inmediata" / "Ves ROI en los primeros 30 días".

- [ ] **Step 2: Métricas row (ex-Stats).** Four figures (white): `+20` "negocios automatizados" · `8 h` "ahorradas por semana" · `2-3 sem` "de implementación" · `24/7` "atención sin parar". Numeric ones (`20`, `8`) use `AnimatedNumber` on in-view (mirror current `stats.tsx` `CountUp`); `2-3 sem` and `24/7` render static.

- [ ] **Step 3: Tabla comparativa.** Two columns "Neura Sistemas" vs "Agencias típicas", rows: Ubicación (Rosario, soporte local / CABA, soporte remoto) · Tiempo (2-4 semanas / 8-12 semanas) · Precio ($450–2500 USD / $1000–5000+) · Modelo (Packs claros / "Presupuesto a medida") · Recurrencia (Mantenimiento mensual / Proyecto y se acabó). "Neura" column cells use green `Check`; "Agencias" column muted with `X`. Responsive: on mobile render as stacked rows.

- [ ] **Step 4: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 5: Commit.** `git commit -am "feat: por qué nosotros + tabla comparativa + métricas"`

---

## Task 7: Testimonios section (ejemplo ilustrativo)

**Files:** Create `components/sections/testimonials.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Badge`, `Reveal`, `d`. lucide `Star`.

- [ ] **Step 1: Build 2 quote cards.** Eyebrow "Testimonios"; h2 **"Lo que dicen quienes ya automatizaron"**. Each card: section-level `<Badge>Ejemplo ilustrativo</Badge>`, five filled `Star` (amber), quote, author line. Data:

```tsx
const QUOTES = [
  { quote:"En 3 semanas teníamos web funcional. Ahora recibimos 5 pedidos online por día que antes no existían.",
    autor:"Paula García", negocio:"Pastelería \"Delicias\"", zona:"Rosario" },
  { quote:"El chatbot atiende mis clientes 24/7 mientras yo duermo. Nunca había visto algo tan útil.",
    autor:"Martín López", negocio:"Bar \"La Esquina\"", zona:"Rosario" },
];
```
Place ONE "Ejemplo ilustrativo" badge near the section heading (clear, not per-card spam). Grid `md:grid-cols-2`.

- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "feat: testimonios (ejemplos ilustrativos)"`

---

## Task 8: FAQ section

**Files:** Create `components/sections/faq.tsx`

**Interfaces:** Consumes `Container`, `Eyebrow`, `Reveal`. Self-contained accordion via `useState` (no new dependency). Section `id="faq"`. lucide `ChevronDown`.

- [ ] **Step 1: Build accordion.** `"use client"`, `const [open,setOpen]=useState<number|null>(0)`. Eyebrow "Preguntas frecuentes"; h2 **"Lo que probablemente te estés preguntando"**. Each item is a `<button>` toggling `open`, chevron rotates when open, panel animates height/opacity (CSS grid-rows trick or `max-h`). Data:

```tsx
const FAQS = [
  { q:"¿Cuánto cuesta realmente?", a:"Depende del pack. Desde $450 USD. Sin sorpresas: presupuesto cerrado antes de empezar." },
  { q:"¿Cuánto tarda?", a:"Entre 2 y 4 semanas. Está listo antes de lo que esperás." },
  { q:"¿Y si después necesito cambios?", a:"Tenés un plan de mantenimiento mensual ($100–200) que incluye lo que necesites." },
  { q:"¿Es difícil de usar?", a:"No. Te enseñamos a usarlo. Cualquiera de tu equipo puede hacerlo." },
  { q:"¿Tienen referencias?", a:"Sí. Escribinos y te mostramos casos y contactos." },
];
```

- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success. Accordion opens/closes; keyboard-focusable buttons; `aria-expanded` set.
- [ ] **Step 3: Commit.** `git commit -am "feat: FAQ accordion"`

---

## Task 9: Reframe "Cómo trabajamos" (Process)

**Files:** Modify `components/sections/process.tsx` (copy only — keep structure/animation)

- [ ] **Step 1: Replace `STEPS` + heading.** h2 → **"Cómo trabajamos"**, Eyebrow "Simple y sin vueltas". Steps:
  `["01", MessageCircle, "Diagnóstico", "Hablamos 20 minutos. Entendemos tu negocio."]`,
  `["02", FileText, "Propuesta", "Te decimos exactamente qué hacemos y cuánto cuesta."]`,
  `["03", Wrench, "Implementación", "Construimos tu sistema sin molestarte."]`,
  `["04", GraduationCap, "Capacitación + Soporte", "Te enseñamos a usarlo, y estamos cuando nos necesites."]`. Keep `id="proceso"`.
- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "refactor: cómo trabajamos copy"`

---

## Task 10: Reframe Contacto / Cierre

**Files:** Modify `components/sections/contact.tsx`

- [ ] **Step 1: Re-skin to navy closing band + new copy.** Wrap section (`id="contacto"`) in `bg-[color:var(--navy)] text-white`. Headline **"¿Listo para que tu negocio crezca?"**, subline about a llamada sin compromiso. Primary `CtaButton` "Agendá una llamada sin compromiso" → opens WhatsApp (`https://wa.me/5493402507879`) or the existing brief flow. Show direct data: email `aquilesdiaz335@gmail.com`, WhatsApp `+54 9 3402507879`, "Rosario, Santa Fe". Keep the existing mailto form but restyle for the dark band (white labels, light inputs). Update any old "estudio" copy to PyME voice (voseo).
- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "refactor: contacto/cierre band + datos"`

---

## Task 11: Reframe Nav

**Files:** Modify `components/sections/nav.tsx`

- [ ] **Step 1: Update links + CTA + theme.** Nav links → `#solucion` "Soluciones", `#packs` "Packs", `#casos` "Casos", `#faq` "FAQ", `#contacto` "Contacto" (use `useScrollTo`). Replace the `MetalButton` CTA with `CtaButton` "Agendá una llamada" → `scrollTo("contacto")`. Ensure nav is legible on the light page (dark text/logo) and over the hero (it floats over the video — give it a translucent light background or scrim-aware styling). Keep scroll-spy behavior.
- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "refactor: nav links + CTA for new sections"`

---

## Task 12: Reframe Footer

**Files:** Modify `components/sections/footer.tsx`

- [ ] **Step 1: Update data + theme.** Light or navy footer consistent with the page. Contact: `aquilesdiaz335@gmail.com`, WhatsApp `+54 9 3402507879` (`wa.me` link), "Rosario, Santa Fe". Footer nav mirrors the new section anchors. Remove any "estudio/dark-metal" leftover copy.
- [ ] **Step 2: Verify.** `npx eslint .` clean; `npm run build` success.
- [ ] **Step 3: Commit.** `git commit -am "refactor: footer data + theme"`

---

## Task 13: Integration — wire `app/page.tsx`

**Files:** Modify `app/page.tsx`

**Interfaces:** Consumes all new/reframed sections.

- [ ] **Step 1: New composition.** Replace imports/order with:
```tsx
<Nav />
<main>
  <Hero />
  <Solution />     {/* #solucion */}
  <Packs />        {/* #packs */}
  <Casos />        {/* #casos */}
  <WhyUs />        {/* #porque */}
  <Process />      {/* #proceso */}
  <Testimonials />
  <Faq />          {/* #faq */}
  <Contact />      {/* #contacto */}
</main>
<Footer />
```
Remove `Services`, `Stack`, `Stats`, `Showcase` imports/usages (files may remain on disk, unused).
- [ ] **Step 2: Verify.** `npx eslint .` clean (no unused-import errors — remove dead imports); `npm run build` success; click each nav link / hero CTA scrolls to the right section.
- [ ] **Step 3: Commit.** `git commit -am "feat: wire repositioned landing page"`

---

## Task 14: QA — secondary pages re-theme + full verification

**Files:** Inspect/adjust `app/proyectos/page.tsx`, `app/proyectos/[slug]/page.tsx`, `app/iniciar-proyecto/page.tsx`, `components/sections/project-card.tsx`, `components/sections/project-brief.tsx`, `components/ui/metal-button.tsx` usages.

- [ ] **Step 1: Audit secondary pages on the light theme.** Run `npm run dev`, open `/proyectos` and `/iniciar-proyecto`. Fix contrast/regressions: any `MetalButton` CTA → `CtaButton` or `SecondaryButton`; dark-only surfaces (`.glass-pill`, `--bg-sunken` assumptions) that now read poorly on white; ensure text meets AA. Keep changes minimal and pattern-consistent.
- [ ] **Step 2: Reduced-motion + mobile pass.** Verify with `prefers-reduced-motion: reduce` nothing stays hidden (hero copy visible, video swapped for poster/gradient). Check mobile widths (375px) for the hero, packs grid, comparison table, and problema/solución stacking.
- [ ] **Step 3: Final gate.** `npx eslint .` clean; `npm run build` success; `out/` generated. Note remaining placeholders (hero video asset, real casos/testimonios) in the commit body.
- [ ] **Step 4: Commit.** `git commit -am "fix: re-theme secondary pages + QA pass"`

---

## Self-review notes
- **Spec coverage:** Hero §5.1→T2; Problema/Solución §5.2→T3; Packs §5.3→T4; Casos §5.4→T5; Por qué/tabla/métricas §5.5→T6; Cómo trabajamos §5.6→T9; Testimonios §5.7→T7; FAQ §5.8→T8; Contacto §5.9→T10; Footer §5.10→T12; Nav §4→T11; design system §3→T1; secondary pages §6→T14; blog §7 intentionally out of scope.
- **Parallelization:** T1 first (foundation). T2–T12 are independent files/edits (parallelizable). T13 then T14 last (sequential).
- **No test framework:** gates are lint + build + visual, stated in Global Constraints.
- **Honesty:** "Ejemplo ilustrativo" badge enforced in T5 and T7 steps.
