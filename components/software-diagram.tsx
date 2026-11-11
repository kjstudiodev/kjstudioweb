import type { Language } from "@/lib/site";
import { SoftwareCanvas } from "./software-canvas";

const labels = {
  es: { title: "De la interfaz a los datos", interface: "Interfaz", services: "Servicios", data: "Datos" },
  en: { title: "From interface to data", interface: "Interface", services: "Services", data: "Data" },
};

export function SoftwareDiagram({ lang }: { lang: Language }) {
  const t = labels[lang];
  return (
    <div className="software-visual" aria-hidden="true">
      <link rel="preload" as="image" href="/media/software-architecture-small.webp" media="(max-width: 680px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/media/software-architecture.webp" media="(min-width: 681px)" fetchPriority="high" />
      <SoftwareCanvas>
        <picture>
          <source media="(max-width: 680px)" srcSet="/media/software-architecture-small.webp" />
          <img
            className="architecture-fallback"
            src="/media/software-architecture.webp"
            alt=""
            width="1000"
            height="700"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </SoftwareCanvas>
      <div className="architecture-caption">
        <p>{t.title}</p>
        <div className="architecture-legend">
          <span>{t.interface}</span>
          <span className="architecture-service-label">{t.services}</span>
          <span>{t.data}</span>
        </div>
      </div>
    </div>
  );
}
