import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Masambu — Communications, Creative & Software Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const file = await readFile(
    path.join(process.cwd(), "public/images/profile-pic.png"),
  );
  const portrait = `data:image/png;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 85% 0%, #1b3b3c 0%, #0a0a0a 55%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a1a1a1",
            }}
          >
            Communications & Creative / Software Engineering
          </div>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, marginTop: 24 }}>
            Masambu
            <span style={{ color: "#7fbfc1" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a1a1a1", marginTop: 16 }}>
            11+ years in comms and creative · 3+ years in full-stack
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portrait}
          alt=""
          width={340}
          height={425}
          style={{
            borderRadius: 40,
            border: "2px solid rgba(255,255,255,0.15)",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
