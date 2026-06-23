<!-- LEGAL -->
> ## ⚖️ Software propietario — Todos los derechos reservados
>
> **Copyright © 2026 Neura Sistemas.** Este repositorio y todo su contenido (código,
> diseño, textos, imágenes y marcas) son **propiedad exclusiva** de Neura Sistemas y
> están protegidos por la Ley 11.723 (Argentina) y los tratados internacionales de
> derecho de autor.
>
> Queda prohibido copiar, distribuir, modificar, reutilizar o emplear esta obra —total
> o parcialmente— sin autorización previa y por escrito. Consultá los términos completos
> en **[LICENSE](./LICENSE)** y los avisos de terceros en **[NOTICE](./NOTICE)**.
>
> Licencias y permisos: **aquilesdiaz335@gmail.com** · Seguridad: ver **[SECURITY.md](./SECURITY.md)**

# Neura Sistemas — Design System

Brand and product design system for **Neura Sistemas — Desarrollo Web**, a web
design & development studio. The system powers an elegant, dark, metallic visual
language with motion-forward interactivity, intended for marketing sites,
landing pages, product UI, and decks.

> Language: the brand communicates in **Spanish** (Latin American, neutral).
> Voice: confident, warm, precise — see Content Fundamentals.

---

## Sources

- `uploads/neurasistemas.jpeg` — the provided brand logo: a metallic silver **NS**
  monogram over the **NEURASISTEMAS** wordmark, on a near-black charcoal field.
  This single asset drove the entire palette and tone (dark, premium, brushed metal).
- Brief (paraphrased): *"Landing / professional website with an elegant palette,
  rich entrance & exit animations, so the client feels confident we know what
  we're capable of."*

No codebase or Figma file was provided. The system was authored from the logo and
brief. Derived assets (transparent mark, monogram) live in `assets/logo/`.

---

## How to use this system

Consumers link **one** stylesheet and read components off the bundle:

```html
<link rel="stylesheet" href="styles.css" />
<!-- React UMD + the generated bundle -->
<script src="_ds_bundle.js"></script>
<script>const { Button, Card } = window.NeuraSistemasDesignSystem_404503;</script>
```

`styles.css` is an `@import` manifest that pulls in every token + the base layer.
All tokens are CSS custom properties on `:root`; prefer the **semantic aliases**
(`--text-strong`, `--surface-1`, `--border-default`) over raw scale values.

---

## CONTENT FUNDAMENTALS

How Neura Sistemas writes.

- **Language & register.** Spanish, neutral Latin American. Professional but human —
  never stiff or corporate-cold.
- **Person.** Speaks as **"nosotros"** (we / the studio) and addresses the client as
  **"tú"** (informal-you), e.g. *"Cuéntanos qué tienes en mente."* This keeps the
  relationship close and confident, not distant.
- **Tone.** Confident and reassuring — the whole point of the brief. Copy signals
  capability through specifics, not adjectives: *"Carga media de inicio: 1.2s"*,
  *"Respuesta en 24 h"*, *"+80 proyectos entregados."*
- **Casing.** Sentence case for headings and body. **UPPERCASE only** for mono
  eyebrows/labels and the wordmark, always with wide letter-spacing
  (`--ls-wider`/`--ls-widest`). Never all-caps a sentence.
- **Headlines.** Short, declarative, benefit-led. One emphasized word/phrase gets the
  metallic treatment: *"Creamos sitios web que **inspiran confianza**."*
- **Length.** Lead sentences ≤ 2 lines. Body paragraphs ≤ 3 lines (`max-width ~54ch`).
  Generous whitespace; let claims breathe.
- **Punctuation.** Spanish conventions — opening signs *¿* *¡* (*"¿Listo para empezar?"*).
  Em dashes and the ellipsis character … in placeholders.
- **Numbers.** Used sparingly and concretely as proof points. Prefix growth with `+`
  (*+80*), keep units tight (*1.2s*, *24 h*, *98%*).
- **Emoji.** **Never.** The brand reads premium and restrained; emoji would break it.
  Iconography is the visual punctuation instead (Lucide stroke icons).
- **Vibe.** Quiet luxury for the web — *"Hecho con precisión en cada pixel."*

Examples present in the kit: `Iniciar proyecto`, `Ver portafolio`,
`Disponibles para nuevos proyectos`, `Un proceso claro, sin sorpresas`,
`Proyectos que hablan por nosotros`.

---

## VISUAL FOUNDATIONS

- **Mood.** Elegant, dark, premium, technical. Brushed metal on charcoal. Calm and
  confident, never loud.
- **Color.** Dark-first. Backgrounds are charcoal/graphite (`--ink-950` → `--ink-800`).
  The signature is **platinum/silver** — used as a metallic gradient (`--metal-text`)
  on hero words, primary buttons, badges and the logo. A single **cool steel-blue
  accent** (`--accent-500`, `#5E86F2`) appears sparingly for focus rings, links,
  status dots and the occasional high-emphasis CTA / glow. Semantic colors
  (success/warning/danger) are muted, never neon. Two base background tones max:
  `--bg-base` and `--surface-1`.
- **Type.** Display = **Space Grotesk** (geometric, technical — echoes the logo's
  cut letterforms), Body = **Manrope** (clean, modern), Mono = **JetBrains Mono**
  (eyebrows, labels, code). Headings are tight-tracked (`-0.015em`) and balanced.
  Eyebrows are mono, uppercase, wide-tracked with a short leading hairline rule.
- **Spacing.** 8px base grid (`--space-*`). Marketing sections use a generous
  `--section-y` (128px) rhythm. Containers cap at `--container-lg` (1200px) with a
  fluid `--gutter`.
- **Backgrounds.** Mostly flat charcoal. The hero layers a subtle **radial glow**
  (faint blue + silver), a **faint grid** masked with a radial fade, and a large,
  very-low-opacity **NS monogram watermark**. No photographic backgrounds, no busy
  gradients, no noise. Project thumbnails use a dark metal gradient with the project
  initials in metallic type (real imagery to be supplied by the client).
- **Animation (core to the brand).** Confident and smooth, never bouncy.
  Signature easing is **expo-out** `cubic-bezier(.16,1,.3,1)`. Sections **reveal on
  enter** (rise + fade, `translateY(30px)→0`, ~700–900ms) and **fade back out** when
  scrolled well past (the IntersectionObserver toggles `.in`) — satisfying the brief's
  "entrance & exit" requirement. Staggered children via `data-d="1..6"` delays.
  Reduced-motion is respected everywhere (`prefers-reduced-motion`).
- **Hover states.** Buttons lift `-1px` and gain a soft glow; cards lift `-4px` with a
  silver glow and brighter border; nav links grow an underline; icons nudge/translate.
  Color shifts are subtle (lighter border, +5–7% surface).
- **Press states.** Slight shrink/translate (`scale(.985)` / `translateY(1px)` on
  buttons, `scale(.92)` on icon buttons). No color flash.
- **Borders.** Hairlines built from translucent white — `--border-subtle` (.06),
  `--border-default` (.10), `--border-strong` (.18). On dark surfaces a **top-edge
  highlight** (`--edge-hi`, inset white 1px) gives a brushed-metal lip.
- **Shadows.** Ambient and soft, tuned for dark (`--shadow-sm…xl`), always paired with
  the edge highlight. Glows (`--glow-accent`, `--glow-silver`) are reserved for focus
  and hover emphasis. No hard or colored drop shadows.
- **Transparency & blur.** Glass is used for the sticky nav and overlays
  (`--surface-glass` + `backdrop-filter: blur(--blur-md)`). The mobile menu sheet is
  a blurred dark scrim. Used sparingly, only where layering over content.
- **Corner radii.** Medium-soft. Inputs/icons `--radius-md` (12px), cards
  `--radius-lg` (18px), pills/buttons `--radius-pill`. Nothing fully sharp, nothing
  cartoonishly round.
- **Cards.** Dark surface (`--surface-1/2`), hairline border, ambient shadow + edge
  highlight, 18px radius. Optional metallic top hairline (`accent`) and hover lift
  when `interactive`.
- **Imagery vibe.** Cool, monochrome, high-contrast, metallic. When real photos are
  added they should skew cool/desaturated to sit in the charcoal world.

---

## ICONOGRAPHY

- **System:** **Lucide** (ISC-licensed) — clean geometric **stroke** icons, 24×24
  grid, `1.6` stroke weight, round caps/joins. This matches the precise, technical,
  elegant feel of the logo and Space Grotesk.
- **Delivery:** inlined as SVG path data in `ui_kits/neura-web/icons.jsx`
  (`<Icon name="…" />`). Inlined rather than CDN-linked so kits render offline and in
  the downloadable skill. To add icons, copy the path data from lucide.dev keeping the
  same 24×24 viewBox and stroke settings.
- **Color:** icons inherit `currentColor` — typically `--silver-100` / `--text-muted`,
  shifting to `--accent-300` on hover inside service tiles.
- **Emoji:** never used. **Unicode glyphs** are not used as icons. The logo monogram
  (`assets/logo/neurasistemas-monogram.png`) doubles as a watermark and favicon-scale mark.

---

## VISUAL ASSETS

`assets/logo/`
- `neurasistemas-mark-dark.jpeg` — original supplied logo (mark + wordmark on charcoal).
- `neurasistemas-mark.png` — **transparent** metallic mark + wordmark (keyed from the
  original by luminance). Use on dark/varied backgrounds.
- `neurasistemas-monogram.png` — **transparent** NS monogram only. Nav, watermark,
  compact lockups, favicon-scale.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — entry point (`@import` manifest). Link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter for use in Claude Code.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `effects.css`, `motion.css`, `base.css`.

**Components** (`window.NeuraSistemasDesignSystem_404503`) — each has `.jsx`, `.d.ts`,
`.prompt.md`, and a directory `@dsCard` thumbnail.
- `components/core/` — **Button**, **IconButton**, **Card**, **Badge**, **Tag**
- `components/forms/` — **Input**, **Switch**
- `components/navigation/` — **Tabs**

**Foundation cards** (`guidelines/*.card.html`) — Design System tab specimens for
Colors, Type, Spacing, Brand.

**UI kits**
- `ui_kits/neura-web/` — **Neura Sistemas marketing landing** (`index.html`): sticky
  glass nav, animated hero, services, stats band, process, portfolio filter, contact
  form with success state, footer. Composes the DS components via a self-contained
  `lib.js` (generated from `components/**`) so it runs standalone.

**Starting points**
- Screen: *Landing — Neura Sistemas* (`ui_kits/neura-web/index.html`)
- Components: *Button*, *Card* (Core), *Input* (Forms)

---

## NOTES & CAVEATS

- **Fonts** are loaded from **Google Fonts** via `@import` in `tokens/fonts.css`
  (Space Grotesk / Manrope / JetBrains Mono). These are *substitutes* chosen to match
  the geometric, cut-terminal feel of the logo wordmark — the exact logo typeface is
  unknown. To self-host (and have the compiler register them as fonts), drop the
  `.woff2` files into `assets/fonts/` and replace the `@import` with `@font-face` rules.
- `ui_kits/neura-web/lib.js` is a generated snapshot of the component sources. If you
  edit components, regenerate it (see the header comment in that file).
