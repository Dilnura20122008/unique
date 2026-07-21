"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { t as translate } from "@/lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("uz");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("us_lang") : null;
    if (saved === "uz" || saved === "ru") setLang(saved);
  }, []);

  const changeLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem("us_lang", l);
  };

  const t = (key) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
