import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { PERSONAL_INFO } from "@/lib/resume-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.title,
    short_name: PERSONAL_INFO.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: SITE_CONFIG.themeColor,
    theme_color: SITE_CONFIG.themeColor,
    lang: "en",
    categories: ["portfolio", "technology"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
