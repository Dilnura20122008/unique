"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutBrand from "@/components/AboutBrand";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import AboutStats from "@/components/AboutStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contact, setContact] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    fetch("/api/services").then((r) => r.json()).then(setServices);
    fetch("/api/gallery").then((r) => r.json()).then(setGallery);
    fetch("/api/contact").then((r) => r.json()).then(setContact);
  }, []);

  return (
    <>
      <Header contact={contact} onBook={() => setBookingOpen(true)} />
      <main className="flex-1">
        <Hero contact={contact} onBook={() => setBookingOpen(true)} />
        <AboutBrand />
        <Gallery items={gallery} />
        <Services services={services} onBook={() => setBookingOpen(true)} />
        <AboutStats contact={contact} />
        <Contact contact={contact} />
      </main>
      <Footer contact={contact} services={services} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={services}
      />
    </>
  );
}
