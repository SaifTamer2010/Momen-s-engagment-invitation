"use client";

import { useEffect, useState } from "react";
import { wedding, wishes as exampleWishes, wishIdeas, type Wish } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { loadWishes, sendToSheet, sheetConnected } from "@/lib/sheet";

const BLUE = "rgb(0, 88, 133)";
const SERIF = "\"Times New Roman\", Times, serif";
const field = { borderColor: "#000", color: "#000", backgroundColor: "transparent" };

type Entry = Wish & { at?: number };

// Guestbook: wishes are saved to / loaded from the Google Sheet.
export default function Guestbook() {
  const { t, lang } = useI18n();
  const f = wedding.form;
  const [wishes, setWishes] = useState<Entry[]>(sheetConnected() ? [] : exampleWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // true while the wishes are coming from the sheet (so we don't flash "Be the first…")
  const [loading, setLoading] = useState(sheetConnected());
  const fmtDate = (w: Entry) => (w.at ? new Date(w.at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { dateStyle: "medium", timeStyle: "short" }) : w.date);

  useEffect(() => {
    let alive = true;
    const load = () =>
      loadWishes().then((rows) => {
        if (!alive) return;
        if (rows) setWishes(rows.map((r) => ({ name: r.name, message: r.message, date: "", at: new Date(r.time).getTime() })));
        setLoading(false);
      });
    load();
    // fetch again when the guest comes back to the tab (new wishes from others)
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || status === "sending") return;
    const wish: Entry = { name: name.trim(), message: message.trim(), date: "", at: Date.now() };
    setStatus("sending");
    try {
      await sendToSheet({ type: "wish", name: wish.name, message: wish.message, website: honeypot });
      setWishes((w) => [wish, ...w]);
      setName("");
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  const magic = () => setMessage(t(wishIdeas[Math.floor(Math.random() * wishIdeas.length)]));

  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <div className="relative mx-auto" style={{ "--st-gb-w": "min(calc(0.95011 * var(--st-w)), 560px)", "--st-gb-frame": "calc(0.74940 * var(--st-gb-w))", "--st-gb-pt": "calc(0.13126 * var(--st-gb-w))", "--st-gb-form": "calc(var(--st-gb-frame) - var(--st-gb-pt) - 56px)", width: "var(--st-gb-w)" } as React.CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full object-fill" loading="lazy" decoding="async" src="/images/themes/riviera-blue/guestbook-frame.webp" style={{ height: "var(--st-gb-frame)" }} />
        <div className="relative z-10 flex flex-col items-center px-[8%]" style={{ color: "#000", fontFamily: "Roboto, \"Helvetica Neue\", Arial, sans-serif", paddingTop: "var(--st-gb-pt)" }}>
          <h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: BLUE, fontFamily: SERIF, fontWeight: 700, letterSpacing: "0.04em" }}>
            {t(wedding.text.guestbookHeading)}
          </h2>
          <form className="mt-4 mx-auto w-[85%] min-h-[var(--st-gb-form)]" onSubmit={send}>
            <div className="flex flex-col">
              <div className="mb-4">
                <input placeholder={t(f.wishName)} className="w-full rounded-[6px] border px-3 py-2 text-[12px] focus:outline-none md:text-[15px]" maxLength={100} required type="text" style={field} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <textarea placeholder={t(f.wishText)} className="w-full rounded-[6px] border px-3 py-2 text-[12px] focus:outline-none md:text-[15px]" rows={2} maxLength={1000} required style={{ ...field, resize: "none" }} value={message} onChange={(e) => setMessage(e.target.value)} />
              <div className="mt-4 flex items-center justify-between text-xs">
                <button type="button" className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none" title={t(f.magic)} aria-label={t(f.magic)} style={{ backgroundColor: "rgba(0, 88, 133, 0.1)", color: BLUE }} onClick={magic}>
                  🪄
                </button>
                <button type="submit" disabled={status === "sending"} className="rounded-[7px] px-5 py-1.5 text-[13px] text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 md:text-[16px]" style={{ backgroundColor: BLUE, fontFamily: SERIF }}>
                  {t(status === "sending" ? f.sending : f.sendWish)}
                </button>
              </div>
              {/* hidden from people, bots fill it in */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              {status === "sent" && <p className="mt-2 text-xs text-center" style={{ color: BLUE }}>{t(f.wishThanks)}</p>}
              {status === "error" && <p className="mt-2 text-xs text-center" style={{ color: "#b91c1c" }}>{t(f.error)}</p>}
            </div>
          </form>
          <div className="mt-8 w-full space-y-3 mx-auto max-w-full md:max-w-[600px]">
            {wishes.length === 0 && (
              <p className="text-center text-sm" style={{ color: BLUE, opacity: 0.8, fontFamily: SERIF }}>{t(loading ? f.wishLoading : f.wishEmpty)}</p>
            )}
            {wishes.map((w, i) => (
              <div key={i} className="rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(0, 88, 133, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.667)" }}>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold" dir="auto" style={{ color: BLUE }}>{w.name}</span>
                  <span className="text-xs shrink-0" style={{ opacity: 0.7 }}>{fmtDate(w)}</span>
                </div>
                <p className="mt-2 leading-relaxed" dir="auto">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
