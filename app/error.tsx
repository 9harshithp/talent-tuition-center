"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-md">
        <AlertTriangle size={32} />
      </div>
      <h2 className="mt-5 text-2xl font-black text-navy">Something went wrong</h2>
      <p className="mt-2 max-w-md text-xs text-slate-500">
        An unexpected error occurred while rendering this view. Your saved data is safely stored in your session.
      </p>
      <button
        onClick={() => reset()}
        className="btn primary mt-6 flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
      >
        <RotateCcw size={16} /> Try Again
      </button>
    </div>
  );
}
