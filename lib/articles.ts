import type { Language } from "./site";

type ArticleText = {
  slug: string;
  title: string;
  description: string;
  category: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedLabel: string;
};
type Article = {
  id: string;
  relatedProduct: string;
  text: Record<Language, ArticleText>;
};

export const articles: Article[] = [
  {
    id: "custom-software",
    relatedProduct: "",
    text: {
      es: {
        slug: "cuando-necesita-tu-empresa-software-a-medida",
        title: "¿Cuándo necesita tu empresa software a medida?",
        description:
          "Identifica procesos repetitivos, sistemas desconectados y otras señales para evaluar si tu empresa necesita software a medida.",
        category: "Desarrollo de software",
        introduction:
          "El software a medida puede ayudar cuando los procesos de una empresa dejan de encajar en las herramientas que utiliza. Antes de invertir, conviene entender qué problema debe resolver y cómo se medirá el resultado.",
        sections: [
          {
            heading: "Empieza por el proceso, no por la tecnología",
            paragraphs: [
              "Anota qué tarea se realiza, quién participa y dónde se producen las demoras. Por ejemplo, si un equipo copia pedidos entre hojas de cálculo y un sistema de facturación, registra cuántas veces ocurre y qué errores requieren corrección.",
              "El objetivo inicial puede ser reducir la doble digitación, consultar información en un solo lugar o dar seguimiento a solicitudes. Un problema concreto permite evaluar una solución sin depender de una lista extensa de funcionalidades.",
            ],
          },
          {
            heading: "Señales de que conviene evaluar una solución propia",
            paragraphs: [
              "La información se encuentra repartida entre herramientas que no se comunican, las tareas manuales consumen tiempo de forma recurrente o el equipo necesita controles que sus aplicaciones actuales no ofrecen. Estas señales justifican una revisión del proceso y sus costos.",
              "También conviene revisar si una integración o una herramienta existente puede resolver el problema. Considera licencias, mantenimiento, acceso a datos y facilidad de uso junto al costo de construcción.",
            ],
          },
          {
            heading: "Define una primera versión manejable",
            paragraphs: [
              "Selecciona un proceso y sus usuarios principales. Describe qué información entra, quién la consulta y cuál debe ser el resultado. Acordar estos puntos ayuda a delimitar una primera entrega que se pueda probar con el equipo.",
              "Incluye desde el inicio la migración de información, los permisos de acceso, el soporte y las responsabilidades de mantenimiento. La inversión depende del alcance, las integraciones y el estado de los sistemas existentes.",
            ],
          },
          {
            heading: "¿Cómo saber si funcionó?",
            paragraphs: [
              "Compara el proceso antes y después con una medida que el equipo ya pueda observar, como el tiempo dedicado a una tarea o la cantidad de correcciones. Complementa esa medida con comentarios de quienes usan el sistema.",
              "Una conversación técnica inicial puede ayudarte a decidir qué construir, qué integrar y qué dejar para una etapa posterior.",
            ],
          },
        ],
        relatedLabel: "Conoce nuestros servicios de desarrollo",
      },
      en: {
        slug: "when-does-your-business-need-custom-software",
        title: "When does your business need custom software?",
        description:
          "Identify repetitive processes, disconnected systems and other signals that can help you evaluate custom software.",
        category: "Software development",
        introduction:
          "Custom software can help when a company's processes no longer fit its existing tools. Before investing, define the problem to solve and how you will measure the result.",
        sections: [
          {
            heading: "Start with the process",
            paragraphs: [
              "Write down the task, the people involved and where delays occur. For example, if a team copies orders between spreadsheets and a billing system, track how often it happens and which errors need correction.",
              "The initial objective might be to reduce duplicate entry, find information in one place or track requests. A specific problem makes it easier to evaluate a solution.",
            ],
          },
          {
            heading: "Signals worth investigating",
            paragraphs: [
              "Information may be spread across disconnected tools, recurring manual work may consume time, or your team may need controls its current applications cannot provide. These signals call for a review of the process and its costs.",
              "Check whether an integration or existing product can solve the problem. Consider licensing, maintenance, data access and usability alongside the cost of building.",
            ],
          },
          {
            heading: "Define a manageable first version",
            paragraphs: [
              "Choose one process and its primary users. Describe the information that goes in, who needs access and the intended result. Agreeing on these points helps define a first release your team can try.",
              "Consider data migration, access permissions, support and maintenance responsibilities from the outset. Investment depends on scope, integrations and the state of existing systems.",
            ],
          },
          {
            heading: "How will you know it worked?",
            paragraphs: [
              "Compare the process before and after using a measure your team can observe, such as time spent on a task or the number of corrections. Combine that measure with feedback from people using the system.",
              "An initial technical conversation can help you decide what to build, what to integrate and what to leave for a later stage.",
            ],
          },
        ],
        relatedLabel: "Explore our development services",
      },
    },
  },
  {
    id: "loyalty-points",
    relatedProduct: "LoyaltyClub",
    text: {
      es: {
        slug: "como-crear-programa-puntos-restaurante",
        title: "Cómo diseñar un programa de puntos para tu restaurante",
        description:
          "Define cómo se acumulan y canjean puntos, comunica las reglas y evalúa un programa de fidelización para tu restaurante.",
        category: "Fidelización de clientes",
        introduction:
          "Un programa de puntos da a los clientes una forma de acumular beneficios al volver a un restaurante. Su diseño comienza con reglas que el equipo pueda explicar y aplicar de forma consistente.",
        sections: [
          {
            heading: "Decide qué comportamiento quieres reconocer",
            paragraphs: [
              "Empieza por un objetivo concreto, como reconocer las visitas de clientes habituales. Piensa en la experiencia de una persona que participa por primera vez y en cómo sabrá que recibió sus puntos.",
              "Una regla sencilla es más fácil de comunicar. Antes de lanzarla, calcula el costo de los beneficios y comprueba que el personal pueda gestionarla durante la operación habitual.",
            ],
          },
          {
            heading: "Establece reglas claras para acumular y canjear",
            paragraphs: [
              "Documenta cómo se obtienen los puntos, qué recompensas están disponibles y cómo se solicitan. Define si existen restricciones o vencimientos y comunica cualquier condición antes de que alguien participe.",
              "Explica cómo se corrigen errores y a quién puede acudir una persona con preguntas. Revisa las condiciones aplicables a tu negocio y ubicación antes de publicar las reglas.",
            ],
          },
          {
            heading: "Haz que la experiencia refleje tu marca",
            paragraphs: [
              "El programa debe ser reconocible para tus clientes y fácil de utilizar desde un teléfono. Usa el nombre, logotipo y colores del negocio de forma coherente con tus otros canales.",
              "LoyaltyClub es una app de puntos que puede personalizarse con la identidad visual de cada negocio. Una conversación con el equipo permite revisar las necesidades de tu programa y las opciones disponibles.",
            ],
          },
          {
            heading: "Revisa el programa con tu equipo",
            paragraphs: [
              "Observa si los clientes entienden las reglas, si el personal puede aplicarlas y si los beneficios mantienen sentido para el negocio. Escuchar las preguntas frecuentes ayuda a detectar instrucciones confusas.",
              "Si cambias las condiciones, comunica el cambio con claridad y revisa su impacto en los puntos ya acumulados.",
            ],
          },
        ],
        relatedLabel: "Conoce LoyaltyClub",
      },
      en: {
        slug: "how-to-design-restaurant-loyalty-points-program",
        title: "How to design a loyalty points program for your restaurant",
        description:
          "Plan how customers earn and redeem points, communicate the rules and evaluate a restaurant loyalty program.",
        category: "Customer loyalty",
        introduction:
          "A points program gives customers a way to earn benefits when they return to a restaurant. Start with rules your team can explain and apply consistently.",
        sections: [
          {
            heading: "Choose the behavior you want to recognize",
            paragraphs: [
              "Begin with a specific goal, such as recognizing visits from regular customers. Consider the experience of a first-time participant and how they will know they have received their points.",
              "A simple rule is easier to explain. Before launch, calculate the cost of benefits and check that staff can manage the program during normal operations.",
            ],
          },
          {
            heading: "Make earning and redemption clear",
            paragraphs: [
              "Document how points are earned, what rewards are available and how customers request them. Decide whether restrictions or expiration apply and communicate any conditions before someone joins.",
              "Explain how errors are corrected and where people can ask questions. Review the conditions applicable to your business and location before publishing the rules.",
            ],
          },
          {
            heading: "Make the experience reflect your brand",
            paragraphs: [
              "The program should be recognizable to customers and easy to use on a phone. Use your business name, logo and colors consistently with your other channels.",
              "LoyaltyClub is a points app that can be customized with each business’s visual identity. A conversation with the team can help clarify your program needs and available options.",
            ],
          },
          {
            heading: "Review the program with your team",
            paragraphs: [
              "Observe whether customers understand the rules, whether staff can apply them and whether rewards still make sense for the business. Listening to recurring questions can reveal unclear instructions.",
              "If conditions change, communicate the change clearly and consider its impact on points already earned.",
            ],
          },
        ],
        relatedLabel: "Explore LoyaltyClub",
      },
    },
  },
];

export function articlePath(lang: Language, article: Article) {
  return `/${lang}/blog/${article.text[lang].slug}`;
}
