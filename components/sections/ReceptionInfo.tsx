"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { calendarCells, calendarUrl, weddingDay } from "@/lib/wedding";
import Parallax from "@/components/Parallax";
import Countdown from "@/components/Countdown";

const BLUE = "rgb(0, 88, 133)";
const BASK = "Baskerville, \"Libre Baskerville\", \"Times New Roman\", serif";
const B600 = { fontFamily: BASK, color: "#000", fontWeight: 600 } as const;

// The big day: time & date, (reception time if separate), live countdown, calendar, add-to-calendar
export default function ReceptionInfo() {
  const { t, date, time, n } = useI18n();
  const r = wedding.reception;
  return (
    <section className="relative isolate w-full px-[6%]" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto w-[126.98%] max-w-none object-contain opacity-15" loading="lazy" decoding="async" src="/images/themes/riviera-blue/swing.webp" style={{ left: "-32.65%", top: "calc(-0.06803 * var(--st-w))", willChange: "transform" }} as="img" index={10} tpl="translateY(#px)" />
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute z-0 h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/flower-spray.webp" style={{ right: "-35%", top: "calc(0.09070 * var(--st-w))", width: "54.42%", willChange: "transform" }} as="img" index={11} tpl="translateY(#px) scaleX(-1)" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: BLUE, fontFamily: "\"Times New Roman\", Times, serif", fontWeight: 700, letterSpacing: "0.04em" }}>
          {t(wedding.text.bigDayHeading)}
        </h2>

        <div className="flex w-full flex-col items-center" style={{ fontFamily: BASK, color: "#000", marginTop: "calc(0.06349 * var(--st-w))" }}>
          <h3 className="text-[16px] md:text-[20px] uppercase text-center leading-[1.3]" style={{ fontFamily: BASK, color: BLUE, fontWeight: 600 }}>
            {t(wedding.text.bigDayNote)}
          </h3>
          <div className="text-[20px] md:text-[26px] mt-5" style={B600}>
            {time(wedding.ceremony.time)}
          </div>
          {/* equal side columns keep the day number exactly centered */}
          <div className="date-row big" style={B600}>
            <span className="date-side text-[15px] md:text-[19px] uppercase" style={{ ...B600, textAlign: "end" }}>
              <span>{date.weekday}</span>
              <span className="ghost" aria-hidden="true">{date.month}</span>
            </span>
            <div className="h-[28px] w-[1px] md:h-[38px]" style={{ backgroundColor: "#000", opacity: 0.55 }} />
            <span className="text-[34px] md:text-[46px] leading-none" style={{ ...B600, color: BLUE }}>{date.day}</span>
            <div className="h-[28px] w-[1px] md:h-[38px]" style={{ backgroundColor: "#000", opacity: 0.55 }} />
            <span className="date-side text-[15px] md:text-[19px] uppercase" style={{ ...B600, textAlign: "start" }}>
              <span>{date.month}</span>
              <span className="ghost" aria-hidden="true">{date.weekday}</span>
            </span>
          </div>
          <div className="text-[20px] md:text-[26px]" style={B600}>
            {date.year}
          </div>

          {r && (
            <div className="flex flex-col items-center mt-4">
              <span className="text-[11px] md:text-[14px] uppercase tracking-[0.04em]">{t(r.title)}</span>
              <span className="text-[20px] md:text-[26px]" style={{ ...B600, color: BLUE }}>{time(r.time)}</span>
            </div>
          )}

          <div className="flex items-center justify-center flex-col mt-4">
            <h2 className="text-[15px] md:text-[19px] uppercase" style={{ fontFamily: BASK, color: "#000" }}>
              {t(wedding.text.countdownLabel)}
            </h2>
            <div className="text-center mt-2 text-[15px] md:text-[19px]" style={{ color: "#000", fontWeight: 600 }}>
              <Countdown />
            </div>
          </div>
        </div>

        {/* calendar */}
        <div className="relative" style={{ width: "calc(0.95692 * var(--st-w))", maxWidth: "560px", marginTop: "calc(0.06803 * var(--st-w))" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill" loading="lazy" decoding="async" src="/images/themes/riviera-blue/calendar-frame.webp" />
          <div className="relative z-10 flex w-full items-center justify-center px-[19.8%] pb-[15%] pt-[19%]">
            <div className="w-full mx-auto" style={{ color: BLUE }}>
              <div className="text-center py-2.5 text-[15px] md:text-[20px] font-bold tracking-wide" style={{ fontFamily: "\"Times New Roman\", Times, serif", color: BLUE }}>
                {date.monthTitle}
              </div>
              <div className="grid grid-cols-7">
                {date.weekdays.map((d, i) => (
                  <div key={i} className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                {calendarCells().map((d, i) => (
                  <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]">
                    {d === weddingDay ? (
                      <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                        <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={wedding.theme}>
                          <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                        </svg>
                        <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "#fff" }}>{n(d)}</span>
                      </div>
                    ) : d ? (
                      <span className="text-[12px] md:text-[13px]">{n(d)}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm tracking-wider underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70" style={{ color: "#000", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", serif" }}>
            {t(wedding.text.addToCalendar)}
          </a>
        </div>
      </div>
    </section>
  );
}
