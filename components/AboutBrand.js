"use client";

import { Shield } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function AboutBrand() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-10 py-10">
      <div className="relative overflow-hidden rounded-2xl border border-line">
        
<img
  src="/uploads/d.jpg"
  alt="Unique Service"
  className="absolute inset-0 h-full w-full object-cover"
/>
  
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="relative flex flex-col gap-6 px-6 py-14 sm:px-12 sm:py-20 max-w-xl">
          <div className="flex items-center gap-3">
            <Shield className="text-gold" size={34} strokeWidth={1.5} />
            <div className="leading-tight">
              <div className="font-display text-xl tracking-wide">{t("about_eyebrow")}</div>
              <div className="font-display text-xs tracking-[0.4em] text-gold -mt-1">
                {t("about_eyebrow2")} —
              </div>
            </div>
          </div>
          <p className="text-bone/75 leading-relaxed">{t("about_text")}</p>
          <a
            href="#about"
            className="sweep inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-sm tracking-wide text-ink hover:bg-gold-light transition-colors"
          >
            {t("about_more")}
          </a>
        </div>
      </div>
    </section>
  );
}
