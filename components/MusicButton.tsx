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
          {playing ? (
            // playing: dancing bars
            <span>
              <em style={{ height: "60%" }} />
              <em style={{ height: "100%", animationDelay: ".1s" }} />
              <em style={{ height: "40%", animationDelay: ".2s" }} />
              <em style={{ height: "80%", animationDelay: ".3s" }} />
            </span>
          ) : (
            // stopped: music note (same as the original template)
            <svg viewBox="0 0 24 24" fill="#fff" width="20" height="20" aria-hidden="true">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
