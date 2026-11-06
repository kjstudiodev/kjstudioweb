import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const siteUrl = "https://kjstudio.dev";

export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

export function language(value: string): Language {
  if (value === "en" || value === "es") return value;
  notFound();
}

export const copy = {
  es: {
    services: "Servicios",
    products: "Productos",
    studio: "Estudio",
    contact: "Contacto",
    skip: "Saltar al contenido",
    nav: "Navegación principal",
    menu: "Menú",
    intro: "Estudio de software",
    location: "Costa Rica",
    headline: "Software a medida",
    emphasis: "consultoría técnica.",
    conjunction: "y",
    description:
      "Desarrollamos software a medida, ofrecemos consultoría técnica y capacitamos a equipos empresariales en inteligencia artificial.",
    talk: "Hablemos de tu proyecto",
    secondary: "Conoce",
    serviceHeading: "Qué hacemos",
    serviceIntro:
      "Desarrollamos soluciones y compartimos conocimiento para ayudar a tu equipo a avanzar con tecnología.",
    build: "Desarrollo a medida",
    buildText:
      "Creamos aplicaciones web y APIs a medida, y conectamos sistemas mediante integraciones. Podemos ayudarte a trasladar procesos manuales a una aplicación o a comunicar las herramientas que ya utiliza tu negocio.",
    advise: "Consultoría técnica",
    adviseText:
      "Analizamos la arquitectura y los sistemas existentes para identificar cuellos de botella y oportunidades de mejora. Junto a tu equipo, definimos prioridades y un siguiente paso técnico acorde con las necesidades del proyecto.",
    training: "Capacitación profesional en IA",
    trainingText:
      "Ofrecemos capacitaciones profesionales en inteligencia artificial para empresas y sus equipos, orientadas a comprender la tecnología y explorar su aplicación en el trabajo.",
    productHeading: "Productos del estudio",
    founders: "Quiénes somos",
    foundersIntro:
      "Trabajas directamente con los dos ingenieros que fundaron el estudio.",
    kenneth:
      "Lidera equipos y diseña la arquitectura de aplicaciones full-stack. Su experiencia abarca sistemas en la nube, servicios y dispositivos conectados.",
    juan: "Desarrolla APIs en Go e integra sistemas. Combina esa experiencia de backend con sitios web y landing pages orientadas a conversión.",
    portfolio: "Ver portafolio",
    footerTitle: "Cuéntanos tu proyecto.",
    footerBody:
      "¿Qué quieres construir o mejorar? Escríbenos y conversemos sobre el primer paso.",
    projectInquiry: "Quiero conversar sobre un proyecto a medida",
    back: "Volver al estudio",
    top: "Volver arriba",
    example: "Ejemplo de personalización",
    selectBrand: "Cambiar marca de ejemplo",
    points: "puntos",
    loyalty: "Club de clientes",
    homeTitle: "Software a medida y consultoría técnica",
  },
  en: {
    services: "Services",
    products: "Products",
    studio: "Studio",
    contact: "Contact",
    skip: "Skip to content",
    nav: "Main navigation",
    menu: "Menu",
    intro: "Software studio",
    location: "Costa Rica",
    headline: "Custom software",
    emphasis: "technical consulting.",
    conjunction: "and",
    description:
      "We develop custom software, provide technical consulting and train business teams in artificial intelligence.",
    talk: "Tell us about your project",
    secondary: "Explore",
    serviceHeading: "What we do",
    serviceIntro:
      "We build solutions and share knowledge to help your team move forward with technology.",
    build: "Custom development",
    buildText:
      "We build custom web applications and APIs, and connect systems through integrations. We can help move manual processes into an application or make the tools your business already uses work together.",
    advise: "Technical consulting",
    adviseText:
      "We review existing architecture and systems to identify bottlenecks and opportunities for improvement. Together with your team, we set priorities and define a technical next step for the project.",
    training: "Professional AI training",
    trainingText:
      "We provide professional artificial intelligence training for businesses and their teams, focused on understanding the technology and exploring its applications at work.",
    productHeading: "Studio products",
    founders: "Who we are",
    foundersIntro:
      "Work directly with the two engineers who founded the studio.",
    kenneth:
      "Kenneth leads teams and designs full-stack application architecture. His work spans cloud systems, services and connected devices.",
    juan: "Juan Miguel builds Go APIs and connects systems. He brings that backend experience to websites and landing pages designed for conversion.",
    portfolio: "View portfolio",
    footerTitle: "Tell us about your project.",
    footerBody:
      "What would you like to build or improve? Get in touch and we’ll discuss the first step.",
    projectInquiry: "I’d like to discuss a custom software project",
    back: "Back to the studio",
    top: "Back to top",
    example: "Brand customization example",
    selectBrand: "Switch example brand",
    points: "points",
    loyalty: "Customer club",
    homeTitle: "Custom software and technical consulting",
  },
} as const;

export const productSection = { es: "productos", en: "products" } as const;
export const productPath = (lang: Language, slug: string) =>
  `/${lang}/${productSection[lang]}/${slug}`;

export function pageMetadata(
  lang: Language,
  title: string,
  description: string,
  slug?: string,
  localizedPath?: (locale: Language) => string,
): Metadata {
  const path = (locale: Language) =>
    localizedPath
      ? localizedPath(locale)
      : slug
        ? productPath(locale, slug)
        : `/${locale}`;
  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | kjstudio.dev`,
    description,
    openGraph: {
      type: "website",
      siteName: "kjstudio.dev",
      title: `${title} | kjstudio.dev`,
      description,
      url: path(lang),
      locale: lang === "es" ? "es_CR" : "en_US",
      images: [
        {
          url: "/media/architecture.webp",
          width: 1536,
          height: 1024,
          alt: "kjstudio.dev",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | kjstudio.dev`,
      description,
      images: ["/media/architecture.webp"],
    },
    alternates: {
      canonical: path(lang),
      languages: { es: path("es"), en: path("en"), "x-default": path("es") },
    },
  };
}
