import type { Dict } from "./types";

/** Copy del sitio en español rioplatense. `en.ts` respeta la misma forma. */
export const es: Dict = {
  meta: {
    tagline: "Sistemas y seguridad",
    toggle: "Cambiar a modo claro e inglés",
  },

  nav: {
    links: [
      { label: "Proyectos", id: "casos" },
      { label: "Qué construimos", id: "sistemas" },
      { label: "Garantías", id: "seguridad" },
      { label: "Proceso", id: "proceso" },
      { label: "Planes", id: "packs" },
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
      "Software a medida para tu empresa: escritorio, web y celular. El código es tuyo y el precio se cierra antes de empezar.",
    ctaPrimary: "Ver qué construimos",
    ctaSecondary: "Hablar con un desarrollador",
    benefits: [
      "Código propio, sin plantillas",
      "Seguridad desde el diseño",
      "Presupuesto cerrado",
    ],
  },


  platforms: {
    eyebrow: "Qué construimos",
    title: "Un sistema para cada lugar donde trabaja tu empresa",
    subtitle:
      "El sistema que tu operación necesita, en la plataforma donde lo vas a usar.",
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
    title: "Y todo lo que rodea al sistema",
    subtitle: "Un solo equipo, responsable de punta a punta.",
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
    eyebrow: "Garantías",
    title: "Lo que te garantizamos por contrato",
    subtitle: "Por escrito, no de palabra. Y la seguridad va incluida desde el diseño.",
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
    numbers: [
      { value: "100%", label: "del código fuente, tuyo" },
      { value: "0", label: "sorpresas en la factura" },
      { value: "< 12 h", label: "para responderte" },
      { value: "24/7", label: "monitoreo con Plan Cuidado" },
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
      "Empezás por lo que necesitás hoy y sumás módulos después. El precio se cierra por escrito antes de arrancar.",
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
        price: "Consultar",
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
        price: "Consultar",
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
        price: "Consultar",
        cta: "Quiero todo",
      },
    ],
    footnotePre: "Primeros clientes: ",
    footnoteStrong: "30% de descuento",
    footnotePost: " en tu primer sistema. Te pasamos el presupuesto cerrado después de una charla de 30 minutos.",
  },

  care: {
    eyebrow: "Plan Cuidado",
    title: "Tu sistema no se queda solo",
    subtitle:
      "Opcional. Nosotros lo mantenemos seguro, actualizado y andando; vos seguís con tu empresa.",
    recommended: "Recomendado",
    recommendedAria: "Plan recomendado",
    perMonth: "USD/mes",
    items: [
      {
        id: "cuidado-web",
        name: "Cuidado Web",
        para: "Para tu sitio o plataforma web",
        price: "Consultar",
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
        price: "Consultar",
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
    footnotePost: ". Cobro mensual. Cancelás cuando quieras.",
  },

  faq: {
    title: "Lo que probablemente te estés preguntando",
    items: [
      {
        q: "¿Cuánto cuesta un sistema a medida?",
        a: "Depende del alcance. Después de una charla de 30 minutos te pasamos un presupuesto cerrado por escrito. Lo que cambia se acuerda; no aparece en la factura.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Una web, entre 2 y 4 semanas. Un sistema de gestión se entrega por etapas: la primera versión usable suele estar en 6 a 10 semanas.",
      },
      {
        q: "¿El código es mío?",
        a: "Sí. Código fuente completo, documentado y con los accesos a todo. Sin licencias por usuario ni dependencia de nosotros.",
      },
      {
        q: "¿Y después de la entrega?",
        a: "Seguimos cerca. Los cambios los hacemos; y si querés que nos ocupemos siempre, está el Plan Cuidado opcional. Respondemos en menos de 12 h, y hablás con quien construyó tu sistema.",
      },
    ],
  },

  social: {
    eyebrow: "Instagram",
    title: "Mirá cómo trabajamos",
    subtitle:
      "Un minuto de video dice más que una página de texto. Mostramos lo que construimos, sin vueltas.",
    ctaWhatsapp: "Escribinos por WhatsApp",
    follow: "Seguir",
    open: "Ver en Instagram",
    loading: "Cargando video…",
  },

  contact: {
    title: "¿Hablamos de tu sistema?",
    subtitle:
      "Contanos qué necesitás. Te respondemos en menos de 12 h, sin compromiso.",
    cta: "Hablar por WhatsApp",
    location: "Rosario, Santa Fe",
    instagram: "Instagram",
    trust: [
      "Respondemos rápido: lo simple en menos de 1 h, lo complejo en menos de 12.",
      "Hablás con quien construye tu sistema. Sin spam ni costos ocultos.",
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
    sentMailtoMessage:
      "Se abrió tu correo con el mensaje listo. Enviálo y te respondemos en menos de 12 h. Si no se abrió, escribinos por WhatsApp.",
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
    followTitle: "Seguinos",
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
      instagram: "Mensaje por Instagram",
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
    body: "30 minutos gratis: revisamos tu sistema actual o tu idea y te decimos por dónde empezar.",
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
