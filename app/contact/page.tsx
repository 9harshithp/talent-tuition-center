import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact & Location — Talent Tuition Center",
  description:
    "Get in touch with Talent Tuition Center for Class 8, Class 9, and Class 10 admissions, fee details, and center visits in Vidya Nagar, Bengaluru.",
  alternates: {
    canonical: "https://talent-tuition-center.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
