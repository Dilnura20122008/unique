"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageContext";

export default function Gallery({ items = [] }) {
  const { t, lang } = useLang();

 


  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 mt-12">
      

 <div className="relative w-[900px] ml-42 h-[400px] border border-yellow-500/40 overflow-hidden rounded-3xl">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/uploads/vddd.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
    <div className="max-w-3xl text-center text-white/25 px-6">
      <h2 className="text-5xl font-bold">
        Bizning Ish Jarayonimiz
      </h2>

      <p className="mt-6  text-lg leading-8 text-white/25">
        Har bir avtomobilga professional yondashamiz. Zamonaviy uskunalar,
        sifatli materiallar va tajribali mutaxassislar yordamida
        avtomobilingizni mukammal holatga keltiramiz.
      </p>
    </div>
  </div>
</div>
     
    </section>
  );
}
