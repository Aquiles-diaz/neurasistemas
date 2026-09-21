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
| Deploy | **Vercel** y **Firebase Hosting** | Vercel deploya solo desde `main`; Firebase vía GitHub Actions (ver abajo) |
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
│   ├── site-mode.tsx         # Provider tema + idioma (dark/es ↔ light/en) con View Transitions
│   ├── sections/             # Cada bloque grande del sitio (hero, plataformas, seguridad...)
│   └── ui/                   # Piezas reutilizables (toggle, rolling text, drawer, modales...)
│
├── lib/                      # Lógica compartida
│   ├── i18n/                 # Copy del sitio: es.ts, en.ts y el tipo Dict que ambos respetan
│   ├── site.ts               # Datos del sitio (URL, email, teléfono, WhatsApp)
│   ├── email.ts              # Envío de formularios vía EmailJS
│   ├── github.ts             # Helpers de GitHub
│   └── utils.ts              # Utilidades varias (cn, etc.)
│
├── public/                   # Archivos estáticos (logos, imágenes de proyectos, hero)
├── LICENSE · NOTICE          # Licencia propietaria + avisos de terceros
└── SECURITY.md               # Política de seguridad
```

---

## 🧩 Las secciones de la home

La página principal ([`app/page.tsx`](app/page.tsx)) compone los bloques **en este orden**:

1. **Nav** — barra flotante con links de *rolling text* y el toggle tema/idioma.
2. **Hero** — propuesta de valor con palabra rotativa (escritorio / web / celulares / seguros) + CTA.
3. **Platforms** — qué construimos: sistemas de escritorio, plataformas web, apps móviles.
4. **Servicios** — gestión a medida, escritorio, web, móvil, integraciones, ciberseguridad.
5. **Security** — prácticas de seguridad y garantías por contrato (banda invertida).
6. **TechStack** — marquee monocromo de tecnologías.
7. **WhyUs** — diferenciadores, compromisos y tabla comparativa.
8. **Process** — diagnóstico, propuesta, desarrollo y pruebas, entrega y soporte.
9. **CasosReales** — proyectos reales en producción.
10. **Testimonials** — testimonios (linkeados, reales).
11. **Packs** — planes: Presencia, Sistema, Integral.
12. **Cuidado** — mantenimiento y monitoreo (opcional).
13. **Faq** — preguntas frecuentes.
14. **Contact** — formulario de contacto.
15. **Footer** + **PromoBanner** + **ExitOfferModal** (modal de salida).

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

Hoy el sitio se hostea en **Vercel** y se **deploya solo** cada vez que pusheás a `main`.
El repo ya trae todo para hostearlo también (o en su lugar) en **Firebase Hosting**, de
Google: mismo build estático, otro CDN.

- Ambos corren `npm run build`, que por el `output: "export"` genera el sitio en `/out`.
- El dominio canónico es **neurasistemas.com.ar**.
- Las variables de entorno se cargan donde se hace el build: en Vercel (Settings →
  Environment Variables) o en GitHub (Settings → Secrets) para Firebase.

### Firebase Hosting (Google)

`firebase.json` sirve `/out` con cache larga para `/_next/static` y cabeceras de
seguridad. El workflow [`.github/workflows/deploy-firebase.yml`](.github/workflows/deploy-firebase.yml)
publica en producción con cada push a `main` y arma un **preview temporal** por cada PR.

Setup, una sola vez, desde tu cuenta de Google:

1. Creá el proyecto en [console.firebase.google.com](https://console.firebase.google.com)
   y activá **Hosting**. Poné el ID del proyecto en `.firebaserc`.
2. Generá la cuenta de servicio para GitHub: `npx firebase-tools init hosting:github`
   (o desde la consola: Configuración → Cuentas de servicio → Generar clave). Guardá el
   JSON en el secret **`FIREBASE_SERVICE_ACCOUNT`** y el ID en **`FIREBASE_PROJECT_ID`**.
3. Cargá en GitHub los mismos secrets `NEXT_PUBLIC_*` que tenés en Vercel.
4. Dominio propio: Hosting → Agregar dominio personalizado → seguí las instrucciones de
   DNS para `neurasistemas.com.ar`. Cuando el certificado esté listo, apuntá el DNS a
   Firebase y podés pausar Vercel.

Deploy manual desde tu máquina, si hace falta: `npm run build && npx firebase-tools deploy --only hosting`.

### Tráfico y errores

- **Google Analytics 4**: creá una propiedad en [analytics.google.com](https://analytics.google.com),
  copiá el ID de medición (`G-…`) en `NEXT_PUBLIC_GA_ID`. Se carga con `@next/third-parties`
  después de que la página es interactiva.
- **Vercel Analytics**: se activa solo cuando el build corre en Vercel (Analytics → Enable
  en el proyecto). En Firebase no se monta.
- **Sentry**: creá un proyecto *Browser JavaScript* en [sentry.io](https://sentry.io) y
  pegá el DSN en `NEXT_PUBLIC_SENTRY_DSN`. El SDK se carga con un import dinámico después
  del montaje; el error boundary (`app/error.tsx`) reporta lo que atrapa. `NEXT_PUBLIC_RELEASE`
  agrupa los errores por versión (en GitHub Actions es el SHA del commit).

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
