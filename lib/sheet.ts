// Talks to the Google Apps Script web app (google-sheet/Code.gs).
import { wedding } from "@/data/wedding";

export const sheetConnected = () => !!wedding.sheetUrl;

/** Send a row. Uses text/plain so the browser doesn't need a CORS preflight. */
export async function sendToSheet(payload: Record<string, unknown>): Promise<void> {
  if (!wedding.sheetUrl) return; // not connected: keep it on the page only
  const res = await fetch(wedding.sheetUrl, { method: "POST", body: JSON.stringify(payload) });
  const out = await res.json().catch(() => ({ ok: false, error: "bad response" }));
  if (!out.ok) throw new Error(out.error || "Could not save");
}

export type SheetWish = { time: string; name: string; message: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Visible guestbook wishes from the sheet, newest first. null = not connected / failed.
 *  Google is slow (2–3s) and sometimes fails, so: never use a cached answer, give each try
 *  up to 15s, and try 4 times before giving up. */
export async function loadWishes(): Promise<SheetWish[] | null> {
  if (!wedding.sheetUrl) return null;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(`${wedding.sheetUrl}?action=wishes&t=${Date.now()}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      const out = await res.json();
      if (out.ok && Array.isArray(out.wishes)) return out.wishes;
    } catch {
      // try again
    }
    await wait(1000 * (attempt + 1));
  }
  return null;
}
