"use client";

import { useState } from "react";
import { Phone, Menu, X, Shield } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function Header({ contact, onBook, onCall }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t("nav_home") },
    { href: "#services", label: t("nav_services") },
    { href: "#gallery", label: t("nav_gallery") },
    { href: "#about", label: t("nav_about") },
    { href: "#contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
        <img className="w-10" src="/uploads/srr.png"/>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide">UNIQUE</div>
            <div className="font-display text-[11px] tracking-[0.35em] text-gold -mt-1">
              SERVICE
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-bone/80 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="flex items-center rounded-full border border-line overflow-hidden text-xs font-display tracking-wide">
            <button
              onClick={() => setLang("uz")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "uz" ? "bg-gold text-ink" : "text-bone/70 hover:text-gold"
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "ru" ? "bg-gold text-ink" : "text-bone/70 hover:text-gold"
              }`}
            >
              RU
            </button>
          </div>

          <a
            href={`tel:${(contact?.phones?.[0] || "").replace(/\s/g, "")}`}
            className="sweep flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-ink font-display text-xs tracking-wide hover:bg-gold-light transition-colors"
          >
            <Phone size={15} />
            <span className="hidden xl:inline">{contact?.phones?.[0]}</span>
            <span className="xl:hidden">{t("call_btn")}</span>
          </a>
        </div>

        <button
          className="lg:hidden text-bone"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink px-5 py-4 space-y-4 animate-fade-up">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium tracking-wide text-bone/80 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line overflow-hidden text-xs font-display tracking-wide">
              <button
                onClick={() => setLang("uz")}
                className={`px-3 py-1.5 ${lang === "uz" ? "bg-gold text-ink" : "text-bone/70"}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`px-3 py-1.5 ${lang === "ru" ? "bg-gold text-ink" : "text-bone/70"}`}
              >
                RU
              </button>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="flex-1 rounded-full bg-gold px-4 py-2 text-ink font-display text-xs tracking-wide"
            >
              {t("nav_book")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
