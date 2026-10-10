"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChapterNode } from "@/lib/curriculumData";
import { getChapterNotes, ChapterNoteItem } from "@/lib/mcqTestData";
import {
  BookOpen,
  FileText,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Layers,
  X,
  Download,
  Share2,
  FileCode2,
} from "lucide-react";

interface ChapterNotesModalProps {
  chapter: ChapterNode;
  subjectName: string;
  classGrade: string;
  onClose: () => void;
  onOpenTest?: () => void;
}

export function ChapterNotesModal({
  chapter,
  subjectName,
  classGrade,
  onClose,
  onOpenTest,
}: ChapterNotesModalProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"notes" | "textbook" | "formulas">("notes");

  const noteData: ChapterNoteItem = useMemo(() => {
    return getChapterNotes(chapter.id, chapter.title);
  }, [chapter]);

  const localizedTitle =
    language === "kn" ? chapter.titleKn : language === "hi" ? chapter.titleHi : chapter.title;
  const localizedUnit =
    language === "kn" ? chapter.unitKn : language === "hi" ? chapter.unitHi : chapter.unit;
  const localizedDesc =
    language === "kn" ? chapter.descriptionKn : language === "hi" ? chapter.descriptionHi : chapter.description;

  const localizedContent =
    language === "kn" ? noteData.contentKn : language === "hi" ? noteData.contentHi : noteData.content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="card max-w-3xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b pb-4 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-blue-800">
                <BookOpen size={13} className="text-blue-600" />
                {classGrade} • {subjectName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                {localizedUnit}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-navy mt-1.5 leading-tight">
              Ch {chapter.chapterNumber}: {localizedTitle}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">{localizedDesc}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "notes"
                ? "bg-white text-navy shadow-xs scale-100.5"
                : "text-slate-600 hover:text-navy hover:bg-white/50"
            }`}
          >
            <FileText size={15} />
            {language === "kn" ? "ಅಧ್ಯಾಯದ ಟಿಪ್ಪಣಿಗಳು" : language === "hi" ? "रिवीजन नोट्स" : "NCERT Revision Notes"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("textbook")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "textbook"
                ? "bg-white text-navy shadow-xs scale-100.5"
                : "text-slate-600 hover:text-navy hover:bg-white/50"
            }`}
          >
            <Bookmark size={15} />
            {language === "kn" ? "ಪಠ್ಯಪುಸ್ತಕ & ಪರಿಹಾರಗಳು" : language === "hi" ? "पाठ्यपुस्तक एवं हल" : "NCERT Textbook & Reader"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("formulas")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "formulas"
                ? "bg-white text-navy shadow-xs scale-100.5"
                : "text-slate-600 hover:text-navy hover:bg-white/50"
            }`}
          >
            <Lightbulb size={15} />
            {language === "kn" ? "ಸೂತ್ರಗಳ ಶೀಟ್" : language === "hi" ? "सूत्र एवं बिंदु" : "Formulas & Drills"}
          </button>
        </div>

        {/* Tab Content Container (Scrollable) */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1">
          
          {/* ================================================================= */}
          {/* TAB 1: NCERT REVISION NOTES */}
          {/* ================================================================= */}
          {activeTab === "notes" && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
                  <Sparkles size={16} className="text-blue-700" />
                  {language === "kn"
                    ? "ಅಧ್ಯಾಯದ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳ ಸಾರಾಂಶ"
                    : language === "hi"
                    ? "अध्याय की प्रमुख अवधारणाओं का सारांश"
                    : "Key Conceptual Framework & High-Yield Summary"}
                </div>
                <div className="space-y-2 text-slate-700 leading-relaxed font-medium">
                  {localizedContent.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-blue-100">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtopic Concept Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers size={14} className="text-navy" />
                  {language === "kn" ? "ಪರಿಕಲ್ಪನೆಗಳ ವಿವರವಾದ ಪಟ್ಟಿ" : language === "hi" ? "संकल्पनाओं की विस्तृत सूची" : "Detailed Concept & Subtopic Milestones"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chapter.subtopics.map((st, sIdx) => {
                    const localizedSt =
                      language === "kn" ? st.titleKn : language === "hi" ? st.titleHi : st.title;
                    return (
                      <div
                        key={st.id}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-black uppercase text-slate-500">
                            Topic #{sIdx + 1}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                            {st.type}
                          </span>
                        </div>
                        <p className="font-bold text-navy text-xs leading-snug">{localizedSt}</p>
                        <span className="text-[10px] text-slate-400 font-semibold block">{st.estimatedMinutes} mins study time</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Exam Terminology */}
              {noteData.keyTerms && noteData.keyTerms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {language === "kn" ? "ಪ್ರಮುಖ ಪಾರಿಭಾಷಿಕ ಪದಗಳು" : language === "hi" ? "महत्वपूर्ण शब्दावली" : "Essential Board Terminology"}
                  </h4>
                  <div className="space-y-2">
                    {noteData.keyTerms.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <strong className="text-navy">{item.term}:</strong>{" "}
                        <span className="text-slate-600">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: NCERT TEXTBOOK REFERENCE */}
          {/* ================================================================= */}
          {activeTab === "textbook" && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                    <BookOpen size={16} className="text-amber-700" />
                    {language === "kn"
                      ? "ಅಧಿಕೃತ NCERT ಪಠ್ಯಪುಸ್ತಕ ಮಾಹಿತಿ"
                      : language === "hi"
                      ? "आधिकारिक NCERT पाठ्यपुस्तक विवरण"
                      : "Official NCERT Textbook Reference & Exercises"}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-200/60 text-amber-900">
                    {noteData.textbookReference?.keyPages}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {language === "kn"
                    ? `ಈ ಅಧ್ಯಾಯವು ${classGrade} ${subjectName} ಪಠ್ಯಪುಸ್ತಕದ ಅಧಿಕೃತ ಅಧ್ಯಾಯ ${chapter.chapterNumber} ಆಗಿದೆ. ಪರೀಕ್ಷೆಯ ಗರಿಷ್ಠ ಅಂಕಗಳಿಗೆ ಪಠ್ಯಪುಸ್ತಕದ ಉದಾಹರಣೆಗಳು ಮತ್ತು ಅಭ್ಯಾಸ ಲೆಕ್ಕಗಳನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಬಿಡಿಸಿ.`
                    : language === "hi"
                    ? `यह अध्याय ${classGrade} ${subjectName} पाठ्यपुस्तक का आधिकारिक अध्याय ${chapter.chapterNumber} है। परीक्षा में सर्वोत्तम अंक पाने के लिए सभी उदाहरणों और अभ्यासों को हल करें।`
                    : `This chapter corresponds to official Chapter ${chapter.chapterNumber} in the NCERT ${classGrade} ${subjectName} textbook. Complete all in-text questions and exercises for board mastery.`}
                </p>

                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-slate-500 block">
                    {language === "kn" ? "ಮುಖ್ಯ ಅಭ್ಯಾಸಗಳು" : language === "hi" ? "महत्वपूर्ण अभ्यास" : "High-Yield Exercises"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {noteData.textbookReference?.importantExercises.map((ex, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-bold text-navy border border-slate-200">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Textbook In-Text Section Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {language === "kn" ? "ಪಠ್ಯಪುಸ್ತಕ ಅಧ್ಯಯನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ" : language === "hi" ? "पाठ्यपुस्तक अध्ययन चेकलिस्ट" : "NCERT Section Study Checklist"}
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">Section {chapter.chapterNumber}.1: Introduction & Foundation</span>
                    <span className="text-emerald-700 font-black flex items-center gap-1">✓ NCERT In-Text</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">Section {chapter.chapterNumber}.2: Mathematical Proofs & Scientific Models</span>
                    <span className="text-emerald-700 font-black flex items-center gap-1">✓ Solved Examples</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">Section {chapter.chapterNumber}.3: Summary & Miscellaneous Exercises</span>
                    <span className="text-amber-700 font-black flex items-center gap-1">⭐ Board Important</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: KEY FORMULAS & DRILLS */}
          {/* ================================================================= */}
          {activeTab === "formulas" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-amber-300 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                  <Lightbulb size={16} />
                  {language === "kn"
                    ? "ಪರೀಕ್ಷಾ ಸೂತ್ರಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು"
                    : language === "hi"
                    ? "परीक्षा सूत्र एवं समीकरण"
                    : "High-Yield Formulas & Exam Equations"}
                </div>

                <div className="space-y-2">
                  {chapter.keyFormulas && chapter.keyFormulas.length > 0 ? (
                    chapter.keyFormulas.map((f, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-3 font-mono text-xs"
                      >
                        <span className="text-amber-200">{f}</span>
                        <span className="text-[10px] text-slate-400 font-sans uppercase shrink-0">#{idx + 1}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-800 text-slate-400 text-xs">
                      No standalone mathematical formulas for this chapter. Focus on conceptual definitions and flow diagrams.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn secondary text-xs font-bold px-4 py-2"
          >
            {language === "kn" ? "ಮುಚ್ಚಿ" : language === "hi" ? "बंद करें" : "Close"}
          </button>

          {onOpenTest && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTest();
              }}
              className="btn primary text-xs font-bold px-5 py-2 gap-1.5 inline-flex items-center shadow-sm"
            >
              <Sparkles size={14} className="text-gold" />
              {language === "kn"
                ? "ಅಧ್ಯಾಯ MCQ ಪರೀಕ್ಷೆ ತೆಗೆದುಕೊಳ್ಳಿ (3 ಪ್ರಯತ್ನಗಳು)"
                : language === "hi"
                ? "अध्याय MCQ टेस्ट लें (3 प्रयास)"
                : "Take Chapter MCQ Test (3 Attempts)"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
