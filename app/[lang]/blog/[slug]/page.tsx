import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header, Contact } from "@/components/site-chrome";
import { articles, articlePath } from "@/lib/articles";
import { language, pageMetadata, productPath, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = language(params.lang);
  return articles.map((article) => ({ slug: article.text[lang].slug }));
}
type Props = PageProps<"/[lang]/blog/[slug]">;
async function getArticle(params: Props["params"]) {
  const values = await params;
  const lang = language(values.lang);
  const article = articles.find((item) => item.text[lang].slug === values.slug);
  if (!article) notFound();
  return { lang, article, text: article.text[lang] };
}
export async function generateMetadata({ params }: Props) {
  const { lang, article, text } = await getArticle(params);
  return pageMetadata(lang, text.title, text.description, undefined, (locale) =>
    articlePath(locale, article),
  );
}
export default async function ArticlePage({ params }: Props) {
  const { lang, article, text } = await getArticle(params);
  const es = lang === "es";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: text.title,
    description: text.description,
    inLanguage: lang,
    mainEntityOfPage: `${siteUrl}${articlePath(lang, article)}`,
    author: { "@type": "Organization", name: "kjstudio.dev", url: siteUrl },
    publisher: { "@type": "Organization", name: "kjstudio.dev", url: siteUrl },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Header
        lang={lang}
        languagePaths={{
          es: articlePath("es", article),
          en: articlePath("en", article),
        }}
      />
      <main id="main" className="article-page">
        <article className="wrap article-wrap">
          <a href={`/${lang}/blog`} className="article-back">
            <ArrowLeft size={16} />
            {es ? "Todos los artículos" : "All articles"}
          </a>
          <p className="kicker">{text.category}</p>
          <h1>{text.title}</h1>
          <p className="article-lede">{text.introduction}</p>
          <p className="article-author">
            {es ? "Por" : "By"} <a href={`/${lang}#studio`}>KJ Studio</a>
          </p>
          <div className="article-body">
            {text.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <div className="article-next">
            <p>{es ? "Da el siguiente paso" : "Take the next step"}</p>
            <a
              className="inline-link"
              href={
                article.relatedProduct
                  ? productPath(lang, article.relatedProduct)
                  : `/${lang}#services`
              }
            >
              {text.relatedLabel}
              <ArrowRight size={18} />
            </a>
          </div>
        </article>
      </main>
      <Contact lang={lang} />
    </>
  );
}
