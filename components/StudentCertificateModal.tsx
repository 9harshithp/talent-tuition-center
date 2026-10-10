"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StudentRecord } from "@/lib/dataStore";
import { SubjectWorkflow, ChapterNode } from "@/lib/curriculumData";
import { ChapterTestRecord } from "@/lib/mcqTestData";
import {
  Award,
  Download,
  Printer,
  X,
  Share2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  QrCode,
} from "lucide-react";

interface StudentCertificateModalProps {
  student: StudentRecord;
  subject?: SubjectWorkflow;
  chapter?: ChapterNode;
  record?: ChapterTestRecord;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function StudentCertificateModal({
  student,
  subject,
  chapter,
  record,
  onClose,
  onToast,
}: StudentCertificateModalProps) {
  const { language } = useLanguage();
  const certRef = useRef<HTMLDivElement>(null);

  const bestScore = record?.bestPercentage || 100;
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const certNumber = `TTC-CERT-${new Date().getFullYear()}-${student.roll}-${chapter ? chapter.id.toUpperCase() : "MASTER"}`;

  // Handle Printable PDF
  const handlePrint = () => {
    window.print();
    onToast("Opening system print dialog for official certificate... 🖨️");
  };

  // Handle WhatsApp Certificate Share
  const handleShareWhatsApp = () => {
    const text = `🎓 *OFFICIAL CERTIFICATE OF MASTERY - TALENT TUITION CENTER*\n\nThis certifies that *${student.name}* (${student.class}) has cleared the NCERT Chapter Mastery Assessment in *${chapter?.title || subject?.name || "Academic Curriculum"}* with a distinction score of *${bestScore}%* 🏆.\n\nCertificate ID: ${certNumber}\nVerify: https://talent-tuition.demo/portal`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onToast("Sharing certificate verification link on WhatsApp! 📲");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="card max-w-4xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:p-0">
        
        {/* Top Header Controls (Hidden during print) */}
        <div className="flex items-center justify-between border-b pb-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 font-black">
              <Award size={18} />
            </span>
            <div>
              <h3 className="text-base font-black text-navy">Official Certificate of Chapter Mastery</h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified Talent Tuition Center Academic Distinction
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
        {/* THE OFFICIAL CERTIFICATE TEMPLATE */}
        {/* =================================================================== */}
        <div className="overflow-y-auto pr-1 flex-1 flex items-center justify-center p-2">
          <div
            ref={certRef}
            className="w-full max-w-3xl bg-[#fffef9] border-8 border-double border-[#c9a84c] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl text-slate-800 space-y-6"
            style={{
              backgroundImage: "radial-gradient(#c9a84c 0.5px, transparent 0.5px)",
              backgroundSize: "20px 20px",
              backgroundColor: "#fdfbf7",
            }}
          >
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award size={380} className="text-[#0f172a]" />
            </div>

            {/* Corner Luxury Flourishes */}
            <div className="absolute top-2 left-2 text-[#c9a84c] text-xl font-serif select-none">⚜</div>
            <div className="absolute top-2 right-2 text-[#c9a84c] text-xl font-serif select-none">⚜</div>
            <div className="absolute bottom-2 left-2 text-[#c9a84c] text-xl font-serif select-none">⚜</div>
            <div className="absolute bottom-2 right-2 text-[#c9a84c] text-xl font-serif select-none">⚜</div>

            {/* Institute Header */}
            <div className="space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/50 text-xs font-black uppercase tracking-widest text-[#0f172a]">
                <Sparkles size={13} className="text-[#c9a84c]" />
                Talent Tuition Center • Excellence in Education
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#0f172a] uppercase mt-2">
                Certificate of Academic Mastery
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-[#c9a84c]">
                NCERT Curriculum Continuous Assessment Framework
              </p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-3 relative z-10 max-w-xl mx-auto py-2">
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                This prestigious certificate is proudly presented to
              </p>

              <div className="border-b-2 border-[#c9a84c] pb-2">
                <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0f172a] tracking-normal">
                  {student.name}
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1">
                  Roll No: <span className="text-navy">{student.roll}</span> • Grade: <span className="text-navy">{student.class}</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif pt-2">
                for demonstrating exceptional conceptual proficiency and successfully clearing the 3-attempt continuous MCQ challenge in
              </p>

              <div className="py-2.5 px-5 rounded-2xl bg-amber-500/10 border border-[#c9a84c]/40 inline-block shadow-2xs">
                <span className="font-serif font-black text-sm sm:text-base text-navy block">
                  {chapter ? chapter.title : subject ? subject.name : "NCERT Master Syllabus"}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 block mt-0.5">
                  Distinction Score: <strong>{bestScore}% (≥70% Cleared) 🏆</strong>
                </span>
              </div>
            </div>

            {/* Certificate Signatures & Seal */}
            <div className="grid grid-cols-3 items-end pt-6 border-t border-[#c9a84c]/30 relative z-10 text-xs">
              {/* Left Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic font-bold text-slate-700 text-sm border-b border-slate-300 pb-1">
                  P. K. Ramesh
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Head of Faculty
                </p>
              </div>

              {/* Center Official Gold Seal */}
              <div className="flex flex-col items-center justify-center -my-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#99772a] via-[#c9a84c] to-[#ffe680] p-0.5 shadow-lg flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-white/80 flex flex-col items-center justify-center p-1 text-center">
                    <ShieldCheck size={18} className="text-[#0f172a]" />
                    <span className="text-[7px] sm:text-[8px] font-black uppercase text-[#0f172a] tracking-tight leading-tight mt-0.5">
                      TTC OFFICIAL<br />SEAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic font-bold text-slate-700 text-sm border-b border-slate-300 pb-1">
                  M. Sundar Rao
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Academic Director
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 relative z-10 border-t border-slate-200/60">
              <span>Date: <strong>{issueDate}</strong></span>
              <span className="font-mono">Cert ID: <strong>{certNumber}</strong></span>
              <span>Talent Tuition Center, Bengaluru</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
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
            Print / Save Certificate as PDF 🖨️
          </button>
        </div>
      </div>
    </div>
  );
}
