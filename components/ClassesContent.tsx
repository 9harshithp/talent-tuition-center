"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  Clock,
  CheckCircle2,
  GraduationCap,
  Filter,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface SubjectProgram {
  subject: string;
  timings: Record<string, string>;
  faculty: string;
  syllabus: Record<string, string[]>;
}

export function ClassesContent() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const { t, language } = useLanguage();

  const subjectData: SubjectProgram[] = [
    {
      subject: language === "kn" ? "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)" : language === "hi" ? "गणित (Mathematics)" : "Mathematics",
      faculty: "Mr. Rohan Sharma (M.Sc. Mathematics)",
      timings: {
        "Class 8": "4:30 PM – 5:30 PM (Mon – Sat)",
        "Class 9": "4:00 PM – 5:00 PM (Mon – Sat)",
        "Class 10": "4:00 PM – 5:00 PM (Mon – Sat)",
      },
      syllabus: {
        "Class 8": [
          language === "kn" ? "ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಒಂದು ಚರಾಂಶದ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳು" : language === "hi" ? "परिमेय संख्याएं और एक चर वाले रैखिक समीकरण" : "Rational Numbers & Linear Equations in One Variable",
          language === "kn" ? "ಚತುರ್ಭುಜಗಳ ತಿಳುವಳಿಕೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ರೇಖಾಗಣಿತ" : language === "hi" ? "चतुर्भुजों को समझना और प्रायोगिक ज्यामिति" : "Understanding Quadrilaterals & Practical Geometry",
          language === "kn" ? "ಬೀಜೋಕ್ತಿಗಳು, ನಿತ್ಯಸಮೀಕರಣಗಳು ಮತ್ತು ಅಪವರ್ತಿಸುವಿಕೆ" : language === "hi" ? "बीजीय व्यंजक, सर्वसमिकाएं और गुणनखंडन" : "Algebraic Expressions, Identities & Factorization",
          language === "kn" ? "ಕ್ಷೇತ್ರಗಣಿತ: ವಿಸ್ತೀರ್ಣ, ಘನಫಲ ಮತ್ತು ಮೇಲ್ಮೈ ಲೆಕ್ಕಾಚಾರಗಳು" : language === "hi" ? "क्षेत्रमिति: क्षेत्रफल, आयतन और पृष्ठीय क्षेत्रफल" : "Mensuration: Area, Volume & Surface Calculations",
          language === "kn" ? "ನಕ್ಷೆಗಳ ಪರಿಚಯ ಮತ್ತು ದತ್ತಾಂಶ ನಿರ್ವಹಣೆ" : language === "hi" ? "आलेखों से परिचय और डेटा हैंडलिंग" : "Introduction to Graphs & Data Handling",
        ],
        "Class 9": [
          language === "kn" ? "ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು ಮತ್ತು ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ" : language === "hi" ? "संख्या पद्धति और निर्देशांक ज्यामिति" : "Number Systems & Coordinate Geometry",
          language === "kn" ? "ಬಹುಪದೋಕ್ತಿಗಳು ಮತ್ತು ಎರಡು ಚರಾಂಶಗಳ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳು" : language === "hi" ? "बहुपद और दो चरों वाले रैखिक समीकरण" : "Polynomials & Linear Equations in Two Variables",
          language === "kn" ? "ಸರಳರೇಖೆಗಳು, ಕೋನಗಳು ಮತ್ತು ತ್ರಿಭುಜಗಳ ಸರ್ವಸಮತೆ" : language === "hi" ? "रेखाएं, कोण और त्रिभुजों की सर्वांगसमता" : "Lines, Angles & Triangles Congruence",
          language === "kn" ? "ಘನವಸ್ತುಗಳ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ" : language === "hi" ? "ठोसों के पृष्ठीय क्षेत्रफल और आयतन" : "Surface Areas & Volumes of Solids",
          language === "kn" ? "ಸಂಖ್ಯಾಶಾಸ್ತ್ರ ಮತ್ತು ಸಂಭವನೀಯತೆಯ ಮೂಲಗಳು" : language === "hi" ? "सांख्यिकी और प्रायिकता के मूल सिद्धांत" : "Statistics & Probability Fundamentals",
        ],
        "Class 10": [
          language === "kn" ? "ವರ್ಗ ಸಮೀಕರಣಗಳು ಮತ್ತು ಸಮಾಂತರ ಶ್ರೇಢಿಗಳು" : language === "hi" ? "द्विघात समीकरण और समांतर श्रेढ़ियाँ" : "Quadratic Equations & Arithmetic Progressions",
          language === "kn" ? "ತ್ರಿಕೋನಮಿತಿ ಮತ್ತು ಎತ್ತರ-ದೂರ ಅನ್ವಯಗಳು" : language === "hi" ? "त्रिकोणमिति और ऊंचाई व दूरियों के अनुप्रयोग" : "Trigonometry & Heights and Distances Applications",
          language === "kn" ? "ಸಮರೂಪ ತ್ರಿಭುಜಗಳು ಮತ್ತು ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ ಪ್ರಮೇಯಗಳು" : language === "hi" ? "समरूप त्रिभुज और निर्देशांक ज्यामिति प्रमेय" : "Similar Triangles & Coordinate Geometry Theorems",
          language === "kn" ? "ಸಂಯೋಜಿತ ಘನವಸ್ತುಗಳ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ" : language === "hi" ? "संयुक्त ठोसों के पृष्ठीय क्षेत्रफल और आयतन" : "Surface Areas & Volumes of Combined Solids",
          language === "kn" ? "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳ ಅಭ್ಯಾಸ ಮತ್ತು ಸೂತ್ರಗಳು" : language === "hi" ? "बोर्ड परीक्षा प्रश्न पत्र अभ्यास और त्वरित सूत्र" : "Board Exam Question Paper Drills & Quick Formulas",
        ],
      },
    },
    {
      subject: language === "kn" ? "ವಿಜ್ಞಾನ (ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ರಸಾಯನಶಾಸ್ತ್ರ)" : language === "hi" ? "विज्ञान (भौतिकी और रसायन विज्ञान)" : "Science (Physics & Chemistry)",
      faculty: "Ms. Ananya Rao (M.Sc. Physics, B.Ed)",
      timings: {
        "Class 8": "3:30 PM – 4:30 PM (Mon – Sat)",
        "Class 9": "5:15 PM – 6:15 PM (Mon – Sat)",
        "Class 10": "5:15 PM – 6:15 PM (Mon – Sat)",
      },
      syllabus: {
        "Class 8": [
          language === "kn" ? "ಸೂಕ್ಷ್ಮಜೀವಿಗಳು: ಮಿತ್ರ ಮತ್ತು ಶತ್ರು & ಜೀವಕೋಶ ರಚನೆ" : language === "hi" ? "सूक्ष्मजीव: मित्र और शत्रु एवं कोशिका संरचना" : "Microorganisms: Friend and Foe & Cell Structure",
          language === "kn" ? "ಬಲ, ಒತ್ತಡ, ಘರ್ಷಣೆ ಮತ್ತು ಚಲನೆಯ ನಿಯಮಗಳು" : language === "hi" ? "बल, दाब, घर्षण और गति के नियम" : "Force, Pressure, Friction & Laws of Motion Basics",
          language === "kn" ? "ಧ್ವನಿ: ಉತ್ಪಾದನೆ, ಪ್ರಸರಣ ಮತ್ತು ಗುಣಲಕ್ಷಣಗಳು" : language === "hi" ? "ध्वनि: उत्पादन, संचरण और विशेषताएं" : "Sound: Production, Propagation & Characteristics",
          language === "kn" ? "ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ರಾಸಾಯನಿಕ ಪರಿಣಾಮಗಳು & ವಿದ್ಯುಲ್ಲೇಪನ" : language === "hi" ? "विद्युत धारा के रासायनिक प्रभाव एवं विद्युत लेपन" : "Chemical Effects of Electric Current & Electroplating",
          language === "kn" ? "ಬೆಳಕು: ಪ್ರತಿಫಲನ, ಮಾನವನ ಕಣ್ಣು ಮತ್ತು ವರ್ಣಪಟಲ" : language === "hi" ? "प्रकाश: परावर्तन, मानव नेत्र और स्पेक्ट्रम" : "Light: Reflection, Human Eye & Spectrum",
        ],
        "Class 9": [
          language === "kn" ? "ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯ ಮತ್ತು ಪರಮಾಣುಗಳು/ಅಣುಗಳು" : language === "hi" ? "हमारे आस-पास के पदार्थ एवं परमाणु/अणु" : "Matter in Our Surroundings & Atoms/Molecules",
          language === "kn" ? "ಚಲನೆ, ಬಲ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆಯ ನಿಯಮಗಳು" : language === "hi" ? "गति, बल और गुरुत्वाकर्षण के नियम" : "Motion, Force & Laws of Gravitation",
          language === "kn" ? "ಕೆಲಸ, ಶಕ್ತಿ ಮತ್ತು ಧ್ವನಿ ತರಂಗಗಳು" : language === "hi" ? "कार्य, ऊर्जा और ध्वनि तरंगें" : "Work, Energy & Sound Waves in Depth",
          language === "kn" ? "ಪರಮಾಣುವಿನ ರಚನೆ ಮತ್ತು ರಾಸಾಯನಿಕ ಬಂಧದ ಮೂಲಗಳು" : language === "hi" ? "परमाणु की संरचना और रासायनिक आबंधन" : "Structure of the Atom & Chemical Bonding Basics",
          language === "kn" ? "ಜೀವದ ಮೂಲಭೂತ ಘಟಕ ಮತ್ತು ಸಸ್ಯ/ಪ್ರಾಣಿ ಅಂಗಾಂಶಗಳು" : language === "hi" ? "जीवन की मौलिक इकाई और पादप/जंतु ऊतक" : "Fundamental Unit of Life & Plant/Animal Tissues",
        ],
        "Class 10": [
          language === "kn" ? "ಬೆಳಕು: ಪ್ರತಿಫಲನ, ವಕ್ರೀಭವನ ಮತ್ತು ಕಿರಣ ಚಿತ್ರಗಳ ಅಭ್ಯಾಸ" : language === "hi" ? "प्रकाश: परावर्तन, अपवर्तन और किरण आरेख अभ्यास" : "Light: Reflection, Refraction & Ray Optics Practice",
          language === "kn" ? "ವಿದ್ಯುತ್, ಓಮ್‌ನ ನಿಯಮ ಮತ್ತು ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಕಾಂತೀಯ ಪರಿಣಾಮಗಳು" : language === "hi" ? "विद्युत, ओम का नियम और धारा के चुंबकीय प्रभाव" : "Electricity, Ohm's Law & Magnetic Effects of Current",
          language === "kn" ? "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು, ಸಮೀಕರಣಗಳು, ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು" : language === "hi" ? "रासायनिक अभिक्रियाएं, समीकरण, अम्ल, क्षार और लवण" : "Chemical Reactions, Equations, Acids, Bases & Salts",
          language === "kn" ? "ಲೋಹಗಳು, ಅಲೋಹಗಳು ಮತ್ತು ಕಾರ್ಬನ್ ಸಂಯುಕ್ತಗಳು" : language === "hi" ? "धातु, अधातु और कार्बन एवं उसके यौगिक" : "Metals, Non-Metals & Carbon and Its Compounds",
          language === "kn" ? "ಜೈವಿಕ ಕ್ರಿಯೆಗಳು, ಅನುವಂಶೀಯತೆ ಮತ್ತು ಬೋರ್ಡ್ ಚಿತ್ರ ವಿಧಾನಗಳು" : language === "hi" ? "जैव प्रक्रम, आनुवंशिकता और बोर्ड आरेख तकनीक" : "Life Processes, Heredity & Board Diagram Techniques",
        ],
      },
    },
    {
      subject: language === "kn" ? "ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ ಮತ್ತು ಬರವಣಿಗೆ" : language === "hi" ? "अंग्रेज़ी व्याकरण और लेखन" : "English Grammar & Writing",
      faculty: "Mrs. Priya Deshmukh (M.A. English)",
      timings: {
        "Class 8": "5:30 PM – 6:30 PM (Mon – Sat)",
        "Class 9": "6:30 PM – 7:30 PM (Mon – Sat)",
        "Class 10": "6:30 PM – 7:30 PM (Mon – Sat)",
      },
      syllabus: {
        "Class 8": [
          language === "kn" ? "ನಾಮಪದ, ಸರ್ವನಾಮ, ವಿಶೇಷಣ ಮತ್ತು ಉಪಸರ್ಗಗಳು" : language === "hi" ? "संज्ञा, सर्वनाम, विशेषण और पूर्वसर्ग" : "Nouns, Pronouns, Adjectives & Preposition Mastery",
          language === "kn" ? "ಕಾಲಗಳು (ವರ್ತಮಾನ, ಭೂತ, ಭವಿಷ್ಯತ್) & ಸಹಾಯಕ ಕ್ರಿಯಾಪದಗಳು" : language === "hi" ? "काल (वर्तमान, भूत, भविष्य) एवं सहायक क्रियाएं" : "Tenses (Present, Past, Future) & Modal Auxiliaries",
          language === "kn" ? "ಸಕ್ರಿಯ ಮತ್ತು ನಿಷ್ಕ್ರಿಯ ವಾಕ್ಯ ರಚನೆಯ ಮೂಲಗಳು" : language === "hi" ? "कर्तृवाच्य और कर्मवाच्य के बुनियादी नियम" : "Active and Passive Voice Fundamentals",
          language === "kn" ? "ಔಪಚಾರಿಕ ಪತ್ರಗಳು, ಡೈರಿ ನಮೂದುಗಳು ಮತ್ತು ಪ್ಯಾರಾಗ್ರಾಫ್ ಬರವಣಿಗೆ" : language === "hi" ? "औपचारिक पत्र, डायरी लेखन और अनुच्छेद लेखन" : "Formal Letters, Diary Entries & Paragraph Writing",
          language === "kn" ? "ಗ್ರಹಿಕೆ ವಾಚನ ಮತ್ತು ಶಬ್ದಕೋಶ ವೃದ್ಧಿ" : language === "hi" ? "पठन बोध और शब्दावली संवर्धन" : "Reading Comprehension & Vocabulary Enrichment",
        ],
        "Class 9": [
          language === "kn" ? "ಕಾಲಗಳು, ಮೊಡಾಲ್ಸ್ ಮತ್ತು ಕರ್ತೃ-ಕ್ರಿಯಾ ಹೊಂದಾಣಿಕೆ" : language === "hi" ? "काल, मोडल और कर्ता-क्रिया संगति" : "Tenses, Modals & Subject-Verb Concord In-depth",
          language === "kn" ? "ವರದಿ ಮಾತು (ಆಜ್ಞೆಗಳು, ವಿನಂತಿಗಳು, ಹೇಳಿಕೆಗಳು)" : language === "hi" ? "प्रत्यक्ष/अप्रत्यक्ष कथन (आदेश, निवेदन, कथन)" : "Reported Speech (Commands, Requests, Statements)",
          language === "kn" ? "ವರ್ಣನಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್ ಮತ್ತು ಕಥೆ ಬರವಣಿಗೆ" : language === "hi" ? "वर्णनात्मक अनुच्छेद और कहानी लेखन" : "Descriptive Paragraphs & Story/Diary Writing",
          language === "kn" ? "ವಾಕ್ಯ ಪರಿವರ್ತನಾ ಅಭ್ಯಾಸಗಳು" : language === "hi" ? "वाक्य रूपांतरण अभ्यास" : "Active & Passive Voice Transformation Drills",
          language === "kn" ? "ಸಾಹಿತ್ಯ ಗ್ರಹಿಕೆ ಮತ್ತು ದೀರ್ಘ ಉತ್ತರ ಬರವಣಿಗೆ" : language === "hi" ? "साहित्य बोध और दीर्घ उत्तरीय लेखन" : "Literature Comprehension & Long Answer Writing",
        ],
        "Class 10": [
          language === "kn" ? "ಉನ್ನತ ಮಟ್ಟದ ಕ್ಲಾಸ್‌ಗಳು ಮತ್ತು ಡಿಟರ್ಮಿನರ್‌ಗಳು" : language === "hi" ? "उन्नत उपवाक्य और निर्धारक" : "Advanced Concord, Clauses & Determiners",
          language === "kn" ? "ಸಂಭಾಷಣಾ ಪರಿವರ್ತನೆಯೊಂದಿಗೆ ವರದಿ ಮಾತು" : language === "hi" ? "संवाद रूपांतरण के साथ अप्रत्यक्ष कथन" : "Reported Speech with Dialogue Transformations",
          language === "kn" ? "ಸಂಪಾದಕರಿಗೆ ಔಪಚಾರಿಕ ಪತ್ರ ಮತ್ತು ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್" : language === "hi" ? "संपादक को औपचारिक पत्र और विश्लेषणात्मक अनुच्छेद" : "Formal Letter to Editor & Analytical Paragraphs",
          language === "kn" ? "ದೋಷ ತಿದ್ದುಪಡಿ, ಎಡಿಟಿಂಗ್ ಮತ್ತು ಅಂತರ ತುಂಬುವ ಅಭ್ಯಾಸಗಳು" : language === "hi" ? "त्रुटि सुधार, संपादन और रिक्त स्थान पूर्ति" : "Error Correction, Editing & Gap Filling Exercises",
          language === "kn" ? "CBSE & ರಾಜ್ಯ ಮಂಡಳಿ ಪರೀಕ್ಷಾ ಉತ್ತರ ಬರವಣಿಗೆಯ ತಂತ್ರಗಳು" : language === "hi" ? "बोर्ड परीक्षा साहित्य उत्तर लेखन रणनीति" : "CBSE & State Board Exam Literature Answer Strategy",
        ],
      },
    },
    {
      subject: language === "kn" ? "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Studies)" : language === "hi" ? "सामाजिक अध्ययन (Social Studies)" : "Social Studies",
      faculty: "Mr. Anand Kumar (M.A. History, B.Ed)",
      timings: {
        "Class 8": "6:30 PM – 7:15 PM (Mon – Sat)",
        "Class 9": "7:45 PM – 8:30 PM (Mon – Sat)",
        "Class 10": "7:45 PM – 8:30 PM (Mon – Sat)",
      },
      syllabus: {
        "Class 8": [
          language === "kn" ? "ಆಧುನಿಕ ಭಾರತದ ಇತಿಹಾಸ: ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯಿಂದ 1857 ರ ದಂಗೆಯವರೆಗೆ" : language === "hi" ? "आधुनिक भारतीय इतिहास: ईस्ट इंडिया कंपनी से 1857 विद्रोह तक" : "Modern Indian History: East India Company to 1857 Revolt",
          language === "kn" ? "ಭಾರತೀಯ ಸಂವಿಧಾನ, ಜಾತ್ಯತೀತತೆ ಮತ್ತು ಸಂಸತ್ತು" : language === "hi" ? "भारतीय संविधान, धर्मनिरपेक्षता और संसद" : "The Indian Constitution, Secularism & Parliament",
          language === "kn" ? "ಸಂಪನ್ಮೂಲಗಳು: ಭೂಮಿ, ಮಣ್ಣು, ನೀರು ಮತ್ತು ಖನಿಜಗಳು" : language === "hi" ? "संसाधन: भूमि, मृदा, जल और खनिज" : "Resources: Land, Soil, Water & Minerals",
          language === "kn" ? "ನ್ಯಾಯಾಂಗ, ಅಪರಾಧ ನ್ಯಾಯ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯ" : language === "hi" ? "न्यायपालिका, आपराधिक न्याय प्रणाली और सामाजिक न्याय" : "Judiciary, Criminal Justice System & Social Justice",
          language === "kn" ? "ಕೈಗಾರಿಕೆಗಳು ಮತ್ತು ಮಾನವ ಸಂಪನ್ಮೂಲಗಳು" : language === "hi" ? "उद्योग और मानव संसाधन" : "Industries & Human Resources Overview",
        ],
        "Class 9": [
          language === "kn" ? "ಫ್ರೆಂಚ್ ಕ್ರಾಂತಿ ಮತ್ತು ಯುರೋಪ್‌ನಲ್ಲಿ ಸಮಾಜವಾದ" : language === "hi" ? "फ्रांसीसी क्रांति और यूरोप में समाजवाद" : "The French Revolution & Socialism in Europe",
          language === "kn" ? "ಭಾರತ: ಗಾತ್ರ ಮತ್ತು ಸ್ಥಾನ, ಭೌಗೋಳಿಕ ಲಕ್ಷಣಗಳು & ನದಿಗಳು" : language === "hi" ? "भारत: आकार और स्थिति, भौतिक स्वरूप एवं अपवाह" : "India: Size and Location, Physical Features & Drainage",
          language === "kn" ? "ಪ್ರಜಾಪ್ರಭುತ್ವ ಎಂದರೇನು? ಏಕೆ ಪ್ರಜಾಪ್ರಭುತ್ವ? & ಸಂವಿಧಾನ ರಚನೆ" : language === "hi" ? "लोकतंत्र क्या? लोकतंत्र क्यों? और संविधान निर्माण" : "What is Democracy? Why Democracy? & Constitutional Design",
          language === "kn" ? "ಚುನಾವಣಾ ರಾಜಕೀಯ ಮತ್ತು ಸಂಸ್ಥೆಗಳ ಕಾರ್ಯಾಚರಣೆ" : language === "hi" ? "चुनावी राजनीति और संस्थाओं का कामकाज" : "Electoral Politics & Working of Institutions",
          language === "kn" ? "ಅರ್ಥಶಾಸ್ತ್ರ: ಪಾಲಂಪುರ ಗ್ರಾಮದ ಕಥೆ ಮತ್ತು ಬಡತನ" : language === "hi" ? "अर्थशास्त्र: पालमपुर गांव की कहानी और गरीबी" : "Economics: The Story of Village Palampur & Poverty",
        ],
        "Class 10": [
          language === "kn" ? "ಯುರೋಪ್‌ನಲ್ಲಿ ರಾಷ್ಟ್ರೀಯತೆಯ ಉದಯ ಮತ್ತು ಭಾರತದಲ್ಲಿ ರಾಷ್ಟ್ರೀಯತೆ" : language === "hi" ? "यूरोप में राष्ट्रवाद का उदय और भारत में राष्ट्रवाद" : "Rise of Nationalism in Europe & Nationalism in India",
          language === "kn" ? "ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಅಭಿವೃದ್ಧಿ, ಕೃಷಿ ಮತ್ತು ಖನಿಜ ಸಂಪನ್ಮೂಲಗಳು" : language === "hi" ? "संसाधन एवं विकास, कृषि और खनिज संसाधन" : "Resources and Development, Agriculture & Minerals",
          language === "kn" ? "ಅಧಿಕಾರ ಹಂಚಿಕೆ, ಒಕ್ಕೂಟ ವ್ಯವಸ್ಥೆ, ಲಿಂಗ, ಧರ್ಮ ಮತ್ತು ಜಾತಿ" : language === "hi" ? "सत्ता की साझेदारी, संघवाद, लिंग, धर्म और जाति" : "Power Sharing, Federalism, Gender, Religion & Caste",
          language === "kn" ? "ಅಭಿವೃದ್ಧಿ, ಭಾರತೀಯ ಆರ್ಥಿಕತೆಯ ವಲಯಗಳು, ಹಣ ಮತ್ತು ಸಾಲ" : language === "hi" ? "विकास, भारतीय अर्थव्यवस्था के क्षेत्रक, मुद्रा और साख" : "Development, Sectors of Indian Economy, Money & Credit",
          language === "kn" ? "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ನಕ್ಷೆ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಸಮಯೋಚಿತ ಉತ್ತರ ಬರವಣಿಗೆ" : language === "hi" ? "बोर्ड परीक्षा मानचित्र कार्य और समयबद्ध उत्तर लेखन" : "Board Exam Map Pointing Practice & Timed Answer Writing",
        ],
      },
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
              <Sparkles size={18} className="text-gold" /> {t("classes.header.tag", "Academic Programs")}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-navy tracking-tight">
              {t("classes.header.title", "Classes, Subjects & Batch Timings")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("classes.header.desc", "Comprehensive coaching for Class 8, Class 9, and Class 10. Choose your grade below to explore detailed subjects, weekly schedules, and curriculum breakdown.")}
            </p>
          </div>
        </section>

        {/* Subjects List with Interactive Class Selector */}
        <section className="py-16 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Interactive Class Filter Dropdown */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Filter size={20} className="text-gold" />
                <div>
                  <span className="font-black text-navy text-sm sm:text-base block">
                    {language === "kn" ? "ತರಗತಿ ಪ್ರಕಾರ ಪಠ್ಯಕ್ರಮ ಫಿಲ್ಟರ್ ಮಾಡಿ" : language === "hi" ? "कक्षा अनुसार पाठ्यक्रम फ़िल्टर करें" : "Filter Syllabus by Class"}
                  </span>
                  <span className="text-xs text-slate-500">
                    {language === "kn" ? "ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ವಿಷಯಗಳನ್ನು ನೋಡಲು ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ" : language === "hi" ? "समय सारिणी और विषयों को देखने के लिए कक्षा चुनें" : "Select Class 8, 9, or 10 to see batch syllabus and timings"}
                  </span>
                </div>
              </div>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-navy outline-none focus:border-navy shadow-xs cursor-pointer"
              >
                <option value="all">{t("classes.filter.all", "All Batches")}</option>
                <option value="Class 8">{t("classes.filter.c8", "Class 8 Foundation")}</option>
                <option value="Class 9">{t("classes.filter.c9", "Class 9 Foundation")}</option>
                <option value="Class 10">{t("classes.filter.c10", "Class 10 Board Preparation")}</option>
              </select>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subjectData.map((item, idx) => {
                const timingDisplay =
                  selectedClass !== "all" && item.timings[selectedClass]
                    ? item.timings[selectedClass]
                    : item.timings["Class 10"];

                const topicsToDisplay =
                  selectedClass === "all"
                    ? [
                        ...item.syllabus["Class 10"].slice(0, 3),
                        ...item.syllabus["Class 9"].slice(0, 1),
                        ...item.syllabus["Class 8"].slice(0, 1),
                      ]
                    : item.syllabus[selectedClass] || item.syllabus["Class 10"];

                const badgeLabel =
                  selectedClass === "all" ? "Class 8, 9 & 10" : selectedClass;

                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-xs hover:border-gold/40 transition space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-navy px-3 py-1 text-xs font-black text-gold">
                          {badgeLabel}
                        </span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock size={18} className="text-gold" /> {timingDisplay}
                        </span>
                      </div>

                      <h2 className="text-2xl font-black text-navy">{item.subject}</h2>
                      <div className="text-sm text-slate-600 flex items-center gap-1.5">
                        <GraduationCap size={18} className="text-gold" />
                        <span>
                          {t("classes.card.facultyLabel", "Lead Instructor:")} <b className="text-slate-800">{item.faculty}</b>
                        </span>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {t("classes.card.syllabusLabel", "Key Syllabus & Topic Modules:")}
                        </div>
                        {topicsToDisplay.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {language === "kn" ? "ದೈನಂದಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಅನುಮಾನ ಪರಿಹಾರ" : language === "hi" ? "दैनिक टेस्ट और शंका समाधान" : "Daily Homework & Test Series"}
                      </span>
                      <Link
                        href="/contact"
                        className="btn primary text-xs font-bold px-4 py-2"
                      >
                        {t("classes.card.enrollBtn", "Enquire for this Subject Batch →")}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#f8f5ee]/50 text-center">
          <div className="mx-auto max-w-3xl px-4 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              {language === "kn"
                ? "ಸರಿಯಾದ ಬ್ಯಾಚ್ ಆಯ್ಕೆ ಮಾಡಲು ಸಹಾಯ ಬೇಕೇ?"
                : language === "hi"
                ? "सही बैच चुनने में मदद चाहिए?"
                : "Need Help Choosing the Right Batch?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              {language === "kn"
                ? "ನಿಮ್ಮ ಪಠ್ಯಕ್ರಮದ ಅಗತ್ಯಗಳನ್ನು ನಿರ್ಣಯಿಸಲು ಮತ್ತು ಸೂಕ್ತ ಬ್ಯಾಚ್ ಸಮಯವನ್ನು ಶಿಫಾರಸು ಮಾಡಲು ನಮ್ಮ ಮಾರ್ಗದರ್ಶಕರು ಲಭ್ಯವಿದ್ದಾರೆ."
                : language === "hi"
                ? "आपकी पाठ्यक्रम आवश्यकताओं का आकलन करने और सबसे उपयुक्त समय सुझाने के लिए हमारे परामर्शदाता उपलब्ध हैं।"
                : "Our academic counselors are available to assess your current syllabus needs and recommend the most suitable batch timing."}
            </p>
            <div className="flex justify-center gap-4 pt-2">
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
