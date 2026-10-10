import type { Metadata } from "next";
import { FAQPageContent } from "@/components/FAQPageContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Talent Tuition Center",
  description:
    "Get detailed answers regarding admissions, classes, subjects, fee receipts, continuous assessments, and online doubt clearing at Talent Tuition Center.",
  alternates: {
    canonical: "https://talent-tuition-center.vercel.app/faq",
  },
};

export default function FAQPage() {
  return <FAQPageContent />;
}
