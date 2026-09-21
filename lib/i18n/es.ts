import type { Dict } from "./types";

/** Copy del sitio en español rioplatense. `en.ts` respeta la misma forma. */
export const es: Dict = {
  meta: {
    tagline: "Sistemas y seguridad",
    toggle: "Cambiar a modo claro e inglés",
  },

  nav: {
    links: [
      { label: "Qué construimos", id: "sistemas" },
      { label: "Servicios", id: "servicios" },
      { label: "Seguridad", id: "seguridad" },
      { label: "Proceso", id: "proceso" },
      { label: "Proyectos", id: "casos" },
      { label: "Contacto", id: "contacto" },
    ],
    cta: "Hablemos",
    home: "Inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    eyebrow: "Desarrollo de sistemas · Rosario, Argentina",
    titlePre: "Sistemas",
    words: ["de escritorio", "web", "para celulares", "seguros"],
    titlePost: "para empresas que no pueden fallar.",
    subtitle:
      "Diseñamos, construimos y protegemos software a medida: aplicaciones de escritorio, plataformas web y apps móviles. Código propio, seguridad desde el primer día y un equipo que responde.",
    ctaPrimary: "Ver qué construimos",
    ctaSecondary: "Hablar con un desarrollador",
    benefits: [
      "Código propio, sin plantillas",
      "Seguridad desde el diseño",
      "Presupuesto cerrado",
    ],
  },

  gap: {
    eyebrow: "El problema",
    title: "Toda esta gente busca en el celular. ¿Encuentra tu negocio?",
    subtitle:
      "Muchísimas empresas todavía funcionan con WhatsApp, papel y una planilla. Sin web, no te encuentran. Sin sistema, la operación depende de la memoria de una persona. Un sistema propio le cambia la vida a tu negocio y a tu equipo.",
    points: [
      {
        title: "Sin web",
        desc: "Te buscan en Google, no aparecés, y el cliente se va con quien sí está.",
      },
      {
        title: "Sin sistema",
        desc: "Pedidos en cuadernos, stock a ojo, cobros que se pierden. Todo vive en la cabeza de alguien.",
      },
      {
        title: "Sin seguridad",
        desc: "Contraseñas compartidas y sin backups. Un solo incidente puede frenar la empresa.",
      },
    ],
    cta: "Quiero estar en internet",
    ctaSecondary: "Ver planes",
    sectorsLabel: "Trabajamos con",
    sectors: [
      "Comercios",
      "Talleres",
      "Distribuidoras",
      "Estudios contables",
      "Clínicas y consultorios",
      "Constructoras",
      "Agro",
      "Logística",
    ],
  },

  platforms: {
    eyebrow: "Qué construimos",
    title: "Un sistema para cada lugar donde trabaja tu empresa",
    subtitle:
      "No hacemos bots ni plantillas. Construimos el sistema que tu operación necesita, en la plataforma donde lo vas a usar.",
    idealFor: "Ideal para",
    items: [
      {
        key: "desktop",
        title: "Sistemas de escritorio",
        desc: "Aplicaciones para Windows, macOS y Linux que funcionan aunque se corte internet. Rápidas, estables y pensadas para el trabajo diario.",
        bullets: [
          "Gestión, stock y facturación",
          "Puntos de venta y depósitos",
          "Herramientas internas de producción",
        ],
        tech: "Electron · .NET · Python",
      },
      {
        key: "web",
        title: "Plataformas web",
        desc: "Sistemas accesibles desde cualquier navegador: paneles de administración, portales de clientes, plataformas con usuarios y permisos.",
        bullets: [
          "Paneles y back-office",
          "Portales para clientes y proveedores",
          "E-commerce y reservas con pagos",
        ],
        tech: "Next.js · React · Node · PostgreSQL",
      },
      {
        key: "mobile",
        title: "Apps para celulares",
        desc: "Apps para iOS y Android conectadas a tu sistema. Para tu equipo en la calle o para que tus clientes te tengan en el bolsillo.",
        bullets: [
          "Apps de campo para vendedores y técnicos",
          "Apps de clientes con notificaciones",
          "Publicación en App Store y Google Play",
        ],
        tech: "React Native · Expo",
      },
    ],
  },

  services: {
    eyebrow: "Servicios",
    title: "Lo que rodea al sistema también lo hacemos nosotros",
    subtitle:
      "La plataforma es la mitad. La otra mitad es la lógica de tu negocio, las conexiones con lo que ya usás y la seguridad. Un solo equipo, responsable de punta a punta.",
    items: [
      {
        title: "Sistemas de gestión a medida",
        desc: "Tu ERP o CRM propio, con los procesos de tu empresa y no los de un software genérico. Sin licencias por usuario, sin módulos que no usás.",
        featured: true,
      },
      {
        title: "Integraciones y APIs",
        desc: "Conectamos tu sistema con facturación electrónica, medios de pago, logística y lo que ya usás. Sin copiar datos a mano.",
      },
      {
        title: "Ciberseguridad",
        desc: "Auditoría de sistemas existentes, endurecimiento de servidores, backups y pruebas de intrusión. Para lo que construimos y para lo que ya tenés.",
      },
    ],
  },

  security: {
    eyebrow: "Seguridad y confianza",
    title: "La seguridad no es un módulo aparte",
    subtitle:
      "Cada sistema sale con las protecciones que una empresa necesita, desde el diseño. No se agregan después, cuando ya pasó algo.",
    practices: [
      {
        title: "Acceso controlado",
        desc: "Autenticación fuerte, doble factor y permisos por rol. Cada persona ve solo lo que le corresponde.",
      },
      {
        title: "Datos cifrados",
        desc: "Cifrado en tránsito y en reposo. Contraseñas con hash, secretos fuera del código.",
      },
      {
        title: "Backups y recuperación",
        desc: "Copias automáticas, probadas, con un plan de recuperación por escrito. Si algo falla, volvés a estar operativo.",
      },
      {
        title: "Auditoría de código y dependencias",
        desc: "Revisión del código propio y de las librerías de terceros. Actualizaciones de seguridad aplicadas, no pospuestas.",
      },
      {
        title: "Pruebas de intrusión",
        desc: "Antes de salir a producción, atacamos nuestro propio sistema para encontrar lo que un tercero encontraría.",
      },
      {
        title: "Registro y monitoreo",
        desc: "Logs de actividad, alertas ante comportamientos anómalos y monitoreo de disponibilidad.",
      },
    ],
    trustTitle: "Lo que te garantizamos por contrato",
    trust: [
      {
        title: "El código es tuyo",
        desc: "Entregamos el código fuente completo y la documentación. Sin dependencia de nosotros ni de nadie.",
      },
      {
        title: "Confidencialidad",
        desc: "Firmamos acuerdo de confidencialidad si lo necesitás. Tus procesos y tus datos no salen de tu empresa.",
      },
      {
        title: "Presupuesto cerrado",
        desc: "Alcance y precio definidos por escrito antes de empezar. Lo que cambia, se acuerda; no se descubre en la factura.",
      },
      {
        title: "Personas reales",
        desc: "Hablás con quien construye tu sistema. Sin tickets a la nada ni soporte tercerizado.",
      },
    ],
  },

  stack: {
    eyebrow: "Tecnología",
    title: "Tecnología probada, no experimentos",
    subtitle:
      "Elegimos herramientas con años de uso en producción y comunidades grandes. Que dentro de cinco años haya quien las mantenga.",
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
    eyebrow: "Por qué nosotros",
    title: "La diferencia está en cómo trabajamos",
    subtitle:
      "No vendemos horas ni entregamos documentos. Construimos sistemas, conocemos tu operación y nos quedamos hasta que todo funcione como tiene que funcionar.",
    commitments: [
      { value: "100%", label: "código fuente entregado" },
      { value: "0", label: "sorpresas en la factura" },
      { value: "< 12 h", label: "para responderte" },
      { value: "24/7", label: "monitoreo con Plan Cuidado" },
    ],
    tableTitle: "Neura Sistemas vs. lo habitual",
    tableSubtitle: "Lo que te preocupa, comparado con franqueza.",
    cols: ["Lo que te preocupa", "Neura Sistemas", "Agencias y freelancers"],
    shortNeura: "Neura",
    shortOthers: "Otros",
    rows: [
      {
        aspect: "Inversión y sorpresas",
        neura: "Precio cerrado por escrito. Sabés el costo total desde el día uno.",
        others: "Presupuestos que se inflan a mitad de proyecto o se cobran por hora sin tope.",
      },
      {
        aspect: "Plazos",
        neura: "Entregas por etapas con fechas. Ves el sistema andando desde las primeras semanas.",
        others: "Meses sin ver nada funcionando y una entrega final que no coincide con lo pedido.",
      },
      {
        aspect: "Seguridad",
        neura: "Incluida desde el diseño: accesos, cifrado, backups y pruebas antes de salir.",
        others: "Se piensa después, si se piensa. Contraseñas en texto plano no son raras.",
      },
      {
        aspect: "El día después",
        neura: "Seguimos con vos. Plan Cuidado opcional para que el sistema no quede obsoleto.",
        others: "Entregan y desaparecen. Cada cambio es empezar de cero con alguien nuevo.",
      },
    ],
  },

  process: {
    eyebrow: "Proceso",
    title: "Cómo trabajamos",
    steps: [
      {
        n: "01",
        title: "Diagnóstico",
        desc: "Una reunión de 30 minutos. Entendemos tu operación, qué duele y qué tiene que resolver el sistema.",
      },
      {
        n: "02",
        title: "Propuesta y alcance",
        desc: "Te decimos exactamente qué construimos, en qué etapas, cuánto cuesta y cuándo lo tenés.",
      },
      {
        n: "03",
        title: "Desarrollo y pruebas",
        desc: "Construimos por etapas con demos frecuentes. Antes de salir, pruebas funcionales y de seguridad.",
      },
      {
        n: "04",
        title: "Entrega y soporte",
        desc: "Instalación, capacitación de tu equipo y código fuente en tu poder. Después, seguimos cerca.",
      },
    ],
  },

  cases: {
    eyebrow: "Proyectos",
    title: "Sistemas reales, funcionando hoy",
    subtitle:
      "No son maquetas: son sistemas en producción, con usuarios reales. Entrá y probalos.",
    cta: "Ver todos los proyectos",
    view: "Ver proyecto",
    viewAria: "Ver proyecto",
    preview: "Vista previa de",
  },

  testimonials: {
    eyebrow: "Opiniones",
    title: "Lo que dicen quienes ya confiaron",
    stars: "5 de 5 estrellas",
    viewLive: "Ver el sistema en vivo",
    items: [
      {
        quote:
          "Pensé que era imposible: un configurador 3D donde el cliente arma su mueble, lo ve en realidad aumentada y recibe la cotización en tiempo real. Le cambió la vida a la empresa.",
        author: "Pablo B. Arcadigni",
        business: "Reno Amoblamientos",
        place: "Piñero, Santa Fe",
        when: "hace 1 mes",
        href: "https://renovision-nu.vercel.app",
      },
      {
        quote:
          "Montamos un portal de empleo donde cada persona sube su CV y un video de un minuto presentándose. Revolucionó la búsqueda: hoy damos trabajo en toda la provincia de Santa Fe.",
        author: "Sergio Ducca",
        business: "Human Power",
        place: "Rosario, Santa Fe",
        when: "hace 2 meses",
        href: "https://human-power-rrhh.vercel.app",
      },
    ],
  },

  packs: {
    eyebrow: "Planes",
    title: "Elegí por dónde empezar",
    subtitle:
      "Precios de referencia, cerrados por escrito antes de arrancar. Empezás por lo que necesitás hoy y sumás módulos después.",
    from: "Desde",
    currency: "USD",
    popular: "Más elegido",
    popularAria: "Plan más elegido",
    items: [
      {
        id: "web",
        name: "Presencia",
        para: "Para empresas que necesitan una web seria",
        headline: "Sitio web profesional, listo en 2-4 semanas",
        bullets: [
          "Diseño a medida, sin plantillas",
          "Formulario, mapa y WhatsApp integrados",
          "Hosting seguro con SSL y backups",
        ],
        price: "$450",
        cta: "Quiero mi web",
      },
      {
        id: "sistema",
        name: "Sistema",
        para: "Para operaciones que hoy viven en planillas",
        headline: "Tu sistema de gestión, web o de escritorio",
        bullets: [
          "Usuarios, roles y permisos",
          "Módulos a medida: stock, ventas, clientes",
          "Reportes y panel de control",
        ],
        price: "$900",
        cta: "Quiero mi sistema",
        featured: true,
      },
      {
        id: "integral",
        name: "Integral",
        para: "Para empresas con equipo en la calle",
        headline: "Sistema + app móvil + auditoría de seguridad",
        bullets: [
          "Todo lo del plan Sistema",
          "App iOS y Android conectada",
          "Pruebas de intrusión y plan de backups",
        ],
        price: "$1800",
        cta: "Quiero todo",
      },
    ],
    footnotePre: "Presencia sale en 2-4 semanas. Sistema e Integral se planifican por etapas según tu proyecto. Primeros clientes: ",
    footnoteStrong: "30% de descuento",
    footnotePost: ".",
  },

  care: {
    eyebrow: "Plan Cuidado",
    title: "Tu sistema no se queda solo",
    subtitle:
      "Es opcional y lo activás solo si lo querés. Si lo tomás, nosotros nos ocupamos de que siga seguro, actualizado y andando. Vos seguís con tu empresa.",
    recommended: "Recomendado",
    recommendedAria: "Plan recomendado",
    perMonth: "USD/mes",
    items: [
      {
        id: "cuidado-web",
        name: "Cuidado Web",
        para: "Para tu sitio o plataforma web",
        price: "$29",
        bullets: [
          "Hosting, dominio y SSL gestionados",
          "Backups automáticos y monitoreo de disponibilidad",
          "Actualizaciones de seguridad aplicadas",
          "1 cambio chico por mes",
          "Soporte por WhatsApp",
        ],
        cta: "Quiero Cuidado Web",
      },
      {
        id: "cuidado-sistema",
        name: "Cuidado Sistema",
        para: "Para tu sistema de gestión o app",
        price: "$99",
        bullets: [
          "Todo lo de Cuidado Web",
          "Monitoreo 24/7 con alertas",
          "Parches y dependencias al día",
          "Revisión de seguridad trimestral",
          "Reporte mensual y soporte prioritario",
        ],
        cta: "Quiero Cuidado Sistema",
        featured: true,
      },
    ],
    footnotePre: "Con cualquier plan: ",
    footnoteStrong: "1er mes gratis y meses 2 y 3 al 50%",
    footnotePost: ". Cobro mensual por Mercado Pago o tarjeta. Cancelás cuando quieras.",
  },

  faq: {
    title: "Lo que probablemente te estés preguntando",
    items: [
      {
        q: "¿Cuánto cuesta un sistema a medida?",
        a: "Depende del alcance. Los planes arrancan en US$450 para una web y US$900 para un sistema de gestión. Siempre con presupuesto cerrado por escrito antes de empezar.",
      },
      {
        q: "¿Escritorio, web o celular? ¿Qué me conviene?",
        a: "Depende de dónde se usa. Si la operación no puede parar por internet, escritorio. Si lo usan desde varios lugares, web. Si el equipo está en la calle o querés estar en el celular de tus clientes, móvil. Muchas veces es una combinación y lo definimos juntos en el diagnóstico.",
      },
      {
        q: "¿El código es mío?",
        a: "Sí. Entregamos el código fuente completo, documentado, y los accesos a todo. No hay licencias por usuario ni dependencia de nosotros.",
      },
      {
        q: "¿Qué pasa con la seguridad de mis datos?",
        a: "Cada sistema sale con accesos por rol, cifrado, backups automáticos y pruebas de intrusión antes de producción. Si ya tenés un sistema, podemos auditarlo. Firmamos acuerdo de confidencialidad si lo necesitás.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Una web, entre 2 y 4 semanas. Un sistema de gestión se entrega por etapas: la primera versión usable suele estar en 6 a 10 semanas, y desde ahí sumamos módulos.",
      },
      {
        q: "¿Y si después necesito cambios?",
        a: "Los hacemos. Si querés que nos ocupemos siempre, hay un Plan Cuidado opcional desde US$29 por mes, con el primer mes gratis.",
      },
      {
        q: "¿Cómo es el soporte?",
        a: "Respondemos rápido: dudas simples en menos de una hora y temas a fondo en menos de 12, en horario laboral. Hablás con quien construyó tu sistema, no con un ticket.",
      },
    ],
  },

  contact: {
    title: "¿Hablamos de tu sistema?",
    subtitle:
      "Agendá una llamada sin compromiso y contanos qué necesitás. En 30 minutos sabemos si podemos ayudarte y por dónde empezar.",
    cta: "Agendá una llamada sin compromiso",
    location: "Rosario, Santa Fe",
    trust: [
      "Respondemos rápido: preguntas simples en menos de 1 hora; algo más a fondo, en menos de 12.",
      "Tu mensaje nos llega directo, sin pasar por terceros.",
      "Tu información es privada: no la compartimos ni te mandamos spam.",
      "Sin compromiso ni costos ocultos. Hablás con quien construye tu sistema.",
    ],
    fields: {
      name: "Nombre",
      namePh: "Tu nombre",
      email: "Correo",
      emailPh: "vos@tuempresa.com",
      phone: "Teléfono (opcional)",
      phonePh: "WhatsApp o teléfono",
      company: "Empresa (opcional)",
      companyPh: "Tu empresa",
      message: "¿Qué necesitás construir?",
      messagePh:
        "Contanos brevemente: sistema de gestión, app para tu equipo, plataforma web, auditoría de seguridad…",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    errorPre: "No se pudo enviar. Escribinos por ",
    errorMid: " o a ",
    errorPost: ".",
    privacy: "Tus datos están seguros. Solo los usamos para responderte.",
    subjectPrefix: "Contacto",
    sentMessage: "Recibimos tu mensaje. Te respondemos en menos de 12 h.",
    labels: {
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono",
      company: "Empresa",
      message: "Consulta",
    },
  },

  footer: {
    blurb:
      "Construimos sistemas a medida para empresas: aplicaciones de escritorio, plataformas web y apps móviles, con la seguridad como parte del diseño. Desde Rosario, para toda Argentina.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    location: "Rosario, Santa Fe",
    rights: "Todos los derechos reservados",
    tagline: "Rosario, Santa Fe · Sistemas a medida y ciberseguridad",
    links: [
      { label: "Qué construimos", href: "/#sistemas" },
      { label: "Servicios", href: "/#servicios" },
      { label: "Seguridad", href: "/#seguridad" },
      { label: "Planes", href: "/#packs" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "FAQ", href: "/#faq" },
    ],
    contactLink: "Contacto",
  },

  drawer: {
    title: "Hablemos",
    close: "Cerrar",
    introStrong: "Soy Aquiles, uno de los desarrolladores.",
    intro: "Te respondo yo, no un bot.",
    channels: {
      whatsapp: "WhatsApp directo",
      call: "Llamar ahora",
      mail: "Escribir un mail",
    },
    foot: "Rosario · Preguntas rápidas en menos de 1 h. Algo más a fondo, en menos de 12 h.",
    waText: "Hola Neura! Quiero coordinar una llamada para hablar de un sistema para mi empresa.",
    mailSubject: "Contacto desde la web",
  },

  promo: {
    message: "Primeros clientes: 30% OFF en tu primer sistema.",
    cta: "Aprovechar",
    close: "Cerrar anuncio",
    region: "Anuncio",
  },

  exit: {
    kicker: "Auditoría express · gratis",
    title: "¿Te vas con la duda?",
    body: "Llevate una auditoría express gratis: revisamos tu sistema actual o tu idea y te decimos por dónde empezar y qué riesgos tiene. 30 minutos, sin compromiso.",
    cta: "Quiero mi auditoría",
    mail: "Prefiero por mail",
    later: "Ahora no",
    close: "Cerrar",
    waText: "Hola Neura! Quiero la auditoría express gratis para mi empresa.",
    mailSubject: "Quiero mi auditoría express",
    mailBody:
      "Hola Neura, me interesa la auditoría express gratis.\n\nMi empresa es: \nEl sistema que tengo hoy (o la idea) es: ",
  },

  sent: {
    title: "¡Mensaje enviado!",
    ok: "Entendido",
    close: "Cerrar",
  },

  projectsPage: {
    eyebrow: "Portafolio",
    titlePre: "Sistemas que ",
    titleAccent: "hablan por nosotros",
    subtitle:
      "Una selección de trabajos: sistemas de gestión, plataformas web, configuradores y portales. Cada uno pensado para su rubro y construido para durar.",
    filters: { all: "Todo", web: "Web", apps: "Sistemas", ecommerce: "E-commerce" },
    back: "Volver a proyectos",
    repo: "Ver repositorio",
    live: "Ver en vivo",
  },

  startPage: {
    eyebrow: "Iniciar proyecto",
    titlePre: "Contanos ",
    titleAccent: "tu idea",
    subtitle:
      "Unos pocos datos para entender qué necesitás, tu presupuesto y para cuándo. Te respondemos en menos de 12 horas con una propuesta concreta, sin compromiso.",
  },

  notFound: {
    code: "Error 404",
    title: "Página no encontrada",
    body: "La página que buscás no existe o fue movida. Volvé al inicio para seguir navegando.",
    cta: "Volver al inicio",
  },
};
