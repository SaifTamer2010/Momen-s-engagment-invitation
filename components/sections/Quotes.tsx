"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import Parallax from "@/components/Parallax";

const SERIF = "\"Times New Roman\", Times, serif";
const BLUE = "rgb(0, 88, 133)";

// Little love quotes (texts in data/wedding.ts → quotes). Sits where the schedule was.
export default function Quotes() {
  const { t } = useI18n();
  return (
    <div className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute z-0 h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/flower-dress.webp" style={{ right: "-34%", bottom: "calc(0.23583 * var(--st-w))", width: "44%", aspectRatio: "620 / 827", willChange: "transform" }} as="img" index={13} tpl="translateY(#px) scaleX(-1)" />
      <div className="relative z-10 flex w-full flex-col items-center gap-3 px-[10%]">
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: BLUE, fontFamily: SERIF, fontWeight: 700, letterSpacing: "0.04em" }}>
          {t(wedding.text.quotesHeading)}
        </h2>
        <ul className="quotes">
          {wedding.quotes.map((q, i) => (
            <li key={i}>
              <span className="quote-mark" aria-hidden="true">“</span>
              <p>{t(q)}</p>
              {i < wedding.quotes.length - 1 && <span className="quote-heart" aria-hidden="true">♡</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
