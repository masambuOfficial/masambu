import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { logos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Logo Designs",
  description:
    "Selected logo and brand identity work by Masambu for businesses, schools and communities.",
  alternates: { canonical: "/logos" },
  openGraph: {
    title: "Logo Designs — Masambu",
    description:
      "Selected logo and brand identity work by Masambu for businesses, schools and communities.",
    url: "/logos",
    type: "website",
  },
};

export default function LogosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <Link href="/#work" className="text-sm text-muted hover:text-foreground">
        ← Back to work
      </Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl">
        Logo designs<span className="text-accent">.</span>
      </h1>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {logos.map((l) => (
          <div
            key={l.src}
            className="relative aspect-square rounded-lg border border-line bg-white p-8"
          >
            <Image
              src={l.src}
              alt={l.alt}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
              className="object-contain p-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
