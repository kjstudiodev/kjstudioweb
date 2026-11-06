import type { MetadataRoute } from "next";
import { articles, articlePath } from "@/lib/articles";
import { products } from "@/lib/products";
import { languages, productPath, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((lang) => [
    { url: `${siteUrl}/${lang}` },
    { url: `${siteUrl}/${lang}/blog` },
    ...articles.map((article) => ({
      url: `${siteUrl}${articlePath(lang, article)}`,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}${productPath(lang, product.slug)}`,
    })),
  ]);
}
