"use client";

import { ArrowUpRight } from "lucide-react";
import type { CategoryId } from "@/lib/data";

/** Jumps to the Work section with the matching filter selected. */
export default function TrackLink({ filter }: { filter: CategoryId }) {
  return (
    <a
      href="#work"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("work:filter", { detail: filter }))
      }
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
    >
      See related work <ArrowUpRight size={15} />
    </a>
  );
}
