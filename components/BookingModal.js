"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function BookingModal({ open, onClose, services = [] }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", comment: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setForm({ name: "", phone: "", service: "", date: "", comment: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-line bg-card p-6 sm:p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("modal_close")}
          className="absolute right-4 top-4 text-muted hover:text-gold transition-colors"
        >
          <X size={22} />
        </button>

        <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide">
          {t("nav_book")}
        </h3>
        <div className="mt-1 h-[2px] w-14 bg-gradient-to-r from-gold to-transparent" />

        {status === "done" ? (
          <p className="mt-6 text-bone/90 leading-relaxed">{t("form_success")}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("form_name")}
                className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("form_phone")}
                className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-gold transition-colors text-bone/80"
              >
                <option value="">{t("form_choose")}</option>
                {services.map((s) => (
                  <option key={s.id} value={lang === "ru" ? s.title_ru : s.title_uz}>
                    {lang === "ru" ? s.title_ru : s.title_uz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-gold transition-colors text-bone/80"
              />
            </div>
            <div>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder={t("form_comment")}
                rows={3}
                className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-400">
                {lang === "ru" ? "Ошибка. Попробуйте снова." : "Xatolik. Qayta urinib ko'ring."}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="sweep w-full rounded-lg bg-gold py-3 font-display uppercase tracking-wide text-ink font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "..." : t("form_submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
