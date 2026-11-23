// Parallax settings measured from the original template, in page order (index 0..15).
// "page": moves with page scroll from the top  -> value = clamp(scrollY * k, lo, hi)
// "view": drifts from -a to +a px while the element passes through the screen
export type ParallaxCfg = { m: "page"; k: number; lo: number; hi: number } | { m: "view"; a: number };

export const PARALLAX: ParallaxCfg[] = [
  // Hero clouds / mountains / lake / village
  { m: "page", k: 0.128, lo: 0, hi: 95 },
  { m: "page", k: 0.158, lo: 0, hi: 95 },
  { m: "page", k: 0.19, lo: 0, hi: 115 },
  { m: "page", k: -0.04, lo: -70, hi: 0 },
  { m: "page", k: 0.0193, lo: 0, hi: 70 },
  { m: "page", k: -0.03, lo: -70, hi: 0 },
  { m: "page", k: -0.098, lo: -70, hi: 0 },
  // Section decorations (leaves, flowers, trees...)
  { m: "view", a: 80 }, { m: "view", a: 80 }, { m: "view", a: 70 },
  { m: "view", a: 80 }, { m: "view", a: 70 }, { m: "view", a: 75 },
  { m: "view", a: 70 }, { m: "view", a: 75 }, { m: "view", a: 75 },
];

export const initialValue = (c: ParallaxCfg) => (c.m === "page" ? 0 : -c.a);

export function targetValue(c: ParallaxCfg, el: HTMLElement): number {
  if (c.m === "page") return Math.min(c.hi, Math.max(c.lo, window.scrollY * c.k));
  const anchor = el.parentElement ?? el;
  const r = anchor.getBoundingClientRect();
  const vh = window.innerHeight;
  const h = Math.min(el.offsetHeight || r.height, r.height || el.offsetHeight) || 300;
  const top = r.top + (el.offsetTop || 0);
  const p = Math.min(1, Math.max(0, (vh - top) / (vh + h)));
  return -c.a + 2 * c.a * p;
}
