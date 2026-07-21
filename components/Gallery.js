"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageContext";

export default function Gallery({ items = [] }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: t("filter_all") },
    { key: "salon", label: t("filter_salon") },
    { key: "yuvish", label: t("filter_yuvish") },
    { key: "polirovka", label: t("filter_polirovka") },
    { key: "tonirovka", label: t("filter_tonirovka") },
    { key: "boshqa", label: t("filter_boshqa") },
  ];

  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-20">
      <div className="text-center mb-10">
        <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/50" />
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-bone">
            {t("gallery_title")}
          </h2>
          <span className="h-px w-10 bg-gold/50" />
        </div>
        <p className="text-muted">{t("gallery_sub")}</p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 font-display text-xs tracking-wide transition-colors ${
              filter === f.key
                ? "bg-gold text-ink"
                : "border border-line text-bone/70 hover:border-gold hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
        {shown.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-line"
          >
            <img
              src={item.image}
              alt={lang === "ru" ? item.title_ru : item.title_uz}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-xs uppercase tracking-wide text-gold-light">
                {lang === "ru" ? item.title_ru : item.title_uz}
              </p>
            </div>
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="text-center text-muted py-10">—</p>
      )}
    </section>
  );
}
