"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Bell,
  CheckCheck,
  AlertCircle,
  Calendar,
  FileText,
  DollarSign,
  Info,
  Clock,
  Pin,
  Trash2,
} from "lucide-react";
import { TTCNotification } from "@/lib/notifications";

interface Props {
  onOpenHub?: () => void;
  isAdmin?: boolean;
}

export const NotificationBell: React.FC<Props> = ({ onOpenHub, isAdmin = false }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, isRead, deleteNotification } = useNotifications();
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLocalizedTitle = (notif: TTCNotification) => {
    if (language !== "en" && notif.translations && notif.translations[language]) {
      return notif.translations[language]!.title;
    }
    return notif.title;
  };

  const getLocalizedMessage = (notif: TTCNotification) => {
    if (language !== "en" && notif.translations && notif.translations[language]) {
      return notif.translations[language]!.message;
    }
    return notif.message;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "urgent":
        return <AlertCircle size={15} className="text-rose-500" />;
      case "exam":
        return <FileText size={15} className="text-amber-500" />;
      case "schedule":
        return <Calendar size={15} className="text-blue-500" />;
      case "fees":
        return <DollarSign size={15} className="text-emerald-500" />;
      default:
        return <Info size={15} className="text-indigo-500" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "urgent":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "exam":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "schedule":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "fees":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 2) return language === "kn" ? "ಈಗಷ್ಟೇ" : language === "hi" ? "अभी" : "Just now";
      if (diffMins < 60) return `${diffMins}m ${language === "kn" ? "ಹಿಂದೆ" : language === "hi" ? "पहले" : "ago"}`;
      if (diffHours < 24) return `${diffHours}h ${language === "kn" ? "ಹಿಂದೆ" : language === "hi" ? "पहले" : "ago"}`;
      return `${diffDays}d ${language === "kn" ? "ಹಿಂದೆ" : language === "hi" ? "पहले" : "ago"}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
        aria-label="Notifications"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-black text-white ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm origin-top-right rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3.5 py-3 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="font-bold text-navy text-xs sm:text-sm truncate">{t("notif.dropdownTitle", "Recent Notifications")}</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold text-rose-700 shrink-0">
                  {unreadCount} {t("notif.unread", "Unread")}
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gold hover:text-[#976a18] transition shrink-0 ml-1"
              >
                <CheckCheck size={13} />
                <span className="hidden xs:inline">{t("notif.markAllRead", "Mark all as read")}</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                <Bell size={28} className="mx-auto mb-2 opacity-40 text-slate-400" />
                {t("notif.noNotices", "No notifications found.")}
              </div>
            ) : (
              notifications.slice(0, 6).map((notif) => {
                const read = isRead(notif.id);
                return (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`group relative p-3.5 transition cursor-pointer hover:bg-slate-50/80 ${
                      !read ? "bg-amber-50/30 font-medium" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">{getCategoryIcon(notif.category)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 truncate">
                            {notif.pinned && <Pin size={12} className="text-gold shrink-0 fill-gold" />}
                            <span className={`text-xs font-bold text-navy truncate ${!read ? "text-[#08265c]" : ""}`}>
                              {getLocalizedTitle(notif)}
                            </span>
                          </div>
                          {!read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500 ring-2 ring-rose-200" />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {getLocalizedMessage(notif)}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                          <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 uppercase tracking-wider font-semibold text-[10px] ${getCategoryBadgeClass(notif.category)}`}>
                            {notif.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {formatTime(notif.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {onOpenHub && (
            <div className="border-t border-slate-100 bg-slate-50/90 p-2.5 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenHub();
                }}
                className="text-xs font-bold text-navy hover:text-gold transition inline-flex items-center gap-1"
              >
                {t("notif.viewAll", "View all notifications")} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
