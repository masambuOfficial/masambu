"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Briefcase, Home, Layers, Mail, Moon, Sun, User } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/#about", label: "About", Icon: User },
  { href: "/#work", label: "Work", Icon: Briefcase },
  { href: "/#services", label: "Services", Icon: Layers },
  { href: "/#contact", label: "Contact", Icon: Mail },
];

export default function Header() {
  // The whole pill expands together; collapses on leave or outside click/tap.
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [open]);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const pill =
    "border border-line bg-surface/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]";

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-2"
      >
        <ul
          ref={navRef}
          data-open={open}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
          }}
          onClick={() => setOpen(true)}
          className={`group/nav flex items-center gap-1 rounded-full p-1.5 transition-all ${pill}`}
        >
          {links.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                title={label}
                className="flex h-9 items-center rounded-full px-[9.5px] text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Icon size={17} strokeWidth={1.75} className="shrink-0" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 ease-out group-data-[open=true]/nav:ml-2 group-data-[open=true]/nav:max-w-24 group-data-[open=true]/nav:opacity-100">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle light and dark theme"
          className={`grid size-12 place-items-center rounded-full text-muted transition-colors hover:text-foreground ${pill}`}
        >
          <Sun size={17} className="icon-sun" />
          <Moon size={17} className="icon-moon" />
        </button>
        <a
          href={`mailto:${profile.email}`}
          className={`hidden items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-sm font-medium sm:flex ${pill} !bg-foreground text-background transition-opacity hover:opacity-85`}
        >
          <span className="grid size-9 place-items-center rounded-full bg-background text-foreground">
            <Mail size={16} />
          </span>
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}
