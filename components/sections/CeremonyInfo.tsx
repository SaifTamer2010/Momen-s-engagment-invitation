"use client";

import { wedding, type Tx } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import Parallax from "@/components/Parallax";

const BLUE = "rgb(0, 88, 133)";
const BASK = "Baskerville, \"Libre Baskerville\", \"Times New Roman\", serif";
const CORM = "\"Cormorant Garamond\", \"Times New Roman\", serif";
const NAME = "\"Viaoda Libre\", \"EB Garamond\", cursive";

/** "ENGAGEMENT PARTY / Love Halls / AT 6:00 PM / MONDAY | 7 | DECEMBER / 2026" */
function DateBlock({ title, place, time }: { title: Tx; place: Tx; time: string }) {
  const { t, date, time: fmt } = useI18n();
  return (
    <div className="relative flex flex-col items-center gap-4 md:gap-5 text-center" style={{ fontFamily: BASK }}>
      <div style={{ color: BLUE }}>
        <span dir="auto" className="whitespace-pre-line text-[16px] md:text-[20px] uppercase leading-[1.4] flex flex-col items-center tracking-[0.02em]">
          {`${t(title)}\n${t(place)}`}
        </span>
      </div>
      <p className="font-normal text-[14px] md:text-[15px] text-center uppercase" style={{ color: "#000" }}>
        {t(wedding.text.at)} {fmt(time)}
      </p>
      {/* equal side columns keep the day number exactly centered */}
      <div className="date-row" style={{ color: BLUE }}>
        <span className="date-side text-[12px] md:text-[16px] uppercase tracking-[0.02em]" style={{ fontFamily: BASK, textAlign: "end" }}>
          <span>{date.weekday}</span>
          <span className="ghost" aria-hidden="true">{date.month}</span>
        </span>
        <div className="h-[25px] w-[1px] md:h-[34px]" style={{ backgroundColor: "#000", opacity: 0.55 }} />
        <span className="text-[30px] md:text-[42px] leading-none" style={{ color: BLUE }}>{date.day}</span>
        <div className="h-[25px] w-[1px] md:h-[34px]" style={{ backgroundColor: "#000", opacity: 0.55 }} />
        <span className="date-side text-[12px] md:text-[16px] uppercase tracking-[0.02em]" style={{ fontFamily: BASK, textAlign: "start" }}>
          <span>{date.month}</span>
          <span className="ghost" aria-hidden="true">{date.weekday}</span>
        </span>
      </div>
      <div className="text-[17px] md:text-[23px]" style={{ fontFamily: CORM, color: "#000" }}>
        {date.year}
      </div>
    </div>
  );
}

// Parents' names (optional), invitation line, couple names, ceremony (+ reception if separate)
export default function CeremonyInfo() {
  const { t, amp } = useI18n();
  const parents = wedding.parents;
  const r = wedding.reception;
  return (
    <section className="relative isolate w-full px-[8.5%]">
      <div className="pointer-events-none absolute z-0 flex items-center justify-center" aria-hidden="true" style={{ left: "24.83%", top: "calc(-0.11252 * var(--st-w))", width: "116.11%", aspectRatio: "512.03 / 513.24" }}>
        <Parallax alt="" aria-hidden="true" className="w-[60.74%] max-w-none object-contain opacity-10" loading="lazy" decoding="async" src="/images/themes/riviera-blue/leaf.webp" style={{ willChange: "transform" }} as="img" index={7} tpl="translateY(#px) rotate(-44.52deg)" />
      </div>
      <div className="pointer-events-none absolute z-0 flex items-center justify-center" aria-hidden="true" style={{ left: "-34.01%", top: "calc(0.58503 * var(--st-w))", width: "79.06%", aspectRatio: "348.64 / 387.73" }}>
        <Parallax alt="" aria-hidden="true" className="w-[68.28%] max-w-none object-contain opacity-10" loading="lazy" decoding="async" src="/images/themes/riviera-blue/flower-spray.webp" style={{ willChange: "transform" }} as="img" index={8} tpl="translateY(#px) rotate(24.62deg)" />
      </div>
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute z-[1] h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/flower-spray.webp" style={{ left: "-40.7%", top: "calc(0.65179 * var(--st-w))", width: "63.13%", willChange: "transform" }} as="img" index={9} tpl="translateY(#px)" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center whitespace-pre-line" style={{ color: BLUE, fontFamily: "\"Times New Roman\", Times, serif", fontWeight: 700, letterSpacing: "0.04em", marginBottom: "calc(0.02721 * var(--st-w))" }}>
          {t(wedding.text.ceremonyHeading)}
        </h2>

        {parents && (
          <div className="grid w-full grid-cols-[1fr_auto_1fr] justify-center gap-x-[14px] md:gap-x-8" style={{ color: BLUE, fontFamily: BASK }}>
            {parents.map((p, i) => (
              <div key={i} className={`flex flex-col items-center text-center min-w-0 max-w-[175px] md:max-w-[300px] ${i === 1 ? "col-start-3" : ""}`}>
                <span className="text-[12px] md:text-[16px]" style={{ color: "#000" }}>{t(p.title)}</span>
                {p.names.map((n, k) => (
                  <span key={k} className="font-semibold text-[12px] [overflow-wrap:anywhere]">{t(n)}</span>
                ))}
              </div>
            ))}
            <div className="col-start-2 row-start-1 h-[50px] w-[1px] self-center md:h-[74px]" style={{ backgroundColor: BLUE, opacity: 0.55 }} />
          </div>
        )}

        <div className="relative flex flex-col text-center text-[16px] md:text-[20px] uppercase leading-[1.35] tracking-[0.02em] mx-auto md:max-w-[560px]" style={{ whiteSpace: "pre-line", fontFamily: BASK, color: BLUE, marginTop: "calc(0.05442 * var(--st-w))" }}>
          {t(wedding.text.invite)}
        </div>

        <div className="relative w-full" style={{ marginTop: "calc(0.04082 * var(--st-w))" }}>
          <div className="names relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4">
            {/* sizes + spacing match the original: names 43px phone / 62px computer,
                empty line under each name like the template (gives the same gap around "&") */}
            <h3 className="ceremony-name w-[80%] min-h-[80px] flex items-center justify-center leading-[48px] md:leading-[70px] whitespace-nowrap" style={{ fontFamily: NAME, color: BLUE }}>
              {t(wedding.couple[0])}
            </h3>
            <div className="uppercase text-[10px] md:text-[13px] tracking-[0.22em]" aria-hidden="true" />
            <div className="amp text-[35px] leading-none md:text-[48px]" style={{ color: BLUE, fontFamily: "\"Ms Madi\", \"Alex Brush\", cursive" }}>
              {amp}
            </div>
            <h3 className="ceremony-name w-[80%] min-h-[80px] flex items-center justify-center leading-[48px] md:leading-[70px] whitespace-nowrap" style={{ fontFamily: NAME, color: BLUE }}>
              {t(wedding.couple[1])}
            </h3>
            <div className="uppercase text-[10px] md:text-[13px] tracking-[0.22em]" aria-hidden="true" />
          </div>
        </div>

        <div className="relative flex w-full flex-col" style={{ marginTop: "calc(0.03628 * var(--st-w))", gap: "calc(0.04989 * var(--st-w))" }}>
          <DateBlock title={wedding.ceremony.title} place={wedding.ceremony.place} time={wedding.ceremony.time} />
          {r && <DateBlock title={r.title} place={r.place} time={r.time} />}
        </div>
      </div>

      <div className="relative z-[1] flex justify-center" style={{ marginTop: "calc(0.01134 * var(--st-w))", paddingBottom: "calc(0.02268 * var(--st-w))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className="pointer-events-none block h-auto max-w-none shrink-0 object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/ship.webp" style={{ width: "calc(0.56689 * var(--st-w))" }} />
      </div>
    </section>
  );
}
