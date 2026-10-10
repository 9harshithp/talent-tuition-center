"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationBell } from "@/components/NotificationBell";
import { NotificationHub } from "@/components/NotificationHub";
import { WorkflowTab } from "@/components/WorkflowTab";
import { AIDoubtSolverModal } from "@/components/AIDoubtSolverModal";
import { TeacherApprovalPanel } from "@/components/TeacherApprovalPanel";
import {
  DataStore,
  Role,
  UserSession,
  StudentRecord,
  TeacherRecord,
  ClassSchedule,
  TestRecord,
  FeePayment,
  DoubtRecord,
  canAccessTab,
  validateSession,
  getAutoDate,
  getCurrentFeeMonth,
  generateAutoReceiptNumber,
} from "@/lib/dataStore";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CircleDollarSign,
  GraduationCap,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Sparkles,
  Send,
  Pin,
  Clock,
  AlertCircle,
  FileText,
  Search,
  Check,
  Award,
  Download,
  Plus,
  Paperclip,
  Trash2,
  Edit3,
  Save,
  Eye,
  ImageIcon,
  XCircle,
  ShieldAlert,
  HelpCircle,
  Lock,
  Printer,
  FileCheck,
  CheckCheck,
  Percent,
  Languages,
  Loader2,
} from "lucide-react";
import { translateText } from "@/lib/translator";

// --- Static Study Notes Reference Data ---
const STUDY_NOTES_DB: Record<
  string,
  { title: string; topics: string[]; notes: string; resources: string[] }
> = {
  "Mathematics: Quadratic Equations": {
    title: "Quadratic Equations",
    topics: [
      "Standard Form: ax² + bx + c = 0 (a ≠ 0)",
      "Factorization Method (Splitting middle term)",
      "Quadratic Formula: x = (-b ± √(b²-4ac)) / (2a)",
      "Discriminant D = b² - 4ac (D>0: 2 real roots, D=0: equal roots, D<0: no real roots)",
      "Sum of roots = -b/a, Product of roots = c/a",
    ],
    notes:
      "A quadratic equation is a second-degree polynomial equation. If α and β are roots, the equation is x² - (α+β)x + αβ = 0.\n\nKey Strategy:\n1. Check discriminant D before solving.\n2. If D is a perfect square, factorization is fastest.\n3. Always state final values with proper verification.",
    resources: ["NCERT Chapter 4", "R.D. Sharma Ex 4.1–4.6", "Previous 5-Year Board Questions"],
  },
  "Science: Light & Optics": {
    title: "Light – Reflection & Refraction",
    topics: [
      "Laws of Reflection (∠i = ∠r)",
      "Mirror Formula: 1/v + 1/u = 1/f",
      "Magnification: m = -v/u = h'/h",
      "Refractive Index & Snell's Law (n₁ sin θ₁ = n₂ sin θ₂)",
      "Lens Formula: 1/v - 1/u = 1/f and Power P = 1/f(m) (Dioptres)",
    ],
    notes:
      "Sign Convention (Cartesian):\n• Distance measured in direction of incident light is positive (+).\n• Concave mirror/lens: focal length (f) is negative (-).\n• Convex mirror/lens: focal length (f) is positive (+).\n\nRay Diagram rules: Parallel ray passes through focus; Ray through optical center passes undeviated.",
    resources: ["NCERT Chapter 10", "Optics Ray Diagram Cheat Sheet", "HC Verma Foundation"],
  },
  "Physics: Electricity & Circuits": {
    title: "Electricity & Circuits",
    topics: [
      "Ohm's Law: V = IR (at constant temperature)",
      "Resistance in Series: R_eq = R₁ + R₂ + R₃",
      "Resistance in Parallel: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃",
      "Electric Power: P = VI = I²R = V²/R (Watts)",
      "Joule's Law of Heating: H = I²Rt",
    ],
    notes:
      "Key Conversion:\n• 1 kWh (commercial unit of electric energy) = 3.6 × 10⁶ Joules.\n• Resistivity (ρ) depends only on material and temperature, not dimensions.\n• Ammeter is always connected in series; Voltmeter in parallel.",
    resources: ["NCERT Chapter 12", "Lakhmir Singh Physics", "Board Numericals Bank"],
  },
  "English: Active & Passive Voice": {
    title: "English Grammar: Active & Passive Voice",
    topics: [
      "Subject-Object Interchange",
      "Tense Shift Rules (Present, Past, Future, Continuous)",
      "Imperative Sentences ('Let + object + be + V3')",
      "Modal Verbs (can/could/must + be + V3)",
    ],
    notes:
      "Basic Rule: Subject + Verb + Object → Object + auxiliary verb + V3 (past participle) + by + Subject.\n\nExample:\n• Active: 'The teacher praised Aarav.'\n• Passive: 'Aarav was praised by the teacher.'",
    resources: ["Wren & Martin High School Grammar", "Class 10 CBSE Board Pattern Questions"],
  },
};

// --- Printable PDF / Invoice Generator for Fees ---
interface ReceiptData {
  receiptNumber: string;
  studentName: string;
  roll: string;
  classGrade: string;
  month: string;
  amount: number;
  paidDate: string;
  paymentMethod: string;
}

function getReceiptHTML(data: ReceiptData): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fee Receipt - ${data.receiptNumber}</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px 15px; color: #0f172a; background: #f8fafc; }
      .receipt-container { max-width: 680px; margin: 0 auto; border: 2px solid #c9a84c; border-radius: 16px; padding: 32px; background: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
      .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
      .header h1 { color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
      .header .tagline { color: #b45309; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
      .header .address { font-size: 11px; color: #64748b; margin-top: 6px; }
      .badge-row { display: flex; justify-content: space-between; align-items: center; margin: 24px 0 16px; }
      .receipt-title { font-size: 16px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
      .paid-badge { background: #dcfce7; color: #15803d; font-weight: 800; font-size: 12px; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; border: 1px solid #86efac; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
      .grid-item { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 10px; }
      .grid-label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
      .grid-value { font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 4px; }
      .total-box { background: #0f172a; color: #ffffff; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; border: 2px solid #c9a84c; }
      .total-label { font-size: 11px; color: #fef08a; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
      .total-amount { font-size: 34px; font-weight: 900; color: #ffffff; margin-top: 4px; }
      .signature-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; margin-bottom: 24px; padding: 0 10px; }
      .sign-box { text-align: center; }
      .sign-line { width: 170px; border-top: 1.5px solid #334155; margin-bottom: 6px; }
      .sign-text { font-size: 11px; font-weight: 800; color: #334155; }
      .footer { border-top: 1px solid #e2e8f0; padding-top: 18px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5; }
      @media print {
        body { padding: 0; background: #fff; }
        .receipt-container { border: 1.5px solid #000; box-shadow: none; max-width: 100%; border-radius: 0; padding: 20px; }
        .no-print { display: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="receipt-container">
      <div class="header">
        <h1>✦ TALENT TUITION CENTER ✦</h1>
        <div class="tagline">Learn • Grow • Excel — Official Fee Receipt</div>
        <div class="address">42 Vidya Nagar, Bengaluru, Karnataka - 560001 | Registered Institute Reg: TTC-KA-2018-8874</div>
      </div>
      <div class="badge-row">
        <div class="receipt-title">Payment Voucher Receipt</div>
        <div class="paid-badge">✓ Payment Confirmed & Verified</div>
      </div>
      <div class="grid">
        <div class="grid-item"><div class="grid-label">Receipt Number</div><div class="grid-value">${data.receiptNumber}</div></div>
        <div class="grid-item"><div class="grid-label">Payment Date</div><div class="grid-value">${data.paidDate}</div></div>
        <div class="grid-item"><div class="grid-label">Student Name</div><div class="grid-value">${data.studentName}</div></div>
        <div class="grid-item"><div class="grid-label">Roll Number & Grade</div><div class="grid-value">${data.roll} (${data.classGrade})</div></div>
        <div class="grid-item"><div class="grid-label">Billing Month</div><div class="grid-value">${data.month}</div></div>
        <div class="grid-item"><div class="grid-label">Payment Method</div><div class="grid-value">${data.paymentMethod}</div></div>
      </div>
      <div class="total-box">
        <div class="total-label">Total Amount Received</div>
        <div class="total-amount">₹${data.amount.toLocaleString("en-IN")}</div>
      </div>
      <div class="signature-row">
        <div class="sign-box"><div class="sign-line"></div><div class="sign-text">Center Administrator</div></div>
        <div class="sign-box"><div class="sign-line"></div><div class="sign-text">Authorized Institute Stamp</div></div>
      </div>
      <div class="footer">
        <p>This is a computer-verified official digital receipt issued by Talent Tuition Center Management System.</p>
        <p>Helpline: +91 98860 12345 | Email: support@talenttuition.in</p>
      </div>
    </div>
  </body>
</html>`;
}

function downloadReceiptFile(data: ReceiptData) {
  try {
    const html = getReceiptHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TTC_Receipt_${data.receiptNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Receipt download failed", err);
  }
}

function printReceiptViaIframe(data: ReceiptData) {
  try {
    const html = getReceiptHTML(data);
    let iframe = document.getElementById("ttc-print-iframe") as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "ttc-print-iframe";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.style.visibility = "hidden";
      document.body.appendChild(iframe);
    }
    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        iframe?.contentWindow?.focus();
        iframe?.contentWindow?.print();
      }, 250);
    }
  } catch (err) {
    console.error("Receipt iframe print failed", err);
    // Fallback: trigger file download
    downloadReceiptFile(data);
  }
}

function printReceipt(data: ReceiptData) {
  // Trigger both iframe print and direct file download for 100% reliability
  printReceiptViaIframe(data);
  downloadReceiptFile(data);
}

// --- Official Interactive Receipt Preview Modal ---
function ReceiptPreviewModal({
  receipt,
  onClose,
  onToast,
}: {
  receipt: ReceiptData;
  onClose: () => void;
  onToast: (msg: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-gold/40 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-gold-dark font-black text-xl border border-gold/30">
              🧾
            </span>
            <div>
              <h3 className="text-lg font-black text-navy">Official Tuition Fee Receipt</h3>
              <p className="text-xs text-slate-500 font-mono font-bold">{receipt.receiptNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Close receipt modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Receipt Container preview */}
        <div className="my-6 rounded-2xl border-2 border-gold/40 bg-gradient-to-b from-white to-[#fbf9f4] p-6 space-y-4 shadow-inner">
          <div className="text-center border-b border-gold/20 pb-4">
            <h4 className="text-xl font-black text-navy tracking-tight">✦ TALENT TUITION CENTER ✦</h4>
            <p className="text-xs font-bold text-gold uppercase tracking-widest mt-0.5">Learn • Grow • Excel — Official Fee Voucher</p>
            <p className="text-[11px] text-slate-500 mt-1">42 Vidya Nagar, Bengaluru - 560001 | Reg: TTC-KA-2018-8874</p>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">Payment Voucher</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-300">
              <CheckCircle2 size={13} /> Payment Confirmed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-white p-3 border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Student Name</span>
              <p className="font-black text-navy text-sm mt-0.5">{receipt.studentName}</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Roll & Class</span>
              <p className="font-black text-navy text-sm mt-0.5">{receipt.roll} ({receipt.classGrade})</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Billing Period</span>
              <p className="font-black text-navy text-sm mt-0.5">{receipt.month}</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Payment Date & Mode</span>
              <p className="font-black text-navy text-sm mt-0.5">{receipt.paidDate} ({receipt.paymentMethod})</p>
            </div>
          </div>

          <div className="rounded-2xl bg-navy text-white p-5 text-center border-2 border-gold shadow-md">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-widest">Total Amount Received</div>
            <div className="text-3xl sm:text-4xl font-black mt-1 text-white">₹{receipt.amount.toLocaleString("en-IN")}</div>
            <div className="text-[11px] text-emerald-300 font-bold mt-1">✓ Digital Computer-Verified Institute Voucher</div>
          </div>

          <div className="flex justify-between items-end pt-2 text-[11px] text-slate-500">
            <div>
              <div className="w-32 border-t border-slate-400 mb-1"></div>
              <span className="font-bold">Center Administrator</span>
            </div>
            <div className="text-right">
              <div className="w-32 border-t border-slate-400 mb-1 ml-auto"></div>
              <span className="font-bold">Authorized Stamp</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t">
          <button
            onClick={() => {
              downloadReceiptFile(receipt);
              onToast(`Receipt ${receipt.receiptNumber} downloaded!`);
            }}
            className="btn secondary text-xs font-bold py-2.5 px-4 gap-2 inline-flex items-center shadow-xs"
          >
            <Download size={15} /> Download Receipt (.html)
          </button>
          <button
            onClick={() => {
              printReceiptViaIframe(receipt);
              onToast("Opening printer & PDF dialog...");
            }}
            className="btn primary text-xs font-bold py-2.5 px-5 gap-2 inline-flex items-center shadow-md"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// MAIN DASHBOARD COMPONENT
// =============================================================
export default function Dashboard() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const {
    notifications,
    allNotifications,
    unreadCount,
    setCurrentUser,
  } = useNotifications();

  const [session, setSession] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dataVersion, setDataVersion] = useState(0);
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);

  // Cross-component sync trigger
  useEffect(() => {
    const handleStorageUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("ttc_data_updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("ttc_data_updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // Session authentication & expiration check
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ttc_session");
      const { valid, session: parsed } = validateSession(stored);

      if (!valid || !parsed) {
        localStorage.removeItem("ttc_session");
        router.push("/login");
        return;
      }

      setSession(parsed);
      if (parsed.role && parsed.email) {
        setCurrentUser(parsed.role, parsed.email);
      }
    } catch {
      localStorage.removeItem("ttc_session");
      router.push("/login");
    }
  }, [router, setCurrentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Tab RBAC Authorization enforcement hook
  useEffect(() => {
    if (session?.role && !canAccessTab(session.role, activeTab)) {
      showToast(t("auth.accessDenied", "Access Denied: You do not have permission to view this tab"));
      setActiveTab("overview");
    }
  }, [session, activeTab, t]);

  const handleLogout = () => {
    localStorage.removeItem("ttc_session");
    router.push("/login");
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb]">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy border-t-gold mx-auto" />
          <p className="mt-4 font-bold text-navy text-sm">{t("dashboard.loading", "Loading dashboard...")}</p>
        </div>
      </div>
    );
  }

  const role: Role = session.role;
  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  // Navigation Items by Role
  const menuItems = [
    { id: "overview", labelKey: "menu.overview", icon: LayoutDashboard, badge: null },
    { id: "notifications", labelKey: "menu.notifications", icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { id: "workflow", labelKey: "menu.workflow", icon: FolderTree, badge: null },
    ...(isStudent
      ? [
          { id: "timetable", labelKey: "menu.timetable", icon: CalendarDays, badge: null },
          { id: "results", labelKey: "menu.results", icon: TrendingUp, badge: null },
          { id: "myFees", labelKey: "menu.myFees", icon: WalletCards, badge: null },
          { id: "doubts", labelKey: "menu.doubts", icon: MessageCircleQuestion, badge: null },
        ]
      : isTeacher
      ? [
          { id: "myClasses", labelKey: "menu.myClasses", icon: BookOpen, badge: null },
          { id: "students", labelKey: "menu.students", icon: Users, badge: null },
          { id: "attendance", labelKey: "menu.attendance", icon: ClipboardCheck, badge: null },
          { id: "results", labelKey: "menu.results", icon: TrendingUp, badge: null },
          { id: "doubts", labelKey: "menu.doubts", icon: MessageCircleQuestion, badge: null },
        ]
      : [
          { id: "students", labelKey: "menu.students", icon: Users, badge: null },
          { id: "teachers", labelKey: "menu.teachers", icon: Shield, badge: null },
          { id: "classesTimetable", labelKey: "menu.classesTimetable", icon: CalendarDays, badge: null },
          { id: "attendance", labelKey: "menu.attendance", icon: ClipboardCheck, badge: null },
          { id: "fees", labelKey: "menu.fees", icon: CircleDollarSign, badge: null },
          { id: "results", labelKey: "menu.results", icon: TrendingUp, badge: null },
          { id: "doubts", labelKey: "menu.doubts", icon: MessageCircleQuestion, badge: null },
        ]),
  ];

  const roleSubtitle =
    role === "admin"
      ? t("dashboard.adminSub", "Owner • Administrator")
      : role === "teacher"
      ? t("dashboard.teacherSub", "Science • Teacher")
      : t("dashboard.studentSub", "Class 10 • Mathematics & Science");

  const roleDescription =
    role === "admin"
      ? t("dashboard.adminDesc", "Keep the center running smoothly.")
      : role === "teacher"
      ? t("dashboard.teacherDesc", "Your teaching workspace at a glance.")
      : t("dashboard.studentDesc", "Everything you need for today's learning.");

  // Role Security Authorization Check
  const hasAccess = canAccessTab(role, activeTab);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 rounded-2xl bg-navy text-white px-5 py-3.5 shadow-2xl border border-gold/40 flex items-center gap-3 animate-in slide-in-from-top-3 duration-200 max-w-md">
          <Sparkles size={18} className="text-gold shrink-0" />
          <span className="text-xs sm:text-sm font-bold leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b-2 border-slate-200/90 bg-white/95 backdrop-blur shadow-sm">
        <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <button
              type="button"
              className="md:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 border border-slate-200 shrink-0"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Image
                src="/logo.png"
                alt="Talent Tuition Center Logo"
                width={48}
                height={48}
                className="w-9 h-9 sm:w-13 sm:h-13 rounded-full shadow-md object-contain border-2 border-gold p-0.5 bg-white ring-2 sm:ring-4 ring-gold/25 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <b className="block text-navy text-xs sm:text-base md:text-lg font-black leading-tight truncate">
                  {t("brand.name", "Talent Tuition Center")}
                </b>
                <span className="text-[9px] sm:text-[11px] font-extrabold text-gold uppercase tracking-wider sm:tracking-widest truncate">
                  {role === "admin" ? "ADMIN" : role.toUpperCase()} PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Right Header: Language Selector, Notification Bell, User profile & Logout */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageSelector />

            <NotificationBell
              isAdmin={isAdmin}
              onOpenHub={() => setActiveTab("notifications")}
            />

            {/* Profile Info (Desktop) */}
            <div className="hidden lg:flex items-center gap-2.5 border-l border-slate-200 pl-3">
              {session.avatar ? (
                <img src={session.avatar} alt={session.name} className="h-9 w-9 rounded-full object-cover border border-gold shadow-xs shrink-0" />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white font-bold text-xs shadow-xs shrink-0">
                  {session.name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-navy leading-tight">{session.name}</span>
                  {session.provider === "google" && (
                    <span className="rounded bg-sky-50 px-1 py-0.2 text-[9px] font-extrabold text-sky-700 border border-sky-200">
                      Google
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-semibold uppercase text-gold">
                  {role === "admin" ? "Admin" : role}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition shrink-0"
              title={t("nav.logout", "Logout")}
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block sticky top-16 sm:top-20 z-30 w-64 lg:w-72 border-r border-slate-200 bg-white p-4 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto shrink-0">
          {/* User Profile Card */}
          <div className="mb-5 rounded-2xl border border-gold/30 bg-[#f8f5ee] p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#8c6520]">
                {t("nav.signedInAs", "Signed in as")}
              </div>
              {session.provider === "google" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[9px] font-black text-sky-800 border border-sky-200">
                  <svg className="h-3 w-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Google
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-800 border border-emerald-200">
                  <ShieldCheck size={10} /> Password
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              {session.avatar ? (
                <img src={session.avatar} alt={session.name} className="h-10 w-10 rounded-full object-cover border-2 border-gold shadow-sm shrink-0" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white font-black text-sm shadow-sm">
                  {session.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <div className="font-black text-navy text-sm truncate">{session.name}</div>
                <div className="text-[11px] text-slate-600 truncate">{session.email}</div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-gold/20 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>Role: <strong className="text-navy uppercase">{role}</strong></span>
              <span className="text-emerald-700 font-bold">Active Session</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm sm:text-base font-bold transition ${
                    isActive
                      ? "bg-navy text-white shadow-md shadow-navy/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon size={19} className={`shrink-0 ${isActive ? "text-gold" : "text-slate-400"}`} />
                    <span className="truncate">{t(item.labelKey, item.id)}</span>
                  </div>

                  {item.badge && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Slide-Over Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white p-4 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full border border-gold p-0.5 object-contain"
                    />
                    <div>
                      <div className="font-black text-navy text-sm">Talent Tuition</div>
                      <div className="text-xs font-extrabold text-gold uppercase">{role} PORTAL</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 transition"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile User Profile Card */}
                <div className="my-3.5 rounded-xl border border-gold/30 bg-[#f8f5ee] p-3">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#8c6520]">
                    {t("nav.signedInAs", "Signed in as")}
                  </div>
                  <div className="font-black text-navy text-base mt-0.5 truncate">{session.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">{roleSubtitle}</div>
                </div>

                {/* Mobile Nav Items */}
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                          isActive
                            ? "bg-navy text-white shadow-md shadow-navy/20"
                            : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon size={16} className={`shrink-0 ${isActive ? "text-gold" : "text-slate-400"}`} />
                          <span className="truncate">{t(item.labelKey, item.id)}</span>
                        </div>

                        {item.badge && (
                          <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/50 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                >
                  <LogOut size={15} />
                  <span>{t("nav.logout", "Logout")}</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* App-Style Mobile Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden pb-[env(safe-area-inset-bottom,4px)]">
          <div className="flex items-center justify-around px-1 py-1">
            {menuItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-1.5 rounded-xl transition min-w-[54px] relative ${
                    isActive ? "text-navy font-black" : "text-slate-500 font-semibold hover:text-slate-700"
                  }`}
                >
                  <div className="relative">
                    <Icon size={18} className={isActive ? "text-gold" : "text-slate-400"} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[8px] font-black text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[9px] mt-0.5 truncate max-w-[62px] leading-tight ${isActive ? "text-navy font-black" : "text-slate-500"}`}>
                    {t(item.labelKey, item.id)}
                  </span>
                  {isActive && (
                    <span className="w-5 h-0.5 bg-gold rounded-full mt-0.5" />
                  )}
                </button>
              );
            })}

            {/* Menu / Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center py-1.5 px-1.5 rounded-xl text-slate-500 font-semibold hover:text-slate-700 min-w-[54px]"
            >
              <Menu size={18} className="text-slate-400" />
              <span className="text-[9px] mt-0.5 leading-tight">More</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {/* Header Title Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <p className="text-xs font-bold text-gold uppercase tracking-wider">
                {new Date().toLocaleDateString(
                  language === "kn" ? "kn-IN" : language === "hi" ? "hi-IN" : "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-navy mt-1">
                {t(`menu.${activeTab}`, activeTab)}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{roleDescription}</p>
            </div>

            {/* Quick Broadcast shortcut for Admin */}
            {isAdmin && activeTab !== "notifications" && (
              <button
                onClick={() => setActiveTab("notifications")}
                className="btn primary text-xs font-bold gap-1.5 px-4 py-2 self-start sm:self-auto shadow-xs"
              >
                <Bell size={14} />
                <span>{t("notif.sendNewBtn", "+ Send Notification")}</span>
              </button>
            )}
          </div>

          {/* Security Guard: Check if Role is Authorized for this Tab */}
          {!hasAccess ? (
            <AccessDeniedGuard
              role={role}
              tabId={activeTab}
              onReturn={() => setActiveTab("overview")}
            />
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab
                  role={role}
                  session={session}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onToast={showToast}
                />
              )}

              {activeTab === "notifications" && (
                <NotificationHub role={role} onToast={showToast} />
              )}

              {activeTab === "workflow" && (
                <WorkflowTab role={role} session={session} onToast={showToast} />
              )}

              {activeTab === "timetable" && (
                <TimetableTab session={session} onToast={showToast} />
              )}

              {activeTab === "classesTimetable" && (
                <ClassesTimetableTab onToast={showToast} />
              )}

              {activeTab === "myClasses" && (
                <MyClassesTab session={session} onToast={showToast} />
              )}

              {activeTab === "results" && (
                <ResultsTab role={role} session={session} onToast={showToast} />
              )}

              {activeTab === "myFees" && (
                <MyFeesTab session={session} onToast={showToast} onViewReceipt={setActiveReceipt} />
              )}

              {activeTab === "fees" && (
                <FeesManagementTab onToast={showToast} onViewReceipt={setActiveReceipt} />
              )}

              {activeTab === "doubts" && (
                <DoubtsTab role={role} session={session} onToast={showToast} />
              )}

              {activeTab === "students" && (
                <StudentsTab role={role} onToast={showToast} />
              )}

              {activeTab === "teachers" && (
                <TeachersTab onToast={showToast} />
              )}

              {activeTab === "attendance" && (
                <AttendanceTab role={role} onToast={showToast} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Interactive Official Receipt Preview Modal */}
      {activeReceipt && (
        <ReceiptPreviewModal
          receipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
          onToast={showToast}
        />
      )}
    </div>
  );
}

// =============================================================
// ACCESS DENIED SECURITY GUARD (Point 1 & 8 Security)
// =============================================================
function AccessDeniedGuard({
  role,
  tabId,
  onReturn,
}: {
  role: Role;
  tabId: string;
  onReturn: () => void;
}) {
  return (
    <div className="card bg-white p-8 sm:p-12 text-center max-w-xl mx-auto shadow-md border border-rose-200">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <ShieldAlert size={34} />
      </div>
      <h2 className="mt-5 text-2xl font-black text-navy">Access Denied (403 Forbidden)</h2>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        Your current account role (<span className="font-bold text-navy capitalize">{role}</span>) does not have
        permission to access the <span className="font-bold text-navy capitalize">{tabId}</span> module.
        Financial records, pending fee ledgers, and administrative databases are strictly protected by server-enforced RBAC.
      </p>
      <button
        onClick={onReturn}
        className="btn primary mx-auto mt-6 px-6 py-2.5 text-xs font-bold gap-2"
      >
        <LayoutDashboard size={15} /> Return to Safe Overview
      </button>
    </div>
  );
}

// =============================================================
// 1. OVERVIEW TAB
// =============================================================
function OverviewTab({
  role,
  session,
  onNavigate,
  onToast,
}: {
  role: Role;
  session: UserSession;
  onNavigate: (tab: string) => void;
  onToast: (msg: string) => void;
}) {
  const { t, language } = useLanguage();
  const { notifications, allNotifications } = useNotifications();
  const [selectedNoteKey, setSelectedNoteKey] = useState<string | null>(null);

  // Live data from DataStore
  const classes = DataStore.getClasses();
  const doubts = DataStore.getDoubts();
  const students = DataStore.getStudents();
  const teachers = DataStore.getTeachers();
  const fees = DataStore.getFees();
  const tests = DataStore.getTests();

  const pendingDoubtsCount = doubts.filter((d) => d.status === "Pending").length;
  const pendingFeesTotal = fees
    .filter((f) => f.status === "Pending")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Student specific stats
  const studentDoubts = doubts.filter((d) => d.studentName === session.name || d.studentId === session.studentId);
  const studentFees = fees.filter((f) => f.studentName === session.name || f.studentId === session.studentId);
  const studentPending = studentFees.some((f) => f.status === "Pending");

  // Admin Quick Class Edit State
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);

  // Helper to translate class subjects
  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  const getLocalizedTag = (tag: string) => {
    if (language === "kn") {
      if (tag.includes("Board Exam")) return "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪುನರಾವರ್ತನೆ";
      if (tag.includes("Optics")) return "ಆಪ್ಟಿಕ್ಸ್ & ರೇಖಾಚಿತ್ರ";
      if (tag.includes("Tenses")) return "ಟೆನ್ಸಸ್ & ವರದಿ ಮಾತು";
      if (tag.includes("Nationalism")) return "ರಾಷ್ಟ್ರೀಯತೆ & ಇತಿಹಾಸ ನಕ್ಷೆ";
      if (tag.includes("Regular")) return "ಸಾಮಾನ್ಯ ಬ್ಯಾಚ್";
    } else if (language === "hi") {
      if (tag.includes("Board Exam")) return "बोर्ड परीक्षा पुनरीक्षण";
      if (tag.includes("Optics")) return "प्रकाशिकी & किरण आरेख";
      if (tag.includes("Tenses")) return "काल & प्रत्यक्ष/अप्रत्यक्ष कथन";
      if (tag.includes("Nationalism")) return "राष्ट्रवाद & इतिहास मानचित्र";
      if (tag.includes("Regular")) return "नियमित बैच";
    }
    return tag;
  };

  const getLocalizedNote = (key: string, item: any) => {
    if (language === "kn") {
      if (key.includes("Quadratic")) {
        return {
          title: "ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations)",
          topics: [
            "ಆದರ್ಶ ರೂಪ: ax² + bx + c = 0 (a ≠ 0)",
            "ಅಪವರ್ತಿಸುವ ವಿಧಾನ (ಮಧ್ಯ ಪದ ವಿಭಜನೆ)",
            "ವರ್ಗ ಸೂತ್ರ: x = (-b ± √(b²-4ac)) / (2a)",
            "ಶೋಧಕ D = b² - 4ac (D>0: 2 ವಾಸ್ತವ ಮೂಲಗಳು, D=0: ಸಮಾನ ಮೂಲಗಳು)",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Light")) {
        return {
          title: "ಬೆಳಕು – ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ",
          topics: [
            "ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು (∠i = ∠r)",
            "ದರ್ಪಣ ಸೂತ್ರ: 1/v + 1/u = 1/f",
            "ವರ್ಧನೆ: m = -v/u = h'/h",
            "ವಕ್ರೀಭವನಾಂಕ ಮತ್ತು ಸ್ನೆಲ್‌ನ ನಿಯಮ",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Electricity")) {
        return {
          title: "ವಿದ್ಯುಚ್ಛಕ್ತಿ & ಮಂಡಲಗಳು",
          topics: [
            "ಓಮ್‌ನ ನಿಯಮ: V = IR",
            "ಶ್ರೇಣಿ ಜೋಡಣೆಯಲ್ಲಿ ರೋಧ: R_eq = R₁ + R₂ + R₃",
            "ಸಮಾಂತರ ಜೋಡಣೆಯಲ್ಲಿ ರೋಧ: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃",
            "ವಿದ್ಯುತ್ ಸಾಮರ್ಥ್ಯ: P = VI = I²R = V²/R",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Voice")) {
        return {
          title: "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ: ಸಕ್ರಿಯ & ನಿಷ್ಕ್ರಿಯ ವಾಕ್ಯ",
          topics: [
            "ಕರ್ತೃ-ಕರ್ಮ ಪರಸ್ಪರ ಬದಲಾವಣೆ",
            "ಕಾಲ ಪರಿವರ್ತನೆಯ ನಿಯಮಗಳು (ವರ್ತಮಾನ, ಭೂತ, ಭವಿಷ್ಯ)",
            "ಆಜ್ಞಾರ್ಥಕ ವಾಕ್ಯಗಳು ('Let + object + be + V3')",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
    } else if (language === "hi") {
      if (key.includes("Quadratic")) {
        return {
          title: "द्विघात समीकरण (Quadratic Equations)",
          topics: [
            "मानक रूप: ax² + bx + c = 0 (a ≠ 0)",
            "गुणनखंडन विधि (मध्य पद विभाजन)",
            "द्विघात सूत्र: x = (-b ± √(b²-4ac)) / (2a)",
            "विविक्तकर D = b² - 4ac (D>0: 2 वास्तविक मूल, D=0: समान मूल)",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Light")) {
        return {
          title: "प्रकाश – परावर्तन एवं अपवर्तन",
          topics: [
            "परावर्तन के नियम (∠i = ∠r)",
            "दर्पण सूत्र: 1/v + 1/u = 1/f",
            "आवर्धन: m = -v/u = h'/h",
            "अपवर्तनांक और स्नेल का नियम",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Electricity")) {
        return {
          title: "विद्युत एवं परिपथ",
          topics: [
            "ओम का नियम: V = IR",
            "श्रेणीक्रम में प्रतिरोध: R_eq = R₁ + R₂ + R₃",
            "समांतर क्रम में प्रतिरोध: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃",
            "विद्युत शक्ति: P = VI = I²R = V²/R",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
      if (key.includes("Voice")) {
        return {
          title: "अंग्रेज़ी व्याकरण: कर्तृवाच्य एवं कर्मवाच्य",
          topics: [
            "कर्ता-कर्म पारस्परिक विनिमय",
            "काल परिवर्तन के नियम",
            "आदेशात्मक वाक्य ('Let + object + be + V3')",
          ],
          notes: item.notes,
          resources: item.resources,
        };
      }
    }
    return item;
  };

  const getLocalizedNotifTitle = (notif: any) => {
    if (language !== "en" && notif.translations?.[language]?.title) {
      return notif.translations[language].title;
    }
    return notif.title;
  };

  const getLocalizedNotifMsg = (notif: any) => {
    if (language !== "en" && notif.translations?.[language]?.message) {
      return notif.translations[language].message;
    }
    return notif.message;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-[#1e293b] to-navy p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-sm font-extrabold uppercase tracking-wider text-gold border border-gold/30">
            <Sparkles size={16} /> {role === "admin" ? (language === "kn" ? "ಅಡ್ಮಿನ್ ಕಾರ್ಯಸ್ಥಳ" : language === "hi" ? "व्यवस्थापक कार्यक्षेत्र" : "Administrator Workspace") : `${role.toUpperCase()} HUB`}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black">
            {t("dashboard.welcome", "Welcome back")}, {session.name}!
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {role === "student" && (language === "kn" ? "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಪರಿಶೀಲಿಸಿ, ನಿಮ್ಮ ಅಂಕಗಳನ್ನು ಗಮನಿಸಿ ಮತ್ತು ಅನುಮಾನಗಳನ್ನು ಬಗೆಹರಿಸಿಕೊಳ್ಳಿ." : language === "hi" ? "आज की समय सारिणी की समीक्षा करें, अपने अंकों को ट्रैक करें और अपनी शंकाएं दूर करें।" : "Review today's schedule, track your subject performance, and clear your doubts.")}
            {role === "teacher" && (language === "kn" ? "ಹಾಜರಾತಿಯನ್ನು ಗುರುತಿಸಿ, ಪರೀಕ್ಷಾ ಅಂಕಗಳನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳ ಅನುಮಾನಗಳಿಗೆ ಉತ್ತರಿಸಿ." : language === "hi" ? "उपस्थिति दर्ज करें, बैचों के लिए परीक्षा अंक दर्ज करें और छात्रों की शंकाओं का समाधान करें।" : "Mark attendance, record test marks for your batches, and resolve student doubts.")}
            {role === "admin" && (language === "kn" ? "ದೈನಂದಿನ ತರಗತಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ, ಶುಲ್ಕ ಪಾವತಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಪ್ರಕಟಣೆಗಳನ್ನು ಪ್ರಸಾರ ಮಾಡಿ." : language === "hi" ? "दैनिक कक्षाओं की निगरानी करें, शुल्क भुगतान ट्रैक करें और सूचनाएं प्रसारित करें।" : "Monitor daily classes, track fee payments, broadcast notices, and manage student batches.")}
          </p>
        </div>
      </div>

      {/* Metric Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {role === "admin" && (
          <>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.students", "Total Students")}</div>
              <div className="text-3xl font-black text-navy mt-1">{students.length}</div>
              <div className="text-sm text-emerald-600 font-bold mt-1">{t("stat.activeLearners", "Active Batches")}</div>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.teachers", "Teaching Staff")}</div>
              <div className="text-3xl font-black text-navy mt-1">{teachers.length}</div>
              <div className="text-sm text-blue-600 font-bold mt-1">{t("stat.staffCount", "4 Key Subjects")}</div>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.pendingFees", "Pending Fees")}</div>
              <div className="text-3xl font-black text-rose-600 mt-1">₹{pendingFeesTotal.toLocaleString()}</div>
              <button
                onClick={() => onNavigate("fees")}
                className="text-sm text-gold font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಲೆಡ್ಜರ್ ವೀಕ್ಷಿಸಿ →" : language === "hi" ? "लेज़र देखें →" : "View Ledger →"}
              </button>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.openDoubts", "Open Doubts")}</div>
              <div className="text-3xl font-black text-amber-600 mt-1">{pendingDoubtsCount}</div>
              <button
                onClick={() => onNavigate("doubts")}
                className="text-sm text-navy font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಅನುಮಾನಗಳನ್ನು ನಿರ್ವಹಿಸಿ →" : language === "hi" ? "शंकाएं प्रबंधित करें →" : "Manage Doubts →"}
              </button>
            </div>
          </>
        )}

        {role === "teacher" && (
          <>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.myClasses", "Assigned Classes")}</div>
              <div className="text-3xl font-black text-navy mt-1">Class 8, 9, 10</div>
              <div className="text-sm text-blue-600 font-bold mt-1">Science & Physics</div>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.openDoubts", "Doubts to Answer")}</div>
              <div className="text-3xl font-black text-amber-600 mt-1">{pendingDoubtsCount}</div>
              <button
                onClick={() => onNavigate("doubts")}
                className="text-sm text-navy font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಈಗಲೇ ಉತ್ತರಿಸಿ →" : language === "hi" ? "अभी उत्तर दें →" : "Resolve Now →"}
              </button>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.pendingTests", "Tests Recorded")}</div>
              <div className="text-3xl font-black text-navy mt-1">{tests.length}</div>
              <button
                onClick={() => onNavigate("results")}
                className="text-sm text-emerald-600 font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಅಂಕಗಳನ್ನು ದಾಖಲಿಸಿ →" : language === "hi" ? "अंक दर्ज करें →" : "Enter Marks →"}
              </button>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.attendanceRate", "Attendance Today")}</div>
              <div className="text-3xl font-black text-emerald-600 mt-1">94%</div>
              <button
                onClick={() => onNavigate("attendance")}
                className="text-sm text-navy font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಹಾಜರಾತಿ ದಾಖಲಿಸಿ →" : language === "hi" ? "उपस्थिति दर्ज करें →" : "Mark Attendance →"}
              </button>
            </div>
          </>
        )}

        {role === "student" && (
          <>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.todaysClasses", "Today's Classes")}</div>
              <div className="text-3xl font-black text-navy mt-1">{classes.length}</div>
              <div className="text-sm text-blue-600 font-bold mt-1">{t("stat.sessionsToday", "Starting 4:00 PM")}</div>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.avgScore", "Overall Grade")}</div>
              <div className="text-3xl font-black text-emerald-600 mt-1">A+ (92.5%)</div>
              <button
                onClick={() => onNavigate("results")}
                className="text-sm text-navy font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಅಂಕಗಳನ್ನು ನೋಡಿ →" : language === "hi" ? "अंक देखें →" : "View Marks →"}
              </button>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.feeStatus", "Fee Status")}</div>
              <div className={`text-2xl font-black mt-1 ${studentPending ? "text-rose-600" : "text-emerald-600"}`}>
                {studentPending ? (language === "kn" ? "ಬಾಕಿ ಇದೆ" : language === "hi" ? "लंबित" : "Due") : (language === "kn" ? "ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "भुगतान किया गया" : "Paid")}
              </div>
              <button
                onClick={() => onNavigate("myFees")}
                className="text-sm text-gold font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ರಸೀದಿ ಪಡೆಯಿರಿ →" : language === "hi" ? "रसीद प्राप्त करें →" : "Get Receipt →"}
              </button>
            </div>
            <div className="card p-4 bg-white shadow-xs border border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("stat.openDoubts", "My Doubts")}</div>
              <div className="text-3xl font-black text-navy mt-1">{studentDoubts.length}</div>
              <button
                onClick={() => onNavigate("doubts")}
                className="text-sm text-navy font-bold mt-1 hover:underline text-left block"
              >
                {language === "kn" ? "ಅನುಮಾನ ಕೇಳಿ →" : language === "hi" ? "शंका पूछें →" : "Ask Doubt →"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Admin Teacher Permission & Approval Section */}
      {role === "admin" && (
        <div className="my-4">
          <TeacherApprovalPanel onStatusChange={(msg) => onToast(msg)} />
        </div>
      )}

      {/* Main Grid: Today's 4 Classes + Study Notes & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Classes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5 bg-white shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-navy flex items-center gap-2">
                  <CalendarDays size={20} className="text-gold" />
                  {language === "kn" ? "ಇಂದಿನ ನಿಗದಿತ ತರಗತಿಗಳು (4 ತರಗತಿಗಳು)" : language === "hi" ? "आज की निर्धारित कक्षाएं (डिफ़ॉल्ट 4)" : "Today's Scheduled Classes (Default 4)"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {role === "admin" 
                    ? (language === "kn" ? "ಅಡ್ಮಿನ್ ವೇಳಾಪಟ್ಟಿ, ಶಿಕ್ಷಕರು ಮತ್ತು ಕೊಠಡಿ ನಿಯೋಜನೆಗಳನ್ನು ಎಡಿಟ್ ಮಾಡಬಹುದು." : language === "hi" ? "व्यवस्थापक समय सारिणी, शिक्षक और कमरे के आवंटन को संपादित कर सकते हैं।" : "Admin can edit schedules, instructors & room assignments.")
                    : (language === "kn" ? "ತರಗತಿ 8, 9 ಮತ್ತು 10 ಬ್ಯಾಚ್‌ಗಳ ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ." : language === "hi" ? "कक्षा 8, 9 और 10 बैचों के लिए दैनिक समय सारिणी।" : "Daily schedule for Class 8, 9 & 10 batches.")}
                </p>
              </div>

              {role === "admin" && (
                <button
                  onClick={() =>
                    setEditingClass({
                      id: "",
                      subject: "Mathematics",
                      time: "4:00 PM – 5:00 PM",
                      room: "Room 101",
                      instructor: "Mr. Rohan Sharma",
                      tag: "Regular Batch",
                      classGrade: "Class 10",
                      color: "amber",
                      dayOfWeek: "Today",
                    })
                  }
                  className="btn primary text-xs font-bold gap-1 px-3 py-1.5"
                >
                  <Plus size={14} /> {language === "kn" ? "ತರಗತಿ ಸೇರಿಸಿ" : language === "hi" ? "कक्षा जोड़ें" : "Add Class"}
                </button>
              )}
            </div>

            {/* List of 4 Classes */}
            <div className="space-y-3">
              {classes.map((cls, idx) => (
                <div
                  key={cls.id || idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold font-black text-sm sm:text-base shadow-xs">
                      #{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-navy text-sm sm:text-base leading-snug">{getLocalizedSubject(cls.subject)}</span>
                        <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600 shrink-0">
                          {cls.classGrade}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock size={13} className="text-gold" /> {cls.time}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="shrink-0">{cls.room}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-semibold text-slate-700 truncate">{cls.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="rounded-full bg-amber-50 border border-gold/30 px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-extrabold text-[#8a5d12] whitespace-nowrap">
                      {getLocalizedTag(cls.tag)}
                    </span>
                    {role === "admin" && (
                      <button
                        onClick={() => setEditingClass(cls)}
                        className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-navy hover:border-navy transition"
                        title="Edit class"
                      >
                        <Edit3 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Study Notes Section */}
          <div className="card p-5 bg-white shadow-sm border border-slate-200/80">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-black text-navy flex items-center gap-2">
                <BookOpen size={20} className="text-gold" />
                {language === "kn" ? "ಅಧ್ಯಯನ ಟಿಪ್ಪಣಿಗಳು & ಸೂತ್ರಗಳ ಪಟ್ಟಿ" : language === "hi" ? "अध्ययन नोट्स और फॉर्मूला शीट्स" : "Curated Study Notes & Formula Sheets"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "kn" ? "ತ್ವರಿತ ಪುನರಾವರ್ತನೆ ಟಿಪ್ಪಣಿಗಳು, ಸೂತ್ರಗಳು ಮತ್ತು NCERT ಉಲ್ಲೇಖಗಳು." : language === "hi" ? "त्वरित पुनरीक्षण नोट्स, सूत्र और NCERT संदर्भ।" : "Instant interactive revision notes, formulas, and NCERT references."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(STUDY_NOTES_DB).map(([key, item]) => {
                const localized = getLocalizedNote(key, item);
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedNoteKey(key)}
                    className="rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-gold hover:shadow-xs transition group"
                  >
                    <div className="text-sm font-black text-navy group-hover:text-gold transition">
                      {localized.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {localized.topics.join(" • ")}
                    </div>
                    <div className="text-xs font-bold text-navy/70 mt-2 flex items-center gap-1">
                      {language === "kn" ? "ಟಿಪ್ಪಣಿಗಳು & ಸೂತ್ರಗಳನ್ನು ಓದಿ" : language === "hi" ? "नोट्स और सूत्र पढ़ें" : "Read Notes & Formulas"} <ChevronRight size={14} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Important Announcements */}
        <div className="space-y-4">
          <div className="card p-5 bg-white shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-base font-black text-navy flex items-center gap-2">
                <Bell size={18} className="text-gold" />
                {language === "kn" ? "ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆಗಳು" : language === "hi" ? "नवीनतम घोषणाएं" : "Latest Announcements"}
              </h3>
              <button
                onClick={() => onNavigate("notifications")}
                className="text-sm font-bold text-gold hover:underline"
              >
                {language === "kn" ? "ಹಬ್ ವೀಕ್ಷಿಸಿ →" : language === "hi" ? "हब देखें →" : "View Hub →"}
              </button>
            </div>

            <div className="space-y-3">
              {(role === "admin" ? allNotifications : notifications).slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-sm hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy line-clamp-1">{getLocalizedNotifTitle(notif)}</span>
                    {notif.pinned && <Pin size={14} className="text-gold shrink-0" />}
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{getLocalizedNotifMsg(notif)}</p>
                  <div className="text-xs text-slate-400 mt-2">
                    {language === "kn" ? "ಕೇಂದ್ರ ಅಡ್ಮಿನ್ ಅವರಿಂದ" : language === "hi" ? "सेंटर एडमिन द्वारा" : `By ${notif.author}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help & Center Contact */}
          <div className="card p-4 bg-[#f8f5ee] border border-gold/30">
            <div className="text-sm font-black text-navy flex items-center gap-1.5">
              <HelpCircle size={18} className="text-gold" />
              {t("brand.name", "Talent Tuition Center")} Helpdesk
            </div>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {language === "kn" 
                ? "ಅನುಮಾನ ಸಲ್ಲಿಕೆ ಅಥವಾ ಶುಲ್ಕ ರಸೀದಿಗಳಲ್ಲಿ ಸಮಸ್ಯೆಗಳಿದ್ದರೆ ಅಡ್ಮಿನ್ ಸಂಪರ್ಕಿಸಿ:" 
                : language === "hi" 
                ? "शंका सबमिशन या शुल्क रसीदों में समस्या आ रही है? केंद्र व्यवस्थापक से संपर्क करें:" 
                : "Facing issues with doubt submissions or fee receipts? Contact Center Admin:"}
            </p>
            <div className="mt-2 text-sm font-bold text-navy">
              📞 +91 98860 12345 | ✉️ admin@talent.demo
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Study Notes Reader */}
      {selectedNoteKey && STUDY_NOTES_DB[selectedNoteKey] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-2xl w-full bg-white p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">
                  {language === "kn" ? "ಪುನರಾವರ್ತನೆ ಟಿಪ್ಪಣಿಗಳು" : language === "hi" ? "पुनरीक्षण नोट्स" : "Revision Notes"}
                </span>
                <h3 className="text-xl font-black text-navy">
                  {getLocalizedNote(selectedNoteKey, STUDY_NOTES_DB[selectedNoteKey]).title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNoteKey(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-navy mb-1 text-xs uppercase tracking-wider">
                  {language === "kn" ? "ಮುಖ್ಯ ಪಠ್ಯಕ್ರಮ ವಿಷಯಗಳು" : language === "hi" ? "मुख्य पाठ्यक्रम विषय" : "Core Syllabus Topics"}
                </h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {getLocalizedNote(selectedNoteKey, STUDY_NOTES_DB[selectedNoteKey]).topics.map((tp: string, i: number) => (
                    <li key={i}>{tp}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 border p-3.5 font-mono text-xs whitespace-pre-wrap text-slate-800">
                {STUDY_NOTES_DB[selectedNoteKey].notes}
              </div>

              <div>
                <h4 className="font-bold text-navy mb-1 text-xs uppercase tracking-wider">
                  {language === "kn" ? "ಶಿಫಾರಸು ಮಾಡಿದ ಅಭ್ಯಾಸ" : language === "hi" ? "अनुशंसित अभ्यास" : "Recommended Practice"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {STUDY_NOTES_DB[selectedNoteKey].resources.map((res, i) => (
                    <span key={i} className="rounded-md bg-amber-50 border border-gold/30 px-2 py-1 text-xs font-semibold text-navy">
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end">
              <button
                onClick={() => setSelectedNoteKey(null)}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಟಿಪ್ಪಣಿಗಳನ್ನು ಮುಚ್ಚಿ" : language === "hi" ? "नोट्स बंद करें" : "Close Notes"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal: Admin Edit/Add Class */}
      {editingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-lg w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {editingClass.id ? "Edit Class Schedule" : "Add New Class"}
              </h3>
              <button
                onClick={() => setEditingClass(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  value={editingClass.subject}
                  onChange={(e) => setEditingClass({ ...editingClass, subject: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Time</label>
                  <input
                    type="text"
                    value={editingClass.time}
                    onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                    placeholder="4:00 PM – 5:00 PM"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Class Grade</label>
                  <select
                    value={editingClass.classGrade}
                    onChange={(e) => setEditingClass({ ...editingClass, classGrade: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy bg-white font-semibold"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Room</label>
                  <input
                    type="text"
                    value={editingClass.room}
                    onChange={(e) => setEditingClass({ ...editingClass, room: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Instructor</label>
                  <input
                    type="text"
                    value={editingClass.instructor}
                    onChange={(e) => setEditingClass({ ...editingClass, instructor: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Topic / Tag</label>
                <input
                  type="text"
                  value={editingClass.tag}
                  onChange={(e) => setEditingClass({ ...editingClass, tag: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  placeholder="e.g. Optics & Board Revision"
                />
              </div>
            </div>

            <div className="border-t pt-3 flex items-center justify-between">
              {editingClass.id ? (
                <button
                  onClick={() => {
                    DataStore.deleteClass(editingClass.id);
                    setEditingClass(null);
                    onToast("Class removed from schedule.");
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Delete Class
                </button>
              ) : <div />}

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingClass(null)}
                  className="btn secondary text-xs px-3 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingClass.id) {
                      DataStore.updateClass(editingClass.id, editingClass);
                      onToast("Class schedule updated!");
                    } else {
                      DataStore.addClass(editingClass);
                      onToast("New class added to schedule!");
                    }
                    setEditingClass(null);
                  }}
                  className="btn primary text-xs px-4 py-2 font-bold"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// 2. TIMETABLE TAB (Student View)
// =============================================================
function TimetableTab({
  session,
  onToast,
}: {
  session: UserSession;
  onToast: (msg: string) => void;
}) {
  const { language } = useLanguage();
  const classes = DataStore.getClasses();
  const [classFilter, setClassFilter] = useState("all");

  const filteredClasses = classes.filter(
    (cls) => classFilter === "all" || cls.classGrade === classFilter
  );

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  const getLocalizedTag = (tag: string) => {
    if (language === "kn") {
      if (tag.includes("Board Exam")) return "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪುನರಾವರ್ತನೆ";
      if (tag.includes("Optics")) return "ಆಪ್ಟಿಕ್ಸ್ & ರೇಖಾಚಿತ್ರ";
      if (tag.includes("Tenses")) return "ಟೆನ್ಸಸ್ & ವರದಿ ಮಾತು";
      if (tag.includes("Nationalism")) return "ರಾಷ್ಟ್ರೀಯತೆ & ಇತಿಹಾಸ ನಕ್ಷೆ";
      if (tag.includes("Regular")) return "ಸಾಮಾನ್ಯ ಬ್ಯಾಚ್";
    } else if (language === "hi") {
      if (tag.includes("Board Exam")) return "बोर्ड परीक्षा पुनरीक्षण";
      if (tag.includes("Optics")) return "प्रकाशिकी & किरण आरेख";
      if (tag.includes("Tenses")) return "काल & प्रत्यक्ष/अप्रत्यक्ष कथन";
      if (tag.includes("Nationalism")) return "राष्ट्रवाद & इतिहास मानचित्र";
      if (tag.includes("Regular")) return "नियमित बैच";
    }
    return tag;
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">
              {language === "kn" ? "ಸಾಪ್ತಾಹಿಕ ಶೈಕ್ಷಣಿಕ ವೇಳಾಪಟ್ಟಿ" : language === "hi" ? "साप्ताहिक शैक्षणिक समय सारिणी" : "Weekly Academic Timetable"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn" ? "ತರಗತಿ 8, 9 ಮತ್ತು 10 ರ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಲೈವ್ ಬ್ಯಾಚ್ ವೇಳಾಪಟ್ಟಿ." : language === "hi" ? "कक्षा 8, 9 और 10 के छात्रों के लिए लाइव बैच अनुसूची।" : "Live batch schedule for Class 8, 9 & 10 students."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-navy"
            >
              <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ತರಗತಿಗಳು" : language === "hi" ? "सभी कक्षाएं" : "All Classes"}</option>
              <option value="Class 8">{language === "kn" ? "ತರಗತಿ 8" : language === "hi" ? "कक्षा 8" : "Class 8"}</option>
              <option value="Class 9">{language === "kn" ? "ತರಗತಿ 9" : language === "hi" ? "कक्षा 9" : "Class 9"}</option>
              <option value="Class 10">{language === "kn" ? "ತರಗತಿ 10" : language === "hi" ? "कक्षा 10" : "Class 10"}</option>
            </select>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 shrink-0">
              {language === "kn" ? "ಶೈಕ್ಷಣಿಕ ವರ್ಷ 2024–25" : language === "hi" ? "सक्रिय शैक्षणिक वर्ष 2024–25" : "Active Semester 2024–25"}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClasses.map((cls, i) => (
            <div
              key={cls.id || i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-gold transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-navy px-2.5 py-1 text-xs font-black text-gold">
                  {getLocalizedSubject(cls.subject)}
                </span>
                <span className="text-xs font-bold text-slate-500">{cls.time}</span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-gold" /> {cls.instructor}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {language === "kn" ? "ಸ್ಥಳ:" : language === "hi" ? "स्थान:" : "Location:"} {cls.room} ({cls.classGrade})
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                <span className="text-slate-400 font-medium">
                  {language === "kn" ? "ಬ್ಯಾಚ್ ವಿವರ:" : language === "hi" ? "बैच विवरण:" : "Batch Focus:"}
                </span>
                <span className="font-bold text-navy">{getLocalizedTag(cls.tag)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// 3. MY CLASSES (Teacher View)
// =============================================================
function MyClassesTab({
  session,
  onToast,
}: {
  session: UserSession;
  onToast: (msg: string) => void;
}) {
  const { language } = useLanguage();
  const classes = DataStore.getClasses();
  const students = DataStore.getStudents();

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  const getLocalizedTag = (tag: string) => {
    if (language === "kn") {
      if (tag.includes("Board Exam")) return "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪುನರಾವರ್ತನೆ";
      if (tag.includes("Optics")) return "ಆಪ್ಟಿಕ್ಸ್ & ರೇಖಾಚಿತ್ರ";
      if (tag.includes("Tenses")) return "ಟೆನ್ಸಸ್ & ವರದಿ ಮಾತು";
      if (tag.includes("Nationalism")) return "ರಾಷ್ಟ್ರೀಯತೆ & ಇತಿಹಾಸ ನಕ್ಷೆ";
      if (tag.includes("Regular")) return "ಸಾಮಾನ್ಯ ಬ್ಯಾಚ್";
    } else if (language === "hi") {
      if (tag.includes("Board Exam")) return "बोर्ड परीक्षा पुनरीक्षण";
      if (tag.includes("Optics")) return "प्रकाशिकी & किरण आरेख";
      if (tag.includes("Tenses")) return "काल & प्रत्यक्ष/अप्रत्यक्ष कथन";
      if (tag.includes("Nationalism")) return "राष्ट्रवाद & इतिहास मानचित्र";
      if (tag.includes("Regular")) return "नियमित बैच";
    }
    return tag;
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80">
        <div className="border-b pb-4 mb-5">
          <h2 className="text-xl font-black text-navy">
            {language === "kn" ? "ನನ್ನ ಬೋಧನಾ ವೇಳಾಪಟ್ಟಿ & ಬ್ಯಾಚ್‌ಗಳು" : language === "hi" ? "मेरी शिक्षण अनुसूची & बैच" : "My Teaching Schedule & Batches"}
          </h2>
          <p className="text-xs text-slate-500">
            {language === "kn" ? "ನಿಮ್ಮ ದೈನಂದಿನ ಅವಧಿಗಳು, ಬ್ಯಾಚ್ ಪಟ್ಟಿ ಮತ್ತು ಪ್ರಯೋಗಾಲಯ ಸಮಯಗಳ ಅವಲೋಕನ." : language === "hi" ? "आपके दैनिक सत्रों, बैच सूची और प्रयोगशाला समय का अवलोकन।" : "Overview of your daily sessions, batch rosters, and laboratory timings."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls, i) => {
            const batchStudents = students.filter((s) => s.class === cls.classGrade);
            return (
              <div
                key={cls.id || i}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-3 hover:bg-white hover:border-navy/30 transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-navy text-base">{getLocalizedSubject(cls.subject)}</h3>
                  <span className="rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-bold border border-blue-200">
                    {cls.classGrade}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>⏰ {language === "kn" ? "ಸಮಯ:" : language === "hi" ? "समय:" : "Timing:"} <span className="font-bold text-slate-800">{cls.time}</span></div>
                  <div>📍 {language === "kn" ? "ಕೊಠಡಿ:" : language === "hi" ? "कमरा:" : "Room:"} <span className="font-bold text-slate-800">{cls.room}</span></div>
                  <div>👥 {language === "kn" ? "ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳು:" : language === "hi" ? "नामांकित छात्र:" : "Enrolled Students:"} <span className="font-bold text-navy">{batchStudents.length} {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಗಳು" : language === "hi" ? "छात्र" : "Students"}</span></div>
                </div>

                <div className="border-t border-slate-200/70 pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gold">{getLocalizedTag(cls.tag)}</span>
                  <button
                    onClick={() => onToast(language === "kn" ? `${cls.subject} ತರಗತಿ ಪ್ರಾರಂಭವಾಗಿದೆ.` : language === "hi" ? `${cls.subject} कक्षा सत्र शुरू हुआ।` : `Class session for ${cls.subject} started.`)}
                    className="btn primary text-xs font-bold px-3 py-1.5"
                  >
                    {language === "kn" ? "ಸೆಷನ್ ಪ್ರಾರಂಭಿಸಿ" : language === "hi" ? "सत्र शुरू करें" : "Start Session"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// 4. CLASSES & TIMETABLE (Admin View)
// =============================================================
function ClassesTimetableTab({ onToast }: { onToast: (msg: string) => void }) {
  const { language } = useLanguage();
  const classes = DataStore.getClasses();
  const [editing, setEditing] = useState<ClassSchedule | null>(null);

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  const getLocalizedTag = (tag: string) => {
    if (language === "kn") {
      if (tag.includes("Board Exam")) return "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪುನರಾವರ್ತನೆ";
      if (tag.includes("Optics")) return "ಆಪ್ಟಿಕ್ಸ್ & ರೇಖಾಚಿತ್ರ";
      if (tag.includes("Tenses")) return "ಟೆನ್ಸಸ್ & ವರದಿ ಮಾತು";
      if (tag.includes("Nationalism")) return "ರಾಷ್ಟ್ರೀಯತೆ & ಇತಿಹಾಸ ನಕ್ಷೆ";
      if (tag.includes("Regular")) return "ಸಾಮಾನ್ಯ ಬ್ಯಾಚ್";
    } else if (language === "hi") {
      if (tag.includes("Board Exam")) return "बोर्ड परीक्षा पुनरीक्षण";
      if (tag.includes("Optics")) return "प्रकाशिकी & किरण आरेख";
      if (tag.includes("Tenses")) return "काल & प्रत्यक्ष/अप्रत्यक्ष कथन";
      if (tag.includes("Nationalism")) return "राष्ट्रवाद & इतिहास मानचित्र";
      if (tag.includes("Regular")) return "नियमित बैच";
    }
    return tag;
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">
              {language === "kn" ? "ತರಗತಿಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ ನಿರ್ವಹಣೆ" : language === "hi" ? "कक्षाएं और समय सारिणी प्रबंधित करें" : "Manage Classes & Timetables"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn" ? "ಶಿಕ್ಷಕರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತರಗತಿ ಬ್ಯಾಚ್‌ಗಳನ್ನು ರಚಿಸಿ, ಸಂಪಾದಿಸಿ ಮತ್ತು ನಿಗದಿಪಡಿಸಿ." : language === "hi" ? "सभी शिक्षकों और छात्रों के लिए कक्षा बैच बनाएं, संशोधित करें और शेड्यूल करें।" : "Create, modify, and schedule classroom batches for all teachers and students."}
            </p>
          </div>
          <button
            onClick={() =>
              setEditing({
                id: "",
                subject: "",
                time: "4:00 PM – 5:00 PM",
                room: "Room 101",
                instructor: "",
                tag: "Regular Batch",
                classGrade: "Class 10",
                color: "amber",
                dayOfWeek: "Today",
              })
            }
            className="btn primary text-xs font-bold gap-1.5 px-4 py-2"
          >
            <Plus size={16} /> {language === "kn" ? "ಹೊಸ ತರಗತಿ ಸೇರಿಸಿ" : language === "hi" ? "नई कक्षा जोड़ें" : "Add New Class"}
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-3.5">{language === "kn" ? "ವಿಷಯ" : language === "hi" ? "विषय" : "Subject"}</th>
                <th className="p-3.5">{language === "kn" ? "ತರಗತಿ/ಬ್ಯಾಚ್" : language === "hi" ? "ग्रेड/बैच" : "Grade/Batch"}</th>
                <th className="p-3.5">{language === "kn" ? "ಸಮಯ" : language === "hi" ? "समय" : "Time"}</th>
                <th className="p-3.5">{language === "kn" ? "ಕೊಠಡಿ" : language === "hi" ? "कमरा" : "Room"}</th>
                <th className="p-3.5">{language === "kn" ? "ಬೋಧಕರು" : language === "hi" ? "प्रशिक्षक" : "Instructor"}</th>
                <th className="p-3.5">{language === "kn" ? "ಟ್ಯಾಗ್" : language === "hi" ? "टैग" : "Focus/Tag"}</th>
                <th className="p-3.5 text-right">{language === "kn" ? "ಕ್ರಮಗಳು" : language === "hi" ? "कार्रवाई" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-navy">{getLocalizedSubject(cls.subject)}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{cls.classGrade}</td>
                  <td className="p-3.5 text-slate-600">{cls.time}</td>
                  <td className="p-3.5 text-slate-600">{cls.room}</td>
                  <td className="p-3.5 font-medium text-slate-700">{cls.instructor}</td>
                  <td className="p-3.5">
                    <span className="rounded-md bg-amber-50 border border-gold/30 px-2 py-0.5 text-xs font-bold text-gold">
                      {getLocalizedTag(cls.tag)}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => setEditing(cls)}
                      className="rounded-md border p-1 text-slate-500 hover:text-navy hover:border-navy"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        DataStore.deleteClass(cls.id);
                        onToast(language === "kn" ? "ತರಗತಿ ತೆಗೆದುಹಾಕಲಾಗಿದೆ." : language === "hi" ? "कक्षा हटाई गई।" : "Class deleted.");
                      }}
                      className="rounded-md border p-1 text-rose-500 hover:bg-rose-50 hover:border-rose-300"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-lg w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {editing.id
                  ? (language === "kn" ? "ತರಗತಿ ಸಂಪಾದಿಸಿ" : language === "hi" ? "कक्षा संपादित करें" : "Edit Class")
                  : (language === "kn" ? "ಹೊಸ ತರಗತಿ ರಚಿಸಿ" : language === "hi" ? "नई कक्षा बनाएं" : "Create New Class")}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">{language === "kn" ? "ವಿಷಯದ ಹೆಸರು" : language === "hi" ? "विषय का नाम" : "Subject Name"}</label>
                <input
                  type="text"
                  value={editing.subject}
                  onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  placeholder="e.g. Science & Physics"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಸಮಯ ಸ್ಲಾಟ್" : language === "hi" ? "समय स्लॉट" : "Time Slot"}</label>
                  <input
                    type="text"
                    value={editing.time}
                    onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                    placeholder="5:15 PM – 6:15 PM"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ತರಗತಿ ಗ್ರೇಡ್" : language === "hi" ? "कक्षा ग्रेड" : "Class Grade"}</label>
                  <select
                    value={editing.classGrade}
                    onChange={(e) => setEditing({ ...editing, classGrade: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy bg-white font-semibold"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಕೊಠಡಿ" : language === "hi" ? "कमरा" : "Room / Wing"}</label>
                  <input
                    type="text"
                    value={editing.room}
                    onChange={(e) => setEditing({ ...editing, room: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                    placeholder="Science Lab B"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಬೋಧಕರು" : language === "hi" ? "प्रशिक्षक" : "Instructor"}</label>
                  <input
                    type="text"
                    value={editing.instructor}
                    onChange={(e) => setEditing({ ...editing, instructor: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                    placeholder="Ms. Ananya Rao"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">{language === "kn" ? "ವಿಷಯ ಟ್ಯಾಗ್" : language === "hi" ? "विषय टैग" : "Focus / Topic Tag"}</label>
                <input
                  type="text"
                  value={editing.tag}
                  onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  placeholder="e.g. Optics & Board Revision"
                />
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="btn secondary text-xs px-3 py-2 font-bold"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (editing.id) {
                    DataStore.updateClass(editing.id, editing);
                    onToast(language === "kn" ? "ತರಗತಿ ವೇಳಾಪಟ್ಟಿ ನವೀಕರಿಸಲಾಗಿದೆ!" : language === "hi" ? "कक्षा समय सारिणी अपडेट की गई!" : "Class schedule updated!");
                  } else {
                    DataStore.addClass(editing);
                    onToast(language === "kn" ? "ಹೊಸ ತರಗತಿ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ!" : language === "hi" ? "नई कक्षा निर्धारित की गई!" : "New class scheduled!");
                  }
                  setEditing(null);
                }}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಉಳಿಸಿ" : language === "hi" ? "सहेजें" : "Save Class"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// 5. ATTENDANCE TAB (Live Attendance Marking)
// =============================================================
function AttendanceTab({
  role,
  onToast,
}: {
  role: Role;
  onToast: (msg: string) => void;
}) {
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [classFilter, setClassFilter] = useState("all");
  const students = DataStore.getStudents();
  const attendanceList = DataStore.getAttendance();

  const filteredStudents = students.filter(
    (s) => classFilter === "all" || s.class === classFilter
  );
  const currentDayRecord = attendanceList.find((a) => a.date === selectedDate);

  const getStatus = (studentId: string): "Present" | "Absent" | "Late" => {
    if (!currentDayRecord) return "Present";
    const found = currentDayRecord.records.find((r) => r.studentId === studentId);
    return found ? found.status : "Present";
  };

  const getLocalizedStatus = (status: "Present" | "Absent" | "Late") => {
    if (language === "kn") {
      if (status === "Present") return "ಹಾಜರು";
      if (status === "Absent") return "ಗೈರುಹಾಜರು";
      if (status === "Late") return "ತಡವಾಗಿ";
    } else if (language === "hi") {
      if (status === "Present") return "उपस्थित";
      if (status === "Absent") return "अनुपस्थित";
      if (status === "Late") return "देरी से";
    }
    return status;
  };

  const handleMark = (studentId: string, status: "Present" | "Absent" | "Late") => {
    DataStore.markStudentAttendance(selectedDate, studentId, status);
    onToast(
      language === "kn"
        ? `ವಿದ್ಯಾರ್ಥಿಯ ಸ್ಥಿತಿಯನ್ನು ${getLocalizedStatus(status)} ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.`
        : language === "hi"
        ? `छात्र की स्थिति ${getLocalizedStatus(status)} दर्ज की गई।`
        : `Marked ${status} for selected student.`
    );
  };

  const presentCount = filteredStudents.filter((s) => getStatus(s.id) === "Present").length;
  const attendancePercentage = Math.round((presentCount / Math.max(1, filteredStudents.length)) * 100);

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">
              {language === "kn" ? "ದೈನಂದಿನ ಹಾಜರಾತಿ ಪುಸ್ತಕ" : language === "hi" ? "दैनिक उपस्थिति रजिस्टर" : "Daily Attendance Register"}
            </h2>
            <p className="text-xs text-slate-500">
              {role === "admin" || role === "teacher"
                ? (language === "kn" ? "ಇಂದಿನ ಬ್ಯಾಚ್‌ಗೆ ಲೈವ್ ಹಾಜರಾತಿ ಗುರುತಿಸಿ ಅಥವಾ ಹಿಂದಿನ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ." : language === "hi" ? "आज के बैच के लिए लाइव उपस्थिति दर्ज करें या पिछली तिथि चुनें।" : "Mark live attendance for today's batch or select a previous date.")
                : (language === "kn" ? "ನಿಮ್ಮ ಪರಿಶೀಲಿಸಿದ ತರಗತಿ ಹಾಜರಾತಿ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ." : language === "hi" ? "अपना सत्यापित कक्षा उपस्थिति इतिहास देखें।" : "View your verified class attendance history.")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-navy bg-white"
            >
              <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ತರಗತಿಗಳು" : language === "hi" ? "सभी कक्षाएं" : "All Classes"}</option>
              <option value="Class 8">{language === "kn" ? "ತರಗತಿ 8" : language === "hi" ? "कक्षा 8" : "Class 8"}</option>
              <option value="Class 9">{language === "kn" ? "ತರಗತಿ 9" : language === "hi" ? "कक्षा 9" : "Class 9"}</option>
              <option value="Class 10">{language === "kn" ? "ತರಗತಿ 10" : language === "hi" ? "कक्षा 10" : "Class 10"}</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-navy"
            />
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-800 shrink-0">
              {attendancePercentage}% {language === "kn" ? "ಹಾಜರು" : language === "hi" ? "उपस्थित" : "Present"}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-3.5">{language === "kn" ? "ರೋಲ್ ನಂ" : language === "hi" ? "रोल नंबर" : "Roll No"}</th>
                <th className="p-3.5">{language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು" : language === "hi" ? "छात्र का नाम" : "Student Name"}</th>
                <th className="p-3.5">{language === "kn" ? "ತರಗತಿ/ಬ್ಯಾಚ್" : language === "hi" ? "कक्षा/बैच" : "Class/Batch"}</th>
                <th className="p-3.5">{language === "kn" ? "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ" : language === "hi" ? "वर्तमान स्थिति" : "Current Status"}</th>
                {(role === "admin" || role === "teacher") && (
                  <th className="p-3.5 text-right">{language === "kn" ? "ಹಾಜರಾತಿ ಗುರುತಿಸಿ" : language === "hi" ? "उपस्थिति दर्ज करें" : "Mark Attendance"}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => {
                const status = getStatus(std.id);
                return (
                  <tr key={std.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-bold text-gold">{std.roll}</td>
                    <td className="p-3.5 font-bold text-navy">{std.name}</td>
                    <td className="p-3.5 text-slate-600">{std.class}</td>
                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${
                          status === "Present"
                            ? "bg-emerald-100 text-emerald-800"
                            : status === "Absent"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {getLocalizedStatus(status)}
                      </span>
                    </td>
                    {(role === "admin" || role === "teacher") && (
                      <td className="p-3.5 text-right">
                        <div className="inline-flex rounded-xl border border-slate-200 p-1 bg-white gap-1">
                          <button
                            onClick={() => handleMark(std.id, "Present")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                              status === "Present"
                                ? "bg-emerald-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                            title={language === "kn" ? "ಹಾಜರು" : language === "hi" ? "उपस्थित" : "Present"}
                          >
                            P
                          </button>
                          <button
                            onClick={() => handleMark(std.id, "Late")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                              status === "Late"
                                ? "bg-amber-500 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                            title={language === "kn" ? "ತಡವಾಗಿ" : language === "hi" ? "देरी से" : "Late"}
                          >
                            L
                          </button>
                          <button
                            onClick={() => handleMark(std.id, "Absent")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                              status === "Absent"
                                ? "bg-rose-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                            title={language === "kn" ? "ಗೈರುಹಾಜರು" : language === "hi" ? "अनुपस्थित" : "Absent"}
                          >
                            A
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// 6. RESULTS & PERFORMANCE TAB (Dynamic Score Calculations)
// =============================================================
function ResultsTab({
  role,
  session,
  onToast,
}: {
  role: Role;
  session: UserSession;
  onToast: (msg: string) => void;
}) {
  const { language } = useLanguage();
  const tests = DataStore.getTests();
  const students = DataStore.getStudents();
  const [selectedTestId, setSelectedTestId] = useState(tests[0]?.id || "");
  const [editingScore, setEditingScore] = useState<{ studentId: string; marks: number; remarks: string } | null>(null);
  const [newTestModal, setNewTestModal] = useState(false);
  const [newTestForm, setNewTestForm] = useState({
    title: "",
    subject: "Mathematics",
    classGrade: "Class 10",
    date: new Date().toISOString().split("T")[0],
    maxMarks: 100,
  });

  const currentTest = tests.find((t) => t.id === selectedTestId) || tests[0];

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  // Helper for Grade Letter
  const getGrade = (percentage: number) => {
    if (percentage >= 90) {
      return {
        grade: "A+",
        label: language === "kn" ? "ಅತ್ಯುತ್ತಮ" : language === "hi" ? "उत्कृष्ट" : "Outstanding",
        color: "text-emerald-600 bg-emerald-50",
      };
    }
    if (percentage >= 80) {
      return {
        grade: "A",
        label: language === "kn" ? "ಬಹಳ ಒಳ್ಳೆಯದು" : language === "hi" ? "बहुत अच्छा" : "Very Good",
        color: "text-blue-600 bg-blue-50",
      };
    }
    if (percentage >= 70) {
      return {
        grade: "B",
        label: language === "kn" ? "ಉತ್ತಮ" : language === "hi" ? "अच्छा" : "Good",
        color: "text-amber-600 bg-amber-50",
      };
    }
    if (percentage >= 50) {
      return {
        grade: "C",
        label: language === "kn" ? "ತೃಪ್ತಿದಾಯಕ" : language === "hi" ? "संतोषजनक" : "Satisfactory",
        color: "text-orange-600 bg-orange-50",
      };
    }
    return {
      grade: "F",
      label: language === "kn" ? "ಸುಧಾರಣೆಯ ಅಗತ್ಯವಿದೆ" : language === "hi" ? "सुधार की आवश्यकता" : "Needs Improvement",
      color: "text-rose-600 bg-rose-50",
    };
  };

  // Student Personal View Calculations
  const studentScoresList = useMemo(() => {
    if (role !== "student") return [];
    return tests.map((t) => {
      const scoreObj = t.scores.find((s) => s.studentName === session.name || s.studentId === session.studentId);
      const marks = scoreObj ? scoreObj.marks : 0;
      const percentage = Math.round((marks / t.maxMarks) * 100);
      return {
        testTitle: t.title,
        subject: t.subject,
        date: t.date,
        marks,
        maxMarks: t.maxMarks,
        percentage,
        remarks: scoreObj?.remarks || (language === "kn" ? "ಫಲಿತಾಂಶ ಪರಿಶೀಲಿಸಲಾಗಿದೆ" : language === "hi" ? "सत्यापित परिणाम" : "Performance verified"),
        gradeInfo: getGrade(percentage),
      };
    });
  }, [role, tests, session, language]);

  const overallAvg = useMemo(() => {
    if (studentScoresList.length === 0) return 0;
    const total = studentScoresList.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(total / studentScoresList.length);
  }, [studentScoresList]);

  return (
    <div className="space-y-6">
      {/* Student Personal Results View */}
      {role === "student" ? (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="card p-6 bg-white shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider">
                {language === "kn" ? "ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿ ಪತ್ರ" : language === "hi" ? "शैक्षणिक रिपोर्ट कार्ड" : "Academic Report Card"}
              </span>
              <h2 className="text-2xl font-black text-navy">{session.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "kn" ? "ಒಟ್ಟಾರೆ ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು ನಿರಂತರ ಪರೀಕ್ಷಾ ಮೌಲ್ಯಮಾಪನಗಳು" : language === "hi" ? "समग्र प्रदर्शन एवं निरंतर परीक्षा मूल्यांकन" : "Overall Performance & Continuous Test Assessments"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase">
                  {language === "kn" ? "ಸರಾಸರಿ ಅಂಕ" : language === "hi" ? "औसत अंक" : "Average Score"}
                </div>
                <div className="text-3xl font-black text-navy">{overallAvg}%</div>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-center">
                <div className="text-xs font-bold text-emerald-700 uppercase">
                  {language === "kn" ? "ಒಟ್ಟಾರೆ ಗ್ರೇಡ್" : language === "hi" ? "समग्र ग्रेड" : "Overall Grade"}
                </div>
                <div className="text-3xl font-black text-emerald-800">{getGrade(overallAvg).grade}</div>
              </div>
            </div>
          </div>

          {/* Test Scores Table */}
          <div className="card p-6 bg-white shadow-sm border border-slate-200/80">
            <h3 className="text-base font-black text-navy mb-4">
              {language === "kn" ? "ವಿವರವಾದ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು" : language === "hi" ? "विस्तृत परीक्षा परिणाम" : "Detailed Test Results"}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-3.5">{language === "kn" ? "ಪರೀಕ್ಷೆಯ ಶೀರ್ಷಿಕೆ" : language === "hi" ? "मूल्यांकन शीर्षक" : "Assessment Title"}</th>
                    <th className="p-3.5">{language === "kn" ? "ವಿಷಯ" : language === "hi" ? "विषय" : "Subject"}</th>
                    <th className="p-3.5">{language === "kn" ? "ದಿನಾಂಕ" : language === "hi" ? "तिथि" : "Date"}</th>
                    <th className="p-3.5">{language === "kn" ? "ಗಳಿಸಿದ ಅಂಕ" : language === "hi" ? "प्राप्त अंक" : "Score"}</th>
                    <th className="p-3.5">{language === "kn" ? "ಶೇಕಡಾವಾರು" : language === "hi" ? "प्रतिशत" : "Percentage"}</th>
                    <th className="p-3.5">{language === "kn" ? "ಗ್ರೇಡ್" : language === "hi" ? "ग्रेड" : "Grade"}</th>
                    <th className="p-3.5">{language === "kn" ? "ಶಿಕ್ಷಕರ ಪ್ರತಿಕ್ರಿಯೆ" : language === "hi" ? "शिक्षक की टिप्पणी" : "Teacher's Remarks"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentScoresList.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-navy">{item.testTitle}</td>
                      <td className="p-3.5 text-slate-600">{getLocalizedSubject(item.subject)}</td>
                      <td className="p-3.5 text-slate-500">{item.date}</td>
                      <td className="p-3.5 font-black text-navy">
                        {item.marks} / {item.maxMarks}
                      </td>
                      <td className="p-3.5 font-bold">{item.percentage}%</td>
                      <td className="p-3.5">
                        <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${item.gradeInfo.color}`}>
                          {item.gradeInfo.grade} ({item.gradeInfo.label})
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 italic">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Teacher / Admin View: Live Tracking & Marks Entry */
        <div className="space-y-6">
          <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <h2 className="text-xl font-black text-navy">
                  {language === "kn" ? "ಲೈವ್ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು & ಅಂಕಗಳ ದಾಖಲಾತಿ" : language === "hi" ? "लाइव टेस्ट परिणाम और अंक प्रविष्टि" : "Live Test Results & Marks Entry"}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಗಳ ಅಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಅಥವಾ ನವೀಕರಿಸಲು ಪರೀಕ್ಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ." : language === "hi" ? "वास्तविक समय में छात्रों के अंक देखने या अपडेट करने के लिए मूल्यांकन चुनें।" : "Select an assessment to view or update student marks in real-time."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-navy bg-white"
                >
                  {tests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({getLocalizedSubject(t.subject)})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setNewTestModal(true)}
                  className="btn primary text-xs font-bold gap-1 px-3 py-2"
                >
                  <Plus size={14} /> {language === "kn" ? "ಪರೀಕ್ಷೆ ಸೇರಿಸಿ" : language === "hi" ? "टेस्ट जोड़ें" : "Add Test"}
                </button>
              </div>
            </div>

            {currentTest && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#f8fafc] p-4 border border-slate-200">
                  <div>
                    <h3 className="font-black text-navy text-sm">{currentTest.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === "kn" ? "ವಿಷಯ:" : language === "hi" ? "विषय:" : "Subject:"} <span className="font-bold text-slate-700">{getLocalizedSubject(currentTest.subject)}</span> | {language === "kn" ? "ಗರಿಷ್ಠ ಅಂಕಗಳು:" : language === "hi" ? "अधिकतम अंक:" : "Max Marks:"}{" "}
                      <span className="font-bold text-navy">{currentTest.maxMarks}</span> | {language === "kn" ? "ದಿನಾಂಕ:" : language === "hi" ? "तिथि:" : "Date:"} {currentTest.date}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold border border-blue-200">
                    {currentTest.classGrade}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[620px]">
                    <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="p-3.5">{language === "kn" ? "ರೋಲ್ ನಂ" : language === "hi" ? "रोल नंबर" : "Roll No"}</th>
                        <th className="p-3.5">{language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು" : language === "hi" ? "छात्र का नाम" : "Student Name"}</th>
                        <th className="p-3.5">{language === "kn" ? "ಗಳಿಸಿದ ಅಂಕಗಳು" : language === "hi" ? "प्राप्त अंक" : "Marks Obtained"}</th>
                        <th className="p-3.5">{language === "kn" ? "ಗರಿಷ್ಠ ಅಂಕಗಳು" : language === "hi" ? "अधिकतम अंक" : "Max Marks"}</th>
                        <th className="p-3.5">{language === "kn" ? "ಶೇಕಡಾವಾರು" : language === "hi" ? "प्रतिशत" : "Percentage"}</th>
                        <th className="p-3.5">{language === "kn" ? "ಗ್ರೇಡ್" : language === "hi" ? "ग्रेड" : "Grade"}</th>
                        <th className="p-3.5">{language === "kn" ? "ಷರಾ" : language === "hi" ? "टिप्पणी" : "Remarks"}</th>
                        <th className="p-3.5 text-right">{language === "kn" ? "ಕ್ರಮ" : language === "hi" ? "कार्रवाई" : "Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((std) => {
                        const scoreEntry = currentTest.scores.find((s) => s.studentId === std.id || s.studentName === std.name);
                        const marks = scoreEntry ? scoreEntry.marks : 0;
                        const percentage = Math.round((marks / currentTest.maxMarks) * 100);
                        const gradeObj = getGrade(percentage);

                        return (
                          <tr key={std.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5 font-bold text-gold">{std.roll}</td>
                            <td className="p-3.5 font-bold text-navy">{std.name}</td>
                            <td className="p-3.5 font-black text-navy">{marks}</td>
                            <td className="p-3.5 text-slate-500">{currentTest.maxMarks}</td>
                            <td className="p-3.5 font-bold">{percentage}%</td>
                            <td className="p-3.5">
                              <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${gradeObj.color}`}>
                                {gradeObj.grade}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-600 max-w-xs truncate">
                              {scoreEntry?.remarks || (language === "kn" ? "ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿದೆ" : language === "hi" ? "मूल्यांकन पूर्ण" : "Graded")}
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() =>
                                  setEditingScore({
                                    studentId: std.id,
                                    marks,
                                    remarks: scoreEntry?.remarks || "",
                                  })
                                }
                                className="btn primary text-[11px] font-bold py-1 px-2.5"
                              >
                                {language === "kn" ? "ಅಂಕ ಸಂಪಾದಿಸಿ" : language === "hi" ? "अंक संपादित करें" : "Edit Mark"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Edit Student Mark */}
      {editingScore && currentTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-md w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಯ ಅಂಕಗಳನ್ನು ನವೀಕರಿಸಿ" : language === "hi" ? "छात्र के अंक अपडेट करें" : "Enter / Update Student Score"}
              </h3>
              <button
                onClick={() => setEditingScore(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">
                  {language === "kn" ? `ಗಳಿಸಿದ ಅಂಕಗಳು (ಗರಿಷ್ಠ: ${currentTest.maxMarks})` : language === "hi" ? `प्राप्त अंक (अधिकतम: ${currentTest.maxMarks})` : `Marks (Max: ${currentTest.maxMarks})`}
                </label>
                <input
                  type="number"
                  min={0}
                  max={currentTest.maxMarks}
                  value={editingScore.marks}
                  onChange={(e) =>
                    setEditingScore({
                      ...editingScore,
                      marks: Math.max(0, Math.min(currentTest.maxMarks, Number(e.target.value) || 0)),
                    })
                  }
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  {language === "kn" ? "ಶಿಕ್ಷಕರ ಪ್ರತಿಕ್ರಿಯೆ" : language === "hi" ? "शिक्षक टिप्पणी" : "Teacher's Feedback / Remarks"}
                </label>
                <textarea
                  rows={2}
                  value={editingScore.remarks}
                  onChange={(e) => setEditingScore({ ...editingScore, remarks: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  placeholder="e.g. Excellent formula derivations and neat diagram."
                />
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                onClick={() => setEditingScore(null)}
                className="btn secondary text-xs px-3 py-2 font-bold"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  DataStore.updateScore(
                    currentTest.id,
                    editingScore.studentId,
                    editingScore.marks,
                    editingScore.remarks
                  );
                  setEditingScore(null);
                  onToast(language === "kn" ? "ಅಂಕಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ!" : language === "hi" ? "अंक अपडेट किए गए!" : "Student mark and remarks updated!");
                }}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಉಳಿಸಿ" : language === "hi" ? "सहेजें" : "Save Score"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Test */}
      {newTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-md w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {language === "kn" ? "ಹೊಸ ಪರೀಕ್ಷೆಯನ್ನು ನಿಗದಿಪಡಿಸಿ" : language === "hi" ? "नया मूल्यांकन शेड्यूल करें" : "Schedule New Assessment"}
              </h3>
              <button
                onClick={() => setNewTestModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">{language === "kn" ? "ಪರೀಕ್ಷೆಯ ಶೀರ್ಷಿಕೆ" : language === "hi" ? "परीक्षण शीर्षक" : "Assessment Title"}</label>
                <input
                  type="text"
                  required
                  value={newTestForm.title}
                  onChange={(e) => setNewTestForm({ ...newTestForm, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  placeholder="e.g. Unit Test 2: Algebra & Statistics"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ವಿಷಯ" : language === "hi" ? "विषय" : "Subject"}</label>
                  <input
                    type="text"
                    value={newTestForm.subject}
                    onChange={(e) => setNewTestForm({ ...newTestForm, subject: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಗರಿಷ್ಠ ಅಂಕಗಳು" : language === "hi" ? "अधिकतम अंक" : "Max Marks"}</label>
                  <input
                    type="number"
                    min={10}
                    value={newTestForm.maxMarks}
                    onChange={(e) => setNewTestForm({ ...newTestForm, maxMarks: Number(e.target.value) || 100 })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ತರಗತಿ ಗ್ರೇಡ್" : language === "hi" ? "कक्षा ग्रेड" : "Class Grade"}</label>
                  <select
                    value={newTestForm.classGrade}
                    onChange={(e) => setNewTestForm({ ...newTestForm, classGrade: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy bg-white font-semibold"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ದಿನಾಂಕ" : language === "hi" ? "तिथि" : "Date"}</label>
                  <input
                    type="date"
                    value={newTestForm.date}
                    onChange={(e) => setNewTestForm({ ...newTestForm, date: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                onClick={() => setNewTestModal(false)}
                className="btn secondary text-xs px-3 py-2 font-bold"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (!newTestForm.title.trim()) {
                    onToast(language === "kn" ? "ದಯವಿಟ್ಟು ಪರೀಕ್ಷೆಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ." : language === "hi" ? "कृपया मूल्यांकन शीर्षक दर्ज करें।" : "Please enter an assessment title.");
                    return;
                  }
                  const created = DataStore.addTest({
                    ...newTestForm,
                    scores: students.map((s) => ({
                      studentId: s.id,
                      studentName: s.name,
                      marks: 0,
                      maxMarks: newTestForm.maxMarks,
                      remarks: "Pending evaluation",
                    })),
                  });
                  setSelectedTestId(created.id);
                  setNewTestModal(false);
                  onToast(language === "kn" ? "ಹೊಸ ಪರೀಕ್ಷೆಯನ್ನು ರಚಿಸಲಾಗಿದೆ!" : language === "hi" ? "नया मूल्यांकन बनाया गया!" : "New assessment created!");
                }}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಪರೀಕ್ಷೆ ರಚಿಸಿ" : language === "hi" ? "टेस्ट बनाएं" : "Create Test"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// 7. STUDENT "MY FEES" TAB (Point 8 Fee System)
// =============================================================
function MyFeesTab({
  session,
  onToast,
  onViewReceipt,
}: {
  session: UserSession;
  onToast: (msg: string) => void;
  onViewReceipt?: (data: ReceiptData) => void;
}) {
  const { language } = useLanguage();
  const fees = DataStore.getFees();
  const students = DataStore.getStudents();
  const student = students.find((s) => s.name === session.name || s.id === session.studentId) || students[0];

  const myFeesList = fees.filter((f) => f.studentId === student.id || f.studentName === student.name);

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">
              {language === "kn" ? "ನನ್ನ ಟ್ಯೂಷನ್ ಶುಲ್ಕ & ರಸೀದಿಗಳು" : language === "hi" ? "मेरी ट्यूशन फीस और रसीदें" : "My Tuition Fees & Receipts"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn" ? "ಮಾಸಿಕ ಟ್ಯೂಷನ್ ಪಾವತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ರಸೀದಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ." : language === "hi" ? "मासिक ट्यूशन भुगतानों को सत्यापित करें और आधिकारिक रसीदें डाउनलोड करें।" : "Verify monthly tuition payments and download computer-generated official receipts."}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 border border-gold/30 px-3 py-1 text-xs font-bold text-gold">
            {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ:" : language === "hi" ? "छात्र:" : "Student:"} {student.name} ({student.roll})
          </span>
        </div>

        {/* Current Fee Summary Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === "kn" ? "ಪ್ರಸ್ತುತ ತಿಂಗಳ ಶುಲ್ಕ" : language === "hi" ? "वर्तमान माह का शुल्क" : "Current Month Fee"}
            </div>
            <div className="text-3xl font-black text-navy mt-1">₹{student.feeAmount.toLocaleString()} / {language === "kn" ? "ತಿಂಗಳಿಗೆ" : language === "hi" ? "प्रति माह" : "month"}</div>
            <div className="text-xs text-slate-600 mt-1">
              {language === "kn" ? "ತರಗತಿ:" : language === "hi" ? "कक्षा:" : "Class:"} {student.class} • {language === "kn" ? "ಪೋಷಕರು:" : language === "hi" ? "अभिभावक:" : "Parent:"} {student.parentName}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase ${
                student.pendingAmount === 0
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-rose-100 text-rose-800 border border-rose-300"
              }`}
            >
              {student.pendingAmount === 0
                ? (language === "kn" ? "✓ ಶುಲ್ಕ ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "✓ फीस चुकता" : "✓ Fees Cleared")
                : (language === "kn" ? `ಬಾಕಿ: ₹${student.pendingAmount}` : language === "hi" ? `लंबित: ₹${student.pendingAmount}` : `Pending: ₹${student.pendingAmount}`)}
            </span>
          </div>
        </div>

        {/* Fee Payment History */}
        <div>
          <h3 className="text-sm font-black text-navy mb-3">
            {language === "kn" ? "ಪಾವತಿ ಲೆಡ್ಜರ್ ಮತ್ತು ರಸೀದಿಗಳು" : language === "hi" ? "भुगतान लेज़र और रसीदें" : "Payment Ledger & Receipts"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="p-3.5">{language === "kn" ? "ತಿಂಗಳು / ಅವಧಿ" : language === "hi" ? "माह / अवधि" : "Month / Period"}</th>
                  <th className="p-3.5">{language === "kn" ? "ಮೊತ್ತ" : language === "hi" ? "राशि" : "Amount"}</th>
                  <th className="p-3.5">{language === "kn" ? "ಅಂತಿಮ ದಿನಾಂಕ" : language === "hi" ? "नियत तिथि" : "Due Date"}</th>
                  <th className="p-3.5">{language === "kn" ? "ಸ್ಥಿತಿ" : language === "hi" ? "स्थिति" : "Status"}</th>
                  <th className="p-3.5">{language === "kn" ? "ರಸೀದಿ ಸಂಖ್ಯೆ" : language === "hi" ? "रसीद संदर्भ" : "Receipt Reference"}</th>
                  <th className="p-3.5 text-right">{language === "kn" ? "ರಸೀದಿ ಡೌನ್‌ಲೋಡ್" : language === "hi" ? "रसीद डाउनलोड" : "Download Receipt"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myFeesList.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-bold text-navy">{fee.month}</td>
                    <td className="p-3.5 font-black text-slate-800">₹{fee.amount.toLocaleString()}</td>
                    <td className="p-3.5 text-slate-500">{fee.dueDate}</td>
                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          fee.status === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {fee.status === "Paid" ? (language === "kn" ? "ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "भुगतान किया" : "Paid") : (language === "kn" ? "ಬಾಕಿ" : language === "hi" ? "लंबित" : "Pending")}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{fee.receiptNumber || (language === "kn" ? "ಪಾವತಿ ಬಾಕಿಯಿದೆ" : language === "hi" ? "भुगतान लंबित" : "Pending Clearance")}</td>
                    <td className="p-3.5 text-right">
                      {fee.status === "Paid" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              const receiptData: ReceiptData = {
                                receiptNumber: fee.receiptNumber || generateAutoReceiptNumber(101),
                                studentName: fee.studentName,
                                roll: student.roll,
                                classGrade: fee.classGrade,
                                month: fee.month || getCurrentFeeMonth(),
                                amount: fee.amount,
                                paidDate: fee.paidDate || getAutoDate(0),
                                paymentMethod: fee.paymentMethod || "UPI / Online",
                              };
                              if (onViewReceipt) {
                                onViewReceipt(receiptData);
                              } else {
                                printReceipt(receiptData);
                              }
                            }}
                            className="btn secondary text-xs font-bold py-1.5 px-2.5 gap-1 inline-flex items-center shadow-xs"
                            title="Preview & Print Voucher"
                          >
                            <Printer size={16} /> {language === "kn" ? "ವೀಕ್ಷಿಸಿ / ಪ್ರಿಂಟ್" : language === "hi" ? "देखें / प्रिंट" : "View / Print"}
                          </button>
                          <button
                            onClick={() => {
                              const receiptData: ReceiptData = {
                                receiptNumber: fee.receiptNumber || generateAutoReceiptNumber(101),
                                studentName: fee.studentName,
                                roll: student.roll,
                                classGrade: fee.classGrade,
                                month: fee.month || getCurrentFeeMonth(),
                                amount: fee.amount,
                                paidDate: fee.paidDate || getAutoDate(0),
                                paymentMethod: fee.paymentMethod || "UPI / Online",
                              };
                              downloadReceiptFile(receiptData);
                              onToast(language === "kn" ? `ರಸೀದಿ ${receiptData.receiptNumber} ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!` : language === "hi" ? `रसीद ${receiptData.receiptNumber} डाउनलोड की गई!` : `Downloaded Receipt ${receiptData.receiptNumber}!`);
                            }}
                            className="btn primary text-xs font-bold py-1.5 px-2.5 gap-1 inline-flex items-center shadow-xs"
                            title="Download Receipt Document"
                          >
                            <Download size={16} /> {language === "kn" ? "ಡೌನ್‌ಲೋಡ್" : language === "hi" ? "डाउनलोड" : "Download (.html)"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-rose-600 font-semibold">{language === "kn" ? "ಶುಲ್ಕ ಬಾಕಿ ಇದೆ" : language === "hi" ? "भुगतान देय" : "Payment Due"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeesManagementTab({
  onToast,
  onViewReceipt,
}: {
  onToast: (msg: string) => void;
  onViewReceipt?: (data: ReceiptData) => void;
}) {
  const { t, language } = useLanguage();
  const fees = DataStore.getFees();
  const students = DataStore.getStudents();
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
  const [classFilter, setClassFilter] = useState("all");

  const pendingCount = fees.filter((f) => f.status === "Pending").length;
  const totalPendingAmt = fees
    .filter((f) => f.status === "Pending")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredFees = fees.filter((f) => {
    const matchesStatus = filter === "all" ? true : filter === "pending" ? f.status === "Pending" : f.status === "Paid";
    const matchesClass = classFilter === "all" ? true : f.classGrade === classFilter;
    return matchesStatus && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Admin Security Banner */}
      <div className="rounded-2xl border border-amber-200 bg-[#fffaf0] p-5 shadow-xs">
        <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
          <Shield size={16} /> {language === "kn" ? "ಗೌಪ್ಯ ಹಣಕಾಸು ಲೆಡ್ಜರ್ (ಅಡ್ಮಿನ್ ಮಾತ್ರ)" : language === "hi" ? "गोपनीय वित्तीय लेज़र (केवल व्यवस्थापक)" : "Confidential Financial Ledger (Admin Exclusive)"}
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          {language === "kn"
            ? "ಟ್ಯೂಷನ್ ಶುಲ್ಕ ಸಂಗ್ರಹಣೆ, ಆನ್‌ಲೈನ್/ನಗದು ರಸೀದಿಗಳನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ಪೋಷಕರಿಗೆ ಸ್ವಯಂಚಾಲಿತ SMS ಜ್ಞಾಪನೆಗಳನ್ನು ಕಳುಹಿಸಿ."
            : language === "hi"
            ? "ट्यूशन फीस संग्रह लागू करें, ऑनलाइन/नकद रसीदें रिकॉर्ड करें, और अभिभावकों को स्वचालित एसएमएस अनुस्मारक भेजें।"
            : "Enforce tuition fee collection, record online/cash receipts, and send automated SMS reminders to parents."}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 bg-white border shadow-xs">
          <div className="text-xs font-bold uppercase text-slate-400">
            {language === "kn" ? "ಒಟ್ಟು ಬಾಕಿ ಶುಲ್ಕ" : language === "hi" ? "कुल लंबित बकाया" : "Total Pending Dues"}
          </div>
          <div className="text-3xl font-black text-rose-600 mt-1">₹{totalPendingAmt.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">
            {pendingCount} {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಖಾತೆಗಳು ಬಾಕಿ" : language === "hi" ? "छात्र खाते लंबित" : "student accounts pending"}
          </div>
        </div>
        <div className="card p-4 bg-white border shadow-xs">
          <div className="text-xs font-bold uppercase text-slate-400">
            {language === "kn" ? "ಸಂಗ್ರಹಿಸಲಾದ ಒಟ್ಟು ಶುಲ್ಕ" : language === "hi" ? "कुल एकत्रित शुल्क" : "Total Fees Collected"}
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            ₹{fees.filter((f) => f.status === "Paid").reduce((acc, c) => acc + c.amount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-emerald-600 font-bold mt-1">
            {language === "kn" ? "ಸೆಪ್ಟೆಂಬರ್ ತ್ರೈಮಾಸಿಕ" : language === "hi" ? "सितंबर तिमाही" : "September Quarter"}
          </div>
        </div>
        <div className="card p-4 bg-white border shadow-xs flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              {language === "kn" ? "ಫಿಲ್ಟರ್ ಮಾಡಿ" : language === "hi" ? "फ़िल्टर लेज़र" : "Filter Ledger"}
            </span>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs font-bold outline-none focus:border-navy bg-white"
            >
              <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ತರಗತಿಗಳು" : language === "hi" ? "सभी कक्षाएं" : "All Classes"}</option>
              <option value="Class 8">{language === "kn" ? "ತರಗತಿ 8" : language === "hi" ? "कक्षा 8" : "Class 8"}</option>
              <option value="Class 9">{language === "kn" ? "ತರಗತಿ 9" : language === "hi" ? "कक्षा 9" : "Class 9"}</option>
              <option value="Class 10">{language === "kn" ? "ತರಗತಿ 10" : language === "hi" ? "कक्षा 10" : "Class 10"}</option>
            </select>
          </div>
          <div className="flex gap-1.5 mt-1">
            {(["all", "pending", "paid"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize ${
                  filter === f ? "bg-navy text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {f === "all" ? (language === "kn" ? "ಎಲ್ಲವೂ" : language === "hi" ? "सभी" : "All") : f === "pending" ? (language === "kn" ? "ಬಾಕಿ" : language === "hi" ? "लंबित" : "Pending") : (language === "kn" ? "ಪಾವತಿಸಿದ" : language === "hi" ? "भुगतान" : "Paid")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table of Fees */}
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-black text-navy text-base">
            {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಶುಲ್ಕ ದಾಖಲೆಗಳು" : language === "hi" ? "छात्र शुल्क रिकॉर्ड" : "Student Fee Records"}
          </h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {filteredFees.length} {language === "kn" ? "ದಾಖಲೆಗಳು" : language === "hi" ? "रिकॉर्ड" : "records"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-3.5">{language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು" : language === "hi" ? "छात्र का नाम" : "Student"}</th>
                <th className="p-3.5">{language === "kn" ? "ತರಗತಿ" : language === "hi" ? "कक्षा" : "Class"}</th>
                <th className="p-3.5">{language === "kn" ? "ತಿಂಗಳು" : language === "hi" ? "माह" : "Month"}</th>
                <th className="p-3.5">{language === "kn" ? "ಮೊತ್ತ" : language === "hi" ? "राशि" : "Amount"}</th>
                <th className="p-3.5">{language === "kn" ? "ಸ್ಥಿತಿ" : language === "hi" ? "स्थिति" : "Status"}</th>
                <th className="p-3.5">{language === "kn" ? "ರಸೀದಿ ಸಂಖ್ಯೆ" : language === "hi" ? "रसीद नं" : "Receipt No"}</th>
                <th className="p-3.5 text-right">{language === "kn" ? "ಕ್ರಮಗಳು" : language === "hi" ? "कार्रवाई" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFees.map((fee) => {
                const std = students.find((s) => s.name === fee.studentName);
                return (
                  <tr key={fee.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-bold text-navy">{fee.studentName}</td>
                    <td className="p-3.5 font-semibold text-slate-600">{fee.classGrade}</td>
                    <td className="p-3.5 font-semibold text-slate-600">{fee.month}</td>
                    <td className="p-3.5 font-black text-slate-800">₹{fee.amount.toLocaleString()}</td>
                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          fee.status === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {fee.status === "Paid" ? (language === "kn" ? "ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "भुगतान किया" : "Paid") : (language === "kn" ? "ಬಾಕಿ" : language === "hi" ? "लंबित" : "Pending")}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{fee.receiptNumber || "-"}</td>
                    <td className="p-3.5 text-right">
                      {fee.status === "Paid" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              const receiptData: ReceiptData = {
                                receiptNumber: fee.receiptNumber || generateAutoReceiptNumber(102),
                                studentName: fee.studentName,
                                roll: std?.roll || "ROLL-102",
                                classGrade: fee.classGrade,
                                month: fee.month || getCurrentFeeMonth(),
                                amount: fee.amount,
                                paidDate: fee.paidDate || getAutoDate(0),
                                paymentMethod: fee.paymentMethod || "UPI / Online",
                              };
                              if (onViewReceipt) onViewReceipt(receiptData);
                              else printReceipt(receiptData);
                            }}
                            className="btn secondary text-xs font-bold py-1.5 px-2.5 gap-1 inline-flex items-center shadow-xs"
                          >
                            <Printer size={15} /> {language === "kn" ? "ರಸೀದಿ" : language === "hi" ? "रसीद" : "Receipt"}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            DataStore.markFeePaid(fee.id, generateAutoReceiptNumber(100 + fee.id.length));
                            onToast(
                              language === "kn"
                                ? `${fee.studentName} ಅವರ ಶುಲ್ಕ ಪಾವತಿಸಲಾಗಿದೆ!`
                                : language === "hi"
                                ? `${fee.studentName} का शुल्क प्राप्त हुआ!`
                                : `Marked fee as paid for ${fee.studentName}!`
                            );
                          }}
                          className="btn primary text-xs font-bold py-1.5 px-2.5 shadow-xs"
                        >
                          {language === "kn" ? "ಪಾವತಿ ದಾಖಲಿಸಿ" : language === "hi" ? "भुगतान दर्ज करें" : "Mark Paid"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// 9. DOUBTS TAB (PUBLIC COMMUNITY KNOWLEDGE BASE & TEACHER SOLUTIONS)
// =============================================================
function DoubtsTab({
  role,
  session,
  onToast,
}: {
  role: "student" | "teacher" | "admin";
  session: UserSession;
  onToast: (msg: string) => void;
}) {
  const { t, language } = useLanguage();
  const doubts = DataStore.getDoubts();
  const allTeachers = DataStore.getTeachers();
  const [subject, setSubject] = useState("Mathematics");
  const [teacherName, setTeacherName] = useState("Mr. Rohan Sharma");
  const [question, setQuestion] = useState("");
  const [replyText, setReplyText] = useState<{ [id: string]: string }>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; url: string; size: string } | null>(null);
  const [translatedDoubts, setTranslatedDoubts] = useState<Record<string, { kn?: string; hi?: string }>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filterScope, setFilterScope] = useState<"all" | "my" | "resolved" | "pending">("all");
  const [doubtSubjectFilter, setDoubtSubjectFilter] = useState<string>("all");
  const [searchDoubt, setSearchDoubt] = useState<string>("");
  const [isAiDoubtModalOpen, setIsAiDoubtModalOpen] = useState(false);

  // Filter teachers matching the selected subject
  const filteredTeachers = useMemo(() => {
    const matched = allTeachers.filter((t) => {
      const tSub = t.subject.toLowerCase();
      const selSub = subject.toLowerCase();
      if (selSub.includes("math") && tSub.includes("math")) return true;
      if ((selSub.includes("science") || selSub.includes("physics")) && (tSub.includes("science") || tSub.includes("physics"))) return true;
      if (selSub.includes("english") && tSub.includes("english")) return true;
      if (selSub.includes("social") && tSub.includes("social")) return true;
      return tSub.includes(selSub) || selSub.includes(tSub);
    });
    if (matched.length > 0) return matched;
    // Fallbacks
    if (subject === "Mathematics") return [{ id: "tch-02", name: "Mr. Rohan Sharma", subject: "Mathematics" }];
    if (subject === "Science & Physics") return [{ id: "tch-01", name: "Ms. Ananya Rao", subject: "Science & Physics" }];
    if (subject === "English Grammar") return [{ id: "tch-03", name: "Mrs. Priya Deshmukh", subject: "English & Grammar" }];
    if (subject === "Social Studies") return [{ id: "tch-04", name: "Mr. Anand Kumar", subject: "Social Studies" }];
    return allTeachers;
  }, [allTeachers, subject]);

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    const matched = allTeachers.filter((t) => {
      const tSub = t.subject.toLowerCase();
      const selSub = newSubject.toLowerCase();
      if (selSub.includes("math") && tSub.includes("math")) return true;
      if ((selSub.includes("science") || selSub.includes("physics")) && (tSub.includes("science") || tSub.includes("physics"))) return true;
      if (selSub.includes("english") && tSub.includes("english")) return true;
      if (selSub.includes("social") && tSub.includes("social")) return true;
      return false;
    });
    if (matched.length > 0) {
      setTeacherName(matched[0].name);
    } else {
      if (newSubject === "Mathematics") setTeacherName("Mr. Rohan Sharma");
      else if (newSubject === "Science & Physics") setTeacherName("Ms. Ananya Rao");
      else if (newSubject === "English Grammar") setTeacherName("Mrs. Priya Deshmukh");
      else if (newSubject === "Social Studies") setTeacherName("Mr. Anand Kumar");
    }
  };

  const handleTranslateDoubt = async (id: string, text: string) => {
    const target = language === "en" ? "kn" : (language as "kn" | "hi");
    setTranslatingId(id);
    try {
      const res = await translateText(text, target);
      setTranslatedDoubts((prev) => ({
        ...prev,
        [id]: { ...(prev[id] || {}), [target]: res },
      }));
    } catch {
      onToast("Translation error");
    } finally {
      setTranslatingId(null);
    }
  };

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  // File Upload with Security Validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onToast(
        language === "kn"
          ? "ಫೈಲ್ 5MB ಮಿತಿಯನ್ನು ಮೀರಿದೆ. ದಯವಿಟ್ಟು ಸಣ್ಣ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
          : language === "hi"
          ? "फ़ाइल 5MB की सीमा से अधिक है। कृपया एक छोटी फ़ाइल अपलोड करें।"
          : "File exceeds 5MB limit. Please upload a smaller image/document."
      );
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      onToast(
        language === "kn"
          ? "ಅಮಾನ್ಯ ಫೈಲ್ ಮಾದರಿ. JPG, PNG, WEBP ಮತ್ತು PDF ಫೈಲ್‌ಗಳು ಮಾತ್ರ ಅನುಮತಿಸಲಾಗಿದೆ."
          : language === "hi"
          ? "अमान्य फ़ाइल प्रकार। केवल JPG, PNG, WEBP और PDF फ़ाइलों की अनुमति है।"
          : "Invalid file type. Only JPG, PNG, WEBP and PDF files are permitted."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      setAttachment({
        name: file.name,
        url: result,
        size: sizeMb,
      });
      onToast(
        language === "kn"
          ? `ಲಗತ್ತಿಸಲಾಗಿದೆ: ${file.name}`
          : language === "hi"
          ? `संलग्न: ${file.name}`
          : `Attached: ${file.name}`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      onToast(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಅನುಮಾನವನ್ನು ವಿವರಿಸಿ."
          : language === "hi"
          ? "कृपया अपनी शंका का वर्णन करें।"
          : "Please describe your academic doubt."
      );
      return;
    }

    DataStore.addDoubt({
      studentId: session.studentId || "std-101",
      studentName: session.name,
      subject,
      question: question.trim(),
      teacherName,
      attachmentName: attachment?.name,
      attachmentUrl: attachment?.url,
      attachmentSize: attachment?.size,
    });

    setQuestion("");
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onToast(
      language === "kn"
        ? "ನಿಮ್ಮ ಅನುಮಾನವನ್ನು ಶಿಕ್ಷಕರಿಗೆ ಸಲ್ಲಿಸಲಾಗಿದೆ!"
        : language === "hi"
        ? "आपकी शंका शिक्षक को भेज दी गई है!"
        : "Your doubt has been submitted to your teacher!"
    );
  };

  const handleReply = (doubtId: string) => {
    const answer = replyText[doubtId];
    if (!answer || !answer.trim()) {
      onToast(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ವಿವರಣೆ ಅಥವಾ ಪರಿಹಾರವನ್ನು ಬರೆಯಿರಿ."
          : language === "hi"
          ? "कृपया स्पष्टीकरण या समाधान लिखें।"
          : "Please write a resolution or explanation."
      );
      return;
    }

    DataStore.replyDoubt(doubtId, answer.trim(), session.name);
    setReplyText({ ...replyText, [doubtId]: "" });
    onToast(
      language === "kn"
        ? "ಅನುಮಾನವನ್ನು ಬಗೆಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ!"
        : language === "hi"
        ? "शंका का समाधान कर दिया गया है!"
        : "Doubt marked as resolved! Student notified."
    );
  };

  const visibleDoubts = useMemo(() => {
    return doubts.filter((d) => {
      // Scope filter
      if (filterScope === "my") {
        const isMy = d.studentName === session.name || d.studentId === session.studentId;
        if (!isMy) return false;
      } else if (filterScope === "resolved") {
        if (d.status !== "Resolved") return false;
      } else if (filterScope === "pending") {
        if (d.status !== "Pending") return false;
      }

      // Subject filter
      if (doubtSubjectFilter !== "all" && d.subject !== doubtSubjectFilter) {
        return false;
      }

      // Search query
      if (searchDoubt.trim()) {
        const q = searchDoubt.toLowerCase();
        const matchQ = d.question.toLowerCase().includes(q);
        const matchSub = d.subject.toLowerCase().includes(q);
        const matchStd = d.studentName.toLowerCase().includes(q);
        const matchAns = d.response?.toLowerCase().includes(q);
        if (!matchQ && !matchSub && !matchStd && !matchAns) return false;
      }

      return true;
    });
  }, [doubts, filterScope, doubtSubjectFilter, searchDoubt, session]);

  const myDoubtsCount = doubts.filter((d) => d.studentName === session.name || d.studentId === session.studentId).length;
  const resolvedCount = doubts.filter((d) => d.status === "Resolved").length;
  const pendingCount = doubts.filter((d) => d.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* AI Multimodal Doubt Solver Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40 shrink-0">
            <Sparkles size={22} className="animate-pulse text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                {language === "kn" ? "AI ಫೋಟೋ ಸಂದೇಹ ಪರಿಹಾರಕ" : language === "hi" ? "AI फोटो डाउट सॉल्वर" : "AI Photo Doubt Solver"}
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/40">
                Gemini Vision 2.5
              </span>
            </div>
            <p className="text-xs text-indigo-200/90 mt-1 max-w-xl leading-relaxed">
              {language === "kn"
                ? "ಗಣಿತದ ಸಮೀಕರಣ, ವಿಜ್ಞಾನದ ರೇಖಾಚಿತ್ರ ಅಥವಾ ಪಠ್ಯಪುಸ್ತಕದ ಪ್ರಶ್ನೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ. ಹಂತ-ಹಂತದ NCERT ವಿವರಣೆಯನ್ನು ತಕ್ಷಣ ಪಡೆಯಿರಿ."
                : language === "hi"
                ? "गणित के सूत्र, विज्ञान के चित्र या पाठ्यपुस्तक के प्रश्न की फोटो लें और चरणबद्ध NCERT समाधान तुरंत प्राप्त करें।"
                : "Snap or upload handwritten math problems, science diagrams, and textbook exercises for instant step-by-step NCERT derivations & tips."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsAiDoubtModalOpen(true)}
          className="px-6 py-3 rounded-xl font-black text-xs bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Sparkles size={16} className="text-slate-950 fill-slate-950" />
          <span>{language === "kn" ? "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಪರಿಹರಿಸಿ" : language === "hi" ? "फोटो से हल करें" : "Solve With AI Photo"}</span>
        </button>
      </div>

      {/* Student Question Submission Card */}
      {role === "student" && (
        <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
          <div className="border-b pb-3">
            <h2 className="text-lg font-black text-navy flex items-center gap-2">
              <MessageCircleQuestion size={20} className="text-gold" />
              {language === "kn" ? "ನಿಮ್ಮ ವಿಷಯ ಶಿಕ್ಷಕರಿಗೆ ಅನುಮಾನವನ್ನು ಕೇಳಿ" : language === "hi" ? "अपने शिक्षक से विषय संबंधी शंका पूछें" : "Ask a Subject Doubt to Your Teacher"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "kn"
                ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು ರೇಖಾಚಿತ್ರ ಅಥವಾ ಹೋಂವರ್ಕ್ ಫೋಟೋಗಳನ್ನು ಲಗತ್ತಿಸಿ. ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಮತ್ತು ಶಿಕ್ಷಕರ ಪರಿಹಾರವು ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೂ ಸಹಾಯ ಮಾಡುತ್ತದೆ."
                : language === "hi"
                ? "अपना प्रश्न टाइप करें और हस्तलिखित चित्र या होमवर्क फ़ोटो संलग्न करें। आपका प्रश्न और समाधान अन्य छात्रों की भी मदद करेगा।"
                : "Type your question and attach diagrams or photos. Your query & teacher's answer will also be publicly accessible to help fellow classmates."}
            </p>
          </div>

          <form onSubmit={handleAskDoubt} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">{language === "kn" ? "ವಿಷಯ" : language === "hi" ? "विषय" : "Subject"}</label>
                <select
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-navy bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science & Physics">Science & Physics</option>
                  <option value="English Grammar">English Grammar</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">{language === "kn" ? "ನಿಯೋಜಿತ ಶಿಕ್ಷಕರು" : language === "hi" ? "आवंटित शिक्षक" : "Assigned Faculty"}</label>
                <select
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-navy bg-white"
                >
                  {filteredTeachers.map((tch) => (
                    <option key={tch.id || tch.name} value={tch.name}>
                      {tch.name} ({getLocalizedSubject(tch.subject)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">{language === "kn" ? "ಅನುಮಾನದ ವಿವರ" : language === "hi" ? "शंका का विवरण" : "Doubt Description"}</label>
              <textarea
                rows={3}
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-navy"
                placeholder={
                  language === "kn"
                    ? "ನಿಮಗೆ ಸಹಾಯ ಬೇಕಾದ ನಿರ್ದಿಷ್ಟ ಪ್ರಮೇಯ, ಸಮೀಕರಣ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ವಿವರಿಸಿ..."
                    : language === "hi"
                    ? "जिस प्रमेय, समीकरण या प्रश्न में आपको सहायता चाहिए, उसका विवरण दें..."
                    : "Explain what specific theorem, equation, or exercise question you need help with..."
                }
              />
            </div>

            {/* File Attachment Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn secondary text-xs font-bold gap-1.5 px-3 py-2"
                >
                  <Paperclip size={16} /> {language === "kn" ? "ಫೋಟೋ / PDF ಲಗತ್ತಿಸಿ (ಗರಿಷ್ಠ 5MB)" : language === "hi" ? "फ़ोटो / PDF संलग्न करें (अधिकतम 5MB)" : "Attach Photo / PDF (Max 5MB)"}
                </button>

                {attachment && (
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-gold/30 px-3 py-1.5 text-xs font-bold text-navy">
                    <ImageIcon size={16} className="text-gold" />
                    <span className="max-w-xs truncate">{attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachment(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="btn primary text-xs font-bold gap-1.5 px-5 py-2.5">
                <Send size={16} /> {language === "kn" ? "ಅನುಮಾನ ಸಲ್ಲಿಸಿ" : language === "hi" ? "शंका भेजें" : "Submit Doubt"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Doubts List / Public Knowledge Base */}
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 mb-1">
              <Users size={13} /> {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಪ್ರಶ್ನೋತ್ತರ ವೇದಿಕೆ" : language === "hi" ? "सार्वजनिक प्रश्नोत्तरी मंच" : "Public Knowledge Base for All Students"}
            </div>
            <h3 className="font-black text-navy text-lg sm:text-xl">
              {language === "kn"
                ? "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳ ಅನುಮಾನಗಳು & ಶಿಕ್ಷಕರ ಪರಿಹಾರಗಳು"
                : language === "hi"
                ? "सार्वजनिक शंकाएं और शिक्षक समाधान"
                : "Community Doubts & Teacher Solutions"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "kn"
                ? "ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳು ಕೇಳಿದ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಶಿಕ್ಷಕರ ಅಧಿಕೃತ ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ ಕಲಿಯಿರಿ."
                : language === "hi"
                ? "अन्य छात्रों द्वारा पूछे गए प्रश्न और शिक्षकों के समाधान देखकर अपनी समझ को मजबूत करें।"
                : "All student queries and verified solutions are publicly shared so you can learn from common doubts and peer questions."}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 shrink-0 self-start md:self-auto">
            {visibleDoubts.length} {language === "kn" ? "ಪ್ರಶ್ನೆಗಳು" : language === "hi" ? "शंकाएं" : "Visible Queries"}
          </span>
        </div>

        {/* Filter Toolbar: Scope Tabs, Subject Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterScope("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterScope === "all"
                  ? "bg-navy text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {language === "kn" ? "ಎಲ್ಲಾ ಅನುಮಾನಗಳು" : language === "hi" ? "सभी शंकाएं" : "All Public"} ({doubts.length})
            </button>

            {role === "student" && (
              <button
                type="button"
                onClick={() => setFilterScope("my")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterScope === "my"
                    ? "bg-[#8a5d12] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {language === "kn" ? "ನನ್ನ ಪ್ರಶ್ನೆಗಳು" : language === "hi" ? "मेरी शंकाएं" : "My Questions"} ({myDoubtsCount})
              </button>
            )}

            <button
              type="button"
              onClick={() => setFilterScope("resolved")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                filterScope === "resolved"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <CheckCircle2 size={13} />
              {language === "kn" ? "ಪರಿಹರಿಸಲಾಗಿದೆ" : language === "hi" ? "समाधान हुआ" : "Solved"} ({resolvedCount})
            </button>

            <button
              type="button"
              onClick={() => setFilterScope("pending")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                filterScope === "pending"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Clock size={13} />
              {language === "kn" ? "ಬಾಕಿ ಇದೆ" : language === "hi" ? "लंबित" : "Pending"} ({pendingCount})
            </button>
          </div>

          {/* Right Filters: Subject Select & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <select
              value={doubtSubjectFilter}
              onChange={(e) => setDoubtSubjectFilter(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-navy outline-none focus:border-navy"
            >
              <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ವಿಷಯಗಳು" : language === "hi" ? "सभी विषय" : "All Subjects"}</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science & Physics">Science & Physics</option>
              <option value="English Grammar">English Grammar</option>
              <option value="Social Studies">Social Studies</option>
            </select>

            <div className="relative w-full sm:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchDoubt}
                onChange={(e) => setSearchDoubt(e.target.value)}
                placeholder={language === "kn" ? "ಪ್ರಶ್ನೆ ಹುಡುಕಿ..." : language === "hi" ? "शंका खोजें..." : "Search queries..."}
                className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs outline-none focus:border-navy"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {visibleDoubts.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              {language === "kn"
                ? "ಈ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಅನುಮಾನಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
                : language === "hi"
                ? "इस फ़िल्टर के लिए कोई शंका नहीं मिली।"
                : "No doubts found matching your criteria."}
            </div>
          ) : (
            visibleDoubts.map((dbt) => {
              const isMyQuestion = dbt.studentName === session.name || dbt.studentId === session.studentId;
              return (
                <div
                  key={dbt.id}
                  className={`rounded-2xl border p-5 space-y-3 transition ${
                    isMyQuestion
                      ? "border-amber-300 bg-amber-50/20 shadow-xs"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-navy text-sm">{dbt.studentName}</span>
                      {isMyQuestion && (
                        <span className="rounded-md bg-gold/15 text-[#8a5d12] border border-gold/40 px-2 py-0.5 text-[11px] font-extrabold">
                          {language === "kn" ? "ನನ್ನ ಪ್ರಶ್ನೆ (You)" : language === "hi" ? "आपकी शंका (You)" : "You"}
                        </span>
                      )}
                      <span className="rounded-md bg-white border px-2 py-0.5 text-xs font-bold text-slate-600">
                        {getLocalizedSubject(dbt.subject)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{dbt.createdAt}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase ${
                          dbt.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {dbt.status === "Resolved"
                          ? (language === "kn" ? "ಪರಿಹರಿಸಲಾಗಿದೆ" : language === "hi" ? "समाधान हुआ" : "Resolved")
                          : (language === "kn" ? "ಬಾಕಿ ಇದೆ" : language === "hi" ? "लंबित" : "Pending")}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {dbt.question}
                    </p>

                    {/* Translated question if available */}
                    {translatedDoubts[dbt.id]?.[language === "en" ? "kn" : (language as "kn" | "hi")] && (
                      <div className="rounded-lg bg-amber-50/70 border border-gold/30 p-2.5 text-xs text-navy font-medium">
                        <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Sparkles size={11} />
                          {language === "kn" ? "ಕನ್ನಡ ಅನುವಾದ (LibreTranslate)" : language === "hi" ? "हिन्दी अनुवाद (LibreTranslate)" : "Kannada Translation"}
                        </div>
                        {translatedDoubts[dbt.id]?.[language === "en" ? "kn" : (language as "kn" | "hi")]}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleTranslateDoubt(dbt.id, dbt.question)}
                        disabled={translatingId === dbt.id}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-gold hover:text-navy transition"
                      >
                        {translatingId === dbt.id ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            <span>Translating...</span>
                          </>
                        ) : (
                          <>
                            <Languages size={12} />
                            <span>
                              {language === "kn"
                                ? "ಕನ್ನಡಕ್ಕೆ ಅನುವಾದಿಸಿ"
                                : language === "hi"
                                ? "हिन्दी में अनुवाद करें"
                                : "Translate to Kannada / Hindi"}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Attached File Preview Button */}
                  {(dbt.attachmentUrl || dbt.attachmentName) && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (dbt.attachmentUrl) {
                            setPreviewImage(dbt.attachmentUrl);
                          } else {
                            onToast(`Attachment file: ${dbt.attachmentName}`);
                          }
                        }}
                        className="rounded-xl border border-gold/40 bg-amber-50 px-3 py-1.5 text-xs font-bold text-navy hover:bg-amber-100 transition inline-flex items-center gap-1.5"
                      >
                        <ImageIcon size={16} className="text-gold" />
                        {language === "kn" ? "ಲಗತ್ತನ್ನು ವೀಕ್ಷಿಸಿ:" : language === "hi" ? "संलग्नक देखें:" : "View Attachment:"} {dbt.attachmentName || "Attached Image"}
                      </button>
                    </div>
                  )}

                  {/* Teacher's Response */}
                  {dbt.response ? (
                    <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 size={16} /> {language === "kn" ? "ಶಿಕ್ಷಕರ ಪರಿಹಾರ" : language === "hi" ? "शिक्षक का समाधान" : "Teacher's Solution"} ({dbt.teacherName})
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{dbt.response}</p>
                      {dbt.resolvedAt && (
                        <div className="text-xs text-emerald-600">
                          {language === "kn" ? "ಪರಿಹರಿಸಿದ ಸಮಯ:" : language === "hi" ? "समाधान समय:" : "Resolved at"} {dbt.resolvedAt}
                        </div>
                      )}
                    </div>
                  ) : (
                    (role === "teacher" || role === "admin") && (
                      <div className="space-y-2 border-t border-slate-200 pt-3">
                        <label className="text-sm font-bold text-slate-700">
                          {language === "kn" ? "ಪರಿಹಾರ / ವಿವರಣೆಯನ್ನು ಬರೆಯಿರಿ" : language === "hi" ? "समाधान / स्पष्टीकरण लिखें" : "Write Explanation / Solution"}
                        </label>
                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            value={replyText[dbt.id] || ""}
                            onChange={(e) => setReplyText({ ...replyText, [dbt.id]: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-navy bg-white"
                            placeholder={language === "kn" ? "ಹಂತ-ಹಂತದ ಪರಿಹಾರವನ್ನು ಟೈಪ್ ಮಾಡಿ..." : language === "hi" ? "चरण-दर-चरण समाधान लिखें..." : "Type step-by-step solution..."}
                          />
                          <button
                            onClick={() => handleReply(dbt.id)}
                            className="btn primary text-xs font-bold px-4 self-end py-2"
                          >
                            {language === "kn" ? "ಪರಿಹರಿಸಿ" : language === "hi" ? "समाधान दें" : "Resolve"}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal: Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="card max-w-2xl w-full bg-white p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-navy">
                {language === "kn" ? "ಲಗತ್ತು ಪೂರ್ವವೀಕ್ಷಣೆ" : language === "hi" ? "संलग्नक पूर्वावलोकन" : "Attachment Preview"}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative max-h-[70vh] overflow-auto flex justify-center bg-slate-900 rounded-xl p-2">
              <img src={previewImage} alt="Attachment" className="max-h-[65vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* AI Doubt Solver Modal */}
      {isAiDoubtModalOpen && (
        <AIDoubtSolverModal
          isOpen={isAiDoubtModalOpen}
          onClose={() => setIsAiDoubtModalOpen(false)}
          session={session}
          onToast={onToast}
          initialSubject={subject}
        />
      )}
    </div>
  );
}


// =============================================================
// 10. STUDENTS TAB (Admin & Teacher Views - No Fees for Teacher)
// =============================================================
function StudentsTab({
  role,
  onToast,
}: {
  role: Role;
  onToast: (msg: string) => void;
}) {
  const { t, language } = useLanguage();
  const students = DataStore.getStudents();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase());
    const matchesClass = classFilter === "all" || s.class === classFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">{t("menu.students", "Students Directory")}</h2>
            <p className="text-xs text-slate-500">
              {role === "admin"
                ? (language === "kn" ? "ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರೊಫೈಲ್‌ಗಳು, ಬ್ಯಾಚ್‌ಗಳು ಮತ್ತು ಶುಲ್ಕ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ." : language === "hi" ? "नामांकित छात्र प्रोफाइल, बैच, अभिभावक संपर्क और शुल्क रजिस्टर प्रबंधित करें।" : "Manage enrolled student profiles, batches, parent contacts, and fee registers.")
                : (language === "kn" ? "ನಿಮ್ಮ ನಿಯೋಜಿತ ಶೈಕ್ಷಣಿಕ ಬ್ಯಾಚ್‌ಗಳ ವಿದ್ಯಾರ್ಥಿಗಳ ವಿವರ." : language === "hi" ? "आपके आवंटित शैक्षणिक बैचों के छात्रों की निर्देशिका।" : "Directory of enrolled students across your assigned academic batches.")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಹುಡುಕಿ..." : language === "hi" ? "छात्र खोजें..." : "Search students..."}
                className="rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs outline-none focus:border-navy focus:bg-white"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold outline-none focus:border-navy focus:bg-white"
            >
              <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ತರಗತಿಗಳು" : language === "hi" ? "सभी कक्षाएं" : "All Classes"}</option>
              <option value="Class 8">{language === "kn" ? "ತರಗತಿ 8" : language === "hi" ? "कक्षा 8" : "Class 8"}</option>
              <option value="Class 9">{language === "kn" ? "ತರಗತಿ 9" : language === "hi" ? "कक्षा 9" : "Class 9"}</option>
              <option value="Class 10">{language === "kn" ? "ತರಗತಿ 10" : language === "hi" ? "कक्षा 10" : "Class 10"}</option>
            </select>

            {role === "admin" && (
              <button
                onClick={() =>
                  setEditingStudent({
                    id: "",
                    roll: "",
                    name: "",
                    class: "Class 10",
                    phone: "+91 ",
                    email: "",
                    parentName: "",
                    parentPhone: "+91 ",
                    joinedDate: new Date().toISOString().split("T")[0],
                    feeAmount: 2000,
                    feeStatus: "Paid",
                    pendingAmount: 0,
                  })
                }
                className="btn primary text-xs font-bold gap-1.5 px-3.5 py-2"
              >
                <Plus size={16} /> {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಸೇರಿಸಿ" : language === "hi" ? "छात्र जोड़ें" : "Add Student"}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="border-b bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-3.5">{language === "kn" ? "ರೋಲ್ ನಂ" : language === "hi" ? "रोल नंबर" : "Roll No"}</th>
                <th className="p-3.5">{language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು" : language === "hi" ? "छात्र का नाम" : "Student Name"}</th>
                <th className="p-3.5">{language === "kn" ? "ತರಗತಿ/ಬ್ಯಾಚ್" : language === "hi" ? "कक्षा/बैच" : "Class/Batch"}</th>
                <th className="p-3.5">{language === "kn" ? "ಪೋಷಕರ ಸಂಪರ್ಕ" : language === "hi" ? "अभिभावक संपर्क" : "Parent Contact"}</th>
                {role === "admin" && <th className="p-3.5">{language === "kn" ? "ಶುಲ್ಕ ಸ್ಥಿತಿ" : language === "hi" ? "शुल्क स्थिति" : "Fee Status"}</th>}
                {role === "admin" && <th className="p-3.5 text-right">{language === "kn" ? "ಕ್ರಮಗಳು" : language === "hi" ? "कार्रवाई" : "Actions"}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-gold">{std.roll}</td>
                  <td className="p-3.5 font-bold text-navy">{std.name}</td>
                  <td className="p-3.5 text-slate-600">{std.class}</td>
                  <td className="p-3.5 text-slate-500">
                    {std.parentName} ({std.parentPhone})
                  </td>
                  {role === "admin" && (
                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                          std.feeStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {std.feeStatus === "Paid" ? (language === "kn" ? "ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "भुगतान किया" : "Paid") : (language === "kn" ? "ಬಾಕಿ" : language === "hi" ? "लंबित" : "Pending")}
                      </span>
                    </td>
                  )}
                  {role === "admin" && (
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditingStudent(std)}
                        className="rounded-md border p-1 text-slate-500 hover:text-navy hover:border-navy"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          DataStore.deleteStudent(std.id);
                          onToast(language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಅಳಿಸಲಾಗಿದೆ." : language === "hi" ? "छात्र प्रोफ़ाइल हटाई गई।" : "Student profile deleted.");
                        }}
                        className="rounded-md border p-1 text-rose-500 hover:bg-rose-50 hover:border-rose-300"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Student Modal (Admin Only) */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-lg w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {editingStudent.id
                  ? (language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ" : language === "hi" ? "छात्र प्रोफ़ाइल संपादित करें" : "Edit Student Profile")
                  : (language === "kn" ? "ಹೊಸ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ನೋಂದಾಯಿಸಿ" : language === "hi" ? "नया छात्र पंजीकृत करें" : "Register New Student")}
              </h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಪೂರ್ಣ ಹೆಸರು" : language === "hi" ? "पूरा नाम" : "Full Name"}</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ತರಗತಿ/ಬ್ಯಾಚ್" : language === "hi" ? "कक्षा/बैच" : "Class/Batch"}</label>
                  <select
                    value={editingStudent.class}
                    onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy bg-white font-semibold"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಪೋಷಕರ ಹೆಸರು" : language === "hi" ? "अभिभावक का नाम" : "Parent Name"}</label>
                  <input
                    type="text"
                    value={editingStudent.parentName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಪೋಷಕರ ಫೋನ್" : language === "hi" ? "अभिभावक का फ़ोन" : "Parent Phone"}</label>
                  <input
                    type="text"
                    value={editingStudent.parentPhone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಮಾಸಿಕ ಶುಲ್ಕ (₹)" : language === "hi" ? "मासिक शुल्क (₹)" : "Monthly Fee (₹)"}</label>
                  <input
                    type="number"
                    min={0}
                    value={editingStudent.feeAmount}
                    onChange={(e) => setEditingStudent({ ...editingStudent, feeAmount: Number(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಶುಲ್ಕ ಸ್ಥಿತಿ" : language === "hi" ? "शुल्क स्थिति" : "Fee Status"}</label>
                  <select
                    value={editingStudent.feeStatus}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        feeStatus: e.target.value as any,
                        pendingAmount: e.target.value === "Paid" ? 0 : editingStudent.feeAmount,
                      })
                    }
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy bg-white font-bold"
                  >
                    <option value="Paid">{language === "kn" ? "ಪಾವತಿಸಲಾಗಿದೆ" : language === "hi" ? "भुगतान किया" : "Paid"}</option>
                    <option value="Pending">{language === "kn" ? "ಬಾಕಿ" : language === "hi" ? "लंबित" : "Pending"}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                onClick={() => setEditingStudent(null)}
                className="btn secondary text-xs px-3 py-2 font-bold"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (editingStudent.id) {
                    DataStore.updateStudent(editingStudent.id, editingStudent);
                    onToast(language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ!" : language === "hi" ? "छात्र प्रोफ़ाइल अपडेट की गई!" : "Student profile updated!");
                  } else {
                    DataStore.addStudent(editingStudent);
                    onToast(language === "kn" ? "ಹೊಸ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ನೋಂದಾಯಿಸಲಾಗಿದೆ!" : language === "hi" ? "नया छात्र पंजीकृत किया गया!" : "New student registered!");
                  }
                  setEditingStudent(null);
                }}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಉಳಿಸಿ" : language === "hi" ? "सहेजें" : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// 11. TEACHERS TAB (Admin View)
// =============================================================
function TeachersTab({ onToast }: { onToast: (msg: string) => void }) {
  const { language } = useLanguage();
  const teachers = DataStore.getTeachers();
  const [editingTeacher, setEditingTeacher] = useState<TeacherRecord | null>(null);

  const getLocalizedSubject = (subj: string) => {
    if (language === "kn") {
      if (subj.includes("Math")) return "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ (Science & Physics)";
      if (subj.includes("English")) return "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ (English Grammar)";
      if (subj.includes("Social")) return "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)";
    } else if (language === "hi") {
      if (subj.includes("Math")) return "गणित (Mathematics)";
      if (subj.includes("Science") || subj.includes("Physics")) return "विज्ञान & भौतिकी (Science & Physics)";
      if (subj.includes("English")) return "अंग्रेज़ी व्याकरण (English Grammar)";
      if (subj.includes("Social")) return "सामाजिक अध्ययन (Social Studies)";
    }
    return subj;
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-navy">
              {language === "kn" ? "ಬೋಧಕ ಸಿಬ್ಬಂದಿ ನಿರ್ವಹಣೆ" : language === "hi" ? "संकाय और शिक्षक प्रबंधन" : "Faculty & Teacher Management"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn" ? "ಶಿಕ್ಷಕರ ಪ್ರೊಫೈಲ್‌ಗಳು, ವಿಷಯ ವಿಶೇಷತೆ ಮತ್ತು ಬ್ಯಾಚ್ ನಿಯೋಜನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ." : language === "hi" ? "शिक्षक प्रोफाइल, विषय विशेषज्ञता और बैच आवंटन प्रबंधित करें।" : "Manage tutor profiles, subject specialization, and batch assignments."}
            </p>
          </div>

          <button
            onClick={() =>
              setEditingTeacher({
                id: "",
                name: "",
                subject: "Mathematics",
                assignedClasses: ["Class 10"],
                phone: "+91 ",
                email: "",
                qualification: "M.Sc., B.Ed",
                joinedDate: new Date().toISOString().split("T")[0],
              })
            }
            className="btn primary text-xs font-bold gap-1.5 px-3.5 py-2"
          >
            <Plus size={16} /> {language === "kn" ? "ಹೊಸ ಶಿಕ್ಷಕರನ್ನು ಸೇರಿಸಿ" : language === "hi" ? "नया शिक्षक जोड़ें" : "Add Faculty Member"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teachers.map((tch) => (
            <div
              key={tch.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 hover:border-gold transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-navy text-base">{tch.name}</h3>
                  <div className="text-xs text-gold font-bold">{getLocalizedSubject(tch.subject)}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingTeacher(tch)}
                    className="rounded-md border p-1 text-slate-500 hover:text-navy hover:border-navy"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      DataStore.deleteTeacher(tch.id);
                      onToast(language === "kn" ? "ಶಿಕ್ಷಕರ ದಾಖಲೆ ಅಳಿಸಲಾಗಿದೆ." : language === "hi" ? "शिक्षक रिकॉर्ड हटाया गया।" : "Teacher record deleted.");
                    }}
                    className="rounded-md border p-1 text-rose-500 hover:bg-rose-50 hover:border-rose-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>🎓 {language === "kn" ? "ವಿದ್ಯಾರ್ಹತೆ:" : language === "hi" ? "योग्यता:" : "Qualification:"} <span className="font-semibold text-slate-800">{tch.qualification}</span></div>
                <div>📞 {language === "kn" ? "ಫೋನ್:" : language === "hi" ? "फ़ोन:" : "Phone:"} <span className="font-semibold text-slate-800">{tch.phone}</span></div>
                <div>✉️ {language === "kn" ? "ಇಮೇಲ್:" : language === "hi" ? "ईमेल:" : "Email:"} <span className="font-semibold text-slate-800">{tch.email}</span></div>
                <div>📚 {language === "kn" ? "ಬ್ಯಾಚ್‌ಗಳು:" : language === "hi" ? "बैच:" : "Batches:"} <span className="font-semibold text-navy">{tch.assignedClasses.join(", ")}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-w-lg w-full bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-navy">
                {editingTeacher.id
                  ? (language === "kn" ? "ಶಿಕ್ಷಕರ ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ" : language === "hi" ? "शिक्षक प्रोफ़ाइल संपादित करें" : "Edit Faculty Profile")
                  : (language === "kn" ? "ಹೊಸ ಶಿಕ್ಷಕರನ್ನು ಸೇರಿಸಿ" : language === "hi" ? "नया शिक्षक जोड़ें" : "Add Faculty Member")}
              </h3>
              <button
                onClick={() => setEditingTeacher(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಶಿಕ್ಷಕರ ಹೆಸರು" : language === "hi" ? "शिक्षक का नाम" : "Teacher Name"}</label>
                  <input
                    type="text"
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ವಿಷಯ" : language === "hi" ? "विषय" : "Subject"}</label>
                  <input
                    type="text"
                    value={editingTeacher.subject}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ವಿದ್ಯಾರ್ಹತೆ" : language === "hi" ? "योग्यता" : "Qualification"}</label>
                  <input
                    type="text"
                    value={editingTeacher.qualification}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">{language === "kn" ? "ಫೋನ್" : language === "hi" ? "फ़ोन" : "Phone"}</label>
                  <input
                    type="text"
                    value={editingTeacher.phone}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">{language === "kn" ? "ಇಮೇಲ್ ವಿಳಾಸ" : language === "hi" ? "ईमेल पता" : "Email Address"}</label>
                <input
                  type="email"
                  value={editingTeacher.email}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-2.5 outline-none focus:border-navy"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">{language === "kn" ? "ನಿಯೋಜಿತ ತರಗತಿಗಳು" : language === "hi" ? "आवंटित कक्षाएं" : "Assigned Classes"}</label>
                <div className="flex gap-4 mt-2">
                  {(["Class 8", "Class 9", "Class 10"] as const).map((cls) => {
                    const isChecked = editingTeacher.assignedClasses?.includes(cls);
                    return (
                      <label key={cls} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const current = editingTeacher.assignedClasses || [];
                            const updated = e.target.checked
                              ? [...current, cls]
                              : current.filter((c) => c !== cls);
                            setEditingTeacher({ ...editingTeacher, assignedClasses: updated });
                          }}
                          className="rounded text-navy focus:ring-navy"
                        />
                        {cls}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                onClick={() => setEditingTeacher(null)}
                className="btn secondary text-xs px-3 py-2 font-bold"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "ರद्द करें" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (editingTeacher.id) {
                    DataStore.updateTeacher(editingTeacher.id, editingTeacher);
                    onToast(language === "kn" ? "ಶಿಕ್ಷಕರ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ!" : language === "hi" ? "शिक्षक प्रोफ़ाइल अपडेट की गई!" : "Faculty profile updated!");
                  } else {
                    DataStore.addTeacher(editingTeacher);
                    onToast(language === "kn" ? "ಹೊಸ ಶಿಕ್ಷಕರನ್ನು ಸೇರಿಸಲಾಗಿದೆ!" : language === "hi" ? "नया शिक्षक जोड़ा गया!" : "New faculty member added!");
                  }
                  setEditingTeacher(null);
                }}
                className="btn primary text-xs px-4 py-2 font-bold"
              >
                {language === "kn" ? "ಉಳಿಸಿ" : language === "hi" ? "सहेजें" : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
