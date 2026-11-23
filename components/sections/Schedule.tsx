"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import Parallax from "@/components/Parallax";

const SERIF = "\"Times New Roman\", Times, serif";
const BLUE = "rgb(0, 88, 133)";

// Party timeline (items in data/wedding.ts)
export default function Schedule() {
  const { t, time } = useI18n();
  const items = wedding.schedule;
  const single = items.length === 1;
  return (
    <div className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute z-0 h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/flower-dress.webp" style={{ right: "-34%", bottom: "calc(0.23583 * var(--st-w))", width: "44%", aspectRatio: "620 / 827", willChange: "transform" }} as="img" index={13} tpl="translateY(#px) scaleX(-1)" />
      <div className="relative z-10 flex w-full flex-col items-center gap-3 px-[10%]">
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: BLUE, fontFamily: SERIF, fontWeight: 700, letterSpacing: "0.04em" }}>
          {t(wedding.text.scheduleHeading)}
        </h2>
        <ol className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10" style={{ fontFamily: SERIF, marginTop: 16, minHeight: single ? 70 : undefined }}>
          {items.map((item, i) => {
            const line = single ? "" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === items.length - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10";
            return (
              <li key={i} className="contents">
                <span className="pt-0.5 text-[13px] md:text-[17px] tabular-nums tracking-wide leading-snug" style={{ color: "#000", textAlign: "end" }}>
                  <span className="relative inline-block">
                    {item.icon && (
                      <span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2" style={{ insetInlineEnd: "100%", marginInlineEnd: 55 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" aria-hidden="true" className="block h-10 w-10 shrink-0 object-contain md:h-14 md:w-14" loading="lazy" decoding="async" src={`/images/themes/riviera-blue/${item.icon}.webp`} />
                      </span>
                    )}
                    {time(item.time)}
                  </span>
                </span>
                <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                  {line && <span className={`absolute left-1/2 -translate-x-1/2 w-px ${line}`} style={{ backgroundColor: "color-mix(in srgb, rgb(0, 88, 133) 40%, transparent)" }} />}
                  <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: BLUE, boxShadow: "color-mix(in srgb, rgb(0, 88, 133) 13%, transparent) 0px 0px 0px 2px" }} />
                </span>
                <span className="flex flex-col text-[13px] md:text-[17px]" style={{ color: "#000" }}>
                  <span className="font-semibold">{t(item.title)}</span>
                  {item.note && <span className="text-[11px] md:text-[14px]" style={{ opacity: 0.7 }}>{t(item.note)}</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
