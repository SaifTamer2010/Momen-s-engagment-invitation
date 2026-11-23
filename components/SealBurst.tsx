"use client";

import { useMemo } from "react";
import { wedding } from "@/data/wedding";

const SHAPES = ["✦", "❤", "✿", "•"];
const COLORS = [wedding.theme, "#7fb3d5", "#ffffff", "#c9a96e"];

/** Ring + particles that burst out of the wax seal when the envelope opens. */
export default function SealBurst({ top, count = 16 }: { top: string; count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const ang = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 70 + Math.random() * 70;
        return {
          shape: SHAPES[i % SHAPES.length],
          color: COLORS[i % COLORS.length],
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist,
          rs: Math.random() * 40 - 20,
          re: 120 + Math.random() * 180,
          delay: Math.random() * 0.08,
        };
      }),
    [count]
  );

  return (
    <>
      <div className="inv-ring" style={{ left: "50%", top, width: 56, height: 56, borderColor: wedding.theme }} />
      {particles.map((p, i) => (
        <span
          key={i}
          className="inv-particle"
          style={
            {
              left: "50%",
              top,
              color: p.color,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot-start": `${p.rs}deg`,
              "--rot-end": `${p.re}deg`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          {p.shape}
        </span>
      ))}
    </>
  );
}
