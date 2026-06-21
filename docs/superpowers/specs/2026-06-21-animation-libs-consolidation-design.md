# Consolidación de librerías de animación: 3 → 1

**Fecha:** 2026-06-21
**Rama:** reposicionamiento-pyme
**Objetivo:** reducir peso de descarga y costo de runtime para que la landing
cargue y scrollee fluida en internet/CPU modestos (público Argentina), pasando
de **3 librerías de animación a 1**.

## Contexto

La landing usa tres librerías de motion:

- **`motion`** (framer-motion v12) — usada en 11 componentes. Ya optimizada con
  `LazyMotion` + componente `m` (commit `39358d2`). **Se queda.**
- **`gsap` + `@gsap/react`** — solo 2 animaciones reales (entrada del hero,
  drift de luz del fondo) + plomería (`lib/gsap.ts`, sync con Lenis). **Sale.**
- **`lenis`** — smooth-scroll que secuestra el scroll nativo con un loop rAF
  cada frame; ScrollTrigger de GSAP existe solo para sincronizarse con él.
  Costo de runtime = jank en equipos modestos. **Sale.**

Decisiones del usuario (brainstorming):
- Smooth-scroll: **sacar Lenis, scroll nativo** (GPU-compositado).
- Alcance: **consolidar a 1 librería** (motion). No migrar motion a CSS por ahora.

## Arquitectura objetivo

Una sola librería de animación (`motion`, ya optimizada). GSAP y Lenis se
eliminan por completo. Sus dos animaciones se reescriben en **CSS `@keyframes`**
(corren en el compositor → más baratas que el rAF de GSAP). El scroll vuelve al
nativo del navegador, que ya está configurado en `globals.css`.

## Cambios

### Eliminar GSAP

- **`components/sections/hero.tsx`** — quitar `useGSAP`/`gsap`/`useRef` y el
  bloque `gsap.from("[data-hero]")`. La entrada escalonada pasa a CSS: regla
  `[data-hero]` con `@keyframes hero-in` (opacity 0→1, translateY 30→0) y
  `animation-delay` escalonado (0.1 / 0.19 / 0.28 / 0.37s), dentro de
  `@media (prefers-reduced-motion: no-preference)`. Mantiene `"use client"`
  (onClick + useScrollTo).
- **`components/ui/dither-background.tsx`** — quitar `useGSAP`/`gsap`/`useRef`.
  Los dos `gsap.to` infinitos (drift translate + rotate/scale, yoyo) pasan a dos
  `@keyframes` CSS con `infinite alternate` (= yoyo) sobre divs anidados (uno
  para `translate`, otro para `rotate`+`scale`, evitando el conflicto de un solo
  `transform`). Se puede quitar `"use client"` (queda presentacional puro).
- **Borrar** `lib/gsap.ts`.

### Eliminar Lenis

- **`components/scroll/use-scroll-to.ts`** — quitar la rama `useLenis`, dejar
  solo el path nativo (`window.scrollTo({ behavior })`), que **ya existía** como
  fallback. Honra `prefers-reduced-motion` usando `behavior: "auto"`.
- **Borrar** `components/scroll/smooth-scroll.tsx` y
  `components/scroll/lenis-gsap-sync.tsx`.
- **`app/layout.tsx`** — quitar el wrapper `<SmoothScroll>`, dejar
  `<MotionProvider>` directo en `<body>`.

### CSS (`app/globals.css`)

- Agregar `@keyframes hero-in`, `@keyframes dither-drift`, `@keyframes
  dither-spin` y sus reglas, todas dentro de `@media (prefers-reduced-motion:
  no-preference)`. El offset de anclas (`scroll-margin-top`) y el
  `scroll-behavior: smooth` ya existen — no se tocan.

### Limpieza

- **`components/ui/tilt-scroll.tsx`** — actualizar el comentario (línea ~35) que
  menciona Lenis (ya no existe).
- **`package.json`** — sacar `gsap`, `@gsap/react`, `lenis`. `npm install` para
  actualizar el lockfile.

## Lo que NO cambia (preservación de feel)

La entrada del hero, el drift de luz del fondo y el `TiltScroll` de proyectos
siguen viéndose igual. Todo respeta `prefers-reduced-motion`.

## Verificación (workflow multi-agente)

Tras implementar, auditoría adversarial en paralelo:
1. **Build/bundle** — `next build` pasa; confirmar que gsap/lenis salieron del bundle.
2. **Refs residuales** — cero imports/usos de gsap/lenis/ScrollTrigger/Lenis.
3. **Reduced-motion** — hero visible sin flash; fondo estático; sin animación de scroll.
4. **Equivalencia visual** — las 3 animaciones lucen equivalentes a las originales.
5. **a11y / scroll** — anclas saltan con offset correcto; nav offset preservado.

## Criterios de éxito

- `gsap`, `@gsap/react`, `lenis` fuera de `package.json` y del bundle.
- `next build` y `lint` pasan sin errores.
- Las 3 animaciones se ven equivalentes; reduced-motion correcto.
- Scroll nativo fluido; anclas con offset de nav correcto.
