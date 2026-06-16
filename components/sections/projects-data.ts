export type Project = {
  name: string;
  /** URL segment for the detail page: /proyectos/[slug] */
  slug: string;
  type: string;
  /** filter category */
  cat: "web" | "apps" | "ecommerce";
  initials: string;
  /** one-line description shown on the dedicated page */
  desc: string;
  /** key tech used, shown as chips */
  tags: string[];
  /** surfaced in the landing preview */
  featured?: boolean;
  /** live site, shown in the detail-page preview frame ("https://…") */
  url?: string;
  /**
   * GitHub repo as "owner/name". When set, the detail page pulls title and
   * description from the repo's README at build time and links to it.
   */
  repo?: string;
  /**
   * Screenshot of the live site (under /public), shown in the card and the
   * detail-page browser frame. Falls back to the initials art when absent.
   */
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "RenoVision",
    slug: "renovision",
    type: "Configurador 3D",
    cat: "apps",
    initials: "RV",
    desc: "Configurador 3D de muebles con cotización instantánea, vista en realidad aumentada y envío de presupuesto por email.",
    tags: ["React", "Vite", "three.js", "AR", "EmailJS"],
    featured: true,
    url: "https://renovision-nu.vercel.app",
    repo: "Aquiles-diaz/renovision",
    image: "/projects/renovision.jpg",
  },
  {
    name: "Zafiro Beauty",
    slug: "zafiro-beauty",
    type: "Sistema de reservas",
    cat: "apps",
    initials: "ZB",
    desc: "Plataforma de reservas de turnos para un centro de estética: pagos de señas con MercadoPago, confirmación por WhatsApp y panel de administración.",
    tags: ["React", "NestJS", "tRPC", "PostgreSQL", "MercadoPago"],
    featured: true,
    url: "https://zafiro-beauty-web.vercel.app",
    repo: "MurielSalbador/ZafiroBeauty",
    image: "/projects/zafiro-beauty.jpg",
  },
  {
    name: "Aurora",
    slug: "aurora",
    type: "Plataforma SaaS",
    cat: "apps",
    initials: "AU",
    desc: "Panel multi-tenant con analítica en tiempo real y facturación integrada.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Vértice",
    slug: "vertice",
    type: "Tienda online",
    cat: "ecommerce",
    initials: "VÉ",
    desc: "E-commerce headless con checkout en un paso y pagos seguros.",
    tags: ["Next.js", "Stripe", "Sanity"],
    featured: true,
  },
  {
    name: "Lumina",
    slug: "lumina",
    type: "Sitio corporativo",
    cat: "web",
    initials: "LU",
    desc: "Web institucional multilingüe con CMS y un 100 en Core Web Vitals.",
    tags: ["Astro", "Tailwind", "Headless CMS"],
    featured: true,
  },
  {
    name: "Núcleo",
    slug: "nucleo",
    type: "Panel de datos",
    cat: "apps",
    initials: "NÚ",
    desc: "Dashboard de BI con visualizaciones interactivas y roles de acceso.",
    tags: ["React", "Node.js", "D3"],
  },
  {
    name: "Marea",
    slug: "marea",
    type: "E-commerce de moda",
    cat: "ecommerce",
    initials: "MA",
    desc: "Tienda de moda con catálogo dinámico y recomendaciones personalizadas.",
    tags: ["Shopify Hydrogen", "GraphQL"],
  },
  {
    name: "Orbe",
    slug: "orbe",
    type: "Landing de producto",
    cat: "web",
    initials: "OR",
    desc: "Landing de alto impacto con animaciones y captación de leads.",
    tags: ["Next.js", "Motion", "Tailwind"],
  },
  {
    name: "Cima",
    slug: "cima",
    type: "Portal institucional",
    cat: "web",
    initials: "CI",
    desc: "Portal público con accesibilidad AA y gestor de contenidos a medida.",
    tags: ["Next.js", "Strapi", "PostgreSQL"],
  },
  {
    name: "Pulso",
    slug: "pulso",
    type: "App de reservas",
    cat: "apps",
    initials: "PU",
    desc: "Sistema de turnos con notificaciones y pasarela de pago.",
    tags: ["React", "Express", "Prisma"],
  },
  {
    name: "Bazar",
    slug: "bazar",
    type: "Marketplace",
    cat: "ecommerce",
    initials: "BA",
    desc: "Marketplace multivendedor con panel de comisiones y envíos.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
  },
];

export const FILTERS: [string, string][] = [
  ["all", "Todo"],
  ["web", "Web"],
  ["apps", "Apps"],
  ["ecommerce", "E-commerce"],
];
