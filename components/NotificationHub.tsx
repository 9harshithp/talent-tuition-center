"use client";

import React, { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { NotificationCategory, TTCNotification } from "@/lib/notifications";
import { AdminNotificationComposer } from "@/components/AdminNotificationComposer";
import {
  Bell,
  CheckCheck,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  Info,
  Pin,
  Trash2,
  Plus,
  ShieldCheck,
  Filter,
  Sparkles,
  Users,
  GraduationCap,
  Shield,
  Search,
} from "lucide-react";

interface Props {
  role: "student" | "teacher" | "admin";
  onToast: (msg: string) => void;
}

export const NotificationHub: React.FC<Props> = ({ role, onToast }) => {
  const {
    notifications,
    allNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isRead,
    deleteNotification,
  } = useNotifications();

  const { t, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const isAdmin = role === "admin";
  // Admin sees all notifications; students & teachers see their filtered list
  const activeList = isAdmin ? allNotifications : notifications;

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

  const filteredList = activeList.filter((notif) => {
    const title = getLocalizedTitle(notif).toLowerCase();
    const msg = getLocalizedMessage(notif).toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || msg.includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === "all") return true;
    if (selectedFilter === "unread") return !isRead(notif.id);
    if (selectedFilter === "urgent") return notif.category === "urgent";
    if (selectedFilter === "exam") return notif.category === "exam";
    if (selectedFilter === "schedule") return notif.category === "schedule";
    if (selectedFilter === "fees") return notif.category === "fees";
    if (selectedFilter === "general") return notif.category === "general";
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "urgent":
        return <AlertCircle size={17} className="text-rose-600" />;
      case "exam":
        return <FileText size={17} className="text-amber-600" />;
      case "schedule":
        return <Calendar size={17} className="text-blue-600" />;
      case "fees":
        return <DollarSign size={17} className="text-emerald-600" />;
      default:
        return <Info size={17} className="text-indigo-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "urgent":
        return { label: t("notif.filterUrgent", "Urgent Alert"), bg: "bg-rose-50 text-rose-700 border-rose-200" };
      case "exam":
        return { label: t("notif.filterExam", "Exam / Test"), bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "schedule":
        return { label: t("notif.filterSchedule", "Timetable"), bg: "bg-blue-50 text-blue-700 border-blue-200" };
      case "fees":
        return { label: t("notif.filterFees", "Fee Notice"), bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      default:
        return { label: t("notif.filterGeneral", "General Notice"), bg: "bg-indigo-50 text-indigo-700 border-indigo-200" };
    }
  };

  const getTargetBadge = (target: string) => {
    switch (target) {
      case "students":
        return { label: t("notif.targetStudents", "Students Only"), icon: GraduationCap, color: "text-blue-600 bg-blue-50" };
      case "teachers":
        return { label: t("notif.targetTeachers", "Teachers Only"), icon: Shield, color: "text-purple-600 bg-purple-50" };
      default:
        return { label: t("notif.targetAll", "Everyone"), icon: Users, color: "text-slate-600 bg-slate-100" };
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t("notif.deleteConfirm", "Are you sure you want to delete this notification?"))) {
      deleteNotification(id);
      onToast(t("notif.deletedSuccess", "Notification removed successfully."));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner based on Role */}
      {isAdmin ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#e9d8b8] bg-[#fffaf0] p-5 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f6ecd6] px-3 py-1 text-xs font-bold text-[#805d24]">
              <ShieldCheck size={14} /> {t("notif.adminOnlySend", "Admin Authority: Broadcast Notification")}
            </div>
            <h2 className="mt-2 text-xl font-black text-navy">{t("notif.title", "Notification Center")}</h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
              {t("notif.subtitle", "Admin can broadcast notices. Students and teachers receive updates here.")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="btn primary shrink-0 gap-2 px-5 py-3 shadow-md shadow-navy/20 font-bold"
          >
            <Plus size={18} />
            <span>{t("notif.sendNewBtn", "+ Send New Notification")}</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5ecd9] text-gold">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-navy">{t("notif.title", "Notification Center")}</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  {role === "student"
                    ? "Official center notifications, class schedules, and revision announcements."
                    : "Official center updates, faculty notices, and schedules."}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  markAllAsRead();
                  onToast(t("notif.markAllRead", "Marked all as read"));
                }}
                className="btn light text-xs font-bold gap-1.5 px-3 py-2 text-navy"
              >
                <CheckCheck size={15} />
                <span className="hidden sm:inline">{t("notif.markAllRead", "Mark All Read")}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: t("notif.filterAll", "All Notices") },
              { id: "unread", label: `${t("notif.unread", "Unread")} (${unreadCount})` },
              { id: "urgent", label: t("notif.filterUrgent", "Urgent Alerts") },
              { id: "exam", label: t("notif.filterExam", "Exams & Tests") },
              { id: "schedule", label: t("notif.filterSchedule", "Schedule") },
              { id: "fees", label: t("notif.filterFees", "Fee Notices") },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  selectedFilter === f.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-navy focus:bg-white focus:ring-1 focus:ring-navy"
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3.5">
        {filteredList.length === 0 ? (
          <div className="card p-12 text-center">
            <Bell size={40} className="mx-auto mb-3 text-slate-300" />
            <h3 className="font-bold text-navy text-base">{t("notif.noNotices", "No notifications found in this category.")}</h3>
            <p className="mt-1 text-xs text-slate-400">When new announcements are broadcasted, they will appear here.</p>
          </div>
        ) : (
          filteredList.map((notif) => {
            const read = isRead(notif.id);
            const catBadge = getCategoryBadge(notif.category);
            const tgtBadge = getTargetBadge(notif.target);
            const TargetIcon = tgtBadge.icon;

            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`card relative p-5 transition cursor-pointer hover:border-gold/50 hover:shadow-md ${
                  notif.pinned ? "border-gold/60 bg-[#fffdfa]" : ""
                } ${!read ? "ring-1 ring-gold/30 bg-amber-50/10" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-slate-100 p-2.5 shrink-0">
                      {getCategoryIcon(notif.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {notif.pinned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#8b631d]">
                            <Pin size={10} className="fill-gold" /> Pinned Notice
                          </span>
                        )}
                        {!read && (
                          <span className="inline-flex items-center rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                            {t("notif.badgeNew", "NEW")}
                          </span>
                        )}
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${catBadge.bg}`}>
                          {catBadge.label}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${tgtBadge.color}`}>
                          <TargetIcon size={12} />
                          {tgtBadge.label}
                        </span>
                      </div>

                      <h3 className="font-black text-navy text-base sm:text-lg leading-tight">
                        {getLocalizedTitle(notif)}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {getLocalizedMessage(notif)}
                      </p>

                      <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-500">
                          {t("notif.authorAdmin", "Center Admin")}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(notif.createdAt).toLocaleDateString(language === "kn" ? "kn-IN" : language === "hi" ? "hi-IN" : "en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Admin delete / Status) */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span className={`text-xs font-semibold ${read ? "text-slate-400" : "text-amber-700"}`}>
                      {read ? `✓ ${t("notif.read", "Read")}` : `● ${t("notif.unread", "Unread")}`}
                    </span>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => handleDelete(notif.id, e)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                        title="Delete notification"
                      >
                        <Trash2 size={13} />
                        <span>{t("notif.delete", "Delete")}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Admin Broadcast Composer Modal */}
      {isAdmin && (
        <AdminNotificationComposer
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
          onSuccess={(msg) => onToast(msg)}
        />
      )}
    </div>
  );
};
