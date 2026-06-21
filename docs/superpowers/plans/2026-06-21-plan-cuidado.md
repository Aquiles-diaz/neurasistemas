# Plan Cuidado — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar a la landing una sección "Plan Cuidado" con dos planes de mantenimiento mensual (Cuidado Web $29 / Cuidado Sistema $99), debajo de Packs.

**Architecture:** Un componente React estático nuevo (`components/sections/cuidado.tsx`) que reusa los primitivos y el lenguaje visual de `packs.tsx`, montado en `app/page.tsx` entre `<Packs />` y `<Casos />`. Sin estado, sin backend: los CTA hacen scroll a `#contacto`.

**Tech Stack:** Next.js 15 (App Router, `output: "export"`), React 19, Tailwind v4 (tokens CSS en `app/globals.css`), lucide-react, framer `motion` vía `Reveal`. Verificación: ESLint 9 + `npm run build` (export estático a `/out`).

## Global Constraints

- **Sin framework de tests.** Verificación = `npx eslint .` limpio + `npm run build` compila + el HTML exportado (`out/index.html`) contiene el contenido esperado.
- **Voseo rioplatense** en todo el copy. Strings exactos los de este plan.
- **Precios verbatim:** Cuidado Web `$29` USD/mes; Cuidado Sistema `$99` USD/mes.
- **Reusar primitivos existentes**, no crear nuevos: `Container`, `Eyebrow`, `CtaButton` (`@/components/sections/primitives`), `Reveal` + `d` (`@/components/ui/reveal`), `useScrollTo` (`@/components/scroll/use-scroll-to`).
- **Solo tokens CSS ya usados en `packs.tsx`** (`--navy`, `--secondary`, `--secondary-ink`, `--primary`, `--surface-1`, `--border-subtle`, `--shadow-sm/md/lg`, `--radius-md/lg/pill`, `--ease-out-soft`, `--section-y`, `--text-strong/body/muted/subtle`, `--font-display`).
- **No tocar** los cambios en progreso del usuario (`app/page.tsx` ya está modificado; solo agregar el import y el `<Cuidado />`, sin revertir nada más).
- **CTA** → `scrollTo("contacto")` (mismo destino que los packs).

---

### Task 1: Crear el componente `Cuidado`

**Files:**
- Create: `components/sections/cuidado.tsx`

**Interfaces:**
- Consumes: `Container`, `Eyebrow`, `CtaButton` de `@/components/sections/primitives`; `Reveal`, `d` de `@/components/ui/reveal`; `useScrollTo` de `@/components/scroll/use-scroll-to`; `ShieldCheck`, `Gauge`, `Check`, `type LucideIcon` de `lucide-react`.
- Produces: `export function Cuidado(): JSX.Element` — sección con `id="cuidado"`. La consume Task 2.

- [ ] **Step 1: Crear el archivo con el componente completo**

Crear `components/sections/cuidado.tsx` con exactamente este contenido:

```tsx
"use client";

import { ShieldCheck, Gauge, Check, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow, CtaButton } from "@/components/sections/primitives";
import { useScrollTo } from "@/components/scroll/use-scroll-to";

interface Plan {
  id: string;
  icon: LucideIcon;
  /** Acento decorativo (icono/anillo). */
  accent: string;
  /** Variante AA-safe del acento para texto chico sobre blanco. */
  accentText: string;
  name: string;
  para: string;
  /** Monto sin decoración — "USD/mes" se renderiza aparte. */
  precio: string;
  bullets: string[];
  cta: string;
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    id: "cuidado-web",
    icon: ShieldCheck,
    accent: "var(--primary)",
    accentText: "var(--primary)",
    name: "Cuidado Web",
    para: "Para tu web y automatizaciones de Arrancar o Crecer",
    precio: "$29",
    bullets: [
      "Hosting, dominio y SSL gestionados",
      "Backups automáticos + monitoreo de uptime",
      "1 cambio chico por mes (textos, fotos, precios)",
      "Soporte por WhatsApp",
    ],
    cta: "Quiero el cuidado",
    featured: false,
  },
  {
    id: "cuidado-sistema",
    icon: Gauge,
    accent: "var(--secondary)",
    accentText: "var(--secondary-ink)",
    name: "Cuidado Sistema",
    para: "Para tu sistema completo de Dominar",
    precio: "$99",
    bullets: [
      "Todo lo de Cuidado Web",
      "Automatizaciones y chatbot siempre al día",
      "CRM y flujos actualizados",
      "Reporte mensual de métricas",
      "Soporte prioritario",
    ],
    cta: "Quiero el cuidado completo",
    featured: true,
  },
];

export function Cuidado() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="cuidado"
      className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]"
    >
      <Container>
        <Reveal>
          <Eyebrow center>Plan Cuidado</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Tu sistema no se queda solo
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[52ch] text-center text-[color:var(--text-muted)] leading-[1.6]">
            Lo entregamos andando y lo mantenemos vivo: hosting, mejoras y
            soporte todos los meses. Vos seguís con tu negocio, nosotros con que
            todo funcione.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const { featured } = plan;
            return (
              <Reveal key={plan.id} delay={d(i + 1)} className="h-full">
                <div
                  className={[
                    "group relative flex h-full flex-col rounded-[var(--radius-lg)] p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
                    featured
                      ? "bg-[color:var(--navy)] text-white ring-1 ring-white/12 [box-shadow:0_30px_70px_-24px_rgba(16,185,129,0.45)] hover:[box-shadow:0_40px_90px_-24px_rgba(16,185,129,0.62)]"
                      : "border border-[color:var(--border-subtle)] bg-white [box-shadow:var(--shadow-md)] hover:-translate-y-1.5 hover:[box-shadow:var(--shadow-lg)]",
                  ].join(" ")}
                >
                  {featured && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-[color:var(--secondary)] px-3.5 py-1 text-xs font-semibold text-[color:var(--navy)] [box-shadow:var(--shadow-sm)]"
                      aria-label="Plan recomendado"
                    >
                      Recomendado
                    </span>
                  )}

                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                    style={
                      featured
                        ? { backgroundColor: "var(--secondary)", color: "var(--navy)" }
                        : {
                            backgroundColor: `color-mix(in srgb, ${plan.accent} 12%, transparent)`,
                            color: plan.accent,
                          }
                    }
                  >
                    <Icon size={24} strokeWidth={1.8} aria-hidden />
                  </div>

                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: featured ? "var(--secondary)" : plan.accentText }}
                  >
                    {plan.name}
                  </p>
                  <p
                    className={
                      featured
                        ? "mb-5 text-sm text-white/70"
                        : "mb-5 text-sm text-[color:var(--text-muted)]"
                    }
                  >
                    {plan.para}
                  </p>

                  <ul className="mb-7 flex flex-col gap-2.5" role="list">
                    {plan.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0"
                          style={{ color: featured ? "var(--secondary)" : plan.accent }}
                          aria-hidden
                        />
                        <span
                          className={[
                            "text-sm leading-snug",
                            featured ? "text-white/85" : "text-[color:var(--text-body)]",
                          ].join(" ")}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <p className="mb-5 flex items-baseline gap-1.5">
                      <span
                        className={[
                          "font-[family-name:var(--font-display)] font-bold tracking-[-0.02em]",
                          featured
                            ? "text-[2.6rem] leading-none text-white"
                            : "text-[2.1rem] leading-none text-[color:var(--text-strong)]",
                        ].join(" ")}
                      >
                        {plan.precio}
                      </span>
                      <span
                        className={
                          featured
                            ? "text-sm font-medium text-white/55"
                            : "text-sm font-medium text-[color:var(--text-subtle)]"
                        }
                      >
                        USD/mes
                      </span>
                    </p>

                    <CtaButton
                      size="md"
                      className="w-full justify-center"
                      onClick={() => scrollTo("contacto")}
                    >
                      {plan.cta}
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={d(3)}>
          <p className="mx-auto mt-10 max-w-[60ch] text-center text-sm text-[color:var(--text-muted)]">
            Con cualquier pack:{" "}
            <strong className="font-semibold text-[color:var(--secondary-ink)]">
              1er mes gratis y meses 2 y 3 al 50%
            </strong>
            . Cobro mensual por MercadoPago o tarjeta. Cancelás cuando quieras,
            sin vueltas.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Lint del archivo nuevo**

Run: `npx eslint components/sections/cuidado.tsx`
Expected: sin errores ni warnings (exit 0, sin output).

- [ ] **Step 3: Commit**

```bash
git add components/sections/cuidado.tsx
git commit -m "feat: sección Plan Cuidado (planes de mantenimiento recurrente)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Montar `Cuidado` en la landing y verificar el render

**Files:**
- Modify: `app/page.tsx` (agregar import y el `<Cuidado />` entre `<Packs />` y `<Casos />`)

**Interfaces:**
- Consumes: `Cuidado` de `@/components/sections/cuidado` (Task 1).
- Produces: la landing renderiza la sección en `out/index.html`.

- [ ] **Step 1: Agregar el import**

En `app/page.tsx`, inmediatamente después de la línea `import { Packs } from "@/components/sections/packs";`, agregar:

```tsx
import { Cuidado } from "@/components/sections/cuidado";
```

- [ ] **Step 2: Montar el componente entre Packs y Casos**

En `app/page.tsx`, dentro de `<main>`, reemplazar:

```tsx
        <Packs />
        <Casos />
```

por:

```tsx
        <Packs />
        <Cuidado />
        <Casos />
```

- [ ] **Step 3: Build del export estático**

Run: `npm run build`
Expected: compila sin errores (TypeScript + Next export), genera `out/`.

- [ ] **Step 4: Verificar que el contenido se renderizó en el HTML exportado**

El HTML exportado viene minificado en una línea, así que se chequea patrón por
patrón (no con `grep -c`, que contaría líneas). Run:
```bash
for p in "Tu sistema no se queda solo" "Cuidado Web" "Cuidado Sistema" "USD/mes" "Cancelás cuando quieras"; do
  if grep -qF "$p" out/index.html; then echo "OK   $p"; else echo "FALTA $p"; fi
done
```
Expected: las 5 líneas dicen `OK`. Si alguna dice `FALTA`, la sección no se montó o el copy no coincide — revisar Task 2 Steps 1-2.

- [ ] **Step 5: Lint global**

Run: `npx eslint .`
Expected: sin errores (exit 0).

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: montar sección Plan Cuidado en la landing

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Verificación final (manual, opcional)

- `npm run dev` y mirar la sección entre Packs y Casos: dos cards, la de Sistema en navy con badge "Recomendado", precios $29 / $99, nota al pie con el gancho, CTAs que scrollean a contacto.
- Reduced-motion: el contenido es visible aunque las animaciones de `Reveal` estén apagadas (Reveal degrada a contenido visible).
