"use client";

import { useEffect } from "react";
import { useInvitation } from "@/components/InvitationProvider";
import { wedding } from "@/data/wedding";

const STOP_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

/**
 * Slowly scrolls the page after the invitation opens (like the original).
 * Stops for good when the guest scrolls / touches / clicks / types, or at the bottom.
 * Pauses while a popup (RSVP form, photo viewer) is open.
 */
export default function AutoScroll() {
  const { revealed } = useInvitation();

  useEffect(() => {
    if (!revealed) return;
    const { delayMs, pxPerSecond } = wedding.autoScroll;
    let stopped = false;
    let raf = 0;
    let last: number | null = null;
    let acc = 0;

    const stop = () => {
      stopped = true;
      cancelAnimationFrame(raf);
      STOP_EVENTS.forEach((ev) => window.removeEventListener(ev, stop, true));
    };
    STOP_EVENTS.forEach((ev) => window.addEventListener(ev, stop, { capture: true, passive: true }));

    const step = (t: number) => {
      if (stopped) return;
      const popupOpen = !!document.querySelector("dialog[open]");
      if (last !== null && !popupOpen) {
        acc += ((t - last) / 1000) * pxPerSecond;
        const px = Math.floor(acc);
        if (px >= 1) {
          acc -= px;
          window.scrollBy(0, px);
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) return stop();
        }
      }
      last = t;
      raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(step)), delayMs);

    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [revealed]);

  return null;
}
