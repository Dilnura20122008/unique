"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("Login yoki parol noto'g'ri / Неверный логин или пароль");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Xatolik yuz berdi");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-card p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <Shield className="text-gold mb-3" size={40} strokeWidth={1.5} />
          <h1 className="font-display text-2xl tracking-wide">UNIQUE SERVICE</h1>
          <p className="text-xs text-muted mt-1 tracking-widest">ADMIN PANEL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Login"
              className="w-full rounded-lg border border-line bg-ink-2 pl-10 pr-4 py-3 text-sm outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Parol"
              className="w-full rounded-lg border border-line bg-ink-2 pl-10 pr-4 py-3 text-sm outline-none focus:border-gold transition-colors"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="sweep w-full rounded-lg bg-gold py-3 font-display uppercase tracking-wide text-ink font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {loading ? "..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}
