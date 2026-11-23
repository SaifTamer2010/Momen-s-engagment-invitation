"use client";

import { createElement, useEffect, useRef } from "react";
import { PARALLAX, initialValue, targetValue, type ParallaxCfg } from "@/lib/parallax";

type Item = { el: HTMLElement; cfg: ParallaxCfg; tpl: string; cur: number };

// One shared animation loop for every parallax element on the page.
const items = new Set<Item>();
let running = false;
function loop() {
  items.forEach((it) => {
    const t = targetValue(it.cfg, it.el);
    if (Math.abs(t - it.cur) > 0.05) {
      it.cur += (t - it.cur) * 0.12; // spring-like smoothing
      it.el.style.transform = it.tpl.replace("#", it.cur.toFixed(2));
    }
  });
  requestAnimationFrame(loop);
}

type Props = {
  /** tag to render, e.g. "img" or "div" */
  as: string;
  /** position in lib/parallax.ts */
  index: number;
  /** transform with "#" where the moving translateY value goes */
  tpl: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [attr: string]: unknown;
};

/** Element that drifts up/down as the page scrolls. */
export default function Parallax({ as, index, tpl, style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const cfg = PARALLAX[index] ?? { m: "view", a: 70 };

  useEffect(() => {
    if (!ref.current) return;
    const it: Item = { el: ref.current, cfg, tpl, cur: initialValue(cfg) };
    items.add(it);
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
    return () => void items.delete(it);
  }, [cfg, tpl]);

  return createElement(
    as,
    { ...rest, ref, style: { ...style, transform: tpl.replace("#", String(initialValue(cfg))) } },
    children
  );
}
