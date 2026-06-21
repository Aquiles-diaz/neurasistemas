# Diseño — Sección "Plan Cuidado" (ingreso recurrente)

**Fecha:** 2026-06-21
**Rama:** reposicionamiento-pyme
**Estado:** aprobado para implementar

## Contexto y objetivo

Neura Sistemas vende **packs de proyecto único** (Arrancar $450 / Crecer $900 /
Dominar $1.800 USD). Al ser pagos únicos, no existe ingreso recurrente ni una
relación que sostener: cada mes se arranca de cero y el cliente se enfría tras la
entrega.

Esta sección introduce la **capa recurrente** ("Plan Cuidado"): mantenimiento
mensual que convierte cada proyecto en una relación continua. Es el primer paso
(lever #1) de una estrategia de retención más amplia — sin algo recurrente, no
hay "churn" que prevenir.

**Alcance de este spec:** solo la sección de marketing en la landing (estática).
No incluye cobro real ni lógica de suscripción.

## Decisiones (cerradas con el usuario)

| Decisión | Resultado |
|----------|-----------|
| Estructura | **2 niveles**: Cuidado Web + Cuidado Sistema |
| Precios | Cuidado Web **$29 USD/mes**, Cuidado Sistema **$99 USD/mes** |
| Gancho de entrada | **1er mes gratis + meses 2 y 3 al 50%**, con cualquier pack |
| Enfoque de integración | **A** — sección nueva `cuidado.tsx`, sin tocar `packs.tsx` |
| Ubicación | Debajo de `<Packs />`, antes de `<Casos />` |
| CTA | Scroll a `#contacto` (sin backend, igual que los packs) |

## Diseño del componente

**Archivo:** `components/sections/cuidado.tsx` → `export function Cuidado()`
**Import:** en `app/page.tsx`, entre `<Packs />` y `<Casos />`.

- Estático, sin estado. `id="cuidado"` (ancla para scroll-spy si más adelante se
  agrega al nav).
- Reusa primitivos existentes: `Container`, `Eyebrow`, `CtaButton`
  (`components/sections/primitives.tsx`), `Reveal` + `d`
  (`components/ui/reveal.tsx`) y `useScrollTo`
  (`components/scroll/use-scroll-to.tsx`).
- Lenguaje visual = el de las cards de `packs.tsx`: card destacada en navy
  (`var(--navy)`) con glow esmeralda y badge "Recomendado"; card base en blanco
  con borde sutil. Grid `grid-cols-1 md:grid-cols-2`, centrado, con `max-w`
  algo más angosto que packs por ser solo 2 cards.
- Tipo de dato interno espejo de `Pack` en `packs.tsx` (icon, name, para,
  titular/bullets, precio, cta, featured) para mantener consistencia.

### Contenido (copy, voseo rioplatense)

**Encabezado**
- Eyebrow: `Plan Cuidado`
- Título: **Tu sistema no se queda solo**
- Bajada: *Lo entregamos andando y lo mantenemos vivo: hosting, mejoras y
  soporte todos los meses. Vos seguís con tu negocio, nosotros con que todo
  funcione.*

**Card 1 — Cuidado Web · $29 USD/mes** (no destacada)
- Subtítulo: *Para tu web y automatizaciones de Arrancar o Crecer*
- Bullets:
  - Hosting, dominio y SSL gestionados
  - Backups automáticos + monitoreo de uptime
  - 1 cambio chico por mes (textos, fotos, precios)
  - Soporte por WhatsApp
- CTA: **Quiero el cuidado**

**Card 2 — Cuidado Sistema · $99 USD/mes** (destacada, navy + glow + badge "Recomendado")
- Subtítulo: *Para tu sistema completo de Dominar*
- Bullets:
  - Todo lo de Cuidado Web
  - Automatizaciones y chatbot siempre al día
  - CRM y flujos actualizados
  - Reporte mensual de métricas
  - Soporte prioritario
- CTA: **Quiero el cuidado completo**

**Nota al pie** (gancho + anti-dark-pattern)
*Con cualquier pack: 1er mes gratis y meses 2 y 3 al 50%. Cobro mensual por
MercadoPago o tarjeta. Cancelás cuando quieras, sin vueltas.*

El "cancelás cuando quieras" es intencional: cancelación fácil = más confianza
para entrar, y es lo opuesto al dark pattern que daña la marca.

## Iconografía

`lucide-react`, stroke ~1.7–1.8 (consistente con el sitio):
`ShieldCheck` (Cuidado Web) y `Gauge` (Cuidado Sistema). El check de bullets reusa
`Check` como en `packs.tsx`.

## Cambios de archivos

| Archivo | Cambio |
|---------|--------|
| `components/sections/cuidado.tsx` | **Nuevo.** Componente `Cuidado`. |
| `app/page.tsx` | Importar `Cuidado` y montarlo entre `<Packs />` y `<Casos />`. |

## Fuera de alcance (anotado para después)

- Integración real de cobro recurrente (MercadoPago suscripciones / Stripe) y
  débito automático.
- Link "Cuidado" en el nav (`components/sections/nav.tsx`) y scroll-spy.
- Descuento por pago anual.
- Dunning / recuperación de pago fallido (recién aplica cuando exista cobro real).
- El resto de la estrategia de retención (señales de abandono, ofertas de
  rescate por motivo, win-back de clientes viejos, agente de chat).

## Criterios de aceptación

1. La sección aparece debajo de Packs, antes de Casos, con el mismo aire visual.
2. Dos cards: Web ($29) y Sistema ($99, destacada en navy con badge).
3. Copy en voseo, exactamente el de este spec.
4. Nota al pie con el gancho (1er mes gratis + 2 al 50%) y "cancelás cuando quieras".
5. CTAs hacen scroll a `#contacto`.
6. `npx eslint .` pasa limpio y `npm run build` (export estático) compila sin error.
7. Responsive: 1 columna en mobile, 2 en `md+`.
