import type { Metadata, Viewport } from "next";
import "./invitation.css";
import { wedding } from "@/data/wedding";

const [a, b] = wedding.couple;
export const metadata: Metadata = {
  title: `${a.en} & ${b.en} · ${a.ar} و${b.ar}`,
  description: `You're invited to the engagement of ${a.en} & ${b.en} — ${wedding.cityLine.en}`,
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
