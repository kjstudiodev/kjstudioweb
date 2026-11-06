import { ArrowUpRight } from "lucide-react";
import type { Language } from "@/lib/site";

export function ClinicPreview({ lang }: { lang: Language }) {
  const es = lang === "es";
  return (
    <figure
      className="clinic-brand-preview"
      aria-label={
        es
          ? "Vista ilustrativa de WebParaConsultorios"
          : "Illustrative view of WebParaConsultorios"
      }
    >
      <div className="clinic-brand-header">
        <img
          src="/media/webparaconsultorios-logo.webp"
          alt=""
          width="38"
          height="38"
        />
        <span>
          WebPara
          <br />
          Consultorios
        </span>
      </div>
      <div className="clinic-brand-body">
        <p>
          {es
            ? "DESARROLLO WEB PARA CONSULTORIOS"
            : "WEBSITES FOR HEALTHCARE PRACTICES"}
        </p>
        <strong>
          {es
            ? "Tu consultorio merece una web profesional."
            : "A professional website for your practice."}
        </strong>
        <span>
          {es
            ? "Tu presencia digital, más cerca de tus pacientes."
            : "A digital presence that brings you closer to patients."}
        </span>
        <span className="clinic-brand-cta">
          {es ? "Conoce más" : "Learn more"} <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="clinic-brand-shape" aria-hidden="true" />
    </figure>
  );
}
