"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectCard, VideoDialog } from "@/components/ProjectCard";

export default function ClientWork({ projects }: { projects: Project[] }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard
            key={p.youtubeId ?? p.title}
            project={p}
            onPlay={setVideoId}
            showClient={false}
          />
        ))}
      </div>
      <VideoDialog videoId={videoId} onClose={() => setVideoId(null)} />
    </>
  );
}
