"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("ttc_selected_language") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "kn" || savedLang === "hi")) {
        setLanguageState(savedLang);
        if (typeof document !== "undefined") {
          document.documentElement.lang = savedLang;
          document.documentElement.setAttribute("data-lang", savedLang);
        }
      }
    } catch {
      // fallback
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
    }
    try {
      localStorage.setItem("ttc_selected_language", lang);
    } catch {
      // fallback
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = translations.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
