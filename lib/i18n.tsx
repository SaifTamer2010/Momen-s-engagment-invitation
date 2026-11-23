"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { wedding, type Tx } from "@/data/wedding";
import { dateParts, formatTime, num, type Lang } from "@/lib/wedding";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });
const KEY = "invitation-lang";

/** Holds the current language; sets <html lang/dir> so Arabic reads right-to-left. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "en" || saved === "ar") setLangState(saved);
    else if (wedding.defaultLang === "ar" || (wedding.defaultLang === "auto" && navigator.language.toLowerCase().startsWith("ar"))) setLangState("ar");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** t(text) picks the right language; also date/time/number helpers for that language. */
export function useI18n() {
  const { lang, setLang } = useContext(LangContext);
  return useMemo(() => {
    const t = (x: Tx | string, vars?: Record<string, string>) => {
      let s = typeof x === "string" ? x : x[lang];
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
      return s;
    };
    return {
      lang,
      setLang,
      t,
      date: dateParts(lang),
      time: (hhmm: string) => formatTime(hhmm, lang),
      n: (x: number) => num(x, lang),
      /** "&" between the names ("و" in Arabic) */
      amp: lang === "ar" ? "و" : "&",
    };
  }, [lang, setLang]);
}
