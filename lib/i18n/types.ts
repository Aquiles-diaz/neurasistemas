/** Shape shared by every locale. `es.ts` and `en.ts` must both satisfy it. */

export type Lang = "es" | "en";

export interface NavLink {
  label: string;
  id: string;
}

export interface PlatformItem {
  key: "desktop" | "web" | "mobile";
  title: string;
  desc: string;
  bullets: string[];
  tech: string;
}

export interface TitledItem {
  title: string;
  desc: string;
  featured?: boolean;
}

export interface Commitment {
  value: string;
  label: string;
}

export interface CompareRow {
  aspect: string;
  neura: string;
  others: string;
}

export interface Step {
  n: string;
  title: string;
  desc: string;
}

export interface Review {
  quote: string;
  author: string;
  business: string;
  place: string;
  when: string;
  href?: string;
}

export interface Pack {
  id: string;
  name: string;
  para: string;
  headline: string;
  bullets: string[];
  price: string;
  cta: string;
  featured?: boolean;
}

export interface CarePlan {
  id: string;
  name: string;
  para: string;
  price: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Dict {
  meta: { tagline: string; toggle: string };

  nav: {
    links: NavLink[];
    cta: string;
    home: string;
    openMenu: string;
    closeMenu: string;
  };

  hero: {
    eyebrow: string;
    titlePre: string;
    words: string[];
    titlePost: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    benefits: string[];
  };

  /** "The problem": businesses with no digital presence, over the crowd canvas. */
  gap: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: TitledItem[];
    cta: string;
    ctaSecondary: string;
    sectorsLabel: string;
    sectors: string[];
  };

  platforms: {
    eyebrow: string;
    title: string;
    subtitle: string;
    idealFor: string;
    items: PlatformItem[];
  };

  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TitledItem[];
  };

  security: {
    eyebrow: string;
    title: string;
    subtitle: string;
    practices: TitledItem[];
    trustTitle: string;
    trust: TitledItem[];
  };

  stack: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
  };

  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    commitments: Commitment[];
    tableTitle: string;
    tableSubtitle: string;
    cols: [string, string, string];
    shortNeura: string;
    shortOthers: string;
    rows: CompareRow[];
  };

  process: {
    eyebrow: string;
    title: string;
    steps: Step[];
  };

  cases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    view: string;
    viewAria: string;
    preview: string;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    stars: string;
    viewLive: string;
    items: Review[];
  };

  packs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    from: string;
    currency: string;
    popular: string;
    popularAria: string;
    items: Pack[];
    footnotePre: string;
    footnoteStrong: string;
    footnotePost: string;
  };

  care: {
    eyebrow: string;
    title: string;
    subtitle: string;
    recommended: string;
    recommendedAria: string;
    perMonth: string;
    items: CarePlan[];
    footnotePre: string;
    footnoteStrong: string;
    footnotePost: string;
  };

  faq: {
    title: string;
    items: FaqItem[];
  };

  contact: {
    title: string;
    subtitle: string;
    cta: string;
    location: string;
    trust: string[];
    fields: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      phone: string;
      phonePh: string;
      company: string;
      companyPh: string;
      message: string;
      messagePh: string;
    };
    submit: string;
    sending: string;
    errorPre: string;
    errorMid: string;
    errorPost: string;
    privacy: string;
    subjectPrefix: string;
    sentMessage: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
    };
  };

  footer: {
    blurb: string;
    navTitle: string;
    contactTitle: string;
    location: string;
    rights: string;
    tagline: string;
    links: FooterLink[];
    contactLink: string;
  };

  drawer: {
    title: string;
    close: string;
    introStrong: string;
    intro: string;
    channels: { whatsapp: string; call: string; mail: string };
    foot: string;
    waText: string;
    mailSubject: string;
  };

  promo: {
    message: string;
    cta: string;
    close: string;
    region: string;
  };

  exit: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
    mail: string;
    later: string;
    close: string;
    waText: string;
    mailSubject: string;
    mailBody: string;
  };

  sent: {
    title: string;
    ok: string;
    close: string;
  };

  projectsPage: {
    eyebrow: string;
    titlePre: string;
    titleAccent: string;
    subtitle: string;
    filters: { all: string; web: string; apps: string; ecommerce: string };
    back: string;
    repo: string;
    live: string;
  };

  startPage: {
    eyebrow: string;
    titlePre: string;
    titleAccent: string;
    subtitle: string;
  };

  notFound: {
    code: string;
    title: string;
    body: string;
    cta: string;
  };
}
