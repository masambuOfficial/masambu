"use client";

import { useEffect, useState } from "react";

const KEY = "loader-seen";

/** Intro screen: progress bar and counter. Shown once per browser session. */
export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Hidden via CSS in these cases (see globals.css), so nothing to animate.
    if (seen || reduce) return;

    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`loader fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-56">
        <p className="mb-6 text-center text-2xl font-semibold tracking-tight">
          Masambu<span className="text-accent">.</span>
        </p>
        <div className="h-px w-full bg-line">
          <div
            className="h-px bg-foreground"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="mono-label mt-3 flex justify-between normal-case">
          <span>Loading</span>
          <span>{String(count).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
