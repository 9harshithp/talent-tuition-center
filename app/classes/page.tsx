import type { Metadata } from "next";
import { ClassesContent } from "@/components/ClassesContent";

export const metadata: Metadata = {
  title: "Tuition Classes & Subject Programs — Talent Tuition Center",
  description:
    "Explore Class 8, Class 9 and Class 10 tuition programs at Talent Tuition Center. In-depth coaching in Mathematics, Science & Physics, English Grammar, and Social Studies with evening batch schedules.",
  alternates: {
    canonical: "https://talent-tuition-center.vercel.app/classes",
  },
};

export default function ClassesPage() {
  return <ClassesContent />;
}
