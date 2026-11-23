"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

type Ctx = {
  /** envelope was clicked */
  opened: boolean;
  /** envelope animation finished, invitation is visible */
  revealed: boolean;
  open: () => void;
  playing: boolean;
  toggleMusic: () => void;
};

const InvitationContext = createContext<Ctx | null>(null);

export const useInvitation = () => {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error("useInvitation must be used inside <InvitationProvider>");
  return ctx;
};

/** Time from clicking "Open" until the invitation shows (matches the envelope animation). */
const REVEAL_MS = 1390;

export default function InvitationProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(wedding.song);
    a.loop = true;
    a.addEventListener("play", () => setPlaying(true));
    a.addEventListener("pause", () => setPlaying(false));
    audio.current = a;
    return () => a.pause();
  }, []);

  const play = () => audio.current?.play().catch(() => setPlaying(false));

  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    play(); // must run inside the click so browsers allow sound
    setTimeout(() => {
      setRevealed(true);
      window.scrollTo(0, 0);
    }, REVEAL_MS);
  }, [opened]);

  const toggleMusic = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) play();
    else a.pause();
  }, []);

  return (
    <InvitationContext.Provider value={{ opened, revealed, open, playing, toggleMusic }}>
      {children}
    </InvitationContext.Provider>
  );
}
