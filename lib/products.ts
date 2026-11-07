import type { ComponentType } from "react";
import type { Language } from "./site";
import { ClinicPreview } from "@/components/clinic-preview";
import { LoyaltyPreview } from "@/components/loyalty-preview";

type ProductCopy = {
  title: string;
  seoTitle: string;
  summary: string;
  action: string;
  inquiry: string;
  features: { title: string; body: string }[];
};

export type Product = {
  slug: string;
  name: string;
  website?: string;
  Visual: ComponentType<{ lang: Language; interactive?: boolean }>;
  text: Record<Language, ProductCopy>;
};

export const products: Product[] = [
  {
    slug: "LoyaltyClub",
    name: "LoyaltyClub",
    Visual: LoyaltyPreview,
    text: {
      es: {
        title: "Un programa de puntos con la marca de tu negocio",
        seoTitle: "App de puntos para restaurantes y comercios | LoyaltyClub",
        summary:
          "Una app de puntos para restaurantes y comercios que quieren dar a sus clientes un motivo para volver.",
        action: "Quiero información para mi negocio",
        inquiry: "Me interesa LoyaltyClub para mi negocio",
        features: [
          {
            title: "Puntos para tus clientes",
            body: "LoyaltyClub es una aplicación de puntos para restaurantes y otros comercios. Ofrece a tus clientes un programa de fidelización asociado a tu negocio y una forma de acumular puntos.",
          },
          {
            title: "Una app con tu identidad",
            body: "La aplicación se puede personalizar con el logotipo, los colores y el lenguaje visual de cada negocio. Escríbenos para conversar sobre las necesidades de tu programa y las opciones de personalización.",
          },
        ],
      },
      en: {
        title: "A points program with your business’s own brand",
        seoTitle: "Loyalty points app for restaurants and shops | LoyaltyClub",
        summary:
          "A loyalty points app for restaurants and retailers that want to give customers a reason to come back.",
        action: "Request information for my business",
        inquiry: "I’m interested in LoyaltyClub for my business",
        features: [
          {
            title: "Points for your customers",
            body: "LoyaltyClub is a points app for restaurants and other businesses. It gives your customers a loyalty program associated with your business and a way to collect points.",
          },
          {
            title: "An app with your identity",
            body: "The app can be customized with each business’s logo, colors and visual style. Get in touch to discuss your loyalty program and customization needs.",
          },
        ],
      },
    },
  },
  {
    slug: "web-para-consultorios",
    name: "WebParaConsultorios",
    website: "https://webparaconsultorios.com/",
    Visual: ClinicPreview,
    text: {
      es: {
        title: "Una web para que tus pacientes te encuentren",
        seoTitle: "Páginas web para consultorios médicos | WebParaConsultorios",
        summary:
          "Creamos páginas web para consultorios médicos y profesionales de la salud que quieren mejorar su presencia digital y facilitar el contacto con pacientes.",
        action: "Quiero información para mi consultorio",
        inquiry: "Me interesa WebParaConsultorios para mi consultorio",
        features: [
          {
            title: "Tu consultorio en internet",
            body: "WebParaConsultorios crea páginas para consultorios y profesionales de la salud en Costa Rica. Tu sitio puede presentar tus servicios y la información que tus pacientes necesitan para conocerte.",
          },
          {
            title: "Más fácil de encontrar y contactar",
            body: "La propuesta incluye desarrollo profesional, adaptación a móviles y SEO técnico para facilitar que pacientes encuentren tu consultorio y puedan contactarte. Visita WebParaConsultorios para conocer los detalles del servicio.",
          },
        ],
      },
      en: {
        title: "A website that helps patients find you",
        seoTitle: "Websites for medical practices | WebParaConsultorios",
        summary:
          "We create websites for medical practices and healthcare professionals who want to improve their online presence and make it easier for patients to get in touch.",
        action: "Request information for my practice",
        inquiry: "I’m interested in WebParaConsultorios for my practice",
        features: [
          {
            title: "Your practice online",
            body: "WebParaConsultorios creates websites for medical practices and healthcare professionals in Costa Rica. Your site can introduce your services and share the information patients need to get to know you.",
          },
          {
            title: "Easier to find and contact",
            body: "The service includes professional development, mobile-friendly design and technical SEO to help patients find and contact your practice. Visit WebParaConsultorios for service details.",
          },
        ],
      },
    },
  },
];
