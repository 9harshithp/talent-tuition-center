"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle, Sparkles, ArrowRight, MessageCircleQuestion } from "lucide-react";

export function FAQPageContent() {
  const { t, language } = useLanguage();

  const faqCategories = [
    {
      category: t("faq.cat1", "Admissions & Batch Structure"),
      items: [
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
            ? "ವಿದ್ಯಾರ್ಥಿ ಪ್ರವೇಶ ಪಡೆಯುವುದು ಅಥವಾ ನೋಂದಾಯಿಸುವುದು ಹೇಗೆ?"
            : language === "hi"
            ? "छात्र प्रवेश या पंजीकरण कैसे ले सकते हैं?"
            : "How can a student join or register?",
          a: language === "kn"
            ? "ಪೋಷಕರು ಅಥವಾ ವಿದ್ಯಾರ್ಥಿಗಳು ನಮ್ಮ ಸಂಪರ್ಕ ಪುಟದಲ್ಲಿ ಆನ್‌ಲೈನ್ ವಿಚಾರಣೆ ಸಲ್ಲಿಸಬಹುದು ಅಥವಾ ಸಂಜೆ 3:30 ರಿಂದ 8:30 ರವರೆಗೆ ನಮ್ಮ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಬಹುದು."
            : language === "hi"
            ? "अभिभावक या छात्र हमारे संपर्क पृष्ठ पर ऑनलाइन पूछताछ सबमिट कर सकते हैं या शाम 3:30 से 8:30 के बीच केंद्र पर आ सकते हैं।"
            : "Parents or students can submit an online enquiry on our Contact page or visit our tuition center during evening hours (3:30 PM – 8:30 PM) for registration and batch allocation.",
        },
        {
          q: language === "kn"
            ? "ಪ್ರತಿ ಬ್ಯಾಚ್‌ನಲ್ಲಿ ಎಷ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳಿರುತ್ತಾರೆ?"
            : language === "hi"
            ? "सामान्य बैच का आकार क्या होता है?"
            : "What is the typical batch size?",
          a: language === "kn"
            ? "ವೈಯಕ್ತಿಕ ಗಮನ ನೀಡಲು ನಾವು ಸಣ್ಣ ಬ್ಯಾಚ್‌ಗಳನ್ನು (15-20 ವಿದ್ಯಾರ್ಥಿಗಳು) ಮಾತ್ರ ನಿರ್ವಹಿಸುತ್ತೇವೆ."
            : language === "hi"
            ? "हम प्रत्येक छात्र पर व्यक्तिगत ध्यान सुनिश्चित करने के लिए छोटे बैच (15-20 छात्र) बनाए रखते हैं।"
            : "We maintain small batch sizes (15–20 students per batch) to ensure that tutors can track each student's progress and provide individual attention.",
        },
      ],
    },
    {
      category: t("faq.cat2", "Fee Payments & Digital Receipts"),
      items: [
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
            ? "ಯಾವ ಪಾವತಿ ವಿಧಾನಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ?"
            : language === "hi"
            ? "कौन से भुगतान तरीके स्वीकार किए जाते हैं?"
            : "What payment methods are accepted?",
          a: language === "kn"
            ? "ನಾವು ಡಿಜಿಟಲ್ UPI ವರ್ಗಾವಣೆ, ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ನಗದು ಪಾವತಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತೇವೆ. ಪಾವತಿ ಮಾಡಿದ ತಕ್ಷಣ ಡಿಜಿಟಲ್ ರಸೀದಿ ಲಭ್ಯವಾಗುತ್ತದೆ."
            : language === "hi"
            ? "हम डिजिटल UPI ट्रांसफर, नेट बैंकिंग और नकद भुगतान स्वीकार करते हैं। भुगतान के तुरंत बाद डिजिटल रसीद जारी की जाती है।"
            : "We accept digital UPI transfers, net banking, and direct center desk cash payments. A digital receipt number is generated immediately upon payment.",
        },
        {
          q: language === "kn"
            ? "ಅಧಿಕೃತ ಶುಲ್ಕ ರಸೀದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದೇ?"
            : language === "hi"
            ? "क्या मैं आधिकारिक शुल्क रसीद डाउनलोड कर सकता हूँ?"
            : "Can I download a computer-generated fee receipt?",
          a: language === "kn"
            ? "ಹೌದು! ಪಾವತಿಸಿದ ಪ್ರತಿಯೊಂದು ಮಾಸಿಕ ಶುಲ್ಕಕ್ಕೂ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅಧಿಕೃತ PDF ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಲಭ್ಯವಿರುತ್ತದೆ."
            : language === "hi"
            ? "हाँ! प्रत्येक भुगतान की गई मासिक फीस के लिए पोर्टल में आधिकारिक PDF रसीद डाउनलोड बटन उपलब्ध है।"
            : "Yes! The student portal features a dedicated 'Download PDF Receipt' button for every cleared monthly tuition payment.",
        },
      ],
    },
    {
      category: t("faq.cat3", "Assessments, Performance & Doubts"),
      items: [
        {
          q: language === "kn"
            ? "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನಿಯಮಿತ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು ಸಿಗುತ್ತವೆಯೇ?"
            : language === "hi"
            ? "क्या छात्रों को नियमित परीक्षा परिणाम प्राप्त होते हैं?"
            : "Do students receive regular test results?",
          a: language === "kn"
            ? "ಹೌದು. ನಮ್ಮ ಶಿಕ್ಷಕರು ಸಾಪ್ತಾಹಿಕ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸುತ್ತಾರೆ ಮತ್ತು ಅಂಕಗಳು, ಶ್ರೇಣಿಗಳು ಹಾಗೂ ಪ್ರಗತಿ ವರದಿಯನ್ನು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತಕ್ಷಣ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ."
            : language === "hi"
            ? "हाँ। हमारे शिक्षक साप्ताहिक क्विज़ और मासिक परीक्षण आयोजित करते हैं। अंक, प्रतिशत और ग्रेड पोर्टल पर तुरंत प्रकाशित किए जाते हैं।"
            : "Yes. Our faculty conducts weekly quizzes and monthly chapter assessments. Marks, percentage breakdowns, letter grades (A+, A, B, etc.), and tutor remarks are published live on the portal.",
        },
        {
          q: language === "kn"
            ? "ವಿದ್ಯಾರ್ಥಿಗಳು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಅನುಮಾನ ಪರಿಹರಿಸಿಕೊಳ್ಳಬಹುದೇ?"
            : language === "hi"
            ? "क्या छात्र ऑनलाइन शिक्षकों से शंकाएं पूछ सकते हैं?"
            : "Can students ask teachers questions and clear doubts online?",
          a: language === "kn"
            ? "ಹೌದು! ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ರಶ್ನೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಶಿಕ್ಷಕರಿಂದ ಹಂತ-ಹಂತದ ಲಿಖಿತ ಪರಿಹಾರ ಪಡೆಯಬಹುದು."
            : language === "hi"
            ? "हाँ! छात्र सीधे पोर्टल के माध्यम से अपनी शंकाएं सबमिट कर सकते हैं, फोटो संलग्न कर सकते हैं और शिक्षकों से विस्तृत समाधान प्राप्त कर सकते हैं।"
            : "Yes! Students can submit their doubts directly through the portal, attach textbook diagram photos or homework snapshots, and receive step-by-step explanations from their subject teachers.",
        },
        {
          q: language === "kn"
            ? "ದೈನಂದಿನ ಹಾಜರಾತಿಯನ್ನು ಹೇಗೆ ದಾಖಲಿಸಲಾಗುತ್ತದೆ?"
            : language === "hi"
            ? "दैनिक उपस्थिति कैसे दर्ज की जाती है?"
            : "How is daily attendance recorded?",
          a: language === "kn"
            ? "ಶಿಕ್ಷಕರು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೈನಂದಿನ ಹಾಜರಾತಿಯನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ. ಪೋಷಕರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಹಾಜರಾತಿ ಶೇಕಡಾವಾರು ಪರಿಶೀಲಿಸಬಹುದು."
            : language === "hi"
            ? "शिक्षक सीधे पोर्टल रजिस्टर में दैनिक उपस्थिति दर्ज करते हैं। अभिभावक और छात्र किसी भी समय उपस्थिति प्रतिशत की निगरानी कर सकते हैं।"
            : "Teachers mark daily attendance directly in the portal register. Parents and students can monitor their attendance percentage throughout the academic semester.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800 flex flex-col selection:bg-gold/20 selection:text-navy">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#f8f5ee]/80 to-white py-16 sm:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1 text-xs font-black text-navy">
              <Sparkles size={18} className="text-gold" /> {t("faq.header.tag", "Student & Parent Helpdesk")}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-navy tracking-tight">
              {t("faq.header.title", "Frequently Asked Questions")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("faq.header.desc", "Get detailed answers regarding admissions, classes, subjects, fee receipts, continuous assessments, and online doubt clearing at Talent Tuition Center.")}
            </p>
          </div>
        </section>

        {/* FAQ Groups */}
        <section className="py-16 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            {faqCategories.map((group, gIdx) => (
              <div key={gIdx} className="space-y-6">
                <h2 className="text-xl font-black text-navy border-b border-slate-200/80 pb-2.5">
                  {group.category}
                </h2>
                <div className="space-y-4">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs space-y-2 hover:bg-white hover:border-slate-300 transition"
                    >
                      <h3 className="text-base font-black text-navy flex items-start gap-2.5">
                        <MessageCircleQuestion size={18} className="text-gold shrink-0 mt-0.5" />
                        <span>{item.q}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 bg-[#f8f5ee]/40 text-center">
          <div className="mx-auto max-w-3xl px-4 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              {t("faq.contactBox.title", "Still have questions?")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              {t("faq.contactBox.desc", "Our counseling staff is available every evening from 3:30 PM to 8:30 PM to answer your queries.")}
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link href="/contact" className="btn primary text-xs font-bold px-6 py-3">
                {t("faq.contactBox.btn", "Contact Our Center Desk")} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
