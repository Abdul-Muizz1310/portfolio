import type { ReactNode } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

// Shared building blocks for the generated Open Graph images
// (src/app/opengraph-image.tsx and src/app/projects/[slug]/opengraph-image.tsx).
// Satori (next/og) only understands inline styles and flexbox layouts.

type ImageResponseOptions = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>;
export type OgFont = NonNullable<ImageResponseOptions["fonts"]>[number];

export const OG_COLORS = {
  background: "#0a0a0a",
  surface: "#12121a",
  border: "#2a2a3d",
  divider: "#1e1e2e",
  foreground: "#fafafa",
  muted: "#8a8aa3",
  faint: "#4a4a63",
  cyan: "#22d3ee",
  cyanSoft: "rgba(34, 211, 238, 0.12)",
} as const;

export const OG_GRADIENT = "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)";

export const SITE_HOST = new URL(SITE_CONFIG.url).host;

/** Paths are written out in full so Next's output file tracing can find them. */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [heading, mono, monoBold] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/GeistMono-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/GeistMono-SemiBold.ttf")),
  ]);

  return [
    { name: "Space Grotesk", data: heading, weight: 700, style: "normal" },
    { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
    { name: "Geist Mono", data: monoBold, weight: 600, style: "normal" },
  ];
}

export function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function OgPrompt({ command }: { command: string }) {
  return (
    <div style={{ display: "flex", fontSize: 26 }}>
      <span style={{ flexShrink: 0, marginRight: 16, color: OG_COLORS.cyan }}>
        visitor@abdul-muizz:~$
      </span>
      <span style={{ color: OG_COLORS.foreground }}>{command}</span>
    </div>
  );
}

interface OgFrameProps {
  filename: string;
  children: ReactNode;
}

/** macOS-style terminal window, matching the site's CodeBlock component. */
export function OgFrame({ filename, children }: OgFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 48,
        backgroundColor: OG_COLORS.background,
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(34, 211, 238, 0.16), transparent 42%), radial-gradient(circle at 88% 85%, rgba(139, 92, 246, 0.2), transparent 45%)",
        fontFamily: "Geist Mono",
        color: OG_COLORS.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          border: `1px solid ${OG_COLORS.border}`,
          borderRadius: 20,
          backgroundColor: "rgba(18, 18, 26, 0.92)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 60,
            padding: "0 28px",
            backgroundColor: OG_COLORS.surface,
            borderBottom: `1px solid ${OG_COLORS.divider}`,
          }}
        >
          {["#ef4444", "#eab308", "#22c55e"].map((color) => (
            <div
              key={color}
              style={{
                width: 16,
                height: 16,
                marginRight: 10,
                borderRadius: 8,
                backgroundColor: color,
                opacity: 0.8,
              }}
            />
          ))}
          <div style={{ display: "flex", marginLeft: 10, fontSize: 20, color: OG_COLORS.faint }}>
            {filename}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "40px 56px 36px",
          }}
        >
          {children}
        </div>

        <div style={{ display: "flex", height: 6, backgroundImage: OG_GRADIENT }} />
      </div>
    </div>
  );
}
