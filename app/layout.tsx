import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { NotificationProvider } from "@/context/NotificationContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Talent Tuition Center — Learn • Grow • Excel",
  description:
    "Comprehensive academic management portal for Talent Tuition Center. Features student performance tracking, live doubt clearing with faculty, fee receipts, timetable schedules, and multilingual announcements in English, Kannada, and Hindi.",
  keywords: [
    "Talent Tuition Center",
    "Tuition Management Portal",
    "Class 10 CBSE Coaching",
    "Class 9 Tuition Bengaluru",
    "Class 8 Foundation Coaching",
    "Mathematics & Science Tuition",
    "Student Results Tracking",
    "Fee Receipts",
    "Academic Doubts",
  ],
  authors: [{ name: "Talent Tuition Center Administration" }],
  creator: "Talent Tuition Center",
  publisher: "Talent Tuition Center",
  metadataBase: new URL("https://talent-tuition-center.vercel.app"),
  openGraph: {
    title: "Talent Tuition Center — Academic Excellence Portal",
    description:
      "One secure portal for students, teachers, and administration. Access timetables, test results, fee receipts, and live doubts resolution.",
    url: "https://talent-tuition-center.vercel.app",
    siteName: "Talent Tuition Center",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Talent Tuition Center Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talent Tuition Center — Learn • Grow • Excel",
    description:
      "Comprehensive tuition management portal with multi-language support (English, Kannada, Hindi), test performance tracking, and doubt clearing.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ZsU2QyNMGPwjONiQ6bZTfvlvwOPAHgHHwpldVEOzzQY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="ZsU2QyNMGPwjONiQ6bZTfvlvwOPAHgHHwpldVEOzzQY" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Kannada:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-gold/20 selection:text-navy font-sans">
        <LanguageProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
