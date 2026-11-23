"use client";

import { useInvitation } from "@/components/InvitationProvider";
import { wedding } from "@/data/wedding";

/** Spinning CD button with dancing bars (bottom right). */
export default function MusicButton() {
  const { revealed, playing, toggleMusic } = useInvitation();
  const t = wedding.theme;
  return (
    <div className={`inv-music${revealed ? " show" : ""}${playing ? "" : " paused"}`}>
      <button type="button" aria-label={playing ? "Pause music" : "Play music"} onClick={toggleMusic}>
        <div className="inv-cd" style={{ background: `linear-gradient(to bottom right, ${t}cc, ${t}, ${t}dd)` }}>
          <i />
          <b />
        </div>
        <div className="inv-bars">
          <span>
            <em style={{ height: "60%" }} />
            <em style={{ height: "100%", animationDelay: ".1s" }} />
            <em style={{ height: "40%", animationDelay: ".2s" }} />
            <em style={{ height: "80%", animationDelay: ".3s" }} />
          </span>
        </div>
      </button>
    </div>
  );
}
