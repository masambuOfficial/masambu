"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import {
  categories,
  clients,
  type CategoryId,
  type ClientId,
  type Project,
} from "@/lib/data";
import { ProjectCard, VideoDialog } from "@/components/ProjectCard";

const PAGE = 9;
const PER_CLIENT = 3;

const chip = (on: boolean) =>
  `shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
    on
      ? "border-foreground bg-foreground text-background"
      : "border-line text-muted hover:border-foreground/40 hover:text-foreground"
  }`;

export default function Work({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [client, setClient] = useState<ClientId | "all">("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [videoId, setVideoId] = useState<string | null>(null);

  // Restore filters from a shared link (?type=video&client=igad).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get("type");
    const c = q.get("client");
    if (t && categories.some((x) => x.id === t)) setCategory(t as CategoryId);
    if (c && clients.some((x) => x.id === c)) setClient(c as ClientId);
  }, []);

  // Keep the URL in sync without adding history entries.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    category === "all" ? q.delete("type") : q.set("type", category);
    client === "all" ? q.delete("client") : q.set("client", client);
    const qs = q.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`,
    );
  }, [category, client]);

  // "See related work" links on the services section.
  useEffect(() => {
    const onFilter = (e: Event) => {
      setCategory((e as CustomEvent<CategoryId>).detail);
      setClient("all");
      setQuery("");
      setLimit(PAGE);
    };
    window.addEventListener("work:filter", onFilter);
    return () => window.removeEventListener("work:filter", onFilter);
  }, []);

  const clientCounts = useMemo(() => {
    const m = new Map<ClientId, number>();
    projects.forEach((p) => m.set(p.client, (m.get(p.client) ?? 0) + 1));
    return m;
  }, [projects]);
  const activeClients = clients.filter((c) => clientCounts.has(c.id));

  const q = query.trim().toLowerCase();
  const visible = projects.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (client === "all" || p.client === client) &&
      (!q ||
        `${p.title} ${p.description ?? ""} ${
          clients.find((c) => c.id === p.client)?.name ?? ""
        }`
          .toLowerCase()
          .includes(q)),
  );

  const grouped = category === "all" && client === "all" && !q;
  const reset = () => setLimit(PAGE);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project categories"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
      >
        {[{ id: "all" as const, label: "Show all" }, ...categories].map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={category === c.id}
            onClick={() => {
              setCategory(c.id);
              reset();
            }}
            className={chip(category === c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Clients"
          className="-mx-6 flex items-center gap-2 overflow-x-auto px-6 pb-1"
        >
          <span className="mono-label mr-1 shrink-0">Client</span>
          {[{ id: "all" as const, short: "All" }, ...activeClients].map((c) => (
            <button
              key={c.id}
              aria-pressed={client === c.id}
              onClick={() => {
                setClient(c.id);
                reset();
              }}
              className={`${chip(client === c.id)} !px-3 !py-1.5`}
            >
              {c.short}
              {c.id !== "all" && (
                <span className="ml-1.5 opacity-60">{clientCounts.get(c.id)}</span>
              )}
            </button>
          ))}
        </div>

        <label className="relative block md:w-64">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder="Search work"
            aria-label="Search work"
            className="w-full rounded-full border border-line bg-surface py-2 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground/40"
          />
        </label>
      </div>

      <p className="mono-label mt-8" aria-live="polite">
        {grouped
          ? `${projects.length} projects across ${activeClients.length} clients`
          : `Showing ${Math.min(limit, visible.length)} of ${visible.length} projects`}
      </p>

      {grouped ? (
        <div className="mt-6 space-y-14">
          {activeClients.map((c) => {
            const items = projects.filter((p) => p.client === c.id);
            const shown = items.slice(0, PER_CLIENT);
            const more = items.length - shown.length;
            return (
              <section key={c.id} aria-labelledby={`client-${c.id}`}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3
                      id={`client-${c.id}`}
                      className="text-2xl font-semibold tracking-[-0.03em]"
                    >
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                  </div>
                  <Link
                    href={`/work/${c.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {items.length} {items.length === 1 ? "project" : "projects"} · View all
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {shown.map((p) => (
                    <ProjectCard
                      key={p.youtubeId ?? p.title}
                      project={p}
                      onPlay={setVideoId}
                      showClient={false}
                    />
                  ))}
                </div>
                {more > 0 && (
                  <Link
                    href={`/work/${c.id}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    +{more} more from {c.short} <ArrowUpRight size={15} />
                  </Link>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.slice(0, limit).map((p) => (
              <ProjectCard
                key={p.youtubeId ?? p.title}
                project={p}
                onPlay={setVideoId}
                showClient={client === "all"}
              />
            ))}
          </div>
          {visible.length === 0 && (
            <p className="mt-10 text-muted">
              Nothing matches those filters.{" "}
              <button
                className="underline underline-offset-4 hover:text-foreground"
                onClick={() => {
                  setCategory("all");
                  setClient("all");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </p>
          )}
          {visible.length > limit && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setLimit((l) => l + PAGE)}
                className="rounded-full border border-foreground/30 px-6 py-3 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Load more ({visible.length - limit} left)
              </button>
            </div>
          )}
        </>
      )}

      <VideoDialog videoId={videoId} onClose={() => setVideoId(null)} />
    </div>
  );
}
