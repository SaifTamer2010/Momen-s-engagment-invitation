"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import Parallax from "@/components/Parallax";

const BLUE = "rgb(0, 88, 133)";

// Top: welcome title, couple names, lake & village illustration
export default function Hero() {
  const { t, amp } = useI18n();
  const [a, b] = wedding.couple;
  return (
    <section className="relative isolate w-full">
      <header className="relative z-30 flex w-full flex-col items-center px-4" style={{ paddingTop: "calc(0.06576 * var(--st-w))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className="h-auto max-w-none object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/line-decoration-3.webp" style={{ width: "calc(0.22449 * var(--st-w))" }} />
        <div className="relative mt-[0.4%] flex w-full items-center justify-center" dir="ltr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden="true" className="pointer-events-none absolute top-1/2 h-auto max-w-none -translate-y-1/2 object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/line-decoration-2.webp" style={{ left: "calc(0.12925 * var(--st-w))", width: "calc(0.17460 * var(--st-w))" }} />
          <p className="whitespace-pre text-center text-[10px] uppercase leading-none tracking-[0.05em] md:text-[15px]" style={{ fontFamily: "\"EB Garamond\", \"Times New Roman\", serif", color: BLUE }}>
            {t(wedding.text.welcome)}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden="true" className="pointer-events-none absolute top-1/2 h-auto max-w-none -translate-y-1/2 scale-x-[-1] object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/line-decoration-2.webp" style={{ right: "calc(0.13832 * var(--st-w))", width: "calc(0.17460 * var(--st-w))" }} />
        </div>
        <div className="names flex w-full flex-col items-center text-center leading-none" style={{ marginTop: "calc(0.18821 * var(--st-w))", fontFamily: "\"Viaoda Libre\", \"EB Garamond\", cursive", color: BLUE, textTransform: "uppercase" }}>
          <div className="flex w-[74%] justify-center">
            <span className="hero-name whitespace-nowrap" style={{ lineHeight: "1.22", paddingTop: "0.14em" }}>
              {t(a)}
            </span>
          </div>
          <span className="amp hero-amp" style={{ fontFamily: "\"Alex Brush\", cursive", lineHeight: "1", margin: "calc(0.01361 * var(--st-w)) 0" }}>
            {amp}
          </span>
          <div className="flex w-[74%] justify-center">
            <span className="hero-name whitespace-nowrap" style={{ lineHeight: "1.22", paddingTop: "0.14em" }}>
              {t(b)}
            </span>
          </div>
        </div>
      </header>
      <div className="relative z-0 ml-[-20.18%] mr-[-5.897%] w-[126.08%]" dir="ltr" aria-hidden="true" style={{ aspectRatio: "556 / 430", marginTop: "calc(0.07937 * var(--st-w))" }}>
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[39.03%] top-[-40.60%] w-[106.29%] max-w-none object-contain opacity-70" loading="eager" decoding="async" src="/images/themes/riviera-blue/cloud-3.webp" style={{ willChange: "transform" }} as="img" index={0} tpl="rotate(123.024deg) translateY(#px) rotate(-123.024deg)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[2%] top-[-55.60%] w-[69.42%] max-w-none object-contain opacity-70" loading="eager" decoding="async" src="/images/themes/riviera-blue/cloud-2.webp" style={{ willChange: "transform" }} as="img" index={1} tpl="rotate(-120.964deg) translateY(#px) rotate(120.964deg)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[-5.22%] top-[-15.81%] w-[78.24%] max-w-none object-contain opacity-70" loading="eager" decoding="async" src="/images/themes/riviera-blue/cloud-3.webp" style={{ willChange: "transform" }} as="img" index={2} tpl="rotate(126.87deg) translateY(#px) rotate(-126.87deg)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[5.58%] top-[25.12%] w-[77.16%] max-w-none object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/lake.webp" as="img" index={3} tpl="translateY(#px)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 w-[98.92%] max-w-none object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/mountain.webp" as="img" index={4} tpl="translateY(#px)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[24.10%] top-[8.60%] w-[74.82%] max-w-none object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/village.webp" as="img" index={5} tpl="translateY(#px)" />
        <Parallax alt="" aria-hidden="true" className="pointer-events-none absolute left-[70.64%] top-[54.19%] w-[25.36%] max-w-none object-contain" loading="eager" decoding="async" src="/images/themes/riviera-blue/flower-hero.webp" as="img" index={6} tpl="translateY(#px)" />
      </div>
    </section>
  );
}
