"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChapterNode } from "@/lib/curriculumData";
import {
  getChapterMCQQuestions,
  loadAllMCQTestRecords,
  saveMCQTestAttempt,
  ChapterTestRecord,
  MCQQuestion,
} from "@/lib/mcqTestData";
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Flame,
  Check,
  X,
  Sparkles,
} from "lucide-react";

interface MCQTestModalProps {
  chapter: ChapterNode;
  subjectId: string;
  classGrade: string;
  studentId?: string;
  studentName?: string;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function MCQTestModal({
  chapter,
  subjectId,
  classGrade,
  studentId = "std-101",
  studentName = "Aarav Sharma",
  onClose,
  onToast,
}: MCQTestModalProps) {
  const { language } = useLanguage();

  const questions: MCQQuestion[] = useMemo(() => {
    return getChapterMCQQuestions(chapter.id, chapter.title);
  }, [chapter]);

  // Load existing test records for this student
  const [record, setRecord] = useState<ChapterTestRecord | null>(() => {
    const all = loadAllMCQTestRecords(studentId);
    return all[chapter.id] || null;
  });

  const attemptsUsed = record ? record.attemptsUsed : 0;
  const maxAttempts = 3;
  const attemptsRemaining = Math.max(0, maxAttempts - attemptsUsed);

  // Test state: 'intro' | 'in_progress' | 'submitted'
  const [testState, setTestState] = useState<"intro" | "in_progress" | "submitted">(() => {
    return attemptsRemaining === 0 ? "submitted" : "intro";
  });

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Submission results
  const [lastAttemptResult, setLastAttemptResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      handleSubmitTest();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    if (attemptsRemaining <= 0) {
      onToast(
        language === "kn"
          ? "ನೀವು ಎಲ್ಲಾ 3 ಪ್ರಯತ್ನಗಳನ್ನು ಬಳಸಿದ್ದೀರಿ!"
          : language === "hi"
          ? "आप सभी 3 प्रयास उपयोग कर चुके हैं!"
          : "All 3 attempts have been exhausted for this chapter test!"
      );
      return;
    }
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setTimerSeconds(300);
    setIsTimerActive(true);
    setTestState("in_progress");
  };

  const handleSelectOption = (qId: string, optKey: "A" | "B" | "C" | "D") => {
    if (testState !== "in_progress") return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optKey,
    }));
  };

  const handleSubmitTest = () => {
    setIsTimerActive(false);

    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

    const attemptNumber = attemptsUsed + 1;
    const attemptData = {
      attemptNumber,
      score,
      totalQuestions: total,
      percentage,
      passed,
      timestamp: new Date().toISOString(),
      timeSpentSeconds: 300 - timerSeconds,
      selectedAnswers,
    };

    // Save record with 3-attempt lock
    const updatedRecord = saveMCQTestAttempt(
      chapter.id,
      subjectId,
      classGrade,
      chapter.title,
      attemptData,
      studentId,
      studentName
    );

    setRecord(updatedRecord);
    setLastAttemptResult({ score, total, percentage, passed });
    setTestState("submitted");

    if (passed) {
      onToast(
        language === "kn"
          ? `ಅಭಿನಂದನೆಗಳು! ನೀವು ${percentage}% ಅಂಕಗಳೊಂದಿಗೆ ಅಧ್ಯಾಯ ಪರೀಕ್ಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ತೇರ್ಗಡೆ ಹೊಂದಿದ್ದೀರಿ! 🏆`
          : language === "hi"
          ? `बधाई! आपने ${percentage}% अंकों के साथ अध्याय परीक्षा उत्तीर्ण की! 🏆`
          : `Congratulations! You cleared the chapter test with ${percentage}%! 🏆`
      );
    } else {
      const left = maxAttempts - updatedRecord.attemptsUsed;
      onToast(
        language === "kn"
          ? `ತೇರ್ಗಡೆಗೆ 70% ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ ಅಂಕ: ${percentage}%. ಉಳಿದ ಪ್ರಯತ್ನಗಳು: ${left}/3.`
          : language === "hi"
          ? `उत्तीर्ण होने के लिए 70% आवश्यक है। आपका स्कोर: ${percentage}%. शेष प्रयास: ${left}/3.`
          : `Passing score is 70%. Your score: ${percentage}%. Remaining attempts: ${left}/3.`
      );
    }
  };

  const currentQ = questions[currentQIndex];
  const localizedQTitle =
    language === "kn" ? currentQ?.questionKn : language === "hi" ? currentQ?.questionHi : currentQ?.question;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="card max-w-2xl w-full bg-white p-5 sm:p-7 space-y-5 shadow-2xl rounded-3xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-gold/40 text-xs font-black text-navy">
                <HelpCircle size={13} className="text-gold" />
                {language === "kn" ? "NCERT MCQ ಪರೀಕ್ಷೆ" : language === "hi" ? "NCERT MCQ टेस्ट" : "NCERT Chapter MCQ Challenge"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                {classGrade}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  record?.isCleared
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : attemptsRemaining === 0
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {record?.isCleared
                  ? "🏆 Cleared"
                  : attemptsRemaining === 0
                  ? "❌ Locked (3/3 Used)"
                  : `Attempts Left: ${attemptsRemaining}/3`}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-navy mt-1.5 leading-tight">
              {language === "kn" ? chapter.titleKn : language === "hi" ? chapter.titleHi : chapter.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* ===================================================================== */}
        {/* 1. INTRO SCREEN */}
        {/* ===================================================================== */}
        {testState === "intro" && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
                <Flame size={18} className="text-amber-600" />
                {language === "kn"
                  ? "ಅಧ್ಯಾಯ ಪರೀಕ್ಷೆಯ ನಿಯಮಗಳು ಮತ್ತು ಮಾನದಂಡಗಳು"
                  : language === "hi"
                  ? "अध्याय परीक्षा के नियम एवं शर्तें"
                  : "Chapter Challenge & 3-Attempt Mastery Rules"}
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 font-medium leading-relaxed">
                <li>
                  <strong>{language === "kn" ? "ಗರಿಷ್ಠ ಪ್ರಯತ್ನಗಳು:" : language === "hi" ? "अधिकतम प्रयास:" : "Strict Attempt Limit:"}</strong>{" "}
                  {language === "kn"
                    ? "ಪ್ರತಿ ಅಧ್ಯಾಯಕ್ಕೆ ಕೇವಲ 3 ಪ್ರಯತ್ನಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ."
                    : language === "hi"
                    ? "प्रत्येक अध्याय के लिए अधिकतम 3 प्रयास अनुमत हैं।"
                    : "You are allowed exactly 3 attempts to clear this test."}
                </li>
                <li>
                  <strong>{language === "kn" ? "ತೇರ್ಗಡೆ ಮಿತಿ:" : language === "hi" ? "उत्तीर्ण मापदंड:" : "Pass Criteria:"}</strong>{" "}
                  {language === "kn"
                    ? "ತೇರ್ಗಡೆಯಾಗಿ 'Cleared 🏆' ಬ್ಯಾಡ್ಜ್ ಪಡೆಯಲು ಕನಿಷ್ಠ 70% ಅಂಕಗಳನ್ನು ಗಳಿಸಬೇಕು."
                    : language === "hi"
                    ? "सफलतापूर्वक 'Cleared 🏆' बैज पाने के लिए कम से कम 70% अंक आवश्यक हैं।"
                    : "Score at least 70% (4/5 questions) to earn the Cleared 🏆 badge."}
                </li>
                <li>
                  <strong>{language === "kn" ? "ಸಮಯ ಮಿತಿ:" : language === "hi" ? "समय सीमा:" : "Timer:"}</strong>{" "}
                  {language === "kn"
                    ? "5 ನಿಮಿಷಗಳ ಲೈವ್ ಕೌಂಟ್‌ಡೌನ್ ಟೈಮರ್ ಇರುತ್ತದೆ."
                    : language === "hi"
                    ? "5 मिनट का लाइव टाइमर चलेगा।"
                    : "5 minutes for 5 comprehensive NCERT questions."}
                </li>
                <li>
                  <strong>{language === "kn" ? "ಲೈವ್ ಸ್ಕೋರ್ ಟ್ರ್ಯಾಕಿಂಗ್:" : language === "hi" ? "लाइव स्कोर ट्रैकिंग:" : "Live Score Tracking:"}</strong>{" "}
                  {language === "kn"
                    ? "ನಿಮ್ಮ ಅಂಕಗಳು ಮತ್ತು ಫಲಿತಾಂಶವನ್ನು ಪ್ರತ್ಯೇಕ ಲೈವ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗುತ್ತದೆ."
                    : language === "hi"
                    ? "आपका स्कोर नियमित परीक्षाओं से अलग लाइव डैशबोर्ड में दर्ज होगा।"
                    : "Scores are tracked real-time in the Live MCQ System separate from regular school exams."}
                </li>
              </ul>
            </div>

            {/* Previous Attempt Summary if any */}
            {record && record.history.length > 0 && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {language === "kn" ? "ಹಿಂದಿನ ಪ್ರಯತ್ನಗಳ ಸಾರಾಂಶ" : language === "hi" ? "पिछले प्रयासों का विवरण" : "Previous Attempts History"}
                  </span>
                  <span className="text-xs font-black text-navy">
                    Best: {record.bestPercentage}% {record.isCleared ? "🏆 (Cleared)" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[1, 2, 3].map((num) => {
                    const att = record.history.find((h) => h.attemptNumber === num);
                    return (
                      <div
                        key={num}
                        className={`p-2.5 rounded-xl border text-center text-xs ${
                          att
                            ? att.passed
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                              : "bg-amber-50 border-amber-300 text-amber-900"
                            : "bg-slate-100 border-slate-200 text-slate-400"
                        }`}
                      >
                        <span className="text-[10px] font-bold block">Attempt {num}</span>
                        <span className="font-black text-sm block mt-0.5">
                          {att ? `${att.percentage}%` : "Not Taken"}
                        </span>
                        <span className="text-[10px] block">
                          {att ? (att.passed ? "✓ Passed" : "✗ Retest") : "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn secondary text-xs font-bold px-4 py-2.5"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : language === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleStartTest}
                disabled={attemptsRemaining === 0}
                className={`btn primary text-xs font-bold px-6 py-2.5 gap-2 inline-flex items-center ${
                  attemptsRemaining === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Flame size={15} />
                {attemptsUsed === 0
                  ? language === "kn" ? "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ (ಪ್ರಯತ್ನ 1/3)" : language === "hi" ? "टेस्ट शुरू करें (प्रयास 1/3)" : "Start Test (Attempt 1/3)"
                  : language === "kn"
                  ? `ಮರುಪ್ರಯತ್ನಿಸಿ (ಪ್ರಯತ್ನ ${attemptsUsed + 1}/3)`
                  : language === "hi"
                  ? `पुनः प्रयास करें (प्रयास ${attemptsUsed + 1}/3)`
                  : `Retake Test (Attempt ${attemptsUsed + 1}/3)`}
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 2. IN PROGRESS TEST SCREEN */}
        {/* ===================================================================== */}
        {testState === "in_progress" && currentQ && (
          <div className="space-y-5">
            {/* Top Status Bar: Question Progress & Timer */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {language === "kn" ? "ಪ್ರಶ್ನೆ:" : language === "hi" ? "प्रश्न:" : "Question"}
                </span>
                <span className="font-black text-navy text-sm">
                  {currentQIndex + 1} / {questions.length}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  {currentQ.conceptTag}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs font-bold shadow-inner">
                <Clock size={14} className="text-amber-400 animate-pulse" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-black text-navy text-sm sm:text-base leading-snug">
                Q{currentQIndex + 1}. {localizedQTitle}
              </h3>

              {/* 4 Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.key;
                  const localizedOptText =
                    language === "kn" ? opt.textKn : language === "hi" ? opt.textHi : opt.text;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-amber-50/80 border-navy text-navy font-bold shadow-xs scale-100.5 ring-1 ring-navy/20"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                            isSelected
                              ? "bg-navy text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm">{localizedOptText}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-navy shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Navigator Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition cursor-pointer ${
                      currentQIndex === idx
                        ? "bg-navy text-white ring-2 ring-navy/20"
                        : selectedAnswers[q.id]
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="btn secondary text-xs font-bold px-3 py-2 disabled:opacity-40"
                >
                  <ChevronLeft size={14} /> {language === "kn" ? "ಹಿಂದಿನದು" : language === "hi" ? "पिछला" : "Prev"}
                </button>

                {currentQIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="btn primary text-xs font-bold px-4 py-2"
                  >
                    {language === "kn" ? "ಮುಂದಿನದು" : language === "hi" ? "अगला" : "Next"} <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    className="btn primary bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-5 py-2 shadow-md"
                  >
                    {language === "kn" ? "ಪರೀಕ್ಷೆ ಸಲ್ಲಿಸಿ" : language === "hi" ? "सबमिट करें" : "Submit Test"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. RESULT & REVIEW SCREEN */}
        {/* ===================================================================== */}
        {testState === "submitted" && (
          <div className="space-y-5">
            {/* Scorecard Box */}
            <div
              className={`p-6 rounded-2xl border-2 text-center space-y-3 ${
                lastAttemptResult?.passed || record?.isCleared
                  ? "bg-emerald-50/80 border-emerald-300"
                  : "bg-amber-50/80 border-amber-300"
              }`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md mx-auto">
                {lastAttemptResult?.passed || record?.isCleared ? (
                  <Award size={30} className="text-emerald-600" />
                ) : (
                  <AlertTriangle size={30} className="text-amber-600" />
                )}
              </div>

              <div>
                <h3 className="text-xl font-black text-navy">
                  {lastAttemptResult?.passed || record?.isCleared
                    ? language === "kn"
                      ? "ಅಭಿನಂದನೆಗಳು! ಅಧ್ಯಾಯ ತೇರ್ಗಡೆ ಹೊಂದಲಾಗಿದೆ 🏆"
                      : language === "hi"
                      ? "बधाई! अध्याय परीक्षा उत्तीर्ण 🏆"
                      : "Awesome! Chapter Test Cleared 🏆"
                    : language === "kn"
                    ? "ಮರುಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ"
                    : language === "hi"
                    ? "पुनः प्रयास आवश्यक"
                    : "Pass Criteria Not Met"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {lastAttemptResult?.passed || record?.isCleared
                    ? language === "kn"
                      ? "ನೀವು 70% ಗಿಂತ ಹೆಚ್ಚು ಅಂಕಗಳನ್ನು ಗಳಿಸಿ ಈ ಅಧ್ಯಾಯದ ಪರಿಕಲ್ಪನಾ ಪ್ರಾವೀಣ್ಯತೆಯನ್ನು ದೃಢಪಡಿಸಿದ್ದೀರಿ."
                      : language === "hi"
                      ? "आपने 70% से अधिक अंक प्राप्त करके इस अध्याय में दक्षता सिद्ध की है।"
                      : "You scored above 70% and successfully proved conceptual mastery for this chapter."
                    : language === "kn"
                    ? "ತೇರ್ಗಡೆಗೆ ಕನಿಷ್ಠ 70% ಅಂಕಗಳ ಅಗತ್ಯವಿದೆ. ಕೆಳಗಿನ ವಿವರಣೆಗಳನ್ನು ಓದಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
                    : language === "hi"
                    ? "उत्तीर्ण होने के लिए 70% आवश्यक है। नीचे दिए गए स्पष्टीकरण को पढ़ें और पुनः प्रयास करें।"
                    : "Minimum 70% required to clear. Review the detailed explanations below and retake."}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {language === "kn" ? "ಅಂಕಗಳು" : language === "hi" ? "स्कोर" : "Score"}
                  </span>
                  <span className="text-2xl font-black text-navy">
                    {lastAttemptResult ? `${lastAttemptResult.score} / ${lastAttemptResult.total}` : `${record?.bestScore} / 5`}
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-300" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {language === "kn" ? "ಶೇಕಡಾವಾರು" : language === "hi" ? "प्रतिशत" : "Percentage"}
                  </span>
                  <span
                    className={`text-2xl font-black ${
                      (lastAttemptResult?.percentage || record?.bestPercentage || 0) >= 70
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {lastAttemptResult?.percentage ?? record?.bestPercentage}%
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-300" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {language === "kn" ? "ಉಳಿದ ಪ್ರಯತ್ನಗಳು" : language === "hi" ? "शेष प्रयास" : "Attempts Left"}
                  </span>
                  <span className="text-2xl font-black text-navy">
                    {attemptsRemaining} / {maxAttempts}
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Explanations Review List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen size={14} className="text-navy" />
                {language === "kn"
                  ? "ವಿವರವಾದ ಉತ್ತರಗಳು ಮತ್ತು ವಿವರಣೆಗಳು"
                  : language === "hi"
                  ? "विस्तृत उत्तर एवं व्याख्या"
                  : "Detailed Answers & NCERT Concept Explanations"}
              </h4>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const userAns =
                    lastAttemptResult?.passed !== undefined
                      ? selectedAnswers[q.id]
                      : record?.history[record.history.length - 1]?.selectedAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  const localizedQ =
                    language === "kn" ? q.questionKn : language === "hi" ? q.questionHi : q.question;
                  const localizedExpl =
                    language === "kn" ? q.explanationKn : language === "hi" ? q.explanationHi : q.explanation;

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isCorrect ? "bg-emerald-50/50 border-emerald-200" : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-navy">
                          Q{idx + 1}. {localizedQ}
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 shrink-0">
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 shrink-0">
                            <XCircle size={14} /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] pt-1">
                        <span className="text-slate-600 font-semibold">
                          Your Answer: <strong className={isCorrect ? "text-emerald-700" : "text-rose-700"}>{userAns || "None"}</strong>
                        </span>
                        <span className="text-slate-600 font-semibold">
                          Correct Answer: <strong className="text-emerald-700">{q.correctAnswer}</strong>
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-lg border border-slate-200/60 leading-relaxed">
                        💡 <strong>Concept:</strong> {localizedExpl}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t">
              <button
                type="button"
                onClick={onClose}
                className="btn secondary text-xs font-bold px-4 py-2"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : language === "hi" ? "बंद करें" : "Close"}
              </button>

              {attemptsRemaining > 0 && !record?.isCleared && (
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="btn primary text-xs font-bold px-5 py-2 gap-1.5 inline-flex items-center"
                >
                  <RotateCcw size={14} />
                  {language === "kn"
                    ? `ಮರುಪ್ರಯತ್ನಿಸಿ (${attemptsRemaining} ಉಳಿದಿದೆ)`
                    : language === "hi"
                    ? `पुनः प्रयास करें (${attemptsRemaining} शेष)`
                    : `Retake Attempt (${attemptsRemaining} left)`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
