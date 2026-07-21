"use client";

import { Trash2, Phone } from "lucide-react";

const statusColors = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-500/20 text-blue-300",
  done: "bg-green-500/20 text-green-300",
};

const statusLabel = { new: "Yangi", contacted: "Bog'lanildi", done: "Bajarildi" };

export default function BookingsAdmin({ bookings, refresh }) {
  const setStatus = async (id, status) => {
    await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refresh();
  };

  const remove = async (id) => {
    if (!confirm("O'chirishni tasdiqlaysizmi? / Подтвердите удаление")) return;
    await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-xl tracking-wide">
        Buyurtmalar / Заявки{" "}
        <span className="text-sm text-muted font-body">({bookings.length})</span>
      </h2>

      {bookings.length === 0 ? (
        <p className="text-muted text-sm">Hozircha buyurtmalar yo'q / Пока нет заявок</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-ink-2 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Ism</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">Xizmat</th>
                <th className="px-4 py-3">Sana</th>
                <th className="px-4 py-3">Izoh</th>
                <th className="px-4 py-3">Holat</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-line/50 last:border-0">
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-gold hover:underline">
                      <Phone size={13} /> {b.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-bone/80">{b.service || "—"}</td>
                  <td className="px-4 py-3 text-bone/80">{b.date || "—"}</td>
                  <td className="px-4 py-3 max-w-[180px] truncate text-bone/70" title={b.comment}>
                    {b.comment || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => setStatus(b.id, e.target.value)}
                      className={`rounded-md border-0 px-2 py-1 text-xs font-medium outline-none ${statusColors[b.status] || statusColors.new}`}
                    >
                      <option value="new">{statusLabel.new}</option>
                      <option value="contacted">{statusLabel.contacted}</option>
                      <option value="done">{statusLabel.done}</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(b.id)} className="text-muted hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
