export type Project = {
  name: string;
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
};

export const PROJECTS: Project[] = [
  {
    name: "Aurora",
    type: "Plataforma SaaS",
    cat: "apps",
    initials: "AU",
    desc: "Panel multi-tenant con analítica en tiempo real y facturación integrada.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Vértice",
    type: "Tienda online",
    cat: "ecommerce",
    initials: "VÉ",
    desc: "E-commerce headless con checkout en un paso y pagos seguros.",
    tags: ["Next.js", "Stripe", "Sanity"],
    featured: true,
  },
  {
    name: "Lumina",
    type: "Sitio corporativo",
    cat: "web",
    initials: "LU",
    desc: "Web institucional multilingüe con CMS y un 100 en Core Web Vitals.",
    tags: ["Astro", "Tailwind", "Headless CMS"],
    featured: true,
  },
  {
    name: "Núcleo",
    type: "Panel de datos",
    cat: "apps",
    initials: "NÚ",
    desc: "Dashboard de BI con visualizaciones interactivas y roles de acceso.",
    tags: ["React", "Node.js", "D3"],
  },
  {
    name: "Marea",
    type: "E-commerce de moda",
    cat: "ecommerce",
    initials: "MA",
    desc: "Tienda de moda con catálogo dinámico y recomendaciones personalizadas.",
    tags: ["Shopify Hydrogen", "GraphQL"],
  },
  {
    name: "Orbe",
    type: "Landing de producto",
    cat: "web",
    initials: "OR",
    desc: "Landing de alto impacto con animaciones y captación de leads.",
    tags: ["Next.js", "Motion", "Tailwind"],
  },
  {
    name: "Cima",
    type: "Portal institucional",
    cat: "web",
    initials: "CI",
    desc: "Portal público con accesibilidad AA y gestor de contenidos a medida.",
    tags: ["Next.js", "Strapi", "PostgreSQL"],
  },
  {
    name: "Pulso",
    type: "App de reservas",
    cat: "apps",
    initials: "PU",
    desc: "Sistema de turnos con notificaciones y pasarela de pago.",
    tags: ["React", "Express", "Prisma"],
  },
  {
    name: "Bazar",
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
