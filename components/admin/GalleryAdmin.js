"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const emptyForm = { category: "boshqa", image: "", title_uz: "", title_ru: "" };
const categories = ["salon", "yuvish", "polirovka", "tonirovka", "boshqa"];

export default function GalleryAdmin({ gallery, refresh }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const startEdit = (g) => {
    setForm(g);
    setEditingId(g.id);
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
    await fetch("/api/gallery", {
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
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl tracking-wide">Galereya / Галерея</h2>
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
              {editingId ? "Tahrirlash" : "Yangi rasm"}
            </h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-bone">
              <X size={18} />
            </button>
          </div>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
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
            placeholder="Nomi (UZ)"
            value={form.title_uz}
            onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
          <input
            placeholder="Название (RU)"
            value={form.title_ru}
            onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-lg bg-gold py-2.5 font-display text-sm tracking-wide text-ink hover:bg-gold-light transition-colors"
          >
            Saqlash / Сохранить
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-xl border border-line">
            <img src={g.image} alt={g.title_uz} className="aspect-square w-full object-cover" />
            <div className="absolute inset-0 flex items-start justify-end gap-1.5 bg-black/0 p-2 opacity-0 transition-opacity group-hover:bg-black/50 group-hover:opacity-100">
              <button
                onClick={() => startEdit(g)}
                className="rounded-md bg-ink/80 p-1.5 text-bone hover:text-gold"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => remove(g.id)}
                className="rounded-md bg-ink/80 p-1.5 text-bone hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <span className="absolute bottom-1.5 left-1.5 rounded bg-ink/80 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gold">
              {g.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
