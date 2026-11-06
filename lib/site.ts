import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
      "Creamos aplicaciones, conectamos sistemas y te ayudamos a decidir el siguiente paso técnico de tu negocio.",
    talk: "Hablemos de tu proyecto",
    secondary: "Conoce",
    serviceHeading: "Qué hacemos",
    serviceIntro:
      "Te acompañamos desde la primera decisión técnica hasta el software en producción.",
    build: "Desarrollo a medida",
    buildText:
      "Aplicaciones web, APIs e integraciones para conectar las herramientas que ya usas y simplificar el trabajo diario.",
    advise: "Consultoría técnica",
    adviseText:
      "Revisamos tu arquitectura, identificamos cuellos de botella y trazamos contigo un plan de mejoras por prioridad.",
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
      "We build applications, connect systems and help you choose the next technical step for your business.",
    talk: "Tell us about your project",
    secondary: "Explore",
    serviceHeading: "What we do",
    serviceIntro:
      "We work with you from the first technical decision through to running your software in production.",
    build: "Custom development",
    buildText:
      "Web applications, APIs and integrations that connect the tools you already use and simplify everyday work.",
    advise: "Technical consulting",
    adviseText:
      "We review your architecture, identify bottlenecks and work with you to prioritize improvements.",
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
): Metadata {
  const path = (locale: Language) =>
    slug ? productPath(locale, slug) : `/${locale}`;
  return {
    metadataBase: new URL("https://kjstudio.dev"),
    title: `${title} | kjstudio.dev`,
    description,
    alternates: {
      canonical: path(lang),
      languages: { es: path("es"), en: path("en"), "x-default": path("es") },
    },
  };
}
