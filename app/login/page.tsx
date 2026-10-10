"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  Sparkles,
  AlertCircle,
  UserPlus,
  LogIn,
  CheckCircle2,
  Clock,
  Lock,
  GraduationCap,
  BookOpen,
  Shield,
} from "lucide-react";
import { Role } from "@/lib/dataStore";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Mode: Sign In vs Sign Up
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<Role>("student");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Class 10");
  const [subject, setSubject] = useState("Science & Mathematics");
  const [qualification, setQualification] = useState("M.Sc. / B.Ed. Faculty");
  const [adminSecret, setAdminSecret] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPendingNotice, setIsPendingNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleNames = {
    student: t("login.role.student", "Student"),
    teacher: t("login.role.teacher", "Teacher"),
    admin: t("login.role.admin", "Admin"),
  };

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setError("");
    setSuccessMessage("");
    setIsPendingNotice(false);
  };

  // Sign In Handler
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setIsPendingNotice(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsLoading(false);
        if (data.isPending) {
          setIsPendingNotice(true);
        }
        setError(data.error || "Authentication failed.");
        return;
      }

      // Save session to localStorage and navigate to portal
      localStorage.setItem("ttc_session", JSON.stringify(data.session));
      router.push("/portal");
    } catch (err: any) {
      setIsLoading(false);
      setError("Network error. Could not connect to authentication server.");
    }
  }

  // Sign Up Handler
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setIsPendingNotice(false);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          grade,
          subject,
          qualification,
          phone,
          adminSecret,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create account.");
        return;
      }

      if (data.user.status === "pending" || role === "teacher") {
        setIsPendingNotice(true);
        setSuccessMessage(data.message);
        // Reset password field
        setPassword("");
      } else {
        setSuccessMessage(data.message);
        // Switch to Sign In after brief delay
        setTimeout(() => {
          setAuthMode("signin");
        }, 1200);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("Network error. Could not complete registration.");
    }
  }

  return (
    <main className="gradient min-h-screen py-6 sm:py-10 px-4 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-6 sm:gap-10 md:grid-cols-2">
        {/* Mobile Header Link */}
        <div className="md:hidden flex items-center justify-between col-span-1">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition">
            <ArrowLeft size={16} /> {t("nav.back", "Back to Home")}
          </Link>
          <LanguageSelector />
        </div>

        {/* Left Column: Hero Banner */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition">
              <ArrowLeft size={18} /> {t("nav.back", "Back to Home")}
            </Link>
            <LanguageSelector />
          </div>

          <div className="relative mx-auto mt-4 w-48 h-48 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Talent Tuition Center Logo"
              width={190}
              height={190}
              priority
              className="w-44 h-44 rounded-full shadow-2xl border-4 border-gold p-1 bg-white ring-8 ring-gold/20 object-contain mx-auto transition duration-300 hover:scale-105"
            />
          </div>

          <h1 className="mt-5 text-center font-display text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {t("brand.name", "Talent Tuition Center")}
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
            Academic portal for Class 8, 9 & 10 students, teachers, and center administrators.
          </p>

          {/* Authorization Policy Info Box */}
          <div className="mt-6 rounded-2xl border-2 border-gold/40 bg-white/90 p-5 shadow-sm backdrop-blur space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-gold uppercase tracking-widest">
              <ShieldCheck size={16} /> Access Control Policy
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
              <li className="flex items-start gap-2">
                <GraduationCap size={15} className="text-navy shrink-0 mt-0.5" />
                <span><strong>Students:</strong> Instant account registration for timetable & results.</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen size={15} className="text-gold shrink-0 mt-0.5" />
                <span><strong>Teachers:</strong> Requires Admin authorization before login access is granted.</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Admins:</strong> Protected center administration controls.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="card border-2 border-slate-200/90 bg-white/95 p-5 sm:p-8 md:p-10 shadow-xl sm:shadow-2xl backdrop-blur space-y-4 sm:space-y-5">
          <div className="md:hidden flex justify-center mb-1">
            <Image
              src="/logo.png"
              alt="Talent Tuition Center Logo"
              width={72}
              height={72}
              className="w-16 h-16 rounded-full shadow-md border-2 border-gold p-0.5 bg-white ring-4 ring-gold/20 object-contain"
            />
          </div>

          {/* Top Mode Tabs: Sign In vs Sign Up */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setError("");
                setSuccessMessage("");
                setIsPendingNotice(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-extrabold transition ${
                authMode === "signin"
                  ? "bg-navy text-white shadow-md shadow-navy/20"
                  : "text-slate-600 hover:text-navy hover:bg-white/60"
              }`}
            >
              <LogIn size={16} /> Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setError("");
                setSuccessMessage("");
                setIsPendingNotice(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-extrabold transition ${
                authMode === "signup"
                  ? "bg-navy text-white shadow-md shadow-navy/20"
                  : "text-slate-600 hover:text-navy hover:bg-white/60"
              }`}
            >
              <UserPlus size={16} /> Sign Up
            </button>
          </div>

          {/* Role Selector Tabs */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Your Role:
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 rounded-xl bg-slate-50 p-1.5 border border-slate-200">
              {(["student", "teacher", "admin"] as Role[]).map((r) => {
                const isSelected = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`rounded-lg py-2 text-xs font-bold transition ${
                      isSelected
                        ? "bg-gold text-navy font-black shadow-sm"
                        : "text-slate-600 hover:text-navy hover:bg-white"
                    }`}
                  >
                    {roleNames[r]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Teacher Authorization Notice */}
          {role === "teacher" && (
            <div className="rounded-xl bg-amber-50/80 p-3 border border-gold/40 text-xs text-amber-900 flex items-start gap-2.5">
              <Clock size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Teacher Authorization Policy:</span>
                <p className="mt-0.5 text-[11px] text-slate-600 leading-tight">
                  Teacher account registrations require Admin authorization. Once registered, an Admin must grant approval before you can log in.
                </p>
              </div>
            </div>
          )}

          {/* Google Sign In Component */}
          <div className="pt-1">
            <GoogleLoginButton
              currentRole={role}
              onSuccess={() => router.push("/portal")}
              onError={(msg) => setError(msg)}
            />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute bg-white px-3 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {authMode === "signin" ? "or sign in with email" : "or register with email"}
            </span>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Pending Approval Warning Box */}
          {isPendingNotice && (
            <div className="rounded-2xl bg-amber-50 p-4 border-2 border-gold/60 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-black text-gold text-sm uppercase tracking-wider">
                <Clock size={18} /> Account Pending Admin Approval
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                Your teacher account has been registered in the database, but access is pending Admin authorization.
              </p>
              <div className="bg-white/80 rounded-xl p-2.5 text-[11px] text-slate-600 font-semibold border border-gold/30">
                💡 <strong>Admin Note:</strong> Log in as an Administrator (`admin@talent.org`) to grant approval in the Admin Workflow Dashboard.
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && !isPendingNotice && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ==================== SIGN IN FORM ==================== */}
          {authMode === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/10"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-xs sm:text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn primary w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-lg shadow-navy/20 gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In as ({roleNames[role]}) <ShieldCheck size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ==================== SIGN UP FORM ==================== */}
          {authMode === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none transition focus:border-navy"
                  placeholder="e.g. Aarav Sharma / Ms. Ananya Rao"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none transition focus:border-navy"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Password * (Min 6 chars)
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-10 text-xs sm:text-sm outline-none transition focus:border-navy"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Student specific field */}
              {role === "student" && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Grade / Class Batch *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-navy font-semibold"
                  >
                    <option value="Class 10">Class 10 (Board Exam Preparation)</option>
                    <option value="Class 9">Class 9 (Foundation Batch)</option>
                    <option value="Class 8">Class 8 (Foundation Batch)</option>
                  </select>
                </div>
              )}

              {/* Teacher specific fields */}
              {role === "teacher" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Subject Specialization *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-navy"
                        placeholder="e.g. Science & Physics"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Qualification *
                      </label>
                      <input
                        type="text"
                        required
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-navy"
                        placeholder="e.g. M.Sc. Physics"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Admin Passcode */}
              {role === "admin" && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Admin Passcode Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-navy font-mono"
                    placeholder="Enter Admin Passcode Key (e.g. TTC-ADMIN-2026)"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn primary w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-lg shadow-navy/20 gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Register Account as ({roleNames[role]}) <UserPlus size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-[10px] sm:text-[11px] text-slate-400 gap-1">
            <span className="flex items-center gap-1">
              <UserCheck size={13} className="text-emerald-500" /> Database Connected Session Guard
            </span>
            <span>Talent Tuition Center © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
