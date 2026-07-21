"use client";

import { Phone, MapPin } from "lucide-react";
import { TelegramIcon, InstagramIcon } from "@/lib/brand-icons";
import { useLang } from "@/components/LanguageContext";

export default function Contact({ contact }) {
  const { t, lang } = useLang();
  if (!contact) return null;

  const lat = contact.map_lat || 41.2995;
  const lng = contact.map_lng || 69.2401;
  const mapSrc = `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=14&pt=${lng},${lat},pm2rdm`;

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/50" />
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-bone">
            {t("contact_title")}
          </h2>
          <span className="h-px w-10 bg-gold/50" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <InfoCard
            icon={<Phone size={20} />}
            label={t("contact_phone")}
            lines={contact.phones}
            hrefPrefix="tel:"
          />
          <InfoCard
            icon={<TelegramIcon className="h-5 w-5" />}
            label={t("contact_telegram")}
            lines={[contact.telegram]}
            hrefPrefix="https://t.me/"
            stripAt
          />
          <InfoCard
            icon={<InstagramIcon className="h-5 w-5" />}
            label={t("contact_instagram")}
            lines={[contact.instagram]}
            hrefPrefix="https://instagram.com/"
          />
          <InfoCard
            icon={<MapPin size={20} />}
            label={t("contact_address")}
            lines={[lang === "ru" ? contact.address_ru : contact.address_uz]}
          />
        </div>

        <div className="min-h-[320px] overflow-hidden rounded-2xl border border-line">
          <iframe
            title="map"
            src={mapSrc}
            className="h-full w-full min-h-[320px]"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, lines = [], hrefPrefix, stripAt }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="mb-2 flex items-center gap-2 text-gold">
        {icon}
        <span className="font-display text-xs tracking-widest">{label}</span>
      </div>
      <div className="space-y-1">
        {lines.filter(Boolean).map((line, i) =>
          hrefPrefix ? (
            <a
              key={i}
              href={`${hrefPrefix}${stripAt ? line.replace("@", "") : line.replace(/\s/g, "")}`}
              className="block text-sm text-bone/85 hover:text-gold transition-colors"
            >
              {line}
            </a>
          ) : (
            <p key={i} className="text-sm text-bone/85">
              {line}
            </p>
          )
        )}
      </div>
    </div>
  );
}
