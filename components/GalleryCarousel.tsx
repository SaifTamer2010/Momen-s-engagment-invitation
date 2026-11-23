"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { photos, wedding } from "@/data/wedding";

/** Position of each card relative to the active one (3D coverflow, values from the original). */
function cardStyle(i: number, cur: number, n: number): React.CSSProperties {
  let d = i - cur;
  if (d > n / 2) d -= n;
  if (d <= -n / 2) d += n;
  const a = Math.abs(d);
  return {
    aspectRatio: "0.75 / 1",
    transitionDuration: "1100ms",
    transform: `translateX(${60 * d}%) translateZ(${-150 * a}px) rotateY(${45 * d}deg) scale(${a === 0 ? 1 : a === 1 ? 0.85 : 0.7})`,
    opacity: [1, 0.75, 0.5, 0.3][Math.min(a, 3)],
    zIndex: 100 - a,
  };
}

const Chevron = ({ d }: { d: string }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export default function GalleryCarousel() {
  const n = photos.length;
  const [cur, setCur] = useState(0);
  const [viewer, setViewer] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const [tick, setTick] = useState(0); // restarts auto-slide timer after manual moves

  const go = useCallback((i: number) => {
    setCur(((i % n) + n) % n);
    setTick((t) => t + 1);
  }, [n]);

  const many = n > 1; // arrows, swipe, counter, auto-slide only when there's something to slide to

  // auto-slide
  useEffect(() => {
    if (!wedding.gallerySlideMs || n < 2) return;
    const id = setInterval(() => {
      if (drag.current || dialog.current?.open) return;
      setCur((c) => (c + 1) % n);
    }, wedding.gallerySlideMs);
    return () => clearInterval(id);
  }, [n, tick]);

  // ----- viewer (lightbox)
  const show = useCallback((i: number) => setViewer(((i % n) + n) % n), [n]);
  const openViewer = (i: number) => {
    show(i);
    dialog.current?.showModal();
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.current?.open) return;
      if (e.key === "ArrowLeft") show(viewer - 1);
      if (e.key === "ArrowRight") show(viewer + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer, show]);
  const thumbs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    thumbs.current?.children[viewer]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [viewer]);
  const viewerSwipe = useRef<number | null>(null);

  if (n === 0) return null;

  return (
    <div className="mt-5 w-full max-w-[420px] md:max-w-[620px]">
      <div
        className="relative h-[340px] md:h-[520px] touch-pan-y"
        onPointerDown={(e) => (drag.current = { x: e.clientX, moved: false })}
        onPointerMove={(e) => {
          if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
        }}
        onPointerUp={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          if (many && Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
          const moved = drag.current.moved;
          setTimeout(() => (drag.current = null), 0);
          if (moved) e.preventDefault();
        }}
        onPointerCancel={() => (drag.current = null)}
      >
        {many && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => go(cur - 1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors">
              <Chevron d="M15.75 19.5L8.25 12l7.5-7.5" />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(cur + 1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors">
              <Chevron d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </button>
          </>
        )}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }} onDragStart={(e) => e.preventDefault()}>
          {photos.map((src, i) => (
            <div
              key={src}
              className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out ${i === cur ? "ring-2 ring-white/30" : ""}`}
              style={cardStyle(i, cur, n)}
              onClick={() => {
                if (drag.current?.moved) return;
                if (i === cur) openViewer(i);
                else go(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`Photo ${i + 1}`} className="h-full w-full object-cover" src={src} style={{ objectPosition: "50% 50%" }} />
            </div>
          ))}
        </div>
      </div>
      {many && (
        <div className="flex justify-center mt-3">
          <span className="text-sm tabular-nums opacity-60">
            {cur + 1} / {n}
          </span>
        </div>
      )}

      {/* Full-screen photo viewer */}
      <dialog className="modal" ref={dialog} onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">
          <div className="flex flex-col items-center h-[100dvh] w-screen px-2 sm:px-4 pt-10 sm:pt-12 pb-4 sm:pb-6">
            <form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10">
              <button className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20" aria-label="Close lightbox">
                ✕
              </button>
            </form>
            {many && (
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-sm sm:text-lg bg-black/40 px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
                {viewer + 1} / {n}
              </div>
            )}
            <div
              className="relative flex flex-1 w-full max-w-5xl items-center justify-center cursor-pointer px-8 sm:px-12 min-h-0 overscroll-none"
              style={{ touchAction: "none" }}
              onPointerDown={(e) => (viewerSwipe.current = e.clientX)}
              onPointerUp={(e) => {
                if (viewerSwipe.current === null) return;
                const dx = e.clientX - viewerSwipe.current;
                viewerSwipe.current = null;
                if (many && Math.abs(dx) > 50) show(viewer + (dx < 0 ? 1 : -1));
              }}
              onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
            >
              {many && (
                <button type="button" onClick={() => show(viewer - 1)} className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute left-0 sm:left-2 z-10 hover:bg-white/20 btn-sm sm:btn-md" aria-label="Previous image">
                  ‹
                </button>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`Photo ${viewer + 1}`} className="max-h-full max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl select-none cursor-default" draggable={false} src={photos[viewer]} />
              {many && (
                <button type="button" onClick={() => show(viewer + 1)} className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute right-0 sm:right-2 z-10 hover:bg-white/20 btn-sm sm:btn-md" aria-label="Next image">
                  ›
                </button>
              )}
            </div>
            <div hidden={!many} ref={thumbs} className="flex-shrink-0 flex gap-2 sm:gap-3 overflow-x-auto px-2 sm:px-4 py-2 sm:py-3 mt-3 sm:mt-4 bg-black/30 rounded-lg backdrop-blur-sm max-w-[90vw] sm:max-w-[80vw] cursor-default [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === viewer ? "true" : undefined}
                  className={`flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 ${i === viewer ? "scale-105 shadow-lg" : "opacity-60 hover:opacity-100"}`}
                  style={i === viewer ? { outline: `${wedding.theme} solid 2px`, outlineOffset: "2px" } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="h-full w-full object-cover" alt={`Thumbnail ${i + 1}`} draggable={false} src={src} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/85">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
