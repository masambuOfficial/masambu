import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { clients } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects/aew-aec`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/website-quote`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/logos`, changeFrequency: "yearly", priority: 0.6 },
    ...clients.map((c) => ({
      url: `${SITE_URL}/work/${c.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
