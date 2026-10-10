"use client";

import Link from "next/link";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-gold shadow-lg shadow-gold/10">
        <ShieldAlert size={40} />
      </div>
      <h1 className="mt-6 font-display text-4xl font-extrabold text-navy sm:text-5xl">404 - Page Not Found</h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        The page or administrative section you are looking for does not exist, has been moved, or requires higher authorization.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="btn primary flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
        >
          <Home size={16} /> Return to Dashboard
        </Link>
        <Link
          href="/login"
          className="btn secondary flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
        >
          <ArrowLeft size={16} /> Switch Account
        </Link>
      </div>
    </div>
  );
}
