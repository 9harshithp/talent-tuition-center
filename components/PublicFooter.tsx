"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t-2 border-slate-200 bg-white text-slate-700">
      {/* Upper CTA strip */}
      <div className="bg-[#f8f5ee] border-b-2 border-gold/40 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black text-gold uppercase tracking-widest">
              <Sparkles size={18} /> {t("pub.footer.ctaTag", "Empowering Academic Excellence")}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-navy mt-1.5">
              {t("pub.footer.ctaHeading", "Ready to boost your academic grades?")}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-1 max-w-xl">
              {t("pub.footer.ctaDesc", "Join Talent Tuition Center for focused batch coaching, continuous test assessments, and dedicated doubt-clearing sessions.")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <Link href="/contact" className="btn primary w-full sm:w-auto text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 sm:py-3.5 shadow-md">
              {t("pub.footer.ctaBtn", "Enquire For Admission")} <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn secondary w-full sm:w-auto text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 sm:py-3.5">
              {t("nav.portalLogin", "Portal Sign In")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Talent Tuition Center logo"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-md object-contain border-2 border-gold p-0.5 bg-white ring-2 sm:ring-4 ring-gold/25 shrink-0"
            />
            <div>
              <div className="font-black text-navy text-base sm:text-lg leading-tight">{t("brand.name", "Talent Tuition Center")}</div>
              <div className="text-xs sm:text-sm font-bold text-gold uppercase tracking-widest">
                {t("brand.tagline", "Learn • Grow • Excel")}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t("pub.footer.brandDesc", "Talent Tuition Center provides structured coaching and conceptual clarity for Class 8, Class 9 and Class 10 students in Mathematics, Science & Physics, English, and Social Studies.")}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" /> {t("pub.footer.verified", "Verified Coaching Institution")}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy">{t("pub.footer.quickNav", "Quick Navigation")}</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-navy hover:underline transition">
                {t("pub.nav.home", "Home")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 hover:text-navy hover:underline transition">
                {t("pub.footer.aboutLink", "About Our Center")}
              </Link>
            </li>
            <li>
              <Link href="/classes" className="text-slate-600 hover:text-navy hover:underline transition">
                {t("pub.nav.classes", "Classes & Subject Programs")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-slate-600 hover:text-navy hover:underline transition">
                {t("pub.nav.faq", "Frequently Asked Questions")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-navy hover:underline transition">
                {t("pub.nav.contact", "Contact & Location")}
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-navy hover:underline font-bold transition">
                {t("pub.header.mobileLogin", "Student & Teacher Portal Login")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Academic Programs */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy">{t("pub.footer.subjectsTitle", "Subjects & Batches")}</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li>• {t("pub.footer.batch10", "Class 10 Board Exam Preparation")}</li>
            <li>• {t("pub.footer.batch9", "Class 9 Foundation Program")}</li>
            <li>• {t("pub.footer.batch8", "Class 8 Foundation Program")}</li>
            <li>• {t("pub.footer.subjectMaths", "Mathematics (Algebra & Geometry)")}</li>
            <li>• {t("pub.footer.subjectScience", "Science (Physics & Chemistry)")}</li>
            <li>• {t("pub.footer.subjectEnglish", "English Grammar & Literature")}</li>
            <li>• {t("pub.footer.subjectSocial", "Social Studies & Map Work")}</li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy">{t("pub.footer.contactTitle", "Center Contact")}</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>42 Vidya Nagar, Main Road, Bengaluru, Karnataka - 560001</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="text-gold shrink-0" />
              <a href="tel:+919886012345" className="font-bold text-navy hover:text-gold transition">
                +91 98860 12345 / +91 98450 11001
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={18} className="text-gold shrink-0" />
              <a href="mailto:contact@talenttuition.in" className="hover:text-gold transition">
                contact@talenttuition.in
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={18} className="text-gold shrink-0 mt-0.5" />
              <span>{t("pub.footer.hours", "Mon – Sat: 3:30 PM – 8:30 PM (Sunday Closed)")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="border-t-2 border-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {t("footer.rights", "Talent Tuition Center. All rights reserved. Registered Educational Coaching Institution.")}</p>
        <p className="mt-1 text-xs text-slate-400">
          {t("pub.footer.disclaimer", "Dedicated to academic excellence, student mentorship, and holistic learning.")}
        </p>
      </div>
    </footer>
  );
}
