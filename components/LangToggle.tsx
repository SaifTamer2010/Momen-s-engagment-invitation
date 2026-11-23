"use client";

import { useI18n } from "@/lib/i18n";
import { wedding } from "@/data/wedding";

/** EN / عربي switch, top corner, visible on the envelope and the invitation. */
export default function LangToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "ar" ? "en" : "ar";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={next === "ar" ? "التبديل إلى العربية" : "Switch to English"}
      className="lang-toggle"
      style={{ borderColor: `${wedding.theme}55`, color: wedding.theme }}
    >
      <span className={lang === "en" ? "on" : ""}>EN</span>
      <span className="sep">|</span>
      <span className={lang === "ar" ? "on" : ""} lang="ar">عربي</span>
    </button>
  );
}
