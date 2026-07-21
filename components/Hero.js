"use client";

import { Phone, ChevronRight } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function Hero({ contact, onBook }) {
  const { t } = useLang();

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/uploads/vdd.mp4" type="video/mp4" />
  </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="section-label text-xs font-display text-gold mb-4">
            UNIQUE SERVICE — TOSHKENT
          </p>
          <h1 className="font-display uppercase leading-[0.95] text-5xl sm:text-6xl md:text-7xl">
            <span className="block text-bone">{t("hero_title1")}</span>
            <span className="block gold-gradient-text">{t("hero_title2")}</span>
            <span className="block text-bone">{t("hero_title3")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-bone/70 leading-relaxed">{t("hero_desc")}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              className="sweep rounded-full bg-gold px-7 py-3.5 font-display text-sm tracking-wide text-ink hover:bg-gold-light transition-colors"
            >
              {t("hero_cta1")}
            </button>
            <a
              href={`tel:${(contact?.phones?.[0] || "").replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-display text-sm tracking-wide text-bone hover:border-gold hover:text-gold transition-colors"
            >
              {t("hero_cta2")}
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>

      <FeatureStrip />
    </section>
  );
}

function FeatureStrip() {
  const { t } = useLang();
  const items = [
    { title: t("feat_1_title"), desc: t("feat_1_desc") },
    { title: t("feat_2_title"), desc: t("feat_2_desc") },
    { title: t("feat_3_title"), desc: t("feat_3_desc") },
    { title: t("feat_4_title"), desc: t("feat_4_desc") },
  ];

  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-4">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-card/70 p-5 backdrop-blur sm:grid-cols-4 sm:gap-6 sm:p-7">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <ChevronRight className="mt-1 shrink-0 text-gold" size={18} />
            <div>
              <div className="font-display text-sm uppercase tracking-wide text-bone">
                {it.title}
              </div>
              <div className="text-xs text-muted mt-0.5">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
