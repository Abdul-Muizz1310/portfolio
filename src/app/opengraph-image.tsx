import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_GRADIENT,
  OgFrame,
  OgPrompt,
  SITE_HOST,
  loadOgFonts,
} from "@/lib/og-image";
import { PERSONAL_INFO } from "@/lib/resume-data";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OG_IMAGE_TYPE } from "@/lib/seo";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_TYPE;

const FOCUS_AREAS = "LangGraph · RAG · Next.js · FastAPI";

export default async function Image() {
  const [fonts, avatar] = await Promise.all([
    loadOgFonts(),
    readFile(join(process.cwd(), "public/avatar.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <OgFrame filename="~/abdul-muizz — zsh">
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <OgPrompt command="whoami" />
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontFamily: "Space Grotesk",
                fontSize: 68,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              {PERSONAL_INFO.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontFamily: "Space Grotesk",
                fontSize: 44,
                fontWeight: 700,
                backgroundImage: OG_GRADIENT,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {PERSONAL_INFO.title}
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: OG_COLORS.muted }}>
              {FOCUS_AREAS}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: 4,
              borderRadius: 24,
              backgroundImage: OG_GRADIENT,
            }}
          >
            <img
              src={`data:image/jpeg;base64,${avatar}`}
              alt={PERSONAL_INFO.name}
              width={230}
              height={230}
              style={{ borderRadius: 20, objectFit: "cover" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: OG_COLORS.muted,
          }}
        >
          <span>{PERSONAL_INFO.location}</span>
          <span style={{ color: OG_COLORS.cyan }}>{SITE_HOST}</span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
