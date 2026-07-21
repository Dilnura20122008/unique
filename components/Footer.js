"use client";

import { Shield } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function Footer({ contact, services = [] }) {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="bg-gold/10 border-b border-line py-2.5 text-center">
        <p className="font-display text-xs sm:text-sm tracking-widest text-gold">
          {t("footer_slogan_top")}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2.5">
 <img className="w-10" src="/uploads/srr.png"/>            <div className="leading-tight">
              <div className="font-display text-base tracking-wide">UNIQUE</div>
              <div className="font-display text-[10px] tracking-[0.35em] text-gold -mt-1">
                SERVICE
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">{t("footer_about")}</p>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest text-gold mb-4">
            {t("footer_links")}
          </h4>
          <ul className="space-y-2 text-sm text-bone/75">
            <li><a href="#home" className="hover:text-gold transition-colors">{t("nav_home")}</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors">{t("nav_services")}</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">{t("nav_about")}</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">{t("nav_contact")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest text-gold mb-4">
            {t("footer_services")}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-bone/75">
            {services.slice(0, 8).map((s) => (
              <li key={s.id}>{lang === "ru" ? s.title_ru : s.title_uz}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {year} Unique Service — {t("footer_rights")}
      </div>
    </footer>
  );
}
