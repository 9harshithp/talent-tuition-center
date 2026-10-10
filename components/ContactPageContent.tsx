"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building,
} from "lucide-react";

export function ContactPageContent() {
  const { t, language } = useLanguage();

  const [formState, setFormState] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    grade: "Class 10",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800 flex flex-col selection:bg-gold/20 selection:text-navy">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#f8f5ee]/80 to-white py-16 sm:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1 text-xs font-black text-navy">
              <Sparkles size={18} className="text-gold" /> {t("contact.header.tag", "We Are Here To Help")}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-navy tracking-tight">
              {t("contact.header.title", "Contact & Center Location")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("contact.header.desc", "Reach out to our administrative desk for course admissions, fee structures, or campus visits.")}
            </p>
          </div>
        </section>

        {/* Contact Info & Interactive Enquiry Form */}
        <section className="py-16 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Center Details */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gold">
                    {language === "kn" ? "ನೇರ ಸಂಪರ್ಕ" : language === "hi" ? "सीधा संपर्क" : "Direct Contact"}
                  </span>
                  <h2 className="text-2xl font-black text-navy mt-1">
                    {t("contact.info.heading", "Talent Tuition Center Office")}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {t("contact.info.desc", "Our admissions desk is open Monday to Saturday for student counseling and batch registrations.")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy">
                      <MapPin size={18} className="text-gold" /> {t("contact.info.addressTitle", "Physical Address")}
                    </div>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      {t("contact.info.address", "42 Vidya Nagar, Main Road, Bengaluru, Karnataka - 560001")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy">
                      <Phone size={18} className="text-gold" /> {t("contact.info.phoneTitle", "Direct Helpline")}
                    </div>
                    <p className="text-xs text-slate-700 font-bold">
                      {t("contact.info.phone", "+91 98860 12345 / +91 80 2345 6789")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy">
                      <Mail size={18} className="text-gold" /> {t("contact.info.emailTitle", "Email Inquiries")}
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">
                      {t("contact.info.email", "contact@talenttuition.in / admissions@talenttuition.in")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy">
                      <Clock size={18} className="text-gold" /> {t("contact.info.hoursTitle", "Center Working Hours")}
                    </div>
                    <p className="text-xs text-slate-700">
                      {t("contact.info.hours", "Monday – Saturday: 3:30 PM – 8:30 PM (Sunday Closed)")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Admission Enquiry Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-white to-[#f8f5ee]/40 p-8 shadow-lg">
                  <div className="border-b border-slate-200/80 pb-4 mb-6">
                    <h3 className="text-xl font-black text-navy">{t("contact.form.heading", "Send Us a Message")}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {language === "kn" 
                        ? "ಈ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ, ನಮ್ಮ ಸಂಯೋಜಕರು 24 ಗಂಟೆಗಳ ಒಳಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ." 
                        : language === "hi" 
                        ? "यह त्वरित फॉर्म भरें और हमारे परामर्शदाता 24 घंटे के भीतर आपसे संपर्क करेंगे।" 
                        : "Fill out this quick form and our counselor will get back to you within 24 hours."}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-lg font-black text-navy">{t("contact.form.successTitle", "Enquiry Received Successfully!")}</h4>
                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                        {t("contact.form.successDesc", "Thank you! Our academic coordinator will contact you at your mobile number within 24 hours.")}
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormState({ parentName: "", studentName: "", phone: "", grade: "Class 10", message: "" });
                        }}
                        className="btn secondary text-xs font-bold px-4 py-2 mt-2"
                      >
                        {t("contact.form.sendAnother", "Send Another Enquiry")}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700">{t("contact.form.parentLabel", "Parent / Guardian Name *")}</label>
                          <input
                            type="text"
                            required
                            value={formState.parentName}
                            onChange={(e) => setFormState({ ...formState, parentName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none focus:border-navy"
                            placeholder={t("contact.form.parentPh", "e.g. Rajesh Sharma")}
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700">{t("contact.form.studentLabel", "Student Name *")}</label>
                          <input
                            type="text"
                            required
                            value={formState.studentName}
                            onChange={(e) => setFormState({ ...formState, studentName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none focus:border-navy"
                            placeholder={t("contact.form.studentPh", "e.g. Aarav Sharma")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700">{t("contact.form.phoneLabel", "Contact Mobile Number *")}</label>
                          <input
                            type="tel"
                            required
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none focus:border-navy"
                            placeholder={t("contact.form.phonePh", "+91 98765 43210")}
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700">{t("contact.form.gradeLabel", "Target Class / Grade *")}</label>
                          <select
                            value={formState.grade}
                            onChange={(e) => setFormState({ ...formState, grade: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold outline-none focus:border-navy"
                          >
                            <option value="Class 8">{t("classes.filter.c8", "Class 8 Foundation")}</option>
                            <option value="Class 9">{t("classes.filter.c9", "Class 9 Foundation")}</option>
                            <option value="Class 10">{t("classes.filter.c10", "Class 10 Board Preparation")}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700">{t("contact.form.msgLabel", "Message / Specific Requirements")}</label>
                        <textarea
                          rows={3}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none focus:border-navy"
                          placeholder={t("contact.form.msgPh", "Tell us about the subjects you need help with or any specific questions...")}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn primary w-full justify-center py-3.5 text-xs font-bold gap-2 shadow-md shadow-navy/15 mt-2"
                      >
                        <Send size={18} /> {t("contact.form.submitBtn", "Submit Admission Enquiry")}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
