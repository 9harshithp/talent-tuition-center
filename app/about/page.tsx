import type { Metadata } from "next";
import { AboutPageContent } from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About Talent Tuition Center — Academic Excellence & Faculty",
  description:
    "Learn about Talent Tuition Center's mission, qualified faculty, teaching methodology, and focused small-batch coaching for Class 8, Class 9 and Class 10 secondary students.",
  alternates: {
    canonical: "https://talent-tuition-center.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
