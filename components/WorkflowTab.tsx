"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UserSession, Role, DataStore } from "@/lib/dataStore";
import {
  SubjectWorkflow,
  ChapterNode,
  SubtopicNode,
  INITIAL_CURRICULUM_DATA,
  CURRICULUM_DATA_VERSION,
} from "@/lib/curriculumData";
import { loadAllMCQTestRecords } from "@/lib/mcqTestData";
import { MCQTestModal } from "@/components/MCQTestModal";
import { ChapterNotesModal } from "@/components/ChapterNotesModal";
import { LiveMCQTrackingDashboard } from "@/components/LiveMCQTrackingDashboard";
import { AIDoubtSolverModal } from "@/components/AIDoubtSolverModal";
import { QuestionPaperGeneratorModal } from "@/components/QuestionPaperGeneratorModal";
import {
  GitFork,
  FolderTree,
  ListTree,
  Layers,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Sparkles,
  CheckSquare,
  Square,
  Award,
  BookMarked,
  Filter,
  Maximize2,
  Minimize2,
  Lightbulb,
  FileCheck2,
  Check,
  Activity,
  FileText,
  Bookmark,
  HelpCircle,
  Flame,
  Settings2,
} from "lucide-react";

interface WorkflowTabProps {
  role: Role;
  session: UserSession;
  onToast: (msg: string) => void;
}

export function WorkflowTab({ role, session, onToast }: WorkflowTabProps) {
  const { language } = useLanguage();

  // Load initial curriculum with versioned localStorage persistence
  const [curricula, setCurricula] = useState<SubjectWorkflow[]>(() => {
    if (typeof window !== "undefined") {
      const savedVersion = localStorage.getItem("ttc_curriculum_version");
      const saved = localStorage.getItem("ttc_curriculum_data");
      if (saved && savedVersion === CURRICULUM_DATA_VERSION) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      } else if (saved) {
        try {
          const parsed = JSON.parse(saved) as SubjectWorkflow[];
          const completedMap = new Set<string>();
          parsed.forEach((s) =>
            s.chapters.forEach((c) =>
              c.subtopics.forEach((sub) => {
                if (sub.isCompleted) completedMap.add(sub.id);
              })
            )
          );

          const merged = INITIAL_CURRICULUM_DATA.map((subject) => ({
            ...subject,
            chapters: subject.chapters.map((ch) => {
              const updatedSubs = ch.subtopics.map((sub) => ({
                ...sub,
                isCompleted: completedMap.has(sub.id) || sub.isCompleted || false,
              }));
              const doneCount = updatedSubs.filter((s) => s.isCompleted).length;
              const pct =
                updatedSubs.length > 0
                  ? Math.round((doneCount / updatedSubs.length) * 100)
                  : ch.completionPercent;
              return {
                ...ch,
                subtopics: updatedSubs,
                completionPercent: pct,
                status: pct === 100 ? ("Completed" as const) : pct > 0 ? ("In Progress" as const) : ("Upcoming" as const),
              };
            }),
          }));

          localStorage.setItem("ttc_curriculum_data", JSON.stringify(merged));
          localStorage.setItem("ttc_curriculum_version", CURRICULUM_DATA_VERSION);
          return merged;
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_CURRICULUM_DATA;
  });

  // Save to localStorage when updated
  const saveCurricula = (updated: SubjectWorkflow[]) => {
    setCurricula(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("ttc_curriculum_data", JSON.stringify(updated));
      localStorage.setItem("ttc_curriculum_version", CURRICULUM_DATA_VERSION);
    }
  };

  // Determine initial class filter
  const initialClass = useMemo<"Class 10" | "Class 9" | "Class 8">(() => {
    if (session.role === "student") {
      const student = DataStore.getStudents().find(
        (s) => s.id === session.studentId || s.name === session.name
      );
      if (student?.class?.includes("9")) return "Class 9";
      if (student?.class?.includes("8")) return "Class 8";
    }
    return "Class 10";
  }, [session]);

  const [selectedClass, setSelectedClass] = useState<"Class 10" | "Class 9" | "Class 8">(initialClass);

  // Workflow Main View Modes: 'tree' | 'notes_textbooks' | 'mcq_tests' | 'live_tracking'
  const [viewMode, setViewMode] = useState<"tree" | "notes_textbooks" | "mcq_tests" | "live_tracking">("tree");

  // Available subjects for the chosen class
  const availableSubjects = useMemo(() => {
    return curricula.filter((c) => c.classGrade === selectedClass);
  }, [curricula, selectedClass]);

  // Selected Subject ID
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    const first = curricula.find((c) => c.classGrade === initialClass);
    return first ? first.id : "c10-math";
  });

  // Auto-switch subject if class changes
  useEffect(() => {
    const match = curricula.find((c) => c.classGrade === selectedClass);
    if (match && !availableSubjects.some((s) => s.id === selectedSubjectId)) {
      setSelectedSubjectId(match.id);
    }
  }, [selectedClass, availableSubjects, selectedSubjectId, curricula]);

  // Active Subject Object
  const currentSubject = useMemo(() => {
    return curricula.find((c) => c.id === selectedSubjectId) || availableSubjects[0] || curricula[0];
  }, [curricula, selectedSubjectId, availableSubjects]);

  // Expanded Chapters Set
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "m10-01": true,
    "m10-02": true,
    "m10-03": true,
    "m10-04": true,
    "s10-01": true,
    "s10-02": true,
    "s10-03": true,
    "eng10-01": true,
    "sst10-01": true,
  });

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<"all" | "Completed" | "In Progress" | "Upcoming">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Modals state
  const [formulaModalChapter, setFormulaModalChapter] = useState<ChapterNode | null>(null);
  const [notesModalChapter, setNotesModalChapter] = useState<ChapterNode | null>(null);
  const [mcqModalChapter, setMcqModalChapter] = useState<ChapterNode | null>(null);
  const [isAiDoubtModalOpen, setIsAiDoubtModalOpen] = useState(false);
  const [isQuestionPaperModalOpen, setIsQuestionPaperModalOpen] = useState(false);
  
  // MCQ Records Cache for badges
  const [mcqRecords, setMcqRecords] = useState<Record<string, any>>({});

  const refreshMCQCache = () => {
    setMcqRecords(loadAllMCQTestRecords());
  };

  useEffect(() => {
    refreshMCQCache();
    const handleUpdate = () => refreshMCQCache();
    window.addEventListener("ttc_mcq_test_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("ttc_mcq_test_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Toggle single chapter expansion
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Expand All / Collapse All
  const handleExpandAll = (expand: boolean) => {
    if (!currentSubject) return;
    const newObj: Record<string, boolean> = {};
    currentSubject.chapters.forEach((ch) => {
      newObj[ch.id] = expand;
    });
    setExpandedChapters((prev) => ({ ...prev, ...newObj }));
  };

  // Toggle Subtopic Completion / Mastery
  const handleToggleSubtopic = (subjectId: string, chapterId: string, subtopicId: string) => {
    const updated = curricula.map((subj) => {
      if (subj.id !== subjectId) return subj;
      const updatedChapters = subj.chapters.map((ch) => {
        if (ch.id !== chapterId) return ch;
        const updatedSubtopics = ch.subtopics.map((st) => {
          if (st.id !== subtopicId) return st;
          return { ...st, isCompleted: !st.isCompleted };
        });

        const completedCount = updatedSubtopics.filter((st) => st.isCompleted).length;
        const totalCount = updatedSubtopics.length;
        const newPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : ch.completionPercent;
        const newStatus: "Completed" | "In Progress" | "Upcoming" =
          newPercent === 100 ? "Completed" : newPercent > 0 ? "In Progress" : "Upcoming";

        return {
          ...ch,
          subtopics: updatedSubtopics,
          completionPercent: newPercent,
          status: newStatus,
        };
      });
      return { ...subj, chapters: updatedChapters };
    });

    saveCurricula(updated);
    onToast(
      language === "kn"
        ? "ಪರಿಕಲ್ಪನೆಯ ಕಲಿಕೆಯ ಪ್ರಗತಿ ನವೀಕರಿಸಲಾಗಿದೆ!"
        : language === "hi"
        ? "संकल्पना प्रगति अपडेट की गई!"
        : "Concept mastery status updated!"
    );
  };

  // Selection Status customizer (Available for all roles: Student, Teacher, Admin)
  const handleUpdateChapterStatus = (
    subjectId: string,
    chapterId: string,
    newStatus: "Completed" | "In Progress" | "Upcoming"
  ) => {
    const updated = curricula.map((subj) => {
      if (subj.id !== subjectId) return subj;
      const updatedChapters = subj.chapters.map((ch) => {
        if (ch.id !== chapterId) return ch;
        const newPercent = newStatus === "Completed" ? 100 : newStatus === "In Progress" ? 50 : 0;
        const updatedSubtopics = ch.subtopics.map((st) => ({
          ...st,
          isCompleted: newStatus === "Completed",
        }));
        return {
          ...ch,
          status: newStatus,
          completionPercent: newPercent,
          subtopics: updatedSubtopics,
        };
      });
      return { ...subj, chapters: updatedChapters };
    });

    saveCurricula(updated);
    onToast(
      language === "kn"
        ? `ಅಧ್ಯಾಯದ ಸ್ಥಿತಿಯನ್ನು "${newStatus}" ಎಂದು ನವೀಕರಿಸಲಾಗಿದೆ`
        : language === "hi"
        ? `अध्याय की स्थिति "${newStatus}" में बदली गई`
        : `Chapter status updated to ${newStatus}`
    );
  };

  // Filtered Chapters based on status & search
  const filteredChapters = useMemo(() => {
    if (!currentSubject) return [];
    return currentSubject.chapters.filter((ch) => {
      if (statusFilter !== "all" && ch.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ch.title.toLowerCase().includes(q) || ch.titleKn.toLowerCase().includes(q) || ch.titleHi.toLowerCase().includes(q);
        const matchUnit = ch.unit.toLowerCase().includes(q) || ch.unitKn.toLowerCase().includes(q);
        const matchDesc = ch.description.toLowerCase().includes(q);
        const matchTeacher = ch.assignedTeacher.toLowerCase().includes(q);
        const matchSubtopic = ch.subtopics.some(
          (st) => st.title.toLowerCase().includes(q) || st.titleKn.toLowerCase().includes(q) || st.titleHi.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchUnit && !matchDesc && !matchTeacher && !matchSubtopic) {
          return false;
        }
      }

      return true;
    });
  }, [currentSubject, statusFilter, searchQuery]);

  // Group filtered chapters by Unit
  const groupedByUnit = useMemo(() => {
    const map = new Map<string, { unitKn: string; unitHi: string; chapters: ChapterNode[] }>();
    filteredChapters.forEach((ch) => {
      if (!map.has(ch.unit)) {
        map.set(ch.unit, { unitKn: ch.unitKn, unitHi: ch.unitHi, chapters: [] });
      }
      map.get(ch.unit)!.chapters.push(ch);
    });
    return Array.from(map.entries());
  }, [filteredChapters]);

  // Overall Subject Progress Calculation
  const overallStats = useMemo(() => {
    if (!currentSubject) return { totalChapters: 0, completed: 0, inProgress: 0, totalTopics: 0, masteredTopics: 0, percent: 0 };
    const totalChapters = currentSubject.chapters.length;
    const completed = currentSubject.chapters.filter((c) => c.status === "Completed").length;
    const inProgress = currentSubject.chapters.filter((c) => c.status === "In Progress").length;
    let totalTopics = 0;
    let masteredTopics = 0;
    currentSubject.chapters.forEach((ch) => {
      totalTopics += ch.subtopics.length;
      masteredTopics += ch.subtopics.filter((st) => st.isCompleted).length;
    });
    const percent = totalTopics > 0 ? Math.round((masteredTopics / totalTopics) * 100) : 0;
    return { totalChapters, completed, inProgress, totalTopics, masteredTopics, percent };
  }, [currentSubject]);

  // Subject Icon Renderer
  const renderSubjectIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case "Calculator":
        return <Calculator size={size} />;
      case "Atom":
        return <Atom size={size} />;
      case "BookOpen":
        return <BookOpen size={size} />;
      case "Globe":
        return <Globe size={size} />;
      default:
        return <BookMarked size={size} />;
    }
  };

  const getTagBadgeStyle = (type: string) => {
    switch (type) {
      case "Core Concept":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Theorem & Proof":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Formula & Derivation":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Experiment & Practical":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Board Exam Important":
        return "bg-rose-50 text-rose-700 border-rose-200 font-black";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* =================================================================== */}
      {/* TOP NAVIGATION: 4 FEATURE MODES */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode("tree")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === "tree"
                ? "bg-navy text-white shadow-md scale-101"
                : "text-slate-600 hover:text-navy hover:bg-slate-100"
            }`}
          >
            <FolderTree size={16} className={viewMode === "tree" ? "text-gold" : ""} />
            {language === "kn" ? "ಪಠ್ಯಕ್ರಮ ವೃಕ್ಷ" : language === "hi" ? "करिकुलम ट्री" : "NCERT Curriculum Tree"}
          </button>

          <button
            type="button"
            onClick={() => setViewMode("notes_textbooks")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === "notes_textbooks"
                ? "bg-navy text-white shadow-md scale-101"
                : "text-slate-600 hover:text-navy hover:bg-slate-100"
            }`}
          >
            <FileText size={16} className={viewMode === "notes_textbooks" ? "text-gold" : ""} />
            {language === "kn" ? "ಟಿಪ್ಪಣಿಗಳು & ಪಠ್ಯಪುಸ್ತಕಗಳು" : language === "hi" ? "नोट्स एवं पाठ्यपुस्तकें" : "Revision Notes & Textbooks"}
          </button>

          <button
            type="button"
            onClick={() => setViewMode("mcq_tests")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === "mcq_tests"
                ? "bg-navy text-white shadow-md scale-101"
                : "text-slate-600 hover:text-navy hover:bg-slate-100"
            }`}
          >
            <HelpCircle size={16} className={viewMode === "mcq_tests" ? "text-gold" : ""} />
            {role === "student"
              ? language === "kn"
                ? "MCQ ಪರೀಕ್ಷೆಗಳು (3 ಪ್ರಯತ್ನಗಳು)"
                : language === "hi"
                ? "MCQ टेस्ट (3 प्रयास)"
                : "MCQ Chapter Tests (3 Attempts)"
              : language === "kn"
              ? "ವಿದ್ಯಾರ್ಥಿ MCQ ಫಲಿತಾಂಶಗಳು"
              : language === "hi"
              ? "छात्र MCQ मूल्यांकन एवं परिणाम"
              : "Student MCQ Assessments"}
          </button>

          <button
            type="button"
            onClick={() => setViewMode("live_tracking")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === "live_tracking"
                ? "bg-navy text-white shadow-md scale-101"
                : "text-slate-600 hover:text-navy hover:bg-slate-100"
            }`}
          >
            <Activity size={16} className="text-emerald-400 animate-pulse" />
            {role === "student"
              ? language === "kn"
                ? "ಲೈವ್ ಸ್ಕೋರ್ ಟ್ರ್ಯಾಕಿಂಗ್"
                : language === "hi"
                ? "लाइव टेस्ट ट्रैकिंग"
                : "Live MCQ Tracking System"
              : language === "kn"
              ? "ಲೈವ್ ವಿದ್ಯಾರ್ಥಿ ಪ್ರದರ್ಶನ ಟ್ರ್ಯಾಕರ್"
              : language === "hi"
              ? "लाइव छात्र प्रदर्शन ट्रैकर"
              : "Live Student Performance Tracker"}
          </button>
        </div>

        {/* AI Features & Question Paper Generator Launchers */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setIsAiDoubtModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-sm hover:brightness-110 transition cursor-pointer"
          >
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span>{language === "kn" ? "🤖 AI ಫೋಟೋ ಸಂದೇಹ ಪರಿಹಾರ" : language === "hi" ? "🤖 AI फोटो डाउट सॉल्वर" : "🤖 AI Doubt Solver"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuestionPaperModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm hover:brightness-110 transition cursor-pointer"
          >
            <FileText size={14} className="text-slate-950" />
            <span>{language === "kn" ? "📄 ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ ಜನರೇಟರ್" : language === "hi" ? "📄 प्रश्न पत्र जनरेटर" : "📄 CBSE Question Paper"}</span>
          </button>

          {/* Grade Indicator Pill */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-700 shrink-0">
            <span>{selectedClass}</span>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MODE 4: LIVE MCQ TRACKING DASHBOARD */}
      {/* =================================================================== */}
      {viewMode === "live_tracking" && (
        <LiveMCQTrackingDashboard
          curricula={curricula}
          role={role}
          session={session}
          selectedClass={selectedClass}
          onSelectClass={setSelectedClass}
          onOpenTest={(ch, subId) => {
            setMcqModalChapter(ch);
          }}
          onOpenNotes={(ch, subName) => {
            setNotesModalChapter(ch);
          }}
          onToast={onToast}
        />
      )}

      {/* =================================================================== */}
      {/* MODE 1, 2, 3: TREE / NOTES / MCQ TESTS */}
      {/* =================================================================== */}
      {viewMode !== "live_tracking" && (
        <>
          {/* 1. Header Banner & Class Selector */}
          <div className="rounded-3xl bg-[#0f172a] bg-gradient-to-r from-navy via-slate-900 to-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 border border-gold/40 px-3.5 py-1 text-xs font-black text-amber-300">
                  <FolderTree size={14} className="text-gold" />
                  {viewMode === "notes_textbooks"
                    ? language === "kn"
                      ? "ಅಧಿಕೃತ NCERT ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಪಠ್ಯಪುಸ್ತಕ ಸಾರಾಂಶ"
                      : language === "hi"
                      ? "आधिकारिक NCERT नोट्स एवं पाठ्यपुस्तक सारांश"
                      : "Official NCERT Revision Notes & Textbook Reader"
                    : viewMode === "mcq_tests"
                    ? role === "student"
                      ? language === "kn"
                        ? "ಅಧ್ಯಾಯವಾರು MCQ ಪರೀಕ್ಷೆಗಳು • 3 ಪ್ರಯತ್ನಗಳ ನಿಯಮ"
                        : language === "hi"
                        ? "अध्यायवार MCQ टेस्ट • 3 प्रयास नियम"
                        : "Chapter MCQ Challenge • 3-Attempt Mastery Rule"
                      : language === "kn"
                      ? "ವಿದ್ಯಾರ್ಥಿ MCQ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ದಕ್ಷತೆ ಟ್ರ್ಯಾಕಿಂಗ್"
                      : language === "hi"
                      ? "छात्र MCQ मूल्यांकन एवं दक्षता विश्लेषण"
                      : "Student MCQ Assessments & Mastery Inspector"
                    : language === "kn"
                    ? "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಪ್ರವಾಹ ಮತ್ತು ಅಧ್ಯಾಯಗಳ ಮರ"
                    : language === "hi"
                    ? "शैक्षणिक कार्यप्रवाह एवं अध्याय संरचना"
                    : "Academic Workflow & Curriculum Tree"}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {viewMode === "notes_textbooks"
                    ? language === "kn"
                      ? "NCERT ಪುನರಾವರ್ತನಾ ಟಿಪ್ಪಣಿಗಳು & ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕಗಳು"
                      : language === "hi"
                      ? "NCERT पुनरावृत्ति नोट्स एवं डिजिटल पाठ्यपुस्तकें"
                      : "NCERT Revision Notes, Textbooks & Chapter E-Books"
                    : viewMode === "mcq_tests"
                    ? role === "student"
                      ? language === "kn"
                        ? "ಸಂವಾದಾತ್ಮಕ ಅಧ್ಯಾಯ MCQ ಸವಾಲು (ತೇರ್ಗಡೆ: ≥70%)"
                        : language === "hi"
                        ? "संवादात्मक अध्याय MCQ चुनौती (उत्तीर्ण: ≥70%)"
                        : "Interactive Chapter MCQ Challenge (Pass: ≥70%)"
                      : language === "kn"
                      ? "ಅಧ್ಯಾಯವಾರು ವಿದ್ಯಾರ್ಥಿ MCQ ಫಲಿತಾಂಶಗಳು & ಸ್ಕೋರ್‌ಗಳು"
                      : language === "hi"
                      ? "अध्यायवार छात्र MCQ परिणाम एवं लाइव स्कोरकार्ड"
                      : "Chapter-by-Chapter Student MCQ Results & Scores"
                    : language === "kn"
                    ? "ವಿಷಯವಾರು ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಕಲಿಕೆಯ ಮಾರ್ಗಸೂಚಿ"
                    : language === "hi"
                    ? "विषयवार पाठ्यक्रम और अध्ययन रोडमैप"
                    : "Subject Syllabus & Hierarchical Learning Roadmap"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {viewMode === "notes_textbooks"
                    ? language === "kn"
                      ? "ಎಲ್ಲಾ ಘಟಕಗಳಿಗೆ ವಿಭಾಗವಾರು NCERT ಪುನರಾವರ್ತನಾ ಟಿಪ್ಪಣಿಗಳು, ಪಠ್ಯಪುಸ್ತಕ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ."
                      : language === "hi"
                      ? "सभी इकाइयों के लिए अनुभागवार NCERT नोट्स, पाठ्यपुस्तक गाइड और अभ्यास प्रश्न देखें।"
                      : "Access section-by-section NCERT revision notes, textbook guides, and in-text questions for all units."
                    : viewMode === "mcq_tests"
                    ? role === "student"
                      ? language === "kn"
                        ? "ಟೈಮರ್ ಆಧಾರಿತ 5-ಪ್ರಶ್ನೆಗಳ ಅಧ್ಯಾಯ ಸವಾಲನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. ≥70% ಅಂಕಗಳೊಂದಿಗೆ ತೇರ್ಗಡೆಯಾಗಲು ಪ್ರತಿ ಅಧ್ಯಾಯಕ್ಕೆ 3 ಪ್ರಯತ್ನಗಳಿವೆ."
                        : language === "hi"
                        ? "टाइमर आधारित 5-प्रश्नों की अध्याय चुनौती लें। ≥70% अंकों से पास करने के लिए प्रति अध्याय 3 प्रयास उपलब्ध हैं।"
                        : "Take timer-based 5-question chapter challenges. You have exactly 3 attempts per chapter to clear with ≥70% score."
                      : language === "kn"
                      ? "ವಿದ್ಯಾರ್ಥಿಗಳ ಅಧ್ಯಾಯವಾರು MCQ ಫಲಿತಾಂಶಗಳು, ಪ್ರಯತ್ನಗಳ ದಾಖಲೆ ಮತ್ತು ಲೈವ್ ಸ್ಕೋರ್‌ಬೋರ್ಡ್ ಪರಿಶೀಲಿಸಿ."
                      : language === "hi"
                      ? "छात्रों के अध्यायवार MCQ परिणाम, 3-प्रयासों का रिकॉर्ड और लाइव स्कोरकार्ड का निरीक्षण करें।"
                      : "Inspect students' chapter MCQ test results, 3-attempt logs, pass certificates (≥70%), and live scoreboards."
                    : language === "kn"
                    ? "ನಿಮ್ಮ ತರಗತಿಯ ಸಂಪೂರ್ಣ ಪಠ್ಯಕ್ರಮದ ರೋಡ್‌ಮ್ಯಾಪ್ ಅನ್ವೇಷಿಸಿ. ಟಿಪ್ಪಣಿಗಳು, ಪಠ್ಯಪುಸ್ತಕಗಳು, ಸೂತ್ರಗಳು ಮತ್ತು ಪರೀಕ್ಷೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
                    : language === "hi"
                    ? "अपनी कक्षा का संपूर्ण पाठ्यक्रम रोडमैप देखें। नोट्स, पाठ्यपुस्तकें, सूत्र और टेस्ट का अभ्यास करें।"
                    : "Explore complete curriculum roadmaps for your class. Expand units and chapters to inspect notes, textbooks, formulas, and tests."}
                </p>
              </div>

              {/* Class Grade Pill Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 pl-2">
                  {language === "kn" ? "ತರಗತಿ:" : language === "hi" ? "कक्षा:" : "Grade:"}
                </span>
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  {(["Class 10", "Class 9", "Class 8"] as const).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setSelectedClass(grade)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
                        selectedClass === grade
                          ? "bg-[#c9a84c] text-[#0f172a] shadow-md scale-102"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Subject Syllabus Metrics Strip */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಒಟ್ಟು ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "कुल अध्याय" : "Total Chapters"}
                </span>
                <span className="text-2xl font-black text-white mt-0.5 block">{overallStats.totalChapters}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಪೂರ್ಣಗೊಂಡಿದೆ" : language === "hi" ? "पूर्ण अध्याय" : "Completed"}
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-0.5 block">{overallStats.completed}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಕಲಿಕೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ" : language === "hi" ? "प्रगति में" : "In Progress"}
                </span>
                <span className="text-2xl font-black text-amber-300 mt-0.5 block">{overallStats.inProgress}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಪರಿಕಲ್ಪನೆ ಪ್ರಾವೀಣ್ಯತೆ" : language === "hi" ? "संकल्पना दक्षता" : "Concept Mastery"}
                </span>
                <span className="text-2xl font-black text-sky-300 mt-0.5 block">
                  {overallStats.percent}% ({overallStats.masteredTopics}/{overallStats.totalTopics})
                </span>
              </div>
            </div>
          </div>

          {/* 2. Subject Cards Selection Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <Layers size={16} className="text-gold" />
                {language === "kn" ? "ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ" : language === "hi" ? "विषय चुनें" : "Select Subject"}
              </h2>
              <span className="text-xs font-bold text-slate-400">
                {availableSubjects.length} {language === "kn" ? "ವಿಷಯಗಳು ಲಭ್ಯವಿದೆ" : language === "hi" ? "विषय उपलब्ध" : "Subjects Available"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {availableSubjects.map((subj) => {
                const isSelected = subj.id === selectedSubjectId;
                const completedCount = subj.chapters.filter((c) => c.status === "Completed").length;
                const totalCount = subj.chapters.length;
                const subPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                const localizedName =
                  language === "kn" ? subj.nameKn : language === "hi" ? subj.nameHi : subj.name;

                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white border-navy shadow-lg ring-2 ring-navy/15 scale-101"
                        : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs`}
                        style={{ backgroundColor: subj.color }}
                      >
                        {renderSubjectIcon(subj.icon, 20)}
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold border ${
                          isSelected ? "bg-navy text-white border-navy" : subj.badgeBg
                        }`}
                      >
                        {subPercent}% {language === "kn" ? "ಮುಗಿದಿದೆ" : language === "hi" ? "पूर्ण" : "Done"}
                      </span>
                    </div>

                    <h3 className="font-black text-navy text-base leading-tight line-clamp-1">{localizedName}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {subj.chapters.length} {language === "kn" ? "ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "अध्याय" : "Chapters"} • {subj.classGrade}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${subPercent}%`,
                          backgroundColor: subj.color,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Workflow Tree Toolbar (Search, Filter, Expand/Collapse) */}
          <div className="card p-5 bg-white shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: currentSubject?.color || "#2563eb" }}
                >
                  {renderSubjectIcon(currentSubject?.icon || "BookOpen", 22)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-navy text-lg sm:text-xl leading-tight">
                      {language === "kn"
                        ? currentSubject?.nameKn
                        : language === "hi"
                        ? currentSubject?.nameHi
                        : currentSubject?.name}
                    </h3>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-extrabold text-slate-700">
                      {currentSubject?.classGrade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {language === "kn"
                      ? "ಅಧ್ಯಾಯಗಳನ್ನು ವಿಸ್ತರಿಸಿ, ಟಿಪ್ಪಣಿಗಳು, ಪಠ್ಯಪುಸ್ತಕ ಮತ್ತು 3 ಪ್ರಯತ್ನಗಳ MCQ ಪರೀಕ್ಷೆಗಳನ್ನು ಪಡೆಯಿರಿ."
                      : language === "hi"
                      ? "अध्याय का विस्तार करें, नोट्स और 3 प्रयासों वाले MCQ टेस्ट प्राप्त करें।"
                      : "Expand chapters to read NCERT revision notes, textbooks, formulas, and attempt chapter MCQ tests."}
                  </p>
                </div>
              </div>

              {/* Expand/Collapse All Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleExpandAll(true)}
                  className="btn secondary text-xs font-bold py-1.5 px-3 gap-1 inline-flex items-center shadow-xs"
                >
                  <Maximize2 size={13} /> {language === "kn" ? "ಎಲ್ಲವನ್ನೂ ವಿಸ್ತರಿಸಿ" : language === "hi" ? "सभी खोलें" : "Expand All"}
                </button>
                <button
                  type="button"
                  onClick={() => handleExpandAll(false)}
                  className="btn secondary text-xs font-bold py-1.5 px-3 gap-1 inline-flex items-center shadow-xs"
                >
                  <Minimize2 size={13} /> {language === "kn" ? "ಎಲ್ಲವನ್ನೂ ಕುಗ್ಗಿಸಿ" : language === "hi" ? "सभी समेटें" : "Collapse All"}
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
              <div className="flex flex-wrap items-center gap-1.5">
                {(["all", "Completed", "In Progress", "Upcoming"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                      statusFilter === st
                        ? "bg-navy text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st === "all"
                      ? language === "kn" ? "ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "सभी अध्याय" : "All Chapters"
                      : st === "Completed"
                      ? language === "kn" ? "✓ ಪೂರ್ಣಗೊಂಡಿದೆ" : language === "hi" ? "✓ पूर्ण" : "✓ Completed"
                      : st === "In Progress"
                      ? language === "kn" ? "⏳ ಪ್ರಗತಿಯಲ್ಲಿದೆ" : language === "hi" ? "⏳ प्रगति में" : "⏳ In Progress"
                      : language === "kn" ? "📅 ಮುಂದಿನದು" : language === "hi" ? "📅 आगामी" : "📅 Upcoming"}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === "kn"
                      ? "ಅಧ್ಯಾಯ / ಪರಿಕಲ್ಪನೆ ಹುಡುಕಿ..."
                      : language === "hi"
                      ? "अध्याय या संकल्पना खोजें..."
                      : "Search chapters, notes, tests..."
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs outline-none focus:border-navy"
                />
              </div>
            </div>

            {/* 4. CHAPTER TREE RENDERING */}
            <div className="pt-2">
              {filteredChapters.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <FolderTree size={36} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-bold">
                    {language === "kn"
                      ? "ಈ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಅಧ್ಯಾಯಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
                      : language === "hi"
                      ? "इस फ़िल्टर के लिए कोई अध्याय नहीं मिला।"
                      : "No chapters match your filter or search query."}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {groupedByUnit.map(([unitName, unitData], uIdx) => {
                    const localizedUnit =
                      language === "kn" ? unitData.unitKn : language === "hi" ? unitData.unitHi : unitName;

                    return (
                      <div key={unitName} className="space-y-4">
                        {/* Unit Header Badge */}
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-navy text-gold font-black text-xs shadow-xs">
                            U{uIdx + 1}
                          </div>
                          <h4 className="text-sm font-black text-navy uppercase tracking-wider">
                            {localizedUnit}
                          </h4>
                          <div className="h-px bg-slate-200 flex-1 ml-2" />
                          <span className="text-[11px] font-bold text-slate-400">
                            {unitData.chapters.length} {language === "kn" ? "ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "अध्याय" : "Chapters"}
                          </span>
                        </div>

                        {/* Chapters in this Unit - Tree Nodes */}
                        <div className="relative pl-4 sm:pl-7 space-y-4 border-l-2 border-slate-200 ml-3.5">
                          {unitData.chapters.map((chapter) => {
                            const isExpanded = !!expandedChapters[chapter.id];
                            const localizedChapterTitle =
                              language === "kn" ? chapter.titleKn : language === "hi" ? chapter.titleHi : chapter.title;
                            const localizedChapterDesc =
                              language === "kn" ? chapter.descriptionKn : language === "hi" ? chapter.descriptionHi : chapter.description;

                            const masteredCount = chapter.subtopics.filter((st) => st.isCompleted).length;
                            const testRec = mcqRecords[chapter.id];
                            const attemptsUsed = testRec?.attemptsUsed || 0;
                            const isTestCleared = !!testRec?.isCleared;

                            return (
                              <div key={chapter.id} className="relative group">
                                <div className="absolute -left-4 sm:-left-7 top-6 w-4 sm:w-7 h-0.5 bg-slate-200 group-hover:bg-navy/40 transition-colors" />
                                <div
                                  className={`absolute -left-5.5 sm:-left-8.5 top-5 w-3 h-3 rounded-full border-2 border-white transition-all ${
                                    chapter.status === "Completed"
                                      ? "bg-emerald-500 ring-2 ring-emerald-200"
                                      : chapter.status === "In Progress"
                                      ? "bg-amber-500 ring-2 ring-amber-200 animate-pulse"
                                      : "bg-slate-300"
                                  }`}
                                />

                                {/* Chapter Main Card Node */}
                                <div
                                  className={`rounded-2xl border transition-all duration-200 bg-white ${
                                    isExpanded
                                      ? "border-navy/30 shadow-md ring-1 ring-navy/5"
                                      : "border-slate-200/90 shadow-xs hover:border-slate-300"
                                  }`}
                                >
                                  <div className="p-4 sm:p-5">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                                      {/* Left: Chapter numbering & Title */}
                                      <div
                                        onClick={() => toggleChapter(chapter.id)}
                                        className="flex items-start gap-3 cursor-pointer flex-1"
                                      >
                                        <div
                                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5 ${
                                            chapter.status === "Completed"
                                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                              : chapter.status === "In Progress"
                                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                                              : "bg-slate-100 text-slate-700 border border-slate-200"
                                          }`}
                                        >
                                          Ch {chapter.chapterNumber}
                                        </div>
                                        <div>
                                          <div className="flex flex-wrap items-center gap-2">
                                            <h5 className="font-black text-navy text-base leading-snug hover:text-blue-700 transition">
                                              {localizedChapterTitle}
                                            </h5>
                                            <span
                                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                                                chapter.status === "Completed"
                                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                                  : chapter.status === "In Progress"
                                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                                              }`}
                                            >
                                              {chapter.status === "Completed"
                                                ? language === "kn" ? "ಪೂರ್ಣಗೊಂಡಿದೆ" : language === "hi" ? "पूर्ण" : "Completed"
                                                : chapter.status === "In Progress"
                                                ? language === "kn" ? "ಪ್ರಗತಿಯಲ್ಲಿದೆ" : language === "hi" ? "प्रगति में" : "In Progress"
                                                : language === "kn" ? "ಮುಂದಿನದು" : language === "hi" ? "आगामी" : "Upcoming"}
                                            </span>

                                            {/* MCQ Test Status Badge */}
                                            {isTestCleared ? (
                                              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                                                🏆 Test Cleared ({testRec?.bestPercentage}%)
                                              </span>
                                            ) : attemptsUsed > 0 ? (
                                              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
                                                ⏳ Attempt {attemptsUsed}/3 ({testRec?.bestPercentage}%)
                                              </span>
                                            ) : null}
                                          </div>
                                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                            {localizedChapterDesc}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Right Action Controls: Notes, Textbook, Test (3 Attempts), Formulas & Status Selector */}
                                      <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center">
                                        {/* Notes & Revision Button */}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setNotesModalChapter(chapter);
                                          }}
                                          className="rounded-xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 px-2.5 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 transition"
                                          title="View NCERT Revision Notes & Textbook"
                                        >
                                          <FileText size={13} className="text-blue-600" />
                                          {language === "kn" ? "ಟಿಪ್ಪಣಿಗಳು" : language === "hi" ? "नोट्स" : "Notes"}
                                        </button>

                                        {/* MCQ Action Button: Test button for students vs Live Results for teachers/admins */}
                                        {role === "student" ? (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setMcqModalChapter(chapter);
                                            }}
                                            className={`rounded-xl px-2.5 py-1.5 text-xs font-black inline-flex items-center gap-1.5 transition shadow-2xs ${
                                              isTestCleared
                                                ? "bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                                                : attemptsUsed === 0
                                                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                                                : attemptsUsed < 3
                                                ? "bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200"
                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                            }`}
                                            title="Take Chapter MCQ Challenge (3 attempts allowed)"
                                          >
                                            <HelpCircle size={13} className={isTestCleared ? "text-emerald-700" : "text-white"} />
                                            {isTestCleared
                                              ? "Test Cleared 🏆"
                                              : attemptsUsed === 0
                                              ? language === "kn" ? "MCQ ಪರೀಕ್ಷೆ (3 ಪ್ರಯತ್ನ)" : language === "hi" ? "MCQ टेस्ट (3 प्रयास)" : "MCQ Test (3/3)"
                                              : `Retake (${3 - attemptsUsed} Left)`}
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setViewMode("live_tracking");
                                            }}
                                            className="rounded-xl bg-navy hover:bg-slate-800 text-white px-2.5 py-1.5 text-xs font-black inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                                            title="View student scores and results for this chapter in Live Tracker"
                                          >
                                            <Activity size={13} className="text-emerald-400 animate-pulse" />
                                            {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಫಲಿತಾಂಶಗಳು" : language === "hi" ? "छात्र परिणाम" : "Student Results"}
                                          </button>
                                        )}

                                        {/* Key Formulas Button */}
                                        {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setFormulaModalChapter(chapter);
                                            }}
                                            className="rounded-xl bg-amber-50 border border-gold/40 text-navy hover:bg-amber-100 px-2.5 py-1.5 text-xs font-bold inline-flex items-center gap-1 transition"
                                            title="View Key Formulas"
                                          >
                                            <Lightbulb size={13} className="text-gold" />
                                            {language === "kn" ? "ಸೂತ್ರಗಳು" : language === "hi" ? "सूत्र" : "Formulas"}
                                          </button>
                                        )}

                                        {/* Selection Option: Customizable Chapter Status Dropdown for all users */}
                                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                                          <Settings2 size={12} className="text-slate-400" />
                                          <select
                                            value={chapter.status}
                                            onChange={(e) =>
                                              handleUpdateChapterStatus(
                                                currentSubject.id,
                                                chapter.id,
                                                e.target.value as "Completed" | "In Progress" | "Upcoming"
                                              )
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-transparent text-xs font-bold text-navy outline-none cursor-pointer"
                                            title="Change Chapter Learning Status"
                                          >
                                            <option value="Completed">✓ {language === "kn" ? "ಪೂರ್ಣಗೊಂಡಿದೆ" : language === "hi" ? "पूर्ण" : "Completed"}</option>
                                            <option value="In Progress">⏳ {language === "kn" ? "ಪ್ರಗತಿಯಲ್ಲಿದೆ" : language === "hi" ? "प्रगति में" : "In Progress"}</option>
                                            <option value="Upcoming">📅 {language === "kn" ? "ಮುಂದಿನದು" : language === "hi" ? "आगामी" : "Upcoming"}</option>
                                          </select>
                                        </div>

                                        {/* Expand Toggle */}
                                        <button
                                          type="button"
                                          onClick={() => toggleChapter(chapter.id)}
                                          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition"
                                        >
                                          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                        </button>
                                      </div>
                                    </div>

                                    {/* Progress Bar for Chapter */}
                                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                          className={`h-full rounded-full transition-all duration-500 ${
                                            chapter.status === "Completed"
                                              ? "bg-emerald-500"
                                              : chapter.status === "In Progress"
                                              ? "bg-amber-500"
                                              : "bg-slate-300"
                                          }`}
                                          style={{ width: `${chapter.completionPercent}%` }}
                                        />
                                      </div>
                                      <span className="text-[11px] font-bold text-slate-500 shrink-0">
                                        {masteredCount}/{chapter.subtopics.length} {language === "kn" ? "ಪರಿಕಲ್ಪನೆಗಳು" : language === "hi" ? "संकल्पनाएं" : "Concepts"} ({chapter.completionPercent}%)
                                      </span>
                                    </div>
                                  </div>

                                  {/* Nested Subtopic Leaf Nodes */}
                                  {isExpanded && (
                                    <div className="bg-slate-50/80 p-4 sm:p-5 rounded-b-2xl border-t border-slate-100 space-y-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                          <ListTree size={13} />
                                          {language === "kn"
                                            ? "ಅಧ್ಯಾಯದ ಪರಿಕಲ್ಪನಾ ವೃಕ್ಷ ಮತ್ತು ಪರೀಕ್ಷಾ ಅಂಶಗಳು"
                                            : language === "hi"
                                            ? "अध्याय की संकल्पना ट्री और परीक्षा बिंदु"
                                            : "Chapter Concept Tree & Board Exam Milestones"}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-400">
                                          {language === "kn"
                                            ? "ಕಲಿಕೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ"
                                            : language === "hi"
                                            ? "दक्षता चिह्नित करने के लिए क्लिक करें"
                                            : "Click checkbox to mark mastery"}
                                        </span>
                                      </div>

                                      <div className="space-y-2.5 relative pl-3 sm:pl-5 border-l-2 border-dashed border-slate-300 ml-2">
                                        {chapter.subtopics.map((subtopic, sIdx) => {
                                          const localizedSubtopic =
                                            language === "kn"
                                              ? subtopic.titleKn
                                              : language === "hi"
                                              ? subtopic.titleHi
                                              : subtopic.title;

                                          return (
                                            <div
                                              key={subtopic.id}
                                              onClick={() =>
                                                handleToggleSubtopic(
                                                  currentSubject.id,
                                                  chapter.id,
                                                  subtopic.id
                                                )
                                              }
                                              className={`relative flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                                                subtopic.isCompleted
                                                  ? "bg-emerald-50/50 border-emerald-200 text-navy shadow-2xs"
                                                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700"
                                              }`}
                                            >
                                              <div className="absolute -left-3 sm:-left-5 top-1/2 w-3 sm:w-5 h-0.5 border-t-2 border-dashed border-slate-300" />
                                              <div
                                                className={`absolute -left-4.5 sm:-left-6.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                                                  subtopic.isCompleted ? "bg-emerald-500" : "bg-slate-300"
                                                }`}
                                              />

                                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <button
                                                  type="button"
                                                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition ${
                                                    subtopic.isCompleted
                                                      ? "bg-emerald-600 text-white"
                                                      : "border-2 border-slate-300 text-transparent hover:border-navy"
                                                  }`}
                                                >
                                                  <Check size={14} className={subtopic.isCompleted ? "opacity-100" : "opacity-0"} />
                                                </button>

                                                <div className="min-w-0">
                                                  <span
                                                    className={`text-xs font-bold leading-tight block ${
                                                      subtopic.isCompleted ? "line-through text-slate-500" : "text-navy"
                                                    }`}
                                                  >
                                                    {sIdx + 1}. {localizedSubtopic}
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="flex items-center gap-2 shrink-0">
                                                <span
                                                  className={`rounded-md border px-2 py-0.5 text-[10px] ${getTagBadgeStyle(
                                                    subtopic.type
                                                  )}`}
                                                >
                                                  {subtopic.type}
                                                </span>
                                                <span className="text-[11px] font-bold text-slate-400 hidden sm:inline-block">
                                                  {subtopic.estimatedMinutes}m
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 5. MODALS: MCQ TEST MODAL */}
      {/* =================================================================== */}
      {mcqModalChapter && (
        <MCQTestModal
          chapter={mcqModalChapter}
          subjectId={currentSubject.id}
          classGrade={currentSubject.classGrade}
          studentId={session.studentId || "std-101"}
          studentName={session.name || "Aarav Sharma"}
          onClose={() => setMcqModalChapter(null)}
          onToast={onToast}
        />
      )}

      {/* =================================================================== */}
      {/* 6. MODALS: CHAPTER NOTES & TEXTBOOK MODAL */}
      {/* =================================================================== */}
      {notesModalChapter && (
        <ChapterNotesModal
          chapter={notesModalChapter}
          subjectName={currentSubject.name}
          classGrade={currentSubject.classGrade}
          onClose={() => setNotesModalChapter(null)}
          onOpenTest={() => {
            setMcqModalChapter(notesModalChapter);
          }}
        />
      )}

      {/* =================================================================== */}
      {/* 7. MODALS: FORMULA SHEET MODAL */}
      {/* =================================================================== */}
      {formulaModalChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="card max-w-xl w-full bg-white p-6 space-y-4 shadow-2xl rounded-3xl border border-gold/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-gold">
                <Lightbulb size={20} />
                <h3 className="text-base font-black text-navy">
                  {language === "kn"
                    ? `${formulaModalChapter.titleKn} - ಪ್ರಮುಖ ಸೂತ್ರಗಳು`
                    : language === "hi"
                    ? `${formulaModalChapter.titleHi} - मुख्य सूत्र एवं बिंदु`
                    : `${formulaModalChapter.title} — Key Formulas & Exam Points`}
                </h3>
              </div>
              <button
                onClick={() => setFormulaModalChapter(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                {language === "kn"
                  ? "ಪರೀಕ್ಷೆಗೆ ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ಸೂತ್ರಗಳು ಮತ್ತು ಸಂಕ್ಷಿಪ್ತ ನಿಯಮಗಳು:"
                  : language === "hi"
                  ? "परीक्षा के लिए अत्यंत महत्वपूर्ण सूत्र एवं संक्षिप्त नियम:"
                  : "Essential formulas, theorems, and key equations for quick revision:"}
              </p>

              <div className="space-y-2">
                {formulaModalChapter.keyFormulas?.map((formula, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs border border-slate-800 shadow-inner flex items-center justify-between gap-2"
                  >
                    <span>{formula}</span>
                    <span className="text-[10px] text-slate-400 font-sans uppercase">Formula #{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setFormulaModalChapter(null)}
                className="btn primary text-xs font-bold px-5 py-2"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : language === "hi" ? "बंद करें" : "Got it / Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Photo Doubt Solver Modal */}
      {isAiDoubtModalOpen && (
        <AIDoubtSolverModal
          isOpen={isAiDoubtModalOpen}
          onClose={() => setIsAiDoubtModalOpen(false)}
          session={session}
          onToast={onToast}
          initialSubject={currentSubject.name}
        />
      )}

      {/* NCERT / CBSE Question Paper Generator Modal */}
      {isQuestionPaperModalOpen && (
        <QuestionPaperGeneratorModal
          isOpen={isQuestionPaperModalOpen}
          onClose={() => setIsQuestionPaperModalOpen(false)}
          onToast={onToast}
          defaultSubjectId={currentSubject.id}
          defaultClass={selectedClass}
        />
      )}
    </div>
  );
}
