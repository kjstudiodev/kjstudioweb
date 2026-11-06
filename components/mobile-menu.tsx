"use client";
import { useRef } from "react";
import { Menu } from "lucide-react";

export function MobileMenu({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <details
      className="mobile-menu"
      ref={menu}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          menu.current.open = false;
          menu.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label={label}>
        <Menu size={23} />
      </summary>
      <div>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </details>
  );
}
