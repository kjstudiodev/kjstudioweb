import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  CodeXml,
  Workflow,
  GraduationCap,
} from "lucide-react";
import { copy, language, pageMetadata, productPath, siteUrl } from "@/lib/site";
import { products } from "@/lib/products";
import { Contact, Header } from "@/components/site-chrome";
import { SoftwareDiagram } from "@/components/software-diagram";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = language((await params).lang);
  return pageMetadata(lang, copy[lang].homeTitle, copy[lang].description);
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = language((await params).lang);
  const t = copy[lang];
  const first = products[0];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "kjstudio.dev",
            url: siteUrl,
            email: "kjstudiodev@gmail.com",
            telephone: "+50684590688",
            founder: [
              {
                "@type": "Person",
                name: "Kenneth Sanabria Vargas",
                url: "https://dev.kenfoxfire.com/",
              },
              {
                "@type": "Person",
                name: "Juan Miguel Arias Mejias",
                url: "https://juanmiguel.dev/",
              },
            ],
          }).replace(/</g, "\u003c"),
        }}
      />
      <Header lang={lang} />
      <main id="main">
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="hero-label">
                <span className="blue-square" />
                {t.intro}
                <span className="label-slash">/</span>
                {t.location}
              </p>
              <h1>
                {t.headline}
                <br />
                {t.conjunction} <em>{t.emphasis}</em>
              </h1>
              <p className="hero-description">{t.description}</p>
              <div className="hero-actions">
                <a className="button" href="#contact">
                  {t.talk}
                  <ArrowUpRight size={18} />
                </a>
                {first && (
                  <a className="text-action" href={productPath(lang, first.slug)}>
                    {t.secondary} {first.name}
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
            <SoftwareDiagram lang={lang} />
          </div>
          <a className="scroll-cue" href="#services" aria-label={t.services}>
            <ArrowDown size={17} />
          </a>
        </section>
        <section id="services" className="wrap section services">
          <div className="section-intro">
            <p className="kicker">{t.services}</p>
            <h2>
              {t.serviceHeading}
              <i>.</i>
            </h2>
            <p>{t.serviceIntro}</p>
          </div>
          <div className="service-list">
            {[
              { Icon: CodeXml, title: t.build, body: t.buildText },
              { Icon: Workflow, title: t.advise, body: t.adviseText },
              { Icon: GraduationCap, title: t.training, body: t.trainingText },
            ].map(({ Icon, title, body }) => (
              <article className="service" key={title}>
                <Icon className="service-icon" size={24} strokeWidth={1.55} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="products" className="products">
          <div className="wrap section">
            <h2>
              {t.productHeading}
              <i>.</i>
            </h2>
            {products.map((product) => (
              <article className="product-feature" key={product.slug}>
                <product.Visual lang={lang} />
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p>{product.text[lang].title}.</p>
                  <a
                    className="inline-link"
                    href={productPath(lang, product.slug)}
                  >
                    {t.secondary} {product.name}
                    <ArrowRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap section founders" id="studio">
          <div className="section-intro">
            <p className="kicker">{t.studio}</p>
            <h2>
              {t.founders}
              <i>.</i>
            </h2>
            <p>{t.foundersIntro}</p>
          </div>
          <div className="founder-list">
            {[
              {
                name: "Kenneth Sanabria Vargas",
                bio: t.kenneth,
                url: "https://dev.kenfoxfire.com/",
              },
              {
                name: "Juan Miguel Arias Mejias",
                bio: t.juan,
                url: "https://juanmiguel.dev/",
              },
            ].map((person) => (
              <article key={person.url}>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
                <a className="inline-link" href={person.url}>
                  {t.portfolio}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Contact lang={lang} />
    </>
  );
}
