import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientWork from "@/components/ClientWork";
import { categories, clients } from "@/lib/data";
import { getAllProjects } from "@/lib/work";

export function generateStaticParams() {
  return clients.map((c) => ({ client: c.id }));
}

export async function generateMetadata(
  props: PageProps<"/work/[client]">,
): Promise<Metadata> {
  const { client: id } = await props.params;
  const client = clients.find((c) => c.id === id);
  if (!client) return {};
  const title = `${client.name}: work by Masambu`;
  return {
    title: `${client.short} work`,
    description: client.blurb,
    alternates: { canonical: `/work/${client.id}` },
    openGraph: { title, description: client.blurb, url: `/work/${client.id}`, type: "website" },
  };
}

export default async function ClientPage(props: PageProps<"/work/[client]">) {
  const { client: id } = await props.params;
  const client = clients.find((c) => c.id === id);
  if (!client) notFound();

  const items = (await getAllProjects()).filter((p) => p.client === client.id);
  const counts = categories
    .map((c) => ({
      label: c.label,
      n: items.filter((p) => p.category === c.id).length,
    }))
    .filter((c) => c.n > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Link href="/#work" className="text-sm text-muted hover:text-foreground">
        ← Back to work
      </Link>
      <p className="mono-label mt-8">Client</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
        {client.name}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{client.blurb}</p>
      <p className="mono-label mt-6">
        {items.length} {items.length === 1 ? "project" : "projects"}
        {counts.length > 0 &&
          " · " + counts.map((c) => `${c.n} ${c.label}`).join(" · ")}
      </p>
      <div className="mt-12">
        <ClientWork projects={items} />
      </div>
    </div>
  );
}
