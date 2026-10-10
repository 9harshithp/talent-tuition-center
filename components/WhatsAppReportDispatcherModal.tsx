"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StudentRecord, Role, UserSession } from "@/lib/dataStore";
import { SubjectWorkflow } from "@/lib/curriculumData";
import { ChapterTestRecord } from "@/lib/mcqTestData";
import {
  Send,
  MessageCircle,
  Copy,
  Check,
  X,
  User,
  Users,
  Sparkles,
  Smartphone,
  Calendar,
  Award,
  CircleDollarSign,
  Share2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface WhatsAppReportDispatcherModalProps {
  student: StudentRecord;
  allStudents?: StudentRecord[];
  studentRecords: Record<string, ChapterTestRecord>;
  curricula: SubjectWorkflow[];
  role: Role;
  session: UserSession;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function WhatsAppReportDispatcherModal({
  student,
  allStudents = [],
  studentRecords,
  curricula,
  role,
  session,
  onToast,
  onClose,
}: WhatsAppReportDispatcherModalProps) {
  const { language } = useLanguage();

  const [targetStudent, setTargetStudent] = useState<StudentRecord>(student);
  const [reportType, setReportType] = useState<"comprehensive" | "mcq_scores" | "attendance" | "fees">("comprehensive");
  const [reportLang, setReportLang] = useState<"en" | "kn" | "hi">("en");
  const [customRemark, setCustomRemark] = useState("");
  const [copied, setCopied] = useState(false);

  // Calculate metrics for target student
  const metrics = useMemo(() => {
    const recs = Object.values(studentRecords);
    let attempted = 0;
    let cleared = 0;
    let totalScore = 0;
    let totalAttempts = 0;

    recs.forEach((r) => {
      if (r.attemptsUsed > 0) {
        attempted += 1;
        totalScore += r.bestPercentage;
        totalAttempts += r.attemptsUsed;
        if (r.isCleared) cleared += 1;
      }
    });

    const avgScore = attempted > 0 ? Math.round(totalScore / attempted) : 0;
    return { attempted, cleared, avgScore, totalAttempts };
  }, [studentRecords]);

  // Clean phone number for WhatsApp
  const parentPhone = targetStudent.parentPhone.replace(/[^0-9]/g, "");
  const formattedParentPhone = parentPhone.startsWith("91") ? parentPhone : `91${parentPhone}`;

  // Generate customized message text
  const messageText = useMemo(() => {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (reportLang === "kn") {
      let msg = `🎓 *ಟ್ಯಾಲೆಂಟ್ ಟ್ಯೂಷನ್ ಸೆಂಟರ್ (TTC) - ವಿದ್ಯಾರ್ಥಿ ಪ್ರಗತಿ ವರದಿ*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `👤 *ವಿದ್ಯಾರ್ಥಿ:* ${targetStudent.name} (${targetStudent.roll})\n`;
      msg += `🏫 *ತರಗತಿ:* ${targetStudent.class}\n`;
      msg += `📅 *ದಿನಾಂಕ:* ${today}\n\n`;

      if (reportType === "comprehensive" || reportType === "mcq_scores") {
        msg += `📊 *ಲೈವ್ MCQ ಅಧ್ಯಾಯ ಪರೀಕ್ಷಾ ಪ್ರಗತಿ:*\n`;
        msg += `• ತೇರ್ಗಡೆಯಾದ ಅಧ್ಯಾಯಗಳು: *${metrics.cleared} 🏆*\n`;
        msg += `• ಒಟ್ಟು ತೆಗೆದುಕೊಂಡ ಪರೀಕ್ಷೆಗಳು: *${metrics.attempted}*\n`;
        msg += `• ಸರಾಸರಿ ಅಂಕಗಳು: *${metrics.avgScore}%*\n`;
        msg += `• ಒಟ್ಟು ಬಳಸಿದ ಪ್ರಯತ್ನಗಳು: *${metrics.totalAttempts}*\n\n`;
      }

      if (reportType === "comprehensive" || reportType === "attendance") {
        msg += `🗓️ *ಹಾಜರಾತಿ ಸ್ಥಿತಿ:* ಹಾಜರಾಗಿದ್ದಾರೆ (Present ✅)\n\n`;
      }

      if (reportType === "comprehensive" || reportType === "fees") {
        msg += `💳 *ಶುಲ್ಕ ಸ್ಥಿತಿ:* ${targetStudent.feeStatus === "Paid" ? "ಪಾವತಿಸಲಾಗಿದೆ (Paid ✅)" : `ಬಾಕಿ ಇದೆ (Pending ₹${targetStudent.pendingAmount}) ⚠️`}\n\n`;
      }

      if (customRemark.trim()) {
        msg += `💬 *ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿ:* "${customRemark.trim()}"\n\n`;
      }

      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `🌐 *ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್ ವೀಕ್ಷಣೆ:* https://talent-tuition.demo/portal\n`;
      msg += `📞 *ಸಂಪರ್ಕ:* +91 98860 12345 / Talent Tuition Center`;
      return msg;
    }

    if (reportLang === "hi") {
      let msg = `🎓 *टैलेंट ट्यूशन सेंटर (TTC) - छात्र प्रगति रिपोर्ट*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `👤 *छात्र का नाम:* ${targetStudent.name} (${targetStudent.roll})\n`;
      msg += `🏫 *कक्षा:* ${targetStudent.class}\n`;
      msg += `📅 *दिनांक:* ${today}\n\n`;

      if (reportType === "comprehensive" || reportType === "mcq_scores") {
        msg += `📊 *लाइव MCQ अध्याय टेस्ट प्रदर्शन:*\n`;
        msg += `• उत्तीर्ण अध्याय: *${metrics.cleared} 🏆*\n`;
        msg += `• कुल टेस्ट दिए गए: *${metrics.attempted}*\n`;
        msg += `• औसत MCQ स्कोर: *${metrics.avgScore}%*\n`;
        msg += `• कुल उपयोग किए गए प्रयास: *${metrics.totalAttempts}*\n\n`;
      }

      if (reportType === "comprehensive" || reportType === "attendance") {
        msg += `🗓️ *दैनिक उपस्थिति:* उपस्थित (Present ✅)\n\n`;
      }

      if (reportType === "comprehensive" || reportType === "fees") {
        msg += `💳 *फीस विवरण:* ${targetStudent.feeStatus === "Paid" ? "पूर्ण भुगतान (Paid ✅)" : `बकाया राशि (Pending ₹${targetStudent.pendingAmount}) ⚠️`}\n\n`;
      }

      if (customRemark.trim()) {
        msg += `💬 *शिक्षक टिप्पणी:* "${customRemark.trim()}"\n\n`;
      }

      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `🌐 *ऑनलाइन पोर्टल लिंक:* https://talent-tuition.demo/portal\n`;
      msg += `📞 *संपर्क सूत्र:* +91 98860 12345 / Talent Tuition Center`;
      return msg;
    }

    // Default English
    let msg = `🎓 *TALENT TUITION CENTER (TTC) - STUDENT PROGRESS REPORT*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Student:* ${targetStudent.name} (${targetStudent.roll})\n`;
    msg += `🏫 *Class:* ${targetStudent.class}\n`;
    msg += `📅 *Date:* ${today}\n\n`;

    if (reportType === "comprehensive" || reportType === "mcq_scores") {
      msg += `📊 *Live MCQ Chapter Challenge Performance:*\n`;
      msg += `• Cleared Mastery Tests (≥70%): *${metrics.cleared} Chapters 🏆*\n`;
      msg += `• Tests Attempted: *${metrics.attempted}*\n`;
      msg += `• Average MCQ Score: *${metrics.avgScore}%*\n`;
      msg += `• Total Attempts Logged: *${metrics.totalAttempts}*\n\n`;
    }

    if (reportType === "comprehensive" || reportType === "attendance") {
      msg += `🗓️ *Daily Attendance:* Marked Present ✅\n\n`;
    }

    if (reportType === "comprehensive" || reportType === "fees") {
      msg += `💳 *Tuition Fee Status:* ${targetStudent.feeStatus === "Paid" ? "Paid in Full (Zero Dues ✅)" : `Pending Balance (₹${targetStudent.pendingAmount}) ⚠️`}\n\n`;
    }

    if (customRemark.trim()) {
      msg += `💬 *Teacher's Note:* "${customRemark.trim()}"\n\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🌐 *Portal Verification:* https://talent-tuition.demo/portal\n`;
    msg += `📞 *Helpline:* +91 98860 12345 | Talent Tuition Center`;
    return msg;
  }, [targetStudent, reportType, reportLang, metrics, customRemark]);

  // Handle WhatsApp Dispatch
  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${formattedParentPhone}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onToast(`WhatsApp report dispatched for ${targetStudent.name} to ${targetStudent.parentPhone}! 📲`);
  };

  // Handle SMS Dispatch
  const handleSendSMS = () => {
    const encoded = encodeURIComponent(messageText);
    const url = `sms:${targetStudent.parentPhone}?body=${encoded}`;
    window.location.href = url;
    onToast(`Opening SMS app to dispatch report for ${targetStudent.name}... 💬`);
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    onToast("Report message copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="card max-w-3xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b pb-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-0.5 text-xs font-black text-emerald-800">
              <MessageCircle size={14} className="text-emerald-600" />
              Automated WhatsApp & SMS Parent Dispatcher
            </div>
            <h2 className="text-xl font-black text-navy">
              Dispatch Student Performance Report to Parent
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Sends instant formatted progress updates to parent WhatsApp or mobile SMS.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto space-y-5 pr-1 flex-1">
          {/* Controls Bar: Student Picker, Report Type, Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Student Picker */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-slate-500">Student</label>
              {allStudents.length > 0 ? (
                <select
                  value={targetStudent.id}
                  onChange={(e) => {
                    const found = allStudents.find((s) => s.id === e.target.value);
                    if (found) setTargetStudent(found);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-navy outline-none focus:border-navy"
                >
                  {allStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.roll}) - {s.class}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy">
                  {targetStudent.name} ({targetStudent.roll})
                </div>
              )}
            </div>

            {/* Report Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-slate-500">Report Focus</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-navy outline-none focus:border-navy"
              >
                <option value="comprehensive">🌟 Comprehensive 360° Report</option>
                <option value="mcq_scores">📊 Live MCQ Scores & Mastery</option>
                <option value="attendance">🗓️ Attendance Alert</option>
                <option value="fees">💳 Fee Payment & Dues Summary</option>
              </select>
            </div>

            {/* Report Language */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-slate-500">Message Language</label>
              <div className="flex items-center gap-1">
                {(["en", "kn", "hi"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setReportLang(l)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      reportLang === l
                        ? "bg-navy text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {l === "en" ? "English" : l === "kn" ? "ಕನ್ನಡ" : "हिंदी"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parent & Contact Details Card */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                <Smartphone size={16} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                  Parent Contact: {targetStudent.parentName}
                </span>
                <span className="font-black text-navy text-sm">{targetStudent.parentPhone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-black">
                MCQ Cleared: {metrics.cleared} 🏆
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-black">
                Avg Score: {metrics.avgScore}%
              </span>
            </div>
          </div>

          {/* Optional Teacher's Note / Remark */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase text-slate-500">
              Optional Teacher&apos;s Remark / Customized Note
            </label>
            <input
              type="text"
              value={customRemark}
              onChange={(e) => setCustomRemark(e.target.value)}
              placeholder="e.g. Excellent improvement in Science; keep revising Math formulas for Friday's test!"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-navy"
            />
          </div>

          {/* Live Message Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-1.5">
                <MessageCircle size={13} className="text-emerald-600" />
                Live WhatsApp Message Preview
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-bold text-navy hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f172a] text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner max-h-56 overflow-y-auto">
              {messageText}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn secondary text-xs font-bold py-2.5 px-4 cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendSMS}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
              title="Open default SMS app"
            >
              <Smartphone size={15} />
              Send SMS
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black inline-flex items-center gap-2 transition shadow-md cursor-pointer"
              title="Open WhatsApp with pre-filled message"
            >
              <MessageCircle size={16} />
              Send on WhatsApp 📲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
