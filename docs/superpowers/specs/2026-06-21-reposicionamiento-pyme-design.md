# Reposicionamiento PyME / Automatización — Diseño

**Fecha:** 2026-06-21
**Proyecto:** Neura Sistemas — landing (Next.js 15 static export, Tailwind v4)
**Estado:** Diseño aprobado → pasa a plan de implementación

## 1. Contexto y objetivo

El sitio actual está posicionado como "estudio premium de desarrollo web y automatización IA"
con una estética dark/metal (platino) muy refinada. El objetivo es **reposicionarlo hacia PyMEs
y comercios argentinos** con un mensaje directo de alivio de dolor ("Trabajás menos, facturás más"),
pricing en packs, casos y prueba social. La voz es **español rioplatense (voseo)** y el público
es mobile-first (~80% del tráfico esperado en móvil).

## 2. Decisiones bloqueadas

1. **Alcance:** reposicionamiento completo del sitio (no solo el hero).
2. **Identidad visual:** virar al brief → **tema claro**, paleta azul/verde (confianza) + naranja
   (CTA), tipografías **Montserrat (display) + Inter (body)**. Re-tematiza TODO el sitio, incluidas
   las páginas `/proyectos` y `/iniciar-proyecto`.
3. **Hero:** **video de fondo** a pantalla completa. Componente listo para placeholder: funciona
   sin archivo (cae a poster/gradiente) y respeta `prefers-reduced-motion` (muestra poster fijo).
4. **Casos y testimonios:** son ejemplos inventados → se rotulan claramente como **"ejemplo
   ilustrativo"** hasta tener clientes reales. Nada se presenta como testimonio real falso.
5. **Blog/Recursos:** **diferido a fase 2** (sub-proyecto con routing y contenido propio).
6. **Contacto:** email `aquilesdiaz335@gmail.com` (actual), WhatsApp `+54 9 3402507879` (actual,
   `wa.me/5493402507879`), ubicación **Rosario, Santa Fe**.
7. **CTA hero "Ver cómo funciona":** scroll suave a la sección Problema/Solución (`#solucion`).

## 3. Sistema de diseño nuevo (tema claro)

Reemplaza los tokens dark/metal en `app/globals.css`. Valores concretos propuestos (ajustables):

### Paleta
- `--bg-base`: `#FFFFFF`
- `--surface-1`: `#F7F9FC` (gris muy claro, bandas alternas)
- `--surface-2`: `#EEF2F8`
- `--border-subtle`: `#E2E8F0`
- `--border-strong`: `#CBD5E1`
- `--text-strong`: `#0F172A` (slate-900)
- `--text-muted`: `#475569` (slate-600)
- `--text-subtle`: `#94A3B8`
- `--primary` (azul confianza): `#1D4ED8` (blue-700); variante navy profunda `#0B1F33`
- `--secondary` (verde "solución/positivo"): `#10B981` (emerald-500), texto `#047857`
- `--accent-cta` (naranja): `#F97316`, hover `#EA580C`
- `--problema` (rojo apagado para "antes"): `#DC2626` usado con moderación (íconos), texto en muted
- **Bandas oscuras de ritmo:** fondo navy `#0B1F33` con texto blanco para secciones de contraste
  (cierre/CTA final, posiblemente "diferenciadores"). Dan profundidad sin volver al dark global.

### Tipografía
- Display/headlines: **Montserrat** (vía `next/font/google`), pesos 600/700/800.
- Body: **Inter** (ya cargada).
- Reemplaza el display actual "Stack Sans Notch". Actualizar `app/layout.tsx` y el token
  `--font-display`.

### Botones / CTA
- **Primario (CTA):** botón sólido naranja (`--accent-cta`), texto blanco, radio grande, sombra
  sutil, leve elevación en hover. Nueva variante `cta` en `components/ui/button.tsx`.
- **Secundario:** outline azul o ghost sobre claro.
- **Retirar `MetalButton` (WebGL metal-fx) de los CTAs** — su estética cromada choca con el tema
  claro + naranja y arrastra fragilidad WebGL. El archivo puede quedar sin uso.

### Motion
- Mantener el sistema `Reveal` (motion) y GSAP existentes, pero **animaciones sutiles** (el brief
  pide "no excesivas"). Siempre fallback con `prefers-reduced-motion`.

### Accesibilidad / performance
- Contraste AA mínimo en todo texto. Mobile-first. Objetivo PageSpeed < 3 s.
- Video del hero con `poster`, `preload="none"` o `metadata`, comprimido; íconos lucide (SVG).

## 4. Inventario de secciones y orden de página

Orden final de `app/page.tsx`:

1. **Nav** — reframe links: Soluciones, Packs, Casos, FAQ, Contacto. CTA naranja "Agendá una llamada".
2. **Hero** — video de fondo + nuevo copy. (REEMPLAZA hero actual)
3. **Problema → Solución** (`#solucion`) — NUEVA. Antes/Después, 4 transformaciones.
4. **Packs / Precios** (`#packs`) — NUEVA. 3 packs (Arrancar/Crecer/Dominar). (Reemplaza el rol del
   grid de Services de 6 tarjetas)
5. **Casos de éxito** (`#casos`) — NUEVA (rotulados "ejemplo ilustrativo"). 3 cards antes/ahora.
6. **Por qué nosotros** (`#porque`) — NUEVA. 5 diferenciadores + tabla comparativa (Vos vs Agencias).
7. **Cómo trabajamos** (`#proceso`) — reframe de Process. 4 pasos (Diagnóstico → Capacitación+Soporte).
8. **Testimonios** — NUEVA (rotulados "ejemplo ilustrativo"). 2-3 quotes con estrellas.
9. **FAQ** (`#faq`) — NUEVA. 5 preguntas en acordeón (radix accordion).
10. **Contacto / Cierre** (`#contacto`) — reframe. CTA grande "Agendá una llamada sin compromiso" +
    datos directos. Banda navy de contraste.
11. **Footer** — actualizar datos (Rosario, mail actual, WhatsApp).

**Secciones eliminadas:** `Stack` (stack técnico, demasiado "estudio"), grid de `Services` de 6
tarjetas (su rol lo toman los Packs). `Stats` se **funde** dentro de "Por qué nosotros" como fila de
métricas de resultado (+20 negocios, 8 h/semana ahorradas, 2-3 sem, 24/7) o se descarta si redunda.

**Showcase actual:** su rol lo toma "Casos de éxito". Se puede retirar de la landing (el portafolio
real sigue viviendo en `/proyectos`).

## 5. Especificación por sección (contenido + layout)

### 5.1 Hero (reconstruido)
- Fondo: `<video>` full-bleed `object-cover` (`autoPlay muted loop playsInline`), `poster` de
  respaldo. Si no hay archivo en `/public/hero/hero-bg.{webm,mp4}`, cae a poster/gradiente navy.
  `prefers-reduced-motion`: no reproduce, muestra poster. **Scrim** en gradiente (navy→transparente)
  para legibilidad del texto blanco.
- Copy (alineado a la izquierda, blanco sobre el video):
  - H1: **"Automatizamos tu negocio. Trabajás menos, facturás más."**
  - Sub: *"Webs, CRM, chatbots y automatización para PyMEs y comercios que quieren crecer sin morir
    en el intento."*
  - CTA primario (naranja): **"Ver cómo funciona"** → scroll `#solucion`.
  - CTA secundario (ghost claro): **"Agendá una llamada"** → `#contacto` (o `/iniciar-proyecto`).
  - Fila de beneficios (íconos lucide `CheckCircle2`, NO emoji): *Implementación en 2-3 semanas ·
    Sin codificar · Soporte local*.

### 5.2 Problema → Solución (`#solucion`)
- Eyebrow "Antes / Después". Título: **"Del caos operativo al piloto automático"**.
- 4 filas de transformación (izq problema en rojo apagado/gris con ícono → flecha → der solución en
  verde con ícono). Íconos lucide (sin emoji):
  1. *30 llamadas/día para reservas* → *Sistema automático 24/7* (Phone → CalendarCheck)
  2. *Hojas de Excel desactualizadas* → *Dashboard en tiempo real* (FileSpreadsheet → LayoutDashboard)
  3. *8 horas/semana en tareas manuales* → *Automatización completa* (Clock → Zap)
  4. *Equipo estresado y desmotivado* → *Procesos fluidos y simples* (Frown → Smile)
- Reveal on-scroll; apila en mobile. Ejemplos tomados de comercios reales (restaurante con reservas)
  sin jerga técnica.

### 5.3 Packs / Precios (`#packs`)
Tres cards, cada una con ícono y color propio (acento distinto), narrativa de **beneficio** (no lista
técnica fría). Precios públicos en USD.
- **ARRANCAR — "Para comercios que recién abren"** · color azul claro
  - Titular: *Tu web lista en 3 semanas*
  - Bullets: Sitio profesional que vende · Horarios, ubicación y contacto integrados · Formulario de
    contacto directo
  - Precio: **Desde $450 USD**
- **CRECER — "Para negocios con procesos para optimizar"** · color verde · **destacado/"popular"**
  - Titular: *Automatizamos lo que te quita tiempo*
  - Bullets: Reservas/pedidos online automáticos · Chatbot que atiende mientras dormís · Dashboard
    para ver qué pasa en tu negocio
  - Precio: **Desde $900 USD**
- **DOMINAR — "Para negocios estructurados"** · color naranja/navy
  - Titular: *Sistema completo integrado*
  - Bullets: Web + CRM + Automatización · Reportes y métricas automáticas · Capacitación del equipo
    incluida
  - Precio: **Desde $1800 USD**
- Cada card con CTA "Quiero este" → `#contacto`. Nota chica: "Primeros clientes con 30% off" (del doc).

### 5.4 Casos de éxito (`#casos`) — ROTULADO "ejemplo ilustrativo"
Badge visible "Ejemplo ilustrativo" en cada card hasta tener casos reales. 3 cards antes/ahora:
- **Restaurante "La Trattoria" — Rosario:** Antes: 40 llamadas/día, perdían clientes. Ahora: reservas
  online → −70% llamadas, +25% ocupación.
- **Tienda de ropa "Estilo" — Centro, Rosario:** Antes: inventario en papel, retrasos. Ahora: CRM que
  avisa automáticamente → tiempo de respuesta −80%.
- **Consultorio "Dr. García" — San Nicolás:** Antes: pacientes olvidaban citas, confirmación manual.
  Ahora: recordatorios automáticos por SMS → no-shows −50%.
- Cada card: nombre/rubro/zona, antes vs ahora, métrica destacada (↗). Imagen placeholder o
  ilustración minimalista. NO se presentan como clientes reales verificables.

### 5.5 Por qué nosotros (`#porque`)
5 diferenciadores (íconos lucide): **Implementación rápida** (2-4 sem, no meses) · **Soporte local**
(Aquiles en Rosario, no un chat robótico) · **Sin código** · **Crece con vos** · **Precio justo**
(presupuestos cerrados) · (+ **Rentabilidad inmediata**, ROI en 30 días).
Tabla comparativa **Vos vs Agencias típicas**: Ubicación (Rosario/local vs CABA/remoto) · Tiempo (2-4
sem vs 8-12 sem) · Precio ($450-2500 vs $1000-5000+) · Modelo (packs claros vs "a medida = caro") ·
Recurrencia (mantenimiento mensual vs proyecto y se acabó).
Métricas de resultado embebidas (ex-Stats): +20 negocios · 8 h/sem ahorradas · 2-3 sem · 24/7.

### 5.6 Cómo trabajamos (`#proceso`) — reframe de Process
4 pasos, copy simple y cercano:
1. **Diagnóstico** — "Hablamos 20 minutos. Entendemos tu negocio."
2. **Propuesta** — "Te decimos exactamente qué hacemos y cuánto cuesta."
3. **Implementación** — "Construimos tu sistema sin molestarte."
4. **Capacitación + Soporte** — "Te enseñamos a usar, y estamos cuando necesites."

### 5.7 Testimonios — ROTULADO "ejemplo ilustrativo"
2-3 quotes con 5 estrellas y badge "ejemplo ilustrativo":
- *"En 3 semanas teníamos web funcional. Ahora recibimos 5 pedidos online/día que antes no existían."*
  — Paula García, Pastelería "Delicias" · Rosario
- *"El chatbot atiende mis clientes 24/7 mientras yo duermo. Nunca vi algo tan útil."*
  — Martín López, Bar "La Esquina" · Rosario

### 5.8 FAQ (`#faq`)
Acordeón (radix accordion). 5 preguntas:
- ¿Cuánto cuesta realmente? → Depende del pack. Desde $450 USD. Sin sorpresas.
- ¿Cuánto tarda? → 2-4 semanas. Está listo antes de lo que esperás.
- ¿Y si después necesito cambios? → Plan de mantenimiento mensual ($100-200) que incluye lo que
  necesites.
- ¿Es difícil de usar? → No. Te enseñamos. Cualquiera de tu equipo puede hacerlo.
- ¿Tienen referencias? → Sí (links a casos / contacto).

### 5.9 Contacto / Cierre (`#contacto`)
Banda navy de contraste. Titular **"¿Listo para que tu negocio crezca?"**. CTA grande naranja
**"Agendá una llamada sin compromiso"**. Datos directos: 📧 aquilesdiaz335@gmail.com · WhatsApp
+54 9 3402507879 · Rosario, Santa Fe. Reusa/ajusta el form actual (mailto, sin backend).

### 5.10 Footer
Actualizar a: Rosario, Santa Fe · mail actual · WhatsApp actual. Mantener estructura, re-tematizar.

## 6. Páginas secundarias
`/proyectos`, `/proyectos/[slug]`, `/iniciar-proyecto`: heredan los nuevos tokens (tema claro). Hay
que **verificar visualmente** que siguen legibles y coherentes tras el cambio de paleta/fuentes, y
ajustar lo que rompa (botones metal, contrastes, fondos).

## 7. Fuera de alcance (fase 2)
- Blog/Recursos (`/blog` + 3-4 artículos).
- Casos y testimonios reales (reemplazan a los ejemplos ilustrativos cuando existan).
- Asset de video real del hero (se entrega después; el componente ya lo soporta).

## 8. Orden de build (para paralelizar)
1. **Fundación (primero, secuencial):** nuevo sistema de tokens en `globals.css` + fuentes en
   `layout.tsx` + variante `cta` de botón. Todo lo demás depende de esto.
2. **Secciones nuevas (paralelizable, 1 archivo c/u):** problema-solución, packs, casos,
   por-qué/diferenciadores, testimonios, faq. Reframe: process, contacto, footer, nav.
3. **Integración (secuencial):** actualizar `app/page.tsx` (orden + quitar Stack/Services/Showcase) y
   nav links.
4. **QA:** `npm run build` + `npx eslint .` limpios; revisar `/proyectos` e `/iniciar-proyecto`;
   chequear reduced-motion, mobile y contraste AA.

## 9. Verificación
- Build de producción y lint sin errores.
- Render con `prefers-reduced-motion` (contenido nunca oculto).
- Vista mobile (prioritaria) y desktop.
- Contraste AA en texto sobre video (scrim) y sobre bandas navy.
- Páginas secundarias re-tematizadas sin regresiones visuales.
