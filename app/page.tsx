import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Talent Tuition Center — Tuition Classes for Class 8, 9 & 10 Students",
  description:
    "Talent Tuition Center provides structured tuition classes for Class 8, Class 9 and Class 10 students in Mathematics, Science & Physics, English, and Social Studies. Experience concept clarity, regular tests, performance tracking, and direct teacher doubt support.",
  alternates: {
    canonical: "https://talent-tuition-center.vercel.app",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://talent-tuition-center.vercel.app/#organization",
        name: "Talent Tuition Center",
        url: "https://talent-tuition-center.vercel.app",
        logo: "https://talent-tuition-center.vercel.app/logo.png",
        description:
          "Tuition and academic coaching center providing Mathematics, Science, English, and Social Studies classes for secondary school students.",
        telephone: "+91-98860-12345",
        email: "contact@talenttuition.in",
        address: {
          "@type": "PostalAddress",
          streetAddress: "42 Vidya Nagar, Main Road",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560001",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "15:30",
            closes: "20:30",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which classes does Talent Tuition Center teach?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Talent Tuition Center specializes in secondary school education, currently offering structured coaching for Class 8, Class 9 and Class 10 (CBSE and State Board curricula).",
            },
          },
          {
            "@type": "Question",
            name: "Which subjects are available at the center?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We offer core academic subjects including Mathematics (Algebra, Geometry, Trigonometry), Science (Physics, Chemistry, Biology), English Grammar & Composition, and Social Studies.",
            },
          },
          {
            "@type": "Question",
            name: "How can a student join or enroll?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Parents or students can submit an enquiry through our Contact page or visit the center during working hours (3:30 PM – 8:30 PM) for a counseling session and batch registration.",
            },
          },
          {
            "@type": "Question",
            name: "How do parents and students check fee status?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Students can log in to the secure Student Portal using their credentials to view their payment history, pending balance, and download printable official payment receipts. The Center Administrator manages billing privately.",
            },
          },
          {
            "@type": "Question",
            name: "Do students receive continuous test results and performance tracking?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our faculty conducts regular weekly quizzes and monthly assessments. Scores, percentage breakdowns, letter grades, and personalized remarks are updated in the live student portal.",
            },
          },
          {
            "@type": "Question",
            name: "Can students ask teachers questions and clear academic doubts online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Students can submit their doubts directly through the portal, attach textbook diagram photos or homework snapshots, and receive step-by-step explanations from their subject teachers.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageContent />
    </>
  );
}
