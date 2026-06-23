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

Landing y sitio institucional de **Neura Sistemas**, un estudio que desarrolla
**software a medida para PyMEs y comercios**: webs, automatización, CRM y chatbots.
El sitio está pensado para transmitir confianza y convertir visitas en consultas.

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
| Deploy | **Vercel** | Hosting + deploy automático |

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
│   ├── layout.tsx            # Layout raíz: SEO, metadata, fuentes, providers
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
│   ├── sections/             # Cada bloque grande del sitio (hero, servicios, etc.)
│   └── ui/                   # Piezas reutilizables (drawer, modales, banner...)
│
├── lib/                      # Lógica compartida
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

1. **Nav** — barra de navegación pegajosa.
2. **Hero** — primer impacto: propuesta de valor + CTA.
3. **Solution** — qué problema resolvemos.
4. **TechStack** — con qué tecnologías trabajamos (Odoo, n8n, Make...).
5. **Servicios** — webs, automatización, CRM, chatbots.
6. **WhyUs** — por qué elegirnos.
7. **Process** — el proceso de trabajo, claro y sin sorpresas.
8. **CasosReales** — casos de trabajo reales.
9. **Testimonials** — testimonios (linkeados, reales).
10. **Packs** — paquetes / planes.
11. **Cuidado** — mantenimiento (opcional).
12. **Faq** — preguntas frecuentes.
13. **Contact** — formulario de contacto.
14. **Footer** + **PromoBanner** + **ExitOfferModal** (modal de salida).

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

- Vercel corre `npm run build`, que por el `output: "export"` genera el sitio estático.
- El dominio canónico es **neurasistemas.com.ar**.
- Acordate de tener las **variables de entorno cargadas en Vercel** (sección de arriba).

Para probar el build de producción en tu máquina:

```bash
npm run build && npm run start
```

---

## 🎨 Lenguaje visual

- **Estética:** oscura, metálica, premium y técnica. Plata/platino sobre carbón, con un
  acento azul acero usado con cuentagotas.
- **Tipografías:** Montserrat para títulos, Inter para el cuerpo.
- **Movimiento:** las secciones **aparecen al entrar** en pantalla (suben + aparecen) y
  se desvanecen al alejarte. Suave y con confianza, nunca rebotón. Se respeta
  `prefers-reduced-motion`.
- **Voz:** español **rioplatense (voseo)** —"trabajás menos, facturás más"—, cálido y
  preciso. **Sin métricas inventadas**: la prueba es real (casos, testimonios, stack).

---

## 📄 Licencia

Software **propietario**. Todos los derechos reservados — ver [LICENSE](./LICENSE).
Para permisos o licencias de uso, escribí a **aquilesdiaz335@gmail.com**.
