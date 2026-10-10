"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Clock,
  Target,
  FileCheck,
} from "lucide-react";

export function AboutPageContent() {
  const { t, language } = useLanguage();

  const faculty = [
    {
      name: "Ms. Ananya Rao",
      role: language === "kn" ? "ವಿಜ್ಞಾನ & ಭೌತಶಾಸ್ತ್ರ ಮುಖ್ಯ ಶಿಕ್ಷಕರು" : language === "hi" ? "वरिष्ठ विज्ञान & भौतिकी शिक्षक" : "Senior Science & Physics Faculty",
      qualification: "M.Sc. Physics, B.Ed (10+ Years Experience)",
      bio: language === "kn"
        ? "ಆಪ್ಟಿಕ್ಸ್, ವಿದ್ಯುತ್ ಮತ್ತು ರಾಸಾಯನಿಕ ಸಮೀಕರಣಗಳನ್ನು ಸರಳ ದೃಶ್ಯ ವಿಧಾನಗಳ ಮೂಲಕ ಬೋಧಿಸುತ್ತಾರೆ."
        : language === "hi"
        ? "प्रकाशिकी, विद्युत और रासायनिक प्रतिक्रिया संतुलन में वैचारिक शिक्षण विशेषज्ञ।"
        : "Specializes in ray optics, electricity, and chemistry reaction balancing with conceptual visual aids.",
    },
    {
      name: "Mr. Rohan Sharma",
      role: language === "kn" ? "ಗಣಿತಶಾಸ್ತ್ರ ಮುಖ್ಯ ಶಿಕ್ಷಕರು" : language === "hi" ? "मुख्य गणित शिक्षक" : "Mathematics Lead Tutor",
      qualification: "M.Sc. Mathematics (8+ Years Experience)",
      bio: language === "kn"
        ? "ದ್ವಿಘಾತ ಸಮೀಕರಣಗಳು, ತ್ರಿಕೋನಮಿತಿ ಮತ್ತು ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಗಳ ಸುಲಭ ಪರಿಹಾರ ಪರಿಣಿತರು."
        : language === "hi"
        ? "द्विघात समीकरण, त्रिकोणमिति सूत्र, ज्यामिति प्रमेय और बोर्ड प्रश्न पत्रों के विशेषज्ञ।"
        : "Expert in quadratic algebra, trigonometry formulas, geometry theorems, and previous-year board questions.",
    },
    {
      name: "Mrs. Priya Deshmukh",
      role: language === "kn" ? "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ & ಸಾಹಿತ್ಯ ಬೋಧಕರು" : language === "hi" ? "अंग्रेज़ी व्याकरण & साहित्य शिक्षक" : "English Grammar & Composition Faculty",
      qualification: "M.A. English Literature (6+ Years Experience)",
      bio: language === "kn"
        ? "ವಾಕ್ಯ ರಚನೆ, ವರದಿ ಮಾತು, ಸಕ್ರಿಯ-ನಿಷ್ಕ್ರಿಯ ರೂಪ ಮತ್ತು ಪ್ರಬಂಧ ರಚನೆಯಲ್ಲಿ ತರಬೇತಿ ನೀಡುತ್ತಾರೆ."
        : language === "hi"
        ? "कठिन वाक्य संरचना, प्रत्यक्ष/अप्रत्यक्ष कथन और बोर्ड निबंध लेखन में दक्ष।"
        : "Focuses on rigorous sentence structures, reported speech, active/passive voice, and board essay composition.",
    },
    {
      name: "Mr. Anand Kumar",
      role: language === "kn" ? "ಸಮಾಜ ವಿಜ್ಞಾನ ತಜ್ಞರು" : language === "hi" ? "सामाजिक अध्ययन विशेषज्ञ" : "Social Studies Specialist",
      qualification: "M.A. History, B.Ed (9+ Years Experience)",
      bio: language === "kn"
        ? "ಇತಿಹಾಸದ ಕಾಲಾವಧಿ, ಭೂಗೋಳದ ನಕ್ಷೆ ಕಾರ್ಯ ಮತ್ತು ನಾಗರಿಕ ಶಾಸ್ತ್ರವನ್ನು ಆಸಕ್ತಿದಾಯಕವಾಗಿ ಕಲಿಸುತ್ತಾರೆ."
        : language === "hi"
        ? "इतिहास की समय रेखा, भूगोल मानचित्र कार्य और नागरिक शास्त्र अवधारणाओं को जीवंत बनाते हैं।"
        : "Brings history, geography map work, and civics concepts to life through timeline synthesis.",
    },
  ];

  const pillars = [
    {
      title: t("about.pillars.p1Title", "Concept-First Clarity"),
      desc: t("about.pillars.p1Desc", "Every chapter starts from foundational principles with real-world analogies, derivations, and interactive diagrams before solving advanced exercises."),
      icon: BookOpen,
    },
    {
      title: t("about.pillars.p2Title", "Continuous Evaluation"),
      desc: t("about.pillars.p2Desc", "Weekly unit quizzes and monthly comprehensive tests identify learning gaps early, allowing focused remedial guidance."),
      icon: Award,
    },
    {
      title: t("about.pillars.p3Title", "Dedicated Doubt Resolution"),
      desc: t("about.pillars.p3Desc", "Students never leave with unanswered questions. Both classroom discussions and digital portal doubt submissions ensure 100% clarity."),
      icon: Target,
    },
    {
      title: t("about.pillars.p4Title", "Parent & Student Transparency"),
      desc: t("about.pillars.p4Desc", "Real-time attendance logs, subject-wise scorecards, and verifiable digital fee receipts keep parents fully informed and confident."),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800 flex flex-col selection:bg-gold/20 selection:text-navy">
      <PublicHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-[#f8f5ee]/80 to-white py-16 sm:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1 text-xs font-black text-navy">
              <Sparkles size={18} className="text-gold" /> {t("about.header.tag", "Dedicated to Academic Excellence")}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-navy tracking-tight">
              {t("about.header.title", "About Talent Tuition Center")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("about.header.desc", "Empowering Class 8, Class 9, and Class 10 students with structured coaching, deep concept clarity, and individualized mentorship in Bengaluru.")}
            </p>
          </div>
        </section>

        {/* Mission & Methodology Section */}
        <section className="py-16 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <span className="text-xs font-black uppercase tracking-wider text-gold">{t("about.mission.tag", "Our Mission")}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy">
                  {t("about.mission.heading", "Building conceptual mastery, confidence, and exam excellence.")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t("about.mission.desc1", "At Talent Tuition Center, we believe true academic success is born from understanding fundamental concepts rather than rote memorization. Founded with a vision to provide rigorous, student-centered education, our coaching programs are tailored to the challenging syllabi of Class 8, Class 9, and Class 10.")}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t("about.mission.desc2", "With small, focused batches, experienced faculty, and seamless digital management for attendance, tests, and doubt clearing, we ensure every student achieves their fullest academic potential.")}
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    t("about.mission.stat1", "10+ Years of Academic Coaching Excellence"),
                    t("about.mission.stat2", "Structured CBSE & Karnataka State Board Syllabi"),
                    t("about.mission.stat3", "Consistent 98% Pass Rate with Distinction"),
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gold/30 bg-[#f8f5ee] p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold font-black text-lg">
                    TTC
                  </div>
                  <div>
                    <h3 className="font-black text-navy text-lg">{t("brand.name", "Talent Tuition Center")}</h3>
                    <p className="text-xs text-slate-500">{t("brand.location", "Vidya Nagar, Bengaluru")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-2xl font-black text-navy">100%</div>
                    <div className="text-xs text-slate-500 mt-1">Syllabus Covered</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-2xl font-black text-emerald-600">8+ Yrs</div>
                    <div className="text-xs text-slate-500 mt-1">Average Faculty Exp.</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-2xl font-black text-gold">Small</div>
                    <div className="text-xs text-slate-500 mt-1">Batch Sizes</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-2xl font-black text-navy">Weekly</div>
                    <div className="text-xs text-slate-500 mt-1">Tests & Quizzes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Teaching */}
        <section className="py-16 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gold">{t("about.pillars.tag", "Our Core Values")}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy">
                {t("about.pillars.heading", "Four Pillars of Our Teaching Methodology")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 shadow-xs hover:border-gold transition space-y-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f5ee] text-gold border border-gold/30">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-black text-navy text-lg">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="py-16 bg-[#f8f5ee]/40 border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gold">{t("about.faculty.tag", "Meet Our Educators")}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                {t("about.faculty.heading", "Experienced Subject Specialists")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {t("about.faculty.desc", "Our teachers are passionate educators with years of experience preparing secondary students for school assessments and board exams.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-gold transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white font-bold text-sm">
                      {f.name.charAt(0)}
                    </div>
                    <h3 className="font-black text-navy text-base">{f.name}</h3>
                    <div className="text-xs font-bold text-gold">{f.role}</div>
                    <div className="text-xs text-slate-500">{f.qualification}</div>
                    <p className="text-xs text-slate-600 pt-2 leading-relaxed">{f.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-white text-center">
          <div className="mx-auto max-w-3xl px-4 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              {language === "kn" 
                ? "ನಮ್ಮ ಬೋಧನಾ ವಿಧಾನವನ್ನು ತಿಳಿಯಲು ಬಯಸುವಿರಾ?" 
                : language === "hi" 
                ? "हमारी शिक्षण पद्धति का अनुभव करना चाहते हैं?" 
                : "Want to Experience Our Teaching Methodology?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              {language === "kn"
                ? "ಬ್ಯಾಚ್ ಸಮಯ ಮತ್ತು ಪ್ರವೇಶದ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಕೇಂದ್ರ ನಿರ್ವಾಹಕರನ್ನು ಮತ್ತು ಶಿಕ್ಷಕರನ್ನು ಭೇಟಿ ಮಾಡಿ."
                : language === "hi"
                ? "बैच समय और प्रवेश पर चर्चा करने के लिए हमारे केंद्र प्रशासक और शिक्षकों से मिलें।"
                : "Schedule a visit with our center administrator and faculty to discuss batch timings and admissions."}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="btn primary text-xs font-bold px-6 py-3">
                {t("home.hero.btnEnquire", "Enquire For Admission")} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
