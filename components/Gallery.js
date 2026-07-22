"use client";

import { useLang } from "@/components/LanguageContext";

export default function Galleryy() {
  const { t } = useLang();

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-5 py-20 mt-12"
    >
      <div className="relative h-[400px] overflow-hidden rounded-3xl border border-yellow-500/40">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/uploads/vddd.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <div className="max-w-3xl px-6 text-center">

            <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
              {t("gallery_video_title")}
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/75">
              {t("gallery_video_desc")}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}