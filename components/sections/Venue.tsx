"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { directionsUrl, mapEmbedUrl } from "@/lib/wedding";
import Parallax from "@/components/Parallax";

const BLUE = "rgb(0, 88, 133)";
const BASK = "Baskerville, \"Libre Baskerville\", \"Times New Roman\", serif";

// Venue name + address + Google map + directions
export default function Venue() {
  const { t } = useI18n();
  const v = wedding.reception ?? wedding.ceremony;
  return (
    <section className="relative isolate w-full px-[8.5%]" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto w-[64.85%] max-w-none object-contain opacity-10" loading="lazy" decoding="async" src="/images/themes/riviera-blue/tree.webp" style={{ left: "48.53%", top: "calc(-0.25850 * var(--st-w))", willChange: "transform" }} as="img" index={12} tpl="translateY(#px)" />
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="relative text-center">
          <h3 className="uppercase font-bold text-[18px] md:text-[23px] text-center" style={{ color: BLUE, fontFamily: "\"Times New Roman\", Times, serif", fontWeight: 700, letterSpacing: "0.04em" }}>
            {t(wedding.text.venueHeading)}
          </h3>
          <div className="mx-auto mt-3 flex max-w-[300px] flex-col items-center gap-0.5 text-center text-[12px] leading-snug md:max-w-[440px] md:text-[15px]" style={{ color: "#000", fontFamily: BASK }}>
            <span className="text-[15px] md:text-[18px] font-semibold" style={{ color: BLUE }}>{t(v.place)}</span>
            <span>{t(v.address)}</span>
            <span className="opacity-70">{t(wedding.cityLine)}</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
          <iframe title={t(v.place)} className="relative z-10 mt-4 h-[230px] w-full overflow-hidden rounded-[15px] md:h-[380px]" src={mapEmbedUrl} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }} />
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]" style={{ color: "#000", fontFamily: BASK }}>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span>{t(wedding.text.directions)}</span>
          </a>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden="true" className="pointer-events-none relative z-10 mx-auto block h-auto max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/line-decoration.webp" style={{ width: "calc(0.37188 * var(--st-w))", marginTop: "calc(0.04762 * var(--st-w))" }} />
    </section>
  );
}
