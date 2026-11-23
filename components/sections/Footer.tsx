"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";

// Closing line, couple names, credit, bottom illustration
export default function Footer() {
  const { t, date, amp } = useI18n();
  return (
    <>
      <footer className="relative z-10 flex flex-col items-center gap-2 px-6 text-center" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
        <span className="text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(0, 88, 133)", fontFamily: "Roboto, \"Helvetica Neue\", Arial, sans-serif", fontWeight: 500 }}>
          {t(wedding.text.footer)}
        </span>
        <span className="names text-[26px] md:text-[34px]" style={{ color: "rgb(0, 88, 133)", fontFamily: "\"Alex Brush\", cursive" }}>
          {t(wedding.couple[0])} {amp} {t(wedding.couple[1])}
        </span>
        <span className="text-[11px] md:text-[13px] opacity-70" style={{ fontFamily: "\"Cormorant Garamond\", serif" }}>
          {date.long} · {t(wedding.cityLine)}
        </span>
      </footer>
      {/* <div className="relative z-10 flex items-center justify-center" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
        <a href="https://portfolio-gules-five.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity" style={{ color: "rgb(0, 88, 133)" }} dir="ltr">
          Contact the developer
        </a>
      </div> */}
      <div className="pointer-events-none relative z-0 overflow-hidden" style={{ marginTop: "calc(0.00454 * var(--st-w))", height: "calc(0.48299 * var(--st-w))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className="absolute top-0 block h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/stone.webp" style={{ width: "calc(1.12018 * var(--st-w))", left: "calc(-0.05896 * var(--st-w))" }} />
      </div>
    </>
  );
}
