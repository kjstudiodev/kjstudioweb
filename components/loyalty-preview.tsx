"use client";
import { useState } from "react";
import { Sprout, Utensils, Sparkle } from "lucide-react";
import { copy, type Language } from "@/lib/site";

export function LoyaltyPreview({
  lang,
  interactive = false,
}: {
  lang: Language;
  interactive?: boolean;
}) {
  const [second, setSecond] = useState(false);
  const t = copy[lang];
  const brand = second ? "Mesa" : "Oliva";
  const Mark = second ? Utensils : Sprout;
  return (
    <figure className={`loyalty-art ${second ? "mesa" : ""}`}>
      <div className="card-stack">
        <div className="card-back" aria-hidden="true" />
        <div className="loyalty-card">
          <span className="card-brand">
            <Mark />
            {brand}
          </span>
          <span className="card-caption">{t.loyalty}</span>
          <span className="point-value">
            240 <small>{t.points}</small>
          </span>
          <div className="card-lines" aria-hidden="true" />
        </div>
      </div>
      <figcaption>
        {interactive ? (
          <fieldset>
            <legend>{t.selectBrand}</legend>
            {["Oliva", "Mesa"].map((name, index) => (
              <button
                key={name}
                type="button"
                aria-pressed={second === Boolean(index)}
                onClick={() => setSecond(Boolean(index))}
              >
                {name}
              </button>
            ))}
          </fieldset>
        ) : (
          <>
            <Sparkle size={14} />
            {t.example}
          </>
        )}
      </figcaption>
    </figure>
  );
}
