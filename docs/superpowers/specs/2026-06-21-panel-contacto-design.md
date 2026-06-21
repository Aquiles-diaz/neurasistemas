# Diseño — Panel de contacto "Hablemos" (drawer lateral)

**Fecha:** 2026-06-21
**Rama:** reposicionamiento-pyme
**Estado:** aprobado para implementar

## Contexto y objetivo

Hoy todo CTA de contacto (nav, Hero, Packs, Cuidado, promo-banner, links
"Contacto" del nav y footer) hace `scrollTo("contacto")`, mandando al visitante
hasta la **sección Contacto del fondo** de una página larga. Cada vez que alguien
quiere conectar, lo "tiramos al fondo". Se siente impersonal y agrega fricción.

Este spec introduce un **panel lateral (drawer)** que se desliza desde la derecha
sobre la página, sin perder el lugar — un contacto más **íntimo y directo**:
"Soy Aquiles, te respondo yo, no un bot" + botones de canal (WhatsApp, llamada,
mail).

**Alcance:** solo el panel y el recableado de los CTAs. Sin backend (igual que el
resto del sitio: `mailto:`, `wa.me`, `tel:`). La sección Contacto del fondo **se
mantiene** como cierre.

## Decisiones (cerradas con el usuario)

| Decisión | Resultado |
|----------|-----------|
| Mecanismo | **Drawer lateral** que entra desde la derecha |
| Contenido | **Toque personal + botones** (avatar, mensaje, 3 canales) |
| Tema visual | **Panel navy + texto blanco**, botón primario **blanco sólido** |
| Alcance | **Todo abre el panel, nada baja al fondo.** Sección del fondo se mantiene |
| Backend | Ninguno — `wa.me`, `tel:`, `mailto:` |
| Botones | Trío de canales: **WhatsApp / Llamar / Mail** (sin booking externo) |

## Arquitectura

Provider global de contexto, montado en `app/layout.tsx` **dentro** de
`<MotionProvider>`, envolviendo a `{children}`. Disponible en todo el sitio
(home, `/proyectos`, `/iniciar-proyecto`).

**Archivos nuevos:**

| Archivo | Contenido |
|---------|-----------|
| `components/ui/contact-drawer.tsx` | `ContactDrawerProvider`, hook `useContactDrawer()` y el componente `ContactDrawer`. |

- `ContactDrawerProvider` mantiene `isOpen` (useState) y renderiza **una sola
  instancia** de `<ContactDrawer/>` al final de su árbol.
- Hook: `const { open, close, isOpen } = useContactDrawer();`
- Cualquier CTA llama `open()` en vez de `scrollTo("contacto")`. Sin prop-drilling.
- `layout.tsx`: `<MotionProvider><ContactDrawerProvider>{children}</ContactDrawerProvider></MotionProvider>`.

## El componente `ContactDrawer`

Reusa el patrón de accesibilidad ya probado en `components/ui/exit-offer-modal.tsx`:

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al título.
- **Backdrop** `fixed inset-0` navy translúcido con blur (`bg-[rgba(6,7,8,0.72)]`
  + `backdrop-filter`); clic en el backdrop = `close()`.
- **Panel** `fixed inset-y-0 right-0 z-[90] w-full max-w-[400px]`, fondo
  `var(--navy)`, texto blanco. En mobile `w-full` → ocupa toda la pantalla.
- Animación con `motion/react` (`m`, ya disponible vía `MotionProvider`):
  entra `x: "100%" → 0`, sale a la inversa, `ease [0.16,1,0.3,1]`. Backdrop fade.
- `prefers-reduced-motion` (`useReducedMotion`): fade simple sin slide.
- **Focus-trap + Esc + lock de scroll del body** (mismo enfoque que el exit-modal:
  guardar `overflow`, enfocar el primer focusable al abrir, ciclar Tab/Shift+Tab,
  Esc cierra, restaurar al cerrar).
- Botón ✕ arriba a la derecha (mismo estilo de cierre del exit-modal, adaptado a
  blanco sobre navy: borde `white/20`, hover `white/40`).

### Layout y contenido (voseo rioplatense)

```
┌──────────────────────────┐  ← fondo var(--navy), texto blanco
│ Hablemos              ✕  │
│                          │
│   (avatar)  Soy Aquiles. │
│             Te respondo  │
│             yo, no un bot│
│                          │
│ [ 💬 WhatsApp directo   ]│  ← blanco sólido (primario)
│ [ 📞 Llamar ahora       ]│  ← borde blanco (ghost)
│ [ ✉  Escribir un mail   ]│  ← borde blanco (ghost)
│                          │
│ Rosario · respondo <24h  │
└──────────────────────────┘
```

- **Encabezado:** título `Hablemos` (font display, blanco).
- **Avatar:** círculo (~56px) con el monograma `/logo/neurasistemas-monogram.png`
  vía `next/image`, sobre un fondo `white/10` con borde `white/20`. Diseñado para
  que después caiga una foto real sin tocar el layout.
- **Mensaje personal:** "**Soy Aquiles.** Te respondo yo, no un bot." (nombre en
  negrita, resto en `white/80`).
- **Botones (3 canales):**
  - **WhatsApp directo** — primario, **blanco sólido** (bg blanco, texto navy),
    icono `MessageCircle`. `href = https://wa.me/5493402507879?text=...`
  - **Llamar ahora** — ghost (transparente, borde `white/30`, texto blanco),
    icono `Phone`. `href = tel:+5493402507879`
  - **Escribir un mail** — ghost igual, icono `Mail`.
    `href = mailto:aquilesdiaz335@gmail.com?subject=...`
  - Cada botón es un `<a>`; al hacer clic, además, `close()` el panel.
- **Pie:** línea sutil `white/60`: "Rosario · respondo en menos de 24 h" con
  icono chico (`MapPin` o `Clock`).

### Datos de contacto (hardcodeados, ya usados en el sitio)

```
WHATSAPP_DIGITS = "5493402507879"
EMAIL           = "aquilesdiaz335@gmail.com"
PHONE_TEL       = "+5493402507879"
WA_TEXT    = "Hola Neura! Quiero coordinar una llamada para mi negocio."
MAIL_SUBJECT = "Contacto desde la web"
```

## Cableado (qué cambia)

Reemplazar `scrollTo("contacto")` → `open()` (del hook) en cada call site, y
quitar el `useScrollTo` donde quede sin uso:

| Archivo | Call site actual | Cambio |
|---------|------------------|--------|
| `components/sections/hero.tsx` | `onClick={() => scrollTo("contacto")}` (línea ~55) | `onClick={open}` |
| `components/sections/packs.tsx` | `onClick={() => scrollTo("contacto")}` (~225) | `onClick={open}` |
| `components/sections/cuidado.tsx` | `onClick={() => scrollTo("contacto")}` (~188) | `onClick={open}` |
| `components/sections/nav.tsx` | CTA "Agendá una llamada" desktop (~183) y menú mobile (~256) | `onClick={open}` (cerrar menú mobile también) |
| `components/sections/nav.tsx` | link **"Contacto"** (en `LINKS` / `go()`) | abre el panel en vez de scrollear |
| `components/ui/promo-banner.tsx` | `onCta` → `scrollTo("contacto")` (~61) | `open()` |
| `components/sections/footer.tsx` | `["Contacto", "/#contacto"]` (~10) | botón que abre el panel |

**Notas de cableado:**

- El link "Contacto" del **nav**: hoy `go(link)` hace `scrollTo` o
  `router.push("/#contacto")`. Se le da manejo especial para que llame `open()`
  (en cualquier página, ya que el panel es global). Sigue resaltado por el
  scroll-spy de la sección si querés, pero su acción es abrir el panel.
- El **footer** lista links como tuplas `[label, href]` con `<a>`. "Contacto"
  pasa a ser un `<button onClick={open}>` con el mismo estilo visual que los demás
  links (los otros links del footer no cambian).
- La sección **Contacto del fondo** (`components/sections/contact.tsx`,
  `id="contacto"`) **no se toca**: queda como cierre y para SEO. El
  `scroll-spy`/`IntersectionObserver` del nav y del banner siguen funcionando
  porque el `id="contacto"` sigue existiendo.

## Fuera de alcance (anotado para después)

- Foto real de Aquiles en el avatar (cuando exista el asset, reemplaza al monograma).
- Link de agenda externo (Calendly / Cal.com): por ahora "agendar" se coordina por
  WhatsApp.
- Mini-formulario dentro del panel (se evaluó y se descartó: se eligió "solo
  botones + toque personal").
- Cualquier backend de contacto.

## Criterios de aceptación

1. Clic en cualquier CTA listado abre el panel deslizándose desde la derecha; la
   página **no** scrollea al fondo.
2. El panel es navy con texto blanco; el botón WhatsApp es blanco sólido y los
   otros dos son ghost con borde blanco (contraste AA).
3. WhatsApp abre `wa.me/5493402507879` (nueva pestaña); Llamar usa `tel:`; Mail
   usa `mailto:`. Cada clic cierra el panel.
4. Avatar = monograma en círculo; mensaje "Soy Aquiles. Te respondo yo, no un bot."
   en voseo.
5. Accesibilidad: `role="dialog"`, focus-trap, Esc cierra, clic en backdrop cierra,
   scroll del body bloqueado mientras está abierto, foco devuelto al cerrar.
6. `prefers-reduced-motion`: sin slide (fade simple).
7. El panel funciona en home, `/proyectos` y `/iniciar-proyecto` (provider global
   en `layout.tsx`).
8. La sección Contacto del fondo sigue existiendo (`id="contacto"`) y el scroll-spy
   del nav y la lógica del promo-banner no se rompen.
9. Responsive: el panel ocupa todo el ancho en mobile, `max-w-[400px]` en desktop.
10. `npx eslint .` pasa limpio y `npm run build` (export estático) compila sin error.
