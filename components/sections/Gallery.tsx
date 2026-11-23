"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import GalleryCarousel from "@/components/GalleryCarousel";

// "Photo Gallery" title + 3D carousel (photos are listed in data/wedding.ts)
export default function Gallery() {
  const { t } = useI18n();
  return (
    <div className="relative z-10 flex w-full flex-col items-center px-[8.5%]" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: "rgb(0, 88, 133)", fontFamily: "\"Times New Roman\", Times, serif", fontWeight: 700, letterSpacing: "0.04em" }}>
        {t(wedding.text.galleryHeading)}
      </h2>
      <div className="w-full flex justify-center" dir="ltr">
        <GalleryCarousel />
      </div>
    </div>
  );
}
