"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StudentRecord } from "@/lib/dataStore";
import { SubjectWorkflow } from "@/lib/curriculumData";
import { ChapterTestRecord } from "@/lib/mcqTestData";
import {
  FileText,
  Printer,
  Download,
  Share2,
  X,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface StudentScorecardPdfModalProps {
  student: StudentRecord;
  studentRecords: Record<string, ChapterTestRecord>;
  curricula: SubjectWorkflow[];
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function StudentScorecardPdfModal({
  student,
  studentRecords,
  curricula,
  onClose,
  onToast,
}: StudentScorecardPdfModalProps) {
  const { language } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  // Filter subjects for student's class
  const classSubjects = curricula.filter((c) => c.classGrade === student.class);

  // Aggregate chapters and tests
  const allRows: {
    chapterId: string;
    chapterNumber: number;
    chapterTitle: string;
    subjectName: string;
    subjectColor: string;
    record?: ChapterTestRecord;
  }[] = [];

  let totalChapters = 0;
  let attemptedCount = 0;
  let clearedCount = 0;
  let totalScoreSum = 0;
  let totalAttemptsUsed = 0;

  classSubjects.forEach((subj) => {
    subj.chapters.forEach((ch) => {
      totalChapters += 1;
      const rec = studentRecords[ch.id];
      if (rec && rec.attemptsUsed > 0) {
        attemptedCount += 1;
        totalScoreSum += rec.bestPercentage;
        totalAttemptsUsed += rec.attemptsUsed;
        if (rec.isCleared) clearedCount += 1;
      }
      allRows.push({
        chapterId: ch.id,
        chapterNumber: ch.chapterNumber,
        chapterTitle: ch.title,
        subjectName: subj.name,
        subjectColor: subj.color,
        record: rec,
      });
    });
  });

  const avgScore = attemptedCount > 0 ? Math.round(totalScoreSum / attemptedCount) : 0;
  const passRate = attemptedCount > 0 ? Math.round((clearedCount / attemptedCount) * 100) : 0;

  const performanceGrade =
    avgScore >= 90
      ? { grade: "A+ (Outstanding)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
      : avgScore >= 75
      ? { grade: "A (Excellent)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
      : avgScore >= 60
      ? { grade: "B (Good / On Track)", color: "text-sky-700 bg-sky-50 border-sky-200" }
      : attemptedCount > 0
      ? { grade: "C (Needs Practice)", color: "text-amber-700 bg-amber-50 border-amber-200" }
      : { grade: "N/A (Not Started)", color: "text-slate-500 bg-slate-50 border-slate-200" };

  const reportNumber = `TTC-REP-${new Date().getFullYear()}-${student.roll}`;
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
    onToast("Opening print dialog for official student report card... 🖨️");
  };

  const handleShareWhatsApp = () => {
    const text = `📊 *TALENT TUITION CENTER - OFFICIAL STUDENT REPORT CARD*\n\nStudent: *${student.name}* (${student.roll})\nClass: *${student.class}*\nCleared Tests (≥70%): *${clearedCount} Chapters 🏆*\nAverage Score: *${avgScore}%*\nGrade: *${performanceGrade.grade}*\n\nVerify Online: https://talent-tuition.demo/portal`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onToast("Sharing scorecard on WhatsApp! 📲");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="card max-w-4xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:p-0">
        
        {/* Header Bar (Hidden during print) */}
        <div className="flex items-center justify-between border-b pb-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-navy/10 text-navy font-black">
              <FileText size={18} />
            </span>
            <div>
              <h3 className="text-base font-black text-navy">Official Student MCQ Report Card</h3>
              <p className="text-xs text-slate-500 font-medium">
                {student.name} ({student.roll}) • {student.class}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Share2 size={13} />
              Share
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="btn primary text-xs font-black py-1.5 px-3 gap-1.5 inline-flex items-center cursor-pointer shadow-xs"
            >
              <Printer size={14} />
              Print / Save PDF 🖨️
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* THE OFFICIAL REPORT CARD DOCUMENT */}
        {/* =================================================================== */}
        <div className="overflow-y-auto pr-1 flex-1 p-2">
          <div
            ref={printRef}
            className="w-full bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm text-slate-800"
          >
            {/* Institute Header Banner */}
            <div className="border-b-2 border-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                  Academic Evaluation Cell
                </div>
                <h1 className="text-2xl font-black tracking-tight text-navy uppercase mt-1">
                  Talent Tuition Center
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Affiliated with NCERT / CBSE Continuous Comprehensive Evaluation Framework
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Main Branch, Jayanagar, Bengaluru • Contact: +91 98860 12345
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Official Report Card
                </span>
                <span className="text-xs font-mono font-bold text-navy block">{reportNumber}</span>
                <span className="text-xs text-slate-500 font-medium block">Issue Date: {issueDate}</span>
              </div>
            </div>

            {/* Student Bio Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Student Name</span>
                <span className="font-black text-navy text-sm">{student.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Roll Number</span>
                <span className="font-black text-navy text-sm">{student.roll}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Class / Grade</span>
                <span className="font-black text-navy text-sm">{student.class}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Academic Session</span>
                <span className="font-black text-navy text-sm">2026 – 2027</span>
              </div>
            </div>

            {/* Performance KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Tests Attempted</span>
                <span className="text-xl font-black text-navy mt-0.5 block">{attemptedCount} / {totalChapters}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Chapters Cleared (≥70%)</span>
                <span className="text-xl font-black text-emerald-700 mt-0.5 block">{clearedCount} 🏆</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Average Score</span>
                <span className="text-xl font-black text-amber-700 mt-0.5 block">{avgScore}%</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${performanceGrade.color}`}>
                <span className="text-[10px] font-bold uppercase block">Mastery Rating</span>
                <span className="text-xs font-black mt-1 block">{performanceGrade.grade}</span>
              </div>
            </div>

            {/* Chapter-by-Chapter Score Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-navy">
                Chapter-by-Chapter MCQ Assessment Record (3 Attempts Rule)
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-black uppercase text-[10px] border-b border-slate-200">
                      <th className="p-2.5">Ch #</th>
                      <th className="p-2.5">Chapter Title</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5">Attempts Used</th>
                      <th className="p-2.5">Best Score</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allRows.map((row) => {
                      const rec = row.record;
                      const attemptsUsed = rec?.attemptsUsed || 0;
                      const isCleared = !!rec?.isCleared;
                      const bestPct = rec?.bestPercentage || 0;

                      return (
                        <tr key={row.chapterId} className="hover:bg-slate-50/50">
                          <td className="p-2.5 font-bold text-slate-500">{row.chapterNumber}</td>
                          <td className="p-2.5 font-bold text-navy">{row.chapterTitle}</td>
                          <td className="p-2.5 font-semibold text-slate-600">{row.subjectName}</td>
                          <td className="p-2.5 font-semibold text-slate-700">
                            {attemptsUsed > 0 ? `${attemptsUsed} / 3` : "—"}
                          </td>
                          <td className="p-2.5 font-black text-slate-800">
                            {attemptsUsed > 0 ? `${bestPct}%` : "—"}
                          </td>
                          <td className="p-2.5">
                            {isCleared ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-[11px]">
                                <CheckCircle2 size={12} /> Cleared 🏆
                              </span>
                            ) : attemptsUsed > 0 ? (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                                <Clock size={12} /> In Progress
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Not Attempted</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Teacher Remarks Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-black uppercase tracking-wider text-navy text-[10px] block">
                Faculty Evaluation & Recommendation
              </span>
              <p className="text-slate-600 leading-relaxed font-medium">
                {student.name} has demonstrated strong conceptual understanding in cleared chapters. Continued daily revision of NCERT notes and regular mock test participation will ensure top distinction in board examinations.
              </p>
            </div>

            {/* Signatures & Verification */}
            <div className="grid grid-cols-2 items-end pt-6 border-t border-slate-200 text-xs">
              <div className="space-y-1">
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 w-40 pb-1">
                  K. Srinivas
                </div>
                <p className="text-[10px] font-black uppercase text-slate-500">
                  Class Coordinator Signature
                </p>
              </div>

              <div className="space-y-1 text-right sm:justify-self-end">
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 w-40 pb-1 ml-auto">
                  M. Sundar Rao
                </div>
                <p className="text-[10px] font-black uppercase text-slate-500">
                  Center Director Signature
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="flex items-center justify-between pt-3 border-t shrink-0 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="btn secondary text-xs font-bold py-2 px-4 cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn primary text-xs font-black py-2 px-5 gap-2 inline-flex items-center shadow-md cursor-pointer"
          >
            <Printer size={15} />
            Print / Save Report Card as PDF 🖨️
          </button>
        </div>
      </div>
    </div>
  );
}
