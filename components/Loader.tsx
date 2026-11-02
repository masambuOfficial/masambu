"use client";

import { useEffect, useState } from "react";

const KEY = "loader-seen";
const DURATION = 1400;

/**
 * Intro screen: progress bar and counter. Shown once per browser session.
 *
 * Timer-driven (not requestAnimationFrame, which browsers pause in background
 * tabs), and it can never block the site: a CSS animation in globals.css hides
 * the overlay after a few seconds even if this script never runs.
 */
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

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    const start = Date.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(tick);
      setCount(100);
      setTimeout(() => setDone(true), 250);
    };
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setCount(Math.round(p * 100));
      if (p >= 1) finish();
    }, 30);
    // Background tabs throttle timers; never leave the overlay up for long.
    const failsafe = setTimeout(finish, DURATION + 1200);
    const onHide = () => document.hidden && finish();
    document.addEventListener("visibilitychange", onHide);

    return () => {
      clearInterval(tick);
      clearTimeout(failsafe);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-nosnippet
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
