"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function ContactAdmin({ contact, refresh }) {
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (contact) {
      setForm({
        phone1: contact.phones?.[0] || "",
        phone2: contact.phones?.[1] || "",
        telegram: contact.telegram || "",
        instagram: contact.instagram || "",
        address_uz: contact.address_uz || "",
        address_ru: contact.address_ru || "",
        map_lat: contact.map_lat || 41.2995,
        map_lng: contact.map_lng || 69.2401,
        years: contact.stats?.years || "",
        clients: contact.stats?.clients || "",
        services: contact.stats?.services || "",
        guarantee: contact.stats?.guarantee || "",
      });
    }
  }, [contact]);

  if (!form) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      phones: [form.phone1, form.phone2].filter(Boolean),
      telegram: form.telegram,
      instagram: form.instagram,
      address_uz: form.address_uz,
      address_ru: form.address_ru,
      map_lat: parseFloat(form.map_lat),
      map_lng: parseFloat(form.map_lng),
      stats: {
        years: form.years,
        clients: form.clients,
        services: form.services,
        guarantee: form.guarantee,
      },
    };
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaved(true);
    refresh();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-xl tracking-wide">Sozlamalar / Настройки</h2>
      <form onSubmit={save} className="grid gap-4 rounded-xl border border-line bg-ink-2 p-5 sm:grid-cols-2">
        <Field label="Telefon 1" value={form.phone1} onChange={set("phone1")} />
        <Field label="Telefon 2" value={form.phone2} onChange={set("phone2")} />
        <Field label="Telegram (@username)" value={form.telegram} onChange={set("telegram")} />
        <Field label="Instagram (username)" value={form.instagram} onChange={set("instagram")} />
        <Field label="Manzil (UZ)" value={form.address_uz} onChange={set("address_uz")} />
        <Field label="Адрес (RU)" value={form.address_ru} onChange={set("address_ru")} />
        <Field label="Xarita Lat" value={form.map_lat} onChange={set("map_lat")} />
        <Field label="Xarita Lng" value={form.map_lng} onChange={set("map_lng")} />

        <div className="sm:col-span-2 mt-2 border-t border-line pt-4">
          <h3 className="mb-3 font-display text-sm tracking-wide text-gold">Statistika</h3>
          <div className="grid gap-4 sm:grid-cols-4">
            <Field label="Yillik tajriba" value={form.years} onChange={set("years")} />
            <Field label="Mamnun mijoz" value={form.clients} onChange={set("clients")} />
            <Field label="Xizmat turlari" value={form.services} onChange={set("services")} />
            <Field label="Sifat kafolati" value={form.guarantee} onChange={set("guarantee")} />
          </div>
        </div>

        <button
          type="submit"
          className="sweep sm:col-span-2 flex items-center justify-center gap-2 rounded-lg bg-gold py-2.5 font-display text-sm tracking-wide text-ink hover:bg-gold-light transition-colors"
        >
          <Save size={16} /> {saved ? "Saqlandi!" : "Saqlash / Сохранить"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted">{label}</span>
      <input
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
