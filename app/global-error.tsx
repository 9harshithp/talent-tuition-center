"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-4 font-sans text-slate-800">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-3xl border border-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-sm mb-4">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Application Error</h2>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            An unexpected error occurred. Click below to refresh and restore your session.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
