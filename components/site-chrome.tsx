import { ArrowUpRight, ArrowUp, Mail, MessageCircle } from "lucide-react";
import { copy, productPath, type Language } from "@/lib/site";
import type { Product } from "@/lib/products";
import { MobileMenu } from "./mobile-menu";

export function Brand({ lang }: { lang: Language }) {
  return (
    <a className="brand" aria-label="kjstudio.dev" href={`/${lang}`}>
      <svg aria-hidden="true" viewBox="0 0 64 60">
        <use href="/media/brand.svg#kj" />
      </svg>
      <span>
        kjstudio<span className="brand-dev">.dev</span>
      </span>
    </a>
  );
}

export function Header({
  lang,
  product,
}: {
  lang: Language;
  product?: Product;
}) {
  const t = copy[lang];
  const links = [
    { label: t.services, href: `/${lang}#services` },
    { label: t.products, href: `/${lang}#products` },
    { label: t.studio, href: `/${lang}#studio` },
  ];
  return (
    <header className="header" id="top">
      <div className="wrap header-inner">
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Brand lang={lang} />
        <nav className="desktop-nav" aria-label={t.nav}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div className="languages">
            {(["es", "en"] as const).map((locale) => (
              <a
                hrefLang={locale}
                lang={locale}
                key={locale}
                aria-label={locale === "es" ? "Español" : "English"}
                aria-current={lang === locale ? "page" : undefined}
                href={
                  product ? productPath(locale, product.slug) : `/${locale}`
                }
              >
                {locale.toUpperCase()}
              </a>
            ))}
          </div>
          <a className="nav-contact" href="#contact">
            {t.contact}
            <ArrowUpRight size={16} />
          </a>
          <MobileMenu
            label={t.menu}
            links={[...links, { label: t.contact, href: "#contact" }]}
          />
        </div>
      </div>
    </header>
  );
}

export function Contact({
  lang,
  product,
}: {
  lang: Language;
  product?: Product;
}) {
  const t = copy[lang];
  const message = encodeURIComponent(
    product?.text[lang].inquiry ?? t.projectInquiry,
  );
  return (
    <footer id="contact">
      <div className="wrap contact-inner">
        <div>
          <p className="kicker">{t.contact}</p>
          <h2>{product?.text[lang].action ?? t.footerTitle}</h2>
          {!product && <p>{t.footerBody}</p>}
        </div>
        <div className="channels">
          <a href={`mailto:kjstudiodev@gmail.com?subject=${message}`}>
            <Mail />
            <span>kjstudiodev@gmail.com</span>
            <ArrowUpRight />
          </a>
          <a
            aria-label="WhatsApp +506 8459 0688"
            href={`https://wa.me/50684590688?text=${message}`}
          >
            <MessageCircle />
            <span>
              +506 8459 0688 <small>WhatsApp</small>
            </span>
            <ArrowUpRight />
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <Brand lang={lang} />
        <a href="#top">
          {t.top}
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
