"use client";

import React, { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { NotificationCategory, NotificationTarget } from "@/lib/notifications";
import { translateNotificationPayload } from "@/lib/translator";
import {
  Send,
  Sparkles,
  Users,
  GraduationCap,
  Shield,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  Info,
  Pin,
  X,
  Eye,
  Languages,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const AdminNotificationComposer: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { sendNotification } = useNotifications();
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<NotificationCategory>("general");
  const [target, setTarget] = useState<NotificationTarget>("all");
  const [pinned, setPinned] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  // Multilingual state
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<"en" | "kn" | "hi">("en");
  const [knTitle, setKnTitle] = useState("");
  const [knMessage, setKnMessage] = useState("");
  const [hiTitle, setHiTitle] = useState("");
  const [hiMessage, setHiMessage] = useState("");
  const [translationsReady, setTranslationsReady] = useState(false);

  if (!isOpen) return null;

  const handleAutoTranslate = async () => {
    if (!title.trim() && !message.trim()) {
      setError("Please enter a title and message first to translate.");
      return;
    }
    setError("");
    setIsTranslating(true);
    try {
      const translated = await translateNotificationPayload(title, message);
      if (translated.kn) {
        setKnTitle(translated.kn.title);
        setKnMessage(translated.kn.message);
      }
      if (translated.hi) {
        setHiTitle(translated.hi.title);
        setHiMessage(translated.hi.message);
      }
      setTranslationsReady(true);
      setActiveLangTab("kn");
    } catch {
      setError("Auto-translation encountered an error. Please enter manual text or try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a notification title.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter the announcement message.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let finalKnTitle = knTitle;
      let finalKnMessage = knMessage;
      let finalHiTitle = hiTitle;
      let finalHiMessage = hiMessage;

      // If translations weren't generated manually, auto-translate on the fly
      if (!finalKnTitle || !finalHiTitle) {
        const auto = await translateNotificationPayload(title, message);
        if (auto.kn) {
          finalKnTitle = finalKnTitle || auto.kn.title;
          finalKnMessage = finalKnMessage || auto.kn.message;
        }
        if (auto.hi) {
          finalHiTitle = finalHiTitle || auto.hi.title;
          finalHiMessage = finalHiMessage || auto.hi.message;
        }
      }

      sendNotification({
        title,
        message,
        category,
        target,
        pinned,
        translations: {
          kn: {
            title: finalKnTitle || title,
            message: finalKnMessage || message,
          },
          hi: {
            title: finalHiTitle || title,
            message: finalHiMessage || message,
          },
        },
      });

      if (onSuccess) {
        onSuccess(t("notif.sentSuccess", "Notification broadcasted successfully in English, Kannada & Hindi!"));
      }

      // Reset & close
      setTitle("");
      setMessage("");
      setKnTitle("");
      setKnMessage("");
      setHiTitle("");
      setHiMessage("");
      setTranslationsReady(false);
      setCategory("general");
      setTarget("all");
      setPinned(false);
      setError("");
      onClose();
    } catch {
      setError("Failed to broadcast notification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: { id: NotificationCategory; label: string; icon: any; color: string }[] = [
    { id: "general", label: "General", icon: Info, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { id: "urgent", label: "Urgent Alert", icon: AlertCircle, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { id: "exam", label: "Exam / Test", icon: FileText, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "schedule", label: "Timetable / Class", icon: Calendar, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "fees", label: "Fee Reminder", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  ];

  const targets: { id: NotificationTarget; label: string; icon: any; desc: string }[] = [
    { id: "all", label: "Everyone", icon: Users, desc: "Students & Teachers" },
    { id: "students", label: "Students Only", icon: GraduationCap, desc: "Enrolled Learners" },
    { id: "teachers", label: "Teachers Only", icon: Shield, desc: "Teaching Faculty" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f0e4] px-3 py-1 text-xs font-bold text-gold">
              <Sparkles size={13} /> {t("notif.adminOnlySend", "Admin Authority: Broadcast Notification")}
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl font-black text-navy">
              {t("notif.sendModal.title", "Broadcast New Center Notification")}
            </h2>
            <p className="text-xs text-slate-500">
              {t("notif.sendModal.desc", "As Admin, your notification will be instantly sent and automatically converted to Kannada & Hindi for recipients.")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("notif.sendModal.inputTarget", "Target Audience")}
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {targets.map((tgt) => {
                const Icon = tgt.icon;
                const isSelected = target === tgt.id;
                return (
                  <button
                    key={tgt.id}
                    type="button"
                    onClick={() => setTarget(tgt.id)}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-navy bg-navy text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Icon size={16} className={isSelected ? "text-gold" : "text-slate-500"} />
                      <span>{tgt.label}</span>
                    </div>
                    <span className={`mt-1 text-[11px] ${isSelected ? "text-slate-200" : "text-slate-400"}`}>
                      {tgt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("notif.sendModal.inputCategory", "Category / Tag")}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                      isSelected
                        ? "border-gold bg-[#f5ecd9] text-[#785317] ring-1 ring-gold"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Tabs & Auto-translate Bar */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#faf8f5] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveLangTab("en")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeLangTab === "en"
                      ? "bg-navy text-white shadow-xs"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  English (Original)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab("kn")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeLangTab === "kn"
                      ? "bg-[#8a5d12] text-white shadow-xs"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  ಕನ್ನಡ (Kannada)
                  {knTitle && <CheckCircle2 size={12} className="text-emerald-300" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab("hi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeLangTab === "hi"
                      ? "bg-[#8a5d12] text-white shadow-xs"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  हिन्दी (Hindi)
                  {hiTitle && <CheckCircle2 size={12} className="text-emerald-300" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleAutoTranslate}
                disabled={isTranslating || !title.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gold/40 bg-white px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold/10 transition disabled:opacity-50"
              >
                {isTranslating ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-gold" />
                    <span>Translating via LibreTranslate...</span>
                  </>
                ) : (
                  <>
                    <Languages size={13} className="text-gold" />
                    <span>✨ Auto-Translate to Kannada & Hindi</span>
                  </>
                )}
              </button>
            </div>

            {/* Tab 1: English Content */}
            {activeLangTab === "en" && (
              <div className="space-y-4 pt-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("notif.sendModal.inputTitle", "Notification Title (English)")} *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={t("notif.sendModal.inputTitlePh", "e.g. Special Science Revision Class This Sunday")}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-navy outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("notif.sendModal.inputMessage", "Message Content (English)")} *
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={t("notif.sendModal.inputMessagePh", "Type the full announcement message in English here...")}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Kannada Content */}
            {activeLangTab === "kn" && (
              <div className="space-y-4 pt-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#785317]">
                      ಕನ್ನಡ ಶೀರ್ಷಿಕೆ (Kannada Title)
                    </label>
                    <span className="text-[11px] text-slate-400">Auto-generated / Editable</span>
                  </div>
                  <input
                    type="text"
                    value={knTitle}
                    onChange={(e) => setKnTitle(e.target.value)}
                    placeholder="ಉದಾ: ಈ ಭಾನುವಾರ ವಿಶೇಷ ವಿಜ್ಞಾನ ಪುನರಾವರ್ತನೆ ತರಗತಿ"
                    className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white p-3 text-sm font-semibold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#785317]">
                    ಕನ್ನಡ ಸಂದೇಶ ವಿವರ (Kannada Message)
                  </label>
                  <textarea
                    rows={3}
                    value={knMessage}
                    onChange={(e) => setKnMessage(e.target.value)}
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ಸಂದೇಶದ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ..."
                    className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Hindi Content */}
            {activeLangTab === "hi" && (
              <div className="space-y-4 pt-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#785317]">
                      हिन्दी शीर्षक (Hindi Title)
                    </label>
                    <span className="text-[11px] text-slate-400">Auto-generated / Editable</span>
                  </div>
                  <input
                    type="text"
                    value={hiTitle}
                    onChange={(e) => setHiTitle(e.target.value)}
                    placeholder="उदा: इस रविवार विशेष विज्ञान पुनरीक्षण कक्षा"
                    className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white p-3 text-sm font-semibold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#785317]">
                    हिन्दी संदेश विवरण (Hindi Message)
                  </label>
                  <textarea
                    rows={3}
                    value={hiMessage}
                    onChange={(e) => setHiMessage(e.target.value)}
                    placeholder="हिन्दी में संदेश का पूरा विवरण यहाँ लिखें..."
                    className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Options: Pinned & Preview */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-gold focus:ring-gold"
              />
              <Pin size={14} className="text-gold" />
              <span>{t("notif.sendModal.pinNotice", "Pin to top of notifications")}</span>
            </label>

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-navy"
            >
              <Eye size={14} />
              <span>{showPreview ? "Hide Preview" : "Live Preview"}</span>
            </button>
          </div>

          {/* Live Preview Card */}
          {showPreview && (
            <div className="rounded-2xl border border-gold/40 bg-[#fffdf8] p-4 shadow-sm animate-in fade-in duration-150 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Sparkles size={12} /> Live Preview (Target: {target})
                </span>
                <span className="text-[10px] text-slate-400">All 3 Languages Broadcast Ready</span>
              </div>
              
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {pinned && <Pin size={14} className="text-gold fill-gold" />}
                    <h4 className="font-bold text-navy text-sm">{title || "Notification Title Preview"}</h4>
                  </div>
                  <span className="rounded-md border bg-indigo-50 border-indigo-200 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-700">
                    {category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {message || "The announcement text will appear here cleanly for all students and teachers."}
                </p>

                {(knTitle || hiTitle) && (
                  <div className="mt-3 border-t pt-2 space-y-1 text-xs bg-amber-50/50 p-2 rounded-lg">
                    {knTitle && (
                      <div>
                        <b className="text-[#8a5d12]">ಕನ್ನಡ:</b> <span className="text-slate-700">{knTitle}</span> — <span className="text-slate-500">{knMessage}</span>
                      </div>
                    )}
                    {hiTitle && (
                      <div>
                        <b className="text-[#8a5d12]">हिन्दी:</b> <span className="text-slate-700">{hiTitle}</span> — <span className="text-slate-500">{hiMessage}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t pt-2">
                  <span>Author: Center Admin</span>
                  <span>Target: {target} • Just now</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              {t("notif.sendModal.cancelBtn", "Cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !message.trim()}
              className="btn primary px-5 py-2.5 text-sm font-bold shadow-md shadow-navy/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Converting & Broadcasting...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{t("notif.sendModal.sendBtn", "Broadcast Notification Now")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
