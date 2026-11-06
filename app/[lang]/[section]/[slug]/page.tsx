import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Contact, Header } from "@/components/site-chrome";
import { products } from "@/lib/products";
import { copy, language, pageMetadata, productSection } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return products.map(({ slug }) => ({
    section: productSection[language(params.lang)],
    slug,
  }));
}

type Props = PageProps<"/[lang]/[section]/[slug]">;
async function productPage(params: Props["params"]) {
  const { lang: value, section, slug } = await params;
  const lang = language(value);
  const product = products.find((entry) => entry.slug === slug);
  if (!product || section !== productSection[lang]) notFound();
  return { lang, product, details: product.text[lang] };
}

export async function generateMetadata({ params }: Props) {
  const { lang, product, details } = await productPage(params);
  return pageMetadata(
    lang,
    `${product.name} — ${details.title}`,
    details.summary,
    product.slug,
  );
}

export default async function ProductPage({ params }: Props) {
  const { lang, product, details } = await productPage(params);
  return (
    <>
      <Header lang={lang} product={product} />
      <main
        id="main"
        className={
          product.slug === "web-para-consultorios"
            ? "clinic-product"
            : undefined
        }
      >
        <section className="product-hero">
          <div className="wrap product-layout">
            <div>
              <a className="back" href={`/${lang}#products`}>
                <ArrowLeft size={16} />
                {copy[lang].back}
              </a>
              <p className="hero-label">
                <span className="blue-square" />
                {product.name}
              </p>
              <h1>
                {details.title}
                <i>.</i>
              </h1>
              <p className="hero-description">{details.summary}</p>
              <a className="button" href="#contact">
                {details.action}
                <ArrowUpRight size={17} />
              </a>
              {product.website && (
                <a className="product-website" href={product.website}>
                  {lang === "es"
                    ? "Visitar WebParaConsultorios"
                    : "Visit WebParaConsultorios"}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
            <product.Visual lang={lang} interactive />
          </div>
        </section>
        <section
          className="wrap section product-details"
          aria-label={product.name}
        >
          {details.features.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Contact lang={lang} product={product} />
    </>
  );
}
