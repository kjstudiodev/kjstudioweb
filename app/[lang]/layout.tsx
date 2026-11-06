import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/dm-sans/wght.css";
import "../globals.css";
import { language, languages } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  return (
    <html lang={language((await params).lang)}>
      <body>{children}</body>
    </html>
  );
}
