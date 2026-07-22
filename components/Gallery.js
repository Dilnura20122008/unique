"use client";

import { useLang } from "@/components/LanguageContext";

const images = [
  "/uploads/1.png",
  "/uploads/2.png",
  "/uploads/77.png",
  "/uploads/7.png",
  "/uploads/8.png",
  "/uploads/3.png",
  "/uploads/5.png",
  "/uploads/4.png",
];

export default function Galleryy() {
  const { t } = useLang();

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-5 py-20 mt-12"
    >
      <h1 className="text-4xl ml-135">GALEREYA</h1>

      {/* Gallery */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111]"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="h-[280px] w-full object-cover duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 duration-500" />

            <div className="absolute bottom-0 left-0 right-0 translate-y-16 group-hover:translate-y-0 duration-500 p-5">

              <h3 className="font-display text-lg uppercase text-white">
                Unique Service
              </h3>

              <p className="mt-1 text-sm text-yellow-400">
                {t("gallery_work")}
              </p>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}