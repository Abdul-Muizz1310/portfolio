import { DEVTO_USERNAME } from "@/lib/constants";
import type { DevToArticle } from "@/types/blog";

const DEVTO_API = "https://dev.to/api";
const FETCH_TIMEOUT = 10_000;

export async function fetchDevToArticles(): Promise<DevToArticle[]> {
  const url = new URL("/articles", DEVTO_API);
  url.searchParams.set("username", DEVTO_USERNAME);
  url.searchParams.set("per_page", "30");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Dev.to API error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid Dev.to API response: expected array");
  }

  return data as DevToArticle[];
}
