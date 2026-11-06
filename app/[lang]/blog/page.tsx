import { ArrowUpRight } from "lucide-react";
import { Header, Contact } from "@/components/site-chrome";
import { articles, articlePath } from "@/lib/articles";
import { language, pageMetadata } from "@/lib/site";

type Props = PageProps<"/[lang]/blog">;
export async function generateMetadata({ params }: Props) {
  const lang = language((await params).lang);
  return pageMetadata(
    lang,
    lang === "es"
      ? "Blog de desarrollo de software y negocios"
      : "Software development and business blog",
    lang === "es"
      ? "Guías prácticas sobre software a medida, tecnología y fidelización para negocios."
      : "Practical guides to custom software, technology and customer loyalty for businesses.",
    undefined,
    (locale) => `/${locale}/blog`,
  );
}
export default async function Blog({ params }: Props) {
  const lang = language((await params).lang);
  const es = lang === "es";
  return (
    <>
      <Header lang={lang} languagePaths={{ es: "/es/blog", en: "/en/blog" }} />
      <main id="main" className="blog-index">
        <div className="wrap blog-intro">
          <p className="kicker">Blog · KJ Studio</p>
          <h1>
            {es ? "Ideas para construir mejor." : "Ideas for building better."}
          </h1>
          <p>
            {es
              ? "Guías prácticas sobre software, tecnología y las decisiones que ayudan a tu negocio a avanzar."
              : "Practical guides to software, technology and decisions that help your business move forward."}
          </p>
        </div>
        <section
          className="wrap blog-list"
          aria-label={es ? "Artículos" : "Articles"}
        >
          {articles.map((article) => {
            const text = article.text[lang];
            return (
              <article className="blog-entry" key={article.id}>
                <p className="blog-category">{text.category}</p>
                <div>
                  <h2>
                    <a href={articlePath(lang, article)}>{text.title}</a>
                  </h2>
                  <p>{text.description}</p>
                  <a className="inline-link" href={articlePath(lang, article)}>
                    {es ? "Leer artículo" : "Read article"}{" "}
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Contact lang={lang} />
    </>
  );
}
