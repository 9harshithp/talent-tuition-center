"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the private management portal at /portal
    router.replace("/portal");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb]">
      <div className="text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy border-t-gold mx-auto" />
        <p className="mt-4 font-bold text-navy text-sm">Opening Talent Portal...</p>
      </div>
    </div>
  );
}
