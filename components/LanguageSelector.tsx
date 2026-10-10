"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";
import { Language } from "@/lib/translations";

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

interface Props {
  variant?: "header" | "compact" | "banner";
  className?: string;
}

export const LanguageSelector: React.FC<Props> = ({ variant = "header", className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = languageOptions.find((opt) => opt.code === language) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs sm:text-sm font-semibold text-navy shadow-sm transition hover:bg-slate-50 hover:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/40"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe size={15} className="text-gold shrink-0" />
        <span className="font-bold">{currentOption.nativeLabel}</span>
        <ChevronDown size={13} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-52 max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Language / ಭಾಷೆ / भाषा
          </div>
          <div className="space-y-1">
            {languageOptions.map((opt) => {
              const isSelected = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 sm:py-2.5 text-left text-xs sm:text-sm transition ${
                    isSelected
                      ? "bg-[#f5ecd9] font-bold text-navy"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <div>
                    <div className="leading-tight font-bold text-navy">{opt.nativeLabel}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">{opt.label}</div>
                  </div>
                  {isSelected && <Check size={16} className="text-gold stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
