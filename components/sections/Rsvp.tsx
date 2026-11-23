"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { rsvpCloses, rsvpDeadline } from "@/lib/wedding";
import { sendToSheet } from "@/lib/sheet";

const SERIF = "\"Times New Roman\", Times, serif";
const SANS = "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif";
const inputCls = "w-full rounded-[6px] border px-3 py-2 text-[14px] focus:outline-none bg-transparent";

// "Confirm attendance" button + reply-by date + bridge illustration + RSVP form (saved to the Google Sheet)
export default function Rsvp() {
  const { t, lang, n, date, amp } = useI18n();
  const f = wedding.form;
  const dialog = useRef<HTMLDialogElement>(null);
  const [attending, setAttending] = useState(true);
  const [form, setForm] = useState({ name: "", guests: "1", phone: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [closed, setClosed] = useState(false);
  useEffect(() => setClosed(Date.now() > new Date(rsvpCloses).getTime()), []);
  const c = wedding.theme;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || status === "sending") return;
    setStatus("sending");
    try {
      await sendToSheet({ type: "rsvp", attending, ...form, guests: Number(form.guests), lang });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingBottom: "calc(0.03628 * var(--st-w))" }}>
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2">
          <button
            type="button"
            disabled={closed}
            onClick={() => dialog.current?.showModal()}
            className="text-[13px] md:text-[17px] tracking-wider inline-flex items-center justify-center rounded-full px-7 py-1.5 transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
            style={{ backgroundColor: c, color: "#fff", fontFamily: SANS }}
          >
            {t(closed ? wedding.text.rsvpClosed : wedding.text.rsvpButton)}
          </button>
          {!closed && (
            <span className="text-[11px] md:text-[13px]" style={{ color: "#000", opacity: 0.7, fontFamily: SERIF }}>
              {t(wedding.text.rsvpBy, { date: rsvpDeadline(lang) })}
            </span>
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className="pointer-events-none relative z-0 mx-auto block h-auto w-[45.92%] max-w-none object-contain" loading="lazy" decoding="async" src="/images/themes/riviera-blue/bridge.webp" style={{ marginTop: "calc(0.01361 * var(--st-w))" }} />
      </div>

      <dialog ref={dialog} className="modal modal-bottom sm:modal-middle" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <div className="modal-box max-w-md p-0 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#fdfbf5", color: "#000" }}>
          <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: c }}>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={t(f.close)} className="btn btn-sm btn-circle btn-ghost absolute top-3 text-white/80 hover:text-white hover:bg-white/20" style={{ insetInlineEnd: 12 }}>
              ✕
            </button>
            <h2 className="uppercase font-bold text-[20px] md:text-[24px]" style={{ color: "white", fontFamily: SERIF, letterSpacing: "0.04em", textShadow: "rgba(0,0,0,.2) 1px 1px 2px" }}>
              {t(wedding.text.rsvpButton)}
            </h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,.85)", fontFamily: SERIF }}>
              {t(wedding.couple[0])} {amp} {t(wedding.couple[1])} · {date.long}
            </p>
          </div>

          {status === "sent" ? (
            <div className="p-8 text-center" style={{ fontFamily: SERIF }}>
              <p className="text-[22px]" style={{ color: c }}>{t(f.thanks, { name: form.name.trim() })}</p>
              <p className="mt-2 text-[15px]" style={{ opacity: 0.8 }}>{t(attending ? f.thanksYes : f.thanksNo)}</p>
              <button type="button" onClick={() => dialog.current?.close()} className="mt-6 rounded-full px-6 py-1.5 text-white text-sm" style={{ backgroundColor: c }}>
                {t(f.close)}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 flex flex-col gap-4" style={{ fontFamily: SANS }}>
              <label className="flex flex-col gap-1 text-[13px]">
                {t(f.name)}
                <input required maxLength={100} value={form.name} onChange={set("name")} className={inputCls} style={{ borderColor: `${c}66` }} />
              </label>

              <div className="grid grid-cols-2 gap-2 text-[14px]" style={{ fontFamily: SERIF }}>
                {[true, false].map((yes) => (
                  <button key={String(yes)} type="button" onClick={() => setAttending(yes)} className="rounded-[8px] border px-3 py-2 transition-colors" style={attending === yes ? { backgroundColor: c, color: "#fff", borderColor: c } : { borderColor: `${c}66`, color: c }}>
                    {t(yes ? f.accept : f.decline)}
                  </button>
                ))}
              </div>

              {attending && (
                <label className="flex flex-col gap-1 text-[13px]">
                  {t(f.guests)}
                  <select value={form.guests} onChange={set("guests")} className={inputCls} style={{ borderColor: `${c}66` }}>
                    {[1, 2, 3, 4, 5, 6].map((k) => (
                      <option key={k} value={k}>{n(k)}</option>
                    ))}
                  </select>
                </label>
              )}

              <label className="flex flex-col gap-1 text-[13px]">
                {t(f.phone)}
                <input type="tel" dir="ltr" maxLength={40} value={form.phone} onChange={set("phone")} className={inputCls} style={{ borderColor: `${c}66`, textAlign: lang === "ar" ? "right" : "left" }} />
              </label>

              <label className="flex flex-col gap-1 text-[13px]">
                {t(f.message)}
                <textarea rows={2} maxLength={1000} value={form.message} onChange={set("message")} className={inputCls} style={{ borderColor: `${c}66`, resize: "none" }} />
              </label>

              {/* hidden from people, bots fill it in */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set("website")} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

              {status === "error" && <p className="text-xs text-center" style={{ color: "#b91c1c" }}>{t(f.error)}</p>}

              <button type="submit" disabled={status === "sending"} className="self-center rounded-full px-8 py-2 text-white text-[14px] tracking-wider disabled:opacity-60" style={{ backgroundColor: c, fontFamily: SERIF }}>
                {t(status === "sending" ? f.sending : f.sendRsvp)}
              </button>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
