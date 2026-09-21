import type { Dict } from "./types";

/** English copy. Must mirror `es.ts` exactly (enforced by the `Dict` type). */
export const en: Dict = {
  meta: {
    tagline: "Systems and security",
    toggle: "Switch to dark mode and Spanish",
  },

  nav: {
    links: [
      { label: "What we build", id: "sistemas" },
      { label: "Services", id: "servicios" },
      { label: "Security", id: "seguridad" },
      { label: "Process", id: "proceso" },
      { label: "Projects", id: "casos" },
      { label: "Contact", id: "contacto" },
    ],
    cta: "Let's talk",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "Software systems · Rosario, Argentina",
    titlePre: "Systems",
    words: ["for desktop", "for the web", "for mobile", "built secure"],
    titlePost: "for companies that can't afford to fail.",
    subtitle:
      "We design, build and protect custom software: desktop applications, web platforms and mobile apps. Code you own, security from day one, and a team that answers.",
    ctaPrimary: "See what we build",
    ctaSecondary: "Talk to a developer",
    benefits: [
      "Your own code, no templates",
      "Security by design",
      "Fixed-price quotes",
    ],
  },

  gap: {
    eyebrow: "The problem",
    title: "All these people search on their phones. Do they find your business?",
    subtitle:
      "A huge number of companies still run on WhatsApp, paper and a spreadsheet. With no website, nobody finds you. With no system, the operation depends on one person's memory. A system of your own changes daily life for your business and your team.",
    points: [
      {
        title: "No website",
        desc: "People search on Google, you don't show up, and the customer goes to whoever does.",
      },
      {
        title: "No system",
        desc: "Orders in notebooks, stock by eye, payments that slip away. Everything lives in someone's head.",
      },
      {
        title: "No security",
        desc: "Shared passwords and no backups. A single incident can bring the company to a halt.",
      },
    ],
    cta: "I want to be online",
    ctaSecondary: "See plans",
    sectorsLabel: "We work with",
    sectors: [
      "Retail",
      "Workshops",
      "Distributors",
      "Accounting firms",
      "Clinics and practices",
      "Construction",
      "Agriculture",
      "Logistics",
    ],
  },

  platforms: {
    eyebrow: "What we build",
    title: "A system for every place your company works",
    subtitle:
      "No bots, no templates. We build the system your operation needs, on the platform where you'll actually use it.",
    idealFor: "Ideal for",
    items: [
      {
        key: "desktop",
        title: "Desktop systems",
        desc: "Applications for Windows, macOS and Linux that keep working when the internet doesn't. Fast, stable and made for daily work.",
        bullets: [
          "Management, inventory and invoicing",
          "Points of sale and warehouses",
          "Internal production tools",
        ],
        tech: "Electron · .NET · Python",
      },
      {
        key: "web",
        title: "Web platforms",
        desc: "Systems available from any browser: admin panels, customer portals, platforms with users and permissions.",
        bullets: [
          "Dashboards and back-office",
          "Customer and supplier portals",
          "E-commerce and bookings with payments",
        ],
        tech: "Next.js · React · Node · PostgreSQL",
      },
      {
        key: "mobile",
        title: "Mobile apps",
        desc: "iOS and Android apps connected to your system. For your team in the field, or to put your business in your customers' pocket.",
        bullets: [
          "Field apps for sales reps and technicians",
          "Customer apps with notifications",
          "Published on the App Store and Google Play",
        ],
        tech: "React Native · Expo",
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Everything around the system, we build too",
    subtitle:
      "The platform is half of it. The other half is your business logic, the connections to what you already use, and security. One team, accountable end to end.",
    items: [
      {
        title: "Custom management systems",
        desc: "Your own ERP or CRM, built around your company's processes instead of a generic product's. No per-seat licences, no modules you never use.",
        featured: true,
      },
      {
        title: "Integrations and APIs",
        desc: "We connect your system to e-invoicing, payment providers, logistics and the tools you already use. No more copying data by hand.",
      },
      {
        title: "Cybersecurity",
        desc: "Audits of existing systems, server hardening, backups and penetration testing. For what we build and for what you already have.",
      },
    ],
  },

  security: {
    eyebrow: "Security and trust",
    title: "Security isn't a separate module",
    subtitle:
      "Every system ships with the protections a company needs, from the design stage. Not bolted on later, after something already happened.",
    practices: [
      {
        title: "Controlled access",
        desc: "Strong authentication, two-factor and role-based permissions. Everyone sees only what they should.",
      },
      {
        title: "Encrypted data",
        desc: "Encryption in transit and at rest. Hashed passwords, secrets kept out of the code.",
      },
      {
        title: "Backups and recovery",
        desc: "Automatic, tested backups with a written recovery plan. If something breaks, you're back up.",
      },
      {
        title: "Code and dependency audits",
        desc: "We review our own code and the third-party libraries it relies on. Security updates get applied, not postponed.",
      },
      {
        title: "Penetration testing",
        desc: "Before going live, we attack our own system to find what an outsider would find.",
      },
      {
        title: "Logging and monitoring",
        desc: "Activity logs, alerts on anomalous behaviour and uptime monitoring.",
      },
    ],
    trustTitle: "What we guarantee in the contract",
    trust: [
      {
        title: "You own the code",
        desc: "We hand over the full source code and documentation. No lock-in to us or anyone else.",
      },
      {
        title: "Confidentiality",
        desc: "We sign an NDA if you need one. Your processes and data stay inside your company.",
      },
      {
        title: "Fixed price",
        desc: "Scope and price in writing before we start. Changes get agreed, not discovered on the invoice.",
      },
      {
        title: "Real people",
        desc: "You talk to whoever builds your system. No tickets into the void, no outsourced support.",
      },
    ],
  },

  stack: {
    eyebrow: "Technology",
    title: "Proven technology, not experiments",
    subtitle:
      "We pick tools with years in production and large communities, so that five years from now someone can still maintain them.",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "React Native",
      "Electron",
      ".NET",
      "Python",
      "Docker",
      "Mercado Pago",
      "Stripe",
      "AFIP",
    ],
  },

  whyUs: {
    eyebrow: "Why us",
    title: "The difference is how we work",
    subtitle:
      "We don't sell hours or deliver documents. We build systems, learn your operation and stay until everything works the way it should.",
    commitments: [
      { value: "100%", label: "source code handed over" },
      { value: "0", label: "surprises on the invoice" },
      { value: "< 12 h", label: "to get back to you" },
      { value: "24/7", label: "monitoring with the Care plan" },
    ],
    tableTitle: "Neura Sistemas vs. the usual",
    tableSubtitle: "What worries you, compared honestly.",
    cols: ["What worries you", "Neura Sistemas", "Agencies and freelancers"],
    shortNeura: "Neura",
    shortOthers: "Others",
    rows: [
      {
        aspect: "Cost and surprises",
        neura: "Fixed price in writing. You know the total cost from day one.",
        others: "Quotes that balloon mid-project, or hourly billing with no cap.",
      },
      {
        aspect: "Timelines",
        neura: "Staged deliveries with dates. You see the system running within the first weeks.",
        others: "Months without anything working, then a final delivery that doesn't match the brief.",
      },
      {
        aspect: "Security",
        neura: "Built in from the design: access control, encryption, backups and testing before launch.",
        others: "Thought about later, if at all. Plaintext passwords are not unusual.",
      },
      {
        aspect: "The day after",
        neura: "We stay with you. Optional Care plan so the system never goes stale.",
        others: "Deliver and vanish. Every change means starting over with someone new.",
      },
    ],
  },

  process: {
    eyebrow: "Process",
    title: "How we work",
    steps: [
      {
        n: "01",
        title: "Diagnosis",
        desc: "A 30-minute meeting. We learn your operation, what hurts and what the system has to solve.",
      },
      {
        n: "02",
        title: "Proposal and scope",
        desc: "We tell you exactly what we build, in which stages, what it costs and when you'll have it.",
      },
      {
        n: "03",
        title: "Development and testing",
        desc: "We build in stages with frequent demos. Before launch: functional and security testing.",
      },
      {
        n: "04",
        title: "Delivery and support",
        desc: "Installation, training for your team and the source code in your hands. Then we stay close.",
      },
    ],
  },

  cases: {
    eyebrow: "Projects",
    title: "Real systems, running today",
    subtitle:
      "Not mock-ups: production systems with real users. Go in and try them.",
    cta: "See all projects",
    view: "View project",
    viewAria: "View project",
    preview: "Preview of",
  },

  testimonials: {
    eyebrow: "Reviews",
    title: "What our clients say",
    stars: "5 out of 5 stars",
    viewLive: "See the live system",
    items: [
      {
        quote:
          "I thought it was impossible: a 3D configurator where the customer builds their own furniture, sees it in augmented reality and gets a quote in real time. It changed the company.",
        author: "Pablo B. Arcadigni",
        business: "Reno Amoblamientos",
        place: "Piñero, Santa Fe",
        when: "1 month ago",
        href: "https://renovision-nu.vercel.app",
      },
      {
        quote:
          "We launched a job portal where every candidate uploads a CV and a one-minute video introducing themselves. It transformed recruiting: today we place people across the whole province of Santa Fe.",
        author: "Sergio Ducca",
        business: "Human Power",
        place: "Rosario, Santa Fe",
        when: "2 months ago",
        href: "https://human-power-rrhh.vercel.app",
      },
    ],
  },

  packs: {
    eyebrow: "Plans",
    title: "Choose where to start",
    subtitle:
      "Reference prices, fixed in writing before we begin. Start with what you need today and add modules later.",
    from: "From",
    currency: "USD",
    popular: "Most popular",
    popularAria: "Most popular plan",
    items: [
      {
        id: "web",
        name: "Presence",
        para: "For companies that need a serious website",
        headline: "Professional website, live in 2-4 weeks",
        bullets: [
          "Custom design, no templates",
          "Contact form, map and WhatsApp built in",
          "Secure hosting with SSL and backups",
        ],
        price: "$450",
        cta: "I want my website",
      },
      {
        id: "sistema",
        name: "System",
        para: "For operations that live in spreadsheets today",
        headline: "Your management system, web or desktop",
        bullets: [
          "Users, roles and permissions",
          "Custom modules: inventory, sales, customers",
          "Reports and dashboard",
        ],
        price: "$900",
        cta: "I want my system",
        featured: true,
      },
      {
        id: "integral",
        name: "Complete",
        para: "For companies with a team in the field",
        headline: "System + mobile app + security audit",
        bullets: [
          "Everything in the System plan",
          "Connected iOS and Android app",
          "Penetration testing and backup plan",
        ],
        price: "$1800",
        cta: "I want it all",
      },
    ],
    footnotePre: "Presence ships in 2-4 weeks. System and Complete are planned in stages around your project. First clients: ",
    footnoteStrong: "30% off",
    footnotePost: ".",
  },

  care: {
    eyebrow: "Care plan",
    title: "Your system is never left alone",
    subtitle:
      "It's optional and you only turn it on if you want it. If you do, we keep the system secure, updated and running. You get on with your business.",
    recommended: "Recommended",
    recommendedAria: "Recommended plan",
    perMonth: "USD/month",
    items: [
      {
        id: "cuidado-web",
        name: "Web Care",
        para: "For your website or web platform",
        price: "$29",
        bullets: [
          "Managed hosting, domain and SSL",
          "Automatic backups and uptime monitoring",
          "Security updates applied",
          "1 small change per month",
          "WhatsApp support",
        ],
        cta: "I want Web Care",
      },
      {
        id: "cuidado-sistema",
        name: "System Care",
        para: "For your management system or app",
        price: "$99",
        bullets: [
          "Everything in Web Care",
          "24/7 monitoring with alerts",
          "Patches and dependencies kept current",
          "Quarterly security review",
          "Monthly report and priority support",
        ],
        cta: "I want System Care",
        featured: true,
      },
    ],
    footnotePre: "With any plan: ",
    footnoteStrong: "first month free, months 2 and 3 at 50%",
    footnotePost: ". Billed monthly via Mercado Pago or card. Cancel whenever you want.",
  },

  faq: {
    title: "What you're probably wondering",
    items: [
      {
        q: "How much does a custom system cost?",
        a: "It depends on the scope. Plans start at US$450 for a website and US$900 for a management system. Always with a fixed price in writing before we start.",
      },
      {
        q: "Desktop, web or mobile? Which one do I need?",
        a: "It depends on where it's used. If the operation can't stop when the internet does, desktop. If people use it from several places, web. If your team is in the field or you want to be on your customers' phones, mobile. It's often a combination, and we define it together in the diagnosis.",
      },
      {
        q: "Do I own the code?",
        a: "Yes. We hand over the full, documented source code and access to everything. No per-seat licences and no dependence on us.",
      },
      {
        q: "What about the security of my data?",
        a: "Every system ships with role-based access, encryption, automatic backups and penetration testing before going live. If you already have a system, we can audit it. We sign an NDA if you need one.",
      },
      {
        q: "How long does it take?",
        a: "A website, 2 to 4 weeks. A management system is delivered in stages: the first usable version is usually ready in 6 to 10 weeks, and we add modules from there.",
      },
      {
        q: "What if I need changes later?",
        a: "We make them. If you'd rather we always take care of it, there's an optional Care plan from US$29 a month, first month free.",
      },
      {
        q: "What's support like?",
        a: "We answer fast: simple questions within an hour and deeper issues within 12, during business hours. You talk to whoever built your system, not a ticket.",
      },
    ],
  },

  contact: {
    title: "Shall we talk about your system?",
    subtitle:
      "Book a no-obligation call and tell us what you need. In 30 minutes we'll know whether we can help and where to start.",
    cta: "Book a no-obligation call",
    location: "Rosario, Santa Fe",
    trust: [
      "We answer fast: simple questions within 1 hour; deeper ones within 12.",
      "Your message reaches us directly, no third parties in between.",
      "Your information is private: we don't share it and we don't spam.",
      "No obligation, no hidden costs. You talk to whoever builds your system.",
    ],
    fields: {
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@yourcompany.com",
      phone: "Phone (optional)",
      phonePh: "WhatsApp or phone",
      company: "Company (optional)",
      companyPh: "Your company",
      message: "What do you need built?",
      messagePh:
        "Briefly: a management system, an app for your team, a web platform, a security audit…",
    },
    submit: "Send message",
    sending: "Sending…",
    errorPre: "Couldn't send. Write to us on ",
    errorMid: " or at ",
    errorPost: ".",
    privacy: "Your data is safe. We only use it to reply to you.",
    subjectPrefix: "Contact",
    sentMessage: "We got your message. We'll reply within 12 h.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      message: "Message",
    },
  },

  footer: {
    blurb:
      "We build custom systems for companies: desktop applications, web platforms and mobile apps, with security as part of the design. From Rosario, for all of Argentina.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    location: "Rosario, Santa Fe",
    rights: "All rights reserved",
    tagline: "Rosario, Santa Fe · Custom systems and cybersecurity",
    links: [
      { label: "What we build", href: "/#sistemas" },
      { label: "Services", href: "/#servicios" },
      { label: "Security", href: "/#seguridad" },
      { label: "Plans", href: "/#packs" },
      { label: "Projects", href: "/proyectos" },
      { label: "FAQ", href: "/#faq" },
    ],
    contactLink: "Contact",
  },

  drawer: {
    title: "Let's talk",
    close: "Close",
    introStrong: "I'm Aquiles, one of the developers.",
    intro: "You'll get a reply from me, not a bot.",
    channels: {
      whatsapp: "WhatsApp directly",
      call: "Call now",
      mail: "Send an email",
    },
    foot: "Rosario · Quick questions within 1 h. Deeper ones within 12 h.",
    waText: "Hi Neura! I'd like to schedule a call about a system for my company.",
    mailSubject: "Contact from the website",
  },

  promo: {
    message: "First clients: 30% OFF your first system.",
    cta: "Claim it",
    close: "Close announcement",
    region: "Announcement",
  },

  exit: {
    kicker: "Express audit · free",
    title: "Leaving with a doubt?",
    body: "Take a free express audit: we review your current system or your idea and tell you where to start and what the risks are. 30 minutes, no obligation.",
    cta: "I want my audit",
    mail: "I'd rather email",
    later: "Not now",
    close: "Close",
    waText: "Hi Neura! I'd like the free express audit for my company.",
    mailSubject: "I want my express audit",
    mailBody:
      "Hi Neura, I'm interested in the free express audit.\n\nMy company is: \nThe system I have today (or the idea) is: ",
  },

  sent: {
    title: "Message sent!",
    ok: "Got it",
    close: "Close",
  },

  projectsPage: {
    eyebrow: "Portfolio",
    titlePre: "Systems that ",
    titleAccent: "speak for us",
    subtitle:
      "A selection of work: management systems, web platforms, configurators and portals. Each one designed for its industry and built to last.",
    filters: { all: "All", web: "Web", apps: "Systems", ecommerce: "E-commerce" },
    back: "Back to projects",
    repo: "View repository",
    live: "View live",
  },

  startPage: {
    eyebrow: "Start a project",
    titlePre: "Tell us ",
    titleAccent: "your idea",
    subtitle:
      "A few details to understand what you need, your budget and your timeline. We reply within 12 hours with a concrete proposal, no obligation.",
  },

  notFound: {
    code: "Error 404",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or was moved. Head back home to keep browsing.",
    cta: "Back to home",
  },
};
