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
    name: "Human Power",
    slug: "human-power",
    type: "Portal de empleo",
    cat: "apps",
    initials: "HP",
    desc: "Portal de empleo para una consultora de RRHH: cada candidato sube su CV y un video de presentación de un minuto. Conecta talento con empresas en toda la provincia de Santa Fe.",
    tags: [],
    featured: true,
    url: "https://human-power-rrhh.vercel.app",
    image: "/projects/human-power.jpg",
  },
];

export const FILTERS: [string, string][] = [
  ["all", "Todo"],
  ["web", "Web"],
  ["apps", "Apps"],
  ["ecommerce", "E-commerce"],
];
