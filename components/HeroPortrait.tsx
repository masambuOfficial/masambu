import Image from "next/image";

// Fixed values (not random) so server and client render identically.
const particles = [
  { x: "6%", y: "12%", s: 5, d: 0, t: 6 },
  { x: "88%", y: "8%", s: 4, d: 1.2, t: 7 },
  { x: "96%", y: "38%", s: 6, d: 2.4, t: 8 },
  { x: "-2%", y: "46%", s: 4, d: 0.6, t: 7 },
  { x: "92%", y: "72%", s: 5, d: 3.1, t: 6.5 },
  { x: "4%", y: "82%", s: 6, d: 1.8, t: 8 },
  { x: "30%", y: "-3%", s: 3, d: 2.9, t: 7.5 },
  { x: "70%", y: "99%", s: 4, d: 0.3, t: 6 },
  { x: "16%", y: "64%", s: 3, d: 4, t: 9 },
  { x: "80%", y: "24%", s: 3, d: 3.6, t: 8.5 },
];

export default function HeroPortrait() {
  return (
    <div className="portrait group relative mx-auto p-8 sm:p-10">
      {/* Slow rotating dashed orbit */}
      <span
        aria-hidden
        className="orbit-spin absolute inset-2 rounded-full border border-dashed border-accent/30"
      />
      <span
        aria-hidden
        className="orbit-spin-rev absolute inset-8 rounded-[3rem] border border-line"
      />

      {/* Floating shapes */}
      <span
        aria-hidden
        className="shape-float absolute -left-1 top-8 size-9 rounded-full border-2 border-accent/70"
        style={{ animationDelay: "0s" }}
      />
      <span
        aria-hidden
        className="shape-float absolute -right-1 top-24 size-7 rotate-12 rounded-md border-2 border-foreground/40"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        aria-hidden
        className="shape-float absolute -left-2 bottom-24 size-6 rotate-45 bg-accent/80"
        style={{ animationDelay: "2.2s" }}
      />
      <span
        aria-hidden
        className="shape-float absolute -right-2 bottom-10 size-10 rounded-full bg-gradient-to-br from-accent/70 to-transparent"
        style={{ animationDelay: "0.8s" }}
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="shape-float absolute right-6 -top-1 size-8 text-accent"
        style={{ animationDelay: "1.9s" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 4v16M4 12h16" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="shape-float absolute -bottom-1 left-10 size-8 text-foreground/50"
        style={{ animationDelay: "2.8s" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M12 4 21 20H3z" />
      </svg>

      {/* Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="particle absolute rounded-full bg-accent"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.t}s`,
          }}
        />
      ))}

      {/* Frame */}
      <div className="portrait-float relative">
        <div className="relative aspect-[4/5] w-48 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_30px_80px_-30px_var(--glow)] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg] group-hover:border-accent/70 group-hover:shadow-[0_30px_90px_-20px_var(--glow)] sm:w-56 md:w-64">
          <Image
            src="/images/profile-pic.png"
            alt="Portrait of Masambu"
            fill
            priority
            sizes="(min-width: 768px) 256px, 224px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Light sweep across the frame on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
