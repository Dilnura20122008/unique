"use client";

import { BadgeCheck } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function AboutStats({ contact }) {
  const { t } = useLang();
  const stats = contact?.stats || { years: "10+", clients: "6000+", services: "20+", guarantee: "100%" };

  const list = [t("about2_list1"), t("about2_list2"), t("about2_list3"), t("about2_list4")];

  const statItems = [
    { value: stats.years, label: t("stat_years") },
    { value: stats.clients, label: t("stat_clients") },
    { value: stats.services, label: t("stat_services") },
    { value: stats.guarantee, label: t("stat_guarantee") },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/50" />
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-bone">
              {t("about2_title")}
            </h2>
          </div>
          <p className="text-bone/75 leading-relaxed max-w-lg">{t("about2_text")}</p>
          <ul className="mt-6 space-y-3">
            {list.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-bone/85">
                <BadgeCheck className="shrink-0 text-gold" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line">
          <img
            src="https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=1200&auto=format&fit=crop"
            alt="Unique Service"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-card p-6 sm:grid-cols-4 sm:p-8">
        {statItems.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-3xl sm:text-4xl gold-gradient-text">{s.value}</div>
            <div className="mt-1 text-[11px] sm:text-xs tracking-wide text-muted uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
