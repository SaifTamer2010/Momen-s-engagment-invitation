"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { countdownTarget } from "@/lib/wedding";

/** Live "X days Y hours Z min W sec" until the ceremony (venue time zone). */
export default function Countdown(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const { t, n } = useI18n();
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(countdownTarget).getTime();
    const tick = () => setLeft(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null) return <p {...props}>{" "}</p>;
  const [d, h, m, s] = t(wedding.text.countdownUnits).split("|");
  const v = [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60];
  return (
    <p {...props}>
      {`${n(v[0])} ${d} ${n(v[1])} ${h} ${n(v[2])} ${m} ${n(v[3])} ${s}`}
    </p>
  );
}
