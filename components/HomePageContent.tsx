"use client";

import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  HelpCircle,
  LogIn,
  MapPin,
  MessageCircleQuestion,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";

export function HomePageContent() {
  const { t, language } = useLanguage();

  const programs = [
    {
      title: t("home.programs.p1Title", "Class 10 Board Exam Mastery"),
      grade: t("home.programs.p1Grade", "Class 10 (CBSE & State Board)"),
      subjects: t("home.programs.p1Subjects", "Mathematics, Physics, Chemistry, English"),
      features: [
        t("home.programs.p1F1", "In-depth NCERT coverage & textbook solutions"),
        t("home.programs.p1F2", "Previous 5-year board question paper drills"),
        t("home.programs.p1F3", "Weekly unit assessments & formula revision"),
        t("home.programs.p1F4", "Targeted board exam time-management training"),
      ],
      badge: t("home.programs.p1Badge", "High Priority Batch"),
      time: t("home.programs.p1Time", "4:00 PM – 6:15 PM Daily"),
    },
    {
      title: t("home.programs.p2Title", "Class 9 Foundation & Concept Building"),
      grade: t("home.programs.p2Grade", "Class 9 Foundation"),
      subjects: t("home.programs.p2Subjects", "Mathematics, Science, English Grammar, Social Studies"),
      features: [
        t("home.programs.p2F1", "Strong foundation in algebra and physical sciences"),
        t("home.programs.p2F2", "Interactive diagrams, lab concepts & numericals"),
        t("home.programs.p2F3", "Grammar rules, essay writing & comprehension"),
        t("home.programs.p2F4", "Step-by-step homework & doubt solving"),
      ],
      badge: t("home.programs.p2Badge", "Foundation Program"),
      time: t("home.programs.p2Time", "6:30 PM – 8:30 PM Daily"),
    },
    {
      title: t("home.programs.p3Title", "Class 8 Foundation & Skill Building"),
      grade: t("home.programs.p3Grade", "Class 8 Foundation"),
      subjects: t("home.programs.p3Subjects", "Mathematics, Science, English Grammar, Social Studies"),
      features: [
        t("home.programs.p3F1", "Core fundamentals in rational algebra & physical sciences"),
        t("home.programs.p3F2", "Interactive lab concepts, diagrams & formula basics"),
        t("home.programs.p3F3", "Grammar essentials, vocabulary & comprehension reading"),
        t("home.programs.p3F4", "Daily doubt clearing & weekly assessment drills"),
      ],
      badge: t("home.programs.p3Badge", "Junior Foundation"),
      time: t("home.programs.p3Time", "3:30 PM – 5:30 PM Daily"),
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: t("home.benefits.b1Title", "Focused Small Batches"),
      desc: t("home.benefits.b1Desc", "Limited batch sizes ensure every student receives individualized attention and teacher mentorship."),
    },
    {
      icon: TrendingUp,
      title: t("home.benefits.b2Title", "Continuous Progress Tracking"),
      desc: t("home.benefits.b2Desc", "Regular monthly tests and weekly quizzes with immediate grading and personalized feedback."),
    },
    {
      icon: MessageCircleQuestion,
      title: t("home.benefits.b3Title", "Interactive Doubt Solving"),
      desc: t("home.benefits.b3Desc", "Ask academic questions in class or upload textbook photo doubts to get verified teacher solutions."),
    },
    {
      icon: ClipboardCheck,
      title: t("home.benefits.b4Title", "Live Attendance & Accountability"),
      desc: t("home.benefits.b4Desc", "Daily attendance logs help students maintain consistent learning discipline throughout the academic year."),
    },
    {
      icon: ShieldCheck,
      title: t("home.benefits.b5Title", "Transparent Fee System"),
      desc: t("home.benefits.b5Desc", "Instant digital payment confirmation and computer-generated downloadable receipts for parents."),
    },
    {
      icon: GraduationCap,
      title: t("home.benefits.b6Title", "Experienced Faculty"),
      desc: t("home.benefits.b6Desc", "Subject-specialist teachers with over 8+ years of dedicated teaching experience in secondary curricula."),
    },
  ];

  const sampleSchedule = [
    {
      time: t("home.schedule.b1Time", "3:30 PM – 4:30 PM"),
      subject: t("home.schedule.b1Sub", "Science (Basics of Physics & Chemistry)"),
      class: t("home.schedule.b1Class", "Class 8"),
      room: t("home.schedule.b1Room", "Science Lab"),
    },
    {
      time: t("home.schedule.b2Time", "4:00 PM – 5:00 PM"),
      subject: t("home.schedule.b2Sub", "Mathematics (Algebra & Quadratics)"),
      class: t("home.schedule.b2Class", "Class 10"),
      room: t("home.schedule.b2Room", "Room 101"),
    },
    {
      time: t("home.schedule.b3Time", "5:15 PM – 6:15 PM"),
      subject: t("home.schedule.b3Sub", "Science & Physics (Optics & Ray Diagrams)"),
      class: t("home.schedule.b3Class", "Class 10"),
      room: t("home.schedule.b3Room", "Science Lab"),
    },
    {
      time: t("home.schedule.b4Time", "6:30 PM – 7:30 PM"),
      subject: t("home.schedule.b4Sub", "English Grammar (Tenses & Reported Speech)"),
      class: t("home.schedule.b4Class", "Class 9"),
      room: t("home.schedule.b4Room", "Room 102"),
    },
  ];

  const faqs = [
    {
      q: language === "kn" 
        ? "ಟ್ಯಾಲೆಂಟ್ ಟ್ಯೂಷನ್ ಸೆಂಟರ್ ಯಾವ ತರಗತಿಗಳಿಗೆ ಬೋಧನೆ ಮಾಡುತ್ತದೆ?" 
        : language === "hi" 
        ? "टैलेंट ट्यूशन सेंटर किन कक्षाओं के लिए पढ़ाता है?" 
        : "Which classes does Talent Tuition Center teach?",
      a: language === "kn"
        ? "ಟ್ಯಾಲೆಂಟ್ ಟ್ಯೂಷನ್ ಸೆಂಟರ್ ತರಗತಿ 8, ತರಗತಿ 9 ಮತ್ತು ತರಗತಿ 10 (CBSE ಮತ್ತು ರಾಜ್ಯ ಮಂಡಳಿ) ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿಶೇಷ ಸಂರಚಿತ ಕೋಚಿಂಗ್ ನೀಡುತ್ತದೆ."
        : language === "hi"
        ? "टैलेंट ट्यूशन सेंटर विशेष रूप से कक्षा 8, कक्षा 9 और कक्षा 10 (CBSE और राज्य बोर्ड) के छात्रों के लिए संरचित कोचिंग प्रदान करता है।"
        : "Talent Tuition Center specializes in secondary school education, currently offering structured coaching for Class 8, Class 9 and Class 10 (CBSE and State Board curricula).",
    },
    {
      q: language === "kn" 
        ? "ಯಾವ ವಿಷಯಗಳು ಲಭ್ಯವಿವೆ?" 
        : language === "hi" 
        ? "कौन से विषय उपलब्ध हैं?" 
        : "Which subjects are available?",
      a: language === "kn"
        ? "ನಾವು ಗಣಿತ (ಬೀಜಗಣಿತ, ರೇಖಾಗಣಿತ, ತ್ರಿಕೋನಮಿತಿ), ವಿಜ್ಞಾನ (ಭೌತಶಾಸ್ತ್ರ, ರಸಾಯನಶಾಸ್ತ್ರ, ಜೀವಶಾಸ್ತ್ರ), ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ ಮತ್ತು ಸಮಾಜ ವಿಜ್ಞಾನವನ್ನು ಬೋಧಿಸುತ್ತೇವೆ."
        : language === "hi"
        ? "हम गणित (बीजगणित, ज्यामिति, त्रिकोणमिति), विज्ञान (भौतिकी, रसायन विज्ञान, जीव विज्ञान), अंग्रेज़ी व्याकरण और सामाजिक अध्ययन पढ़ाते हैं।"
        : "We offer comprehensive instruction in Mathematics (Algebra, Geometry, Trigonometry), Science (Physics, Chemistry, Biology), English Grammar & Composition, and Social Studies.",
    },
    {
      q: language === "kn"
        ? "ವಿದ್ಯಾರ್ಥಿ ಪ್ರವೇಶ ಪಡೆಯುವುದು ಹೇಗೆ?"
        : language === "hi"
        ? "छात्र प्रवेश कैसे ले सकते हैं?"
        : "How can a student join?",
      a: language === "kn"
        ? "ನಮ್ಮ ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ಆನ್‌ಲೈನ್ ವಿಚಾರಣೆ ಸಲ್ಲಿಸಬಹುದು, ಸಹಾಯವಾಣಿ +91 98860 12345 ಗೆ ಕರೆ ಮಾಡಬಹುದು ಅಥವಾ ಸಂಜೆ 3:30 ರಿಂದ 8:30 ರವರೆಗೆ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಬಹುದು."
        : language === "hi"
        ? "आप हमारे संपर्क पृष्ठ के माध्यम से ऑनलाइन पूछताछ सबमिट कर सकते हैं, हेल्पलाइन +91 98860 12345 पर कॉल कर सकते हैं, या शाम 3:30 से 8:30 के बीच केंद्र पर आ सकते हैं।"
        : "You can submit an online enquiry via our Contact page, call our center helpline at +91 98860 12345, or visit our coaching center during afternoon hours (3:30 PM – 8:30 PM) for batch registration.",
    },
    {
      q: language === "kn"
        ? "ಪೋಷಕರು ಶುಲ್ಕದ ಸ್ಥಿತಿಯನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸಬಹುದು?"
        : language === "hi"
        ? "अभिभावक शुल्क की स्थिति कैसे देख सकते हैं?"
        : "How can parents check fee status?",
      a: language === "kn"
        ? "ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡುವ ಮೂಲಕ ಬಾಕಿ ಶುಲ್ಕ, ಪಾವತಿ ಇತಿಹಾಸ ಮತ್ತು ಅಧಿಕೃತ PDF ರಸೀದಿಗಳನ್ನು ಸುಲಭವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು."
        : language === "hi"
        ? "छात्र पोर्टल में लॉग इन करके बकाया शुल्क, भुगतान इतिहास देख सकते हैं और आधिकारिक PDF रसीदें डाउनलोड कर सकते हैं।"
        : "Students and parents can log into the student portal anytime to check pending dues, view payment history, and download official PDF receipts. Center administration manages billing securely.",
    },
    {
      q: language === "kn"
        ? "ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು ಮತ್ತು ಪ್ರಗತಿ ವರದಿಗಳು ಸಿಗುತ್ತವೆಯೇ?"
        : language === "hi"
        ? "क्या छात्रों को नियमित परीक्षा परिणाम और रिपोर्ट मिलती है?"
        : "Do students receive test results and performance reports?",
      a: language === "kn"
        ? "ಹೌದು. ಪ್ರತಿಯೊಂದು ಪರೀಕ್ಷೆಯ ಅಂಕಗಳು, ಶ್ರೇಣಿಗಳು ಮತ್ತು ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿಗಳನ್ನು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತಕ್ಷಣ ನವೀಕರಿಸಲಾಗುತ್ತದೆ."
        : language === "hi"
        ? "हाँ। प्रत्येक परीक्षा के अंक, ग्रेड और शिक्षकों की टिप्पणियाँ पोर्टल पर तुरंत अपडेट की जाती हैं।"
        : "Yes. Every assessment score, subject average, and letter grade (A+, A, B, C) is recorded in the student portal, allowing parents to track academic improvements week-by-week.",
    },
    {
      q: language === "kn"
        ? "ವಿದ್ಯಾರ್ಥಿಗಳು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಅನುಮಾನ ಪರಿಹರಿಸಿಕೊಳ್ಳಬಹುದೇ?"
        : language === "hi"
        ? "क्या छात्र ऑनलाइन शिक्षकों से शंकाएं पूछ सकते हैं?"
        : "Can students ask teachers questions online?",
      a: language === "kn"
        ? "ಖಂಡಿತ! ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ Doubts ವಿಭಾಗದ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ರಶ್ನೆಗಳ ಫೋಟೋ ಲಗತ್ತಿಸಿ ಶಿಕ್ಷಕರಿಂದ ಹಂತ-ಹಂತದ ಪರಿಹಾರ ಪಡೆಯಬಹುದು."
        : language === "hi"
        ? "बिल्कुल! पोर्टल में Doubts अनुभाग के माध्यम से छात्र प्रश्न की फोटो संलग्न कर सकते हैं और शिक्षकों से चरण-दर-चरण समाधान प्राप्त कर सकते हैं।"
        : "Yes! Our built-in Doubts module allows students to submit questions along with textbook photos or homework snapshots. Teachers reply with step-by-step written solutions.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800 flex flex-col selection:bg-gold/20 selection:text-navy">
      <PublicHeader />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f5ee]/80 via-white to-white py-10 sm:py-20 md:py-24 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headline & Value Proposition */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gold/15 border border-gold/40 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-black text-navy shadow-xs">
                  <Sparkles size={18} className="text-gold shrink-0" />
                  <span>{t("home.hero.badge", "Quality Academic Coaching • Class 8, 9 & 10")}</span>
                </div>

                {/* Primary SEO H1 */}
                <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-[1.15]">
                  {t("home.hero.title1", "Talent Tuition Center — ")}
                  <span className="text-[#8c6520]">{t("home.hero.titleHighlight", "Tuition Classes")}</span>
                  {t("home.hero.title2", " for Secondary Students")}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t("home.hero.desc", "Talent Tuition Center provides structured coaching in Mathematics, Science, English, and Social Studies. We combine concept-first classroom teaching with continuous test assessments, live doubt support, and student performance tracking.")}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <Link
                    href="/contact"
                    className="btn primary w-full sm:w-auto text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 sm:py-3.5 shadow-md shadow-navy/20 gap-2"
                  >
                    {t("home.hero.btnEnquire", "Enquire For Admission")} <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/classes"
                    className="btn secondary w-full sm:w-auto text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 sm:py-3.5"
                  >
                    {t("home.hero.btnPrograms", "View Programs & Schedule")}
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition px-2 py-1.5"
                  >
                    <LogIn size={18} /> {t("home.hero.btnLogin", "Student / Teacher Login →")}
                  </Link>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/80 text-center sm:text-left">
                  <div className="p-2 sm:p-0">
                    <div className="text-lg sm:text-2xl font-black text-navy">{t("home.hero.stat1Number", "Class 8, 9 & 10")}</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{t("home.hero.stat1Label", "Focused Batches")}</div>
                  </div>
                  <div className="p-2 sm:p-0">
                    <div className="text-lg sm:text-2xl font-black text-emerald-600">{t("home.hero.stat2Number", "Weekly Tests")}</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{t("home.hero.stat2Label", "Performance Tracking")}</div>
                  </div>
                  <div className="p-2 sm:p-0">
                    <div className="text-lg sm:text-2xl font-black text-gold">{t("home.hero.stat3Number", "1-on-1")}</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{t("home.hero.stat3Label", "Doubt Support")}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-gold/30 bg-gradient-to-b from-white to-[#f8f5ee] p-5 sm:p-8 shadow-xl sm:shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between border-b border-gold/20 pb-4 gap-2">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/logo.png"
                        alt="Talent Tuition Center logo"
                        width={56}
                        height={56}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gold shadow-md p-0.5 bg-white ring-2 sm:ring-4 ring-gold/25 shrink-0 object-contain"
                      />
                      <div>
                        <div className="text-sm sm:text-base font-black text-navy leading-tight">{t("brand.name", "Talent Tuition Center")}</div>
                        <div className="text-xs sm:text-sm font-bold text-gold uppercase tracking-wider">{t("brand.location", "Vidya Nagar, Bengaluru")}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold px-2.5 py-1 border border-emerald-300">
                      {t("home.card.badge", "Admissions Open")}
                    </span>
                  </div>

                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs">
                    <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="text-xs sm:text-sm font-bold text-gold uppercase tracking-wider">{t("home.card.teachTitle", "What We Teach")}</div>
                      <div className="font-bold text-navy text-sm sm:text-base">{t("home.card.teachHeading", "Comprehensive Secondary Syllabus")}</div>
                      <p className="text-slate-600 text-sm">{t("home.card.teachDesc", "Mathematics, Science (Physics & Chemistry), English Grammar, and Social Studies.")}</p>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider">{t("home.card.targetTitle", "Who It Is For")}</div>
                      <p className="text-slate-600 text-sm">{t("home.card.targetDesc", "Class 8, Class 9 and Class 10 students looking to strengthen conceptual understanding, excel in school examinations, and master board papers.")}</p>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl bg-navy text-white p-3.5 sm:p-4 shadow-sm flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gold uppercase">{t("home.card.portalTag", "Portal Enabled")}</div>
                        <div className="font-bold text-sm sm:text-base">{t("home.card.portalTitle", "Digital Receipts & Results")}</div>
                      </div>
                      <Link
                        href="/login"
                        className="rounded-xl bg-gold text-navy text-xs font-bold px-3 py-1.5 hover:bg-gold/90 transition shrink-0"
                      >
                        {t("home.card.signIn", "Sign In")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CLASSES & SUBJECT PROGRAMS */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gold">{t("home.programs.tag", "Tuition Programs")}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy">
                {t("home.programs.heading", "Structured Coaching Designed for Measurable Academic Growth")}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("home.programs.desc", "We organize our classes into structured batches aligned with official secondary school curricula.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-sm hover:shadow-md hover:border-gold/40 transition space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-50 border border-gold/30 px-3 py-1 text-xs font-bold text-gold">
                        {prog.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock size={18} className="text-gold" /> {prog.time}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-navy">{prog.title}</h3>
                    <div className="text-xs font-bold text-slate-700 bg-white border p-3 rounded-xl">
                      {t("home.programs.subjectsLabel", "📚 Subjects:")} <span className="text-navy font-semibold">{prog.subjects}</span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t("home.programs.highlightsLabel", "Program Highlights:")}</div>
                      {prog.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{prog.grade}</span>
                    <Link
                      href="/contact"
                      className="btn primary text-xs font-bold px-4 py-2 gap-1.5"
                    >
                      {t("home.programs.enquireBtn", "Enquire for this Batch")} <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SAMPLE CLASS SCHEDULE & TIMETABLE */}
        {/* ========================================================= */}
        <section className="py-16 bg-[#f8f5ee]/40 border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-gold">{t("home.schedule.tag", "Daily Schedule")}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
                  {t("home.schedule.heading", "Daily Class Timetable Overview")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {t("home.schedule.desc", "Classes run Monday through Saturday during evening hours to suit school schedules.")}
                </p>
              </div>

              <Link href="/classes" className="btn secondary text-xs font-bold self-start sm:self-auto px-4 py-2">
                {t("home.schedule.viewSyllabus", "Detailed Subject Syllabus →")}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sampleSchedule.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-navy px-2 py-0.5 text-[11px] font-bold text-gold">
                      {t("home.schedule.batch", "Batch")} #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{item.time}</span>
                  </div>
                  <div className="font-black text-navy text-sm">{item.subject}</div>
                  <div className="text-xs text-slate-600 flex justify-between border-t border-slate-100 pt-2.5">
                    <span>{t("home.schedule.target", "Target")}: {item.class}</span>
                    <span className="font-bold text-slate-700">{item.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. WHY CHOOSE TALENT TUITION CENTER */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gold">{t("home.benefits.tag", "Student & Parent Benefits")}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy">
                {t("home.benefits.heading", "Why Students & Parents Choose Talent Tuition Center")}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("home.benefits.desc", "We combine experienced in-person teaching with transparent digital academic tools.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-gold hover:shadow-md transition space-y-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f5ee] text-navy border border-gold/30">
                      <Icon size={32} className="text-gold" />
                    </div>
                    <h3 className="text-base font-black text-navy">{b.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 bg-[#f8f5ee]/40 border-b border-slate-200/70">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gold">{t("home.faq.tag", "Clear Answers")}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy">
                {t("home.faq.heading", "Frequently Asked Questions")}
              </h2>
              <p className="text-sm text-slate-600">
                {t("home.faq.desc", "Find answers to common questions regarding classes, admissions, assessments, fees, and doubts.")}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2"
                >
                  <h3 className="text-base font-black text-navy flex items-start gap-2.5">
                    <span className="text-gold font-mono font-bold">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link href="/faq" className="text-xs font-bold text-navy hover:text-gold hover:underline">
                {t("home.faq.viewAll", "Have more questions? View the complete FAQ page →")}
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. PHYSICAL LOCATION & CONTACT BANNER */}
        {/* ========================================================= */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-navy via-[#1e293b] to-navy p-8 sm:p-12 text-white shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
                    <MapPin size={18} /> {t("home.visit.tag", "Center Location & Helpdesk")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    {t("home.visit.heading", "Visit Talent Tuition Center")}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    {t("home.visit.desc", "Located in Vidya Nagar, Bengaluru. Parents and students are welcome to visit during evening coaching hours for course counseling and batch selection.")}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gold" />
                      <span>{t("home.visit.address", "42 Vidya Nagar, Main Road, Bengaluru - 560001")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-gold" />
                      <span>{t("home.visit.phone", "+91 98860 12345")}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="btn primary w-full justify-center py-3.5 text-xs font-bold text-center"
                  >
                    {t("home.visit.btnContact", "Contact Us & Enquire")}
                  </Link>
                  <Link
                    href="/login"
                    className="btn secondary w-full justify-center py-3 text-xs font-bold text-center text-white border-slate-600 hover:bg-white/10"
                  >
                    {t("home.visit.btnLogin", "Student / Teacher Login")}
                  </Link>
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
