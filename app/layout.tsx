import type { Metadata, Viewport } from "next";
import "./invitation.css";
import { wedding } from "@/data/wedding";

const [a, b] = wedding.couple;

// Site address, so WhatsApp gets a full link to the preview picture.
// Vercel fills VERCEL_PROJECT_PRODUCTION_URL by itself; set NEXT_PUBLIC_SITE_URL if you use your own domain.
const site =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = `${a.en} & ${b.en} 💍 ${a.ar} و${b.ar}`;
const description = "You're invited to our engagement · Monday 7 December 2026 · Love Halls, Maadi — يسعدنا دعوتكم لحضور حفل خطوبتنا";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${a.en} & ${b.en}`,
    title,
    description,
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    // preview picture (public/og.jpg, 1200×630) — replace the file to change it
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${a.en} & ${b.en} — engagement invitation` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005885",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="garden" suppressHydrationWarning>
      <head>
        {/* Template styles (order matters) */}
        <link rel="stylesheet" href="/theme/css/2b4a63bfd791ce58.css" />
        <link rel="stylesheet" href="/theme/css/08fc569d88870472.css" />
        <link rel="stylesheet" href="/theme/inline.css" />
        {/* Arabic fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@400;500;700&display=swap" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
