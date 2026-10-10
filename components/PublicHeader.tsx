"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, GraduationCap, Phone, Sparkles, LogIn } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ttc_session");
      if (stored) setHasSession(true);
    } catch {}
  }, []);

  const navLinks = [
    { href: "/", label: t("pub.nav.home", "Home") },
    { href: "/about", label: t("pub.nav.about", "About Us") },
    { href: "/classes", label: t("pub.nav.classes", "Classes & Programs") },
    { href: "/faq", label: t("pub.nav.faq", "FAQ") },
    { href: "/contact", label: t("pub.nav.contact", "Contact & Location") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top micro bar for phone & announcement */}
      <div className="bg-navy px-3 py-1.5 sm:py-2 text-center text-[11px] sm:text-xs md:text-sm text-slate-300 sm:flex sm:justify-between sm:px-8 border-b border-navy/40">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-semibold truncate">
          <Sparkles size={18} className="text-gold shrink-0" />
          <span className="truncate">{t("pub.header.announcement", "Admissions open for Class 8, 9 & 10 CBSE / State Board")}</span>
        </div>
        <div className="hidden items-center gap-4 sm:flex text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-gold font-bold">
            <Phone size={18} /> {t("pub.header.helpline", "Helpline: +91 98860 12345")}
          </span>
          <span className="text-slate-500">|</span>
          <span>{t("pub.header.hours", "Mon – Sat: 3:30 PM – 8:30 PM")}</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Name - High Visibility */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
          <div className="relative shrink-0">
            <Image
              src="/logo.png"
              alt="Talent Tuition Center logo"
              width={56}
              height={56}
              priority
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-md object-contain border-2 border-gold p-0.5 bg-white ring-2 sm:ring-4 ring-gold/25 group-hover:scale-105 group-hover:ring-gold/40 transition duration-200"
            />
          </div>
          <div className="min-w-0">
            <div className="font-black text-navy text-sm sm:text-lg md:text-xl leading-tight tracking-tight group-hover:text-gold-dark transition truncate">
              {t("brand.name", "Talent Tuition Center")}
            </div>
            <div className="text-[9px] sm:text-xs font-extrabold text-gold uppercase tracking-wider sm:tracking-widest mt-0.5">
              {t("brand.tagline", "Learn • Grow • Excel")}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm sm:text-[15px] font-extrabold transition duration-150 ${
                  isActive
                    ? "text-navy border-b-2 border-gold pb-1 text-gold-dark"
                    : "text-slate-600 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions: Multi-language Selector & Login */}
        <div className="hidden md:flex items-center gap-3 sm:gap-3.5">
          <LanguageSelector />
          {hasSession ? (
            <Link
              href="/portal"
              className="btn primary text-xs sm:text-sm font-bold gap-2 px-4 sm:px-5 py-2 sm:py-2.5 shadow-md"
            >
              <GraduationCap size={18} className="text-gold" />
              <span>{t("pub.header.goToPortal", "Go to Portal")}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn primary text-xs sm:text-sm font-bold gap-2 px-4 sm:px-5 py-2 sm:py-2.5 shadow-md"
            >
              <LogIn size={18} />
              <span>{t("nav.portalLogin", "Portal Sign In")}</span>
            </Link>
          )}
        </div>

        {/* Mobile Actions: Language Selector & Menu Toggle */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 border border-slate-200 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-slate-200 bg-white px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                  pathname === link.href ? "bg-navy text-white" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-slate-100 pt-3">
            {hasSession ? (
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="btn primary w-full justify-center text-xs sm:text-sm font-bold py-3"
              >
                <GraduationCap size={18} className="text-gold" /> {t("pub.header.goToDashboard", "Go to Dashboard Portal")}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn primary w-full justify-center text-xs sm:text-sm font-bold py-3"
              >
                <LogIn size={18} /> {t("pub.header.mobileLogin", "Student & Teacher Portal Login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
