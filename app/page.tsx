import HeroPortrait from "@/components/HeroPortrait";
import {
  ArrowDown,
  ArrowUpRight,
  Clapperboard,
  Code2,
  Megaphone,
  PenTool,
  Shapes,
} from "lucide-react";
import Work from "@/components/Work";
import TrackLink from "@/components/TrackLink";
import { profile, tracks } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="mono-label mb-10 font-normal">{children}</h2>;
}

const serviceIcons = {
  comms: Megaphone,
  media: Clapperboard,
  brand: PenTool,
  code: Code2,
  design: Shapes,
};

const btn =
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300";

// Fill that wipes in from the left on hover.
const sweep =
  "absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100";

export default function Home() {
  return (
    <div className="frame mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="rise grid min-h-svh items-center gap-10 pb-16 pt-32 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <div className="order-2 md:order-1">
          <p className="mono-label">{profile.roles.join(" / ")}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            {profile.name}
            <span className="text-accent">.</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className={`${btn} border-line bg-surface hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_30px_-10px_var(--glow)] active:translate-y-0 active:scale-95`}
            >
              <span aria-hidden className={sweep} />
              <span className="relative transition-colors duration-300 group-hover:text-background">
                About me
              </span>
              <ArrowDown
                size={15}
                className="relative transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-background"
              />
            </a>
            <a
              href="#work"
              className={`${btn} border-foreground/30 hover:-translate-y-0.5 hover:border-foreground hover:shadow-[0_10px_30px_-10px_var(--glow)] active:translate-y-0 active:scale-95`}
            >
              <span aria-hidden className={`${sweep} !bg-foreground`} />
              <span className="relative transition-colors duration-300 group-hover:text-background">
                See my work
              </span>
              <ArrowUpRight
                size={15}
                className="relative transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-background"
              />
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <HeroPortrait />
        </div>

        <div className="order-3 text-justify text-muted hyphens-auto">
          <p className="text-left">Hi, I&apos;m {profile.name}</p>
          <p className="mt-3 text-left font-medium text-foreground">
            {profile.headline}
          </p>
          <p className="mt-3 leading-relaxed">
            <span className="text-foreground">{tracks[0].years}+ years</span> in
            communications and creative work: awareness strategies, livestream
            and audio-visual production, and brand and visual identity.
          </p>
          <p className="mt-3 leading-relaxed">
            <span className="text-foreground">{tracks[1].years}+ years</span> in
            software engineering: full-stack web products, from UI design to
            APIs, databases and payments.
          </p>
          <p className="mt-3 leading-relaxed">
            Based in {profile.location}, working with teams everywhere.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-line py-24">
        <SectionLabel>About</SectionLabel>
        <div className="grid gap-14 md:grid-cols-[1.6fr_1fr]">
          <p className="text-2xl leading-snug tracking-tight sm:text-3xl">
            {profile.about}
          </p>
          <dl className="space-y-10 text-sm">
            <div>
              <dt className="mono-label mb-3">Experience</dt>
              {tracks.map((t) => (
                <dd
                  key={t.id}
                  className="flex justify-between gap-4 border-b border-line py-3"
                >
                  <span>{t.title}</span>
                  <span className="shrink-0 text-muted">{t.years}+ years</span>
                </dd>
              ))}
            </div>
            <div>
              <dt className="mono-label mb-3">Education</dt>
              {profile.education.map((e) => (
                <dd key={e} className="border-b border-line py-3">
                  {e}
                </dd>
              ))}
            </div>
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="border-t border-line py-24">
        <SectionLabel>Works</SectionLabel>
        <Work />
      </section>

      {/* Services */}
      <section id="services" className="border-t border-line py-24">
        <SectionLabel>What I do</SectionLabel>
        <div className="space-y-20">
          {tracks.map((t) => (
            <div key={t.id}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="mono-label">{t.years}+ years</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    {t.title}
                  </h3>
                </div>
                <TrackLink filter={t.filter} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {t.services.map((s, i) => {
                  const Icon = serviceIcons[s.icon];
                  return (
                    <div
                      key={s.title}
                      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_20px_50px_-20px_var(--glow)]"
                    >
                      {/* Accent glow that sweeps up on hover */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 translate-y-10 bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
                      />
                      <div className="relative flex items-start justify-between">
                        <p className="mono-label transition-colors duration-300 group-hover:text-accent">
                          0{i + 1}
                        </p>
                        <span className="grid size-11 place-items-center rounded-full border border-line text-muted transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                      </div>
                      <h4 className="relative mt-8 text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                        {s.title}
                      </h4>
                      <p className="relative mt-2 leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                        {s.text}
                      </p>
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-700 group-hover:w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-line py-28">
        <SectionLabel>Contact</SectionLabel>
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-3xl font-semibold tracking-[-0.04em] underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-accent sm:text-6xl"
        >
          {profile.email}
        </a>
        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-muted">
          <a href={profile.phoneHref} className="hover:text-foreground">
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub ↗
          </a>
        </p>
      </section>
    </div>
  );
}
