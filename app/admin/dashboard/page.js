"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogOut, Wrench, Image as ImageIcon, ClipboardList, Settings, Loader2 } from "lucide-react";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import BookingsAdmin from "@/components/admin/BookingsAdmin";
import ContactAdmin from "@/components/admin/ContactAdmin";

const tabs = [
  { key: "services", label: "Xizmatlar", icon: Wrench },
  { key: "gallery", label: "Galereya", icon: ImageIcon },
  { key: "bookings", label: "Buyurtmalar", icon: ClipboardList },
  { key: "settings", label: "Sozlamalar", icon: Settings },
];

export default function Dashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState("services");
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contact, setContact] = useState(null);

  const loadAll = useCallback(async () => {
    const [s, g, b, c] = await Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/bookings").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/contact").then((r) => r.json()),
    ]);
    setServices(s);
    setGallery(g);
    setBookings(b);
    setContact(c);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => {
      if (!r.ok) {
        router.replace("/admin");
        return;
      }
      setAuthChecked(true);
      loadAll();
    });
  }, [router, loadAll]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
  };

  const newCount = bookings.filter((b) => b.status === "new").length;

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-muted">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Shield className="text-gold" size={26} strokeWidth={1.5} />
            <span className="font-display tracking-wide">UNIQUE SERVICE — ADMIN</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-gold transition-colors"
          >
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tItem) => {
            const Icon = tItem.icon;
            return (
              <button
                key={tItem.key}
                onClick={() => setTab(tItem.key)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tab === tItem.key
                    ? "bg-gold text-ink"
                    : "border border-line text-bone/70 hover:border-gold hover:text-gold"
                }`}
              >
                <Icon size={15} />
                {tItem.label}
                {tItem.key === "bookings" && newCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {newCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {tab === "services" && <ServicesAdmin services={services} refresh={loadAll} />}
        {tab === "gallery" && <GalleryAdmin gallery={gallery} refresh={loadAll} />}
        {tab === "bookings" && <BookingsAdmin bookings={bookings} refresh={loadAll} />}
        {tab === "settings" && <ContactAdmin contact={contact} refresh={loadAll} />}
      </div>
    </div>
  );
}
