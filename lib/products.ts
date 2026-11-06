import type { ComponentType } from "react";
import type { Language } from "./site";
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
];
