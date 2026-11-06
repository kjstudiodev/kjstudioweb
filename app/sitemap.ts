import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { languages, productPath, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((lang) => [
    { url: `${siteUrl}/${lang}` },
    ...products.map((product) => ({
      url: `${siteUrl}${productPath(lang, product.slug)}`,
    })),
  ]);
}
