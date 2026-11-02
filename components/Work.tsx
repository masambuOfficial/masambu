"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { categories, projects, type CategoryId, type Project } from "@/lib/data";

function Card({
  project,
  onPlay,
}: {
  project: Project;
  onPlay: (id: string) => void;
}) {
  const external = project.href?.startsWith("http");
  const label = categories.find((c) => c.id === project.category)?.label;

  const body = (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 group-hover:border-foreground/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {project.youtubeId && (
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <span className="grid size-14 place-items-center rounded-full bg-foreground text-background">
              <Play size={20} fill="currentColor" className="translate-x-px" />
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mono-label">{project.meta ?? label}</p>
        <h3 className="mt-3 flex items-start justify-between gap-3 text-lg font-medium leading-snug">
          {project.title}
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </h3>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );

  const cls = "group block h-full text-left";

  if (project.youtubeId) {
    return (
      <button
        type="button"
        className={cls}
        onClick={() => onPlay(project.youtubeId!)}
        aria-label={`Play video: ${project.title}`}
      >
        {body}
      </button>
    );
  }
  if (external) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  }
  return (
    <Link href={project.href ?? "#"} className={cls}>
      {body}
    </Link>
  );
}

export default function Work() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [videoId, setVideoId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onFilter = (e: Event) =>
      setActive((e as CustomEvent<CategoryId>).detail);
    window.addEventListener("work:filter", onFilter);
    return () => window.removeEventListener("work:filter", onFilter);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (videoId && !d.open) d.showModal();
    if (!videoId && d.open) d.close();
  }, [videoId]);

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);
  const tabs = [{ id: "all" as const, label: "Show all" }, ...categories];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project categories"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
      >
        {tabs.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              active === c.id
                ? "border-foreground bg-foreground text-background"
                : "border-line text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mono-label mt-8">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Card key={p.title} project={p} onPlay={setVideoId} />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setVideoId(null)}
        onClick={(e) => e.target === dialogRef.current && setVideoId(null)}
        className="m-auto w-[min(92vw,960px)] overflow-hidden rounded-3xl bg-black p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={() => setVideoId(null)}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-4 py-1.5 text-sm text-white"
        >
          Close
        </button>
        {videoId && (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </dialog>
    </div>
  );
}
