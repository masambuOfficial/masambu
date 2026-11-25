import { cacheLife } from "next/cache";
import { clients, projects, type ClientRecord, type Project } from "@/lib/data";

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

/**
 * Videos in a public YouTube playlist, via its public Atom feed (no API key).
 * The feed returns the 15 most recent entries. Cached for an hour, so adding a
 * video to the playlist shows up on the site without touching code.
 */
async function getPlaylistVideos(client: ClientRecord): Promise<Project[]> {
  "use cache";
  cacheLife("hours");

  if (!client.playlistId) return [];
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${client.playlistId}`,
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);

    return entries.flatMap((entry): Project[] => {
      const id = entry.match(/<yt:videoId>([^<]+)</)?.[1];
      const title = entry.match(/<title>([^<]+)</)?.[1];
      if (!id || !title) return [];
      return [
        {
          title: decode(title),
          client: client.id,
          category: client.playlistCategory ?? "video",
          date: entry.match(/<published>([^<]+)</)?.[1],
          image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          youtubeId: id,
        },
      ];
    });
  } catch {
    return [];
  }
}

/** Hand-written projects plus every client's playlist, newest first. */
export async function getAllProjects(): Promise<Project[]> {
  const fromPlaylists = (
    await Promise.all(clients.map((c) => getPlaylistVideos(c)))
  ).flat();

  const seen = new Set<string>();
  const merged = [...projects, ...fromPlaylists].filter((p) => {
    const key = p.youtubeId ?? p.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Featured first, then dated items newest first, then undated in written order.
  return merged
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      if (!!b.p.featured !== !!a.p.featured) return b.p.featured ? 1 : -1;
      const da = a.p.date ?? "";
      const db = b.p.date ?? "";
      if (da !== db) return da < db ? 1 : -1;
      return a.i - b.i;
    })
    .map(({ p }) => p);
}
