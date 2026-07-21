"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { iconMap, ServiceIcon } from "@/lib/icons";

const emptyForm = {
  icon: "Car",
  title_uz: "",
  title_ru: "",
  desc_uz: "",
  desc_ru: "",
  image: "",
};

export default function ServicesAdmin({ services, refresh }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const startEdit = (s) => {
    setForm(s);
    setEditingId(s.id);
    setShowForm(true);
  };

  const startNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
    });
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    refresh();
  };

  const remove = async (id) => {
    if (!confirm("O'chirishni tasdiqlaysizmi? / Подтвердите удаление")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl tracking-wide">Xizmatlar / Услуги</h2>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-light transition-colors"
        >
          <Plus size={16} /> Qo'shish
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={save}
          className="mb-6 grid gap-3 rounded-xl border border-line bg-ink-2 p-5 sm:grid-cols-2"
        >
          <div className="sm:col-span-2 flex items-center justify-between">
            <h3 className="font-display text-sm tracking-wide text-gold">
              {editingId ? "Tahrirlash" : "Yangi xizmat"}
            </h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-bone">
              <X size={18} />
            </button>
          </div>

          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          >
            {Object.keys(iconMap).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <input
            required
            placeholder="Rasm URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Nomi (UZ)"
            value={form.title_uz}
            onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Название (RU)"
            value={form.title_ru}
            onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
          <textarea
            required
            placeholder="Tavsif (UZ)"
            value={form.desc_uz}
            onChange={(e) => setForm({ ...form, desc_uz: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm sm:col-span-1"
            rows={2}
          />
          <textarea
            required
            placeholder="Описание (RU)"
            value={form.desc_ru}
            onChange={(e) => setForm({ ...form, desc_ru: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm sm:col-span-1"
            rows={2}
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-lg bg-gold py-2.5 font-display text-sm tracking-wide text-ink hover:bg-gold-light transition-colors"
          >
            Saqlash / Сохранить
          </button>
        </form>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="rounded-xl border border-line bg-ink-2 p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => startEdit(s)} className="text-muted hover:text-gold">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(s.id)} className="text-muted hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h4 className="mt-2 font-display text-sm uppercase">{s.title_uz}</h4>
            <p className="text-xs text-muted mt-1 line-clamp-2">{s.desc_uz}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
