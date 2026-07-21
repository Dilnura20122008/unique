"use client";

import { useLang } from "@/components/LanguageContext";
import { ServiceIcon } from "@/lib/icons";

export default function Services({ services = [], onBook }) {
  const { t, lang } = useLang();

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20">
      <div className="text-center mb-12">
        <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/50" />
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-bone">
            {t("services_title")}
          </h2>
          <span className="h-px w-10 bg-gold/50" />
        </div>
        <p className="text-muted">{t("services_sub")}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={onBook}
            className="sweep group text-left rounded-2xl border border-line bg-card p-6 transition-colors hover:border-gold/60"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
              <ServiceIcon name={s.icon} className="h-6 w-6" />
            </div>
            <h3 className="font-display text-base uppercase tracking-wide text-bone">
              {lang === "ru" ? s.title_ru : s.title_uz}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {lang === "ru" ? s.desc_ru : s.desc_uz}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
