"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DataStore, UserSession } from "@/lib/dataStore";
import {
  Sparkles,
  Camera,
  UploadCloud,
  FileImage,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  Share2,
  RefreshCw,
  BookOpen,
  HelpCircle,
  ArrowRight,
  BrainCircuit,
  Zap,
  Check,
  Languages,
} from "lucide-react";

interface AIDoubtSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  session?: UserSession;
  onToast: (msg: string) => void;
  initialSubject?: string;
}

export function AIDoubtSolverModal({
  isOpen,
  onClose,
  session,
  onToast,
  initialSubject = "Mathematics",
}: AIDoubtSolverModalProps) {
  const { language: appLang } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "kn" | "hi">(
    appLang === "kn" ? "kn" : appLang === "hi" ? "hi" : "en"
  );
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [questionText, setQuestionText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>("image/jpeg");
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<any | null>(null);
  const [isAiPowered, setIsAiPowered] = useState(true);
  const [copied, setCopied] = useState(false);
  const [postedToBoard, setPostedToBoard] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Sync language with appLang if it changes initially
  useEffect(() => {
    if (appLang === "kn") setSelectedLanguage("kn");
    else if (appLang === "hi") setSelectedLanguage("hi");
  }, [appLang]);

  // Handle clipboard image paste
  useEffect(() => {
    if (!isOpen) return;
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.items) {
        for (const item of Array.from(e.clipboardData.items)) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
                setImageMimeType(file.type || "image/jpeg");
                onToast("Image pasted from clipboard!");
              };
              reader.readAsDataURL(file);
            }
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isOpen, onToast]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onToast("Image size must be less than 8MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setImageMimeType(file.type || "image/jpeg");
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleSolve = async () => {
    if (!imagePreview && !questionText.trim()) {
      onToast(
        selectedLanguage === "kn"
          ? "ದಯವಿಟ್ಟು ಪ್ರಶ್ನೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ"
          : selectedLanguage === "hi"
          ? "कृपया प्रश्न की फोटो अपलोड करें या प्रश्न टाइप करें"
          : "Please upload a photo of the problem or type your question"
      );
      return;
    }

    setIsSolving(true);
    setSolution(null);
    setPostedToBoard(false);

    try {
      const response = await fetch("/api/ai-doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: imageMimeType,
          questionText: questionText.trim(),
          subject: selectedSubject,
          language: selectedLanguage,
          classGrade: selectedClass,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSolution(data.solution);
        setIsAiPowered(data.isAI);
        onToast(
          selectedLanguage === "kn"
            ? "✨ AI ಪರಿಹಾರ ಯಶಸ್ವಿಯಾಗಿ ಸಿದ್ಧವಾಗಿದೆ!"
            : selectedLanguage === "hi"
            ? "✨ AI समाधान सफलतापूर्वक तैयार है!"
            : "✨ AI Step-by-Step Solution Generated!"
        );
      } else {
        throw new Error(data.error || "Failed to solve problem");
      }
    } catch (err: any) {
      onToast(err.message || "Could not generate solution. Please try again.");
    } finally {
      setIsSolving(false);
    }
  };

  const handleCopySolution = () => {
    if (!solution) return;
    const textToCopy = `[Talent Tuition Center - AI Doubt Solution]
Subject: ${selectedSubject} (${selectedClass})
Problem: ${solution.detectedProblem}

Concept: ${solution.conceptName}
Formula: ${solution.keyFormula}

Step-by-Step Solution:
${solution.stepByStepSolution?.map((step: string, idx: number) => `${idx + 1}. ${step}`).join("\n")}

Final Answer: ${solution.finalAnswer}
NCERT Exam Tip: ${solution.ncertExamTip}
Reference: ${solution.relatedNCERTChapter}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onToast("Solution copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostToPublicDoubts = () => {
    if (!solution) return;
    const studentName = session?.name || "Anonymous Student";
    const studentId = session?.studentId || "TTC-DOUBT";

    DataStore.addDoubt({
      studentName,
      studentId,
      subject: selectedSubject,
      teacherName: "AI Master Tutor & Faculty",
      question: solution.detectedProblem || questionText || "Photo Doubt Solution",
      response: `[AI Verified Solution - ${solution.conceptName}]\n\n${solution.stepByStepSolution?.join("\n\n")}\n\nFinal Answer: ${solution.finalAnswer}\n\nExam Tip: ${solution.ncertExamTip}`,
      attachmentName: imagePreview ? "doubt_problem_image.jpg" : undefined,
      attachmentUrl: imagePreview || undefined,
      attachmentSize: imagePreview ? "Photo Scan" : undefined,
    });

    setPostedToBoard(true);
    onToast("Doubt and AI solution published to Public Doubts Board!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:bg-white print:text-black">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b border-indigo-500/20 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  AI Photo Doubt Solver
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Gemini Vision 2.5
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Snap or upload any math, science, or diagram problem for instant step-by-step NCERT derivations.
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Controls: Class, Subject, Language */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Class / Grade
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Class 10">Class 10 (Board Exam)</option>
                <option value="Class 9">Class 9 (NCERT)</option>
                <option value="Class 8">Class 8 (Foundation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science (Physics / Chem / Bio)</option>
                <option value="Social Studies">Social Studies</option>
                <option value="English">English Grammar & Literature</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                Explanation Language
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

          {/* Upload & Prompt Area (when no solution or editing) */}
          <div className="space-y-4 print:hidden">
            {/* Image Upload Zone */}
            <div className="relative border-2 border-dashed border-indigo-500/30 rounded-2xl p-4 bg-slate-800/40 hover:bg-slate-800/60 transition flex flex-col items-center justify-center min-h-[160px]">
              {imagePreview ? (
                <div className="relative w-full flex flex-col items-center">
                  <div className="relative max-h-60 rounded-xl overflow-hidden border border-slate-700 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Uploaded Doubt"
                      className="max-h-60 object-contain rounded-xl"
                    />
                    <button
                      onClick={handleClearImage}
                      className="absolute top-2 right-2 bg-rose-600/90 text-white p-1.5 rounded-full hover:bg-rose-700 shadow transition"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Photo loaded & ready for multimodal OCR analysis
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Drag & Drop problem photo or browse
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Supports handwritten notebook pages, textbook screenshots, diagrams & equations (PNG, JPG up to 8MB)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition"
                    >
                      <FileImage className="w-4 h-4" /> Browse Photo
                    </button>

                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl shadow-md transition"
                    >
                      <Camera className="w-4 h-4" /> Take Photo
                    </button>

                    <span className="text-xs text-slate-500">
                      (Or press Ctrl+V to paste from clipboard)
                    </span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Optional Context / Text Question Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Or Type Question / Additional Note
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Find the roots of 2x² - 5x + 3 = 0 using quadratic formula, or clarify why ray bends towards the normal in prism..."
                rows={2}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Action Solve Button */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>Uses Google Gemini Multimodal Vision API</span>
              </div>

              <button
                type="button"
                onClick={handleSolve}
                disabled={isSolving || (!imagePreview && !questionText.trim())}
                className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl transition shadow-lg ${
                  isSolving || (!imagePreview && !questionText.trim())
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-indigo-500/25 ring-2 ring-indigo-400/30"
                }`}
              >
                {isSolving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing Problem & Deriving...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Solve Step-by-Step</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isSolving && (
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-indigo-500/20 space-y-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500/40"></div>
                <div className="h-4 bg-indigo-500/30 rounded w-1/3"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                <div className="h-3 bg-slate-700 rounded w-4/6"></div>
              </div>
            </div>
          )}

          {/* Generated Solution Display */}
          {solution && !isSolving && (
            <div className="space-y-6 pt-2">
              <div className="p-5 sm:p-6 bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl border border-indigo-500/30 shadow-xl space-y-6 print:border-none print:shadow-none print:p-0">
                {/* Solution Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700 print:hidden">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> AI Verified Solution
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedSubject} • {selectedClass}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySolution}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Solution
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-400" /> Print
                    </button>

                    <button
                      onClick={handlePostToPublicDoubts}
                      disabled={postedToBoard}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                        postedToBoard
                          ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/30"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow"
                      }`}
                    >
                      {postedToBoard ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Shared to Doubts
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" /> Share to Doubt Board
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Printable Header */}
                <div className="hidden print:block text-center border-b pb-4 mb-4">
                  <h1 className="text-xl font-bold">TALENT TUITION CENTER</h1>
                  <p className="text-xs text-gray-600">AI Master Doubt Solver & Step-by-Step Derivation Card</p>
                  <p className="text-xs mt-1">Subject: {selectedSubject} | Grade: {selectedClass}</p>
                </div>

                {/* Detected Problem Statement */}
                <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    Identified Problem Statement
                  </span>
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">
                    {solution.detectedProblem}
                  </p>
                </div>

                {/* Concept & Formula Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Core NCERT Concept
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      {solution.conceptName}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Governing Formula / Principle
                    </span>
                    <p className="text-sm font-mono font-bold text-amber-200">
                      {solution.keyFormula}
                    </p>
                  </div>
                </div>

                {/* Step-by-step Solution */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Step-by-Step Derivation & Solution
                  </span>

                  <div className="space-y-3">
                    {solution.stepByStepSolution?.map((step: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/30 transition"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-400/30">
                          {idx + 1}
                        </div>
                        <div className="text-sm text-slate-200 leading-relaxed font-sans">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Answer Box */}
                <div className="p-4 bg-emerald-950/40 border-2 border-emerald-500/40 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Final Verified Answer
                  </span>
                  <p className="text-base font-bold text-emerald-200 font-mono">
                    {solution.finalAnswer}
                  </p>
                </div>

                {/* Exam Tip & Reference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> CBSE Board Step-Marking Tip
                    </span>
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      {solution.ncertExamTip}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> NCERT Reference
                    </span>
                    <p className="text-xs text-purple-200/90 leading-relaxed">
                      {solution.relatedNCERTChapter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 print:hidden">
          <span>TTC Multimodal AI Tutor Engine • 24/7 Doubt Resolution</span>
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
