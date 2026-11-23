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

/** Visible guestbook wishes from the sheet, newest first. null = not connected / failed. */
export async function loadWishes(): Promise<SheetWish[] | null> {
  if (!wedding.sheetUrl) return null;
  try {
    const res = await fetch(`${wedding.sheetUrl}?action=wishes`);
    const out = await res.json();
    return out.ok ? out.wishes : null;
  } catch {
    return null;
  }
}
