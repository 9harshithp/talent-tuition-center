"use client";

import { useState, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { INITIAL_CURRICULUM_DATA } from "@/lib/curriculumData";
import {
  FileText,
  Printer,
  Copy,
  Sparkles,
  X,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Layers,
  Settings,
  Edit3,
  Eye,
  Check,
  Award,
  Calendar,
  Clock,
  School,
  FileCheck,
} from "lucide-react";

interface QuestionItem {
  id: string;
  section: "A" | "B" | "C" | "D" | "E";
  sectionTitle: string;
  marks: number;
  questionNumber: number;
  chapter: string;
  question: string;
  options?: string[];
  correctOption?: string;
  answer: string;
  markingScheme: string[];
}

interface QuestionPaperGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  defaultSubjectId?: string;
  defaultClass?: "Class 10" | "Class 9" | "Class 8";
}

export function QuestionPaperGeneratorModal({
  isOpen,
  onClose,
  onToast,
  defaultSubjectId,
  defaultClass = "Class 10",
}: QuestionPaperGeneratorModalProps) {
  const { language: appLang } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<"Class 10" | "Class 9" | "Class 8">(defaultClass);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("Mathematics");
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "kn" | "hi">(
    appLang === "kn" ? "kn" : appLang === "hi" ? "hi" : "en"
  );
  const [totalMarksPreset, setTotalMarksPreset] = useState<number>(80);
  const [examDuration, setExamDuration] = useState<string>("3 Hours (180 mins)");
  const [institutionTitle, setInstitutionTitle] = useState("TALENT TUITION CENTER");
  const [examTitle, setExamTitle] = useState("CBSE / NCERT Board Pattern Examination 2026-27");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [activeViewTab, setActiveViewTab] = useState<"paper" | "solution">("paper");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionItem[]>([]);
  const [isCustomEditing, setIsCustomEditing] = useState(false);

  // Available subjects for the selected class
  const availableSubjects = useMemo(() => {
    return INITIAL_CURRICULUM_DATA.filter((s) => s.classGrade === selectedClass);
  }, [selectedClass]);

  // Active subject object
  const activeSubject = useMemo(() => {
    return (
      availableSubjects.find((s) => s.name.toLowerCase().includes(selectedSubjectName.toLowerCase())) ||
      availableSubjects[0] ||
      INITIAL_CURRICULUM_DATA[0]
    );
  }, [availableSubjects, selectedSubjectName]);

  // When active subject changes, select its first 3 chapters by default
  const chaptersList = useMemo(() => {
    return activeSubject?.chapters || [];
  }, [activeSubject]);

  useMemo(() => {
    if (selectedChapters.length === 0 && chaptersList.length > 0) {
      setSelectedChapters(chaptersList.slice(0, Math.min(4, chaptersList.length)).map((c) => c.id));
    }
  }, [chaptersList]);

  if (!isOpen) return null;

  const handleSelectAllChapters = () => {
    if (selectedChapters.length === chaptersList.length) {
      setSelectedChapters([]);
    } else {
      setSelectedChapters(chaptersList.map((c) => c.id));
    }
  };

  const handleToggleChapter = (id: string) => {
    setSelectedChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handlePresetChange = (preset: number) => {
    setTotalMarksPreset(preset);
    if (preset === 20) {
      setExamDuration("45 Minutes");
      setExamTitle("Class Periodic Unit Drill Test");
    } else if (preset === 40) {
      setExamDuration("90 Minutes (1.5 Hours)");
      setExamTitle("Term / Periodic Assessment Examination");
    } else {
      setExamDuration("180 Minutes (3 Hours)");
      setExamTitle("CBSE / NCERT Board Pattern Final Mock Examination");
    }
  };

  // Realistic NCERT Questions Generator Engine
  const generateQuestionsEngine = () => {
    if (selectedChapters.length === 0) {
      onToast("Please select at least one chapter for the question paper.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const selectedChapterObjects = chaptersList.filter((c) => selectedChapters.includes(c.id));
      const questions: QuestionItem[] = [];
      let qNum = 1;

      // Section distribution based on total marks
      let countA = totalMarksPreset === 20 ? 5 : totalMarksPreset === 40 ? 10 : 20; // 1M
      let countB = totalMarksPreset === 20 ? 3 : totalMarksPreset === 40 ? 5 : 5;   // 2M
      let countC = totalMarksPreset === 20 ? 1 : totalMarksPreset === 40 ? 4 : 6;   // 3M
      let countD = totalMarksPreset === 20 ? 1 : totalMarksPreset === 40 ? 2 : 4;   // 5M
      let countE = totalMarksPreset === 80 ? 3 : 0; // 4M Case Studies

      // Helper to generate question templates tailored to subject & chapter
      const getSampleQ = (section: "A" | "B" | "C" | "D" | "E", chIndex: number, subQ: number) => {
        const ch = selectedChapterObjects[chIndex % selectedChapterObjects.length] || chaptersList[0];
        const sub = ch.subtopics[subQ % ch.subtopics.length] || { title: "Fundamental Concept", titleKn: "ಮೂಲ ಪರಿಕಲ್ಪನೆ", titleHi: "मूल सिद्धांत" };
        const subName = selectedSubjectName.toLowerCase();

        if (section === "A") {
          // MCQ (1 Mark)
          let qText = "";
          let opts = ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"];
          let correct = "A) Option 1";
          let ans = "Correct Option: (A)";

          if (subName.includes("math")) {
            qText = selectedLanguage === "kn"
              ? `ಅಧ್ಯಾಯ '${ch.titleKn}': ${sub.titleKn} ಆಧಾರದ ಮೇಲೆ, ನಿರ್ದಿಷ್ಟ ಸ್ಥಿರಾಂಕದ ಮೌಲ್ಯವನ್ನು ನಿರ್ಧರಿಸಿ.`
              : selectedLanguage === "hi"
              ? `अध्याय '${ch.titleHi}': ${sub.titleHi} के आधार पर, दिए गए समीकरण का मूल ज्ञात कीजिए।`
              : `From Chapter '${ch.title}': Based on ${sub.title}, evaluate the discriminant or root of the standard condition.`;
            opts = [
              "A) Real and Equal (ವಾಸ್ತವ ಮತ್ತು ಸಮ)",
              "B) Real and Distinct (ವಾಸ್ತವ ಮತ್ತು ಭಿನ್ನ)",
              "C) No Real Roots (ಯಾವುದೇ ವಾಸ್ತವ ಮೂಲಗಳಿಲ್ಲ)",
              "D) Undefined (ಅನಿರ್ದಿಷ್ಟ)",
            ];
            correct = "B) Real and Distinct (ವಾಸ್ತವ ಮತ್ತು ಭಿನ್ನ)";
            ans = "Option (B): Since D = b² - 4ac > 0, the roots are real and distinct.";
          } else if (subName.includes("science")) {
            qText = selectedLanguage === "kn"
              ? `ಅಧ್ಯಾಯ '${ch.titleKn}': ${sub.titleKn} ಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಸರಿಯಾದ ವೈಜ್ಞಾನಿಕ ಹೇಳಿಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.`
              : selectedLanguage === "hi"
              ? `अध्याय '${ch.titleHi}': ${sub.titleHi} के संबंध में सही वैज्ञानिक कथन का चयन करें।`
              : `From Chapter '${ch.title}': Identify the correct statement regarding ${sub.title} under standard temperature and pressure.`;
            opts = [
              "A) Rate of reaction doubles with catalyst",
              "B) Total energy is strictly conserved",
              "C) Light ray bends towards the normal in denser medium",
              "D) All of the above are scientifically verified",
            ];
            correct = "D) All of the above are scientifically verified";
            ans = "Option (D): All mentioned statements comply with fundamental NCERT laws.";
          } else {
            qText = `According to NCERT Chapter '${ch.title}', what is the primary consequence of ${sub.title}?`;
            opts = ["A) Uniform implementation", "B) Decentralized governance", "C) Economic acceleration", "D) Structural reforms"];
            correct = "B) Decentralized governance";
            ans = "Option (B): Supported directly by NCERT textbook analysis.";
          }

          return {
            question: qText,
            options: opts,
            correctOption: correct,
            answer: ans,
            markingScheme: ["1 Mark: For selecting correct option with rationale."],
          };
        }

        if (section === "B") {
          // Very Short Answer (2 Marks)
          const qText = selectedLanguage === "kn"
            ? `'${ch.titleKn}' ಇಂದ: ${sub.titleKn} ನ ವ್ಯಾಖ್ಯಾನವನ್ನು ನೀಡಿ ಮತ್ತು ಸೂಕ್ತ ಸೂತ್ರವನ್ನು ಬರೆಯಿರಿ.`
            : selectedLanguage === "hi"
            ? `'${ch.titleHi}' से: ${sub.titleHi} को परिभाषित कीजिए और इसका मूल सूत्र लिखिए।`
            : `From '${ch.title}': State the fundamental definition of ${sub.title} and state its governing NCERT formula with SI units.`;

          return {
            question: qText,
            answer: `Definition: ${sub.title} describes the rate or relationship governed by standard law. Standard Formula: ${ch.keyFormulas?.[0] || "Standard Equation"} with standard SI units.`,
            markingScheme: [
              "1 Mark: Accurate scientific / mathematical definition.",
              "1 Mark: Correct formula with SI units / condition.",
            ],
          };
        }

        if (section === "C") {
          // Short Answer (3 Marks)
          const qText = selectedLanguage === "kn"
            ? `'${ch.titleKn}': ${sub.titleKn} ಅನ್ನು ಹಂತ-ಹಂತವಾಗಿ ಸಾಧಿಸಿ ಅಥವಾ ವಿವರಿಸಿ.`
            : selectedLanguage === "hi"
            ? `'${ch.titleHi}': ${sub.titleHi} को चरणबद्ध रूप से सिद्ध कीजिए अथवा व्याख्या कीजिए।`
            : `From '${ch.title}': Derive the standard relation for ${sub.title} or prove the governing theorem step-by-step with necessary conditions.`;

          return {
            question: qText,
            answer: `Step 1: Statement of theorem/relation.\nStep 2: Drawing labelled diagram / setting up algebraic expressions.\nStep 3: Derivation and conclusion.`,
            markingScheme: [
              "1 Mark: Statement and basic setup / diagram.",
              "1 Mark: Algebraic derivation / logical steps.",
              "1 Mark: Final conclusion and verified statement.",
            ],
          };
        }

        if (section === "D") {
          // Long Answer (5 Marks)
          const qText = selectedLanguage === "kn"
            ? `'${ch.titleKn}' ದೀರ್ಘ ಪ್ರಶ್ನೆ: (a) ${sub.titleKn} ಅನ್ನು ವಿಸ್ತೃತವಾಗಿ ವಿಶ್ಲೇಷಿಸಿ. (b) ಇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಸಂಖ್ಯಾತ್ಮಕ ಲೆಕ್ಕಾಚಾರವನ್ನು ಬಿಡಿಸಿ.`
            : selectedLanguage === "hi"
            ? `'${ch.titleHi}' दीर्घ उत्तरीय: (a) ${sub.titleHi} का विस्तृत विश्लेषण कीजिए। (b) संबंधित संख्यात्मक प्रश्न हल कीजिए।`
            : `From '${ch.title}' (5 Marks): (a) Explain in detail the principle, working, and significance of ${sub.title}. (b) Solve the accompanying numerical / board exam high-weightage problem.`;

          return {
            question: qText,
            answer: `(a) Detailed theoretical foundation and labelled schematic explanation.\n(b) Numerical problem solving: Given data substitution, step-by-step calculation, and boxing final answer with SI units.`,
            markingScheme: [
              "2 Marks: Comprehensive conceptual explanation & diagram.",
              "2 Marks: Numerical formula substitution & calculation.",
              "1 Mark: Final answer with correct units & step notes.",
            ],
          };
        }

        // Section E: Case Study (4 Marks)
        const qText = selectedLanguage === "kn"
          ? `ಪ್ರಕರಣ ಆಧಾರಿತ ಅಧ್ಯಯನ (Case Study) - '${ch.titleKn}': ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ${sub.titleKn} ನ ಅನ್ವಯವನ್ನು ಓದಿ ಕೆಳಗಿನ ಉಪ-ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ:\n(i) ಮುಖ್ಯ ತತ್ವವೇನು? (1M)\n(ii) ಲೆಕ್ಕಾಚಾರ ನಡೆಸಿ (2M)\n(iii) ಪರ್ಯಾಯ ಪರಿಹಾರ ತಿಳಿಸಿ (1M)`
          : selectedLanguage === "hi"
          ? `केस स्टडी प्रश्न - '${ch.titleHi}': दैनिक जीवन में ${sub.titleHi} के अनुप्रयोग को पढ़कर निम्नलिखित उप-प्रश्नों के उत्तर दीजिए:\n(i) मुख्य सिद्धांत क्या है? (1 अंक)\n(ii) संख्यात्मक मान ज्ञात कीजिए (2 अंक)\n(iii) उपयुक्त सुझाव दीजिए (1 अंक)`
          : `Case Study / Competency Based Question - '${ch.title}': Read the following experimental observation on ${sub.title} and answer the sub-questions:\n(i) Identify the governing physical law. (1 Mark)\n(ii) Calculate the resultant value based on given data. (2 Marks)\n(iii) Suggest what happens if the external parameter is doubled. (1 Mark)`;

        return {
          question: qText,
          answer: `(i) Governing Law / Principle accurately identified.\n(ii) Calculation: Result = 24.5 units (with proper steps).\n(iii) Effect of parameter: Output increases proportionally by factor of 2.`,
          markingScheme: [
            "1 Mark: Accurate identification of principle.",
            "2 Marks: Step-by-step calculation of part (ii).",
            "1 Mark: Correct conceptual inference in part (iii).",
          ],
        };
      };

      // Populate Section A
      for (let i = 0; i < countA; i++) {
        const item = getSampleQ("A", i, i);
        questions.push({
          id: `q-${qNum}`,
          section: "A",
          sectionTitle: "Section A (Multiple Choice Questions - 1 Mark Each)",
          marks: 1,
          questionNumber: qNum++,
          chapter: selectedChapterObjects[i % selectedChapterObjects.length]?.title || "Chapter",
          question: item.question,
          options: item.options,
          correctOption: item.correctOption,
          answer: item.answer,
          markingScheme: item.markingScheme,
        });
      }

      // Populate Section B
      for (let i = 0; i < countB; i++) {
        const item = getSampleQ("B", i + 1, i + 2);
        questions.push({
          id: `q-${qNum}`,
          section: "B",
          sectionTitle: "Section B (Very Short Answer Questions - 2 Marks Each)",
          marks: 2,
          questionNumber: qNum++,
          chapter: selectedChapterObjects[i % selectedChapterObjects.length]?.title || "Chapter",
          question: item.question,
          answer: item.answer,
          markingScheme: item.markingScheme,
        });
      }

      // Populate Section C
      for (let i = 0; i < countC; i++) {
        const item = getSampleQ("C", i + 2, i + 1);
        questions.push({
          id: `q-${qNum}`,
          section: "C",
          sectionTitle: "Section C (Short Answer Questions - 3 Marks Each)",
          marks: 3,
          questionNumber: qNum++,
          chapter: selectedChapterObjects[i % selectedChapterObjects.length]?.title || "Chapter",
          question: item.question,
          answer: item.answer,
          markingScheme: item.markingScheme,
        });
      }

      // Populate Section D
      for (let i = 0; i < countD; i++) {
        const item = getSampleQ("D", i + 3, i + 4);
        questions.push({
          id: `q-${qNum}`,
          section: "D",
          sectionTitle: "Section D (Long Answer Questions - 5 Marks Each)",
          marks: 5,
          questionNumber: qNum++,
          chapter: selectedChapterObjects[i % selectedChapterObjects.length]?.title || "Chapter",
          question: item.question,
          answer: item.answer,
          markingScheme: item.markingScheme,
        });
      }

      // Populate Section E (Case Studies)
      for (let i = 0; i < countE; i++) {
        const item = getSampleQ("E", i, i + 3);
        questions.push({
          id: `q-${qNum}`,
          section: "E",
          sectionTitle: "Section E (Case Study / Competency Based - 4 Marks Each)",
          marks: 4,
          questionNumber: qNum++,
          chapter: selectedChapterObjects[i % selectedChapterObjects.length]?.title || "Chapter",
          question: item.question,
          answer: item.answer,
          markingScheme: item.markingScheme,
        });
      }

      setGeneratedQuestions(questions);
      setIsGenerating(false);
      onToast("✨ Question Paper & Answer Key Generated Successfully!");
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPaperText = () => {
    if (generatedQuestions.length === 0) return;
    let out = `${institutionTitle}\n${examTitle}\nClass: ${selectedClass} | Subject: ${selectedSubjectName} | Time: ${examDuration} | Max Marks: ${totalMarksPreset}\n\nGeneral Instructions:\n1. All questions are compulsory.\n2. Internal choices are provided wherever applicable.\n\n`;

    const sections = ["A", "B", "C", "D", "E"] as const;
    sections.forEach((sec) => {
      const secQs = generatedQuestions.filter((q) => q.section === sec);
      if (secQs.length > 0) {
        out += `--- ${secQs[0].sectionTitle} ---\n\n`;
        secQs.forEach((q) => {
          out += `Q${q.questionNumber}. [${q.marks} Mark${q.marks > 1 ? "s" : ""}] ${q.question}\n`;
          if (q.options) {
            q.options.forEach((opt) => (out += `   ${opt}\n`));
          }
          out += `\n`;
        });
      }
    });

    navigator.clipboard.writeText(out);
    onToast("Question Paper copied to clipboard!");
  };

  // Group questions by section
  const sectionAGroup = generatedQuestions.filter((q) => q.section === "A");
  const sectionBGroup = generatedQuestions.filter((q) => q.section === "B");
  const sectionCGroup = generatedQuestions.filter((q) => q.section === "C");
  const sectionDGroup = generatedQuestions.filter((q) => q.section === "D");
  const sectionEGroup = generatedQuestions.filter((q) => q.section === "E");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] print:max-h-none print:border-none print:bg-white print:text-black">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  NCERT / CBSE Question Paper Generator
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Print Ready PDF
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate tailored test papers with Section A-E blueprint & complete teacher step-marking scheme.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar (print:hidden) */}
        <div className="p-4 sm:p-5 bg-slate-800/40 border-b border-slate-700/60 space-y-4 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Grade Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Class / Grade
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Class 10">Class 10 (Board Exam)</option>
                <option value="Class 9">Class 9 (NCERT)</option>
                <option value="Class 8">Class 8 (NCERT)</option>
              </select>
            </div>

            {/* Subject Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={selectedSubjectName}
                onChange={(e) => setSelectedSubjectName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science (Physics/Chem/Bio)</option>
                <option value="Social Studies">Social Studies</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Total Marks & Blueprint Preset */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Blueprint & Marks
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => handlePresetChange(20)}
                  className={`text-xs py-1.5 font-bold rounded-lg transition ${
                    totalMarksPreset === 20
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  20 Marks
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetChange(40)}
                  className={`text-xs py-1.5 font-bold rounded-lg transition ${
                    totalMarksPreset === 40
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  40 Marks
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetChange(80)}
                  className={`text-xs py-1.5 font-bold rounded-lg transition ${
                    totalMarksPreset === 80
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  80 Marks
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Paper Language
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("en")}
                  className={`text-xs py-1.5 font-medium rounded-lg transition ${
                    selectedLanguage === "en"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("kn")}
                  className={`text-xs py-1.5 font-medium rounded-lg transition ${
                    selectedLanguage === "kn"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("hi")}
                  className={`text-xs py-1.5 font-medium rounded-lg transition ${
                    selectedLanguage === "hi"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>

          {/* Chapter Selector Dropdown / Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Select Syllabus Chapters ({selectedChapters.length}/{chaptersList.length})
              </span>
              <button
                type="button"
                onClick={handleSelectAllChapters}
                className="text-xs text-amber-400 hover:underline font-medium"
              >
                {selectedChapters.length === chaptersList.length ? "Deselect All" : "Select All Chapters"}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-900/60 rounded-xl border border-slate-700/80">
              {chaptersList.map((ch) => {
                const isSelected = selectedChapters.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleToggleChapter(ch.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-200 font-semibold"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                    <span>
                      Ch {ch.chapterNumber}: {selectedLanguage === "kn" ? ch.titleKn : selectedLanguage === "hi" ? ch.titleHi : ch.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button & Quick Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {examDuration}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> {totalMarksPreset} Total Marks
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Sections A to {totalMarksPreset === 80 ? "E" : "D"}
              </span>
            </div>

            <button
              type="button"
              onClick={generateQuestionsEngine}
              disabled={isGenerating || selectedChapters.length === 0}
              className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl transition shadow-lg ${
                isGenerating || selectedChapters.length === 0
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  : "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/20 ring-2 ring-amber-400/40"
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Compiling NCERT Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Generate Question Paper</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Switcher & Action Bar (when generated) */}
        {generatedQuestions.length > 0 && (
          <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveViewTab("paper")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                  activeViewTab === "paper"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Question Paper (Student View)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveViewTab("solution")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                  activeViewTab === "solution"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Teacher Answer Key & Step Marks</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyPaperText}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Text
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print / Export PDF
              </button>
            </div>
          </div>
        )}

        {/* Paper & Solution Printable Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-900 text-slate-100 print:bg-white print:text-black print:p-0 print:overflow-visible">
          {generatedQuestions.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-200">
                  Ready to Generate Question Paper
                </h3>
                <p className="text-xs text-slate-400">
                  Select chapters above and click &quot;Generate Question Paper&quot; to formulate full CBSE/NCERT Section A-E question sheets.
                </p>
              </div>
            </div>
          ) : activeViewTab === "paper" ? (
            /* STUDENT QUESTION PAPER CANVAS */
            <div className="max-w-3xl mx-auto bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6 print:border-none print:shadow-none print:bg-white print:text-black print:p-0">
              {/* Paper Header */}
              <div className="text-center border-b-2 border-slate-700 pb-4 space-y-1 print:border-black">
                <h1 className="text-xl sm:text-2xl font-black tracking-wide text-amber-400 uppercase print:text-black">
                  {institutionTitle}
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-300 print:text-gray-800">
                  {examTitle}
                </p>
                <div className="flex flex-wrap items-center justify-between text-xs font-semibold pt-2 text-slate-400 border-t border-slate-800 mt-2 print:text-gray-700 print:border-gray-300">
                  <span>Class: {selectedClass}</span>
                  <span>Subject: {selectedSubjectName}</span>
                  <span>Time Allowed: {examDuration}</span>
                  <span>Maximum Marks: {totalMarksPreset}</span>
                </div>
              </div>

              {/* Student Details Grid (Printable) */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs print:bg-white print:border-gray-400 print:text-black">
                <div>
                  <span className="font-bold">Student Name:</span> ___________________________
                </div>
                <div>
                  <span className="font-bold">Roll Number:</span> ___________________________
                </div>
                <div>
                  <span className="font-bold">Date:</span> ___________________________
                </div>
                <div>
                  <span className="font-bold">Invigilator Sign:</span> ___________________________
                </div>
              </div>

              {/* General Instructions */}
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300 print:bg-white print:border-gray-300 print:text-gray-800">
                <span className="font-bold text-amber-400 uppercase tracking-wider print:text-black">
                  General Instructions:
                </span>
                <ol className="list-decimal list-inside space-y-0.5 leading-relaxed">
                  <li>This question paper contains {generatedQuestions.length} questions in {totalMarksPreset === 80 ? "5" : "4"} sections (A, B, C, D{totalMarksPreset === 80 ? ", E" : ""}).</li>
                  <li>All questions are compulsory. However, internal choices are provided in select questions.</li>
                  <li>Section A comprises {sectionAGroup.length} Multiple Choice Questions of 1 mark each.</li>
                  <li>Section B comprises {sectionBGroup.length} Very Short Answer Questions of 2 marks each.</li>
                  <li>Section C comprises {sectionCGroup.length} Short Answer Questions of 3 marks each.</li>
                  <li>Section D comprises {sectionDGroup.length} Long Answer Questions of 5 marks each.</li>
                  {sectionEGroup.length > 0 && (
                    <li>Section E comprises {sectionEGroup.length} Case-Based Integrated Assessment Questions of 4 marks each.</li>
                  )}
                  <li>Use of calculators or unauthorized electronic gadgets is strictly prohibited.</li>
                </ol>
              </div>

              {/* Render Sections */}
              {[sectionAGroup, sectionBGroup, sectionCGroup, sectionDGroup, sectionEGroup].map((secGroup, gIdx) => {
                if (!secGroup || secGroup.length === 0) return null;
                const sampleSec = secGroup[0];
                return (
                  <div key={gIdx} className="space-y-4 pt-2">
                    <div className="border-b border-slate-700 pb-1.5 print:border-black">
                      <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide print:text-black">
                        {sampleSec.sectionTitle}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {secGroup.map((q) => (
                        <div key={q.id} className="space-y-1.5 text-sm leading-relaxed">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-200 print:text-black">
                              Q{q.questionNumber}.
                            </span>
                            <p className="flex-1 text-slate-200 print:text-black">
                              {q.question}
                            </p>
                            <span className="text-xs font-mono font-bold text-amber-400 shrink-0 print:text-gray-700">
                              [{q.marks} Mark{q.marks > 1 ? "s" : ""}]
                            </span>
                          </div>

                          {q.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 pt-1">
                              {q.options.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className="text-xs text-slate-300 p-2 rounded-lg bg-slate-900/60 border border-slate-800 print:bg-white print:border-gray-200 print:text-black"
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* End of Question Paper */}
              <div className="text-center pt-8 text-xs font-bold text-slate-500 uppercase tracking-widest print:text-gray-600">
                *** END OF QUESTION PAPER • TALENT TUITION CENTER ***
              </div>
            </div>
          ) : (
            /* TEACHER ANSWER KEY & MARKING SCHEME CANVAS */
            <div className="max-w-3xl mx-auto bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-xl space-y-6 print:border-none print:shadow-none print:bg-white print:text-black print:p-0">
              {/* Solution Header */}
              <div className="text-center border-b-2 border-emerald-500 pb-4 space-y-1 print:border-black">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 inline-block mb-1 print:border-black print:text-black">
                  CONFIDENTIAL • TEACHER EVALUATION KEY
                </span>
                <h1 className="text-xl sm:text-2xl font-black tracking-wide text-emerald-400 uppercase print:text-black">
                  {institutionTitle}
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-300 print:text-gray-800">
                  {examTitle} — Step-by-Step Marking Scheme
                </p>
                <div className="flex flex-wrap items-center justify-between text-xs font-semibold pt-2 text-slate-400 border-t border-slate-800 mt-2 print:text-gray-700 print:border-gray-300">
                  <span>Class: {selectedClass}</span>
                  <span>Subject: {selectedSubjectName}</span>
                  <span>Max Marks: {totalMarksPreset}</span>
                </div>
              </div>

              {/* Detailed Solutions */}
              <div className="space-y-6">
                {generatedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 print:bg-white print:border-gray-300"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 print:border-gray-200">
                      <span className="font-bold text-sm text-amber-300 print:text-black">
                        Q{q.questionNumber}. [{q.sectionTitle.split("(")[0].trim()}]
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 print:border-none print:text-black">
                        {q.marks} Marks
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic print:text-gray-700">
                      {q.question}
                    </p>

                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg space-y-1.5 print:bg-gray-50 print:border-gray-300">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider print:text-black">
                        Correct Solution / Derivation:
                      </span>
                      <pre className="text-xs text-emerald-200 whitespace-pre-wrap font-sans leading-relaxed print:text-black">
                        {q.answer}
                      </pre>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider print:text-gray-700">
                        Step-by-Step Marking Rubric:
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 print:text-gray-800">
                        {q.markingScheme.map((markRule, rIdx) => (
                          <li key={rIdx}>{markRule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* End of Marking Scheme */}
              <div className="text-center pt-8 text-xs font-bold text-slate-500 uppercase tracking-widest print:text-gray-600">
                *** END OF TEACHER MARKING SCHEME • TALENT TUITION CENTER ***
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 print:hidden">
          <span>CBSE/NCERT Aligned Exam Generator • Talent Tuition Center</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
