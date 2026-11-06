import type { ComponentType } from "react";
import type { Language } from "./site";
import { ClinicPreview } from "@/components/clinic-preview";
import { LoyaltyPreview } from "@/components/loyalty-preview";

type ProductCopy = {
  title: string;
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
    slug: "mandoclub",
    name: "MandoClub",
    Visual: LoyaltyPreview,
    text: {
      es: {
        title: "Un programa de puntos con la marca de tu negocio",
        summary:
          "Una app de puntos para restaurantes y comercios que quieren dar a sus clientes un motivo para volver.",
        action: "Quiero información para mi negocio",
        inquiry: "Me interesa MandoClub para mi negocio",
        features: [
          {
            title: "Puntos para tus clientes",
            body: "Dale a quien visita tu restaurante o comercio una forma de acumular puntos en tu propio programa.",
          },
          {
            title: "Una app con tu identidad",
            body: "Adaptamos el logotipo, los colores y el estilo visual de la app para que tus clientes reconozcan tu negocio.",
          },
        ],
      },
      en: {
        title: "A points program with your business’s own brand",
        summary:
          "A loyalty points app for restaurants and retailers that want to give customers a reason to come back.",
        action: "Request information for my business",
        inquiry: "I’m interested in MandoClub for my business",
        features: [
          {
            title: "Points for your customers",
            body: "Give visitors to your restaurant or store a way to collect points through your own loyalty program.",
          },
          {
            title: "An app with your identity",
            body: "We adapt the logo, colors and visual style so your customers recognize your business when they open the app.",
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
        summary:
          "Creamos páginas web para consultorios médicos y profesionales de la salud que quieren mejorar su presencia digital y facilitar el contacto con pacientes.",
        action: "Quiero información para mi consultorio",
        inquiry: "Me interesa WebParaConsultorios para mi consultorio",
        features: [
          {
            title: "Tu consultorio en internet",
            body: "Presenta tu consultorio, tus servicios y la información que tus pacientes necesitan para conocerte.",
          },
          {
            title: "Más fácil de encontrar y contactar",
            body: "Una presencia digital profesional para ayudar a nuevos pacientes a encontrarte y ponerse en contacto contigo.",
          },
        ],
      },
      en: {
        title: "A website that helps patients find you",
        summary:
          "We create websites for medical practices and healthcare professionals who want to improve their online presence and make it easier for patients to get in touch.",
        action: "Request information for my practice",
        inquiry: "I’m interested in WebParaConsultorios for my practice",
        features: [
          {
            title: "Your practice online",
            body: "Introduce your practice and services, and share the information patients need to get to know you.",
          },
          {
            title: "Easier to find and contact",
            body: "A professional online presence that helps new patients find you and get in touch.",
          },
        ],
      },
    },
  },
];
