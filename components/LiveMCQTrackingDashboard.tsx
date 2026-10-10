"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Role, UserSession, DataStore, StudentRecord, DEFAULT_STUDENTS } from "@/lib/dataStore";
import { SubjectWorkflow, ChapterNode } from "@/lib/curriculumData";
import {
  loadAllStudentMCQRecords,
  getStudentMCQRecords,
  resetChapterMCQAttempts,
  resetAllStudentMCQAttempts,
  getChapterMCQQuestions,
  ChapterTestRecord,
  ChapterTestAttempt,
  MCQQuestion,
  DEFAULT_STUDENT_ID,
} from "@/lib/mcqTestData";
import { WhatsAppReportDispatcherModal } from "@/components/WhatsAppReportDispatcherModal";
import { StudentCertificateModal } from "@/components/StudentCertificateModal";
import { StudentScorecardPdfModal } from "@/components/StudentScorecardPdfModal";
import {
  Activity,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
  Flame,
  Clock,
  BookOpen,
  HelpCircle,
  Sparkles,
  TrendingUp,
  Layers,
  ChevronRight,
  User,
  Users,
  Eye,
  GraduationCap,
  X,
  FileCheck2,
  Check,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  Printer,
  Share2,
  Download,
  FileText,
} from "lucide-react";

interface LiveMCQTrackingDashboardProps {
  curricula: SubjectWorkflow[];
  role: Role;
  session: UserSession;
  selectedClass: "Class 10" | "Class 9" | "Class 8";
  onSelectClass: (grade: "Class 10" | "Class 9" | "Class 8") => void;
  onOpenTest: (chapter: ChapterNode, subjectId: string) => void;
  onOpenNotes: (chapter: ChapterNode, subjectName: string) => void;
  onToast: (msg: string) => void;
}

export function LiveMCQTrackingDashboard({
  curricula,
  role,
  session,
  selectedClass,
  onSelectClass,
  onOpenTest,
  onOpenNotes,
  onToast,
}: LiveMCQTrackingDashboardProps) {
  const { language } = useLanguage();

  // Load all students from DataStore
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = DataStore.getStudents();
        if (stored && stored.length > 0) return stored;
      } catch {
        // fallback
      }
    }
    return DEFAULT_STUDENTS;
  });

  // Students in currently selected class
  const classStudents = useMemo(() => {
    return students.filter((s) => s.class === selectedClass);
  }, [students, selectedClass]);

  // Selected student filter: 'all' or studentId
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    if (role === "student") {
      // Find matching student id or default
      const found = students.find(
        (s) => s.name.toLowerCase() === session.name.toLowerCase() || s.id === session.studentId
      );
      return found ? found.id : DEFAULT_STUDENT_ID;
    }
    // For teachers/admins, default to "all" (class overview) or first student
    return "all";
  });

  // Master records dictionary: studentId -> chapterId -> ChapterTestRecord
  const [allStudentRecords, setAllStudentRecords] = useState<
    Record<string, Record<string, ChapterTestRecord>>
  >({});

  const refreshAllRecords = () => {
    setAllStudentRecords(loadAllStudentMCQRecords());
  };

  useEffect(() => {
    refreshAllRecords();
    const handleUpdate = () => {
      refreshAllRecords();
    };
    window.addEventListener("ttc_mcq_test_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("ttc_mcq_test_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Update selected student when role changes or class changes
  useEffect(() => {
    if (role === "student") {
      const found = students.find(
        (s) => s.name.toLowerCase() === session.name.toLowerCase() || s.id === session.studentId
      );
      setSelectedStudentId(found ? found.id : DEFAULT_STUDENT_ID);
    }
  }, [role, session, students]);

  // Active student object when an individual is selected
  const activeStudent = useMemo(() => {
    if (selectedStudentId === "all") return null;
    return students.find((s) => s.id === selectedStudentId) || classStudents[0] || null;
  }, [students, classStudents, selectedStudentId]);

  // Active student's records
  const activeStudentChapterRecords = useMemo(() => {
    if (!activeStudent) return {};
    return allStudentRecords[activeStudent.id] || {};
  }, [allStudentRecords, activeStudent]);

  // Filter subjects for active class
  const classSubjects = useMemo(() => {
    return curricula.filter((c) => c.classGrade === selectedClass);
  }, [curricula, selectedClass]);

  // Aggregate all chapters for chosen class
  const allClassChapters = useMemo(() => {
    const list: { chapter: ChapterNode; subject: SubjectWorkflow }[] = [];
    classSubjects.forEach((subj) => {
      subj.chapters.forEach((ch) => {
        list.push({ chapter: ch, subject: subj });
      });
    });
    return list;
  }, [classSubjects]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "cleared" | "in_progress" | "untested" | "locked">("all");

  // Inspector Modal State
  const [inspectModalData, setInspectModalData] = useState<{
    chapter: ChapterNode;
    subject: SubjectWorkflow;
    record: ChapterTestRecord;
    student: StudentRecord;
  } | null>(null);

  const [activeAttemptTab, setActiveAttemptTab] = useState<number>(0);

  // WhatsApp Dispatcher Modal State
  const [whatsAppModalStudent, setWhatsAppModalStudent] = useState<StudentRecord | null>(null);

  // Certificate Modal State
  const [certModalData, setCertModalData] = useState<{
    student: StudentRecord;
    chapter?: ChapterNode;
    subject?: SubjectWorkflow;
    record?: ChapterTestRecord;
  } | null>(null);

  // Official Report Card / Scorecard PDF Modal State
  const [scorecardModalStudent, setScorecardModalStudent] = useState<StudentRecord | null>(null);

  // Overall Class Leaderboard Stats
  const classLeaderboard = useMemo(() => {
    const totalChapters = allClassChapters.length;
    return classStudents.map((std) => {
      const stdRecs = allStudentRecords[std.id] || {};
      let attempted = 0;
      let cleared = 0;
      let totalScoreSum = 0;
      let totalAttemptsUsed = 0;
      let lastActivity: string | null = null;

      allClassChapters.forEach(({ chapter }) => {
        const rec = stdRecs[chapter.id];
        if (rec && rec.attemptsUsed > 0) {
          attempted += 1;
          totalScoreSum += rec.bestPercentage;
          totalAttemptsUsed += rec.attemptsUsed;
          if (rec.isCleared) cleared += 1;
          if (rec.lastAttemptDate) {
            if (!lastActivity || new Date(rec.lastAttemptDate) > new Date(lastActivity)) {
              lastActivity = rec.lastAttemptDate;
            }
          }
        }
      });

      const avgScore = attempted > 0 ? Math.round(totalScoreSum / attempted) : 0;
      const passRate = attempted > 0 ? Math.round((cleared / attempted) * 100) : 0;

      return {
        student: std,
        attempted,
        totalChapters,
        cleared,
        avgScore,
        passRate,
        totalAttemptsUsed,
        lastActivity,
      };
    }).sort((a, b) => {
      if (b.cleared !== a.cleared) return b.cleared - a.cleared;
      return b.avgScore - a.avgScore;
    });
  }, [classStudents, allClassChapters, allStudentRecords]);

  // Class-wide aggregated metrics
  const classAggregatedStats = useMemo(() => {
    let totalAttempts = 0;
    let totalCleared = 0;
    let sumAvgScores = 0;
    let activeStudentsCount = 0;

    classLeaderboard.forEach((row) => {
      totalAttempts += row.totalAttemptsUsed;
      totalCleared += row.cleared;
      if (row.attempted > 0) {
        sumAvgScores += row.avgScore;
        activeStudentsCount += 1;
      }
    });

    const classAverageScore = activeStudentsCount > 0 ? Math.round(sumAvgScores / activeStudentsCount) : 0;
    const totalPossibleChapters = classStudents.length * allClassChapters.length;
    const overallPassRate =
      totalAttempts > 0 ? Math.round((totalCleared / Math.max(1, totalAttempts)) * 100) : 0;

    return {
      totalStudents: classStudents.length,
      activeStudentsCount,
      totalAttempts,
      totalCleared,
      classAverageScore,
      overallPassRate,
      totalPossibleChapters,
    };
  }, [classLeaderboard, classStudents, allClassChapters]);

  // Individual Student Active Stats
  const activeStudentStats = useMemo(() => {
    if (!activeStudent) return null;
    const recs = activeStudentChapterRecords;
    let attempted = 0;
    let cleared = 0;
    let totalScoreSum = 0;
    let totalAttemptsUsed = 0;
    let lockedCount = 0;

    allClassChapters.forEach(({ chapter }) => {
      const rec = recs[chapter.id];
      if (rec && rec.attemptsUsed > 0) {
        attempted += 1;
        totalScoreSum += rec.bestPercentage;
        totalAttemptsUsed += rec.attemptsUsed;
        if (rec.isCleared) cleared += 1;
        if (!rec.isCleared && rec.attemptsUsed >= 3) lockedCount += 1;
      }
    });

    const avgScore = attempted > 0 ? Math.round(totalScoreSum / attempted) : 0;
    const passRate = attempted > 0 ? Math.round((cleared / attempted) * 100) : 0;

    return {
      totalChapters: allClassChapters.length,
      attempted,
      cleared,
      avgScore,
      passRate,
      lockedCount,
      totalAttemptsUsed,
    };
  }, [activeStudent, activeStudentChapterRecords, allClassChapters]);

  // Filtered chapter rows for individual student view
  const filteredIndividualRows = useMemo(() => {
    if (!activeStudent) return [];
    return allClassChapters.filter(({ chapter, subject }) => {
      const rec = activeStudentChapterRecords[chapter.id];
      const isCleared = !!rec?.isCleared;
      const isAttempted = (rec?.attemptsUsed || 0) > 0;
      const isLocked = !isCleared && (rec?.attemptsUsed || 0) >= 3;

      if (statusFilter === "cleared" && !isCleared) return false;
      if (statusFilter === "in_progress" && (!isAttempted || isCleared || isLocked)) return false;
      if (statusFilter === "untested" && isAttempted) return false;
      if (statusFilter === "locked" && !isLocked) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          chapter.title.toLowerCase().includes(q) ||
          chapter.titleKn.toLowerCase().includes(q) ||
          chapter.titleHi.toLowerCase().includes(q);
        const matchSubject = subject.name.toLowerCase().includes(q);
        const matchUnit = chapter.unit.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchUnit) return false;
      }

      return true;
    });
  }, [activeStudent, allClassChapters, activeStudentChapterRecords, statusFilter, searchQuery]);

  // Recent Live Activity Log across all students or selected student
  const recentActivities = useMemo(() => {
    const logs: {
      studentId: string;
      studentName: string;
      chapterId: string;
      chapterTitle: string;
      subjectId: string;
      score: number;
      percentage: number;
      passed: boolean;
      attemptNumber: number;
      timestamp: string;
    }[] = [];

    const targetStudentIds =
      selectedStudentId === "all"
        ? classStudents.map((s) => s.id)
        : [selectedStudentId];

    targetStudentIds.forEach((sId) => {
      const stdRecs = allStudentRecords[sId] || {};
      const std = students.find((s) => s.id === sId);
      const studentName = std ? std.name : "Student";

      Object.values(stdRecs).forEach((rec) => {
        rec.history.forEach((att) => {
          logs.push({
            studentId: sId,
            studentName: rec.studentName || studentName,
            chapterId: rec.chapterId,
            chapterTitle: rec.chapterTitle,
            subjectId: rec.subjectId,
            score: att.score,
            percentage: att.percentage,
            passed: att.passed,
            attemptNumber: att.attemptNumber,
            timestamp: att.timestamp,
          });
        });
      });
    });

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);
  }, [allStudentRecords, selectedStudentId, classStudents, students]);

  // Handle Teacher/Admin Reset of Attempts for a chapter
  const handleResetAttempts = (chapterId: string, chapterTitle: string, targetStudent: StudentRecord) => {
    if (confirm(`Reset all 3 MCQ test attempts for "${chapterTitle}" for student ${targetStudent.name}?`)) {
      resetChapterMCQAttempts(chapterId, targetStudent.id);
      refreshAllRecords();
      onToast(
        language === "kn"
          ? `${targetStudent.name} ಅವರ "${chapterTitle}" ಪರೀಕ್ಷಾ ಪ್ರಯತ್ನಗಳನ್ನು ಮರುಹೊಂದಿಸಲಾಗಿದೆ.`
          : language === "hi"
          ? `${targetStudent.name} के लिए "${chapterTitle}" के टेस्ट प्रयास रीसेट कर दिए गए हैं।`
          : `Test attempts for "${chapterTitle}" reset to 0/3 for ${targetStudent.name}.`
      );
    }
  };

  // Open the detailed Answer Sheet Inspector modal
  const handleOpenInspector = (
    chapter: ChapterNode,
    subject: SubjectWorkflow,
    record: ChapterTestRecord,
    student: StudentRecord
  ) => {
    setInspectModalData({ chapter, subject, record, student });
    setActiveAttemptTab(Math.max(0, record.history.length - 1));
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Banner */}
      <div className="rounded-3xl bg-[#0f172a] bg-gradient-to-r from-navy via-slate-900 to-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-black text-emerald-300">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              {role === "student"
                ? language === "kn"
                  ? "ನನ್ನ ಲೈವ್ MCQ ಪರೀಕ್ಷಾ ಟ್ರ್ಯಾಕಿಂಗ್"
                  : language === "hi"
                  ? "मेरा लाइव MCQ टेस्ट ट्रैकर"
                  : "My Live MCQ Performance Tracker"
                : language === "kn"
                ? "ವಿದ್ಯಾರ್ಥಿಗಳ ಲೈವ್ MCQ ಪ್ರದರ್ಶನ ಇನ್ಸ್ಪೆಕ್ಟರ್"
                : language === "hi"
                ? "छात्रवार लाइव MCQ प्रदर्शन ट्रैकर एवं मूल्यांकन"
                : "Individual Student MCQ Performance & Live Tracker"}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {role === "student"
                ? language === "kn"
                  ? "ಅಧ್ಯಾಯವಾರು MCQ ಪ್ರಾವೀಣ್ಯತೆ ಮತ್ತು ಸ್ಕೋರ್‌ಬೋರ್ಡ್"
                  : language === "hi"
                  ? "अध्यायवार लाइव MCQ दक्षता स्कोरबोर्ड"
                  : "Chapter MCQ Mastery & Scorecard"
                : language === "kn"
                ? "ವಿದ್ಯಾರ್ಥಿವಾರು MCQ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು ಮತ್ತು ಲೈವ್ ಸ್ಕೋರ್‌ಬೋರ್ಡ್"
                : language === "hi"
                ? "व्यक्तिगत छात्र MCQ परिणाम एवं लाइव प्रदर्शन ट्रैकर"
                : "Individual Student MCQ Scores & Live Tracker"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {role === "student"
                ? language === "kn"
                  ? "ಪ್ರತಿ ಅಧ್ಯಾಯಕ್ಕೆ 3 ಪ್ರಯತ್ನಗಳ ನಿಯಮ, ≥70% ತೇರ್ಗಡೆ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ನೈಜ-ಸಮಯದ ಪ್ರಗತಿ."
                  : language === "hi"
                  ? "प्रत्येक अध्याय के लिए 3 प्रयासों का नियम, ≥70% उत्तीर्णता और वास्तविक समय की प्रगति।"
                  : "Track your 3 allowed MCQ attempts per chapter, unlock Cleared 🏆 badges (≥70%), and review answer keys."
                : language === "kn"
                ? "ನಿಯಮಿತ ಪರೀಕ್ಷೆಗಳಿಂದ ಭಿನ್ನವಾಗಿ, ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯ ಅಧ್ಯಾಯವಾರು MCQ ಪ್ರಯತ್ನಗಳು (1/3, 2/3, 3/3), ಅಂಕಗಳು ಮತ್ತು ಉತ್ತರ ಪತ್ರಿಕೆಗಳನ್ನು ಇಲ್ಲಿ ಪರಿಶೀಲಿಸಿ."
                : language === "hi"
                ? "नियमित परीक्षाओं से अलग, प्रत्येक व्यक्तिगत छात्र के अध्यायवार MCQ प्रयास, स्कोर एवं उत्तर-पुस्तिका का लाइव निरीक्षण करें।"
                : "Distinct from regular term exams, monitor each individual student's live chapter challenge attempts, score percentages, pass badges, and detailed answer sheets."}
            </p>
          </div>

          {/* Controls: Class Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 shrink-0">
            {(["Class 10", "Class 9", "Class 8"] as const).map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => {
                  onSelectClass(grade);
                  if (role !== "student") setSelectedStudentId("all");
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
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

        {/* Real-time KPI Stats Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          {selectedStudentId === "all" ? (
            <>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  {language === "kn" ? "ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳು" : language === "hi" ? "कुल नामांकित छात्र" : "Enrolled Students"}
                </span>
                <span className="text-2xl font-black text-white mt-0.5 block">
                  {classAggregatedStats.totalStudents} {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಗಳು" : language === "hi" ? "छात्र" : "Students"}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  {language === "kn" ? "ತೇರ್ಗಡೆಯಾದ ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "उत्तीर्ण अध्याय टेस्ट" : "Total Cleared Tests"}
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
                  {classAggregatedStats.totalCleared} 🏆
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  {language === "kn" ? "ತರಗತಿಯ ಸರಾಸರಿ ಅಂಕಗಳು" : language === "hi" ? "कक्षा औसत MCQ स्कोर" : "Class Average Score"}
                </span>
                <span className="text-2xl font-black text-amber-300 mt-0.5 block">
                  {classAggregatedStats.classAverageScore}%
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಒಟ್ಟು ಲಾಗ್ ಮಾಡಿದ ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "कुल टेस्ट प्रयास" : "Total Attempts Logged"}
                </span>
                <span className="text-2xl font-black text-sky-300 mt-0.5 block">
                  {classAggregatedStats.totalAttempts} {language === "kn" ? "ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "प्रयास" : "Attempts"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಪರೀಕ್ಷೆ ತೆಗೆದುಕೊಂಡ ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "अध्याय टेस्ट दिए" : "Tests Attempted"}
                </span>
                <span className="text-2xl font-black text-white mt-0.5 block">
                  {activeStudentStats?.attempted} / {activeStudentStats?.totalChapters}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  {language === "kn" ? "ತೇರ್ಗಡೆ ಪ್ರಮಾಣ (≥70%)" : language === "hi" ? "उत्तीर्ण दर (≥70%)" : "Pass / Cleared Rate"}
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
                  {activeStudentStats?.passRate}% ({activeStudentStats?.cleared} 🏆)
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಸರಾಸರಿ MCQ ಅಂಕಗಳು" : language === "hi" ? "औसत MCQ स्कोर" : "Average MCQ Score"}
                </span>
                <span className="text-2xl font-black text-amber-300 mt-0.5 block">
                  {activeStudentStats?.avgScore}%
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                  {language === "kn" ? "ಬಳಸಿದ ಒಟ್ಟು ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "उपयोग किए गए कुल प्रयास" : "Total Attempts Logged"}
                </span>
                <span className="text-2xl font-black text-sky-300 mt-0.5 block">
                  {activeStudentStats?.totalAttemptsUsed} {language === "kn" ? "ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "प्रयास" : "Attempts"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. STUDENT SELECTOR BAR (For Teachers & Admins) */}
      {(role === "teacher" || role === "admin") && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center font-black">
                <Users size={16} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-navy">
                  {language === "kn"
                    ? "ವಿದ್ಯಾರ್ಥಿ ಆಯ್ಕೆ ಮತ್ತು ಫಲಿತಾಂಶಗಳ ಇನ್ಸ್ಪೆಕ್ಟರ್"
                    : language === "hi"
                    ? "छात्र चयन एवं व्यक्तिगत परिणाम निरीक्षक"
                    : "Student Selector & Live Scorecard Inspector"}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === "kn"
                    ? "ವೈಯಕ್ತಿಕ ವಿದ್ಯಾರ್ಥಿಯ 3-ಪ್ರಯತ್ನಗಳ MCQ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಲು ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
                    : language === "hi"
                    ? "किसी भी छात्र का व्यक्तिगत अध्यायवार MCQ स्कोरकार्ड और उत्तर पुस्तिका देखने के लिए चयन करें"
                    : "Select an individual student to inspect their 3-attempt MCQ scores, answers, and timestamps"}
                </p>
              </div>
            </div>

            {/* Quick Student Dropdown Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="student-picker" className="text-xs font-bold text-slate-600 hidden md:block">
                {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ:" : language === "hi" ? "छात्र चुनें:" : "Select Student:"}
              </label>
              <select
                id="student-picker"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-black text-navy outline-none focus:border-navy shadow-2xs"
              >
                <option value="all">
                  🌟 {language === "kn" ? "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು (ತರಗತಿಯ ಲೀಡರ್‌ಬೋರ್ಡ್)" : language === "hi" ? "सभी छात्र (कक्षा लीडरबोर्ड)" : "All Students (Class Leaderboard & Summary)"}
                </option>
                {classStudents.map((std) => {
                  const stdRecs = allStudentRecords[std.id] || {};
                  const clearedCount = Object.values(stdRecs).filter((r) => r.isCleared).length;
                  return (
                    <option key={std.id} value={std.id}>
                      👤 {std.name} ({std.roll}) — {clearedCount} 🏆 Cleared
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Quick Select Pill Buttons for Students */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedStudentId("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                selectedStudentId === "all"
                  ? "bg-navy text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Users size={13} />
              {language === "kn" ? "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು" : language === "hi" ? "सभी छात्र" : "All Students Overview"}
            </button>

            {classStudents.map((std) => {
              const stdRecs = allStudentRecords[std.id] || {};
              const clearedCount = Object.values(stdRecs).filter((r) => r.isCleared).length;
              const isSelected = selectedStudentId === std.id;
              return (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => setSelectedStudentId(std.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#c9a84c] text-[#0f172a] font-black shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <User size={13} />
                  <span>{std.name}</span>
                  {clearedCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {clearedCount} 🏆
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT: ALL STUDENTS LEADERBOARD VS INDIVIDUAL STUDENT SCORECARD */}
      {selectedStudentId === "all" ? (
        /* ================================================================= */
        /* VIEW A: ALL STUDENTS CLASS PERFORMANCE LEADERBOARD TABLE */
        /* ================================================================= */
        <div className="space-y-6">
          <div className="card p-5 bg-white shadow-xs border border-slate-200/90 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-navy flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#c9a84c]" />
                  {selectedClass} {language === "kn" ? "ಲೈವ್ ವಿದ್ಯಾರ್ಥಿ MCQ ಪ್ರದರ್ಶನ ಲೀಡರ್‌ಬೋರ್ಡ್" : language === "hi" ? "लाइव छात्र MCQ प्रदर्शन लीडरबोर्ड" : "Live Student MCQ Performance Leaderboard"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {language === "kn"
                    ? "ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯ ಒಟ್ಟು ಪರೀಕ್ಷೆಗಳು, ತೇರ್ಗಡೆ ದರ ಮತ್ತು ಸರಾಸರಿ ಅಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ"
                    : language === "hi"
                    ? "प्रत्येक छात्र के कुल टेस्ट, उत्तीर्ण अध्याय और औसत स्कोर का विवरण"
                    : "Individual student test completion, pass rates (≥70%), and average mastery scores"}
                </p>
              </div>

              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                {classStudents.length} {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿಗಳು ದಾಖಲಾಗಿದ್ದಾರೆ" : language === "hi" ? "छात्र नामांकित" : "Students Enrolled"}
              </span>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-black uppercase tracking-wider text-[11px]">
                    <th className="p-3">#</th>
                    <th className="p-3">{language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ" : language === "hi" ? "छात्र" : "Student"}</th>
                    <th className="p-3">{language === "kn" ? "ರೋಲ್ ನಂ" : language === "hi" ? "रोल नं" : "Roll No"}</th>
                    <th className="p-3">{language === "kn" ? "ಪರೀಕ್ಷೆ ತೆಗೆದುಕೊಂಡ ಅಧ್ಯಾಯಗಳು" : language === "hi" ? "अध्याय टेस्ट" : "Tests Attempted"}</th>
                    <th className="p-3">{language === "kn" ? "ತೇರ್ಗಡೆಯಾದ (≥70%)" : language === "hi" ? "उत्तीर्ण (≥70%)" : "Cleared (≥70%)"}</th>
                    <th className="p-3">{language === "kn" ? "ಸರಾಸರಿ ಅಂಕಗಳು" : language === "hi" ? "औसत स्कोर" : "Average Score"}</th>
                    <th className="p-3">{language === "kn" ? "ಒಟ್ಟು ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "कुल प्रयास" : "Attempts Used"}</th>
                    <th className="p-3">{language === "kn" ? "ಸ್ಥಿತಿ" : language === "hi" ? "स्थिति" : "Mastery Level"}</th>
                    <th className="p-3 text-right">{language === "kn" ? "ಕ್ರಿಯೆ" : language === "hi" ? "कार्रवाई" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classLeaderboard.map((row, idx) => {
                    const rankMedal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`;
                    const masteryBadge =
                      row.avgScore >= 80
                        ? { label: "High Mastery", color: "bg-emerald-100 text-emerald-800 border-emerald-300" }
                        : row.avgScore >= 60
                        ? { label: "On Track", color: "bg-sky-100 text-sky-800 border-sky-300" }
                        : row.attempted > 0
                        ? { label: "Needs Practice", color: "bg-amber-100 text-amber-800 border-amber-300" }
                        : { label: "Not Started", color: "bg-slate-100 text-slate-600 border-slate-200" };

                    return (
                      <tr key={row.student.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-black text-slate-700">{rankMedal}</td>
                        <td className="p-3 font-black text-navy flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs">
                            {row.student.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block leading-tight">{row.student.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{row.student.email}</span>
                          </div>
                        </td>
                        <td className="p-3 font-bold text-slate-500">{row.student.roll}</td>
                        <td className="p-3 font-extrabold text-slate-700">
                          <div className="flex items-center gap-2">
                            <span>{row.attempted} / {row.totalChapters}</span>
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-navy h-full rounded-full"
                                style={{
                                  width: `${Math.round((row.attempted / Math.max(1, row.totalChapters)) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-black text-emerald-700">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
                            <CheckCircle2 size={12} />
                            {row.cleared} 🏆
                          </span>
                        </td>
                        <td className="p-3 font-black">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                              row.avgScore >= 75
                                ? "bg-emerald-100 text-emerald-900"
                                : row.avgScore >= 50
                                ? "bg-amber-100 text-amber-900"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {row.avgScore}%
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-600">{row.totalAttemptsUsed}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black border ${masteryBadge.color}`}>
                            {masteryBadge.label}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedStudentId(row.student.id)}
                              className="btn primary text-xs font-black py-1.5 px-2.5 gap-1 inline-flex items-center shadow-2xs cursor-pointer"
                              title="Inspect individual student scorecard"
                            >
                              <Eye size={13} />
                              {language === "kn" ? "ಫಲಿತಾಂಶ" : language === "hi" ? "स्कोरकार्ड" : "Inspect"}
                            </button>

                            {(role === "teacher" || role === "admin") && (
                              <button
                                type="button"
                                onClick={() => setWhatsAppModalStudent(row.student)}
                                className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition cursor-pointer"
                                title={`Dispatch WhatsApp / SMS report to ${row.student.parentName}`}
                              >
                                <MessageCircle size={14} className="text-emerald-600" />
                              </button>
                            )}

                            {row.cleared > 0 && (
                              <button
                                type="button"
                                onClick={() => setCertModalData({ student: row.student })}
                                className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition cursor-pointer"
                                title={`Download Certificate of Mastery for ${row.student.name}`}
                              >
                                <Award size={14} className="text-amber-600" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setScorecardModalStudent(row.student)}
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                              title={`Download Printable PDF Report Card for ${row.student.name}`}
                            >
                              <FileText size={14} className="text-navy" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="card p-5 bg-white shadow-xs border border-slate-200/90 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b pb-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                <Flame size={15} className="text-amber-500" />
                {language === "kn" ? "ಲೈವ್ ಪರೀಕ್ಷಾ ಚಟುವಟಿಕೆ ಫೀಡ್" : language === "hi" ? "लाइव टेस्ट गतिविधि फ़ीड" : "Live Class Test Activity Feed"}
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                ● Live Updates
              </span>
            </div>

            {recentActivities.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No recent tests recorded yet for {selectedClass}.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {recentActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-navy flex items-center gap-1.5">
                        <User size={13} className="text-[#c9a84c]" />
                        {act.studentName}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          act.passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {act.percentage}% {act.passed ? "🏆 Passed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 line-clamp-1">{act.chapterTitle}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-200/60">
                      <span>Attempt #{act.attemptNumber} of 3</span>
                      <span>{new Date(act.timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* VIEW B: INDIVIDUAL STUDENT SCORECARD & CHAPTER-BY-CHAPTER BREAKDOWN */
        /* ================================================================= */
        <div className="space-y-6">
          {/* Active Student Profile Header */}
          {activeStudent && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy to-slate-800 text-white flex items-center justify-center font-black text-lg shadow-sm">
                  {activeStudent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-navy">{activeStudent.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold border border-slate-200">
                      {activeStudent.roll}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#c9a84c]/20 text-navy text-[11px] font-black">
                      {activeStudent.class}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeStudent.email} • {activeStudent.phone}
                  </p>
                </div>
              </div>

              {/* Student Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp Report Dispatcher */}
                {(role === "teacher" || role === "admin") && (
                  <button
                    type="button"
                    onClick={() => setWhatsAppModalStudent(activeStudent)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black inline-flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                    title="Dispatch WhatsApp / SMS performance report to parent"
                  >
                    <MessageCircle size={14} />
                    {language === "kn" ? "WhatsApp ವರದಿ" : language === "hi" ? "WhatsApp रिपोर्ट" : "Dispatch WhatsApp 📲"}
                  </button>
                )}

                {/* Certificate of Mastery */}
                <button
                  type="button"
                  onClick={() => setCertModalData({ student: activeStudent })}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
                  title="Generate Official Certificate of Achievement"
                >
                  <Award size={14} className="text-amber-600" />
                  {language === "kn" ? "ಪ್ರಮಾಣಪತ್ರ PDF" : language === "hi" ? "प्रमाणपत्र PDF" : "Certificate 🏆"}
                </button>

                {/* Official Scorecard PDF */}
                <button
                  type="button"
                  onClick={() => setScorecardModalStudent(activeStudent)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
                  title="Download and Print Official PDF Report Card"
                >
                  <FileText size={14} className="text-navy" />
                  {language === "kn" ? "ವರದಿ ಕಾರ್ಡ್ PDF" : language === "hi" ? "रिपोर्ट कार्ड PDF" : "PDF Scorecard 📄"}
                </button>

                {(role === "teacher" || role === "admin") && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Reset ALL chapter MCQ test attempts for student ${activeStudent.name}?`)) {
                          resetAllStudentMCQAttempts(activeStudent.id);
                          refreshAllRecords();
                          onToast(`All chapter attempts reset for ${activeStudent.name}.`);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                      title="Reset all chapter attempts for this student"
                    >
                      <RotateCcw size={13} />
                      {language === "kn" ? "ಮರುಹೊಂದಿಸಿ" : language === "hi" ? "रीसेट करें" : "Reset Attempts"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedStudentId("all")}
                      className="btn secondary text-xs font-bold py-1.5 px-3 gap-1 inline-flex items-center cursor-pointer"
                    >
                      <Users size={13} />
                      {language === "kn" ? "ಲೀಡರ್‌ಬೋರ್ಡ್" : language === "hi" ? "लीडरबोर्ड" : "Class Leaderboard"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Controls & Filter Bar */}
          <div className="card p-4 bg-white shadow-xs border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Tests" },
                { id: "cleared", label: "🏆 Cleared (≥70%)" },
                { id: "in_progress", label: "⏳ In Progress" },
                { id: "locked", label: "❌ Retest Needed (3/3)" },
                { id: "untested", label: "⚪ Untested" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    statusFilter === tab.id
                      ? "bg-navy text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapter scores..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs outline-none focus:border-navy"
              />
            </div>
          </div>

          {/* Individual Chapter Scoreboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Chapter Test Cards (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <Layers size={16} className="text-navy" />
                  {activeStudent?.name}&apos;s Chapter MCQ Scoreboard ({filteredIndividualRows.length})
                </h3>
                <span className="text-xs font-bold text-slate-400">Strict 3 Attempts Rule</span>
              </div>

              <div className="space-y-2.5">
                {filteredIndividualRows.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                    <HelpCircle size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-bold">No chapter tests match this filter.</p>
                  </div>
                ) : (
                  filteredIndividualRows.map(({ chapter, subject }) => {
                    const rec = activeStudentChapterRecords[chapter.id];
                    const attemptsUsed = rec?.attemptsUsed || 0;
                    const attemptsLeft = Math.max(0, 3 - attemptsUsed);
                    const isCleared = !!rec?.isCleared;
                    const bestPct = rec?.bestPercentage || 0;

                    const localizedChapter =
                      language === "kn" ? chapter.titleKn : language === "hi" ? chapter.titleHi : chapter.title;
                    const localizedSubject =
                      language === "kn" ? subject.nameKn : language === "hi" ? subject.nameHi : subject.name;

                    return (
                      <div
                        key={chapter.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        {/* Chapter & Subject info */}
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase text-white shadow-2xs"
                              style={{ backgroundColor: subject.color }}
                            >
                              {localizedSubject}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              Ch {chapter.chapterNumber}
                            </span>
                            {isCleared ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[11px] font-black text-emerald-800">
                                <CheckCircle2 size={12} /> Cleared ({bestPct}%) 🏆
                              </span>
                            ) : attemptsUsed > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-black text-amber-800">
                                <Clock size={12} /> Best: {bestPct}% (In Progress)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                                ⚪ Not Attempted
                              </span>
                            )}
                          </div>

                          <h4 className="font-black text-navy text-sm leading-snug">{localizedChapter}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Attempts: <strong>{attemptsUsed}/3</strong> • {attemptsLeft} remaining
                            {rec?.lastAttemptDate && (
                              <span className="text-slate-400 ml-2">
                                Last: {new Date(rec.lastAttemptDate).toLocaleDateString()}
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Attempt Status Dots & Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                          <div className="flex items-center gap-1 mr-2">
                            {[1, 2, 3].map((num) => {
                              const att = rec?.history.find((h) => h.attemptNumber === num);
                              return (
                                <span
                                  key={num}
                                  title={att ? `Attempt ${num}: ${att.percentage}% (${att.score}/5)` : `Attempt ${num}: Not used`}
                                  className={`w-3 h-3 rounded-full border ${
                                    att
                                      ? att.passed
                                        ? "bg-emerald-500 border-emerald-600"
                                        : "bg-amber-500 border-amber-600"
                                      : "bg-slate-200 border-slate-300"
                                  }`}
                                />
                              );
                            })}
                          </div>

                          {/* Inspect Answer Sheet / Attempt Log Button */}
                          {attemptsUsed > 0 && activeStudent && (
                            <button
                              type="button"
                              onClick={() => handleOpenInspector(chapter, subject, rec, activeStudent)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black inline-flex items-center gap-1 transition cursor-pointer"
                              title="Inspect student answer sheet & attempt history"
                            >
                              <Eye size={13} className="text-navy" />
                              {language === "kn" ? "ಉತ್ತರ ಪತ್ರಿಕೆ" : language === "hi" ? "उत्तर-पुस्तिका" : "Answer Sheet"}
                            </button>
                          )}

                          {/* Certificate Button for Cleared Chapters */}
                          {isCleared && activeStudent && (
                            <button
                              type="button"
                              onClick={() => setCertModalData({ student: activeStudent, chapter, subject, record: rec })}
                              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black inline-flex items-center gap-1 transition cursor-pointer"
                              title="Generate Official Certificate of Chapter Mastery"
                            >
                              <Award size={13} className="text-amber-600" />
                              {language === "kn" ? "ಪ್ರಮಾಣಪತ್ರ" : language === "hi" ? "प्रमाणपत्र" : "Certificate 🏆"}
                            </button>
                          )}

                          {/* Notes Button */}
                          <button
                            type="button"
                            onClick={() => onOpenNotes(chapter, subject.name)}
                            className="btn secondary text-xs font-bold py-1.5 px-2.5 gap-1 inline-flex items-center cursor-pointer"
                            title="View NCERT Revision Notes"
                          >
                            <BookOpen size={13} /> Notes
                          </button>

                          {/* Student Taking Test vs Teacher Inspection */}
                          {role === "student" ? (
                            <button
                              type="button"
                              onClick={() => onOpenTest(chapter, subject.id)}
                              disabled={attemptsLeft === 0 && !isCleared}
                              className={`btn text-xs font-black py-1.5 px-3 gap-1 inline-flex items-center cursor-pointer ${
                                isCleared
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                                  : attemptsLeft > 0
                                  ? "primary"
                                  : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                              }`}
                            >
                              <Flame size={13} />
                              {isCleared
                                ? "Review Test"
                                : attemptsUsed === 0
                                ? "Take Test"
                                : `Retake (${attemptsLeft})`}
                            </button>
                          ) : (
                            /* Teacher/Admin Controls */
                            <>
                              {attemptsUsed > 0 && activeStudent && (
                                <button
                                  type="button"
                                  onClick={() => handleResetAttempts(chapter.id, chapter.title, activeStudent)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title={`Reset 3 attempts for ${activeStudent.name}`}
                                >
                                  <RotateCcw size={14} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Live Feed & Mastery Insights (1 col) */}
            <div className="space-y-5">
              {/* Student Test History Feed */}
              <div className="card p-5 bg-white shadow-xs border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                    <Flame size={15} className="text-amber-500" />
                    {activeStudent?.name}&apos;s Test History
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                    ● Live Log
                  </span>
                </div>

                {recentActivities.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No tests recorded yet for this student.
                  </p>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {recentActivities.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-navy line-clamp-1">{act.chapterTitle}</span>
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                              act.passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {act.percentage}% {act.passed ? "✓" : "✗"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                          <span>Attempt #{act.attemptNumber} of 3</span>
                          <span>{new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mastery Rules Card */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 space-y-2 text-xs">
                <h4 className="font-black text-amber-900 flex items-center gap-1.5">
                  <Award size={15} className="text-gold" />
                  Live Mastery System Rules
                </h4>
                <ul className="text-slate-700 space-y-1.5 list-disc pl-4 font-medium leading-relaxed text-[11px]">
                  <li><strong>Passing Score:</strong> 70% or higher unlocks the Cleared 🏆 badge.</li>
                  <li><strong>3 Attempts Cap:</strong> If all 3 attempts fail, review the chapter notes and request teacher unlock.</li>
                  <li><strong>Teacher Override:</strong> Teachers & Admins can reset 3 attempts anytime for student re-assessment.</li>
                  <li><strong>Distinct from Exams:</strong> This tracking is independent of terminal exams and measures live daily self-study.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. MODAL: DETAILED STUDENT ANSWER SHEET & ATTEMPT LOG INSPECTOR */}
      {/* =================================================================== */}
      {inspectModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="card max-w-3xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b pb-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-navy text-white text-xs font-black">
                    <Eye size={13} className="text-gold" />
                    {language === "kn" ? "ವಿದ್ಯಾರ್ಥಿ ಉತ್ತರ ಪತ್ರಿಕೆ ಇನ್ಸ್ಪೆಕ್ಟರ್" : language === "hi" ? "छात्र उत्तर-पुस्तिका एवं मूल्यांकन" : "Student Answer Sheet & Attempt Log"}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {inspectModalData.student.name} ({inspectModalData.student.roll})
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-navy mt-1">
                  {inspectModalData.chapter.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {inspectModalData.subject.name} • {inspectModalData.record.attemptsUsed} Attempts Logged
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectModalData(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Attempt Tabs Selector */}
            <div className="flex items-center gap-2 border-b pb-3 shrink-0">
              <span className="text-xs font-bold text-slate-500">
                {language === "kn" ? "ಪ್ರಯತ್ನ ಆಯ್ಕೆಮಾಡಿ:" : language === "hi" ? "प्रयास चुनें:" : "Select Attempt:"}
              </span>
              {inspectModalData.record.history.map((att, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAttemptTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                    activeAttemptTab === idx
                      ? "bg-navy text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>Attempt #{att.attemptNumber}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                      att.passed ? "bg-emerald-400 text-slate-900" : "bg-amber-400 text-slate-900"
                    }`}
                  >
                    {att.percentage}%
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Attempt Detailed Score Banner & Answers */}
            {inspectModalData.record.history[activeAttemptTab] && (
              <div className="overflow-y-auto space-y-4 pr-1 flex-1">
                {(() => {
                  const currentAttempt = inspectModalData.record.history[activeAttemptTab];
                  const questions = getChapterMCQQuestions(
                    inspectModalData.chapter.id,
                    inspectModalData.chapter.title
                  );

                  return (
                    <>
                      {/* Attempt Scorecard Strip */}
                      <div
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          currentAttempt.passed
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                            : "bg-amber-50/80 border-amber-200 text-amber-900"
                        }`}
                      >
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider block">
                            Attempt #{currentAttempt.attemptNumber} Result
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-2xl font-black">
                              {currentAttempt.score} / {currentAttempt.totalQuestions} ({currentAttempt.percentage}%)
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                                currentAttempt.passed
                                  ? "bg-emerald-200 text-emerald-900"
                                  : "bg-amber-200 text-amber-900"
                              }`}
                            >
                              {currentAttempt.passed ? "🏆 Passed (≥70%)" : "Needs Retest (<70%)"}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs font-semibold space-y-1 sm:text-right">
                          <p>Time Spent: <strong>{currentAttempt.timeSpentSeconds} seconds</strong></p>
                          <p className="text-[11px] opacity-80">
                            Date: {new Date(currentAttempt.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Question by Question Breakdown */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                          {language === "kn" ? "ಪ್ರಶ್ನೆವಾರು ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಉತ್ತರಗಳು" : language === "hi" ? "प्रश्नानुसार विश्लेषण एवं उत्तर" : "Question-by-Question Evaluation"}
                        </h4>

                        {questions.map((q, qIdx) => {
                          const studentChoice = currentAttempt.selectedAnswers[q.id];
                          const isCorrect = studentChoice === q.correctAnswer;
                          const qText =
                            language === "kn" ? q.questionKn : language === "hi" ? q.questionHi : q.question;
                          const expText =
                            language === "kn" ? q.explanationKn : language === "hi" ? q.explanationHi : q.explanation;

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-2xl border text-xs space-y-3 ${
                                isCorrect
                                  ? "bg-white border-emerald-200"
                                  : studentChoice
                                  ? "bg-white border-rose-200"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-black text-navy leading-relaxed">
                                  Q{qIdx + 1}. {qText}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 ${
                                    isCorrect
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-rose-100 text-rose-800"
                                  }`}
                                >
                                  {isCorrect ? "✓ Correct (+1)" : "✗ Incorrect (0)"}
                                </span>
                              </div>

                              {/* Options List */}
                              <div className="space-y-1.5">
                                {q.options.map((opt) => {
                                  const isSelectedByStudent = studentChoice === opt.key;
                                  const isCorrectOption = q.correctAnswer === opt.key;
                                  const optText =
                                    language === "kn" ? opt.textKn : language === "hi" ? opt.textHi : opt.text;

                                  let optClasses = "border-slate-200 bg-slate-50 text-slate-700";
                                  if (isCorrectOption) {
                                    optClasses = "border-emerald-400 bg-emerald-50 text-emerald-900 font-bold";
                                  } else if (isSelectedByStudent && !isCorrect) {
                                    optClasses = "border-rose-400 bg-rose-50 text-rose-900 font-bold";
                                  }

                                  return (
                                    <div
                                      key={opt.key}
                                      className={`p-2 rounded-xl border flex items-center justify-between text-xs ${optClasses}`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-lg bg-white border border-slate-300 font-black text-xs flex items-center justify-center">
                                          {opt.key}
                                        </span>
                                        <span>{optText}</span>
                                      </div>

                                      <div className="flex items-center gap-1 text-[11px] font-black">
                                        {isSelectedByStudent && (
                                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px]">
                                            Student&apos;s Answer
                                          </span>
                                        )}
                                        {isCorrectOption && (
                                          <span className="text-emerald-700">✓ Correct</span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* NCERT Explanation */}
                              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                                <span className="font-bold text-navy block">NCERT Conceptual Explanation:</span>
                                <p>{expText}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t shrink-0">
              <button
                type="button"
                onClick={() => setInspectModalData(null)}
                className="btn secondary text-xs font-bold py-2 px-4 cursor-pointer"
              >
                Close
              </button>

              {(role === "teacher" || role === "admin") && (
                <button
                  type="button"
                  onClick={() => {
                    handleResetAttempts(
                      inspectModalData.chapter.id,
                      inspectModalData.chapter.title,
                      inspectModalData.student
                    );
                    setInspectModalData(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw size={13} />
                  Reset 3 Attempts for this Chapter
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: AUTOMATED WHATSAPP & SMS REPORT DISPATCHER */}
      {whatsAppModalStudent && (
        <WhatsAppReportDispatcherModal
          student={whatsAppModalStudent}
          allStudents={classStudents}
          studentRecords={allStudentRecords[whatsAppModalStudent.id] || {}}
          curricula={curricula}
          role={role}
          session={session}
          onClose={() => setWhatsAppModalStudent(null)}
          onToast={onToast}
        />
      )}

      {/* 6. MODAL: OFFICIAL CERTIFICATE OF CHAPTER/SUBJECT MASTERY */}
      {certModalData && (
        <StudentCertificateModal
          student={certModalData.student}
          chapter={certModalData.chapter}
          subject={certModalData.subject}
          record={certModalData.record}
          onClose={() => setCertModalData(null)}
          onToast={onToast}
        />
      )}

      {/* 7. MODAL: OFFICIAL STUDENT REPORT CARD & SCORECARD PDF */}
      {scorecardModalStudent && (
        <StudentScorecardPdfModal
          student={scorecardModalStudent}
          studentRecords={allStudentRecords[scorecardModalStudent.id] || {}}
          curricula={curricula}
          onClose={() => setScorecardModalStudent(null)}
          onToast={onToast}
        />
      )}
    </div>
  );
}
