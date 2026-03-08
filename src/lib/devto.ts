import { DEVTO_USERNAME } from "@/lib/constants";
import type { DevToArticle } from "@/types/blog";

const DEVTO_API = "https://dev.to/api";

export async function fetchDevToArticles(): Promise<DevToArticle[]> {
  const response = await fetch(
    `${DEVTO_API}/articles?username=${DEVTO_USERNAME}&per_page=30`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Dev.to API error: ${response.status}`);
  }

  return response.json();
}
