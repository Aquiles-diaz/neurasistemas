<!-- LEGAL -->
> ## ⚖️ Software propietario — Todos los derechos reservados
>
> **Copyright © 2026 Neura Sistemas.** Este repositorio y todo su contenido (código,
> diseño, textos, imágenes y marcas) son **propiedad exclusiva** de Neura Sistemas y
> están protegidos por la Ley 11.723 (Argentina) y los tratados internacionales de
> derecho de autor.
>
> Queda prohibido copiar, distribuir, modificar, reutilizar o emplear esta obra —total
> o parcialmente— sin autorización previa y por escrito. Mirá los términos completos
> en **[LICENSE](./LICENSE)** y los avisos de terceros en **[NOTICE](./NOTICE)**.
>
> Licencias y permisos: **aquilesdiaz335@gmail.com** · Seguridad: ver **[SECURITY.md](./SECURITY.md)**

---

# Neura Sistemas — Sitio web

Landing y sitio institucional de **Neura Sistemas**, un estudio de Rosario que
desarrolla **sistemas a medida para empresas**: aplicaciones de escritorio,
plataformas web y apps móviles, con **ciberseguridad desde el diseño**. El sitio
está pensado para transmitir confianza y convertir visitas en consultas.

Es **bilingüe y bimodal**: un solo botón en la barra cambia a la vez el tema y el
idioma (oscuro = español, claro = inglés), con un barrido circular vía View
Transitions. Todo el copy vive en `lib/i18n/` (`es.ts` y `en.ts`, tipados contra
`types.ts`).

🌐 **En vivo:** [neurasistemas.com.ar](https://neurasistemas.com.ar)

---

## 🧱 Con qué está hecho

| Pieza | Tecnología | Para qué |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Estructura del sitio y ruteo |
| Render | **Static export** (`output: "export"`) | Genera HTML/CSS/JS plano en `/out`. **Sin servidor ni base de datos.** |
| UI | **React 19** + **TypeScript** | Componentes tipados |
| Estilos | **Tailwind CSS v4** | Diseño con utilidades |
| Animaciones | **motion** | Reveals al hacer scroll, transiciones |
| Íconos | **lucide-react** | Set de íconos de trazo |
| Formularios | **EmailJS** | Envío de mails sin backend (del lado del cliente) |
| Tipografías | **Montserrat** (títulos) + **Inter** (texto) | Vía `next/font` |
| Deploy | **Vercel** | Deploya solo con cada push a `main` |
| Tráfico | **Google Analytics 4** + **Vercel Analytics** | GA4 con `@next/third-parties`; Vercel Analytics solo cuando el build corre en Vercel |
| Errores | **Sentry** (`@sentry/browser`) | Errores del navegador, cargado después del primer pintado |

> **¿Por qué "static export"?** El sitio no necesita servidor: se compila a archivos
> estáticos y se sirve como una web ultra rápida. Eso lo hace barato de hostear,
> difícil de tirar abajo y muy veloz. La contra: no hay backend, así que los
> formularios se resuelven del lado del cliente (ver más abajo).

---

## 🚀 Cómo correrlo en tu máquina

Vas a necesitar **Node.js 18.18+** (idealmente la LTS) y **npm**.

```bash
# 1. Cloná el repo (es privado, necesitás acceso)
git clone https://github.com/Aquiles-diaz/neurasistemas.git
cd neurasistemas

# 2. Instalá las dependencias
npm install

# 3. Configurá las variables de entorno (ver sección siguiente)
cp .env.example .env.local
# ...y completá los valores en .env.local

# 4. Levantá el entorno de desarrollo
npm run dev
```

Abrí **http://localhost:3000** y listo. El `dev` usa **Turbopack**, así que recarga
rapidísimo cada vez que guardás un archivo.

---

## 🔑 Variables de entorno

Los formularios usan **EmailJS** (no hay backend propio). Las claves son **públicas por
diseño** —viajan en el bundle del navegador— pero igual se leen de variables de entorno
para no hardcodearlas y poder rotarlas cuando quieras.

Creá un archivo **`.env.local`** (ya está en `.gitignore`, nunca se sube) con:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key

# Observabilidad (opcionales: sin valor, no se carga nada)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # Google Analytics 4 → Admin → Flujos de datos → Web
NEXT_PUBLIC_SENTRY_DSN=https://...    # Sentry → Settings → Projects → Client Keys
```

> ⚠️ **Importante para el deploy:** estas variables tenés que cargarlas **también en
> Vercel** (Project → Settings → Environment Variables). Si faltan, los formularios
> **no rompen**: caen automáticamente a un `mailto:` para que igual te llegue la
> consulta. Pero lo ideal es tenerlas cargadas.

Tenés un **`.env.example`** en el repo con las claves vacías como plantilla.

> 🔁 **Si el formulario devuelve "No se pudo enviar":** EmailJS manda por tu Gmail con un
> permiso OAuth que Google vence cada tanto. En el panel de EmailJS → *Email Services* →
> tu servicio Gmail → **Reconnect**. El error que devuelve la API en ese caso es
> `Gmail_API: Invalid grant` (HTTP 412). Probalo mandándote un mensaje desde el sitio.

---

## 📁 Estructura del proyecto

```
neurasistemas/
├── app/                      # App Router de Next.js (cada carpeta = una ruta)
│   ├── layout.tsx            # Layout raíz: SEO, metadata, fuentes, providers, script de modo
│   ├── page.tsx              # Home — arma todas las secciones en orden
│   ├── iniciar-proyecto/     # /iniciar-proyecto — formulario de brief
│   ├── proyectos/            # /proyectos — portafolio
│   ├── robots.ts             # Genera /robots.txt (bloquea bots de IA, deja Google/Bing)
│   ├── sitemap.ts            # Genera /sitemap.xml
│   ├── error.tsx             # Pantalla de error
│   ├── not-found.tsx         # Página 404
│   └── globals.css           # Estilos globales + tokens de Tailwind
│
├── components/
│   ├── analytics.tsx         # GA4 + Vercel Analytics (no-op sin NEXT_PUBLIC_GA_ID)
│   ├── sentry-init.tsx       # Sentry del navegador (no-op sin DSN)
│   ├── motion-provider.tsx   # LazyMotion de `motion` (carga solo las features usadas)
│   ├── site-mode.tsx         # Provider tema + idioma (dark/es ↔ light/en) con View Transitions
│   ├── scroll/use-scroll-to.ts   # Scroll suave a una sección por id
│   ├── sections/             # Cada bloque grande del sitio (ver "Las secciones de la home")
│   │   ├── primitives.tsx    # Container, Eyebrow, CtaButton, SecondaryButton
│   │   ├── projects-data.ts  # Los proyectos del portafolio (datos, no copy)
│   │   └── project-*.tsx     # Card, detalle y brief de proyectos
│   └── ui/                   # Piezas reutilizables
│       ├── brand-icons.tsx   # Logos oficiales de WhatsApp, Instagram y Gmail (monocromos)
│       ├── instagram-embed.tsx   # Último post de Instagram, cargado al acercarse
│       ├── contact-drawer.tsx    # Panel "Hablemos" (todos los CTA de contacto abren esto)
│       ├── exit-offer-modal.tsx  # Modal de salida (exit-intent desktop / scroll en táctil)
│       ├── promo-banner.tsx      # Barra fija inferior (30% OFF), descartable
│       ├── theme-lang-toggle.tsx # Botón que cambia tema + idioma a la vez
│       ├── reveal.tsx · rolling-text.tsx · rolling-words.tsx   # Animaciones de entrada y texto
│       ├── logo.tsx · sent-modal.tsx · not-found-body.tsx
│       └── hero-bg · spotlight · tilt-scroll · dither-background   # Fondos decorativos
│
├── lib/                      # Lógica compartida
│   ├── i18n/                 # Copy del sitio: es.ts, en.ts y el tipo Dict que ambos respetan
│   ├── site.ts               # Datos del sitio (URL, email, teléfono, WhatsApp, Instagram)
│   ├── email.ts              # Envío de formularios vía EmailJS
│   ├── github.ts             # Lee el README de los repos de proyectos en build
│   └── utils.ts              # `cn()` para combinar clases
│
├── public/
│   ├── logo/                 # Favicons, PWA icons y el logo (OG image)
│   ├── projects/             # Capturas de los proyectos
│   └── site.webmanifest      # Manifest PWA
│
├── next.config.mjs           # `output: "export"` (sitio estático)
├── vercel.json               # Cabeceras de seguridad y cache en Vercel
├── eslint.config.mjs · postcss.config.mjs · tsconfig.json
├── .env.example              # Variables de entorno documentadas (copiar a .env.local)
├── LICENSE · NOTICE          # Licencia propietaria + avisos de terceros
└── SECURITY.md               # Política de seguridad
```

> Todo lo que está en el repo cumple una función. No hay carpetas de planificación,
> specs viejas ni assets huérfanos: si un archivo no aparece acá, no debería existir.

---

## 🧩 Las secciones de la home

La página principal ([`app/page.tsx`](app/page.tsx)) compone los bloques **en este orden**:

El orden está pensado para quien escanea desde el celular: promesa → prueba →
qué hacemos → garantías → cómo → planes → dudas → contacto.

1. **Nav** — barra flotante con links de *rolling text* y el toggle tema/idioma. "Contacto" abre el panel.
2. **Hero** — propuesta de valor con palabra rotativa + CTA principal a WhatsApp/canales.
3. **Instagram** — el último video del estudio embebido (`lib/site.ts` → `INSTAGRAM_LATEST_POST`) + seguir.
4. **CasosReales** — proyectos reales en producción.
5. **Testimonials** — testimonios (linkeados, reales).
6. **Platforms** — qué construimos (escritorio, web, móvil) + la fila de servicios (gestión, integraciones, ciberseguridad).
7. **Security** — banda invertida de garantías: 4 números, 4 garantías por contrato y la seguridad como chips.
8. **Process** — diagnóstico, propuesta, desarrollo y pruebas, entrega y soporte.
9. **Packs** — planes Presencia, Sistema, Integral. Precio "Consultar" (si ponés `"$900"` vuelve a mostrar "Desde … USD").
10. **Cuidado** — mantenimiento y monitoreo mensual (opcional). Misma regla de precio.
11. **Faq** — 4 preguntas.
12. **Contact** — WhatsApp + Instagram + mail con logos originales, y formulario.
13. **Footer** + **PromoBanner** + **ExitOfferModal** (modal de salida).

Para cambiar el video de Instagram: editá `INSTAGRAM_LATEST_POST` en `lib/site.ts` con el
código que aparece en la URL del post (`instagram.com/p/<código>/`).

---

## 📦 Scripts disponibles

```bash
npm run dev      # Desarrollo con Turbopack (http://localhost:3000)
npm run build    # Compila el sitio estático a /out
npm run start    # Sirve el build de producción localmente
npm run lint     # Corre ESLint
```

---

## 🌍 Build y deploy

El sitio se hostea en **Vercel** y se **deploya solo** cada vez que pusheás a `main`.

- Vercel corre `npm run build`, que por el `output: "export"` genera el sitio estático en `/out`.
- El dominio canónico es **neurasistemas.com.ar**.
- Las variables de entorno se cargan en Vercel (Project → Settings → Environment Variables).
- Las cabeceras de seguridad y la cache de `/_next/static` las define `vercel.json`.

### Tráfico y errores

- **Google Analytics 4**: creá una propiedad en [analytics.google.com](https://analytics.google.com),
  copiá el ID de medición (`G-…`) en `NEXT_PUBLIC_GA_ID`. Se carga con `@next/third-parties`
  después de que la página es interactiva.
- **Vercel Analytics**: se activa solo cuando el build corre en Vercel (Analytics → Enable
  en el proyecto).
- **Sentry**: creá un proyecto *Browser JavaScript* en [sentry.io](https://sentry.io) y
  pegá el DSN en `NEXT_PUBLIC_SENTRY_DSN`. El SDK se carga con un import dinámico después
  del montaje; el error boundary (`app/error.tsx`) reporta lo que atrapa. `NEXT_PUBLIC_RELEASE`
  agrupa los errores por versión (Vercel lo completa solo con el SHA del commit).

Nada de esto corre sin su variable: en desarrollo y en previews sin claves no se envía dato alguno.

Para probar el build de producción en tu máquina:

```bash
npm run build && npm run start
```

---

## 🎨 Lenguaje visual

- **Estética:** monocromo puro, blanco y negro. Sin color de acento: el "acento" es
  siempre el inverso del fondo (botones negros sobre blanco, blancos sobre negro).
  Dos modos con los mismos tokens (`app/globals.css`): oscuro por defecto y claro.
  Una sección (Seguridad) y las tarjetas destacadas van en banda invertida.
- **Tipografías:** Montserrat para títulos, Inter para el cuerpo.
- **Movimiento:** las secciones **aparecen al entrar** en pantalla (suben + aparecen) y
  se desvanecen al alejarte. Suave y con confianza, nunca rebotón. Se respeta
  `prefers-reduced-motion`.
- **Voz:** español **rioplatense (voseo)**, sobrio y preciso; inglés neutro en modo
  claro. **Sin métricas inventadas**: la prueba es real (casos, testimonios, stack).

---

## 📄 Licencia

Software **propietario**. Todos los derechos reservados — ver [LICENSE](./LICENSE).
Para permisos o licencias de uso, escribí a **aquilesdiaz335@gmail.com**.
