"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";

const SERIF = "\"Times New Roman\", Times, serif";

// Dress code: title, note, color swatches with names
export default function DressCode() {
  const { t } = useI18n();
  const d = wedding.dressCode;
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col items-center gap-1">
          <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: "rgb(0, 88, 133)", fontFamily: SERIF, fontWeight: 700, letterSpacing: "0.04em" }}>
            {t(wedding.text.dressCodeHeading)}
          </h2>
          <p className="text-[15px] md:text-[19px] text-center font-semibold" style={{ color: "#000", fontFamily: SERIF }}>
            {t(d.title)}
          </p>
          <p className="text-[12px] md:text-[15px] text-center max-w-[300px]" style={{ color: "#000", opacity: 0.75, fontFamily: SERIF }}>
            {t(d.note)}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {d.colors.map((c) => (
            <div key={c.color} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" title={t(c.name)} style={{ backgroundColor: c.color, border: "1.5px solid rgba(0, 88, 133, 0.19)" }} />
              <span className="text-[10px] md:text-[12px]" style={{ opacity: 0.7, fontFamily: SERIF }}>{t(c.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
